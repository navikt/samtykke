import { Findout } from '@navikt/ds-icons'
import { Heading, LinkPanel, Panel } from '@navikt/ds-react'
import axios, { AxiosError } from 'axios'
import React, { ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../common/PageHeader'
import { IConsent } from '../types'
import config from '../config'

export default function ActiveConsents(): ReactElement {

    const navigate = useNavigate()

    const [activeConsents, setActiveConsents] = useState<IConsent[]>([])

    const [activeConsentsErrorMessage, setActiveConsentsErrorMessage] = useState<string>('')

    const getActiveConsents = async () => {
        try {
            const { data }: { data: IConsent[] } = await axios.get(`${config.apiPath}/consent/active/`)
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
        <div className='flex-1 mt-10 px-4 lg:mt-10 lg:px-12'>
            <PageHeader 
                title="Mine aktive samtykker"
                icon={<Findout />}
            />
            <div className='mt-8'>
                <Panel className='space-y-4'>
                    {activeConsents.length > 0 ? (
                        <>
                            <Heading size="large" level="2">Aktive samtykker</Heading>
                            {activeConsents instanceof Array && activeConsents.map((consent: IConsent, index: number) => {
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
                    ): <Heading size="medium" level="2">{activeConsentsErrorMessage}</Heading>}
                </Panel>
            </div>
        </div>
    )
}