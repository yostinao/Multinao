import { OP_CHARACTERS, OP_DEBUT_ARCS } from '../data/op-characters.js';

const STORAGE_STATE = 'guess_pirate_state_v1';
const STORAGE_STATS = 'guess_pirate_stats_v1';

const esc = (s) => String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const getPirateImage = (id) => `images/op_characters/${id}.webp`;

function getDayNumber() {
    const now = new Date();
    const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.floor(utc / 86400000);
}

function getDailyPirate(dayNum) {
    let x = ((dayNum + 73) * 2654435761) >>> 0;
    x ^= x >>> 16;
    x = Math.imul(x, 0x85ebca6b) >>> 0;
    x ^= x >>> 13;
    return OP_CHARACTERS[x % OP_CHARACTERS.length];
}

function formatBounty(millions) {
    if (!millions || millions <= 0) return '$ 0';
    const berries = Math.round(millions * 1_000_000);
    return `$ ${berries.toLocaleString('es-ES')}`;
}

function formatHeight(cm) {
    return `${(cm / 100).toFixed(2)} m`;
}

function formatArcName(arcNum) {
    const raw = OP_DEBUT_ARCS[arcNum] || `Arco ${arcNum}`;
    return raw.replace(/^\d+\.\s*/, '');
}

function formatHakiEmojis(hakiArr) {
    if (!Array.isArray(hakiArr) || !hakiArr.length || (hakiArr.length === 1 && norm(hakiArr[0]) === 'ninguno')) {
        return 'Ninguno';
    }
    const map = {
        armadura: '🦾',
        observacion: '👀',
        conquistador: '👑',
        rey: '👑'
    };
    const emojis = hakiArr.map(h => {
        const key = norm(h);
        for (const [token, emoji] of Object.entries(map)) {
            if (key.includes(token)) return emoji;
        }
        return h;
    });
    return emojis.join(' ');
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
            const secret = OP_CHARACTERS.find(c => c.id === raw.secretId);
            const guesses = raw.guesses.map(id => OP_CHARACTERS.find(c => c.id === id)).filter(Boolean);
            if (secret) {
                return {
                    isDaily: true,
                    day: today,
                    secret,
                    guesses,
                    won: Boolean(raw.won)
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
            won: state.won
        }));
    } catch { /* ignore */ }
}

function compareExact(guessVal, secretVal) {
    return {
        status: guessVal === secretVal ? 'correct' : 'wrong',
        text: guessVal
    };
}

function compareArray(guessArr, secretArr, formatter = (arr) => arr.join(', ')) {
    const setSecret = new Set(secretArr);
    const matches = guessArr.filter(x => setSecret.has(x));
    let status = 'wrong';
    if (matches.length === secretArr.length && guessArr.length === secretArr.length) status = 'correct';
    else if (matches.length > 0) status = 'partial';
    return {
        status,
        text: formatter(guessArr)
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
        affiliation: compareArray(guess.affiliations, secret.affiliations),
        fruitType:   compareExact(guess.fruitType, secret.fruitType),
        haki:        compareArray(guess.haki, secret.haki, formatHakiEmojis),
        bounty:      compareNumber(guess.bounty, secret.bounty, formatBounty),
        height:      compareNumber(guess.height, secret.height, formatHeight),
        origin:      compareExact(guess.origin, secret.origin),
        debutArc:    compareNumber(guess.debutArc, secret.debutArc, formatArcName)
    };
}

