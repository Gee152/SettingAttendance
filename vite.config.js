import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Permite acesso de qualquer IP
  },
  build: {
    outDir: 'dist', // Pasta de saída
  },
});
