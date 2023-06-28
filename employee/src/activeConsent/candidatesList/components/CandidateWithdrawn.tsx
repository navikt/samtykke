import React, { ReactElement } from 'react'
import { ICandidate } from '../../../types'
import { Accordion, Tag } from '@navikt/ds-react'
import { formatTrackingNumber } from '../../../utils/trackingNumber'
import CandidateStatus from './CandidateStatus'

export default function CandidateWithdrawn({ candidate }: { candidate: ICandidate }): ReactElement {
    return (
        <>
            <Accordion.Header className='italic'>
                {`Navn trukket - ${formatTrackingNumber(candidate.trackingNumber)}`}
            </Accordion.Header>
            <Accordion.Content>
                <div className='flex flex-col lg:flex-row place-items-center lg:justify-between space-y-2 mt-2'>
                    <Tag variant='error'>Samtykke til lydopptak ikke gitt</Tag>
                    <CandidateStatus status={candidate.status} />
                </div>
            </Accordion.Content>
        </>
    )
}