export type SignInFields = {
  email: string
  password: string
}

export type SignUpFields = {
  firstName: string
  email: string
  password: string
}

export function isSignInSubmitDisabled(fields: SignInFields): boolean {
  return fields.email === '' || fields.password === ''
}

export function isSignUpSubmitDisabled(fields: SignUpFields): boolean {
  return (
    fields.firstName.trim() === '' ||
    fields.email === '' ||
    fields.password === ''
  )
}
