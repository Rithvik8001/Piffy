import { cn } from '#/lib/cn'
import type { CSSProperties, ReactNode } from 'react'

type SectionProps = {
  label: string
  statement: string
  description?: string
  children: ReactNode
  enterDelayMs?: number
  className?: string
}

export function Section({
  label,
  statement,
  description,
  children,
  enterDelayMs = 0,
  className,
}: SectionProps) {
  const style: CSSProperties = { animationDelay: `${enterDelayMs}ms` }
  return (
    <section
      className={cn('flex animate-enter flex-col gap-5.5', className)}
      style={style}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-label font-medium text-fg-3">{label}</h2>
        <p className="text-title font-semibold">{statement}</p>
        {description && (
          <p className="max-w-[52ch] text-body-sm text-fg-2">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}
