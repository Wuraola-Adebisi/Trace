import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import About from './pages/About'
import Examples from './pages/Examples'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Trace from './pages/Trace'

const PAGE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Trace — Make sense of the mess',
    description: 'Make meeting notes, project documents and research easier to understand. See the people, topics, decisions and questions inside them.',
  },
  '/how-it-works': {
    title: 'How Trace works',
    description: 'See how Trace analyses unstructured information and connects people, topics, decisions and questions to their source material.',
  },
  '/examples': {
    title: 'Trace examples',
    description: 'Explore examples of how Trace turns unstructured notes into a navigable map of important information.',
  },
  '/trace': {
    title: 'Try Trace',
    description: 'Explore your notes and text with Trace. Surface topics, people, decisions, questions and relationships.',
  },
  '/about': {
    title: 'About Trace',
    description: 'Learn why Trace exists, what early users say about it and how the product is being developed.',
  },
  '/privacy': {
    title: 'Privacy policy',
    description: 'Read how Trace handles information submitted through the product.',
  },
  '/terms': {
    title: 'Terms of use',
    description: 'Read the terms that apply to using Trace.',
  },
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PageMetadata() {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = PAGE_META[pathname] ?? PAGE_META['/']
    document.title = page.title

    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.appendChild(description)
    }
    description.content = page.description

    const canonicalUrl = new URL(pathname, 'https://www.usetracelab.com')
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl.toString()

    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    if (ogTitle) ogTitle.content = page.title
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    if (ogDescription) ogDescription.content = page.description
    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')
    if (ogUrl) ogUrl.content = canonicalUrl.toString()
    const twitterTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')
    if (twitterTitle) twitterTitle.content = page.title
    const twitterDescription = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')
    if (twitterDescription) twitterDescription.content = page.description
  }, [pathname])

  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <ScrollToTop />
      <PageMetadata />
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/trace" element={<Trace />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
