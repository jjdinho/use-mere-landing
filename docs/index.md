---
title: Docs
description: Browse Mere install guides, API reference, playbooks, and agent skill documentation.
section: Docs
---

# Mere Documentation

Mere keeps analytics deliberately small: collect useful product events, make them easy to query, and expose them to humans and agents without a heavy analytics workspace.

This documentation site is published at `/docs` from the same GitHub Pages artifact as the landing site. That keeps the first version simple: one repository, one static build, one custom domain.

## Start here

Use these sections depending on what you are trying to do.

| Section | Use it for |
| --- | --- |
| Install | Add Mere to an app, configure a token, and verify events. |
| API Reference | Look up SDK methods, event payloads, and REST endpoints. |
| Playbooks | Follow repeatable workflows for common product analytics jobs. |
| Agent Skills | Package repeatable agent workflows so assistants can use Mere consistently. |

## Current publishing model

The docs are part of the main static site:

```txt
usemere.com/       -> landing
usemere.com/docs   -> documentation
```

If docs later need `docs.usemere.com`, the source can stay in this monorepo while CI publishes the built docs artifact to a separate GitHub Pages hosting repository.

