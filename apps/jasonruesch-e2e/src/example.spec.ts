import { expect, test } from '@playwright/test';

// eslint-disable-next-line playwright/no-skipped-test
test.skip('has title', async ({ page }) => {
  await page.goto('/');

  // Expect h1 to contain a substring.
  expect(await page.locator('h1').innerText()).toContain('Welcome');
});
