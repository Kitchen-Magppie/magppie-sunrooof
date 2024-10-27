/** @type {import('tailwindcss').Config} */
export default {
    theme: {
        extend: {
            fontFamily: {
                sans: ['SF Pro Display', 'sans-serif'],
                cursive: ['Dancing Script', 'cursive'],
                kudryashev: ['KudryashevDisplayContrast', 'sans-serif'],
            },
            fontWeight: {
                thin: 100,
                light: 300,
                normal: 400,
                medium: 500,
                semibold: 600,
                bold: 700,
                heavy: 800,
                black: 900,
            },
        },
    },
    darkMode: ['class'],
    content: [
        'index.html',
        './app/**/*.{js,jsx,ts,tsx}',
        // './kitchen/**/*.{js,jsx,ts,tsx}',
        // './cms/**/*.{js,jsx,ts,tsx}',
        // './stories/**/*.{js,jsx,ts,tsx}',
        './node_modules/flowbite/**/*.js',
    ],

    plugins: [require('flowbite/plugin'), require('tailwindcss-animate')],
}
