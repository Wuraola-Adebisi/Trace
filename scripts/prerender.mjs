import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { render } from '../dist-server/entry-server.js'
import { PAGE_META, SITE_URL, SOCIAL_IMAGE } from '../src/seo.ts'

const DIST = resolve('dist')
const ROUTES = ['/', '/how-it-works', '/examples', '/about', '/privacy', '/terms', '/trace']

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function setMeta(html, selector, tag) {
  const escaped = escapeAttribute(tag.content)
  const expression = new RegExp(`<meta(?=[^>]*\\b${selector})[^>]*>`, 'i')
  const replacement = tag.attribute === 'property'
    ? `<meta property="${tag.key}" content="${escaped}" />`
    : `<meta name="${tag.key}" content="${escaped}" />`

  if (expression.test(html)) return html.replace(expression, replacement)
  return html.replace('</head>', `    ${replacement}\\n  </head>`)
}

function setCanonical(html, url) {
  const tag = `<link rel="canonical" href="${escapeAttribute(url)}" />`
  if (/<link(?=[^>]*\\brel=["']canonical["'])[^>]*>/i.test(html)) {
    return html.replace(/<link(?=[^>]*\\brel=["']canonical["'])[^>]*>/i, tag)
  }
  return html.replace('</head>', `    ${tag}\\n  </head>`)
}

function applyMetadata(html, route) {
  const page = PAGE_META[route]
  const canonical = new URL(route, SITE_URL).toString()
  const title = escapeAttribute(page.title)
  let output = html.replace(/<title>[\\s\\S]*?<\\/title>/i, `<title>${title}</title>`)

  output = setMeta(output, 'name=["']description["']', {
    attribute: 'name', key: 'description', content: page.description,
  })
  output = setMeta(output, 'name=["']robots["']', {
    attribute: 'name', key: 'robots', content: page.robots ?? 'index, follow, max-image-preview:large',
  })
  output = setCanonical(output, canonical)

  const tags = [
    { attribute: 'property', key: 'og:title', content: page.title },
    { attribute: 'property', key: 'og:description', content: page.description },
    { attribute: 'property', key: 'og:url', content: canonical },
    { attribute: 'property', key: 'og:image', content: SOCIAL_IMAGE },
    { attribute: 'name', key: 'twitter:title', content: page.title },
    { attribute: 'name', key: 'twitter:description', content: page.description },
    { attribute: 'name', key: 'twitter:image', content: SOCIAL_IMAGE },
  ]

  for (const tag of tags) {
    const selector = `${tag.attribute}=["']${tag.key}["']`
    output = setMeta(output, selector, tag)
  }

  return output
}

const template = await readFile(resolve(DIST, 'index.html'), 'utf8')

for (const route of ROUTES) {
  const routeHtml = applyMetadata(template, route)
  const markup = route === '/trace' ? '' : render(route)

  if (route !== '/trace' && !markup.trim()) {
    throw new Error(`Prerender produced empty markup for ${route}`)
  }

  const html = routeHtml.replace(
    /<div id="root">[\\s\\S]*?<\\/div>/,
    `<div id="root">${markup}</div>`,
  )
  const outputPath = route === '/'
    ? resolve(DIST, 'index.html')
    : resolve(DIST, route.slice(1), 'index.html')

  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, html)
  console.log(`Prerendered ${route} -> ${outputPath}`)
}

console.log(`Prerendered ${ROUTES.length} routes.`)
