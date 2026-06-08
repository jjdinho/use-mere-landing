---
title: Quick Start
description: Install Mere, send your first event, and verify the integration.
section: Docs
---

# Quick Start

Use the install wizard when possible. It detects your app framework, installs the right package, writes local configuration, and sends a test event.

```bash
npx @mere/install-wizard
```

## 1. Create a project

Create a Mere project and copy the project token from settings. Project tokens are safe to use in browser clients and usually look like this:

```txt
mere_pub_...
```

## 2. Install the SDK

For a JavaScript or TypeScript app:

```bash
npm install @mere/core
```

Then initialize Mere once in your app entrypoint:

```ts
import Mere from "@mere/core"

Mere.init("mere_pub_...")
```

## 3. Send a custom event

Autocapture starts after initialization, but a custom event is the fastest verification path.

```ts
Mere.capture("docs_quickstart_completed", {
  source: "docs",
})
```

## 4. Verify

Open the dashboard and confirm that page views, clicks, and the custom event are arriving. During local setup, enable debug logging:

```ts
Mere.init("mere_pub_...", {
  debug: true,
})
```

