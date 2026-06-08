import { DOC_NAV } from "@/lib/docs-nav"

export interface SearchEntry {
  slug: string
  title: string
  section: string
  content: string
  keywords: string[]
}

export const SEARCH_INDEX: SearchEntry[] = DOC_NAV.flatMap((section) =>
  section.items.map((item) => ({
    slug: item.slug,
    title: item.title,
    section: section.title,
    content: item.description,
    keywords: item.keywords,
  }))
)
