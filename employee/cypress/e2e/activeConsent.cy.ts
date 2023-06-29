import path from 'path'

const testAccesibility = () => {
    cy.injectAxe()
    cy.checkA11y()
}

describe('Active consent is loaded as expected', () => {
    it('loads expected active consent with correct data', () => {
        cy.visit(`${Cypress.env('HOST')}`)

        testAccesibility()

        cy.findByRole('button', { name: 'Brukertest av NAV.no'}).click()
        cy.findByRole('button', { name: 'Til samtykke'}).click()
        
        testAccesibility()

        cy.findByText('Brukertest av NAV.no')
        cy.findByText('Kode: X76-2B3')

        cy.findByRole('button', {name: /Lars Pølse/ }).click()
        cy.findByRole('button', { name: /Ole Bolle Brus/ }).click()
        cy.findAllByRole('button', { name: /Navn trukket/ })
            .should('have.length', 2)
            .click({ multiple: true })
        
        cy.findAllByText('Samtykke til lydopptak gitt').should('have.length', 1)
        cy.findAllByText('Samtykke til lydopptak ikke gitt').should('have.length', 3)
        cy.findAllByText('Samtykke gitt').should('have.length', 2)
        cy.findAllByText('Samtykke trukket').should('have.length', 2)
        
    })

    it('is able to download consent as pdf', () => {
        cy.visit(`${Cypress.env('HOST')}samtykke/X76-2B3`)

        testAccesibility()

        cy.findByRole('button', { name: 'Last ned' }).click()

        cy.readFile(path.join(Cypress.config('downloadsFolder'), 'Samtykke-Brukertest av NAV.no.pdf'))
    })

    it('does not load a concent which do not exist', () => {
        cy.visit(`${Cypress.env('HOST')}samtykke/sdoighs73456096`)

        testAccesibility()

        cy.findByText('Fant ikke et samtykke med kode: sdoighs73456096')
    })

    it('does not load list of candidates if no candidates', () => {
        cy.visit(`${Cypress.env('HOST')}samtykke/12J-0ZA`)

        testAccesibility()

        cy.findByText('Dagpengeløsning 2.0')
        cy.findByText('Kode: 12J-0ZA')

        cy.findByText('Ingen har gitt samtykke enda...')
    })
})
