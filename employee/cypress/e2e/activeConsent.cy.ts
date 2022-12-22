describe('Active consent is loaded as expected', () => {
    it('loads expected active consent with correct data', () => {
        cy.visit(`${Cypress.env('HOST')}`)

        cy.get('*[class^="navds-accordion"]').children().eq(0).click()

        cy.get(
            '*[class^="navds-button navds-button--secondary navds-button--small"]',
        )
            .eq(0)
            .click()

        // Check if correct title and consent code is displayed
        cy.get('*[class^="navds-heading navds-heading--xlarge"]')
            .eq(1)
            .should('have.text', 'Brukertest av NAV.no')
        cy.get('*[class^="navds-heading navds-heading--medium"]')
            .eq(0)
            .should('have.text', 'Kode: X76-2B3')

        cy.get('*[class^="navds-accordion__item"]').should('have.length', 4)

        // Check if right name is displayed
        cy.get('*[class^="navds-accordion__header-content"]')
            .eq(0)
            .should('have.text', 'Lars Pølse')

        // Check if audio consent is given, store information consent is not given, and if candidate has concented
        cy.get('*[class^="navds-accordion__header"]').children().eq(0).click()

        cy.get('*[class^="navds-accordion__content"]')
            .eq(0)
            .find(
                '*[class^="text-green-600 navds-heading navds-heading--small"]',
            )
            .eq(0)
            .should('have.text', 'Lydopptak:')
        cy.get('*[class^="navds-accordion__content"]')
            .eq(0)
            .find('*[class^="text-red-600 navds-heading navds-heading--small"]')
            .eq(0)
            .should('have.text', 'Lagre kontaktinfo i 6 mnd:')
        cy.get('*[class^="navds-accordion__content"]')
            .eq(0)
            .find(
                '*[class^="text-green-600 navds-heading navds-heading--small"]',
            )
            .eq(1)
            .should('have.text', 'SAMTYKKE_GITT')

        // Check if audio consent is not given, store information consent is given, but candidate has concented
        cy.get('*[class^="navds-accordion__header"]').children().eq(1).click()

        cy.get('*[class^="navds-accordion__content"]')
            .eq(1)
            .find('*[class^="text-red-600 navds-heading navds-heading--small"]')
            .eq(0)
            .should('have.text', 'Lydopptak:')
        cy.get('*[class^="navds-accordion__content"]')
            .eq(1)
            .find(
                '*[class^="text-green-600 navds-heading navds-heading--small"]',
            )
            .eq(0)
            .should('have.text', 'Lagre kontaktinfo i 6 mnd:')
        cy.get('*[class^="navds-accordion__content"]')
            .eq(1)
            .find(
                '*[class^="text-green-600 navds-heading navds-heading--small"]',
            )
            .eq(1)
            .should('have.text', 'SAMTYKKE_GITT')

        // Check if candidates which has not consented has their named withdrawn
        cy.get('*[class^="navds-accordion__header-content"]')
            .eq(2)
            .should('have.text', 'Navn trukket')

        cy.get('*[class^="navds-accordion"]').children().eq(2).click()
        cy.get('*[class^="navds-accordion__content"]')
            .eq(2)
            .find('*[class^="text-red-600 navds-heading navds-heading--small"]')
            .eq(0)
            .should('have.text', 'Lydopptak:')
        cy.get('*[class^="navds-accordion__content"]')
            .eq(2)
            .find('*[class^="text-red-600 navds-heading navds-heading--small"]')
            .eq(2)
            .should('have.text', 'SAMTYKKE_TRUKKET')

        cy.get('*[class^="navds-accordion"]').children().eq(3).click()
        cy.get('*[class^="navds-accordion__content"]')
            .eq(3)
            .find('*[class^="text-red-600 navds-heading navds-heading--small"]')
            .eq(0)
            .should('have.text', 'Lydopptak:')
        cy.get('*[class^="navds-accordion__content"]')
            .eq(3)
            .find('*[class^="text-red-600 navds-heading navds-heading--small"]')
            .eq(2)
            .should('have.text', 'DATA_SLETTET')
    })

    it('does not load a concent which do not exist', () => {
        cy.visit(`${Cypress.env('HOST')}#/samtykke/sdoighs73456096`)

        cy.get('*[class^="navds-heading navds-heading--medium"]').should(
            'have.text',
            'Fant ikke et samtykke med kode: sdoighs73456096',
        )
    })

    it('does not load list of candidates if no candidates', () => {
        cy.visit(`${Cypress.env('HOST')}#/samtykke/12J-0ZA`)

        cy.get('*[class^="navds-heading navds-heading--xlarge"]')
            .eq(1)
            .should('have.text', 'Dagpengeløsning 2.0')
        cy.get('*[class^="navds-heading navds-heading--medium"]')
            .eq(0)
            .should('have.text', 'Kode: 12J-0ZA')

        cy.get(
            '*[class^="px-6 mb-6 italic navds-heading navds-heading--medium"]',
        ).should('have.text', 'Ingen har gitt samtykke enda...')

        cy.get('*[class^="navds-accordion"]').should('not.exist')
    })
})
