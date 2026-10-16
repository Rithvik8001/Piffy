import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

export const EASE = 'cubic-bezier(.32,.72,0,1)'
export const DURATION = {
  quick: 160,
  base: 320,
  slow: 480,
  entrance: 900,
} as const

const MORPH_SETTLE_MS = 420
const FLIP_MS = 380

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export type MorphParts = {
  prefix: string
  outgoing: string
  incoming: string
  suffix: string
}

export function diffLabels(from: string, to: string): MorphParts {
  let start = 0
  while (
    start < from.length &&
    start < to.length &&
    from[start] === to[start]
  ) {
    start++
  }
  let end = 0
  while (
    end < from.length - start &&
    end < to.length - start &&
    from[from.length - 1 - end] === to[to.length - 1 - end]
  ) {
    end++
  }
  return {
    prefix: to.slice(0, start),
    outgoing: from.slice(start, from.length - end),
    incoming: to.slice(start, to.length - end),
    suffix: to.slice(to.length - end),
  }
}

export function useMorph(label: string) {
  const [current, setCurrent] = useState(label)
  const [previous, setPrevious] = useState<string | null>(null)
  const [generation, setGeneration] = useState(0)

  if (label !== current) {
    setPrevious(current)
    setCurrent(label)
    setGeneration((g) => g + 1)
  }

  useEffect(() => {
    if (previous === null) return
    const timer = setTimeout(() => setPrevious(null), MORPH_SETTLE_MS)
    return () => clearTimeout(timer)
  }, [previous, generation])

  return {
    label: current,
    generation,
    parts: previous === null ? null : diffLabels(previous, current),
  }
}

export function useFlip(
  container: RefObject<HTMLElement | null>,
  signal: unknown,
) {
  const rects = useRef(new Map<string, DOMRect>())

  useLayoutEffect(() => {
    const root = container.current
    if (!root) return
    const next = new Map<string, DOMRect>()
    const reduce = prefersReducedMotion()
    root.querySelectorAll<HTMLElement>('[data-flip]').forEach((el) => {
      const key = el.dataset.flip
      if (!key) return
      const rect = el.getBoundingClientRect()
      next.set(key, rect)
      const before = rects.current.get(key)
      if (!before || reduce) return
      const dx = before.left - rect.left
      const dy = before.top - rect.top
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        el.animate(
          [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }],
          { duration: FLIP_MS, easing: EASE },
        )
      }
    })
    rects.current = next
  }, [container, signal])
}

export function useDelayedFlag(delayMs: number) {
  const [on, setOn] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  return {
    on,
    show: () => {
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setOn(true), delayMs)
    },
    hide: () => {
      clearTimeout(timer.current)
      setOn(false)
    },
  }
}
