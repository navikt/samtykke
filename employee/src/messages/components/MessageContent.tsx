import { Accordion, BodyLong, Button } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MessageContent({
    description,
    reference
}: {
    description: string
    reference?: string
}): ReactElement {

    const navigate = useNavigate()

    return (
        <Accordion.Content className='space-y-2'>
            <BodyLong>{description}</BodyLong>
            {reference ? (
                <Button
                    variant='secondary'
                    size='small'
                    onClick={() => navigate(`/samtykke${reference}`)}
                >
                    Til samtykke
                </Button>
            ) : <></> }
        </Accordion.Content>
    )
}