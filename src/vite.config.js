import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://job-board-app-production.up.railway.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

// dhfdibcyehh