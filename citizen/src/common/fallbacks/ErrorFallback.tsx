import React, { ReactElement } from 'react'
import PageHeader from '../PageHeader'
import { Alert, Link } from '@navikt/ds-react'
import { XMarkOctagonIcon } from '@navikt/aksel-icons'
import Header from '../header/Header'
import Footer from '../Footer'

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
                    Noe har feilet i samtykke-løsningen,
                    {' '}
                    <Link
                        // This link is not verified for use yet, is simply a placeholder
                        href='https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler'
                        target='_blank'
                    >
                        vennligst meld inn feilen til NAV.
                    </Link>
                </Alert>
            </main>  
            <Footer />
        </>
    )
}