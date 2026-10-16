import type { ReactNode } from 'react'

type NoticeProps = {
  children: ReactNode
  action?: { label: string; onClick: () => void }
}

export function Notice({ children, action }: NoticeProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-notice bg-fill px-4.5 py-3.5">
      <span className="text-body-sm">{children}</span>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="text-body-sm font-medium text-ink"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

export function ProgressBar({
  value,
  label,
}: {
  value: number
  label: string
}) {
  const clamped = Math.min(1, Math.max(0, value))
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped * 100)}
      className="h-0.5 overflow-hidden rounded-[2px] bg-fill-2"
    >
      <div
        className="h-full rounded-[2px] bg-ink transition-[width] duration-(--d3)"
        style={{ width: `${clamped * 100}%` }}
      />
    </div>
  )
}

export function RowSkeleton() {
  return (
    <div
      aria-hidden
      className="grid grid-cols-[24px_minmax(0,1fr)] items-center gap-4 py-1"
    >
      <span className="size-5.5 rounded-bone bg-fill" />
      <span className="flex flex-col gap-2">
        <span className="h-3 w-[38%] rounded-bone bg-fill" />
        <span className="h-2.5 w-[56%] rounded-bone bg-fill" />
      </span>
    </div>
  )
}
