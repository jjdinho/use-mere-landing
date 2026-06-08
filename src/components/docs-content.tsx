export function DocsContent({ html }: { html: string }) {
  return (
    <article
      className="docs-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

