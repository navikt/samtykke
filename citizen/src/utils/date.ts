import { format, parseISO } from 'date-fns'

export const getISODateString = (date: Date | string): string => {
    if (date instanceof Date) {
        return format(parseISO(date.toString()), 'dd.MM.yyyy')
    } else {
        const dateArray = date.split('-')
        return `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}` 
    }
}
