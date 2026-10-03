import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  outputDir: './node_modules/.cache/playwright-results',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://127.0.0.1:7100',
  },
  webServer: {
    command: 'npm start -- --host 127.0.0.1 --port 7100',
    url: 'http://127.0.0.1:7100/',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
