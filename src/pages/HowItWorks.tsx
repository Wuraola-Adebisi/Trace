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
    body: 'Trace picks out people, topics, decisions, questions and dates. At this point they are separate pieces with no links.',
  },
  {
    n: '03',
    name: 'Connect',
    body: 'Related pieces are linked. Two sentences far apart in the text can end up attached to the same topic.',
  },
  {
    n: '04',
    name: 'Explore',
    body: 'Select a node to see the sentences behind it and what it connects to. Filter the map by kind.',
  },
]

export default function HowItWorks() {
  const [stage, setStage] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { result, input } = LAUNCH_EXAMPLE
  const caption = useMemo(() => {
    if (stage === 0) return `Source text, ${input.content.split(/\s+/).length} words. Nothing has been read yet.`
    if (stage === 1) return `${result.nodes.length} pieces found. 0 links.`
    if (stage === 2) return `${result.nodes.length} pieces, ${result.edges.length} links. Solid lines are the main structure, dashed lines are cross-links.`
    return 'Select anything on the map.'
  }, [stage, input.content, result])

  return (
    <PageShell
      wide
      title="How it works"
      intro="Trace reads text in four stages. Each one is shown below using the product launch meeting."
    >
      <div className="grid gap-2 md:grid-cols-4" role="tablist" aria-label="Pipeline stages">
        {STAGES.map((s, i) => (
          <button
            key={s.n}
            type="button"
            role="tab"
            aria-selected={i === stage}
            onClick={() => setStage(i)}
            className={`border-t-2 p-4 text-left transition-colors ${
              i === stage ? 'border-signal bg-panel' : 'border-line hover:border-ink'
            }`}
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
            <div className="flex h-10 items-center border-b border-line px-4 font-mono text-[11px] text-mute">
              {STAGES[stage].n} {STAGES[stage].name.toUpperCase()}: {caption}
            </div>
            {stage === 0 ? (
              <div className="mx-auto h-[560px] max-w-3xl">
                <SourcePanel title={result.title} content={input.content} />
              </div>
            ) : (
              <div className="mx-auto max-w-3xl overflow-auto">
                <TraceMap
                  key={stage}
                  result={result}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  showEdges={stage === 2}
                  animate
                />
              </div>
            )}
          </div>
        )}
      </div>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-mute">
        The hard part is the connect stage: deciding that separate sentences describe the same underlying topic. This demo
        uses prepared results for that. See <Link to="/about" className="text-signal underline underline-offset-4">About</Link>{' '}
        for what is real and what is not yet.
      </p>
    </PageShell>
  )
}
