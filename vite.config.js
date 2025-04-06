import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // ✅ This helps with relative paths on Netlify
  plugins: [react()],
})
