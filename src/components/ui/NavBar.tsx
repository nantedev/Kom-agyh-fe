import type { ReactNode } from 'react'
import { Link } from 'react-router'

import Logo from '@/components/ui/Logo'

type NavBarProps = {
  children?: ReactNode
}

export default function NavBar({ children }: NavBarProps) {
  return (
    <header className="flex items-center justify-between gap-4 bg-white/80 px-6 py-5 backdrop-blur-[6px]">
      <Link to="/" className="cursor-pointer">
        <Logo />
      </Link>
      <nav className="flex items-center gap-6">{children}</nav>
    </header>
  )
}
