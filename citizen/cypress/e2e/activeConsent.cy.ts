describe('active consent behaves as expected', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('HOST')}#/samtykke/X76-2B3`)
    })

    it('should activate update button on data change', () => {
        cy.get('input[name="name"]').type('foiha')

        cy.get(
            '*[class^="navds-button navds-button--secondary navds-button--medium"]',
        )
            .eq(1)
            .should('have.text', 'Oppdater')
    })

    it('should de-activate button on data reverting to original', () => {
        cy.get('input[name="name"]').type('foi')

        cy.get(
            '*[class^="navds-button navds-button--secondary navds-button--medium"]',
        )
            .eq(1)
            .should('have.text', 'Oppdater')

        cy.get('input[name="name"]').type('{backspace}{backspace}{backspace}')

        cy.get(
            '*[class^="navds-button navds-button--secondary navds-button--medium"]',
        )
            .contains('Oppdater')
            .should('not.exist')
    })

    it('should display errors on wrong/no input', () => {
        cy.get('input[name="name"]').clear()
        cy.get('input[name="email"]').clear()

        cy.get(
            '*[class^="navds-button navds-button--secondary navds-button--medium"]',
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
            '*[class^="navds-button navds-button--secondary navds-button--medium"]',
        )
            .eq(1)
            .click()

        cy.get('*[class^="navds-error-message navds-label"]')
            .eq(1)
            .should('have.text', 'E-post er på ugyldig format')
    })

    it('on withdraw consent, modal is opened and behaves as expected', () => {
        cy.get(
            '*[class^="navds-button navds-button--danger navds-button--medium"]',
        ).click()

        cy.get(
            '*[class^="navds-button navds-button--danger navds-button--medium"]',
        )
            .eq(1)
            .contains('Trekk')
            .click()

        cy.location().should((loc) => {
            expect(loc.href).to.equal(`${Cypress.env('HOST')}#/kvitering`)
        })
    })
})
