import { format, parseISO } from 'date-fns'

export const getISODateString = (date: Date | string): string => {
    return format(parseISO(date instanceof Date ? date.toString() : date), 'dd.MM.yyyy')
}
