import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { v4 as uuid } from 'uuid'
import jwt from 'jsonwebtoken'
import jose from 'node-jose'
import { Issuer, Strategy, TokenSet } from 'openid-client'

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

let tokenxClient

async function initTokenX() {
    const tokenxIssuer = await Issuer.discover(process.env.TOKEN_X_WELL_KNOWN_URL)

    tokenxClient = new tokenxIssuer.Client({
        client_id: process.env.TOKEN_X_CLIENT_ID,
        token_endpoint_auth_method: 'private_key_jwt',
    }, {
        keys: [JSON.parse(process.env.TOKEN_X_PRIVATE_JWK)],
    })
}

async function getTokenXToken(token, additionalClaims) {
    let tokenSet
    try {
        tokenSet = await tokenxClient?.grant({
            grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
            client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
            subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
            audience: process.env.AUDIENCE,
            subject_token: token,
        },
        additionalClaims
        )
    } catch (err) {
        console.error('Something went wrong in fetching of token', err)
    }
    return tokenSet
}

async function exchangeToken(token) {
    if (!token) {
        return
    }

    const additionalClaims = {
        clientAssertionPayload: {
            nbf: Math.floor(Date.now() / 1000),
            aud: [tokenxClient?.issuer.metadata.token_endpoint],
        },
    }

    return await getTokenXToken(token, additionalClaims)
}

if (process.env.VITE_MOCK_DATA !== 'ja') {
    initTokenX()
    try {
        const prepareSecuredRequest = async (req, res, next) => {
            const { authorization } = req.headers
            const token = authorization.split(' ')[1]

            const accessToken = await exchangeToken(token)

            req.headers = {
                ...req.headers,
                authorization: `Bearer ${accessToken.access_token}`
            }

            console.log(accessToken.access_token)

            next()
        }

        app.use(`${process.env.VITE_API_PATH}`, 
            prepareSecuredRequest,
            createProxyMiddleware({ 
                target: `${process.env.VITE_API_URL}/citizen`, 
                changeOrigin: true, 
                pathRewrite: { [`^${process.env.VITE_API_PATH}`]: '' },
            }))
    } catch (error) {
        console.log(error)
    }
}

app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) => res.sendFile(`${buildPath}/index.html`))

app.listen(3000, () => { console.log('Listening on port 3000') })