import { format, parseISO } from 'date-fns'
import selectors from '../support/selectorTypes'

const fillConsentInputs = () => {
    cy.findByRole('textbox', { name: 'Tittel' }).type('Brukertest for AAP')
    cy.findByRole('textbox', { name: 'Team/seksjon' }).type('Team AAP')
    cy.findByRole('textbox', { name: 'Tema' }).type('Dårlig råd')
    cy.findByRole('textbox', { name: 'Formålet med samtykket'})
        .type('Dette er en brukertest som tar for seg å teste den nye AAP kalkulatoren')
    cy.findByRole('textbox', { name: 'Sluttresultat'}).type('rapport')
    cy.findByRole('textbox', { name: 'Utløpsdato'})
        .type(`${format(parseISO(new Date().toISOString()), 'dd.MM.yyyy')}`)
        .type('{esc}')
}

describe('Data is filled correctly and request is successfull', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('HOST')}samtykke/ny`)
    })

    it('should redirect on correct data', () => {
        fillConsentInputs()

        cy.findByRole('button', { name: 'Videre' }).click()

        cy.findByRole('textbox', { name: 'Slack kanal' }).type('samtykke-bot-test')

        cy.findByRole('button', { name: 'Finn kanal' }).click()
        cy.findByRole('button', { name: 'Opprett samtykke' }).click()

        cy.location().should((loc) => {
            expect(loc.href).to.equal(`${Cypress.env('HOST')}`)
        })
    })

    it('displays size warning on selecting slack channel', () => {
        fillConsentInputs()

        cy.findByRole('button', { name: 'Videre'}).click()
        cy.findByRole('textbox', { name: 'Slack kanal' }).type('samtykke-bot-test')
        cy.findByRole('button', { name: 'Finn kanal' }).click()

        cy.findByText('OBS! Denne kanalen har over 20 medlemmer')
    })

    it('should display error on no slack channel selected', () => {
        fillConsentInputs()

        cy.findByRole('button', { name: 'Videre'}).click()
        cy.findByRole('button', { name: 'Finn kanal' }).click()
        
        cy.findByText('Du må skrive inn en slack kanal')
    })

    it('should display errors on empty input', () => {
        cy.findByRole('button', { name: 'Videre'}).click()

        cy.findByText('Du må sette en tittel')
        cy.findByText('Du må sette et team/seksjon')
        cy.findByText('Du må sette et tema')
        cy.findByText('Du må sette et formål')
        cy.findByText('Du må sette et sluttresultat')
        cy.findByText('Du må sette en utløpsdato')
    })

    it('should display errors on wrong input', () => {
        cy.findByRole('textbox', { name: 'Tittel' }).type('AAP')
        cy.findByRole('textbox', { name: 'Formålet med samtykket'}).type('den nye AAP kalkulatoren')

        cy.findByRole('button', { name: 'Videre'}).click()

        cy.findByText('Tittelen må være lengre enn 5 bokstaver')
        cy.findByText('Formålet må være lengre en 30 bokstaver')

        cy.findAllByRole('textbox').clear()

        cy.findByRole('textbox', { name: 'Tittel' })
            .type(
                `Hei, dette er en veldig lang tittel for samtykket, 
                ja den er veldig lang fordi det er bare sånn`
            )

        cy.findByRole('textbox', { name: 'Formålet med samtykket'})
            .type(
                `den nye AAP kalkulatoren med en ekstrem lang beskrivelse
                den nye AAP kalkulatoren med en ekstrem lang beskrivelse
                den nye AAP kalkulatoren med en ekstrem lang beskrivelse
                den nye AAP kalkulatoren med en ekstrem lang beskrivelse
                den nye AAP kalkulatoren med en ekstrem lang beskrivelse
                den nye AAP kalkulatoren med en ekstrem lang beskrivelse
                den nye AAP kalkulatoren med en ekstrem lang beskrivelse
                den nye AAP kalkulatoren med en ekstrem lang beskrivelse`,
                { delay: 0.1 },
            )

        cy.findByRole('button', { name: 'Videre'}).click()

        cy.findByText('Tittelen må være under 50 bokstaver')
        cy.findByText('Formålet må være under 300 bokstaver')
    })

    it('should not route on wrong input', () => {
        cy.findByRole('button', { name: 'Videre'}).click()

        cy.location().should((loc) => {
            expect(loc.href).to.eq(`${Cypress.env('HOST')}samtykke/ny`)
        })
    })
})
