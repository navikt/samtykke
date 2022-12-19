import { Email } from '@navikt/ds-icons'
import { Accordion } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

// TODO: pass message ID as prop? Could toggle read that way? maby idk
export default function MessageHeader({
    title,
    read
}: {
    title: string
    read: boolean
}): ReactElement {
    return (
        <Accordion.Header>
            <div className='flex flex-row place-items-center'>
                <div className='flex flex-row place-items-center'>
                    <Email className='mr-4'/>
                    {title}
                    {!read ? (
                        <div className='ml-4 w-3 h-3 bg-orange-400 rounded-full' />
                    ) : <></> }
                </div>
            </div>
        </Accordion.Header>
    )
}