import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  build:{
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash]-[hash].js',
        entryFileNames: 'assets/[name]-[hash]-[hash].js',
      }
    }
  },
})
