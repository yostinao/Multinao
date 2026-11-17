// Simulación de balance:  node tools/simulate.mjs [partidas] [mha|op|all]
import { CHARACTERS, CATEGORIES } from '../javascript/data/characters.js';
import { OP_CHARACTERS, OP_CATEGORIES } from '../javascript/data/op-characters.js';
import { cpuDecide } from '../javascript/games/cpu-strategy.js';

const N = Number(process.argv[2]) || 10000;
const target = (process.argv[3] || 'all').toLowerCase();
const pick = a => a[Math.floor(Math.random() * a.length)];

function runSimulation(label, characters, categories) {
    const KEYS = categories.map(c => c.key);
    const AVG = Object.fromEntries(
        KEYS.map(k => [k, characters.reduce((a, c) => a + c.stats[k], 0) / characters.length])
    );

    const bots = {
        'Aleatorio': (char, my) => ({ key: pick(KEYS.filter(k => my[k] === null)) }),
        'Voraz': (char, my) => {
            const open = KEYS.filter(k => my[k] === null);
            return { key: open.reduce((b, k) => (char.stats[k] - AVG[k] > char.stats[b] - AVG[b] ? k : b), open[0]) };
        },
        'CPU Fácil':   (char, my, opp, r) => cpuDecide({ char, openKeys: KEYS.filter(k => my[k] === null), oppRoster: opp, rerollsLeft: r, difficulty: 'easy', characters, categories }),
        'CPU Normal':  (char, my, opp, r) => cpuDecide({ char, openKeys: KEYS.filter(k => my[k] === null), oppRoster: opp, rerollsLeft: r, difficulty: 'normal', characters, categories }),
        'CPU Difícil': (char, my, opp, r) => cpuDecide({ char, openKeys: KEYS.filter(k => my[k] === null), oppRoster: opp, rerollsLeft: r, difficulty: 'hard', characters, categories })
    };

    function play(first, second) {
        const used = new Set();
        const r1 = Object.fromEntries(KEYS.map(k => [k, null])), r2 = { ...r1 };
        const rr = { p1: 1, p2: 1 };
        const draw = () => {
            const pool = characters.filter(x => !used.has(x.id));
            const c = pick(pool.length ? pool : characters);
            used.add(c.id);
            return c;
        };
        for (let i = 0; i < KEYS.length; i++) {
            for (const [who, fn, my, opp] of [['p1', first, r1, r2], ['p2', second, r2, r1]]) {
                let ch = draw(), d = fn(ch, my, opp, rr[who]);
                if (d.reroll) { rr[who]--; ch = draw(); d = fn(ch, my, opp, 0); }
                my[d.key] = ch;
            }
        }
        let w1 = 0, w2 = 0, t1 = 0, t2 = 0;
        KEYS.forEach(k => {
            const a = r1[k].stats[k], b = r2[k].stats[k];
            t1 += a; t2 += b;
            if (a > b) w1++; else if (b > a) w2++;
        });
        return w1 > w2 ? 1 : w2 > w1 ? 2 : t1 > t2 ? 1 : t2 > t1 ? 2 : 0;
    }

    function duel(nameA, nameB) {
        let a = 0, b = 0, t = 0;
        for (let i = 0; i < N; i++) {
            const aFirst = i % 2 === 0;
            const res = aFirst ? play(bots[nameA], bots[nameB]) : play(bots[nameB], bots[nameA]);
            if (res === 0) t++; else if ((res === 1) === aFirst) a++; else b++;
        }
        console.log(`${nameA.padEnd(12)} vs ${nameB.padEnd(12)} → ${(100 * a / N).toFixed(1).padStart(5)}%  |  ${(100 * b / N).toFixed(1).padStart(5)}%  (empates ${(100 * t / N).toFixed(1)}%)`);
    }

    console.log(`\n=== ${label} (${characters.length} personajes | ${N} partidas/duelo) ===`);
    for (const cpu of ['CPU Fácil', 'CPU Normal', 'CPU Difícil']) {
        duel('Aleatorio', cpu);
        duel('Voraz', cpu);
    }
    duel('CPU Normal', 'CPU Difícil');
}

if (target === 'all' || target === 'mha') runSimulation('MY HERO ACADEMIA', CHARACTERS, CATEGORIES);
if (target === 'all' || target === 'op') runSimulation('ONE PIECE', OP_CHARACTERS, OP_CATEGORIES);