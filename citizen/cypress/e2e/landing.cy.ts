describe('landing page behaves as expected', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('HOST')}`)
    })
    
    it('should load landing page', () => {
        cy.get('*[class^="navds-heading navds-heading--xlarge"]').should(
            'have.text',
            'Gi nytt samtykke',
        )
    })

    it('should handle empty consent code as expected', () => {
        cy.get(
            '*[class^="navds-button navds-button--primary navds-button--medium"]',
        )
            .eq(1)
            .click()

        cy.get('*[class^="navds-error-message navds-label"]').should(
            'have.text',
            'Du må legge til en samtykke-kode',
        )
    })

    it('should handle consent code with wrong format as expected', () => {
        cy.get('input').type('llv1uyg7xv')

        cy.get(
            '*[class^="navds-button navds-button--primary navds-button--medium"]',
        )
            .eq(1)
            .click()

        cy.get('*[class^="navds-error-message navds-label"]').should(
            'have.text',
            'Samtykke-kode er på feil format',
        )
    })

    it('should handle consent which does not exist as expected', () => {
        cy.get('input').type('7cv-n3t')

        cy.get(
            '*[class^="navds-button navds-button--primary navds-button--medium"]',
        )
            .eq(1)
            .click()

        cy.get('*[class^="navds-error-message navds-label"]').should(
            'have.text',
            'Fant ikke samtykke med kode: 7cv-n3t',
        )
    })

    it('should route to consent which does exist', () => {
        cy.get('input').type('X76-2B3')

        cy.get(
            '*[class^="navds-button navds-button--primary navds-button--medium"]',
        )
            .eq(1)
            .click()

        cy.location().should((loc) => {
            expect(loc.href).to.eq(`${Cypress.env('HOST')}samtykke/X76-2B3`)
        })
    })
})
