import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Base path para Netlify (raíz relativa)
  base: process.env.CONTEXT === 'production' ? '/' : '/portafolio-Wilkerylr/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4321',
    },
  },
})
