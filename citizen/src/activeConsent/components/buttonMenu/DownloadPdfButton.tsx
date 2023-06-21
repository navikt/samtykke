import { DownloadIcon } from '@navikt/aksel-icons'
import { Button } from '@navikt/ds-react'
import axios from 'axios'
import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react'
import config from '../../../config'
import { IConsent } from '../../../types'

interface IProps {
    setApiErrorMessage: Dispatch<SetStateAction<string>>
    consent: IConsent
    className?: string
}

export default function DownloadPdfButton({
    setApiErrorMessage,
    consent,
    className
}: IProps): ReactElement {

    const [downloadingConsent, setDownloadingConsent] = useState<boolean>(false)

    const downloadConsent = async () => {
        setDownloadingConsent(true)

        try {
            await axios
                .get(`${config.apiPath}/consent/${consent.code}/pdf`, { responseType: 'blob' })
                .then(res => {
                    const link = document.createElement('a')

                    link.href = window.URL.createObjectURL(new Blob([res.data], {type: 'application/pdf'}))
                    link.setAttribute('download', `Samtykke-${consent?.title}.pdf`)
                    link.click()

                    link.remove()
                })
        } catch (error) {
            setApiErrorMessage('Noe gikk galt i nedlastningen av PDF')
        }

        setDownloadingConsent(false)
    }

    return (
        <Button
            className={className || ''}
            variant='secondary'
            icon={<DownloadIcon aria-hidden />}
            onClick={downloadConsent}
            loading={downloadingConsent}
        >
            Last ned
        </Button>
    )
}