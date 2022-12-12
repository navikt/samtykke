import { rest } from 'msw'
import { IEmployee } from '../types'

const employeeMock: IEmployee = {
    firstname: 'Dan',
    lastname: 'Børge',
    email: 'dan.børge@nav.no',
    consents: [
        { title: 'Brukertest av NAV.no', code: 'X76-2B3', expiration: new Date(), candidates: [] },
        { title: 'Test av ny AAP kalkulator', code: 'L90-12N', expiration: new Date(), candidates: [] },
        { title: 'Dagpengeløsning 2.0', code: '12J-0ZA', expiration: new Date(), candidates: [] },
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
]