import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://auth-system-p8ow.onrender.com", // Adjust backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
