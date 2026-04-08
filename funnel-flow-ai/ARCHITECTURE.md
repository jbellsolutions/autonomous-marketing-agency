# Architecture

## System Overview

```
┌────────────────────────────────────────────────────────┐
│                   FUNNEL FLOW AI                        │
│                                                        │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐         │
│  │  ClickUp │    │  Slack   │    │  Gmail   │         │
│  │  Queue   │◄──►│ #funnel  │    │  Drafts  │         │
│  │          │    │  -ops    │    │          │         │
│  └────┬─────┘    └────┬─────┘    └────┬─────┘         │
│       │               │               │                │
│       ▼               ▼               ▼                │
│  ┌─────────────────────────────────────────────┐       │
│  │         FUNNEL BUILDER AGENT                 │       │
│  │                                              │       │
│  │  1. Read Queue     → state/builds/queue.json │       │
│  │  2. Parse Spec     → generate copy if needed │       │
│  │  3. Select Template→ state/templates/registry│       │
│  │  4. Clone in GHL   → browser automation      │       │
│  │  5. Customize Pages→ browser automation      │       │
│  │  6. Setup CRM      → pipeline, workflow, tags│       │
│  │  7. QA Check       → screenshots, form test  │       │
│  │  8. Report         → Slack, ClickUp, Gmail   │       │
│  │  9. Update State   → state/builds/*.json     │       │
│  └─────────────────────┬────────────────────────┘       │
│                        │                                │
│                        ▼                                │
│  ┌─────────────────────────────────────────────┐       │
│  │        GO HIGH LEVEL (Browser)               │       │
│  │                                              │       │
│  │  Sites > Funnels ──── Clone, Edit, Save      │       │
│  │  Automation ──────── Workflows               │       │
│  │  Opportunities ──── Pipelines                │       │
│  │  Marketing ──────── Email Templates          │       │
│  │  Contacts ────────── Tags, Custom Fields     │       │
│  └──────────────────────────────────────────────┘       │
└────────────────────────────────────────────────────────┘
```

## Data Flow

### Build Lifecycle
```
Spec Submitted (ClickUp/Slack/Gmail)
    │
    ▼
Queue Entry Created (state/builds/queue.json)
    │
    ▼
Agent Picks Up (status: queued → in_progress)
    │
    ├──► Template Selected (state/templates/registry.json)
    ├──► Copy Generated (if not provided)
    ├──► GHL Clone (browser: Sites > Funnels > Clone)
    ├──► Pages Customized (browser: page builder)
    ├──► CRM Setup (browser: pipelines, workflows, tags)
    ├──► QA Passed (screenshots + form test)
    │
    ▼
Delivered (Slack + ClickUp + Gmail draft)
    │
    ▼
Human Reviews → Publishes
    │
    ▼
Status: live (state updated)
```

### State Persistence
```
state/
├── builds/
│   ├── queue.json         ← Projects waiting to be built
│   ├── history.json       ← Completed builds with evidence
│   └── last-run.json      ← Most recent agent run details
├── templates/
│   └── registry.json      ← GHL funnel catalog (from browser scan)
└── health/
    └── status.json        ← System health (auth, connections)
```

### Browser Automation Flow
```
Claude Code Session
    │
    ├──► Claude in Chrome MCP (local)
    │    └──► Real Chrome browser with GHL cookies
    │
    └──► gstack headless (VPS)
         └──► Headless Chromium with GHL cookies

Navigation Pattern:
    app.gohighlevel.com
    └── /v2/location/{id}/funnels-websites/funnels
        └── 3-dot menu → Clone/Edit
            └── Step overview → blue Edit button
                └── Page Builder (drag-drop editor)
                    └── Click elements → modify in right panel
                        └── Save → Preview → Screenshot
```

## Integration Points

```
┌────────────┐     ┌────────────┐     ┌────────────┐
│  ClickUp   │     │   Slack    │     │   Gmail    │
│            │     │            │     │            │
│ Queue list │     │ #funnel-   │     │  Draft     │
│ Templates  │     │  ops       │     │  delivery  │
│ History    │     │ Alerts     │     │  to client │
└─────┬──────┘     └─────┬──────┘     └─────┬──────┘
      │                  │                   │
      └──────────────────┼───────────────────┘
                         │
              ┌──────────┴──────────┐
              │   Funnel Flow AI    │
              │   (Claude Code)     │
              └──────────┬──────────┘
                         │
              ┌──────────┴──────────┐
              │   Go High Level     │
              │   (Browser Auto)    │
              └─────────────────────┘
```
