import { ErrorColored, FileContent, SuccessColored } from '@navikt/ds-icons'
import { Accordion, BodyShort, Heading, Panel } from '@navikt/ds-react'
import axios from 'axios'
import { format, parseISO } from 'date-fns'
import React, { ReactElement, useEffect, useState } from 'react'
import PageHeader from '../common/PageHeader'
import { EnumCandidateStatus, ICandidate, IConsent } from '../types'

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
                        <Accordion className='px-6 mb-6'>
                            {consent.candidates.map((candidate: ICandidate, index: number) => {
                                return (
                                    <Accordion.Item key={index}>
                                        {candidate.status === EnumCandidateStatus.Accepted ? (
                                            <>
                                                <Accordion.Header>{candidate.name}</Accordion.Header>
                                                <Accordion.Content className='flex flex-row justify-between'>
                                                    {candidate.audioRecording ? (
                                                        <div className='flex flex-row items-center space-x-4 ml-4 my-4'>
                                                            <Heading size="small" className='text-green-600'>Lydopptak:</Heading>
                                                            <SuccessColored width={'1.5rem'} height={'1.5rem'}/>
                                                        </div>
                                                    ) : (
                                                        <div className='flex flex-row items-center space-x-4 ml-4 my-4'>
                                                            <Heading size="small" className='text-red-600'>Lydopptak:</Heading>
                                                            <ErrorColored width={'1.5rem'} height={'1.5rem'}/>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className='flex flex-row items-center space-x-4 mr-4 my-4'>
                                                            <Heading size='small'>Status:</Heading>
                                                            <Heading size='small' className='text-green-600'>{candidate.status}</Heading>
                                                        </div>
                                                        <div className='flex flex-row items-center space-x-4 mr-4 my-4'>
                                                            <Heading size='small'>
                                                                {`Samtykket: ${format(parseISO(candidate.consented!.toString()), 'dd.MM.yyyy')}`}
                                                            </Heading>
                                                        </div>
                                                    </div>
                                                </Accordion.Content>
                                            </>
                                        ) : (
                                            <>
                                                <Accordion.Header className='italic'>Navn trukket</Accordion.Header>
                                                <Accordion.Content className='flex flex-row justify-between'>
                                                    <div className='flex flex-row items-center space-x-4 ml-4 my-4'>
                                                        <Heading size="small" className='text-red-600'>Lydopptak:</Heading>
                                                        <ErrorColored width={'1.5rem'} height={'1.5rem'}/>
                                                    </div>
                                                    <div className='flex flex-row items-center space-x-4 mr-4 my-4'>
                                                        <Heading size='small'>Status:</Heading>
                                                        <Heading size='small' className='text-red-600'>{candidate.status}</Heading>
                                                    </div>
                                                </Accordion.Content>
                                            </>
                                        )}
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