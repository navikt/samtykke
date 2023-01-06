import { FileContent } from '@navikt/ds-icons'
import { Button, Checkbox, CheckboxGroup, Modal, Panel, TextField } from '@navikt/ds-react'
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
                        {candidateChanged ? <Button variant='secondary'>Oppdater</Button> : <></>}
                        <Button 
                            variant="danger" 
                            onClick={() => setOpenWithdrawConsentModal(true)}
                        >
                            Trekk samtykke
                        </Button>
                    </div>
                </div>
            </div>
            <WithdrawConsentModal 
                open={openWithdrawConsentModal}
                setOpen={setOpenWithdrawConsentModal}
            />
        </div>
    )
}