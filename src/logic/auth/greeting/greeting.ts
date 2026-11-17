import { homeContent } from '@/data/home'

export function composeGreeting(firstName: string): string {
  return `${homeContent.connected.titlePrefix}${firstName} ?`
}
