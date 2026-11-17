export const CATEGORIES = [
    { key: 'quirk',        label: 'Don',          icon: '⚡', color: 'text-purple-400' },
    { key: 'intelligence', label: 'Inteligencia', icon: '🧠', color: 'text-blue-400' },
    { key: 'experience',   label: 'Experiencia',  icon: '🎖️', color: 'text-amber-400' },
    { key: 'combat',       label: 'Combate',      icon: '🥋', color: 'text-orange-400' },
    { key: 'strength',     label: 'Fuerza',       icon: '💪', color: 'text-red-400' },
    { key: 'agility',      label: 'Agilidad',     icon: '🤸', color: 'text-pink-400' },
    { key: 'speed',        label: 'Velocidad',    icon: '💨', color: 'text-cyan-400' },
    { key: 'resistance',   label: 'Resistencia',  icon: '🛡️', color: 'text-emerald-400' }
];

export const DEBUT_ARCS = {
    1:  '1. Examen de Admisión',
    2:  '2. Prueba de Dones',
    3:  '3. Entrenamiento de Combate',
    4:  '4. Incidente USJ',
    5:  '5. Festival Deportivo',
    6:  '6. Enfrentamiento vs Stain',
    7:  '7. Exámenes Finales',
    8:  '8. Campamento del Bosque',
    9:  '9. Redada de Kamino',
    10: '10. Licencia Provisional',
    11: '11. Shie Hassaikai',
    12: '12. Festival Cultural',
    13: '13. Entrenamiento Conjunto',
    14: '14. Ejército de Liberación',
    15: '15. Guerra de Liberación',
    16: '16. Héroe Oscuro / Guerra Final'
};

