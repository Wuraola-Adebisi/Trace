import type { NodeKind, TraceResult } from '../types'

const ORDER: NodeKind[] = ['topic', 'person', 'decision', 'question']

/** Plain Markdown version of a trace, for pasting into notes or docs. */
export function toMarkdown(result: TraceResult): string {
  const lines: string[] = [`# ${result.title}`, '', result.summary]
  for (const kind of ORDER) {
    const nodes = result.nodes.filter((n) => n.kind === kind)
    if (nodes.length === 0) continue
    lines.push('', `## ${result.kindLabels[kind]}`, '')
    for (const n of nodes) {
      const extra = [n.role, n.when].filter(Boolean).join(', ')
      lines.push(`- **${n.label}**${extra ? ` (${extra})` : ''}: ${n.why}`)
    }
  }
  return lines.join('\n') + '\n'
}
