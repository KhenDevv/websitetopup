import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
    // Use project root as Vite root so index.html is picked up natively
    root: '.',

    // Don't copy the public directory into the build output (they overlap)
    publicDir: false,

    plugins: [
        react(),
        tailwindcss(),
    ],

    resolve: {
        alias: {
            '@': path.resolve(projectRoot, 'resources/js'),
        },
    },

    // Build output goes directly to Laravel's public/ folder.
    // PHP's built-in server (artisan serve) automatically serves any existing
    // file from public/ without going through routing — so /assets/... works correctly.
    build: {
        outDir: 'public',
        emptyOutDir: false, // Don't wipe existing files (favicon, robots.txt, etc.)
    },

    server: {
        port: 5173,
        // Proxy all /api and /sanctum requests to the Laravel backend
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
            },
            '/sanctum': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
            },
        },
        watch: {
            ignored: ['**/storage/framework/views/**', '**/vendor/**'],
        },
    },
});
