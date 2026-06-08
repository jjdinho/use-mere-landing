import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"
import {
  DOC_SLUGS,
  getDocNavItem,
  isDocSlug,
  type DocNavItem,
} from "@/lib/docs-nav"

const DOCS_DIR = path.join(process.cwd(), "docs")

export interface DocPage extends DocNavItem {
  html: string
  section: string
}

function getMarkdownPath(slug: string): string {
  if (!slug) return path.join(DOCS_DIR, "index.md")

  const directPath = path.join(DOCS_DIR, `${slug}.md`)
  if (fs.existsSync(directPath)) return directPath

  return path.join(DOCS_DIR, slug, "index.md")
}

export function getDocPage(slug: string): DocPage | null {
  if (!isDocSlug(slug)) return null

  const navItem = getDocNavItem(slug)
  const filePath = getMarkdownPath(slug)
  if (!navItem || !fs.existsSync(filePath)) return null

  const source = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(source)
  const html = marked.parse(content, { async: false }) as string

  return {
    ...navItem,
    title: data.title ?? navItem.title,
    description: data.description ?? navItem.description,
    section: data.section ?? "",
    html,
  }
}

export function getDocStaticParams() {
  return DOC_SLUGS.map((slug) => ({
    slug: slug ? slug.split("/") : [],
  }))
}
