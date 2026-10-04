import PageShell from './PageShell'

export default function Terms() {
  return (
    <PageShell title="Terms of Use" intro="Last updated October 2026.">
      <div className="space-y-10 text-[17px] leading-[1.7] text-ink/85">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Using Trace</h2>
          <p>
            Trace is a tool for turning source material into a structured, interactive view of the information it
            contains. You may use the service for lawful purposes and for material you are authorised to analyse.
          </p>
          <p className="mt-4">
            You are responsible for the content you provide to Trace and for ensuring that your use of that content does
            not violate applicable law, confidentiality obligations, intellectual property rights, or the rights of other
            people.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Your content</h2>
          <p>
            You retain ownership of the text and other material you provide to Trace. The current web app processes source
            text locally in your browser and does not upload it to a Trace server as part of the core tracing experience.
          </p>
          <p className="mt-4">You represent that you have the rights and permissions necessary to use the material you submit.</p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Results and accuracy</h2>
          <p>
            Trace analyses information and presents relationships, topics, people, decisions, questions, and other
            extracted material. Those results may be incomplete, inaccurate, or missing important context.
          </p>
          <p className="mt-4">
            Treat Trace's output as an aid to understanding, not as a substitute for reviewing the underlying source
            material. You are responsible for verifying results before relying on them for consequential decisions.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Acceptable use</h2>
          <p>
            You may not use Trace to facilitate unlawful activity, infringe another person's rights, interfere with the
            service, attempt to gain unauthorised access to systems or data, or introduce malicious code or content.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Intellectual property</h2>
          <p>
            Trace, including its software, interface, branding, visual design, and original product materials, is owned by
            or licensed to the Trace team and is protected by applicable intellectual property laws.
          </p>
          <p className="mt-4">
            These Terms do not transfer ownership of Trace or its underlying technology to you. They also do not transfer
            ownership of content you provide to Trace.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Availability and changes</h2>
          <p>
            We may modify, improve, suspend, or discontinue parts of Trace as the product develops. We will make reasonable
            efforts to keep the service available, but continuous availability is not guaranteed.
          </p>
          <p className="mt-4">
            Features, processing methods, limits, and supported integrations may change over time. Where a change
            materially affects these Terms, the updated version will be posted here.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Disclaimer</h2>
          <p>
            To the extent permitted by applicable law, Trace is provided on an “as is” and “as available” basis. No
            warranty is made that the service or its results will always be accurate, complete, secure, uninterrupted, or
            suitable for a particular purpose.
          </p>
          <p className="mt-4">
            Nothing on Trace constitutes legal, financial, medical, employment, compliance, or other professional advice.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Changes to these Terms</h2>
          <p>
            These Terms of Use may be updated as Trace evolves. Continued use of Trace after an updated version is posted
            constitutes acceptance of the revised Terms to the extent permitted by applicable law.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Contact</h2>
          <p>Questions about these Terms can be raised through the contact channel made available by Trace.</p>
        </section>
      </div>
    </PageShell>
  )
}
