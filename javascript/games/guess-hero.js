import { CHARACTERS, DEBUT_ARCS } from '../data/mha-characters.js';

const STORAGE_STATE = 'guess_hero_state_v1';
const STORAGE_STATS = 'guess_hero_stats_v1';

const esc = (s) => String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
const getHeroImage = (id) => `images/mha_characters/${id}.webp`;

function getDayNumber() {
    const now = new Date();
    const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.floor(utc / 86400000);
}

function getDailyHero(dayNum) {
    let x = ((dayNum + 41) * 2654435761) >>> 0;
    x ^= x >>> 16;
    x = Math.imul(x, 0x85ebca6b) >>> 0;
    x ^= x >>> 13;
    return CHARACTERS[x % CHARACTERS.length];
}

function formatHeight(cm) {
    return `${(cm / 100).toFixed(2)} m`;
}

function formatArcName(arcNum) {
    const raw = DEBUT_ARCS[arcNum] || `Arco ${arcNum}`;
    return raw.replace(/^\d+\.\s*/, '');
}

function loadStats() {
    try {
        const raw = JSON.parse(localStorage.getItem(STORAGE_STATS) || 'null');
        if (raw && typeof raw === 'object') {
            return {
                played: Number(raw.played) || 0,
                won: Number(raw.won) || 0,
                streak: Number(raw.streak) || 0,
                maxStreak: Number(raw.maxStreak) || 0,
                lastDailyWon: Number(raw.lastDailyWon) || 0
            };
        }
    } catch { /* ignore */ }
    return { played: 0, won: 0, streak: 0, maxStreak: 0, lastDailyWon: 0 };
}

function saveStats(stats) {
    try { localStorage.setItem(STORAGE_STATS, JSON.stringify(stats)); } catch { /* ignore */ }
}

function loadSavedState(today) {
    try {
        const raw = JSON.parse(localStorage.getItem(STORAGE_STATE) || 'null');
        if (raw && raw.day === today && Array.isArray(raw.guesses)) {
            const secret = CHARACTERS.find(c => c.id === raw.secretId);
            const guesses = raw.guesses.map(id => CHARACTERS.find(c => c.id === id)).filter(Boolean);
            if (secret) {
                return {
                    isDaily: true,
                    day: today,
                    secret,
                    guesses,
                    won: Boolean(raw.won),
                    gaveUp: Boolean(raw.gaveUp)
                };
            }
        }
    } catch { /* ignore */ }
    return null;
}

function persistDailyState(state) {
    if (!state.isDaily) return;
    try {
        localStorage.setItem(STORAGE_STATE, JSON.stringify({
            day: state.day,
            secretId: state.secret.id,
            guesses: state.guesses.map(g => g.id),
            won: state.won,
            gaveUp: state.gaveUp
        }));
    } catch { /* ignore */ }
}

function compareExact(guessVal, secretVal) {
    return {
        status: guessVal === secretVal ? 'correct' : 'wrong',
        text: guessVal
    };
}

function compareArray(guessArr, secretArr) {
    const gSet = new Set(guessArr);
    const tSet = new Set(secretArr);
    const isExact = gSet.size === tSet.size && [...gSet].every(x => tSet.has(x));
    let status = 'wrong';
    if (isExact) status = 'correct';
    else if ([...gSet].some(x => tSet.has(x))) status = 'partial';
    return {
        status,
        text: guessArr.join(' / ')
    };
}

function compareNumber(guessNum, secretNum, formatter) {
    if (guessNum === secretNum) {
        return { status: 'correct', text: formatter(guessNum) };
    }
    const arrow = guessNum < secretNum ? '↑' : '↓';
    return {
        status: 'wrong',
        text: `${formatter(guessNum)} ${arrow}`
    };
}

function evaluateGuess(guess, secret) {
    return {
        gender:      compareExact(guess.gender, secret.gender),
        roles:       compareArray(guess.roles, secret.roles),
        affiliation: compareArray(guess.affiliations, secret.affiliations),
        quirkTypes:  compareArray(guess.quirkTypes, secret.quirkTypes),
        height:      compareNumber(guess.height, secret.height, formatHeight),
        debutArc:    compareNumber(guess.debutArc, secret.debutArc, formatArcName)
    };
}

function matchScore(char, q) {
    const hero = norm(char.heroName || char.name || '');
    const real = norm(char.realName || '');
    if (hero.startsWith(q)) return 0;
    if (real.startsWith(q)) return 1;
    const wordStart = (s) => s.split(/[\s.\-()]+/).some(w => w.startsWith(q));
    if (wordStart(hero) || wordStart(real)) return 2;
    if (hero.includes(q) || real.includes(q)) return 3;
    return -1;
}

