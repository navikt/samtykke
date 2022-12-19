import React, { ReactElement } from 'react'
import { Button, Heading } from '@navikt/ds-react'
import { Logout, Email, People } from '@navikt/ds-icons'
import { useNavigate } from 'react-router-dom'

export default function Header(): ReactElement {

    const navigate = useNavigate()

    return (
        <div className='w-full m-0 flex flex-row justify-between bg-[#fefefe] p-12'>
            <Heading size='xlarge'>Samtykke</Heading>
            <div>
                <Button 
                    variant="tertiary" 
                    icon={<Email />}
                    onClick={() => navigate('/meldinger')}
                >
                    Meldinger
                </Button>
                <Button 
                    variant="tertiary" 
                    icon={<People />} 
                    onClick={() => navigate('/')}
                >
                    Min side
                </Button>
                <Button variant='primary' icon={ <Logout />}>Logg ut</Button>
            </div>
        </div>
    )
}