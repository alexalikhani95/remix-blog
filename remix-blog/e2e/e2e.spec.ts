import { test, expect } from '@playwright/test';

test('The correct urls when navigating pages', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.click('text=Discover Posts');

  await expect(page).toHaveURL('http://localhost:3000/posts')

  await page.click('text=First Post');

  await expect(page).toHaveURL('http://localhost:3000/posts/1')
  });
