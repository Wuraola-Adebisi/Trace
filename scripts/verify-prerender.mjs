import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const cases = [
  { route: '/', file: 'index.html', title: 'Trace — Make sense of the mess', heading: 'Make sense of the mess.' },
  { route: '/how-it-works', file: 'how-it-works/index.html', title: 'How Trace works', heading: 'How it works' },
  { route: '/examples', file: 'examples/index.html', title: 'Trace examples', heading: 'Examples' },
  { route: '/about', file: 'about/index.html', title: 'About Trace', heading: 'About Trace' },
  { route: '/privacy', file: 'privacy/index.html', title: 'Privacy policy', heading: 'Privacy' },
  { route: '/terms', file: 'terms/index.html', title: 'Terms of use', heading: 'Terms of Use' },
]

for (const item of cases) {
  const html = await readFile(resolve('dist', item.file), 'utf8')
  const canonical = `https://www.usetracelab.com${item.route === '/' ? '/' : item.route}`

  for (const [label, condition] of [
    ['page title', html.includes(`<title>${item.title}</title>`)],
    ['page content', html.includes(item.heading)],
    ['canonical URL', html.includes(`<link rel="canonical" href="${canonical}" />`)],
    ['Open Graph title', html.includes(`property="og:title" content="${item.title}"`)],
    ['Twitter title', html.includes(`name="twitter:title" content="${item.title}"`)],
    ['indexable robots directive', html.includes('name="robots" content="index, follow, max-image-preview:large"')],
  ]) {
    if (!condition) throw new Error(`Prerender verification failed for ${item.route}: missing ${label}`)
  }

  console.log(`Verified ${item.route}`)
}

const trace = await readFile(resolve('dist/trace/index.html'), 'utf8')
if (!trace.includes('<title>Try Trace</title>')) throw new Error('Trace workspace title is missing')
if (!trace.includes('name="robots" content="noindex, nofollow"')) throw new Error('Trace workspace must be noindex')
if (!trace.includes('<div id="root"></div>')) throw new Error('Trace workspace should remain client-rendered')

console.log('Verified /trace client-rendered shell and noindex metadata')
