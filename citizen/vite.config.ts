import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/innbygger/',
    server: {
        proxy: {
            '/innbygger/api/': {
                target: 'https://samtykke-api.dev.intern.nav.no',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/innbygger\/api/, ''),
            },
        },
    },
})
