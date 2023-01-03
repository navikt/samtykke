import { IConsent } from '../types'
import { rest } from 'msw'

const consentsMock: IConsent[] = [
    {
        title: 'Brukertest av NAV.no',
        responsibleGroup: 'Team Personbruker',
        purpose: 'sdoigj',
        totalInvolved: 4,
        code: 'X76-2B3',
        expiration: new Date(),
        candidates: [],
    },
    {
        title: 'Test av ny AAP kalkulator',
        responsibleGroup: 'AAP',
        purpose: 'Veldig ddpobjp',
        totalInvolved: 5,
        code: 'L90-12N',
        expiration: new Date(),
        candidates: [],
    },
    {
        title: 'Dagpengeløsning 2.0',
        responsibleGroup: 'Team Dagpenger',
        purpose: 'oihsfg',
        totalInvolved: 3,
        code: '12J-0ZA',
        expiration: new Date(),
        candidates: [],
    },
]

export const handlers = [
    rest.get('/citizen/api/consent/:code', (req, res, ctx) => {
        const { code } = req.params

        const consent = consentsMock.filter((cons) => {
            return cons.code === code
        })

        return consent.length === 1
            ? res(ctx.status(200), ctx.json(consent[0]))
            : res(ctx.status(404))
    }),
]
