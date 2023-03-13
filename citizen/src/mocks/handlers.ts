import { EnumCandidateStatus, ICitizen, IConsent, IEmployee } from '../types'
import { rest } from 'msw'
import config from '../config'
import { v4 as uuidv4 } from 'uuid'

const employeeMock: IEmployee = {
    id: 'iosdhgoij924',
    firstname: 'Dan',
    lastname: 'Børge',
    email: 'dan.børge@nav.no',
    consents: [],
    messages: [],
}

const consentsMock: IConsent[] = [
    {
        title: 'Brukertest av NAV.no',
        responsibleGroup: 'Team Personbruker',
        theme: 'dårlig råd',
        purpose: 'sdoigj',
        totalInvolved: 4,
        code: 'X76-2B3',
        expiration: new Date(),
        endResult: 'rapport',
        candidates: [
            {
                id: 1,
                name: 'Lars Pølse',
                email: 'lars.pølse@gmail.com',
                status: EnumCandidateStatus.Accepted,
                consented: new Date(),
                trackingNumber: uuidv4(),
                audioRecording: true,
            },
            {
                id: 1,
                name: 'Ole Bolle Brus',
                email: 'ole.bolle.brus@outlook.no',
                status: EnumCandidateStatus.Accepted,
                consented: new Date(),
                trackingNumber: uuidv4(),
                audioRecording: false,
            },
            {
                id: 1,
                name: 'Pelle Politi',
                email: 'pelle.politi@politiet.no',
                status: EnumCandidateStatus.Withdrawn,
                consented: undefined,
                trackingNumber: uuidv4(),
                audioRecording: true,
            },
            {
                id: 1,
                name: 'Nasse Nøff',
                email: 'nasse.noeff@svenske.se',
                status: EnumCandidateStatus.Withdrawn,
                consented: undefined,
                trackingNumber: uuidv4(),
                audioRecording: false,
            },
        ],
        employee: employeeMock,
    },
    {
        title: 'Test av ny AAP kalkulator',
        responsibleGroup: 'AAP',
        theme: 'dårlig råd',
        purpose: 'Veldig ddpobjp',
        totalInvolved: 5,
        code: 'L90-12N',
        expiration: '03-04-2023',
        endResult: 'rapport',
        candidates: [],
        employee: employeeMock,
    },
    {
        title: 'Dagpengeløsning 2.0',
        responsibleGroup: 'Team Dagpenger',
        theme: 'dårlig råd',
        purpose: 'oihsfg',
        totalInvolved: 3,
        code: '12J-0ZA',
        expiration: '03-04-2023',
        endResult: 'rapport',
        candidates: [],
        employee: employeeMock,
    },
]

export const handlers = [
    rest.get(`${config.apiPath}/consent/active/`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([consentsMock[0], consentsMock[1]]),
        )
    }),

    rest.get(`${config.apiPath}/consent/:code`, (req, res, ctx) => {
        const { code } = req.params

        const consent = consentsMock.filter((cons) => {
            return cons.code === code
        })

        return consent.length === 1
            ? res(ctx.status(200), ctx.json(consent[0]))
            : res(ctx.status(404))
    }),

    rest.get(
        `${config.apiPath}/consent/:code/canditature/`,
        (req, res, ctx) => {
            const { code } = req.params

            const consent = consentsMock.filter((cons) => {
                return cons.code === code
            })

            if (consent.length === 1 && consent[0].candidates.length > 0) {
                return res(
                    ctx.status(200),
                    ctx.json({
                        ...consent[0],
                        candidates: [consent[0].candidates[0]],
                    }),
                )
            } else if (
                consent.length === 1 &&
                consent[0].candidates.length === 0
            ) {
                return res(
                    ctx.status(200),
                    ctx.json({ ...consent[0], candidates: undefined }),
                )
            } else {
                return res(ctx.status(404))
            }
        },
    ),

    rest.post(
        `${config.apiPath}/consent/:code/canditature/`,
        async (req, res, ctx) => {
            return res(ctx.status(200))
        },
    ),

    rest.put(
        `${config.apiPath}/consent/:code/canditature/`,
        async (req, res, ctx) => {
            return res(ctx.status(200))
        },
    ),
]
