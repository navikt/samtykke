import { FileContent } from '@navikt/ds-icons'
import { Alert, Heading, Panel } from '@navikt/ds-react'
import axios, { AxiosError } from 'axios'
import React, { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../common/PageHeader'
import { IConsent } from '../types'
import { getISODateString } from '../utils/date'
import CandidatesList from './candidatesList/CandidatesList'
import config from '../config'
import DownloadPdfButton from './components/DownloadPdfButton'

export default function ActiveConsent(): ReactElement {
    
    const { code } = useParams()
    
    const [consent, setConsent] = useState<IConsent>()

    const [apiErrorMessage, setApiErrorMessage] = useState<string>('')

    const getConsent = async () => {
        try {
            const { data }: { data: IConsent } = await axios.get(`${config.apiPath}/consent/${code}`)
            setConsent(data)
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    setApiErrorMessage(`Fant ikke et samtykke med kode: ${code}`)
                } else setApiErrorMessage('Noe gikk galt i hentingen av samtykke...')
            }
        }
    }

    useEffect(() => {
        getConsent()
    }, [])

    return (
        <main className='flex flex-col mt-10 px-4 lg:mt-10 lg:px-12'>
            {consent ? (
                <>
                    <PageHeader 
                        title={consent.title}
                        icon={<FileContent />}
                    >
                        <div className='flex flex-col lg:flex-row place-items-center lg:justify-evenly space-y-4'>
                            <Heading size="medium">Kode: {consent.code}</Heading>
                            <Heading size="medium">
                                Utløper: {getISODateString(consent.expiration)}
                            </Heading> 
                        </div>
                    </PageHeader>
                    <Panel className='mt-8'>
                        <Heading size="large" className='p-4' level="2">Kandidater</Heading>
                        <CandidatesList candidates={consent.candidates}/>
                    </Panel>
                    <div className='flex justify-end my-4 px-2 space-x-4'>
                        {apiErrorMessage && (
                            <Alert variant='error'>
                                {apiErrorMessage}
                            </Alert>
                        )}
                        <DownloadPdfButton 
                            setApiErrorMessage={setApiErrorMessage}
                            consentCode={code!}
                            consentTitle={consent.title}
                        />
                    </div>
                </>
            ) : <Heading size='medium'>{apiErrorMessage}</Heading> 
            } 
        </main>
    )
}