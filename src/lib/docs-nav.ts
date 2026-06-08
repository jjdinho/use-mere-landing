export interface DocNavItem {
  title: string
  slug: string
  description: string
  keywords: string[]
}

export interface DocNavSection {
  title: string
  slug: string
  icon: "book" | "code" | "play" | "sparkles"
  items: DocNavItem[]
}

export const DOC_NAV: DocNavSection[] = [
  {
    title: "Docs",
    slug: "",
    icon: "book",
    items: [
      {
        title: "Overview",
        slug: "",
        description: "Browse Mere install guides, API reference, playbooks, and agent skill documentation.",
        keywords: ["overview", "docs", "documentation"],
      },
      {
        title: "Quick Start",
        slug: "quick-start",
        description: "Install Mere, send your first event, and verify the integration.",
        keywords: ["quick start", "setup", "first event", "verify"],
      },
      {
        title: "Installation",
        slug: "installation",
        description: "Manual setup options for HTML, React, Next.js, and environment configuration.",
        keywords: ["install", "npm", "html", "react", "next", "configuration"],
      },
    ],
  },
  {
    title: "API Reference",
    slug: "api-reference",
    icon: "code",
    items: [
      {
        title: "Overview",
        slug: "api-reference",
        description: "Overview of the Mere SDK and HTTP API reference.",
        keywords: ["api", "reference", "sdk", "rest"],
      },
      {
        title: "JavaScript SDK",
        slug: "javascript-sdk",
        description: "Browser SDK methods for initialization, event capture, identity, and shared properties.",
        keywords: ["javascript", "sdk", "init", "capture", "identify"],
      },
      {
        title: "REST API",
        slug: "rest-api",
        description: "HTTP API conventions, authentication, events, and errors.",
        keywords: ["rest", "http", "authentication", "events", "errors"],
      },
    ],
  },
  {
    title: "Playbooks",
    slug: "playbooks",
    icon: "play",
    items: [
      {
        title: "Overview",
        slug: "playbooks",
        description: "Repeatable workflows for common product analytics jobs.",
        keywords: ["playbooks", "workflow", "analytics"],
      },
      {
        title: "Weekly Digest",
        slug: "playbooks/weekly-digest",
        description: "Summarize the most important product metrics for the past week.",
        keywords: ["weekly", "digest", "metrics", "summary"],
      },
      {
        title: "Launch Review",
        slug: "playbooks/launch-review",
        description: "Measure adoption and downstream behavior after a release.",
        keywords: ["launch", "release", "adoption", "retention"],
      },
    ],
  },
  {
    title: "Agent Skills",
    slug: "agent-skills",
    icon: "sparkles",
    items: [
      {
        title: "Overview",
        slug: "agent-skills",
        description: "Documentation for packaging Mere workflows as reusable agent skills.",
        keywords: ["agent", "skills", "workflow"],
      },
      {
        title: "Authoring Skills",
        slug: "agent-skills/authoring",
        description: "How to write skill instructions that agents can reliably follow.",
        keywords: ["authoring", "skill", "instructions"],
      },
      {
        title: "Skill Catalog",
        slug: "agent-skills/catalog",
        description: "How the docs site should present available agent skills.",
        keywords: ["catalog", "generated", "skill"],
      },
    ],
  },
]

export const DOC_PAGES = DOC_NAV.flatMap((section) => section.items)

export const DOC_SLUGS = DOC_PAGES.map((page) => page.slug)

export function getDocNavItem(slug: string): DocNavItem | undefined {
  return DOC_PAGES.find((page) => page.slug === slug)
}

export function isDocSlug(slug: string): boolean {
  return DOC_SLUGS.includes(slug)
}

