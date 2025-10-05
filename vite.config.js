import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        shark: path.resolve(__dirname, 'shark/index.html'),
        satellite: path.resolve(__dirname, 'Satellite/index.html'),
        ocean: path.resolve(__dirname, 'ocean/index.html'),
        solar: path.resolve(__dirname, 'Solar system/index.html')
      }
    ,
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') && id.includes('examples')) return 'three-examples';
            if (id.includes('node_modules/three')) return 'three-core';
            if (id.includes('node_modules/framer-motion') || id.includes('node_modules/lucide-react')) return 'ui-vendor';
            return 'vendor';
          }
        }
      }
    }
    ,
    chunkSizeWarningLimit: 700
  },
  preview: {
    // Allow any Render subdomain for this service (deploys may change hostname)
    allowedHosts: [/\.onrender\.com$/]
  }
})
