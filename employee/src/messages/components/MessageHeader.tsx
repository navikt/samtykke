import { Email } from '@navikt/ds-icons'
import { Accordion } from '@navikt/ds-react'
import axios, { AxiosError } from 'axios'
import React, { ReactElement, useState } from 'react'
import config from '../../config'

export default function MessageHeader({
    title,
    read,
    id
}: {
    title: string
    read: boolean,
    id: number
}): ReactElement {

    const [messageRead, setMessageRead] = useState<boolean>(read)

    const patchMessageRead = async () => {
        if (!messageRead) {
            try {
                const { status } = await axios.patch(`${config.apiPath}/messages/${id}`, {
                    read: true
                })
                if (status === 200 || status === 304) setMessageRead(true)
            } catch (error) {
                // TODO: add error handling
            }

        }
    }

    return (
        <Accordion.Header onClick={() => patchMessageRead()}>
            <div className='flex flex-row place-items-center'>
                <div className='flex flex-row place-items-center'>
                    <Email className='mr-4'/>
                    {title}
                    {!messageRead ? (
                        <div className='ml-4 w-3 h-3 bg-orange-400 rounded-full' />
                    ) : <></> }
                </div>
            </div>
        </Accordion.Header>
    )
}