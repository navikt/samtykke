describe('give consent form behaves as expected', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('HOST')}#/samtykke/L90-12N`)
    })

    it('should redirect on correct data', () => {
        cy.get('input[name="name"]').type('Lars pølse')
        cy.get('input[name="email"]').type('lars.pølse@gmail.com')

        cy.get('*[class^="navds-checkbox navds-checkbox--medium"]')
            .eq(1)
            .click()

        cy.get(
            '*[class^="navds-button navds-button--primary navds-button--medium"]',
        )
            .eq(1)
            .click()

        cy.location().should((loc) => {
            expect(loc.href).to.equal(`${Cypress.env('HOST')}#/kvitering`)
        })
    })

    it('should display errors on wrong/no input', () => {
        cy.get(
            '*[class^="navds-button navds-button--primary navds-button--medium"]',
        )
            .eq(1)
            .click()

        cy.get('*[class^="navds-error-message navds-label"]')
            .eq(0)
            .should('have.text', 'Du må legge inn ditt navn')

        cy.get('*[class^="navds-error-message navds-label"]')
            .eq(1)
            .should('have.text', 'Du må legge inn din e-post')

        cy.get('input[name="email"]').type('sdpob1"49#ækb.n%f')

        cy.get(
            '*[class^="navds-button navds-button--primary navds-button--medium"]',
        )
            .eq(1)
            .click()

        cy.get('*[class^="navds-error-message navds-label"]')
            .eq(1)
            .should('have.text', 'E-post er på ugyldig format')
    })

    it('should not route if consent is not given and error is shown', () => {
        cy.get('input[name="name"]').type('Lars pølse')
        cy.get('input[name="email"]').type('lars.pølse@gmail.com')

        cy.get(
            '*[class^="navds-button navds-button--primary navds-button--medium"]',
        )
            .eq(1)
            .click()

        cy.get('*[class^="navds-error-message navds-label"]')
            .eq(0)
            .should(
                'have.text',
                'For å kunne samtykke må du krysse av på at du har lest og forstått samtykke',
            )

        cy.location().should((loc) => {
            expect(loc.href).to.equal(
                `${Cypress.env('HOST')}#/samtykke/L90-12N`,
            )
        })
    })
})
