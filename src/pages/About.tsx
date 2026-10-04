import { Link } from 'react-router-dom'
import PageShell from './PageShell'

export default function About() {
  return (
    <PageShell
      title="About Trace"
      intro="Trace turns unstructured information into a map you can inspect, navigate, and act on."
    >
      <div className="space-y-12 text-[17px] leading-[1.7] text-ink/85">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Why Trace exists</h2>
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
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Built for verification</h2>
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
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">How Trace works today</h2>
          <p className="mt-3">
            The current web app processes the text you provide in your browser using Trace's local analysis engine. It
            extracts structured items and relationships, then presents them as an interactive map alongside the source
            material.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>Your source text stays in your browser during the current Trace session.</li>
            <li>Results remain connected to the source sentences they came from.</li>
            <li>You can edit the source, run a new trace, and export the resulting analysis as Markdown.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Where it is going</h2>
          <p className="mt-3">
            Trace is being developed as a product for working with information, not as a static document viewer. The
            underlying experience can evolve as the analysis engine becomes more capable, while the core principle remains
            the same: make complex information easier to understand without hiding where the conclusions came from.
          </p>
        </section>
        <p>
          <Link to="/trace" className="btn btn-signal">Start a trace</Link>
        </p>
      </div>
    </PageShell>
  )
}
