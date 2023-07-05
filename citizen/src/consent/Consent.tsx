import { Heading, Skeleton } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import ActiveConsent from '../activeConsent/ActiveConsent'
import config from '../config'
import GiveConsent from '../giveConsent/GiveConsent'
import { IConsent } from '../types'
import useSWR, { SWRResponse } from 'swr'
import { fetcher } from '../utils/fetcher'

export default function Consent(): ReactElement {

    const { code } = useParams()

    const {
        data: consent,
        isLoading: consentIsLoading,
        error: consentError
    }: SWRResponse<IConsent, boolean, boolean> = useSWR(`${config.apiPath}/consent/${code}/canditature`, fetcher)

    return (
        <main className='flex-1 mt-10 px-4 lg:mt-10 lg:px-12'>
            {consentIsLoading ? <Skeleton variant='rectangle' width='100%' height={1000} /> :
                <>
                    {consent && !consentError ? (
                        consent.candidates && consent.candidates.length === 1 ? 
                            <ActiveConsent consent={consent}/> 
                            : <GiveConsent consent={consent}/>
                    ) : <Heading size='medium' as="span">{`Fant ikke et samtykke med kode: ${code}`}</Heading>}
                </>
            }
        </main>
    )
}