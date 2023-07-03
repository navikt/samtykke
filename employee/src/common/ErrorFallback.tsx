import React, { ReactElement } from 'react'
import Header from './header/Header'
import PageHeader from './PageHeader'
import { XMarkOctagonIcon } from '@navikt/aksel-icons'
import { Alert } from '@navikt/ds-react'

export default function ErrorFallback(): ReactElement {
    return (
        <>
            <Header />
            <main className='flex-1 mt-10 px-4 lg:mt-10 lg:px-12'>
                <PageHeader 
                    title='Feil i systemet'
                    icon={<XMarkOctagonIcon />}                
                />
                <Alert variant='error' className='mt-10'>
                    Noe har feilet i samtykke-løsningen, vennligst meld inn feilen til #researchops.
                </Alert>
            </main>
        </>
    )
}