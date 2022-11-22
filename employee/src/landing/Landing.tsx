import { People } from '@navikt/ds-icons'
import { Accordion, BodyShort, Button, Heading } from '@navikt/ds-react'
import axios from 'axios'
import React, { ReactElement, useEffect, useState } from 'react'
import ContentPanel from '../common/ContentPanel'
import { IConsentPreview, IEmployee } from '../types'
import ConsentPreviews from './components/ConsentPreviews'

const consentPreviews: IConsentPreview[] = [
    { title: 'Brukertest av NAV.no', code: '1B3-98K'},
    { title: 'Blikksporingstest av ny AAP løsning', code: '4N9-C29'},
    { title: 'Videoopptak av Dagpengeløsning', code: '7B4-M32'}
]

export default function Landing(): ReactElement {

    const [employeeName, setEmployeeName] = useState<string>('Sabel Kaptein')
    const [activeConsents, setActiveConsent] = useState<IConsentPreview[]>(consentPreviews)
    
    const getCurrentEmployee = async () => {
        const { data }: { data: IEmployee } = await axios.get('/ansatt/api/currentEmployee')
        setEmployeeName(`${data.firstname} ${data.lastname}`)
    }

    useEffect(() => {
        getCurrentEmployee()
    }, [])

    return (
        <div>
            <div className='grid place-items-center my-12'>
                <People width="8rem" height="8rem" />
                <p className='text-2xl mt-2'>{employeeName}</p>
            </div>
            <ContentPanel>
                <Heading level="2" size="large">Aktive samtykker</Heading>
                <ConsentPreviews consentPreviews={activeConsents}/>
                <div className='flex flex-row justify-end'>
                    <Button variant='primary'>Nytt samtykke</Button>
                </div>
            </ContentPanel>
        </div>
    )
}