import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Heading } from '@navikt/ds-react'
import { Findout, Logout } from '@navikt/ds-icons'

export default function Header(): ReactElement {

    const navigate = useNavigate()

    return (
        <div className='w-full m-0 flex flex-row justify-between bg-[#fefefe] p-12'>
            <button onClick={() => navigate('/')}>
                <Heading size='xlarge' className='text-black'>Samtykke</Heading>
            </button>
            <div>
                <Button 
                    variant='tertiary' 
                    icon={<Findout />}
                    onClick={() => navigate('/samtykker')}
                >
                    Se aktive samtykker
                </Button>
                <Button 
                    icon={ <Logout />}
                    onClick={() => window.location.replace(`${window.location.protocol}://${window.location.host}/innbygger/oauth2/logout`)}
                >Logg ut</Button>
            </div>
        </div>
    )
}