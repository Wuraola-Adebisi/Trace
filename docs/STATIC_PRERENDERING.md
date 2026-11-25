# Static route rendering

Trace remains a Vite + React application. The production build additionally renders the public routes to HTML so search crawlers and link-preview bots receive page content and route-specific metadata without running JavaScript.

## Build

The `build` script runs the normal TypeScript and Vite client builds, creates a server-side React bundle from `src/entry-server.tsx`, and runs `scripts/prerender.mjs`.

The prerender script writes static route documents into `dist`:

- `/`
- `/how-it-works`
- `/examples`
- `/about`
- `/privacy`
- `/terms`

It also writes a route-specific `/trace/index.html` shell with `noindex, nofollow`. The interactive workspace itself remains client-rendered.

## Metadata source of truth

Route titles, descriptions and robots directives live in `src/seo.ts`. The browser-side metadata effect and the prerender script use the same values. Canonical URLs, Open Graph metadata and Twitter card metadata are generated for each route during the build.

The social image currently uses the existing Trace homepage screenshot endpoint. Replace `SOCIAL_IMAGE` in `src/seo.ts` if a dedicated static social image is introduced.

## Hosting

Vercel serves the generated route HTML as static files. The existing catch-all rewrite remains as the fallback for client-side application routes and unknown paths. The generated `/trace/index.html` takes precedence for the workspace route and supplies its noindex metadata.

## Verification

After building, inspect the HTML files directly:

- `dist/examples/index.html` should contain the Examples heading, page description, canonical URL and Open Graph/Twitter metadata.
- `dist/about/index.html` should contain About page content and metadata.
- `dist/trace/index.html` should contain no rendered workspace markup and should declare `noindex, nofollow`.

Also test the deployed route responses with JavaScript disabled and use the relevant social-platform preview debuggers after deployment. A successful local build alone does not verify Vercel routing or third-party link-preview caches.
