import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path-browserify'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      path: 'path-browserify',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html', // Avoid using __dirname
      },
    },
  },
})
