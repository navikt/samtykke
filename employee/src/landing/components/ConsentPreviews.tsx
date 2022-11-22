import { Accordion, BodyShort, Button } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { IConsent } from '../../types'

export default function ConsentPreviews({ consents }: { consents: IConsent[] | undefined}): ReactElement {
    return (
        <Accordion>
            {consents?.map((item: IConsent, index: number) => {
                return (
                    <Accordion.Item key={index}>
                        <Accordion.Header>{item.title}</Accordion.Header>
                        <Accordion.Content>
                            <div className='flex flex-row items-center justify-between px-4'>
                                <BodyShort>Kode: <b>{item.code}</b></BodyShort>
                                <Button variant='secondary' size="small">Til samtykke</Button>
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>
                )
            })}
        </Accordion>
    )
}