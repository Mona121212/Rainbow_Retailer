import { defineConfig } from 'vite'
// 编译 JSX/TSX -》 JS
//处理 react components
// 启用 fast refresh
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
