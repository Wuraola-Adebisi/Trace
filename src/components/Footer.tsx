import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Link to="/" className="font-semibold tracking-tight text-ink">Trace</Link>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-mute">
            Make sense of the mess. Find the people, topics, decisions and questions inside your information.
          </p>
          <p className="mt-5 text-xs text-mute">© {new Date().getFullYear()} Trace. All rights reserved.</p>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-mute">Contact</p>
          <a
            href="mailto:contact@usetracelab.com"
            className="text-sm text-ink transition-colors hover:text-signal"
          >
            contact@usetracelab.com
          </a>
        </div>
      </div>
    </footer>
  )
}
