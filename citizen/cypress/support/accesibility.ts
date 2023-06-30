import { ContextObject } from 'axe-core'
import { Options } from 'cypress-axe'

type CypressAxeContext = string | Node | ContextObject | undefined

export const testAccesibility = (context?: CypressAxeContext, options?: Options) => {
    cy.injectAxe()
    cy.checkA11y(context, options)
}