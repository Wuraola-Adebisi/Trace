import { useMemo } from 'react'
import { formatRanges, neighbors, nodeSources } from '../engine/graph'
import type { TraceNode, TraceResult } from '../types'

interface Props {
  result: TraceResult
  sentences: string[]
  selectedId: string | null
  onSelect: (id: string | null) => void
}

const IMPORTANCE: Record<string, string> = { high: 'High', medium: 'Medium', low: 'Low' }

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 first:mt-0">
      <h3 className="border-b border-line pb-2 font-mono text-[11px] text-mute">{title}</h3>
      <div className="mt-2">{children}</div>
    </section>
  )
}

function Row({ node, sub, onSelect }: { node: TraceNode; sub?: string; onSelect: (id: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(node.id)}
      className="flex w-full items-baseline justify-between gap-3 py-1.5 text-left text-sm hover:text-signal"
    >
      <span>{node.label.endsWith('\u2026') ? node.why : node.label}</span>
      {sub && <span className="shrink-0 font-mono text-[10px] text-mute">{sub}</span>}
    </button>
  )
}

export default function InsightPanel({ result, sentences, selectedId, onSelect }: Props) {
  const node = result.nodes.find((n) => n.id === selectedId) ?? null
  const rel = useMemo(() => (node ? neighbors(result, node.id) : []), [result, node])
  const sources = useMemo(() => (node ? nodeSources(sentences, node) : []), [sentences, node])
  const L = result.kindLabels

  const byKind = (k: TraceNode['kind']) => result.nodes.filter((n) => n.kind === k)
  const order = { high: 0, medium: 1, low: 2 }
  const topics = [...byKind('topic')].sort((a, b) => order[a.importance] - order[b.importance])

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-line px-4 font-mono text-[11px] text-mute">
        <span>INSIGHT</span>
        {node && (
          <button type="button" onClick={() => onSelect(null)} className="text-signal hover:underline">
            Back to overview
          </button>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4" aria-live="polite">
        {node ? (
          <div>
            <p className="font-mono text-[11px] text-signal">
              {L[node.kind]}
              {node.tag ? ` / ${node.tag}` : ''}
            </p>
            <h2 className="mt-1 text-2xl font-semibold leading-tight tracking-tight">{node.label}</h2>
            {node.role && <p className="mt-1 text-sm text-mute">{node.role}</p>}
            <p className="mt-3 font-mono text-[11px] text-mute">
              Found in {sources.length} {sources.length === 1 ? 'sentence' : 'sentences'}
              {node.when ? ` / ${node.when}` : ''}
              {' / '}
              {IMPORTANCE[node.importance]} importance
            </p>

            <Section title="Why it matters">
              <p className="text-sm leading-relaxed text-ink/85">{node.why}</p>
            </Section>

            <Section title="Connected to">
              {rel.length === 0 ? (
                <p className="text-sm text-mute">No connections found.</p>
              ) : (
                rel.map(({ node: other, relation }) => (
                  <Row key={other.id} node={other} sub={relation} onSelect={onSelect} />
                ))
              )}
            </Section>

            <Section title="Source">
              <p className="font-mono text-[11px] leading-relaxed text-mute">
                {result.title}
                {sources.length > 0 ? ` / sentences ${formatRanges(sources)}` : ''}
              </p>
              {sources.length > 0 && <p className="mt-1 text-xs text-mute">Highlighted in the source panel.</p>}
            </Section>
          </div>
        ) : (
          <div>
            <Section title="Summary">
              <p className="text-sm leading-relaxed text-ink/85">{result.summary}</p>
            </Section>
            <Section title={`Key ${L.topic.toLowerCase()}`}>
              {topics.slice(0, 6).map((n) => (
                <Row key={n.id} node={n} sub={IMPORTANCE[n.importance]} onSelect={onSelect} />
              ))}
            </Section>
            {byKind('person').length > 0 && (
              <Section title={L.person}>
                {byKind('person').map((n) => (
                  <Row key={n.id} node={n} sub={n.role} onSelect={onSelect} />
                ))}
              </Section>
            )}
            {byKind('decision').length > 0 && (
              <Section title={L.decision}>
                {byKind('decision').map((n) => (
                  <Row key={n.id} node={n} onSelect={onSelect} />
                ))}
              </Section>
            )}
            {byKind('question').length > 0 && (
              <Section title={L.question}>
                {byKind('question').map((n) => (
                  <Row key={n.id} node={n} sub={n.when} onSelect={onSelect} />
                ))}
              </Section>
            )}
            <p className="mt-6 text-xs text-mute">Select a node on the map or an item above to see why it was created.</p>
          </div>
        )}
      </div>
    </div>
  )
}
