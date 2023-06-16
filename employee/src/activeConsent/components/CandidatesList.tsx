import { ErrorColored, SuccessColored } from '@navikt/ds-icons'
import { Accordion, BodyShort, Heading, Tag } from '@navikt/ds-react'
import { format, parseISO } from 'date-fns'
import React, { ReactElement } from 'react'
import { EnumCandidateStatus, ICandidate } from '../../types'
import CandidateStatus from './CandidateStatus'

export default function CandidatesList({ candidates }: { candidates: ICandidate[] }): ReactElement {

    const formatTrackingNumber = (trackingNumber: string): string => {
        return trackingNumber.split('-')[0].toUpperCase()
    }

    return (
        <>
            {candidates.length === 0 ? (
                <Heading size="medium" className='italic'>
                    <div className='px-6 mb-6'>Ingen har gitt samtykke enda...</div>
                </Heading>
            ) : (
                <Accordion className='px-6 mb-6'>
                    {candidates.map((candidate: ICandidate, index: number) => {
                        return (
                            <Accordion.Item key={index}>
                                {candidate.status as EnumCandidateStatus === EnumCandidateStatus.Accepted ? (
                                    <>
                                        <Accordion.Header>{`${candidate.name} - ${formatTrackingNumber(candidate.trackingNumber)}`}</Accordion.Header>
                                        <Accordion.Content className='flex flex-row justify-between'>
                                            <div className='flex flex-row items-center'>
                                                {candidate.audioRecording ? (
                                                    <Tag variant='success'>Samtykke til lydopptak gitt</Tag>
                                                ) : (
                                                    <Tag variant='error'>Samtykke til lydopptak ikke gitt</Tag>
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
                                        <Accordion.Content className='flex flex-row justify-between items-center'>
                                            <Tag variant='error'>Samtykke til lydopptak ikke gitt</Tag>
                                            <CandidateStatus status={candidate.status} />
                                        </Accordion.Content>
                                    </>
                                )}
                            </Accordion.Item>
                        )
                    })}
                </Accordion>
            )}
        </>
    )
}