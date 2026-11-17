import { describe, expect, it } from 'vitest'

import { errorTargetFor } from '@/logic/auth/error/error'

describe("errorTargetFor (RM9, RM13) : routage du code d'erreur API vers la cible d'affichage", () => {
  it('route EMAIL_ALREADY_EXISTS vers le champ email (RM9)', () => {
    const existingEmailCode = 'EMAIL_ALREADY_EXISTS' as const

    const targetForExistingEmail = errorTargetFor(existingEmailCode)

    expect(targetForExistingEmail).toBe('email')
  })

  it("route INVALID_CREDENTIALS vers l'erreur globale du formulaire (RM13)", () => {
    const invalidCredentialsCode = 'INVALID_CREDENTIALS' as const

    const targetForBadCredentials = errorTargetFor(invalidCredentialsCode)

    expect(targetForBadCredentials).toBe('form')
  })

  it("route tout autre code d'ApiError vers l'erreur globale du formulaire", () => {
    const internalErrorCode = 'INTERNAL_ERROR' as const

    const targetForInternalError = errorTargetFor(internalErrorCode)

    expect(targetForInternalError).toBe('form')
  })
})
