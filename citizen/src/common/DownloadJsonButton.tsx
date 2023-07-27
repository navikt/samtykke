import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react'
import { ICandidate, IConsent } from '../types'
import { Button } from '@navikt/ds-react'
import { DownloadIcon } from '@navikt/aksel-icons'
import axios from 'axios'
import config from '../config'

interface IProps {
    setApiErrorMessage: Dispatch<SetStateAction<string>>
    consents: Array<IConsent> | undefined
    className?: string
}

export default function DownloadJsonButton({
    setApiErrorMessage,
    consents,
}: IProps): ReactElement {

    const [downloadingJson, setDownloadingJson] = useState<boolean>(false)

    const donwloadAsFile = (consents: Array<IConsent>) => {
        const link = document.createElement('a')
    
        link.href = window.URL.createObjectURL(new Blob([JSON.stringify(consents)], { type: 'application/json' }))
        link.setAttribute('download', 'persondata.json')
        link.click()

        link.remove()
    }

    const downloadJson = async () => {
        setDownloadingJson(true)

        if (consents && consents.length > 0) {
            Promise.all(consents.map(consent => {
                return axios
                    .get(`${config.apiPath}/consent/${consent.code}/canditature`)
                    .then(res => ({ ...res.data, employee: null }))
            }
            ))
                .then(donwloadAsFile)
                .catch(() => setApiErrorMessage('Noe gikk galt i nedlastningen av JSON'))
        } else {
            setApiErrorMessage('Ingen samtykker å lase ned som JSON')
        }
        
        setDownloadingJson(false)
    }

    return (
        <Button
            icon={<DownloadIcon aria-hidden />}
            onClick={downloadJson}
            loading={downloadingJson}
        >
            Last ned som JSON
        </Button>
    )
}