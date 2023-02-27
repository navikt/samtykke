export interface IEmployee {
    firstname: string
    lastname: string
    email: string
    consents: IConsent[]
    messages: IMessage[]
}

export interface IConsentBase {
    title: string
    responsibleGroup: string
    purpose: string
    totalInvolved: number
    expiration: Date | string | undefined
}

export interface IConsent extends IConsentBase {
    code: string
    candidates: ICandidate[]
}

export enum EnumCandidateStatus {
    Accepted = 'ACCEPTED',
    Withdrawn = 'WITHDRAWN',
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
