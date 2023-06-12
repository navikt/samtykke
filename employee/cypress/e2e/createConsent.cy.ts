import { format, parseISO } from 'date-fns'
import selectors from '../support/selectorTypes'

const fillConsentInputs = () => {
    cy.get('input[name="title"]').type('Brukertest for AAP')
    cy.get('input[name="responsibleGroup"]').type('Team AAP')
    cy.get('input[name="theme"]').type('Dårlig råd')
    cy.get('textarea[name="purpose"]')
        .type('Dette er en brukertest som tar for seg å teste den nye AAP kalkulatoren')
    cy.get('textarea[name="endResult"]').type('rapport')
    cy.get(selectors.aksel.datePicker.input)
        .type(format(parseISO(new Date().toISOString()), 'dd.MM.yyyy'))
}

describe('Data is filled correctly and request is successfull', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('HOST')}samtykke/ny`)
    })

    it('should redirect on correct data', () => {
        fillConsentInputs()

        cy.get(selectors.aksel.button.primary.medium)
            .eq(1)
            .click({ force: true })

        cy.get('input[name="slackChannel"]').type('samtykke-bot')

        cy.get(selectors.aksel.button.secondary.medium)
            .eq(2)
            .click()

        cy.get(selectors.aksel.button.primary.medium)
            .eq(2)
            .click()

        cy.location().should((loc) => {
            expect(loc.href).to.equal(`${Cypress.env('HOST')}`)
        })
    })

    it('displays size warning on selecting slack channel', () => {
        // TODO: implement test
    })

    it('should display error on no slack channel selected', () => {
        fillConsentInputs()

        cy.get(selectors.aksel.button.primary.medium)
            .eq(1)
            .click({ force: true })

        cy.get(selectors.aksel.button.secondary.medium)
            .eq(2)
            .click()
        
        cy.get(selectors.aksel.errorMessage.label)
            .eq(0)
            .should('have.text', 'Du må skrive inn en slack kanal')
    })

    it('should display errors on empty input', () => {
        cy.get(selectors.aksel.button.primary.medium)
            .eq(1)
            .click()

        cy.get(selectors.aksel.errorMessage.label)
            .eq(0)
            .should('have.text', 'Du må sette en tittel')
        cy.get(selectors.aksel.errorMessage.label)
            .eq(1)
            .should('have.text', 'Du må sette et team/seksjon')
        cy.get(selectors.aksel.errorMessage.label)
            .eq(2)
            .should('have.text', 'Du må sette et tema')
        cy.get(selectors.aksel.errorMessage.label)
            .eq(3)
            .should('have.text', 'Du må sette et formål')
        cy.get(selectors.aksel.errorMessage.label)
            .eq(4)
            .should('have.text', 'Du må sette et sluttresultat')
        cy.get(selectors.aksel.errorMessage.label)
            .eq(5)
            .should('have.text', 'Du må sette en utløpsdato')
    })

    it('should display errors on wrong input', () => {
        cy.get('input[name="title"]').type('AAP')
        cy.get('textarea[name="purpose"]').type('den nye AAP kalkulatoren')

        cy.get(
            '*[class^="navds-button navds-button--primary navds-button--medium"]',
        )
            .eq(1)
            .click()

        cy.get(selectors.aksel.errorMessage.label)
            .eq(0)
            .should('have.text', 'Tittelen må være lengre enn 5 bokstaver')
        cy.get(selectors.aksel.errorMessage.label)
            .eq(3)
            .should('have.text', 'Formålet må være lengre en 30 bokstaver')

        cy.get('input[name="title"]')
            .clear()
            .type(
                `Hei, dette er en veldig lang tittel for samtykket, 
                ja den er veldig lang fordi det er bare sånn`
            )
        cy.get('textarea[name="purpose"]')
            .clear()
            .type(
                `den nye AAP kalkulatoren med en ekstrem lang beskrivelse
                den nye AAP kalkulatoren med en ekstrem lang beskrivelse
                den nye AAP kalkulatoren med en ekstrem lang beskrivelse
                den nye AAP kalkulatoren med en ekstrem lang beskrivelse
                den nye AAP kalkulatoren med en ekstrem lang beskrivelse
                den nye AAP kalkulatoren med en ekstrem lang beskrivelse
                den nye AAP kalkulatoren med en ekstrem lang beskrivelse
                den nye AAP kalkulatoren med en ekstrem lang beskrivelse`,
                { delay: 0.1 },
            )

        cy.get(selectors.aksel.button.primary.medium)
            .eq(1)
            .click()

        cy.get(selectors.aksel.errorMessage.label)
            .eq(0)
            .should('have.text', 'Tittelen må være under 50 bokstaver')
        cy.get(selectors.aksel.errorMessage.label)
            .eq(3)
            .should('have.text', 'Formålet må være under 300 bokstaver')
    })

    it('should not route on wrong input', () => {
        cy.get(selectors.aksel.button.primary.medium)
            .eq(1)
            .click()

        cy.location().should((loc) => {
            expect(loc.href).to.eq(`${Cypress.env('HOST')}samtykke/ny`)
        })
    })
})
