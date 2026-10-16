import { cn } from '#/lib/cn'

type SegmentedProps<T extends string> = {
  options: ReadonlyArray<{ value: T; label: string }>
  value: T
  onChange: (value: T) => void
  label: string
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: SegmentedProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex gap-0.5 rounded-full bg-fill p-1"
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
            className={cn(
              'h-9 rounded-full px-4 text-label font-medium transition-[background-color,color,box-shadow,transform] active:scale-[0.96]',
              on
                ? 'bg-ground text-ink shadow-raised'
                : 'bg-transparent text-fg-2',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
