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

  const headerActions =
    userName === undefined ? (
      <>
        <Button
          variant="outline"
          size="header"
          nativeButton={false}
          render={<Link to="/signin" />}
        >
          {actions.signIn}
        </Button>
        <Button
          size="header"
          nativeButton={false}
          render={<Link to="/signup" />}
        >
          {actions.signUp}
        </Button>
      </>
    ) : (
      <Button variant="ghost" size="header" onClick={onSignOut}>
        <LogOutIcon aria-hidden />
        {actions.signOut}
      </Button>
    )

  return (
    <PageLayout headerActions={headerActions}>
      <HomeHeading userName={userName} />
    </PageLayout>
  )
}
