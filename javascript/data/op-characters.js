export const OP_CATEGORIES = [
    { key: 'paramecia',    label: 'Paramecia',    icon: '🔮', color: 'text-purple-400' },
    { key: 'logia',        label: 'Logia',        icon: '🌋', color: 'text-orange-400' },
    { key: 'zoan',         label: 'Zoan',         icon: '🦁', color: 'text-lime-400' },
    { key: 'haki',         label: 'Haki',         icon: '👑', color: 'text-amber-400' },
    { key: 'strength',     label: 'Fuerza',       icon: '💪', color: 'text-red-400' },
    { key: 'speed',        label: 'Velocidad',    icon: '💨', color: 'text-cyan-400' },
    { key: 'resistance',   label: 'Resistencia',  icon: '🛡️', color: 'text-emerald-400' },
    { key: 'intelligence', label: 'Inteligencia', icon: '🧠', color: 'text-blue-400' }
];

export const OP_DEBUT_ARCS = {
    1:  '1. Romance Dawn',
    2:  '2. Ciudad Orange',
    3:  '3. Villa Syrup',
    4:  '4. Baratie',
    5:  '5. Arlong Park',
    6:  '6. Loguetown',
    7:  '7. Reverse Mountain',
    8:  '8. Whisky Peak',
    9:  '9. Little Garden',
    10: '10. Isla de Drum',
    11: '11. Arabasta',
    12: '12. Jaya',
    13: '13. Skypiea',
    14: '14. Long Ring Long Land',
    15: '15. Water 7',
    16: '16. Enies Lobby',
    17: '17. Post-Enies Lobby',
    18: '18. Thriller Bark',
    19: '19. Archipiélago Sabaody',
    20: '20. Amazon Lily',
    21: '21. Impel Down',
    22: '22. Marineford',
    23: '23. Post-Guerra',
    24: '24. Regreso a Sabaody',
    25: '25. Isla Gyojin'
};

/**
 * Datos estrictamente hasta el final del arco de la Isla Gyojin (Cap. 653 / Ep. 574).
 * - bounty: recompensa en millones de Berries hasta Isla Gyojin (0 = sin recompensa o no revelada aún).
 * - height: altura en centímetros.
 */
