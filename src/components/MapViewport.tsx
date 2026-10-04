import { useEffect, useRef, type ReactNode } from 'react'

/** Scroll area for the map: dot grid across the full panel, and on narrow screens it starts centred. */
export default function MapViewport({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (el) el.scrollLeft = Math.max(0, (el.scrollWidth - el.clientWidth) / 2)
  }, [])
  return (
    <div ref={ref} className="map-dots min-h-0 flex-1 overflow-auto xl:overflow-hidden">
      {children}
    </div>
  )
}
