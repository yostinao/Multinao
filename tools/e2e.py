# Pruebas end-to-end (Playwright). Sirve la carpeta con "npm start" o "python3 -m http.server 8765" y ejecuta:
#   pip install playwright && playwright install chromium && python3 tools/e2e.py
import asyncio, json, sys
from playwright.async_api import async_playwright

import os
BASE=os.environ.get('BASE','http://localhost:8765/index.html')
results=[]
def check(name, cond, extra=''):
    results.append((name, bool(cond), extra))
    print(('PASS ' if cond else 'FAIL ')+name+(f'  [{extra}]' if extra else ''))

INIT = """
// Acelera los temporizadores x12 para probar partidas completas
const _st = window.setTimeout.bind(window);
window.setTimeout = (fn, ms, ...a) => _st(fn, (ms||0)/12, ...a);
// Registra listeners globales con signal (para detectar fugas)
window.__sigs = [];
const _add = document.addEventListener.bind(document);
document.addEventListener = (t, fn, o) => { if (o && o.signal) window.__sigs.push(o.signal); return _add(t, fn, o); };
"""
HIDDEN_CSS = ".hidden{display:none!important}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}"

async def new_page(ctx):
    page = await ctx.new_page()
    errs=[]; bad=[]; imgs=[]
    page.on('pageerror', lambda e: errs.append(str(e)))
    page.on('console', lambda m: errs.append('console:'+m.text) if m.type=='error' and 'ERR_' not in m.text and 'Failed to load resource' not in m.text else None)
    async def on_resp(r):
        u=r.url
        if '/images/' in u:
            imgs.append((u, r.status))
            if r.status>=400: bad.append((u,r.status))
    page.on('response', lambda r: asyncio.ensure_future(on_resp(r)))
    # Sin red externa: bloquea Tailwind CDN y Google Fonts
    await page.route('**/*', lambda route: route.abort() if ('tailwindcss.com' in route.request.url or 'googleapis' in route.request.url or 'gstatic' in route.request.url) else route.continue_())
    await page.add_init_script(INIT)
    return page, errs, bad, imgs

async def vis(page, sel):
    return await page.evaluate("(s)=>{const e=document.querySelector(s);return !!e && !e.classList.contains('hidden') && !e.closest('.hidden')}", sel)

async def build_game(page, mode, rounds=8):
    """Juega una partida completa. Devuelve True si llega a resultados."""
    for r in range(rounds):
        # P1
        for who in (['p1','p2'] if mode=='pvp' else ['p1']):
            await page.wait_for_function("()=>{const b=document.querySelector('#phBtnSpin');return b && !b.disabled}", timeout=15000)
            await page.click('#phBtnSpin')
            await page.wait_for_selector(f'#ph{who.upper()}Slots button', timeout=15000)
            # probar reroll una vez en la primera ronda de p1
            if r==0 and who=='p1':
                await page.click('#phBtnReroll')
                await page.wait_for_selector('#phP1Slots button', timeout=15000)
            btns = await page.query_selector_all(f'#ph{who.upper()}Slots button')
            await btns[0].click()
        # espera a que acabe la ronda (CPU) o resultados
        if mode=='cpu':
            try:
                await page.wait_for_function("()=>{const b=document.querySelector('#phBtnSpin');const r=document.querySelector('#phResultView');return (b&&!b.disabled)||(r&&!r.classList.contains('hidden'))}", timeout=15000)
            except Exception as e:
                return False
    await page.wait_for_selector('#phResultView:not(.hidden)', timeout=15000)
    return True

