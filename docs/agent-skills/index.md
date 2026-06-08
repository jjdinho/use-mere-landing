---
title: Agent Skills
description: Documentation for packaging Mere workflows as reusable agent skills.
section: Agent Skills
---

# Agent Skills

Agent skills turn repeatable workflows into structured instructions an AI assistant can follow.

Use skills for workflows that require consistent steps, specific tool use, or a standard output format.

## Available pages

| Page | Description |
| --- | --- |
| [Authoring Skills](/docs/agent-skills/authoring) | How to write a useful skill file. |
| [Skill Catalog](/docs/agent-skills/catalog) | How generated skill documentation should be organized. |

## Repository model

Keep skill source files close to the workflows they describe:

```txt
skills/
  weekly-digest/
    SKILL.md
  launch-review/
    SKILL.md
```

Generated docs can then be copied or indexed into:

```txt
docs/agent-skills/generated/
```

