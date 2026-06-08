"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"
import { DOC_NAV } from "@/lib/docs-nav"
import {
  BookOpenIcon,
  SparklesIcon,
  CodeIcon,
  PlaySquareIcon,
} from "lucide-react"

const icons = {
  book: <BookOpenIcon />,
  code: <CodeIcon />,
  play: <PlaySquareIcon />,
  sparkles: <SparklesIcon />,
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const items = DOC_NAV.map((section) => ({
    title: section.title,
    url: section.slug ? `/docs/${section.slug}` : "/docs",
    icon: icons[section.icon],
    items: section.items.map((item) => ({
      title: item.title,
      url: item.slug ? `/docs/${item.slug}` : "/docs",
    })),
  }))

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
    </Sidebar>
  )
}
