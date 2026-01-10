import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    base: '/lumina/', // Explicit path prevents missing-slash errors
    root: './',
    publicDir: false, // Disable default public dir, we'll copy manually
    plugins: [
        viteStaticCopy({
            targets: [
                // Copy all project folders
                { src: 'componentes', dest: '.' },
                { src: 'engine', dest: '.' },
                { src: 'editor', dest: '.' },
                { src: 'entidades', dest: '.' },
                { src: 'estados', dest: '.' },
                { src: 'movimentacao', dest: '.' },
                { src: 'player', dest: '.' },
                { src: 'sistemas', dest: '.' },
                { src: 'css', dest: '.' },
                { src: 'assets', dest: '.' },
                { src: 'i18n', dest: '.' },
                // Copy important root files
                { src: 'main.js', dest: '.' },
                { src: 'README.md', dest: '.' },
                { src: 'README.pt-BR.md', dest: '.' },
                { src: 'LICENSE', dest: '.' }
            ]
        })
    ],
    build: {
        outDir: 'dist',
        minify: 'esbuild',
        sourcemap: false,
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: './index.html'
            },
            output: {
                manualChunks: undefined,
                assetFileNames: 'build-assets/[name]-[hash][extname]',
                chunkFileNames: 'build-assets/[name]-[hash].js',
                entryFileNames: 'build-assets/[name]-[hash].js'
            }
        }
    }
});