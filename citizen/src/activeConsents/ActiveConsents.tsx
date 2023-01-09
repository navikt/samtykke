import { Findout } from '@navikt/ds-icons'
import { Heading, LinkPanel, Panel } from '@navikt/ds-react'
import axios, { AxiosError } from 'axios'
import React, { ReactElement, useEffect, useState } from 'react'
import PageHeader from '../common/PageHeader'
import { IConsent } from '../types'

export default function ActiveConsents(): ReactElement {

    const [activeConsents, setActiveConsents] = useState<IConsent[]>([])

    const [activeConsentsErrorMessage, setActiveConsentsErrorMessage] = useState<string>('')

    const getActiveConsents = async () => {
        try {
            const { data }: { data: IConsent[] } = await axios.get('/innbygger/api/consent/active/')
            setActiveConsents(data)
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    setActiveConsentsErrorMessage('Fant ingen aktive samtykker')
                } else setActiveConsentsErrorMessage('Noe gikk galt i hentingen av aktive samtykker...')
            }
        }
    }

    useEffect(() => {
        getActiveConsents()
    }, [])

    return (
        <div className='mx-32 my-12'>
            <PageHeader 
                title="Mine aktive samtykker"
                icon={<Findout className='align-middle text-[2rem] absolute -top-[1rem]'/>}
            />
            <div className='mt-8'>
                <Panel className='space-y-4'>
                    {activeConsents.length > 0 ? (
                        <>
                            <Heading size="large">Aktive samtykker</Heading>
                            {activeConsents instanceof Array && activeConsents.map((consent: IConsent, index: number) => {
                                return (
                                    <LinkPanel 
                                        key={index}
                                        href={`/innbygger/samtykke/${consent.code}`}
                                    >
                                        <LinkPanel.Title>{consent.title}</LinkPanel.Title>
                                    </LinkPanel>
                                )
                            })}
                        </>
                    ): <Heading size="medium">{activeConsentsErrorMessage}</Heading>}
                </Panel>
            </div>
        </div>
    )
}