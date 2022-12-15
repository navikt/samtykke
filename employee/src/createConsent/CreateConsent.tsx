import { Button, Heading, Panel, Textarea, TextField, UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import { Edit } from '@navikt/ds-icons'
import PageHeader from '../common/PageHeader'
import ConsentPreview from './components/ConsentPreview'
import { useNavigate } from 'react-router-dom'
import { IConsent } from '../types'
import { getYesterdayDate, getExpirationLimitDate } from './utils/date'
import { v4 as uuidv4 } from 'uuid'

interface IConsentInputs {
    title: string
    description: string
}

export default function CreateConsent(): ReactElement {

    const navigate = useNavigate()

    const [consent, setConsent] = useState<IConsent>({
        title: '',
        description: '',
        code: '',
        expiration: undefined,
        candidates: []
    })
    
    const [titleErrorMessage, setTitleErrorMessage] = useState<string>('')
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState<string>('')
    const [expirationErrorMessage, setExpiraitonErrorMessage] = useState<string>('')

    const { datepickerProps, inputProps, selectedDay } = UNSAFE_useDatepicker({
        fromDate: new Date('Aug 23 2019'),
    })

    const handleConsentChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setConsent({
            ...consent,
            [event.target.name]: event.target.value
        })
    }

    const onCreateConsent = () => {
        let isError = false

        // TODO: Set consent code
        if (selectedDay) {
            setConsent({
                ...consent,
                expiration: selectedDay
            })
            setExpiraitonErrorMessage('')
        } else {
            setExpiraitonErrorMessage('Du må sette en utløpsdato')
            isError = true
        } 
        
        if (consent.title.length === 0) {
            setTitleErrorMessage('Du må sette en tittel')
            isError = true
        } else if (consent.title.length < 5) {
            setTitleErrorMessage('Tittelen må være lengre enn 5 bokstaver')
            isError = true
        } else if (consent.title.length > 30) {
            setTitleErrorMessage('Tittelen må være under 30 bokstaver')
            isError = true
        } else {
            setTitleErrorMessage('')
        }

        if (consent.description.length === 0) {
            setDescriptionErrorMessage('Du må sette et formål')
            isError = true
        } else if (consent.description.length < 30) {
            setDescriptionErrorMessage('Formålet må være lengre en 30 bokstaver')
            isError = true
        } else if (consent.description.length > 300) {
            setDescriptionErrorMessage('Formålet må være under 300 bokstaver')
            isError = true
        } else {
            setDescriptionErrorMessage('')
        }

        if (!isError) {
            let codeString = uuidv4().substring(0, 6) as string
            codeString = `${codeString.substring(0, 3)}-${codeString.substring(3)}`.toUpperCase()

            setConsent({
                ...consent,
                code: codeString
            })
        }
    }


    return (
        <div className='mx-32 my-12 flex space-x-6'>
            <div className='w-1/2'>
                <PageHeader 
                    title="Nytt samtykke"
                    icon={<Edit className='align-middle text-[2rem] absolute -top-[1rem]'/>}
                />
                <Panel className='mt-8 space-y-4'>
                    <TextField 
                        label="Tittel"
                        name='title'
                        value={consent.title || ''}
                        onChange={handleConsentChange}   
                        error={titleErrorMessage}                  
                    />
                    <Textarea 
                        label="Formålet med samtykket"
                        name='description'
                        value={consent.description || ''}
                        onChange={handleConsentChange}
                        error={descriptionErrorMessage}
                    />
                    <UNSAFE_DatePicker {...datepickerProps} 
                        disabled={[
                            { from: new Date('Jan 1 1964'), to: getYesterdayDate() },
                            { from: getExpirationLimitDate(), to: new Date('Jan 1 2088')}
                        ]}
                    >
                        <UNSAFE_DatePicker.Input 
                            {...inputProps} 
                            label="Utløpsdato"
                            error={expirationErrorMessage}
                        />
                    </UNSAFE_DatePicker>
                </Panel>
                <div className='flex justify-between mt-4 px-2'>
                    <Button variant='secondary' onClick={() => navigate('/')}>Avbryt</Button>
                    <Button onClick={onCreateConsent}>Opprett samtykkeskjema</Button>
                </div>
            </div>
            <div className='w-1/2'>
                <ConsentPreview consent={consent}/>
            </div>
        </div>
    )
}