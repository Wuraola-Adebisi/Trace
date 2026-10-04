import PageShell from './PageShell'

export default function Privacy() {
  return (
    <PageShell title="Privacy" intro="Last updated October 2026.">
      <div className="space-y-10 text-[17px] leading-[1.7] text-ink/85">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">The short version</h2>
          <p>
            Trace is designed to keep the text you analyse private. In the current web app, text you enter is processed
            locally in your browser and is not uploaded to a Trace server or sent to an external AI service.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Information you provide</h2>
          <p>
            You can enter a title and source text into Trace, including notes, transcripts, research material, and other
            information you want to analyse. The current product does not require an account or payment information to use
            the core tracing experience.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">How your source text is processed</h2>
          <p>
            The current Trace web app runs its analysis engine in your browser. Your source text is not transmitted to a
            Trace backend, stored in a Trace database, or submitted to an external AI model by the current product.
          </p>
          <p className="mt-4">
            Analysis state is held in the browser while you use the product. It is not intended to be a permanent cloud
            record of the material you analyse.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Please use appropriate care</h2>
          <p>
            Although Trace currently keeps submitted text in the browser, you should still use reasonable care with
            sensitive information. Avoid entering passwords, payment card details, government identification numbers,
            health records, or confidential information unless you understand the environment in which you are using Trace
            and are authorised to process that information.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Technical information</h2>
          <p>
            The infrastructure that serves Trace may receive standard technical information associated with requests to
            the website, such as IP addresses, browser or device information, timestamps, and error information. This
            information may be processed by Trace's hosting and infrastructure providers to deliver, secure, and maintain
            the service.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Third-party services</h2>
          <p>
            Trace currently uses third-party infrastructure to serve the website and may load fonts or other resources from
            third-party providers. Those providers may process technical information as part of delivering their services
            and are responsible for their own privacy practices.
          </p>
          <p className="mt-4">
            If Trace introduces analytics, accounts, cloud processing, external AI services, integrations, or other
            functionality that materially changes how information is handled, this policy will be updated before or when
            that functionality is introduced.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Changes to this policy</h2>
          <p>
            Trace may update this Privacy Policy as the product and its data practices change. The revision date at the top
            of this page indicates when the policy was last updated.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Contact</h2>
          <p>
            Questions about privacy or how Trace handles information can be raised through the contact channel made
            available by Trace.
          </p>
        </section>
      </div>
    </PageShell>
  )
}
