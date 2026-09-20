import { useMemo } from 'react'
import { neighbors, visibleIds } from '../engine/graph'
import { VIEW, edgeKey, layoutGraph, nodeText } from '../engine/layout'
import type { Filter, NodeKind, TraceResult } from '../types'

interface Props {
  result: TraceResult
  selectedId: string | null
  onSelect: (id: string | null) => void
  filter?: Filter
  showEdges?: boolean
  animate?: boolean
}

const RECT: Record<NodeKind, string> = {
  topic: 'fill-panel stroke-ink stroke-1',
  person: 'fill-ink stroke-ink stroke-1',
  decision: 'fill-signal stroke-signal stroke-1',
  question: 'fill-panel stroke-signal stroke-[1.5] [stroke-dasharray:4_3]',
}

const TEXT: Record<NodeKind, string> = {
  topic: 'fill-ink',
  person: 'fill-paper',
  decision: 'fill-white',
  question: 'fill-signal',
}

export default function TraceMap({ result, selectedId, onSelect, filter = 'all', showEdges = true, animate = false }: Props) {
  const layout = useMemo(() => layoutGraph(result), [result])
  const visible = useMemo(() => visibleIds(result, filter), [result, filter])
  const near = useMemo(() => {
    if (!selectedId) return null
    const s = new Set<string>([selectedId])
    for (const n of neighbors(result, selectedId)) s.add(n.node.id)
    return s
  }, [result, selectedId])

  const step = 70

  return (
    <svg
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      className="mx-auto h-auto w-full min-w-[640px] max-w-[820px] xl:h-full xl:min-w-0"
      role="group"
      aria-label={`Relationship map for ${result.title}`}
    >
      <defs>
        <pattern id="trace-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1" className="fill-line" />
        </pattern>
      </defs>
      <rect width={VIEW.w} height={VIEW.h} fill="url(#trace-dots)" onClick={() => onSelect(null)} />

      {showEdges && (
        <g>
          {result.edges.map((e) => {
            const a = layout.boxes[e.from]
            const b = layout.boxes[e.to]
            if (!a || !b) return null
            const shown = visible.has(e.from) && visible.has(e.to)
            const active = selectedId !== null && (e.from === selectedId || e.to === selectedId)
            const primary = layout.primary.has(edgeKey(e.from, e.to))
            const dim = selectedId !== null && !active
            const delay = Math.max(layout.order[e.from] ?? 0, layout.order[e.to] ?? 0) * step + 150
            return (
              <g
                key={`${e.from}-${e.to}`}
                className={`transition-opacity duration-200 ${shown ? (dim ? 'opacity-15' : 'opacity-100') : 'opacity-0'}`}
              >
                <g className={animate ? 'trace-in' : ''} style={animate ? { animationDelay: `${delay}ms` } : undefined}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    className={
                      active
                        ? 'stroke-signal stroke-2'
                        : primary
                          ? 'stroke-ink/40 stroke-1'
                          : 'stroke-ink/25 stroke-1 [stroke-dasharray:4_4]'
                    }
                  />
                  {active && e.relation && (
                    <text
                      x={(a.x + b.x) / 2}
                      y={(a.y + b.y) / 2}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="fill-signal font-mono text-[10px]"
                      style={{ paintOrder: 'stroke', stroke: 'var(--color-paper)', strokeWidth: 5 }}
                    >
                      {e.relation}
                    </text>
                  )}
                </g>
              </g>
            )
          })}
        </g>
      )}

      <g>
        {result.nodes.map((n) => {
          const b = layout.boxes[n.id]
          if (!b) return null
          const isRoot = n.id === result.rootId
          const shown = visible.has(n.id)
          const dim = near !== null && !near.has(n.id)
          const selected = n.id === selectedId
          const text = nodeText(n, isRoot)
          const delay = (layout.order[n.id] ?? 0) * step
          return (
            <g
              key={n.id}
              transform={`translate(${b.x - b.w / 2} ${b.y - b.h / 2})`}
              className={`transition-opacity duration-200 ${shown ? (dim ? 'opacity-30' : 'opacity-100') : 'pointer-events-none opacity-[0.07]'}`}
            >
              <g
                className={`group cursor-pointer outline-none ${animate ? 'trace-in' : ''}`}
                style={animate ? { animationDelay: `${delay}ms` } : undefined}
                role="button"
                tabIndex={shown ? 0 : -1}
                aria-pressed={selected}
                aria-label={`${result.kindLabels[n.kind]}: ${n.label}`}
                onClick={() => onSelect(selected ? null : n.id)}
                onKeyDown={(ev) => {
                  if (ev.key === 'Enter' || ev.key === ' ') {
                    ev.preventDefault()
                    onSelect(selected ? null : n.id)
                  }
                }}
              >
                <rect
                  width={b.w}
                  height={b.h}
                  rx={2}
                  className={`${RECT[n.kind]} ${isRoot ? 'stroke-2' : ''}`}
                />
                <text
                  x={b.w / 2}
                  y={b.h / 2 + 0.5}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`${TEXT[n.kind]} ${isRoot ? 'font-sans text-[14px] font-semibold' : 'font-mono text-[11px]'}`}
                >
                  {text}
                </text>
                <rect
                  x={-4}
                  y={-4}
                  width={b.w + 8}
                  height={b.h + 8}
                  rx={3}
                  className={`fill-none ${selected ? 'stroke-signal stroke-2' : 'stroke-transparent group-focus-visible:stroke-signal group-focus-visible:stroke-2'}`}
                />
              </g>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
