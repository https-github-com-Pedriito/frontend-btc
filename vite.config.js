import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'brotliCompress', // Vous pouvez utiliser 'gzip' ou 'brotliCompress'
    }),
  ],
})