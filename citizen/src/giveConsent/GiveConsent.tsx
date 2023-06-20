import { FillForms } from '@navikt/ds-icons'
import { Alert, Button, Checkbox, CheckboxGroup, ConfirmationPanel, Heading, Panel, TextField } from '@navikt/ds-react'
import { useNavigate } from 'react-router-dom'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import PageHeader from '../common/PageHeader'
import ConsentSkeleton from '../consent/ConsentSkeleton'
import { EnumCandidateStatus, ICandidate, IConsent } from '../types'
import axios, { AxiosError } from 'axios'
import { EnumConsentReceipt } from '../receipt/EnumConsentReceipt'
import config from '../config'
import { format } from 'date-fns'

export default function GiveConsent({ consent }: { consent: IConsent}): ReactElement {
    
    const navigate = useNavigate()
    
    const [candidate, setCandidate] = useState<ICandidate>({
        name: '',
        email: '',
        status: EnumCandidateStatus.Withdrawn,
        consented: undefined,
        audioRecording: false,
    })

    const [hasGivenConsent, setHasGivenConsent] = useState<boolean>(false)

    const [nameErrorMessage, setNameErrorMessage] = useState<string>('')
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('')
    const [giveConsentErrorMessage, setGiveConsentErrorMessage] = useState<string>('')

    const [apiErrorMessage, setApiErrorMessage] = useState<string>('')

    const handleConsentCheckboxChange = (values: string[]) => {
        setCandidate(prevState => ({
            ...prevState,
            audioRecording: values.includes('audioRecording'),
        }))
    }

    const handleConsentTextFieldsChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCandidate({
            ...candidate,
            [event.target.name]: event.target.value
        })
    }

    const onGiveConsent = async () => {
        let isError = false

        if (candidate.name.length === 0) {
            setNameErrorMessage('Du må legge inn ditt navn')
            isError = true
        } else {
            setNameErrorMessage('')
        }

        const validEmailRegex = /^[a-z\wæøåA-Z\wæøå0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (candidate.email.length === 0) {
            setEmailErrorMessage('Du må legge inn din e-post')
            isError = true
        } else if (validEmailRegex.test(candidate.email)) {
            setEmailErrorMessage('')
        } else {
            setEmailErrorMessage('E-post er på ugyldig format')
            isError = true
        }

        if (hasGivenConsent) {
            setGiveConsentErrorMessage('')
        } else {
            setGiveConsentErrorMessage('For å kunne samtykke må du krysse av på at du har lest og forstått samtykke')
            isError = true
        }

        if (!isError) {
            try {
                const { status } = await axios.post(`${config.apiPath}/consent/${consent.code}/canditature/`, {
                    name: candidate.name,
                    email: candidate.email,
                    status: EnumCandidateStatus.Accepted,
                    consented: format(new Date(), 'yyyy-MM-dd'),
                    audioRecording: candidate.audioRecording,
                })
                if (status === 200) navigate('/kvitering', { 
                    state: { 
                        consent, 
                        receiptType: EnumConsentReceipt.Accepted 
                    } 
                })
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 406) setApiErrorMessage('Noe i skjemaet er feil...')
                    else setApiErrorMessage('Noe gikk galt i kontakten med serveren...')
                }
            }
        }
    }

    return (
        <div className='flex-1 mt-10 px-4 lg:mt-10 lg:px-12'>
            <PageHeader 
                title="Gi samtykke"
                icon={<FillForms />}
            />
            <div className='mt-10'>
                <ConsentSkeleton consent={consent}/>
                <Panel className='space-y-4'>
                    <CheckboxGroup
                        legend='Du takker ja til'
                        description='Kryss av boksene du føler deg komfertabel med'
                        onChange={handleConsentCheckboxChange}
                    >
                        <Checkbox value='audioRecording'>
                            Ja, dere kan ta lydopptak
                        </Checkbox>
                    </CheckboxGroup>
                    <TextField 
                        className='lg:w-1/2'
                        label='Ditt navn'
                        name='name'
                        value={candidate.name || ''}
                        onChange={handleConsentTextFieldsChange}
                        error={nameErrorMessage}
                    />
                    <TextField 
                        className='lg:w-1/2'
                        label='Din e-post'
                        name='email'
                        value={candidate.email || ''}
                        onChange={handleConsentTextFieldsChange}
                        error={emailErrorMessage}
                    />
                    <Heading size='small'>Samtykke</Heading>
                    <ConfirmationPanel 
                        label='Ja, jeg samtykker'
                        checked={hasGivenConsent || false}
                        onChange={() => setHasGivenConsent((prevState) => !prevState)}
                        error={!hasGivenConsent && giveConsentErrorMessage}
                    >
                        {`Jeg ønsker å delta i: ${consent.title}, og har lest og forstått samtykke`}
                    </ConfirmationPanel>
                </Panel>
                <div className='flex justify-between my-4 px-2'>
                    <Button variant="secondary" onClick={() => navigate('/')}>Avbryt</Button>
                    <Button onClick={onGiveConsent}>Gi samtykke</Button>
                </div>
                {apiErrorMessage && (
                    <Alert variant="error">
                        {apiErrorMessage}
                    </Alert>
                )}
            </div>
        </div>
    )
}