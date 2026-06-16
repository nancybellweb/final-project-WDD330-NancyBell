import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        login: resolve(__dirname, 'src/login/index.html'),
        dashboard: resolve(__dirname, 'src/dashboard/index.html'), 
        goals: resolve(__dirname, 'src/goals/index.html'),
        notes: resolve(__dirname, 'src/notes/index.html'),
        profile: resolve(__dirname, 'src/profile/index.html'),
      },
    },
  },
});