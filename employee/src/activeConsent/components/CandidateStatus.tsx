import { Alert, Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { EnumCandidateStatus } from '../../types'
import { getISODateString } from '../../utils/date'

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
                <div className='flex flex-col grow-0 space-y-2'>
                    <Alert variant='success' size='small'>Samtykke gitt</Alert>
                    <Alert variant='info' size='small'>
                        {`Samtykket ${getISODateString(consented!)}`}
                    </Alert>
                </div>
            ) : (
                <Alert variant='error' size='small'>Samtykke trukket</Alert>
            )}
        </>
    )
}