import { ErrorColored, FileContent, SuccessColored } from '@navikt/ds-icons'
import { Accordion, Alert, BodyShort, Heading, Panel } from '@navikt/ds-react'
import axios, { AxiosError } from 'axios'
import { format, parseISO } from 'date-fns'
import React, { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../common/PageHeader'
import { ICandidate, IConsent } from '../types'
import { getISODateString } from '../utils/date'
import CandidatesList from './components/CandidatesList'
import config from '../config'

export default function ActiveConsent(): ReactElement {
    
    const [consent, setConsent] = useState<IConsent>()

    const { code } = useParams()

    const [consentErrorMessage, setConsentErrorMessage] = useState<string>('')

    const getConsent = async () => {
        try {
            const { data }: { data: IConsent } = await axios.get(`${config.apiPath}/consent/${code}`)
            setConsent(data)
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    setConsentErrorMessage(`Fant ikke et samtykke med kode: ${code}`)
                } else setConsentErrorMessage('Noe gikk galt i hentingen av samtykke...')
            }
        }
    }

    useEffect(() => {
        getConsent()
    }, [])

    return (
        <div className='mx-32 my-12'>
            {consent ? (
                <>
                    <PageHeader 
                        title={consent.title}
                        icon={<FileContent className='align-middle text-[2rem] absolute -top-[1rem]'/>}
                    >
                        <div className='flex flex-row justify-evenly py-4'>
                            <Heading size="medium">Kode: {consent.code}</Heading>
                            <Heading size="medium">
                                Utløper: {getISODateString(consent.expiration)}
                            </Heading> 
                        </div>
                    </PageHeader>
                    <Panel className='mt-8'>
                        <Heading size="large" className='p-4'>Kandidater</Heading>
                        <CandidatesList candidates={consent.candidates}/>
                    </Panel>
                </>
            ) : <Heading size='medium'>{consentErrorMessage}</Heading> 
            } 
        </div>
    )
}