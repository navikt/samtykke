import { Alert, BodyLong, Button, Heading, Modal, TextField } from '@navikt/ds-react'
import axios, { AxiosError } from 'axios'
import React, { ChangeEvent, Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react'
import { IConsentBase } from '../../types'
import { CheckmarkIcon } from '@navikt/aksel-icons'
import config from '../../config'
import { useNavigate } from 'react-router-dom'

export default function SlackChannelModal({
    open,
    setOpen,
    consent
}: {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    consent: IConsentBase
}): ReactElement {

    const navigate = useNavigate()

    const [slackChannel, setSlackChannel] = useState<string>('')
    const [slackChannelId, setSlackChannelId] = useState<string>('')

    const [loading, setLoading] = useState<boolean>(false)
    const [disableCreateConsent, setDisableCreateConsent] = useState<boolean>(true)
    const [showCheckmark, setShowCheckmark] = useState<boolean>(false)

    const [showSizeWarning, setShowSizeWarning] = useState<boolean>(false)

    const [slackChannelErrorMessage, setSlackChannelErrorMessage] = useState<string>('')

    const [apiErrorMessage, setApiErrorMessage] = useState<string>('')

    const handleSlackChannelChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSlackChannel(event.target.value)
    }

    const onFindSlackChannel = async () => {
        setLoading(true)

        if (slackChannel.length === 0) {
            setSlackChannelErrorMessage('Du må skrive inn en slack kanal')
        } else {
            try {
                const { data } = await axios.get(`/ansatt/slack/validChannel/${slackChannel}`)
                setSlackChannelId(data.slackChannelId)
                setDisableCreateConsent(false)
                setShowCheckmark(true)
                setSlackChannelErrorMessage('')
                setShowSizeWarning(data.sizeWarning)
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 404) {
                        setSlackChannelErrorMessage(`Fant ikke slack kanal med navn: ${slackChannel}`)
                    } else {
                        setSlackChannelErrorMessage('Noe gikk galt i søket etter slack kanal')
                    }
                    setDisableCreateConsent(true)
                    setShowCheckmark(false)
                }
            }
        }

        setLoading(false)
    }

    const onCreateConsent = async () => {
        try {
            const { status } = await axios.post(`${config.apiPath}/consent`, {
                ...consent,
                slackChannelId
            })
            if (status === 200) navigate('/')
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) setApiErrorMessage('Noe i skjemaet er feil...')
                else setApiErrorMessage('Noe gikk galt i kontakten med serveren...')
            }
        }
    }

    useEffect(() => {
        Modal.setAppElement(document.getElementById('root'))
    }, [])

    return (
        <Modal
            open={open}
            aria-label='Velg Slack kanal for varsling'
            aria-labelledby='modal-heading'
            onClose={() => setOpen(open => !open)}
        >
            <Modal.Content>
                <Heading spacing level='2' size='medium'>
                    Velg Slack kanal for varsling
                </Heading>
                <BodyLong spacing>
                    Skriv inn slack kanalen du ønsker å bli varslet på angående samtykket ditt
                </BodyLong>
                <TextField 
                    label='Slack kanal'
                    name='slackChannel'
                    onChange={handleSlackChannelChange}
                    value={slackChannel}
                    error={slackChannelErrorMessage}
                />
                {showSizeWarning && (
                    <Alert variant="warning" className='mt-2'>
                        OBS! Denne kanalen har over 20 medlemmer
                    </Alert>
                )}
                {apiErrorMessage && (
                    <Alert variant="error" className='mt-2'>
                        {apiErrorMessage}
                    </Alert>
                )}
                <div className='flex justify-between space-x-4 mt-4'>
                    <Button 
                        variant='secondary'
                        onClick={() => setOpen(false)}
                    >
                        Avbryt
                    </Button>
                    <div className='flex flex-row items-center space-x-2'>
                        <Button
                            variant="secondary"
                            loading={loading}
                            onClick={onFindSlackChannel}
                        >
                            Finn kanal
                        </Button>
                        {showCheckmark ? <CheckmarkIcon fontSize="2.5rem" /> : <></>}
                    </div>
                    <Button
                        disabled={disableCreateConsent}
                        onClick={onCreateConsent}
                    >
                        Opprett samtykke
                    </Button>
                </div>
            </Modal.Content>
        </Modal>
    )
}