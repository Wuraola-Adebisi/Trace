import { useMemo, useRef, useState } from 'react'
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
  const mapRef = useRef<HTMLElement>(null)
  const insightRef = useRef<HTMLElement>(null)

  // Below xl the panels stack, so a tap on the map would change content that is off screen.
  function handleSelect(id: string | null) {
    setSelectedId(id)
    if (!window.matchMedia('(max-width: 1279px)').matches) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const target = id ? insightRef.current : mapRef.current
    target?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: id ? 'start' : 'nearest' })
  }

  const [filter, setFilter] = useState<Filter>('all')
  const sentences = useMemo(() => flattenSentences(content), [content])

  const selected = result.nodes.find((n) => n.id === selectedId) ?? null
  const highlight = useMemo(() => (selected ? nodeSources(sentences, selected) : []), [sentences, selected])

  const label = (f: Filter) => (f === 'all' ? 'All' : result.kindLabels[f])
  const count = (f: Filter) => (f === 'all' ? result.nodes.length : result.nodes.filter((n) => n.kind === f).length)

  const panel = 'flex min-h-0 flex-col border border-line bg-panel'

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[300px_minmax(0,1fr)_310px]">
      <section className={`${panel} order-3 h-[420px] md:order-2 md:h-[520px] xl:order-1 xl:h-[clamp(560px,calc(100dvh-11rem),800px)]`} aria-label="Source">
        <SourcePanel title={result.title} content={content} highlight={highlight} />
      </section>

      <section
        ref={mapRef}
        className={`${panel} scroll-mt-16 order-1 md:col-span-2 xl:order-2 xl:col-span-1 xl:h-[clamp(560px,calc(100dvh-11rem),800px)]`}
        aria-label="Map"
      >
        <div className="panel-head flex-wrap py-2">
          <span>MAP</span>
          <div className="flex flex-wrap gap-1" role="group" aria-label="Filter map">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`min-h-10 px-3 font-mono text-xs uppercase tracking-wide transition-colors sm:min-h-7 sm:px-2.5 ${
                  filter === f ? 'bg-ink text-paper' : 'text-mute hover:bg-line/60 hover:text-ink'
                }`}
              >
                {label(f)} <span className="opacity-60">{count(f)}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="border-b border-line px-4 py-2 text-xs text-mute sm:hidden">Drag sideways to see the whole map.</p>
        <div className="min-h-0 flex-1 overflow-auto xl:overflow-hidden">
          <TraceMap
            result={result}
            selectedId={selectedId}
            onSelect={handleSelect}
            filter={filter}
            animate={animate}
          />
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-1 border-t border-line px-4 py-2 font-mono text-xs text-mute">
          <span className="flex items-center gap-1.5"><i className="inline-block h-2.5 w-4 border border-ink bg-panel" />{result.kindLabels.topic}</span>
          <span className="flex items-center gap-1.5"><i className="inline-block h-2.5 w-4 bg-ink" />{result.kindLabels.person}</span>
          <span className="flex items-center gap-1.5"><i className="inline-block h-2.5 w-4 bg-signal" />{result.kindLabels.decision}</span>
          <span className="flex items-center gap-1.5"><i className="inline-block h-2.5 w-4 border border-dashed border-signal bg-panel" />{result.kindLabels.question}</span>
          {selected && highlight.length > 0 && (
            <span className="ml-auto text-signal">sentences {formatRanges(highlight)}</span>
          )}
        </div>
      </section>

      <section ref={insightRef} className={`${panel} scroll-mt-16 order-2 h-[520px] md:order-3 xl:h-[clamp(560px,calc(100dvh-11rem),800px)]`} aria-label="Insight">
        <InsightPanel result={result} sentences={sentences} selectedId={selectedId} onSelect={handleSelect} />
      </section>
    </div>
  )
}
