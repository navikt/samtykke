import { BodyLong, Button } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import ReceiptTemplate from './ReceiptTemplate'
import { getISODateString } from '../../utils/date'
import { Download } from '@navikt/ds-icons'
import { useNavigate } from 'react-router-dom'

export default function AcceptedReceipt({
    consentTitle,
    consentExpiration
}: {
    consentTitle: string
    consentExpiration: Date | undefined
}): ReactElement {

    const navigate = useNavigate()

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
                <Button variant='secondary' icon={<Download />}>Last ned</Button>
                <Button onClick={() => navigate('/')}>Lukk</Button>
            </div>
        </div>
    )
}