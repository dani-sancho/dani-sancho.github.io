import { test, expect } from '@playwright/test';

test.describe('Portfolio E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the main page', async ({ page }) => {
    await expect(page).toHaveTitle(/Dani Sancho | Senior Frontend Developer/);
  });

  test('should have proper meta description', async ({ page }) => {
    const meta = page.locator('meta[name="description"]');
    await expect(meta).toHaveAttribute('content', /Senior Frontend Developer/);
  });

  test('should have proper og:title', async ({ page }) => {
    const meta = page.locator('meta[property="og:title"]');
    await expect(meta).toHaveAttribute('content', /Dani Sancho/);
  });
});