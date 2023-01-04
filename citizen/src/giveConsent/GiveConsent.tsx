import { FillForms } from '@navikt/ds-icons'
import React, { ReactElement } from 'react'
import PageHeader from '../common/PageHeader'

export default function GiveConsent(): ReactElement {
    return (
        <div className='mx-32 my-12'>
            <PageHeader 
                title="Gi samtykke"
                icon={<FillForms className='align-middle text-[2rem] absolute -top-[1rem]'/>}
            />
        </div>
    )
}