async def main():
    async with async_playwright() as pw:
        browser = await pw.chromium.launch()
        ctx = await browser.new_context(viewport={'width':1280,'height':900})
        await ctx.add_init_script("document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent=%s;document.head.appendChild(s)})" % json.dumps(HIDDEN_CSS))

        # ---------- 1. Navegación ----------
        page, errs, bad, imgs = await new_page(ctx)
        await page.goto(BASE); await page.wait_for_selector('#mainMenuScreen')
        check('Carga inicial: menú principal visible', await vis(page,'#mainMenuScreen'))
        await page.click('a[href="#/mha"]')
        check('Ruta #/mha: submenú visible', await vis(page,'#mhaGamesScreen') and page.url.endswith('#/mha'))
        await page.click('a[href="#/build"]')
        await page.wait_for_selector('#buildHeroModeScreen:not(.hidden)', timeout=3000)
        check('Ruta #/build: selector de modo', await vis(page,'#buildHeroModeScreen'))
        await page.go_back()
        check('Botón Atrás del navegador funciona (vuelve a #/mha)', await vis(page,'#mhaGamesScreen'))
        await page.click('a[href="#/op"]') if False else None
        # dificultad
        await page.goto(BASE+'#/build'); await page.wait_for_selector('#buildHeroModeScreen')
        await page.click('[data-diff="hard"]')
        check('Selector de dificultad marca "hard"', await page.get_attribute('[data-diff="hard"]','aria-checked')=='true')
        await page.reload(); await page.wait_for_selector('#buildHeroModeScreen')
        check('La dificultad se recuerda tras recargar', await page.get_attribute('[data-diff="hard"]','aria-checked')=='true')
        # Botón 📁 oculto sin debug
        check('Botón verificador oculto sin ?debug', not await vis(page,'#btnFolder'))

        # ---------- 2. Guess the Hero ----------
        await page.goto(BASE+'#/mha'); await page.wait_for_selector('#mhaGamesScreen')
        await page.click('a[href="#/guess"]'); await page.wait_for_selector('#ghInput')
        check('Guess: ruta y título de header', page.url.endswith('#/guess'))
        txt = await page.inner_text('#gameMountPoint')
        check('Guess: contador dinámico "80 Personajes"', '80 Personajes' in txt)
        await page.fill('#ghInput','izu'); 
        opts = await page.query_selector_all('.gh-option')
        first_sel = await page.get_attribute('.gh-option','aria-selected')
        check('Guess: aparecen sugerencias y la 1ª queda resaltada', len(opts)>0 and first_sel=='true', f'{len(opts)} opciones')
        names = await page.eval_on_selector_all('.gh-option span.font-comic','els=>els.map(e=>e.textContent)')
        check('Guess: ranking pone coincidencias por inicio primero', any('Deku' in n or 'Izuku' in n for n in names[:3]) , str(names[:4]))
        await page.fill('#ghInput','xyzxyz')
        hint = await page.inner_text('#ghHint')
        check('Guess: aviso de "sin resultados"', 'Sin resultados' in hint, hint[:40])
        await page.fill('#ghInput','a')
        await page.keyboard.press('ArrowDown'); await page.keyboard.press('ArrowDown')
        idx = await page.evaluate("()=>[...document.querySelectorAll('.gh-option')].findIndex(o=>o.getAttribute('aria-selected')==='true')")
        check('Guess: flechas mueven la selección', idx==2, f'idx={idx}')
        await page.keyboard.press('Escape')
        check('Guess: Escape cierra el desplegable', not await vis(page,'#ghDropdown'))
        # Enter envía lo resaltado
        await page.fill('#ghInput','deku'); await page.keyboard.press('Enter')
        n_rows = await page.evaluate("document.querySelectorAll('#ghRowsContainer > div').length")
        att = await page.inner_text('#ghAttemptCount')
        solved_by_luck = await vis(page,'#ghVictoryBanner')
        check('Guess: Enter envía intento y cuenta', (n_rows==1 and att=='1') or solved_by_luck)
        # mismo personaje no se repite
        if not solved_by_luck:
            await page.fill('#ghInput','deku')
            hint = await page.inner_text('#ghHint')
            check('Guess: personaje ya probado no se ofrece de nuevo', 'Ya probaste' in hint, hint[:40])
        else:
            print('INFO: el personaje oculto era Deku (acierto al primer intento); se omite esa comprobación')
        # salir con progreso -> confirmación
        if not solved_by_luck:
            await page.click('#btnHome')
            await page.wait_for_selector('#confirmModal:not(.hidden)', timeout=3000)
            check('Salir con partida en curso muestra confirmación', await vis(page,'#confirmModal'))
            await page.click('#confirmStay')
            rows = await page.evaluate("document.querySelectorAll('#ghRowsContainer > div').length")
            check('"Seguir jugando" conserva la partida y la ruta', page.url.endswith('#/guess') and rows==1 and not await vis(page,'#confirmModal'))
            await page.go_back()   # botón atrás del navegador: debería preguntar
            await page.wait_for_selector('#confirmModal:not(.hidden)', timeout=3000)
            check('Botón Atrás del navegador también pide confirmación', True)
            await page.keyboard.press('Escape')
            await page.wait_for_function("location.hash==='#/guess'", timeout=3000)
            check('Escape en el modal = seguir jugando', page.url.endswith('#/guess') and await vis(page,'#ghInput'))
            # rendirse
            await page.click('#ghBtnGiveUp')
            t1 = await page.inner_text('#ghBtnGiveUp')
            await page.click('#ghBtnGiveUp')
            check('Rendirse: pide 2º clic y luego revela', 'Seguro' in t1 and await vis(page,'#ghVictoryBanner'))
            check('Rendirse: input bloqueado', await page.is_disabled('#ghInput'))
            rows = await page.evaluate("document.querySelectorAll('#ghRowsContainer > div').length")
            check('Rendirse: se añade la fila del personaje oculto', rows==2, f'rows={rows}')
            await page.click('#btnHome')
            await page.wait_for_selector('#mainMenuScreen:not(.hidden)')
            check('Partida terminada: salir NO pide confirmación', not await vis(page,'#confirmModal'))
        # fugas de listeners: tras 3 partidas, los signals viejos deben estar abortados
        await page.goto(BASE+'#/guess'); await page.wait_for_selector('#ghInput')
        for _ in range(3):
            await page.evaluate("()=>{const b=document.querySelector('#ghBtnGiveUp');b.click();b.click();}")
            await page.click('#ghBtnNewGame'); await page.wait_for_selector('#ghInput:not([disabled])')
        sigs = await page.evaluate("window.__sigs.map(s=>s.aborted)")
        check('Guess: sin fuga de listeners (solo el último activo)', sigs.count(False)==1 and len(sigs)>=4, f'{sigs}')
        await page.goto(BASE+'#/mha'); await page.wait_for_selector('#mhaGamesScreen')
        sigs = await page.evaluate("window.__sigs.map(s=>s.aborted)")
        check('Guess: al salir se cancelan TODOS los listeners', all(sigs), f'{sigs}')
        check('Guess: el DOM del juego se limpia al salir', await page.evaluate("document.getElementById('gameMountPoint').innerHTML===''"))

        # ---------- 3. Build a Hero ----------
        for diff in ['easy','normal','hard']:
            await page.goto(BASE+'#/build'); await page.wait_for_selector('#buildHeroModeScreen')
            await page.click(f'[data-diff="{diff}"]')
            await page.click('a[href="#/build/cpu"]'); await page.wait_for_selector('#phBtnSpin')
            title = await page.inner_text('#phP2Card h3')
            ok = await build_game(page,'cpu')
            check(f'Build CPU ({diff}): partida completa → resultados', ok, title)
        res = await page.inner_text('#phResultView')
        check('Resultados muestran titular y 8 duelos', any(t in res for t in ['VICTORIA','DERROTA','EMPATE']) and res.count('DERROTA')+res.count('★')>=8)
        bar = await page.evaluate("document.querySelectorAll('#phResultView .h-1\\\\.5').length")
        check('Barras de duelo solo indican ganador (8)', bar==8, f'{bar}')
        # replay
        await page.click('#phBtnReplay'); await page.wait_for_selector('#phBtnSpin')
        prog = await page.inner_text('#phP1Prog')
        check('Jugar de nuevo reinicia (0 / 8)', prog.strip()=='0 / 8')
        # confirmación a mitad
        await page.click('#phBtnSpin'); await page.wait_for_selector('#phP1Slots button')
        await page.click('#btnBack')
        await page.wait_for_selector('#confirmModal:not(.hidden)', timeout=3000)
        check('Build: salir a media partida pide confirmación', await vis(page,'#confirmModal'))
        await page.click('#confirmLeave'); await page.wait_for_selector('#buildHeroModeScreen:not(.hidden)')
        check('Confirmar salida lleva al selector y limpia el juego', page.url.endswith('#/build') and await page.evaluate("document.getElementById('gameMountPoint').innerHTML===''"))
        # PvP
        await page.click('a[href="#/build/pvp"]'); await page.wait_for_selector('#phBtnSpin')
        ok = await build_game(page,'pvp')
        check('Build PvP: partida completa → resultados', ok)
        # Sin timers huérfanos: entrar y salir a mitad de giro no debe lanzar errores
        await page.goto(BASE+'#/build/cpu'); await page.wait_for_selector('#phBtnSpin')
        await page.click('#phBtnSpin'); await page.goto(BASE+'#/'); await page.wait_for_timeout(600)

        # ---------- 4. Imágenes / errores ----------
        check('Sin errores JS en toda la sesión', not errs, '; '.join(errs[:3]))
        check('Ninguna imagen devuelve 404', not bad, str(bad[:3]))
        exts = {u.rsplit('.',1)[-1] for u,s in imgs}
        check('Solo se piden .webp (no más 404 de .png previos)', exts <= {'webp'}, str(exts))
        check('Imágenes pedidas', len(imgs)>0, f'{len(imgs)} peticiones')

        # ---------- 5. Verificador ?debug ----------
        pg2, errs2, bad2, _ = await new_page(ctx)
        await pg2.goto(BASE+'?debug'); await pg2.wait_for_selector('#btnFolder:not(.hidden)')
        await pg2.click('#btnFolder')
        await pg2.wait_for_function("()=>document.getElementById('imagesSummary').textContent.startsWith('80 OK')", timeout=8000)
        s = await pg2.inner_text('#imagesSummary')
        check('Verificador ?debug: 80 OK, 0 sin imagen (antes mostraba rotas)', s.startswith('80 OK · 0 sin imagen'), s)
        await pg2.keyboard.press('Escape')
        check('Verificador cierra con Escape', not await vis(pg2,'#imagesModal'))

        # ---------- 6. Respaldo de imagen ----------
        pg3, errs3, _, _ = await new_page(ctx)
        await pg3.route('**/images/mha_characters/izuku_midoriya.webp', lambda r: r.abort())
        await pg3.goto(BASE+'#/guess'); await pg3.wait_for_selector('#ghInput')
        await pg3.fill('#ghInput','deku')
        await pg3.wait_for_timeout(500)
        src = await pg3.evaluate("document.querySelector('.gh-option img').src.slice(0,26)")
        check('Imagen que falla → SVG con iniciales (listener global)', src.startswith('data:image/svg+xml'), src)

        # ---------- 7. Móvil ----------
        mctx = await browser.new_context(viewport={'width':390,'height':800}, has_touch=True, is_mobile=True)
        await mctx.add_init_script("document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent=%s;document.head.appendChild(s)})" % json.dumps(HIDDEN_CSS))
        pm, errsm, _, _ = await new_page(mctx)
        await pm.goto(BASE+'#/build/pvp'); await pm.wait_for_selector('#phBtnSpin')
        await pm.click('#phBtnSpin'); await pm.wait_for_selector('#phP1Slots button')
        mini = await vis(pm,'#phP1Mini')
        txt = await pm.inner_text('#phP1Mini') if mini else ''
        check('Móvil: minibarra con el personaje actual visible al elegir', mini and 'Elige una categoría' in txt, txt.replace('\n',' ')[:50])
        # En escritorio la minibarra no debe verse (lg:hidden depende de Tailwind; se valida la clase)
        cls = await pm.get_attribute('#phP1Mini','class')
        check('Minibarra lleva lg:hidden y es sticky', 'lg:hidden' in cls and 'ph-minibar' in cls)
        check('Móvil sin errores JS', not errsm, '; '.join(errsm[:2]))

        await browser.close()
    fails=[r for r in results if not r[1]]
    print(f'\n== {len(results)-len(fails)}/{len(results)} pruebas OK ==')
    sys.exit(1 if fails else 0)
asyncio.run(main())
