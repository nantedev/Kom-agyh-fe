import { Loader2Icon } from 'lucide-react'
import type { FormEventHandler } from 'react'

import AuthField from '@/components/ui/AuthField'
import { Button } from '@/components/ui/button'
import { signUpContent } from '@/data/signUp'

type SignUpFormProps = {
  passwordError?: string
  formError?: string
  isSubmitDisabled?: boolean
  isPending?: boolean
  onSubmit?: FormEventHandler<HTMLFormElement>
}

export default function SignUpForm({
  passwordError,
  formError,
  isSubmitDisabled = false,
  isPending = false,
  onSubmit,
}: SignUpFormProps) {
  const { fields } = signUpContent

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="flex w-full flex-col items-center gap-8"
    >
      <AuthField
        id="firstName"
        name="firstName"
        label={fields.firstName.label}
        autoComplete="given-name"
      />
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
        error={passwordError}
        autoComplete="new-password"
      />
      {formError && (
        <p role="alert" className="w-full text-center text-xs text-destructive">
          {formError}
        </p>
      )}
      <Button
        type="submit"
        size="large"
        disabled={isSubmitDisabled || isPending}
        aria-label={isPending ? signUpContent.pendingLabel : undefined}
      >
        {isPending ? (
          <Loader2Icon aria-hidden className="size-4 animate-spin" />
        ) : (
          signUpContent.submit
        )}
      </Button>
    </form>
  )
}
