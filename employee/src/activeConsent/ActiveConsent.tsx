import { FileContent } from '@navikt/ds-icons'
import { Alert, Heading, Panel, Skeleton } from '@navikt/ds-react'
import axios, { AxiosError } from 'axios'
import React, { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../common/PageHeader'
import { IConsent } from '../types'
import { getISODateString } from '../utils/date'
import CandidatesList from './candidatesList/CandidatesList'
import config from '../config'
import DownloadPdfButton from './components/DownloadPdfButton'
import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'

export default function ActiveConsent(): ReactElement {
    
    const { code } = useParams()
    
    const { data: consent, isLoading } = useSWR(`${config.apiPath}/consent/${code}`, fetcher<IConsent>)
    
    const [apiErrorMessage, setApiErrorMessage] = useState<string>('')

    return (
        <main className='flex flex-col mt-10 px-4 lg:mt-10 lg:px-12'>
            {isLoading ? <Skeleton variant='rectangle' width='100%' height={500} /> : 
                <>
                    {consent ? (
                        <>
                            <PageHeader 
                                title={consent.title}
                                icon={<FileContent />}
                            >
                                <div className='flex flex-col lg:flex-row place-items-center lg:justify-evenly space-y-4'>
                                    <Heading size="medium" as="span">Kode: {consent.code}</Heading>
                                    <Heading size="medium" as="span">
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
                    ) : <Heading size='medium' as="span">Fant ikke et samtykke med kode: {code}</Heading>} 
                </>
            }
        </main>
    )
}