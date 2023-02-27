import { format, parse, parseISO, toDate } from 'date-fns'

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
    return format(parseISO(date.toString()), 'dd.MM.yyyy')
}

export const getDSISODateString = (date: Date): string => {
    return format(date, 'dd.MM.yyyy')
}

export const convertToJavaLocalDate = (date: Date) => {
    return format(date, 'yyyy-MM-dd')
}