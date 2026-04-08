# Funnel Flow AI

Autonomous funnel building team for Go High Level. Give it a spec, it builds the funnel — pages, copy, forms, workflows, email sequences — all inside GHL via browser automation.

## How It Works

```
You submit a funnel spec (client, offer, funnel type)
    ↓
Agent picks it up from the queue
    ↓
Clones a GHL template funnel
    ↓
Customizes every page (copy, forms, images, CTAs)
    ↓
Sets up pipeline, workflow, email sequence
    ↓
QA checks everything (desktop + mobile screenshots, form test)
    ↓
Reports to Slack with preview links
    ↓
You review and activate
```

## Quick Start

```bash
# Clone the repo
git clone https://github.com/jbellsolutions/funnel-flow-ai.git
cd funnel-flow-ai

# Open in Claude Code
claude

# Queue your first funnel
> /queue-project

# Or build directly
> /build-funnel --client "Acme Staffing" --type full-sales --offer "AI staffing system, $2,500 setup"
```

## Requirements

- **Claude Code** with Claude in Chrome MCP (browser automation)
- **Go High Level** account (any plan — browser automation works on Starter)
- **ClickUp** for project tracking (workspace already configured)
- **Slack** for notifications
- **Gmail** for client communication (drafts only, never auto-send)

## Commands

| Command | What It Does |
|---------|-------------|
| `/build-funnel` | Build a funnel from spec — the main operation |
| `/queue-project` | Add a project to the build queue |
| `/qa-check` | Run QA on a built funnel |
| `/catalog-templates` | Scan GHL and update template registry |

## Funnel Types

| Type | Pages | Build Time |
|------|-------|-----------|
| **Lead Gen Opt-In** | opt-in, thank-you | ~10 min |
| **VSL + Application** | VSL, application, confirmation, calendar | ~20 min |
| **Webinar Registration** | registration, confirmation, replay, offer | ~20 min |
| **Full Sales** | opt-in, VSL, application, checkout, upsell, thank-you | ~30 min |
| **Challenge Funnel** | registration, day 1-5, offer, checkout | ~45 min |

## Architecture

```
Funnel Flow AI
├── playbooks/              # Agent instructions (read every run)
│   └── funnel-builder.md   # Master playbook with full build procedure
├── skills/                 # Slash commands
│   ├── build-funnel/       # /build-funnel — core build operation
│   ├── queue-project/      # /queue-project — add to queue
│   ├── qa-check/           # /qa-check — quality assurance
│   └── catalog-templates/  # /catalog-templates — scan GHL
├── state/                  # Runtime state (persists between sessions)
│   ├── builds/             # Queue, history, last-run
│   ├── templates/          # GHL template registry
│   └── health/             # System health status
├── config/                 # Configuration
│   ├── ghl.json            # GHL account settings
│   ├── thresholds.json     # Rate limits, QA requirements
│   ├── schedules.json      # Agent scheduling
│   └── funnel-types.json   # Supported funnel architectures
└── scripts/                # Utility scripts
    └── run-agent.sh        # Agent lifecycle manager
```

## Execution Model

- **Trigger**: Scheduled (9am/2pm weekdays) or manual via Claude Code
- **Runtime**: Claude Code session with browser automation
- **State**: JSON files on disk persist between ephemeral sessions
- **Safety**: All funnels built in draft mode — human publishes
- **Reporting**: Slack notifications + ClickUp task updates + Gmail drafts

## GHL Browser Automation

Since GHL Starter plan has no API access, all operations use browser automation:

| Operation | How |
|-----------|-----|
| Clone funnel | 3-dot menu → Clone |
| Edit page | 3-dot menu → Edit → step → blue Edit button |
| Update text | Click element → type new text |
| Configure form | Click form → Form Fields tab |
| Create workflow | Automation → Workflows → Create → configure triggers/actions |
| Create pipeline | Opportunities → Pipelines → Create |

The agent uses Claude in Chrome MCP for local execution, or headless browser (gstack) for VPS deployment.

## Safety Guarantees

- All funnels built in **draft mode** — never auto-published
- All emails are **Gmail drafts** — never auto-sent
- **Never enters** payment credentials, API keys, or passwords
- **Never deletes** existing funnels — only clones and creates new
- **Never modifies** funnels outside the current project queue
- If GHL auth expires → **stops immediately** and alerts Slack
- Rate limited: max 2 builds per run, 4 per day

## Integration Points

| System | Purpose |
|--------|---------|
| **Go High Level** | Funnel builder, CRM, workflows, email |
| **ClickUp** | Project queue, template library, build history |
| **Slack** | #funnel-ops notifications, alerts, requests |
| **Gmail** | Client delivery drafts |
| **Paperclip Ops Hub** | Parent system (optional integration) |

## Configuration

### GHL Account
Edit `config/ghl.json` with your GHL location ID and sub-account name.

### Rate Limits
Edit `config/thresholds.json` to adjust build limits, QA requirements.

### Schedule
Edit `config/schedules.json` for agent run frequency.

### Templates
Run `/catalog-templates` to scan GHL and populate `state/templates/registry.json`.

## Cost

| Item | Cost |
|------|------|
| GHL (Starter) | $97/mo (existing) |
| Claude Code runs (~4/day) | $2-6/mo |
| **Total** | ~$100/mo |
| **Revenue per funnel** | $500-$2,500 |
| **Break-even** | 1 funnel/month |
