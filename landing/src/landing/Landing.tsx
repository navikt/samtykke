import { Right } from '@navikt/ds-icons'
import { Button, Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import reops from '../assets/reops.png'

export default function Landing(): ReactElement {
    return (
        <div className='bg-[#75c4c5] h-[calc(100vh-148px)]'>
            <div className='flex flex-col items-center py-12 space-y-4'>
                <Heading size='xlarge'>Gi ditt samtykke</Heading>
                <div className='text-center px-64'>
                    <Heading size="small">
                        I samtykke-løsningen kan du gi ditt digitale samtykke til
                        brukertester og innsiktsarbied for forbedringen av NAVs tjenester
                    </Heading>
                </div>
                <Button icon={<Right aria-hidden />} iconPosition="right">Til samtykke</Button>
            </div>
            <img
                src={reops}
                alt="Illustrasjon av mennesker som bærer forskjellige geometrisk objekter."
            />
        </div>
    )
}