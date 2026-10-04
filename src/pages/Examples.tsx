import { useState } from 'react'
import { Link } from 'react-router-dom'
import Workspace from '../components/Workspace'
import { EXAMPLES } from '../data/traceExamples'
import PageShell from './PageShell'

export default function Examples() {
  const [id, setId] = useState(EXAMPLES[0].id)
  const ex = EXAMPLES.find((e) => e.id === id) ?? EXAMPLES[0]

  return (
    <PageShell
      wide
      title="Examples"
      intro="Pick a piece of source text. The map, the highlighted sentences and the analysis all change with it."
    >
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="tablist" aria-label="Example datasets">
        {EXAMPLES.map((e) => (
          <button
            key={e.id}
            type="button"
            role="tab"
            aria-selected={e.id === id}
            onClick={() => setId(e.id)}
            className={`flex flex-col items-start border-t-2 p-4 text-left transition-colors sm:p-5 ${
              e.id === id ? 'border-signal bg-panel' : 'border-line hover:border-ink'
            }`}
          >
            <span className="block font-semibold">{e.name}</span>
            <span className="mt-1 block text-sm text-mute">{e.blurb}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <Workspace key={ex.id} result={ex.result} content={ex.input.content} animate />
      </div>

      <p className="mt-6 text-sm text-mute">
        These examples use curated source material so you can see the full Trace workflow without preparing your own document first.{' '}
        <Link to="/trace" className="text-signal underline underline-offset-4">
          Start with your own text
        </Link>{' '}
        to analyse something new, or{' '}
        <Link to={`/trace?example=${ex.id}`} className="text-signal underline underline-offset-4">
          open this example in Trace
        </Link>
        .
      </p>
    </PageShell>
  )
}
