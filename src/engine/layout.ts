import type { TraceResult } from '../types'

export const VIEW = { w: 780, h: 700 }
const CX = VIEW.w / 2
const CY = VIEW.h / 2

/** Centre-based box. */
export interface Box {
  x: number
  y: number
  w: number
  h: number
}

export interface Layout {
  boxes: Record<string, Box>
  order: Record<string, number>
  primary: Set<string>
}

export const edgeKey = (a: string, b: string) => (a < b ? `${a}|${b}` : `${b}|${a}`)

export function truncate(label: string, max: number): string {
  return label.length > max ? label.slice(0, max - 1).trimEnd() + '\u2026' : label
}

export function displayLabel(label: string, isRoot: boolean): string {
  return truncate(label, isRoot ? 22 : 24)
}

export function nodeText(n: { label: string; kind: string }, isRoot: boolean): string {
  const label = displayLabel(n.label, isRoot)
  return n.kind === 'question' ? `? ${label}` : label
}

export function boxSize(label: string, isRoot: boolean) {
  const cw = isRoot ? 8.4 : 6.7
  const pad = isRoot ? 34 : 18
  return { w: Math.ceil(label.length * cw) + pad, h: isRoot ? 42 : 28 }
}

/**
 * Radial tree layout. The root sits in the middle, its neighbours on an inner ring and everything
 * else on an outer ring. Each node gets an angular sector proportional to its number of descendants,
 * then a short relaxation pass pushes overlapping labels apart.
 */
export function layoutGraph(result: TraceResult): Layout {
  const { nodes, edges, rootId } = result
  const ids = nodes.map((n) => n.id)

  const adj = new Map<string, string[]>(ids.map((id) => [id, []]))
  for (const e of edges) {
    adj.get(e.from)?.push(e.to)
    adj.get(e.to)?.push(e.from)
  }

  const depth = new Map<string, number>([[rootId, 0]])
  const parent = new Map<string, string>()
  const order: Record<string, number> = { [rootId]: 0 }
  const queue = [rootId]
  let counter = 1
  for (let qi = 0; qi < queue.length; qi++) {
    const cur = queue[qi]
    for (const next of adj.get(cur) ?? []) {
      if (depth.has(next)) continue
      depth.set(next, (depth.get(cur) ?? 0) + 1)
      parent.set(next, cur)
      order[next] = counter++
      queue.push(next)
    }
  }
  for (const id of ids) {
    if (!depth.has(id)) {
      depth.set(id, 1)
      parent.set(id, rootId)
      order[id] = counter++
    }
  }

  const children = new Map<string, string[]>(ids.map((id) => [id, []]))
  for (const id of ids) {
    const p = parent.get(id)
    if (p) children.get(p)?.push(id)
  }
  for (const list of children.values()) list.sort((a, b) => order[a] - order[b])

  const leafCount = (id: string): number => {
    const c = children.get(id) ?? []
    return c.length === 0 ? 1 : c.reduce((s, x) => s + leafCount(x), 0)
  }

  const angle = new Map<string, number>()
  const assign = (id: string, a0: number, a1: number) => {
    angle.set(id, (a0 + a1) / 2)
    const c = children.get(id) ?? []
    const total = c.reduce((s, x) => s + leafCount(x), 0)
    let a = a0
    for (const x of c) {
      const span = ((a1 - a0) * leafCount(x)) / total
      assign(x, a, a + span)
      a += span
    }
  }
  const start = -Math.PI / 2
  assign(rootId, start, start + Math.PI * 2)

  const boxes: Record<string, Box> = {}
  for (const n of nodes) {
    const isRoot = n.id === rootId
    const { w, h } = boxSize(nodeText(n, isRoot), isRoot)
    if (isRoot) {
      boxes[n.id] = { x: CX, y: CY, w, h }
      continue
    }
    const d = Math.min(depth.get(n.id) ?? 1, 2)
    const a = angle.get(n.id) ?? 0
    const rx = d === 1 ? 195 : 300
    const ry = d === 1 ? 155 : 290
    boxes[n.id] = { x: CX + rx * Math.cos(a), y: CY + ry * Math.sin(a), w, h }
  }

  for (let iter = 0; iter < 120; iter++) {
    let moved = false
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const a = boxes[ids[i]]
        const b = boxes[ids[j]]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const ox = (a.w + b.w) / 2 + 12 - Math.abs(dx)
        const oy = (a.h + b.h) / 2 + 10 - Math.abs(dy)
        if (ox <= 0 || oy <= 0) continue
        moved = true
        const aFixed = ids[i] === rootId
        const bFixed = ids[j] === rootId
        const share = aFixed || bFixed ? 1 : 0.5
        if (oy <= ox) {
          const s = (dy >= 0 ? 1 : -1) * oy * share
          if (!aFixed) a.y += s
          if (!bFixed) b.y -= s
        } else {
          const s = (dx >= 0 ? 1 : -1) * ox * share
          if (!aFixed) a.x += s
          if (!bFixed) b.x -= s
        }
      }
    }
    for (const id of ids) {
      const b = boxes[id]
      b.x = Math.min(Math.max(b.x, b.w / 2 + 6), VIEW.w - b.w / 2 - 6)
      b.y = Math.min(Math.max(b.y, b.h / 2 + 6), VIEW.h - b.h / 2 - 6)
    }
    if (!moved) break
  }

  const primary = new Set<string>()
  for (const [child, p] of parent.entries()) primary.add(edgeKey(child, p))

  return { boxes, order, primary }
}
