import { FileContent } from '@navikt/ds-icons'
import { Alert, Checkbox, CheckboxGroup, Panel, TextField } from '@navikt/ds-react'
import axios, { AxiosError } from 'axios'
import React, { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../common/PageHeader'
import config from '../config'
import ConsentSkeleton from '../consent/ConsentSkeleton'
import { EnumConsentReceipt } from '../receipt/EnumConsentReceipt'
import { IConsent } from '../types'
import WithdrawConsentModal from './components/WithdrawConsentModal'
import ButtonMenu from './components/buttonMenu/ButtonMenu'
import { useForm } from 'react-hook-form'
import { validEmailRegex } from '../utils/regex'

interface IActiveConsentForm {
    audioRecording: boolean
    name: string
    email: string
}

export default function ActiveConsent({ consent }: { consent: IConsent}): ReactElement {
    
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors, isDirty } } = useForm<IActiveConsentForm>({
        defaultValues: {
            name: consent.candidates[0].name,
            email: consent.candidates[0].email,
            audioRecording: consent.candidates[0].audioRecording
        }
    })

    const [apiErrorMessage, setApiErrorMessage] = useState<string>('')

    const [openWithdrawConsentModal, setOpenWithdrawConsentModal] = useState<boolean>(false)

    const onUpdateCandidate = async (data: IActiveConsentForm) => {
        try {
            const { status }: { status: number } = await axios.put(
                `${config.apiPath}/consent/${consent.code}/canditature/`,
                {
                    ...consent.candidates[0],
                    name: data.name,
                    email: data.email,
                    audioRecording: data.audioRecording
                }
            )
            if (status === 200) navigate('/kvitering', {
                state: {
                    consent,
                    receiptType: EnumConsentReceipt.Updated
                }
            })
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) setApiErrorMessage('Fant ikke samtykket du prøver å oppdatere')
                else setApiErrorMessage('Noe gikk galt i kontakten med serveren...')
            }
        }
    }

    return (
        <div className='flex-1 mt-10 px-4 lg:mt-10 lg:px-12'>
            <PageHeader 
                title="Administrer samtykke"
                icon={<FileContent />}
            />
            <div className='mt-8'>
                {consent.candidates[0] ? (
                    <>
                        <ConsentSkeleton consent={consent} />
                        <form onSubmit={handleSubmit(data => onUpdateCandidate(data))}>
                            <Panel className='space-y-4'>
                                <CheckboxGroup
                                    legend='Du takker ja til'
                                    description='Kryss av boksene du føler deg komfortabel med'
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
                            </Panel>
                            {apiErrorMessage && (
                                <Alert variant='error' className='mt-4'>
                                    {apiErrorMessage}
                                </Alert>
                            )}
                            <ButtonMenu 
                                consent={consent}
                                candidateChanged={isDirty}
                                setOpenWithdrawConsentModal={setOpenWithdrawConsentModal}
                                setApiErrorMessage={setApiErrorMessage}
                            />
                        </form>
                    </>
                ): <>Noe gikk galt i lastingen av ditt samtykke...</>}
               
            </div>
            <WithdrawConsentModal 
                open={openWithdrawConsentModal}
                setOpen={setOpenWithdrawConsentModal}
                consent={consent}
            />
        </div>
    )
}