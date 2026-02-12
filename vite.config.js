import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/arc-raiders/',
  plugins: [react()],
  server: {
    proxy: {
      '/api/arc-raiders': {
        target: 'https://metaforge.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/arc-raiders/, '/api/arc-raiders'),
      },
      '/api/arc-raiders/events-schedule': {
        target: 'https://metaforge.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/arc-raiders\/events-schedule/, '/api/arc-raiders/events-schedule'),
      },
    },
  },
})
