import { FillForms } from '@navikt/ds-icons'
import React, { ReactElement } from 'react'
import PageHeader from '../common/PageHeader'
import ConsentSkeleton from '../consent/ConsentSkeleton'
import { IConsent } from '../types'

export default function GiveConsent({ consent }: { consent: IConsent}): ReactElement {
    return (
        <div className='mx-32 my-12'>
            <PageHeader 
                title="Gi samtykke"
                icon={<FillForms className='align-middle text-[2rem] absolute -top-[1rem]'/>}
            />
            <div className='mt-8'>
                <ConsentSkeleton consent={consent}/>
            </div>
        </div>
    )
}