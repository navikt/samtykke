import React, { ReactElement } from 'react'
import { Button } from '@navikt/ds-react'
import { Email, Logout, People } from '@navikt/ds-icons'
import { useNavigate } from 'react-router-dom'

export default function ButtonMenu(): ReactElement {

    const navigate = useNavigate()

    return (
        <>
            <Button
                variant='tertiary'
                icon={<Email aria-hidden />}
                onClick={() => navigate('/meldinger')}
            >
                Meldinger
            </Button>
            <Button 
                variant="tertiary" 
                icon={<People aria-hidden />} 
                onClick={() => navigate('/')}
            >
                Min side
            </Button>
            <Button 
                variant='primary' 
                icon={<Logout aria-hidden />}
                onClick={() => window.location.replace('/ansatt/oauth2/logout')}
            >
                Logg ut
            </Button>
        </>
    )
}