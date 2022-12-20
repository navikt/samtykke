describe('Messages is loaded as expected', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('HOST')}#/meldinger`)
    })

    it('displays all messages correctly', () => {
        cy.get('*[class^="navds-accordion__item"]').should('have.length', 3)

        // Check if titles of messages is displayed
        cy.get('*[class^="flex flex-row place-items-center"]')
            .eq(1)
            .should('have.text', 'Samtykke gitt til: Brukertest av NAV.no')
        cy.get('*[class^="flex flex-row place-items-center"]')
            .eq(3)
            .should('have.text', 'Samtykke trukket til: Brukertest av NAV.no')
        cy.get('*[class^="flex flex-row place-items-center"]')
            .eq(5)
            .should('have.text', 'Samtykke: Dagpengeløsning 2.0, slettet')

        // Check if "not read" indicator displays
        cy.get('*[class^="ml-4 w-3 h-3 bg-orange-400 rounded-full"]').should(
            'have.length',
            2,
        )

        cy.get('*[class^="navds-accordion__header"]').eq(0).click()
    })

    it('routes to correct active consent', () => {
        cy.get('*[class^="navds-accordion__item"]').eq(0).click()
        cy.get(
            '*[class^="navds-button navds-button--secondary navds-button--small"]',
        )
            .eq(0)
            .click()

        cy.location().should((loc) => {
            expect(loc.href).to.eq(`${Cypress.env('HOST')}#/samtykke/X76-2B3`)
        })

        cy.get('*[class^="navds-heading navds-heading--xlarge"]')
            .eq(1)
            .should('have.text', 'Brukertest av NAV.no')
    })

    it('removes not read indicator on message press', () => {
        cy.get('*[class^="navds-accordion__item"]').eq(0).click()
        cy.get('*[class^="navds-accordion__item"]').eq(1).click()

        cy.get('*[class^="ml-4 w-3 h-3 bg-orange-400 rounded-full"]').should(
            'not.exist',
        )
    })
})
