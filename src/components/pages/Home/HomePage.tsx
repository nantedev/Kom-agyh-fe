import { LogOutIcon } from 'lucide-react'
import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import PageLayout from '@/components/ui/PageLayout'
import HomeHeading from '@/components/pages/Home/HomeHeading'
import { homeContent } from '@/data/home'

type HomePageProps = {
  userName?: string
  onSignOut?: () => void
}

export default function HomePage({ userName, onSignOut }: HomePageProps) {
  const { actions } = homeContent

  const navBarActions =
    userName === undefined ? (
      <>
        <Button
          variant="outline"
          size="navBar"
          nativeButton={false}
          render={<Link to="/signin" />}
        >
          {actions.signIn}
        </Button>
        <Button
          size="navBar"
          nativeButton={false}
          render={<Link to="/signup" />}
        >
          {actions.signUp}
        </Button>
      </>
    ) : (
      <Button variant="ghost" size="navBar" onClick={onSignOut}>
        <LogOutIcon aria-hidden />
        {actions.signOut}
      </Button>
    )

  return (
    <PageLayout navBarActions={navBarActions}>
      <HomeHeading userName={userName} />
    </PageLayout>
  )
}
