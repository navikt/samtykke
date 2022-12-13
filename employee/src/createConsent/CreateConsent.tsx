import { Heading, Panel } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { Edit } from '@navikt/ds-icons'
import PageHeader from '../common/PageHeader'

export default function CreateConsent(): ReactElement {
    return (
        <div className='mx-32 mt-12'>
            <PageHeader 
                title="Nytt samtykke"
                icon={<Edit className='align-middle text-[2rem] absolute -top-[1rem]'/>}
            />
        </div>
    )
}