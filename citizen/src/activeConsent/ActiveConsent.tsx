import { FileContent } from '@navikt/ds-icons'
import { Alert, Button, Checkbox, CheckboxGroup, Modal, Panel, TextField } from '@navikt/ds-react'
import axios, { AxiosError } from 'axios'
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../common/PageHeader'
import ConsentSkeleton from '../consent/ConsentSkeleton'
import { ICandidate, IConsent } from '../types'
import WithdrawConsentModal from './components/WithdrawConsentModal'

export default function ActiveConsent({ consent }: { consent: IConsent}): ReactElement {
    
    const navigate = useNavigate()

    const [candidate, setCandidate] = useState<ICandidate>(consent.candidates[0])
    
    const [nameErrorMessage, setNameErrorMessage] = useState<string>('')
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('')

    const [apiErrorMessage, setApiErrorMessage] = useState<string>('')

    const [candidateChanged, setCandidateChanged] = useState<boolean>(false)

    const [openWithdrawConsentModal, setOpenWithdrawConsentModal] = useState<boolean>(false)

    const handleConsentCheckboxChange = (values: string[]) => {
        setCandidate(prevState => ({
            ...prevState,
            audioRecording: values.includes('audioRecording'),
            storeInfo: values.includes('storeInfo')
        }))
    }
    
    const handleConsentTextFieldsChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCandidate({
            ...candidate,
            [event.target.name]: event.target.value
        })
    }

    const onUpdateCandidate = async () => {
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
        } else if (!validEmailRegex.test(candidate.email)) {
            setEmailErrorMessage('E-post er på ugyldig format')
            isError = true
        } else {
            setEmailErrorMessage('')
        }

        if (!isError) {
            try {
                const { status }: { status: number } = await axios.put(
                    `/innbygger/api/consent/${consent.code}/canditature/`,
                    candidate
                )
                if (status === 200) navigate('/')
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 404) setApiErrorMessage('Fant ikke samtykket du prøver å oppdatere')
                    else setApiErrorMessage('Noe gikk galt i kontakten med serveren...')
                }
            }}
    }

    useEffect(() => {
        // Check if candidate has changed -> tell react to render update button
        if (Object.keys(consent.candidates[0]).some(key => consent.candidates[0][key] !== candidate[key])) {
            setCandidateChanged(true)
        } else {
            setCandidateChanged(false)
        }
    }, [candidate])

    return (
        <div className='mx-32 my-12'>
            <PageHeader 
                title="Administrer samtykke"
                icon={<FileContent className='align-middle text-[2rem] absolute -top-[1rem]'/>}
            />
            <div className='mt-8'>
                {consent && candidate ? (
                    <>
                        <ConsentSkeleton consent={consent} />
                        <Panel className='space-y-4'>
                            <CheckboxGroup
                                legend='Du takker ja til'
                                description='Kryss av boksene du føler deg komfertabel med'
                                onChange={handleConsentCheckboxChange}
                            >
                                <Checkbox 
                                    value='audioRecording' 
                                    checked={candidate.audioRecording || false}
                                >
                            Ja, dere kan ta lydopptak
                                </Checkbox>
                                <Checkbox 
                                    value='storeInfo' 
                                    checked={candidate.storeInfo || false}
                                >
                            Ja, dere kan beholde kontaktinformasjon min i inntil 6 måneder
                            i tilfelle det er behov for en oppfølgingssamtale
                                </Checkbox>
                            </CheckboxGroup>
                            <TextField 
                                className='w-1/2'
                                label='Ditt navn'
                                name='name'
                                value={candidate.name || ''}
                                onChange={handleConsentTextFieldsChange}
                                error={nameErrorMessage}
                            />
                            <TextField 
                                className='w-1/2'
                                label='Din e-post'
                                name='email'
                                value={candidate.email || ''}
                                onChange={handleConsentTextFieldsChange}
                                error={emailErrorMessage}
                            />
                        </Panel>
                        <div className='flex justify-between my-4 px-2'>
                            <Button variant="secondary" onClick={() => navigate('/')}>Avbryt</Button>
                            <div className='space-x-4'>
                                {candidateChanged ? (
                                    <Button 
                                        variant='secondary'
                                        onClick={onUpdateCandidate}
                                    >
                                Oppdater
                                    </Button>
                                ) : <></>}
                                <Button 
                                    variant="danger" 
                                    onClick={() => setOpenWithdrawConsentModal(true)}
                                >
                            Trekk samtykke
                                </Button>
                            </div>
                        </div>
                        {apiErrorMessage && (
                            <Alert variant="error">
                                {apiErrorMessage}
                            </Alert>
                        )}
                    </>
                ): <>Noe gikk galt...</>}
               
            </div>
            <WithdrawConsentModal 
                open={openWithdrawConsentModal}
                setOpen={setOpenWithdrawConsentModal}
                code={consent.code}
            />
        </div>
    )
}