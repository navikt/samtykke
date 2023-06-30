import { Heading } from '@navikt/ds-react'
import axios, { AxiosError } from 'axios'
import React, { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ActiveConsent from '../activeConsent/ActiveConsent'
import config from '../config'
import GiveConsent from '../giveConsent/GiveConsent'
import { ICandidate, IConsent, IConsentBase } from '../types'

export default function Consent(): ReactElement {

    const [consent, setConsent] = useState<IConsent>()

    const { code } = useParams()
    
    const [consentErrorMessage, setConsentErrorMessage] = useState<string>('')

    const getConsent = async () => {
        try {
            const { data }: { data: IConsent } = await axios.get(`${config.apiPath}/consent/${code}/canditature/`)
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
        <main>
            {consent ? (
                consent.candidates && consent.candidates.length === 1 ? 
                    <ActiveConsent consent={consent}/> 
                    : <GiveConsent consent={consent}/>
            ) : <Heading size='medium' as="span">{consentErrorMessage}</Heading>}
        </main>
    )
}