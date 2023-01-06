import { Alert, BodyLong, Button, Heading, Modal } from '@navikt/ds-react'
import axios, { AxiosError } from 'axios'
import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EnumCandidateStatus, ICandidate } from '../../types'

const anonymizedCandidate: ICandidate = {
    id: 'fjjjf',
    name: 'xxx',
    email: 'xxxx@x.xx',
    consented: undefined,
    status: EnumCandidateStatus.Withdrawn,
    audioRecording: false,
    storeInfo: false
}

export default function WithdrawConsentModal(
    { 
        open,
        setOpen,
        code
    } : { 
        open: boolean
        setOpen: Dispatch<SetStateAction<boolean>>
        code: string
    }): ReactElement {
    
    const navigate = useNavigate()

    const [apiErrorMessage, setApiErrorMessage] = useState<string>('')

    const onWithdrawConsent = async () => {
        try {
            const { status }: { status: number} = await axios.put(
                `/innbygger/api/consent/${code}/canditature/`,
                anonymizedCandidate
            )
            if (status === 200) navigate('/')
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) setApiErrorMessage('Fant ikke samtykket du prøver å oppdatere')
                else setApiErrorMessage('Noe gikk galt i kontakten med serveren...')
            }
        }
    }

    useEffect(() => {
        Modal.setAppElement(document.getElementById('root'))
    }, [])

    return (
        <Modal
            open={open}
            aria-label='Vil du trekke samtykket?'
            aria-labelledby='modal-heading'
            onClose={() => setOpen(open => !open)}
            className='w-1/2'
        >
            <Modal.Content>
                <Heading spacing level='2' size='medium'>
                    Vil du trekke samtykket?
                </Heading>
                <BodyLong spacing>
                    Ved trekking av samtykke vil dataen relatert til samtykket
                    slettes og deltakelsen din anonymiseres.
                </BodyLong>
                <div className='flex justify-end space-x-4 mb-4'>
                    <Button 
                        variant='secondary'
                        onClick={() => setOpen(false)}
                    >
                        Avbryt
                    </Button>
                    <Button 
                        variant='danger'
                        onClick={onWithdrawConsent}
                    >
                        Trekk
                    </Button>
                </div>
                {apiErrorMessage && (
                    <Alert variant="error">
                        {apiErrorMessage}
                    </Alert>
                )}
            </Modal.Content>
        </Modal>
    )
}