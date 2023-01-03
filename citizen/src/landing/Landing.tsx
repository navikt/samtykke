import { FillForms } from '@navikt/ds-icons'
import { Button, TextField } from '@navikt/ds-react'
import axios, { AxiosError } from 'axios'
import React, { ReactElement, useState } from 'react'
import PageHeader from '../common/PageHeader'
import { IConsent } from '../types'

export default function Landing(): ReactElement {

    const [code, setCode] = useState<string>('')

    const [codeErrorMessage, setCodeErrorMessage] = useState<string>('')

    const onLoadConsent = async () => {
        const codeRegex = /^[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}$/

        if (!codeRegex.test(code)) {
            setCodeErrorMessage('Samtykke kode er på feil format')
        } else {
            try {
                const { status }: { status: number} = await axios.get(`/citizen/api/consent/${code}`)
                if (status === 200 || status === 304) return // TODO: replace with navigate to consent
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 404) setCodeErrorMessage(`Fant ikke samtykke med kode: ${code}`)
                    else setCodeErrorMessage('Noe gikk galt i hentingen av samtykke...')
                } 
            }
        }

    }

    return (
        <div className='mx-32 my-12'>
            <PageHeader 
                title='Gi nytt samtykke'
                icon={<FillForms className='align-middle text-[2rem] absolute -top-[1rem]' />}
            />
            <div className='flex flex-col items-center mt-24'>
                <div className='w-fit'>
                    <TextField 
                        label='Samtykke-kode'
                        description='Skriv inn koden for det spesifike samtykket'
                        value={code || ''}
                        onChange={e => setCode(e.target.value as string)}
                        error={codeErrorMessage}
                    />
                    <div className='flex justify-end w-full mt-2 pr-2'>
                        <Button onClick={onLoadConsent}>OK</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}