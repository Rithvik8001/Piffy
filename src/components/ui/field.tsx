import { useId } from 'react'
import { cn } from '#/lib/cn'
import { Icon } from './icon'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

const surface =
  'w-full border-0 bg-fill text-ink outline-none transition-[background-color,box-shadow] placeholder:text-fg-3 focus:bg-ground focus:shadow-[0_0_0_2px_var(--ink)]'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string }

export function TextField({ label, className, id, ...rest }: TextFieldProps) {
  const fallbackId = useId()
  const inputId = id ?? fallbackId
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={inputId} className="text-label font-medium text-fg-2">
        {label}
      </label>
      <input
        id={inputId}
        className={cn(surface, 'h-13 rounded-full px-4.5')}
        {...rest}
      />
    </div>
  )
}

type SearchFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function SearchField({ label, className, ...rest }: SearchFieldProps) {
  return (
    <label className={cn('relative flex items-center', className)}>
      <span className="sr-only">{label}</span>
      <span className="pointer-events-none absolute left-4.5 inline-flex text-fg-3">
        <Icon name="search" size={18} />
      </span>
      <input
        type="search"
        className={cn(surface, 'h-13 rounded-full pr-4.5 pl-12')}
        {...rest}
      />
    </label>
  )
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
}

export function TextArea({
  label,
  className,
  id,
  rows = 3,
  ...rest
}: TextAreaProps) {
  const fallbackId = useId()
  const inputId = id ?? fallbackId
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={inputId} className="text-label font-medium text-fg-2">
        {label}
      </label>
      <textarea
        id={inputId}
        rows={rows}
        className={cn(
          surface,
          'resize-none rounded-notice px-4.5 py-4 text-body',
        )}
        {...rest}
      />
    </div>
  )
}
