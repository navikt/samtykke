describe('receipt handles as expected', () => {
    it('after giving consent, correct receipt is displayed', () => {
        cy.visit(`${Cypress.env('HOST')}#/samtykke/L90-12N`)

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

        cy.location().should((loc) => {
            expect(loc.href).to.equal(`${Cypress.env('HOST')}#/kvitering`)
        })

        cy.get('p')
            .eq(0)
            .should(
                'have.text',
                'Du har gitt samtykke til: Test av ny AAP kalkulator. Vi setter pris på at du vil hjelpe med å gjøre NAV bedre.',
            )
    })

    it('after updating consent, correct receipt is displayed', () => {
        cy.visit(`${Cypress.env('HOST')}#/samtykke/X76-2B3`)

        cy.get('input[name="name"]').type('foiha')

        cy.get(
            '*[class^="navds-button navds-button--secondary navds-button--medium"]',
        )
            .eq(1)
            .click()

        cy.get('p').should(
            'have.text',
            'Samtykket ditt til: Brukertest av NAV.no har blitt oppdater, og ansatte tilknyttet ditt samtykke har blitt varslet og vil oppdatere ekstern data.',
        )
    })

    it('after withdrawing consent, correct receipt is displayed', () => {
        cy.visit(`${Cypress.env('HOST')}#/samtykke/X76-2B3`)

        cy.get(
            '*[class^="navds-button navds-button--danger navds-button--medium"]',
        ).click()

        cy.get(
            '*[class^="navds-button navds-button--danger navds-button--medium"]',
        )
            .eq(1)
            .contains('Trekk')
            .click()

        cy.get('p').should(
            'have.text',
            'Samtykket ditt til: Brukertest av NAV.no har blitt trukket og all data knyttet til samtykket vil bli slettet/anonymisert. Ansatte knyttet til samtykket har blitt varslet og vil slette all ekstern data.',
        )
    })

    it('if not routing from a consent, reciept should not be displayed', () => {
        cy.visit(`${Cypress.env('HOST')}#/kvitering`)

        cy.get('*[class^="navds-heading navds-heading--large"]').should(
            'have.text',
            'Ingen kvitering å vise',
        )
    })
})
