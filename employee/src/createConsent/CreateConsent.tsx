import { Button, Heading, Panel, Textarea, TextField, UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { Edit } from '@navikt/ds-icons'
import PageHeader from '../common/PageHeader'
import ConsentPreview from './components/ConsentPreview'
import { useNavigate } from 'react-router-dom'

export default function CreateConsent(): ReactElement {

    const navigate = useNavigate()

    const { datepickerProps, inputProps, selectedDay } = UNSAFE_useDatepicker({
        fromDate: new Date('Aug 23 2019'),
    })

    return (
        <div className='mx-32 my-12 flex space-x-6'>
            <div className='w-1/2'>
                <PageHeader 
                    title="Nytt samtykke"
                    icon={<Edit className='align-middle text-[2rem] absolute -top-[1rem]'/>}
                />
                <Panel className='mt-8 space-y-4'>
                    <TextField label="Tittel"/>
                    <Textarea label="Formålet med samtykket"/>
                    <UNSAFE_DatePicker {...datepickerProps}>
                        <UNSAFE_DatePicker.Input {...inputProps} label="Utløpsdato"/>
                    </UNSAFE_DatePicker>
                </Panel>
                <div className='flex justify-between mt-4 px-2'>
                    <Button variant='secondary' onClick={() => navigate('/')}>Avbryt</Button>
                    <Button>Opprett samtykkeskjema</Button>
                </div>
            </div>
            <div className='w-1/2'>
                <ConsentPreview consent={{
                    title: 'Videomøte med bruker',
                    description: 'Ja her skal vi teste masse kule greier, kommer til å bli sjukt fett!',
                    code: 'fff',
                    expiration: new Date(),
                    candidates: []
                }}/>
            </div>
        </div>
    )
}