import { People } from '@navikt/ds-icons'
import { BodyShort, Button, Heading, Panel, Skeleton } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { IConsent, IEmployee } from '../types'
import ConsentPreviews from './components/ConsentPreviews'
import config from '../config'
import useSWR, { SWRResponse } from 'swr'
import { fetcher } from '../utils/fetcher'

export default function Landing(): ReactElement {

    const navigate = useNavigate()

    const {
        data: employee,
        isLoading: employeeIsLoading,
        error: employeeError
    }: SWRResponse<IEmployee, boolean, boolean> = useSWR(`${config.apiPath}/currentEmployee`, fetcher)

    const {
        data: consents,
        isLoading: consentsIsLoading,
        error: consentsError
    }: SWRResponse<Array<IConsent>, boolean, boolean> = useSWR(`${config.apiPath}/consent/active`, fetcher)

    return (
        <main className='flex-1 mt-10 px-4 lg:mt-10 lg:px-12'>
            <div className='grid place-items-center my-12'>
                {employeeIsLoading ? <Skeleton variant='rectangle' width={160} height={200} /> : 
                    <>
                        <People width="8rem" height="8rem" aria-hidden />
                        <p className='text-2xl mt-2'> 
                            {employee && !employeeError ? 
                                `${employee?.firstname} ${employee?.lastname}` 
                                : 'Navn Navnesen'
                            }
                        </p>
                    </>
                }
            </div>
            {consentsIsLoading ? <Skeleton variant='rectangle' width='100%' height={300}/> :
                <Panel className='p-2 space-y-12'>
                    <Heading level="2" size="large">Aktive samtykker</Heading>
                    {consents && consents.length > 0 && !consentsError ? (
                        <ConsentPreviews consents={consents} />
                    ) : (
                        <BodyShort>Du har ingen aktive samtykker...</BodyShort>
                    )}
                    <div className='flex flex-row justify-end'>
                        <Button variant='primary' onClick={() => navigate('/samtykke/ny')}>Nytt samtykke</Button>
                    </div>
                </Panel>
            }
        </main>
    )
}