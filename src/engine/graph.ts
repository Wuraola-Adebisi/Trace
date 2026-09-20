import type { Filter, TraceNode, TraceResult } from '../types'
import { matchesTerms } from './text'

export function nodeSources(sentences: string[], node: TraceNode): number[] {
  const out: number[] = []
  sentences.forEach((s, i) => {
    if (matchesTerms(s, node.match)) out.push(i)
  })
  return out
}

/** [0, 1, 2, 5] -> "1\u20133, 6" (1-based, as people read line numbers). */
export function formatRanges(indices: number[]): string {
  if (indices.length === 0) return ''
  const nums = indices.map((i) => i + 1)
  const parts: string[] = []
  let start = nums[0]
  let prev = nums[0]
  for (let i = 1; i <= nums.length; i++) {
    const n = nums[i]
    if (n === prev + 1) {
      prev = n
      continue
    }
    parts.push(start === prev ? `${start}` : `${start}\u2013${prev}`)
    start = n
    prev = n
  }
  return parts.join(', ')
}

export function neighbors(result: TraceResult, id: string): { node: TraceNode; relation?: string }[] {
  const byId = new Map(result.nodes.map((n) => [n.id, n]))
  const out: { node: TraceNode; relation?: string }[] = []
  for (const e of result.edges) {
    const otherId = e.from === id ? e.to : e.to === id ? e.from : null
    if (!otherId) continue
    const node = byId.get(otherId)
    if (node) out.push({ node, relation: e.relation })
  }
  return out
}

/** Nodes that stay visible for a filter: the chosen kind plus the topics connected to it. */
export function visibleIds(result: TraceResult, filter: Filter): Set<string> {
  if (filter === 'all') return new Set(result.nodes.map((n) => n.id))
  const kindOf = new Map(result.nodes.map((n) => [n.id, n.kind]))
  const set = new Set(result.nodes.filter((n) => n.kind === filter).map((n) => n.id))
  if (filter !== 'topic') {
    const chosen = new Set(set)
    for (const e of result.edges) {
      if (chosen.has(e.from) && kindOf.get(e.to) === 'topic') set.add(e.to)
      if (chosen.has(e.to) && kindOf.get(e.from) === 'topic') set.add(e.from)
    }
  }
  return set
}
