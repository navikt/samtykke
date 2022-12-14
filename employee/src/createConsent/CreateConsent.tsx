import { Button, Heading, Panel, Textarea, TextField, UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import { Edit } from '@navikt/ds-icons'
import PageHeader from '../common/PageHeader'
import ConsentPreview from './components/ConsentPreview'
import { useNavigate } from 'react-router-dom'
import { IConsent } from '../types'
import { getYesterdayDate, getExpirationLimitDate } from './utils/date'
import { SubmitHandler, useForm } from 'react-hook-form'

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

    const { register, formState: { errors }, handleSubmit } = useForm<IConsentInputs>()
    
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

    const onCreateConsent: SubmitHandler<IConsentInputs> = (data) => {
        // TODO: Set consent code
    }


    return (
        <div className='mx-32 my-12 flex space-x-6'>
            <div className='w-1/2'>
                <PageHeader 
                    title="Nytt samtykke"
                    icon={<Edit className='align-middle text-[2rem] absolute -top-[1rem]'/>}
                />
                <form className='space-y-4' onSubmit={handleSubmit(onCreateConsent)}>
                    <div className='mt-8 space-y-4 bg-white p-4'>
                        <TextField
                            {...register('title', { 
                                minLength: { 
                                    value: 5, message: 'Tittelen må være lengre enn 5 bokstaver'
                                },
                                maxLength: {
                                    value: 30, message: 'Tittelen må være under 30 bokstaver'
                                }})}
                            label="Tittel"
                            error={errors?.title?.message}
                        />
                        <Textarea
                            {...register('description', {
                                minLength: {
                                    value: 20,
                                    message: 'Formålet må være lengre enn 20 bokstaver'
                                },
                                maxLength: {
                                    value: 300,
                                    message: 'Formålet må være under 300 bokstaver'
                                }
                            })}
                            label="Formålet med samtykket"
                            error={errors?.description?.message}
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
                    </div>
                    <div className='flex justify-between mt-4 px-2'>
                        <Button variant='secondary' onClick={() => navigate('/')}>Avbryt</Button>
                        <Button type="submit">Opprett samtykkeskjema</Button>
                    </div>
                </form>
            </div>
            <div className='w-1/2'>
                <ConsentPreview consent={consent}/>
            </div>
        </div>
    )
}