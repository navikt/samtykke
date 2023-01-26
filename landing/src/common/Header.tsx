import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Heading } from '@navikt/ds-react'
import { Login } from '@navikt/ds-icons'

export default function Header(): ReactElement {
    const navigate = useNavigate()

    return (
        <div className="flex flex-wrap items-center gap-4 justify-between bg-[#fefefe] p-4 lg:p-12 w-full">
            <button onClick={() => navigate('/')}>
                <Heading as="span" size="xlarge" className="text-black">
                    Samtykke
                </Heading>
            </button>
            <div>
                <Button
                    variant="primary"
                    icon={<Login aria-hidden />}
                    onClick={() => navigate('/innlogging')}
                >
                    Logg inn
                </Button>
            </div>
        </div>
    )
}
