import { useEffect, useMemo, useRef } from 'react'
import { splitBlocks } from '../engine/text'

interface Props {
  title: string
  content: string
  /** Zero-based sentence indexes to highlight. */
  highlight?: number[]
}

export default function SourcePanel({ title, content, highlight = [] }: Props) {
  const blocks = useMemo(() => splitBlocks(content), [content])
  const scroller = useRef<HTMLDivElement>(null)
  const refs = useRef<Map<number, HTMLSpanElement>>(new Map())
  const hits = useMemo(() => new Set(highlight), [highlight])
  const total = blocks.reduce((n, b) => n + b.length, 0)

  useEffect(() => {
    const first = highlight[0]
    const box = scroller.current
    const el = first === undefined ? undefined : refs.current.get(first)
    if (!box || !el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const top = el.offsetTop - box.offsetTop - box.clientHeight / 3
    box.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' })
  }, [highlight])

  let idx = -1
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-line px-4 font-mono text-[11px] text-mute">
        <span>SOURCE</span>
        <span>{total} sentences</span>
      </div>
      <div ref={scroller} className="relative min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <p className="mb-4 font-mono text-xs font-medium text-ink">{title}</p>
        {blocks.map((sentences, b) => (
          <p key={b} className="mb-3 text-[13px] leading-[1.75] text-ink/85">
            {sentences.map((s) => {
              idx += 1
              const i = idx
              const hit = hits.has(i)
              return (
                <span
                  key={i}
                  ref={(el) => {
                    if (el) refs.current.set(i, el)
                    else refs.current.delete(i)
                  }}
                  className={hit ? 'src-hit text-ink' : hits.size > 0 ? 'text-ink/50' : ''}
                >
                  {hit && <sup className="mr-1 font-mono text-[9px] font-medium text-signal">{i + 1}</sup>}
                  {s}{' '}
                </span>
              )
            })}
          </p>
        ))}
      </div>
    </div>
  )
}
