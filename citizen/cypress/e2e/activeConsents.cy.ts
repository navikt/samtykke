describe('active consents behaves as expected', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('HOST')}samtykker`)
    })

    it('loads list of active consents', () => {
        cy.get('*[class^="navds-panel"]')
            .eq(1)
            .get('a')
            .should('have.length', 2)

        cy.get('a').eq(0).should('have.text', 'Brukertest av NAV.no')
        cy.get('a').eq(1).should('have.text', 'Test av ny AAP kalkulator')
    })

    it('link to active consent routes to expected consent', () => {
        cy.get('a').eq(0).click()
        cy.get('*[class^="navds-heading navds-heading--medium"]')
            .eq(0)
            .should('have.text', 'Samtykke for: Brukertest av NAV.no')

        cy.visit(`${Cypress.env('HOST')}samtykker`)

        cy.get('a').eq(1).click()
        cy.get('*[class^="navds-heading navds-heading--medium"]')
            .eq(0)
            .should('have.text', 'Samtykke for: Test av ny AAP kalkulator')
    })
})
