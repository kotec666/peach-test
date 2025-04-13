import { defineConfig } from 'vite';
import * as path from 'path'

export default defineConfig({
    base: '/peach-test',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 1420,
        strictPort: true,
        host: '0.0.0.0',
        open: true,
    },

    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
});