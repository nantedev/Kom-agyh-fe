import { Link } from 'react-router'
import type { ComponentProps } from 'react'

import AuthCard from '@/components/ui/AuthCard'
import { Button } from '@/components/ui/button'
import PageLayout from '@/components/ui/PageLayout'
import SignInForm from '@/components/pages/SignIn/SignInForm'
import { signInContent } from '@/data/signIn'

type SignInPageProps = ComponentProps<typeof SignInForm>

export default function SignInPage(formProps: SignInPageProps) {
  return (
    <PageLayout
      headerActions={
        <Button size="header" nativeButton={false} render={<Link to="/signup" />}>
          {signInContent.headerAction}
        </Button>
      }
    >
      <div className="flex w-full justify-center px-4 pt-8 pb-16">
        <AuthCard
          title={signInContent.title}
          footer={
            <>
              {signInContent.footerText}
              <Link to="/signup" className="cursor-pointer text-primary">
                {signInContent.footerLink}
              </Link>
            </>
          }
        >
          <SignInForm {...formProps} />
        </AuthCard>
      </div>
    </PageLayout>
  )
}
