const createClassSelectorString = (className: string): string => {
    return `*[class^="${className}"]`
}

export default{
    aksel: {
        accordion: {
            _: createClassSelectorString('navds-accordion'),
            item: createClassSelectorString('navds-accordion__item'),
            content: createClassSelectorString('navds-accordion__content'),
            header: {
                _: createClassSelectorString('navds-accordion__header'),
                content: createClassSelectorString('navds-accordion__header-content')
            }
        },
        button: {
            primary: {
                medium: createClassSelectorString('navds-button navds-button--primary navds-button--medium')
            },
            secondary: {
                small: createClassSelectorString('navds-button navds-button--secondary navds-button--small'),
                medium: createClassSelectorString('navds-button navds-button--secondary navds-button--medium')
            }
        },
        heading: {
            small: {
                green: createClassSelectorString('text-green-600 navds-heading navds-heading--small'),
                red: createClassSelectorString('text-red-600 navds-heading navds-heading--small')
            },
            medium: {
                _: createClassSelectorString('navds-heading navds-heading--medium'),
                italic: createClassSelectorString('italic navds-heading navds-heading--medium')
            },
            xlarge: createClassSelectorString('navds-heading navds-heading--xlarge')
        },
        datePicker: {
            input: createClassSelectorString('navds-date__field-input navds-text-field__input navds-body-short navds-body-medium')
        },
    }
}