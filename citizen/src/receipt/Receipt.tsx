import React, { ReactElement } from 'react'
import PageHeader from '../common/PageHeader'
import { Receipt as ReceiptIcon } from '@navikt/ds-icons'
import { Heading, Panel } from '@navikt/ds-react'
import { useLocation } from 'react-router-dom'
import { IConsent } from '../types'
import { EnumConsentReceipt } from './EnumConsentReceipt'
import AcceptedReceipt from './components/AcceptedReceipt'
import UpdatedReceipt from './components/UpdatedReceipt'
import WithdrawnReceipt from './components/WithdrawnReceipt'

export default function Receipt(): ReactElement {

    const { state } = useLocation()
    const { consent, receiptType }: { 
        consent: IConsent
        receiptType: EnumConsentReceipt
    } = state || {}

    return (
        <div className='mx-32 my-12'>
            <PageHeader 
                title='Kvitering'
                icon={<ReceiptIcon className='align-middle text-[2rem] absolute -top-[1rem]'/>}
            />
            {state ? (
                <div className='flex justify-center'>
                    <div className='mt-8 w-1/2'>
                        {receiptType === EnumConsentReceipt.Accepted && (
                            <AcceptedReceipt 
                                consentTitle={consent.title}
                                consentExpiration={consent.expiration}
                                consentCode={consent.code}
                            />
                        ) || receiptType === EnumConsentReceipt.Updated && (
                            <UpdatedReceipt consentTitle={consent.title} />
                        ) || receiptType === EnumConsentReceipt.Withdrawn && (
                            <WithdrawnReceipt consentTitle={consent.title}/>
                        )}
                    </div>
                </div>
            ) : <Heading size='large'>Ingen kvitering å vise</Heading>}
        </div>
    )
}