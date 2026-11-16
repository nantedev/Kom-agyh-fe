import type { ReactNode } from 'react'

import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'

type PageLayoutProps = {
  headerActions?: ReactNode
  children: ReactNode
}

export default function PageLayout({
  headerActions,
  children,
}: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header>{headerActions}</Header>
      <main className="flex flex-1 flex-col items-center">{children}</main>
      <Footer />
    </div>
  )
}
