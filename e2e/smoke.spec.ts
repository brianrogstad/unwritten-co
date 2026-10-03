import { expect, test } from '@playwright/test';

test('home → About → browser back renders both routes without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('/');
  await expect(page.locator('main section[aria-label="Hero"] h1')).toBeVisible();

  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator('main.about h1')).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL('/');
  await expect(page.locator('main section[aria-label="Hero"] h1')).toBeVisible();
  expect(errors).toEqual([]);
});
