import test, { expect } from '@playwright/test'

test('routes to correct active consent from landing', async ({ page }) => {
    await page.goto(process.env.HOST!)

    await page.getByText('Brukertest av NAV.no').click()

    await page.locator('.navds-accordion > .navds-accordion__item').nth(0).locator('.navds-button').click()

    await expect(
        page.locator('.navds-heading--xlarge').nth(1)
    ).toHaveText('Brukertest av NAV.no')
})

test('loads expected active consent with correct data', async ({ page }) => {
    await page.goto(`${process.env.HOST!}#/samtykke/X76-2B3`)

    await expect(
        page.locator('.navds-accordion > .navds-accordion__item > .navds-accordion__header')
    ).toHaveText([
        'Lars Pølse - A99E7BA3',
        'Ole Bolle Brus - 081F1100',
        'Navn trukket - 2E32FA72',
        'Navn trukket - 5D0A3EA2'
    ])
})