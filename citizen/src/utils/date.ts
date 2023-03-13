import { format, parseISO } from 'date-fns'

export const getISODateString = (date: Date | string): string => {
    if (date instanceof Date) {
        return format(parseISO(date.toString()), 'dd.MM.yyyy')
    } else {
        const dateArray = date.split('-')
        return `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}` 
    }
}

export const getDSISODateString = (date: Date): string => {
    return format(date, 'dd.MM.yyyy')
}