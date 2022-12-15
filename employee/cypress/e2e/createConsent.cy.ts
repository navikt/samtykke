import { format, parseISO } from 'date-fns'

describe('Data is filled correctly and request is successfull', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('HOST')}#/samtykke/ny`)
    })

    it('should redirect on correct data', () => {
        cy.get('input[name="title"]').type('Brukertest for AAP')
        cy.get('textarea[name="description"]').type(
            'Dette er en brukertest som tar for seg å teste den nye AAP kalkulatoren',
        )
        cy.get('input[id=datepicker-input-rh]')
            .type(format(parseISO(new Date().toISOString()), 'dd.MM.yyyy'))
            .type('{esc}')

        cy.get(
            '*[class^="navds-button navds-button--primary navds-button--medium"]',
        )
            .eq(1)
            .click()

        cy.on('url:changed', (newURL) => {
            expect(newURL).to.equal(`${Cypress.env('HOST')}#/`)
        })
    })

    it('should display input in consent preview', () => {
        cy.get('input[name="title"]').type('Brukertest for AAP')
        cy.get('textarea[name="description"]').type(
            'Dette er en brukertest som tar for seg å teste den nye AAP kalkulatoren',
        )

        cy.get('*[class^="w-1/2"]')
            .eq(1)
            .get('*[class^="navds-heading navds-heading--medium"]')
            .should('have.text', 'Samtykke for: Brukertest for AAP')

        cy.get('*[class^="w-1/2"]')
            .eq(1)
            .get('p')
            .eq(0)
            .should(
                'have.text',
                'Dette er en brukertest som tar for seg å teste den nye AAP kalkulatoren',
            )

        cy.get('p[id="confirmation-panel-rv"]').should(
            'have.text',
            'Jeg ønsker å delta i: Brukertest for AAP, og har lest og forstått samtykke',
        )
    })

    it('should display errors on empty input', () => {
        cy.get(
            '*[class^="navds-button navds-button--primary navds-button--medium"]',
        )
            .eq(1)
            .click()

        cy.get('*[class^="navds-error-message navds-label"]')
            .eq(0)
            .should('have.text', 'Du må sette en tittel')
        cy.get('*[class^="navds-error-message navds-label"]')
            .eq(1)
            .should('have.text', 'Du må sette et formål')
        cy.get('*[class^="navds-error-message navds-label"]')
            .eq(2)
            .should('have.text', 'Du må sette en utløpsdato')
    })

    it('should display errors on wrong input', () => {
        cy.get('input[name="title"]').type('AAP')
        cy.get('textarea[name="description"]').type('den nye AAP kalkulatoren')

        cy.get(
            '*[class^="navds-button navds-button--primary navds-button--medium"]',
        )
            .eq(1)
            .click()

        cy.get('*[class^="navds-error-message navds-label"]')
            .eq(0)
            .should('have.text', 'Tittelen må være lengre enn 5 bokstaver')
        cy.get('*[class^="navds-error-message navds-label"]')
            .eq(1)
            .should('have.text', 'Formålet må være lengre en 30 bokstaver')

        cy.get('input[name="title"]')
            .clear()
            .type('Hei, dette er en veldig lang tittel for samtykket')
        cy.get('textarea[name="description"]')
            .clear()
            .type(
                `
            den nye AAP kalkulatoren med en ekstrem lang beskrivelse
            den nye AAP kalkulatoren med en ekstrem lang beskrivelse
            den nye AAP kalkulatoren med en ekstrem lang beskrivelse
            den nye AAP kalkulatoren med en ekstrem lang beskrivelse
            den nye AAP kalkulatoren med en ekstrem lang beskrivelse
            den nye AAP kalkulatoren med en ekstrem lang beskrivelse
            den nye AAP kalkulatoren med en ekstrem lang beskrivelse
            den nye AAP kalkulatoren med en ekstrem lang beskrivelse
        `,
                { delay: 0.1 },
            )

        cy.get(
            '*[class^="navds-button navds-button--primary navds-button--medium"]',
        )
            .eq(1)
            .click()

        cy.get('*[class^="navds-error-message navds-label"]')
            .eq(0)
            .should('have.text', 'Tittelen må være under 30 bokstaver')
        cy.get('*[class^="navds-error-message navds-label"]')
            .eq(1)
            .should('have.text', 'Formålet må være under 300 bokstaver')
    })

    it('should not route on wrong input', () => {
        cy.get(
            '*[class^="navds-button navds-button--primary navds-button--medium"]',
        )
            .eq(1)
            .click()

        cy.location().should((loc) => {
            expect(loc.href).to.eq(`${Cypress.env('HOST')}#/samtykke/ny`)
        })
    })
})
