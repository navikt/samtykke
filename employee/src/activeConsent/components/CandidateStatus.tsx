import React, { ReactElement } from 'react'
import { EnumCandidateStatus } from '../../types'

export default function CandidateStatus({
    status,
    consented
}: {
    status: EnumCandidateStatus
    consented?: Date
}): ReactElement {
    return (
        <>
            {status === EnumCandidateStatus.Accepted ? (
                <div>
                    
                </div>
            ) : (
                <></>
            )}
        </>
    )
}