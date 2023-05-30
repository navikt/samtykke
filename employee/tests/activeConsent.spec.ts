import test from '@playwright/test'

test('routes to correct active consent from landing', async ({ page }) => {
    await page.goto(process.env.HOST!)

    await page.getByText('Brukertest av NAV.no').click()

    await page.getByText('Brukertest av NAV.no').locator('.navds-button').click()
})