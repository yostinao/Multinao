import { CHARACTERS, CATEGORIES } from '../data/characters.js';
import { cpuDecide } from './cpu-strategy.js';

const DIFF_KEY = 'prime_hero_difficulty';
const DIFFS = [
    { id: 'easy', label: 'Fácil' },
    { id: 'normal', label: 'Normal' },
    { id: 'hard', label: 'Difícil' }
];

const getCharacterImage = (id) => `images/mha_characters/${id}.webp`;

let preloaded = false;
function preloadCharacterImages() {
    if (preloaded) return;
    preloaded = true;
    const run = () => {
        for (const c of CHARACTERS) {
            const img = new Image();
            img.decoding = 'async';
            img.src = getCharacterImage(c.id);
        }
    };
    if ('requestIdleCallback' in window) requestIdleCallback(run, { timeout: 2000 });
    else setTimeout(run, 300);
}

const esc = (s) => String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

export function mountPrimeHeroGame(container, { mode = 'cpu', onExit } = {}) {
    preloadCharacterImages();
    const is2P = mode === '2p';
    const ac = new AbortController();
    const { signal } = ac;

    let difficulty = localStorage.getItem(DIFF_KEY) || 'normal';
    if (!DIFFS.some(d => d.id === difficulty)) difficulty = 'normal';

    let state = null;
    let rafId = 0;
    let timers = [];
    let duelRunId = 0;
    const after = (fn, ms) => {
        const id = setTimeout(() => { if (!signal.aborted) fn(); }, ms);
        timers.push(id);
        return id;
    };

    const emptyRoster = () => Object.fromEntries(CATEGORIES.map(c => [c.key, null]));
    const randChar = (excludeIds) => {
        const pool = CHARACTERS.filter(c => !excludeIds.has(c.id));
        const src = pool.length > 0 ? pool : CHARACTERS;
        return src[Math.floor(Math.random() * src.length)];
    };

    function resetState() {
        duelRunId++;
        cancelAnimationFrame(rafId);
        timers.forEach(clearTimeout);
        timers = [];
        state = {
            turn: 'p1',
            round: 1,
            p1: emptyRoster(),
            p2: emptyRoster(),
            usedIds: new Set(),
            currentChar: null,
            isSpinning: false,
            canSelect: false,
            reroll: { p1: 1, p2: 1 },
            status: '¡Haz clic en GIRAR para reclutar!'
        };
    }

    function renderShell() {
        container.innerHTML = `
            <div class="w-full max-w-6xl mx-auto px-3 sm:px-4 pb-10">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-4 bg-black/50 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-gray-800">
                    <button type="button" data-action="back" class="text-gray-300 hover:text-white flex items-center gap-1.5 font-bold uppercase text-xs sm:text-sm tracking-wider transition px-2.5 py-2 rounded-lg hover:bg-white/10 min-h-[40px]">
                        <span>←</span><span>Cambiar Modo</span>
                    </button>

                    <div class="flex items-center gap-2 sm:gap-3">
                        <span id="ph-round" class="font-hero text-base sm:text-xl text-yellow-400 tracking-wider bg-yellow-500/10 border border-yellow-500/40 px-2.5 py-1 rounded">RONDA 1/8</span>
                        <span class="text-xs font-bold uppercase px-2 py-1 rounded border ${is2P ? 'text-cyan-300 border-cyan-500/40 bg-cyan-500/10' : 'text-red-300 border-red-500/40 bg-red-500/10'}">
                            ${is2P ? '2 Jugadores' : 'vs CPU'}
                        </span>
                    </div>

                    <div class="flex items-center gap-2">
                        ${!is2P ? `
                            <div class="flex items-center bg-gray-900 border border-gray-700 rounded-lg p-0.5 text-xs" role="group" aria-label="Dificultad de la CPU">
                                ${DIFFS.map(d => `
                                    <button type="button" data-diff="${d.id}" aria-pressed="${d.id === difficulty}"
                                        class="px-2 py-1 rounded font-bold transition ${d.id === difficulty ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}">${d.label}</button>
                                `).join('')}
                            </div>
                        ` : ''}
                        <button type="button" data-action="restart" class="text-xs font-bold uppercase text-gray-300 hover:text-white bg-gray-800/80 hover:bg-gray-700 border border-gray-700 px-2.5 py-2 rounded-lg transition min-h-[36px]">
                            ↻ Reiniciar
                        </button>
                    </div>
                </div>

                <!-- Minibarra pegajosa móvil cuando hay personaje pendiente de asignar -->
                <div id="ph-minibar" class="ph-minibar hidden mb-3 bg-gray-900/95 border border-yellow-500/50 rounded-xl p-2 items-center gap-2.5 shadow-xl">
                    <img id="ph-mini-img" src="" alt="" class="w-10 h-10 rounded-lg object-cover object-top bg-gray-800 shrink-0">
                    <div class="min-w-0 flex-1">
                        <div class="text-[10px] font-bold uppercase tracking-wider text-yellow-400" id="ph-mini-turn">Asignando</div>
                        <div class="text-sm font-bold text-white truncate" id="ph-mini-name">—</div>
                    </div>
                    <span class="text-[11px] font-semibold text-gray-300 shrink-0">Elige ranura ↓</span>
                </div>

                <!-- Resultados (aparece arriba al terminar las 8 rondas) -->
                <div id="ph-results" class="hidden bg-gray-900/95 border-2 border-yellow-500 rounded-2xl p-5 sm:p-6 shadow-2xl"></div>

                <!-- Arena -->
                <div id="ph-arena" class="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-start">
                    <!-- Jugador 1 -->
                    <section class="lg:col-span-4 bg-gray-900/90 backdrop-blur border-2 border-blue-500/40 rounded-2xl p-3.5 sm:p-4 shadow-xl" aria-label="Tablero Jugador 1">
                        <div class="flex items-center justify-between mb-3 pb-2 border-b border-gray-800">
                            <h2 class="font-hero text-xl sm:text-2xl text-blue-400 tracking-wide">${is2P ? 'JUGADOR 1' : 'TU EQUIPO'}</h2>
                            <span id="p1-badge" class="text-xs bg-blue-600/30 text-blue-200 px-2 py-0.5 rounded border border-blue-500/50 font-semibold">0/8</span>
                        </div>
                        <div id="p1-slots" class="space-y-2"></div>
                    </section>

                    <!-- Centro / Ruleta -->
                    <section class="lg:col-span-4 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black border-2 border-yellow-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden" aria-label="Ruleta de reclutamiento">
                        <div class="w-full text-center mb-2.5">
                            <span id="ph-turn" class="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-600 text-white shadow">Turno: Jugador 1</span>
                        </div>

                        <div id="ph-card" class="w-full max-w-[270px] aspect-[4/5] bg-gray-800 rounded-xl border-2 border-gray-700 shadow-inner flex flex-col items-center justify-between p-3.5 relative overflow-hidden transition-colors duration-300">
                            <div id="ph-card-bg" class="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-950 opacity-85"></div>
                            <div class="relative z-10 w-full flex justify-between items-center text-[11px] font-bold text-gray-300">
                                <span id="ph-role" class="bg-black/60 px-2 py-0.5 rounded uppercase tracking-wider border border-white/10">LISTO</span>
                                <span id="ph-stats-hint" class="bg-black/60 px-2 py-0.5 rounded text-yellow-400 border border-yellow-500/20">???</span>
                            </div>

                            <div class="relative z-10 my-auto flex flex-col items-center text-center w-full">
                                <div id="ph-avatar" class="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gray-950/80 border-2 border-white/20 flex items-center justify-center mb-2.5 shadow-lg overflow-hidden">
                                    <span class="text-5xl">❓</span>
                                </div>
                                <h3 id="ph-name" class="font-hero text-2xl sm:text-3xl text-white tracking-wide leading-none drop-shadow">¿Quién tocará?</h3>
                                <p id="ph-realname" class="text-xs text-gray-300 mt-1 line-clamp-1">Presiona el botón para girar</p>
                            </div>

                            <div class="relative z-10 w-full text-center">
                                <span id="ph-quirk" class="text-[11px] text-gray-300 italic block truncate bg-black/50 px-2 py-1 rounded">Don: Desconocido</span>
                            </div>
                        </div>

                        <p id="ph-status" role="status" aria-live="polite" class="text-xs sm:text-sm text-center text-yellow-300 font-semibold mt-3 min-h-[20px]">¡Haz clic en GIRAR para reclutar!</p>

                        <div class="w-full max-w-[270px] mt-3 space-y-2">
                            <button type="button" id="ph-spin" class="w-full btn-comic bg-yellow-400 hover:bg-yellow-300 text-black font-hero text-2xl py-2.5 rounded-xl tracking-wider cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                🎰 GIRAR RULETA
                            </button>
                            <button type="button" id="ph-reroll" class="hidden w-full bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs uppercase py-2.5 rounded-lg border border-purple-400/50 transition cursor-pointer">
                                🔄 Re-Roll (1 disponible)
                            </button>
                        </div>
                    </section>

                    <!-- Jugador 2 / CPU -->
                    <section class="lg:col-span-4 bg-gray-900/90 backdrop-blur border-2 border-red-500/40 rounded-2xl p-3.5 sm:p-4 shadow-xl" aria-label="Tablero Rival">
                        <div class="flex items-center justify-between mb-3 pb-2 border-b border-gray-800">
                            <h2 class="font-hero text-xl sm:text-2xl text-red-400 tracking-wide">${is2P ? 'JUGADOR 2' : 'CPU RIVAL'}</h2>
                            <span id="p2-badge" class="text-xs bg-red-600/30 text-red-200 px-2 py-0.5 rounded border border-red-500/50 font-semibold">0/8</span>
                        </div>
                        <div id="p2-slots" class="space-y-2"></div>
                    </section>
                </div>
            </div>
        `;

        container.querySelector('[data-action="back"]').addEventListener('click', () => {
            if (onExit) onExit();
            else location.hash = '#/mha';
        }, { signal });

        container.querySelector('[data-action="restart"]').addEventListener('click', () => {
            resetState();
            renderAll();
        }, { signal });

        container.querySelectorAll('[data-diff]').forEach(btn => {
            btn.addEventListener('click', () => {
                difficulty = btn.dataset.diff;
                localStorage.setItem(DIFF_KEY, difficulty);
                container.querySelectorAll('[data-diff]').forEach(b => {
                    const active = b.dataset.diff === difficulty;
                    b.setAttribute('aria-pressed', String(active));
                    b.className = `px-2 py-1 rounded font-bold transition ${active ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`;
                });
            }, { signal });
        });

        container.querySelector('#ph-spin').addEventListener('click', spinRoulette, { signal });
        container.querySelector('#ph-reroll').addEventListener('click', useReroll, { signal });
    }

    function renderBoard(player) {
        const host = container.querySelector(`#${player}-slots`);
        const roster = state[player];
        const filled = Object.values(roster).filter(Boolean).length;
        container.querySelector(`#${player}-badge`).textContent = `${filled}/8`;

        const selectable = state.canSelect && state.turn === player && (player === 'p1' || is2P);
        host.innerHTML = '';

        for (const cat of CATEGORIES) {
            const char = roster[cat.key];
            if (char) {
                const row = document.createElement('div');
                row.className = 'flex items-center bg-gray-800/90 border border-gray-700 rounded-xl p-2 gap-2.5';
                row.innerHTML = `
                    <span class="text-base shrink-0">${cat.icon}</span>
                    <img src="${getCharacterImage(char.id)}" alt="" class="w-9 h-9 rounded-full object-cover object-top bg-gray-950 border border-white/15 shrink-0">
                    <div class="min-w-0 flex-1">
                        <span class="text-[10px] font-bold uppercase ${cat.color} block leading-none">${cat.label}</span>
                        <span class="text-xs sm:text-sm font-bold text-white truncate block">${esc(char.name)}</span>
                    </div>
                `;
                host.appendChild(row);
            } else {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.disabled = !selectable;
                btn.className = `w-full flex items-center justify-between rounded-xl p-2.5 border text-left transition min-h-[46px] ${
                    selectable
                        ? 'slot-available bg-gray-800/70 hover:bg-gray-700/90 cursor-pointer'
                        : 'bg-gray-950/60 border-gray-800/80 text-gray-500 cursor-default'
                }`;
                btn.innerHTML = `
                    <div class="flex items-center gap-2">
                        <span class="text-base">${cat.icon}</span>
                        <span class="text-xs sm:text-sm font-bold uppercase tracking-wider ${selectable ? 'text-white' : 'text-gray-400'}">${cat.label}</span>
                    </div>
                    <span class="text-xs font-semibold ${selectable ? 'text-yellow-400' : 'text-gray-600'}">${selectable ? '+ Asignar aquí' : 'Vacío'}</span>
                `;
                if (selectable) {
                    btn.addEventListener('click', () => assignSlot(player, cat.key), { signal });
                }
                host.appendChild(btn);
            }
        }
    }

    function updateCard(char, spinning) {
        const card = container.querySelector('#ph-card');
        const bg = container.querySelector('#ph-card-bg');
        const avatar = container.querySelector('#ph-avatar');
        const role = container.querySelector('#ph-role');
        const hint = container.querySelector('#ph-stats-hint');
        const name = container.querySelector('#ph-name');
        const real = container.querySelector('#ph-realname');
        const quirk = container.querySelector('#ph-quirk');

        if (!char) {
            card.style.borderColor = '#374151';
            bg.className = 'absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-950 opacity-85';
            avatar.innerHTML = '<span class="text-5xl">❓</span>';
            role.textContent = 'LISTO';
            hint.textContent = '???';
            name.textContent = '¿Quién tocará?';
            real.textContent = 'Presiona el botón para girar';
            quirk.textContent = 'Don: Desconocido';
            return;
        }

        card.style.borderColor = char.color;
        bg.className = `absolute inset-0 bg-gradient-to-br ${char.gradient} opacity-90`;
        avatar.innerHTML = `<img src="${getCharacterImage(char.id)}" alt="${esc(char.name)}" class="w-full h-full object-cover object-top ${spinning ? 'scale-110' : ''} transition-transform duration-150">`;
        role.textContent = char.role;
        hint.textContent = spinning ? '???' : '¿Dónde encaja?';
        name.textContent = char.name;
        real.textContent = char.realName;
        quirk.textContent = `Don: ${char.quirkName}`;
    }

    function renderAll() {
        container.querySelector('#ph-round').textContent = `RONDA ${Math.min(state.round, 8)}/8`;
        const turnEl = container.querySelector('#ph-turn');
        if (state.turn === 'p1') {
            turnEl.textContent = is2P ? 'Turno: Jugador 1' : 'Tu Turno';
            turnEl.className = 'inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-600 text-white shadow';
        } else {
            turnEl.textContent = is2P ? 'Turno: Jugador 2' : 'Turno: CPU Rival';
            turnEl.className = 'inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-red-600 text-white shadow';
        }

        container.querySelector('#ph-status').textContent = state.status;

        const spinBtn = container.querySelector('#ph-spin');
        const isCpuTurn = state.turn === 'p2' && !is2P;
        spinBtn.disabled = state.isSpinning || state.canSelect || isCpuTurn || state.round > 8;

        const rerollBtn = container.querySelector('#ph-reroll');
        const showReroll = state.canSelect && !isCpuTurn && state.reroll[state.turn] > 0;
        rerollBtn.classList.toggle('hidden', !showReroll);

        const minibar = container.querySelector('#ph-minibar');
        const showMini = state.canSelect && !isCpuTurn && Boolean(state.currentChar) && state.round <= 8;
        minibar.classList.toggle('is-active', showMini);
        minibar.classList.toggle('hidden', !showMini);
        if (showMini) {
            container.querySelector('#ph-mini-img').src = getCharacterImage(state.currentChar.id);
            container.querySelector('#ph-mini-turn').textContent = is2P && state.turn === 'p2' ? 'Jugador 2 • Asignando' : 'Tu Equipo • Asignando';
            container.querySelector('#ph-mini-name').textContent = state.currentChar.name;
        }

        updateCard(state.currentChar, state.isSpinning);
        renderBoard('p1');
        renderBoard('p2');
        container.querySelector('#ph-arena').classList.remove('hidden');
        container.querySelector('#ph-results').classList.add('hidden');
    }

    function spinRoulette() {
        if (state.isSpinning || state.canSelect || state.round > 8) return;
        state.isSpinning = true;
        state.status = 'Girando la ruleta...';
        renderAll();

        const duration = 1150;
        const start = performance.now();
        let lastStep = 0;

        const tick = (now) => {
            if (signal.aborted) return;
            const elapsed = now - start;
            const progress = Math.min(1, elapsed / duration);
            const stepMs = 45 + progress * progress * 125;
            if (now - lastStep >= stepMs) {
                lastStep = now;
                updateCard(randChar(state.usedIds), true);
            }
            if (progress < 1) {
                rafId = requestAnimationFrame(tick);
            } else {
                const chosen = randChar(state.usedIds);
                state.usedIds.add(chosen.id);
                state.currentChar = chosen;
                state.isSpinning = false;
                state.canSelect = true;

                if (state.turn === 'p2' && !is2P) {
                    state.status = `La CPU obtuvo a ${chosen.name}...`;
                    renderAll();
                    after(cpuTurn, 650);
                } else {
                    const who = state.turn === 'p1' ? (is2P ? 'Jugador 1' : 'Elige') : 'Jugador 2';
                    state.status = `${who}: ¡Elige una categoría para ${chosen.name}!`;
                    renderAll();
                }
            }
        };
        rafId = requestAnimationFrame(tick);
    }

    function useReroll() {
        if (!state.canSelect || state.reroll[state.turn] <= 0) return;
        state.reroll[state.turn]--;
        state.canSelect = false;
        state.currentChar = null;
        state.status = '¡Re-Roll activado! Girando de nuevo...';
        spinRoulette();
    }

    function assignSlot(player, categoryKey) {
        if (!state.canSelect || state.turn !== player) return;
        if (state[player][categoryKey] !== null) return;

        state[player][categoryKey] = state.currentChar;
        state.canSelect = false;
        state.currentChar = null;

        if (state.turn === 'p1') {
            state.turn = 'p2';
            if (is2P) {
                state.status = 'Turno del Jugador 2: ¡Haz clic en GIRAR!';
                renderAll();
            } else {
                state.status = 'Turno de la CPU...';
                renderAll();
                after(spinRoulette, 450);
            }
        } else {
            state.round++;
            if (state.round > 8) {
                state.status = '¡Equipos completos!';
                renderAll();
                after(showResults, 500);
            } else {
                state.turn = 'p1';
                state.status = `Ronda ${state.round}: ${is2P ? 'Jugador 1, ¡gira!' : '¡Tu turno de girar!'}`;
                renderAll();
            }
        }
    }

    function cpuTurn() {
        const openKeys = CATEGORIES.filter(c => state.p2[c.key] === null).map(c => c.key);
        const decision = cpuDecide({
            char: state.currentChar,
            openKeys,
            oppRoster: state.p1,
            rerollsLeft: state.reroll.p2,
            difficulty,
            characters: CHARACTERS,
            categories: CATEGORIES
        });

        if (decision.reroll) {
            state.reroll.p2--;
            state.canSelect = false;
            state.currentChar = null;
            state.status = '¡La CPU usó su Re-Roll!';
            renderAll();
            after(spinRoulette, 500);
            return;
        }
        assignSlot('p2', decision.key);
    }

    async function showResults() {
        const runId = ++duelRunId;
        let skipped = false;
        const arena = container.querySelector('#ph-arena');
        const minibar = container.querySelector('#ph-minibar');
        const box = container.querySelector('#ph-results');

        state.currentChar = null;
        state.canSelect = false;
        arena.classList.add('hidden');
        minibar.classList.remove('is-active');
        minibar.classList.add('hidden');
        box.classList.remove('hidden');

        const p1Name = is2P ? 'Jugador 1' : 'Tu Equipo';
        const p2Name = is2P ? 'Jugador 2' : 'CPU Rival';

        box.innerHTML = `
            <div class="bg-black/60 border border-yellow-500/30 rounded-2xl p-4 mb-5 max-w-3xl mx-auto">
                <div class="flex items-center justify-between gap-2">
                    <div class="text-left flex-1">
                        <span class="text-[11px] font-bold uppercase tracking-wider text-blue-300 block">${p1Name}</span>
                        <span id="ph-live-s1" class="font-hero text-4xl sm:text-5xl text-blue-400">0</span>
                    </div>

                    <div class="text-center px-2">
                        <div id="ph-live-status" class="font-hero text-lg sm:text-2xl text-yellow-400 tracking-wider">DUELO EN CURSO...</div>
                        <button type="button" id="ph-skip-duel" class="mt-1 text-[11px] font-bold uppercase tracking-wider text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition cursor-pointer">
                            Saltar ⏭
                        </button>
                    </div>

                    <div class="text-right flex-1">
                        <span class="text-[11px] font-bold uppercase tracking-wider text-red-300 block">${p2Name}</span>
                        <span id="ph-live-s2" class="font-hero text-4xl sm:text-5xl text-red-400">0</span>
                    </div>
                </div>
            </div>

            <div id="ph-duel-rows" class="space-y-3 max-w-3xl mx-auto mb-6"></div>
            <div id="ph-final-verdict" class="hidden text-center pt-3 border-t border-gray-800 max-w-3xl mx-auto duel-row-in"></div>
        `;

        window.scrollTo({ top: 0, behavior: 'smooth' });

        const rowsHost = box.querySelector('#ph-duel-rows');
        const liveS1 = box.querySelector('#ph-live-s1');
        const liveS2 = box.querySelector('#ph-live-s2');
        const liveStatus = box.querySelector('#ph-live-status');
        const skipBtn = box.querySelector('#ph-skip-duel');
        const verdictBox = box.querySelector('#ph-final-verdict');

        skipBtn.addEventListener('click', () => {
            skipped = true;
            skipBtn.classList.add('hidden');
        }, { signal });

        const sleep = (ms) => new Promise(res => {
            if (skipped || signal.aborted || runId !== duelRunId) return res();
            after(res, ms);
        });

        const animateDuelBar = (barEl, w1, duration = 900) => {
            if (skipped) {
                barEl.style.width = `${w1}%`;
                return Promise.resolve();
            }
            return new Promise(resolve => {
                const start = performance.now();
                const tick = (now) => {
                    if (skipped || signal.aborted || runId !== duelRunId) {
                        barEl.style.width = `${w1}%`;
                        return resolve();
                    }
                    const p = Math.min(1, (now - start) / duration);
                    const ease = 1 - Math.pow(1 - p, 3);
                    barEl.style.width = `${Math.round(50 + (w1 - 50) * ease)}%`;
                    if (p < 1) requestAnimationFrame(tick);
                    else resolve();
                };
                requestAnimationFrame(tick);
            });
        };

        let p1Wins = 0, p2Wins = 0, p1Total = 0, p2Total = 0;

        for (const cat of CATEGORIES) {
            if (signal.aborted || runId !== duelRunId) return;

            const c1 = state.p1[cat.key];
            const c2 = state.p2[cat.key];
            const s1 = c1.stats[cat.key];
            const s2 = c2.stats[cat.key];
            const w1 = s1 === s2 ? 50 : Math.max(8, Math.round((s1 / (s1 + s2)) * 100));

            const row = document.createElement('div');
            row.className = 'duel-row-in bg-gray-800/85 border border-gray-700 rounded-xl p-3 transition-colors duration-300';
            row.innerHTML = `
                <div class="flex flex-col sm:flex-row items-center justify-between gap-2.5">
                    <div data-side="left" class="duel-clash-left flex items-center gap-2.5 w-full sm:w-5/12 rounded-lg p-1.5 transition-all duration-300">
                        <img src="${getCharacterImage(c1.id)}" alt="" class="w-11 h-11 rounded-full object-cover object-top bg-gray-900 border-2 border-blue-400/60 shrink-0">
                        <div class="min-w-0 flex-1">
                            <span class="text-sm font-bold text-white truncate block">${esc(c1.name)}</span>
                        </div>
                    </div>

                    <div class="flex flex-col items-center justify-center w-full sm:w-2/12 text-center">
                        <span class="text-[11px] font-bold uppercase text-gray-300 mb-1">${cat.icon} ${cat.label}</span>
                        <span data-badge class="duel-badge-pop text-xs font-extrabold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 px-2.5 py-0.5 rounded-full">⚔️ VS</span>
                    </div>

                    <div data-side="right" class="duel-clash-right flex items-center justify-end gap-2.5 w-full sm:w-5/12 text-right rounded-lg p-1.5 transition-all duration-300">
                        <div class="min-w-0 flex-1">
                            <span class="text-sm font-bold text-white truncate block">${esc(c2.name)}</span>
                        </div>
                        <img src="${getCharacterImage(c2.id)}" alt="" class="w-11 h-11 rounded-full object-cover object-top bg-gray-900 border-2 border-red-400/60 shrink-0">
                    </div>
                </div>
                <div class="mt-2.5 h-2 w-full bg-red-600/60 rounded-full overflow-hidden">
                    <div data-bar class="h-full bg-blue-500" style="width:50%"></div>
                </div>
            `;

            rowsHost.appendChild(row);
            if (!skipped) row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            const leftCard = row.querySelector('[data-side="left"]');
            const rightCard = row.querySelector('[data-side="right"]');
            const badgeEl = row.querySelector('[data-badge]');
            const barEl = row.querySelector('[data-bar]');

            await animateDuelBar(barEl, w1, 900);
            await sleep(450);

            p1Total += s1;
            p2Total += s2;

            if (s1 > s2) {
                p1Wins++;
                row.classList.replace('border-gray-700', 'border-blue-500/60');
                leftCard.classList.add('bg-blue-500/15', 'ring-1', 'ring-blue-400/60');
                rightCard.classList.add('opacity-45');
                badgeEl.outerHTML = `<span class="duel-badge-pop text-xs font-bold bg-blue-600 text-white px-2.5 py-1 rounded-full">Gana ${is2P ? 'J1' : 'Tú'}</span>`;
            } else if (s2 > s1) {
                p2Wins++;
                row.classList.replace('border-gray-700', 'border-red-500/60');
                rightCard.classList.add('bg-red-500/15', 'ring-1', 'ring-red-400/60');
                leftCard.classList.add('opacity-45');
                badgeEl.outerHTML = `<span class="duel-badge-pop text-xs font-bold bg-red-600 text-white px-2.5 py-1 rounded-full">Gana ${is2P ? 'J2' : 'CPU'}</span>`;
            } else {
                badgeEl.outerHTML = `<span class="duel-badge-pop text-xs font-bold bg-gray-600 text-white px-2.5 py-1 rounded-full">Empate</span>`;
            }

            liveS1.textContent = p1Wins;
            liveS2.textContent = p2Wins;

            await sleep(1100);
        }

        if (signal.aborted || runId !== duelRunId) return;
        skipBtn.classList.add('hidden');
        liveStatus.textContent = 'COMBATE FINALIZADO';

        let title, subtitle, titleColor;
        if (p1Wins > p2Wins) {
            title = is2P ? '¡VICTORIA DEL JUGADOR 1!' : '¡VICTORIA PLUS ULTRA!';
            titleColor = 'text-blue-400';
            subtitle = `Ganaste ${p1Wins} de 8 categorías`;
        } else if (p2Wins > p1Wins) {
            title = is2P ? '¡VICTORIA DEL JUGADOR 2!' : 'DERROTA... ¡ENTRENA MÁS DURO!';
            titleColor = 'text-red-400';
            subtitle = `${is2P ? 'Jugador 2' : 'La CPU'} ganó ${p2Wins} de 8 categorías`;
        } else if (p1Total !== p2Total) {
            const p1Better = p1Total > p2Total;
            title = p1Better ? '¡VICTORIA POR DESEMPATE DE PODER!' : 'DERROTA POR DESEMPATE DE PODER';
            titleColor = p1Better ? 'text-blue-400' : 'text-red-400';
            subtitle = `Empate 4-4 en categorías • Definido por poder acumulado`;
        } else {
            title = '¡EMPATE ABSOLUTO!';
            titleColor = 'text-yellow-400';
            subtitle = `Empate absoluto 4-4 en categorías`;
        }

        verdictBox.classList.remove('hidden');
        verdictBox.innerHTML = `
            <h2 class="font-hero text-3xl sm:text-5xl ${titleColor} tracking-wider mb-1 mt-3">${title}</h2>
            <p class="text-gray-300 text-sm sm:text-base font-semibold mb-5">${subtitle}</p>
            <button type="button" id="ph-play-again" class="btn-comic bg-yellow-400 hover:bg-yellow-300 text-black font-hero text-2xl px-8 py-3 rounded-xl tracking-wider cursor-pointer">
                JUGAR OTRA VEZ
            </button>
        `;

        verdictBox.querySelector('#ph-play-again').addEventListener('click', () => {
            resetState();
            renderAll();
        }, { signal });

        verdictBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    resetState();
    renderShell();
    renderAll();

    return {
        cleanup() {
            duelRunId++;
            ac.abort();
            cancelAnimationFrame(rafId);
            timers.forEach(clearTimeout);
        },
        hasProgress() {
            return state && state.round <= 8 && (state.usedIds.size > 0 || state.isSpinning);
        }
    };
}