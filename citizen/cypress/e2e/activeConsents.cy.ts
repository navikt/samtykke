describe('active consents behaves as expected', () => {
    it('link to active consent routes to expected consent', () => {
        cy.visit(`${Cypress.env('HOST')}samtykker`)

        cy.findByText('Brukertest av NAV.no').click()
        cy.findByText('Samtykke for: Brukertest av NAV.no')

        cy.visit(`${Cypress.env('HOST')}samtykker`)

        cy.findByText('Test av ny AAP kalkulator').click()
        cy.findByText('Samtykke for: Test av ny AAP kalkulator')
    })
})
