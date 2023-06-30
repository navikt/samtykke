import { Alert, BodyLong, Button } from '@navikt/ds-react'
import React, { ReactElement, useState } from 'react'
import ReceiptTemplate from './ReceiptTemplate'
import { getISODateString } from '../../utils/date'
import { Download } from '@navikt/ds-icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../../config'

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

    const [downloadPDFErrorMessage, setDownloadPDFErrorMessage] = useState<string>('')

    const [downloadingConsent, setDownloadingConsent] = useState<boolean>(false)

    const downloadConsent = async () => {
        setDownloadingConsent(true)

        try {
            await axios
                .get(`${config.apiPath}/consent/${consentCode}/pdf`, { responseType: 'blob' })
                .then(res => {
                    const link = document.createElement('a')

                    link.href = window.URL.createObjectURL(new Blob([res.data], {type: 'application/pdf'}))
                    link.setAttribute('download', `Samtykke-${consentTitle}.pdf`)
                    link.click()

                    link.remove()
                })
        } catch (error) {
            setDownloadPDFErrorMessage('Noe gikk galt i nedlastningen av PDF')
        }

        setDownloadingConsent(false)
    }

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
                <Button
                    variant='secondary'
                    icon={<Download aria-hidden />}
                    onClick={downloadConsent}
                    loading={downloadingConsent}
                >
                    Last ned
                </Button>
                <Button onClick={() => navigate('/')}>Lukk</Button>
            </div>
            {downloadPDFErrorMessage && (
                <Alert variant='error'>
                    {downloadPDFErrorMessage}
                </Alert>
            )}
        </div>
    )
}