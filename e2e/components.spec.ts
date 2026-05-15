import { test, expect } from '@playwright/test';

test.describe('Components E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('navbar should be visible', async ({ page }) => {
    await expect(page.locator('nav[role="navigation"]')).toBeVisible();
  });

  test('navbar should have accessible label', async ({ page }) => {
    const nav = page.locator('nav[role="navigation"]');
    await expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  test('footer should be visible', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
  });

  test('footer should have contact buttons with aria-labels', async ({ page }) => {
    await expect(page.locator('app-button[aria-label="Phone"]')).toBeVisible();
    await expect(page.locator('app-button[aria-label="Email"]')).toBeVisible();
    await expect(page.locator('app-button[aria-label="LinkedIn"]')).toBeVisible();
    await expect(page.locator('app-button[aria-label="GitHub"]')).toBeVisible();
  });

  test('profile section should have h1', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should toggle theme', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const html = page.locator('html');
    const initialDark = await html.evaluate(el => el.classList.contains('dark'));

    // Open mobile menu
    await page.locator('button[aria-label="Toggle navigation"]').click();

    // Click theme toggle in mobile menu
    await page.locator('button').filter({ hasText: /Light|Dark/ }).click();

    await page.waitForTimeout(200);
    const afterDark = await html.evaluate(el => el.classList.contains('dark'));
    expect(afterDark).not.toBe(initialDark);
  });

  test('should toggle language', async ({ page }) => {
    const initialLang = await page.locator('html').getAttribute('lang');
    const langButton = page.locator('button:has-text("ES")');
    if (await langButton.isVisible()) {
      await langButton.click();
    } else {
      await page.locator('button').filter({ hasText: /^[A-Z]{2}$/ }).last().click();
    }
    await page.waitForTimeout(100);
    const newLang = await page.locator('html').getAttribute('lang');
    expect(newLang).not.toBe(initialLang);
  });

  test('experience section should be accessible', async ({ page }) => {
    const experienceHeading = page.getByRole('heading', { name: 'Experience', level: 2 });
    await expect(experienceHeading).toBeVisible();
  });

  test('skills section should be accessible', async ({ page }) => {
    const skillsSection = page.locator('section').filter({ hasText: 'Skills' }).first();
    await expect(skillsSection).toBeVisible();
  });

  test('contact section should be accessible', async ({ page }) => {
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
  });
});