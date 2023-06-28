
import { Accordion, Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { ICandidate } from '../../types'
import CandidateAccordionItem from './components/CandidateAccordionItem'

export default function CandidatesList({ candidates }: { candidates: ICandidate[] }): ReactElement {

    return (
        <>
            {candidates.length === 0 ? (
                <Heading size="medium" className='italic'>
                    <div className='px-6 mb-6'>Ingen har gitt samtykke enda...</div>
                </Heading>
            ) : (
                <Accordion className='px-6 mb-6'>
                    {candidates.map((candidate: ICandidate, index: number) => {
                        return <CandidateAccordionItem key={index} candidate={candidate}/>
                    })}
                </Accordion>
            )}
        </>
    )
}