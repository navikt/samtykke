describe('displaying of consent based on candidature should behave as expected', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('HOST')}`)
    })
    
    it('should display give consent if no canditature', () => {
        cy.findByRole('textbox', { name: 'Samtykke-kode' }).type('12J-0ZA')
        cy.findByRole('button', { name: 'OK' }).click()

        cy.findByRole('button', { name: 'Gi samtykke' })
    })

    it('should display active consent if already candidate', () => {
        cy.get('input').type('X76-2B3')

        cy.findByRole('button', { name: 'OK' }).click()

        cy.findByRole('button', { name: 'Trekk samtykke' })
    })
})
