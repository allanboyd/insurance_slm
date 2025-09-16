import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    // Suppress TypeScript errors
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  build: {
    // Suppress warnings during build
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress all warnings
        return;
      }
    }
  }
})