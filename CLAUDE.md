# Facebook Marketing Agency — Autonomous Business

## What This Is

A full-service Facebook marketing agency structured as a Paperclip-style autonomous business with three divisions. Internal for now, architected to sell as a service.

## Architecture

**Orchestration:** Claude Code scheduled tasks (execution) + Paperclip agent patterns (role design)
**Communication:** File-based shared data hub at `data/shared/` — JSON files are the message bus
**Browser Automation:** Claude in Chrome MCP tools for all Facebook Ads Manager and publishing operations

## The Three Divisions

### Division 1: Paid Ads Agency
Full lifecycle Facebook ads management:
- Scrape winning ads from Meta Ad Library (Apify)
- Analyze hooks, angles, copy, CTAs
- Create campaigns in Ads Manager (browser automation)
- Launch ads with Eddie-generated creatives
- Monitor every 30 minutes (CPC, CPM, CTR, CPA, ROAS)
- Auto-optimize: kill losers, scale winners, adjust budgets
- Retargeting funnel: TOF → MOF → BOF

**Agents:** Media Buyer, Performance Monitor, Creative Strategist, Audience Researcher, Reporting Analyst
**Agent prompts:** `agents/division-1-paid/`

### Division 2: Organic Content Agency
Cross-platform organic content engine:
- Scrape winning organic posts (FB, IG, TikTok via Apify)
- Generate content variations in brand voice (Claude)
- Publish across platforms (browser automation)
- Monitor engagement and respond to comments
- Identify trends and replicate winning formats

**Agents:** Content Researcher, Content Creator, Scheduler/Publisher, Community Manager, Trend Spotter
**Agent prompts:** `agents/division-2-organic/`

### Division 3: Eddie Vibe Marketer
Self-improving ad creative generation pipeline (existing system):
- Phase 1: Competitor research (Apify + Whisper)
- Phase 2: Brand voice validation
- Phase 3: Script generation (Claude × ICPs)
- Phase 4: Creative production (UGC briefs + Arcads)
- Phase 5: Performance optimization → learnings feedback loop

**Source:** `eddie-vibe-marketer/` (symlinked from OpenClaw 10X)
**Run:** `cd eddie-vibe-marketer && npm run full-cycle`

## Shared Data Paths

| Path | Purpose | Written By | Read By |
|------|---------|------------|---------|
| `data/shared/winning-patterns/paid-ads/` | Winning paid ad patterns | Div 1 | Div 2, 3 |
| `data/shared/winning-patterns/organic/` | Winning organic patterns | Div 2 | Div 1, 3 |
| `data/shared/performance-data/` | Campaign metrics snapshots | Div 1 | All |
| `data/shared/creative-library/` | Generated scripts + creatives | Div 3 | Div 1, 2 |
| `data/shared/audience-insights/` | ICP performance data | Div 1 | All |
| `data/shared/content-calendar/` | Scheduled organic content | Div 2 | Div 2 |
| `data/shared/reports/` | Daily/weekly/monthly reports | All | All |

## Configuration Files

- `config/agency.json` — Global settings: business name, clients, budgets
- `config/thresholds.json` — Kill/scale/flag rules for ad optimization
- `config/ad-accounts.json` — Meta ad account IDs and access tokens
- `.env` — API keys (Apify, OpenAI, Anthropic, Arcads, Singular)

## Optimization Decision Matrix (30-Minute Monitor)

```
CPA > 2x target AND spend > $50 AND 24h+     → KILL (pause ad set)
ROAS < 0.5 AND 48h+                           → KILL
CTR < 0.5% AND 24h+                           → FLAG for review
CPA < target AND ROAS > 2x AND 48h+ stable    → SCALE (+20% budget)
Frequency > 3.5                                → FLAG creative fatigue → trigger Eddie refresh
Daily spend > 150% budget                      → CIRCUIT BREAKER (pause everything)
```

## Campaign Structure

- **Testing (ABO):** $5-20/day per ad set, 3-5 ads each, broad targeting
- **Scaling (CBO):** Winners graduated at 3-5x test budget
- **Retargeting TOF:** Prospecting (lookalikes, interests, broad)
- **Retargeting MOF:** Video viewers (25/50/75%), page engagers
- **Retargeting BOF:** Website visitors, add-to-cart, checkout
- **Naming:** `[Client]_[Obj]_[Audience]_[Creative]_[Date]`

## Scheduled Tasks

| Task | Cron | Division |
|------|------|----------|
| ads-monitor-30min | `*/30 6-23 * * *` | Div 1 |
| daily-report | `0 8 * * *` | Div 1 |
| weekly-strategy | `0 9 * * 1` | Div 1 |
| creative-refresh | On fatigue trigger | Div 1→3 |
| organic-scraper | `0 */6 * * *` | Div 2 |
| organic-publisher | `0 9,13,17 * * *` | Div 2 |
| community-responder | `0 */2 * * *` | Div 2 |
| eddie-cycle | `0 3 * * 0` | Div 3 |

## Alerting

| Tier | Trigger | Action |
|------|---------|--------|
| P0 Critical | Spend >150% daily budget | Auto-pause all, Slack DM |
| P1 Urgent | CPA >3x target for 24h | Auto-pause ad set, Slack alert |
| P2 Warning | Frequency >3.5 | Queue creative refresh, Slack |
| P3 Info | Daily report ready | Slack #ads-reports |

## Cross-Division Data Flow

```
Div 1 scrapes winning PAID ads → winning-patterns/paid-ads/
  ↓
Div 2 reads paid patterns → adapts for organic → winning-patterns/organic/
  ↓
Div 3 (Eddie) reads BOTH → generates scripts → creative-library/
  ↓
Div 1 launches Eddie creatives as ads → monitors → performance-data/
  ↓
Performance data → Div 3 learnings → next cycle gets smarter
```

## Brand Voice

Symlinked from `eddie-vibe-marketer/brand-voice/`:
- `writing-rules.md` — Anti-AI-slop rules
- `voice.md` — Brand tone, vocabulary, example scripts
- `product.md` — Product features, proof points
- `icp.md` — Audience personas (multiplication factor)

## Running the Agency

```bash
# Full Eddie Vibe Marketer cycle
cd eddie-vibe-marketer && npm run full-cycle

# Individual phases
npm run phase1:research
npm run phase3:generate
npm run phase4:produce
npm run phase5:optimize

# Monitoring (runs via scheduled tasks automatically)
# Manual trigger:
claude -p "Run the ads monitor check now"
```
