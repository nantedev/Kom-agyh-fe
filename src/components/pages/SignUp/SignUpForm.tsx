import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useRef } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import * as z from 'zod'

import AuthField from '@/components/ui/AuthField'
import { Button } from '@/components/ui/button'
import { networkErrorMessage } from '@/data/auth'
import { signUpContent } from '@/data/signUp'
import { extractApiError } from '@/lib/api/http'
import { errorTargetFor } from '@/logic/auth/error/error'
import {
  isSignUpSubmitDisabled,
  type SignUpFields,
} from '@/logic/auth/validation/validation'

const signUpSchema = z.object({
  firstName: z.string().trim().min(1, signUpContent.firstNameError),
  email: z.string().trim().pipe(z.email({ error: signUpContent.emailError })),
  password: z.string().min(8, signUpContent.passwordError),
})

type SignUpFormProps = {
  isPending?: boolean
  onSubmit: (fields: SignUpFields) => Promise<unknown>
}

export default function SignUpForm({
  isPending = false,
  onSubmit,
}: SignUpFormProps) {
  const { fields } = signUpContent
  const submittingRef = useRef(false)

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFields>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { firstName: '', email: '', password: '' },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const watchedFields = useWatch({ control })
  const isSubmitDisabled = isSignUpSubmitDisabled({
    firstName: watchedFields.firstName ?? '',
    email: watchedFields.email ?? '',
    password: watchedFields.password ?? '',
  })
  const isLoading = isPending || isSubmitting

  const handleValidSubmit = async (values: SignUpFields) => {
    if (submittingRef.current || isPending) {
      return
    }

    clearErrors('root')
    submittingRef.current = true

    try {
      await onSubmit(values)
    } catch (error) {
      const apiError = extractApiError(error)

      if (apiError && errorTargetFor(apiError.code) === 'email') {
        setError('email', { type: 'server', message: apiError.message })
      } else {
        setError('root', {
          type: 'server',
          message: apiError ? apiError.message : networkErrorMessage,
        })
      }
    } finally {
      submittingRef.current = false
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleValidSubmit)}
      className="flex w-full flex-col items-center gap-8"
    >
      <AuthField
        id="firstName"
        label={fields.firstName.label}
        error={errors.firstName?.message}
        autoComplete="given-name"
        {...register('firstName')}
      />
      <AuthField
        id="email"
        type="email"
        label={fields.email.label}
        placeholder={fields.email.placeholder}
        error={errors.email?.message}
        autoComplete="email"
        {...register('email')}
      />
      <AuthField
        id="password"
        type="password"
        label={fields.password.label}
        error={errors.password?.message}
        autoComplete="new-password"
        {...register('password')}
      />
      {errors.root?.message && (
        <p role="alert" className="w-full text-center text-xs text-destructive">
          {errors.root.message}
        </p>
      )}
      <Button
        type="submit"
        size="large"
        disabled={isSubmitDisabled || isLoading}
        aria-label={isLoading ? signUpContent.pendingLabel : undefined}
      >
        {isLoading ? (
          <Loader2Icon aria-hidden className="size-4 animate-spin" />
        ) : (
          signUpContent.submit
        )}
      </Button>
    </form>
  )
}
