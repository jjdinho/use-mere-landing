import { type SearchEntry, SEARCH_INDEX } from "./search-index"

export interface SearchResult {
  entry: SearchEntry
  matchField: "title" | "keywords" | "content"
}

export function search(query: string): SearchResult[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []

  const results: SearchResult[] = []

  for (const entry of SEARCH_INDEX) {
    if (entry.title.toLowerCase().includes(q)) {
      results.push({ entry, matchField: "title" })
    } else if (entry.keywords.some((kw) => kw.toLowerCase().includes(q))) {
      results.push({ entry, matchField: "keywords" })
    } else if (entry.content.toLowerCase().includes(q)) {
      results.push({ entry, matchField: "content" })
    }
  }

  const order: Record<SearchResult["matchField"], number> = {
    title: 0,
    keywords: 1,
    content: 2,
  }
  results.sort((a, b) => order[a.matchField] - order[b.matchField])

  return results
}
