import { cn } from '#/lib/cn'
import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'danger'
export type ButtonSize = 'md' | 'sm'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  block?: boolean
  working?: boolean
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-on-ink enabled:hover:bg-ink-hover disabled:opacity-40',
  secondary: 'bg-fill text-ink enabled:hover:bg-fill-2 disabled:opacity-40',
  danger: 'bg-fill text-bad enabled:hover:bg-fill-2 disabled:opacity-40',
  text: 'bg-transparent text-fg-2 enabled:hover:text-ink disabled:opacity-40',
}

const sizeClass: Record<ButtonVariant, Record<ButtonSize, string>> = {
  primary: { md: 'h-13 px-5.5 text-body', sm: 'h-11 px-5.5 text-body-sm' },
  secondary: { md: 'h-13 px-5.5 text-body', sm: 'h-11 px-5.5 text-body-sm' },
  danger: { md: 'h-13 px-5.5 text-body', sm: 'h-11 px-5.5 text-body-sm' },
  text: { md: 'h-11 px-3 text-body-sm', sm: 'h-11 px-3 text-body-sm' },
}

export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  working = false,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      aria-busy={working || undefined}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-[-0.005em]',
        'transition-[transform,background-color,color,opacity] enabled:active:scale-[0.98]',
        variantClass[variant],
        sizeClass[variant][size],
        block && 'w-full',
        className,
      )}
      {...rest}
    >
      {working && (
        <span
          aria-hidden
          className="absolute inset-0 origin-left animate-fill bg-on-ink/20"
        />
      )}
      <span className="relative inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  )
}

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  size?: 'lg' | 'md' | 'sm'
  tone?: 'filled' | 'ghost'
  pressed?: boolean
}

const iconButtonSize = { lg: 'size-10', md: 'size-9', sm: 'size-7' } as const

export function IconButton({
  label,
  size = 'lg',
  tone = 'filled',
  pressed = false,
  className,
  children,
  type = 'button',
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        'grid flex-none place-items-center rounded-full transition-[transform,background-color,color] active:scale-90',
        iconButtonSize[size],
        tone === 'filled'
          ? cn('text-ink hover:bg-fill-2', pressed ? 'bg-fill-2' : 'bg-fill')
          : 'bg-transparent text-fg-3 duration-(--d1) hover:bg-fill hover:text-ink',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
