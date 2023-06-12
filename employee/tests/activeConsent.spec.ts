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
    await page.goto(`${process.env.HOST!}samtykke/X76-2B3`)

    await expect(
        page.locator('.navds-heading--xlarge').nth(1)
    ).toHaveText('Brukertest av NAV.no')

    await expect(
        page.locator('.navds-heading--medium').first()
    ).toHaveText('Kode: X76-2B3')

    await expect(
        page.locator('.navds-accordion > .navds-accordion__item > .navds-accordion__header')
    ).toContainText([
        'Lars Pølse',
        'Ole Bolle Brus',
        'Navn trukket',
        'Navn trukket'
    ])

    // Candidate has consented with audio recording also accpeted
    await page.getByText('Lars Pølse').click()
    await expect(
        page.locator('.navds-accordion__content').first().locator('.text-green-600')
    ).toHaveText(['Lydopptak:', 'ACCEPTED'])

    // Candidate has consented, but not consenting to audio recording
    await page.getByText('Ole Bolle Brus').click()
    await expect(
        page.locator('.navds-accordion__content').nth(1).locator('.text-red-600')
    ).toHaveText('Lydopptak:')
    await expect(
        page.locator('.navds-accordion__content').nth(1).locator('.text-green-600')
    ).toHaveText('ACCEPTED')

    // Candidate who has withdrawn consent
    await page.getByText('Navn trukket').first().click()
    await expect(
        page.locator('.navds-accordion__content').nth(2).locator('.text-red-600').first()
    ).toHaveText('Lydopptak:')
    await expect(
        page.locator('.navds-accordion__content').nth(2).locator('.text-red-600').last()
    ).toHaveText('WITHDRAWN')
})

test('handles consent with empty list of candidates as expected', async ({ page }) => {
    await page.goto(`${process.env.HOST!}samtykke/12J-0ZA`)

    await expect(
        page.locator('.navds-heading--xlarge').nth(1)
    ).toHaveText('Dagpengeløsning 2.0')

    await expect(
        page.locator('.navds-heading--medium').first()
    ).toHaveText('Kode: 12J-0ZA')

    await expect(
        page.locator('.navds-heading--medium').nth(2)
    ).toHaveText('Ingen har gitt samtykke enda...')

    await expect(
        page.locator('navds-accordion')
    ).toHaveCount(0)
})

test('consent which do not exists is handeled as expected', async ({ page }) => {
    await page.goto(`${process.env.HOST!}samtykke/sdoighs73456096`)

    await expect(
        page.locator('.navds-heading--medium')
    ).toHaveText('Fant ikke et samtykke med kode: sdoighs73456096')
})