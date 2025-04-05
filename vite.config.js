import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfigcd({
  base: './', // ✅ Add this line
  plugins: [reactC()],
})
