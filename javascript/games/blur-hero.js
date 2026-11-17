import { CHARACTERS } from '../data/mha-characters.js';

const getCharacterImage = (id) => `images/mha_characters/${id}.webp`;

// Niveles de desenfoque y zoom para los 5 intentos
const BLUR_STEPS = [
    { blur: 28, scale: 1.22 },
    { blur: 18, scale: 1.16 },
    { blur: 11, scale: 1.11 },
    { blur: 5,  scale: 1.06 },
    { blur: 2,  scale: 1.02 }
];

const MAX_ATTEMPTS = 5;
const DAILY_STORAGE_KEY = 'multinao_mha_blur_daily_v1';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[m]));

const normalize = (s) => String(s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

function getTodayKey() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function getDailyCharacter() {
    const key = getTodayKey();
    let hash = 2166136261;
    for (let i = 0; i < key.length; i++) {
        hash ^= key.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    const index = Math.abs(hash) % CHARACTERS.length;
    return CHARACTERS[index];
}

export function mountBlurHeroGame(container, { mode = 'infinite', onExit } = {}) {
    const ac = new AbortController();
    const { signal } = ac;

    let currentMode = mode === 'daily' ? 'daily' : 'infinite';
    let usedInfiniteIds = new Set();
    let highlightedIndex = -1;
    let filteredList = [];
    let renderToken = 0;
    let cachedImg = null;
    let cachedCharId = null;

    let state = {
        target: null,
        guesses: [],
        status: 'playing' // 'playing' | 'won' | 'lost'
    };

    function loadDailyState() {
        try {
            const raw = localStorage.getItem(DAILY_STORAGE_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (parsed.date !== getTodayKey()) return null;
            const target = CHARACTERS.find(c => c.id === parsed.targetId);
            if (!target) return null;
            const guesses = (parsed.guessIds || [])
                .map(id => CHARACTERS.find(c => c.id === id))
                .filter(Boolean);
            return {
                target,
                guesses,
                status: parsed.status || 'playing'
            };
        } catch {
            return null;
        }
    }

    function saveDailyState() {
        if (currentMode !== 'daily' || !state.target) return;
        try {
            localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify({
                date: getTodayKey(),
                targetId: state.target.id,
                guessIds: state.guesses.map(g => g.id),
                status: state.status
            }));
        } catch {
            // Ignorar errores de almacenamiento
        }
    }

    function pickInfiniteCharacter() {
        if (usedInfiniteIds.size >= CHARACTERS.length) {
            usedInfiniteIds.clear();
        }
        const pool = CHARACTERS.filter(c => !usedInfiniteIds.has(c.id));
        const chosen = pool[Math.floor(Math.random() * pool.length)];
        usedInfiniteIds.add(chosen.id);
        return chosen;
    }

    function startRound(newMode = currentMode) {
        currentMode = newMode;
        highlightedIndex = -1;
        filteredList = [];

        if (currentMode === 'daily') {
            const saved = loadDailyState();
            if (saved) {
                state = saved;
                renderAll();
                return;
            }
            state = {
                target: getDailyCharacter(),
                guesses: [],
                status: 'playing'
            };
            saveDailyState();
        } else {
            state = {
                target: pickInfiniteCharacter(),
                guesses: [],
                status: 'playing'
            };
        }
        renderAll();
    }

    function renderShell() {
        container.innerHTML = `
            <div class="w-full max-w-2xl mx-auto px-3 sm:px-4 pb-12">
                <!-- Barra superior -->
                <div class="flex flex-wrap items-center justify-between gap-2 mb-4 bg-black/50 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-gray-800">
                    <button type="button" data-action="back" class="text-gray-300 hover:text-white flex items-center gap-1.5 font-bold uppercase text-xs sm:text-sm tracking-wider transition px-2.5 py-2 rounded-lg hover:bg-white/10 min-h-[40px] cursor-pointer">
                        <span>←</span><span>Volver</span>
                    </button>

                    <div class="flex items-center bg-gray-900 border border-gray-700 rounded-lg p-0.5 text-xs" role="group" aria-label="Modo de juego">
                        <button type="button" data-mode="infinite" class="px-3 py-1.5 rounded font-bold uppercase tracking-wider transition cursor-pointer">
                            ♾️ Infinito
                        </button>
                        <button type="button" data-mode="daily" class="px-3 py-1.5 rounded font-bold uppercase tracking-wider transition cursor-pointer">
                            📅 Diario
                        </button>
                    </div>

                    <div class="flex items-center gap-2">
                        <span id="bh-attempts-badge" class="font-hero text-base sm:text-lg text-yellow-400 tracking-wider bg-yellow-500/10 border border-yellow-500/40 px-2.5 py-1 rounded">
                            INTENTO 1/${MAX_ATTEMPTS}
                        </span>
                    </div>
                </div>

                <!-- Tarjeta principal -->
                <div class="bg-gray-900/90 backdrop-blur border-2 border-yellow-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl">
                    <div class="text-center mb-4">
                        <h1 class="font-hero text-2xl sm:text-4xl text-white tracking-wider">BLUR HERO</h1>
                        <p class="text-xs sm:text-sm text-gray-300 mt-1">
                            Adivina el personaje borroso en máximo 5 intentos. Cada fallo aclara la foto.
                        </p>
                    </div>

                    <!-- Visor canvas borroso (nunca expone el img nítido en el DOM) -->
                    <div class="flex flex-col items-center">
                        <div id="bh-frame" class="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-gray-700 bg-gray-950 shadow-inner select-none">
                            <canvas
                                id="bh-canvas"
                                width="512"
                                height="512"
                                aria-label="Personaje oculto"
                                class="w-full h-full block pointer-events-none"
                            ></canvas>
                            <div id="bh-blur-tag" class="absolute bottom-2 right-2 bg-black/75 backdrop-blur-sm text-[11px] font-bold text-yellow-300 px-2.5 py-1 rounded-lg border border-yellow-500/30">
                                Nitidez: 20%
                            </div>
                        </div>

                        <!-- Barra de progreso de intentos -->
                        <div id="bh-pips" class="flex items-center gap-2 mt-4" aria-label="Intentos utilizados"></div>
                    </div>

                    <!-- Buscador / Input -->
                    <div id="bh-controls" class="mt-5 relative">
                        <label for="bh-input" class="sr-only">Escribe el nombre del personaje</label>
                        <div class="relative">
                            <input
                                type="text"
                                id="bh-input"
                                autocomplete="off"
                                placeholder="Escribe el nombre de héroe o real (ej. Deku, Bakugo...)"
                                class="w-full bg-gray-950 border-2 border-gray-700 focus:border-yellow-400 rounded-xl px-3.5 py-3 text-sm text-white placeholder-gray-500 outline-none transition"
                            >
                            <div id="bh-dropdown" class="hidden absolute left-0 right-0 top-full mt-1.5 max-h-60 overflow-y-auto bg-gray-950 border border-gray-700 rounded-xl shadow-2xl z-30 divide-y divide-gray-800/80"></div>
                        </div>
                    </div>

                    <!-- Panel de resultado final -->
                    <div id="bh-result" class="hidden mt-5 rounded-xl p-4 sm:p-5 text-center border"></div>

                    <!-- Historial de intentos -->
                    <div id="bh-history-wrap" class="hidden mt-5 pt-4 border-t border-gray-800">
                        <h2 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">Intentos anteriores</h2>
                        <div id="bh-history" class="space-y-2"></div>
                    </div>
                </div>
            </div>
        `;

        container.querySelector('[data-action="back"]').addEventListener('click', () => {
            if (onExit) onExit();
            else location.hash = '#/mha';
        }, { signal });

        container.querySelectorAll('[data-mode]').forEach(btn => {
            btn.addEventListener('click', () => {
                const selected = btn.dataset.mode;
                if (selected !== currentMode) startRound(selected);
            }, { signal });
        });

        const input = container.querySelector('#bh-input');
        const dropdown = container.querySelector('#bh-dropdown');

        input.addEventListener('input', () => {
            highlightedIndex = -1;
            updateDropdown(input.value);
        }, { signal });

        input.addEventListener('focus', () => {
            if (input.value.trim().length > 0) updateDropdown(input.value);
        }, { signal });

        input.addEventListener('keydown', (e) => {
            if (state.status !== 'playing') return;

            if (e.key === 'ArrowDown') {
                if (filteredList.length === 0) return;
                e.preventDefault();
                highlightedIndex = (highlightedIndex + 1) % filteredList.length;
                renderDropdownItems();
            } else if (e.key === 'ArrowUp') {
                if (filteredList.length === 0) return;
                e.preventDefault();
                highlightedIndex = (highlightedIndex - 1 + filteredList.length) % filteredList.length;
                renderDropdownItems();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (highlightedIndex >= 0 && filteredList[highlightedIndex]) {
                    submitGuess(filteredList[highlightedIndex]);
                } else if (filteredList.length === 1) {
                    submitGuess(filteredList[0]);
                }
            } else if (e.key === 'Escape') {
                dropdown.classList.add('hidden');
            }
        }, { signal });

        document.addEventListener('click', (e) => {
            if (!container.contains(e.target) || (!input.contains(e.target) && !dropdown.contains(e.target))) {
                dropdown.classList.add('hidden');
            }
        }, { signal });
    }

    function updateDropdown(query) {
        const dropdown = container.querySelector('#bh-dropdown');
        const q = normalize(query);
        if (!q || state.status !== 'playing') {
            filteredList = [];
            dropdown.classList.add('hidden');
            return;
        }

        const guessedIds = new Set(state.guesses.map(g => g.id));
        filteredList = CHARACTERS
            .filter(c => !guessedIds.has(c.id))
            .filter(c => normalize(c.heroName).includes(q) || normalize(c.realName).includes(q))
            .slice(0, 8);

        renderDropdownItems();
    }

    function renderDropdownItems() {
        const dropdown = container.querySelector('#bh-dropdown');
        if (filteredList.length === 0) {
            dropdown.innerHTML = `<div class="px-3.5 py-2.5 text-xs text-gray-400">No se encontraron personajes disponibles</div>`;
            dropdown.classList.remove('hidden');
            return;
        }

        dropdown.innerHTML = filteredList.map((c, idx) => `
            <button
                type="button"
                data-pick-id="${esc(c.id)}"
                class="w-full flex items-center gap-3 px-3 py-2 text-left transition cursor-pointer ${
                    idx === highlightedIndex ? 'bg-yellow-500/20 text-white' : 'hover:bg-gray-800/90 text-gray-200'
                }"
            >
                <img
                    src="${getCharacterImage(c.id)}"
                    alt="${esc(c.heroName)}"
                    class="w-10 h-10 rounded-full object-cover object-top bg-gray-900 border border-white/15 shrink-0"
                >
                <div class="min-w-0 flex-1">
                    <div class="text-sm font-bold text-white truncate">${esc(c.heroName)}</div>
                    <div class="text-[11px] text-gray-400 truncate">${esc(c.realName)}</div>
                </div>
                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700 shrink-0">
                    ${esc(c.role || 'MHA')}
                </span>
            </button>
        `).join('');

        dropdown.classList.remove('hidden');

        dropdown.querySelectorAll('[data-pick-id]').forEach(btn => {
            btn.addEventListener('click', () => {
                const chosen = CHARACTERS.find(c => c.id === btn.dataset.pickId);
                if (chosen) submitGuess(chosen);
            }, { signal });
        });
    }

    function submitGuess(character) {
        if (state.status !== 'playing' || !character) return;
        if (state.guesses.some(g => g.id === character.id)) return;

        state.guesses.push(character);

        if (character.id === state.target.id) {
            state.status = 'won';
        } else if (state.guesses.length >= MAX_ATTEMPTS) {
            state.status = 'lost';
        }

        const input = container.querySelector('#bh-input');
        const dropdown = container.querySelector('#bh-dropdown');
        if (input) input.value = '';
        if (dropdown) dropdown.classList.add('hidden');
        filteredList = [];
        highlightedIndex = -1;

        saveDailyState();
        renderAll();
    }

    function drawBlurredOnCanvas(canvas, img, blurPx, scale) {
        const w = canvas.width;
        const h = canvas.height;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, w, h);

        // Fondo oscuro base para que los bordes del blur no queden transparentes
        ctx.fillStyle = '#030712';
        ctx.fillRect(0, 0, w, h);

        if (!img || !img.naturalWidth) return;

        // Simular object-cover + object-top
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const srcRatio = iw / ih;
        const dstRatio = w / h;

        let sx = 0, sy = 0, sw = iw, sh = ih;
        if (srcRatio > dstRatio) {
            sw = ih * dstRatio;
            sx = (iw - sw) / 2;
        } else {
            sh = iw / dstRatio;
            sy = 0; // object-top
        }

        // Aplicar zoom centrado + desenfoque en píxeles
        const dw = w * scale;
        const dh = h * scale;
        const dx = (w - dw) / 2;
        const dy = (h - dh) / 2;

        ctx.save();
        // Escalamos el radio de blur acorde a los 512px del canvas
        const scaledBlur = Math.round(blurPx * 2);
        ctx.filter = scaledBlur > 0 ? `blur(${scaledBlur}px)` : 'none';
        ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
        ctx.restore();
    }

    function loadOffscreenImage(id) {
        if (cachedCharId === id && cachedImg) {
            return Promise.resolve(cachedImg);
        }
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                cachedCharId = id;
                cachedImg = img;
                resolve(img);
            };
            img.onerror = () => resolve(null);
            img.src = getCharacterImage(id);
        });
    }

    async function syncTargetCanvas(target) {
        const canvas = container.querySelector('#bh-canvas');
        const blurTag = container.querySelector('#bh-blur-tag');
        const frame = container.querySelector('#bh-frame');

        let blurPx = 0;
        let scale = 1;

        if (state.status !== 'playing') {
            blurPx = 0;
            scale = 1;
            blurTag.textContent = 'Nitidez: 100%';
            frame.style.borderColor = state.status === 'won' ? '#10b981' : '#ef4444';
        } else {
            const stepIdx = Math.min(state.guesses.length, BLUR_STEPS.length - 1);
            const step = BLUR_STEPS[stepIdx];
            const clarityPct = (stepIdx + 1) * 20;
            blurPx = step.blur;
            scale = step.scale;
            blurTag.textContent = `Nitidez: ${clarityPct}%`;
            frame.style.borderColor = '#374151';
        }

        const token = ++renderToken;

        // Si cambió de personaje, limpiar el canvas inmediatamente antes de cargar la nueva imagen
        if (cachedCharId !== target.id) {
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#030712';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        const img = await loadOffscreenImage(target.id);
        if (token !== renderToken) return;

        drawBlurredOnCanvas(canvas, img, blurPx, scale);
    }

    function renderAll() {
        const target = state.target;
        if (!target) return;

        container.querySelectorAll('[data-mode]').forEach(btn => {
            const active = btn.dataset.mode === currentMode;
            btn.className = `px-3 py-1.5 rounded font-bold uppercase tracking-wider transition cursor-pointer ${
                active ? 'bg-yellow-400 text-black' : 'text-gray-400 hover:text-white'
            }`;
        });

        const attemptNum = Math.min(state.guesses.length + 1, MAX_ATTEMPTS);
        const badge = container.querySelector('#bh-attempts-badge');
        if (state.status === 'won') {
            badge.textContent = `ACERTADO (${state.guesses.length}/${MAX_ATTEMPTS})`;
            badge.className = 'font-hero text-base sm:text-lg text-emerald-300 tracking-wider bg-emerald-500/15 border border-emerald-500/40 px-2.5 py-1 rounded';
        } else if (state.status === 'lost') {
            badge.textContent = `SIN INTENTOS (${MAX_ATTEMPTS}/${MAX_ATTEMPTS})`;
            badge.className = 'font-hero text-base sm:text-lg text-red-300 tracking-wider bg-red-500/15 border border-red-500/40 px-2.5 py-1 rounded';
        } else {
            badge.textContent = `INTENTO ${attemptNum}/${MAX_ATTEMPTS}`;
            badge.className = 'font-hero text-base sm:text-lg text-yellow-400 tracking-wider bg-yellow-500/10 border border-yellow-500/40 px-2.5 py-1 rounded';
        }

        syncTargetCanvas(target);

        const pipsHost = container.querySelector('#bh-pips');
        pipsHost.innerHTML = Array.from({ length: MAX_ATTEMPTS }, (_, i) => {
            const g = state.guesses[i];
            let cls = 'bg-gray-800 border-gray-700';
            if (g) {
                cls = g.id === target.id
                    ? 'bg-emerald-500 border-emerald-300 shadow shadow-emerald-500/50'
                    : 'bg-red-500 border-red-300';
            } else if (i === state.guesses.length && state.status === 'playing') {
                cls = 'bg-yellow-400/30 border-yellow-400 animate-pulse';
            }
            return `<span class="w-8 sm:w-10 h-2.5 rounded-full border ${cls} transition-all"></span>`;
        }).join('');

        const controls = container.querySelector('#bh-controls');
        const resultBox = container.querySelector('#bh-result');

        if (state.status === 'playing') {
            controls.classList.remove('hidden');
            resultBox.classList.add('hidden');
        } else {
            controls.classList.add('hidden');
            resultBox.classList.remove('hidden');

            const won = state.status === 'won';
            resultBox.className = `mt-5 rounded-xl p-4 sm:p-5 text-center border ${
                won
                    ? 'bg-emerald-950/60 border-emerald-500/60'
                    : 'bg-red-950/60 border-red-500/60'
            }`;

            resultBox.innerHTML = `
                <div class="font-hero text-2xl sm:text-3xl tracking-wider ${won ? 'text-emerald-300' : 'text-red-300'}">
                    ${won ? `¡CORRECTO EN ${state.guesses.length} ${state.guesses.length === 1 ? 'INTENTO' : 'INTENTOS'}!` : '¡SE ACABARON LOS INTENTOS!'}
                </div>
                <div class="mt-2">
                    <span class="text-lg sm:text-xl font-bold text-white block">${esc(target.heroName)}</span>
                    <span class="text-xs text-gray-300">${esc(target.realName)} • Don: ${esc(target.quirkName)}</span>
                </div>
                <div class="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                    ${currentMode === 'infinite' ? `
                        <button type="button" id="bh-next-btn" class="btn-comic bg-yellow-400 hover:bg-yellow-300 text-black font-hero text-xl px-6 py-2.5 rounded-xl tracking-wider cursor-pointer">
                            SIGUIENTE PERSONAJE →
                        </button>
                    ` : `
                        <button type="button" id="bh-switch-inf" class="btn-comic bg-yellow-400 hover:bg-yellow-300 text-black font-hero text-xl px-6 py-2.5 rounded-xl tracking-wider cursor-pointer">
                            JUGAR MODO INFINITO
                        </button>
                    `}
                </div>
            `;

            const nextBtn = resultBox.querySelector('#bh-next-btn');
            if (nextBtn) {
                nextBtn.addEventListener('click', () => startRound('infinite'), { signal });
            }
            const switchBtn = resultBox.querySelector('#bh-switch-inf');
            if (switchBtn) {
                switchBtn.addEventListener('click', () => startRound('infinite'), { signal });
            }
        }

        const historyWrap = container.querySelector('#bh-history-wrap');
        const historyHost = container.querySelector('#bh-history');

        if (state.guesses.length === 0) {
            historyWrap.classList.add('hidden');
        } else {
            historyWrap.classList.remove('hidden');
            historyHost.innerHTML = state.guesses.map((g, idx) => {
                const isMatch = g.id === target.id;
                return `
                    <div class="flex items-center justify-between gap-2.5 rounded-xl px-3 py-2 border ${
                        isMatch
                            ? 'bg-emerald-950/50 border-emerald-500/60'
                            : 'bg-red-950/30 border-red-500/40'
                    }">
                        <div class="flex items-center gap-2.5 min-w-0">
                            <span class="text-xs font-bold text-gray-400 w-5">#${idx + 1}</span>
                            <img src="${getCharacterImage(g.id)}" alt="" class="w-8 h-8 rounded-full object-cover object-top bg-gray-900 border border-white/15 shrink-0">
                            <div class="min-w-0">
                                <div class="text-xs sm:text-sm font-bold text-white truncate">${esc(g.heroName)}</div>
                                <div class="text-[11px] text-gray-400 truncate">${esc(g.realName)}</div>
                            </div>
                        </div>
                        <span class="text-xs font-extrabold uppercase px-2.5 py-1 rounded-full shrink-0 ${
                            isMatch ? 'bg-emerald-600 text-white' : 'bg-red-600/80 text-white'
                        }">
                            ${isMatch ? '✓ Correcto' : '✗ Fallo'}
                        </span>
                    </div>
                `;
            }).join('');
        }
    }

    renderShell();
    startRound(currentMode);

    return {
        cleanup() {
            ac.abort();
        },
        hasProgress() {
            return state.status === 'playing' && state.guesses.length > 0;
        }
    };
}