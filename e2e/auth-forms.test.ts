import { expect, test } from '@playwright/test'

import {
  holdPostRequests,
  signOutViaHeader,
  signUpViaUi,
  uniqueEmail,
} from './support/auth'

test('SM-5 : Validation de format à la soumission au /signup et absence de validation de format au /signin (RM10, RM11, RM20)', async ({
  page,
}) => {
  await page.goto('/signup')

  await page.getByLabel('Prénom*').fill('Marc')
  await page.getByLabel('Email*').fill('marc-sans-arobase')
  await page.getByLabel('Mot de passe*').fill('abc')
  await page.getByRole('button', { name: 'Créer un compte' }).click()

  await expect(page).toHaveURL('/signup')
  await expect(page.getByLabel('Email*')).toHaveAttribute('aria-invalid', 'true')
  await expect(
    page.getByText("Le format de l'email est invalide"),
  ).toBeVisible()
  await expect(page.getByLabel('Mot de passe*')).toHaveAttribute(
    'aria-invalid',
    'true',
  )
  await expect(
    page.getByText('Le mot de passe doit contenir au moins 8 caractères.'),
  ).toBeVisible()

  await page.getByLabel('Prénom*').fill('    ')

  await expect(page.getByLabel('Prénom*')).toHaveAttribute(
    'aria-invalid',
    'true',
  )
  await expect(page.getByText('Le prénom est requis')).toBeVisible()

  await page.goto('/signin')
  await page.getByLabel('Email', { exact: true }).fill('marc-sans-arobase')
  await page.getByLabel('Mot de passe', { exact: true }).fill('abc')

  const [invalidEmailResponse] = await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url().includes('/api/auth/sign-in/email') &&
        res.request().method() === 'POST',
    ),
    page.getByRole('button', { name: 'Me connecter' }).click(),
  ])
  expect(invalidEmailResponse.ok()).toBe(false)

  await expect(
    page.getByLabel('Email', { exact: true }),
  ).not.toHaveAttribute('aria-invalid', 'true')
  await expect(page.getByRole('alert')).toHaveText(
    "Le format de l'email est invalide",
  )

  await page.getByLabel('Email', { exact: true }).fill(uniqueEmail('inconnu'))

  const [unknownUserResponse] = await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url().includes('/api/auth/sign-in/email') &&
        res.request().method() === 'POST',
    ),
    page.getByRole('button', { name: 'Me connecter' }).click(),
  ])
  expect(unknownUserResponse.ok()).toBe(false)

  await expect(
    page.getByLabel('Mot de passe', { exact: true }),
  ).not.toHaveAttribute('aria-invalid', 'true')
  await expect(page.getByRole('alert')).toHaveText(
    'Email ou mot de passe incorrect',
  )
})

test('SM-6 : Apparition des erreurs de format à la 1re soumission puis mise à jour en direct pendant la saisie au /signup (RM30)', async ({
  page,
}) => {
  await page.goto('/signup')

  await page.getByLabel('Prénom*').fill('Marc')
  await page.getByLabel('Email*').fill(uniqueEmail('marc'))
  await page.getByLabel('Mot de passe*').fill('abc')

  await expect(
    page.getByText('Le mot de passe doit contenir au moins 8 caractères.'),
  ).toBeHidden()
  await expect(page.getByLabel('Mot de passe*')).not.toHaveAttribute(
    'aria-invalid',
    'true',
  )

  await page.getByRole('button', { name: 'Créer un compte' }).click()

  await expect(page).toHaveURL('/signup')
  await expect(page.getByLabel('Mot de passe*')).toHaveAttribute(
    'aria-invalid',
    'true',
  )
  await expect(
    page.getByText('Le mot de passe doit contenir au moins 8 caractères.'),
  ).toBeVisible()

  await page.getByLabel('Mot de passe*').fill('12345678')

  await expect(
    page.getByText('Le mot de passe doit contenir au moins 8 caractères.'),
  ).toBeHidden()
  await expect(page.getByLabel('Mot de passe*')).not.toHaveAttribute(
    'aria-invalid',
    'true',
  )
})

