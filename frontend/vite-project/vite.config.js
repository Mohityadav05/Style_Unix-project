import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // ✅ This line fixes relative paths for images/static files
  plugins: [react()],
})
