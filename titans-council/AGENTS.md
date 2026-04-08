# Agents Registry

> Complete roster of all agents in the Titans of Direct Response Mastermind Council.

## Overview

| Category | Count | Activation | Location |
|----------|-------|------------|----------|
| Copywriter Agents | 18 | Automatic (every project) | `agents/*.md` |
| Leadership Agents | 3 | Invoke-only (user request) | `agents/leadership/*.md` |
| Quality Gate Agents | 3 | Automatic (after council) | `agents/quality_gate/*.md` |
| Security Reviewer | 1 | On-demand | `.claude/agents/security-reviewer.md` |
| Code Reviewer | 1 | On-demand | `.claude/agents/code-reviewer.md` |

## Copywriter Agents (18) -- Run Automatically

Each agent independently analyzes the offer brief and produces a complete take with positioning, mechanisms, headlines, hooks, messaging framework, and sample copy.

| # | Agent | File | Specialty |
|---|-------|------|-----------|
| 1 | Eugene Schwartz | `agents/eugene_schwartz.md` | Awareness levels, market sophistication, breakthrough advertising |
| 2 | Jay Abraham | `agents/jay_abraham.md` | Strategic alliances, preeminence, exponential growth levers |
| 3 | Todd Brown | `agents/todd_brown.md` | Unique mechanisms, E5 method, info-marketing funnels |
| 4 | Dan Kennedy | `agents/dan_kennedy.md` | No B.S. direct response, magnetic marketing, direct mail economics |
| 5 | Alex Hormozi | `agents/alex_hormozi.md` | Grand Slam offers, value equations, $100M methodology |
| 6 | Brian Kurtz | `agents/brian_kurtz.md` | Overdeliver philosophy, list-building, multi-channel DR |
| 7 | Gary Bencivenga | `agents/gary_bencivenga.md` | Persuasion equations, proof-heavy copy, testing discipline |
| 8 | Joe Sugarman | `agents/joe_sugarman.md` | Triggers, slippery slide, emotional selling, print advertising |
| 9 | Bill Mueller | `agents/bill_mueller.md` | Ezra Firestone-era ecommerce, retention, LTV optimization |
| 10 | Perry Marshall | `agents/perry_marshall.md` | 80/20 principle, Google Ads mastery, strategic triangles |
| 11 | Jon Buchan | `agents/jon_buchan.md` | Charm offensive outreach, humor-driven B2B, pattern interrupts |
| 12 | Lead Gen Jay | `agents/lead_gen_jay.md` | Lead generation systems, paid traffic, funnel optimization |
| 13 | Liam Ottley | `agents/liam_ottley.md` | AI agency models, modern SaaS positioning, automation-first |
| 14 | Tom Bilyeu | `agents/tom_bilyeu.md` | Impact theory, mindset-driven branding, content-first growth |
| 15 | Ken McCarthy | `agents/ken_mccarthy.md` | Internet marketing pioneer, system of systems, fundamentals |
| 16 | Fred Catona | `agents/fred_catona.md` | DRTV, infomercials, broadcast direct response |
| 17 | Greg Renker | `agents/greg_renker.md` | Guthy-Renker legacy, celebrity-driven DR, TV scaling |
| 18 | Gordon Grossman | `agents/gordon_grossman.md` | Boardroom Inc., subscription copy, long-form financial DR |

## Leadership Agents (3) -- Invoke-Only

These agents are NOT part of the default pipeline. Users must explicitly request them.

| # | Agent | File | Specialty |
|---|-------|------|-----------|
| 1 | Colin Powell | `agents/leadership/colin_powell.md` | Commander's clarity, decisive communication |
| 2 | David Marquet | `agents/leadership/david_marquet.md` | Intent-based leadership, team empowerment |
| 3 | Simon Sinek | `agents/leadership/simon_sinek.md` | Why-first communication, infinite game thinking |

## Quality Gate Agents (3) -- Run Automatically After Council

| # | Agent | File | Role |
|---|-------|------|------|
| 1 | Creator QG | `agents/quality_gate/creator_qg.md` | Validates creative completeness (10-point review, scored /100) |
| 2 | Critic QG | `agents/quality_gate/critic_qg.md` | Stress-tests for gaps, weak claims, competitive vulnerability (scored /100) |
| 3 | Approver QG | `agents/quality_gate/approver_qg.md` | Final ship/revise/send-back decision based on Creator + Critic reviews |

## Infrastructure Agents (2) -- On-Demand

| # | Agent | File | Role |
|---|-------|------|------|
| 1 | Security Reviewer | `.claude/agents/security-reviewer.md` | Client data handling, output quality, PII in generated content |
| 2 | Code Reviewer | `.claude/agents/code-reviewer.md` | Pipeline code quality, agent prompt consistency, template integrity |

## Agent Interaction Flow

```
Brief Input
    |
    v
[18 Copywriter Agents] -- parallel batches of 6
    |
    v
[Council Round 1 - V1] -- synthesize all takes
    |
    v
[Council Round 2 - V2] -- refine and debate
    |
    v
[Council Round 3 - Final] -- lock in final version
    |
    v
[Quality Gate: Creator -> Critic -> Approver]
    |
    v
[Approved] --> Docs + Publish
[Send Back] --> Re-run Round 3
```

## Adding New Agents

1. Create agent definition file in `agents/` following the existing format
2. Update this file (AGENTS.md) with the new agent entry
3. Update CLAUDE.md folder structure and agent count
4. If the agent is a copywriter, add to the parallel batch execution in the pipeline
5. Test with a sample brief to verify voice distinctiveness
