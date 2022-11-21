import React, { ReactElement } from 'react'
import { Button, Heading, Link } from '@navikt/ds-react'
import { Logout, Email, People } from '@navikt/ds-icons'

export default function Header(): ReactElement {
    return (
        <div className='w-full m-0 flex flex-row justify-between bg-[#fefefe] p-12'>
            <Heading size='xlarge'>Samtykke</Heading>
            <div>
                <Button variant="tertiary" icon={<Email />}>Meldinger</Button>
                <Button variant="tertiary" icon={<People />}>Min side</Button>
                <Button variant='primary' icon={ <Logout />}>Logg ut</Button>
            </div>
        </div>
    )
}