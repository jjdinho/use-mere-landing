"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import {
  Terminal as TerminalIcon,
  Sparkles,
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
  Check,
  X,
  Play,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// ============================================================================
// Reusable code card (filename header + mono body)
// ============================================================================

function CodeCard({ filename, children }: { filename: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#1a1d21] border border-[#ffffff14] rounded-lg overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#ffffff0a]">
        <TerminalIcon className="size-3.5 text-[#8b949e]" />
        <span className="text-[11px] text-[#8b949e] font-medium">{filename}</span>
      </div>
      <div className="p-4 font-mono text-[12px] leading-relaxed">{children}</div>
    </div>
  )
}

// ============================================================================
// Hero demo video placeholder
// ============================================================================

function VideoPlaceholder() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="aspect-video rounded-xl border border-border/50 bg-[#1a1d21] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sv-teal-500/[0.06] to-transparent" />
        <div className="relative flex flex-col items-center gap-3 text-muted-foreground">
          <div className="size-16 rounded-full bg-foreground/5 border border-border/50 flex items-center justify-center">
            <Play className="size-6 fill-current ml-0.5" />
          </div>
          <span className="text-sm">Demo video coming soon</span>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Playbook cards
// ============================================================================

const PLAYBOOKS_REPO = "https://github.com/usemere/playbooks/tree/main"

const playbooks = [
  {
    name: "weekly-digest",
    description: "Auto-send a summary of your top metrics every Monday",
  },
  {
    name: "funnel-drop-off",
    description: "Find where users abandon any multi-step flow",
  },
  {
    name: "feature-launch",
    description: "Compare adoption + retention before vs after a release",
  },
  {
    name: "churn-watch",
    description: "Surface accounts going quiet before they cancel",
  },
]

