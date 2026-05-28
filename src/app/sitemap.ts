import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const BASE_URL = "https://usemere.com"

const DOC_SLUGS = [
  "",
  "quick-start",
  "installation",
  "auto-track",
  "custom-events",
  "identify-users",
  "ai-agents",
  "dashboards",
  "session-recordings",
  "signals",
  "slack",
  "email",
  "mcp-cli-setup",
  "mcp-cli",
  "javascript-sdk",
  "rest-api",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ]

  const docPages: MetadataRoute.Sitemap = DOC_SLUGS.map((slug) => ({
    url: slug ? `${BASE_URL}/docs/${slug}` : `${BASE_URL}/docs`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...docPages]
}
