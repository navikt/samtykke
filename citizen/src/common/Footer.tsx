import { HandsHeart } from '@navikt/ds-icons'
import { Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

export default function Footer(): ReactElement {
    return (
        <footer className='flex flex-row items-center gap-4 justify-between bg-[#e0d8e9] p-4 lg:p-12 w-full'>
            <div className='flex flex-row items-center space-x-2'>
                <Heading size="medium" as="span">Laget av #ResearchOps med kjærleik</Heading>
                <HandsHeart height={'2rem'} width={'2rem'} aria-hidden />
            </div>
            <button>
                <Heading size='medium' className='hover:underline' as="span">Personvernerklæring</Heading>
            </button>
        </footer>
    )
}