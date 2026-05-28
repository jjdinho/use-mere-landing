// Keep in sync with docs-content.tsx

export interface SearchEntry {
  slug: string
  title: string
  section: string
  content: string
  keywords: string[]
}

export const SEARCH_INDEX: SearchEntry[] = [
  {
    slug: "",
    title: "Introduction",
    section: "Getting Started",
    content:
      "Mere Analytics is a product analytics platform. Drop in a single script tag to capture page views, clicks, form submissions, and full session recordings. Features include auto-tracking, session recordings with rrweb, an AI agent for natural language queries, smart events, and MCP integration.",
    keywords: ["overview", "about", "what is", "getting started", "home"],
  },
  {
    slug: "quick-start",
    title: "Quick Start",
    section: "Getting Started",
    content:
      "Get Mere Analytics running in under 5 minutes. Sign up for a free account, paste the script tag snippet into your HTML head, and verify events appear in the dashboard. Enable debug mode to log captured events to the browser console.",
    keywords: ["setup", "start", "5 minutes", "snippet", "script tag", "begin"],
  },
  {
    slug: "installation",
    title: "Installation",
    section: "Getting Started",
    content:
      "Install Mere Analytics via HTML snippet, npm package for JavaScript, React provider and hooks, or Vue plugin and composables. Configure options like debug mode, opt-out, input masking, and granular autocapture control. Track custom events and identify users.",
    keywords: [
      "install",
      "npm",
      "react",
      "vue",
      "provider",
      "snippet",
      "package",
      "config",
      "options",
      "configuration",
    ],
  },
  {
    slug: "auto-track",
    title: "Auto-track",
    section: "Tracking",
    content:
      "Automatically capture page views including SPA navigations, clicks on interactive elements, and form submissions. Every event is enriched with browser, OS, device type, screen size, timezone, and locale properties. Disable individual features with granular autocapture config.",
    keywords: [
      "autocapture",
      "automatic",
      "pageview",
      "click",
      "form",
      "events",
      "properties",
    ],
  },
  {
    slug: "custom-events",
    title: "Custom Events",
    section: "Tracking",
    content:
      "Track product-specific events with Mere Analytics.capture(). Events are buffered in batches of 10 or flushed every 5 seconds. Use register() and registerOnce() to attach properties to every subsequent event. Examples include feature usage, purchases, search, and errors.",
    keywords: [
      "capture",
      "track",
      "event",
      "buffer",
      "batch",
      "register",
      "flush",
    ],
  },
  {
    slug: "identify-users",
    title: "Identify users",
    section: "Tracking",
    content:
      "Link events to known users with identify(). Identification is forward-only. Call reset() on logout to clear identity and start a new session. Identity data is persisted in localStorage. PII in auto-captured text is automatically masked.",
    keywords: [
      "identify",
      "user",
      "login",
      "logout",
      "reset",
      "anonymous",
      "privacy",
      "PII",
      "traits",
    ],
  },
  {
    slug: "ai-agents",
    title: "AI Agents",
    section: "Insights",
    content:
      "Built-in AI agent for exploring analytics data using natural language. Ask questions, create dashboards, and analyze sessions. Runs within Rails authentication context with row-level security. Agent tools include query, dashboard, alert, and recording analyzer.",
    keywords: [
      "AI",
      "agent",
      "natural language",
      "query",
      "ask",
      "chat",
      "assistant",
      "ruby_llm",
    ],
  },
  {
    slug: "dashboards",
    title: "Dashboards",
    section: "Insights",
    content:
      "At-a-glance view of product metrics. Overview shows total events, unique users, sessions, and bounce rate. Create trends with breakdowns by URL, browser, OS, device type, or country. Define smart events retroactively from autocapture data with match operators. Configurable date ranges and filters.",
    keywords: [
      "dashboard",
      "metrics",
      "trends",
      "breakdown",
      "smart events",
      "funnel",
      "chart",
      "visualization",
    ],
  },
  {
    slug: "session-recordings",
    title: "Session Recordings",
    section: "Insights",
    content:
      "Full DOM replay powered by rrweb. Captures mouse movements, clicks, scrolls, form interactions, and page transitions.",
    keywords: [
      "recording",
      "replay",
      "rrweb",
      "DOM",
      "playback",
      "video",
      "watch",
      "mask",
      "privacy",
    ],
  },
  {
    slug: "slack",
    title: "Slack",
    section: "Integrations",
    content:
      "Slack integration for Mere Analytics. Currently in development — coming soon.",
    keywords: ["slack", "notification", "integration", "coming soon"],
  },
  {
    slug: "email",
    title: "Email",
    section: "Integrations",
    content:
      "Email integration for Mere Analytics. Currently in development — coming soon.",
    keywords: ["email", "notification", "integration", "coming soon"],
  },
  {
    slug: "mcp-cli-setup",
    title: "MCP + CLI Setup",
    section: "Integrations",
    content:
      "Connect Mere Analytics to Claude Code, Cursor, or any MCP-compatible AI assistant. Add the MCP server with a single command, authenticate via OAuth 2.0 PKCE flow, and verify the connection. Available tools include query, get_schema, list_events, get_event_definitions, and get_property_definitions.",
    keywords: [
      "MCP",
      "CLI",
      "Claude Code",
      "Cursor",
      "OAuth",
      "setup",
      "connect",
      "AI assistant",
    ],
  },
  {
    slug: "mcp-cli",
    title: "MCP + CLI Reference",
    section: "Integrations",
    content:
      "Full reference for the Mere Analytics MCP server. Available tools: query, get_schema, list_events, get_event_definitions, get_property_definitions. OAuth scopes for granular access control. Uses JSON-RPC 2.0 over HTTP POST with resources support.",
    keywords: [
      "MCP",
      "CLI",
      "reference",
      "tools",
      "scopes",
      "JSON-RPC",
      "ClickHouse",
    ],
  },
  {
    slug: "javascript-sdk",
    title: "JavaScript SDK",
    section: "API Reference",
    content:
      "Full API reference for the Mere Analytics browser SDK. Methods: init(), capture(), identify(), reset(), getDistinctId(), register(), registerOnce(). Event payload shape with automatic properties. Transport uses gzip compression and keepalive. SDK layers: inline stub under 1KB, main SDK under 30KB, rrweb recorder around 50KB.",
    keywords: [
      "SDK",
      "API",
      "JavaScript",
      "methods",
      "init",
      "capture",
      "identify",
      "browser",
      "reference",
    ],
  },
  {
    slug: "rest-api",
    title: "REST API",
    section: "API Reference",
    content:
      "REST API reference for programmatic access. Authentication via session cookies or API tokens. Cursor-based pagination. Endpoints for ingest, persons, events, sessions, insights (trends and funnels), event and property definitions, and smart events. Error codes and response format.",
    keywords: [
      "REST",
      "API",
      "HTTP",
      "endpoints",
      "curl",
      "authentication",
      "token",
      "pagination",
      "ingest",
    ],
  },
]
