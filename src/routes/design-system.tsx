import { createFileRoute } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { SiteHeader } from '#/components/site-header'
import {
  Badge,
  Button,
  CheckRow,
  DetailRow,
  Dialog,
  DoneMark,
  Icon,
  IconButton,
  Kbd,
  ListRow,
  Menu,
  MorphLabel,
  Notice,
  PageThumb,
  ProgressBar,
  RadioGroup,
  RowSkeleton,
  RunsOnBadge,
  SearchField,
  Section,
  Segmented,
  SettingRow,
  Stepper,
  Switch,
  Tabs,
  TextArea,
  TextField,
  ToolIcon,
  Tooltip,
  useDialogStack,
  useToast,
} from '#/components/ui'
import { useFlip } from '#/lib/motion'
import { useTheme } from '#/lib/theme'
import { TOOLS } from '#/lib/tools'
import type { DialogController } from '#/components/ui'
import type { Theme } from '#/lib/theme'
import type { Tool } from '#/lib/tools'

export const Route = createFileRoute('/design-system')({
  head: () => ({ meta: [{ title: 'Design system · Piffy' }] }),
  component: DesignSystem,
})

type View =
  | 'picker'
  | 'soon'
  | 'merge-confirm'
  | 'merge-done'
  | 'settings'
  | 'history'
  | 'walk-intro'
  | 'walk-deeper'
  | 'walk-done'
  | 'warn'
  | 'danger'

const VIEW_TITLES: Record<Exclude<View, 'soon' | 'merge-confirm'>, string> = {
  picker: 'Choose a tool',
  'merge-done': 'Done',
  settings: 'Settings',
  history: 'History',
  'walk-intro': 'A dialog',
  'walk-deeper': 'A taller dialog',
  'walk-done': 'All done',
  warn: 'Heads up',
  danger: 'Delete 3 pages?',
}

const PRINCIPLES = [
  {
    title: 'Simplicity',
    text: 'The work sits on the page; decisions appear only when they matter. One job per dialog.',
  },
  {
    title: 'Fluidity',
    text: 'Every transition is a visible path from A to B. Things persist and move; nothing teleports.',
  },
  {
    title: 'Delight',
    text: 'Rare, small, earned. A pop on completion, a morphing label. Never a parade.',
  },
]

const SWATCHES: Record<
  Theme,
  ReadonlyArray<{ name: string; token: string; hex: string }>
> = {
  light: [
    { name: 'Ink', token: '--ink', hex: '#0a0a0a' },
    { name: 'Grey', token: '--fg-2', hex: '#6f6f6f' },
    { name: 'Quiet', token: '--fg-3', hex: '#a3a3a3' },
    { name: 'Fill', token: '--fill', hex: '#f4f4f4' },
    { name: 'Hairline', token: '--line', hex: '#ededed' },
    { name: 'Ground', token: '--bg', hex: '#ffffff' },
  ],
  dark: [
    { name: 'Ink', token: '--ink', hex: '#f2f2f2' },
    { name: 'Grey', token: '--fg-2', hex: '#9a9a9a' },
    { name: 'Quiet', token: '--fg-3', hex: '#6a6a6a' },
    { name: 'Fill', token: '--fill', hex: '#1a1a1a' },
    { name: 'Hairline', token: '--line', hex: '#1f1f1f' },
    { name: 'Ground', token: '--bg', hex: '#0b0b0b' },
  ],
}

const TYPE_SCALE = [
  {
    className: 'text-display font-semibold',
    sample: 'Display 44',
    note: '600 · −3% tracking · page titles',
  },
  {
    className: 'text-title font-semibold',
    sample: 'Title 24',
    note: '600 · −2% · section statements',
  },
  {
    className: 'text-dialog font-semibold',
    sample: 'Dialog title 20',
    note: '600 · −1.5% · dialogs',
  },
  {
    className: 'text-body',
    sample: 'Body 16. Every sentence earns its place; copy is plain and short.',
    note: '400 / 500 · rows, paragraphs, buttons',
  },
  {
    className: 'text-label font-medium text-fg-3',
    sample: 'Label 14 · grey',
    note: '500 · section labels, captions',
  },
]

