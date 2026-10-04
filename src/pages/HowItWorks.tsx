import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SourcePanel from '../components/SourcePanel'
import TraceMap from '../components/TraceMap'
import Workspace from '../components/Workspace'
import { LAUNCH_EXAMPLE } from '../data/traceExamples'
import PageShell from './PageShell'

const STAGES = [
  {
    n: '01',
    name: 'Ingest',
    body: 'Give Trace your information. The text is kept exactly as written, so every result can be checked against a sentence.',
  },
  {
    n: '02',
    name: 'Extract',
    body: 'Trace identifies people, topics, decisions, questions and dates. At this stage they are separate pieces of information.',
  },
  {
    n: '03',
    name: 'Connect',
    body: 'Related pieces are linked. Sentences that refer to the same underlying topic can become part of the same structure.',
  },
  {
    n: '04',
    name: 'Explore',
    body: 'Select a node to see the source sentences behind it and what it connects to. Filter the map by type.',
  },
]

export default function HowItWorks() {
  const [stage, setStage] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { result, input } = LAUNCH_EXAMPLE
  const caption = useMemo(() => {
    if (stage === 0) return `Source text, ${input.content.split(/\s+/).length} words. Nothing has been analysed yet.`
    if (stage === 1) return `${result.nodes.length} pieces found. 0 links.`
    if (stage === 2) return `${result.nodes.length} pieces, ${result.edges.length} links. Solid lines are the main structure, dashed lines are cross-links.`
    return 'Select anything on the map.'
  }, [stage, input.content, result])

  return (
    <PageShell wide title="How it works" intro="Trace turns source text into a connected, inspectable view of the information inside it.">
      <div className="grid gap-2 md:grid-cols-4" role="tablist" aria-label="Pipeline stages">
        {STAGES.map((s, i) => (
          <button
            key={s.n}
            type="button"
            role="tab"
            aria-selected={i === stage}
            onClick={() => setStage(i)}
            className={`flex flex-col items-start border-t-2 p-4 text-left transition-colors sm:p-5 ${i === stage ? 'border-signal bg-panel' : 'border-line hover:border-ink'}`}
          >
            <span className="font-mono text-xs text-mute">{s.n}</span>
            <span className="mt-1 block text-xl font-semibold">{s.name}</span>
            <span className="mt-2 block text-sm leading-relaxed text-mute">{s.body}</span>
          </button>
        ))}
      </div>
      <div className="mt-4">
        {stage === 3 ? (
          <Workspace result={result} content={input.content} />
        ) : (
          <div className="border border-line bg-panel">
            <div className="panel-head">
              {STAGES[stage].n} {STAGES[stage].name.toUpperCase()}: {caption}
            </div>
            {stage === 0 ? (
              <div className="mx-auto h-[560px] max-w-3xl border-x border-line">
                <SourcePanel title={result.title} content={input.content} />
              </div>
            ) : (
              <div className="map-dots overflow-auto">
                <div className="mx-auto max-w-3xl">
                  <TraceMap key={stage} result={result} selectedId={selectedId} onSelect={setSelectedId} showEdges={stage === 2} animate />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-mute">
        The connect stage is where structure becomes useful: separate sentences can be linked to the same underlying topic.
        <Link to="/about" className="ml-1 text-signal underline underline-offset-4">Learn more about Trace</Link>.
      </p>
    </PageShell>
  )
}
