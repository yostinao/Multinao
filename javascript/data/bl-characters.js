export const BL_CATEGORIES = [
    { key: 'shoot',        label: 'Tiro',         icon: '⚽', color: 'text-sky-400' },
    { key: 'dribble',      label: 'Regate',       icon: '⚡', color: 'text-amber-400' },
    { key: 'pass',         label: 'Pase',         icon: '🎯', color: 'text-emerald-400' },
    { key: 'speed',        label: 'Velocidad',    icon: '💨', color: 'text-cyan-400' },
    { key: 'physical',     label: 'Físico',       icon: '💪', color: 'text-red-400' },
    { key: 'defense',      label: 'Defensa',      icon: '🛡️', color: 'text-indigo-400' },
    { key: 'inteligencia', label: 'Inteligencia', icon: '🧠', color: 'text-purple-400' },
    { key: 'ego',          label: 'Ego',          icon: '🔥', color: 'text-rose-400' }
];

export const BL_DEBUT_ARCS = {
    1: '1. Primera Selección',
    2: '2. Segunda Selección',
    3: '3. Selección Mundial (5v5)',
    4: '4. Tercera Selección (Tryouts)',
    5: '5. Blue Lock vs Japón Sub-20'
};

/**
 * Datos estrictamente hasta el final de la Temporada 2 del anime (Partido Blue Lock XI vs Japón Sub-20).
 */
