import axios from 'axios'

export const fetcher = <T>(url: string) => axios.get(url).then((res) => res.data as T)