export function mountGuessHeroGame(container, options = {}, legacyOnController = () => {}) {
    const onExit = typeof options === 'function' ? options : options.onExit;
    const ac = new AbortController();
    const { signal } = ac;
    const today = getDayNumber();

    let giveUpTimer = null;
    let activeIndex = -1;
    let stats = loadStats();
    let state = loadSavedState(today) || {
        isDaily: true,
        day: today,
        secret: getDailyHero(today),
        guesses: [],
        won: false,
        gaveUp: false
    };

    const isFinished = () => state.won || state.gaveUp;
    const getHeroDisplayName = (c) => c.heroName || c.name || 'Desconocido';

    function newInfiniteGame(excludeId) {
        clearGiveUpConfirm();
        const pool = CHARACTERS.filter(c => c.id !== excludeId);
        const secret = pool[Math.floor(Math.random() * pool.length)];
        state = {
            isDaily: false,
            day: today,
            secret,
            guesses: [],
            won: false,
            gaveUp: false
        };
        renderAll();
    }

    function backToDaily() {
        clearGiveUpConfirm();
        state = loadSavedState(today) || {
            isDaily: true,
            day: today,
            secret: getDailyHero(today),
            guesses: [],
            won: false,
            gaveUp: false
        };
        renderAll();
    }

    function clearGiveUpConfirm() {
        clearTimeout(giveUpTimer);
        giveUpTimer = null;
        const btn = container.querySelector('#gh-giveup-btn');
        if (btn) {
            btn.textContent = '🏳️ Rendirme';
            btn.dataset.confirm = '';
        }
    }

    function renderShell() {
        container.innerHTML = `
            <div class="w-full max-w-6xl mx-auto px-3 sm:px-4 pb-12">
                <!-- Barra superior unificada -->
                <div class="flex flex-wrap items-center justify-between gap-2 mb-4 bg-black/50 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-gray-800">
                    <button type="button" data-action="back" class="text-gray-300 hover:text-white flex items-center gap-1.5 font-bold uppercase text-xs sm:text-sm tracking-wider transition px-2.5 py-2 rounded-lg hover:bg-white/10 min-h-[40px] cursor-pointer">
                        <span>←</span><span>Volver</span>
                    </button>

                    <div class="flex items-center gap-2">
                        <span id="gh-mode-badge" class="font-hero text-base sm:text-xl text-emerald-400 tracking-wider bg-emerald-500/10 border border-emerald-500/40 px-3 py-1 rounded">HÉROE DEL DÍA</span>
                        <span class="text-xs font-bold text-gray-300 bg-gray-900 border border-gray-700 px-2.5 py-1 rounded">${CHARACTERS.length} Héroes</span>
                    </div>

                    <div class="flex items-center gap-2 text-xs">
                        <span id="gh-stats-pill" class="bg-gray-900 border border-gray-700 text-gray-200 px-2.5 py-1.5 rounded-lg font-semibold">
                            🔥 Racha: ${stats.streak} • 🏆 ${stats.won}/${stats.played}
                        </span>
                        <button type="button" id="gh-giveup-btn" class="bg-gray-900 hover:bg-rose-950/80 border border-gray-700 hover:border-rose-500/50 text-gray-300 hover:text-rose-200 px-2.5 py-1.5 rounded-lg font-semibold transition cursor-pointer">
                            🏳️ Rendirme
                        </button>
                    </div>
                </div>

                <!-- Panel principal -->
                <div class="relative z-30 bg-gray-900/90 backdrop-blur border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-2xl mb-5">
                    <div class="text-center max-w-xl mx-auto mb-4">
                        <h1 class="font-hero text-3xl sm:text-5xl text-white tracking-wider mb-1">GUESS THE HERO</h1>
                        <p class="text-xs sm:text-sm text-gray-300">Escribe un personaje de My Hero Academia para descubrir pistas por atributo.</p>
                    </div>

                    <!-- Buscador -->
                    <div id="gh-search-wrap" class="relative z-40 max-w-md mx-auto">
                        <label for="gh-input" class="sr-only">Buscar personaje de My Hero Academia</label>
                        <input
                            id="gh-input"
                            type="text"
                            autocomplete="off"
                            spellcheck="false"
                            placeholder="Ej: Deku, Izuku, All Might, Bakugo, Shoto..."
                            role="combobox"
                            aria-expanded="false"
                            aria-controls="gh-listbox"
                            aria-autocomplete="list"
                            class="w-full bg-gray-950 border-2 border-gray-700 focus:border-emerald-400 rounded-xl px-4 py-3 text-sm sm:text-base text-white placeholder-gray-500 outline-none transition"
                        />
                        <ul id="gh-listbox" role="listbox" class="hidden absolute left-0 right-0 mt-1.5 max-h-64 overflow-y-auto bg-gray-950 border border-gray-700 rounded-xl shadow-2xl z-50 divide-y divide-gray-800/80"></ul>
                    </div>

                    <!-- Leyenda de colores compacta -->
                    <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-4 text-xs text-gray-300">
                        <span class="flex items-center gap-1.5"><i class="w-3.5 h-3.5 rounded bg-emerald-600 inline-block"></i> Exacto</span>
                        <span class="flex items-center gap-1.5"><i class="w-3.5 h-3.5 rounded bg-amber-600 inline-block"></i> Parcial</span>
                        <span class="flex items-center gap-1.5"><i class="w-3.5 h-3.5 rounded bg-rose-700 inline-block"></i> Incorrecto</span>
                        <span class="text-gray-400">↑ Más alto / Posterior • ↓ Más bajo / Anterior</span>
                    </div>
                </div>

                <!-- Banner final (victoria o rendición) -->
                <div id="gh-win-box" class="hidden relative z-20 mb-5 bg-gradient-to-r from-emerald-950/90 via-gray-900 to-teal-950/90 border-2 border-emerald-500 rounded-2xl p-5 text-center shadow-2xl"></div>

                <!-- Tabla de intentos -->
                <div class="relative z-10 bg-gray-900/90 border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full min-w-[820px] border-collapse text-center">
                            <thead>
                                <tr class="bg-black/60 border-b border-gray-800 text-[11px] font-bold uppercase tracking-wider text-gray-300">
                                    <th class="py-3 px-2 w-24">Héroe</th>
                                    <th class="py-3 px-2">Género</th>
                                    <th class="py-3 px-2 w-40">Rol</th>
                                    <th class="py-3 px-2 w-40">Afiliación</th>
                                    <th class="py-3 px-2 w-36">Tipo de Don</th>
                                    <th class="py-3 px-2">Altura</th>
                                    <th class="py-3 px-2 w-44">Arco de Debut</th>
                                </tr>
                            </thead>
                            <tbody id="gh-tbody" class="divide-y divide-gray-800/80 text-xs sm:text-[13px]"></tbody>
                        </table>
                    </div>
                    <p id="gh-empty" class="text-center text-gray-400 text-sm py-8">Aún no has hecho ningún intento. ¡Busca un personaje arriba!</p>
                </div>
            </div>
        `;

        container.querySelector('[data-action="back"]').addEventListener('click', () => {
            if (onExit) onExit();
            else location.hash = '#/mha';
        }, { signal });

        const giveUpBtn = container.querySelector('#gh-giveup-btn');
        giveUpBtn.addEventListener('click', () => {
            if (isFinished()) return;
            if (!giveUpBtn.dataset.confirm) {
                giveUpBtn.dataset.confirm = '1';
                giveUpBtn.textContent = '¿Seguro? Pulsa otra vez';
                giveUpTimer = setTimeout(clearGiveUpConfirm, 3000);
                return;
            }
            clearGiveUpConfirm();
            state.gaveUp = true;
            stats.played++;
            if (state.isDaily) stats.streak = 0;
            saveStats(stats);
            if (!state.guesses.some(g => g.id === state.secret.id)) {
                state.guesses.unshift(state.secret);
            }
            persistDailyState(state);
            renderAll();
        }, { signal });

        const input = container.querySelector('#gh-input');
        const listbox = container.querySelector('#gh-listbox');

        input.addEventListener('input', () => {
            activeIndex = -1;
            renderSuggestions(input.value);
        }, { signal });

        input.addEventListener('focus', () => {
            if (input.value.trim()) renderSuggestions(input.value);
        }, { signal });

        input.addEventListener('keydown', (e) => {
            const items = listbox.querySelectorAll('[role="option"]');
            if (e.key === 'ArrowDown') {
                if (!items.length) return;
                e.preventDefault();
                activeIndex = (activeIndex + 1) % items.length;
                highlightOption(items);
            } else if (e.key === 'ArrowUp') {
                if (!items.length) return;
                e.preventDefault();
                activeIndex = (activeIndex - 1 + items.length) % items.length;
                highlightOption(items);
            } else if (e.key === 'Enter') {
                if (items.length) {
                    e.preventDefault();
                    const chosen = items[activeIndex >= 0 ? activeIndex : 0];
                    if (chosen) submitGuessById(chosen.dataset.id);
                }
            } else if (e.key === 'Escape') {
                closeListbox();
            }
        }, { signal });

        document.addEventListener('click', (e) => {
            if (!container.contains(e.target) || !e.target.closest('#gh-search-wrap')) {
                closeListbox();
            }
        }, { signal });
    }

    function highlightOption(items) {
        items.forEach((el, i) => {
            const active = i === activeIndex;
            el.setAttribute('aria-selected', String(active));
            el.classList.toggle('bg-gray-800', active);
            if (active) el.scrollIntoView({ block: 'nearest' });
        });
    }

    function closeListbox() {
        const input = container.querySelector('#gh-input');
        const listbox = container.querySelector('#gh-listbox');
        if (!input || !listbox) return;
        listbox.classList.add('hidden');
        input.setAttribute('aria-expanded', 'false');
        activeIndex = -1;
    }

    function renderSuggestions(rawQuery) {
        const input = container.querySelector('#gh-input');
        const listbox = container.querySelector('#gh-listbox');
        const q = norm(rawQuery);

        if (!q || isFinished()) {
            closeListbox();
            return;
        }

        const usedIds = new Set(state.guesses.map(g => g.id));
        const matches = CHARACTERS
            .map((c, i) => ({ c, i, s: matchScore(c, q) }))
            .filter(x => x.s >= 0 && !usedIds.has(x.c.id))
            .sort((a, b) => a.s - b.s || a.i - b.i)
            .slice(0, 8)
            .map(x => x.c);

        if (!matches.length) {
            listbox.innerHTML = `<li class="px-4 py-3 text-xs text-gray-400">Sin coincidencias en el catálogo</li>`;
            listbox.classList.remove('hidden');
            input.setAttribute('aria-expanded', 'true');
            return;
        }

        listbox.innerHTML = matches.map(c => {
            const displayName = getHeroDisplayName(c);
            return `
                <li role="option" aria-selected="false" data-id="${esc(c.id)}"
                    class="flex items-center gap-3 px-3.5 py-2.5 hover:bg-gray-800 cursor-pointer transition">
                    <img src="${getHeroImage(c.id)}" alt="" class="w-9 h-9 rounded-full object-cover object-top bg-gray-900 border border-white/15 shrink-0">
                    <div class="min-w-0">
                        <span class="text-sm font-bold text-white block truncate">${esc(displayName)}</span>
                        <span class="text-xs text-gray-400 block truncate">${esc(c.realName || '')}</span>
                    </div>
                </li>
            `;
        }).join('');

        listbox.querySelectorAll('[role="option"]').forEach(li => {
            li.addEventListener('click', () => submitGuessById(li.dataset.id), { signal });
        });

        listbox.classList.remove('hidden');
        input.setAttribute('aria-expanded', 'true');
    }

    function submitGuessById(id) {
        if (isFinished()) return;
        const char = CHARACTERS.find(c => String(c.id) === String(id));
        if (!char || state.guesses.some(g => String(g.id) === String(id))) return;

        clearGiveUpConfirm();
        state.guesses.unshift(char);
        const input = container.querySelector('#gh-input');
        input.value = '';
        closeListbox();

        if (String(char.id) === String(state.secret.id)) {
            state.won = true;
            stats.played++;
            stats.won++;
            if (state.isDaily) {
                stats.streak = stats.lastDailyWon === today - 1 ? stats.streak + 1 : 1;
                stats.lastDailyWon = today;
            } else {
                stats.streak++;
            }
            stats.maxStreak = Math.max(stats.maxStreak, stats.streak);
            saveStats(stats);
        }

        persistDailyState(state);
        renderAll();
    }

    function cellClass(status) {
        if (status === 'correct') return 'bg-emerald-600/90 border-emerald-400/50 text-white';
        if (status === 'partial') return 'bg-amber-600/90 border-amber-400/50 text-white';
        return 'bg-rose-800/85 border-rose-500/40 text-white';
    }

    function renderAll() {
        container.querySelector('#gh-mode-badge').textContent = state.isDaily ? 'HÉROE DEL DÍA' : 'MODO INFINITO';
        container.querySelector('#gh-stats-pill').textContent = `🔥 Racha: ${stats.streak} • 🏆 ${stats.won}/${stats.played}`;

        const giveUpBtn = container.querySelector('#gh-giveup-btn');
        giveUpBtn.classList.toggle('hidden', isFinished());

        const secretName = getHeroDisplayName(state.secret);
        const input = container.querySelector('#gh-input');
        input.disabled = isFinished();
        if (state.won) {
            input.placeholder = `¡Adivinado en ${state.guesses.length} intento${state.guesses.length === 1 ? '' : 's'}!`;
        } else if (state.gaveUp) {
            input.placeholder = `Partida finalizada • Era ${secretName}`;
        } else {
            input.placeholder = 'Ej: Deku, Izuku, All Might, Bakugo, Shoto...';
        }

        const winBox = container.querySelector('#gh-win-box');
        if (isFinished()) {
            const attempts = state.won ? state.guesses.length : Math.max(0, state.guesses.length - 1);
            winBox.classList.remove('hidden');
            winBox.className = `relative z-20 mb-5 bg-gradient-to-r ${
                state.won
                    ? 'from-emerald-950/90 via-gray-900 to-teal-950/90 border-emerald-500'
                    : 'from-rose-950/90 via-gray-900 to-slate-900 border-rose-500/80'
            } border-2 rounded-2xl p-5 text-center shadow-2xl`;

            winBox.innerHTML = `
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                    <img src="${getHeroImage(state.secret.id)}" alt="${esc(secretName)}" class="w-20 h-20 rounded-full object-cover object-top border-2 border-emerald-400 shadow-lg bg-gray-950">
                    <div class="text-center sm:text-left">
                        <div class="text-xs font-bold uppercase tracking-widest ${state.won ? 'text-emerald-400' : 'text-rose-400'}">
                            ${state.won
                                ? `¡Lo encontraste en ${attempts} intento${attempts === 1 ? '' : 's'}!`
                                : `Era este héroe (tras ${attempts} intento${attempts === 1 ? '' : 's'})`}
                        </div>
                        <h2 class="font-hero text-3xl sm:text-4xl text-white tracking-wide">${esc(secretName)}</h2>
                        <p class="text-xs sm:text-sm text-gray-300">${esc(state.secret.realName || '')} • Don: ${esc(state.secret.quirkName || '')}</p>
                    </div>
                </div>
                <div class="flex flex-wrap items-center justify-center gap-3">
                    <button type="button" id="gh-infinite-btn" class="btn-comic bg-emerald-400 hover:bg-emerald-300 text-black font-hero text-xl px-6 py-2.5 rounded-xl tracking-wider cursor-pointer">
                        JUGAR OTRA VEZ
                    </button>
                    ${!state.isDaily ? `
                        <button type="button" id="gh-daily-btn" class="bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs uppercase px-4 py-3 rounded-xl border border-gray-600 transition cursor-pointer">
                            Volver al Reto Diario
                        </button>
                    ` : ''}
                </div>
            `;
            winBox.querySelector('#gh-infinite-btn').addEventListener('click', () => newInfiniteGame(state.secret.id), { signal });
            const dailyBtn = winBox.querySelector('#gh-daily-btn');
            if (dailyBtn) dailyBtn.addEventListener('click', backToDaily, { signal });
        } else {
            winBox.classList.add('hidden');
        }

        const tbody = container.querySelector('#gh-tbody');
        const empty = container.querySelector('#gh-empty');
        empty.classList.toggle('hidden', state.guesses.length > 0);

        tbody.innerHTML = state.guesses.map((g, idx) => {
            const ev = evaluateGuess(g, state.secret);
            const anim = idx === 0 ? 'flip-cell' : '';
            const gName = getHeroDisplayName(g);
            const cols = [
                ev.gender,
                ev.roles,
                ev.affiliation,
                ev.quirkTypes,
                ev.height,
                ev.debutArc
            ];

            return `
                <tr class="hover:bg-white/[0.02]">
                    <td class="p-2">
                        <div class="relative group inline-flex items-center justify-center" title="${esc(gName)} (${esc(g.realName || '')})">
                            <img src="${getHeroImage(g.id)}" alt="${esc(gName)}" class="w-14 h-14 rounded-xl object-cover object-top bg-gray-950 border border-white/20 shadow">
                            <span class="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full z-20 whitespace-nowrap bg-black/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-gray-700 shadow-xl">
                                ${esc(gName)}
                            </span>
                        </div>
                    </td>
                    ${cols.map(c => `
                        <td class="p-1.5">
                            <div class="${anim} ${cellClass(c.status)} border rounded-xl px-2 py-2.5 min-h-[60px] flex items-center justify-center font-bold leading-snug shadow-inner">
                                ${esc(c.text)}
                            </div>
                        </td>
                    `).join('')}
                </tr>
            `;
        }).join('');
    }

    renderShell();
    renderAll();

    const controller = {
        cleanup() {
            ac.abort();
            clearTimeout(giveUpTimer);
        },
        hasProgress() {
            return !state.isDaily && !isFinished() && state.guesses.length > 0;
        }
    };

    legacyOnController(controller);
    return controller;
}