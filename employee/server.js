import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url'
import { createProxyMiddleware } from 'http-proxy-middleware'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()

const basePath = '/ansatt'
const buildPath = path.join(path.resolve(__dirname, './dist'))

app.use(basePath, express.static(buildPath, { index: false }))

app.get(`${basePath}/isAlive|${basePath}/isReady`, (req, res) => {
    res.send('OK')
})

async function getAzureOBOToken(accessToken) {
    const tokenOptions = {
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        client_id: process.env.AZURE_APP_CLIENT_ID,
        client_secret: process.env.AZURE_APP_CLIENT_SECRET,
        assertion: accessToken,
        scope: 'api://dev-gcp.team-researchops.samtykke-api/.default',
        requested_token_use: 'on_behalf_of',
    }

    return await fetch(
        `https://login.microsoftonline.com/${process.env.AZURE_APP_TENANT_ID}/oauth2/v2.0/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                authorization: `Bearer ${accessToken}`,
            },
            body: new URLSearchParams(tokenOptions).toString()
        }
    ).then(async (tokenSet) => {
        if (!tokenSet.ok) {
            const text = await tokenSet.text()
            throw new Error(text)
        }
        return Promise.resolve(tokenSet.json())
    }).catch((error) => {
        console.error('Error in exchange of token ', error)
        return Promise.reject(error)
    })
}

if (process.env.VITE_MOCK_DATA !== 'ja') {
    try {
        const prepareSecuredRequest = async (req, res, next) => {
            const { authorization } = req.headers
            const token = authorization.split(' ')[1]

            const accessToken = await getAzureOBOToken(token).then((accessToken) => accessToken.access_token)

            req.headers = {
                ...req.headers,
                authorization: `Bearer ${accessToken}`,
            }

            next()
        }

        app.use(`${process.env.VITE_API_PATH}`, 
            prepareSecuredRequest,
            createProxyMiddleware({ 
                target: `${process.env.VITE_API_URL}/employee`, 
                changeOrigin: true, 
                pathRewrite: { [`^${process.env.VITE_API_PATH}`]: '' },
            }))
    } catch (error) {
        console.log(error)
    }
}

app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) => res.sendFile(`${buildPath}/index.html`))

app.listen(3000, () => { console.log('Listening on port 3000')})