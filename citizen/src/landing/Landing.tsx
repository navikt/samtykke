import { FillForms } from '@navikt/ds-icons'
import { Button, TextField } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import PageHeader from '../common/PageHeader'

export default function Landing(): ReactElement {
    return (
        <div className='mx-32 my-12'>
            <PageHeader 
                title='Gi nytt samtykke'
                icon={<FillForms className='align-middle text-[2rem] absolute -top-[1rem]' />}
            />
            <div className='flex flex-col items-center mt-24'>
                <div className='w-fit'>
                    <TextField 
                        label='Samtykke-kode'
                        description='Skriv inn koden for det spesifike samtykket'
                    />
                    <div className='flex justify-end w-full mt-2 pr-2'>
                        <Button>OK</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}