import PageShell from './PageShell'

export default function Privacy() {
  return (
    <PageShell title="Privacy" intro="Last updated September 2026.">
      <div className="space-y-10 text-[17px] leading-[1.7] text-ink/85">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">
            What Trace is
          </h2>
          <p>
            Trace is an early-stage portfolio demo designed to turn
            unstructured information such as notes, transcripts, research,
            and project documents into structured topics, people, decisions,
            questions, and relationships.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">
            Information you provide
          </h2>
          <p>
            You may paste text into Trace to demonstrate its information
            mapping experience. The current version does not require an
            account, payment information, or a connected external service.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">
            How your content is processed
          </h2>
          <p>
            The current Trace demo processes submitted text locally in your
            browser using a deterministic processing script. Your text is not
            uploaded to a Trace server, stored in a Trace database, or sent to
            an external AI model by the current demo.
          </p>
          <p className="mt-4">
            Information entered into the demo exists only for the duration of
            the current browser session and is lost when you refresh or close
            the page.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">
            What we recommend
          </h2>
          <p>
            Trace is a portfolio prototype and is not designed for sensitive
            information. Do not paste passwords, financial information,
            government identification numbers, health records, confidential
            business information, or other sensitive personal information into
            the demo.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">
            Third-party services
          </h2>
          <p>
            The site currently loads its typefaces from Google Fonts. When the
            page loads, your browser may make a request to Google to retrieve
            those fonts. Google's handling of that request is governed by
            Google's own privacy policies and terms.
          </p>
          <p className="mt-4">
            If analytics, advertising, external AI services, or other
            third-party services are added in the future, this policy will be
            updated to describe what information they receive and why.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">
            Hosting and technical information
          </h2>
          <p>
            Although Trace does not receive or store the text you enter into
            the current demo, the infrastructure used to host the website may
            generate standard technical logs, such as requests, IP addresses,
            browser information, or error data. These logs are controlled by
            the hosting provider and are used for operating and securing the
            website.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">
            Future changes
          </h2>
          <p>
            Trace is an evolving prototype. If the product later introduces
            accounts, persistent storage, cloud-based AI processing, analytics,
            integrations, or other functionality that changes how information
            is handled, this Privacy Policy will be updated accordingly.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">
            Contact
          </h2>
          <p>
            If you have questions about this Privacy Policy or how information
            is handled by Trace, please use the contact method provided on the
            website.
          </p>
        </section>
      </div>
    </PageShell>
  )
}