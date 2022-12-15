describe('Landing page is loaded propperly', () => {
    it('should load employee name', () => {
        cy.visit(`${Cypress.env('HOST')}`)

        cy.contains('Dan Børge')
    })

    it('should load active consents', () => {
        cy.visit(`${Cypress.env('HOST')}`)

        cy.get('*[class^="navds-accordion"]')
            .find('*[class^="navds-accordion__item"]')
            .should('have.length', 3)
    })

    it('active consent contain consent-code', () => {
        cy.visit(`${Cypress.env('HOST')}`)

        cy.get('*[class^="navds-accordion"]')
            .children()
            .eq(0)
            .click()
            .children()
            .get('b')
            .each(($el, index, $list) => {
                cy.wrap($el).invoke('text').should('have.length', 7)
            })
    })
})
