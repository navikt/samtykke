import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { createProxyMiddleware } from 'http-proxy-middleware'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const basePath = '/innbygger'
const buildPath = path.join(path.resolve(__dirname, './dist'))

app.use(basePath, express.static(buildPath, { index: false }))

app.get(`${basePath}/isAlive|${basePath}/isReady`, (req, res) => {
    res.send('OK')
})

const restream = (proxyReq, req) => {
    if (req.body) {
        const bodyData = JSON.stringify(req.body)
        proxyReq.setHeader('Content-Type', 'application/json')
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
        proxyReq.write(bodyData)
    }
}

// If data should be mocked by MSW, do not use proxy
if (process.env.VITE_MOCK_DATA !== 'ja') {
    app.use(`${process.env.VITE_API_PATH}`, createProxyMiddleware({ 
        target: `${process.env.VITE_API_URL}`, 
        changeOrigin: true, 
        pathRewrite: { [`^${process.env.VITE_API_PATH}`]: '' },
        onProxyReq: restream
    }))
}

app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) => res.sendFile(`${buildPath}/index.html`))

app.listen(3000, () => { console.log('Listening on port 3000') })