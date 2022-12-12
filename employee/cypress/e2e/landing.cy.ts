describe('Landing page is loaded propperly', () => {
    it('Employee name loaded', () => {
        cy.visit('http://localhost:5173/ansatt/')

        cy.contains('Dan Børge')
    })

    it('Loads active consents', () => {
        cy.visit('http://localhost:5173/ansatt/')

        cy.get('*[class^="navds-accordion"]')
            .find('*[class^="navds-accordion__item"]')
            .should('have.length', 3)
    })

    it('Active consent contain consent-code', () => {
        cy.visit('http://localhost:5173/ansatt/')

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
