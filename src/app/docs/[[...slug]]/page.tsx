import { DocsContent } from "@/components/docs-content"
import { getDocPage, getDocStaticParams } from "@/lib/docs"
import { notFound } from "next/navigation"

export const dynamicParams = false

export function generateStaticParams() {
  return getDocStaticParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await params
  const resolvedSlug = slug?.join("/") ?? ""
  const page = getDocPage(resolvedSlug)

  if (!page) {
    return {
      title: "Docs | Mere Analytics",
    }
  }

  const path = resolvedSlug ? `/docs/${resolvedSlug}` : "/docs"

  return {
    title: `${page.title} | Mere Docs`,
    description: page.description,
    alternates: { canonical: `https://usemere.com${path}` },
  }
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await params
  const resolvedSlug = slug?.join("/") ?? ""
  const page = getDocPage(resolvedSlug)

  if (!page) notFound()

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
      <div className="max-w-3xl w-full">
        <DocsContent html={page.html} />
      </div>
    </div>
  )
}
