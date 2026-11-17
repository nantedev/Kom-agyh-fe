export type AuthOrigin = 'signup' | 'signin'

export function composeArrivalToast(
  origin: AuthOrigin,
  firstName: string,
): string {
  if (origin === 'signup') {
    return `Bienvenue ${firstName}, ton compte est créé.`
  }

  return `Content de te revoir, ${firstName}`
}
