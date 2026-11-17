export type SignInFields = {
  email: string
  password: string
}

export type SignUpFields = {
  firstName: string
  email: string
  password: string
}

export function isSignInSubmitDisabled(_fields: SignInFields): boolean {
  return undefined as unknown as boolean
}

export function isSignUpSubmitDisabled(_fields: SignUpFields): boolean {
  return undefined as unknown as boolean
}
