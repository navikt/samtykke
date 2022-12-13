export interface IEmployee {
    firstname: string
    lastname: string
    email: string
    consents: IConsent[]
}

export interface IConsent {
    title: string
    description: string
    code: string
    expiration: Date | undefined
    candidates: ICandidate[]
}

export interface ICandidate {
    id: string
    name: string
    consented: Date
    audioRecording: boolean
}
