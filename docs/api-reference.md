---
title: API Reference
description: Overview of the Mere SDK and HTTP API reference.
section: API Reference
---

# API Reference

The API reference is split between browser SDK methods and HTTP endpoints.

## Browser SDK

Use the browser SDK for client-side event capture:

```ts
Mere.init("mere_pub_...")
Mere.capture("signup_completed")
Mere.identify("user_123")
```

Read the [JavaScript SDK reference](/docs/javascript-sdk) for method signatures and payload examples.

## REST API

Use the REST API for server-side ingestion, reporting, and automation.

Read the [REST API reference](/docs/rest-api) for authentication, endpoint shapes, pagination, and errors.

## Future generated reference

When the SDK and server package live in this monorepo, API pages should be generated from source comments, route definitions, or OpenAPI output rather than maintained by hand.

```txt
packages/sdk       -> docs/api/generated/sdk
packages/api       -> docs/api/generated/rest
```

