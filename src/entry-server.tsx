import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
export { PAGE_META, SITE_URL, SOCIAL_IMAGE } from './seo'

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}