export const BL_CHARACTERS = [
    // --- DELANTEROS Y ESTRELLAS DE BLUE LOCK ---
    {
        id: 'yoichi_isagi', name: 'Yoichi Isagi', alias: 'El Corazón de Blue Lock', role: 'Delantero / Mediapunta',
        weaponName: 'Percepción Espacial y Tiro Directo', color: '#1d4ed8', gradient: 'from-blue-700 to-slate-950',
        gender: 'Masculino', positions: ['Delantero', 'Mediapunta'], teams: ['Equipo Z', 'Blue Lock XI'], weapons: ['Visión', 'Tiro'], height: 175, debutArc: 1,
        stats: { shoot: 82, dribble: 73, pass: 81, speed: 75, physical: 71, defense: 73, inteligencia: 93, ego: 91 }
    },
    {
        id: 'rin_itoshi', name: 'Rin Itoshi', alias: 'N.º 1 de Blue Lock', role: 'Delantero',
        weaponName: 'Precisión y Destrucción en Flow', color: '#0f766e', gradient: 'from-teal-700 to-slate-950',
        gender: 'Masculino', positions: ['Delantero'], teams: ['Blue Lock XI'], weapons: ['Tiro', 'Visión', 'Regate'], height: 186, debutArc: 2,
        stats: { shoot: 91, dribble: 87, pass: 85, speed: 83, physical: 81, defense: 77, inteligencia: 89, ego: 93 }
    },
    {
        id: 'meguru_bachira', name: 'Meguru Bachira', alias: 'El Monstruo del Regate', role: 'Extremo / Lateral',
        weaponName: 'Regate Elástico y Pase', color: '#ca8a04', gradient: 'from-yellow-500 to-slate-950',
        gender: 'Masculino', positions: ['Extremo', 'Delantero'], teams: ['Equipo Z', 'Blue Lock XI'], weapons: ['Regate', 'Pase'], height: 176, debutArc: 1,
        stats: { shoot: 79, dribble: 91, pass: 86, speed: 83, physical: 70, defense: 65, inteligencia: 81, ego: 87 }
    },
    {
        id: 'shoei_barou', name: 'Shoei Barou', alias: 'El Rey / Comodín', role: 'Delantero',
        weaponName: 'Carga y Tiro de Media Distancia', color: '#b91c1c', gradient: 'from-red-700 to-zinc-950',
        gender: 'Masculino', positions: ['Delantero'], teams: ['Equipo X', 'Blue Lock XI'], weapons: ['Tiro', 'Físico', 'Regate'], height: 187, debutArc: 1,
        stats: { shoot: 89, dribble: 84, pass: 58, speed: 79, physical: 88, defense: 66, inteligencia: 70, ego: 93 }
    },
    {
        id: 'seishiro_nagi', name: 'Seishiro Nagi', alias: 'El Genio del Control', role: 'Delantero / Mediapunta',
        weaponName: 'Control Absoluto', color: '#475569', gradient: 'from-slate-600 to-zinc-950',
        gender: 'Masculino', positions: ['Delantero', 'Mediapunta'], teams: ['Equipo V', 'Blue Lock XI'], weapons: ['Control', 'Tiro'], height: 190, debutArc: 1,
        stats: { shoot: 88, dribble: 82, pass: 79, speed: 77, physical: 80, defense: 62, inteligencia: 77, ego: 83 }
    },
    {
        id: 'ryusei_shidou', name: 'Ryusei Shidou', alias: 'El Demonio del Área', role: 'Delantero',
        weaponName: 'Instinto Animal y Big Bang Drive', color: '#be185d', gradient: 'from-pink-700 to-slate-950',
        gender: 'Masculino', positions: ['Delantero'], teams: ['Blue Lock', 'Japón Sub-20'], weapons: ['Tiro', 'Físico'], height: 185, debutArc: 3,
        stats: { shoot: 91, dribble: 78, pass: 68, speed: 84, physical: 88, defense: 65, inteligencia: 80, ego: 92 }
    },
    {
        id: 'hyoma_chigiri', name: 'Hyoma Chigiri', alias: 'La Pantera Roja', role: 'Extremo / Lateral',
        weaponName: 'Velocidad Explosiva', color: '#dc2626', gradient: 'from-red-600 to-rose-950',
        gender: 'Masculino', positions: ['Extremo', 'Defensa'], teams: ['Equipo Z', 'Blue Lock XI'], weapons: ['Velocidad', 'Tiro'], height: 177, debutArc: 1,
        stats: { shoot: 80, dribble: 85, pass: 75, speed: 92, physical: 72, defense: 72, inteligencia: 74, ego: 85 }
    },
    {
        id: 'rensuke_kunigami', name: 'Rensuke Kunigami', alias: 'El Héroe de Blue Lock', role: 'Delantero',
        weaponName: 'Zurda Potente y Físico', color: '#ea580c', gradient: 'from-orange-600 to-stone-950',
        gender: 'Masculino', positions: ['Delantero'], teams: ['Equipo Z'], weapons: ['Tiro', 'Físico'], height: 188, debutArc: 1,
        stats: { shoot: 82, dribble: 70, pass: 68, speed: 76, physical: 85, defense: 71, inteligencia: 69, ego: 81 }
    },
    {
        id: 'reo_mikage', name: 'Reo Mikage', alias: 'El Camaleón', role: 'Mediocampista / Defensa',
        weaponName: 'Copia al 99%', color: '#7e22ce', gradient: 'from-purple-700 to-slate-950',
        gender: 'Masculino', positions: ['Mediocampista', 'Defensa'], teams: ['Equipo V', 'Blue Lock XI'], weapons: ['Visión', 'Pase', 'Defensa'], height: 185, debutArc: 1,
        stats: { shoot: 80, dribble: 82, pass: 87, speed: 79, physical: 79, defense: 84, inteligencia: 86, ego: 82 }
    },
    {
        id: 'tabito_karasu', name: 'Tabito Karasu', alias: 'El Asesino', role: 'Mediocampista',
        weaponName: 'Control de Distancia y Análisis', color: '#312e81', gradient: 'from-indigo-900 to-black',
        gender: 'Masculino', positions: ['Mediocampista'], teams: ['Blue Lock XI'], weapons: ['Visión', 'Regate', 'Pase'], height: 183, debutArc: 4,
        stats: { shoot: 78, dribble: 84, pass: 85, speed: 79, physical: 81, defense: 83, inteligencia: 88, ego: 84 }
    },
    {
        id: 'eita_otoya', name: 'Eita Otoya', alias: 'El Ninja', role: 'Extremo',
        weaponName: 'Desmarque Sigiloso', color: '#15803d', gradient: 'from-green-700 to-slate-950',
        gender: 'Masculino', positions: ['Extremo'], teams: ['Blue Lock XI'], weapons: ['Velocidad', 'Regate'], height: 177, debutArc: 4,
        stats: { shoot: 79, dribble: 83, pass: 78, speed: 88, physical: 72, defense: 69, inteligencia: 80, ego: 81 }
    },
    {
        id: 'kenyu_yukimiya', name: 'Kenyu Yukimiya', alias: 'El Emperador 1v1', role: 'Extremo',
        weaponName: 'Regate Callejero y Tiro Gyro', color: '#92400e', gradient: 'from-amber-800 to-slate-950',
        gender: 'Masculino', positions: ['Extremo'], teams: ['Blue Lock XI'], weapons: ['Regate', 'Tiro'], height: 184, debutArc: 4,
        stats: { shoot: 83, dribble: 89, pass: 74, speed: 84, physical: 79, defense: 72, inteligencia: 71, ego: 86 }
    },
    {
        id: 'gin_gagamaru', name: 'Gin Gagamaru', alias: 'El Portero Salvaje', role: 'Portero',
        weaponName: 'Reflejos Felinos y Elasticidad', color: '#4d7c0f', gradient: 'from-lime-700 to-stone-950',
        gender: 'Masculino', positions: ['Portero', 'Delantero'], teams: ['Equipo Z', 'Blue Lock XI'], weapons: ['Reflejos', 'Físico'], height: 191, debutArc: 1,
        stats: { shoot: 74, dribble: 69, pass: 72, speed: 80, physical: 86, defense: 89, inteligencia: 78, ego: 80 }
    },
    {
        id: 'ikki_niko', name: 'Ikki Niko', alias: 'La Torre de Vigilancia', role: 'Defensa / Mediocampista',
        weaponName: 'Intercepción y Visión Táctica', color: '#0369a1', gradient: 'from-sky-800 to-slate-950',
        gender: 'Masculino', positions: ['Defensa', 'Mediocampista'], teams: ['Equipo Y', 'Blue Lock XI'], weapons: ['Visión', 'Defensa'], height: 173, debutArc: 1,
        stats: { shoot: 64, dribble: 71, pass: 81, speed: 73, physical: 69, defense: 87, inteligencia: 88, ego: 80 }
    },
    {
        id: 'jyubei_aryu', name: 'Jyubei Aryu', alias: 'Glam', role: 'Defensa / Delantero',
        weaponName: 'Alcance Aéreo y Salto', color: '#334155', gradient: 'from-slate-700 to-black',
        gender: 'Masculino', positions: ['Defensa', 'Delantero'], teams: ['Blue Lock XI'], weapons: ['Físico', 'Defensa'], height: 195, debutArc: 2,
        stats: { shoot: 78, dribble: 71, pass: 72, speed: 76, physical: 86, defense: 85, inteligencia: 73, ego: 82 }
    },
    {
        id: 'aoshi_tokimitsu', name: 'Aoshi Tokimitsu', alias: 'El Tanque Ansioso', role: 'Mediocampista / Defensa',
        weaponName: 'Estamina Infinita y Fuerza', color: '#3f6212', gradient: 'from-lime-900 to-zinc-950',
        gender: 'Masculino', positions: ['Mediocampista', 'Defensa'], teams: ['Blue Lock XI'], weapons: ['Físico', 'Defensa'], height: 183, debutArc: 2,
        stats: { shoot: 74, dribble: 75, pass: 70, speed: 82, physical: 89, defense: 82, inteligencia: 67, ego: 71 }
    },
    {
        id: 'yo_hiori', name: 'Yo Hiori', alias: 'El Pasador de Hielo', role: 'Mediocampista / Lateral',
        weaponName: 'Pases Quirúrgicos y Visión', color: '#0284c7', gradient: 'from-cyan-600 to-blue-950',
        gender: 'Masculino', positions: ['Mediocampista', 'Defensa'], teams: ['Blue Lock XI'], weapons: ['Pase', 'Visión'], height: 183, debutArc: 4,
        stats: { shoot: 74, dribble: 82, pass: 89, speed: 78, physical: 71, defense: 75, inteligencia: 88, ego: 79 }
    },
    {
        id: 'zantetsu_tsurugi', name: 'Zantetsu Tsurugi', alias: 'El Velocista Idiota', role: 'Extremo',
        weaponName: 'Aceleración Instantánea', color: '#1e40af', gradient: 'from-blue-800 to-slate-950',
        gender: 'Masculino', positions: ['Extremo'], teams: ['Equipo V', 'Blue Lock XI'], weapons: ['Velocidad', 'Tiro'], height: 187, debutArc: 1,
        stats: { shoot: 79, dribble: 77, pass: 69, speed: 89, physical: 81, defense: 70, inteligencia: 61, ego: 78 }
    },
    {
        id: 'jingo_raichi', name: 'Jingo Raichi', alias: 'Fútbol Sexy', role: 'Mediocampista Defensivo',
        weaponName: 'Marcaje Homicida y Resistencia', color: '#d97706', gradient: 'from-amber-600 to-stone-950',
        gender: 'Masculino', positions: ['Mediocampista', 'Defensa'], teams: ['Equipo Z', 'Blue Lock XI'], weapons: ['Físico', 'Defensa'], height: 182, debutArc: 1,
        stats: { shoot: 71, dribble: 70, pass: 71, speed: 76, physical: 85, defense: 82, inteligencia: 70, ego: 82 }
    },

    // --- JAPÓN SUB-20 ---
    {
        id: 'sae_itoshi', name: 'Sae Itoshi', alias: 'Genio de la Nueva Generación', role: 'Mediocampista',
        weaponName: 'Regate Pasivo y Pases Perfectos', color: '#991b1b', gradient: 'from-red-800 to-slate-950',
        gender: 'Masculino', positions: ['Mediocampista'], teams: ['Japón Sub-20', 'Real Madrid'], weapons: ['Pase', 'Visión', 'Regate'], height: 180, debutArc: 1,
        stats: { shoot: 91, dribble: 95, pass: 98, speed: 88, physical: 82, defense: 83, inteligencia: 97, ego: 95 }
    },
    {
        id: 'oliver_aiku', name: 'Oliver Aiku', alias: 'El Muro de Japón', role: 'Defensa Central',
        weaponName: 'Físico Total y Percepción Espacial', color: '#166534', gradient: 'from-green-800 to-zinc-950',
        gender: 'Masculino', positions: ['Defensa'], teams: ['Japón Sub-20'], weapons: ['Defensa', 'Físico', 'Visión'], height: 190, debutArc: 5,
        stats: { shoot: 77, dribble: 75, pass: 81, speed: 82, physical: 91, defense: 92, inteligencia: 87, ego: 86 }
    },
    {
        id: 'shuto_sendo', name: 'Shuto Sendo', alias: 'El As de la Sub-20', role: 'Delantero',
        weaponName: 'Remate Oportunista', color: '#b45309', gradient: 'from-amber-700 to-red-950',
        gender: 'Masculino', positions: ['Delantero'], teams: ['Japón Sub-20'], weapons: ['Tiro', 'Visión'], height: 183, debutArc: 5,
        stats: { shoot: 80, dribble: 75, pass: 76, speed: 78, physical: 77, defense: 71, inteligencia: 78, ego: 79 }
    },
    {
        id: 'kazuma_niou', name: 'Kazuma Niou', alias: 'El Doberman', role: 'Defensa Central',
        weaponName: 'Presión Física y Duelos', color: '#78350f', gradient: 'from-stone-700 to-zinc-950',
        gender: 'Masculino', positions: ['Defensa'], teams: ['Japón Sub-20'], weapons: ['Defensa', 'Físico'], height: 186, debutArc: 5,
        stats: { shoot: 63, dribble: 65, pass: 69, speed: 75, physical: 85, defense: 84, inteligencia: 71, ego: 75 }
    },
    {
        id: 'miroku_darai', name: 'Miroku Darai', alias: 'Sombra Defensiva', role: 'Defensa Lateral',
        weaponName: 'Marcaje Predictivo', color: '#4338ca', gradient: 'from-indigo-800 to-slate-950',
        gender: 'Masculino', positions: ['Defensa'], teams: ['Japón Sub-20'], weapons: ['Defensa', 'Velocidad'], height: 175, debutArc: 5,
        stats: { shoot: 62, dribble: 71, pass: 74, speed: 82, physical: 74, defense: 83, inteligencia: 78, ego: 73 }
    },
    {
        id: 'teppei_neru', name: 'Teppei Neru', alias: 'El Rayo Defensivo', role: 'Defensa Lateral',
        weaponName: 'Aceleración Corta', color: '#0e7490', gradient: 'from-cyan-800 to-slate-950',
        gender: 'Masculino', positions: ['Defensa'], teams: ['Japón Sub-20'], weapons: ['Velocidad', 'Defensa'], height: 174, debutArc: 5,
        stats: { shoot: 61, dribble: 72, pass: 73, speed: 86, physical: 73, defense: 82, inteligencia: 74, ego: 72 }
    },

    // --- SELECCIÓN MUNDIAL (WORLD FIVE) ---
    {
        id: 'noel_noa', name: 'Noel Noa', alias: 'El Mejor Delantero del Mundo', role: 'Delantero',
        weaponName: 'Ambidiestro Perfecto y Lógica', color: '#dc2626', gradient: 'from-red-700 to-zinc-950',
        gender: 'Masculino', positions: ['Delantero'], teams: ['Selección Mundial'], weapons: ['Tiro', 'Físico', 'Visión'], height: 189, debutArc: 1,
        stats: { shoot: 100, dribble: 94, pass: 91, speed: 93, physical: 97, defense: 84, inteligencia: 95, ego: 98 }
    },
    {
        id: 'julian_loki', name: 'Julian Loki', alias: 'El Prodigio Velocista', role: 'Delantero',
        weaponName: 'Velocidad Divina', color: '#1e3a8a', gradient: 'from-blue-800 to-indigo-950',
        gender: 'Masculino', positions: ['Delantero'], teams: ['Selección Mundial'], weapons: ['Velocidad', 'Regate', 'Tiro'], height: 179, debutArc: 3,
        stats: { shoot: 93, dribble: 94, pass: 87, speed: 100, physical: 86, defense: 77, inteligencia: 89, ego: 93 }
    },
    {
        id: 'leonardo_luna', name: 'Leonardo Luna', alias: 'El Noble del Real', role: 'Delantero',
        weaponName: 'Regate Técnico y Definición', color: '#eab308', gradient: 'from-yellow-500 to-slate-900',
        gender: 'Masculino', positions: ['Delantero'], teams: ['Selección Mundial', 'Real Madrid'], weapons: ['Regate', 'Tiro', 'Pase'], height: 184, debutArc: 3,
        stats: { shoot: 94, dribble: 95, pass: 91, speed: 90, physical: 85, defense: 75, inteligencia: 91, ego: 92 }
    },
    {
        id: 'adam_blake', name: 'Adam Blake', alias: 'El Depredador Inglés', role: 'Delantero',
        weaponName: 'Potencia Física y Remate', color: '#991b1b', gradient: 'from-red-900 to-stone-950',
        gender: 'Masculino', positions: ['Delantero'], teams: ['Selección Mundial'], weapons: ['Físico', 'Tiro'], height: 192, debutArc: 3,
        stats: { shoot: 94, dribble: 86, pass: 82, speed: 89, physical: 96, defense: 78, inteligencia: 85, ego: 92 }
    },
    {
        id: 'pablo_cavazos', name: 'Pablo Cavazos', alias: 'El Mago Zurdo', role: 'Mediocampista / Delantero',
        weaponName: 'Tiros Libres y Visión', color: '#0284c7', gradient: 'from-sky-500 to-blue-950',
        gender: 'Masculino', positions: ['Mediocampista', 'Delantero'], teams: ['Selección Mundial'], weapons: ['Pase', 'Tiro', 'Regate'], height: 176, debutArc: 3,
        stats: { shoot: 92, dribble: 93, pass: 95, speed: 87, physical: 80, defense: 75, inteligencia: 94, ego: 90 }
    },
    {
        id: 'dada_silva', name: 'Dada Silva', alias: 'El Tanque Brasileño', role: 'Delantero',
        weaponName: 'Salto Explosivo y Fuerza Bruta', color: '#15803d', gradient: 'from-green-600 to-yellow-900',
        gender: 'Masculino', positions: ['Delantero'], teams: ['Selección Mundial'], weapons: ['Físico', 'Tiro'], height: 196, debutArc: 3,
        stats: { shoot: 93, dribble: 85, pass: 81, speed: 88, physical: 98, defense: 81, inteligencia: 83, ego: 91 }
    },

    // --- PRIMERA SELECCIÓN Y STAFF ---
    {
        id: 'asahi_naruhaya', name: 'Asahi Naruhaya', alias: 'El Desmarque Oculto', role: 'Delantero',
        weaponName: 'Movimiento sin Balón', color: '#9a3412', gradient: 'from-orange-800 to-stone-950',
        gender: 'Masculino', positions: ['Delantero'], teams: ['Equipo Z'], weapons: ['Velocidad'], height: 168, debutArc: 1,
        stats: { shoot: 64, dribble: 70, pass: 68, speed: 79, physical: 62, defense: 61, inteligencia: 72, ego: 71 }
    },
    {
        id: 'gurimu_igarashi', name: 'Gurimu Igarashi', alias: 'Igaguri / Namusan', role: 'Delantero / Defensa',
        weaponName: 'Malicia y Faltas Tácticas', color: '#57534e', gradient: 'from-stone-600 to-zinc-950',
        gender: 'Masculino', positions: ['Delantero', 'Defensa'], teams: ['Equipo Z', 'Blue Lock XI'], weapons: ['Físico'], height: 172, debutArc: 1,
        stats: { shoot: 60, dribble: 61, pass: 63, speed: 66, physical: 70, defense: 71, inteligencia: 65, ego: 78 }
    },
    {
        id: 'okuhito_iemon', name: 'Okuhito Iemon', alias: 'El Portero Improvisado', role: 'Portero / Delantero',
        weaponName: 'Polivalencia', color: '#374151', gradient: 'from-gray-700 to-slate-950',
        gender: 'Masculino', positions: ['Portero', 'Delantero'], teams: ['Equipo Z'], weapons: ['Físico', 'Reflejos'], height: 187, debutArc: 1,
        stats: { shoot: 68, dribble: 66, pass: 69, speed: 68, physical: 76, defense: 74, inteligencia: 67, ego: 68 }
    },
    {
        id: 'wataru_kuon', name: 'Wataru Kuon', alias: 'El Traidor del Equipo Z', role: 'Delantero',
        weaponName: 'Salto Vertical', color: '#1e3a8a', gradient: 'from-blue-900 to-slate-950',
        gender: 'Masculino', positions: ['Delantero'], teams: ['Equipo Z'], weapons: ['Físico'], height: 185, debutArc: 1,
        stats: { shoot: 70, dribble: 67, pass: 69, speed: 71, physical: 75, defense: 68, inteligencia: 71, ego: 72 }
    },
    {
        id: 'yudai_imamura', name: 'Yudai Imamura', alias: 'El Velocista Técnico', role: 'Delantero',
        weaponName: 'Velocidad y Técnica', color: '#9d174d', gradient: 'from-pink-900 to-slate-950',
        gender: 'Masculino', positions: ['Delantero'], teams: ['Equipo Z'], weapons: ['Velocidad', 'Regate'], height: 178, debutArc: 1,
        stats: { shoot: 67, dribble: 71, pass: 68, speed: 75, physical: 66, defense: 62, inteligencia: 66, ego: 67 }
    },
    {
        id: 'hibiki_okawa', name: 'Hibiki Okawa', alias: 'El As del Equipo Y', role: 'Delantero',
        weaponName: 'Finta de Tiro', color: '#0f766e', gradient: 'from-teal-800 to-zinc-950',
        gender: 'Masculino', positions: ['Delantero'], teams: ['Equipo Y'], weapons: ['Tiro', 'Regate'], height: 177, debutArc: 1,
        stats: { shoot: 73, dribble: 72, pass: 67, speed: 71, physical: 69, defense: 61, inteligencia: 68, ego: 74 }
    },
    {
        id: 'junichi_wanima', name: 'Junichi Wanima', alias: 'El Hermano Mayor', role: 'Delantero',
        weaponName: 'Juego Combinativo', color: '#3f6212', gradient: 'from-lime-800 to-stone-950',
        gender: 'Masculino', positions: ['Delantero'], teams: ['Equipo W'], weapons: ['Pase', 'Físico'], height: 182, debutArc: 1,
        stats: { shoot: 73, dribble: 70, pass: 75, speed: 72, physical: 76, defense: 66, inteligencia: 71, ego: 73 }
    },
    {
        id: 'jinpachi_ego', name: 'Jinpachi Ego', alias: 'El Director de Blue Lock', role: 'Entrenador / Director',
        weaponName: 'Filosofía del Egoísmo', color: '#1d4ed8', gradient: 'from-blue-900 to-black',
        gender: 'Masculino', positions: ['Staff'], teams: ['Blue Lock'], weapons: ['Visión'], height: 189, debutArc: 1,
        stats: { shoot: 62, dribble: 62, pass: 72, speed: 58, physical: 53, defense: 58, inteligencia: 100, ego: 100 }
    },
    {
        id: 'anri_teieri', name: 'Anri Teieri', alias: 'Promotora de Blue Lock', role: 'Staff / Directiva',
        weaponName: 'Gestión y Análisis', color: '#be123c', gradient: 'from-rose-800 to-slate-950',
        gender: 'Femenino', positions: ['Staff'], teams: ['Blue Lock'], weapons: ['Visión'], height: 164, debutArc: 1,
        stats: { shoot: 42, dribble: 42, pass: 52, speed: 52, physical: 48, defense: 42, inteligencia: 84, ego: 78 }
    }
];