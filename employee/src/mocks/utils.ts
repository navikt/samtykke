import { v4 as uuidv4 } from 'uuid'

export const createConsentCode = (): string => {
    const codeString = uuidv4().substring(0, 6) as string
    return `${codeString.substring(0, 3)}-${codeString.substring(
        3,
    )}`.toUpperCase()
}
