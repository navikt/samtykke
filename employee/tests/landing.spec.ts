import test, { expect } from '@playwright/test'

test('employee name loaded correctly', async ({ page }) => {
    await page.goto(process.env.HOST!)

    await expect(page.locator('.text-2xl')).toHaveText('Dan Børge')
})

test('loads active consents', async ({ page }) => {
    await page.goto(process.env.HOST!)

    await expect(
        page.locator('.navds-accordion > .navds-accordion__item > .navds-accordion__header')
    ).toHaveText([
        'Brukertest av NAV.no',
        'Test av ny AAP kalkulator',
        'Dagpengeløsning 2.0'
    ])
})

test('active consents contains consent-codes', async ({ page }) => {
    await page.goto(process.env.HOST!)

    const correctConsentCodeTexts: Array<string> = [
        'Kode: X76-2B3',
        'Kode: L90-12N',
        'Kode: 12J-0ZA'
    ]

    const accordionItems = await page.locator('.navds-accordion > .navds-accordion__item')

    for (let i = 0; i < await accordionItems.count(); i ++) {
        await expect(accordionItems.nth(i).locator('.navds-body-short')).toHaveText(correctConsentCodeTexts[i])
    }
})