import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Heading } from '@navikt/ds-react'
import { Login } from '@navikt/ds-icons'

export default function Header(): ReactElement {

    const navigate = useNavigate()

    return (
        <div className='w-full m-0 flex flex-row justify-between bg-[#fefefe] p-12'>
            <Heading size='xlarge'>Samtykke</Heading>
            <div>
                <Button 
                    variant='primary' 
                    icon={<Login aria-hidden />}
                    onClick={() => navigate('/innlogging')}
                >
                    Logg inn
                </Button>
            </div>
        </div>
    )
}