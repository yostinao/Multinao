// Valida characters.js, op-characters.js y sus imágenes:  node tools/validate-data.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CHARACTERS, CATEGORIES, DEBUT_ARCS } from '../javascript/data/characters.js';
import { OP_CHARACTERS, OP_CATEGORIES, OP_DEBUT_ARCS } from '../javascript/data/op-characters.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const err = (m) => errors.push(m);

function validateUniverse({ label, list, categories, arcs, imgDir, requiredFields, numericFields = [] }) {
    const ids = list.map(c => c.id);
    ids.filter((x, i) => ids.indexOf(x) !== i).forEach(id => err(`[${label}] ID duplicado: ${id}`));

    const fullDir = path.join(root, imgDir);
    if (!fs.existsSync(fullDir)) {
        err(`[${label}] No existe la carpeta ${imgDir}`);
        return;
    }

    const files = new Set(fs.readdirSync(fullDir));
    for (const c of list) {
        if (!files.has(`${c.id}.webp`)) err(`[${label}] Falta ${imgDir}/${c.id}.webp`);
        for (const { key } of categories) {
            const v = c.stats?.[key];
            if (typeof v !== 'number' || v < 0 || v > 100) {
                err(`[${label}] ${c.id}: stat inválido "${key}" = ${v}`);
            }
        }
        for (const f of requiredFields) {
            if (c[f] == null || (Array.isArray(c[f]) && !c[f].length)) {
                err(`[${label}] ${c.id}: falta "${f}"`);
            }
        }
        for (const f of numericFields) {
            if (typeof c[f] !== 'number' || Number.isNaN(c[f]) || c[f] < 0) {
                err(`[${label}] ${c.id}: campo numérico inválido "${f}" = ${c[f]}`);
            }
        }
        if (!arcs[c.debutArc]) err(`[${label}] ${c.id}: debutArc ${c.debutArc} sin etiqueta`);
    }

    for (const f of files) {
        if (!f.endsWith('.webp')) err(`[${label}] Archivo no .webp en ${imgDir}: ${f}`);
        else if (!ids.includes(f.replace(/\.webp$/, ''))) err(`[${label}] Imagen sin personaje: ${f}`);
    }
}

validateUniverse({
    label: 'MHA',
    list: CHARACTERS,
    categories: CATEGORIES,
    arcs: DEBUT_ARCS,
    imgDir: 'images/mha_characters',
    requiredFields: ['name', 'gender', 'roles', 'affiliations', 'quirkTypes', 'debutArc', 'quirkName', 'role', 'gradient', 'color', 'realName'],
    numericFields: ['height']
});

validateUniverse({
    label: 'One Piece',
    list: OP_CHARACTERS,
    categories: OP_CATEGORIES,
    arcs: OP_DEBUT_ARCS,
    imgDir: 'images/op_characters',
    requiredFields: ['name', 'title', 'gender', 'affiliations', 'devilFruit', 'fruitType', 'haki', 'origin', 'debutArc', 'gradient', 'color'],
    numericFields: ['bounty', 'height']
});

if (errors.length) {
    console.error(`✗ ${errors.length} problema(s):\n- ` + errors.join('\n- '));
    process.exit(1);
}
console.log(`✓ MHA (${CHARACTERS.length}) y One Piece (${OP_CHARACTERS.length}) validados correctamente.`);