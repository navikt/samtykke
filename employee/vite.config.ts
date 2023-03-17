import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/ansatt/',
    server: {
        proxy: {
            '/ansatt/api': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/ansatt\/api/, ''),
            },
        },
    },
})
