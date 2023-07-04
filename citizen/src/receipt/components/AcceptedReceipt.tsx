import { Alert, BodyLong, Button } from '@navikt/ds-react'
import React, { ReactElement, useState } from 'react'
import ReceiptTemplate from './ReceiptTemplate'
import { getISODateString } from '../../utils/date'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../../config'
import DownloadPdfButton from '../../common/DownloadPdfButton'

export default function AcceptedReceipt({
    consentTitle,
    consentExpiration,
    consentCode
}: {
    consentTitle: string
    consentExpiration: Date | string | undefined
    consentCode: string
}): ReactElement {

    const navigate = useNavigate()

    const [apiErrorMessage, setApiErrorMessage] = useState<string>('')

    return (
        <div>
            <ReceiptTemplate title='Takk!'>
                <BodyLong>
                    Du har gitt samtykke til: {consentTitle}. Vi setter pris på
                    at du vil hjelpe med å gjøre NAV bedre.
                </BodyLong>
                <BodyLong>
                    Etter {getISODateString(consentExpiration!)} vil samtykket bli slettet
                    og du må dermed laste det ned selv for å beholde det etter {getISODateString(consentExpiration!)}
                </BodyLong>
            </ReceiptTemplate>
            <div className='flex justify-between my-4 px-2'>
                <DownloadPdfButton 
                    setApiErrorMessage={setApiErrorMessage}
                    consentCode={consentCode}
                    consentTitle={consentTitle}
                />
                <Button onClick={() => navigate('/')}>Lukk</Button>
            </div>
            {apiErrorMessage && (
                <Alert variant='error'>
                    {apiErrorMessage}
                </Alert>
            )}
        </div>
    )
}