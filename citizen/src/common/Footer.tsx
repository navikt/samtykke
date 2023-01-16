import { HandsHeart } from '@navikt/ds-icons'
import { Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

export default function Footer(): ReactElement {
    return (
        <div className='flex flex-row justify-between m-0 p-12 bg-[#e0d8e9] bottom-0 w-full'>
            <div className='flex flex-row items-center space-x-2'>
                <Heading size="medium">Laget av #ResearchOps med kjærleik</Heading>
                <HandsHeart className='text-[2rem]' />
            </div>
            <button>
                <Heading size='medium' className='hover:underline'>Personvernsavklaring</Heading>
            </button>
        </div>
    )
}