import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      react: path.resolve(fileURLToPath(new URL('./node_modules/react', import.meta.url))),
      'react-dom': path.resolve(
        fileURLToPath(new URL('./node_modules/react-dom', import.meta.url)),
      ),
      'react/jsx-runtime': path.resolve(
        fileURLToPath(new URL('./node_modules/react/jsx-runtime.js', import.meta.url)),
      ),
      'react/jsx-dev-runtime': path.resolve(
        fileURLToPath(new URL('./node_modules/react/jsx-dev-runtime.js', import.meta.url)),
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  plugins: [react()],
})