const MOTION_NOTES = [
  'Directional, but barely: step content shifts 6px toward the direction of travel; back reverses it.',
  'Each step changes the card’s height, so the change is unmistakable.',
  'No redundant motion: anything that persists is never redrawn. Only the changed digit in “Merge 3 files” moves.',
  'Press squashes to 98%. Nothing bounces, nothing lifts. One ease, three durations.',
  'Delight scales with rarity: one drawn tick on completion, never a parade. Everything collapses under reduced motion.',
]

const SAMPLE_FILES = [
  'Invoice-0412.pdf',
  'Receipts-March.pdf',
  'Proposal-v3.pdf',
]
const MERGE_MS = 1150

type MergeFile = { name: string; pages: number }

function samplePages() {
  return SAMPLE_FILES.map((name, index) => ({
    name,
    pages: 4 + ((index * 7 + 5) % 19),
  }))
}

function DesignSystem() {
  const dialog = useDialogStack<View>()
  const toast = useToast()
  const { theme, setTheme } = useTheme()
  const [soonTool, setSoonTool] = useState<Tool | null>(null)
  const [mergeFiles, setMergeFiles] = useState<ReadonlyArray<MergeFile>>([])
  const [merging, setMerging] = useState(false)
  const [historyPages, setHistoryPages] = useState<number | null>(null)

  const totalPages = mergeFiles.reduce((sum, file) => sum + file.pages, 0)

  const openTool = (tool: Tool, fromPicker: boolean) => {
    setSoonTool(tool)
    if (fromPicker) dialog.push('soon')
    else dialog.open('soon')
  }

  const openMergeDemo = () => {
    setMergeFiles(samplePages())
    dialog.open('merge-confirm')
  }

  const confirmMerge = () => {
    if (merging) return
    setMerging(true)
    setTimeout(() => {
      setMerging(false)
      dialog.finish('merge-done')
    }, MERGE_MS)
  }

  const title =
    dialog.view === 'soon'
      ? (soonTool?.label ?? '')
      : dialog.view === 'merge-confirm'
        ? `Merge ${mergeFiles.length} files?`
        : dialog.view
          ? VIEW_TITLES[dialog.view]
          : ''

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        tabs={[
          {
            key: 'tools',
            label: 'Tools',
            onSelect: () => dialog.open('picker'),
          },
          {
            key: 'history',
            label: 'History',
            active: dialog.view === 'history',
            dot: historyPages !== null,
            onSelect: () => dialog.open('history'),
          },
          {
            key: 'settings',
            label: 'Settings',
            active: dialog.view === 'settings',
            onSelect: () => dialog.open('settings'),
          },
        ]}
      />
      <main className="mx-auto flex w-full max-w-190 flex-1 flex-col gap-[clamp(56px,10vw,72px)] px-6 pt-[clamp(56px,12vw,88px)] pb-35">
        <Intro theme={theme} onTheme={setTheme} />
        <ColourSection theme={theme} />
        <TypeSection />
        <ShapeSection />
        <MotionSection
          onOpenWalkthrough={() => dialog.open('walk-intro')}
          onOpenMerge={openMergeDemo}
        />
        <Section
          label="Dialogs"
          statement="Moments, not workspaces."
          description="Confirmations, warnings, pickers, settings, completion. The work itself lives on the page. A dialog is a centred card, 400 wide, 24 radius. It does one job, stacks, changes height per step, and turns its close into a back arrow as you go deeper. It settles into place with a fade."
          enterDelayMs={480}
        >
          <div className="flex flex-col">
            <ListRow
              label="Walk through a three-step dialog"
              onClick={() => dialog.open('walk-intro')}
            />
            <ListRow label="Confirm and complete" onClick={openMergeDemo} />
            <ListRow label="Warning" onClick={() => dialog.open('warn')} />
            <ListRow
              label="Destructive"
              onClick={() => dialog.open('danger')}
            />
            <ListRow label="Picker" onClick={() => dialog.open('picker')} />
          </div>
        </Section>
        <ControlsSection />
        <FeedbackSection
          onToast={() => toast.show('Saved to your downloads')}
        />
        <SelectionSection />
        <OverlaysSection
          onMenuPick={(label) => toast.show(`${label} — demo`)}
        />
        <PagesSection />
        <FieldsSection />
        <Section
          label="Rows and icons"
          statement="An icon, a name, a line."
          description="Stroke icons, ink only, no container. Hairline rows carry every list: tools, files, settings. Hover nudges the chevron, nothing else."
          enterDelayMs={640}
        >
          <div className="flex flex-col">
            {TOOLS.slice(0, 3).map((tool) => (
              <ListRow
                key={tool.id}
                icon={<ToolIcon tool={tool} />}
                label={tool.label}
                caption={tool.caption}
                onClick={() => openTool(tool, false)}
              />
            ))}
          </div>
        </Section>
      </main>

      <Dialog controller={dialog} title={title}>
        <DialogBody
          dialog={dialog}
          soonTool={soonTool}
          files={mergeFiles}
          totalPages={totalPages}
          merging={merging}
          historyPages={historyPages}
          onPickTool={(tool) => openTool(tool, true)}
          onConfirmMerge={confirmMerge}
          onDownload={() => {
            setHistoryPages(totalPages)
            dialog.close()
            toast.show('Saved to your downloads')
          }}
          onStartOver={() => {
            setMergeFiles([])
            dialog.close()
          }}
        />
      </Dialog>
    </div>
  )
}

