# Gemini AI Instructions

> Instructions for Google Gemini (via AI Studio, Gemini API, or Gemini in IDEs) working with the Titans of Direct Response Mastermind Council.

## Project Overview

This is an AI copywriter council system with 18 legendary copywriter agents, 3 leadership agents (invoke-only), and a 3-agent Quality Gate. The system runs any offer through all agents independently, then synthesizes through 3 council rounds, and validates through a Quality Gate before producing client-ready deliverables.

## Key Files to Read First

1. `CLAUDE.md` -- Full pipeline instructions, folder structure, rules (primary source of truth)
2. `AGENTS.md` -- Complete agent roster with specialties
3. `Titan-Genome-Content-Multiplier/SWIPE_FILE_CONTEXT.md` -- The Titan Genome DNA patterns
4. `.claude/commands/titans.md` -- The `/titans` slash command pipeline

## Critical Rules

1. Each project is isolated. No agent carries memory between projects.
2. All 18 copywriter agents participate in every project. Leadership agents are invoke-only.
3. Individual takes come BEFORE the council. Never skip Phase 1.
4. Three council rounds exactly: V1, V2, Final.
5. Quality Gate runs AFTER the council, BEFORE docs/publishing.
6. Credit sources. Every council idea credits which copywriter originated it.
7. No generic output. Every piece must sound like it came from a specific legendary copywriter.
8. The Titan Genome (`SWIPE_FILE_CONTEXT.md`) is the mechanism reference.

## Voice Preservation

Each copywriter agent has a unique perspective that must be preserved:

- **Schwartz**: Awareness levels (unaware -> most aware), market sophistication stages
- **Hormozi**: Value equation (Dream Outcome x Perceived Likelihood / Time Delay x Effort & Sacrifice)
- **Kennedy**: No B.S. direct response, renegade millionaire mindset, direct mail economics
- **Abraham**: Preeminence, strategic alliances, exponential growth
- **Brown**: Unique mechanisms, E5 method, big idea marketing

Read each agent's `.md` file before generating their take.

## Folder Structure

```
agents/              -- 18 copywriter + 3 leadership + 3 QG agent definitions
projects/            -- All client project outputs
Titan-Genome-Content-Multiplier/  -- Library, templates, swipe files
rules/               -- Operational rules
```

## Working With This Repo

- Start by reading `CLAUDE.md` for the full pipeline
- Use `features.json` for capability discovery
- Check `claude-progress.txt` for session continuity
- Agent definitions are in `agents/*.md`
- Quality Gate definitions are in `agents/quality_gate/*.md`
