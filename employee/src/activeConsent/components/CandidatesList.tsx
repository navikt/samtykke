import { ErrorColored, SuccessColored } from '@navikt/ds-icons'
import { Accordion, Heading } from '@navikt/ds-react'
import { format, parseISO } from 'date-fns'
import React, { ReactElement } from 'react'
import { EnumCandidateStatus, ICandidate } from '../../types'

export default function CandidatesList({ candidates }: { candidates: ICandidate[] }): ReactElement {
    return (
        <Accordion className='px-6 mb-6'>
            {candidates.map((candidate: ICandidate, index: number) => {
                return (
                    <Accordion.Item key={index}>
                        {candidate.status === EnumCandidateStatus.Accepted ? (
                            <>
                                <Accordion.Header>{candidate.name}</Accordion.Header>
                                <Accordion.Content className='flex flex-row justify-between'>
                                    {candidate.audioRecording ? (
                                        <div className='flex flex-row items-center space-x-4 ml-4 my-4'>
                                            <Heading size="small" className='text-green-600'>Lydopptak:</Heading>
                                            <SuccessColored width={'1.5rem'} height={'1.5rem'}/>
                                        </div>
                                    ) : (
                                        <div className='flex flex-row items-center space-x-4 ml-4 my-4'>
                                            <Heading size="small" className='text-red-600'>Lydopptak:</Heading>
                                            <ErrorColored width={'1.5rem'} height={'1.5rem'}/>
                                        </div>
                                    )}
                                    <div>
                                        <div className='flex flex-row items-center space-x-4 mr-4 my-4'>
                                            <Heading size='small'>Status:</Heading>
                                            <Heading size='small' className='text-green-600'>{candidate.status}</Heading>
                                        </div>
                                        <div className='flex flex-row items-center space-x-4 mr-4 my-4'>
                                            <Heading size='small'>
                                                {`Samtykket: ${format(parseISO(candidate.consented!.toString()), 'dd.MM.yyyy')}`}
                                            </Heading>
                                        </div>
                                    </div>
                                </Accordion.Content>
                            </>
                        ) : (
                            <>
                                <Accordion.Header className='italic'>Navn trukket</Accordion.Header>
                                <Accordion.Content className='flex flex-row justify-between'>
                                    <div className='flex flex-row items-center space-x-4 ml-4 my-4'>
                                        <Heading size="small" className='text-red-600'>Lydopptak:</Heading>
                                        <ErrorColored width={'1.5rem'} height={'1.5rem'}/>
                                    </div>
                                    <div className='flex flex-row items-center space-x-4 mr-4 my-4'>
                                        <Heading size='small'>Status:</Heading>
                                        <Heading size='small' className='text-red-600'>{candidate.status}</Heading>
                                    </div>
                                </Accordion.Content>
                            </>
                        )}
                    </Accordion.Item>
                )
            })}
        </Accordion>
    )
}