test("SM-7 : Bouton de soumission désactivé avec spinner et aria-label pendant l'appel réseau (RM17)", async ({
  page,
}) => {
  const email = uniqueEmail('marc-pending')
  const password = 'password123'
  const signUpHold = await holdPostRequests(page, '**/api/auth/sign-up/email')

  await page.goto('/signup')
  await page.getByLabel('Prénom*').fill('Marc')
  await page.getByLabel('Email*').fill(email)
  await page.getByLabel('Mot de passe*').fill(password)
  await page.getByRole('button', { name: 'Créer un compte' }).click()

  await signUpHold.waitUntilStarted()
  const pendingSignUpButton = page.getByRole('button', {
    name: 'Création du compte en cours',
  })
  await expect(pendingSignUpButton).toBeDisabled()
  await expect(pendingSignUpButton).toHaveAttribute(
    'aria-label',
    'Création du compte en cours',
  )
  await expect(pendingSignUpButton).toHaveText('')

  signUpHold.release()
  await expect(page).toHaveURL('/')

  await signOutViaHeader(page)
  const signInHold = await holdPostRequests(page, '**/api/auth/sign-in/email')

  await page
    .getByRole('banner')
    .getByRole('button', { name: 'Se connecter' })
    .click()
  await expect(page).toHaveURL('/signin')
  await page.getByLabel('Email', { exact: true }).fill(email)
  await page.getByLabel('Mot de passe', { exact: true }).fill(password)
  await page.getByRole('button', { name: 'Me connecter' }).click()

  await signInHold.waitUntilStarted()
  const pendingSignInButton = page.getByRole('button', {
    name: 'Connexion en cours',
  })
  await expect(pendingSignInButton).toBeDisabled()
  await expect(pendingSignInButton).toHaveAttribute(
    'aria-label',
    'Connexion en cours',
  )
  await expect(pendingSignInButton).toHaveText('')

  signInHold.release()
  await expect(page).toHaveURL('/')
})

test("SM-8 : Envoi d'1 seule requête lors d'un double-clic sur le bouton de soumission (RM16)", async ({
  page,
}) => {
  const email = uniqueEmail('marc-dbl')
  const password = 'password123'

  await signUpViaUi(page, { firstName: 'Marc', email, password })
  await signOutViaHeader(page)

  const signInHold = await holdPostRequests(page, '**/api/auth/sign-in/email')

  await page.goto('/signin')
  await page.getByLabel('Email', { exact: true }).fill(email)
  await page.getByLabel('Mot de passe', { exact: true }).fill(password)
  await page.getByRole('button', { name: 'Me connecter' }).dblclick()

  await signInHold.waitUntilStarted()
  await expect(
    page.getByRole('button', { name: 'Connexion en cours' }),
  ).toBeDisabled()

  signInHold.release()
  await expect(page).toHaveURL('/')
  expect(signInHold.getRequestCount()).toBe(1)
})

test("SM-9 : Affichage des erreurs métier de l'API au /signup et au /signin (RM9, RM13)", async ({
  page,
}) => {
  const email = uniqueEmail('marc-api')
  const password = 'password123'

  await signUpViaUi(page, { firstName: 'Marc', email, password })
  await signOutViaHeader(page)

  await page.goto('/signup')
  await page.getByLabel('Prénom*').fill('Marc')
  await page.getByLabel('Email*').fill(email.toUpperCase())
  await page.getByLabel('Mot de passe*').fill(password)
  await page.getByRole('button', { name: 'Créer un compte' }).click()

  await expect(page).toHaveURL('/signup')
  await expect(page.getByLabel('Email*')).toHaveAttribute('aria-invalid', 'true')
  await expect(
    page.getByText('Un compte avec cet email existe déjà'),
  ).toBeVisible()
  await expect(page.getByLabel('Email*')).toHaveAccessibleDescription(
    'Un compte avec cet email existe déjà',
  )

  await page.goto('/signin')
  await page.getByLabel('Email', { exact: true }).fill(email)
  await page
    .getByLabel('Mot de passe', { exact: true })
    .fill('mauvais-mot-de-passe')
  await page.getByRole('button', { name: 'Me connecter' }).click()

  await expect(page).toHaveURL('/signin')
  await expect(page.getByRole('alert')).toHaveText(
    'Email ou mot de passe incorrect',
  )
})

test("SM-10 : Redirection vers l'accueil en état connecté après un signup ou un signin réussi (RM8, RM12)", async ({
  page,
}) => {
  const email = uniqueEmail('nouveau')
  const password = 'password123'

  await page.goto('/signup')
  await page.getByLabel('Prénom*').fill('Marc')
  await page.getByLabel('Email*').fill(email)
  await page.getByLabel('Mot de passe*').fill(password)
  await page.getByRole('button', { name: 'Créer un compte' }).click()

  await expect(page).toHaveURL('/')
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: "Quoi de neuf aujourd'hui, Marc ?",
    }),
  ).toBeVisible()
  await expect(
    page.getByText('Renseigne ton daily du jour ci-dessous.'),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Se déconnecter' }),
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
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: "Quoi de neuf aujourd'hui, Marc ?",
    }),
  ).toBeVisible()
  await expect(
    page.getByText('Renseigne ton daily du jour ci-dessous.'),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Se déconnecter' }),
  ).toBeVisible()
})
