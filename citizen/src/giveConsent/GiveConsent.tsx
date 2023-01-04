import { FillForms } from '@navikt/ds-icons'
import { Checkbox, CheckboxGroup, ConfirmationPanel, Heading, Panel, TextField } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import PageHeader from '../common/PageHeader'
import ConsentSkeleton from '../consent/ConsentSkeleton'
import { IConsent } from '../types'

export default function GiveConsent({ consent }: { consent: IConsent}): ReactElement {
    return (
        <div className='mx-32 my-12'>
            <PageHeader 
                title="Gi samtykke"
                icon={<FillForms className='align-middle text-[2rem] absolute -top-[1rem]'/>}
            />
            <div className='mt-8'>
                <ConsentSkeleton consent={consent}/>
                <Panel className='space-y-4'>
                    <CheckboxGroup
                        legend='Du takker ja til'
                        description='Kryss av boksene du føler deg komfertabel med'
                    >
                        <Checkbox>Ja, dere kan ta lydopptak</Checkbox>
                        <Checkbox>
                        Ja, dere kan beholde kontakteinformasjonen min i intill 6 måneder
                        i tilfelle det er behov for en oppfølgingssamtale
                        </Checkbox>
                    </CheckboxGroup>
                    <TextField label='Ditt navn' className='w-1/2'/>
                    <TextField label='Din e-post' className='w-1/2'/>
                    <Heading size='small'>Samtykke</Heading>
                    <ConfirmationPanel label='Ja, jeg samtykker'>
                        {`Jeg ønsker å delta i: ${consent.title}, og har lest og forstått samtykke`}
                    </ConfirmationPanel>
                </Panel>
            </div>
        </div>
    )
}