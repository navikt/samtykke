export interface IEmployee {
    id: string
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

export interface IConsentBase {
    title: string
    responsibleGroup: string
    theme: string
    purpose: string
    totalInvolved: number
    expiration: Date | string | undefined
    endResult: string
}

export interface IConsent extends IConsentBase {
    code: string
    employee: IEmployee | null
    candidates: ICandidate[]
}

export enum EnumCandidateStatus {
    Accepted = 'ACCEPTED',
    Withdrawn = 'WITHDRAWN',
}

export interface ICandidate {
    id?: number
    name: string
    email: string
    status: EnumCandidateStatus
    consented: Date | undefined
    trackingNumber: string
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
