import { testAccesibility } from '../support/accesibility'

describe('landing page behaves as expected', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('HOST')}`)
        testAccesibility()
    })

    it('should handle empty consent code as expected', () => {
        cy.findByRole('button', { name: 'OK' }).click()

        cy.findByText('Du må legge til en samtykke-kode')
    })

    it('should handle consent code on wrong format as expected', () => {
        cy.findByRole('textbox', { name: 'Samtykke-kode' }).type('llv1uyg7xv')

        cy.findByRole('button', { name: 'OK' }).click()

        cy.findByText('Samtykke-kode er på feil format')
    })

    it('should handle consent which does not exist as expected', () => {
        cy.findByRole('textbox', { name: 'Samtykke-kode' }).type('7cv-n3t')

        cy.findByRole('button', { name: 'OK' }).click()

        cy.findByText('Fant ikke samtykke med kode: 7cv-n3t')
    })

    it('should route to consent which does exist', () => {
        cy.findByRole('textbox', { name: 'Samtykke-kode' }).type('X76-2B3')

        cy.findByRole('button', { name: 'OK' }).click()

        cy.location().should((loc) => {
            expect(loc.href).to.eq(`${Cypress.env('HOST')}samtykke/X76-2B3`)
        })
    })
})
