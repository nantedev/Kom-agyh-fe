import { homeContent } from '@/data/home'

export type GreetingParts = {
  prefix: string
  accent: string
}

export function composeGreeting(firstName: string): GreetingParts {
  return {
    prefix: homeContent.connected.titlePrefix,
    accent: `${firstName} ?`,
  }
}
