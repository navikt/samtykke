import React, { ReactElement } from 'react'
import { EnumCandidateStatus, ICandidate } from '../../../types'
import { Accordion } from '@navikt/ds-react'
import CandidateAccepted from './CandidateAccepted'
import CandidateWithdrawn from './CandidateWithdrawn'

export default function CandidateAccordionItem({ candidate }: { candidate: ICandidate }): ReactElement {    
    return (
        <Accordion.Item>
            {candidate.status === EnumCandidateStatus.Accepted ? (
                <CandidateAccepted candidate={candidate} />
            ) : (
                <CandidateWithdrawn candidate={candidate} />
            )}
        </Accordion.Item>
    )
}