function Intro({
  theme,
  onTheme,
}: {
  theme: Theme
  onTheme: (theme: Theme) => void
}) {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex animate-enter flex-col gap-3.5">
        <h1 className="text-display font-semibold">
          Less, but
          <br />
          moving.
        </h1>
        <p className="max-w-[36ch] text-lead text-fg-2">
          Piffy’s design language. White space, one ink, one typeface, and
          motion that explains itself.
        </p>
        <div className="pt-2">
          <Segmented
            label="Theme"
            value={theme}
            onChange={onTheme}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
            ]}
          />
        </div>
      </div>
      <div className="flex animate-enter flex-col [animation-delay:100ms]">
        {PRINCIPLES.map((principle) => (
          <div
            key={principle.title}
            className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 border-t border-line py-4.5"
          >
            <span className="text-body font-medium">{principle.title}</span>
            <span className="text-body-sm text-fg-2">{principle.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function ColourSection({ theme }: { theme: Theme }) {
  return (
    <Section
      label="Colour"
      statement="One ink, two greys, one ground."
      description="Colour carries no decoration. Ink for action, grey for support, the ground for room. In dark mode the ink turns to warm white and the ground to near-black; greys stay in the same order. Green and red appear only as meaning — a tick, a destructive label — never as a wash."
      enterDelayMs={320}
    >
      <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-3">
        {SWATCHES[theme].map((swatch) => (
          <div key={swatch.name} className="flex flex-col gap-2">
            <span
              className="h-16 rounded-menu shadow-[inset_0_0_0_1px_var(--line)]"
              style={{ background: `var(${swatch.token})` }}
            />
            <span className="text-caption font-medium">{swatch.name}</span>
            <span className="text-micro text-fg-3">{swatch.hex}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

function TypeSection() {
  return (
    <Section
      label="Type"
      statement="Inter, four sizes."
      description="Tight tracking as it grows, generous line height as it shrinks. Weight does the hierarchy; colour does the rest."
      enterDelayMs={360}
    >
      <div className="flex flex-col">
        {TYPE_SCALE.map((row) => (
          <div
            key={row.sample}
            className="flex flex-col gap-1.5 border-t border-line py-4.5"
          >
            <span className={row.className}>{row.sample}</span>
            <span className="text-caption text-fg-3">{row.note}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

function ShapeSection() {
  return (
    <Section
      label="Shape"
      statement="Round, soft, deep."
      description="Pills for controls, 24 for dialogs and menus, 20 for notices. Hairlines separate; nothing has a border. Icons stand alone."
      enterDelayMs={400}
    >
      <div className="flex flex-wrap items-end gap-4">
        <span className="h-13 w-30 rounded-full bg-ink" />
        <span className="h-24 w-35 rounded-[28px] bg-fill" />
        <span className="h-30 w-40 rounded-dialog bg-tray shadow-tray" />
      </div>
    </Section>
  )
}

type MotionSectionProps = {
  onOpenWalkthrough: () => void
  onOpenMerge: () => void
}

function MotionSection({ onOpenWalkthrough, onOpenMerge }: MotionSectionProps) {
  const [flips, setFlips] = useState(0)
  const [order, setOrder] = useState(SAMPLE_FILES)
  const list = useRef<HTMLOListElement>(null)
  useFlip(list, order)

  return (
    <Section
      label="Motion"
      statement="Settle, never fly."
      description="One ease: cubic-bezier(.32,.72,0,1). 160 / 320 / 480 ms. Nothing travels across the screen. Things appear where they belong, change in place, and slide only when their order changes."
      enterDelayMs={440}
    >
      <div className="flex flex-col">
        <DetailRow
          title="Label morph"
          caption="Shared letters stay; only the difference crossfades"
        >
          <Button
            size="sm"
            className="min-w-33"
            onClick={() => setFlips((n) => n + 1)}
          >
            <MorphLabel text={flips % 2 ? 'Confirm' : 'Continue'} />
          </Button>
        </DetailRow>
        <DetailRow
          title="Arrive, don’t fly"
          caption="Dialogs settle in place: a fade and a 3% scale, nothing travels"
        >
          <Button variant="secondary" size="sm" onClick={onOpenWalkthrough}>
            Open
          </Button>
        </DetailRow>
        <DetailRow
          title="Progress lives in the button"
          caption="Confirm → Merging → Done, same element throughout"
        >
          <Button variant="secondary" size="sm" onClick={onOpenMerge}>
            Try
          </Button>
        </DetailRow>
        <DetailRow
          title="Things slide, never jump"
          caption="Reordered rows glide to their new place"
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setOrder((o) => [...o.slice(1), o[0]])}
          >
            Shuffle
          </Button>
        </DetailRow>
        <ol ref={list} className="flex flex-col pb-2">
          {order.map((name, index) => (
            <li
              key={name}
              data-flip={name}
              className="grid grid-cols-[28px_minmax(0,1fr)] items-center gap-3.5 border-t border-line py-3"
            >
              <span className="text-label text-fg-3 tabular-nums">
                {index + 1}
              </span>
              <span className="text-body font-medium">{name}</span>
            </li>
          ))}
        </ol>
        {MOTION_NOTES.map((note) => (
          <p
            key={note}
            className="border-t border-line py-4.5 text-body-sm text-fg-2"
          >
            {note}
          </p>
        ))}
      </div>
    </Section>
  )
}

function ControlsSection() {
  const [scope, setScope] = useState<'pages' | 'files' | 'both'>('pages')
  const [on, setOn] = useState(true)

  return (
    <Section
      label="Controls"
      statement="Buttons, a switch, a segment."
      enterDelayMs={520}
    >
      <div className="flex flex-col gap-7">
        <div className="flex flex-wrap items-center gap-2.5">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="text">Text</Button>
          <Button variant="danger">Delete</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Segmented
            label="Apply to"
            value={scope}
            onChange={setScope}
            options={[
              { value: 'pages', label: 'Pages' },
              { value: 'files', label: 'Files' },
              { value: 'both', label: 'Both' },
            ]}
          />
          <Switch label="Demo switch" checked={on} onChange={setOn} />
        </div>
        <TextField
          label="File name"
          defaultValue="merged.pdf"
          className="max-w-90"
        />
      </div>
    </Section>
  )
}

function FeedbackSection({ onToast }: { onToast: () => void }) {
  return (
    <Section
      label="Feedback"
      statement="Quiet, then gone."
      description="A toast confirms what already happened and leaves on its own. Progress lives inside the control that started it. Notices sit in the flow, never over it."
      enterDelayMs={540}
    >
      <div className="flex flex-col">
        <DetailRow title="Toast" caption="Bottom centre, 2.4 s, one line">
          <Button variant="secondary" size="sm" onClick={onToast}>
            Show
          </Button>
        </DetailRow>
        <DetailRow
          title="Progress bar"
          caption="For long jobs only; 2px, ink on fill"
          stacked
        >
          <ProgressBar value={0.62} label="Demo progress" />
        </DetailRow>
        <DetailRow
          title="Inline notice"
          caption="Grey fill, 20 radius, one sentence, optional action"
          stacked
        >
          <Notice action={{ label: 'Unlock', onClick: () => undefined }}>
            Two files are password protected.
          </Notice>
        </DetailRow>
        <DetailRow
          title="Skeleton"
          caption="Same geometry as the row it replaces; fill, no shimmer"
          stacked
        >
          <RowSkeleton />
        </DetailRow>
      </div>
    </Section>
  )
}

function SelectionSection() {
  const [bookmarks, setBookmarks] = useState(true)
  const [flatten, setFlatten] = useState(false)
  const [format, setFormat] = useState<'png' | 'jpg' | 'webp'>('png')
  const [copies, setCopies] = useState(1)
  const [tab, setTab] = useState<'pages' | 'bookmarks' | 'info'>('pages')

  return (
    <Section
      label="Selection"
      statement="Check, choose, count."
      enterDelayMs={560}
    >
      <div className="flex flex-col">
        <CheckRow
          label="Keep bookmarks"
          checked={bookmarks}
          onChange={setBookmarks}
        />
        <CheckRow
          label="Flatten form fields"
          checked={flatten}
          onChange={setFlatten}
        />
        <div className="flex flex-col gap-3 border-t border-line py-4">
          <span className="text-label text-fg-3">Radio — one of</span>
          <RadioGroup
            label="Image format"
            value={format}
            onChange={setFormat}
            options={[
              { value: 'png', label: 'PNG' },
              { value: 'jpg', label: 'JPG' },
              { value: 'webp', label: 'WebP' },
            ]}
          />
        </div>
        <DetailRow title="Stepper" caption="Copies, margins, page counts">
          <Stepper label="Copies" value={copies} onChange={setCopies} />
        </DetailRow>
        <div className="flex flex-col gap-3 border-t border-line py-4">
          <span className="text-label text-fg-3">
            Tabs — sections of one page
          </span>
          <Tabs
            label="Document sections"
            value={tab}
            onChange={setTab}
            options={[
              { value: 'pages', label: 'Pages' },
              { value: 'bookmarks', label: 'Bookmarks' },
              { value: 'info', label: 'Info' },
            ]}
          />
        </div>
      </div>
    </Section>
  )
}

function OverlaysSection({
  onMenuPick,
}: {
  onMenuPick: (label: string) => void
}) {
  return (
    <Section
      label="Overlays"
      statement="Small things, anchored."
      description="Menus grow from their trigger, scaled from the corner nearest it. Tooltips appear after a pause and say one thing."
      enterDelayMs={580}
    >
      <div className="flex flex-col">
        <DetailRow
          title="Menu"
          caption="Row actions: rename, duplicate, remove"
        >
          <Menu
            label="File actions"
            items={[
              { label: 'Rename', onSelect: () => onMenuPick('Rename') },
              { label: 'Duplicate', onSelect: () => onMenuPick('Duplicate') },
              {
                label: 'Remove',
                onSelect: () => onMenuPick('Remove'),
                destructive: true,
              },
            ]}
          />
        </DetailRow>
        <DetailRow title="Tooltip" caption="Hover the icon">
          <Tooltip text="Processed on this device">
            <IconButton label="Where this runs" className="active:scale-100">
              <Icon name="shield" />
            </IconButton>
          </Tooltip>
        </DetailRow>
      </div>
    </Section>
  )
}

function PagesSection() {
  const [selected, setSelected] = useState<ReadonlyArray<number>>([2])
  const [rotation, setRotation] = useState<Record<number, number>>({})

  return (
    <Section
      label="Pages"
      statement="Thumbnails you can hold."
      description="For Organize, Split and Redact: a grid of pages. Tap to select, the ring draws itself; rotate turns the page in place. Numbers are small and tabular."
      enterDelayMs={600}
    >
      <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-3.5">
        {[1, 2, 3, 4, 5, 6].map((page) => (
          <PageThumb
            key={page}
            pageNumber={page}
            selected={selected.includes(page)}
            rotation={rotation[page] ?? 0}
            onToggle={() =>
              setSelected((s) =>
                s.includes(page) ? s.filter((p) => p !== page) : [...s, page],
              )
            }
            onRotate={() =>
              setRotation((r) => ({ ...r, [page]: (r[page] ?? 0) + 90 }))
            }
          />
        ))}
      </div>
    </Section>
  )
}

function FieldsSection() {
  return (
    <Section label="Fields" statement="Pills for text, too." enterDelayMs={620}>
      <div className="flex max-w-105 flex-col gap-4">
        <SearchField label="Search tools" placeholder="Search tools" />
        <TextArea
          label="Text to redact"
          placeholder="Names, account numbers, addresses…"
        />
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Badge>New</Badge>
          <RunsOnBadge runsOn="device" />
          <Kbd>⌘ V</Kbd>
          <span className="text-caption text-fg-3">
            Badges and a keyboard hint
          </span>
        </div>
      </div>
    </Section>
  )
}

type DialogBodyProps = {
  dialog: DialogController<View>
  soonTool: Tool | null
  files: ReadonlyArray<MergeFile>
  totalPages: number
  merging: boolean
  historyPages: number | null
  onPickTool: (tool: Tool) => void
  onConfirmMerge: () => void
  onDownload: () => void
  onStartOver: () => void
}

function DialogBody({
  dialog,
  soonTool,
  files,
  totalPages,
  merging,
  historyPages,
  onPickTool,
  onConfirmMerge,
  onDownload,
  onStartOver,
}: DialogBodyProps) {
  const [notified, setNotified] = useState(false)
  const [settings, setSettings] = useState({
    history: true,
    motion: false,
    sound: true,
  })
  const fileSummary = `${files.length === 1 ? '1 file' : `${files.length} files`} · ${totalPages} pages`

  switch (dialog.view) {
    case 'picker':
      return (
        <div className="-mx-2 flex max-h-[52vh] flex-col overflow-auto px-2">
          {TOOLS.map((tool) => (
            <ListRow
              key={tool.id}
              dense
              icon={<ToolIcon tool={tool} size={18} />}
              label={tool.label}
              caption={tool.caption}
              onClick={() => onPickTool(tool)}
            />
          ))}
        </div>
      )
    case 'soon':
      return soonTool ? (
        <>
          <p className="text-body-sm text-fg-2">
            {soonTool.label} is almost ready. {soonTool.caption}, in your
            browser, nothing uploaded.
          </p>
          <Button onClick={() => setNotified(true)}>
            <MorphLabel text={notified ? 'You’re on the list' : 'Notify me'} />
          </Button>
        </>
      ) : null
    case 'merge-confirm':
      return (
        <>
          <div className="flex items-center gap-3.5 rounded-notice bg-fill p-4">
            <span className="grid size-11 flex-none place-items-center rounded-full bg-ground text-ink">
              <Icon name="doc" size={20} />
            </span>
            <span className="flex flex-col">
              <span className="font-medium">merged.pdf</span>
              <span className="text-label text-fg-2">{fileSummary}</span>
            </span>
          </div>
          <p className="text-body-sm text-fg-2">
            Merged in this browser. Your originals are not changed, and nothing
            is uploaded.
          </p>
          <Button
            working={merging}
            disabled={merging}
            className="disabled:opacity-100"
            onClick={onConfirmMerge}
          >
            <MorphLabel text={merging ? 'Merging' : 'Confirm'} />
          </Button>
        </>
      )
    case 'merge-done':
      return (
        <div className="flex flex-col items-center gap-4 pt-1.5 text-center">
          <DoneMark />
          <div className="flex flex-col gap-1">
            <span className="text-emphasis font-medium">
              merged.pdf is ready
            </span>
            <span className="text-label text-fg-2">{fileSummary}</span>
          </div>
          <Button block onClick={onDownload}>
            Download
          </Button>
          <Button variant="text" onClick={onStartOver}>
            Start over
          </Button>
        </div>
      )
    case 'settings':
      return (
        <div className="flex flex-col">
          <SettingRow
            label="Keep history on this device"
            caption="Recent files and actions, never synced"
            control={
              <Switch
                label="Keep history on this device"
                checked={settings.history}
                onChange={(history) => setSettings((s) => ({ ...s, history }))}
              />
            }
          />
          <SettingRow
            label="Reduce motion"
            caption="Shorter, calmer transitions"
            control={
              <Switch
                label="Reduce motion"
                checked={settings.motion}
                onChange={(motion) => setSettings((s) => ({ ...s, motion }))}
              />
            }
          />
          <SettingRow
            label="Sounds"
            caption="A soft tick when a job finishes"
            control={
              <Switch
                label="Sounds"
                checked={settings.sound}
                onChange={(sound) => setSettings((s) => ({ ...s, sound }))}
              />
            }
          />
          <p className="pt-3.5 text-caption text-fg-3">
            No account, no server. These live in this browser.
          </p>
        </div>
      )
    case 'history':
      return historyPages === null ? (
        <div className="flex flex-col items-center gap-4 pt-2 pb-1 text-center">
          <span className="grid size-13 place-items-center rounded-full bg-fill text-fg-2">
            <Icon name="history" size={22} />
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-emphasis font-medium">Nothing yet</span>
            <span className="max-w-[28ch] text-label text-fg-2">
              Files you process appear here, on this device only.
            </span>
          </div>
          <Button variant="secondary" onClick={() => dialog.replace('picker')}>
            Open a tool
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-[22px_minmax(0,1fr)_auto] items-center gap-3.5 border-t border-line py-3">
            <Icon name="doc" size={18} />
            <span className="flex min-w-0 flex-col">
              <span className="text-body-sm font-medium">merged.pdf</span>
              <span className="text-caption text-fg-3">
                Just now · on this device
              </span>
            </span>
            <span className="text-caption text-fg-3">{historyPages} pages</span>
          </div>
          <p className="text-caption text-fg-3">
            History never leaves this browser.
          </p>
        </>
      )
    case 'walk-intro':
      return (
        <>
          <p className="text-body-sm text-fg-2">
            A dialog does one job. It has a title, a way out, and only what the
            job needs.
          </p>
          <Button onClick={() => dialog.push('walk-deeper')}>Go deeper</Button>
        </>
      )
    case 'walk-deeper':
      return (
        <>
          <p className="text-body-sm text-fg-2">
            The next step changes the card’s height so the change is
            unmistakable. The close became a back arrow. Content slid in from
            the right.
          </p>
          <ul className="flex flex-col text-body-sm">
            <li className="border-t border-line py-3">
              Steps stack; back pops one.
            </li>
            <li className="border-t border-line py-3">
              The button stays put; only its label morphs.
            </li>
            <li className="border-t border-line py-3">
              Completion collapses the stack.
            </li>
          </ul>
          <Button onClick={() => dialog.finish('walk-done')}>Confirm</Button>
        </>
      )
    case 'walk-done':
      return (
        <div className="flex flex-col items-center gap-4 pt-1.5 text-center">
          <DoneMark />
          <span className="max-w-[28ch] text-body-sm text-fg-2">
            One small pop. Delight by selective emphasis, not a parade.
          </span>
          <Button block onClick={dialog.close}>
            Close
          </Button>
        </div>
      )
    case 'warn':
      return (
        <>
          <p className="text-body-sm text-fg-2">
            Two of these files are password protected. We can merge them, but
            the result will not be protected.
          </p>
          <Button onClick={dialog.close}>Continue anyway</Button>
          <Button variant="text" onClick={dialog.back}>
            Go back
          </Button>
        </>
      )
    case 'danger':
      return (
        <>
          <p className="text-body-sm text-fg-2">
            Pages 4 to 6 are removed from the copy you download. The original
            file is not changed.
          </p>
          <Button variant="danger" onClick={dialog.close}>
            Delete 3 pages
          </Button>
          <Button variant="text" onClick={dialog.back}>
            Keep them
          </Button>
        </>
      )
    case null:
      return null
  }
}
