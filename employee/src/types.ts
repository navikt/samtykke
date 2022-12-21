export interface IEmployee {
    firstname: string
    lastname: string
    email: string
    consents: IConsent[]
    messages: IMessage[]
}

export interface IConsent {
    title: string
    responsibleGroup: string
    purpose: string
    totalInvolved: number
    expiration: Date | undefined
    code: string
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

export interface IMessage {
    id: number
    timestamp: Date
    title: string
    description: string
    read: boolean
    ref?: string
}
