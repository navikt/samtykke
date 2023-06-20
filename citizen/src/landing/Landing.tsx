import { FillForms } from '@navikt/ds-icons'
import { Button, TextField } from '@navikt/ds-react'
import axios, { AxiosError } from 'axios'
import React, { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../common/PageHeader'
import config from '../config'

export default function Landing(): ReactElement {

    const [code, setCode] = useState<string>('')

    const [codeErrorMessage, setCodeErrorMessage] = useState<string>('')

    const navigate = useNavigate()

    const onLoadConsent = async () => {
        const codeRegex = /^[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}$/
        if (code === '') {
            setCodeErrorMessage('Du må legge til en samtykke-kode')
        } else if (codeRegex.test(code)) {
            try {
                const { status }: { status: number} = await axios.get(`${config.apiPath}/consent/${code}`)
                if (status === 200) {
                    navigate(`/samtykke/${code}`)
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 404) setCodeErrorMessage(`Fant ikke samtykke med kode: ${code}`)
                    else setCodeErrorMessage('Noe gikk galt i hentingen av samtykke...')
                } 
            }
        } else {
            setCodeErrorMessage('Samtykke-kode er på feil format')
        }

    }

    return (
        <div className='flex-1 mt-10 px-4 lg:mt-10 lg:px-12'>
            <PageHeader 
                title='Gi nytt samtykke'
                icon={<FillForms />}
            />
            <div className='flex flex-col items-center mt-10'>
                <div className='w-5/6 lg:w-2/6'>
                    <TextField 
                        label='Samtykke-kode'
                        description='Eksempel: AB1-C3D'
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