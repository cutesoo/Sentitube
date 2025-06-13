// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const ML_API_BASE_URL = 'https://62ea-157-10-185-252.ngrok-free.app'; 

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: ML_API_BASE_URL,
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/api/, ''), 
        secure: false, // Penting untuk Ngrok (jika ada masalah sertifikat)
        // headers: { 'ngrok-skip-browser-warning': 'true', }, // Dihapus, karena user bilang sebelumnya berhasil tanpa ini
        // configure logging juga dihilangkan untuk kesederhanaan
      },
    },
  },
});