import { DatePicker, DateValidationT, useDatepicker } from '@navikt/ds-react'
import React, { ReactElement, useState } from 'react'
import { Control, useController } from 'react-hook-form'
import { getExpirationLimitDate, getYesterdayDate } from '../../utils/date'
import { IConsentBase } from '../../types'

export default function ExpirationDatePicker({
    control
}: {
    control: Control<IConsentBase>
}): ReactElement {

    const [dateError, setDateError] = useState<DateValidationT | null>(null)

    const { field: expirationField, fieldState: expirationFieldState } = useController({
        name: 'expiration',
        control,
        rules: {
            validate: (expirationValue) => {
                if (!expirationValue) {
                    return 'Du må sette en utløpsdato'
                } 
                return undefined
            }
        },
        defaultValue: undefined
    })

    const { datepickerProps, inputProps } = useDatepicker({
        disabled: [
            { from: new Date('Jan 1 1964'), to: getYesterdayDate() },
            { from: getExpirationLimitDate(), to: new Date('Jan 1 2088')}
        ],
        onDateChange: (value) => { value && expirationField.onChange(value) },
        onValidate: setDateError
    })

    return (
        <DatePicker {...datepickerProps}>
            <DatePicker.Input 
                {...inputProps} 
                id={expirationField.name}
                label="Utløpsdato"
                error={expirationFieldState.error?.message}
            />
        </DatePicker>
    )
}