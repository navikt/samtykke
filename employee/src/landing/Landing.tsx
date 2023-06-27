import { People } from '@navikt/ds-icons'
import { Accordion, BodyShort, Button, Heading, Panel } from '@navikt/ds-react'
import axios, { AxiosError } from 'axios'
import React, { ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IConsent, IEmployee } from '../types'
import ConsentPreviews from './components/ConsentPreviews'
import config from '../config'

export default function Landing(): ReactElement {

    const [employeeName, setEmployeeName] = useState<string>()
    
    const [activeConsents, setActiveConsent] = useState<IConsent[]>()
    const [activeConsentsError, setActiveConsentsError] = useState<string>()

    const navigate = useNavigate()

    const getCurrentEmployee = async () => {
        try {
            const { data }: { data: IEmployee } = await axios.get(`${config.apiPath}/currentEmployee`)
            setEmployeeName(`${data.firstname} ${data.lastname}`)
        } catch (error) {
            if (error instanceof AxiosError) setEmployeeName('Navn Navnesen')
        }
    }

    const getActiveConsents = async () => {
        try {
            const { data }: { data: IConsent[] } = await axios.get(`${config.apiPath}/consent/active`)
            setActiveConsent(data)
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) setActiveConsentsError('Du har ingen aktive samtykker...')
                else setActiveConsentsError('Noe gikk galt i hentingen av aktive samtykker')
            } 
        }
    }

    useEffect(() => {
        getCurrentEmployee()
        getActiveConsents()
    }, [])

    return (
        <div className='flex-1 mt-10 px-4 lg:mt-10 lg:px-12'>
            <div className='grid place-items-center my-12'>
                <People width="8rem" height="8rem" />
                <p className='text-2xl mt-2'>{employeeName}</p>
            </div>
            <Panel className='p-2 space-y-12'>
                <Heading level="2" size="large">Aktive samtykker</Heading>
                {activeConsents && activeConsents!.length > 0 ? (
                    <ConsentPreviews consents={activeConsents} />
                ) : (
                    <BodyShort>{activeConsentsError}</BodyShort>
                )}
                <div className='flex flex-row justify-end'>
                    <Button variant='primary' onClick={() => navigate('/samtykke/ny')}>Nytt samtykke</Button>
                </div>
            </Panel>
        </div>
    )
}