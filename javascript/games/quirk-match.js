import { CHARACTERS } from '../data/mha-characters.js';

const getCharacterImage = (id) => `images/mha_characters/${id}.webp`;
const BEST_STREAK_KEY = 'multinao_mha_quirk_best_streak_v1';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[m]));

const normalize = (s) => String(s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

const INVALID_QUIRKS = new Set(['', 'ninguno', 'sin don', 'quirkless', 'none', 'desconocido', 'n/a']);

function hasValidQuirk(c) {
    if (!c || !c.quirkName) return false;
    return !INVALID_QUIRKS.has(normalize(c.quirkName));
}

function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

export function mountQuirkMatchGame(container, { onExit } = {}) {
    const ac = new AbortController();
    const { signal } = ac;

    const validPool = CHARACTERS.filter(hasValidQuirk);
    let usedTargetIds = new Set();

    let streak = 0;
    let bestStreak = Number(localStorage.getItem(BEST_STREAK_KEY) || 0) || 0;
    let totalAnswered = 0;
    let totalCorrect = 0;

    let currentTarget = null;
    let currentOptions = [];
    let selectedId = null;
    let locked = false;

    function saveBestStreak() {
        try {
            localStorage.setItem(BEST_STREAK_KEY, String(bestStreak));
        } catch {
            // Ignorar errores de almacenamiento
        }
    }

    function nextQuestion() {
        locked = false;
        selectedId = null;

        if (usedTargetIds.size >= validPool.length) {
            usedTargetIds.clear();
        }

        const available = validPool.filter(c => !usedTargetIds.has(c.id));
        const target = available[Math.floor(Math.random() * available.length)];
        usedTargetIds.add(target.id);
        currentTarget = target;

        // Elegir 3 distractores cuyo Don sea distinto al del objetivo
        const targetQuirkNorm = normalize(target.quirkName);
        const distractorsPool = shuffle(
            validPool.filter(c => c.id !== target.id && normalize(c.quirkName) !== targetQuirkNorm)
        );

        const chosenDistractors = [];
        const usedQuirks = new Set([targetQuirkNorm]);

        for (const cand of distractorsPool) {
            const qn = normalize(cand.quirkName);
            if (!usedQuirks.has(qn)) {
                chosenDistractors.push(cand);
                usedQuirks.add(qn);
            }
            if (chosenDistractors.length === 3) break;
        }

        currentOptions = shuffle([target, ...chosenDistractors]);
        renderQuestion();
    }

    function renderShell() {
        container.innerHTML = `
            <div class="w-full max-w-3xl mx-auto px-3 sm:px-4 pb-12">
                <!-- Barra superior -->
                <div class="flex flex-wrap items-center justify-between gap-2 mb-4 bg-black/50 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-gray-800">
                    <button type="button" data-action="back" class="text-gray-300 hover:text-white flex items-center gap-1.5 font-bold uppercase text-xs sm:text-sm tracking-wider transition px-2.5 py-2 rounded-lg hover:bg-white/10 min-h-[40px] cursor-pointer">
                        <span>←</span><span>Volver</span>
                    </button>

                    <div class="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                        <span id="qm-streak" class="font-hero text-base sm:text-lg text-purple-300 tracking-wider bg-purple-500/15 border border-purple-500/40 px-2.5 py-1 rounded">
                            🔥 RACHA: 0
                        </span>
                        <span id="qm-best" class="font-hero text-base sm:text-lg text-amber-300 tracking-wider bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded">
                            🏆 RÉCORD: ${bestStreak}
                        </span>
                    </div>
                </div>

                <!-- Tarjeta principal -->
                <div class="bg-gray-900/90 backdrop-blur border-2 border-purple-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl">
                    <div class="text-center mb-5">
                        <span class="inline-block text-[11px] font-bold uppercase tracking-widest text-purple-300 bg-purple-500/15 border border-purple-500/30 px-3 py-1 rounded-full mb-2">
                            ¿A quién pertenece este Don?
                        </span>
                        <div class="bg-gray-950/90 border-2 border-purple-400/50 rounded-2xl px-4 py-5 sm:py-6 shadow-inner">
                            <h1 id="qm-quirk-title" class="font-hero text-3xl sm:text-5xl text-white tracking-wider drop-shadow-[0_2px_10px_rgba(168,85,247,0.45)]">
                                ...
                            </h1>
                        </div>
                    </div>

                    <!-- 4 opciones de personajes -->
                    <div id="qm-options" class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"></div>

                    <!-- Feedback y botón siguiente -->
                    <div id="qm-feedback" class="hidden mt-5 rounded-xl p-4 text-center border"></div>

                    <!-- Pie con precisión -->
                    <div class="mt-5 pt-3.5 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
                        <span id="qm-accuracy">Aciertos: 0 / 0</span>
                        <span>Pulsa <kbd class="px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-gray-300">1-4</kbd> o haz clic</span>
                    </div>
                </div>
            </div>
        `;

        container.querySelector('[data-action="back"]').addEventListener('click', () => {
            if (onExit) onExit();
            else location.hash = '#/mha';
        }, { signal });

        // Soporte rápido por teclado (teclas 1, 2, 3, 4 y Enter/Espacio para siguiente)
        document.addEventListener('keydown', (e) => {
            if (!locked && ['1', '2', '3', '4'].includes(e.key)) {
                const idx = Number(e.key) - 1;
                if (currentOptions[idx]) handlePick(currentOptions[idx].id);
            } else if (locked && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                nextQuestion();
            }
        }, { signal });
    }

    function handlePick(pickedId) {
        if (locked || !currentTarget) return;
        locked = true;
        selectedId = pickedId;
        totalAnswered += 1;

        const isCorrect = pickedId === currentTarget.id;
        if (isCorrect) {
            totalCorrect += 1;
            streak += 1;
            if (streak > bestStreak) {
                bestStreak = streak;
                saveBestStreak();
            }
        } else {
            streak = 0;
        }

        renderQuestion();
    }

    function renderQuestion() {
        if (!currentTarget) return;

        container.querySelector('#qm-quirk-title').textContent = currentTarget.quirkName;
        container.querySelector('#qm-streak').textContent = `🔥 RACHA: ${streak}`;
        container.querySelector('#qm-best').textContent = `🏆 RÉCORD: ${bestStreak}`;
        container.querySelector('#qm-accuracy').textContent = `Aciertos: ${totalCorrect} / ${totalAnswered}`;

        const optionsHost = container.querySelector('#qm-options');
        optionsHost.innerHTML = currentOptions.map((c, idx) => {
            let cardCls = 'border-gray-700 bg-gray-950/90 hover:border-purple-400 hover:-translate-y-1 cursor-pointer';
            let badgeHtml = `<span class="absolute top-2 left-2 w-6 h-6 rounded-md bg-black/75 border border-gray-700 text-[11px] font-bold text-gray-300 flex items-center justify-center">${idx + 1}</span>`;

            if (locked) {
                if (c.id === currentTarget.id) {
                    cardCls = 'border-emerald-400 bg-emerald-950/60 ring-2 ring-emerald-400/50 cursor-default';
                    badgeHtml = `<span class="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-extrabold uppercase">✓ Correcto</span>`;
                } else if (c.id === selectedId) {
                    cardCls = 'border-red-500 bg-red-950/60 opacity-95 cursor-default';
                    badgeHtml = `<span class="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-extrabold uppercase">✗ Tu elección</span>`;
                } else {
                    cardCls = 'border-gray-800 bg-gray-950/50 opacity-45 cursor-default';
                }
            }

            return `
                <button
                    type="button"
                    data-option-id="${esc(c.id)}"
                    ${locked ? 'disabled' : ''}
                    class="group relative rounded-2xl overflow-hidden border-2 transition-all duration-200 flex flex-col text-left shadow-lg ${cardCls}"
                >
                    ${badgeHtml}
                    <div class="aspect-square w-full bg-gray-900 overflow-hidden">
                        <img
                            src="${getCharacterImage(c.id)}"
                            alt="${esc(c.heroName)}"
                            class="w-full h-full object-cover object-top ${locked ? '' : 'group-hover:scale-105'} transition-transform duration-300"
                        >
                    </div>
                    <div class="p-2.5 flex-1 flex flex-col justify-center">
                        <div class="text-xs sm:text-sm font-bold text-white leading-tight line-clamp-1">${esc(c.heroName)}</div>
                        <div class="text-[11px] text-gray-400 truncate mt-0.5">${esc(c.realName)}</div>
                    </div>
                </button>
            `;
        }).join('');

        if (!locked) {
            optionsHost.querySelectorAll('[data-option-id]').forEach(btn => {
                btn.addEventListener('click', () => handlePick(btn.dataset.optionId), { signal });
            });
        }

        const feedbackBox = container.querySelector('#qm-feedback');
        if (!locked) {
            feedbackBox.classList.add('hidden');
        } else {
            const won = selectedId === currentTarget.id;
            feedbackBox.classList.remove('hidden');
            feedbackBox.className = `mt-5 rounded-xl p-4 text-center border ${
                won
                    ? 'bg-emerald-950/60 border-emerald-500/60'
                    : 'bg-red-950/60 border-red-500/60'
            }`;

            feedbackBox.innerHTML = `
                <div class="font-hero text-2xl sm:text-3xl tracking-wider ${won ? 'text-emerald-300' : 'text-red-300'}">
                    ${won ? '¡CORRECTO!' : '¡INCORRECTO!'}
                </div>
                <p class="text-xs sm:text-sm text-gray-200 mt-1">
                    <strong>${esc(currentTarget.quirkName)}</strong> es el Don de <strong>${esc(currentTarget.heroName)}</strong> (${esc(currentTarget.realName)}).
                </p>
                <button type="button" id="qm-next-btn" class="mt-3 btn-comic bg-purple-500 hover:bg-purple-400 text-white font-hero text-xl px-6 py-2 rounded-xl tracking-wider cursor-pointer">
                    SIGUIENTE DON →
                </button>
            `;

            feedbackBox.querySelector('#qm-next-btn').addEventListener('click', nextQuestion, { signal });
        }
    }

    renderShell();
    nextQuestion();

    return {
        cleanup() {
            ac.abort();
        },
        hasProgress() {
            return totalAnswered > 0;
        }
    };
}