import { Email } from '@navikt/ds-icons'
import { Accordion, BodyLong, Button, Heading, Panel } from '@navikt/ds-react'
import axios, { AxiosError } from 'axios'
import React, { ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../common/PageHeader'
import { IMessage } from '../types'
import MessageContent from './components/MessageContent'
import MessageHeader from './components/MessageHeader'
import config from '../config'

export default function Messages(): ReactElement {

    const [messages, setMessages] = useState<IMessage[]>()

    const [messagesErrorMessage, setMessagesErrorMessage] = useState<string>('')

    const getMessages = async () => {
        try {
            const { data }: { data: IMessage[] } = await axios.get(`${config.apiPath}/api/messages`)
            setMessages(data)
        } catch (error) {
            if (error instanceof AxiosError) {
                setMessagesErrorMessage('Fant ingen meldinger')
            } else setMessagesErrorMessage('Noe gikk galt i hentingen av meldingene...')
        }
    }

    useEffect(() => {
        getMessages()
    }, [])

    return(
        <div className='mx-32 my-12'>
            <PageHeader 
                title='Mine meldinger'
                icon={<Email className='align-middle text-[2rem] absolute -top-[1rem]'/>}
            />
            {messages ? (
                <Panel className='my-12'>
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
            ) : <Heading size='medium'>{messagesErrorMessage}</Heading>
            }
        </div>
    )
}