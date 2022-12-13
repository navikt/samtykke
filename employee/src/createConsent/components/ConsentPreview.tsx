import { BodyLong, BodyShort, Checkbox, CheckboxGroup, ConfirmationPanel, Heading, Panel } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { IConsent } from '../../types'

export default function ConsentPreview({ consent }: { consent: IConsent}): ReactElement {
    return (
        <div>
            <div className='bg-blue-50 p-4'>
                <Heading size="small">Forhåndsvisning av samtykkeskjema</Heading>
            </div>
            <Panel className='space-y-4'>
                <Heading size="medium">
                    Samtykke for: {consent.title ? consent.title : '<tittel kommer her>'}
                </Heading>
                <Heading size="small">Hva er formålet med dette samtykket?</Heading>
                <BodyLong>{consent.description ? consent.description : '<formål kommer her>'}</BodyLong>
                <Heading size="small">Hvordan behandler vi dine personopplysninger?</Heading>
                <BodyLong>Ved å fylle ut og (sende inn) dette skjema samtykker du til at vi lagrer dine kontaktopplysninger og de opplysningene som fremkommer under intervjuet. Disse personopplysningene vil for en begrenset periode lagres i NAVs systemer med tilgangsstyring: Personopplysningene vil kun brukes til denne undersøkelsen.</BodyLong>
                <BodyLong>I denne undersøkelsen er det kun (antall) person som har tilgang til dine personopplysninger. Disse personene har taushetsplikt. dvs. plikt til å hemmeligholde opplysningene og hindre at uvedkomne får tilgang.</BodyLong>
                <BodyLong>Når intervjuet er ferdig, vil svarene dine anonymiseres. Anonymiseringen gjennomføres så fort som mulig. Opplysningene som kan lede tilbake til deg slettes så snart anonymiseringen er gjennomført og senest innen (6) måneder.</BodyLong>
                <BodyLong>Nav Arbeids- og velferdsdirektoratet har ansvaret for behandlingen av personopplysningene dine.</BodyLong>
                <Heading size="small">Må jeg delta i denne brukerundersøkelsen?</Heading>
                <BodyLong>Nei det er frivillig å delta. Mottar du tjenester fra NAV, vil ikke deltakelse i denne undersøkelsen påvirke dine rettigheter i NAV. Vi har ikke tilgang til dine saker. Andre i NAV får heller ikke vite hvem som deltar i undersøkelsen, og opplysningene du gir kan ikke kobles til dine saker.</BodyLong>
                <Heading size="small">Dine rettigheter</Heading>
                <ul className='list-disc list-outside pl-6 space-y-1'>
                    <li>
                        Det er frivillig å delta. Du kan når som helst trekke tilbake samtykke underveis i intervjuet, eller etter at det er ferdig uten å oppgi grunn.
                    </li>
                    <li>
                        Du har rett til å få innsyn i hvilke opplysninger vi behandler om deg, og å få utlevert en kopi av opplysningene
                    </li>
                    <li>
                        Du har rett til å få rettet opplysninger om deg som er feil eller misvisende
                    </li>
                    <li>
                        Du har rett til å få slettet dine personopplysninger
                    </li>
                    <li>
                        Du har rett til å sende klage til Datatilsynet om behandlingen av dine personopplysninger
                    </li>
                </ul>
                <Heading size='small'>Du takker ja til</Heading>
                <CheckboxGroup
                    legend='Kryss av boksene du føler deg komfertabel med'
                    disabled
                >
                    <Checkbox>Ja, dere kan ta lydopptak</Checkbox>
                    <Checkbox>Ja, dere kan ta videooptak</Checkbox>
                    <Checkbox>Ja, dere kan gjøre blikksporing</Checkbox>
                </CheckboxGroup>
                <Heading size='small'>Samtykke</Heading>
                <ConfirmationPanel
                    label='Ja, jeg samtykker'
                    disabled
                >
                    {`Jeg ønsker å delta i: ${consent.title}, og har lest og forstått samtykke`}
                </ConfirmationPanel>
            </Panel>
        </div>
    )
}