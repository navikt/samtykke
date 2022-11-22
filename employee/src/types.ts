export interface IEmployee {
    firstname: string
    lastname: string
    email: string
    consents: IConsent[]
}

export interface IConsent {
    title: string
    code: string
    expiration: Date
    candidates: ICandidate[]
}

export interface ICandidate {
    id: string
    name: string
    consented: Date
    audioRecording: boolean
}
