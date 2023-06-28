import { Button } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ButtonMenu(): ReactElement {

    const navigate = useNavigate()

    return (
        <div className='flex justify-between my-4 px-2'>
            <Button variant='secondary' onClick={() => navigate('/')}>Avbryt</Button>
            <Button>Videre</Button>
        </div>
    )
}