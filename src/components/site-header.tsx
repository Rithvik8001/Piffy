import { Link } from '@tanstack/react-router'
import { cn } from '#/lib/cn'
import { LogoMark } from './ui'

export type HeaderTab = {
  key: string
  label: string
  active?: boolean
  dot?: boolean
  onSelect: () => void
}

export function SiteHeader({ tabs }: { tabs: ReadonlyArray<HeaderTab> }) {
  return (
    <header className="mx-auto flex w-full max-w-190 animate-fade-slow items-center justify-between gap-6 px-6 pt-7">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-body font-semibold tracking-[-0.01em]"
      >
        <LogoMark size={24} />
        Piffy
      </Link>
      <nav className="flex gap-5.5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={tab.onSelect}
            aria-current={tab.active ? 'page' : undefined}
            className={cn(
              'relative text-label font-medium transition-colors duration-(--d1) hover:text-ink',
              tab.active ? 'text-ink' : 'text-fg-2',
            )}
          >
            {tab.label}
            {tab.dot && (
              <span
                aria-hidden
                className="absolute -top-0.5 -right-2.25 size-1.5 animate-pop rounded-full bg-ink"
              />
            )}
          </button>
        ))}
      </nav>
    </header>
  )
}
