/** @type {import('tailwindcss').Config} */
export default {
    content: [
        'index.html',
        './app/**/*.{js,jsx,ts,tsx}',
        // './kitchen/**/*.{js,jsx,ts,tsx}',
        // './cms/**/*.{js,jsx,ts,tsx}',
        // './stories/**/*.{js,jsx,ts,tsx}',
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        extend: {
            fontFamily: {
                custom: ['CustomFont', 'sans-serif', 'Big Caslon FB'], // Add your custom font here
            },
        },
    },
    plugins: [require('flowbite/plugin')],
}
