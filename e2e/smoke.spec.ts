import { expect, test } from '@playwright/test';

test('the sign shows real work and correspondence, and old About links return home', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Unwritten Co.', level: 1 })).toBeVisible();
  await expect(page.getByText('We build and operate our own digital properties.')).toBeVisible();
  await expect(page.getByRole('link', { name: /League Index/ })).toHaveAttribute('href', 'https://theleagueindex.com/');
  await expect(page.locator('main a[href="mailto:support@theunwrittencompany.com"]')).toBeVisible();
  await expect(page.locator('nav a')).toHaveCount(2);
  await expect(page.locator('main img')).toHaveCount(0);

  await page.goto('/about/');
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('heading', { name: 'Unwritten Co.', level: 1 })).toBeVisible();
  expect(errors).toEqual([]);
});

test('contact and work links have finger-sized targets on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 850 });
  await page.goto('/');

  for (const selector of ['.navbar__logo', '.navbar__contact', '.example__link', '.correspondence a']) {
    const height = await page.locator(selector).evaluate((element) => element.getBoundingClientRect().height);
    expect(height, selector).toBeGreaterThanOrEqual(44);
  }
});

test('the sign reflows without horizontal scrolling on mobile with enlarged text', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 850 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });

  const layout = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
    heading: document.querySelector('main h1')!.scrollWidth,
    headingBox: document.querySelector('main h1')!.clientWidth,
    contactRight: document.querySelector('.navbar__contact')!.getBoundingClientRect().right,
    labelRight: document.querySelector('.correspondence h2')!.getBoundingClientRect().right,
  }));
  expect(layout.width).toBeLessThanOrEqual(layout.viewport);
  expect(layout.heading).toBeLessThanOrEqual(layout.headingBox);
  expect(layout.contactRight).toBeLessThanOrEqual(layout.viewport);
  expect(layout.labelRight).toBeLessThanOrEqual(layout.viewport);
});
