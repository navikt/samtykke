import { BodyShort, Button, Link, Panel } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

export default function SignIn(): ReactElement {
    return (
        <Panel className='flex flex-col items-center h-80 gap-20'>
            <Link href='/innbygger'>
                <Button>Innlogging for innbyggere</Button>
            </Link>
            <BodyShort>Eller</BodyShort>
            <Link href='/ansatt'>
                <Button variant='secondary'>Innlogging for ansatte</Button>
            </Link>
        </Panel>
    )
}