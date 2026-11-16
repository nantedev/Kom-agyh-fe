import { LockIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { securityNotice } from '@/data/auth'

type AuthCardProps = {
  title: string
  footer: ReactNode
  children: ReactNode
}

export default function AuthCard({ title, footer, children }: AuthCardProps) {
  return (
    <div className="flex w-full max-w-[400px] flex-col items-center">
      <section className="flex min-h-[479px] w-full flex-col items-center gap-8 rounded-lg border border-card-border bg-card p-[33px] drop-shadow-[0px_12px_16px_rgba(20,28,37,0.04)]">
        <h1 className="w-full text-center text-2xl leading-[33.6px] font-bold text-foreground">
          {title}
        </h1>
        {children}
        <p className="text-center text-sm leading-5 text-label">{footer}</p>
      </section>
      <div className="flex items-center gap-2 pt-8 text-[10px] leading-[15px] font-medium tracking-[1px] text-label/60 uppercase">
        <LockIcon aria-hidden className="size-3" />
        <span>{securityNotice}</span>
      </div>
    </div>
  )
}
