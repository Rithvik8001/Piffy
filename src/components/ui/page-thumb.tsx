import { cn } from '#/lib/cn'
import { IconButton } from './button'
import { Icon } from './icon'

type PageThumbProps = {
  pageNumber: number
  selected: boolean
  rotation: number
  onToggle: () => void
  onRotate: () => void
}

const TEXT_LINES = [
  'top-[16%] right-[14%]',
  'top-[30%] right-[30%]',
  'top-[44%] right-[22%]',
  'top-[58%] right-[40%]',
]

export function PageThumb({
  pageNumber,
  selected,
  rotation,
  onToggle,
  onRotate,
}: PageThumbProps) {
  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={onToggle}
        aria-label={`Page ${pageNumber}`}
        aria-pressed={selected}
        className="grid aspect-square w-full place-items-center rounded-tile"
      >
        <span
          className={cn(
            'relative block aspect-3/4 w-[72%] overflow-hidden rounded-page bg-fill transition-[box-shadow,transform] duration-(--d3)',
            selected
              ? 'shadow-[0_0_0_2px_var(--ink)]'
              : 'shadow-[0_0_0_1px_var(--line)]',
          )}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {TEXT_LINES.map((position) => (
            <span
              key={position}
              className={cn(
                'absolute left-[14%] h-1.5 rounded-[3px] bg-fill-2',
                position,
              )}
            />
          ))}
          {selected && (
            <span className="absolute top-1.5 right-1.5 grid size-5 animate-pop place-items-center rounded-full bg-ink text-on-ink">
              <Icon name="check" size={12} strokeWidth={2.4} />
            </span>
          )}
        </span>
      </button>
      <span className="flex w-full items-center justify-between px-1">
        <span className="text-caption text-fg-3 tabular-nums">
          {pageNumber}
        </span>
        <IconButton
          label={`Rotate page ${pageNumber}`}
          size="sm"
          tone="ghost"
          onClick={onRotate}
        >
          <Icon name="rotate" size={15} />
        </IconButton>
      </span>
    </div>
  )
}
