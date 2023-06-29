import { testAccesibility } from '../support/accesibility'

describe('Landing page is loaded propperly', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('HOST')}`)

        testAccesibility()
    })

    it('should load employee name', () => {
        cy.findByText('Dan Børge')
    })

    it('loads list of active consents with consent codes', () => {
        cy.findByRole('button', { name: 'Brukertest av NAV.no' }).click()
        cy.findByRole('button', { name: 'Test av ny AAP kalkulator' }).click()
        cy.findByRole('button', { name: 'Dagpengeløsning 2.0' }).click()

        cy.findByText('X76-2B3')
        cy.findByText('L90-12N')
        cy.findByText('12J-0ZA')
    })
})
