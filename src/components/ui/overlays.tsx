import { useEffect, useId, useRef, useState } from 'react'
import { cn } from '#/lib/cn'
import { useDelayedFlag } from '#/lib/motion'
import { IconButton } from './button'
import { MoreIcon } from './icon'
import type { ReactNode } from 'react'

const TOOLTIP_DELAY_MS = 400

export type MenuItem = {
  label: string
  onSelect: () => void
  destructive?: boolean
}

export function Menu({
  label,
  items,
}: {
  label: string
  items: ReadonlyArray<MenuItem>
}) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLSpanElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    root.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus()
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <span ref={root} className="relative inline-flex">
      <IconButton
        label={label}
        pressed={open}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((o) => !o)}
        className="active:scale-100"
      >
        <MoreIcon />
      </IconButton>
      {open && (
        <div
          id={menuId}
          role="menu"
          className="absolute top-11.5 right-0 z-10 min-w-45 origin-top-right animate-menu-in rounded-menu bg-tray p-1.5 shadow-tray"
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false)
                item.onSelect()
              }}
              className={cn(
                'flex h-10 w-full items-center rounded-item px-3 text-left text-body-sm font-medium transition-colors duration-(--d1) hover:bg-fill focus-visible:rounded-item focus-visible:bg-fill focus-visible:outline-none',
                item.destructive ? 'text-bad' : 'text-ink',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </span>
  )
}

export function Tooltip({
  text,
  children,
}: {
  text: string
  children: ReactNode
}) {
  const { on, show, hide } = useDelayedFlag(TOOLTIP_DELAY_MS)
  const tipId = useId()

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      aria-describedby={on ? tipId : undefined}
    >
      {children}
      {on && (
        <span
          id={tipId}
          role="tooltip"
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-tip-in rounded-item bg-ink px-3 py-2 text-caption font-medium whitespace-nowrap text-on-ink"
        >
          {text}
        </span>
      )}
    </span>
  )
}
