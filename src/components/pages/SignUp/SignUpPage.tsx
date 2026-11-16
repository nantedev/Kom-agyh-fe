import { Link } from 'react-router'
import type { ComponentProps } from 'react'

import AuthCard from '@/components/ui/AuthCard'
import { Button } from '@/components/ui/button'
import PageLayout from '@/components/ui/PageLayout'
import SignUpForm from '@/components/pages/SignUp/SignUpForm'
import { signUpContent } from '@/data/signUp'

type SignUpPageProps = ComponentProps<typeof SignUpForm>

export default function SignUpPage(formProps: SignUpPageProps) {
  return (
    <PageLayout
      navBarActions={
        <Button
          variant="outline"
          size="navBar"
          nativeButton={false}
          render={<Link to="/signin" />}
        >
          {signUpContent.navBarAction}
        </Button>
      }
    >
      <div className="flex w-full justify-center px-4 pt-8 pb-16">
        <AuthCard
          title={signUpContent.title}
          footer={
            <>
              {signUpContent.footerText}
              <Link to="/signin" className="cursor-pointer text-primary">
                {signUpContent.footerLink}
              </Link>
            </>
          }
        >
          <SignUpForm {...formProps} />
        </AuthCard>
      </div>
    </PageLayout>
  )
}
