---
title: Skill Catalog
description: How the docs site should present available agent skills.
section: Agent Skills
---

# Skill Catalog

The skill catalog should help users understand which skills exist, what each one does, and when to use it.

## Catalog fields

| Field | Description |
| --- | --- |
| Name | Human-readable skill name. |
| Trigger | When an agent should use the skill. |
| Inputs | Files, project context, or credentials required. |
| Output | The artifact or answer the skill produces. |
| Source | Link to the underlying `SKILL.md`. |

## Generated catalog

Later, generate this page by scanning `skills/*/SKILL.md` and extracting frontmatter or headings.

```txt
skills/*/SKILL.md -> docs/agent-skills/generated/catalog.md
```

