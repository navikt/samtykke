import { format, parseISO } from 'date-fns'

export const getYesterdayDate = (): Date => {
    const yesterday: Date = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return yesterday
}

export const getExpirationLimitDate = (): Date => {
    const expirationLimitDate: Date = new Date()
    expirationLimitDate.setDate(expirationLimitDate.getDate() + 90)
    return expirationLimitDate
}

export const getISODateString = (date: Date): string => {
    return format(date, 'dd.MM.yyyy')
}
