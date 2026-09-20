import { EXAMPLES } from '../data/traceExamples'
import type { Importance, TraceEdge, TraceInput, TraceNode, TraceResult } from '../types'
import { DEFAULT_KIND_LABELS } from '../types'
import { flattenSentences, matchesTerms } from './text'

/**
 * traceEngine is the only place the UI gets its data from.
 *
 * Today it is deterministic and local: the four bundled examples return hand-prepared results, and any
 * other text goes through a rule-based extractor. To use a real model later, keep this signature and
 * return the same TraceResult shape from an API call.
 */
export function traceEngine(input: TraceInput): TraceResult {
  const norm = (s: string) => s.replace(/\s+/g, ' ').trim()
  const known = EXAMPLES.find((e) => norm(e.input.content) === norm(input.content))
  if (known) return { ...known.result, title: input.title.trim() || known.result.title }
  return analyse(input)
}

/* ------------------------------ rule-based extractor ------------------------------ */

const STOP = new Set(
  `about above after again against also always among another around because been before being below between both
  could does doing done during each either else even ever every from further have having here however into itself just
  like made make many more most much must need needs only other over same should since some still such than that their
  them then there these they this those though through under until very want wants well were what when where which while
  whom will with within without would your yours said says say think thinks thought going gone first next back
  already really thing things something everyone someone anyone meeting notes note agreed decided asked raised
  flagged pointed present also can not the and for are was has had its our out has who how why but you
  one two three four five six seven eight nine ten whether unclear unresolved unknown nobody`.split(/\s+/),
)

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const NAME_VERBS =
  /^(?:'s\b)?\s*(?:thinks|wants|said|says|will|asked|agreed|raised|flagged|owns|noted|suggested|proposed|believes|argued|pointed|mentioned|explained|told|confirmed|reported|expects|prefers|worries|disagrees|accepted|would|wanted|thought)\b/i

const DECISION_RE =
  /\b(?:agreed|decided|decision was|we will|we'll|will (?:own|send|investigate|draft|write|run|lead|review|prepare|check|recruit|ask|keep|share|book)|going with|approved|settled on|confirmed that)\b/i

const QUESTION_RE =
  /\b(?:unresolved|unclear|not sure|open question|need to decide|to be decided|still to decide|undecided|unknown|whether|tbd|nobody could|no one knows)\b/i

const DATE_RE = new RegExp(
  `\\b(?:\\d{1,2}(?:st|nd|rd|th)?\\s+(?:${MONTHS.join('|')})|(?:${MONTHS.join('|')})\\s+\\d{1,2}(?:st|nd|rd|th)?|\\d{4}-\\d{2}-\\d{2})\\b`,
  'i',
)

const stem = (w: string) => (w.length > 4 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w)
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const short = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '\u2026' : s)
const plural = (n: number, word: string) =>
  word === 'person' ? (n === 1 ? '1 person' : `${n} people`) : `${n} ${word}${n === 1 ? '' : 's'}`

function rank(i: number): Importance {
  return i < 2 ? 'high' : i < 5 ? 'medium' : 'low'
}

function analyse(input: TraceInput): TraceResult {
  const sentences = flattenSentences(input.content)
  const text = sentences.join(' ')

  /* People: capitalised words that behave like names. */
  const lowerSeen = new Set<string>()
  for (const s of sentences) {
    for (const m of s.matchAll(/(?<![.!?]\s)(?<!^)\b[a-z][a-z'-]{2,}\b/g)) lowerSeen.add(m[0])
  }
  const nameCounts = new Map<string, number>()
  for (const s of sentences) {
    for (const m of s.matchAll(/\b[A-Z][a-z]{2,}\b/g)) {
      const word = m[0]
      const low = word.toLowerCase()
      if (STOP.has(low) || MONTHS.includes(low) || DAYS.includes(low) || lowerSeen.has(low)) continue
      const idx = m.index ?? 0
      const atStart = idx === 0 || /[.!?]\s*$/.test(s.slice(0, idx))
      const after = s.slice(idx + word.length)
      if (atStart && !NAME_VERBS.test(after)) continue
      nameCounts.set(word, (nameCounts.get(word) ?? 0) + 1)
    }
  }
  const names = [...nameCounts.entries()]
    .filter(([, c]) => c >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([n]) => n)
  const nameSet = new Set(names.map((n) => n.toLowerCase()))

  /* Topics: repeated words and word pairs. */
  const uni = new Map<string, { count: number; surface: string }>()
  const bi = new Map<string, { count: number; surface: string }>()
  for (const s of sentences) {
    const tokens = (s.toLowerCase().match(/[a-z][a-z'-]*/g) ?? []).map((t) => t.replace(/'s$/, ''))
    const keep = tokens.map((t) => t.length >= 4 && !STOP.has(t) && !MONTHS.includes(t) && !DAYS.includes(t) && !nameSet.has(t))
    const seenU = new Set<string>()
    const seenB = new Set<string>()
    tokens.forEach((t, i) => {
      if (!keep[i]) return
      const k = stem(t)
      if (!seenU.has(k)) {
        seenU.add(k)
        const cur = uni.get(k)
        uni.set(k, { count: (cur?.count ?? 0) + 1, surface: cur?.surface ?? t })
      }
      if (keep[i + 1]) {
        const phrase = `${t} ${tokens[i + 1]}`
        const bk = `${stem(t)} ${stem(tokens[i + 1])}`
        if (!seenB.has(bk)) {
          seenB.add(bk)
          const cur = bi.get(bk)
          bi.set(bk, { count: (cur?.count ?? 0) + 1, surface: cur?.surface ?? phrase })
        }
      }
    })
  }

  const picked: { label: string; match: string; count: number }[] = []
  for (const [k, v] of [...bi.entries()].sort((a, b) => b[1].count - a[1].count)) {
    if (v.count < 2 || picked.length >= 3) break
    picked.push({ label: cap(v.surface), match: k.split(' ').map((p) => p).join(' '), count: v.count })
  }
  for (const [k, v] of [...uni.entries()].sort((a, b) => b[1].count - a[1].count || b[0].length - a[0].length)) {
    if (picked.length >= 7) break
    if (v.count < 2) break
    if (picked.some((p) => p.match.includes(k))) continue
    picked.push({ label: cap(v.surface), match: k, count: v.count })
  }
  if (picked.length < 3) {
    for (const [k, v] of [...uni.entries()].sort((a, b) => b[0].length - a[0].length)) {
      if (picked.length >= 3) break
      if (picked.some((p) => p.match.includes(k))) continue
      picked.push({ label: cap(v.surface), match: k, count: v.count })
    }
  }
  picked.sort((a, b) => b.count - a.count)

  const nodes: TraceNode[] = []
  const edges: TraceEdge[] = []

  const topicNodes: TraceNode[] = picked.map((p, i) => ({
    id: `t${i}`,
    label: p.label,
    kind: 'topic',
    importance: rank(i),
    match: [p.match],
    why: `Comes up in ${plural(sentences.filter((s) => matchesTerms(s, [p.match])).length, 'sentence')}.`,
  }))
  if (topicNodes.length === 0) {
    topicNodes.push({
      id: 't0',
      label: short(input.title.trim() || 'Overview', 22),
      kind: 'topic',
      importance: 'high',
      match: [],
      why: 'No repeated topic stood out, so the whole text is treated as one topic.',
    })
  }
  nodes.push(...topicNodes)
  const rootId = topicNodes[0].id
  for (const t of topicNodes.slice(1)) edges.push({ from: rootId, to: t.id })

  const topicFor = (sentenceIdx: number[]): TraceNode | undefined => {
    const scores = topicNodes.map((t) => ({
      t,
      n: sentenceIdx.filter((i) => matchesTerms(sentences[i], t.match)).length,
    }))
    const best = scores.sort((a, b) => b.n - a.n)[0]
    return best && best.n > 0 ? best.t : undefined
  }

  /* People */
  const personNodes: TraceNode[] = names.map((name, i) => {
    const idx = sentences.map((s, k) => (s.includes(name) ? k : -1)).filter((k) => k >= 0)
    const role =
      text.match(new RegExp(`${name}\\s*\\(([^)]{2,40})\\)`))?.[1] ??
      text.match(new RegExp(`${name},\\s+(?:the |a |an )?([^,.]{3,40}),`))?.[1]
    return {
      id: `p${i}`,
      label: name,
      kind: 'person',
      importance: rank(i),
      match: [name],
      role: role ? cap(role) : undefined,
      why: `Named in ${plural(idx.length, 'sentence')}.`,
    }
  })
  nodes.push(...personNodes)
  for (const p of personNodes) {
    const idx = sentences.map((s, k) => (s.includes(p.label) ? k : -1)).filter((k) => k >= 0)
    edges.push({ from: (topicFor(idx) ?? topicNodes[0]).id, to: p.id, relation: 'mentioned with' })
  }

  /* Decisions and open questions */
  const used = new Set<number>()
  const decisionNodes: TraceNode[] = []
  sentences.forEach((s, i) => {
    if (decisionNodes.length >= 5 || s.trim().endsWith('?') || !DECISION_RE.test(s)) return
    used.add(i)
    const label = s.replace(/^(?:we|the team|everyone)\s+(?:all\s+)?(?:agreed|decided)\s+(?:to\s+|that\s+)?/i, '').replace(/[.!]$/, '')
    decisionNodes.push({
      id: `d${decisionNodes.length}`,
      label: cap(short(label, 24)),
      kind: 'decision',
      importance: 'high',
      match: [s],
      why: s,
      when: s.match(DATE_RE)?.[0],
    })
  })
  const questionNodes: TraceNode[] = []
  sentences.forEach((s, i) => {
    if (questionNodes.length >= 4 || used.has(i)) return
    if (!(s.trim().endsWith('?') || QUESTION_RE.test(s))) return
    questionNodes.push({
      id: `q${questionNodes.length}`,
      label: cap(short(s.replace(/^(?:still unresolved|unresolved|open questions?)\s*:\s*/i, '').replace(/[.!?]$/, ''), 24)),
      kind: 'question',
      importance: 'medium',
      match: [s],
      why: s,
      when: s.match(DATE_RE)?.[0],
    })
  })
  nodes.push(...decisionNodes, ...questionNodes)

  for (const n of [...decisionNodes, ...questionNodes]) {
    const i = sentences.indexOf(n.match[0])
    const t = topicFor([i]) ?? topicNodes[0]
    edges.push({ from: t.id, to: n.id, relation: n.kind === 'decision' ? 'decided about' : 'unresolved about' })
    for (const p of personNodes) {
      if (sentences[i].includes(p.label)) edges.push({ from: p.id, to: n.id, relation: 'named in' })
    }
  }

  /* Topics that share sentences get a cross link. */
  const seen = new Set<string>()
  for (let a = 0; a < topicNodes.length; a++) {
    for (let b = a + 1; b < topicNodes.length; b++) {
      const together = sentences.filter((s) => matchesTerms(s, topicNodes[a].match) && matchesTerms(s, topicNodes[b].match)).length
      const key = `${a}|${b}`
      if (together >= 2 && !seen.has(key) && edges.length < 60 && !(a === 0)) {
        seen.add(key)
        edges.push({ from: topicNodes[a].id, to: topicNodes[b].id, relation: 'appear together' })
      }
    }
  }

  const root = topicNodes[0]
  const summary = [
    `Trace found ${plural(topicNodes.length, 'topic')} and ${plural(personNodes.length, 'person')}, with ${plural(decisionNodes.length, 'decision')} and ${plural(questionNodes.length, 'open question')}, across ${plural(sentences.length, 'sentence')}.`,
    `${root.label} comes up most often${personNodes[0] ? `, and ${personNodes[0].label} is the most mentioned person` : ''}.`,
    'This result comes from a local, rule-based reading of the text, so treat groupings as a starting point.',
  ].join(' ')

  return {
    title: input.title.trim() || 'Untitled trace',
    summary,
    rootId,
    nodes,
    edges,
    kindLabels: DEFAULT_KIND_LABELS,
  }
}
