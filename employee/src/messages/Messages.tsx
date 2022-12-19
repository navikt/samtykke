import { Email } from '@navikt/ds-icons'
import { Accordion, BodyLong, Button, Heading, Panel } from '@navikt/ds-react'
import axios, { AxiosError } from 'axios'
import React, { ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../common/PageHeader'
import { IMessage } from '../types'

export default function Messages(): ReactElement {

    const navigate = useNavigate()

    const [messages, setMessages] = useState<IMessage[]>()

    const [messagesErrorMessage, setMessagesErrorMessage] = useState<string>('')

    const getMessages = async () => {
        try {
            const { data }: { data: IMessage[] } = await axios.get('/ansatt/api/messages')
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
                                    <Accordion.Header>
                                        <div className='flex flex-row place-items-center'>
                                            <div className='flex flex-row place-items-center'>
                                                <Email className='mr-4'/>
                                                {message.title}
                                                {!message.read ? (
                                                    <div className='ml-4 w-3 h-3 bg-orange-400 rounded-full' />
                                                ) : <></> }
                                            </div>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Content className='space-y-2'>
                                        <BodyLong>{message.description}</BodyLong>
                                        {message.ref ? (
                                            <Button
                                                variant='secondary'
                                                size='small'
                                                onClick={() => navigate(`/samtykke${message.ref}`)}
                                            >
                                                Til samtykke
                                            </Button>
                                        ) : <></> }
                                    </Accordion.Content>
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