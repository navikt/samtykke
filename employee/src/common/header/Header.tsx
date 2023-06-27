import React, { ReactElement } from 'react'
import { Heading } from '@navikt/ds-react'
import { useNavigate } from 'react-router-dom'
import ButtonMenu from './components/ButtonMenu'
import DropdownMenu from './components/DropdownMenu'

export default function Header(): ReactElement {

    const navigate = useNavigate()

    return (
        <div className='flex flex-row items-center gap-4 justify-between bg-[#fefefe] p-4 lg:p-12 w-full'>
            <button onClick={() => navigate('/')}>
                <Heading as="span" size='xlarge' className='text-black'>Samtykke</Heading>
            </button>
            <div className='hidden lg:flex'>
                <ButtonMenu />
            </div>
            <div className='lg:hidden'>
                <DropdownMenu />
            </div>
        </div>
    )
}