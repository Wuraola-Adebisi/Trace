import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line sm:mt-24">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-10 sm:px-8 lg:px-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <Logo className="h-5 w-5" />
            <span className="font-semibold tracking-tight">Trace</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-mute">
            Trace turns unstructured information into a structured map of topics, people, decisions, questions, and
            relationships, with the source context kept close to the analysis.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm" aria-label="Footer">
          <Link to="/how-it-works" className="text-mute hover:text-ink">How it works</Link>
          <Link to="/examples" className="text-mute hover:text-ink">Examples</Link>
          <Link to="/trace" className="text-mute hover:text-ink">Start a trace</Link>
          <Link to="/about" className="text-mute hover:text-ink">About</Link>
          <Link to="/privacy" className="text-mute hover:text-ink">Privacy</Link>
          <Link to="/terms" className="text-mute hover:text-ink">Terms</Link>
        </nav>
      </div>
    </footer>
  )
}
