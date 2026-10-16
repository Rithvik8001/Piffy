import { cn } from '#/lib/cn'
import { Icon } from './icon'
import { MorphLabel } from './morph-label'

type CheckRowProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function CheckRow({ label, checked, onChange }: CheckRowProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 border-t border-line py-4 text-left"
    >
      <span className="text-body font-medium">{label}</span>
      <CheckDot checked={checked} />
    </button>
  )
}

export function CheckDot({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'grid size-6 flex-none place-items-center rounded-full text-on-ink transition-[background-color,box-shadow]',
        checked
          ? 'bg-ink'
          : 'bg-transparent shadow-[inset_0_0_0_1.5px_var(--fg-3)]',
      )}
    >
      <span
        className={cn(
          'inline-flex transition-[opacity,transform]',
          checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
        )}
      >
        <Icon name="check" size={16} strokeWidth={2} />
      </span>
    </span>
  )
}

type RadioGroupProps<T extends string> = {
  label: string
  options: ReadonlyArray<{ value: T; label: string }>
  value: T
  onChange: (value: T) => void
}

export function RadioGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: RadioGroupProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="flex flex-wrap gap-5.5"
    >
      {options.map((option) => {
        const on = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(option.value)}
            className="inline-flex items-center gap-2.5 text-body font-medium"
          >
            <span
              aria-hidden
              className={cn(
                'size-5.5 rounded-full transition-shadow',
                on
                  ? 'shadow-[inset_0_0_0_7px_var(--ink)]'
                  : 'shadow-[inset_0_0_0_1.5px_var(--ink)]',
              )}
            />
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

type StepperProps = {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  label: string
}

export function Stepper({
  value,
  onChange,
  min = 1,
  max = Infinity,
  label,
}: StepperProps) {
  const stepClass =
    'size-9 rounded-full bg-transparent text-lead text-ink transition-colors duration-(--d1) enabled:hover:bg-fill-2 disabled:opacity-40'
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center gap-0.5 rounded-full bg-fill p-1"
    >
      <button
        type="button"
        aria-label="Fewer"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={stepClass}
      >
        −
      </button>
      <span
        aria-live="polite"
        className="min-w-7 text-center text-body font-medium tabular-nums"
      >
        <MorphLabel text={String(value)} />
      </span>
      <button
        type="button"
        aria-label="More"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={stepClass}
      >
        +
      </button>
    </div>
  )
}
