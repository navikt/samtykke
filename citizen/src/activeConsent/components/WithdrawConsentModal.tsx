import { BodyLong, Button, Heading, Modal } from '@navikt/ds-react'
import React, { Dispatch, ReactElement, SetStateAction, useEffect } from 'react'

export default function WithdrawConsentModal(
    { 
        open,
        setOpen
    } : { 
        open: boolean
        setOpen: Dispatch<SetStateAction<boolean>>
    }): ReactElement {

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
                <div className='flex justify-end space-x-4'>
                    <Button variant='secondary'>Avbryt</Button>
                    <Button variant='danger'>Trekk</Button>
                </div>
            </Modal.Content>
        </Modal>
    )
}