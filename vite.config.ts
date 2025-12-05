import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    hmr: {
      clientPort: 443,
    },
    allowedHosts: [
      '4j2ypr-5174.csb.app',
      '.csb.app', // Permite todos os subdomínios do CodeSandbox
    ],
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
  },
})

