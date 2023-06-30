import React, { ReactElement } from 'react'
import PageHeader from '../common/PageHeader'
import { Information } from '@navikt/ds-icons'
import { Panel, Heading, BodyLong } from '@navikt/ds-react'

export default function PrivacyStatement(): ReactElement {
    return (
        <main className='flex-1 mt-10 px-4 lg:mt-10 lg:px-12'>
            <PageHeader 
                title='Personvernerklæring'
                icon={<Information />}
            />
            <div className='mt-8 space-y-4'>
                <Panel>
                    <Heading size='large' level="2">
                        Hvem har ansvaret for hvordan vi behandler personopplysninger?
                    </Heading>
                    <BodyLong>
                        Her kommer masse kjedelig tekst om personvern blablabla
                    </BodyLong>
                </Panel>
                <Panel>
                    <Heading size='large' level="2">
                        Hvem har ansvaret for hvordan vi behandler personopplysninger?
                    </Heading>
                    <BodyLong>
                        Her kommer masse kjedelig tekst om personvern blablabla
                    </BodyLong>
                </Panel>
                <Panel>
                    <Heading size='large' level="2">
                        Hvem har ansvaret for hvordan vi behandler personopplysninger?
                    </Heading>
                    <BodyLong>
                        Her kommer masse kjedelig tekst om personvern blablabla
                    </BodyLong>
                </Panel>
            </div>
        </main>
    )
}