export const CHARACTERS = [
    // --- TOP TIER / LEYENDAS ---
    {
        id: 'all_for_one', heroName: 'All For One', realName: 'Shigaraki (Zen)', role: 'Villano',
        quirkName: 'All For One', color: '#581c87', gradient: 'from-purple-950 to-zinc-950',
        gender: 'Masculino', roles: ['Villano'], affiliations: ['Liga de Villanos'], quirkTypes: ['Acumulación', 'Emisor'], height: 225, debutArc: 8,
        stats: { quirk: 100, intelligence: 96, experience: 100, combat: 94, strength: 93, agility: 87, speed: 91, resistance: 91 }
    },
    {
        id: 'toshinori_yagi', heroName: 'All Might', realName: 'Toshinori Yagi', role: 'Héroe Profesional',
        quirkName: 'One For All', color: '#ca8a04', gradient: 'from-yellow-500 to-blue-700',
        gender: 'Masculino', roles: ['Héroe Pro', 'Profesor', 'Portador'], affiliations: ['U.A.'], quirkTypes: ['Acumulación'], height: 220, debutArc: 1,
        stats: { quirk: 99, intelligence: 85, experience: 98, combat: 97, strength: 100, agility: 96, speed: 99, resistance: 98 }
    },
    {
        id: 'izuku_midoriya', heroName: 'Deku', realName: 'Izuku Midoriya', role: 'Estudiante U.A.',
        quirkName: 'One For All + 6 Dones', color: '#059669', gradient: 'from-emerald-600 to-teal-900',
        gender: 'Masculino', roles: ['Estudiante', 'Portador'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Acumulación', 'Emisor'], height: 166, debutArc: 1,
        stats: { quirk: 99, intelligence: 91, experience: 82, combat: 96, strength: 97, agility: 98, speed: 99, resistance: 93 }
    },
    {
        id: 'tomura_shigaraki', heroName: 'Shigaraki', realName: 'Tomura Shigaraki', role: 'Villano',
        quirkName: 'Deterioro + All For One', color: '#3730a3', gradient: 'from-indigo-800 to-zinc-950',
        gender: 'Masculino', roles: ['Villano'], affiliations: ['Liga de Villanos'], quirkTypes: ['Emisor', 'Acumulación'], height: 175, debutArc: 4,
        stats: { quirk: 99, intelligence: 86, experience: 82, combat: 94, strength: 99, agility: 96, speed: 98, resistance: 99 }
    },
    {
        id: 'star_and_stripe', heroName: 'Star and Stripe', realName: 'Cathleen Bate', role: 'Héroe Profesional (EE.UU.)',
        quirkName: 'Nuevo Orden', color: '#1d4ed8', gradient: 'from-blue-600 via-red-600 to-amber-500',
        gender: 'Femenino', roles: ['Héroe Pro'], affiliations: ['Independiente'], quirkTypes: ['Emisor'], height: 193, debutArc: 16,
        stats: { quirk: 99, intelligence: 90, experience: 95, combat: 95, strength: 96, agility: 90, speed: 93, resistance: 94 }
    },
    {
        id: 'gigantomachia', heroName: 'Gigantomachia', realName: 'Gigantomachia', role: 'Villano',
        quirkName: 'Múltiples Dones (Resistencia, Gigantificación)', color: '#78350f', gradient: 'from-stone-800 to-amber-950',
        gender: 'Masculino', roles: ['Villano'], affiliations: ['Liga de Villanos'], quirkTypes: ['Transformación', 'Mutante'], height: 2500, debutArc: 11,
        stats: { quirk: 92, intelligence: 52, experience: 88, combat: 82, strength: 99, agility: 68, speed: 84, resistance: 99 }
    },
    {
        id: 'nana_shimura', heroName: 'Nana Shimura', realName: 'Nana Shimura', role: 'Portadora OFA',
        quirkName: 'One For All + Flotar', color: '#1e3a8a', gradient: 'from-blue-900 to-amber-700',
        gender: 'Femenino', roles: ['Héroe Pro', 'Portador'], affiliations: ['Independiente'], quirkTypes: ['Acumulación', 'Emisor'], height: 175, debutArc: 9,
        stats: { quirk: 95, intelligence: 84, experience: 91, combat: 92, strength: 93, agility: 91, speed: 92, resistance: 90 }
    },
    {
        id: 'katsuki_bakugo', heroName: 'Dynamight', realName: 'Katsuki Bakugo', role: 'Estudiante U.A.',
        quirkName: 'Explosión', color: '#ea580c', gradient: 'from-orange-500 to-red-700',
        gender: 'Masculino', roles: ['Estudiante'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Emisor'], height: 172, debutArc: 1,
        stats: { quirk: 94, intelligence: 88, experience: 79, combat: 95, strength: 84, agility: 97, speed: 97, resistance: 86 }
    },
    {
        id: 'shoto_todoroki', heroName: 'Shoto', realName: 'Shoto Todoroki', role: 'Estudiante U.A.',
        quirkName: 'Medio Frío Medio Caliente', color: '#0284c7', gradient: 'from-cyan-500 to-red-600',
        gender: 'Masculino', roles: ['Estudiante'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Emisor'], height: 176, debutArc: 2,
        stats: { quirk: 95, intelligence: 86, experience: 78, combat: 89, strength: 82, agility: 83, speed: 85, resistance: 91 }
    },
    {
        id: 'enji_todoroki', heroName: 'Endeavor', realName: 'Enji Todoroki', role: 'Héroe Profesional',
        quirkName: 'Llamas Infernales', color: '#dc2626', gradient: 'from-red-600 to-amber-700',
        gender: 'Masculino', roles: ['Héroe Pro'], affiliations: ['Independiente'], quirkTypes: ['Emisor'], height: 195, debutArc: 5,
        stats: { quirk: 95, intelligence: 87, experience: 97, combat: 93, strength: 90, agility: 83, speed: 88, resistance: 91 }
    },
    {
        id: 'toya_todoroki', heroName: 'Dabi', realName: 'Toya Todoroki', role: 'Villano',
        quirkName: 'Llamas Azules', color: '#1d4ed8', gradient: 'from-blue-600 to-slate-950',
        gender: 'Masculino', roles: ['Villano'], affiliations: ['Liga de Villanos'], quirkTypes: ['Emisor'], height: 176, debutArc: 7,
        stats: { quirk: 97, intelligence: 80, experience: 80, combat: 84, strength: 78, agility: 82, speed: 86, resistance: 82 }
    },
    {
        id: 'kai_chisaki', heroName: 'Overhaul', realName: 'Kai Chisaki', role: 'Villano',
        quirkName: 'Reparación', color: '#065f46', gradient: 'from-emerald-800 to-amber-950',
        gender: 'Masculino', roles: ['Villano'], affiliations: ['Shie Hassaikai'], quirkTypes: ['Emisor'], height: 179, debutArc: 10,
        stats: { quirk: 96, intelligence: 88, experience: 82, combat: 85, strength: 93, agility: 80, speed: 82, resistance: 92 }
    },
    {
        id: 're_destro', heroName: 'Re-Destro', realName: 'Rikiya Yotsubashi', role: 'Villano',
        quirkName: 'Estrés', color: '#991b1b', gradient: 'from-red-900 to-zinc-950',
        gender: 'Masculino', roles: ['Villano'], affiliations: ['Ejército de Liberación'], quirkTypes: ['Transformación'], height: 185, debutArc: 14,
        stats: { quirk: 92, intelligence: 88, experience: 86, combat: 87, strength: 94, agility: 78, speed: 82, resistance: 91 }
    },

    // --- HÉROES PROFESIONALES TOP Y VETERANOS ---
    {
        id: 'keigo_takami', heroName: 'Hawks', realName: 'Keigo Takami', role: 'Héroe Profesional',
        quirkName: 'Alas Rígidas', color: '#d97706', gradient: 'from-amber-400 to-yellow-700',
        gender: 'Masculino', roles: ['Héroe Pro'], affiliations: ['Independiente'], quirkTypes: ['Mutante'], height: 172, debutArc: 12,
        stats: { quirk: 86, intelligence: 90, experience: 92, combat: 91, strength: 71, agility: 93, speed: 92, resistance: 75 }
    },
    {
        id: 'mirko', heroName: 'Mirko', realName: 'Rumi Usagiyama', role: 'Héroe Profesional',
        quirkName: 'Conejo', color: '#be185d', gradient: 'from-pink-700 to-slate-900',
        gender: 'Femenino', roles: ['Héroe Pro'], affiliations: ['Independiente'], quirkTypes: ['Mutante'], height: 159, debutArc: 12,
        stats: { quirk: 84, intelligence: 79, experience: 92, combat: 96, strength: 91, agility: 97, speed: 95, resistance: 93 }
    },
    {
        id: 'best_jeanist', heroName: 'Best Jeanist', realName: 'Tsunagu Hakamada', role: 'Héroe Profesional',
        quirkName: 'Maestro de Fibras', color: '#1e40af', gradient: 'from-blue-700 to-indigo-950',
        gender: 'Masculino', roles: ['Héroe Pro'], affiliations: ['Independiente'], quirkTypes: ['Emisor'], height: 190, debutArc: 6,
        stats: { quirk: 91, intelligence: 91, experience: 96, combat: 90, strength: 74, agility: 82, speed: 81, resistance: 83 }
    },
    {
        id: 'edgeshot', heroName: 'Edgeshot', realName: 'Shinya Kamihara', role: 'Héroe Profesional',
        quirkName: 'Cuerpo de Papel', color: '#991b1b', gradient: 'from-red-800 to-slate-950',
        gender: 'Masculino', roles: ['Héroe Pro'], affiliations: ['Independiente'], quirkTypes: ['Transformación'], height: 170, debutArc: 9,
        stats: { quirk: 88, intelligence: 90, experience: 95, combat: 94, strength: 72, agility: 95, speed: 96, resistance: 76 }
    },
    {
        id: 'mirio_togata', heroName: 'Lemillion', realName: 'Mirio Togata', role: 'Héroe Profesional',
        quirkName: 'Permeación', color: '#eab308', gradient: 'from-yellow-400 to-amber-600',
        gender: 'Masculino', roles: ['Estudiante', 'Héroe Pro'], affiliations: ['U.A.'], quirkTypes: ['Transformación'], height: 181, debutArc: 10,
        stats: { quirk: 89, intelligence: 87, experience: 84, combat: 96, strength: 86, agility: 95, speed: 91, resistance: 89 }
    },
    {
        id: 'shota_aizawa', heroName: 'Eraser Head', realName: 'Shota Aizawa', role: 'Héroe Profesional',
        quirkName: 'Borrado', color: '#334155', gradient: 'from-slate-600 to-zinc-950',
        gender: 'Masculino', roles: ['Héroe Pro', 'Profesor'], affiliations: ['U.A.'], quirkTypes: ['Emisor'], height: 183, debutArc: 2,
        stats: { quirk: 93, intelligence: 92, experience: 96, combat: 92, strength: 74, agility: 85, speed: 80, resistance: 82 }
    },
    {
        id: 'sorahiko_torino', heroName: 'Gran Torino', realName: 'Sorahiko Torino', role: 'Héroe Retirado',
        quirkName: 'Propulsión', color: '#b45309', gradient: 'from-amber-500 to-yellow-800',
        gender: 'Masculino', roles: ['Héroe Pro', 'Profesor'], affiliations: ['Independiente'], quirkTypes: ['Emisor'], height: 120, debutArc: 6,
        stats: { quirk: 81, intelligence: 91, experience: 99, combat: 91, strength: 70, agility: 91, speed: 90, resistance: 72 }
    },
    {
        id: 'ryukyu', heroName: 'Ryukyu', realName: 'Ryuko Tatsuma', role: 'Héroe Profesional',
        quirkName: 'Dragón', color: '#047857', gradient: 'from-emerald-700 to-teal-950',
        gender: 'Femenino', roles: ['Héroe Pro'], affiliations: ['Independiente'], quirkTypes: ['Transformación'], height: 166, debutArc: 11,
        stats: { quirk: 88, intelligence: 84, experience: 91, combat: 86, strength: 92, agility: 76, speed: 80, resistance: 91 }
    },
    {
        id: 'fat_gum', heroName: 'Fat Gum', realName: 'Taishiro Toyomitsu', role: 'Héroe Profesional',
        quirkName: 'Absorción de Grasa', color: '#d97706', gradient: 'from-amber-500 to-orange-900',
        gender: 'Masculino', roles: ['Héroe Pro'], affiliations: ['Independiente'], quirkTypes: ['Transformación'], height: 250, debutArc: 11,
        stats: { quirk: 86, intelligence: 82, experience: 90, combat: 86, strength: 90, agility: 72, speed: 75, resistance: 95 }
    },
    {
        id: 'mt_lady', heroName: 'Mt. Lady', realName: 'Yu Takeyama', role: 'Héroe Profesional',
        quirkName: 'Gigantificación', color: '#7e22ce', gradient: 'from-purple-600 to-pink-900',
        gender: 'Femenino', roles: ['Héroe Pro'], affiliations: ['Independiente'], quirkTypes: ['Transformación'], height: 162, debutArc: 1,
        stats: { quirk: 85, intelligence: 74, experience: 83, combat: 81, strength: 93, agility: 68, speed: 74, resistance: 89 }
    },
    {
        id: 'shinji_nishiya', heroName: 'Kamui Woods', realName: 'Shinji Nishiya', role: 'Héroe Profesional',
        quirkName: 'Arborización', color: '#92400e', gradient: 'from-amber-700 to-emerald-950',
        gender: 'Masculino', roles: ['Héroe Pro'], affiliations: ['Independiente'], quirkTypes: ['Transformación'], height: 168, debutArc: 1,
        stats: { quirk: 86, intelligence: 83, experience: 89, combat: 85, strength: 81, agility: 87, speed: 84, resistance: 82 }
    },
    {
        id: 'cementoss', heroName: 'Cementoss', realName: 'Ken Ishiyama', role: 'Héroe / Profesor U.A.',
        quirkName: 'Cemento', color: '#57534e', gradient: 'from-stone-600 to-neutral-900',
        gender: 'Masculino', roles: ['Héroe Pro', 'Profesor'], affiliations: ['U.A.'], quirkTypes: ['Emisor'], height: 185, debutArc: 4,
        stats: { quirk: 88, intelligence: 87, experience: 90, combat: 80, strength: 78, agility: 65, speed: 66, resistance: 86 }
    },
    {
        id: 'ectoplasm', heroName: 'Ectoplasm', realName: 'Ectoplasm', role: 'Héroe / Profesor U.A.',
        quirkName: 'Clones', color: '#312e81', gradient: 'from-indigo-900 to-slate-950',
        gender: 'Masculino', roles: ['Héroe Pro', 'Profesor'], affiliations: ['U.A.'], quirkTypes: ['Emisor'], height: 180, debutArc: 4,
        stats: { quirk: 85, intelligence: 85, experience: 90, combat: 84, strength: 75, agility: 78, speed: 77, resistance: 78 }
    },
    {
        id: 'present_mic', heroName: 'Present Mic', realName: 'Hizashi Yamada', role: 'Héroe / Profesor U.A.',
        quirkName: 'Voz', color: '#ca8a04', gradient: 'from-yellow-500 to-stone-900',
        gender: 'Masculino', roles: ['Héroe Pro', 'Profesor'], affiliations: ['U.A.'], quirkTypes: ['Emisor'], height: 185, debutArc: 1,
        stats: { quirk: 87, intelligence: 80, experience: 90, combat: 78, strength: 72, agility: 76, speed: 75, resistance: 76 }
    },
    {
        id: 'midnight', heroName: 'Midnight', realName: 'Nemuri Kayama', role: 'Héroe / Profesora U.A.',
        quirkName: 'Sonambulismo', color: '#6b21a8', gradient: 'from-purple-800 to-rose-950',
        gender: 'Femenino', roles: ['Héroe Pro', 'Profesor'], affiliations: ['U.A.'], quirkTypes: ['Emisor'], height: 175, debutArc: 4,
        stats: { quirk: 86, intelligence: 84, experience: 91, combat: 82, strength: 68, agility: 82, speed: 78, resistance: 72 }
    },
    {
        id: 'sir_nighteye', heroName: 'Sir Nighteye', realName: 'Mirai Sasaki', role: 'Héroe Profesional',
        quirkName: 'Previsión', color: '#15803d', gradient: 'from-green-700 to-slate-950',
        gender: 'Masculino', roles: ['Héroe Pro'], affiliations: ['Independiente'], quirkTypes: ['Emisor'], height: 200, debutArc: 11,
        stats: { quirk: 89, intelligence: 96, experience: 93, combat: 88, strength: 73, agility: 84, speed: 81, resistance: 74 }
    },
    {
        id: 'death_arms', heroName: 'Death Arms', realName: 'Death Arms', role: 'Héroe Profesional',
        quirkName: 'Súper Fuerza', color: '#b45309', gradient: 'from-amber-700 to-zinc-900',
        gender: 'Masculino', roles: ['Héroe Pro'], affiliations: ['Independiente'], quirkTypes: ['Emisor'], height: 188, debutArc: 1,
        stats: { quirk: 75, intelligence: 70, experience: 85, combat: 79, strength: 87, agility: 68, speed: 70, resistance: 83 }
    },
    {
        id: 'mandalay', heroName: 'Mandalay', realName: 'Shino Sosaki', role: 'Héroe (Wild, Wild Pussycats)',
        quirkName: 'Telepatía', color: '#dc2626', gradient: 'from-red-600 to-rose-950',
        gender: 'Femenino', roles: ['Héroe Pro'], affiliations: ['Independiente'], quirkTypes: ['Emisor'], height: 168, debutArc: 8,
        stats: { quirk: 80, intelligence: 84, experience: 88, combat: 80, strength: 70, agility: 84, speed: 81, resistance: 75 }
    },
    {
        id: 'tiger', heroName: 'Tiger', realName: 'Yawara Chatora', role: 'Héroe (Wild, Wild Pussycats)',
        quirkName: 'Cuerpo Flexible', color: '#9a3412', gradient: 'from-orange-800 to-stone-950',
        gender: 'Masculino', roles: ['Héroe Pro'], affiliations: ['Independiente'], quirkTypes: ['Transformación'], height: 185, debutArc: 8,
        stats: { quirk: 78, intelligence: 76, experience: 89, combat: 88, strength: 88, agility: 85, speed: 80, resistance: 86 }
    },

    // --- VILLANOS Y ANTAGONISTAS ---
    {
        id: 'lady_nagant', heroName: 'Lady Nagant', realName: 'Kaina Tsutsumi', role: 'Ex-Heroína / Francotiradora',
        quirkName: 'Rifle + Caminata Aérea', color: '#4338ca', gradient: 'from-indigo-700 to-pink-950',
        gender: 'Femenino', roles: ['Villano', 'Héroe Pro'], affiliations: ['Independiente'], quirkTypes: ['Mutante', 'Emisor'], height: 171, debutArc: 16,
        stats: { quirk: 90, intelligence: 91, experience: 94, combat: 93, strength: 74, agility: 89, speed: 86, resistance: 80 }
    },
    {
        id: 'nomu_usj', heroName: 'Nomu (USJ)', realName: 'Bio-ingeniería', role: 'Villano',
        quirkName: 'Absorción de Impactos + Súper Regeneración', color: '#1e1b4b', gradient: 'from-indigo-950 to-black',
        gender: 'Otro', roles: ['Villano'], affiliations: ['Liga de Villanos'], quirkTypes: ['Mutante', 'Emisor'], height: 210, debutArc: 4,
        stats: { quirk: 91, intelligence: 30, experience: 55, combat: 83, strength: 97, agility: 85, speed: 94, resistance: 96 }
    },
    {
        id: 'muscular', heroName: 'Muscular', realName: 'Goto Imasuji', role: 'Villano',
        quirkName: 'Aumento Muscular', color: '#991b1b', gradient: 'from-red-700 to-stone-950',
        gender: 'Masculino', roles: ['Villano'], affiliations: ['Liga de Villanos'], quirkTypes: ['Transformación'], height: 200, debutArc: 8,
        stats: { quirk: 89, intelligence: 62, experience: 83, combat: 86, strength: 95, agility: 82, speed: 86, resistance: 93 }
    },
    {
        id: 'twice', heroName: 'Twice', realName: 'Jin Bubaigawara', role: 'Villano',
        quirkName: 'Doble (Desfile del Hombre Triste)', color: '#334155', gradient: 'from-slate-700 to-zinc-950',
        gender: 'Masculino', roles: ['Villano'], affiliations: ['Liga de Villanos'], quirkTypes: ['Emisor'], height: 178, debutArc: 8,
        stats: { quirk: 95, intelligence: 72, experience: 81, combat: 81, strength: 73, agility: 84, speed: 82, resistance: 76 }
    },
    {
        id: 'himiko_toga', heroName: 'Toga', realName: 'Himiko Toga', role: 'Villana',
        quirkName: 'Transformación', color: '#be123c', gradient: 'from-rose-700 to-amber-950',
        gender: 'Femenino', roles: ['Villano'], affiliations: ['Liga de Villanos'], quirkTypes: ['Transformación'], height: 157, debutArc: 7,
        stats: { quirk: 91, intelligence: 82, experience: 80, combat: 88, strength: 72, agility: 93, speed: 89, resistance: 77 }
    },
    {
        id: 'kurogiri', heroName: 'Kurogiri', realName: 'Oboro Shirakumo', role: 'Villano',
        quirkName: 'Portal de Niebla', color: '#4c1d95', gradient: 'from-violet-950 to-black',
        gender: 'Masculino', roles: ['Villano'], affiliations: ['Liga de Villanos'], quirkTypes: ['Emisor'], height: 192, debutArc: 4,
        stats: { quirk: 94, intelligence: 87, experience: 85, combat: 76, strength: 68, agility: 78, speed: 85, resistance: 80 }
    },
    {
        id: 'stain', heroName: 'Stain', realName: 'Chizome Akaguro', role: 'Asesino de Héroes',
        quirkName: 'Coagulación de Sangre', color: '#7f1d1d', gradient: 'from-red-900 to-zinc-950',
        gender: 'Masculino', roles: ['Villano'], affiliations: ['Independiente'], quirkTypes: ['Emisor'], height: 177, debutArc: 6,
        stats: { quirk: 83, intelligence: 84, experience: 91, combat: 94, strength: 79, agility: 93, speed: 90, resistance: 84 }
    },
    {
        id: 'kendo_rappa', heroName: 'Kendo Rappa', realName: 'Kendo Rappa', role: 'Villano (Ocho Preceptos)',
        quirkName: 'Brazos Fuertes', color: '#9a3412', gradient: 'from-orange-700 to-stone-950',
        gender: 'Masculino', roles: ['Villano'], affiliations: ['Shie Hassaikai'], quirkTypes: ['Emisor'], height: 194, debutArc: 11,
        stats: { quirk: 82, intelligence: 64, experience: 85, combat: 91, strength: 91, agility: 78, speed: 87, resistance: 88 }
    },
    {
        id: 'gentle_criminal', heroName: 'Gentle Criminal', realName: 'Danjuro Tobita', role: 'Villano',
        quirkName: 'Elasticidad', color: '#6b21a8', gradient: 'from-purple-700 to-slate-900',
        gender: 'Masculino', roles: ['Villano'], affiliations: ['Independiente'], quirkTypes: ['Emisor'], height: 181, debutArc: 12,
        stats: { quirk: 85, intelligence: 83, experience: 82, combat: 83, strength: 76, agility: 89, speed: 84, resistance: 79 }
    },
    {
        id: 'mr_compress', heroName: 'Mr. Compress', realName: 'Atsuhiro Sako', role: 'Villano',
        quirkName: 'Comprimir', color: '#b45309', gradient: 'from-amber-600 to-red-950',
        gender: 'Masculino', roles: ['Villano'], affiliations: ['Liga de Villanos'], quirkTypes: ['Emisor'], height: 181, debutArc: 8,
        stats: { quirk: 87, intelligence: 86, experience: 84, combat: 77, strength: 69, agility: 85, speed: 80, resistance: 73 }
    },
    {
        id: 'spinner', heroName: 'Spinner', realName: 'Shuichi Iguchi', role: 'Villano',
        quirkName: 'Lagarto + Escamas', color: '#15803d', gradient: 'from-green-800 to-zinc-950',
        gender: 'Masculino', roles: ['Villano'], affiliations: ['Liga de Villanos'], quirkTypes: ['Mutante'], height: 174, debutArc: 8,
        stats: { quirk: 75, intelligence: 71, experience: 78, combat: 79, strength: 83, agility: 81, speed: 78, resistance: 82 }
    },
    {
        id: 'magne', heroName: 'Magne', realName: 'Kenji Hikiishi', role: 'Villana',
        quirkName: 'Magnetismo', color: '#9d174d', gradient: 'from-pink-800 to-slate-950',
        gender: 'Femenino', roles: ['Villano'], affiliations: ['Liga de Villanos'], quirkTypes: ['Emisor'], height: 193, debutArc: 8,
        stats: { quirk: 81, intelligence: 73, experience: 81, combat: 80, strength: 84, agility: 72, speed: 74, resistance: 80 }
    },
    {
        id: 'skeptic', heroName: 'Skeptic', realName: 'Tomoyasu Chikazoku', role: 'Villano',
        quirkName: 'Antropomorfismo', color: '#374151', gradient: 'from-gray-700 to-slate-950',
        gender: 'Masculino', roles: ['Villano'], affiliations: ['Ejército de Liberación'], quirkTypes: ['Emisor'], height: 176, debutArc: 14,
        stats: { quirk: 79, intelligence: 92, experience: 80, combat: 62, strength: 60, agility: 65, speed: 66, resistance: 64 }
    },
    {
        id: 'la_brava', heroName: 'La Brava', realName: 'Manami Aiba', role: 'Villana',
        quirkName: 'Amor', color: '#db2777', gradient: 'from-pink-600 to-rose-950',
        gender: 'Femenino', roles: ['Villano'], affiliations: ['Independiente'], quirkTypes: ['Emisor'], height: 130, debutArc: 12,
        stats: { quirk: 84, intelligence: 88, experience: 74, combat: 55, strength: 50, agility: 68, speed: 67, resistance: 58 }
    },

    // --- ESTUDIANTES U.A. (CLASE A, CLASE B Y TRES GRANDES) ---
    {
        id: 'tamaki_amajiki', heroName: 'Suneater', realName: 'Tamaki Amajiki', role: 'Estudiante U.A. (Tres Grandes)',
        quirkName: 'Manifestación', color: '#312e81', gradient: 'from-indigo-800 to-purple-950',
        gender: 'Masculino', roles: ['Estudiante'], affiliations: ['U.A.'], quirkTypes: ['Transformación'], height: 177, debutArc: 10,
        stats: { quirk: 92, intelligence: 84, experience: 83, combat: 89, strength: 88, agility: 85, speed: 84, resistance: 88 }
    },
    {
        id: 'nejire_hado', heroName: 'Nejire Chan', realName: 'Nejire Hado', role: 'Estudiante U.A. (Tres Grandes)',
        quirkName: 'Movimiento Ondulatorio', color: '#0284c7', gradient: 'from-sky-500 to-indigo-900',
        gender: 'Femenino', roles: ['Estudiante'], affiliations: ['U.A.'], quirkTypes: ['Emisor'], height: 164, debutArc: 10,
        stats: { quirk: 91, intelligence: 81, experience: 83, combat: 86, strength: 82, agility: 89, speed: 87, resistance: 84 }
    },
    {
        id: 'fumikage_tokoyami', heroName: 'Tsukuyomi', realName: 'Fumikage Tokoyami', role: 'Estudiante U.A.',
        quirkName: 'Sombra Oscura', color: '#4c1d95', gradient: 'from-purple-900 to-slate-950',
        gender: 'Masculino', roles: ['Estudiante'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Mutante', 'Emisor'], height: 158, debutArc: 2,
        stats: { quirk: 94, intelligence: 81, experience: 77, combat: 85, strength: 92, agility: 84, speed: 86, resistance: 87 }
    },
    {
        id: 'tenya_iida', heroName: 'Ingenium', realName: 'Tenya Iida', role: 'Estudiante U.A.',
        quirkName: 'Motor', color: '#2563eb', gradient: 'from-blue-500 to-cyan-800',
        gender: 'Masculino', roles: ['Estudiante'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Mutante'], height: 179, debutArc: 1,
        stats: { quirk: 87, intelligence: 84, experience: 77, combat: 82, strength: 82, agility: 84, speed: 96, resistance: 84 }
    },
    {
        id: 'eijiro_kirishima', heroName: 'Red Riot', realName: 'Eijiro Kirishima', role: 'Estudiante U.A.',
        quirkName: 'Endurecimiento', color: '#dc2626', gradient: 'from-red-600 to-rose-950',
        gender: 'Masculino', roles: ['Estudiante'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Transformación'], height: 170, debutArc: 2,
        stats: { quirk: 85, intelligence: 73, experience: 77, combat: 84, strength: 89, agility: 73, speed: 72, resistance: 96 }
    },
    {
        id: 'tetsutetsu_tetsutetsu', heroName: 'Real Steel', realName: 'Tetsutetsu Tetsutetsu', role: 'Estudiante U.A. (Clase B)',
        quirkName: 'Acero', color: '#64748b', gradient: 'from-slate-500 to-zinc-900',
        gender: 'Masculino', roles: ['Estudiante'], affiliations: ['Clase 1-B', 'U.A.'], quirkTypes: ['Transformación'], height: 174, debutArc: 5,
        stats: { quirk: 84, intelligence: 72, experience: 76, combat: 83, strength: 88, agility: 72, speed: 71, resistance: 95 }
    },
    {
        id: 'momo_yaoyorozu', heroName: 'Creati', realName: 'Momo Yaoyorozu', role: 'Estudiante U.A.',
        quirkName: 'Creación', color: '#be123c', gradient: 'from-rose-600 to-pink-950',
        gender: 'Femenino', roles: ['Estudiante'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Emisor'], height: 173, debutArc: 2,
        stats: { quirk: 92, intelligence: 96, experience: 76, combat: 77, strength: 67, agility: 73, speed: 71, resistance: 75 }
    },
    {
        id: 'ochaco_uraraka', heroName: 'Uravity', realName: 'Ochaco Uraraka', role: 'Estudiante U.A.',
        quirkName: 'Gravedad Cero', color: '#db2777', gradient: 'from-pink-500 to-rose-800',
        gender: 'Femenino', roles: ['Estudiante'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Emisor'], height: 156, debutArc: 1,
        stats: { quirk: 91, intelligence: 82, experience: 77, combat: 85, strength: 74, agility: 88, speed: 81, resistance: 81 }
    },
    {
        id: 'itsuka_kendo', heroName: 'Battle Fist', realName: 'Itsuka Kendo', role: 'Estudiante U.A. (Clase B)',
        quirkName: 'Puño Gigante', color: '#ea580c', gradient: 'from-orange-600 to-teal-950',
        gender: 'Femenino', roles: ['Estudiante'], affiliations: ['Clase 1-B', 'U.A.'], quirkTypes: ['Transformación'], height: 166, debutArc: 5,
        stats: { quirk: 79, intelligence: 86, experience: 77, combat: 86, strength: 85, agility: 79, speed: 77, resistance: 81 }
    },
    {
        id: 'neito_monoma', heroName: 'Phantom Thief', realName: 'Neito Monoma', role: 'Estudiante U.A. (Clase B)',
        quirkName: 'Copia', color: '#ca8a04', gradient: 'from-yellow-500 to-blue-950',
        gender: 'Masculino', roles: ['Estudiante'], affiliations: ['Clase 1-B', 'U.A.'], quirkTypes: ['Emisor'], height: 170, debutArc: 5,
        stats: { quirk: 93, intelligence: 89, experience: 77, combat: 78, strength: 68, agility: 79, speed: 77, resistance: 72 }
    },
    {
        id: 'hitoshi_shinso', heroName: 'Shinso', realName: 'Hitoshi Shinso', role: 'Estudiante U.A.',
        quirkName: 'Lavado de Cerebro', color: '#6d28d9', gradient: 'from-violet-700 to-slate-950',
        gender: 'Masculino', roles: ['Estudiante'], affiliations: ['U.A.'], quirkTypes: ['Emisor'], height: 177, debutArc: 5,
        stats: { quirk: 90, intelligence: 85, experience: 75, combat: 81, strength: 71, agility: 82, speed: 78, resistance: 74 }
    },
    {
        id: 'tsuyu_asui', heroName: 'Froppy', realName: 'Tsuyu Asui', role: 'Estudiante U.A.',
        quirkName: 'Rana', color: '#16a34a', gradient: 'from-green-600 to-emerald-950',
        gender: 'Femenino', roles: ['Estudiante'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Mutante'], height: 150, debutArc: 2,
        stats: { quirk: 81, intelligence: 86, experience: 78, combat: 82, strength: 75, agility: 91, speed: 84, resistance: 79 }
    },
    {
        id: 'mina_ashido', heroName: 'Pinky', realName: 'Mina Ashido', role: 'Estudiante U.A.',
        quirkName: 'Ácido', color: '#ec4899', gradient: 'from-pink-600 to-purple-900',
        gender: 'Femenino', roles: ['Estudiante'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Emisor', 'Mutante'], height: 159, debutArc: 2,
        stats: { quirk: 87, intelligence: 70, experience: 76, combat: 83, strength: 75, agility: 91, speed: 83, resistance: 79 }
    },
    {
        id: 'denki_kaminari', heroName: 'Chargebolt', realName: 'Denki Kaminari', role: 'Estudiante U.A.',
        quirkName: 'Electrificación', color: '#eab308', gradient: 'from-yellow-500 to-amber-800',
        gender: 'Masculino', roles: ['Estudiante'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Emisor'], height: 168, debutArc: 2,
        stats: { quirk: 86, intelligence: 67, experience: 75, combat: 73, strength: 71, agility: 76, speed: 77, resistance: 76 }
    },
    {
        id: 'kyoka_jiro', heroName: 'Earphone Jack', realName: 'Kyoka Jiro', role: 'Estudiante U.A.',
        quirkName: 'Conector de Auriculares', color: '#6d28d9', gradient: 'from-violet-700 to-slate-950',
        gender: 'Femenino', roles: ['Estudiante'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Mutante'], height: 154, debutArc: 2,
        stats: { quirk: 81, intelligence: 83, experience: 76, combat: 76, strength: 67, agility: 78, speed: 75, resistance: 75 }
    },
    {
        id: 'mezo_shoji', heroName: 'Tentacole', realName: 'Mezo Shoji', role: 'Estudiante U.A.',
        quirkName: 'Brazos Duplicados', color: '#1e3a8a', gradient: 'from-blue-800 to-slate-950',
        gender: 'Masculino', roles: ['Estudiante'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Mutante'], height: 187, debutArc: 2,
        stats: { quirk: 83, intelligence: 81, experience: 77, combat: 82, strength: 90, agility: 77, speed: 78, resistance: 89 }
    },
    {
        id: 'hanta_sero', heroName: 'Cellophane', realName: 'Hanta Sero', role: 'Estudiante U.A.',
        quirkName: 'Cinta', color: '#ea580c', gradient: 'from-orange-600 to-zinc-900',
        gender: 'Masculino', roles: ['Estudiante'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Mutante'], height: 177, debutArc: 2,
        stats: { quirk: 79, intelligence: 77, experience: 76, combat: 78, strength: 72, agility: 89, speed: 84, resistance: 76 }
    },
    {
        id: 'mashirao_ojiro', heroName: 'Tailman', realName: 'Mashirao Ojiro', role: 'Estudiante U.A.',
        quirkName: 'Cola', color: '#ca8a04', gradient: 'from-amber-600 to-stone-900',
        gender: 'Masculino', roles: ['Estudiante'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Mutante'], height: 169, debutArc: 2,
        stats: { quirk: 74, intelligence: 77, experience: 76, combat: 87, strength: 80, agility: 86, speed: 79, resistance: 79 }
    },
    {
        id: 'toru_hagakure', heroName: 'Invisible Girl', realName: 'Toru Hagakure', role: 'Estudiante U.A.',
        quirkName: 'Invisibilidad + Refracción', color: '#06b6d4', gradient: 'from-cyan-500 to-pink-700',
        gender: 'Femenino', roles: ['Estudiante'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Mutante'], height: 152, debutArc: 2,
        stats: { quirk: 78, intelligence: 75, experience: 75, combat: 71, strength: 64, agility: 82, speed: 77, resistance: 69 }
    },
    {
        id: 'rikido_sato', heroName: 'Sugarman', realName: 'Rikido Sato', role: 'Estudiante U.A.',
        quirkName: 'Fiebre del Azúcar', color: '#b45309', gradient: 'from-yellow-700 to-red-950',
        gender: 'Masculino', roles: ['Estudiante'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Transformación'], height: 185, debutArc: 2,
        stats: { quirk: 76, intelligence: 65, experience: 73, combat: 75, strength: 89, agility: 67, speed: 69, resistance: 83 }
    },
    {
        id: 'koji_koda', heroName: 'Anima', realName: 'Koji Koda', role: 'Estudiante U.A.',
        quirkName: 'Voz Animal', color: '#9a3412', gradient: 'from-orange-800 to-stone-950',
        gender: 'Masculino', roles: ['Estudiante'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Emisor', 'Mutante'], height: 186, debutArc: 2,
        stats: { quirk: 82, intelligence: 75, experience: 74, combat: 69, strength: 84, agility: 66, speed: 67, resistance: 82 }
    },
    {
        id: 'yuga_aoyama', heroName: 'Can’t Stop Twinkling', realName: 'Yuga Aoyama', role: 'Estudiante U.A.',
        quirkName: 'Láser Naval', color: '#7e22ce', gradient: 'from-purple-600 to-indigo-950',
        gender: 'Masculino', roles: ['Estudiante'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Emisor'], height: 168, debutArc: 1,
        stats: { quirk: 80, intelligence: 75, experience: 75, combat: 70, strength: 65, agility: 72, speed: 73, resistance: 68 }
    },
    {
        id: 'minoru_mineta', heroName: 'Grape Juice', realName: 'Minoru Mineta', role: 'Estudiante U.A.',
        quirkName: 'Esferas Pegajosas', color: '#4338ca', gradient: 'from-indigo-600 to-purple-950',
        gender: 'Masculino', roles: ['Estudiante'], affiliations: ['Clase 1-A', 'U.A.'], quirkTypes: ['Mutante'], height: 108, debutArc: 2,
        stats: { quirk: 78, intelligence: 84, experience: 73, combat: 66, strength: 55, agility: 80, speed: 74, resistance: 64 }
    },
    {
        id: 'mei_hatsume', heroName: 'Hatsume', realName: 'Mei Hatsume', role: 'Estudiante U.A. (Curso de Apoyo)',
        quirkName: 'Zoom', color: '#db2777', gradient: 'from-pink-600 to-amber-900',
        gender: 'Femenino', roles: ['Estudiante'], affiliations: ['U.A.'], quirkTypes: ['Mutante'], height: 157, debutArc: 5,
        stats: { quirk: 72, intelligence: 95, experience: 74, combat: 60, strength: 62, agility: 74, speed: 72, resistance: 66 }
    },

    // --- ESPECIALES, APOYO, CIVILES Y PORTADORES ---
    {
        id: 'nezu', heroName: 'Director Nezu', realName: 'Nezu', role: 'Director de U.A.',
        quirkName: 'Alta Especificación', color: '#d97706', gradient: 'from-amber-600 to-slate-900',
        gender: 'Masculino', roles: ['Héroe Pro', 'Profesor'], affiliations: ['U.A.'], quirkTypes: ['Mutante'], height: 85, debutArc: 4,
        stats: { quirk: 95, intelligence: 100, experience: 95, combat: 64, strength: 45, agility: 75, speed: 72, resistance: 58 }
    },
    {
        id: 'recovery_girl', heroName: 'Recovery Girl', realName: 'Chiyo Shuzenji', role: 'Heroína Médica U.A.',
        quirkName: 'Curación', color: '#be185d', gradient: 'from-pink-700 to-purple-950',
        gender: 'Femenino', roles: ['Héroe Pro', 'Profesor'], affiliations: ['U.A.'], quirkTypes: ['Emisor'], height: 115, debutArc: 1,
        stats: { quirk: 90, intelligence: 89, experience: 96, combat: 45, strength: 40, agility: 45, speed: 45, resistance: 52 }
    },
    {
        id: 'kyudai_garaki', heroName: 'Dr. Garaki', realName: 'Kyudai Garaki', role: 'Villano / Científico',
        quirkName: 'Fuerza Vital', color: '#374151', gradient: 'from-gray-800 to-zinc-950',
        gender: 'Masculino', roles: ['Villano'], affiliations: ['Liga de Villanos'], quirkTypes: ['Mutante'], height: 145, debutArc: 1,
        stats: { quirk: 76, intelligence: 98, experience: 96, combat: 40, strength: 42, agility: 44, speed: 44, resistance: 55 }
    },
    {
        id: 'eri', heroName: 'Eri', realName: 'Eri', role: 'Protegida U.A.',
        quirkName: 'Rebobinar', color: '#dc2626', gradient: 'from-red-600 to-sky-900',
        gender: 'Femenino', roles: ['Civil'], affiliations: ['U.A.'], quirkTypes: ['Emisor'], height: 110, debutArc: 11,
        stats: { quirk: 97, intelligence: 58, experience: 40, combat: 35, strength: 35, agility: 52, speed: 50, resistance: 45 }
    },
    {
        id: 'yoichi_shigaraki', heroName: 'Yoichi Shigaraki', realName: 'Yoichi Shigaraki', role: 'Primer Portador OFA',
        quirkName: 'One For All (Origen)', color: '#059669', gradient: 'from-emerald-800 to-slate-950',
        gender: 'Masculino', roles: ['Portador'], affiliations: ['Independiente'], quirkTypes: ['Acumulación'], height: 170, debutArc: 13,
        stats: { quirk: 88, intelligence: 84, experience: 85, combat: 55, strength: 48, agility: 58, speed: 56, resistance: 50 }
    },
    {
        id: 'david_shield', heroName: 'David Shield', realName: 'David Shield', role: 'Científico (I-Island)',
        quirkName: 'Dedos Flexibles', color: '#1d4ed8', gradient: 'from-blue-800 to-slate-950',
        gender: 'Masculino', roles: ['Civil'], affiliations: ['Independiente'], quirkTypes: ['Mutante'], height: 182, debutArc: 10,
        stats: { quirk: 55, intelligence: 96, experience: 88, combat: 42, strength: 52, agility: 54, speed: 54, resistance: 55 }
    },
    {
        id: 'melissa_shield', heroName: 'Melissa Shield', realName: 'Melissa Shield', role: 'Inventora (I-Island)',
        quirkName: 'Sin Don', color: '#ca8a04', gradient: 'from-yellow-600 to-blue-950',
        gender: 'Femenino', roles: ['Civil'], affiliations: ['Independiente'], quirkTypes: ['Sin Don'], height: 165, debutArc: 10,
        stats: { quirk: 40, intelligence: 93, experience: 72, combat: 48, strength: 54, agility: 64, speed: 62, resistance: 58 }
    },
    {
        id: 'naomasa_tsukauchi', heroName: 'Detective Tsukauchi', realName: 'Naomasa Tsukauchi', role: 'Detective de Policía',
        quirkName: 'Detector de Mentiras', color: '#334155', gradient: 'from-slate-700 to-zinc-950',
        gender: 'Masculino', roles: ['Civil'], affiliations: ['Independiente'], quirkTypes: ['Emisor'], height: 180, debutArc: 4,
        stats: { quirk: 74, intelligence: 94, experience: 89, combat: 66, strength: 64, agility: 66, speed: 67, resistance: 68 }
    },
    {
        id: 'kota_izumi', heroName: 'Kota Izumi', realName: 'Kota Izumi', role: 'Civil',
        quirkName: 'Pistola de Agua', color: '#991b1b', gradient: 'from-red-800 to-stone-950',
        gender: 'Masculino', roles: ['Civil'], affiliations: ['Independiente'], quirkTypes: ['Emisor'], height: 112, debutArc: 8,
        stats: { quirk: 62, intelligence: 64, experience: 45, combat: 45, strength: 44, agility: 62, speed: 60, resistance: 50 }
    },
    {
        id: 'izuku_midoriya_kid', heroName: 'Super AllMight', realName: 'Izuku Midoriya', role: 'Fan de All Might',
        quirkName: 'Sin Don', color: '#eab308', gradient: 'from-yellow-500 to-emerald-900',
        gender: 'Masculino', roles: ['Civil'], affiliations: ['Independiente'], quirkTypes: ['Sin Don'], height: 105, debutArc: 1,
        stats: { quirk: 0, intelligence: 50, experience: 5, combat: 5, strength: 5, agility: 10, speed: 15, resistance: 5 }
    }
];

// ============================================================
//  UTILIDADES DE IMAGEN
//  Todas las imágenes son .webp de 256px máx (images/mha_characters/<id>.webp).
//  Ya no se intenta .png primero, así que no hay 404 de ida y vuelta.
// ============================================================

const CHAR_BY_ID = new Map(CHARACTERS.map(c => [c.id, c]));

export function characterImagePath(id) {
    return `images/mha_characters/${id}.webp`;
}

/** Escapa texto para usarlo dentro de atributos/HTML generado con plantillas. */
export function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export function buildFallbackSvgDataUri(char) {
    const initials = char.heroName
        .split(' ')
        .map(w => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">` +
        `<defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">` +
        `<stop offset="0%" stop-color="${char.color}"/><stop offset="100%" stop-color="#090d16"/>` +
        `</linearGradient></defs>` +
        `<rect width="200" height="200" fill="url(#g)"/>` +
        `<text x="100" y="116" font-family="Arial Black, sans-serif" font-size="56" font-weight="900" ` +
        `fill="#ffffff" text-anchor="middle" stroke="#000000" stroke-width="3">${escapeHtml(initials)}</text></svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

/**
 * Genera el <img> de un personaje.
 *  - Sin onerror inline: el respaldo lo gestiona UN solo listener global (installImageFallback).
 *  - width/height evitan saltos de diseño; lazy por defecto, eager para la ruleta.
 */
export function createCharacterImgHtml(char, sizeClasses = 'w-10 h-10 rounded-lg', { eager = false } = {}) {
    return `<img src="${characterImagePath(char.id)}" alt="${escapeHtml(char.heroName)}" ` +
        `data-char-id="${escapeHtml(char.id)}" width="96" height="96" decoding="async" ` +
        `${eager ? 'fetchpriority="high"' : 'loading="lazy"'} ` +
        `class="${sizeClasses} object-cover border-2 border-black shrink-0 bg-slate-900">`;
}

let fallbackInstalled = false;
/**
 * Un único listener en fase de captura (el evento 'error' de <img> no burbujea)
 * sustituye por un SVG con iniciales cualquier imagen de personaje que falle.
 */
export function installImageFallback() {
    if (fallbackInstalled) return;
    fallbackInstalled = true;
    document.addEventListener('error', (e) => {
        const img = e.target;
        if (!(img instanceof HTMLImageElement) || !img.dataset.charId || img.dataset.fallback) return;
        const char = CHAR_BY_ID.get(img.dataset.charId);
        if (!char) return;
        img.dataset.fallback = '1';
        img.src = buildFallbackSvgDataUri(char);
    }, true);
}

const preloaded = new Map();
/**
 * Precarga las miniaturas (~10 KB c/u) para que la ruleta no parpadee.
 * Devuelve una promesa que se resuelve cuando terminan (o fallan) todas.
 */
export function preloadCharacterImages() {
    return Promise.all(CHARACTERS.map(c => {
        if (preloaded.has(c.id)) return preloaded.get(c.id);
        const p = new Promise(resolve => {
            const img = new Image();
            img.onload = img.onerror = () => resolve();
            img.src = characterImagePath(c.id);
        });
        preloaded.set(c.id, p);
        return p;
    }));
}

// ============================================================
//  RANGOS
// ============================================================

export function scoreToRankInfo(score, prefix = '') {
    const p = prefix ? `${prefix} ` : '';
    if (score >= 95) return { label: `${p}S+`, css: 'rank-Splus', tier: 6 };
    if (score >= 88) return { label: `${p}S`,  css: 'rank-S',     tier: 5 };
    if (score >= 81) return { label: `${p}A`,  css: 'rank-A',     tier: 4 };
    if (score >= 74) return { label: `${p}B`,  css: 'rank-B',     tier: 3 };
    if (score >= 66) return { label: `${p}C`,  css: 'rank-C',     tier: 2 };
    return                  { label: `${p}D`,  css: 'rank-D',     tier: 1 };
}

export function getGeneralRankInfo(char) {
    const vals = Object.values(char.stats);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    return scoreToRankInfo(avg, 'RANGO');
}

export function getCategoryRankInfo(char, categoryKey) {
    return scoreToRankInfo(char.stats[categoryKey], 'RANGO');
}
