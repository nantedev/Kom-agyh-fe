import { describe, expect, it } from 'vitest'

import {
  isSignInSubmitDisabled,
  isSignUpSubmitDisabled,
  type SignInFields,
  type SignUpFields,
} from '@/logic/auth/validation/validation'

describe("isSignInSubmitDisabled (RM32) : désactivation du bouton « Me connecter » tant qu'un champ est vide", () => {
  it('désactive le bouton quand les 2 champs sont vides', () => {
    const emptySignInFields: SignInFields = {
      email: '',
      password: '',
    }

    const isDisabledForEmptyForm = isSignInSubmitDisabled(emptySignInFields)

    expect(isDisabledForEmptyForm).toBe(true)
  })

  it("désactive le bouton quand l'email est vide", () => {
    const signInFieldsWithoutEmail: SignInFields = {
      email: '',
      password: 'password123',
    }

    const isDisabledWithoutEmail = isSignInSubmitDisabled(
      signInFieldsWithoutEmail,
    )

    expect(isDisabledWithoutEmail).toBe(true)
  })

  it('désactive le bouton quand le mot de passe est vide', () => {
    const signInFieldsWithoutPassword: SignInFields = {
      email: 'marc@test.dev',
      password: '',
    }

    const isDisabledWithoutPassword = isSignInSubmitDisabled(
      signInFieldsWithoutPassword,
    )

    expect(isDisabledWithoutPassword).toBe(true)
  })

  it('active le bouton dès que les 2 champs sont renseignés', () => {
    const filledSignInFields: SignInFields = {
      email: 'marc@test.dev',
      password: 'abc',
    }

    const isDisabledForFilledForm = isSignInSubmitDisabled(filledSignInFields)

    expect(isDisabledForFilledForm).toBe(false)
  })
})

describe("isSignUpSubmitDisabled (RM33) : désactivation du bouton « Créer un compte » tant qu'un champ requis est vide", () => {
  it('désactive le bouton quand les 3 champs sont vides', () => {
    const emptySignUpFields: SignUpFields = {
      firstName: '',
      email: '',
      password: '',
    }

    const isDisabledForEmptyForm = isSignUpSubmitDisabled(emptySignUpFields)

    expect(isDisabledForEmptyForm).toBe(true)
  })

  it('désactive le bouton quand le prénom est vide', () => {
    const signUpFieldsWithoutFirstName: SignUpFields = {
      firstName: '',
      email: 'marc@test.dev',
      password: 'password123',
    }

    const isDisabledWithoutFirstName = isSignUpSubmitDisabled(
      signUpFieldsWithoutFirstName,
    )

    expect(isDisabledWithoutFirstName).toBe(true)
  })

  it("désactive le bouton quand le prénom est composé uniquement d'espaces", () => {
    const signUpFieldsWithBlankFirstName: SignUpFields = {
      firstName: '   ',
      email: 'marc@test.dev',
      password: 'password123',
    }

    const isDisabledWithBlankFirstName = isSignUpSubmitDisabled(
      signUpFieldsWithBlankFirstName,
    )

    expect(isDisabledWithBlankFirstName).toBe(true)
  })

  it("désactive le bouton quand l'email est vide", () => {
    const signUpFieldsWithoutEmail: SignUpFields = {
      firstName: 'Marc',
      email: '',
      password: 'password123',
    }

    const isDisabledWithoutEmail = isSignUpSubmitDisabled(
      signUpFieldsWithoutEmail,
    )

    expect(isDisabledWithoutEmail).toBe(true)
  })

  it('désactive le bouton quand le mot de passe est vide', () => {
    const signUpFieldsWithoutPassword: SignUpFields = {
      firstName: 'Marc',
      email: 'marc@test.dev',
      password: '',
    }

    const isDisabledWithoutPassword = isSignUpSubmitDisabled(
      signUpFieldsWithoutPassword,
    )

    expect(isDisabledWithoutPassword).toBe(true)
  })

  it('active le bouton quand les 3 champs sont remplis, même avant validation du format à la soumission', () => {
    const filledSignUpFieldsWithShortPassword: SignUpFields = {
      firstName: 'Marc',
      email: 'marc@test.dev',
      password: 'abc',
    }

    const isDisabledForFilledForm = isSignUpSubmitDisabled(
      filledSignUpFieldsWithShortPassword,
    )

    expect(isDisabledForFilledForm).toBe(false)
  })
})
