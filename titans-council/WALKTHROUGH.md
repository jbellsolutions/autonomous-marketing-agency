# Titans of Direct Response Mastermind Council — Setup Walkthrough

> **To install:** Open Claude Code in this folder and type `set this up for me` or `/walkthrough`

Claude Code will read this repo's actual files and walk you through every step interactively — starting a new project, running the 18-agent council, and packaging deliverables into a shareable GitHub repo.

---

## What This Repo Does

18 legendary direct response copywriter agents — Eugene Schwartz, Jay Abraham, Dan Kennedy, Gary Bencivenga, Todd Brown, Alex Hormozi, Brian Kurtz, Bill Mueller, Joe Sugarman, Perry Marshall, and 8 more — each analyzing your offer independently, then deliberating across 3 council rounds. Everything passes a 3-agent Quality Gate (Creator, Critic, Approver) before it ships. Output: production-ready positioning, brand voice, headlines, hooks, messaging framework, restructured offer, go-to-market playbook, and 32 optional content pieces. All packaged into a private GitHub repo you can share with one URL. No coding required.

---

## Prerequisites

- **Claude Code** — Anthropic's CLI ([install here](https://docs.anthropic.com/en/docs/claude-code/overview)) — takes 2 minutes
- **GitHub account** — free tier works (for publishing deliverable repos)
- **GitHub CLI (`gh`)** — so Claude can create repos ([install here](https://cli.github.com/)) — takes 1 minute
- **Anthropic API key** — set as `ANTHROPIC_API_KEY` environment variable

---

## Environment Variables

| Variable | Required | What It Is | Where to Get It |
|----------|----------|-----------|-----------------|
| `ANTHROPIC_API_KEY` | Yes | Claude API key — runs all 18 agents + 3 council rounds | console.anthropic.com → API Keys |
| `GITHUB_TOKEN` or `gh` auth | Yes | Creates private repos for client deliverables | `gh auth login` (recommended) |

```bash
# Set your API key (add to ~/.zshrc or ~/.bashrc for persistence)
export ANTHROPIC_API_KEY=sk-ant-your-key-here

# Authenticate GitHub CLI
gh auth login
```

---

## Quick Setup (3 Commands)

```bash
# 1. Open Claude Code in this folder
claude

# 2. Start a new project
# Just say: "new project"

# 3. Describe your offer
# Talk like a human. Claude asks questions, handles everything else.
```

That's it. Claude will:
1. Ask about your offer, audience, and current positioning
2. Run all 18 copywriter agents independently on your offer
3. Synthesize 3 rounds of council deliberation
4. Run a 3-agent Quality Gate with revisions applied
5. Ask if you want the Content Production Engine (32 optional pieces)
6. Package everything into a shareable private GitHub repo

---

## The 18 Agents at Your Mastermind Table

| Agent | Specialty | Known For |
|-------|-----------|-----------|
| Eugene Schwartz | Breakthrough advertising | Mass desires, mechanism framing |
| Jay Abraham | Strategy + leverage | Unconventional wisdom, host beneficiary |
| Dan Kennedy | No B.S. direct response | Hard offers, magnetic marketing |
| Gary Bencivenga | Scientific copywriting | Proof-based persuasion |
| Todd Brown | Mechanism mastery | Unique mechanism building |
| Alex Hormozi | Offer construction | Grand Slam Offers, value stacking |
| Brian Kurtz | Media + list strategy | Emotional storytelling, media mix |
| Bill Mueller | Direct response copy | Clean hooks, direct-response precision |
| Joe Sugarman | Trigger psychology | Psychological triggers, catalog copy |
| Perry Marshall | 80/20 + AdWords | Traffic, segmentation |
| Fred Catona | Radio/DRTV | Broadcast direct response |
| Gordon Grossman | List marketing | Database segmentation |
| Greg Renker | Infomercial | DRTV, long-form offers |
| Ken McCarthy | Internet direct response | Web conversion, early digital DR |
| LeadGenJay | Lead generation | B2B lead gen systems |
| Jon Buchan | Charm-based outreach | Disarming cold copy |
| Liam Ottley | AI agency | Modern AI offer positioning |
| Tom Bilyeu | Mission-driven brands | Story, transformation, content |

---

## What You Get Per Project

| Deliverable | What It Is |
|------------|-----------|
| 18 individual takes | Each agent's independent analysis of your offer |
| Council Round 1 | First synthesis with credited ideas and disagreements |
| Council Round 2 | Refined version after inter-agent critique |
| Council Round 3 (Final) | Production-ready: positioning, voice, headlines, hooks, messaging, offer, GTM playbook, sample copy |
| Quality Gate report | Creative score, stress test, final approval with revisions |
| Executive summary | One-page overview of the entire council run |
| Client README | Non-technical front page explaining everything |
| Content pieces (optional) | Up to 32 files: emails, sales pages, social calendar, VSL, handouts, case study |
| Private GitHub repo | Everything packaged at one shareable URL |

---

## Key Commands

| What to Type | Where | What Happens |
|-------------|-------|-------------|
| `claude` | Terminal in this folder | Opens Claude Code with full project context |
| `"new project"` | In Claude Code | Starts the intake process |
| `"run individual takes"` | In Claude Code | Runs all 18 agents on your brief |
| `"run council"` | In Claude Code | Runs 3 rounds of deliberation |
| `"quality gate"` | In Claude Code | Runs the 3-agent QG and applies revisions |
| `"content engine"` | In Claude Code | Starts the 32-piece content production |
| `"publish"` | In Claude Code | Creates private GitHub repo with all deliverables |

---

## Existing Projects in This Repo

The `projects/` folder contains completed council runs. Each project has its own subdirectory with all deliverables. The `Titan-Genome-Content-Multiplier/` folder contains the full content production system with all 32 template types.

---

*This file was deployed by [AGI-1](https://github.com/jbellsolutions/agi-1) — the self-healing, self-learning AI development framework.*
