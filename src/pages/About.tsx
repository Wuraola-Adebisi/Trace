import { Link } from 'react-router-dom'
import PageShell from './PageShell'

export default function About() {
  return (
    <PageShell
      title="About Trace"
      intro="Trace turns unstructured information into a map you can inspect, navigate, and act on."
    >
      <div className="space-y-12 text-[17px] leading-[1.7] text-ink/85">
        <section aria-labelledby="why-trace">
          <h2 id="why-trace" className="text-2xl font-semibold tracking-tight text-ink">Why Trace exists</h2>
          <p className="mt-3">
            Important information rarely arrives neatly organised. It lives in meeting notes, transcripts, research,
            project updates, documents, and long conversations. The useful parts are there, but they are buried in the
            volume.
          </p>
          <p className="mt-3">
            Trace brings that structure to the surface. It identifies the people, topics, decisions, questions, and
            relationships inside a body of text, then connects them in a workspace you can explore.
          </p>
        </section>

        <section aria-labelledby="early-feedback" className="border-y border-line py-10">
          <p className="font-mono text-xs tracking-[0.16em] text-mute">EARLY USER FEEDBACK</p>
          <h2 id="early-feedback" className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Tried by people doing the work.
          </h2>
          <p className="mt-4 max-w-2xl">
            Since launch, 40 people have tried Trace. Early feedback has centred on making meeting notes easier to
            understand, bringing responsibilities into focus, and feeling more confident about recovering details after
            a meeting.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <figure className="flex h-full flex-col border border-line bg-panel p-6 sm:p-7">
              <blockquote className="flex-1 text-lg leading-relaxed text-ink">
                Trace helped make meeting notes easier to comprehend, identify the stakeholders involved, clarify who
                was responsible for what, and see how many items needed to be tracked.
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-4">
                <span className="block font-semibold text-ink">Early Trace user</span>
              </figcaption>
            </figure>

            <figure className="flex h-full flex-col border border-line bg-panel p-6 sm:p-7">
              <blockquote className="flex-1 text-lg leading-relaxed text-ink">
                Knowing that meeting notes can be reviewed with Trace afterwards has made it easier to feel confident
                about catching details that might have been missed during the discussion.
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-4">
                <span className="block font-semibold text-ink">Early Trace user</span>
              </figcaption>
            </figure>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-mute">
            These are edited summaries of feedback shared with the Trace team, not verbatim quotations or independently
            measured product outcomes.
          </p>
        </section>

        <section aria-labelledby="built-for-verification">
          <h2 id="built-for-verification" className="text-2xl font-semibold tracking-tight text-ink">Built for verification</h2>
          <p className="mt-3">
            Trace is designed to keep analysis tied to the source. Select an item on the map and you can trace it back to
            the sentences that support it. That makes the result easier to inspect, question, and use without losing the
            original context.
          </p>
          <p className="mt-3">
            The goal is not to replace reading or judgment. It is to make the structure inside large amounts of information
            easier to see.
          </p>
        </section>

        <section aria-labelledby="how-trace-works-today">
          <h2 id="how-trace-works-today" className="text-2xl font-semibold tracking-tight text-ink">How Trace works today</h2>
          <p className="mt-3">
            The current web app processes the text you provide in your browser using Trace's local, rule-based analysis
            engine. It identifies candidate information and relationships, then presents them as an interactive map
            alongside the source material. This is an early product prototype; model-based AI processing is under
            development and is not yet connected.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>Your source text stays in your browser during the current Trace session.</li>
            <li>Results remain connected to the source sentences they came from.</li>
            <li>You can edit the source, run a new trace, and export the resulting analysis as Markdown.</li>
          </ul>
        </section>

        <section aria-labelledby="where-trace-is-going">
          <h2 id="where-trace-is-going" className="text-2xl font-semibold tracking-tight text-ink">Where it is going</h2>
          <p className="mt-3">
            Trace is being developed as a product for working with information, not as a static document viewer. The
            next stage is to help teams connect information across documents, recover decisions and responsibilities,
            and ask questions with answers grounded in their original sources.
          </p>
        </section>

        <p>
          <Link to="/trace" className="btn btn-signal">Start a trace</Link>
        </p>
      </div>
    </PageShell>
  )
}
