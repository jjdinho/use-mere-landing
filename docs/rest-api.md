---
title: REST API
description: HTTP API conventions, authentication, events, and errors.
section: API Reference
---

# REST API

Use the REST API for server-side ingestion and automation.

## Authentication

Send an API token with each request:

```bash
curl https://app.usemere.com/api/v1/events \
  -H "Authorization: Bearer mere_sk_..."
```

## Event ingestion

```bash
curl https://app.usemere.com/api/v1/events \
  -H "Authorization: Bearer mere_sk_..." \
  -H "Content-Type: application/json" \
  -d '{
    "event": "invoice_paid",
    "user_id": "user_123",
    "properties": {
      "amount": 9900,
      "currency": "usd"
    }
  }'
```

## Pagination

List endpoints should use cursor pagination:

```txt
GET /api/v1/events?limit=100&cursor=...
```

## Errors

| Status | Meaning |
| --- | --- |
| `400` | Invalid request body or query parameters. |
| `401` | Missing or invalid authentication. |
| `403` | Token does not have access to the requested project. |
| `429` | Rate limit exceeded. |
| `500` | Unexpected server error. |

