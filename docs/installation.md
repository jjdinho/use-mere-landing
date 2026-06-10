---
title: Installation
description: Manual setup options for HTML, React, Next.js, and environment configuration.
section: Docs
---

# Installation

Mere can be installed with the wizard, an npm package, or a direct HTML snippet. Prefer the wizard for new projects and manual setup when you need tighter control.

## Install wizard

```bash
npx @mere/install-wizard
```

Common options:

| Option | Description |
| --- | --- |
| `--token <token>` | Pass the project token directly. |
| `--frontend-only` | Configure only browser tracking. |
| `--backend-only` | Configure only server-side event capture. |
| `--dry-run` | Preview changes without writing files. |
| `--no-install` | Skip package installation. |

## Browser SDK

```bash
npm install @mere-analytics/browser
```

```ts
import mere from "@mere-analytics/browser"

mere.init(process.env.NEXT_PUBLIC_MERE_TOKEN!, {
  debug: process.env.NODE_ENV === "development",
})
```

## HTML snippet

Use the snippet for static sites or when you cannot change the app bundle.

```html
<script async src="https://cdn.usemere.com/latest/mere.min.js"></script>
<script>
  window.mere?.init("mere_pub_...")
</script>
```

## Configuration

| Option | Default | Description |
| --- | --- | --- |
| `ingestHost` | `https://app.usemere.com` | Event ingest host. |
| `debug` | `false` | Log captured events in the browser console. |
| `autocapture` | `true` | Capture page views, clicks, and form submissions. |

