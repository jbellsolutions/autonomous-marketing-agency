# Autonomous Marketing Agency

## What This Is

One machine. Three layers. Scrape competitor intelligence → Titans Council creates strategic direction → Specialist teams produce ads, content, and funnels.

## The Pipeline

```
LAYER 1: SCRAPE TEAM (Intelligence)
├── Apify scrapes Meta Ad Library (competitor ads)
├── Apify scrapes organic posts (FB, IG, TikTok)
└── Whisper transcribes video ads → structured intelligence JSON

LAYER 2: TITANS COUNCIL (Strategic Direction)
├── 18 legendary copywriter agents each analyze the intelligence
├── Council deliberates 3 rounds → consensus brief
├── Quality Gate: Creator → Critic → Approver
└── Output: headlines, hooks, mechanisms, positioning, copy frameworks

LAYER 3: CREATION SPECIALISTS (Three Teams)
├── ADS TEAM (Eddie engine)
│   ├── Ad script generation (Claude × ICPs × brand voice)
│   ├── UGC creator briefs
│   └── AI video production (HeyGen/Arcads)
├── CONTENT TEAM (8 formats)
│   ├── Authority Brief (Jay Abraham + Tom Bilyeu)
│   ├── Facebook Post (Schwartz + Kennedy)
│   ├── LinkedIn Post (Buchan + Kurtz)
│   ├── LinkedIn Article (Sugarman + Schwartz)
│   ├── Medium Article (Sugarman + Perry Marshall)
│   ├── Substack Post (Mueller + Kurtz)
│   ├── Newsletter (Mueller + Grossman)
│   └── YouTube Video Package (Catona + Bilyeu + Renker)
└── FUNNEL TEAM (Funnel Flow AI)
    ├── Funnel architecture (Todd Brown E5)
    ├── Page copy (Schwartz + Hormozi)
    └── GHL browser build (draft mode)
```

## Titan Specialization Map

| Titan | Specialty | Routes To |
|-------|-----------|-----------|
| Eugene Schwartz | Market awareness, headlines, sophistication | Headlines, content hooks, ad copy |
| Todd Brown | Unique mechanisms, E5 method | Funnel copy, VSL scripts, launch sequences |
| Alex Hormozi | Offer architecture, value equations | Ad offers, pricing, guarantees |
| Dan Kennedy | No-BS sales copy, contrarian angles | Ad scripts, sales letters |
| Gary Bencivenga | Precision headlines, proof structures | A/B test headlines |
| Joe Sugarman | Storytelling, slippery slide, curiosity | LinkedIn/Medium articles, video scripts |
| Bill Mueller | Story emails, newsletters, curiosity | Newsletter, Substack, email sequences |
| Jon Buchan | Cold email, humor, pattern interrupts | LinkedIn posts/articles |
| Brian Kurtz | Relationship building, nurture | Newsletter, community content |
| Lead Gen Jay | Outbound, B2B prospecting | Ad CTAs, lead magnets |
| Liam Ottley | AI agency positioning | AI-specific messaging |
| Tom Bilyeu | Mindset shifts, identity copy | YouTube, authority briefs |
| Perry Marshall | 80/20 strategy | Targeting, audience strategy |
| Jay Abraham | Strategic positioning, partnerships | Authority briefs |
| Fred Catona | Broadcast DR | Video scripts |
| Greg Renker | Television DR | Video production |
| Gordon Grossman | Subscription, list strategy | Newsletter retention |
| Ken McCarthy | Classic-to-digital bridge | Cross-platform adaptation |

## Running It

```bash
# Phase 1: Scrape competitor ads
cd eddie-vibe-marketer && npm run phase1:research

# Phase 3: Generate ad scripts (Claude × ICPs × brand voice)
cd eddie-vibe-marketer && npm run phase3:generate

# Content: Generate 8 content formats
cd eddie-vibe-marketer && npm run content:generate

# Full cycle (scrape → generate → produce)
cd eddie-vibe-marketer && npm run full-cycle

# Titans Council (strategic review of any offer/brief)
# Run from titans-council/ using /titans skill

# Build a funnel in GHL
# Run from funnel-flow-ai/ using /build-funnel skill
```

## Project Structure

```
facebook-marketing-agency/
├── CLAUDE.md                      # This file
├── eddie-vibe-marketer/           # Core engine: scrape + generate + produce
│   ├── scripts/
│   │   ├── ad-research.js         # Phase 1: Apify scrape + Whisper transcribe
│   │   ├── generate-scripts.js    # Phase 3: Claude ad script generation
│   │   ├── generate-content.js    # 8 content formats with Titan routing
│   │   ├── quality-gate.js        # Writing rules enforcement
│   │   ├── produce-creatives.js   # UGC briefs + AI video
│   │   └── full-cycle.js          # Orchestrator
│   ├── brand-voice/               # Voice, product, ICP, writing rules
│   ├── config/
│   │   └── research-config.json   # Competitor URLs for scraping
│   └── data/                      # Output: research, scripts, creatives
├── titans-council/                # 18 copywriter agents + swipe file
├── funnel-flow-ai/                # Autonomous GHL funnel builder
├── content-factory/               # Reference: content format templates
├── campaigns/
│   └── staffing-recruiting/       # Active campaign
│       ├── GRAND-SLAM-OFFER.md    # Hormozi-style offer
│       └── brand-voice/           # Staffing-specific voice files
└── config/                        # Global configs (thresholds, agency, budgets)
```

## Active Campaign: Staffing & Recruiting

**Offer:** AI Staffing Agency Upgrade
- Entry: $997 AI Staffing Audit
- Core: $2,000 + $300/mo Complete AI System
- Premium: $5,000 + $300/mo Autonomous Machine

See `campaigns/staffing-recruiting/GRAND-SLAM-OFFER.md`
