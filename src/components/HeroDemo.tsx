import { useMemo, useState } from 'react'
import { LAUNCH_EXAMPLE } from '../data/traceExamples'
import { flattenSentences } from '../engine/text'
import InsightPanel from './InsightPanel'
import TraceMap from './TraceMap'

function FlowArrow() {
  return (
    <div className="flex flex-col items-center gap-2 py-2 lg:flex-row lg:px-3 lg:py-0" aria-hidden="true">
      <svg className="lg:hidden" width="12" height="44" viewBox="0 0 12 44">
        <line x1="6" y1="0" x2="6" y2="36" className="trace-flow stroke-signal" strokeWidth="1.5" />
        <path d="M1 34 L6 42 L11 34" fill="none" className="stroke-signal" strokeWidth="1.5" />
      </svg>
      <span className="bg-signal px-2.5 py-1 font-mono text-[11px] font-medium text-white">TRACE</span>
      <svg className="hidden lg:block" width="56" height="12" viewBox="0 0 56 12">
        <line x1="0" y1="6" x2="48" y2="6" className="trace-flow stroke-signal" strokeWidth="1.5" />
        <path d="M46 1 L54 6 L46 11" fill="none" className="stroke-signal" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

export default function HeroDemo() {
  const { result, input } = LAUNCH_EXAMPLE
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const sentences = useMemo(() => flattenSentences(input.content), [input.content])
  const excerpt = sentences.slice(2, 5)

  const of = (kind: 'topic' | 'person' | 'decision' | 'question', n: number) =>
    result.nodes.filter((x) => x.kind === kind).slice(0, n)

  const columns = [
    { title: 'Topics', items: of('topic', 3) },
    { title: 'People', items: of('person', 3) },
    { title: 'Decisions', items: of('decision', 2) },
    { title: 'Open questions', items: of('question', 2) },
  ]

  return (
    <div>
      <div className="flex flex-col items-stretch lg:flex-row lg:items-center">
        <div className="border border-line bg-panel p-5 lg:w-[38%]">
          <p className="font-mono text-[11px] text-mute">RAW INPUT</p>
          <p className="mt-3 text-[13px] leading-[1.75] text-ink/85">{excerpt.join(' ')}</p>
          <p className="mt-3 font-mono text-[11px] text-mute">+ {sentences.length - 5} more sentences</p>
        </div>
        <div className="self-center">
          <FlowArrow />
        </div>
        <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-4 border border-line bg-panel p-5">
          {columns.map((c) => (
            <div key={c.title}>
              <p className="font-mono text-[11px] text-mute">{c.title.toUpperCase()}</p>
              <ul className="mt-2 space-y-1 text-sm">
                {c.items.map((n) => (
                  <li key={n.id}>{n.label}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-h-0 overflow-auto border border-line bg-panel">
          <div className="flex h-10 items-center justify-between border-b border-line px-4 font-mono text-[11px] text-mute">
            <span>MAP</span>
            <span>Select a node</span>
          </div>
          <TraceMap result={result} selectedId={selectedId} onSelect={setSelectedId} animate />
        </div>
        <div className="h-[520px] border border-line bg-panel xl:h-auto">
          <InsightPanel result={result} sentences={sentences} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
      </div>
    </div>
  )
}
