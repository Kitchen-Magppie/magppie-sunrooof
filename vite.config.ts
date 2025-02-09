import react from "@vitejs/plugin-react"
import { defineConfig } from "vite";
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), svgr()],
    build: {
        rollupOptions: {
            external: ['src/vanilla.js'],
            input: {
                main: 'index.html',       // Entry point for React app
                vanilla: 'vanilla.html',  // Entry point for Vanilla JS page
            },
        },
    },
})
