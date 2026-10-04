import { Link } from 'react-router-dom'
import HeroDemo from '../components/HeroDemo'
import { LAUNCH_EXAMPLE } from '../data/traceExamples'

const PARTS = [
  {
    title: 'Topics',
    body: 'The ideas that keep coming back, ranked by how much of the text they take up.',
    sample: 'Payment infrastructure',
  },
  {
    title: 'People',
    body: 'Who is mentioned and what they are attached to.',
    sample: 'James owns the university pilot',
  },
  {
    title: 'Decisions',
    body: 'What was agreed, with the sentence that shows it.',
    sample: 'Refunds tested before paying customers',
  },
  {
    title: 'Open questions',
    body: 'What is still unresolved, and by when.',
    sample: 'Is September still realistic?',
  },
]

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-[1400px] px-5 pb-12 pt-14 sm:px-8 lg:px-12 sm:pb-16 sm:pt-20">
        <p className="inline-flex items-center gap-2 font-mono text-xs tracking-wide text-mute">
          <span className="inline-block h-2 w-2 bg-signal" />
          INFORMATION MAPPING
        </p>
        <h1 className="mt-5 max-w-5xl text-balance text-[clamp(3rem,8.5vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          Make sense of the mess.
        </h1>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-lg leading-relaxed text-ink/80">
            Trace turns messy notes, conversations, research, and documents into a structured map of the ideas, people,
            decisions, and questions inside them.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to={`/trace?example=${LAUNCH_EXAMPLE.id}`} className="btn btn-signal">
              Explore Trace
            </Link>
            <Link
              to="/trace"
              className="btn btn-outline"
            >
              Start a trace
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12" aria-label="Product demo">
        <HeroDemo />
      </section>

      <section className="mx-auto mt-16 max-w-[1400px] px-5 sm:mt-24 sm:px-8 lg:px-12">
        <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          The structure is already there. Trace makes it visible.
        </h2>
        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PARTS.map((p) => (
            <div key={p.title} className="bg-paper p-6 sm:p-8">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{p.body}</p>
              <p className="mt-6 border-t border-line pt-3 font-mono text-xs text-ink">{p.sample}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[1400px] px-5 sm:mt-24 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 border border-ink bg-ink p-8 text-paper sm:p-12 lg:p-16 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-balance text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            Bring your notes, research, or conversations. See what is inside them.
          </p>
          <Link
            to="/trace"
            className="btn self-start bg-signal text-white hover:bg-paper hover:text-ink md:self-auto"
          >
            Try Trace
          </Link>
        </div>
      </section>
    </div>
  )
}
