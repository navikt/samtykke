describe('Give consent form behaves as expected', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('HOST')}#/samtykke/L90-12N`)
    })

    it('should redirect on correct data', () => {
        cy.get('input[name="name"]').type('Lars pølse')
        cy.get('input[name="email"]').type('lars.pølse@gmail.com')

        cy.get('*[class^="navds-checkbox navds-checkbox--medium"]')
            .eq(2)
            .click()

        cy.get(
            '*[class^="navds-button navds-button--primary navds-button--medium"]',
        )
            .eq(1)
            .click()
    })
})
