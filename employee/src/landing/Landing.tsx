import { People } from '@navikt/ds-icons'
import { Accordion, BodyShort, Button, Heading } from '@navikt/ds-react'
import axios from 'axios'
import React, { ReactElement, useEffect, useState } from 'react'
import ContentPanel from '../common/ContentPanel'
import { IConsent, IEmployee } from '../types'
import ConsentPreviews from './components/ConsentPreviews'

export default function Landing(): ReactElement {

    const [employeeName, setEmployeeName] = useState<string>()
    const [activeConsents, setActiveConsent] = useState<IConsent[]>()
    
    const getCurrentEmployee = async () => {
        const { data }: { data: IEmployee } = await axios.get('/ansatt/api/currentEmployee')
        setEmployeeName(`${data.firstname} ${data.lastname}`)
    }

    const getActiveConsents = async () => {
        const { data }: { data: IConsent[] } = await axios.get('/ansatt/api/consent/active')
        setActiveConsent(data)
    }

    useEffect(() => {
        getCurrentEmployee()
        getActiveConsents()
    }, [])

    return (
        <div>
            <div className='grid place-items-center my-12'>
                <People width="8rem" height="8rem" />
                <p className='text-2xl mt-2'>{employeeName}</p>
            </div>
            <ContentPanel>
                <Heading level="2" size="large">Aktive samtykker</Heading>
                {!activeConsents || activeConsents?.length > 0 ? (
                    <ConsentPreviews consents={activeConsents}/>
                ) : (
                    <BodyShort>Du har ingen aktive samtykker...</BodyShort>
                )}
                <div className='flex flex-row justify-end'>
                    <Button variant='primary'>Nytt samtykke</Button>
                </div>
            </ContentPanel>
        </div>
    )
}