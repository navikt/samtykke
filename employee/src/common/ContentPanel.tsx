import { Panel } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

export default function ContentPanel({
    children
}: {
    children: ReactElement | ReactElement[]
}): ReactElement {
    return(
        <Panel className='mx-32'>
            <div className='p-2 space-y-12'>
                {children}
            </div>
        </Panel>
    )
}