import { expect, test } from '@playwright/test'

test("SM-1 : Affichage de l'accueil pour un visiteur non connecté (RM1)", async ({
  page,
}) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Prêt(e) pour ton daily standup ?',
    }),
  ).toBeVisible()
  await expect(
    page.getByText('Track tes résultats pour que les jours ne se ressemblent pas.'),
  ).toBeVisible()

  const header = page.getByRole('banner')
  await expect(header.getByRole('button', { name: 'Se connecter' })).toBeVisible()
  await expect(
    header.getByRole('button', { name: 'Créer un compte' }),
  ).toBeVisible()
})

test('SM-2 : Ouverture du lien « nantedev x agy » du footer dans un nouvel onglet (RM15)', async ({
  context,
  page,
}) => {
  await page.goto('/')

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page
      .getByRole('contentinfo')
      .getByRole('link', { name: 'nantedev x agy' })
      .click(),
  ])

  await expect(newPage).toHaveURL('https://github.com/nantedev/')
  await expect(page).toHaveURL('/')
  await newPage.close()
})

test('SM-3 : Navigation vers /signup au clic sur « Créer un compte » (RM6)', async ({
  page,
}) => {
  await page.goto('/')

  await page
    .getByRole('banner')
    .getByRole('button', { name: 'Créer un compte' })
    .click()

  await expect(page).toHaveURL('/signup')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Créer un compte' }),
  ).toBeVisible()
  await expect(page.getByLabel('Prénom*')).toBeVisible()
  await expect(page.getByLabel('Email*')).toBeVisible()
  await expect(page.getByLabel('Mot de passe*')).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Créer un compte' }),
  ).toBeVisible()
})

test('SM-4 : Navigation vers /signin au clic sur « Se connecter » (RM7)', async ({
  page,
}) => {
  await page.goto('/')

  await page
    .getByRole('banner')
    .getByRole('button', { name: 'Se connecter' })
    .click()

  await expect(page).toHaveURL('/signin')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Se connecter' }),
  ).toBeVisible()
  await expect(page.getByLabel('Email', { exact: true })).toBeVisible()
  await expect(page.getByLabel('Mot de passe', { exact: true })).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Me connecter' }),
  ).toBeVisible()
})
