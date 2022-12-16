import { Heading } from '@navikt/ds-react'
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
                <div>
                    <div className='flex flex-row items-center space-x-4 mr-4 my-4'>
                        <Heading size='small'>Status:</Heading>
                        <Heading size='small' className='text-green-600'>{status}</Heading>
                    </div>
                    <div className='flex flex-row items-center space-x-4 mr-4 my-4'>
                        <Heading size='small'>
                            {`Samtykket: ${getISODateString(consented!)}`}
                        </Heading>
                    </div>
                </div>
            ) : (
                <div className='flex flex-row items-center space-x-4 mr-4 my-4'>
                    <Heading size='small'>Status:</Heading>
                    <Heading size='small' className='text-red-600'>{status}</Heading>
                </div>
            )}
        </>
    )
}