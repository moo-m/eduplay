// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/eduplay/' // هذا يجب أن يكون اسم المستودع إذا ترفع على GitHub Pages
})