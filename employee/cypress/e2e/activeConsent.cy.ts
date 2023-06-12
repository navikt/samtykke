import path from 'path'
import selectors from '../support/selectorTypes'

describe('Active consent is loaded as expected', () => {
    it('loads expected active consent with correct data', () => {
        cy.visit(`${Cypress.env('HOST')}`)

        cy.get(selectors.aksel.accordion._).children().eq(0).click()

        cy.get(selectors.aksel.button.secondary.small,)
            .eq(0)
            .click()

        // Check if correct title and consent code is displayed
        cy.get(selectors.aksel.heading.xlarge).should(
            'have.text',
            'Brukertest av NAV.no',
        )
        cy.get(selectors.aksel.heading.medium._)
            .eq(0)
            .should('have.text', 'Kode: X76-2B3')

        cy.get(selectors.aksel.accordion.item).should('have.length', 4)

        // Check if right name is displayed
        cy.get(selectors.aksel.accordion.header.content)
            .eq(0)
            .should('include.text', 'Lars Pølse')

        // Check if audio consent is given, store information consent is not given, and if candidate has concented
        cy.get(selectors.aksel.accordion.header._).children().eq(0).click()

        cy.get(selectors.aksel.accordion.content)
            .eq(0)
            .find(selectors.aksel.heading.small.green)
            .eq(0)
            .should('have.text', 'Lydopptak:')
        cy.get(selectors.aksel.accordion.content)
            .eq(0)
            .find(selectors.aksel.heading.small.green)
            .eq(1)
            .should('have.text', 'ACCEPTED')

        // Check if audio consent is not given, store information consent is given, but candidate has concented
        cy.get(selectors.aksel.accordion.header._).children().eq(1).click()

        cy.get(selectors.aksel.accordion.content)
            .eq(1)
            .find(selectors.aksel.heading.small.red)
            .eq(0)
            .should('have.text', 'Lydopptak:')
        cy.get(selectors.aksel.accordion.content)
            .eq(1)
            .find(selectors.aksel.heading.small.green)
            .eq(0)
            .should('have.text', 'ACCEPTED')

        // Check if candidates which has not consented has their named withdrawn
        cy.get(selectors.aksel.accordion.header.content)
            .eq(2)
            .should('include.text', 'Navn trukket')

        cy.get(selectors.aksel.accordion._).children().eq(2).click()
        cy.get(selectors.aksel.accordion.content)
            .eq(2)
            .find(selectors.aksel.heading.small.red)
            .eq(0)
            .should('have.text', 'Lydopptak:')
        cy.get(selectors.aksel.accordion.content)
            .eq(2)
            .find(selectors.aksel.heading.small.red)
            .eq(1)
            .should('have.text', 'WITHDRAWN')
    })

    it('is able to download consent as pdf', () => {
        cy.visit(`${Cypress.env('HOST')}samtykke/X76-2B3`)

        cy.get(selectors.aksel.button.secondary.medium).click()

        cy.readFile(path.join(Cypress.config('downloadsFolder'), 'Samtykke-Brukertest av NAV.no.pdf'))
    })

    it('does not load a concent which do not exist', () => {
        cy.visit(`${Cypress.env('HOST')}samtykke/sdoighs73456096`)

        cy.get(selectors.aksel.heading.medium._).should(
            'have.text',
            'Fant ikke et samtykke med kode: sdoighs73456096',
        )
    })

    it('does not load list of candidates if no candidates', () => {
        cy.visit(`${Cypress.env('HOST')}samtykke/12J-0ZA`)

        cy.get(selectors.aksel.heading.xlarge).should(
            'have.text',
            'Dagpengeløsning 2.0',
        )
        cy.get(selectors.aksel.heading.medium._)
            .eq(0)
            .should('have.text', 'Kode: 12J-0ZA')

        cy.get(selectors.aksel.heading.medium.italic)
            .should('have.text', 'Ingen har gitt samtykke enda...')

        cy.get('*[class^="navds-accordion"]').should('not.exist')
    })
})
