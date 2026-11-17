import { defineConfig } from '@playwright/test'

const isHeaded = process.env.HEADED === '1'

export default defineConfig({
  testDir: 'e2e',
  expect: {
    timeout: 10_000,
  },
  workers: isHeaded ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:5173',
    headless: !isHeaded,
    launchOptions: {
      slowMo: isHeaded ? Number(process.env.SLOWMO ?? 800) : 0,
    },
  },
  projects: [
    {
      name: 'default',
      testIgnore: /.*\.nondet\.test\.ts/,
    },
    {
      name: 'nondet',
      testMatch: /.*\.nondet\.test\.ts/,
      workers: 1,
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})
