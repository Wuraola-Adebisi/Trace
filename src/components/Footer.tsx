import { Link } from 'react-router-dom'
import Logo from './Logo'

const productLinks = [
  { to: '/how-it-works', label: 'How it works' },
  { to: '/examples', label: 'Examples' },
  { to: '/trace', label: 'Start a trace' },
]

const companyLinks = [
  { to: '/about', label: 'About' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
]

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line sm:mt-28">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.5fr)_auto_auto] md:gap-20">
          <div className="max-w-md">
            <Link to="/" className="inline-flex items-center gap-2.5" aria-label="Trace home">
              <Logo className="h-5 w-5" />
              <span className="font-semibold tracking-tight">Trace</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-mute">
              Turn unstructured information into a structured map of topics, people, decisions, questions, and
              relationships, with the source context close to the analysis.
            </p>

            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-mute">Contact</p>
              <a
                href="mailto:hello@usetracelab.com"
                className="mt-2 inline-block text-sm font-medium text-ink transition-opacity hover:opacity-60"
              >
                hello@usetracelab.com
              </a>
            </div>
          </div>

          <nav aria-label="Product" className="min-w-[120px]">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-mute">Product</p>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm">
              {productLinks.map((link) => (
                <Link key={link.to} to={link.to} className="text-mute transition-colors hover:text-ink">
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Company" className="min-w-[120px]">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-mute">Company</p>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm">
              {companyLinks.map((link) => (
                <Link key={link.to} to={link.to} className="text-mute transition-colors hover:text-ink">
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-5 text-xs text-mute sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Trace. All rights reserved.</p>
          <p>Built for clearer thinking.</p>
        </div>
      </div>
    </footer>
  )
}
