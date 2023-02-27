import { ErrorColored, SuccessColored } from '@navikt/ds-icons'
import { Accordion, Heading } from '@navikt/ds-react'
import { format, parseISO } from 'date-fns'
import React, { ReactElement } from 'react'
import { EnumCandidateStatus, ICandidate } from '../../types'
import CandidateStatus from './CandidateStatus'
import ErrorHeader from './ErrorHeader'
import SuccessHeader from './SuccessHeader'

export default function CandidatesList({ candidates }: { candidates: ICandidate[] }): ReactElement {
    return (
        <>
            {candidates.length !== 0 ? (
                <Accordion className='px-6 mb-6'>
                    {candidates.map((candidate: ICandidate, index: number) => {
                        return (
                            <Accordion.Item key={index}>
                                {candidate.status as EnumCandidateStatus === EnumCandidateStatus.Accepted ? (
                                    <>
                                        <Accordion.Header>{candidate.name}</Accordion.Header>
                                        <Accordion.Content className='flex flex-row justify-between'>
                                            <div>
                                                {candidate.audioRecording ? (
                                                    <SuccessHeader text='Lydopptak:' />
                                                ) : (
                                                    <ErrorHeader text='Lydopptak:' />
                                                )}
                                                {candidate.storeInfo ? (
                                                    <SuccessHeader text='Lagre kontaktinfo i 6 mnd:' />
                                                ) : (
                                                    <ErrorHeader text='Lagre kontaktinfo i 6 mnd:' />
                                                )}
                                            </div>
                                            <CandidateStatus status={candidate.status} consented={candidate.consented}/>
                                        </Accordion.Content>
                                    </>
                                ) : (
                                    <>
                                        <Accordion.Header className='italic'>Navn trukket</Accordion.Header>
                                        <Accordion.Content className='flex flex-row justify-between'>
                                            <div>
                                                <ErrorHeader text='Lydopptak:' />
                                                <ErrorHeader text='Lagre kontaktinfo i 6 mnd:' />
                                            </div>
                                            <CandidateStatus status={candidate.status} />
                                        </Accordion.Content>
                                    </>
                                )}
                            </Accordion.Item>
                        )
                    })}
                </Accordion>
            ) : (
                <Heading size="medium" className='px-6 mb-6 italic'>Ingen har gitt samtykke enda...</Heading>
            )}
        </>
    )
}