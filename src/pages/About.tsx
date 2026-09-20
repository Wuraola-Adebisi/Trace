import { Link } from 'react-router-dom'
import PageShell from './PageShell'

export default function About() {
  return (
    <PageShell title="About Trace" intro="Information has structure even when people don't give it structure.">
      <div className="space-y-12 text-[17px] leading-[1.7] text-ink/85">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">What Trace tries to recover</h2>
          <p className="mt-3">
            A meeting transcript or a pile of research notes reads as a single stream. Underneath it are recurring topics,
            people tied to specific work, decisions that were made and questions nobody answered. Trace looks for those
            pieces and the links between them, then lays them out so you can move around the material instead of reading it
            top to bottom.
          </p>
          <p className="mt-3">
            Every node points back to the sentences that produced it. If Trace shows a topic or a decision, you can see why
            it exists and disagree with it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">What is real in this demo</h2>
          <p className="mt-3">
            This version uses demonstration data and a local interpretation engine. There is no language model behind it.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>The four examples have hand-prepared results, including their links.</li>
            <li>
              Text you paste goes through a rule-based reader that looks for names, repeated terms and phrases such as
              &ldquo;agreed&rdquo; or &ldquo;unresolved&rdquo;. It works on simple notes and misses a lot.
            </li>
            <li>Nothing you paste is sent anywhere. It stays in your browser.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">What changes with a real model</h2>
          <p className="mt-3">
            The interface calls a single function, <code className="bg-line/60 px-1.5 font-mono text-[15px]">traceEngine</code>,
            which returns a structured result. Replacing it with a model call changes the quality of the extraction and the
            links. The map, the source highlighting and the filters stay as they are.
          </p>
        </section>

        <p>
          <Link to="/trace" className="bg-signal px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink">
            Try Trace
          </Link>
        </p>
      </div>
    </PageShell>
  )
}
