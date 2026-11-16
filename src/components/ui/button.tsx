import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap transition-opacity outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6",
  {
    variants: {
      variant: {
        default:
          'rounded-sm border border-primary bg-linear-[133deg] from-primary to-primary-end text-white hover:opacity-80 disabled:opacity-30',
        outline:
          'rounded-sm border border-primary bg-white text-blue-text hover:opacity-70 disabled:opacity-30',
        ghost:
          'gap-2 rounded-lg bg-white text-grey-blue hover:opacity-70 disabled:opacity-30',
      },
      size: {
        default: 'px-4 py-3 text-base leading-6 font-semibold',
        navBar: 'px-4 py-3 text-base leading-6 font-semibold',
        large:
          'h-[43px] w-full text-sm leading-5 font-bold tracking-[-0.35px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]',
      },
    },
    compoundVariants: [
      { variant: 'ghost', size: 'navBar', className: 'pr-3 pl-4' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button }
