describe('active consent behaves as expected', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('HOST')}samtykke/X76-2B3`)
    })

    it('should be able to update information in consent', () => {
        cy.findByRole('textbox', { name: 'Ditt navn' }).type('foiha')

        cy.findByRole('button', { name: 'Oppdater'}).click()

        cy.location().should((loc) => {
            expect(loc.href).to.equal(`${Cypress.env('HOST')}kvitering`)
        })
    })

    it('should de-activate button on data reverting to original', () => {
        cy.findByRole('textbox', { name: 'Ditt navn' }).type('foi')
        cy.findByRole('button', { name: 'Oppdater'})

        cy.findByRole('textbox', { name: 'Ditt navn' }).type('{backspace}{backspace}{backspace}')
        cy.findByRole('button', { name: 'Oppdater'}).should('not.exist')
    })

    it('should display errors on illegal input', () => {
        cy.findByRole('textbox', { name: 'Ditt navn' }).clear()
        cy.findByRole('textbox', { name: 'Din e-post' }).clear()

        cy.findByRole('button', { name: 'Oppdater'}).click()

        cy.findByText('Du må legge inn ditt navn')
        cy.findByText('Du må legge inn din e-post')
        
        cy.findByRole('textbox', { name: 'Din e-post' }).type('sdpob1"49#ækb.n%f')

        cy.findByRole('button', { name: 'Oppdater'}).click()

        cy.findByText('E-post er på ugyldig format')
    })

    it('on withdraw consent, modal is opened and behaves as expected', () => {
        cy.findByRole('button', { name: 'Trekk samtykke'}).click()
        cy.findByRole('button', { name: 'Trekk'}).click()
        
        cy.location().should((loc) => {
            expect(loc.href).to.equal(`${Cypress.env('HOST')}kvitering`)
        })
    })
})
