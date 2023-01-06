describe('displaying of consent based on candidature should behave as expected', () => {
    it('should display give consent if no canditature', () => {
        cy.visit(`${Cypress.env('HOST')}`)

        cy.get('input').type('12J-0ZA')

        cy.get(
            '*[class^="navds-button navds-button--primary navds-button--medium"]',
        )
            .eq(1)
            .click()

        cy.get('*[class^="navds-heading navds-heading--xlarge"]')
            .eq(1)
            .should('have.text', 'Gi samtykke')
    })

    it('should display active consent if already candidate', () => {
        cy.visit(`${Cypress.env('HOST')}`)

        cy.get('input').type('X76-2B3')

        cy.get(
            '*[class^="navds-button navds-button--primary navds-button--medium"]',
        )
            .eq(1)
            .click()

        cy.get('*[class^="navds-heading navds-heading--xlarge"]')
            .eq(1)
            .should('have.text', 'Administrer samtykke')
    })
})
