import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        ar: resolve(import.meta.dirname, 'guided-learning/ar/index.html'),
        en: resolve(import.meta.dirname, 'guided-learning/en/index.html')
      }
    }
  }
});
