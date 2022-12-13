import React, { ReactElement } from 'react'
import { Heading, Panel } from '@navikt/ds-react'

export default function PageHeader({
    title,
    icon,
    children
}: {
    title: string
    icon: ReactElement
    children?: ReactElement
}): ReactElement {
    return (
        <Panel className='relative'>
            <div className='before:absolute before:-top-[2rem] before:rounded-full before:bg-[#e0d8e9] before:h-16 before:w-16 my-0 mx-auto text-center flex items-center justify-center'>
                {icon}
            </div>
            <div className='text-center my-8 mx-0'>
                <Heading size='xlarge'>{title}</Heading>
            </div>
            {children}
        </Panel>
    )
}