"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"
import {
  BookOpenIcon,
  MousePointerClickIcon,
  SparklesIcon,
  RadarIcon,
  PlugIcon,
  CodeIcon,
} from "lucide-react"

const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "/docs",
      icon: <BookOpenIcon />,
      isActive: true,
      items: [
        { title: "Introduction", url: "/docs" },
        { title: "Quick Start", url: "/docs/quick-start" },
        { title: "Installation", url: "/docs/installation" },
      ],
    },
    {
      title: "Tracking",
      url: "/docs/auto-track",
      icon: <MousePointerClickIcon />,
      items: [
        { title: "Auto-track", url: "/docs/auto-track" },
        { title: "Custom events", url: "/docs/custom-events" },
        { title: "Identify users", url: "/docs/identify-users" },
      ],
    },
    {
      title: "Insights",
      url: "/docs/ai-agents",
      icon: <SparklesIcon />,
      items: [
        { title: "AI Agents", url: "/docs/ai-agents" },
        { title: "Dashboards", url: "/docs/dashboards" },
        { title: "Session recordings", url: "/docs/session-recordings" },
      ],
    },
    {
      title: "Signals",
      url: "/docs/signals",
      icon: <RadarIcon />,
      items: [
        { title: "Overview", url: "/docs/signals" },
      ],
    },
    {
      title: "Integrations",
      url: "/docs/slack",
      icon: <PlugIcon />,
      items: [
        { title: "Slack", url: "/docs/slack" },
        { title: "Email", url: "/docs/email" },
        { title: "MCP + CLI Setup", url: "/docs/mcp-cli-setup" },
        { title: "MCP + CLI Reference", url: "/docs/mcp-cli" },
      ],
    },
    {
      title: "API Reference",
      url: "/docs/javascript-sdk",
      icon: <CodeIcon />,
      items: [
        { title: "JavaScript SDK", url: "/docs/javascript-sdk" },
        { title: "REST API", url: "/docs/rest-api" },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
