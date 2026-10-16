import { useMorph } from '#/lib/motion'

export function MorphLabel({ text }: { text: string }) {
  const { label, parts, generation } = useMorph(text)

  if (!parts) return <span>{label}</span>

  return (
    <span className="inline-flex whitespace-pre" aria-label={label}>
      <span aria-hidden>{parts.prefix}</span>
      <span key={generation} className="inline-grid" aria-hidden>
        <span className="animate-morph-out [grid-area:1/1]">
          {parts.outgoing}
        </span>
        <span className="animate-morph-in [grid-area:1/1]">
          {parts.incoming}
        </span>
      </span>
      <span aria-hidden>{parts.suffix}</span>
    </span>
  )
}
