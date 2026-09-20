export default function Logo({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" className="fill-ink" />
      <path d="M8 22 L16 10 L24 20" fill="none" strokeWidth="2" className="stroke-paper" />
      <circle cx="8" cy="22" r="3" className="fill-paper" />
      <circle cx="16" cy="10" r="3" className="fill-paper" />
      <circle cx="24" cy="20" r="3.5" className="fill-signal" />
    </svg>
  )
}
