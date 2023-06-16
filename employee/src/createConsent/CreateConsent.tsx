import { Alert, Button, Panel, Textarea, TextField, DatePicker, useDatepicker } from '@navikt/ds-react'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import { Edit } from '@navikt/ds-icons'
import PageHeader from '../common/PageHeader'
import ConsentPreview from './components/ConsentPreview'
import { useNavigate } from 'react-router-dom'
import { IConsentBase } from '../types'
import { getYesterdayDate, getExpirationLimitDate, convertToJavaLocalDate } from '../utils/date'
import PurposeReadMore from './components/PurposeReadMore'
import SlackChannelModal from './components/SlackChannelModal'

export default function CreateConsent(): ReactElement {

    const navigate = useNavigate()

    const [consent, setConsent] = useState<IConsentBase>({
        title: '',
        responsibleGroup: '',
        theme: '',
        purpose: '',
        expiration: undefined,
        totalInvolved: 1,
        endResult: '',
        slackChannelId: ''
    })
    
    const [openSlackChannelModal, setOpenSlackChannelModal] = useState<boolean>(false)

    const [titleErrorMessage, setTitleErrorMessage] = useState<string>('')
    const [responsibleGroupErrorMessage, setResponsibleGroupErrorMessage] = useState<string>('')
    const [themeErrorMessage, setThemeErrorMessage] = useState<string>('')
    const [purposeErrorMessage, setPurposeErrorMessage] = useState<string>('')
    const [totalInvolvedErrorMessage, setTotalInvovledErrorMessage] = useState<string>('')
    const [expirationErrorMessage, setExpiraitonErrorMessage] = useState<string>('')
    const [endResultErrorMessage, setEndResultErrorMessage] = useState<string>('')

    const { datepickerProps, inputProps, selectedDay } = useDatepicker({
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

    const onNext = async () => {
        let isError = false

        if (selectedDay) {
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

        if (consent.theme.length === 0) {
            setThemeErrorMessage('Du må sette et tema')
            isError = true
        } else {
            setThemeErrorMessage('')
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

        if (consent.endResult.length === 0) {
            setEndResultErrorMessage('Du må sette et sluttresultat')
            isError = true
        } else {
            setEndResultErrorMessage('')
        }

        if (consent.totalInvolved < 1) {
            setTotalInvovledErrorMessage('Det må være minst 1 involert')
            isError = true
        } else {
            setTotalInvovledErrorMessage('')
        }

        if (!isError) {
            setConsent({
                ...consent,
                expiration: convertToJavaLocalDate(selectedDay!)
            })
            setOpenSlackChannelModal(true)
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
                        description='Produktområde, seksjon eller avdeling i NAV som er ansvarlige for samtykket'
                        value={consent.responsibleGroup || ''}
                        onChange={handleConsentChange}
                        error={responsibleGroupErrorMessage}
                    />
                    <TextField
                        label='Tema'
                        name='theme'
                        value={consent.theme || ''}
                        onChange={handleConsentChange}
                        error={themeErrorMessage}
                    />
                    <Textarea 
                        label="Formålet med samtykket"
                        name='purpose'
                        description={<PurposeReadMore />}
                        value={consent.purpose || ''}
                        onChange={handleConsentChange}
                        error={purposeErrorMessage}
                    />
                    <Textarea 
                        label='Sluttresultat'
                        name='endResult'
                        description='Det dataen generert i undersøkelsen skal brukes til'
                        value={consent.endResult || ''}
                        onChange={handleConsentChange}
                        error={endResultErrorMessage}
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
                        <DatePicker {...datepickerProps}
                            disabled={[
                                { from: new Date('Jan 1 1964'), to: getYesterdayDate() },
                                { from: getExpirationLimitDate(), to: new Date('Jan 1 2088')}
                            ]}
                        >
                            <DatePicker.Input
                                {...inputProps} 
                                label="Utløpsdato"
                                error={expirationErrorMessage}
                                onSelect={() => {
                                    setConsent({
                                        ...consent,
                                        expiration: selectedDay
                                    })
                                }}
                            />
                        </DatePicker>
                    </div>
                </Panel>
                <div className='flex justify-between my-4 px-2'>
                    <Button variant='secondary' onClick={() => navigate('/')}>Avbryt</Button>
                    <Button onClick={onNext}>Videre</Button>
                </div>
            </div>
            <div className='w-1/2'>
                <ConsentPreview consent={consent} expiration={selectedDay}/>
            </div>
            <SlackChannelModal 
                open={openSlackChannelModal}
                setOpen={setOpenSlackChannelModal}
                consent={consent}
            />
        </div>
    )
}