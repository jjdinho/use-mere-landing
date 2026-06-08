import type { MetadataRoute } from "next"
import { DOC_SLUGS } from "@/lib/docs-nav"

export const dynamic = "force-static"

const BASE_URL = "https://usemere.com"

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
