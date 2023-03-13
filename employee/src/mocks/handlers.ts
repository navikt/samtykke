import { rest } from 'msw'
import config from '../config'
import { EnumCandidateStatus, IEmployee } from '../types'
import { createConsentCode } from './utils'
import { v4 as uuidv4 } from 'uuid'

const employeeMock: IEmployee = {
    firstname: 'Dan',
    lastname: 'Børge',
    email: 'dan.børge@nav.no',
    consents: [
        {
            title: 'Brukertest av NAV.no',
            responsibleGroup: 'Team Personbruker',
            purpose: 'sdoigj',
            totalInvolved: 4,
            code: 'X76-2B3',
            expiration: new Date(),
            candidates: [
                {
                    id: '21097oifdsh',
                    name: 'Lars Pølse',
                    email: 'lars.pølse@gmail.com',
                    status: EnumCandidateStatus.Accepted,
                    consented: new Date(),
                    trackingNumber: uuidv4().split('-')[0],
                    audioRecording: true,
                    storeInfo: false,
                },
                {
                    id: '23894kshf',
                    name: 'Ole Bolle Brus',
                    email: 'ole.bolle.brus@outlook.no',
                    status: EnumCandidateStatus.Accepted,
                    consented: new Date(),
                    trackingNumber: uuidv4().split('-')[0],
                    audioRecording: false,
                    storeInfo: true,
                },
                {
                    id: 'oigh3022584',
                    name: 'Pelle Politi',
                    email: 'pelle.politi@politiet.no',
                    status: EnumCandidateStatus.Withdrawn,
                    consented: undefined,
                    trackingNumber: uuidv4().split('-')[0],
                    audioRecording: true,
                    storeInfo: false,
                },
                {
                    id: 'bsoi329854',
                    name: 'Nasse Nøff',
                    email: 'nasse.noeff@svenske.se',
                    status: EnumCandidateStatus.Withdrawn,
                    consented: undefined,
                    trackingNumber: uuidv4().split('-')[0],
                    audioRecording: false,
                    storeInfo: false,
                },
            ],
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
    ],
    messages: [
        {
            id: 1,
            timestamp: new Date(),
            title: 'Samtykke gitt til: Brukertest av NAV.no',
            description: `En innbygger har gitt samtykke til: 
                Brukertest av NAV.no. Klikk deg inn på samtykket
                for å se hvem som har gitt samtykket`,
            read: false,
            ref: '/X76-2B3',
        },
        {
            id: 2,
            timestamp: new Date(),
            title: 'Samtykke trukket til: Brukertest av NAV.no',
            description: `En innbygger har gitt samtykke til: 
                Brukertest av NAV.no. Klikk deg inn på samtykket
                for å se hvem som har gitt samtykket`,
            read: false,
            ref: '/X76-2B3',
        },
        {
            id: 3,
            timestamp: new Date(),
            title: 'Samtykke: Dagpengeløsning 2.0, slettet',
            description: `Ditt samtykke Dagpengeløsning 2.0
                har blitt slettet siden utløpsdatoen har utgått.
                Husk på å slette all ekstern data om de involverte
                i testen!`,
            read: true,
        },
    ],
}

export const handlers = [
    rest.get(`${config.apiPath}/currentEmployee`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(employeeMock))
    }),

    rest.get(`${config.apiPath}/consent/active`, (req, res, ctx) => {
        // Returns the active consents of the current user
        return res(ctx.status(200), ctx.json(employeeMock.consents))
    }),

    rest.post(`${config.apiPath}/consent`, async (req, res, ctx) => {
        let consent = JSON.parse(
            new TextDecoder().decode(await req.arrayBuffer()),
        )

        consent = { ...consent, code: createConsentCode() }

        return res(ctx.status(200))
    }),

    rest.get(`${config.apiPath}/consent/:code`, (req, res, ctx) => {
        const { code } = req.params

        const consent = employeeMock.consents.filter((cons) => {
            return cons.code === code
        })

        return consent.length === 1
            ? res(ctx.status(200), ctx.json(consent[0]))
            : res(ctx.status(404))
    }),

    rest.get(`${config.apiPath}/messages`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(employeeMock.messages))
    }),

    rest.patch(`${config.apiPath}/messages/:id`, async (req, res, ctx) => {
        return res(ctx.status(200))
    }),
]
