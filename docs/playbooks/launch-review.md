---
title: Launch Review
description: Measure adoption and downstream behavior after a release.
section: Playbooks
---

# Launch Review

Use this playbook after shipping a feature or campaign.

## Goal

Understand whether users discovered the launch, adopted it, and kept using it.

## Inputs

| Input | Description |
| --- | --- |
| Launch date | Date and time the release became available. |
| Feature event | Event that represents actual feature usage. |
| Exposure event | Event that shows the user saw the feature. |
| Success metric | Downstream behavior the feature should improve. |

## Steps

1. Count exposed users.
2. Count users who tried the feature.
3. Calculate exposure-to-use conversion.
4. Compare the success metric before and after launch.
5. Segment adoption by plan, acquisition source, and account age.

## Escalation criteria

Escalate when exposure is high but usage is low, or when usage is high but the downstream success metric does not move.

