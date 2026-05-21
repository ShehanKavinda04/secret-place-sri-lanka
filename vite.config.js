import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: 'localhost',
        proxy: {
            '/': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                bypass: (req, res, options) => {
                    if (req.url.startsWith('/@') || req.url.startsWith('/__vite_ping') || req.url.startsWith('/resources/') || req.url.startsWith('/node_modules/')) {
                        return req.url;
                    }
                    return null;
                }
            }
        }
    }
});
