import { FileContent } from '@navikt/ds-icons'
import { Accordion, Heading, Panel } from '@navikt/ds-react'
import axios from 'axios'
import { format, parseISO } from 'date-fns'
import React, { ReactElement, useEffect, useState } from 'react'
import PageHeader from '../common/PageHeader'
import { ICandidate, IConsent } from '../types'

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
                    <Panel className='mt-8 space-x-6'>
                        <Heading size="large">Kandidater</Heading>
                        <Accordion>
                            {consent.candidates.map((candidate: ICandidate, index: number) => {
                                return (
                                    <Accordion.Item key={index}>
                                        {/* TODO: Add status to candidate */}
                                        <Accordion.Header>{candidate.name}</Accordion.Header>
                                        <Accordion.Content>
                                            {`Lydopptak: ${candidate.audioRecording} - Samtykket: ${candidate.consented}`}
                                        </Accordion.Content>
                                    </Accordion.Item>
                                )
                            })}
                        </Accordion>
                    </Panel>
                </>
            ) : <p>Fant ikke ett samtykke med den koden...</p>}  
        </div>
    )
}