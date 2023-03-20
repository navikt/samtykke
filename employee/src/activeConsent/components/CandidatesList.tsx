import { ErrorColored, SuccessColored } from '@navikt/ds-icons'
import { Accordion, BodyShort, Heading } from '@navikt/ds-react'
import { format, parseISO } from 'date-fns'
import React, { ReactElement } from 'react'
import { EnumCandidateStatus, ICandidate } from '../../types'
import CandidateStatus from './CandidateStatus'
import ErrorHeader from './ErrorHeader'
import SuccessHeader from './SuccessHeader'

export default function CandidatesList({ candidates }: { candidates: ICandidate[] }): ReactElement {

    const formatTrackingNumber = (trackingNumber: string): string => {
        return trackingNumber.split('-')[0].toUpperCase()
    }

    return (
        <>
            {candidates.length !== 0 ? (
                <Accordion className='px-6 mb-6'>
                    {candidates.map((candidate: ICandidate, index: number) => {
                        return (
                            <Accordion.Item key={index}>
                                {candidate.status as EnumCandidateStatus === EnumCandidateStatus.Accepted ? (
                                    <>
                                        <Accordion.Header>{`${candidate.name} - ${formatTrackingNumber(candidate.trackingNumber)}`}</Accordion.Header>
                                        <Accordion.Content className='flex flex-row justify-between'>
                                            <div className='flex flex-row justify-center'>
                                                {candidate.audioRecording ? (
                                                    <SuccessHeader text='Lydopptak:' />
                                                ) : (
                                                    <ErrorHeader text='Lydopptak:' />
                                                )}
                                            </div>
                                            <CandidateStatus status={candidate.status} consented={candidate.consented}/>
                                        </Accordion.Content>
                                    </>
                                ) : (
                                    <>
                                        <Accordion.Header className='italic'>
                                            {`Navn trukket - ${formatTrackingNumber(candidate.trackingNumber)}`}
                                        </Accordion.Header>
                                        <Accordion.Content className='flex flex-row justify-between'>
                                            <ErrorHeader text='Lydopptak:' />
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