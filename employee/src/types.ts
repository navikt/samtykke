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

export enum EnumCandidateStatus {
    Accepted = 'SAMTYKKE_GITT',
    Withdrawn = 'SAMTYKKE_TRUKKET',
    Deleted = 'DATA_SLETTET',
}

export interface ICandidate {
    id: string
    name: string
    status: EnumCandidateStatus
    consented: Date | undefined
    audioRecording: boolean
}
