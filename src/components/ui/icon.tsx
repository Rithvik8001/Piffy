import type { Tool } from '#/lib/tools'

export const ICON = {
  home: ['M3 9.5L10 3l7 6.5V16a1 1 0 01-1 1h-4v-5H8v5H4a1 1 0 01-1-1z'],
  history: ['M10 3a7 7 0 110 14 7 7 0 010-14z', 'M10 6v4l2.5 2'],
  settings: [
    'M10 7a3 3 0 110 6 3 3 0 010-6z',
    'M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M4.7 15.3l1.4-1.4M13.9 6.1l1.4-1.4',
  ],
  check: ['M4 10.5l4 4 8-9'],
  upload: ['M10 14V4M6 8l4-4 4 4', 'M3 13v2a2 2 0 002 2h10a2 2 0 002-2v-2'],
  shield: [
    'M10 2l6 2.5V9c0 4-2.6 6.9-6 8-3.4-1.1-6-4-6-8V4.5z',
    'M7.5 10l1.8 1.8L12.8 8',
  ],
  offline: [
    'M3 7.5a10 10 0 0114 0M5.5 10.5a6 6 0 019 0M8 13.5a2.5 2.5 0 014 0',
    'M10 16.5v.01',
  ],
  sparkle: [
    'M10 3l1.5 4 4 1.5-4 1.5L10 14l-1.5-4-4-1.5 4-1.5z',
    'M15.5 13l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z',
  ],
  grip: ['M7 6h.01M13 6h.01M7 10h.01M13 10h.01M7 14h.01M13 14h.01'],
  up: ['M10 15V5M6 9l4-4 4 4'],
  down: ['M10 5v10M6 11l4 4 4-4'],
  trash: ['M4 6h12M8 6V4h4v2M6 6l.8 10h6.4L14 6', 'M8.5 9v4.5M11.5 9v4.5'],
  download: [
    'M10 4v9M6.5 9.5L10 13l3.5-3.5',
    'M3 14v1a2 2 0 002 2h10a2 2 0 002-2v-1',
  ],
  chevron: ['M7.5 5l5 5-5 5'],
  back: ['M12 5l-5 5 5 5'],
  close: ['M6 6l8 8M14 6l-8 8'],
  doc: [
    'M6 3h6l4 4v10a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z',
    'M12 3v4h4',
  ],
  search: ['M9 3.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zM13 13l3.5 3.5'],
  rotate: ['M4.5 10a5.5 5.5 0 109.3-3.9M13.5 3v3.5H10'],
} as const

export type IconName = keyof typeof ICON

type PathIconProps = {
  paths: ReadonlyArray<string>
  size?: number
  strokeWidth?: number
  viewBox?: string
  className?: string
  style?: React.CSSProperties
}

export function PathIcon({
  paths,
  size = 18,
  strokeWidth = 1.7,
  viewBox = '0 0 20 20',
  className,
  style,
}: PathIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      style={style}
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

type IconProps = Omit<PathIconProps, 'paths' | 'viewBox'> & { name: IconName }

export function Icon({ name, ...rest }: IconProps) {
  return <PathIcon paths={ICON[name]} {...rest} />
}

export function ToolIcon({ tool, size = 20 }: { tool: Tool; size?: number }) {
  return (
    <PathIcon
      paths={tool.iconPaths}
      size={size}
      viewBox="0 0 24 24"
      strokeWidth={1.6}
    />
  )
}

export function MoreIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <circle cx="4.5" cy="10" r="1.6" />
      <circle cx="10" cy="10" r="1.6" />
      <circle cx="15.5" cy="10" r="1.6" />
    </svg>
  )
}

export function DoneMark() {
  return (
    <span className="grid h-18 w-16 animate-pop place-items-center">
      <svg
        width="52"
        height="64"
        viewBox="0 0 52 64"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path
          d="M10 2h22l12 12v44a4 4 0 01-4 4H10a4 4 0 01-4-4V6a4 4 0 014-4z"
          fill="var(--fill)"
        />
        <path d="M32 2v12h12" />
        <path
          d="M17 36l6.5 6.5L36 29"
          strokeWidth="2.2"
          strokeDasharray="40"
          strokeDashoffset="40"
          className="animate-draw"
        />
      </svg>
    </span>
  )
}
