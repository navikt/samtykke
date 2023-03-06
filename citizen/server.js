import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { v4 as uuid } from 'uuid'
import jwt from 'jsonwebtoken'
import JWK from 'node-jose'
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

const restream = (proxyReq, req) => {
    if (req.body) {
        const bodyData = JSON.stringify(req.body)
        proxyReq.setHeader('Content-Type', 'application/json')
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
        proxyReq.write(bodyData)
    }
}

class TokenExchangeClient {
    tokenXClient = null
    audience = null

    constructor() {
        this.init()
            .then((client) => {
                this.tokenXClient = client
            })
    }

    exchangeIDPortenToken = async (accessToken) => {
        const clientAssertion = await this.createClientAssertion()

        return this.tokenXClient
            .grant({
                grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
                client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                token_endpoint_auth_method: 'private_key_jwt',
                client_assertion: clientAssertion,
                subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                subject_token: accessToken,
                audience: process.env.AUDIENCE,
            })
            .then((tokenSet) => {
                return Promise.resolve(tokenSet.access_token)
            })
            .catch((error) => {
                console.log('Error in exchange of token: ', error)
                return Promise.reject(error)
            })
    }

    createClientAssertion = async () => {
        const now = Math.floor(Date.now() / 1000)

        const payload = {
            sub: process.env.TOKEN_X_CLIENT_ID,
            iss: process.env.TOKEN_X_CLIENT_ID,
            aud: this.audience,
            jti: uuid(),
            nbf: now,
            iat: now,
            exp: now + 60
        }

        const key = await this.asKey(process.env.TOKEN_X_PRIVATE_JWK)

        let options = {
            algorithm: 'RS256',
            header: {
                kid: key.kid,
                typ: 'JWT',
                alg: 'RS256',
            },
        }

        return jwt.sign(payload, key.toPEM(true), options)
    }

    asKey = async (jwk) => {
        if (!jwk) throw Error('JWK missing')

        return JWK.asKey(jwk).then((key) => {
            return Promise.resolve(key)
        })
    }

    init = async () => {
        const tokenX = await Issuer.discover(process.env.TOKEN_X_WELL_KNOWN_URL)
        this.audience = tokenX.token_endpoint

        console.log(`Discovered TokenX @ ${tokenX.issuer}`)

        try {
            const client = new tokenX.Client({
                client_id: process.env.TOKEN_X_CLIENT_ID,
                redirect_uris: ['http://localhost:3000/oauth2/callback'],
                token_endpoint_auth_method: 'none',
            })

            console.log('Created TokenX client')

            return Promise.resolve(client)
        } catch (error) {
            console.log('Error in parsing of jwt or creation of TokenX client: ', error)
            return Promise.reject(error)
        }
    }
}

const isEmpty = (obj) => !obj || !Object.keys(obj).length

const { exchangeIDPortenToken } = new TokenExchangeClient()

const prepareSecuredRequest = async (req, res, next) => {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]

    const accessToken = await exchangeIDPortenToken(token).then((accessToken) => accessToken)

    req.headers = {
        ...req.headers,
        authorization: `Bearer ${accessToken}`
    }

    next()
}

if (process.env.VITE_MOCK_DATA !== 'ja') {
    app.use(`${process.env.VITE_API_PATH}`, 
        prepareSecuredRequest,
        createProxyMiddleware({ 
            target: `${process.env.VITE_API_URL}/citizen`, 
            changeOrigin: true, 
            pathRewrite: { [`^${process.env.VITE_API_PATH}`]: '' },
            onProxyReq: restream
        }))
}

app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) => res.sendFile(`${buildPath}/index.html`))

app.listen(3000, () => { console.log('Listening on port 3000') })