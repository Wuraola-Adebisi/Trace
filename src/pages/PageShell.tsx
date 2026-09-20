import type { ReactNode } from 'react'

export default function PageShell({ title, intro, children, wide = false }: { title: string; intro?: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`mx-auto px-4 pb-4 pt-12 sm:px-6 sm:pt-16 ${wide ? 'max-w-[1480px]' : 'max-w-3xl'}`}>
      <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{title}</h1>
      {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">{intro}</p>}
      <div className="mt-10">{children}</div>
    </div>
  )
}
