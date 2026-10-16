import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { cn } from '#/lib/cn'
import { Icon } from './icon'
import type { ReactNode } from 'react'

type StackState<TView extends string> = {
  stack: ReadonlyArray<TView>
  direction: 1 | -1
}

export type DialogController<TView extends string> = {
  view: TView | null
  depth: number
  direction: 1 | -1
  open: (view: TView) => void
  push: (view: TView) => void
  replace: (view: TView) => void
  finish: (view: TView) => void
  back: () => void
  close: () => void
}

export function useDialogStack<
  TView extends string,
>(): DialogController<TView> {
  const [state, setState] = useState<StackState<TView>>({
    stack: [],
    direction: 1,
  })

  const open = useCallback(
    (view: TView) => setState({ stack: [view], direction: 1 }),
    [],
  )
  const push = useCallback(
    (view: TView) =>
      setState((s) => ({ stack: [...s.stack, view], direction: 1 })),
    [],
  )
  const replace = useCallback(
    (view: TView) =>
      setState((s) => ({
        stack: [...s.stack.slice(0, -1), view],
        direction: 1,
      })),
    [],
  )
  const finish = useCallback(
    (view: TView) => setState({ stack: [view], direction: 1 }),
    [],
  )
  const back = useCallback(
    () =>
      setState((s) =>
        s.stack.length > 1
          ? { stack: s.stack.slice(0, -1), direction: -1 }
          : { stack: [], direction: 1 },
      ),
    [],
  )
  const close = useCallback(() => setState({ stack: [], direction: 1 }), [])

  return {
    view: state.stack.at(-1) ?? null,
    depth: state.stack.length,
    direction: state.direction,
    open,
    push,
    replace,
    finish,
    back,
    close,
  }
}

const FOCUSABLE =
  'button:not([disabled]),[href],input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

type DialogProps<TView extends string> = {
  controller: DialogController<TView>
  title: string
  children: ReactNode
}

export function Dialog<TView extends string>({
  controller,
  title,
  children,
}: DialogProps<TView>) {
  const { view, depth, direction, back, close } = controller
  if (!view) return null
  return (
    <DialogSurface
      title={title}
      viewKey={`${depth}:${view}`}
      nested={depth > 1}
      direction={direction}
      onBack={back}
      onClose={close}
    >
      {children}
    </DialogSurface>
  )
}

type DialogSurfaceProps = {
  title: string
  viewKey: string
  nested: boolean
  direction: 1 | -1
  onBack: () => void
  onClose: () => void
  children: ReactNode
}

function DialogSurface({
  title,
  viewKey,
  nested,
  direction,
  onBack,
  onClose,
  children,
}: DialogSurfaceProps) {
  const card = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | null>(null)

  useLayoutEffect(() => {
    const el = inner.current
    if (!el) return
    const measure = () => setHeight(el.offsetHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    card.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [])

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      onBack()
      return
    }
    if (event.key !== 'Tab' || !card.current) return
    const focusable = Array.from(
      card.current.querySelectorAll<HTMLElement>(FOCUSABLE),
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-40 animate-fade bg-scrim"
      />
      <div className="fixed top-1/2 left-1/2 z-41 w-[min(calc(100%-24px),400px)] -translate-x-1/2 -translate-y-1/2">
        <div
          ref={card}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          tabIndex={-1}
          onKeyDown={onKeyDown}
          className="animate-dialog-in overflow-hidden rounded-dialog bg-tray text-ink shadow-tray outline-none"
        >
          <div
            className="overflow-hidden transition-[height] duration-(--d3)"
            style={{ height: height ?? 'auto' }}
          >
            <div
              ref={inner}
              className="flex max-h-[calc(100vh-48px)] flex-col gap-4.5 overflow-auto px-6 pt-5.5 pb-6"
            >
              <div className="flex items-center justify-between gap-3">
                <h2
                  key={title}
                  className="animate-fade text-dialog font-semibold"
                >
                  {title}
                </h2>
                <BackOrClose nested={nested} onClick={onBack} />
              </div>
              <div
                key={viewKey}
                className={cn(
                  'flex flex-col gap-4',
                  direction > 0 ? 'animate-step-fwd' : 'animate-step-back',
                )}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function BackOrClose({
  nested,
  onClick,
}: {
  nested: boolean
  onClick: () => void
}) {
  const glyph = 'transition-[opacity,transform] [grid-area:1/1]'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={nested ? 'Back' : 'Close'}
      className="grid size-9 flex-none place-items-center rounded-full bg-fill text-fg-2 transition-[transform,background-color] hover:bg-fill-2 active:scale-90"
    >
      <Icon
        name="close"
        size={16}
        className={cn(
          glyph,
          nested ? '-rotate-90 scale-50 opacity-0' : 'opacity-100',
        )}
      />
      <Icon
        name="back"
        size={16}
        className={cn(
          glyph,
          nested ? 'opacity-100' : 'rotate-90 scale-50 opacity-0',
        )}
      />
    </button>
  )
}
