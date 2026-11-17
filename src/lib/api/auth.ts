import { request } from '@/lib/api/http'
import type { Session, SessionUser } from '@/types/apiContract'

export type SignUpPayload = {
  name: string
  email: string
  password: string
}

export type SignInPayload = {
  email: string
  password: string
}

export type AuthenticatedSession = {
  user: SessionUser
}

export function getSession(): Promise<Session> {
  return request<Session>('/api/auth/get-session')
}

export function signUp(payload: SignUpPayload): Promise<AuthenticatedSession> {
  return request<AuthenticatedSession>('/api/auth/sign-up/email', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function signIn(payload: SignInPayload): Promise<AuthenticatedSession> {
  return request<AuthenticatedSession>('/api/auth/sign-in/email', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function signOut(): Promise<void> {
  return request<void>('/api/auth/sign-out', {
    method: 'POST',
  })
}
