import { EnumCandidateStatus, ICitizen, IConsent, IEmployee } from '../types'
import { rest } from 'msw'

const employeeMock: IEmployee = {
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
                audioRecording: true,
                storeInfo: false,
            },
            {
                id: '23894kshf',
                name: 'Ole Bolle Brus',
                email: 'ole.bolle.brus@outlook.no',
                status: EnumCandidateStatus.Accepted,
                consented: new Date(),
                audioRecording: false,
                storeInfo: true,
            },
            {
                id: 'oigh3022584',
                name: 'Pelle Politi',
                email: 'pelle.politi@politiet.no',
                status: EnumCandidateStatus.Withdrawn,
                consented: undefined,
                audioRecording: true,
                storeInfo: false,
            },
            {
                id: 'bsoi329854',
                name: 'Nasse Nøff',
                email: 'nasse.noeff@svenske.se',
                status: EnumCandidateStatus.Withdrawn,
                consented: undefined,
                audioRecording: false,
                storeInfo: false,
            },
        ],
        employee: employeeMock,
    },
    {
        title: 'Test av ny AAP kalkulator',
        responsibleGroup: 'AAP',
        purpose: 'Veldig ddpobjp',
        totalInvolved: 5,
        code: 'L90-12N',
        expiration: new Date(),
        candidates: [],
        employee: employeeMock,
    },
    {
        title: 'Dagpengeløsning 2.0',
        responsibleGroup: 'Team Dagpenger',
        purpose: 'oihsfg',
        totalInvolved: 3,
        code: '12J-0ZA',
        expiration: new Date(),
        candidates: [],
        employee: employeeMock,
    },
]

export const handlers = [
    rest.get('/innbygger/api/consent/active/', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([consentsMock[0], consentsMock[1]]),
        )
    }),

    rest.get('/innbygger/api/consent/:code', (req, res, ctx) => {
        const { code } = req.params

        const consent = consentsMock.filter((cons) => {
            return cons.code === code
        })

        return consent.length === 1
            ? res(ctx.status(200), ctx.json(consent[0]))
            : res(ctx.status(404))
    }),

    rest.get('/innbygger/api/consent/:code/canditature/', (req, res, ctx) => {
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
        } else if (consent.length === 1 && consent[0].candidates.length === 0) {
            return res(
                ctx.status(200),
                ctx.json({ ...consent[0], candidates: undefined }),
            )
        } else {
            return res(ctx.status(404))
        }
    }),

    rest.post(
        '/innbygger/api/consent/:code/canditature/',
        async (req, res, ctx) => {
            return res(ctx.status(200))
        },
    ),

    rest.put(
        '/innbygger/api/consent/:code/canditature/',
        async (req, res, ctx) => {
            return res(ctx.status(200))
        },
    ),
]
