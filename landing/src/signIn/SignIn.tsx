import { BodyShort, Button, Link, Panel } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

export default function SignIn(): ReactElement {
    return (
        <div className='flex justify-center mt-10'>
            <Panel className='flex flex-col items-center gap-16 w-fit'>
                <Link href='/innbygger' className='pt-5'>
                    <Button>Innlogging for innbyggere</Button>
                </Link>
                <div className='inline-flex justify-center items-center w-full'>
                    <hr className="my-8 w-[35rem] h-px bg-gray-200 border-1" />
                    <BodyShort
                        className='absolute left-1/2 px-3 font-medium text-gray-900 bg-white -translate-x-1/2'
                    >Eller</BodyShort>
                </div>
                <Link href='/ansatt' className='pb-5'>
                    <Button variant='secondary'>Innlogging for ansatte</Button>
                </Link>
            </Panel>
        </div>
    )
}