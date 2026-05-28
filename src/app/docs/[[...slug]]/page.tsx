import { DocsContent } from "@/components/docs-content"

const SLUGS = [
  [],
  ["quick-start"],
  ["installation"],
  ["auto-track"],
  ["custom-events"],
  ["identify-users"],
  ["ai-agents"],
  ["dashboards"],
  ["session-recordings"],
  ["signals"],
  ["slack"],
  ["email"],
  ["mcp-cli-setup"],
  ["mcp-cli"],
  ["javascript-sdk"],
  ["rest-api"],
]

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }))
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await params
  const resolvedSlug = slug?.join("/") ?? ""

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
      <div className="max-w-3xl">
        <DocsContent slug={resolvedSlug} />
      </div>
    </div>
  )
}
