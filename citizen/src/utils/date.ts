import { format, parseISO } from 'date-fns'

export const getISODateString = (date: Date): string => {
    return format(parseISO(date.toString()), 'dd.MM.yyyy')
}
