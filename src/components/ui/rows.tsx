import { cn } from '#/lib/cn'
import { Icon } from './icon'
import type { ReactNode } from 'react'

type ListRowProps = {
  icon?: ReactNode
  label: string
  caption?: string
  onClick?: () => void
  dense?: boolean
}

export function ListRow({
  icon,
  label,
  caption,
  onClick,
  dense = false,
}: ListRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group grid w-full items-center text-left',
        icon
          ? 'grid-cols-[24px_minmax(0,1fr)_16px]'
          : 'grid-cols-[minmax(0,1fr)_16px]',
        dense
          ? 'gap-3.5 rounded-tile px-2 py-3 transition-[background-color,transform] duration-(--d1) hover:bg-fill active:scale-[0.99]'
          : 'gap-4 border-t border-line py-4',
      )}
    >
      {icon && (
        <span className="grid size-6 place-items-center text-ink">{icon}</span>
      )}
      <span className="flex min-w-0 flex-col">
        <span
          className={cn(
            'font-medium tracking-[-0.005em]',
            dense ? 'text-body-sm' : 'text-body',
          )}
        >
          {label}
        </span>
        {caption && (
          <span
            className={cn('text-fg-3', dense ? 'text-caption' : 'text-label')}
          >
            {caption}
          </span>
        )}
      </span>
      <Icon
        name="chevron"
        size={16}
        strokeWidth={1.6}
        className="text-fg-3 transition-[color,transform] group-hover:translate-x-0.75 group-hover:text-ink"
      />
    </button>
  )
}

type DetailRowProps = {
  title: string
  caption?: string
  children?: ReactNode
  stacked?: boolean
}

export function DetailRow({
  title,
  caption,
  children,
  stacked = false,
}: DetailRowProps) {
  return (
    <div
      className={cn(
        'flex gap-4 border-t border-line py-4',
        stacked ? 'flex-col gap-3' : 'items-center justify-between',
      )}
    >
      <span className="flex flex-col gap-0.5">
        <span className="text-body font-medium">{title}</span>
        {caption && <span className="text-label text-fg-3">{caption}</span>}
      </span>
      {children}
    </div>
  )
}

type SettingRowProps = { label: string; caption?: string; control: ReactNode }

export function SettingRow({ label, caption, control }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-line py-3.5">
      <span className="flex flex-col">
        <span className="text-body-sm font-medium">{label}</span>
        {caption && <span className="text-caption text-fg-3">{caption}</span>}
      </span>
      {control}
    </div>
  )
}
