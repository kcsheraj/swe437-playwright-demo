// Our main tests. Each test follows 3 steps:
//   1. FIND something on the page   (page.getByRole, page.getByText, ...)
//   2. DO something with it         (.click(), .fill())
//   3. CHECK the result             (await expect(...))
import { test, expect } from '@playwright/test';

// Runs before EVERY test: put the starting tasks back, then open the app
test.beforeEach(async ({ page, request }) => {
  await request.post('http://localhost:3001/api/reset');
  await page.goto('/');
});

test('shows the app title', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'TaskBoard' })).toBeVisible();
});

test('shows the starting tasks', async ({ page }) => {
  await expect(page.getByText('Read the Playwright docs')).toBeVisible();
  await expect(page.getByText('Write my first test')).toBeVisible();
});

test('adds a new task', async ({ page }) => {
  await page.getByPlaceholder('What needs to be done?').fill('Practice my demo');
  await page.getByRole('button', { name: 'Add' }).click();

  await expect(page.getByText('Practice my demo')).toBeVisible();
});

test('completes a task', async ({ page }) => {
  await page.getByRole('checkbox', { name: 'Write my first test' }).check();

  await expect(page.getByText('0 task(s) left')).toBeVisible();
});

test('deletes a task', async ({ page }) => {
  await page.getByRole('listitem').filter({ hasText: 'Read the Playwright docs' })
    .getByRole('button', { name: 'Delete' }).click();

  await expect(page.getByText('Read the Playwright docs')).not.toBeVisible();
});

test('shows an error for an empty task', async ({ page }) => {
  await page.getByRole('button', { name: 'Add' }).click();

  await expect(page.getByText('Please type a task first')).toBeVisible();
});
