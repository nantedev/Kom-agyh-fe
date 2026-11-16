import type { ReactNode } from 'react'

import Footer from '@/components/ui/Footer'
import NavBar from '@/components/ui/NavBar'

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
      <NavBar>{headerActions}</NavBar>
      <main className="flex flex-1 flex-col items-center">{children}</main>
      <Footer />
    </div>
  )
}
