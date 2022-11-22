import { rest } from 'msw'
import { IEmployee } from '../types'

const employeeMock: IEmployee = {
    firstname: 'Dan',
    lastname: 'Børge',
    email: 'dan.børge@nav.no',
}

export const handlers = [
    rest.get('/ansatt/api/currentEmployee', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(employeeMock))
    }),
]
