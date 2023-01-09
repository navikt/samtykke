import React, { ReactElement } from 'react'
import PageHeader from '../common/PageHeader'
import { Receipt as ReceiptIcon } from '@navikt/ds-icons'
import { BodyLong, Heading, Panel } from '@navikt/ds-react'
import { useLocation } from 'react-router-dom'
import { ICandidate, IConsent } from '../types'
import { EnumConsentReceipt } from './EnumConsentReceipt'
import ReceiptTemplate from './components/ReceiptTemplate'
import AcceptedReceipt from './components/AcceptedReceipt'

export default function Receipt(): ReactElement {

    const { state } = useLocation()
    const { consent, candidate, receiptType }: { 
        consent: IConsent
        candidate: ICandidate
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
                            />
                        ) || receiptType === EnumConsentReceipt.Updated && (
                            <ReceiptTemplate title='Ok'>
                                <BodyLong>Oppdatert</BodyLong>
                            </ReceiptTemplate>
                        ) || receiptType === EnumConsentReceipt.Withdrawn && (
                            <ReceiptTemplate title='Ok'>
                                <BodyLong>Trukket</BodyLong>
                            </ReceiptTemplate>
                        )}
                    </div>
                </div>
            ) : <Heading size='large'>Ingen kvitering å vise</Heading>}
        </div>
    )
}