import { expect, type Page } from '@playwright/test'

export function uniqueEmail(prefix = 'user'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@test.dev`
}

export async function signUpViaUi(
  page: Page,
  {
    firstName,
    email,
    password,
  }: { firstName: string; email: string; password: string },
) {
  await page.goto('/signup')
  await page.getByLabel('Prénom*').fill(firstName)
  await page.getByLabel('Email*').fill(email)
  await page.getByLabel('Mot de passe*').fill(password)
  await page.getByRole('button', { name: 'Créer un compte' }).click()
  await expect(page).toHaveURL('/')
}

export async function signOutViaHeader(page: Page) {
  await page.getByRole('button', { name: 'Se déconnecter' }).click()
  await expect(
    page.getByRole('banner').getByRole('button', { name: 'Se connecter' }),
  ).toBeVisible()
}

export async function holdPostRequests(page: Page, urlPattern: string) {
  let requestCount = 0
  let markStarted!: () => void
  const started = new Promise<void>((resolve) => {
    markStarted = resolve
  })
  let resolveHold!: () => void
  const held = new Promise<void>((resolve) => {
    resolveHold = resolve
  })

  await page.route(urlPattern, async (route) => {
    if (route.request().method() !== 'POST') {
      await route.continue()
      return
    }

    requestCount += 1
    markStarted()
    await held
    await route.continue()
  })

  return {
    waitUntilStarted: () => started,
    release: () => resolveHold(),
    getRequestCount: () => requestCount,
  }
}
