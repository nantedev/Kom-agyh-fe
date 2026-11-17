import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router'

import SignInForm from '@/components/pages/SignIn/SignInForm'
import AuthCard from '@/components/ui/AuthCard'
import { Button } from '@/components/ui/button'
import PageLayout from '@/components/ui/PageLayout'
import { signInContent } from '@/data/signIn'
import { signIn } from '@/lib/api/auth'
import { queryKeys } from '@/lib/api/queryKeys'
import type { AuthOrigin } from '@/logic/auth/toast/toast'
import type { SignInFields } from '@/logic/auth/validation/validation'

export default function SignInPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const signInMutation = useMutation({
    mutationFn: (fields: SignInFields) => signIn(fields),
    onSuccess: (session) => {
      queryClient.setQueryData(queryKeys.session, session)
      navigate('/', { state: { arrival: 'signin' satisfies AuthOrigin } })
    },
  })

  return (
    <PageLayout
      navBarActions={
        <Button size="navBar" nativeButton={false} render={<Link to="/signup" />}>
          {signInContent.navBarAction}
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
          <SignInForm
            isPending={signInMutation.isPending}
            onSubmit={signInMutation.mutateAsync}
          />
        </AuthCard>
      </div>
    </PageLayout>
  )
}
