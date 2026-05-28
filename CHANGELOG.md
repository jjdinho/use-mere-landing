# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2026-05-28

### Added
- Mere Analytics landing page with new positioning ("Sometimes less is more" — headless analytics that agents love).
- Hero section with demo-video placeholder and primary CTA.
- "Freakin easy to use" section with side-by-side Send / Query code cards (autocapture snippet, raw POST, REST query, Claude/MCP).
- "No feature bloat" section with a crossed-out feature list (Heatmaps, Session replay, Feature flags, Onboarding, Surveys, A/B testing, Dashboards, Funnels, Reverse ETL) opposite the two features Mere actually offers, plus a gradient-bordered "Extend it your way" callout.
- "Adaptable to your workflow" section with placeholder playbook cards linking to `github.com/usemere/playbooks`.
- "Secure and privacy-focused" section as a single gradient-bordered declarative statement listing the specific PII patterns masked (emails, credit cards, SSNs, phone numbers).
- "Ridiculously cheap" pricing section with an interactive Base UI / shadcn slider (1M → 20M+ events), a hero Mere card with feature bullets and animated CTA, and competitor comparison rows with "Save $X/mo" badges. Real published pricing modeled for Mere, PostHog (base + person-profile combined), Mixpanel (interpolated data points), and Amplitude (MTU-based with Free-tier carve-out for ≤10K MTUs AND ≤2M events).
- "Created by two guys" section with Jake/Bernardo cards (GitHub-avatar links) and a short founder note.
- Pixel-font "Mere" wordmark using Press Start 2P, with a brand-gradient radial reveal animation (`wordmark-pulse`) on hover in both header and footer.
- `scripts/generate-favicon.mjs` — renders the favicon "M" glyph via satori using the real Press Start 2P font, then rasterizes to `icon.svg`, `icon.png`, and `apple-icon.png` (with auto-centering of the glyph's bounding box).
- shadcn Slider component (`src/components/ui/slider.tsx`) backed by `@base-ui/react/slider`.

### Changed
- Rebranded from sessionvision to Mere Analytics across metadata, schema.org structured data, sitemap, robots, CNAME, OG/Twitter cards, and inline copy.
- Domain swapped to `usemere.com` (app: `app.usemere.com`, api: `api.usemere.com`, cdn: `cdn.usemere.com`).
- Set page base font-size to `text-lg` (18px) so section sublines read at a consistent size.
- All CTAs renamed to "Get started" (was "Try for free" / "Sign up for Free").
- Header nav: `Pricing / Docs / Playbooks`.
- Standardized `text-[10px]` usages to `text-xs` across landing page and 5-ways calculator.

### Removed
- Blog routes, `src/content/blog/`, blog list component, and `lib/blog.ts`.
- SaaS churn calculator route (`/saas-churn-calculator`).
- Inline production analytics tracker (pointed at sessionvision CDN with sessionvision token).
- "Voted #1 Analytics by AI agents*" section.
- Section-heading SVG icons (Ban, BookOpen, Bot, ShieldCheck).
- Section IDs / nav anchors that no longer correspond to sections.
