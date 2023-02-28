import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/innbygger/',
    server: {
        proxy: {
            '/innbygger/api/': {
                target: 'http://0.0.0.0:8080',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/innbygger\/api/, ''),
            },
        },
    },
})
