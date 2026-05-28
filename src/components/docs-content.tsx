"use client"

import { useState } from "react"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="absolute top-2 right-2 rounded-md border bg-background px-2 py-1 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  )
}

function CodeBlock({ children, lang }: { children: string; lang?: string }) {
  return (
    <div className="group relative">
      <pre className="overflow-x-auto rounded-lg border bg-muted/50 p-4 text-sm leading-relaxed">
        <code>{children}</code>
      </pre>
      <CopyButton text={children} />
    </div>
  )
}

function H1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-3xl font-bold tracking-tight">{children}</h1>
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold tracking-tight mt-10 mb-3">{children}</h2>
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold mt-6 mb-2">{children}</h3>
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground leading-relaxed">{children}</p>
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
      {children}
    </code>
  )
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            {headers.map((h) => (
              <th key={h} className="text-left py-2 pr-4 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="py-2 pr-4 text-muted-foreground">
                  <code className="text-xs">{cell}</code>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Introduction
// ---------------------------------------------------------------------------

function Introduction() {
  return (
    <div className="flex flex-col gap-4">
      <H1><span className="font-mono">Mere Analytics</span> Documentation</H1>
      <P>
        <span className="font-mono">Mere Analytics</span> is a product analytics platform that gives you full visibility into how users interact with your web application. Drop in a single script tag and immediately start capturing page views, clicks, form submissions, and full session recordings — no manual instrumentation required.
      </P>

      <H2>Install wizard</H2>
      <P>
        The fastest way to get started. Run a single command and the wizard auto-detects your framework, installs the right packages, writes your project token to an env file, and sends a test event to verify the connection.
      </P>
      <CodeBlock>{`npx @mere/install-wizard`}</CodeBlock>

      <H2>Core features</H2>

      <H3>Auto-tracking</H3>
      <P>
        Automatically captures page views (including SPA navigations), clicks, and form submissions with rich element metadata. No code changes needed beyond the initial snippet.
      </P>

      <H3>Session recordings</H3>
      <P>
        Full DOM replay powered by rrweb. Watch exactly what your users see, with privacy masking enabled by default for all input fields.
      </P>

      <H3>AI agents</H3>
      <P>
        Ask questions about your data in natural language. The built-in AI agent can query your analytics data, create dashboards, analyze session recordings, and surface insights — all within your existing authentication context.
      </P>

      <H3>Smart events</H3>
      <P>
        Define meaningful events retroactively from your autocapture data. Create smart events based on element selectors, page URLs, or any captured property — then use them in trends and funnels just like custom events.
      </P>

      <H3>MCP integration</H3>
      <P>
        Connect your analytics data to any MCP-compatible AI assistant. Query events, explore schema, and run analyses directly from tools like Claude Code.
      </P>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <a
          href="/docs/quick-start"
          className="group rounded-lg border p-4 transition-colors hover:bg-muted/50"
        >
          <h2 className="font-semibold mb-1">Quick Start</h2>
          <p className="text-sm text-muted-foreground">
            Get up and running with <span className="font-mono">Mere Analytics</span> in under 5 minutes.
          </p>
        </a>
        <a
          href="/docs/auto-track"
          className="group rounded-lg border p-4 transition-colors hover:bg-muted/50"
        >
          <h2 className="font-semibold mb-1">Auto-track</h2>
          <p className="text-sm text-muted-foreground">
            Automatically capture clicks, page views, and form interactions.
          </p>
        </a>
        <a
          href="/docs/ai-agents"
          className="group rounded-lg border p-4 transition-colors hover:bg-muted/50"
        >
          <h2 className="font-semibold mb-1">AI Agents</h2>
          <p className="text-sm text-muted-foreground">
            Let AI surface the insights that matter from your session data.
          </p>
        </a>
        <a
          href="/docs/javascript-sdk"
          className="group rounded-lg border p-4 transition-colors hover:bg-muted/50"
        >
          <h2 className="font-semibold mb-1">JavaScript SDK</h2>
          <p className="text-sm text-muted-foreground">
            Full API reference for the <span className="font-mono">Mere Analytics</span> browser SDK.
          </p>
        </a>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Quick Start
// ---------------------------------------------------------------------------

function QuickStart() {
  return (
    <div className="flex flex-col gap-4">
      <H1>Quick Start</H1>
      <P>
        Get <span className="font-mono">Mere Analytics</span> running on your site in under 5 minutes. No build step required — just paste a script tag and start collecting data.
      </P>

      <H2>1. Sign Up</H2>
      <P>
        Create a free account at{" "}
        <a href="https://app.usemere.com/register" className="underline hover:text-foreground">
          app.usemere.com
        </a>
        . After signing up, you&apos;ll get a project token that looks like{" "}
        <InlineCode>sv_pub_...</InlineCode>.
      </P>

      <H2>2. Run the Install Wizard</H2>
      <P>
        The wizard auto-detects your project&apos;s framework and package manager, installs the SDK, saves your token, and sends a test event — all in one step.
      </P>
      <CodeBlock>{`npx @mere/install-wizard`}</CodeBlock>
      <P>
        It supports Next.js, React, Vue, Nuxt, static HTML, Rails, Django, Flask, and Node.js. If you have an existing analytics SDK (PostHog, Mixpanel, Segment, Amplitude), the wizard will flag it so you can migrate at your own pace.
      </P>
      <P>
        After running, check <InlineCode>.Mere Analytics/INSTALL.md</InlineCode> in your project for framework-specific instructions. If you prefer to set things up manually, skip to the next step.
      </P>
      <Table
        headers={["Option", "Description"]}
        rows={[
          ["--token <token>", "Pass your project token directly (skip the prompt)"],
          ["--frontend-only", "Only set up browser-side tracking"],
          ["--backend-only", "Only set up server-side tracking"],
          ["--dry-run", "Preview changes without writing any files"],
          ["--no-install", "Skip package installation"],
        ]}
      />

      <H2>3. Add the Snippet (manual)</H2>
      <P>
        If you didn&apos;t use the install wizard, paste this snippet into the <InlineCode>{"<head>"}</InlineCode> of every page you want to track:
      </P>
      <CodeBlock>{`<script>
!function(){"use strict";!function(s,n){const t=n.Mere Analytics;
if(t&&t.__SV)return;const e={_i:[],_q:[],init:function(n,t){
e._i.push([n,t]);const i=["capture","identify","reset",
"getDistinctId","register","registerOnce"];for(const s of i)
e[s]=function(...n){e._q.push([s,...n])};const o=s.createElement("script");
o.async=!0;const c=t?.version||"latest";
o.src=(t?.apiHost||"https://cdn.usemere.com")+"/"+
(/^\\d/.test(c)?"v"+c:c)+"/Mere Analytics.min.js";
const r=s.getElementsByTagName("script")[0];
r&&r.parentNode?r.parentNode.insertBefore(o,r):
s.head.appendChild(o)}};n.Mere Analytics=e}(document,window)}();

Mere Analytics.init('YOUR_PROJECT_TOKEN');
</script>`}</CodeBlock>

      <P>
        Replace <InlineCode>YOUR_PROJECT_TOKEN</InlineCode> with the token from your project settings.
      </P>

      <H2>4. Verify</H2>
      <P>
        Visit your site, click around, and navigate between pages. Then open your <span className="font-mono">Mere Analytics</span> dashboard — you should see <InlineCode>$pageview</InlineCode>, <InlineCode>$click</InlineCode>, and <InlineCode>$form_submit</InlineCode> events appearing within seconds.
      </P>
      <P>
        Enable <InlineCode>debug: true</InlineCode> in the config to log all captured events to the browser console:
      </P>
      <CodeBlock>{`Mere Analytics.init('YOUR_PROJECT_TOKEN', { debug: true });`}</CodeBlock>

      <H2>5. Identify users</H2>
      <P>
        When a user logs in, call <InlineCode>identify()</InlineCode> to link their activity to a user ID. All future events will be associated with this user.
      </P>
      <CodeBlock>{`Mere Analytics.identify('user_123', {
  email: 'jane@example.com',
  name: 'Jane Doe',
  plan: 'pro',
});`}</CodeBlock>
      <P>
        Call <InlineCode>reset()</InlineCode> on logout to clear the identity and start a new anonymous session.
      </P>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Installation
// ---------------------------------------------------------------------------

function Installation() {
  return (
    <div className="flex flex-col gap-4">
      <H1>Installation</H1>
      <P>
        Choose the installation method that fits your stack. All methods initialize the SDK with autocapture for pageviews, clicks, and forms.
      </P>

      <H2>HTML Snippet</H2>
      <P>
        The simplest approach — paste this into your HTML <InlineCode>{"<head>"}</InlineCode>. The stub is under 1KB and loads the full SDK asynchronously from the CDN.
      </P>
      <CodeBlock>{`<script>
!function(){"use strict";!function(s,n){const t=n.Mere Analytics;if(t&&t.__SV)return;const e={_i:[],_q:[],init:function(n,t){e._i.push([n,t]);const i=["capture","identify","reset","getDistinctId","register","registerOnce"];for(const s of i)e[s]=function(...n){e._q.push([s,...n])};const o=s.createElement("script");o.async=!0;const c=t?.version||"latest";o.src=(t?.apiHost||"https://cdn.usemere.com")+"/"+(/^\\d/.test(c)?"v"+c:c)+"/Mere Analytics.min.js";const r=s.getElementsByTagName("script")[0];r&&r.parentNode?r.parentNode.insertBefore(o,r):s.head.appendChild(o)}};n.Mere Analytics=e}(document,window)}();
Mere Analytics.init('YOUR_TOKEN_HERE');
</script>`}</CodeBlock>

      <H2>JavaScript Web</H2>
      <CodeBlock>{`npm install @mere/core`}</CodeBlock>
      <P>Then initialize in your app entry point:</P>
      <CodeBlock>{`import Mere Analytics from '@mere/core'

Mere Analytics.init('YOUR_TOKEN_HERE', {
  debug: import.meta.env.DEV,
})`}</CodeBlock>

      <H2>React</H2>
      <P>
        The React integration provides a context provider and hooks. Wrap your app in <InlineCode>Mere AnalyticsProvider</InlineCode> to initialize the SDK once:
      </P>
      <CodeBlock>{`npm install @mere/core`}</CodeBlock>
      <P>Set up the provider in your entry point:</P>
      <CodeBlock>{`import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Mere AnalyticsProvider } from '@mere/core/react';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Mere AnalyticsProvider
      apiKey="YOUR_TOKEN_HERE"
      options={{ debug: import.meta.env.DEV }}
    >
      <App />
    </Mere AnalyticsProvider>
  </StrictMode>,
);`}</CodeBlock>
      <P>Use hooks in any component to track events:</P>
      <CodeBlock>{`import { useCapture } from '@mere/core/react';

function PricingCard({ plan }: { plan: string }) {
  const capture = useCapture();

  return (
    <button onClick={() => capture('plan_selected', { plan })}>
      Select {plan}
    </button>
  );
}`}</CodeBlock>

      <H2>Vue</H2>
      <P>
        Add the Vue plugin to your root app to initialize <span className="font-mono">Mere Analytics</span> once. Composables such as <InlineCode>useCapture</InlineCode> are then available throughout your SFCs.
      </P>
      <CodeBlock>{`npm install @mere/core`}</CodeBlock>
      <P>Register the plugin in your entry point:</P>
      <CodeBlock>{`import { createApp } from 'vue';
import { createMere Analytics } from '@mere/core/vue';
import App from './App.vue';

const app = createApp(App);

app.use(createMere Analytics('YOUR_TOKEN_HERE', {
  debug: import.meta.env.DEV,
}));

app.mount('#app');`}</CodeBlock>
      <P>Track events in any component:</P>
      <CodeBlock>{`<script setup lang="ts">
import { useCapture } from '@mere/core/vue';

const capture = useCapture();
</script>

<template>
  <button @click="capture('plan_selected', { plan })">
    Select plan
  </button>
</template>`}</CodeBlock>

      <H2>Track Custom Events</H2>
      <P>
        <span className="font-mono">Mere Analytics</span> automatically captures pageviews, clicks, and form submissions. You can also track custom events:
      </P>
      <CodeBlock>{`Mere Analytics.capture('my_custom_event', { property: 'value' })`}</CodeBlock>

      <H2>Identify users</H2>
      <P>
        When a user logs in, associate their activity with their user ID and traits. User traits let you segment users by properties like plan, role, or signup date.
      </P>
      <CodeBlock>{`// Call identify after user logs in
Mere Analytics.identify('user_123', {
  email: 'user@example.com',
  name: 'Jane Doe',
  plan: 'pro',
  created_at: '2024-01-15',
})`}</CodeBlock>

      <H2>Configuration Options</H2>
      <Table
        headers={["Option", "Default", "Description"]}
        rows={[
          ["apiHost", "https://cdn.usemere.com", "CDN endpoint for SDK loading"],
          ["ingestHost", "https://app.usemere.com", "API endpoint for event ingestion"],
          ["version", "latest", "SDK version to load from CDN"],
          ["debug", "false", "Log all events to the browser console"],
          ["optOut", "false", "Disable all tracking (for consent management)"],
          ["maskAllInputs", "true", "Mask all input values in session recordings"],
          ["autocapture", "true", "Enable/disable automatic event capture"],
        ]}
      />

      <H3>Autocapture Granular Control</H3>
      <P>
        Pass an object instead of a boolean to control individual autocapture features:
      </P>
      <CodeBlock>{`Mere Analytics.init('YOUR_TOKEN_HERE', {
  autocapture: {
    pageview: true,
    clicks: true,
    formSubmit: false, // disable form tracking
  },
})`}</CodeBlock>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Auto-track
// ---------------------------------------------------------------------------

function AutoTrack() {
  return (
    <div className="flex flex-col gap-4">
      <H1>Auto-track</H1>
      <P>
        <span className="font-mono">Mere Analytics</span> automatically captures user interactions without any manual instrumentation. Once the SDK is installed, page views, clicks, and form submissions are tracked with rich metadata.
      </P>

      <H2>Page Views</H2>
      <P>
        The <InlineCode>$pageview</InlineCode> event fires on initial page load and on every page navigation. Any duplicate pageviews for the same URL are automatically deduplicated.
      </P>
      <Table
        headers={["Property", "Description"]}
        rows={[
          ["$current_url", "Full URL of the page"],
          ["$referrer", "Document referrer"],
          ["$title", "Page title"],
        ]}
      />

      <H2>Clicks</H2>
      <P>
        The <InlineCode>$click</InlineCode> event fires when a user clicks on any interactive element. <span className="font-mono">Mere Analytics</span> uses a capturing event listener and walks up the DOM to find the nearest interactive parent (button, link, etc.).
      </P>
      <Table
        headers={["Property", "Description"]}
        rows={[
          ["$element_tag", "HTML tag name (e.g. BUTTON, A)"],
          ["$element_text", "Visible text content (PII auto-masked)"],
          ["$element_classes", "CSS class list"],
          ["$element_id", "Element ID attribute"],
          ["$element_selector", "Generated CSS selector path"],
          ["$element_href", "Link href attribute (for anchor elements)"],
        ]}
      />

      <H2>Form Submissions</H2>
      <P>
        The <InlineCode>$form_submit</InlineCode> event fires when a form is submitted. Only form metadata is captured — input values are never collected.
      </P>
      <Table
        headers={["Property", "Description"]}
        rows={[
          ["$form_id", "Form ID attribute"],
          ["$form_action", "Form action URL"],
          ["$form_method", "HTTP method (GET/POST)"],
          ["$form_name", "Form name attribute"],
        ]}
      />

      <H2>Automatic Properties</H2>
      <P>
        Every event — including custom events — is enriched with these properties automatically:
      </P>
      <Table
        headers={["Property", "Description"]}
        rows={[
          ["$browser", "Browser name"],
          ["$browser_version", "Browser version"],
          ["$os", "Operating system"],
          ["$device_type", "Device type (desktop, mobile, tablet)"],
          ["$screen_width", "Screen width in pixels"],
          ["$screen_height", "Screen height in pixels"],
          ["$viewport_width", "Viewport width"],
          ["$viewport_height", "Viewport height"],
          ["$timezone", "User timezone"],
          ["$locale", "Browser locale"],
          ["$connection_type", "Network connection type"],
          ["$lib_version", "SDK version"],
          ["$current_url", "Current page URL"],
          ["$referrer", "Page referrer"],
        ]}
      />

      <H2>Disabling Individual Features</H2>
      <P>
        Pass an autocapture config object to disable specific features while keeping others active:
      </P>
      <CodeBlock>{`Mere Analytics.init('YOUR_PROJECT_TOKEN', {
  autocapture: {
    pageview: true,
    clicks: true,
    formSubmit: false, // disable form submission tracking
  },
});`}</CodeBlock>
      <P>
        Set <InlineCode>autocapture: false</InlineCode> to disable all automatic tracking. You can still use <InlineCode>capture()</InlineCode> for custom events.
      </P>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Custom Events
// ---------------------------------------------------------------------------

function CustomEvents() {
  return (
    <div className="flex flex-col gap-4">
      <H1>Custom Events</H1>
      <P>
        Use <InlineCode>Mere Analytics.capture()</InlineCode> to track events specific to your product. Custom events are enriched with the same automatic properties as auto-tracked events.
      </P>

      <H2>Basic Usage</H2>
      <CodeBlock>{`Mere Analytics.capture('button_clicked', {
  button_name: 'upgrade',
  page: 'pricing',
});`}</CodeBlock>

      <H2>Examples</H2>

      <H3>Feature Usage</H3>
      <CodeBlock>{`Mere Analytics.capture('feature_used', {
  feature: 'export_csv',
  record_count: 150,
});`}</CodeBlock>

      <H3>Purchase Flow</H3>
      <CodeBlock>{`Mere Analytics.capture('checkout_completed', {
  plan: 'pro',
  billing_cycle: 'annual',
  amount: 199,
  currency: 'USD',
});`}</CodeBlock>

      <H3>Search</H3>
      <CodeBlock>{`Mere Analytics.capture('search_performed', {
  query: searchQuery,
  results_count: results.length,
  filters_applied: activeFilters,
});`}</CodeBlock>

      <H3>Errors</H3>
      <CodeBlock>{`Mere Analytics.capture('error_occurred', {
  error_type: 'api_error',
  status_code: 500,
  endpoint: '/api/users',
});`}</CodeBlock>

      <H2>Event Buffering</H2>
      <P>
        Events are not sent immediately. The SDK buffers events and flushes them in batches for efficiency:
      </P>
      <Table
        headers={["Setting", "Value"]}
        rows={[
          ["Batch size", "10 events"],
          ["Flush interval", "5 seconds"],
          ["Max retries", "3 (on 5xx errors)"],
          ["Retry delays", "1s, 2s, 4s (exponential backoff)"],
        ]}
      />
      <P>
        Flush also triggers when the tab becomes hidden (<InlineCode>visibilitychange</InlineCode> event).
        The SDK uses <InlineCode>keepalive: true</InlineCode> on fetch requests so in-flight batches survive page transitions.
        Events are not retried on 4xx errors (client errors indicate bad data, not transient failures).
      </P>

      <H2>Registered Properties</H2>
      <P>
        Use <InlineCode>register()</InlineCode> to attach properties to every subsequent event:
      </P>
      <CodeBlock>{`// These properties will be included in all future events
Mere Analytics.register({
  app_version: '2.1.0',
  environment: 'production',
});

// registerOnce only sets if the property doesn't already exist
Mere Analytics.registerOnce({
  initial_referrer: document.referrer,
});`}</CodeBlock>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Identify Users
// ---------------------------------------------------------------------------

function IdentifyUsers() {
  return (
    <div className="flex flex-col gap-4">
      <H1>Identify Users</H1>
      <P>
        Link events to known users with <InlineCode>Mere Analytics.identify()</InlineCode>. Before identification, events are tracked with an anonymous ID. After calling identify, all future events include both the anonymous ID and the user ID.
      </P>

      <H2>Basic Usage</H2>
      <CodeBlock>{`Mere Analytics.identify('user_123', {
  email: 'jane@example.com',
  name: 'Jane Smith',
  plan: 'pro',
});`}</CodeBlock>
      <P>
        The first argument is the user ID (string). The second argument is an optional traits object — use it to attach profile data like email, name, or plan.
      </P>

      <H2>Forward-only Linking</H2>
      <P>
        Identification is forward-only. When you call <InlineCode>identify()</InlineCode>, all future events are linked to that user ID. Past anonymous events are not retroactively linked. Call identify as early as possible (e.g. right after login) to maximize coverage.
      </P>

      <H2>Reset on Logout</H2>
      <P>
        Call <InlineCode>reset()</InlineCode> when a user logs out. This clears the user ID, generates a new anonymous ID, starts a new session, and clears all registered properties.
      </P>
      <CodeBlock>{`// On logout
Mere Analytics.reset();`}</CodeBlock>

      <H2>Get Current Identity</H2>
      <CodeBlock>{`const id = Mere Analytics.getDistinctId();
// Returns userId if identified, anonymousId otherwise`}</CodeBlock>

      <H2>Storage</H2>
      <P>
        Identity data is persisted in <InlineCode>localStorage</InlineCode> so it survives page reloads:
      </P>
      <Table
        headers={["Key", "Purpose"]}
        rows={[
          ["Mere Analytics_anonymous_id", "Anonymous visitor ID (UUID v4)"],
          ["Mere Analytics_user_id", "Identified user ID"],
          ["Mere Analytics_session", "Current session data"],
          ["Mere Analytics_registered", "Registered properties"],
          ["Mere Analytics_registered_once", "Register-once properties"],
          ["Mere Analytics_config", "Cached remote config (1hr TTL)"],
        ]}
      />

      <H2>Privacy</H2>
      <P>
        PII in auto-captured element text is automatically masked using pattern detection. Emails, phone numbers, credit card numbers, and SSNs are replaced with placeholders like <InlineCode>[EMAIL]</InlineCode>, <InlineCode>[PHONE XXX-XXX-XXXX]</InlineCode>, and <InlineCode>[CARD XXXX]</InlineCode>.
      </P>
    </div>
  )
}

// ---------------------------------------------------------------------------
// AI Agents
// ---------------------------------------------------------------------------

function AIAgents() {
  return (
    <div className="flex flex-col gap-4">
      <H1>AI Agents</H1>
      <P>
        <span className="font-mono">Mere Analytics</span> includes a built-in AI agent that lets you explore your analytics data using natural language. Ask questions, create dashboards, set up alerts, and analyze sessions — no SQL or query language required.
      </P>

      <H2>Capabilities</H2>

      <H3>Natural Language Queries</H3>
      <P>
        Ask questions in plain English and get answers backed by your actual data. The agent converts your question into a query, executes it, and returns interactive visualizations you can refine iteratively.
      </P>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
        <li>&ldquo;How many users signed up this week?&rdquo;</li>
        <li>&ldquo;What&apos;s the most clicked button on the pricing page?&rdquo;</li>
        <li>&ldquo;Show me the conversion rate from signup to first purchase&rdquo;</li>
        <li>&ldquo;Which pages have the highest bounce rate?&rdquo;</li>
        <li>&ldquo;Top 10 customers by revenue&rdquo;</li>
        <li>&ldquo;Monthly order trends&rdquo;</li>
      </ul>

      <H3>Query Refinement</H3>
      <P>
        After the agent returns results, you can refine your query directly from the result card. Tags are auto-extracted from your question so you can quickly adjust filters, and you can compare multiple queries side by side in a multi-tab view.
      </P>

      <H3>Dashboard Creation</H3>
      <P>
        Ask the agent to build dashboards for you. It can create trend visualizations, breakdowns, and funnel analyses, then pin them to a new or existing dashboard.
      </P>

      <H3>Alerts</H3>
      <P>
        Set up alerts based on metric thresholds directly through the agent. Describe what you want to monitor and the agent will configure the alert for you.
      </P>

      <H3>Session Analysis</H3>
      <P>
        The agent can analyze session recordings to identify patterns in user behavior, find rage clicks, spot UX issues, and surface friction points in your product.
      </P>

      <H2>Agent Tools</H2>
      <Table
        headers={["Tool", "Description"]}
        rows={[
          ["query", "Execute read-only SQL against your analytics database"],
          ["dashboard", "Create and modify dashboard visualizations"],
          ["alert", "Set up alerts based on metric thresholds"],
          ["recording_analyzer", "Analyze session recordings for patterns"],
        ]}
      />

      <H2>Security</H2>
      <P>
        Every query the agent generates is validated before execution. Only read-only queries scoped to your project data are permitted. The agent inherits your existing authentication and project-level access controls.
      </P>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Dashboards
// ---------------------------------------------------------------------------

function Dashboards() {
  return (
    <div className="flex flex-col gap-4">
      <H1>Dashboards</H1>
      <P>
        Dashboards give you an at-a-glance view of your product metrics. Track trends, compare breakdowns, and monitor key events over time.
      </P>

      <H2>Overview Metrics</H2>
      <P>
        The default dashboard shows core metrics for your selected date range:
      </P>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
        <li>Total events captured</li>
        <li>Unique users (by distinct ID)</li>
        <li>Total sessions</li>
        <li>Bounce rate (single-pageview sessions)</li>
      </ul>

      <H2>Trends</H2>
      <P>
        Visualize event counts over time with flexible breakdowns. Select one or more events and break them down by any property:
      </P>
      <Table
        headers={["Breakdown", "Example"]}
        rows={[
          ["URL", "See which pages get the most traffic"],
          ["Browser", "Compare Chrome vs Firefox vs Safari usage"],
          ["OS", "Track desktop vs mobile operating systems"],
          ["Device type", "desktop, mobile, tablet distribution"],
          ["Country", "Geographic distribution of users"],
        ]}
      />

      <H3>Math Operations</H3>
      <Table
        headers={["Math", "Description"]}
        rows={[
          ["total", "Total count of events"],
          ["unique_persons", "Count of unique users"],
          ["unique_sessions", "Count of unique sessions"],
          ["per_session", "Average events per session"],
        ]}
      />

      <H3>Intervals</H3>
      <P>
        Group data by <InlineCode>hour</InlineCode>, <InlineCode>day</InlineCode>, <InlineCode>week</InlineCode>, or <InlineCode>month</InlineCode>.
      </P>

      <H2>Smart Events</H2>
      <P>
        Smart events let you define meaningful events retroactively from your autocapture data. Instead of adding custom tracking code, create a smart event that matches events based on properties you&apos;ve already captured.
      </P>
      <P>
        For example, define a &ldquo;Clicked Upgrade Button&rdquo; action matching <InlineCode>$click</InlineCode> events where <InlineCode>$element_text</InlineCode> contains &ldquo;Upgrade&rdquo;. This action applies retroactively to all past data and can be used in trends and funnels like any other event.
      </P>

      <H3>Matching Operators</H3>
      <P>
        Smart events support these match operators: <InlineCode>equals</InlineCode>, <InlineCode>not_equals</InlineCode>, <InlineCode>contains</InlineCode>, <InlineCode>not_contains</InlineCode>, <InlineCode>starts_with</InlineCode>, <InlineCode>ends_with</InlineCode>, <InlineCode>matches_regex</InlineCode>, <InlineCode>is_set</InlineCode>, <InlineCode>is_not_set</InlineCode>.
      </P>

      <H2>Date Ranges &amp; Filters</H2>
      <P>
        All dashboard views support configurable date ranges. Apply filters on any property to narrow your analysis — filter by URL, browser, country, device type, or any custom property.
      </P>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Session Recordings
// ---------------------------------------------------------------------------

function SessionRecordings() {
  return (
    <div className="flex flex-col gap-4">
      <H1>Session Recordings</H1>
      <P>
        Watch exactly what your users see. Session recordings capture full DOM state and replay it in the browser — mouse movements, clicks, scrolls, form interactions, and page transitions.
      </P>

      <H2>How It Works</H2>
      <P>
        Recordings are powered by <a href="https://www.rrweb.io/" className="underline hover:text-foreground">rrweb</a>, an open-source library for DOM mutation capture. The recording layer (~50KB) is loaded conditionally based on your remote config settings.
      </P>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
        <li>Full DOM snapshot on page load</li>
        <li>Incremental mutation recording during the session</li>
        <li>Periodic full snapshot every 5 minutes (for seek support)</li>
        <li>Full snapshot on SPA navigation</li>
      </ul>

      <CodeBlock>{`// Upload flow:
// 1. SDK requests presigned URL from POST /api/v1/ingest/recordings
// 2. Chunk uploaded directly to object storage
// 3. Storage path: recordings/{project_id}/{session_id}/chunk_*.json`}</CodeBlock>

      <H2>Privacy Masking</H2>
      <P>
        Privacy is on by default. All input values are masked in recordings (<InlineCode>maskAllInputs: true</InlineCode>). The SDK also auto-detects and masks PII patterns: credit cards, SSNs, phone numbers, and emails.
      </P>

      <H3>HTML Attributes</H3>
      <P>
        Use these attributes on any HTML element for fine-grained control:
      </P>
      <Table
        headers={["Attribute", "Effect"]}
        rows={[
          ["data-Mere Analytics-mask", "Force mask this element in recordings"],
          ["data-Mere Analytics-unmask", "Explicitly allow capture of this element"],
        ]}
      />
      <CodeBlock>{`<!-- Mask a specific section -->
<div data-Mere Analytics-mask>
  <p>This content will be hidden in recordings</p>
</div>

<!-- Unmask a specific input (use with caution) -->
<input data-Mere Analytics-unmask placeholder="Search..." />`}</CodeBlock>

      <H2>Sample Rate</H2>
      <P>
        Control what percentage of sessions are recorded via remote config. Set the sample rate from 0 to 1 (e.g., <InlineCode>0.25</InlineCode> for 25% of sessions). This is configured server-side and does not require SDK changes.
      </P>

      <H2>Playback</H2>
      <P>
        Recordings are played back in the <span className="font-mono">Mere Analytics</span> dashboard with full timeline scrubbing. Events captured during the session are overlaid on the timeline, so you can jump to specific clicks, page views, or errors.
      </P>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Signals
// ---------------------------------------------------------------------------

function Signals() {
  return (
    <div className="flex flex-col gap-4">
      <H1>Signals</H1>
      <P>
        Signals are automated monitors that watch your analytics data and notify you when something interesting happens. They run on a schedule, analyze your data (using aggregation or AI), and deliver reports to Slack and email with actionable next steps.
      </P>

      <H2>Signal Types</H2>

      <H3>Built-in Signals</H3>
      <P>
        <span className="font-mono">Mere Analytics</span> ships with two built-in signals that require zero configuration:
      </P>
      <Table
        headers={["Signal", "What It Detects"]}
        rows={[
          ["Rage Click Report", "Repeated clicks on the same element in quick succession — a strong indicator of user frustration"],
          ["Dead Click Report", "Clicks on non-interactive elements — surfaces confusing UI patterns"],
        ]}
      />
      <P>
        Built-in signals are created automatically when you first visit the Signals page. They start disabled — toggle them on and add a channel to start receiving reports.
      </P>
      <P>
        Reports include the total event count for the period, the top 5 affected pages, and the top 3 elements per page with their CSS selectors and visible text.
      </P>

      <H3>AI Signals</H3>
      <P>
        AI signals watch an Insight or Dashboard and use AI to detect noteworthy patterns, anomalies, and trends. Create one by selecting any insight or dashboard as the target.
      </P>
      <P>
        When an AI signal runs, it gathers multi-layered context before analysis:
      </P>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
        <li><strong>Current data</strong> — executes the target&apos;s query for the current period</li>
        <li><strong>Comparison data</strong> — runs the same query shifted to the previous period for trend detection</li>
        <li><strong>Signal history</strong> — loads the last 5 fired occurrences to avoid repeating known information</li>
        <li><strong>Product context</strong> — includes the target name, description, and visualization type</li>
      </ul>
      <P>
        Each AI signal report includes a severity rating, description, actionable suggestions, and follow-up questions.
      </P>
      <Table
        headers={["Severity", "Meaning"]}
        rows={[
          ["Routine", "Within normal variation, no action needed"],
          ["Notable", "Meaningful change worth reviewing"],
          ["Critical", "Large unexpected shift requiring immediate attention"],
        ]}
      />

      <H2>Configuration</H2>
      <Table
        headers={["Setting", "Default", "Options"]}
        rows={[
          ["Enabled", "Off", "On / Off"],
          ["Schedule", "Daily", "Daily — report every day at 7 AM UTC. Weekly — report every Monday at 7 AM UTC"],
          ["Report mode", "Always", "Always — send every scheduled period. Noteworthy only — skip if nothing significant is detected"],
          ["Enabled actions", "Snooze", "Snooze, Create Linear Ticket, Create GitHub Issue"],
        ]}
      />

      <H2>Channels</H2>
      <P>
        Each signal can deliver reports to multiple channels. Add channels from the signal&apos;s configuration page.
      </P>
      <Table
        headers={["Channel", "Setup"]}
        rows={[
          ["Slack", "Requires a connected Slack integration. Select any channel the bot has access to."],
          ["Email", "Enter any email address — no integration required. Multiple addresses supported."],
        ]}
      />

      <H2>Actions</H2>
      <P>
        When a signal fires, you can take action directly from the notification. Configure which actions are available per signal with the <InlineCode>enabled_actions</InlineCode> setting.
      </P>
      <Table
        headers={["Action", "What It Does", "Requires"]}
        rows={[
          ["Snooze", "Suppresses reports for this signal until end of week", "Nothing — always available"],
          ["Create Linear Ticket", "Creates an issue in your default Linear team with signal details, suggestions, and follow-up questions", "Connected Linear integration with a default team configured"],
          ["Create GitHub Issue", "Creates an issue in your default GitHub repo with signal details", "Connected GitHub integration with a default repo configured"],
        ]}
      />
      <P>
        Actions are idempotent — clicking the same action button twice for the same signal occurrence returns the existing result.
      </P>

      <H2>How It Works</H2>
      <P>
        The signal pipeline runs every day at 7:00 AM UTC:
      </P>
      <ol className="list-decimal list-inside text-muted-foreground space-y-1 ml-2">
        <li>The dispatcher checks all enabled signals that have at least one channel configured</li>
        <li>Daily signals are always enqueued. Weekly signals only run on Mondays</li>
        <li>Snoozed signals are skipped until their snooze period expires</li>
        <li>Each signal generates a report — either by aggregating events (built-in) or running AI analysis</li>
        <li>A signal occurrence is created with the report data</li>
        <li>The report is delivered to all configured channels (Slack messages with action buttons, emails with action links)</li>
      </ol>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Slack
// ---------------------------------------------------------------------------

function Slack() {
  return (
    <div className="flex flex-col gap-4">
      <H1>Slack</H1>
      <P>
        Connect <span className="font-mono">Mere Analytics</span> to Slack to receive signal notifications in your channels, ask questions about your analytics data with the AI agent, and take action on signals directly from Slack.
      </P>

      <H2>Connect Slack</H2>
      <P>
        Navigate to <strong>Settings &rarr; Integrations &rarr; Slack</strong> and click <strong>Connect</strong>. You&apos;ll be redirected to Slack&apos;s OAuth authorization page to grant access to your workspace. Once authorized, you&apos;ll be redirected back to <span className="font-mono">Mere Analytics</span> and can start configuring signal channels.
      </P>
      <P>
        The integration requests these Slack scopes:
      </P>
      <Table
        headers={["Scope", "Purpose"]}
        rows={[
          ["chat:write", "Send signal notifications to channels"],
          ["chat:write.public", "Post to public channels without joining"],
          ["channels:read", "List available channels for configuration"],
          ["groups:read", "List private channels you've added the bot to"],
          ["app_mentions:read", "Respond when the bot is @mentioned"],
          ["im:read, im:write, im:history", "Direct message conversations with the AI agent"],
        ]}
      />

      <H2>Signal Notifications</H2>
      <P>
        Once connected, you can route any signal to one or more Slack channels. Go to a signal definition and add a Slack channel under <strong>Channels</strong>. When the signal fires, a formatted message is posted with:
      </P>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
        <li>Signal title and severity indicator</li>
        <li>Description of what was detected</li>
        <li>AI-generated suggestions and follow-up questions (when available)</li>
        <li>A link to view the full signal in <span className="font-mono">Mere Analytics</span></li>
        <li>Action buttons for snooze, create Linear ticket, or create GitHub issue (based on enabled actions and connected integrations)</li>
      </ul>

      <H3>Signal Actions from Slack</H3>
      <P>
        Action buttons appear on signal notifications based on your <InlineCode>enabled_actions</InlineCode> configuration. Click a button to execute the action directly from Slack — the message updates with the result.
      </P>
      <Table
        headers={["Action", "What It Does"]}
        rows={[
          ["Snooze", "Pauses the signal for 1 week"],
          ["Create Linear Ticket", "Creates an issue in your default Linear team with signal details"],
          ["Create GitHub Issue", "Creates an issue in your default GitHub repo with signal details"],
        ]}
      />

      <H2>AI Agent</H2>
      <P>
        Mention the <span className="font-mono">Mere Analytics</span> bot in any channel or send it a direct message to interact with the AI agent. Ask questions about your analytics data in natural language and get answers backed by real data.
      </P>
      <CodeBlock>{`@Mere Analytics How many unique users visited /pricing this week?
@Mere Analytics What are the top 10 events by volume?
@Mere Analytics Create a dashboard showing daily signups and pageviews`}</CodeBlock>
      <P>
        The agent responds in a thread and maintains conversation context within that thread (up to 20 messages). You can refine your questions and iterate on results.
      </P>

      <H3>Agent Capabilities</H3>
      <P>
        The Slack AI agent can:
      </P>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
        <li>Run read-only SQL queries against your analytics database</li>
        <li>Analyze event patterns and smart event definitions</li>
        <li>Create and update insights, dashboards, and smart events</li>
        <li>List existing dashboards and insights</li>
      </ul>
      <P>
        When the agent creates or updates a dashboard or insight, approval buttons appear in the thread. Click <strong>Approve</strong> to save the changes or <strong>Decline</strong> to discard them.
      </P>

      <H2>Disconnect</H2>
      <P>
        To disconnect Slack, go to <strong>Settings &rarr; Integrations &rarr; Slack</strong> and click <strong>Disconnect</strong>. This removes the access token and disables all Slack signal channels. Existing signal definitions are preserved — you can reconnect later and re-add channels.
      </P>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Email
// ---------------------------------------------------------------------------

function Email() {
  return (
    <div className="flex flex-col gap-4">
      <H1>Email</H1>
      <P>
        Receive signal notifications via email. No OAuth or external service connection required — just add an email address to a signal channel and start receiving reports.
      </P>

      <H2>Setup</H2>
      <P>
        Navigate to any signal definition and add an email channel under <strong>Channels</strong>. Enter the email address where you want to receive notifications. You can add multiple email addresses per signal.
      </P>
      <P>
        Emails are sent from <InlineCode>signals@usemere.com</InlineCode> with the sender name <strong>Signals</strong>.
      </P>

      <H2>Email Content</H2>
      <P>
        Each signal email includes:
      </P>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
        <li>Signal title with severity label</li>
        <li>Description of what was detected</li>
        <li>AI-generated suggestions (when available)</li>
        <li>Follow-up questions for further investigation</li>
        <li>A link to view the full signal in <span className="font-mono">Mere Analytics</span></li>
        <li>Action buttons based on your enabled actions</li>
      </ul>

      <H2>Actions from Email</H2>
      <P>
        Signal emails include action buttons matching your <InlineCode>enabled_actions</InlineCode> configuration. Clicking an action link opens a confirmation page — confirm to execute the action. Action links are time-limited for security.
      </P>
      <Table
        headers={["Action", "What It Does"]}
        rows={[
          ["Snooze", "Pauses the signal for 1 week"],
          ["Create Linear Ticket", "Creates an issue in your default Linear team"],
          ["Create GitHub Issue", "Creates an issue in your default GitHub repo"],
        ]}
      />

      <H2>Signal Schedule</H2>
      <P>
        Signals are dispatched daily at 7:00 AM UTC. Each signal definition can be configured with its own schedule:
      </P>
      <Table
        headers={["Schedule", "Behavior"]}
        rows={[
          ["Daily", "Report generated and sent every day at 7 AM UTC"],
          ["Weekly", "Report generated and sent once per week"],
        ]}
      />
      <P>
        You can also set the report mode to <InlineCode>always</InlineCode> (send every scheduled period) or <InlineCode>noteworthy_only</InlineCode> (only send when something significant is detected).
      </P>
    </div>
  )
}

// ---------------------------------------------------------------------------
// MCP + CLI Setup
// ---------------------------------------------------------------------------

function McpCliSetup() {
  return (
    <div className="flex flex-col gap-4">
      <H1>MCP + CLI Setup</H1>
      <P>
        Connect <span className="font-mono">Mere Analytics</span> to your AI coding assistant or terminal in under a minute. Once connected, you can query your analytics data, explore schema, and run analyses using natural language.
      </P>

      <H2>Prerequisites</H2>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
        <li>A <span className="font-mono">Mere Analytics</span> account with at least one project</li>
        <li>Claude Code, Cursor, or any MCP-compatible client installed</li>
      </ul>

      <H2>1. Add the MCP Server</H2>
      <P>
        Run this command to register <span className="font-mono">Mere Analytics</span> as an MCP server:
      </P>
      <CodeBlock>{`claude mcp add --transport http Mere Analytics https://app.usemere.com/api/v1/mcp`}</CodeBlock>
      <P>
        For Cursor or other MCP clients, add this to your MCP config file:
      </P>
      <CodeBlock>{`{
  "mcpServers": {
    "Mere Analytics": {
      "transport": "http",
      "url": "https://app.usemere.com/api/v1/mcp"
    }
  }
}`}</CodeBlock>

      <H2>2. Authenticate</H2>
      <P>
        On first use, an OAuth 2.0 PKCE authorization flow opens in your browser. Sign in with your <span className="font-mono">Mere Analytics</span> account and authorize the connection. Tokens are stored locally and refreshed automatically — you only need to do this once.
      </P>

      <H2>3. Verify the Connection</H2>
      <P>
        Ask your AI assistant a question about your data to confirm everything is working:
      </P>
      <CodeBlock>{`"What are my top 10 events by volume?"
"Show me the database schema"
"How many unique users visited /pricing this week?"`}</CodeBlock>
      <P>
        You should see the assistant call <span className="font-mono">Mere Analytics</span> tools like <InlineCode>get_event_definitions</InlineCode> or <InlineCode>query</InlineCode> and return real data from your project.
      </P>

      <H2>Available Tools</H2>
      <P>
        Once connected, your AI assistant has access to these tools:
      </P>
      <Table
        headers={["Tool", "Description"]}
        rows={[
          ["query", "Execute read-only SQL against your analytics database"],
          ["get_schema", "Get database schema, tables, and columns"],
          ["list_events", "List recent events with filters"],
          ["get_event_definitions", "Get all unique event names and counts"],
          ["get_property_definitions", "Get all property names used in events"],
        ]}
      />
      <P>
        The <InlineCode>Mere Analytics://schema</InlineCode> resource is also available for clients that support MCP resources.
      </P>

      <H2>Example Workflows</H2>

      <H3>Investigate a Bug</H3>
      <CodeBlock>{`"List all events from user_123 in the last 24 hours"
"Show me the session recording for session abc-def"
"What errors occurred on /checkout today?"`}</CodeBlock>

      <H3>Product Analysis</H3>
      <CodeBlock>{`"What's the conversion rate from signup to first purchase this month?"
"Which pages have the highest bounce rate?"
"Break down pageviews by browser for the last 7 days"`}</CodeBlock>

      <H3>Schema Exploration</H3>
      <CodeBlock>{`"What tables are available?"
"Show me all properties on $click events"
"What event definitions exist in my project?"`}</CodeBlock>

      <H2>Scopes</H2>
      <P>
        The OAuth flow requests the <InlineCode>mcp:analytics:read</InlineCode> bundle scope, which includes read access to all analytics data. Individual scopes are available for more granular control:
      </P>
      <Table
        headers={["Scope", "Description"]}
        rows={[
          ["mcp:query:read", "Execute read-only queries"],
          ["mcp:events:read", "List and retrieve events"],
          ["mcp:persons:read", "List and retrieve persons"],
          ["mcp:sessions:read", "List and retrieve sessions"],
          ["mcp:insights:read", "Run trends and funnel analyses"],
          ["mcp:schema:read", "Read database schema"],
          ["mcp:analytics:read", "Bundle scope (all read operations)"],
        ]}
      />

      <H2>Troubleshooting</H2>

      <H3>Auth flow doesn&apos;t open</H3>
      <P>
        Make sure your MCP client supports HTTP transport. Some older clients only support stdio. Check that the URL is exactly <InlineCode>https://app.usemere.com/api/v1/mcp</InlineCode>.
      </P>

      <H3>Tools return empty results</H3>
      <P>
        Verify that you&apos;ve sent events to your project. The MCP server only returns data from the project associated with your authenticated account.
      </P>

      <H3>Token expired</H3>
      <P>
        Tokens refresh automatically. If you&apos;re prompted to re-authenticate, remove and re-add the MCP server:
      </P>
      <CodeBlock>{`claude mcp remove Mere Analytics
claude mcp add --transport http Mere Analytics https://app.usemere.com/api/v1/mcp`}</CodeBlock>
    </div>
  )
}

// ---------------------------------------------------------------------------
// MCP + CLI
// ---------------------------------------------------------------------------

function McpCli() {
  return (
    <div className="flex flex-col gap-4">
      <H1>MCP + CLI</H1>
      <P>
        Connect <span className="font-mono">Mere Analytics</span> to any MCP-compatible AI assistant. Query your analytics data, explore your schema, and run analyses directly from tools like Claude Code.
      </P>

      <H2>Setup</H2>
      <P>
        Add <span className="font-mono">Mere Analytics</span> as an MCP server with a single command:
      </P>
      <CodeBlock>{`claude mcp add --transport http Mere Analytics https://app.usemere.com/api/v1/mcp`}</CodeBlock>
      <P>
        On first use, an OAuth 2.0 PKCE flow will open in your browser to authenticate. Tokens are managed automatically after the initial authorization.
      </P>

      <H2>Available Tools</H2>
      <Table
        headers={["Tool", "Description"]}
        rows={[
          ["query", "Execute read-only SQL against ClickHouse"],
          ["get_schema", "Get database schema, tables, and columns"],
          ["list_events", "List recent events with filters"],
          ["get_event_definitions", "Get all unique event names and counts"],
          ["get_property_definitions", "Get all property names used in events"],
        ]}
      />

      <H2>Resources</H2>
      <Table
        headers={["URI", "Description"]}
        rows={[
          ["Mere Analytics://schema", "Full database schema resource"],
        ]}
      />

      <H2>OAuth Scopes</H2>
      <Table
        headers={["Scope", "Description"]}
        rows={[
          ["mcp:query:read", "Execute read-only queries"],
          ["mcp:events:read", "List and retrieve events"],
          ["mcp:persons:read", "List and retrieve persons"],
          ["mcp:sessions:read", "List and retrieve sessions"],
          ["mcp:insights:read", "Run trends and funnel analyses"],
          ["mcp:schema:read", "Read database schema"],
          ["mcp:analytics:read", "Bundle scope (all read operations)"],
        ]}
      />

      <H2>Example Usage</H2>
      <P>
        Once connected, you can ask your AI assistant questions like:
      </P>
      <CodeBlock>{`# In Claude Code or any MCP-compatible tool:

"How many unique users visited the pricing page this week?"
"What are the top 10 most common events?"
"Show me the schema for the events table"
"List all events from user_123 in the last 24 hours"`}</CodeBlock>
      <P>
        The MCP endpoint uses JSON-RPC 2.0 over HTTP POST. It supports the standard MCP methods: <InlineCode>initialize</InlineCode>, <InlineCode>tools/list</InlineCode>, <InlineCode>tools/call</InlineCode>, <InlineCode>resources/list</InlineCode>, <InlineCode>resources/read</InlineCode>, and <InlineCode>ping</InlineCode>.
      </P>
    </div>
  )
}

// ---------------------------------------------------------------------------
// JavaScript SDK
// ---------------------------------------------------------------------------

function JavaScriptSdk() {
  return (
    <div className="flex flex-col gap-4">
      <H1>JavaScript SDK Reference</H1>
      <P>
        Full API reference for the <span className="font-mono">Mere Analytics</span> browser SDK. The SDK is available as <InlineCode>@mere/core</InlineCode> on npm or via the CDN inline snippet.
      </P>

      <H2>Mere Analytics.init(token, config?)</H2>
      <P>
        Initialize the SDK. Must be called before any other method. When using the inline snippet, the stub queues all calls made before the full SDK loads.
      </P>
      <CodeBlock>{`Mere Analytics.init('sv_pub_...', {
  ingestHost: 'https://app.usemere.com',
  debug: false,
  optOut: false,
  maskAllInputs: true,
  autocapture: true,
});`}</CodeBlock>
      <Table
        headers={["Param", "Type", "Description"]}
        rows={[
          ["token", "string", "Your project token (required)"],
          ["config.apiHost", "string", "CDN endpoint (default: https://cdn.usemere.com)"],
          ["config.ingestHost", "string", "API endpoint (default: https://app.usemere.com)"],
          ["config.version", "string", "SDK version to load (default: latest)"],
          ["config.debug", "boolean", "Log events to console (default: false)"],
          ["config.optOut", "boolean", "Disable all tracking (default: false)"],
          ["config.maskAllInputs", "boolean", "Mask inputs in recordings (default: true)"],
          ["config.autocapture", "boolean | object", "Enable auto-tracking (default: true)"],
        ]}
      />

      <H2>Mere Analytics.capture(event, properties?)</H2>
      <P>
        Capture a custom event. Events are buffered and flushed in batches (10 events or 5 seconds).
      </P>
      <CodeBlock>{`Mere Analytics.capture('purchase_completed', {
  amount: 49.99,
  currency: 'USD',
  item_count: 3,
});`}</CodeBlock>
      <Table
        headers={["Param", "Type", "Description"]}
        rows={[
          ["event", "string", "Event name (required)"],
          ["properties", "Record<string, unknown>", "Custom properties (optional)"],
        ]}
      />

      <H2>Mere Analytics.identify(userId, traits?)</H2>
      <P>
        Identify the current user. Links all future events to this user ID. Forward-only — does not retroactively link past anonymous events.
      </P>
      <CodeBlock>{`Mere Analytics.identify('user_456', {
  email: 'jane@example.com',
  name: 'Jane Smith',
  plan: 'enterprise',
});`}</CodeBlock>
      <Table
        headers={["Param", "Type", "Description"]}
        rows={[
          ["userId", "string", "Unique user identifier (required)"],
          ["traits.email", "string", "User email (optional)"],
          ["traits.name", "string", "User name (optional)"],
          ["traits[key]", "unknown", "Any custom trait (optional)"],
        ]}
      />

      <H2>Mere Analytics.reset()</H2>
      <P>
        Reset the current identity. Call on logout. Clears the user ID, generates a new anonymous ID, starts a new session, and clears all registered properties.
      </P>
      <CodeBlock>{`// On user logout
Mere Analytics.reset();`}</CodeBlock>

      <H2>Mere Analytics.getDistinctId()</H2>
      <P>
        Returns the current distinct ID — the user ID if identified, or the anonymous ID otherwise.
      </P>
      <CodeBlock>{`const id = Mere Analytics.getDistinctId();
// "user_456" (if identified) or "550e8400-e29b-..." (anonymous)`}</CodeBlock>

      <H2>Mere Analytics.register(properties)</H2>
      <P>
        Register properties to be included with every subsequent event. Overwrites existing registered properties with the same key.
      </P>
      <CodeBlock>{`Mere Analytics.register({
  app_version: '2.1.0',
  environment: 'production',
});`}</CodeBlock>

      <H2>Mere Analytics.registerOnce(properties)</H2>
      <P>
        Like <InlineCode>register()</InlineCode>, but only sets properties that don&apos;t already exist. Useful for values like initial referrer that should only be set once.
      </P>
      <CodeBlock>{`Mere Analytics.registerOnce({
  initial_referrer: document.referrer,
  first_seen_at: new Date().toISOString(),
});`}</CodeBlock>

      <H2>Event Payload Shape</H2>
      <P>
        Each event sent to the server has this structure:
      </P>
      <CodeBlock>{`{
  "event": "purchase_completed",
  "timestamp": 1709856000000,
  "properties": {
    "amount": 49.99,
    "$current_url": "https://example.com/checkout",
    "$browser": "Chrome",
    "$os": "macOS",
    "$device_type": "desktop",
    // ... all automatic properties
  },
  "anonymousId": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "user_456",
  "sessionId": "a1b2c3d4-..."
}`}</CodeBlock>

      <H2>Transport</H2>
      <P>
        Events are sent via <InlineCode>POST {"{ingestHost}"}/api/v1/ingest/events</InlineCode> as JSON batches. The SDK uses gzip compression (<InlineCode>CompressionStream</InlineCode> API when available) and <InlineCode>keepalive: true</InlineCode> for reliable delivery during page transitions. Failed requests are retried with exponential backoff (1s, 2s, 4s) on 5xx errors only.
      </P>

      <H2>SDK Architecture</H2>
      <Table
        headers={["Layer", "Size", "Purpose"]}
        rows={[
          ["Inline stub", "<1KB", "Creates queue, loads SDK async"],
          ["Main SDK", "<30KB", "Core tracking, identity, autocapture"],
          ["Recorder", "~50KB", "rrweb session recording (loaded conditionally)"],
        ]}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// REST API
// ---------------------------------------------------------------------------

function RestApi() {
  return (
    <div className="flex flex-col gap-4">
      <H1>REST API Reference</H1>
      <P>
        The <span className="font-mono">Mere Analytics</span> REST API provides programmatic access to your analytics data. All endpoints are under <InlineCode>https://app.usemere.com/api/v1/</InlineCode>.
      </P>

      <H2>Authentication</H2>
      <P>
        Authenticate with either session cookies (from the web app) or API tokens for programmatic access. Include your API token in the <InlineCode>Authorization</InlineCode> header:
      </P>
      <CodeBlock>{`curl -H "Authorization: Bearer YOUR_API_TOKEN" \\
  https://app.usemere.com/api/v1/projects/:project_id/events`}</CodeBlock>

      <H2>Pagination</H2>
      <P>
        All list endpoints use cursor-based (keyset) pagination:
      </P>
      <CodeBlock>{`{
  "data": [...],
  "meta": {
    "next_cursor": "eyJ0cyI6...",
    "has_more": true
  }
}`}</CodeBlock>
      <P>
        Pass the <InlineCode>next_cursor</InlineCode> value as a <InlineCode>cursor</InlineCode> query parameter to get the next page.
      </P>

      <H2>Ingest</H2>

      <H3>POST /api/v1/ingest/events</H3>
      <P>
        Accepts batched events from the SDK. Validates events and enqueues them for processing.
      </P>
      <CodeBlock>{`// Request
POST /api/v1/ingest/events
Content-Type: application/json

{
  "projectToken": "sv_pub_...",
  "events": [
    {
      "event": "$pageview",
      "timestamp": 1709856000000,
      "properties": { "$current_url": "https://example.com" },
      "anonymousId": "550e8400-...",
      "userId": null,
      "sessionId": "a1b2c3d4-..."
    }
  ]
}

// Response
{
  "status": "accepted",
  "accepted": 1,
  "rejected": 0,
  "errors": []
}`}</CodeBlock>

      <H3>POST /api/v1/ingest/recordings</H3>
      <P>
        Returns a presigned URL for direct upload of recording chunks to object storage.
      </P>

      <H2>Persons</H2>
      <P>
        All person endpoints are under <InlineCode>/api/v1/projects/:project_id/persons</InlineCode>.
      </P>
      <Table
        headers={["Method", "Path", "Description"]}
        rows={[
          ["GET", "/persons", "List persons (supports limit, cursor, search, country, device_type, browser, has_user_id filters)"],
          ["GET", "/persons/:distinct_id", "Get a single person"],
          ["GET", "/persons/:distinct_id/events", "List events for a person"],
          ["GET", "/persons/:distinct_id/sessions", "List sessions for a person"],
        ]}
      />

      <H2>Events</H2>
      <Table
        headers={["Method", "Path", "Description"]}
        rows={[
          ["GET", "/events", "List events (supports limit, cursor, date_from, date_to, event, distinct_id, session_id filters)"],
          ["GET", "/events/:event_id", "Get a single event"],
        ]}
      />

      <H2>Sessions</H2>
      <Table
        headers={["Method", "Path", "Description"]}
        rows={[
          ["GET", "/sessions", "List sessions (supports limit, cursor, date_from, date_to, distinct_id, min/max_duration, is_bounce, entry_url, country, device_type, browser filters)"],
          ["GET", "/sessions/:session_id", "Get a single session"],
          ["GET", "/sessions/:session_id/events", "List events within a session"],
        ]}
      />

      <H2>Insights</H2>

      <H3>POST /insights/trends</H3>
      <P>
        Time-series analysis with breakdowns.
      </P>
      <CodeBlock>{`POST /api/v1/projects/:project_id/insights/trends
Content-Type: application/json

{
  "events": [
    { "name": "$pageview", "math": "unique_persons" }
  ],
  "interval": "day",
  "date_from": "2025-01-01",
  "date_to": "2025-01-31",
  "breakdown": "$browser"
}`}</CodeBlock>
      <Table
        headers={["Param", "Type", "Description"]}
        rows={[
          ["events", "array (1-10)", "Events to analyze"],
          ["events[].name", "string", "Event name"],
          ["events[].math", "string", "total, unique_persons, unique_sessions, per_session"],
          ["interval", "string", "hour, day, week, month"],
          ["breakdown", "string", "Property to break down by"],
          ["date_from", "string", "Start date (ISO 8601)"],
          ["date_to", "string", "End date (ISO 8601)"],
        ]}
      />

      <H3>POST /insights/funnel</H3>
      <P>
        Multi-step conversion funnel analysis. Uses ClickHouse <InlineCode>windowFunnel()</InlineCode> for accurate conversion tracking.
      </P>
      <CodeBlock>{`POST /api/v1/projects/:project_id/insights/funnel
Content-Type: application/json

{
  "steps": [
    { "event": "$pageview", "properties": { "$current_url": "/pricing" } },
    { "event": "checkout_started" },
    { "event": "purchase_completed" }
  ],
  "conversion_window": "7d",
  "date_from": "2025-01-01",
  "date_to": "2025-01-31"
}`}</CodeBlock>

      <H2>Event &amp; Property Definitions</H2>
      <Table
        headers={["Method", "Path", "Description"]}
        rows={[
          ["GET", "/event_definitions", "Distinct event names with volume_30d and last_seen"],
          ["GET", "/property_definitions", "Property keys with inferred types and example values"],
        ]}
      />

      <H2>Smart Events</H2>
      <Table
        headers={["Method", "Path", "Description"]}
        rows={[
          ["GET", "/action_definitions", "List smart events (excludes archived by default)"],
          ["GET", "/action_definitions/:id", "Get a single smart event"],
          ["POST", "/action_definitions", "Create a smart event"],
          ["PATCH", "/action_definitions/:id", "Update a smart event"],
          ["DELETE", "/action_definitions/:id", "Delete a smart event"],
          ["POST", "/action_definitions/:id/preview", "Preview matching events"],
        ]}
      />

      <H2>Error Codes</H2>
      <Table
        headers={["Status", "Code", "Description"]}
        rows={[
          ["400", "INVALID_PARAMETER", "Invalid or missing request parameter"],
          ["401", "NOT_AUTHENTICATED", "Missing or invalid authentication"],
          ["403", "NOT_AUTHORIZED", "Insufficient permissions"],
          ["404", "NOT_FOUND", "Resource not found"],
          ["422", "VALIDATION_ERROR", "Request validation failed"],
        ]}
      />
      <P>
        Error responses follow this format:
      </P>
      <CodeBlock>{`{
  "error": "Description of what went wrong",
  "code": "INVALID_PARAMETER"
}`}</CodeBlock>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Content router
// ---------------------------------------------------------------------------

const CONTENT: Record<string, () => React.ReactNode> = {
  "": Introduction,
  "quick-start": QuickStart,
  "installation": Installation,
  "auto-track": AutoTrack,
  "custom-events": CustomEvents,
  "identify-users": IdentifyUsers,
  "ai-agents": AIAgents,
  "dashboards": Dashboards,
  "session-recordings": SessionRecordings,
  "signals": Signals,
  "slack": Slack,
  "email": Email,
  "mcp-cli-setup": McpCliSetup,
  "mcp-cli": McpCli,
  "javascript-sdk": JavaScriptSdk,
  "rest-api": RestApi,
}

export function DocsContent({ slug }: { slug: string }) {
  const render = CONTENT[slug]
  if (!render) {
    return (
      <div className="flex flex-1 flex-col gap-4">
        <H1>Page Not Found</H1>
        <P>
          The documentation page you&apos;re looking for doesn&apos;t exist.{" "}
          <a href="/docs" className="underline hover:text-foreground">
            Go back to the docs home
          </a>
          .
        </P>
      </div>
    )
  }
  return render()
}
