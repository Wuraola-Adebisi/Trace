import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { render, PAGE_META, SITE_URL, SOCIAL_IMAGE } from '../dist-server/entry-server.js'

const DIST = resolve('dist')
const ROUTES = ['/', '/how-it-works', '/examples', '/about', '/privacy', '/terms', '/trace']

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function setMeta(html, attribute, key, content) {
  const expression = new RegExp(`<meta(?=[^>]*${attribute}=["']${key}["'])[^>]*>`, 'i')
  const tag = `<meta ${attribute}="${key}" content="${escapeAttribute(content)}" />`
  if (expression.test(html)) return html.replace(expression, tag)
  return html.replace('</head>', `    ${tag}\\n  </head>`)
}

function setCanonical(html, url) {
  const tag = `<link rel="canonical" href="${escapeAttribute(url)}" />`
  const expression = /<link(?=[^>]*\\brel=["']canonical["'])[^>]*>/i
  if (expression.test(html)) return html.replace(expression, tag)
  return html.replace('</head>', `    ${tag}\\n  </head>`)
}

function applyMetadata(html, route) {
  const page = PAGE_META[route]
  if (!page) throw new Error(`Missing page metadata for ${route}`)

  const canonical = new URL(route, SITE_URL).toString()
  let output = html.replace(/<title>[\\s\\S]*?<\\/title>/i, `<title>${escapeAttribute(page.title)}</title>`)

  output = setMeta(output, 'name', 'description', page.description)
  output = setMeta(output, 'name', 'robots', page.robots ?? 'index, follow, max-image-preview:large')
  output = setCanonical(output, canonical)

  output = setMeta(output, 'property', 'og:title', page.title)
  output = setMeta(output, 'property', 'og:description', page.description)
  output = setMeta(output, 'property', 'og:url', canonical)
  output = setMeta(output, 'property', 'og:image', SOCIAL_IMAGE)
  output = setMeta(output, 'name', 'twitter:title', page.title)
  output = setMeta(output, 'name', 'twitter:description', page.description)
  output = setMeta(output, 'name', 'twitter:image', SOCIAL_IMAGE)

  return output
}

const template = await readFile(resolve(DIST, 'index.html'), 'utf8')

for (const route of ROUTES) {
  const routeHtml = applyMetadata(template, route)
  // Keep the interactive workspace client-rendered, but give it a route-specific,
  // noindex document so crawlers do not mistake it for the marketing homepage.
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
