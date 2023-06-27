import { BodyLong, BodyShort, Checkbox, CheckboxGroup, ConfirmationPanel, Heading, Link, Panel, TextField } from '@navikt/ds-react'
import axios, { AxiosError } from 'axios'
import React, { ReactElement, useEffect, useState } from 'react'
import config from '../../config'
import { IConsent, IConsentBase, IEmployee } from '../../types'
import { getDSISODateString } from '../../utils/date'
export default function ConsentPreview({ 
    consent
}: { 
    consent: IConsentBase,
}): ReactElement {
    
    const [employee, setEmployee] = useState<IEmployee>()

    const getCurrentEmployee = async () => {
        try {
            const { data }: { data: IEmployee } = await axios.get(`${config.apiPath}/currentEmployee`)
            setEmployee(data)
        } catch (error) {
            if (error instanceof AxiosError) setEmployee({
                firstname: 'Navn',
                lastname: 'Navnesen',
                email: 'navn.navnesen@nav.no',
                consents: [],
                messages: []
            })
        }
    }

    useEffect(() => {
        getCurrentEmployee()
    }, [])

    return (
        <div>
            <div className='bg-blue-50 p-4'>
                <Heading size="small">Forhåndsvisning av samtykkeskjema</Heading>
            </div>
            <Panel className='space-y-4'>
                <Heading size="medium" className='flex flex-row'>
                    Samtykke for:
                    &nbsp;
                    <span className='bg-blue-50'>
                        {consent.title ? consent.title : '<tittel>'}
                    </span>
                </Heading>
                <BodyLong>
                    Du er invitert i denne undersøkelsen fordi du har vist en interesse for 
                    å dele noen refleksjoner med oss om NAVs tjenester eller ytelser.
                </BodyLong>
                <Heading size="small">Hvem er vi, og hvem er ansvarlig for undersøkelsen?</Heading>
                <BodyLong>
                    Vi er ansatte i: 
                    &nbsp;
                    <span className='bg-blue-50'>
                        {consent.responsibleGroup ? consent.responsibleGroup : '<team/seksjon>'}
                    </span>
                    &nbsp; 
                    til Arbeid- og velferdsdirektoratet (NAV). Vi jobber med å forbedre NAVs
                    tjenester gjennom å involvere personer som bruker, eller kan komme til å
                    bruke dem. 
                </BodyLong>
                <BodyLong>
                    Har du spørsmål om undersøkelsen eller ønsker å vite mer om eller benytte
                    deg av <u>dine rettigheter</u> kan du kontakte ansvarlig for undersøkelsen,
                    &nbsp; 
                    <span className='bg-blue-50'>
                        {` ${employee?.firstname} ${employee?.lastname}`}    
                    </span>
                    &nbsp;
                    på e-post: 
                    &nbsp;
                    <span className='bg-blue-50'>
                        {employee?.email}
                    </span>.
                </BodyLong>
                <BodyLong>
                    Nav Arbeids- og Velferdsdirektoratet har ansvaret for behandlingen av
                    personopplysningene dine. 
                </BodyLong>
                <Heading size="small">Hva må du gjøre hvis du velger å delta i denne undersøkelsen?</Heading>
                <BodyLong>
                    Vi ønsker at du deltar i et intervju hvor vi spør deg om dine tanker og
                    eventuelle erfaringer med 
                    &nbsp;
                    <span className='bg-blue-50'>
                        {consent.theme ? consent.theme : '<tema>'}
                    </span>
                    &nbsp;
                    hos NAV. Hva du svarer og om du vil svare på spørsmålene bestemmer du selv.
                    Formålet med undersøkelsen er å 
                    &nbsp;
                    <span className='bg-blue-50'>
                        {consent.purpose ? consent.purpose : '<formål>'}
                    </span>.
                </BodyLong>
                <BodyShort>
                    Samtalen gjøres på video, telefon eller fysisk. Intervjuet kan vare i
                    (opptill en time). 
                </BodyShort>
                <Heading size='small'>Må jeg delta i denne undersøkelsen?</Heading>
                <BodyLong>
                    Nei det er <b>frivillig</b> å delta. Mottar du tjenester fra NAV vil ikke
                    deltakelsen i denne undersøkelsen påvirke dine rettigheter i NAV. Vi har ikke
                    tilgang til dine saker. Andre i NAV får heller ikke vite hvem som deltar
                    i undersøkelsen, og opplysningene du gir kan ikke kobles til dine saker. 
                </BodyLong>
                <Heading size='small'>Hvordan behandler vi personopplysningene dine?</Heading>
                <BodyLong>
                    Med samtykket ditt vil vi midlertidig lagre dine kontaktopplysninger og notere
                    ned de opplysningene som blir sagt under intervjuet. Vi ønsker også å ta opp
                    intervjuet med lydopptaker, for å lettere kunne skrive ned det du sier. Vi vil
                    bare bruker opplysningene om deg fra intervjuet til gjennomføring av denne
                    undersøkelsen.
                </BodyLong>
                <BodyLong>
                    Personalopplysningene dine blir lagret i en kort periode. Det er 
                    &nbsp;
                    <span className='bg-blue-50'>
                        {consent.totalInvolved > 0 ? consent.totalInvolved : '<antall-involverte>'}
                    </span>
                    &nbsp;
                    person(er) som har tilgang til dine opplysninger. Det er kun disse personene som 
                    jobber med denne undersøkelsen i NAV, som har tilgang til opplysningne. De har
                    taushetsplikt
                </BodyLong>
                <BodyLong>
                    Når intervjuet er ferdig, vil svarene anonymiseres. Anonymiseringen gjennomføres
                    så fort som mulig. Opplysningene som kan lede tilbake til deg slettes så snart
                    anonymiseringen er gjennomført og senest innen 
                    &nbsp;
                    <span className='bg-blue-50'>
                        {consent.expiration ? getDSISODateString(consent.expiration) : '<utløper>'}
                    </span>. De anonyme dataene vil brukes til 
                    &nbsp;
                    <span className='bg-blue-50'>
                        {consent.endResult ? consent.endResult : '<sluttresultat>'}
                    </span>.
                </BodyLong>
                <Heading size="small">Dine rettigheter</Heading>
                <ul className='list-disc list-outside pl-6 space-y-1'>
                    <li>
                        Det er frivillig å delta. Du kan når som helst trekke tilbake samtykke underveis 
                        i intervjuet, eller etter at det er ferdig uten å oppgi grunn.
                    </li>
                    <li>
                        Du har rett til å få innsyn i hvilke opplysninger vi behandler om deg, og å få 
                        utlevert en kopi av opplysningene.
                    </li>
                    <li>
                        Du har rett til å få rettet opplysninger om deg som er feil eller misvisende.
                    </li>
                    <li>
                        Du har rett til å få slettet dine personopplysninger.
                    </li>
                    <li>
                        {'Du har rett til å '} 
                        <Link 
                            href='https://www.datatilsynet.no/om-datatilsynet/kontakt-oss/klage-til-datatilsynet/'
                            target='_blank'
                        >
                            sende klage til Datatilsynet
                        </Link> 
                        {' om behandlingen av dine personopplysninger.'}
                    </li>
                </ul>
                <div>
                    <BodyShort>Mer om personvern:</BodyShort>
                    <BodyShort>
                        <Link
                            href='https://www.nav.no/no/nav-og-samfunn/om-nav/personvern-i-arbeids-og-velferdsetaten'
                            target='_blank'
                        >
                        NAVs personvernerklæring
                        </Link>
                    </BodyShort>
                    <BodyShort>
                        <Link
                            href='https://www.nav.no/no/nav-og-samfunn/om-nav/personvern-i-arbeids-og-velferdsetaten/personvernombudet-i-nav'
                            target='_blank'
                        >
                        Kontakt personvernombudet
                        </Link>
                    </BodyShort>
                </div>
                <CheckboxGroup
                    legend='Du takker ja til'
                    description='Kryss av boksene du føler deg komfertabel med'
                    disabled
                >
                    <Checkbox>Ja, dere kan ta lydopptak</Checkbox>
                </CheckboxGroup>
                <TextField label='Ditt navn' disabled className='w-1/2'/>
                <TextField label='Din e-post' disabled className='w-1/2'/>
                <Heading size='small'>Samtykke</Heading>
                <ConfirmationPanel
                    label='Ja, jeg samtykker'
                    disabled
                >
                    {`Jeg ønsker å delta i: ${consent.title ? consent.title : '<tittel>'}, og har lest og forstått samtykke`}
                </ConfirmationPanel>
            </Panel>
        </div>
    )
}