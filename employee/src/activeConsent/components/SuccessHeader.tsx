import { SuccessColored } from '@navikt/ds-icons'
import { Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

export default function SuccessHeader({ text }: { text: string }): ReactElement {
    return (
        <div className='flex flex-row items-center space-x-4 ml-4 my-4'>
            <Heading size='small' className='text-green-600'>{text}</Heading>
            <SuccessColored width={'1.5rem'} height={'1.5rem'} />
        </div>
    )
}