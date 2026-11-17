import { Loader2Icon } from 'lucide-react'
import { useRef } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import AuthField from '@/components/ui/AuthField'
import { Button } from '@/components/ui/button'
import { networkErrorMessage } from '@/data/auth'
import { signInContent } from '@/data/signIn'
import { extractApiError } from '@/lib/api/http'
import {
  isSignInSubmitDisabled,
  type SignInFields,
} from '@/logic/auth/validation/validation'

type SignInFormProps = {
  isPending?: boolean
  onSubmit: (fields: SignInFields) => Promise<unknown>
}

export default function SignInForm({
  isPending = false,
  onSubmit,
}: SignInFormProps) {
  const { fields } = signInContent
  const submittingRef = useRef(false)

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignInFields>({
    defaultValues: { email: '', password: '' },
  })

  const watchedFields = useWatch({ control })
  const isSubmitDisabled = isSignInSubmitDisabled({
    email: watchedFields.email ?? '',
    password: watchedFields.password ?? '',
  })
  const isLoading = isPending || isSubmitting

  const handleValidSubmit = async (values: SignInFields) => {
    if (submittingRef.current || isPending) {
      return
    }

    clearErrors('root')
    submittingRef.current = true

    try {
      await onSubmit(values)
    } catch (error) {
      const apiError = extractApiError(error)

      setError('root', {
        type: 'server',
        message: apiError ? apiError.message : networkErrorMessage,
      })
    } finally {
      submittingRef.current = false
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleValidSubmit)}
      className="flex w-full flex-col items-center gap-5"
    >
      <AuthField
        id="email"
        type="email"
        label={fields.email.label}
        placeholder={fields.email.placeholder}
        autoComplete="email"
        {...register('email')}
      />
      <AuthField
        id="password"
        type="password"
        label={fields.password.label}
        autoComplete="current-password"
        {...register('password')}
      />
      <div className="h-[65px] w-full">
        {errors.root?.message && (
          <p
            role="alert"
            className="w-full text-center text-xs text-destructive"
          >
            {errors.root.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        size="large"
        disabled={isSubmitDisabled || isLoading}
        aria-label={isLoading ? signInContent.pendingLabel : undefined}
      >
        {isLoading ? (
          <Loader2Icon aria-hidden className="size-4 animate-spin" />
        ) : (
          signInContent.submit
        )}
      </Button>
    </form>
  )
}
