import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SourcePanel from '../components/SourcePanel'
import Workspace from '../components/Workspace'
import { EXAMPLES, LAUNCH_EXAMPLE } from '../data/traceExamples'
import { traceEngine } from '../engine/traceEngine'
import { wordCount } from '../engine/text'
import type { TraceInput, TraceResult } from '../types'

const PHASES = ['Extracting', 'Connecting', 'Mapping']
const PHASE_NOTES = [
  'Finding people, topics, decisions, questions and dates.',
  'Linking pieces that belong to the same topic.',
  'Placing everything on the map.',
]
const MIN_WORDS = 30

type Stage = 'input' | 'processing' | 'result'

export default function Trace() {
  const [params] = useSearchParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [stage, setStage] = useState<Stage>('input')
  const [phase, setPhase] = useState(0)
  const [result, setResult] = useState<TraceResult | null>(null)
  const [runId, setRunId] = useState(0)
  const [error, setError] = useState('')
  const started = useRef(false)

  const words = wordCount(content)

  function run(input: TraceInput) {
    if (wordCount(input.content) < MIN_WORDS) {
      setError(`Add at least ${MIN_WORDS} words so Trace has something to work with.`)
      return
    }
    setError('')
    setResult(traceEngine(input))
    setRunId((n) => n + 1)
    setPhase(0)
    setStage('processing')
  }

  function loadExample(id: string, andRun = false) {
    const ex = EXAMPLES.find((e) => e.id === id)
    if (!ex) return
    setTitle(ex.input.title)
    setContent(ex.input.content)
    setError('')
    if (andRun) run(ex.input)
  }

  useEffect(() => {
    const id = params.get('example')
    if (!id || started.current) return
    started.current = true
    loadExample(id, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (stage !== 'processing') return
    const durations = [700, 700, 600]
    let i = 0
    let t = 0
    const tick = () => {
      if (i >= durations.length) {
        setStage('result')
        return
      }
      setPhase(i)
      t = window.setTimeout(() => {
        i += 1
        tick()
      }, durations[i])
    }
    tick()
    return () => window.clearTimeout(t)
  }, [stage, runId])

  /* ----------------------------- input ----------------------------- */
  if (stage === 'input') {
    return (
      <div className="mx-auto max-w-[1480px] px-4 pb-4 pt-10 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">New trace</h1>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <label htmlFor="trace-title" className="font-mono text-[11px] text-mute">
              TITLE
            </label>
            <input
              id="trace-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled trace"
              className="mb-4 mt-1 w-full border border-line bg-panel px-4 py-2.5 text-sm outline-none focus:border-signal"
            />
            <label htmlFor="trace-text" className="font-mono text-[11px] text-mute">
              SOURCE TEXT
            </label>
            <textarea
              id="trace-text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste notes, a transcript, research, or anything you want to make sense of."
              className="mt-1 h-[420px] w-full resize-y border border-line bg-panel p-4 text-[13px] leading-[1.75] outline-none focus:border-signal"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className={`font-mono text-[11px] ${error ? 'text-signal' : 'text-mute'}`} role={error ? 'alert' : undefined}>
                {error || `${words} words`}
              </p>
              <button
                type="button"
                onClick={() => run({ title, content })}
                className="bg-signal px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink"
              >
                Trace this
              </button>
            </div>
          </div>

          <aside className="h-fit border border-line bg-panel p-5">
            <h2 className="text-lg font-semibold">Start from an example</h2>
            <p className="mt-1 text-sm text-mute">Loads the text so you can read it or edit it before tracing.</p>
            <div className="mt-4 divide-y divide-line border-y border-line">
              {EXAMPLES.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => loadExample(e.id)}
                  className="block w-full py-3 text-left hover:text-signal"
                >
                  <span className="block text-sm font-medium">{e.name}</span>
                  <span className="block text-xs text-mute">{e.blurb}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => loadExample(LAUNCH_EXAMPLE.id, true)}
              className="mt-5 w-full border border-ink px-4 py-3 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
            >
              Run the product meeting now
            </button>
            <p className="mt-4 text-xs leading-relaxed text-mute">
              Text you paste is read in your browser by a local engine. Nothing is uploaded.
            </p>
          </aside>
        </div>
      </div>
    )
  }

  /* --------------------------- processing --------------------------- */
  if (stage === 'processing') {
    return (
      <div className="mx-auto max-w-[1480px] px-4 pb-4 pt-10 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{PHASES[phase]}</h1>
        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_360px]">
          <div className="h-[520px] border border-line bg-panel">
            <SourcePanel title={result?.title ?? title} content={content} />
          </div>
          <div className="border border-line bg-panel p-5">
            <div className="relative h-0.5 overflow-hidden bg-line">
              <div className="trace-scan absolute inset-y-0 left-0 w-1/4 bg-signal" />
            </div>
            <ol className="mt-6 space-y-5">
              {PHASES.map((p, i) => (
                <li key={p} className={i <= phase ? 'text-ink' : 'text-mute/60'}>
                  <div className="flex items-center gap-3">
                    <span className={`inline-block h-2.5 w-2.5 ${i < phase ? 'bg-ink' : i === phase ? 'bg-signal' : 'border border-line'}`} />
                    <span className="font-mono text-xs">{p.toUpperCase()}</span>
                  </div>
                  <p className="ml-[22px] mt-1 text-sm">{PHASE_NOTES[i]}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }

  /* ----------------------------- result ----------------------------- */
  return (
    <div className="mx-auto max-w-[1480px] px-4 pb-4 pt-8 sm:px-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{result?.title}</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setStage('input')}
            className="border border-line px-4 py-2 text-sm transition-colors hover:border-ink"
          >
            Edit text
          </button>
          <button
            type="button"
            onClick={() => {
              setTitle('')
              setContent('')
              setResult(null)
              setStage('input')
            }}
            className="bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-signal"
          >
            New trace
          </button>
        </div>
      </div>
      {result && <Workspace key={runId} result={result} content={content} animate />}
    </div>
  )
}
