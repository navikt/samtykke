import path from 'path'
import selectors from '../support/selectorTypes'

describe('Active consent is loaded as expected', () => {
    it('loads expected active consent with correct data', () => {
        cy.visit(`${Cypress.env('HOST')}`)
        
        cy.findByRole('button', { name: 'Brukertest av NAV.no'}).click()
        cy.findByRole('button', { name: 'Til samtykke'}).click()

        cy.findByText('Brukertest av NAV.no')
        cy.findByText('Kode: X76-2B3')

        cy.findByRole('button', {name: /Lars Pølse/ }).click()

        // Check if audio consent is given, store information consent is not given, and if candidate has concented
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
        cy.findByRole('button', { name: /Ole Bolle Brus/ }).click()

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
        cy.findAllByRole('button', { name: /Navn trukket/ })
            .should('have.length', 2)
            .click({ multiple: true })

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

        cy.findByRole('button', { name: 'Last ned' }).click()

        cy.readFile(path.join(Cypress.config('downloadsFolder'), 'Samtykke-Brukertest av NAV.no.pdf'))
    })

    it('does not load a concent which do not exist', () => {
        cy.visit(`${Cypress.env('HOST')}samtykke/sdoighs73456096`)

        cy.findByText('Fant ikke et samtykke med kode: sdoighs73456096')
    })

    it('does not load list of candidates if no candidates', () => {
        cy.visit(`${Cypress.env('HOST')}samtykke/12J-0ZA`)

        cy.findByText('Dagpengeløsning 2.0')
        cy.findByText('Kode: 12J-0ZA')

        cy.findByText('Ingen har gitt samtykke enda...')

        cy.get(selectors.aksel.accordion._).should('not.exist')
    })
})
