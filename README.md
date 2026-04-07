<div align="center">

# Facebook Marketing Agency

### One Machine. Three Layers. Fully Autonomous.

**Scrape competitor intelligence. Route it through 18 legendary copywriter agents. Generate ads, content, funnels, and videos. Publish everywhere. Optimize. Repeat.**

Your entire marketing department — research, strategy, creative, production, publishing, optimization — running on autopilot.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Claude](https://img.shields.io/badge/Powered%20by-Claude-6366f1?logo=anthropic&logoColor=white)](https://anthropic.com/)
[![License](https://img.shields.io/badge/License-Private-red.svg)](#)

---

[Architecture](#-the-3-layer-architecture) | [What You Get](#-what-you-get-per-cycle) | [Titan Agents](#-18-titan-copywriter-agents) | [Eddie Engine](#-layer-3a-eddie-vibe-marketer-ad-engine) | [Content Factory](#-layer-3b-content-factory-8-formats) | [Funnel Builder](#-layer-3c-funnel-flow-ai) | [Quick Start](#-quick-start)

</div>

---

## The Problem

Running Facebook ads profitably requires **five full-time roles**: a researcher tracking competitor creative, a strategist picking angles, a copywriter writing ads, a designer producing creative, and a media buyer optimizing campaigns. That's $300K-500K/year in payroll before a single dollar of ad spend.

Or you outsource to an agency at $5K-15K/month and pray they understand your market.

**The math never works for small teams.** You need the creative volume of a 20-person agency with the budget of a solo founder.

## The Solution

This repo **is** that agency. Three autonomous layers that run the entire marketing lifecycle:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FACEBOOK MARKETING AGENCY                         │
│                                                                      │
│  LAYER 1: INTELLIGENCE          Scrape → Transcribe → Structure     │
│  LAYER 2: TITANS COUNCIL        18 Copywriters → Strategy Brief     │
│  LAYER 3: CREATION TEAMS        Ads + Content + Funnels + Video     │
│                                                                      │
│  One command. ~40 minutes. Every cycle gets smarter.                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## The 3-Layer Architecture

### Layer 1: Scrape Team (Intelligence)

```
Competitor URLs → Apify scrapes Meta Ad Library → Whisper transcribes video ads
→ Output: Structured intelligence database (hooks, body copy, CTAs, angles, platforms)
```

Scrapes **real ads that are spending money right now** — not templates, not best practices from 2019. What's actually working today in your market.

Also scrapes organic content from Facebook, Instagram, and TikTok to identify what's getting natural engagement.

### Layer 2: Titans Council (Strategic Direction)

```
Intelligence → 18 legendary copywriter agents each analyze the data
→ 3 rounds of deliberation → consensus strategic brief
→ Quality Gate: Creator → Critic → Approver
→ Output: Headlines, hooks, mechanisms, positioning, copy frameworks
```

Before a single ad is written, the intelligence passes through a **council of 18 AI copywriter agents** — each modeled on a legendary marketer (Hormozi, Schwartz, Kennedy, Sugarman, etc.). They deliberate in 3 rounds, cross-critique each other, and produce a strategic brief that would take a human strategy team days.

### Layer 3: Three Creation Teams

The strategic brief fans out to three specialist teams that produce everything in parallel:

| Team | Engine | Output |
|------|--------|--------|
| **Ads Team** | Eddie Vibe Marketer | 585+ ad scripts across 7 formats + AI avatar videos + static images |
| **Content Team** | Content Factory | 8 long-form formats (LinkedIn articles, Medium posts, newsletters, YouTube packages) |
| **Funnel Team** | Funnel Flow AI | Full funnel architecture + page copy + GHL browser-automated build |

---

## What You Get Per Cycle

| Output | Volume | Cost |
|--------|--------|------|
| **Ad scripts** (7 formats) | 585+ pieces | ~$5-8 (Haiku) |
| **AI avatar videos** | Unlimited | $29/mo (HeyGen) |
| **Static images** (screenshots, carousels, overlays) | Rendered locally | $0 |
| **Long-form content** (8 formats) | 24-32 pieces | ~$2-4 |
| **Funnel copy** | Complete funnel | ~$1-3 |
| **Strategic brief** | Council synthesis | ~$0.50 |
| **Published posts** | Auto-posted to personal profiles | $0 |
| **Total per cycle** | **600+ content pieces** | **~$41-70** |

Compare that to a creative agency quoting you $10,000/month for 30 pieces.

---

## 18 Titan Copywriter Agents

Every piece of content is routed through specialist agents based on format and channel:

| Agent | Specialty | Routes To |
|-------|-----------|-----------|
| **Alex Hormozi** | Irresistible offers, value equations | Ad offers, pricing, guarantees |
| **Eugene Schwartz** | Market awareness, breakthrough headlines | Headlines, content hooks, ad copy |
| **Dan Kennedy** | No-BS direct response, contrarian angles | Ad scripts, sales letters |
| **Todd Brown** | Unique mechanisms, E5 method | Funnel copy, VSL scripts, launch sequences |
| **Jay Abraham** | Strategic positioning, partnerships | Authority briefs, positioning |
| **Joe Sugarman** | Storytelling, slippery slide, curiosity | LinkedIn/Medium articles, video scripts |
| **Gary Bencivenga** | Precision headlines, proof structures | A/B test headlines, static ads |
| **Tom Bilyeu** | Mindset shifts, identity copy | YouTube packages, authority briefs |
| **Bill Mueller** | Story emails, newsletters, curiosity | Newsletter, Substack, email sequences |
| **Jon Buchan** | Cold email, humor, pattern interrupts | LinkedIn posts/articles, short captions |
| **Fred Catona** | Broadcast direct response | Video scripts, B-roll direction |
| **Brian Kurtz** | Relationship building, nurture sequences | Newsletter, community content |
| **Perry Marshall** | 80/20 strategy, targeting | Audience strategy, ad targeting |
| **Dan Kennedy** | Urgency, scarcity, hard CTAs | Text overlays, UGC video |
| **Greg Renker** | Television DR, production | Video production direction |
| **Gordon Grossman** | Subscription, list strategy | Newsletter retention |
| **Ken McCarthy** | Classic-to-digital bridge | Cross-platform adaptation |
| **Lead Gen Jay** | Outbound, B2B prospecting | Ad CTAs, lead magnets |
| **Liam Ottley** | AI agency positioning | AI-specific messaging |

These are injected as ~200-token "COPYWRITING STYLE INFLUENCE" sections into generation prompts. Lightweight, effective, zero overhead.

---

## Layer 3A: Eddie Vibe Marketer (Ad Engine)

The core ad generation engine. Scrapes competitors, generates across 7 formats, produces video and images, publishes to personal profiles.

### The 7 Ad Formats

| Format | Tier | Platforms | Titan Agents |
|--------|------|-----------|-------------|
| **UGC Video** | 1 (all ads) | Facebook, Instagram, TikTok | Hormozi + Kennedy |
| **Short Caption** | 1 (all ads) | Instagram, TikTok, Facebook | Buchan + Mueller |
| **LinkedIn Post** | 2 (top 50%) | LinkedIn | Abraham + Bilyeu |
| **Screenshot Static** | 2 (top 50%) | Facebook, Instagram, LinkedIn | Schwartz + Bencivenga |
| **Text Overlay** | 2 (top 50%) | Instagram, TikTok, Facebook | Schwartz + Kennedy |
| **Carousel** | 3 (top 20%) | LinkedIn, Instagram, Facebook | Sugarman + Brown |
| **B-Roll Script** | 3 (top 20%) | Facebook, Instagram, TikTok | Catona + Kennedy |

**Volume math:** 50 competitor ads x 3 ICPs → Tier 1: 300, Tier 2: 225, Tier 3: 60 = **585+ pieces/cycle**

### Video Production

| Service | Cost | What |
|---------|------|------|
| **HeyGen** | $29/mo | Unlimited ICP-matched avatar videos |
| **Argil** | $149/mo | Personal clone (your face, your voice) |
| **Puppeteer** | Free | HTML → PNG static images rendered locally |

### Automated Publishing

Browser Use posts directly to **personal profiles** (not business pages) via your real Chrome session:
- Facebook, LinkedIn, Instagram, TikTok
- Random timing jitter (looks natural)
- Crash-safe queue with retry
- `--dry-run` mode for testing

### Live Dashboard

```bash
npm run dashboard
# → http://localhost:3000
```

Pipeline overview, competitor intel browser, content card grid with filters, quality gate results, performance charts, publishing schedule, settings editor. Dark theme, vanilla JS, no build step.

---

## Layer 3B: Content Factory (8 Formats)

Long-form content generated from the same intelligence, each routed through specialist Titan agents:

| Format | Titan Agents | Length | Use Case |
|--------|-------------|--------|----------|
| **Authority Brief** | Jay Abraham + Tom Bilyeu | 500-800 words | Thought leadership |
| **Facebook Post** | Schwartz + Kennedy | 200-400 words | Organic engagement |
| **LinkedIn Post** | Buchan + Kurtz | 200-400 words | Professional audience |
| **LinkedIn Article** | Sugarman + Schwartz | 800-1200 words | Deep-dive long-form |
| **Medium Article** | Sugarman + Perry Marshall | 1000-1500 words | SEO + authority |
| **Substack Post** | Mueller + Kurtz | 800-1200 words | Newsletter nurture |
| **Newsletter** | Mueller + Grossman | 600-1000 words | Email list engagement |
| **YouTube Video Package** | Catona + Bilyeu + Renker | Full kit | Script + description + tags |

---

## Layer 3C: Funnel Flow AI

Autonomous funnel builder using Todd Brown's E5 method + Schwartz/Hormozi copy:

- **Architecture:** Full funnel flow designed from offer analysis
- **Copy:** Every page written by the relevant Titan specialist
- **Build:** GHL (GoHighLevel) browser-automated construction in draft mode
- **Review:** Human approval before publish

---

## Campaign System

Campaigns are self-contained directories with their own brand voice, research config, and offer documentation:

```
campaigns/
└── staffing-recruiting/
    ├── GRAND-SLAM-OFFER.md          # Hormozi-style 3-tier offer
    ├── brand-voice/
    │   ├── voice.md                  # How we sound for this vertical
    │   ├── product.md                # The AI Staffing Upgrade offer
    │   ├── icp.md                    # 4 staffing agency personas
    │   └── writing-rules.md          # Anti-AI-slop enforcement
    └── research-config.json          # Competitors to scrape
```

### Active Campaign: AI for Staffing & Recruiting

| Tier | Offer | Price |
|------|-------|-------|
| Entry | AI Staffing Audit | $997 |
| Core | Complete AI Staffing System | $2,000 + $300/mo |
| Premium | Autonomous Staffing Machine | $5,000 + $300/mo |

Full Grand Slam Offer with 6 ad angles, 3-tier campaign structure (TOF/MOF/BOF), targeting specs, and landing page requirements. See `campaigns/staffing-recruiting/GRAND-SLAM-OFFER.md`.

---

## The Self-Improvement Loop

```
Cycle 1: Broad exploration
├── 600+ pieces across all formats and ICPs
├── Publish to personal profiles + run paid on Meta
├── Wait 7-14 days for performance data
└── Phase 5 finds winners: best ICP × format × platform × angle combinations

Cycle 2: Biased toward winners
├── More content for winning combinations, less for losers
├── Titans Council adjusts strategic direction based on data
└── CPA drops as creative quality compounds

Cycle 3+: Compounding intelligence
├── Every cycle gets smarter
├── Winners compound, losers get pruned automatically
└── Creative volume stays high but quality concentrates
```

---

## Project Structure

```
facebook-marketing-agency/
├── eddie-vibe-marketer/              # Core ad engine (7 formats, 585+ pieces/cycle)
│   ├── scripts/                      # Pipeline phases (research → generate → produce → publish)
│   ├── publisher/                    # Browser Use automation (Python)
│   ├── dashboard/                    # Local web dashboard
│   ├── brand-voice/                  # Default brand identity
│   └── config/                       # Format, research, publish, avatar configs
├── titans-council/                   # 18 copywriter agents + swipe file
│   ├── council/agents/               # Agent definitions (JSON)
│   └── config/                       # Router + author configs
├── funnel-flow-ai/                   # Autonomous GHL funnel builder
├── content-factory/                  # 8 long-form content format templates
├── campaigns/                        # Campaign-specific configs + offers
│   └── staffing-recruiting/          # Active: AI Staffing Agency Upgrade
├── scripts/                          # Agency-level automation
│   ├── browser-automation/           # Ads Manager monitor, campaign creator
│   ├── scrapers/                     # Organic + ad library scrapers
│   ├── reporting/                    # Daily/weekly automated reports
│   └── analysis/                     # Hook analysis, creative fatigue detection
├── config/                           # Global agency configs
│   ├── agency.json                   # Business config, platform settings
│   ├── budgets.json                  # Campaign budget allocation
│   ├── thresholds.json               # Performance thresholds + alerts
│   └── ad-accounts.json              # Facebook ad account connections
├── n8n-workflows/                    # Automation workflows
├── templates/                        # Ad creative + funnel templates
├── agents/                           # AI agent definitions
└── scheduled-tasks/                  # Cron-style automated runs
```

---

## Quick Start

```bash
# 1. Clone & install
git clone https://github.com/jbellsolutions/facebook-marketing-agency.git
cd facebook-marketing-agency
npm install

# 2. Install Eddie (the ad engine)
cd eddie-vibe-marketer && npm install && cd ..

# 3. Set up the publisher (Python — for auto-posting)
cd eddie-vibe-marketer/publisher && pip install -r requirements.txt && cd ../..

# 4. Configure API keys
cp config/.env.example .env
# Add: APIFY_API_TOKEN, OPENAI_API_KEY, ANTHROPIC_API_KEY
# Optional: HEYGEN_API_KEY, ARGIL_API_KEY, SINGULAR_API_KEY

# 5. Set up your campaign
# Edit campaigns/staffing-recruiting/brand-voice/ files
# Or create a new campaign directory for your vertical

# 6. Run Eddie (the ad engine)
npm run eddie-cycle
```

---

## All Commands

| Command | What It Does |
|---------|-------------|
| `npm run eddie-cycle` | **Full Eddie pipeline** (scrape → generate → produce → queue) |
| `npm run scrape-ads` | Scrape Meta Ad Library for competitor intel |
| `npm run scrape-organic` | Scrape organic posts (FB, IG, TikTok) |
| `npm run monitor` | Monitor Ads Manager for performance changes |
| `npm run create-campaign` | Browser-automate campaign creation in Ads Manager |
| `npm run daily-report` | Generate daily performance snapshot |
| `npm run weekly-report` | Generate weekly strategy report |
| `npm run analyze-hooks` | Analyze hook performance across all creative |
| `npm run check-fatigue` | Detect creative fatigue (declining CTR/CPA) |

### Eddie-Specific Commands (run from `eddie-vibe-marketer/`)

| Command | What It Does |
|---------|-------------|
| `npm run full-cycle` | End-to-end: research → generate → quality → produce → queue |
| `npm run phase1:research` | Scrape competitor ads + transcribe video |
| `npm run phase3:generate` | Generate 7 ad formats with Titan DNA |
| `npm run phase3:quality` | Quality gate review |
| `npm run phase4:produce` | Produce videos + images |
| `npm run phase6:publish` | Auto-post to personal profiles |
| `npm run phase6:publish -- --dry-run` | Preview without posting |
| `npm run content:generate` | Generate 8 long-form content formats |
| `npm run dashboard` | Launch local dashboard (http://localhost:3000) |

---

## API Keys

| Key | Service | Purpose | Required |
|-----|---------|---------|----------|
| `APIFY_API_TOKEN` | [Apify](https://console.apify.com/account/integrations) | Scrape Meta Ad Library + organic posts | Yes |
| `OPENAI_API_KEY` | [OpenAI](https://platform.openai.com/api-keys) | Whisper video transcription | Yes |
| `ANTHROPIC_API_KEY` | [Anthropic](https://console.anthropic.com/settings/keys) | Content generation + quality gate + browser automation | Yes |
| `HEYGEN_API_KEY` | [HeyGen](https://app.heygen.com/settings) | ICP-matched avatar videos ($29/mo) | For video |
| `ARGIL_API_KEY` | [Argil](https://app.argil.ai/settings) | Personal clone videos ($149/mo) | Optional |
| `SINGULAR_API_KEY` | [Singular](https://app.singular.net/) | Ad performance data import | Optional |

---

## Cost Comparison

| | **Traditional Agency** | **In-House Team** | **This Repo** |
|---|---|---|---|
| Monthly cost | $5,000-15,000 | $25,000-40,000 | **$70-90** |
| Creative volume | 20-50 pieces | 100-200 pieces | **600+ pieces** |
| Formats | 2-3 | 3-5 | **15 formats** |
| Optimization | Monthly report | Weekly review | **Automatic per cycle** |
| Funnel building | $5,000-20,000 per funnel | Weeks of dev time | **Included** |
| Strategy | Account manager | Strategy meeting | **18 Titan agents** |

---

<div align="center">

**One machine. Three layers. 600+ content pieces per cycle.**

**Every cycle gets smarter. Every dollar works harder.**

```bash
npm run eddie-cycle
```

</div>
