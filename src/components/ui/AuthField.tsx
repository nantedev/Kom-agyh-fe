import type { ComponentProps } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type AuthFieldProps = ComponentProps<'input'> & {
  id: string
  label: string
  error?: string
}

export default function AuthField({
  id,
  label,
  error,
  ...inputProps
}: AuthFieldProps) {
  const errorId = `${id}-error`

  return (
    <div className="flex w-full flex-col items-start gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="w-full text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
