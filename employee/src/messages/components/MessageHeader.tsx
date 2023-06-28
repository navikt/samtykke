import { Accordion, Tag } from '@navikt/ds-react'
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
                const { status } = await axios.patch(`${config.apiPath}/messages/${id}`)
                if (status === 200 || status === 304) setMessageRead(true)
            } catch (error) {
                // TODO: add error handling
            }
        }
    }

    return (
        <Accordion.Header onClick={() => patchMessageRead()}>
            <div className='flex flex-row place-items-center space-x-4'>
                <div>{title}</div>
                {messageRead ? <></> : (
                    <Tag variant='warning' size='xsmall'>Ulest</Tag>
                ) }
            </div>
        </Accordion.Header>
    )
}