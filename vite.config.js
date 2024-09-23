import { resolve } from 'path';
import { defineConfig } from 'vite';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';

export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [
    dynamicImportVars({
      include: ['./ai-providers/*/*.'],
    }),
  ],
  build: {
    outDir: 'dist',
    target: 'esnext',
    minify: 'esbuild',
    lib: {
      entry: resolve(__dirname, 'polyfill.js'),
      formats: ['es'],
      name: 'Built-in AI Polyfill',
      fileName: 'built-in-ai-polyfill',
    },
  },
});