export function mountGuessPirateGame(container, { onExit } = {}) {
    const ac = new AbortController();
    const { signal } = ac;
    const today = getDayNumber();

    let stats = loadStats();
    let state = loadSavedState(today) || {
        isDaily: true,
        day: today,
        secret: getDailyPirate(today),
        guesses: [],
        won: false
    };
    let activeIndex = -1;

    function newInfiniteGame(excludeId) {
        const pool = OP_CHARACTERS.filter(c => c.id !== excludeId);
        const secret = pool[Math.floor(Math.random() * pool.length)];
        state = {
            isDaily: false,
            day: today,
            secret,
            guesses: [],
            won: false
        };
        renderAll();
    }

    function backToDaily() {
        state = loadSavedState(today) || {
            isDaily: true,
            day: today,
            secret: getDailyPirate(today),
            guesses: [],
            won: false
        };
        renderAll();
    }

    function renderShell() {
        container.innerHTML = `
            <div class="w-full max-w-6xl mx-auto px-3 sm:px-4 pb-12">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-4 bg-black/50 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-gray-800">
                    <button type="button" data-action="back" class="text-gray-300 hover:text-white flex items-center gap-1.5 font-bold uppercase text-xs sm:text-sm tracking-wider transition px-2.5 py-2 rounded-lg hover:bg-white/10 min-h-[40px]">
                        <span>←</span><span>Volver</span>
                    </button>

                    <div class="flex items-center gap-2">
                        <span id="gp-mode-badge" class="font-hero text-base sm:text-xl text-amber-400 tracking-wider bg-amber-500/10 border border-amber-500/40 px-3 py-1 rounded">PIRATA DEL DÍA</span>
                        <span class="text-xs font-bold text-gray-300 bg-gray-900 border border-gray-700 px-2.5 py-1 rounded">Hasta Isla Gyojin</span>
                    </div>

                    <div class="flex items-center gap-2 text-xs">
                        <span id="gp-stats-pill" class="bg-gray-900 border border-gray-700 text-gray-200 px-2.5 py-1.5 rounded-lg font-semibold">
                            🔥 Racha: ${stats.streak} • 🏆 ${stats.won}/${stats.played}
                        </span>
                    </div>
                </div>

                <!-- Panel principal (z-30 para quedar siempre sobre la tabla) -->
                <div class="relative z-30 bg-gray-900/90 backdrop-blur border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-2xl mb-5">
                    <div class="text-center max-w-xl mx-auto mb-4">
                        <h1 class="font-hero text-3xl sm:text-5xl text-white tracking-wider mb-1">GUESS A PIRATE</h1>
                        <p class="text-xs sm:text-sm text-gray-300">Escribe un personaje de One Piece para descubrir pistas por atributo.</p>
                    </div>

                    <!-- Buscador -->
                    <div id="gp-search-wrap" class="relative z-40 max-w-md mx-auto">
                        <label for="gp-input" class="sr-only">Buscar personaje de One Piece</label>
                        <input
                            id="gp-input"
                            type="text"
                            autocomplete="off"
                            spellcheck="false"
                            placeholder="Ej: Luffy, Zoro, Ace, Crocodile, Law..."
                            role="combobox"
                            aria-expanded="false"
                            aria-controls="gp-listbox"
                            aria-autocomplete="list"
                            class="w-full bg-gray-950 border-2 border-gray-700 focus:border-amber-400 rounded-xl px-4 py-3 text-sm sm:text-base text-white placeholder-gray-500 outline-none transition"
                        />
                        <ul id="gp-listbox" role="listbox" class="hidden absolute left-0 right-0 mt-1.5 max-h-64 overflow-y-auto bg-gray-950 border border-gray-700 rounded-xl shadow-2xl z-50 divide-y divide-gray-800/80"></ul>
                    </div>

                    <!-- Leyenda de colores -->
                    <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-4 text-xs text-gray-300">
                        <span class="flex items-center gap-1.5"><i class="w-3.5 h-3.5 rounded bg-emerald-600 inline-block"></i> Exacto</span>
                        <span class="flex items-center gap-1.5"><i class="w-3.5 h-3.5 rounded bg-amber-600 inline-block"></i> Parcial</span>
                        <span class="flex items-center gap-1.5"><i class="w-3.5 h-3.5 rounded bg-rose-700 inline-block"></i> Incorrecto</span>
                        <span class="text-gray-400">🦾 Armadura • 👀 Observación • 👑 Conquistador</span>
                    </div>
                </div>

                <!-- Banner de victoria -->
                <div id="gp-win-box" class="hidden relative z-20 mb-5 bg-gradient-to-r from-emerald-950/90 via-gray-900 to-amber-950/90 border-2 border-emerald-500 rounded-2xl p-5 text-center shadow-2xl"></div>

                <!-- Tabla de intentos -->
                <div class="relative z-10 bg-gray-900/90 border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full min-w-[920px] border-collapse text-center">
                            <thead>
                                <tr class="bg-black/60 border-b border-gray-800 text-[11px] font-bold uppercase tracking-wider text-gray-300">
                                    <th class="py-3 px-2 w-24">Pirata</th>
                                    <th class="py-3 px-2">Género</th>
                                    <th class="py-3 px-2 w-40">Afiliación</th>
                                    <th class="py-3 px-2">Fruta</th>
                                    <th class="py-3 px-2">Hakis</th>
                                    <th class="py-3 px-2">Recompensa</th>
                                    <th class="py-3 px-2">Altura</th>
                                    <th class="py-3 px-2">Origen</th>
                                    <th class="py-3 px-2 w-40">Aparición</th>
                                </tr>
                            </thead>
                            <tbody id="gp-tbody" class="divide-y divide-gray-800/80 text-xs sm:text-[13px]"></tbody>
                        </table>
                    </div>
                    <p id="gp-empty" class="text-center text-gray-400 text-sm py-8">Aún no has hecho ningún intento. ¡Busca un personaje arriba!</p>
                </div>
            </div>
        `;

        container.querySelector('[data-action="back"]').addEventListener('click', () => {
            if (onExit) onExit();
            else location.hash = '#/op';
        }, { signal });

        const input = container.querySelector('#gp-input');
        const listbox = container.querySelector('#gp-listbox');

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
            if (!container.contains(e.target) || !e.target.closest('#gp-search-wrap')) {
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
        const input = container.querySelector('#gp-input');
        const listbox = container.querySelector('#gp-listbox');
        if (!input || !listbox) return;
        listbox.classList.add('hidden');
        input.setAttribute('aria-expanded', 'false');
        activeIndex = -1;
    }

    function renderSuggestions(rawQuery) {
        const input = container.querySelector('#gp-input');
        const listbox = container.querySelector('#gp-listbox');
        const q = norm(rawQuery.trim());

        if (!q || state.won) {
            closeListbox();
            return;
        }

        const usedIds = new Set(state.guesses.map(g => g.id));
        const matches = OP_CHARACTERS
            .filter(c => !usedIds.has(c.id) && norm(c.name).includes(q))
            .slice(0, 8);

        if (!matches.length) {
            listbox.innerHTML = `<li class="px-4 py-3 text-xs text-gray-400">Sin coincidencias en el catálogo</li>`;
            listbox.classList.remove('hidden');
            input.setAttribute('aria-expanded', 'true');
            return;
        }

        listbox.innerHTML = matches.map(c => `
            <li role="option" aria-selected="false" data-id="${c.id}"
                class="flex items-center gap-3 px-3.5 py-2.5 hover:bg-gray-800 cursor-pointer transition">
                <img src="${getPirateImage(c.id)}" alt="" class="w-9 h-9 rounded-full object-cover object-top bg-gray-900 border border-white/15 shrink-0">
                <span class="text-sm font-bold text-white truncate">${esc(c.name)}</span>
            </li>
        `).join('');

        listbox.querySelectorAll('[role="option"]').forEach(li => {
            li.addEventListener('click', () => submitGuessById(li.dataset.id), { signal });
        });

        listbox.classList.remove('hidden');
        input.setAttribute('aria-expanded', 'true');
    }

    function submitGuessById(id) {
        if (state.won) return;
        const char = OP_CHARACTERS.find(c => c.id === id);
        if (!char || state.guesses.some(g => g.id === id)) return;

        state.guesses.unshift(char);
        const input = container.querySelector('#gp-input');
        input.value = '';
        closeListbox();

        if (char.id === state.secret.id) {
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
        container.querySelector('#gp-mode-badge').textContent = state.isDaily ? 'PIRATA DEL DÍA' : 'MODO INFINITO';
        container.querySelector('#gp-stats-pill').textContent = `🔥 Racha: ${stats.streak} • 🏆 ${stats.won}/${stats.played}`;

        const input = container.querySelector('#gp-input');
        input.disabled = state.won;
        input.placeholder = state.won
            ? `¡Adivinado en ${state.guesses.length} intento${state.guesses.length === 1 ? '' : 's'}!`
            : 'Ej: Luffy, Zoro, Ace, Crocodile, Law...';

        const winBox = container.querySelector('#gp-win-box');
        if (state.won) {
            winBox.classList.remove('hidden');
            winBox.innerHTML = `
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                    <img src="${getPirateImage(state.secret.id)}" alt="${esc(state.secret.name)}" class="w-20 h-20 rounded-full object-cover object-top border-2 border-emerald-400 shadow-lg bg-gray-950">
                    <div class="text-center sm:text-left">
                        <div class="text-xs font-bold uppercase tracking-widest text-emerald-400">¡Lo encontraste en ${state.guesses.length} intento${state.guesses.length === 1 ? '' : 's'}!</div>
                        <h2 class="font-hero text-3xl sm:text-4xl text-white tracking-wide">${esc(state.secret.name)}</h2>
                        <p class="text-xs sm:text-sm text-gray-300">${esc(state.secret.title)} • ${formatBounty(state.secret.bounty)}</p>
                    </div>
                </div>
                <div class="flex flex-wrap items-center justify-center gap-3">
                    <button type="button" id="gp-infinite-btn" class="btn-comic bg-amber-400 hover:bg-amber-300 text-black font-hero text-xl px-6 py-2.5 rounded-xl tracking-wider cursor-pointer">
                        JUGAR OTRA VEZ
                    </button>
                    ${!state.isDaily ? `
                        <button type="button" id="gp-daily-btn" class="bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs uppercase px-4 py-3 rounded-xl border border-gray-600 transition cursor-pointer">
                            Volver al Reto Diario
                        </button>
                    ` : ''}
                </div>
            `;
            winBox.querySelector('#gp-infinite-btn').addEventListener('click', () => newInfiniteGame(state.secret.id), { signal });
            const dailyBtn = winBox.querySelector('#gp-daily-btn');
            if (dailyBtn) dailyBtn.addEventListener('click', backToDaily, { signal });
        } else {
            winBox.classList.add('hidden');
        }

        const tbody = container.querySelector('#gp-tbody');
        const empty = container.querySelector('#gp-empty');
        empty.classList.toggle('hidden', state.guesses.length > 0);

        tbody.innerHTML = state.guesses.map((g, idx) => {
            const ev = evaluateGuess(g, state.secret);
            const anim = idx === 0 ? 'flip-cell' : '';
            const cols = [
                { ...ev.gender, isHaki: false },
                { ...ev.affiliation, isHaki: false },
                { ...ev.fruitType, isHaki: false },
                { ...ev.haki, isHaki: ev.haki.text !== 'Ninguno' },
                { ...ev.bounty, isHaki: false },
                { ...ev.height, isHaki: false },
                { ...ev.origin, isHaki: false },
                { ...ev.debutArc, isHaki: false }
            ];

            return `
                <tr class="hover:bg-white/[0.02]">
                    <td class="p-2">
                        <div class="relative group inline-flex items-center justify-center" title="${esc(g.name)}">
                            <img src="${getPirateImage(g.id)}" alt="${esc(g.name)}" class="w-14 h-14 rounded-xl object-cover object-top bg-gray-950 border border-white/20 shadow">
                            <span class="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full z-20 whitespace-nowrap bg-black/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-gray-700 shadow-xl">
                                ${esc(g.name)}
                            </span>
                        </div>
                    </td>
                    ${cols.map(c => `
                        <td class="p-1.5">
                            <div class="${anim} ${cellClass(c.status)} ${c.isHaki ? 'text-xl tracking-wider' : ''} border rounded-xl px-2 py-2.5 min-h-[60px] flex items-center justify-center font-bold leading-snug shadow-inner">
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

    return {
        cleanup() { ac.abort(); },
        hasProgress() { return !state.isDaily && !state.won && state.guesses.length > 0; }
    };
}