/** Configuración para compilar Tailwind en producción (ver README.md). */
module.exports = {
    // IMPORTANTE: incluir los .js; las clases dinámicas (p. ej. char.gradient en characters.js) viven ahí.
    content: ['./index.html', './javascript/**/*.js'],
    theme: { extend: {} },
    plugins: []
};
