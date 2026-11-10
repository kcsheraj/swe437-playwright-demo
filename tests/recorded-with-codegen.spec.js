// This is the kind of test Codegen writes for you while you click around.
// (Presenter 3 records one live; this file is a saved example.)
import { test, expect } from '@playwright/test';

test('recorded: add a task and complete it', async ({ page, request }) => {
  await request.post('http://localhost:3001/api/reset');
  await page.goto('http://localhost:5173/');
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('Hello SWE 437');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('checkbox', { name: 'Hello SWE 437' }).check();
  await expect(page.getByText('1 task(s) left')).toBeVisible();
});
