import { testAccesibility } from '../support/accesibility'

describe('give consent form behaves as expected', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('HOST')}samtykke/L90-12N`)
        testAccesibility()
    })

    it('should redirect on correct data', () => {
        cy.findByRole('textbox', { name: 'Ditt navn' }).type('Lars pølse')
        cy.findByRole('textbox', { name: 'Din e-post' }).type('Lars.pølse@outlook.com')
        
        cy.findByRole('checkbox', { name: 'Ja, jeg samtykker' }).click()

        cy.findByRole('button', { name: 'Gi samtykke' }).click()

        cy.location().should((loc) => {
            expect(loc.href).to.equal(`${Cypress.env('HOST')}kvitering`)
        })
    })

    it('should display errors on wrong/no input', () => {
        cy.findByRole('button', { name: 'Gi samtykke' }).click()

        cy.findByText('Du må legge inn ditt navn')
        cy.findByText('Du må legge inn din e-post')

        cy.findByRole('textbox', { name: 'Din e-post' }).type('sdpob1"49#ækb.n%f')

        cy.findByRole('button', { name: 'Gi samtykke' }).click()

        cy.findByText('E-post er på ugyldig format')
    })

    it('should not route if consent is not given', () => {
        cy.findByRole('textbox', { name: 'Ditt navn' }).type('Lars pølse')
        cy.findByRole('textbox', { name: 'Din e-post' }).type('Lars.pølse@outlook.com')

        cy.findByRole('button', { name: 'Gi samtykke' }).click()

        cy.findByText('For å kunne samtykke må du krysse av på at du har lest og forstått samtykke')

        cy.location().should((loc) => {
            expect(loc.href).to.equal(
                `${Cypress.env('HOST')}samtykke/L90-12N`,
            )
        })
    })
})
