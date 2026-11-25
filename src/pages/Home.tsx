import { Link } from 'react-router-dom'
import HeroDemo from '../components/HeroDemo'
import { LAUNCH_EXAMPLE } from '../data/traceExamples'

const USE_CASES = [
  {
    number: '01',
    title: 'Get back to the point',
    question: 'What did we actually agree on?',
    body: 'Find the decisions buried in long meeting notes and see the context around them.',
  },
  {
    number: '02',
    title: 'See who is involved',
    question: 'Who is responsible for what?',
    body: 'Bring the people, roles and responsibilities mentioned across a conversation into view.',
  },
  {
    number: '03',
    title: 'Spot what is still open',
    question: 'What have we not figured out yet?',
    body: 'Surface unanswered questions and unresolved points before they get lost in the next update.',
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Add your text',
    body: 'Paste meeting notes, research, a project brief or a conversation.',
  },
  {
    number: '02',
    title: 'Run a trace',
    body: 'Trace organises the information into topics, people, decisions and questions.',
  },
  {
    number: '03',
    title: 'Explore the details',
    body: 'Follow the connections, inspect the source sentences and export your findings.',
  },
]

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-[1400px] px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20 lg:px-12">
        <p className="inline-flex items-center gap-2 font-mono text-xs tracking-wide text-mute">
          <span className="inline-block h-2 w-2 bg-signal" />
          A CLEARER WAY TO WORK WITH INFORMATION
        </p>
        <h1 className="mt-5 max-w-5xl text-balance text-[clamp(3rem,8.5vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          Make sense of the mess.
        </h1>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-2xl text-lg leading-relaxed text-ink/80">
            Trace helps you make sense of meeting notes, project documents, research and conversations. Find the
            important ideas, people, decisions and unanswered questions without having to piece everything together
            yourself.
          </p>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link to="/trace" className="btn btn-signal">
              Start with your text
            </Link>
            <Link to={`/trace?example=${LAUNCH_EXAMPLE.id}`} className="btn btn-outline">
              Explore an example
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12" aria-labelledby="product-preview">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs tracking-wide text-mute">A LOOK INSIDE TRACE</p>
            <h2 id="product-preview" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              From a wall of text to a clearer picture.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-mute">
            Explore an example from a product meeting. Select a point on the map to see the details behind it.
          </p>
        </div>
        <HeroDemo />
      </section>

      <section className="mx-auto mt-20 max-w-[1400px] px-5 sm:mt-28 sm:px-8 lg:px-12" aria-labelledby="use-cases">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-wide text-mute">LESS DIGGING. MORE CLARITY.</p>
          <h2 id="use-cases" className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Find the things you would otherwise have to hunt for.
          </h2>
        </div>
        <div className="mt-9 grid gap-px border border-line bg-line md:grid-cols-3">
          {USE_CASES.map((item) => (
            <article key={item.number} className="bg-paper p-6 sm:p-8">
              <p className="font-mono text-xs tracking-wide text-mute">{item.number}</p>
              <h3 className="mt-7 text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-base font-medium text-signal">{item.question}</p>
              <p className="mt-3 text-sm leading-relaxed text-mute">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[1400px] px-5 sm:mt-28 sm:px-8 lg:px-12" aria-labelledby="how-it-works">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-wide text-mute">THREE STEPS</p>
            <h2 id="how-it-works" className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Bring the information. Find the thread.
            </h2>
          </div>
          <Link to="/how-it-works" className="text-sm font-medium text-signal underline underline-offset-4">
            See how Trace works
          </Link>
        </div>
        <ol className="mt-9 grid gap-8 border-t border-line pt-6 sm:grid-cols-3 sm:gap-6">
          {STEPS.map((step) => (
            <li key={step.number}>
              <p className="font-mono text-xs tracking-wide text-mute">{step.number}</p>
              <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-mute">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-20 max-w-[1400px] px-5 sm:mt-28 sm:px-8 lg:px-12" aria-labelledby="source-context">
        <div className="grid gap-8 border border-line bg-panel p-7 sm:p-10 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.8fr)] md:items-center lg:p-12">
          <div>
            <p className="font-mono text-xs tracking-wide text-mute">KEEP THE CONTEXT</p>
            <h2 id="source-context" className="mt-3 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              See the finding. Check where it came from.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-ink/80">
            A useful insight should not leave you wondering where it came from. In Trace, select an item to inspect
            the sentences connected to it and return to the original context.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[1400px] px-5 sm:mt-28 sm:px-8 lg:px-12" aria-labelledby="early-users">
        <div className="border-y border-line py-10 sm:py-12">
          <div className="grid gap-8 md:grid-cols-[minmax(180px,0.65fr)_minmax(0,1.35fr)] md:gap-12">
            <div>
              <p className="font-mono text-xs tracking-wide text-mute">EARLY USER FEEDBACK</p>
              <p className="mt-3 text-5xl font-semibold tracking-tight tabular-nums sm:text-6xl">40</p>
              <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-mute">
                people have tried Trace since launch.
              </p>
            </div>
            <div>
              <h2 id="early-users" className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Useful when the details start piling up.
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <figure>
                  <blockquote className="text-base leading-relaxed text-ink/85">
                    Trace helped make meeting notes easier to comprehend, identify the stakeholders involved, clarify
                    who was responsible for what, and see how many items needed to be tracked.
                  </blockquote>
                  <figcaption className="mt-3 text-xs text-mute">Early Trace user</figcaption>
                </figure>
                <figure>
                  <blockquote className="text-base leading-relaxed text-ink/85">
                    Knowing that meeting notes can be reviewed with Trace afterwards has made it easier to feel
                    confident about catching details that might have been missed during the discussion.
                  </blockquote>
                  <figcaption className="mt-3 text-xs text-mute">Early Trace user</figcaption>
                </figure>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-mute">
                Edited summaries of feedback shared with the Trace team; not verbatim quotations or independently
                measured outcomes.
              </p>
              <Link to="/about" className="mt-5 inline-block text-sm font-medium text-signal underline underline-offset-4">
                More about Trace
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[1400px] px-5 sm:mt-28 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 border border-ink bg-ink p-8 text-paper sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-16">
          <div>
            <p className="font-mono text-xs tracking-wide text-paper/60">YOUR TURN</p>
            <h2 className="mt-3 max-w-2xl text-balance text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
              Bring your notes, research or conversations. See what is inside them.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-paper/70">
              Start with a piece of text you already have. No elaborate setup required.
            </p>
          </div>
          <Link
            to="/trace"
            className="btn self-start bg-signal text-white hover:bg-paper hover:text-ink lg:self-auto"
          >
            Start a trace
          </Link>
        </div>
      </section>
    </div>
  )
}
