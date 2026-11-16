import { CircleCheckIcon, XIcon } from 'lucide-react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      closeButton
      icons={{
        success: <CircleCheckIcon className="size-6" />,
        close: <XIcon className="size-6" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            'w-fit! gap-4! rounded-lg! border-success-foreground! bg-success! px-6! py-3! text-base! leading-6! font-semibold! text-success-foreground!',
          icon: 'size-6! m-0! mr-2!',
          closeButton:
            'static! order-last ml-auto size-6! transform-none! rounded-none! border-0! bg-transparent! text-success-foreground!',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
