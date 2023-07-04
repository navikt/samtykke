import { Findout } from '@navikt/ds-icons'
import { Heading, LinkPanel, Panel, Skeleton } from '@navikt/ds-react'
import axios, { AxiosError } from 'axios'
import React, { ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../common/PageHeader'
import { IConsent } from '../types'
import config from '../config'
import useSWR, { SWRResponse } from 'swr'
import { fetcher } from '../utils/fetcher'

export default function ActiveConsents(): ReactElement {

    const navigate = useNavigate()

    const {
        data: consents,
        isLoading: consentsIsLoading,
        error: consentsError
    }: SWRResponse<Array<IConsent>, boolean, boolean> = useSWR(`${config.apiPath}/consent/active`, fetcher)

    return (
        <main className='flex-1 mt-10 px-4 lg:mt-10 lg:px-12'>
            <PageHeader 
                title="Mine aktive samtykker"
                icon={<Findout />}
            />
            <div className='mt-8'>
                {consentsIsLoading ? <Skeleton variant='rectangle' width='100%' height={250} /> : 
                    <Panel className='space-y-4'>
                        {consents &&  consents.length > 0 && !consentsError ? (
                            <>
                                <Heading size="large" level="2">Aktive samtykker</Heading>
                                {consents instanceof Array && consents.map((consent: IConsent, index: number) => {
                                    return (
                                        <LinkPanel 
                                            key={index}
                                            className='cursor-pointer'
                                            onClick={() => navigate(`/samtykke/${consent.code}`)}
                                        >
                                            <LinkPanel.Title>{consent.title}</LinkPanel.Title>
                                        </LinkPanel>
                                    )
                                })}
                            </>
                        ): <Heading size="medium" as="span">Fant ingen aktive samtykker</Heading>}
                    </Panel>
                }
            </div>
        </main>
    )
}