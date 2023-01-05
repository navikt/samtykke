import { FillForms } from '@navikt/ds-icons'
import { Button, Checkbox, CheckboxGroup, ConfirmationPanel, Heading, Panel, TextField } from '@navikt/ds-react'
import { useNavigate } from 'react-router-dom'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import PageHeader from '../common/PageHeader'
import ConsentSkeleton from '../consent/ConsentSkeleton'
import { EnumCandidateStatus, ICandidate, IConsent } from '../types'

export default function GiveConsent({ consent }: { consent: IConsent}): ReactElement {
    
    const navigate = useNavigate()
    
    const [candidate, setCandidate] = useState<ICandidate>({
        id: '',
        name: '',
        email: '',
        status: EnumCandidateStatus.Withdrawn,
        consented: undefined,
        audioRecording: false,
        storeInfo: false
    })

    const handleConsentCheckboxChange = (values: string[]) => {
        if (values.includes('audioRecording')) {
            console.log(values)
            setCandidate({...candidate, audioRecording: true})
            console.log('got here')
        } else {
            setCandidate({...candidate, audioRecording: false})
            console.log('should definetly not get here')
        }

        if (values.includes('storeInfo')) {
            setCandidate({...candidate, storeInfo: true})
        } else {
            setCandidate({...candidate, storeInfo: false})
        }
    }

    const handleConsentTextFieldsChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCandidate({
            ...candidate,
            [event.target.name]: event.target.value
        })
    }

    const onGiveConsent = () => {
        console.log(candidate.audioRecording)
    }

    return (
        <div className='mx-32 my-12'>
            <PageHeader 
                title="Gi samtykke"
                icon={<FillForms className='align-middle text-[2rem] absolute -top-[1rem]'/>}
            />
            <div className='mt-8'>
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
                        <Checkbox value='storeInfo'>
                        Ja, dere kan beholde kontakteinformasjonen min i intill 6 måneder
                        i tilfelle det er behov for en oppfølgingssamtale
                        </Checkbox>
                    </CheckboxGroup>
                    <TextField 
                        className='w-1/2'
                        label='Ditt navn'
                        name='name'
                        value={candidate.name || ''}
                        onChange={handleConsentTextFieldsChange}
                    />
                    <TextField 
                        className='w-1/2'
                        label='Din e-post'
                        name='email'
                        value={candidate.email || ''}
                        onChange={handleConsentTextFieldsChange}
                    />
                    <Heading size='small'>Samtykke</Heading>
                    <ConfirmationPanel label='Ja, jeg samtykker'>
                        {`Jeg ønsker å delta i: ${consent.title}, og har lest og forstått samtykke`}
                    </ConfirmationPanel>
                </Panel>
                <div className='flex justify-between my-4 px-2'>
                    <Button variant="secondary" onClick={() => navigate('/')}>Avbryt</Button>
                    <Button onClick={onGiveConsent}>Gi samtykke</Button>
                </div>
            </div>
        </div>
    )
}