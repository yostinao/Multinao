const esc = (s) => String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

export function playDuelResults({
    container,
    categories,
    p1Roster,
    p2Roster,
    p1Label = 'JUGADOR 1',
    p2Label = 'CPU',
    getImage,
    accentText = 'text-emerald-400',
    accentBtn = 'bg-emerald-400 hover:bg-emerald-300',
    onPlayAgain,
    onExit
}) {
    let skipped = false;
    let cancelled = false;
    let p1Wins = 0;
    let p2Wins = 0;
    let p1Total = 0;
    let p2Total = 0;

    container.innerHTML = `
        <div class="w-full max-w-4xl mx-auto px-3 sm:px-4 pb-12">
            <!-- Marcador en vivo -->
            <div class="bg-gray-900/95 border-2 border-gray-800 rounded-2xl p-4 sm:p-5 mb-5 shadow-2xl sticky top-20 z-20 backdrop-blur-md">
                <div class="flex items-center justify-between gap-2">
                    <div class="text-left flex-1">
                        <div class="text-[11px] font-bold uppercase tracking-wider text-gray-400">${esc(p1Label)}</div>
                        <div class="flex items-baseline gap-2">
                            <span id="duel-s1" class="font-hero text-4xl sm:text-5xl text-cyan-400">0</span>
                            <span id="duel-t1" class="text-xs text-gray-400 font-semibold">(0 pts)</span>
                        </div>
                    </div>

                    <div class="text-center px-3">
                        <div id="duel-status" class="font-hero text-xl sm:text-2xl ${accentText} tracking-wider">DUELO EN CURSO...</div>
                        <button type="button" id="duel-skip" class="mt-1 text-[11px] font-bold uppercase tracking-wider text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg transition cursor-pointer">
                            Saltar animación ⏭
                        </button>
                    </div>

                    <div class="text-right flex-1">
                        <div class="text-[11px] font-bold uppercase tracking-wider text-gray-400">${esc(p2Label)}</div>
                        <div class="flex items-baseline justify-end gap-2">
                            <span id="duel-t2" class="text-xs text-gray-400 font-semibold">(0 pts)</span>
                            <span id="duel-s2" class="font-hero text-4xl sm:text-5xl text-rose-400">0</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Lista de enfrentamientos uno por uno -->
            <div id="duel-rows" class="space-y-2.5"></div>

            <!-- Banner final (aparece al concluir los 8 choques) -->
            <div id="duel-final" class="hidden mt-6 bg-gray-900 border-2 border-gray-700 rounded-2xl p-6 text-center shadow-2xl duel-row-enter"></div>
        </div>
    `;

    const rowsEl = container.querySelector('#duel-rows');
    const s1El = container.querySelector('#duel-s1');
    const s2El = container.querySelector('#duel-s2');
    const t1El = container.querySelector('#duel-t1');
    const t2El = container.querySelector('#duel-t2');
    const statusEl = container.querySelector('#duel-status');
    const skipBtn = container.querySelector('#duel-skip');
    const finalEl = container.querySelector('#duel-final');

    skipBtn.addEventListener('click', () => {
        skipped = true;
        skipBtn.classList.add('hidden');
    });

    const sleep = (ms) => new Promise(res => {
        if (skipped || cancelled) return res();
        setTimeout(res, ms);
    });

    function animateCounter(el, target, duration = 420) {
        if (skipped || target === 0) {
            el.textContent = target;
            return Promise.resolve();
        }
        return new Promise(resolve => {
            const start = performance.now();
            function tick(now) {
                if (skipped || cancelled) {
                    el.textContent = target;
                    return resolve();
                }
                const p = Math.min(1, (now - start) / duration);
                el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
                if (p < 1) requestAnimationFrame(tick);
                else resolve();
            }
            requestAnimationFrame(tick);
        });
    }

    async function runSequence() {
        for (const cat of categories) {
            if (cancelled) return;

            const c1 = p1Roster[cat.key];
            const c2 = p2Roster[cat.key];
            const v1 = c1.stats[cat.key];
            const v2 = c2.stats[cat.key];

            const row = document.createElement('div');
            row.className = 'duel-row-enter bg-gray-900/90 border border-gray-800 rounded-xl p-2.5 sm:p-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4 transition-colors duration-300';
            row.innerHTML = `
                <!-- Lado Jugador 1 -->
                <div data-side="left" class="duel-clash-left flex items-center gap-2.5 sm:gap-3 rounded-lg p-1.5 transition-all duration-300">
                    <img src="${getImage(c1.id)}" alt="${esc(c1.name)}" class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover object-top bg-gray-950 border border-white/15 shrink-0">
                    <div class="min-w-0 flex-1">
                        <div class="text-xs sm:text-sm font-bold text-white truncate">${esc(c1.name)}</div>
                        <div data-stat="left" class="font-hero text-xl sm:text-2xl text-gray-300">0</div>
                    </div>
                </div>

                <!-- Centro: Categoría y choque -->
                <div class="text-center px-2 min-w-[92px] sm:min-w-[120px]">
                    <div class="text-base sm:text-lg">${cat.icon}</div>
                    <div class="text-[11px] sm:text-xs font-bold uppercase tracking-wider ${cat.color}">${esc(cat.label)}</div>
                    <div data-badge class="duel-spark mt-0.5 text-xs font-extrabold text-amber-400">⚔️ VS</div>
                </div>

                <!-- Lado Jugador 2 / CPU -->
                <div data-side="right" class="duel-clash-right flex items-center justify-end gap-2.5 sm:gap-3 rounded-lg p-1.5 text-right transition-all duration-300">
                    <div class="min-w-0 flex-1">
                        <div class="text-xs sm:text-sm font-bold text-white truncate">${esc(c2.name)}</div>
                        <div data-stat="right" class="font-hero text-xl sm:text-2xl text-gray-300">0</div>
                    </div>
                    <img src="${getImage(c2.id)}" alt="${esc(c2.name)}" class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover object-top bg-gray-950 border border-white/15 shrink-0">
                </div>
            `;

            rowsEl.appendChild(row);
            if (!skipped) row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            const leftCard = row.querySelector('[data-side="left"]');
            const rightCard = row.querySelector('[data-side="right"]');
            const leftStat = row.querySelector('[data-stat="left"]');
            const rightStat = row.querySelector('[data-stat="right"]');
            const badge = row.querySelector('[data-badge]');

            // Conteo simultáneo de estadísticas mientras chocan
            await Promise.all([
                animateCounter(leftStat, v1, 450),
                animateCounter(rightStat, v2, 450)
            ]);

            await sleep(220);

            // Resolución del duelo de esta categoría
            p1Total += v1;
            p2Total += v2;

            if (v1 > v2) {
                p1Wins++;
                row.classList.replace('border-gray-800', 'border-cyan-500/50');
                leftCard.classList.add('bg-cyan-500/15', 'ring-1', 'ring-cyan-400/60');
                leftStat.className = 'font-hero text-2xl sm:text-3xl text-cyan-400';
                rightCard.classList.add('opacity-45');
                badge.innerHTML = `<span class="duel-spark inline-block text-cyan-400">◀ +1</span>`;
            } else if (v2 > v1) {
                p2Wins++;
                row.classList.replace('border-gray-800', 'border-rose-500/50');
                rightCard.classList.add('bg-rose-500/15', 'ring-1', 'ring-rose-400/60');
                rightStat.className = 'font-hero text-2xl sm:text-3xl text-rose-400';
                leftCard.classList.add('opacity-45');
                badge.innerHTML = `<span class="duel-spark inline-block text-rose-400">+1 ▶</span>`;
            } else {
                leftStat.className = 'font-hero text-2xl sm:text-3xl text-amber-300';
                rightStat.className = 'font-hero text-2xl sm:text-3xl text-amber-300';
                badge.innerHTML = `<span class="duel-spark inline-block text-amber-300">EMPATE</span>`;
            }

            s1El.textContent = p1Wins;
            s2El.textContent = p2Wins;
            t1El.textContent = `(${p1Total} pts)`;
            t2El.textContent = `(${p2Total} pts)`;

            await sleep(480);
        }

        if (cancelled) return;
        skipBtn.classList.add('hidden');

        // Veredicto final
        let headline = '¡EMPATE ÉPICO!';
        let sub = `Empatados en ${p1Wins} rondas y ${p1Total} puntos totales.`;
        let headlineColor = 'text-amber-400';

        if (p1Wins > p2Wins || (p1Wins === p2Wins && p1Total > p2Total)) {
            headline = `¡VICTORIA DE ${p1Label.toUpperCase()}!`;
            sub = p1Wins === p2Wins
                ? `Desempate por poder total: ${p1Total} vs ${p2Total} pts.`
                : `Ganaste ${p1Wins} a ${p2Wins} rondas (${p1Total} vs ${p2Total} pts).`;
            headlineColor = 'text-cyan-400';
        } else if (p2Wins > p1Wins || (p1Wins === p2Wins && p2Total > p1Total)) {
            headline = `¡VICTORIA DE ${p2Label.toUpperCase()}!`;
            sub = p1Wins === p2Wins
                ? `Desempate por poder total: ${p2Total} vs ${p1Total} pts.`
                : `Resultado final: ${p1Wins} a ${p2Wins} rondas (${p1Total} vs ${p2Total} pts).`;
            headlineColor = 'text-rose-400';
        }

        statusEl.textContent = 'COMBATE FINALIZADO';
        finalEl.classList.remove('hidden');
        finalEl.innerHTML = `
            <h2 class="font-hero text-3xl sm:text-5xl ${headlineColor} tracking-wider mb-1">${esc(headline)}</h2>
            <p class="text-xs sm:text-sm text-gray-300 mb-5">${esc(sub)}</p>
            <div class="flex flex-wrap items-center justify-center gap-3">
                <button type="button" id="duel-again" class="btn-comic ${accentBtn} text-black font-hero text-xl px-6 py-2.5 rounded-xl tracking-wider cursor-pointer">
                    JUGAR OTRA VEZ
                </button>
                <button type="button" id="duel-exit" class="bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs uppercase px-5 py-3 rounded-xl border border-gray-600 transition cursor-pointer">
                    Salir
                </button>
            </div>
        `;

        finalEl.querySelector('#duel-again').addEventListener('click', () => { if (onPlayAgain) onPlayAgain(); });
        finalEl.querySelector('#duel-exit').addEventListener('click', () => { if (onExit) onExit(); });
        finalEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    runSequence();

    return () => { cancelled = true; };
}