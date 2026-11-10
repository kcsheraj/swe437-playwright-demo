// Seed test for the Playwright AI Test Agents (planner, generator, healer).
// The agents run this first so they start from the same place every time:
// the starting tasks are put back, and the TaskBoard app is open.
import { test, expect } from '@playwright/test';

test.describe('TaskBoard', () => {
  test('seed', async ({ page, request }) => {
    await request.post('http://localhost:3001/api/reset');
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'TaskBoard' })).toBeVisible();
  });
});
