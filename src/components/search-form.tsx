"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { SidebarInput } from "@/components/ui/sidebar"
import { SearchIcon } from "lucide-react"
import { search, type SearchResult } from "@/lib/search"

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query || query.length < 2) return <>{text}</>
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-200/60 dark:bg-yellow-500/30 rounded-sm">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}

function truncateAround(text: string, query: string, maxLen: number): string {
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1 || text.length <= maxLen) return text.slice(0, maxLen)
  const start = Math.max(0, idx - 30)
  const slice = text.slice(start, start + maxLen)
  return (start > 0 ? "..." : "") + slice + (start + maxLen < text.length ? "..." : "")
}

export function SearchForm({ className, ...props }: React.ComponentProps<"form">) {
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(-1)
  const containerRef = React.useRef<HTMLFormElement>(null)
  const debounceRef = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setQuery(value)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const hits = search(value)
      setResults(hits)
      setIsOpen(value.trim().length >= 2)
      setActiveIndex(-1)
    }, 150)
  }

  function navigateTo(slug: string) {
    setIsOpen(false)
    setQuery("")
    setResults([])
    window.location.href = slug ? `/docs/${slug}` : "/docs"
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => (i < results.length - 1 ? i + 1 : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => (i > 0 ? i - 1 : results.length - 1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (activeIndex >= 0 && activeIndex < results.length) {
        navigateTo(results[activeIndex].entry.slug)
      }
    } else if (e.key === "Escape") {
      setIsOpen(false)
      setQuery("")
      setResults([])
    }
  }

  return (
    <form
      ref={containerRef}
      className={className}
      {...props}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
          id="search"
          placeholder="Type to search..."
          className="h-8 pl-7"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 z-50 w-80 max-h-80 overflow-y-auto rounded-lg border bg-background shadow-lg">
            {results.length === 0 ? (
              <div className="px-3 py-4 text-sm text-muted-foreground text-center">
                No results found
              </div>
            ) : (
              <ul role="listbox">
                {results.map((result, i) => (
                  <li key={result.entry.slug} role="option" aria-selected={i === activeIndex}>
                    <a
                      href={result.entry.slug ? `/docs/${result.entry.slug}` : "/docs"}
                      className={`block px-3 py-2 text-sm transition-colors hover:bg-muted/50 ${
                        i === activeIndex ? "bg-muted/50" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault()
                        navigateTo(result.entry.slug)
                      }}
                      onMouseEnter={() => setActiveIndex(i)}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-medium">
                          <HighlightMatch text={result.entry.title} query={query} />
                        </span>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {result.entry.section}
                        </span>
                      </div>
                      {result.matchField === "content" && (
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          <HighlightMatch
                            text={truncateAround(result.entry.content, query, 100)}
                            query={query}
                          />
                        </p>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </form>
  )
}
