# Facebook Marketing Agency

## What This Is

One machine that does one job well: **scrape winning ads → create better ads → publish → build funnels → optimize → repeat.**

Three integrated systems, one pipeline:

1. **Eddie Vibe Marketer** — Scrapes competitor ads, generates winning scripts in your brand voice, produces creatives
2. **Titans Council** — 18 legendary copywriter agents that review and sharpen every piece of copy
3. **Funnel Flow AI** — Builds conversion funnels in Go High Level via browser automation

## The Pipeline

```
SCRAPE: Apify scrapes Meta Ad Library for winning competitor ads
  ↓
TRANSCRIBE: OpenAI Whisper extracts hooks, angles, copy, CTAs
  ↓
ANALYZE: Titans Council (18 copywriters) reviews winning patterns
  ↓
GENERATE: Claude creates 50-200+ script variations × ICPs in brand voice
  ↓
QUALITY GATE: Writing rules filter + Titans quality review
  ↓
PRODUCE: UGC creator briefs + AI actor videos (Arcads/HeyGen)
  ↓
PUBLISH: Ads launched in Facebook Ads Manager
  ↓
FUNNEL: Funnel Flow AI builds landing pages in GHL
  ↓
OPTIMIZE: Performance data feeds back → next cycle gets smarter
```

## Running It

```bash
# Full creative generation cycle
cd eddie-vibe-marketer && npm run full-cycle

# Individual phases
cd eddie-vibe-marketer && npm run phase1:research    # Scrape competitor ads
cd eddie-vibe-marketer && npm run phase3:generate    # Generate scripts
cd eddie-vibe-marketer && npm run phase4:produce     # Create briefs + videos
cd eddie-vibe-marketer && npm run phase5:optimize    # Analyze performance

# Titans Council (run on any offer/campaign brief)
# Use /titans skill from the titans-council/ directory

# Build a funnel
# Use /build-funnel skill from funnel-flow-ai/ directory
```

## Project Structure

```
facebook-marketing-agency/
├── CLAUDE.md                      # This file
├── eddie-vibe-marketer/           # Symlink → ad scraping + script generation
├── titans-council/                # 18 copywriter agents + swipe file
├── funnel-flow-ai/                # Autonomous funnel builder (GHL)
├── campaigns/                     # Campaign-specific configs
│   └── staffing-recruiting/       # First campaign
│       ├── GRAND-SLAM-OFFER.md    # Hormozi-style offer
│       ├── brand-voice/           # Voice, product, ICP, writing rules
│       └── research-config.json   # Competitor keywords for scraping
├── config/                        # Global configs
│   ├── thresholds.json            # Kill/scale/flag optimization rules
│   ├── agency.json                # Campaign structure + naming
│   ├── budgets.json               # Budget pacing rules
│   └── ad-accounts.json           # Meta account IDs
└── data/shared/                   # Cross-system data hub
    ├── winning-patterns/          # Scraped ad intelligence
    ├── creative-library/          # Generated scripts + creatives
    ├── performance-data/          # Campaign metrics
    └── audience-insights/         # ICP performance
```

## Integrated Systems

### Eddie Vibe Marketer (`eddie-vibe-marketer/`)
Self-improving ad creative pipeline. Scrapes → generates → produces → optimizes.
- Config: `eddie-vibe-marketer/config/research-config.json`
- Brand voice: `eddie-vibe-marketer/brand-voice/`
- API keys: `eddie-vibe-marketer/.env`

### Titans Council (`titans-council/`)
18 direct response copywriter agents that produce headlines, hooks, positioning, and copy:
- Eugene Schwartz, Jay Abraham, Todd Brown, Dan Kennedy, Gary Bencivenga
- Brian Kurtz, Alex Hormozi, Perry Marshall, Joe Sugarman, Bill Mueller
- Jon Buchan, Lead Gen Jay, Liam Ottley, Tom Bilyeu, Ken McCarthy
- Fred Catona, Greg Renker, Gordon Grossman

Plus 3 Quality Gate agents (Creator, Critic, Approver).

Use the council to sharpen offer positioning and ad copy before running through Eddie.

### Funnel Flow AI (`funnel-flow-ai/`)
Builds funnels in Go High Level via browser automation:
- Lead Gen Opt-In (10 min)
- VSL + Application (20 min)
- Webinar Registration (20 min)
- Full Sales (30 min)
- Challenge Funnel (45 min)

All funnels built in DRAFT mode. Human activates.

## Campaign: Staffing & Recruiting (Active)

**Offer:** AI Staffing Agency Upgrade
- Entry: $997 AI Staffing Audit
- Core: $2,000 + $300/mo Complete AI System
- Premium: $5,000 + $300/mo Autonomous Machine
- Partnership: ~$1,600/mo full-time integrator

**Ad angles:** Fear of AI replacement, recruiter burnout, competitive advantage, cost comparison, partnership play, case study proof.

**Targeting:** Staffing agency owners, recruiting VPs, temp agency operators. 5-50 employees, US-based.

See `campaigns/staffing-recruiting/GRAND-SLAM-OFFER.md` for full details.

## Optimization Rules

```
CPA > 2x target AND spend > $50 AND 24h+  → KILL
ROAS < 0.5 AND 48h+                       → KILL
CTR < 0.5% AND 24h+                       → FLAG
CPA < target AND ROAS > 2x AND 48h+       → SCALE (+20%)
Frequency > 3.5                            → REFRESH creatives
Daily spend > 150% budget                  → PAUSE ALL
```
