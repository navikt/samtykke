import { Button, Panel, Textarea, TextField } from '@navikt/ds-react'
import React, { ReactElement, useState } from 'react'
import { Edit } from '@navikt/ds-icons'
import PageHeader from '../common/PageHeader'
import ConsentPreview from './components/ConsentPreview'
import { useNavigate } from 'react-router-dom'
import { IConsentBase } from '../types'
import PurposeReadMore from './components/PurposeReadMore'
import SlackChannelModal from './components/SlackChannelModal'
import { useForm } from 'react-hook-form'
import ExpirationDatePicker from './components/ExpirationDatePicker'
import ButtonMenu from './components/ButtonMenu'

export default function CreateConsent(): ReactElement {

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
    
    const [openSlackChannelModal, setOpenSlackChannelModal] = useState<boolean>(false)
    
    return (
        <div className='flex flex-col lg:flex-row mt-10 px-4 lg:mt-10 lg:px-12 lg:space-x-4'>
            <div className='lg:w-1/2'>
                <PageHeader 
                    title="Nytt samtykke"
                    icon={<Edit />}
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
                            <ExpirationDatePicker control={control} />
                        </div>
                    </Panel>
                    <div className='hidden lg:grid'>
                        <ButtonMenu />
                    </div>
                </form>
            </div>
            <div className='mt-8 lg:w-1/2 lg:mt-0'>
                <ConsentPreview consent={{ ...watch() }} />
            </div>
            <div className='lg:hidden'>
                <ButtonMenu />
            </div>
            <SlackChannelModal 
                open={openSlackChannelModal}
                setOpen={setOpenSlackChannelModal}
                consent={{ ...getValues() }}
            />
        </div>
    )
}