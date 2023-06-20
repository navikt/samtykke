import { Findout, Logout } from '@navikt/ds-icons'
import { Button } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ButtonMenu(): ReactElement {

    const navigate = useNavigate()

    return (
        <>
            <Button 
                variant='tertiary' 
                icon={<Findout aria-hidden />}
                onClick={() => navigate('/samtykker')}
            >
                Se aktive samtykker
            </Button>
            <Button 
                icon={<Logout aria-hidden />}
                onClick={() => window.location.replace('/innbygger/oauth2/logout')}
            >
                Logg ut
            </Button>
        </>
    )
}