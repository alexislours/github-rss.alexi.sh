/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app.html', './src/**/*.svelte'],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light"],
    },
}
