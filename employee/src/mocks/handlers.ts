import { rest } from 'msw'
import { IEmployee } from '../types'
import { createConsentCode } from './utils'

const employeeMock: IEmployee = {
    firstname: 'Dan',
    lastname: 'Børge',
    email: 'dan.børge@nav.no',
    consents: [
        {
            title: 'Brukertest av NAV.no',
            description: 'sdoigj',
            code: 'X76-2B3',
            expiration: new Date(),
            candidates: [],
        },
        {
            title: 'Test av ny AAP kalkulator',
            description: 'Veldig ddpobjp',
            code: 'L90-12N',
            expiration: new Date(),
            candidates: [],
        },
        {
            title: 'Dagpengeløsning 2.0',
            description: 'oihsfg',
            code: '12J-0ZA',
            expiration: new Date(),
            candidates: [],
        },
    ],
}

export const handlers = [
    rest.get('/ansatt/api/currentEmployee', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(employeeMock))
    }),

    rest.get('/ansatt/api/consent/active', (req, res, ctx) => {
        // Returns the active consents of the current user
        return res(ctx.status(200), ctx.json(employeeMock.consents))
    }),

    rest.post('/ansatt/api/consent', async (req, res, ctx) => {
        let consent = JSON.parse(
            new TextDecoder().decode(await req.arrayBuffer()),
        )

        consent = { ...consent, code: createConsentCode() }

        return res(ctx.status(200))
    }),
]
