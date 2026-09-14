import { defineConfig } from 'vite';

/** Servește doar sandbox-ul din `playground/`. Codul reutilizabil e în `playCore/`. */
export default defineConfig({
  root: 'playground',
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: '../dist-playground',
    emptyOutDir: true,
  },
});
