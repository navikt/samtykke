import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heading } from '@navikt/ds-react'
import DropdownMenu from './components/DropdownMenu'
import ButtonMenu from './components/ButtonMenu'

export default function Header(): ReactElement {

    const navigate = useNavigate()

    return (
        <header className='flex flex-row items-center gap-4 justify-between bg-[#fefefe] p-4 lg:p-12 w-full'>
            <button onClick={() => navigate('/')}>
                <Heading size='xlarge' className='text-black' level="1">Samtykke</Heading>
            </button>
            <div className='hidden lg:flex'>
                <ButtonMenu />
            </div>
            <div className='lg:hidden'>
                <DropdownMenu />
            </div>
        </header>
    )
}