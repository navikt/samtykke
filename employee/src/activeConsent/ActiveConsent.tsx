import { ErrorColored, FileContent, SuccessColored } from '@navikt/ds-icons'
import { Accordion, BodyShort, Heading, Panel } from '@navikt/ds-react'
import axios from 'axios'
import { format, parseISO } from 'date-fns'
import React, { ReactElement, useEffect, useState } from 'react'
import PageHeader from '../common/PageHeader'
import { EnumCandidateStatus, ICandidate, IConsent } from '../types'
import CandidatesList from './components/CandidatesList'

export default function ActiveConsent(): ReactElement {
    
    const [consent, setConsent] = useState<IConsent>()

    const getConsent = async () => {
        try {
            // TODO: switch out code, with ":code" to get it dynamicly
            const { data }: { data: IConsent } = await axios.get('/ansatt/api/consent/123-456')
            setConsent(data)
        } catch (error) {
            // TODO: do error handling
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
                            <Heading size="medium">Utløper: {format(parseISO(consent.expiration!.toString()), 'dd.MM.yyyy')}</Heading> 
                        </div>
                    </PageHeader>
                    <Panel className='mt-8'>
                        <Heading size="large" className='p-4'>Kandidater</Heading>
                        <CandidatesList candidates={consent.candidates}/>
                    </Panel>
                </>
            ) : <p>Fant ikke ett samtykke med den koden...</p>}  
        </div>
    )
}