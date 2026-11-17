import type { ApiError } from '@/types/apiContract'

export type AuthErrorTarget = 'email' | 'form'

export function errorTargetFor(_code: ApiError['code']): AuthErrorTarget {
  return '' as unknown as AuthErrorTarget
}
