import { testAccesibility } from '../support/accesibility'

describe('receipt handles as expected', () => {
    it('after giving consent, correct receipt is displayed', () => {
        cy.visit(`${Cypress.env('HOST')}samtykke/L90-12N`)

        cy.findByRole('textbox', { name: 'Ditt navn' }).type('Lars pølse')
        cy.findByRole('textbox', { name: 'Din e-post' }).type('Lars.pølse@outlook.com')

        cy.findByRole('checkbox', { name: 'Ja, jeg samtykker' }).click()

        cy.findByRole('button', { name: 'Gi samtykke' }).click()

        cy.location().should((loc) => {
            expect(loc.href).to.equal(`${Cypress.env('HOST')}kvitering`)
        })

        testAccesibility()

        cy.findByText('Du har gitt samtykke til: Test av ny AAP kalkulator. Vi setter pris på at du vil hjelpe med å gjøre NAV bedre.')
    })

    it('after updating consent, correct receipt is displayed', () => {
        cy.visit(`${Cypress.env('HOST')}samtykke/X76-2B3`)

        cy.findByRole('textbox', { name: 'Ditt navn' }).type('Jens Monsen')
        cy.findByRole('button', { name: 'Oppdater' }).click()

        testAccesibility()

        cy.findByText('Samtykket ditt til: Brukertest av NAV.no har blitt oppdater, og ansatte tilknyttet ditt samtykke har blitt varslet og vil oppdatere ekstern data.')
    })

    it('after withdrawing consent, correct receipt is displayed', () => {
        cy.visit(`${Cypress.env('HOST')}samtykke/X76-2B3`)

        cy.findByRole('button', { name: 'Trekk samtykke' }).click()
        cy.findByRole('button', { name: 'Trekk' }).click()

        testAccesibility()

        cy.findByText('Samtykket ditt til: Brukertest av NAV.no har blitt trukket og all data knyttet til samtykket vil bli slettet/anonymisert. Ansatte knyttet til samtykket har blitt varslet og vil slette all ekstern data.')
    })

    it('if not routing from a consent, reciept should not be displayed', () => {
        cy.visit(`${Cypress.env('HOST')}kvitering`)

        testAccesibility()

        cy.findByText('Ingen kvitering å vise')
    })
})
