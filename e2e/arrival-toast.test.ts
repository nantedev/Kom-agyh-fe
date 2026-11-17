import { expect, test } from '@playwright/test'

import { signOutViaHeader, uniqueEmail } from './support/auth'

test("SM-11 : Affichage du toast d'arrivée sur l'accueil après un signup et après un signin (RM3, RM4)", async ({
  page,
}) => {
  const email = uniqueEmail('alice')
  const password = 'password123'

  await page.goto('/signup')
  await page.getByLabel('Prénom*').fill('Alice')
  await page.getByLabel('Email*').fill(email)
  await page.getByLabel('Mot de passe*').fill(password)
  await page.getByRole('button', { name: 'Créer un compte' }).click()

  await expect(page).toHaveURL('/')
  await expect(
    page.getByText('Bienvenue Alice, ton compte est créé.'),
  ).toBeVisible()

  await signOutViaHeader(page)

  await page
    .getByRole('banner')
    .getByRole('button', { name: 'Se connecter' })
    .click()
  await expect(page).toHaveURL('/signin')
  await page.getByLabel('Email', { exact: true }).fill(email)
  await page.getByLabel('Mot de passe', { exact: true }).fill(password)
  await page.getByRole('button', { name: 'Me connecter' }).click()

  await expect(page).toHaveURL('/')
  await expect(page.getByText('Content de te revoir, Alice')).toBeVisible()
})

test("SM-12 : Non-réapparition du toast au rechargement, au retour navigateur et à l'ouverture directe de / (RM24, RM25)", async ({
  context,
  page,
}) => {
  const email = uniqueEmail('alice-reload')

  await page.goto('/signup')
  await page.getByLabel('Prénom*').fill('Alice')
  await page.getByLabel('Email*').fill(email)
  await page.getByLabel('Mot de passe*').fill('password123')
  await page.getByRole('button', { name: 'Créer un compte' }).click()

  await expect(page).toHaveURL('/')
  await expect(
    page.getByText('Bienvenue Alice, ton compte est créé.'),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Close toast' }).click()
  const notifications = page.getByRole('region', { name: /Notifications/ })
  await expect(notifications.getByRole('listitem')).toHaveCount(0)

  await page.reload()
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: "Quoi de neuf aujourd'hui, Alice ?",
    }),
  ).toBeVisible()
  await expect(notifications.getByRole('listitem')).toHaveCount(0)

  await page.goBack()
  await expect(page).toHaveURL('/signup')
  await page.goForward()
  await expect(page).toHaveURL('/')
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: "Quoi de neuf aujourd'hui, Alice ?",
    }),
  ).toBeVisible()
  await expect(notifications.getByRole('listitem')).toHaveCount(0)

  const newTab = await context.newPage()
  await newTab.goto('/')
  await expect(
    newTab.getByRole('heading', {
      level: 1,
      name: "Quoi de neuf aujourd'hui, Alice ?",
    }),
  ).toBeVisible()
  await expect(
    newTab.getByRole('region', { name: /Notifications/ }).getByRole('listitem'),
  ).toHaveCount(0)
  await newTab.close()
})
