import type { ApiError } from '@/types/apiContract'

export type AuthErrorTarget = 'email' | 'form'

export function errorTargetFor(code: ApiError['code']): AuthErrorTarget {
  return code === 'EMAIL_ALREADY_EXISTS' ? 'email' : 'form'
}
