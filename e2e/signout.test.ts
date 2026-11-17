import { expect, test } from '@playwright/test'

import { signUpViaUi, uniqueEmail } from './support/auth'

test('SM-13 : Déconnexion silencieuse au clic sur « Se déconnecter » (RM5)', async ({
  page,
}) => {
  await signUpViaUi(page, {
    firstName: 'Marc',
    email: uniqueEmail('marc-signout'),
    password: 'password123',
  })

  await expect(
    page.getByText('Bienvenue Marc, ton compte est créé.'),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Close toast' }).click()

  const notifications = page.getByRole('region', { name: /Notifications/ })
  await expect(notifications.getByRole('listitem')).toHaveCount(0)

  await page.getByRole('button', { name: 'Se déconnecter' }).click()

  await expect(page).toHaveURL('/')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.getByRole('alertdialog')).toHaveCount(0)
  await expect(notifications.getByRole('listitem')).toHaveCount(0)
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Prêt(e) pour ton daily standup ?',
    }),
  ).toBeVisible()

  const header = page.getByRole('banner')
  await expect(header.getByRole('button', { name: 'Se connecter' })).toBeVisible()
  await expect(
    header.getByRole('button', { name: 'Créer un compte' }),
  ).toBeVisible()
})

test("SM-14 : Affichage silencieux de l'accueil non connecté lorsque la session a expiré au chargement (RM31)", async ({
  context,
  page,
}) => {
  await signUpViaUi(page, {
    firstName: 'Marc',
    email: uniqueEmail('marc-expired'),
    password: 'password123',
  })

  await expect(
    page.getByText('Bienvenue Marc, ton compte est créé.'),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Close toast' }).click()

  await context.clearCookies()
  await page.reload()

  await expect(page).toHaveURL('/')
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Prêt(e) pour ton daily standup ?',
    }),
  ).toBeVisible()

  const header = page.getByRole('banner')
  await expect(header.getByRole('button', { name: 'Se connecter' })).toBeVisible()
  await expect(
    header.getByRole('button', { name: 'Créer un compte' }),
  ).toBeVisible()
  await expect(page.getByRole('alert')).toHaveCount(0)
  await expect(
    page.getByRole('region', { name: /Notifications/ }).getByRole('listitem'),
  ).toHaveCount(0)
})
