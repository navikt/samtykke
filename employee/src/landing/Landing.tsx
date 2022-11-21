import { People } from '@navikt/ds-icons'
import { Accordion, BodyShort, Button, Heading } from '@navikt/ds-react'
import React, { ReactElement, useState } from 'react'
import ContentPanel from '../common/ContentPanel'

export default function Landing(): ReactElement {

    const [employeeName, setEmployeeName] = useState<string>('Sabel Kaptein')

    return (
        <div>
            <div className='grid place-items-center my-12'>
                <People width="8rem" height="8rem" />
                <p className='text-2xl mt-2'>{employeeName}</p>
            </div>
            <ContentPanel>
                <Heading level="2" size="large">Aktive samtykker</Heading>
                <Accordion>
                    <Accordion.Item>
                        <Accordion.Header>
                            Brukertest hos nav
                        </Accordion.Header>
                        <Accordion.Content>
                            <div className='flex flex-row items-center justify-between px-4'>
                                <BodyShort>Kode: <b>1B3-98K</b></BodyShort>
                                <Button variant='secondary' size="small">Til samtykke</Button>
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Header>
                            Brukertest hos nav
                        </Accordion.Header>
                        <Accordion.Content>
                            Masse fint å lese here ja
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Header>
                            Brukertest hos nav
                        </Accordion.Header>
                        <Accordion.Content>
                            Masse fint å lese here ja
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
                <div className='flex flex-row justify-end'>
                    <Button variant='primary'>Nytt samtykke</Button>
                </div>
            </ContentPanel>
        </div>
    )
}