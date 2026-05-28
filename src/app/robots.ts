import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Google-Extended",
          "FacebookBot",
          "Bytespider",
        ],
        disallow: "/",
      },
    ],
    sitemap: "https://usemere.com/sitemap.xml",
  }
}
