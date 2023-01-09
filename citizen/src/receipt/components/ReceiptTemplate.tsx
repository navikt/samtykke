import { Heading, Panel } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

export default function ReceiptTemplate({
    title,
    children
}: {
    title: string
    children: ReactElement | ReactElement[]
}): ReactElement {
    return (
        <Panel className='space-y-4'>
            <Heading size='medium'>{title}</Heading>
            {children}
        </Panel>
    )
}