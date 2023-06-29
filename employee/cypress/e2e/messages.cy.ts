import { testAccesibility } from '../support/accesibility'

describe('Messages is loaded as expected', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('HOST')}meldinger`)
        testAccesibility()
    })

    it('displays all messages correctly', () => {
        cy.findByText('Samtykke gitt til: Brukertest av NAV.no')
        cy.findByText('Samtykke trukket til: Brukertest av NAV.no')
        cy.findByText('Samtykke: Dagpengeløsning 2.0, slettet')

        cy.findAllByText('Ulest').should('have.length', 2)
    })

    it('routes to correct active consent', () => {
        cy.findByRole('button', { name: /Samtykke gitt til: Brukertest av NAV.no/ }).click()
        cy.findByRole('button', { name: 'Til samtykke' }).click()

        cy.location().should((loc) => {
            expect(loc.href).to.eq(`${Cypress.env('HOST')}samtykke/X76-2B3`)
        })

        cy.findByText('Brukertest av NAV.no')
    })

    it('removes not read indicator on message press', () => {
        cy.findByRole('button', { name: /Samtykke gitt til: Brukertest av NAV.no/ }).click()
        cy.findByRole('button', { name: /Samtykke trukket til: Brukertest av NAV.no/ }).click()

        cy.findByText('Ulest').should('not.exist')
    })
})
