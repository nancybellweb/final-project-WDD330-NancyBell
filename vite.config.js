// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/',

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        // Set your main landing page as the primary entry point
        main: resolve(__dirname, 'src/index.html'),
        
        // If you have a separate login page or user profile page created, 
        // you can include them below like this:
        // login: resolve(__dirname, 'src/login/index.html')
      }
    }
  }
});