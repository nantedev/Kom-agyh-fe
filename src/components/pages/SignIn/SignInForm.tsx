import { Loader2Icon } from 'lucide-react'
import type { FormEventHandler } from 'react'

import AuthField from '@/components/ui/AuthField'
import { Button } from '@/components/ui/button'
import { signInContent } from '@/data/signIn'

type SignInFormProps = {
  formError?: string
  isSubmitDisabled?: boolean
  isPending?: boolean
  onSubmit?: FormEventHandler<HTMLFormElement>
}

export default function SignInForm({
  formError,
  isSubmitDisabled = false,
  isPending = false,
  onSubmit,
}: SignInFormProps) {
  const { fields } = signInContent

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="flex w-full flex-col items-center gap-5"
    >
      <AuthField
        id="email"
        name="email"
        type="email"
        label={fields.email.label}
        placeholder={fields.email.placeholder}
        autoComplete="email"
      />
      <AuthField
        id="password"
        name="password"
        type="password"
        label={fields.password.label}
        autoComplete="current-password"
      />
      <div className="h-[65px] w-full">
        {formError && (
          <p
            role="alert"
            className="w-full text-center text-xs text-destructive"
          >
            {formError}
          </p>
        )}
      </div>
      <Button
        type="submit"
        size="large"
        disabled={isSubmitDisabled || isPending}
        aria-label={isPending ? signInContent.pendingLabel : undefined}
      >
        {isPending ? (
          <Loader2Icon aria-hidden className="size-4 animate-spin" />
        ) : (
          signInContent.submit
        )}
      </Button>
    </form>
  )
}
