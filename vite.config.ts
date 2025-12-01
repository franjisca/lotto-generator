import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포를 위한 설정
  base: process.env.NODE_ENV === 'production' ? '/lotto-generator/' : '/',
})
