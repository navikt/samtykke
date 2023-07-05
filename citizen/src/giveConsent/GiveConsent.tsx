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
import { useForm } from 'react-hook-form'
import { validEmailRegex } from '../utils/regex'

interface IGiveConsentForm {
    audioRecording: boolean
    name: string
    email: string
    hasConsented: boolean
}

export default function GiveConsent({ consent }: { consent: IConsent}): ReactElement {
    
    const navigate = useNavigate()
    
    const { register, handleSubmit, formState: { errors } } = useForm<IGiveConsentForm>()

    const [apiErrorMessage, setApiErrorMessage] = useState<string>('')

    const onGiveConsent = async (data: IGiveConsentForm) => {
        try {
            const { status } = await axios.post(`${config.apiPath}/consent/${consent.code}/canditature/`, {
                name: data.name,
                email: data.email,
                audioRecording: data.audioRecording,
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

    return (
        <>
            <PageHeader 
                title="Gi samtykke"
                icon={<FillForms />}
            />
            <div className='mt-8'>
                <ConsentSkeleton consent={consent}/>
                <form onSubmit={handleSubmit(data => onGiveConsent(data))}>
                    <Panel className='space-y-4'>
                        <CheckboxGroup
                            legend='Du takker ja til'
                            description='Kryss av boksene du føler deg komfertabel med'
                        >
                            <Checkbox {...register('audioRecording')}>
                                Ja, dere kan ta lydopptak
                            </Checkbox>
                        </CheckboxGroup>
                        <TextField
                            {...register('name', {
                                required: {
                                    value: true,
                                    message: 'Du må legge inn ditt navn'
                                }
                            })}
                            className='lg:w-1/2'
                            label='Ditt navn'
                            error={errors.name?.message}
                        />
                        <TextField
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: 'Du må legge inn din e-post'
                                },
                                pattern: {
                                    value: validEmailRegex,
                                    message: 'E-post er på ugyldig format'
                                }
                            })}
                            className='lg:w-1/2'
                            label='Din e-post'
                            error={errors.email?.message}
                        />
                        <Heading size='small'>Samtykke</Heading>
                        <ConfirmationPanel
                            {...register('hasConsented', {
                                required: {
                                    value: true,
                                    message: 'For å kunne samtykke må du krysse av på at du har lest og forstått samtykke'
                                },
                            })}
                            label='Ja, jeg samtykker'
                            error={errors.hasConsented?.message}
                        >
                            {`Jeg ønsker å delta i: ${consent.title}, og har lest og forstått samtykke`}
                        </ConfirmationPanel>
                    </Panel>
                    {apiErrorMessage && (
                        <Alert 
                            className='my-2 mx-2'
                            variant="error"
                        >
                            {apiErrorMessage}
                        </Alert>
                    )}
                    <div className='flex justify-between my-4 px-2'>
                        <Button variant="secondary" onClick={() => navigate('/')}>Avbryt</Button>
                        <Button>Gi samtykke</Button>
                    </div>
                </form>
            </div>
        </>
    )
}