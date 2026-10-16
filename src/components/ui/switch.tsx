import { cn } from '#/lib/cn'

type SwitchProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  className?: string
}

export function Switch({ checked, onChange, label, className }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-7 w-11.5 flex-none rounded-full transition-colors',
        checked ? 'bg-ink' : 'bg-fill-2',
        className,
      )}
    >
      <span
        className={cn(
          'absolute top-0.75 left-0.75 size-5.5 rounded-full bg-knob shadow-knob transition-transform',
          checked && 'translate-x-4.5',
        )}
      />
    </button>
  )
}
