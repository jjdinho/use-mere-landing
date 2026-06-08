---
title: JavaScript SDK
description: Browser SDK methods for initialization, event capture, identity, and shared properties.
section: API Reference
---

# JavaScript SDK

The JavaScript SDK runs in the browser and captures product usage events.

## `init(token, options?)`

Initializes the SDK.

```ts
Mere.init("mere_pub_...", {
  debug: true,
  autocapture: true,
})
```

## `capture(event, properties?)`

Captures a custom event.

```ts
Mere.capture("plan_selected", {
  plan: "pro",
  billing_cycle: "annual",
})
```

## `identify(userId, traits?)`

Associates future events with a known user.

```ts
Mere.identify("user_123", {
  email: "jane@example.com",
  plan: "pro",
})
```

## `reset()`

Clears the current identity and starts a new anonymous session.

```ts
Mere.reset()
```

## `register(properties)`

Adds properties to every future event.

```ts
Mere.register({
  app_version: "2.1.0",
})
```

