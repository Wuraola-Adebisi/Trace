import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'

const links = [
  { to: '/how-it-works', label: 'How it works' },
  { to: '/examples', label: 'Examples' },
  { to: '/about', label: 'About' },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `border-b-2 py-1 text-sm transition-colors ${
    isActive ? 'border-signal text-ink' : 'border-transparent text-mute hover:text-ink'
  }`

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1480px] items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Trace home">
          <Logo />
          <span className="text-lg font-semibold tracking-tight">Trace</span>
        </Link>
        <nav className="hidden items-center gap-7 sm:flex" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <Link
          to="/trace"
          className="bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-signal"
        >
          Try Trace
        </Link>
      </div>
      <nav className="flex justify-center gap-6 border-t border-line py-2 sm:hidden" aria-label="Main mobile">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className={linkClass}>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
