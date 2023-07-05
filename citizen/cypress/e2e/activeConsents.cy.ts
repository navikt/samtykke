import { testAccesibility } from '../support/accesibility'

describe('active consents behaves as expected', () => {
    it('link to active consent routes to expected consent', () => {
        cy.visit(`${Cypress.env('HOST')}samtykker`)
        testAccesibility()

        cy.findByText('Brukertest av NAV.no').click()
        cy.findByText('Samtykke for: Brukertest av NAV.no')
    })
})
