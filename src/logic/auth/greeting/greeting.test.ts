import { describe, expect, it } from 'vitest'

import { composeGreeting } from '@/logic/auth/greeting/greeting'

describe("composeGreeting (RM2) : composition du titre d'accueil de l'utilisateur connecté", () => {
  it("compose les 2 segments du titre d'accueil avec le prénom de la session", () => {
    const firstName = 'Marc'

    const greeting = composeGreeting(firstName)

    expect(greeting).toEqual({
      prefix: "Quoi de neuf aujourd'hui, ",
      accent: 'Marc ?',
    })
  })

  it('conserve tel quel un prénom composé ou accentué', () => {
    const compoundFirstName = 'Jean-Pierre'

    const greetingWithCompoundName = composeGreeting(compoundFirstName)

    expect(greetingWithCompoundName).toEqual({
      prefix: "Quoi de neuf aujourd'hui, ",
      accent: 'Jean-Pierre ?',
    })
  })
})
