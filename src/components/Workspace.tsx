import { useMemo, useState } from 'react'
import { formatRanges, nodeSources } from '../engine/graph'
import { flattenSentences } from '../engine/text'
import type { Filter, TraceResult } from '../types'
import InsightPanel from './InsightPanel'
import SourcePanel from './SourcePanel'
import TraceMap from './TraceMap'

interface Props {
  result: TraceResult
  content: string
  animate?: boolean
}

const FILTERS: Filter[] = ['all', 'topic', 'person', 'decision', 'question']

export default function Workspace({ result, content, animate = false }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const sentences = useMemo(() => flattenSentences(content), [content])

  const selected = result.nodes.find((n) => n.id === selectedId) ?? null
  const highlight = useMemo(() => (selected ? nodeSources(sentences, selected) : []), [sentences, selected])

  const label = (f: Filter) => (f === 'all' ? 'All' : result.kindLabels[f])
  const count = (f: Filter) => (f === 'all' ? result.nodes.length : result.nodes.filter((n) => n.kind === f).length)

  const panel = 'flex min-h-0 flex-col border border-line bg-panel'

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[260px_minmax(0,1fr)_310px]">
      <section className={`${panel} order-3 h-[420px] md:order-2 xl:order-1 xl:h-[730px]`} aria-label="Source">
        <SourcePanel title={result.title} content={content} highlight={highlight} />
      </section>

      <section
        className={`${panel} order-1 md:col-span-2 xl:order-2 xl:col-span-1 xl:h-[730px]`}
        aria-label="Map"
      >
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2">
          <span className="font-mono text-[11px] text-mute">MAP</span>
          <div className="flex flex-wrap gap-1" role="group" aria-label="Filter map">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`px-2.5 py-1 font-mono text-[11px] uppercase transition-colors ${
                  filter === f ? 'bg-ink text-paper' : 'text-mute hover:bg-line/60 hover:text-ink'
                }`}
              >
                {label(f)} <span className="opacity-60">{count(f)}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto xl:overflow-hidden">
          <TraceMap
            result={result}
            selectedId={selectedId}
            onSelect={setSelectedId}
            filter={filter}
            animate={animate}
          />
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-1 border-t border-line px-4 py-2 font-mono text-[10px] text-mute">
          <span className="flex items-center gap-1.5"><i className="inline-block h-2.5 w-4 border border-ink bg-panel" />{result.kindLabels.topic}</span>
          <span className="flex items-center gap-1.5"><i className="inline-block h-2.5 w-4 bg-ink" />{result.kindLabels.person}</span>
          <span className="flex items-center gap-1.5"><i className="inline-block h-2.5 w-4 bg-signal" />{result.kindLabels.decision}</span>
          <span className="flex items-center gap-1.5"><i className="inline-block h-2.5 w-4 border border-dashed border-signal bg-panel" />{result.kindLabels.question}</span>
          {selected && highlight.length > 0 && (
            <span className="ml-auto text-signal">sentences {formatRanges(highlight)}</span>
          )}
        </div>
      </section>

      <section className={`${panel} order-2 h-[520px] md:order-3 xl:h-[730px]`} aria-label="Insight">
        <InsightPanel result={result} sentences={sentences} selectedId={selectedId} onSelect={setSelectedId} />
      </section>
    </div>
  )
}