function Playbooks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
      {playbooks.map((p) => (
        <a
          key={p.name}
          href={`${PLAYBOOKS_REPO}/${p.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-[#1a1d21] border border-[#ffffff14] rounded-lg overflow-hidden shadow-lg hover:border-sv-teal-500/40 transition-colors"
        >
          <div className="px-4 py-2.5 font-mono text-[12px] border-b border-[#ffffff0a] flex items-center gap-2">
            <Github className="size-3.5 text-[#8b949e]" />
            <span className="text-[#d1d2d3] truncate">usemere/playbooks</span>
            <span className="text-[#8b949e]">/</span>
            <span className="text-orange-300 truncate">{p.name}</span>
            <ArrowUpRight className="size-3.5 text-[#8b949e] ml-auto shrink-0 group-hover:text-sv-teal-400 transition-colors" />
          </div>
          <div className="px-4 py-3">
            <p className="text-sm text-muted-foreground">{p.description}</p>
          </div>
        </a>
      ))}
    </div>
  )
}

// ============================================================================
// Price slider — events/mo vs Mere/PostHog/Mixpanel/Amplitude/Segment
//
// All pricing is real, sourced from each vendor's public pricing pages.
// Amplitude and Segment price by MTU — we convert via EVENTS_PER_MTU.
// ============================================================================

const EVENT_TIERS = [1_000_000, 2_000_000, 5_000_000, 10_000_000, 15_000_000, 20_000_000]

function formatEvents(n: number): string {
  if (n >= 1_000_000) return `${n / 1_000_000}M`
  if (n >= 1_000) return `${n / 1_000}K`
  return `${n}`
}

function formatMoney(n: number): string {
  if (n === 0) return "$0"
  if (n >= 100_000) return `$${Math.round(n / 1000).toLocaleString()}K`
  if (n >= 1000) return `$${Math.round(n).toLocaleString()}`
  return `$${Math.round(n)}`
}

type Pricer = (events: number) => { price: number; label?: string }

// Linear interpolation between published price points, extrapolating the
// final segment's rate beyond the last data point. `floor` sets the price
// for inputs below the first data point (defaults to 0).
function interpolatePrice(
  points: [number, number][],
  opts?: { floor?: number },
): Pricer {
  return (e) => {
    if (e <= points[0][0]) return { price: opts?.floor ?? 0 }
    const lastIdx = points.length - 1
    const [eN, pN] = points[lastIdx]
    if (e >= eN) {
      const [ePrev, pPrev] = points[lastIdx - 1]
      const rate = (pN - pPrev) / (eN - ePrev)
      return { price: pN + (e - eN) * rate }
    }
    for (let i = 0; i < lastIdx; i++) {
      const [e1, p1] = points[i]
      const [e2, p2] = points[i + 1]
      if (e >= e1 && e <= e2) {
        const t = (e - e1) / (e2 - e1)
        return { price: p1 + t * (p2 - p1) }
      }
    }
    return { price: 0 } // unreachable
  }
}

// Mere: free up to 1M events/mo; $9/mo flat from 1M–15M; custom above.
const merePrice: Pricer = (e) => {
  if (e <= 1_000_000) return { price: 0 }
  if (e <= 15_000_000) return { price: 9 }
  return { price: 0, label: "Let's talk" }
}

// PostHog tiered per-event pricing — Product Analytics with identified events,
// matching what posthog.com/pricing's calculator shows by default. The total
// is base rate + person-profile rate per tier (both have a 1M free allowance).
// Combined per-event rates: 1-2M $0.000248, 2-15M $0.000104, 15-50M $0.0000655,
// 50-100M $0.0000364, 100-250M $0.0000187, 250M+ $0.0000100.
const postHogPrice: Pricer = (e) => {
  if (e <= 1_000_000) return { price: 0 }
  if (e <= 2_000_000) return { price: (e - 1_000_000) * 0.000248 }
  if (e <= 15_000_000) return { price: 248 + (e - 2_000_000) * 0.000104 }
  if (e <= 50_000_000) return { price: 1600 + (e - 15_000_000) * 0.0000655 }
  if (e <= 100_000_000) return { price: 3892.5 + (e - 50_000_000) * 0.0000364 }
  if (e <= 250_000_000) return { price: 5712.5 + (e - 100_000_000) * 0.0000187 }
  return { price: 8517.5 + (e - 250_000_000) * 0.0000100 }
}

// Mixpanel: real data points from mixpanel.com/pricing.
// Above 15M, Mixpanel switches to custom enterprise pricing.
const mixpanelInterpolated = interpolatePrice([
  [1_000_000, 0],
  [1_500_000, 140],
  [2_000_000, 258.72],
  [3_000_000, 378],
  [4_000_000, 504],
  [5_000_000, 612.5],
  [6_500_000, 784.88],
  [8_000_000, 952],
  [10_000_000, 1176],
  [12_500_000, 1465.63],
  [15_000_000, 1722],
])
const mixpanelPrice: Pricer = (e) =>
  e > 15_000_000 ? { price: 0, label: "Contact sales" } : mixpanelInterpolated(e)

// Amplitude prices by MTU (monthly tracked users), not events. We convert
// using EVENTS_PER_MTU, then interpolate Amplitude's published MTU pricing.
// Free tier (Starter): $0 up to 10K MTUs AND up to 2M events.
// Above either limit, paid pricing kicks in (floor $61).
const EVENTS_PER_MTU = 5000
const amplitudeByMtu = interpolatePrice(
  [
    [1_000, 61],
    [2_000, 99],
    [5_000, 124],
    [10_000, 186],
    [25_000, 311],
    [50_000, 561],
    [100_000, 1061],
    [200_000, 2100],
  ],
  { floor: 61 },
)
const amplitudePrice: Pricer = (e) => {
  const mtus = e / EVENTS_PER_MTU
  if (e <= 2_000_000 && mtus <= 10_000) return { price: 0 }
  return amplitudeByMtu(mtus)
}

const competitors: { name: string; brand: string; price: Pricer }[] = [
  { name: "Mere",      brand: "text-sv-teal-400",   price: merePrice },
  { name: "PostHog",   brand: "text-[#f9bd2b]",     price: postHogPrice },
  { name: "Mixpanel",  brand: "text-[#7856ff]",     price: mixpanelPrice },
  { name: "Amplitude", brand: "text-[#1976d2]",     price: amplitudePrice },
]

function PriceSlider() {
  const [tierIdx, setTierIdx] = React.useState(0) // 1M events

  const events = EVENT_TIERS[tierIdx]
  const isMaxTier = tierIdx === EVENT_TIERS.length - 1
  const eventsLabel = isMaxTier ? `${formatEvents(events)}+` : formatEvents(events)
  const eventsFull = isMaxTier
    ? `${events.toLocaleString()}+`
    : events.toLocaleString()

  const merePricer = competitors.find((c) => c.name === "Mere")!.price
  const mereRow = merePricer(events)
  const competitorRows = competitors
    .filter((c) => c.name !== "Mere")
    .map((c) => ({ name: c.name, brand: c.brand, ...c.price(events) }))

  return (
    <div className="max-w-2xl mx-auto">
      {/* Slider */}
      <div className="mb-10">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            Events / month
          </span>
          <span className="text-xs font-mono tabular-nums tracking-wider text-foreground">
            {eventsFull}
          </span>
        </div>
        <Slider
          min={0}
          max={EVENT_TIERS.length - 1}
          step={1}
          value={[tierIdx]}
          // Base UI passes a number for single-thumb sliders even when `value`
          // is an array — guard for either shape.
          onValueChange={(v) => setTierIdx(Array.isArray(v) ? v[0] : v)}
          className="[&_[data-slot=slider-range]]:bg-sv-teal-500 [&_[data-slot=slider-thumb]]:bg-sv-teal-500 [&_[data-slot=slider-thumb]]:border-sv-teal-400 [&_[data-slot=slider-thumb]]:size-4 [&_[data-slot=slider-thumb]]:ring-sv-teal-500/30"
        />
        <div className="relative text-lg text-muted-foreground mt-3 font-mono">
          {EVENT_TIERS.map((n, i) => {
            const pct = (i / (EVENT_TIERS.length - 1)) * 100
            const isLast = i === EVENT_TIERS.length - 1
            return (
              <span
                key={n}
                className="absolute top-0 whitespace-nowrap"
                style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
              >
                {formatEvents(n)}
                {isLast ? "+" : ""}
              </span>
            )
          })}
          {/* Spacer to maintain row height since labels are absolutely positioned */}
          <span className="invisible">M+</span>
        </div>
      </div>

      {/* Mere — hero card */}
      <div className="relative mb-6 p-8 rounded-2xl border border-sv-teal-500/30 bg-gradient-to-br from-sv-teal-500/[0.08] to-transparent text-center overflow-hidden">
        {mereRow.label ? (
          <p className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            {mereRow.label}
          </p>
        ) : (
          <p className="text-5xl md:text-6xl font-bold tabular-nums tracking-tight mb-3">
            ${mereRow.price.toFixed(0)}
            <span className="text-xl md:text-2xl text-muted-foreground font-normal">/mo</span>
          </p>
        )}
        {mereRow.label ? (
          <div className="text-sm text-muted-foreground mb-5">
            <p>Custom pricing for high-volume teams</p>
            <p>Probably less than $50/month</p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mb-5">
            Flat rate. Includes everything.
          </p>
        )}
        <ul className="flex flex-col items-center gap-1.5 text-sm text-foreground mb-6">
          {[
            "Unlimited projects",
            "Unlimited seats",
            "We never share or train on your data",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="size-3.5 shrink-0 text-sv-teal-400" />
              {item}
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <div className="cta-pulse relative bg-[url('/gradient-bg.png')] bg-cover bg-center rounded-sm">
            <Button
              variant="primitive"
              size="lg"
              className="relative z-10 font-bold text-white text-base px-12"
              nativeButton={false}
              render={
                <a href="https://app.usemere.com/register?plan=free&utm_source=website&utm_medium=pricing_cta&utm_campaign=try_for_free" />
              }
            >
              {mereRow.label ? "Talk to us" : "Get started"}
            </Button>
            <div className="cta-pulse__wave cta-pulse__wave--1" />
            <div className="cta-pulse__wave cta-pulse__wave--2" />
            <div className="cta-pulse__wave cta-pulse__wave--3" />
          </div>
        </div>
      </div>

      {/* Competitors */}
      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground/70 font-semibold mb-3 text-center">
        For comparison at {eventsLabel} events/mo
      </p>
      <div className="space-y-1.5">
        {competitorRows.map((c) => {
          const savings =
            !mereRow.label && !c.label && c.price > mereRow.price
              ? c.price - mereRow.price
              : null
          return (
            <div
              key={c.name}
              className="flex items-center gap-3 py-2.5 px-4 rounded-lg border border-border/40 bg-card/20"
            >
              <span className={cn("text-sm font-semibold w-24 shrink-0", c.brand)}>
                {c.name}
              </span>
              <span className="text-sm font-mono tabular-nums text-muted-foreground flex-1">
                {c.label ?? `${formatMoney(c.price)}/mo`}
              </span>
              {savings !== null && (
                <span className="text-[11px] font-medium text-sv-teal-400 bg-sv-teal-500/10 border border-sv-teal-500/25 rounded-full px-2.5 py-0.5 shrink-0">
                  Save {formatMoney(savings)}/mo
                </span>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-xs text-muted-foreground/60 mt-6 text-center">
        Estimates based on each vendor&apos;s public pricing.
        <br />
        Amplitude prices by monthly tracked users; we estimate{" "}
        {EVENTS_PER_MTU.toLocaleString()} events per MTU. Your mileage may vary.
      </p>
    </div>
  )
}

// ============================================================================
// Creators
// ============================================================================

const creator = {
  name: "Jake Johnson",
  avatarHandle: "jjdinho",
  socials: [
    { icon: Github, href: "https://github.com/jjdinho", label: "GitHub" },
    { icon: Twitter, href: "https://x.com/jakesjohnson", label: "X" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/jake-s-johnson/", label: "LinkedIn" },
  ],
}

function Creators() {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://github.com/${creator.avatarHandle}.png`}
        alt={creator.name}
        className="size-12 rounded-full"
      />
      <p className="text-sm font-semibold">{creator.name}</p>
      <div className="flex items-center gap-4">
        {creator.socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon className="size-5" />
          </a>
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// Main landing page
// ============================================================================

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 observatory-grid pointer-events-none" />

      <Header />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Mere Analytics",
            url: "https://usemere.com",
            logo: "https://usemere.com/logo-512.png",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Mere Analytics",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            description:
              "Headless analytics that agents love. Collect events and then query them. That's it.",
          }),
        }}
      />

      {/* Hero */}
      <section aria-label="Hero" className="relative py-24 md:py-32 border-t border-border/30">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Sometimes less is more
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Mere is headless <strong>product analytics</strong> that agents love.
            <br />
            Collect events and query them. That&apos;s it.
            <br />
            We never share or train on your data.
          </p>

          <VideoPlaceholder />

          <div className="flex justify-center mt-12">
            <div className="cta-pulse relative bg-[url('/gradient-bg.png')] bg-cover bg-center rounded-sm">
              <Button
                variant="primitive"
                size="lg"
                className="relative z-10 font-bold text-white text-base px-12"
                nativeButton={false}
                render={<a href="https://app.usemere.com/register?plan=free&utm_source=website&utm_medium=hero_cta&utm_campaign=try_for_free" />}
              >
                Get started
              </Button>
              <div className="cta-pulse__wave cta-pulse__wave--1" />
              <div className="cta-pulse__wave cta-pulse__wave--2" />
              <div className="cta-pulse__wave cta-pulse__wave--3" />
            </div>
          </div>
        </div>
      </section>

      {/* Freakin easy to use */}
      <section id="setup" aria-label="Setup" className="relative py-24 md:py-32 border-t border-border/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Freakin easy to use
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Paste our autocapture snippet, or send events however you want.
              <br />
              Then query your data with the API or your agent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 max-w-5xl mx-auto">
            {/* Send */}
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-sv-teal-500 font-semibold mb-6 text-center">
                Send
              </p>
              <div className="space-y-8">
                <div>
                  <CodeCard filename="index.html">
                    <span className="text-[#8b949e]">&lt;</span>
                    <span className="text-sv-teal-400">script</span>{" "}
                    <span className="text-orange-300">src</span>
                    <span className="text-[#d1d2d3]">=</span>
                    <span className="text-orange-300">&quot;https://cdn.usemere.com/m.js&quot;</span>{" "}
                    <span className="text-orange-300">data-key</span>
                    <span className="text-[#d1d2d3]">=</span>
                    <span className="text-orange-300">&quot;mere_pub_...&quot;</span>
                    <span className="text-[#8b949e]">&gt;&lt;/</span>
                    <span className="text-sv-teal-400">script</span>
                    <span className="text-[#8b949e]">&gt;</span>
                  </CodeCard>
                  <p className="text-sm text-muted-foreground mt-3 text-center">
                    Drop-in autocapture. Page views, clicks, and forms tracked automatically.
                  </p>
                </div>

                <div>
                  <CodeCard filename="POST /events">
                    <span className="text-sv-teal-500">$</span>{" "}
                    <span className="text-[#d1d2d3]">curl -X POST https://api.usemere.com/events \</span>
                    <br />
                    <span className="text-[#d1d2d3]">{"  "}-H </span>
                    <span className="text-orange-300">&quot;Authorization: Bearer mere_sec_...&quot;</span>
                    <span className="text-[#d1d2d3]"> \</span>
                    <br />
                    <span className="text-[#d1d2d3]">{"  "}-d </span>
                    <span className="text-orange-300">{`'{"event":"signup","plan":"pro"}'`}</span>
                  </CodeCard>
                  <p className="text-sm text-muted-foreground mt-3 text-center">
                    Raw payload to our endpoint. Server-side, mobile, batch jobs.
                  </p>
                </div>
              </div>
            </div>

            {/* Query */}
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-sv-teal-500 font-semibold mb-6 text-center">
                Query
              </p>
              <div className="space-y-8">
                <div>
                  <CodeCard filename="POST /query">
                    <span className="text-sv-teal-500">$</span>{" "}
                    <span className="text-[#d1d2d3]">curl -X POST https://api.usemere.com/query \</span>
                    <br />
                    <span className="text-[#d1d2d3]">{"  "}-H </span>
                    <span className="text-orange-300">&quot;Authorization: Bearer mere_sec_...&quot;</span>
                    <span className="text-[#d1d2d3]"> \</span>
                    <br />
                    <span className="text-[#d1d2d3]">{"  "}-d </span>
                    <span className="text-orange-300">{`'{"sql":"SELECT count(*) FROM events"}'`}</span>
                  </CodeCard>
                  <p className="text-sm text-muted-foreground mt-3 text-center">
                    REST endpoint for programmatic access.
                  </p>
                </div>

                <div>
                  <CodeCard filename="claude — mcp mere">
                    <span className="text-sv-teal-500">$</span>{" "}
                    <span className="text-[#d1d2d3]">claude</span>{" "}
                    <span className="text-orange-300">&quot;How many signups this week?&quot;</span>
                    <br />
                    <span className="text-[#8b949e]">
                      <Sparkles className="inline size-3 text-sv-teal-500 mr-1 -mt-0.5" />
                      [mere/query] → 412 signups in the last 7 days
                    </span>
                  </CodeCard>
                  <p className="text-sm text-muted-foreground mt-3 text-center">
                    Ask Claude Code via MCP. Your agent queries Mere for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* No feature bloat */}
      <section aria-label="No feature bloat" className="relative py-24 md:py-32 border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            No feature bloat
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-14">
            You can request a feature, but we will say no.
            <br />
            We have two features: event collection and querying.
          </p>

          <div className="grid grid-cols-2 gap-8 sm:gap-20 max-w-md mx-auto text-left">
            {/* Bloat we skip */}
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground/60 font-semibold mb-4">
                What we skip
              </p>
              <ul className="space-y-2.5">
                {[
                  "Heatmaps",
                  "Session replay",
                  "Feature flags",
                  "Onboarding",
                  "Surveys",
                  "A/B testing",
                  "Dashboards",
                  "Funnels",
                  "Reverse ETL",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted-foreground/50 line-through"
                  >
                    <X className="size-3.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* What we do */}
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-sv-teal-500 font-semibold mb-4">
                What we do
              </p>
              <ul className="space-y-2.5">
                {["Event collection", "Querying"].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <Check className="size-3.5 shrink-0 text-sv-teal-400" />
                    {item}
                  </li>
                ))}
                <li className="bg-[url('/gradient-bg.png')] bg-cover bg-center rounded-md p-[1.5px] mt-1">
                  <div className="bg-background rounded-[5px] px-2.5 py-1.5 text-sm font-semibold text-foreground">
                    Extend it your way
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Adaptable to your workflow */}
      <section id="playbooks" aria-label="Playbooks" className="relative py-24 md:py-32 border-t border-border/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Adaptable to your workflow
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Build anything you want on top of Mere. Use our playbooks.
            </p>
          </div>

          <Playbooks />
        </div>
      </section>

      {/* Secure and privacy-focused */}
      <section aria-label="Security" className="relative py-24 md:py-32 border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">
            Secure and privacy-focused
          </h2>

          <div className="max-w-2xl mx-auto bg-[url('/gradient-bg.png')] bg-cover bg-center rounded-xl p-[2px]">
            <div className="bg-background rounded-[10px] px-8 py-10 md:px-12 md:py-12">
              <p className="text-xl md:text-2xl font-semibold tracking-tight leading-relaxed text-muted-foreground">
                We don&apos;t sell, share, or train on your data.
                <br />
                Emails, credit cards, SSNs, and phone numbers masked by default.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ridiculously cheap */}
      <section id="pricing" aria-label="Pricing" className="relative py-24 md:py-32 border-t border-border/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Ridiculously cheap
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Because we do so little, we don&apos;t need much to make it work.
            </p>
          </div>

          <PriceSlider />
        </div>
      </section>

      {/* About the creators */}
      <section id="creators" aria-label="Creators" className="relative py-24 md:py-32 border-t border-border/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Built by a builder
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-left text-pretty">
              I&apos;m Jake. I set out to build an AI-pilled, agentic,
              hyperautomated, 1000x humanoid product analytics toolkit but
              ended up here at the opposite end of the spectrum after
              realizing that many people don&apos;t need or want all that,
              myself included.
            </p>
          </div>

          <Creators />
        </div>
      </section>

      <Footer />
    </div>
  )
}
