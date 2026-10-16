import { cn } from '#/lib/cn'
import type { RunsOn } from '#/lib/tools'
import type { ReactNode } from 'react'

export function Badge({
  children,
  dot,
}: {
  children: ReactNode
  dot?: 'ok' | 'bad'
}) {
  return (
    <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-fill px-2.5 text-caption font-medium">
      {dot && (
        <span
          aria-hidden
          className={cn(
            'size-1.5 rounded-full',
            dot === 'ok' ? 'bg-ok' : 'bg-bad',
          )}
        />
      )}
      {children}
    </span>
  )
}

export function RunsOnBadge({ runsOn }: { runsOn: RunsOn }) {
  return runsOn === 'device' ? (
    <Badge dot="ok">On this device</Badge>
  ) : (
    <Badge>Runs on our server</Badge>
  )
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-7 items-center gap-1 rounded-key bg-fill px-2 font-sans text-[12.5px] font-medium text-fg-2 tabular-nums">
      {children}
    </kbd>
  )
}
