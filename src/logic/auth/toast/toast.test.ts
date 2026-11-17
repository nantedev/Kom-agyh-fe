import { describe, expect, it } from 'vitest'

import { composeArrivalToast } from '@/logic/auth/toast/toast'

describe("composeArrivalToast (RM3, RM4) : composition du toast d'arrivée selon l'action d'origine", () => {
  it('compose « Bienvenue {prénom}, ton compte est créé. » après un signup (RM3)', () => {
    const firstName = 'Marc'

    const signUpToastMessage = composeArrivalToast('signup', firstName)

    expect(signUpToastMessage).toBe('Bienvenue Marc, ton compte est créé.')
  })

  it('compose « Content de te revoir, {prénom} » après un signin (RM4)', () => {
    const firstName = 'Marc'

    const signInToastMessage = composeArrivalToast('signin', firstName)

    expect(signInToastMessage).toBe('Content de te revoir, Marc')
  })
})
