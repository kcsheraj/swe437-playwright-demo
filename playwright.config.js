// Playwright settings for our project
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 1,             // run tests one at a time (they share one backend)
  reporter: 'html',       // make a nice HTML report after each run

  use: {
    baseURL: 'http://localhost:5173',   // so tests can just say page.goto('/')
    screenshot: 'only-on-failure',      // take a picture when a test fails
    trace: 'retain-on-failure',         // save a step-by-step recording when a test fails
  },

  // Run every test in 3 different browsers
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  // Start our backend and frontend automatically before testing
  webServer: [
    { command: 'npm start --prefix backend', url: 'http://localhost:3001/api/tasks', reuseExistingServer: true },
    { command: 'npm run dev --prefix frontend', url: 'http://localhost:5173', reuseExistingServer: true },
  ],
});
