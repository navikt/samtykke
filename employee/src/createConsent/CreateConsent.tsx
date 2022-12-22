import { Alert, Button, Heading, Panel, Textarea, TextField, UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import { Edit } from '@navikt/ds-icons'
import PageHeader from '../common/PageHeader'
import ConsentPreview from './components/ConsentPreview'
import { useNavigate } from 'react-router-dom'
import { IConsent } from '../types'
import { getYesterdayDate, getExpirationLimitDate } from '../utils/date'
import axios, { AxiosError } from 'axios'

export default function CreateConsent(): ReactElement {

    const navigate = useNavigate()

    const [consent, setConsent] = useState<IConsent>({
        title: '',
        responsibleGroup: '',
        purpose: '',
        totalInvolved: 1,
        code: '',
        expiration: undefined,
        candidates: []
    })
    
    const [titleErrorMessage, setTitleErrorMessage] = useState<string>('')
    const [responsibleGroupErrorMessage, setResponsibleGroupErrorMessage] = useState<string>('')
    const [purposeErrorMessage, setPurposeErrorMessage] = useState<string>('')
    const [totalInvolvedErrorMessage, setTotalInvovledErrorMessage] = useState<string>('')
    const [expirationErrorMessage, setExpiraitonErrorMessage] = useState<string>('')

    const [apiErrorMessage, setApiErrorMessage] = useState<string>('')

    const { datepickerProps, inputProps, selectedDay } = UNSAFE_useDatepicker({
        fromDate: new Date('Aug 23 2019'),
    })

    const handleConsentChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (event.target.name === 'totalInvolved') setConsent({
            ...consent,
            totalInvolved: Number(event.target.value)
        })
        else setConsent({
            ...consent,
            [event.target.name]: event.target.value
        })
    }

    const onCreateConsent = async () => {
        let isError = false

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
        } else if (consent.title.length > 50) {
            setTitleErrorMessage('Tittelen må være under 50 bokstaver')
            isError = true
        } else {
            setTitleErrorMessage('')
        }

        if (consent.responsibleGroup.length === 0) {
            setResponsibleGroupErrorMessage('Du må sette et team/seksjon')
            isError = true
        } else {
            setResponsibleGroupErrorMessage('')
        }

        if (consent.purpose.length === 0) {
            setPurposeErrorMessage('Du må sette et formål')
            isError = true
        } else if (consent.purpose.length < 30) {
            setPurposeErrorMessage('Formålet må være lengre en 30 bokstaver')
            isError = true
        } else if (consent.purpose.length > 300) {
            setPurposeErrorMessage('Formålet må være under 300 bokstaver')
            isError = true
        } else {
            setPurposeErrorMessage('')
        }

        if (consent.totalInvolved < 1) {
            setTotalInvovledErrorMessage('Det må være minst 1 involert')
            isError = true
        } else {
            setTotalInvovledErrorMessage('')
        }

        if (!isError) {
            try {
                const { status } = await axios.post('/ansatt/api/consent', consent)
                if (status === 200) navigate('/')
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 406) setApiErrorMessage('Noe i skjemaet er feil...')
                    else setApiErrorMessage('Noe gikk galt i kontakten med serveren...')
                }
            }
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
                    <TextField 
                        label='Team/seksjon'
                        name='responsibleGroup'
                        value={consent.responsibleGroup || ''}
                        onChange={handleConsentChange}
                        error={responsibleGroupErrorMessage}
                    />
                    <Textarea 
                        label="Formålet med samtykket"
                        name='purpose'
                        value={consent.purpose || ''}
                        onChange={handleConsentChange}
                        error={purposeErrorMessage}
                    />
                    <div className='flex flex-row space-x-12'>
                        <div>
                            <TextField
                                type='number'
                                label='Antall involverte'
                                name='totalInvolved'
                                value={consent.totalInvolved || 0}
                                onChange={handleConsentChange}
                                error={totalInvolvedErrorMessage}
                            />
                        </div>
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
                    </div>
                </Panel>
                <div className='flex justify-between my-4 px-2'>
                    <Button variant='secondary' onClick={() => navigate('/')}>Avbryt</Button>
                    <Button onClick={onCreateConsent}>Opprett samtykkeskjema</Button>
                </div>
                {apiErrorMessage && (
                    <Alert variant="error">
                        {apiErrorMessage}
                    </Alert>
                )}
            </div>
            <div className='w-1/2'>
                <ConsentPreview consent={consent} expiration={selectedDay}/>
            </div>
        </div>
    )
}