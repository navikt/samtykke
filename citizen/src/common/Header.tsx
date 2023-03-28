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
                    onClick={() => window.location.replace('https://oidc-ver2.difi.no/idporten-oidc-provider/endsession')}
                >Logg ut</Button>
            </div>
        </div>
    )
}