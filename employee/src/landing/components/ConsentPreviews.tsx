import { Accordion, BodyShort, Button } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { IConsent } from '../../types'

export default function ConsentPreviews({ consents }: { consents: IConsent[] | undefined}): ReactElement {
    
    const navigate = useNavigate()
    
    return (
        <Accordion>
            {consents?.map((item: IConsent, index: number) => {
                return (
                    <Accordion.Item key={index}>
                        <Accordion.Header>{item.title}</Accordion.Header>
                        <Accordion.Content>
                            <div className='flex flex-row items-center justify-between px-4 mt-2'>
                                <BodyShort>Kode: <b>{item.code}</b></BodyShort>
                                <Button 
                                    variant='secondary' 
                                    size="small" 
                                    onClick={() => navigate(`/samtykke/${item.code}`)}
                                >
                                    Til samtykke
                                </Button>
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>
                )
            })}
        </Accordion>
    )
}