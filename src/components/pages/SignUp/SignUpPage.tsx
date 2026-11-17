import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router'

import SignUpForm from '@/components/pages/SignUp/SignUpForm'
import AuthCard from '@/components/ui/AuthCard'
import { Button } from '@/components/ui/button'
import PageLayout from '@/components/ui/PageLayout'
import { signUpContent } from '@/data/signUp'
import { signUp } from '@/lib/api/auth'
import { queryKeys } from '@/lib/api/queryKeys'
import type { AuthOrigin } from '@/logic/auth/toast/toast'
import type { SignUpFields } from '@/logic/auth/validation/validation'

export default function SignUpPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const signUpMutation = useMutation({
    mutationFn: (fields: SignUpFields) =>
      signUp({
        name: fields.firstName.trim(),
        email: fields.email,
        password: fields.password,
      }),
    onSuccess: (session) => {
      queryClient.setQueryData(queryKeys.session, session)
      navigate('/', { state: { arrival: 'signup' satisfies AuthOrigin } })
    },
  })

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
          <SignUpForm
            isPending={signUpMutation.isPending}
            onSubmit={signUpMutation.mutateAsync}
          />
        </AuthCard>
      </div>
    </PageLayout>
  )
}
