import { cn } from '#/lib/cn'

type TabsProps<T extends string> = {
  label: string
  options: ReadonlyArray<{ value: T; label: string }>
  value: T
  onChange: (value: T) => void
}

export function Tabs<T extends string>({
  label,
  options,
  value,
  onChange,
}: TabsProps<T>) {
  const activeIndex = options.findIndex((o) => o.value === value)

  return (
    <div
      role="tablist"
      aria-label={label}
      className="flex gap-6 border-b border-line"
    >
      {options.map((option, index) => {
        const on = index === activeIndex
        const origin = index < activeIndex ? 'origin-right' : 'origin-left'
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative pb-3 text-body-sm font-medium transition-colors',
              on ? 'text-ink' : 'text-fg-3',
            )}
          >
            {option.label}
            <span
              aria-hidden
              className={cn(
                'absolute inset-x-0 -bottom-px h-0.5 bg-ink transition-transform',
                origin,
                on ? 'scale-x-100' : 'scale-x-0',
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
