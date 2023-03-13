import { ReadMore } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

export default function PurposeReadMore(): ReactElement {
    return (
        <ReadMore header='Hvordan formulerer jeg formålet med samtykket?'>
            Her må du tilpasse samtykke til ditt prosjekt. Pass på at deltakerens
            relasjon til NAV ikke røpes, og samtykket heller ikke inneholder andre
            taushetsbelagte opplysninger eller personopplysninger av særlig kategori.
            Det vil for eksempel si at det ikke kan stå i samtykke at vi ønsker å 
            intervjue personer som mottar sykepenger, eller at vi skal intervjue unge 
            sykemeldte med en bestemt diagnose. Derfor har vi valgt formuleringen: 
            «tanker og eventuelle erfaringer med». Beskriv prosjektet så kort som mulig.
        </ReadMore>
    )
}