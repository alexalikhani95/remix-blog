import { test, expect } from '@playwright/test';

test('contains text', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.click('text=Discover Posts');

  await expect(page).toHaveURL('http://localhost:3000/posts')
});
