/** Split raw text into paragraphs (one per line) of sentences. Shared by the engine and the source panel. */
export function splitSentences(line: string): string[] {
  return line
    .split(/(?<=[.!?])\s+(?=[A-Z"'(\[0-9])/)
    .map((s) => s.trim())
    .filter(Boolean)
}

export function splitBlocks(content: string): string[][] {
  return content
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map(splitSentences)
}

export function flattenSentences(content: string): string[] {
  return splitBlocks(content).flat()
}

export function matchesTerms(sentence: string, match: string[]): boolean {
  const s = sentence.toLowerCase()
  return match.some((m) => m.length > 0 && s.includes(m.toLowerCase()))
}

export function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}
