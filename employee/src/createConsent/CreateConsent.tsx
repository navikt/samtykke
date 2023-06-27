import { Button, Panel, Textarea, TextField, DatePicker, useDatepicker, RangeValidationT, DateValidationT } from '@navikt/ds-react'
import React, { ReactElement, useState } from 'react'
import { Edit } from '@navikt/ds-icons'
import PageHeader from '../common/PageHeader'
import ConsentPreview from './components/ConsentPreview'
import { useNavigate } from 'react-router-dom'
import { IConsentBase } from '../types'
import { getYesterdayDate, getExpirationLimitDate, convertToJavaLocalDate } from '../utils/date'
import PurposeReadMore from './components/PurposeReadMore'
import SlackChannelModal from './components/SlackChannelModal'
import { useController, useForm, useFormContext } from 'react-hook-form'

export default function CreateConsent(): ReactElement {

    const navigate = useNavigate()

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        control, 
        getValues, 
        watch 
    } = useForm<IConsentBase>({
        defaultValues: {
            totalInvolved: 1
        }
    })

    const [dateError, setDateError] = useState<DateValidationT | null>(null)

    const { field: expirationField, fieldState: expirationFieldState } = useController({
        name: 'expiration',
        control,
        rules: {
            validate: (expirationValue) => {
                if (!expirationValue) {
                    return 'Du må sette en utløpsdato'
                } 
                return undefined
            }
        },
        defaultValue: undefined
    })

    const { datepickerProps, inputProps } = useDatepicker({
        disabled: [
            { from: new Date('Jan 1 1964'), to: getYesterdayDate() },
            { from: getExpirationLimitDate(), to: new Date('Jan 1 2088')}
        ],
        onDateChange: (value) => { value && expirationField.onChange(value) },
        onValidate: setDateError
    })
    
    const [openSlackChannelModal, setOpenSlackChannelModal] = useState<boolean>(false)
    
    return (
        <div className='mx-32 my-12 flex space-x-6'>
            <div className='w-1/2'>
                <PageHeader 
                    title="Nytt samtykke"
                    icon={<Edit className='align-middle text-[2rem] absolute -top-[1rem]'/>}
                />
                <form onSubmit={handleSubmit(() => setOpenSlackChannelModal(true))}>
                    <Panel className='mt-8 space-y-4'>
                        <TextField
                            {...register('title', {
                                required: {
                                    value: true,
                                    message: 'Du må sette en tittel'
                                }
                            })}
                            label="Tittel"
                            error={errors.title?.message}                  
                        />
                        <TextField
                            {...register('responsibleGroup', {
                                required: {
                                    value: true,
                                    message: 'Du må sette et team/seksjon'
                                }
                            })} 
                            label='Team/seksjon'
                            description='Produktområde, seksjon eller avdeling i NAV som er ansvarlige for samtykket'
                            error={errors.responsibleGroup?.message}
                        />
                        <TextField
                            {...register('theme', {
                                required: {
                                    value: true,
                                    message: 'Du må sette et tema'
                                }
                            })}
                            label='Tema'
                            error={errors.theme?.message}
                        />
                        <Textarea
                            {...register('purpose', {
                                required: {
                                    value: true,
                                    message: 'Du må sette et formål'
                                }
                            })}
                            label="Formålet med samtykket"
                            description={<PurposeReadMore />}
                            error={errors.purpose?.message}
                        />
                        <Textarea
                            {...register('endResult', {
                                required: {
                                    value: true,
                                    message: 'Du må sette et sluttresultat'
                                }
                            })}
                            label='Sluttresultat'
                            description='Det dataen generert i undersøkelsen skal brukes til'
                            error={errors.endResult?.message}
                        />
                        <div className='flex flex-row space-x-12'>
                            <div>
                                <TextField
                                    {...register('totalInvolved', {
                                        min: {
                                            value: 1,
                                            message: 'Det må være minst 1 involert'
                                        }
                                    })}
                                    type='number'
                                    label='Antall involverte'
                                    error={errors.totalInvolved?.message}
                                />
                            </div>
                            <DatePicker {...datepickerProps}>
                                <DatePicker.Input
                                    {...inputProps} 
                                    id={expirationField.name}
                                    label="Utløpsdato"
                                    error={expirationFieldState.error?.message}
                                />
                            </DatePicker>
                        </div>
                    </Panel>
                    <div className='flex justify-between my-4 px-2'>
                        <Button variant='secondary' onClick={() => navigate('/')}>Avbryt</Button>
                        <Button>Videre</Button>
                    </div>
                </form>
            </div>
            <div className='w-1/2'>
                <ConsentPreview consent={{ ...watch() }} />
            </div>
            <SlackChannelModal 
                open={openSlackChannelModal}
                setOpen={setOpenSlackChannelModal}
                consent={{ ...getValues() }}
            />
        </div>
    )
}