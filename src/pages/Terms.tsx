import PageShell from "./PageShell";

export default function Terms() {
  return (
    <PageShell title="Terms of Usage" intro="Last updated September 2026.">
      <div className="space-y-10 text-[17px] leading-[1.7] text-ink/85">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">About Trace</h2>
          <p>
            Trace is an early-stage portfolio demonstration designed to show how
            unstructured information can be transformed into structured topics,
            people, decisions, questions, and relationships.
          </p>
          <p className="mt-4">
            The current version is a prototype and should not be treated as a
            production information-management service.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">
            Use of the demo
          </h2>
          <p>
            You may use Trace to explore its information-mapping interface and
            test it with suitable text. You are responsible for the content you
            choose to enter into the demo.
          </p>
          <p className="mt-4">
            You must not use Trace to process unlawful content or information
            that you do not have the right to use or disclose.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">
            Accuracy of results
          </h2>
          <p>
            Trace's current processing is based on example data and
            deterministic rules. Its output may be incomplete, inaccurate,
            oversimplified, or incorrectly identify relationships between pieces
            of information.
          </p>
          <p className="mt-4">
            You should review the original source material rather than treating
            a Trace-generated map or insight as an authoritative representation
            of that material.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">
            No professional advice
          </h2>
          <p>
            Trace does not provide legal, financial, medical, academic,
            employment, compliance, or other professional advice. Information
            produced by the demo should not be used as the sole basis for
            decisions that could materially affect you or another person.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">
            Example content
          </h2>
          <p>
            Example documents, people, organisations, discussions, and other
            information shown throughout Trace are fictional or created for
            demonstration purposes unless explicitly stated otherwise.
          </p>
          <p className="mt-4">
            Any resemblance between example content and actual people,
            organisations, events, or documents is coincidental.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">
            Intellectual property
          </h2>
          <p>
            The Trace interface, visual design, code, branding, and original
            product materials are part of the demonstration project and may not
            be copied, reproduced, or redistributed as though they were your own
            work without permission.
          </p>
          <p className="mt-4">
            You retain responsibility for any text or other material you choose
            to enter into the demo, including ensuring that you have the
            necessary rights to use it.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Availability</h2>
          <p>
            Trace is provided on an experimental basis. The demo may be changed,
            interrupted, restricted, or discontinued at any time without notice.
            No guarantee is made that any particular feature will remain
            available.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Disclaimer</h2>
          <p>
            Trace is provided “as is” and “as available”, without warranties of
            any kind, to the extent permitted by applicable law. No guarantee is
            made regarding the accuracy, completeness, reliability,
            availability, or suitability of its output for any particular
            purpose.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">
            Changes to these terms
          </h2>
          <p>
            These Terms of Usage may be updated as Trace evolves. Any changes
            will be reflected on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Contact</h2>
          <p>
            If you have questions about these Terms of Usage or the Trace
            demonstration, please use the contact method provided on the
            website.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
