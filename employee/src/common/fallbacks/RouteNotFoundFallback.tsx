import React, { ReactElement } from 'react'
import Header from '../header/Header'
import PageHeader from '../PageHeader'
import { QuestionmarkIcon } from '@navikt/aksel-icons'

export default function RouteNotFoundFallback(): ReactElement {
    return (
        <main className='flex-1 mt-10 px-4 lg:mt-10 lg:px-12'>
            <PageHeader 
                title='404 - Siden finnes ikke'
                icon={<QuestionmarkIcon />}
            />
        </main>
    )
}