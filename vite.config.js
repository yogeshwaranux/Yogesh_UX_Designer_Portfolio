import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=3600'
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'about.html'),
        work: path.resolve(__dirname, 'work.html'),
        skills: path.resolve(__dirname, 'skills.html'),
        contact: path.resolve(__dirname, 'contact.html')
      }
    }
  }
});
