import React, { ReactElement } from 'react'
import { ICandidate } from '../../../types'
import { Accordion, Tag } from '@navikt/ds-react'
import { formatTrackingNumber } from '../../../utils/trackingNumber'
import CandidateStatus from './CandidateStatus'

export default function CandidateAccepted({ candidate }: { candidate: ICandidate }): ReactElement {
    return (
        <>
            <Accordion.Header>
                {`${candidate.name} - ${formatTrackingNumber(candidate.trackingNumber)}`}
            </Accordion.Header>
            <Accordion.Content className='flex flex-col lg:flex-row place-items-center lg:justify-between space-y-2'>
                <div className='flex lg:flex-row lg:items-center mt-2'>
                    {candidate.audioRecording ? (
                        <Tag variant='success'>Samtykke til lydopptak gitt</Tag>
                    ) : (
                        <Tag variant='error'>Samtykke til lydopptak ikke gitt</Tag>
                    )}
                </div>
                <CandidateStatus status={candidate.status} consented={candidate.consented}/>
            </Accordion.Content>
        </>
    )
}