---
title: Authoring Skills
description: How to write skill instructions that agents can reliably follow.
section: Agent Skills
---

# Authoring Skills

A good skill is short, concrete, and operational. It should tell the agent when to use the skill, what files or tools matter, and what output is expected.

## Recommended structure

```md
# Skill Name

## When to use

Use this skill when...

## Workflow

1. Gather context.
2. Run the relevant query or script.
3. Produce the expected output.

## Output

Return...
```

## Keep skills focused

One skill should cover one workflow. If a skill needs multiple unrelated modes, split it.

## Prefer source-backed docs

The public docs page should summarize the skill, but `SKILL.md` should remain the source of truth for the agent.

