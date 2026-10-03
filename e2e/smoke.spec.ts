import { expect, test } from '@playwright/test';

test('home → About → browser back renders both routes without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('/');
  await expect(page.locator('main section[aria-label="Hero"] h1')).toBeVisible();
  await expect(page.locator('main section[aria-labelledby="work-heading"] article')).toHaveCount(3);
  await expect(page.locator('main section[aria-labelledby="company-note-heading"]')).toBeVisible();

  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator('main.about h1')).toBeVisible();
  await expect(page.locator('main.about section')).toHaveCount(4);

  await page.goBack();
  await expect(page).toHaveURL('/');
  await expect(page.locator('main section[aria-label="Hero"] h1')).toBeVisible();
  expect(errors).toEqual([]);
});

test('home and About reflow at narrow mobile width with enlarged text', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 850 });

  for (const route of ['/', '/about']) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });

    const layout = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
      heading: document.querySelector('main h1')!.scrollWidth,
      headingBox: document.querySelector('main h1')!.clientWidth,
    }));
    expect(layout.width).toBeLessThanOrEqual(layout.viewport);
    expect(layout.heading).toBeLessThanOrEqual(layout.headingBox);
  }
});
