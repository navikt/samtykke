import { Button, Heading, Panel, Textarea, TextField, UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import { Edit } from '@navikt/ds-icons'
import PageHeader from '../common/PageHeader'
import ConsentPreview from './components/ConsentPreview'
import { useNavigate } from 'react-router-dom'
import { IConsent } from '../types'

export default function CreateConsent(): ReactElement {

    const navigate = useNavigate()

    const [consent, setConsent] = useState<IConsent>({
        title: '',
        description: '',
        code: '',
        expiration: undefined,
        candidates: []
    })

    const [expirationErrorMessage, setExpiraitonErrorMessage] = useState<string>('')

    const { datepickerProps, inputProps, selectedDay } = UNSAFE_useDatepicker({
        fromDate: new Date('Aug 23 2019'),
    })

    const getYesterdayDate = (): Date => {
        const yesterday: Date = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        return yesterday
    }

    const getExpirationLimitDate = (): Date => {
        const expirationLimitDate: Date = new Date()
        expirationLimitDate.setDate(expirationLimitDate.getDate() + 60)
        return expirationLimitDate
    }

    const handleConsentChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setConsent({
            ...consent,
            [event.target.name]: event.target.value
        })
    }

    const onCreateConsent = () => {
        // Check if date is before today
        // Check if date is after 3 months
        if (consent.expiration) {
            setConsent({
                ...consent,
                expiration: selectedDay
            })
        } else {
            setExpiraitonErrorMessage('Du må velge en utløpsdato')
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
                    />
                    <Textarea 
                        label="Formålet med samtykket"
                        name='description'
                        value={consent.description || ''}
                        onChange={handleConsentChange}
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