export const OP_CHARACTERS = [
    // --- LEYENDAS, YONKO Y MARINA TOP ---
    {
        id: 'roger', name: 'Gol D. Roger', title: 'Rey de los Piratas',
        gender: 'Masculino', affiliations: ['Piratas de Roger'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Observación', 'Armadura', 'Conquistador'], bounty: 0, height: 274, origin: 'East Blue', debutArc: 1,
        color: '#b91c1c', gradient: 'from-red-700 to-amber-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 100, strength: 98, speed: 96, resistance: 97, intelligence: 88 }
    },
    {
        id: 'whitebeard', name: 'Edward Newgate (Barbablanca)', title: 'El Hombre Más Fuerte del Mundo',
        gender: 'Masculino', affiliations: ['Piratas de Barbablanca'], devilFruit: 'Gura Gura no Mi', fruitType: 'Paramecia',
        haki: ['Observación', 'Armadura', 'Conquistador'], bounty: 0, height: 666, origin: 'Grand Line', debutArc: 12,
        color: '#d97706', gradient: 'from-amber-500 to-slate-900',
        stats: { paramecia: 100, logia: 0, zoan: 0, haki: 97, strength: 100, speed: 84, resistance: 100, intelligence: 86 }
    },
    {
        id: 'garp', name: 'Monkey D. Garp', title: 'Héroe de la Marina',
        gender: 'Masculino', affiliations: ['Marina'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Observación', 'Armadura'], bounty: 0, height: 287, origin: 'East Blue', debutArc: 17,
        color: '#1d4ed8', gradient: 'from-blue-700 to-slate-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 96, strength: 99, speed: 91, resistance: 95, intelligence: 76 }
    },
    {
        id: 'sengoku', name: 'Sengoku', title: 'Ex-Almirante de la Flota',
        gender: 'Masculino', affiliations: ['Marina'], devilFruit: 'Hito Hito no Mi, Modelo: Daibutsu', fruitType: 'Zoan Mítica',
        haki: ['Observación', 'Armadura', 'Conquistador'], bounty: 0, height: 278, origin: 'South Blue', debutArc: 12,
        color: '#ca8a04', gradient: 'from-yellow-500 to-amber-900',
        stats: { paramecia: 0, logia: 0, zoan: 95, haki: 93, strength: 94, speed: 83, resistance: 93, intelligence: 96 }
    },
    {
        id: 'rayleigh', name: 'Silvers Rayleigh', title: 'El Rey Oscuro',
        gender: 'Masculino', affiliations: ['Independiente'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Observación', 'Armadura', 'Conquistador'], bounty: 0, height: 188, origin: 'North Blue', debutArc: 19,
        color: '#475569', gradient: 'from-slate-500 to-zinc-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 97, strength: 90, speed: 93, resistance: 90, intelligence: 93 }
    },
    {
        id: 'shanks', name: 'Shanks', title: 'Pelirrojo / Yonko',
        gender: 'Masculino', affiliations: ['Piratas del Pelirrojo'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Observación', 'Armadura', 'Conquistador'], bounty: 0, height: 199, origin: 'West Blue', debutArc: 1,
        color: '#991b1b', gradient: 'from-red-700 to-zinc-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 99, strength: 92, speed: 95, resistance: 92, intelligence: 90 }
    },
    {
        id: 'akainu', name: 'Sakazuki (Akainu)', title: 'Almirante de la Flota',
        gender: 'Masculino', affiliations: ['Marina'], devilFruit: 'Magu Magu no Mi', fruitType: 'Logia',
        haki: ['Observación', 'Armadura'], bounty: 0, height: 306, origin: 'North Blue', debutArc: 16,
        color: '#dc2626', gradient: 'from-red-600 to-stone-950',
        stats: { paramecia: 0, logia: 98, zoan: 0, haki: 91, strength: 94, speed: 87, resistance: 97, intelligence: 89 }
    },
    {
        id: 'aokiji', name: 'Kuzan (Aokiji)', title: 'Ex-Almirante',
        gender: 'Masculino', affiliations: ['Independiente'], devilFruit: 'Hie Hie no Mi', fruitType: 'Logia',
        haki: ['Observación', 'Armadura'], bounty: 0, height: 298, origin: 'South Blue', debutArc: 14,
        color: '#0284c7', gradient: 'from-cyan-500 to-blue-950',
        stats: { paramecia: 0, logia: 96, zoan: 0, haki: 90, strength: 91, speed: 90, resistance: 96, intelligence: 88 }
    },
    {
        id: 'kizaru', name: 'Borsalino (Kizaru)', title: 'Almirante',
        gender: 'Masculino', affiliations: ['Marina'], devilFruit: 'Pika Pika no Mi', fruitType: 'Logia',
        haki: ['Observación', 'Armadura'], bounty: 0, height: 302, origin: 'North Blue', debutArc: 19,
        color: '#eab308', gradient: 'from-yellow-400 to-amber-800',
        stats: { paramecia: 0, logia: 97, zoan: 0, haki: 89, strength: 88, speed: 100, resistance: 90, intelligence: 84 }
    },
    {
        id: 'blackbeard', name: 'Marshall D. Teach (Barbanegra)', title: 'Yonko / Capitán Piratas de Barbanegra',
        gender: 'Masculino', affiliations: ['Piratas de Barbanegra'], devilFruit: 'Yami Yami no Mi + Gura Gura no Mi', fruitType: 'Logia / Paramecia',
        haki: ['Ninguno'], bounty: 0, height: 344, origin: 'Grand Line', debutArc: 12,
        color: '#1e1b4b', gradient: 'from-purple-950 to-black',
        stats: { paramecia: 96, logia: 97, zoan: 0, haki: 65, strength: 93, speed: 76, resistance: 95, intelligence: 92 }
    },
    {
        id: 'dragon', name: 'Monkey D. Dragon', title: 'Líder del Ejército Revolucionario',
        gender: 'Masculino', affiliations: ['Ejército Revolucionario'], devilFruit: 'Desconocida', fruitType: 'Desconocido',
        haki: ['Ninguno'], bounty: 0, height: 256, origin: 'East Blue', debutArc: 6,
        color: '#065f46', gradient: 'from-emerald-800 to-zinc-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 88, strength: 88, speed: 88, resistance: 88, intelligence: 96 }
    },

    // --- SHICHIBUKAI Y COMANDANTES TOP ---
    {
        id: 'mihawk', name: 'Dracule Mihawk', title: 'El Mejor Espadachín del Mundo',
        gender: 'Masculino', affiliations: ['Shichibukai'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Observación', 'Armadura'], bounty: 0, height: 198, origin: 'Desconocido', debutArc: 4,
        color: '#7f1d1d', gradient: 'from-red-900 to-slate-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 95, strength: 94, speed: 94, resistance: 91, intelligence: 89 }
    },
    {
        id: 'doflamingo', name: 'Donquixote Doflamingo', title: 'Shichibukai / Joker',
        gender: 'Masculino', affiliations: ['Piratas Donquixote'], devilFruit: 'Ito Ito no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 340, height: 305, origin: 'North Blue', debutArc: 12,
        color: '#db2777', gradient: 'from-pink-600 to-purple-950',
        stats: { paramecia: 92, logia: 0, zoan: 0, haki: 78, strength: 85, speed: 89, resistance: 88, intelligence: 93 }
    },
    {
        id: 'kuma', name: 'Bartholomew Kuma', title: 'El Tirano / Pacifista PX-0',
        gender: 'Masculino', affiliations: ['Ejército Revolucionario'], devilFruit: 'Nikyu Nikyu no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 296, height: 689, origin: 'South Blue', debutArc: 12,
        color: '#9a3412', gradient: 'from-orange-800 to-stone-950',
        stats: { paramecia: 95, logia: 0, zoan: 0, haki: 72, strength: 93, speed: 92, resistance: 94, intelligence: 80 }
    },
    {
        id: 'boa_hancock', name: 'Boa Hancock', title: 'Emperatriz Pirata',
        gender: 'Femenino', affiliations: ['Piratas Kuja'], devilFruit: 'Mero Mero no Mi', fruitType: 'Paramecia',
        haki: ['Observación', 'Armadura', 'Conquistador'], bounty: 80, height: 191, origin: 'Calm Belt', debutArc: 20,
        color: '#be185d', gradient: 'from-rose-600 to-purple-950',
        stats: { paramecia: 92, logia: 0, zoan: 0, haki: 87, strength: 82, speed: 88, resistance: 81, intelligence: 82 }
    },
    {
        id: 'jinbe', name: 'Jinbe', title: 'El Caballero del Mar',
        gender: 'Masculino', affiliations: ['Piratas del Sol'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Armadura'], bounty: 438, height: 301, origin: 'Grand Line', debutArc: 21,
        color: '#1d4ed8', gradient: 'from-blue-600 to-amber-800',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 85, strength: 92, speed: 82, resistance: 91, intelligence: 87 }
    },
    {
        id: 'crocodile', name: 'Sir Crocodile', title: 'Ex-Shichibukai / Líder Baroque Works',
        gender: 'Masculino', affiliations: ['Independiente'], devilFruit: 'Suna Suna no Mi', fruitType: 'Logia',
        haki: ['Ninguno'], bounty: 81, height: 253, origin: 'Grand Line', debutArc: 8,
        color: '#b45309', gradient: 'from-amber-700 to-stone-950',
        stats: { paramecia: 0, logia: 90, zoan: 0, haki: 65, strength: 78, speed: 81, resistance: 82, intelligence: 93 }
    },
    {
        id: 'moria', name: 'Gecko Moria', title: 'Ex-Shichibukai / Amo de Thriller Bark',
        gender: 'Masculino', affiliations: ['Piratas de Thriller Bark'], devilFruit: 'Kage Kage no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 320, height: 692, origin: 'West Blue', debutArc: 18,
        color: '#581c87', gradient: 'from-purple-900 to-zinc-950',
        stats: { paramecia: 88, logia: 0, zoan: 0, haki: 55, strength: 82, speed: 64, resistance: 83, intelligence: 83 }
    },
    {
        id: 'marco', name: 'Marco', title: 'El Fénix / Comandante 1ª División',
        gender: 'Masculino', affiliations: ['Piratas de Barbablanca'], devilFruit: 'Tori Tori no Mi, Modelo: Fénix', fruitType: 'Zoan Mítica',
        haki: ['Observación', 'Armadura'], bounty: 0, height: 203, origin: 'Grand Line', debutArc: 12,
        color: '#0284c7', gradient: 'from-sky-500 to-amber-700',
        stats: { paramecia: 0, logia: 0, zoan: 96, haki: 88, strength: 86, speed: 93, resistance: 96, intelligence: 87 }
    },
    {
        id: 'ace', name: 'Portgas D. Ace', title: 'Puño de Fuego / Comandante 2ª División',
        gender: 'Masculino', affiliations: ['Piratas de Barbablanca'], devilFruit: 'Mera Mera no Mi', fruitType: 'Logia',
        haki: ['Conquistador'], bounty: 550, height: 185, origin: 'South Blue', debutArc: 11,
        color: '#ea580c', gradient: 'from-orange-500 to-red-800',
        stats: { paramecia: 0, logia: 93, zoan: 0, haki: 80, strength: 86, speed: 90, resistance: 86, intelligence: 79 }
    },
    {
        id: 'jozu', name: 'Jozu', title: 'Diamante / Comandante 3ª División',
        gender: 'Masculino', affiliations: ['Piratas de Barbablanca'], devilFruit: 'Kira Kira no Mi', fruitType: 'Paramecia',
        haki: ['Observación', 'Armadura'], bounty: 0, height: 503, origin: 'West Blue', debutArc: 12,
        color: '#0369a1', gradient: 'from-cyan-600 to-slate-900',
        stats: { paramecia: 91, logia: 0, zoan: 0, haki: 85, strength: 96, speed: 83, resistance: 97, intelligence: 75 }
    },
    {
        id: 'magellan', name: 'Magellan', title: 'Alcaide de Impel Down',
        gender: 'Masculino', affiliations: ['Impel Down'], devilFruit: 'Doku Doku no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 0, height: 491, origin: 'Grand Line', debutArc: 21,
        color: '#6b21a8', gradient: 'from-purple-800 to-zinc-950',
        stats: { paramecia: 96, logia: 0, zoan: 0, haki: 65, strength: 86, speed: 74, resistance: 88, intelligence: 82 }
    },
    {
        id: 'shiryu', name: 'Shiryu', title: 'De la Lluvia / Ex-Jefe Guardia Impel Down',
        gender: 'Masculino', affiliations: ['Piratas de Barbanegra'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 340, origin: 'Grand Line', debutArc: 21,
        color: '#334155', gradient: 'from-slate-700 to-red-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 78, strength: 87, speed: 88, resistance: 86, intelligence: 81 }
    },
    {
        id: 'ivankov', name: 'Emporio Ivankov', title: 'Reina de Kamabakka / Comandante Revolucionario',
        gender: 'Otro', affiliations: ['Ejército Revolucionario'], devilFruit: 'Horu Horu no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 0, height: 449, origin: 'Grand Line', debutArc: 21,
        color: '#9d174d', gradient: 'from-pink-700 to-indigo-950',
        stats: { paramecia: 89, logia: 0, zoan: 0, haki: 75, strength: 84, speed: 85, resistance: 87, intelligence: 86 }
    },

    // --- SOMBRERO DE PAJA (POST-TIMESKIP / ISLA GYOJIN) ---
    {
        id: 'luffy', name: 'Monkey D. Luffy', title: 'Sombrero de Paja / Capitán',
        gender: 'Masculino', affiliations: ['Piratas de Sombrero de Paja'], devilFruit: 'Gomu Gomu no Mi', fruitType: 'Paramecia',
        haki: ['Observación', 'Armadura', 'Conquistador'], bounty: 400, height: 174, origin: 'East Blue', debutArc: 1,
        color: '#dc2626', gradient: 'from-red-600 to-yellow-600',
        stats: { paramecia: 91, logia: 0, zoan: 0, haki: 89, strength: 92, speed: 94, resistance: 95, intelligence: 66 }
    },
    {
        id: 'zoro', name: 'Roronoa Zoro', title: 'El Cazador de Piratas',
        gender: 'Masculino', affiliations: ['Piratas de Sombrero de Paja'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Observación', 'Armadura'], bounty: 120, height: 181, origin: 'East Blue', debutArc: 1,
        color: '#15803d', gradient: 'from-green-600 to-slate-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 86, strength: 93, speed: 89, resistance: 94, intelligence: 68 }
    },
    {
        id: 'sanji', name: 'Sanji', title: 'Pierna Negra / Cocinero',
        gender: 'Masculino', affiliations: ['Piratas de Sombrero de Paja'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Observación', 'Armadura'], bounty: 77, height: 180, origin: 'North Blue', debutArc: 4,
        color: '#ca8a04', gradient: 'from-yellow-500 to-slate-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 84, strength: 87, speed: 93, resistance: 87, intelligence: 85 }
    },
    {
        id: 'robin', name: 'Nico Robin', title: 'Niña Demonio / Arqueóloga',
        gender: 'Femenino', affiliations: ['Piratas de Sombrero de Paja'], devilFruit: 'Hana Hana no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 80, height: 188, origin: 'West Blue', debutArc: 8,
        color: '#6d28d9', gradient: 'from-purple-700 to-slate-950',
        stats: { paramecia: 86, logia: 0, zoan: 0, haki: 0, strength: 74, speed: 77, resistance: 76, intelligence: 96 }
    },
    {
        id: 'franky', name: 'Franky', title: 'Cyborg / Carpintero',
        gender: 'Masculino', affiliations: ['Piratas de Sombrero de Paja'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 44, height: 240, origin: 'South Blue', debutArc: 15,
        color: '#0284c7', gradient: 'from-cyan-500 to-blue-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 88, speed: 73, resistance: 89, intelligence: 90 }
    },
    {
        id: 'brook', name: 'Brook', title: 'Soul King / Músico',
        gender: 'Masculino', affiliations: ['Piratas de Sombrero de Paja'], devilFruit: 'Yomi Yomi no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 33, height: 277, origin: 'West Blue', debutArc: 18,
        color: '#374151', gradient: 'from-zinc-700 to-purple-950',
        stats: { paramecia: 81, logia: 0, zoan: 0, haki: 0, strength: 72, speed: 91, resistance: 78, intelligence: 77 }
    },
    {
        id: 'chopper', name: 'Tony Tony Chopper', title: 'Amante del Algodón de Azúcar / Médico',
        gender: 'Masculino', affiliations: ['Piratas de Sombrero de Paja'], devilFruit: 'Hito Hito no Mi', fruitType: 'Zoan',
        haki: ['Ninguno'], bounty: 0.00005, height: 90, origin: 'Grand Line', debutArc: 10,
        color: '#db2777', gradient: 'from-pink-500 to-amber-800',
        stats: { paramecia: 0, logia: 0, zoan: 83, haki: 0, strength: 86, speed: 79, resistance: 83, intelligence: 91 }
    },
    {
        id: 'nami', name: 'Nami', title: 'Gata Ladrona / Navegante',
        gender: 'Femenino', affiliations: ['Piratas de Sombrero de Paja'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 16, height: 170, origin: 'East Blue', debutArc: 1,
        color: '#ea580c', gradient: 'from-orange-500 to-sky-700',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 58, speed: 76, resistance: 66, intelligence: 94 }
    },
    {
        id: 'usopp', name: 'Usopp', title: 'Sogeking / Francotirador',
        gender: 'Masculino', affiliations: ['Piratas de Sombrero de Paja'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 30, height: 176, origin: 'East Blue', debutArc: 3,
        color: '#b45309', gradient: 'from-amber-600 to-emerald-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 64, speed: 78, resistance: 77, intelligence: 87 }
    },

    // --- SUPERNOVAS / PEOR GENERACIÓN (HASTA ISLA GYOJIN) ---
    {
        id: 'eustass_kid', name: 'Eustass Kid', title: 'Capitán / Piratas de Kid',
        gender: 'Masculino', affiliations: ['Piratas de Kid'], devilFruit: 'Jiki Jiki no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 470, height: 205, origin: 'South Blue', debutArc: 19,
        color: '#991b1b', gradient: 'from-red-700 to-slate-900',
        stats: { paramecia: 88, logia: 0, zoan: 0, haki: 70, strength: 88, speed: 80, resistance: 87, intelligence: 74 }
    },
    {
        id: 'law', name: 'Trafalgar Law', title: 'Cirujano de la Muerte',
        gender: 'Masculino', affiliations: ['Piratas Heart'], devilFruit: 'Ope Ope no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 440, height: 191, origin: 'North Blue', debutArc: 19,
        color: '#ca8a04', gradient: 'from-yellow-500 to-zinc-900',
        stats: { paramecia: 95, logia: 0, zoan: 0, haki: 72, strength: 77, speed: 86, resistance: 81, intelligence: 94 }
    },
    {
        id: 'x_drake', name: 'X Drake', title: 'Bandera Roja / Ex-Contraalmirante',
        gender: 'Masculino', affiliations: ['Piratas de Drake'], devilFruit: 'Ryu Ryu no Mi, Modelo: Allosaurus', fruitType: 'Zoan Prehistórica',
        haki: ['Ninguno'], bounty: 222, height: 233, origin: 'North Blue', debutArc: 19,
        color: '#9a3412', gradient: 'from-orange-800 to-red-950',
        stats: { paramecia: 0, logia: 0, zoan: 87, haki: 74, strength: 88, speed: 82, resistance: 87, intelligence: 84 }
    },
    {
        id: 'hawkins', name: 'Basil Hawkins', title: 'El Mago',
        gender: 'Masculino', affiliations: ['Piratas de Hawkins'], devilFruit: 'Wara Wara no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 249, height: 210, origin: 'North Blue', debutArc: 19,
        color: '#a16207', gradient: 'from-yellow-700 to-purple-950',
        stats: { paramecia: 85, logia: 0, zoan: 0, haki: 65, strength: 78, speed: 76, resistance: 86, intelligence: 87 }
    },
    {
        id: 'killer', name: 'Killer', title: 'El Soldado Masacre',
        gender: 'Masculino', affiliations: ['Piratas de Kid'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 162, height: 195, origin: 'South Blue', debutArc: 19,
        color: '#1e3a8a', gradient: 'from-blue-800 to-zinc-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 68, strength: 81, speed: 88, resistance: 82, intelligence: 83 }
    },
    {
        id: 'apoo', name: 'Scratchmen Apoo', title: 'Rugido del Mar',
        gender: 'Masculino', affiliations: ['Piratas On Air'], devilFruit: 'Oto Oto no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 198, height: 256, origin: 'Grand Line', debutArc: 19,
        color: '#b45309', gradient: 'from-amber-600 to-emerald-950',
        stats: { paramecia: 84, logia: 0, zoan: 0, haki: 60, strength: 75, speed: 82, resistance: 78, intelligence: 80 }
    },
    {
        id: 'bege', name: 'Capone Bege', title: 'Gang Bege',
        gender: 'Masculino', affiliations: ['Piratas Fire Tank'], devilFruit: 'Shiro Shiro no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 138, height: 166, origin: 'West Blue', debutArc: 19,
        color: '#374151', gradient: 'from-gray-700 to-stone-950',
        stats: { paramecia: 84, logia: 0, zoan: 0, haki: 60, strength: 74, speed: 68, resistance: 89, intelligence: 88 }
    },
    {
        id: 'bonney', name: 'Jewelry Bonney', title: 'La Glotona',
        gender: 'Femenino', affiliations: ['Piratas de Bonney'], devilFruit: 'Toshi Toshi no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 140, height: 174, origin: 'South Blue', debutArc: 19,
        color: '#db2777', gradient: 'from-pink-600 to-rose-950',
        stats: { paramecia: 86, logia: 0, zoan: 0, haki: 55, strength: 71, speed: 78, resistance: 74, intelligence: 77 }
    },
    {
        id: 'urouge', name: 'Urouge', title: 'El Monje Loco',
        gender: 'Masculino', affiliations: ['Piratas del Monje Caído'], devilFruit: 'Paramecia sin nombre', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 108, height: 388, origin: 'Islas del Cielo', debutArc: 19,
        color: '#7c2d12', gradient: 'from-orange-900 to-slate-950',
        stats: { paramecia: 84, logia: 0, zoan: 0, haki: 65, strength: 90, speed: 76, resistance: 88, intelligence: 75 }
    },

    // --- GRAND LINE, SKYPIEA, WATER 7 / ENIES LOBBY, THRILLER BARK ---
    {
        id: 'enel', name: 'Enel', title: 'Dios de Skypiea',
        gender: 'Masculino', affiliations: ['Sacerdotes de Skypiea'], devilFruit: 'Goro Goro no Mi', fruitType: 'Logia',
        haki: ['Observación'], bounty: 0, height: 266, origin: 'Islas del Cielo', debutArc: 13,
        color: '#0284c7', gradient: 'from-sky-400 to-indigo-900',
        stats: { paramecia: 0, logia: 98, zoan: 0, haki: 85, strength: 76, speed: 97, resistance: 74, intelligence: 84 }
    },
    {
        id: 'kaku', name: 'Kaku', title: 'CP9 / Viento de Montaña',
        gender: 'Masculino', affiliations: ['Independiente'], devilFruit: 'Ushi Ushi no Mi, Modelo: Jirafa', fruitType: 'Zoan',
        haki: ['Ninguno'], bounty: 0, height: 193, origin: 'East Blue', debutArc: 15,
        color: '#ca8a04', gradient: 'from-yellow-600 to-stone-900',
        stats: { paramecia: 0, logia: 0, zoan: 79, haki: 0, strength: 82, speed: 86, resistance: 81, intelligence: 82 }
    },
    {
        id: 'jabra', name: 'Jabra', title: 'Agente CP9',
        gender: 'Masculino', affiliations: ['Independiente'], devilFruit: 'Inu Inu no Mi, Modelo: Lobo', fruitType: 'Zoan',
        haki: ['Ninguno'], bounty: 0, height: 212, origin: 'North Blue', debutArc: 16,
        color: '#991b1b', gradient: 'from-red-800 to-zinc-950',
        stats: { paramecia: 0, logia: 0, zoan: 80, haki: 0, strength: 83, speed: 84, resistance: 82, intelligence: 74 }
    },
    {
        id: 'blueno', name: 'Blueno', title: 'Agente CP9',
        gender: 'Masculino', affiliations: ['Independiente'], devilFruit: 'Doa Doa no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 0, height: 258, origin: 'North Blue', debutArc: 15,
        color: '#1e3a8a', gradient: 'from-blue-900 to-slate-950',
        stats: { paramecia: 83, logia: 0, zoan: 0, haki: 0, strength: 81, speed: 75, resistance: 83, intelligence: 78 }
    },
    {
        id: 'smoker', name: 'Smoker', title: 'Cazador Blanco / Vicealmirante',
        gender: 'Masculino', affiliations: ['Marina'], devilFruit: 'Moku Moku no Mi', fruitType: 'Logia',
        haki: ['Ninguno'], bounty: 0, height: 209, origin: 'Grand Line', debutArc: 6,
        color: '#64748b', gradient: 'from-slate-500 to-zinc-900',
        stats: { paramecia: 0, logia: 86, zoan: 0, haki: 65, strength: 81, speed: 82, resistance: 82, intelligence: 80 }
    },
    {
        id: 'sentomaru', name: 'Sentomaru', title: 'Capitán de la Unidad Científica',
        gender: 'Masculino', affiliations: ['Marina'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Armadura'], bounty: 0, height: 279, origin: 'Grand Line', debutArc: 19,
        color: '#b91c1c', gradient: 'from-red-700 to-amber-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 83, strength: 85, speed: 74, resistance: 86, intelligence: 77 }
    },
    {
        id: 'fisher_tiger', name: 'Fisher Tiger', title: 'Fundador de los Piratas del Sol',
        gender: 'Masculino', affiliations: ['Piratas del Sol'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 230, height: 520, origin: 'Grand Line', debutArc: 20,
        color: '#be123c', gradient: 'from-rose-700 to-amber-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 65, strength: 89, speed: 79, resistance: 86, intelligence: 80 }
    },
    {
        id: 'hody_jones', name: 'Hody Jones', title: 'Capitán Nuevos Piratas Gyojin',
        gender: 'Masculino', affiliations: ['Nuevos Piratas Gyojin'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 331, origin: 'Grand Line', debutArc: 25,
        color: '#334155', gradient: 'from-slate-600 to-red-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 86, speed: 78, resistance: 84, intelligence: 72 }
    },
    {
        id: 'dorry', name: 'Dorry', title: 'El Ogro Azul / Capitán Piratas Gigantes',
        gender: 'Masculino', affiliations: ['Piratas Gigantes Guerreros'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 100, height: 2260, origin: 'Grand Line', debutArc: 9,
        color: '#1d4ed8', gradient: 'from-blue-700 to-stone-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 60, strength: 93, speed: 70, resistance: 91, intelligence: 73 }
    },
    {
        id: 'brogy', name: 'Brogy', title: 'El Ogro Rojo / Capitán Piratas Gigantes',
        gender: 'Masculino', affiliations: ['Piratas Gigantes Guerreros'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 100, height: 2130, origin: 'Grand Line', debutArc: 9,
        color: '#b91c1c', gradient: 'from-red-700 to-stone-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 60, strength: 93, speed: 70, resistance: 91, intelligence: 73 }
    },
    {
        id: 'daz_bones', name: 'Daz Bones (Mr. 1)', title: 'Asesino / Oficial Baroque Works',
        gender: 'Masculino', affiliations: ['Independiente'], devilFruit: 'Supa Supa no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 75, height: 212, origin: 'West Blue', debutArc: 11,
        color: '#475569', gradient: 'from-slate-600 to-zinc-950',
        stats: { paramecia: 82, logia: 0, zoan: 0, haki: 0, strength: 81, speed: 79, resistance: 84, intelligence: 77 }
    },
    {
        id: 'bon_clay', name: 'Bentham (Mr. 2 Bon Clay)', title: 'Oficial Baroque Works',
        gender: 'Otro', affiliations: ['Reino de Kamabakka'], devilFruit: 'Mane Mane no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 32, height: 238, origin: 'East Blue', debutArc: 11,
        color: '#ec4899', gradient: 'from-pink-500 to-sky-800',
        stats: { paramecia: 79, logia: 0, zoan: 0, haki: 0, strength: 76, speed: 81, resistance: 83, intelligence: 76 }
    },
    {
        id: 'wyper', name: 'Wyper', title: 'Guerrero Shandia / Berserker',
        gender: 'Masculino', affiliations: ['Guerreros Shandia'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 183, origin: 'Islas del Cielo', debutArc: 13,
        color: '#991b1b', gradient: 'from-red-800 to-amber-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 79, speed: 81, resistance: 85, intelligence: 74 }
    },
    {
        id: 'perona', name: 'Perona', title: 'Princesa Fantasma',
        gender: 'Femenino', affiliations: ['Independiente'], devilFruit: 'Horo Horo no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 0, height: 160, origin: 'West Blue', debutArc: 18,
        color: '#db2777', gradient: 'from-pink-600 to-slate-950',
        stats: { paramecia: 87, logia: 0, zoan: 0, haki: 0, strength: 45, speed: 72, resistance: 60, intelligence: 75 }
    },
    {
        id: 'inazuma', name: 'Inazuma', title: 'Oficial del Ejército Revolucionario',
        gender: 'Otro', affiliations: ['Ejército Revolucionario'], devilFruit: 'Choki Choki no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 0, height: 229, origin: 'South Blue', debutArc: 21,
        color: '#ea580c', gradient: 'from-orange-600 to-zinc-900',
        stats: { paramecia: 80, logia: 0, zoan: 0, haki: 0, strength: 72, speed: 75, resistance: 74, intelligence: 81 }
    },
    {
        id: 'sabo', name: 'Sabo', title: 'Hermano de Luffy y Ace',
        gender: 'Masculino', affiliations: ['Ejército Revolucionario'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 100, origin: 'East Blue', debutArc: 23,
        color: '#0369a1', gradient: 'from-sky-700 to-amber-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 60, speed: 68, resistance: 62, intelligence: 76 }
    },
    {
        id: 'dadan', name: 'Curly Dadan', title: 'Jefa de los Bandidos de la Montaña',
        gender: 'Femenino', affiliations: ['Familia Dadan'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 7.8, height: 221, origin: 'East Blue', debutArc: 23,
        color: '#9a3412', gradient: 'from-orange-800 to-stone-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 73, speed: 55, resistance: 74, intelligence: 68 }
    },
    {
        id: 'koby', name: 'Koby', title: 'Capitán / Discípulo de Garp',
        gender: 'Masculino', affiliations: ['Marina'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Observación'], bounty: 0, height: 167, origin: 'East Blue', debutArc: 1,
        color: '#db2777', gradient: 'from-pink-600 to-blue-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 72, strength: 71, speed: 80, resistance: 73, intelligence: 76 }
    },
    {
        id: 'helmeppo', name: 'Helmeppo', title: 'Teniente Comandante',
        gender: 'Masculino', affiliations: ['Marina'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 179, origin: 'East Blue', debutArc: 1,
        color: '#ca8a04', gradient: 'from-yellow-600 to-blue-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 66, speed: 71, resistance: 67, intelligence: 72 }
    },
    {
        id: 'tashigi', name: 'Tashigi', title: 'Espadachina de la Marina',
        gender: 'Femenino', affiliations: ['Marina'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 170, origin: 'East Blue', debutArc: 6,
        color: '#1e40af', gradient: 'from-blue-700 to-slate-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 66, speed: 74, resistance: 68, intelligence: 79 }
    },

    // --- EAST BLUE Y VILLANOS INICIALES ---
    {
        id: 'arlong', name: 'Arlong', title: 'El Sierra / Capitán Piratas de Arlong',
        gender: 'Masculino', affiliations: ['Piratas de Arlong'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 20, height: 263, origin: 'Grand Line', debutArc: 5,
        color: '#0369a1', gradient: 'from-sky-700 to-indigo-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 82, speed: 74, resistance: 79, intelligence: 74 }
    },
    {
        id: 'krieg', name: 'Don Krieg', title: 'Almirante de la Flota Pirata',
        gender: 'Masculino', affiliations: ['Piratas de Krieg'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 17, height: 243, origin: 'East Blue', debutArc: 4,
        color: '#b45309', gradient: 'from-amber-700 to-zinc-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 78, speed: 60, resistance: 77, intelligence: 73 }
    },
    {
        id: 'gin', name: 'Gin', title: 'El Hombre Demonio / Comandante de Krieg',
        gender: 'Masculino', affiliations: ['Piratas de Krieg'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 12, height: 186, origin: 'East Blue', debutArc: 4,
        color: '#374151', gradient: 'from-gray-700 to-amber-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 72, speed: 77, resistance: 73, intelligence: 71 }
    },
    {
        id: 'kuro', name: 'Kuro', title: 'El de los Cien Planes / Klahadore',
        gender: 'Masculino', affiliations: ['Piratas Gato Negro'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 16, height: 207, origin: 'East Blue', debutArc: 3,
        color: '#1f2937', gradient: 'from-zinc-800 to-slate-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 66, speed: 83, resistance: 64, intelligence: 85 }
    },
    {
        id: 'buggy', name: 'Buggy', title: 'El Payaso / Capitán Piratas de Buggy',
        gender: 'Masculino', affiliations: ['Piratas de Buggy'], devilFruit: 'Bara Bara no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 15, height: 192, origin: 'Grand Line', debutArc: 2,
        color: '#dc2626', gradient: 'from-red-600 to-blue-900',
        stats: { paramecia: 77, logia: 0, zoan: 0, haki: 0, strength: 60, speed: 66, resistance: 75, intelligence: 74 }
    },
    {
        id: 'alvida', name: 'Alvida', title: 'Maza de Hierro',
        gender: 'Femenino', affiliations: ['Piratas de Buggy'], devilFruit: 'Sube Sube no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 5, height: 198, origin: 'East Blue', debutArc: 1,
        color: '#be185d', gradient: 'from-pink-700 to-purple-950',
        stats: { paramecia: 73, logia: 0, zoan: 0, haki: 0, strength: 67, speed: 65, resistance: 72, intelligence: 68 }
    },
    {
        id: 'morgan', name: 'Morgan', title: 'Mano de Hacha / Ex-Capitán Marina',
        gender: 'Masculino', affiliations: ['Marina'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 285, origin: 'East Blue', debutArc: 1,
        color: '#475569', gradient: 'from-slate-600 to-zinc-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 74, speed: 56, resistance: 69, intelligence: 58 }
    },
    {
        id: 'jango', name: 'Jango', title: 'El Hipnotizador / Marinero',
        gender: 'Masculino', affiliations: ['Marina'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 9, height: 207, origin: 'East Blue', debutArc: 3,
        color: '#4338ca', gradient: 'from-indigo-700 to-slate-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 60, speed: 67, resistance: 62, intelligence: 69 }
    },
    {
        id: 'zeff', name: 'Zeff', title: 'Pies Rojos / Jefe del Baratie',
        gender: 'Masculino', affiliations: ['Baratie'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 189, origin: 'East Blue', debutArc: 4,
        color: '#b91c1c', gradient: 'from-red-800 to-amber-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 75, speed: 71, resistance: 78, intelligence: 82 }
    },
    {
        id: 'hatchan', name: 'Hatchan', title: 'Hachi / Espadachín de Seis Espadas',
        gender: 'Masculino', affiliations: ['Takoyaki 8'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 8, height: 220, origin: 'Grand Line', debutArc: 5,
        color: '#be185d', gradient: 'from-pink-700 to-stone-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 76, speed: 66, resistance: 74, intelligence: 58 }
    },

    // --- OTROS ANTAGONISTAS Y SECUNDARIOS ---
    {
        id: 'bellamy', name: 'Bellamy', title: 'La Hiena',
        gender: 'Masculino', affiliations: ['Piratas Donquixote'], devilFruit: 'Bane Bane no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 55, height: 240, origin: 'North Blue', debutArc: 12,
        color: '#ca8a04', gradient: 'from-yellow-600 to-zinc-900',
        stats: { paramecia: 76, logia: 0, zoan: 0, haki: 0, strength: 74, speed: 81, resistance: 71, intelligence: 64 }
    },
    {
        id: 'foxy', name: 'Foxy', title: 'El Zorro Plateado',
        gender: 'Masculino', affiliations: ['Piratas de Foxy'], devilFruit: 'Noro Noro no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 24, height: 180, origin: 'South Blue', debutArc: 14,
        color: '#6b21a8', gradient: 'from-purple-700 to-slate-900',
        stats: { paramecia: 84, logia: 0, zoan: 0, haki: 0, strength: 64, speed: 66, resistance: 68, intelligence: 78 }
    },
    {
        id: 'mr3', name: 'Galdino (Mr. 3)', title: 'Oficial Baroque Works',
        gender: 'Masculino', affiliations: ['Piratas de Buggy'], devilFruit: 'Doru Doru no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 24, height: 179, origin: 'South Blue', debutArc: 9,
        color: '#4338ca', gradient: 'from-indigo-600 to-slate-900',
        stats: { paramecia: 79, logia: 0, zoan: 0, haki: 0, strength: 58, speed: 62, resistance: 65, intelligence: 82 }
    },
    {
        id: 'mr5', name: 'Gem (Mr. 5)', title: 'Oficial Baroque Works',
        gender: 'Masculino', affiliations: ['Independiente'], devilFruit: 'Bomu Bomu no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 10, height: 197, origin: 'South Blue', debutArc: 8,
        color: '#92400e', gradient: 'from-amber-800 to-zinc-950',
        stats: { paramecia: 75, logia: 0, zoan: 0, haki: 0, strength: 66, speed: 64, resistance: 68, intelligence: 62 }
    },
    {
        id: 'wapol', name: 'Wapol', title: 'Ex-Rey de Drum',
        gender: 'Masculino', affiliations: ['Independiente'], devilFruit: 'Baku Baku no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 0, height: 207, origin: 'Grand Line', debutArc: 10,
        color: '#7e22ce', gradient: 'from-purple-700 to-stone-900',
        stats: { paramecia: 74, logia: 0, zoan: 0, haki: 0, strength: 68, speed: 54, resistance: 69, intelligence: 64 }
    },
    {
        id: 'dalton', name: 'Dalton', title: 'Rey del Reino de Sakura',
        gender: 'Masculino', affiliations: ['Reino de Sakura'], devilFruit: 'Ushi Ushi no Mi, Modelo: Bisonte', fruitType: 'Zoan',
        haki: ['Ninguno'], bounty: 0, height: 218, origin: 'Grand Line', debutArc: 10,
        color: '#78350f', gradient: 'from-amber-800 to-stone-950',
        stats: { paramecia: 0, logia: 0, zoan: 74, haki: 0, strength: 77, speed: 71, resistance: 76, intelligence: 76 }
    },
    {
        id: 'pell', name: 'Pell', title: 'El Halcón / Guardia Real de Arabasta',
        gender: 'Masculino', affiliations: ['Reino de Arabasta'], devilFruit: 'Tori Tori no Mi, Modelo: Halcón', fruitType: 'Zoan',
        haki: ['Ninguno'], bounty: 0, height: 189, origin: 'Grand Line', debutArc: 11,
        color: '#1e40af', gradient: 'from-blue-700 to-amber-900',
        stats: { paramecia: 0, logia: 0, zoan: 76, haki: 0, strength: 71, speed: 84, resistance: 81, intelligence: 75 }
    },
    {
        id: 'igaram', name: 'Igaram', title: 'Capitán de la Guardia Real de Arabasta',
        gender: 'Masculino', affiliations: ['Reino de Arabasta'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 218, origin: 'Grand Line', debutArc: 7,
        color: '#b45309', gradient: 'from-amber-700 to-slate-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 68, speed: 63, resistance: 70, intelligence: 77 }
    },
    {
        id: 'paulie', name: 'Paulie', title: 'Capataz de Galley-La Company',
        gender: 'Masculino', affiliations: ['Galley-La'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 195, origin: 'Grand Line', debutArc: 15,
        color: '#0369a1', gradient: 'from-sky-700 to-stone-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 74, speed: 73, resistance: 74, intelligence: 76 }
    },
    {
        id: 'absalom', name: 'Absalom', title: 'Comandante de los Zombis de Thriller Bark',
        gender: 'Masculino', affiliations: ['Piratas de Thriller Bark'], devilFruit: 'Suke Suke no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 0, height: 195, origin: 'West Blue', debutArc: 18,
        color: '#92400e', gradient: 'from-amber-800 to-zinc-950',
        stats: { paramecia: 80, logia: 0, zoan: 0, haki: 0, strength: 78, speed: 72, resistance: 75, intelligence: 66 }
    },
    {
        id: 'hogback', name: 'Dr. Hogback', title: 'Cirujano Genio de Thriller Bark',
        gender: 'Masculino', affiliations: ['Piratas de Thriller Bark'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 223, origin: 'West Blue', debutArc: 18,
        color: '#4c1d95', gradient: 'from-violet-900 to-zinc-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 52, speed: 48, resistance: 54, intelligence: 90 }
    },
    {
        id: 'spandam', name: 'Spandam', title: 'Jefe del CP9',
        gender: 'Masculino', affiliations: ['Gobierno Mundial'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 192, origin: 'Grand Line', debutArc: 15,
        color: '#6b21a8', gradient: 'from-purple-800 to-slate-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 42, speed: 45, resistance: 46, intelligence: 68 }
    },
    {
        id: 'caribou', name: 'Caribou', title: 'Pelo Mojado / Supernova Novato',
        gender: 'Masculino', affiliations: ['Piratas de Caribou'], devilFruit: 'Numa Numa no Mi', fruitType: 'Logia',
        haki: ['Ninguno'], bounty: 210, height: 228, origin: 'North Blue', debutArc: 24,
        color: '#3f6212', gradient: 'from-lime-800 to-stone-950',
        stats: { paramecia: 0, logia: 81, zoan: 0, haki: 0, strength: 66, speed: 66, resistance: 72, intelligence: 70 }
    },
    {
        id: 'vander_decken', name: 'Vander Decken IX', title: 'Capitán de los Piratas Voladores',
        gender: 'Masculino', affiliations: ['Piratas Voladores'], devilFruit: 'Mato Mato no Mi', fruitType: 'Paramecia',
        haki: ['Ninguno'], bounty: 0, height: 352, origin: 'Grand Line', debutArc: 25,
        color: '#9a3412', gradient: 'from-orange-800 to-slate-950',
        stats: { paramecia: 78, logia: 0, zoan: 0, haki: 0, strength: 70, speed: 64, resistance: 68, intelligence: 63 }
    },
    {
        id: 'marguerite', name: 'Marguerite', title: 'Guerrera Kuja',
        gender: 'Femenino', affiliations: ['Tribu Kuja'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Armadura'], bounty: 0, height: 178, origin: 'Calm Belt', debutArc: 20,
        color: '#059669', gradient: 'from-emerald-600 to-amber-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 66, strength: 66, speed: 74, resistance: 68, intelligence: 71 }
    },
    {
        id: 'bepo', name: 'Bepo', title: 'Navegante de los Piratas Heart',
        gender: 'Masculino', affiliations: ['Piratas Heart'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0.0005, height: 240, origin: 'North Blue', debutArc: 19,
        color: '#ea580c', gradient: 'from-orange-500 to-slate-800',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 76, speed: 75, resistance: 74, intelligence: 74 }
    },
    {
        id: 'cricket', name: 'Mont Blanc Cricket', title: 'Comandante Alianza Saruyama',
        gender: 'Masculino', affiliations: ['Alianza Saruyama'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 25, height: 242, origin: 'North Blue', debutArc: 12,
        color: '#ca8a04', gradient: 'from-yellow-600 to-stone-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 75, speed: 69, resistance: 74, intelligence: 78 }
    },

    // --- ALIADOS, CIVILES, MÉDICOS Y CRIATURAS ---
    {
        id: 'vivi', name: 'Nefertari Vivi', title: 'Princesa de Arabasta',
        gender: 'Femenino', affiliations: ['Reino de Arabasta'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 169, origin: 'Grand Line', debutArc: 7,
        color: '#0284c7', gradient: 'from-sky-500 to-blue-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 54, speed: 68, resistance: 64, intelligence: 84 }
    },
    {
        id: 'karoo', name: 'Karoo', title: 'Líder del Escuadrón Super Spot-Billed Duck',
        gender: 'Masculino', affiliations: ['Reino de Arabasta'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 150, origin: 'Grand Line', debutArc: 8,
        color: '#eab308', gradient: 'from-yellow-400 to-sky-700',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 58, speed: 82, resistance: 66, intelligence: 56 }
    },
    {
        id: 'kureha', name: 'Dra. Kureha', title: 'Doctora de Drum (139 años)',
        gender: 'Femenino', affiliations: ['Reino de Sakura'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 188, origin: 'Grand Line', debutArc: 10,
        color: '#9d174d', gradient: 'from-pink-800 to-purple-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 68, speed: 66, resistance: 72, intelligence: 95 }
    },
    {
        id: 'hiriluk', name: 'Dr. Hiriluk', title: 'Curandero de Drum',
        gender: 'Masculino', affiliations: ['Reino de Drum'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 213, origin: 'Grand Line', debutArc: 10,
        color: '#be185d', gradient: 'from-rose-700 to-slate-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 52, speed: 50, resistance: 62, intelligence: 72 }
    },
    {
        id: 'crocus', name: 'Crocus', title: 'Faro de los Cabos Gemelos / Ex-Médico de Roger',
        gender: 'Masculino', affiliations: ['Independiente'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Observación'], bounty: 0, height: 203, origin: 'Grand Line', debutArc: 7,
        color: '#d97706', gradient: 'from-amber-500 to-sky-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 68, strength: 70, speed: 62, resistance: 74, intelligence: 91 }
    },
    {
        id: 'laboon', name: 'Laboon', title: 'Ballena Isla de Reverse Mountain',
        gender: 'Masculino', affiliations: ['Independiente'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 40000, origin: 'West Blue', debutArc: 7,
        color: '#1e3a8a', gradient: 'from-blue-800 to-slate-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 95, speed: 68, resistance: 96, intelligence: 55 }
    },
    {
        id: 'iceburg', name: 'Iceburg', title: 'Alcalde de Water 7 / Presidente Galley-La',
        gender: 'Masculino', affiliations: ['Galley-La'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 199, origin: 'Grand Line', debutArc: 15,
        color: '#1d4ed8', gradient: 'from-blue-700 to-slate-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 56, speed: 50, resistance: 58, intelligence: 93 }
    },
    {
        id: 'neptuno', name: 'Rey Neptuno', title: 'Rey del Reino Ryugu',
        gender: 'Masculino', affiliations: ['Reino Ryugu'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 1220, origin: 'Grand Line', debutArc: 25,
        color: '#b45309', gradient: 'from-amber-600 to-cyan-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 85, speed: 68, resistance: 82, intelligence: 77 }
    },
    {
        id: 'shirahoshi', name: 'Shirahoshi', title: 'Princesa Sirena / Arma Ancestral Poseidón',
        gender: 'Femenino', affiliations: ['Reino Ryugu'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 1187, origin: 'Grand Line', debutArc: 25,
        color: '#ec4899', gradient: 'from-pink-500 to-cyan-800',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 62, speed: 65, resistance: 64, intelligence: 64 }
    },
    {
        id: 'camie', name: 'Camie', title: 'Sirena Diseñadora / Amiga de Hatchan',
        gender: 'Femenino', affiliations: ['Takoyaki 8'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 197, origin: 'Grand Line', debutArc: 19,
        color: '#059669', gradient: 'from-emerald-500 to-sky-800',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 42, speed: 78, resistance: 45, intelligence: 62 }
    },
    {
        id: 'pappag', name: 'Pappag', title: 'Estrella de Mar / Diseñador Criminal',
        gender: 'Masculino', affiliations: ['Takoyaki 8'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 50, origin: 'Grand Line', debutArc: 19,
        color: '#ca8a04', gradient: 'from-yellow-500 to-orange-800',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 20, speed: 42, resistance: 30, intelligence: 74 }
    },
    {
        id: 'aisa', name: 'Aisa', title: 'Niña Shandia con Mantra',
        gender: 'Femenino', affiliations: ['Guerreros Shandia'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Observación'], bounty: 0, height: 140, origin: 'Islas del Cielo', debutArc: 13,
        color: '#dc2626', gradient: 'from-red-600 to-amber-800',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 76, strength: 28, speed: 55, resistance: 35, intelligence: 62 }
    },
    {
        id: 'bellmere', name: 'Bell-mère', title: 'Madre Adoptiva de Nami y Nojiko',
        gender: 'Femenino', affiliations: ['Villa Cocoyasi'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 186, origin: 'East Blue', debutArc: 5,
        color: '#be185d', gradient: 'from-rose-700 to-amber-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 64, speed: 62, resistance: 68, intelligence: 74 }
    },
    {
        id: 'nojiko', name: 'Nojiko', title: 'Hermana Adoptiva de Nami',
        gender: 'Femenino', affiliations: ['Villa Cocoyasi'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 170, origin: 'East Blue', debutArc: 5,
        color: '#0284c7', gradient: 'from-sky-600 to-slate-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 45, speed: 52, resistance: 54, intelligence: 75 }
    },
    {
        id: 'genzo', name: 'Genzo', title: 'Sheriff de Villa Cocoyasi',
        gender: 'Masculino', affiliations: ['Villa Cocoyasi'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 173, origin: 'East Blue', debutArc: 5,
        color: '#374151', gradient: 'from-slate-700 to-amber-950',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 58, speed: 50, resistance: 64, intelligence: 76 }
    },
    {
        id: 'kaya', name: 'Kaya', title: 'Estudiante de Medicina de Villa Syrup',
        gender: 'Femenino', affiliations: ['Villa Syrup'], devilFruit: 'Ninguna', fruitType: 'Ninguna',
        haki: ['Ninguno'], bounty: 0, height: 169, origin: 'East Blue', debutArc: 3,
        color: '#eab308', gradient: 'from-yellow-500 to-emerald-900',
        stats: { paramecia: 0, logia: 0, zoan: 0, haki: 0, strength: 25, speed: 35, resistance: 30, intelligence: 82 }
    }
];