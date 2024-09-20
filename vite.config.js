
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'polyfill.js'),
      name: 'Built-in AI Polyfill',
      fileName: 'built-in-ai-polyfill',
    },
  },
});
