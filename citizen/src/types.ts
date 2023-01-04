export interface IEmployee {
    firstname: string
    lastname: string
    email: string
    consents: IConsent[]
    messages: IMessage[]
}

export interface ICitizen {
    id: string
    candidatures: ICandidate[]
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
}

export interface ICandidate {
    id: string
    name: string
    email: string
    status: EnumCandidateStatus
    consented: Date | undefined
    audioRecording: boolean
    storeInfo: boolean
}

export interface IMessage {
    id: number
    timestamp: Date
    title: string
    description: string
    read: boolean
    ref?: string
}
