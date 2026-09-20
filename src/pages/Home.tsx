import { Link } from 'react-router-dom'
import HeroDemo from '../components/HeroDemo'

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
      <section className="mx-auto max-w-[1480px] px-4 pb-10 pt-14 sm:px-6 sm:pt-20">
        <p className="inline-flex items-center gap-2 font-mono text-[11px] text-mute">
          <span className="inline-block h-2 w-2 bg-signal" />
          AI INFORMATION MAPPING
        </p>
        <h1 className="mt-5 max-w-5xl text-[clamp(3.25rem,9.5vw,8rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
          Make sense of the mess.
        </h1>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-lg leading-relaxed text-ink/80">
            Trace turns messy notes, conversations, research, and documents into a structured map of the ideas, people,
            decisions, and questions inside them.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/examples" className="bg-signal px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink">
              Try an example
            </Link>
            <Link
              to="/how-it-works"
              className="border border-ink px-6 py-3 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] px-4 sm:px-6" aria-label="Product demo">
        <HeroDemo />
      </section>

      <section className="mx-auto mt-24 max-w-[1480px] px-4 sm:px-6">
        <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          The structure was always in the text. Trace pulls it out.
        </h2>
        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PARTS.map((p) => (
            <div key={p.title} className="bg-paper p-6">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{p.body}</p>
              <p className="mt-6 border-t border-line pt-3 font-mono text-xs text-ink">{p.sample}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[1480px] px-4 sm:px-6">
        <div className="flex flex-col gap-6 border border-ink bg-ink p-8 text-paper sm:p-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            Paste something messy and see what is in it.
          </p>
          <Link
            to="/trace"
            className="self-start bg-signal px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-paper hover:text-ink md:self-auto"
          >
            Try Trace
          </Link>
        </div>
      </section>
    </div>
  )
}
