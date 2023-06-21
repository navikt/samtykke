import { FloppydiskIcon } from '@navikt/aksel-icons'
import { Alert, Button } from '@navikt/ds-react'
import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IConsent } from '../../../types'
import DownloadPdfButton from './DownloadPdfButton'

interface IProps {
    consent: IConsent
    candidateChanged: boolean
    onUpdateCandidate: () => void
    setOpenWithdrawConsentModal: Dispatch<SetStateAction<boolean>>
    setApiErrorMessage: Dispatch<SetStateAction<string>>
}

export default function ResponsiveButtonMenu({
    consent,
    candidateChanged,
    onUpdateCandidate,
    setOpenWithdrawConsentModal,
    setApiErrorMessage
}: IProps): ReactElement {

    const navigate = useNavigate()

    return (
        <div className='space-y-2 py-4'>
            <div className='flex flex-row space-x-4'>
                <DownloadPdfButton 
                    setApiErrorMessage={setApiErrorMessage}
                    consent={consent}
                    className='w-1/2 grow'
                />
                {candidateChanged ? (
                    <Button
                        className='w-1/2'
                        icon={<FloppydiskIcon aria-hidden />}
                        onClick={onUpdateCandidate}
                    >
                        Oppdater
                    </Button>
                ) : <></>}
            </div>
            <div className='flex flex-row space-x-4'>
                <Button
                    className='w-1/2'
                    variant='secondary'
                    onClick={() => navigate('/')}
                >
                    Avbryt
                </Button>
                <Button
                    className='w-1/2'
                    variant='danger'
                    onClick={() => setOpenWithdrawConsentModal(true)}
                >
                    Trekk samtykke
                </Button>
            </div>
        </div>
    )
}