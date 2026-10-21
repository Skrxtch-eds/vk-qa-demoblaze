// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 90_000,
  expect: { timeout: 30_000 },
  use: {
    baseURL: 'https://www.demoblaze.com',
    browserName: 'chromium',
  },
});
