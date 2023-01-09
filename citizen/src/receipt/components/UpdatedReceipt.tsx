import { BodyLong, Button } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import ReceiptTemplate from './ReceiptTemplate'

export default function UpdatedReceipt({
    consentTitle
}: {
    consentTitle: string
}): ReactElement {

    const navigate = useNavigate()
    
    return (
        <div>
            <ReceiptTemplate title='Ok'>
                <BodyLong>
                    Samtykket ditt til: {consentTitle} har blitt oppdater, og
                    ansatte tilknyttet ditt samtykke har blitt varslet og vil
                    oppdatere ekstern data. 
                </BodyLong>
            </ReceiptTemplate>
            <div className='flex justify-end my-4 px-2'>
                <Button onClick={() => navigate('/')}>Lukk</Button>
            </div>
        </div>
    )
}