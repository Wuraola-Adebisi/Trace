export type NodeKind = 'topic' | 'person' | 'decision' | 'question'
export type Importance = 'high' | 'medium' | 'low'
export type Filter = 'all' | NodeKind

export interface TraceNode {
  id: string
  label: string
  kind: NodeKind
  importance: Importance
  /** Plain-language reason this node exists. Shown in the insight panel. */
  why: string
  /** Lowercase-insensitive substrings. Sentences containing any of them are the node's source. */
  match: string[]
  tag?: string
  role?: string
  when?: string
}

export interface TraceEdge {
  from: string
  to: string
  relation?: string
}

export interface TraceResult {
  title: string
  summary: string
  rootId: string
  nodes: TraceNode[]
  edges: TraceEdge[]
  kindLabels: Record<NodeKind, string>
}

export interface TraceInput {
  title: string
  content: string
}

export interface TraceExample {
  id: string
  name: string
  blurb: string
  input: TraceInput
  result: TraceResult
}

export const DEFAULT_KIND_LABELS: Record<NodeKind, string> = {
  topic: 'Topics',
  person: 'People',
  decision: 'Decisions',
  question: 'Questions',
}
