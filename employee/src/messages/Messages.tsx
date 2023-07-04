import { Email } from '@navikt/ds-icons'
import { Accordion, Heading, Panel, Skeleton } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import PageHeader from '../common/PageHeader'
import { IMessage } from '../types'
import MessageContent from './components/MessageContent'
import MessageHeader from './components/MessageHeader'
import config from '../config'
import useSWR, { SWRResponse } from 'swr'
import { fetcher } from '../utils/fetcher'

export default function Messages(): ReactElement {

    const {
        data: messages,
        isLoading: messagesIsLoading,
        error: messagesError
    }: SWRResponse<Array<IMessage>, boolean, boolean> = useSWR(`${config.apiPath}/messages`, fetcher)

    return(
        <main className='flex flex-col mt-10 px-4 lg:mt-10 lg:px-12'>
            <PageHeader 
                title='Mine meldinger'
                icon={<Email />}
            />
            {messagesIsLoading ? <Skeleton variant='rectangle' width='100%' height={300} /> :
                <>
                    {messages && messages.length > 0 && !messagesError ? (
                        <Panel className='mt-8'>
                            <Accordion>
                                {messages.map((message: IMessage, index: number) => {
                                    return (
                                        <Accordion.Item key={index}>
                                            <MessageHeader title={message.title} read={message.read} id={message.id}/>
                                            <MessageContent description={message.description} reference={message.ref}/>
                                        </Accordion.Item>
                                    )
                                })}
                            </Accordion>
                        </Panel>
                    ) : <Heading size='medium' as="span">Fant ingen meldinger</Heading>
                    }
                </>
            }
        </main>
    )
}