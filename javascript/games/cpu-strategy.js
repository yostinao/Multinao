import { CHARACTERS, CATEGORIES } from '../data/mha-characters.js';

const cache = new WeakMap();

function getModel(characters, categories) {
    let byCat = cache.get(characters);
    if (!byCat) {
        byCat = new WeakMap();
        cache.set(characters, byCat);
    }
    let model = byCat.get(categories);
    if (model) return model;

    const avg = Object.fromEntries(
        categories.map(c => [c.key, characters.reduce((a, ch) => a + ch.stats[c.key], 0) / characters.length])
    );
    const sorted = Object.fromEntries(
        categories.map(c => [c.key, characters.map(ch => ch.stats[c.key]).sort((a, b) => a - b)])
    );
    const weights = Object.fromEntries(
        categories.map(c => [c.key, c.weight ?? 1])
    );

    model = { avg, sorted, weights, n: characters.length };
    byCat.set(categories, model);
    return model;
}

const winChance = (val, sorted, n) => {
    let lo = 0, hi = n;
    while (lo < hi) { const m = (lo + hi) >> 1; sorted[m] < val ? lo = m + 1 : hi = m; }
    return lo / n;
};

/**
 * Función pura de decisión para la CPU (sin dependencias del DOM).
 * @param {object} ctx
 * @returns {{ key: string, reroll?: boolean }}
 */
export function cpuDecide({
    char,
    openKeys,
    oppRoster,
    rerollsLeft,
    difficulty = 'normal',
    characters = CHARACTERS,
    categories = CATEGORIES
}) {
    const { avg, sorted, weights, n } = getModel(characters, categories);

    if (difficulty === 'easy') {
        const sortedOpen = [...openKeys].sort((a, b) => char.stats[b] - char.stats[a]);
        const idx = Math.random() < 0.55 ? 0 : Math.floor(Math.random() * sortedOpen.length);
        return { key: sortedOpen[idx] };
    }

    const total = Math.round(categories.reduce((a, c) => a + char.stats[c.key], 0) / categories.length);
    if (rerollsLeft > 0) {
        const threshold = difficulty === 'hard'
            ? (openKeys.length <= 2 ? 60 : 54)
            : 49;
        if (total < threshold) return { key: openKeys[0], reroll: true };
    }

    if (difficulty === 'normal') {
        const key = openKeys.reduce((best, k) => {
            const s = (char.stats[k] - avg[k]) * (weights[k] || 1);
            const sb = (char.stats[best] - avg[best]) * (weights[best] || 1);
            return s > sb ? k : best;
        }, openKeys[0]);
        return { key };
    }

    // hard: estima probabilidad real de ganar cada ranura abierta
    let bestKey = openKeys[0], bestScore = -Infinity;
    for (const k of openKeys) {
        const val = char.stats[k];
        const opp = oppRoster[k];
        let p;
        if (opp) {
            const ov = opp.stats[k];
            p = val > ov ? 1 : val === ov ? 0.5 : 0;
        } else {
            p = winChance(val, sorted[k], n);
        }
        const score = p * 100 + (val - avg[k]) * 0.28 + ((weights[k] || 1) - 1) * 40;
        if (score > bestScore) { bestScore = score; bestKey = k; }
    }
    return { key: bestKey };
}