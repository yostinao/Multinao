import {
    CHARACTERS,
    DEBUT_ARCS,
    createCharacterImgHtml,
    escapeHtml as esc
} from '../data/characters.js';

/**
 * Guess the Hero.
 * Devuelve un controlador { cleanup, hasProgress } para que index.html pueda
 * liberar listeners al salir y pedir confirmación si hay una partida en curso.
 */
export function mountGuessHeroGame(containerEl, onExitCallback = () => {}, onController = () => {}) {
    const ac = new AbortController();           // todos los listeners globales se cancelan con esto
    const { signal } = ac;
    let giveUpTimer = null;

    const secretChar = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    const guessedIds = [];
    let isFinished = false;                     // acertó o se rindió
    let activeIndex = -1;                       // opción resaltada del desplegable
    let currentMatches = [];

    const controller = {
        cleanup() {
            ac.abort();
            clearTimeout(giveUpTimer);
        },
        hasProgress: () => !isFinished && guessedIds.length > 0
    };

    containerEl.innerHTML = `
        <div class="max-w-6xl mx-auto space-y-5 animate-pop">
            <!-- PANEL SUPERIOR: BUSCADOR -->
            <div class="bg-slate-900/95 p-5 sm:p-6 rounded-2xl comic-border relative z-20">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                        <span class="text-xs font-extrabold uppercase tracking-wider text-purple-400">Deducción • ${CHARACTERS.length} Personajes</span>
                        <h2 class="font-comic text-3xl sm:text-4xl text-white tracking-wide drop-shadow-[2px_2px_0px_#000] leading-none">
                            ADIVINA EL PERSONAJE OCULTO
                        </h2>
                    </div>
                    <div class="flex flex-wrap items-center gap-2">
                        <span class="bg-slate-950 border-2 border-black px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-300">
                            Intentos: <span id="ghAttemptCount">0</span>
                        </span>
                        <button id="ghBtnLegend" aria-expanded="true" aria-controls="ghLegendBox" class="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl comic-btn">
                            🎨 Indicadores
                        </button>
                        <button id="ghBtnGiveUp" class="bg-slate-800 hover:bg-red-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl comic-btn">
                            🏳️ Rendirme
                        </button>
                    </div>
                </div>

                <!-- INPUT CON AUTOCOMPLETADO -->
                <div id="ghSearchWrapper" class="relative max-w-2xl mx-auto">
                    <div class="flex gap-2">
                        <input
                            id="ghInput"
                            type="text"
                            autocomplete="off"
                            autocapitalize="off"
                            spellcheck="false"
                            role="combobox"
                            aria-expanded="false"
                            aria-controls="ghDropdown"
                            aria-autocomplete="list"
                            aria-label="Nombre del personaje"
                            placeholder="Escribe el nombre de héroe o nombre real (ej. Deku, Izuku, All Might...)"
                            class="w-full bg-slate-950 text-white placeholder-slate-500 font-semibold text-sm sm:text-base px-4 py-3 rounded-xl border-3 border-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                        <button id="ghBtnSubmit" aria-label="Probar personaje" class="bg-yellow-400 hover:bg-yellow-300 text-black font-comic text-2xl px-5 rounded-xl comic-btn shrink-0">
                            ➤
                        </button>
                    </div>

                    <p id="ghHint" class="hidden text-xs text-amber-300 font-semibold mt-2 px-1" role="status"></p>

                    <!-- LISTA DESPLEGABLE DE SUGERENCIAS -->
                    <div id="ghDropdown" role="listbox" aria-label="Sugerencias" class="hidden absolute left-0 right-0 mt-2 bg-slate-950 border-3 border-black rounded-xl shadow-2xl max-h-72 overflow-y-auto z-30 divide-y divide-slate-800"></div>
                </div>

                <!-- LEYENDA DE COLORES (PLEGABLE) -->
                <div id="ghLegendBox" class="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                    <div class="bg-emerald-600/20 border border-emerald-500 rounded-lg p-2">
                        <span class="inline-block w-4 h-4 rounded bg-emerald-500 border border-black align-middle mr-1"></span>
                        <strong class="text-emerald-300">Correcto</strong>
                    </div>
                    <div class="bg-amber-500/20 border border-amber-500 rounded-lg p-2">
                        <span class="inline-block w-4 h-4 rounded bg-amber-500 border border-black align-middle mr-1"></span>
                        <strong class="text-amber-300">Parcial</strong>
                    </div>
                    <div class="bg-red-600/20 border border-red-500 rounded-lg p-2">
                        <span class="inline-block w-4 h-4 rounded bg-red-600 border border-black align-middle mr-1"></span>
                        <strong class="text-red-300">Incorrecto</strong>
                    </div>
                    <div class="bg-red-600/20 border border-red-500 rounded-lg p-2">
                        <span class="font-extrabold text-yellow-300 mr-1">⬆️</span>
                        <strong class="text-slate-200">Más alto / Posterior</strong>
                    </div>
                    <div class="col-span-2 sm:col-span-1 bg-red-600/20 border border-red-500 rounded-lg p-2">
                        <span class="font-extrabold text-yellow-300 mr-1">⬇️</span>
                        <strong class="text-slate-200">Más bajo / Anterior</strong>
                    </div>
                </div>
            </div>

            <!-- BANNER FINAL (victoria o rendición) -->
            <div id="ghVictoryBanner" class="scroll-target hidden bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-900 p-6 rounded-2xl comic-border text-center animate-pop">
                <span id="ghVictoryTag" class="inline-block bg-yellow-400 text-black font-extrabold text-xs uppercase tracking-widest px-3 py-0.5 rounded-full border border-black mb-2">
                    ¡Objetivo Identificado!
                </span>
                <div id="ghVictoryContent" class="flex flex-col sm:flex-row items-center justify-center gap-4 my-3"></div>
                <div class="flex flex-wrap justify-center gap-3 mt-4">
                    <button id="ghBtnNewGame" class="bg-yellow-400 hover:bg-yellow-300 text-black font-comic text-2xl px-7 py-2.5 rounded-xl comic-btn">
                        🔄 OTRO PERSONAJE
                    </button>
                    <button id="ghBtnExit" class="bg-slate-800 hover:bg-slate-700 text-white font-comic text-2xl px-7 py-2.5 rounded-xl comic-btn">
                        ← VOLVER A BOKU NO HERO
                    </button>
                </div>
            </div>

            <!-- TABLA DE INTENTOS (CON SCROLL HORIZONTAL EN MÓVIL) -->
            <div id="ghBoardWrapper" class="hidden bg-slate-900/95 p-4 sm:p-5 rounded-2xl comic-border overflow-x-auto">
                <div class="min-w-[820px]">
                    <div class="grid grid-cols-7 gap-2 text-center pb-2 mb-3 border-b-2 border-slate-700 text-xs font-extrabold uppercase tracking-wider text-slate-300">
                        <div>Personaje</div>
                        <div>Género</div>
                        <div>Rol</div>
                        <div>Afiliación</div>
                        <div>Tipo de Don</div>
                        <div>Altura</div>
                        <div>Arco de Debut</div>
                    </div>
                    <div id="ghRowsContainer" class="space-y-2.5"></div>
                </div>
            </div>

            <p id="ghStatus" class="sr-only" aria-live="polite"></p>
        </div>
    `;

    const $ = (sel) => containerEl.querySelector(sel);
    const elInput          = $('#ghInput');
    const elDropdown       = $('#ghDropdown');
    const elBtnSubmit      = $('#ghBtnSubmit');
    const elBtnGiveUp      = $('#ghBtnGiveUp');
    const elBtnLegend      = $('#ghBtnLegend');
    const elAttemptCount   = $('#ghAttemptCount');
    const elBoardWrapper   = $('#ghBoardWrapper');
    const elRowsContainer  = $('#ghRowsContainer');
    const elVictoryBanner  = $('#ghVictoryBanner');
    const elVictoryTag     = $('#ghVictoryTag');
    const elVictoryContent = $('#ghVictoryContent');
    const elLegendBox      = $('#ghLegendBox');
    const elHint           = $('#ghHint');
    const elStatus         = $('#ghStatus');

    // ---------- Utilidades ----------
    const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = () => window.matchMedia('(pointer: fine)').matches;

    function normalizeText(str) {
        return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    }

    /** Menor = mejor coincidencia. -1 = no coincide. */
    function matchScore(char, q) {
        const hero = normalizeText(char.heroName);
        const real = normalizeText(char.realName);
        if (hero.startsWith(q)) return 0;
        if (real.startsWith(q)) return 1;
        const wordStart = (s) => s.split(/[\s.\-()]+/).some(w => w.startsWith(q));
        if (wordStart(hero) || wordStart(real)) return 2;
        if (hero.includes(q) || real.includes(q)) return 3;
        return -1;
    }

    function getFilteredCharacters(query) {
        const q = normalizeText(query);
        if (!q) return [];
        const used = new Set(guessedIds);
        return CHARACTERS
            .map((c, i) => ({ c, i, s: matchScore(c, q) }))
            .filter(x => x.s >= 0 && !used.has(x.c.id))
            .sort((a, b) => a.s - b.s || a.i - b.i)
            .slice(0, 8)
            .map(x => x.c);
    }

    function setHint(text) {
        elHint.textContent = text;
        elHint.classList.toggle('hidden', !text);
    }

    // ---------- Desplegable ----------
    function closeDropdown() {
        elDropdown.classList.add('hidden');
        elInput.setAttribute('aria-expanded', 'false');
        elInput.removeAttribute('aria-activedescendant');
        activeIndex = -1;
    }

    function setActive(index, { scroll = true } = {}) {
        const options = elDropdown.querySelectorAll('.gh-option');
        if (!options.length) return;
        activeIndex = (index + options.length) % options.length;
        options.forEach((opt, i) => opt.setAttribute('aria-selected', String(i === activeIndex)));
        const active = options[activeIndex];
        elInput.setAttribute('aria-activedescendant', active.id);
        if (scroll) active.scrollIntoView({ block: 'nearest' });   // antes la opción activa podía quedar fuera de vista
    }

    function renderDropdown() {
        const raw = elInput.value;
        currentMatches = getFilteredCharacters(raw);

        if (currentMatches.length === 0) {
            elDropdown.innerHTML = '';
            closeDropdown();
            const q = normalizeText(raw);
            if (!q) { setHint(''); return; }
            const alreadyTried = CHARACTERS.some(c => guessedIds.includes(c.id) && matchScore(c, q) >= 0);
            setHint(alreadyTried
                ? 'Ya probaste a ese personaje. Prueba con otro nombre.'
                : `Sin resultados para «${raw.trim()}». Prueba con el nombre de héroe o el real.`);
            return;
        }

        setHint('');
        elDropdown.innerHTML = currentMatches.map((char, idx) => `
            <button type="button" role="option" id="ghOpt${idx}" aria-selected="false" data-id="${esc(char.id)}"
                    class="gh-option w-full px-3.5 py-2.5 flex items-center gap-3 text-left hover:bg-slate-800 transition-colors">
                ${createCharacterImgHtml(char, 'w-10 h-10 rounded-lg')}
                <div class="min-w-0">
                    <span class="font-comic text-xl text-white tracking-wide block leading-none truncate">${esc(char.heroName)}</span>
                    <span class="text-xs text-slate-400 block truncate">${esc(char.realName)}</span>
                </div>
            </button>
        `).join('');
        elDropdown.classList.remove('hidden');
        elInput.setAttribute('aria-expanded', 'true');
        setActive(0, { scroll: false });   // la 1ª opción queda resaltada: Enter hace lo que se ve
    }

    // Delegación: un solo listener para todas las opciones
    elDropdown.addEventListener('click', (e) => {
        const opt = e.target.closest('.gh-option');
        if (opt) submitCharacterById(opt.dataset.id);
    });
    elDropdown.addEventListener('mouseover', (e) => {
        const opt = e.target.closest('.gh-option');
        if (!opt) return;
        const idx = [...elDropdown.children].indexOf(opt);
        if (idx !== activeIndex) setActive(idx, { scroll: false });
    });

    // ---------- Comparación ----------
    function compareArrays(guessArr, targetArr) {
        const gSet = new Set(guessArr);
        const tSet = new Set(targetArr);
        const isExact = gSet.size === tSet.size && [...gSet].every(x => tSet.has(x));
        if (isExact) return 'exact';
        return [...gSet].some(x => tSet.has(x)) ? 'partial' : 'wrong';
    }

    function getStatusClasses(status) {
        if (status === 'exact')   return 'bg-emerald-600 border-emerald-300 text-white';
        if (status === 'partial') return 'bg-amber-500 border-amber-200 text-black';
        return 'bg-red-700 border-red-400 text-white';
    }

    function buildGuessRowHtml(char) {
        const genderStatus = char.gender === secretChar.gender ? 'exact' : 'wrong';
        const roleStatus   = compareArrays(char.roles, secretChar.roles);
        const affStatus    = compareArrays(char.affiliations, secretChar.affiliations);
        const quirkStatus  = compareArrays(char.quirkTypes, secretChar.quirkTypes);

        const heightExact  = char.height === secretChar.height;
        const heightArrow  = heightExact ? '' : (char.height < secretChar.height ? '⬆️' : '⬇️');

        const arcExact     = char.debutArc === secretChar.debutArc;
        const arcArrow     = arcExact ? '' : (char.debutArc < secretChar.debutArc ? '⬆️' : '⬇️');
        const arcLabel     = DEBUT_ARCS[char.debutArc] || `Arco ${char.debutArc}`;

        return `
            <div class="grid grid-cols-7 gap-2 text-center items-stretch animate-pop">
                <div class="bg-slate-950 border-2 border-black rounded-xl p-2 flex flex-col items-center justify-center">
                    ${createCharacterImgHtml(char, 'w-12 h-12 rounded-lg mb-1')}
                    <span class="font-comic text-base text-white leading-none line-clamp-1">${esc(char.heroName)}</span>
                    <span class="text-[10px] text-slate-400 leading-tight line-clamp-1">${esc(char.realName)}</span>
                </div>
                <div class="${getStatusClasses(genderStatus)} border-2 rounded-xl p-2 flex items-center justify-center font-extrabold text-xs sm:text-sm shadow">
                    ${esc(char.gender)}
                </div>
                <div class="${getStatusClasses(roleStatus)} border-2 rounded-xl p-2 flex items-center justify-center font-extrabold text-xs leading-tight shadow">
                    ${esc(char.roles.join(' / '))}
                </div>
                <div class="${getStatusClasses(affStatus)} border-2 rounded-xl p-2 flex items-center justify-center font-extrabold text-xs leading-tight shadow">
                    ${esc(char.affiliations.join(' / '))}
                </div>
                <div class="${getStatusClasses(quirkStatus)} border-2 rounded-xl p-2 flex items-center justify-center font-extrabold text-xs leading-tight shadow">
                    ${esc(char.quirkTypes.join(' / '))}
                </div>
                <div class="${getStatusClasses(heightExact ? 'exact' : 'wrong')} border-2 rounded-xl p-2 flex flex-col items-center justify-center font-extrabold text-xs sm:text-sm shadow">
                    <span>${char.height} cm</span>
                    ${heightArrow ? `<span class="text-base leading-none mt-0.5">${heightArrow}</span>` : ''}
                </div>
                <div class="${getStatusClasses(arcExact ? 'exact' : 'wrong')} border-2 rounded-xl p-2 flex flex-col items-center justify-center font-extrabold text-[11px] leading-tight shadow">
                    <span>${esc(arcLabel)}</span>
                    ${arcArrow ? `<span class="text-base leading-none mt-0.5">${arcArrow}</span>` : ''}
                </div>
            </div>
        `;
    }

    // ---------- Fin de partida ----------
    function lockInput() {
        isFinished = true;
        elInput.disabled = true;
        elBtnSubmit.disabled = true;
        elBtnGiveUp.disabled = true;
        closeDropdown();
        setHint('');
        clearGiveUpConfirm();
    }

    function showFinalBanner({ won }) {
        const n = guessedIds.length;
        elVictoryTag.textContent = won ? '¡Objetivo Identificado!' : 'Era este personaje';
        elVictoryContent.innerHTML = `
            ${createCharacterImgHtml(secretChar, 'w-20 h-20 rounded-2xl', { eager: true })}
            <div class="text-center sm:text-left">
                <h3 class="font-comic text-4xl sm:text-5xl text-yellow-400 drop-shadow-[2px_2px_0px_#000] leading-none">${esc(secretChar.heroName)}</h3>
                <p class="text-sm text-slate-200 font-bold">${esc(secretChar.realName)} • Don: ${esc(secretChar.quirkName)}</p>
                <p class="text-xs ${won ? 'text-emerald-300' : 'text-slate-300'} mt-1">
                    ${won
                        ? `¡Lo adivinaste en <strong>${n}</strong> ${n === 1 ? 'intento' : 'intentos'}!`
                        : `Lo intentaste ${n} ${n === 1 ? 'vez' : 'veces'}. ¡La próxima sale!`}
                </p>
            </div>
        `;
        elVictoryBanner.classList.remove('hidden');
        elStatus.textContent = won
            ? `Correcto. Era ${secretChar.heroName}, en ${n} intentos.`
            : `Te rendiste. Era ${secretChar.heroName}.`;
        elVictoryBanner.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'nearest' });
        elVictoryBanner.querySelector('#ghBtnNewGame').focus({ preventScroll: true });
    }

    function submitCharacterById(id) {
        if (isFinished || guessedIds.includes(id)) return;
        const char = CHARACTERS.find(c => c.id === id);
        if (!char) return;

        guessedIds.push(char.id);
        elAttemptCount.textContent = guessedIds.length;
        elInput.value = '';
        elDropdown.innerHTML = '';
        closeDropdown();
        setHint('');
        clearGiveUpConfirm();

        elBoardWrapper.classList.remove('hidden');
        elRowsContainer.insertAdjacentHTML('afterbegin', buildGuessRowHtml(char));

        if (char.id === secretChar.id) {
            lockInput();
            showFinalBanner({ won: true });
        } else {
            elStatus.textContent = `Intento ${guessedIds.length}: ${char.heroName}.`;
            if (hasFinePointer()) elInput.focus({ preventScroll: true });
        }
    }

    // ---------- Rendirse (con confirmación en dos clics) ----------
    function clearGiveUpConfirm() {
        clearTimeout(giveUpTimer);
        giveUpTimer = null;
        elBtnGiveUp.textContent = '🏳️ Rendirme';
        elBtnGiveUp.dataset.confirm = '';
    }

    elBtnGiveUp.addEventListener('click', () => {
        if (isFinished) return;
        if (!elBtnGiveUp.dataset.confirm) {
            elBtnGiveUp.dataset.confirm = '1';
            elBtnGiveUp.textContent = '¿Seguro? Pulsa otra vez';
            giveUpTimer = setTimeout(clearGiveUpConfirm, 3000);
            return;
        }
        clearGiveUpConfirm();
        // Muestra también la fila del personaje oculto (todo en verde) como referencia
        elBoardWrapper.classList.remove('hidden');
        elRowsContainer.insertAdjacentHTML('afterbegin', buildGuessRowHtml(secretChar));
        lockInput();
        showFinalBanner({ won: false });
    });

    // ---------- Eventos ----------
    elBtnLegend.addEventListener('click', () => {
        const hidden = elLegendBox.classList.toggle('hidden');
        elBtnLegend.setAttribute('aria-expanded', String(!hidden));
    });

    containerEl.querySelector('#ghBtnExit').addEventListener('click', onExitCallback);
    containerEl.querySelector('#ghBtnNewGame').addEventListener('click', () => {
        controller.cleanup();
        mountGuessHeroGame(containerEl, onExitCallback, onController);
    });

    elInput.addEventListener('input', renderDropdown);
    elInput.addEventListener('focus', () => { if (elInput.value) renderDropdown(); });

    elInput.addEventListener('keydown', (e) => {
        const isOpen = !elDropdown.classList.contains('hidden');
        if (e.key === 'ArrowDown') {
            if (!isOpen && elInput.value) { renderDropdown(); e.preventDefault(); return; }
            if (isOpen) { e.preventDefault(); setActive(activeIndex + 1); }
        } else if (e.key === 'ArrowUp') {
            if (isOpen) { e.preventDefault(); setActive(activeIndex - 1); }
        } else if (e.key === 'Escape') {
            if (isOpen) { e.preventDefault(); closeDropdown(); }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const target = currentMatches[activeIndex >= 0 ? activeIndex : 0];
            if (isOpen && target) submitCharacterById(target.id);
        }
    });

    elBtnSubmit.addEventListener('click', () => {
        const matches = currentMatches.length ? currentMatches : getFilteredCharacters(elInput.value);
        const target = matches[activeIndex >= 0 ? activeIndex : 0];
        if (target) submitCharacterById(target.id);
        else if (elInput.value.trim()) renderDropdown();   // muestra el aviso "sin resultados"
    });

    // Cierra el desplegable al hacer clic fuera. Listener global ligado a este juego y cancelable.
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#ghSearchWrapper')) closeDropdown();
    }, { signal });

    if (hasFinePointer()) elInput.focus({ preventScroll: true });

    onController(controller);
    return controller;
}
