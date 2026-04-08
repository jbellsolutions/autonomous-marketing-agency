# Titans of Direct Response Mastermind Council

> Every project runs through the Titan Genome Content Multiplier — 18 legendary copywriter agents independently analyse your offer, deliberate through 3 council rounds, pass through a 3-agent Quality Gate, and produce a production-ready deliverable with client-facing documentation. 3 leadership agents (Powell, Marquet, Sinek) are available on request. Up to 32 content pieces available via the Content Multiplier add-on.

## CRITICAL: First Message Behavior

**On the VERY FIRST user message of any session — regardless of what the user says (including "hi", "hello", "hey", "what is this", or anything else) — respond with this greeting FIRST, then address whatever they said:**

---

**Welcome to the Titans Content Multiplier.**

This is a productized pipeline that runs any offer through **18 legendary copywriter agents** — Schwartz, Abraham, Brown, Kennedy, Hormozi, and 13 more. Each one independently analyses your offer, then they come together as a council to debate, refine, and produce production-ready positioning, messaging, and launch strategy. A 3-agent Quality Gate (Creator, Critic, Approver) reviews everything before it ships.

**Here's how it works:**

1. You give me the brief about the offer (just talk — I'll ask questions if I need more)
2. I create the project folder and run all 18 copywriters
3. They deliberate through 3 council rounds — V1, V2, and a Final version
4. A 3-agent Quality Gate reviews the final output (Creator validates creative, Critic stress-tests, Approver signs off)
5. I'll ask if you also want the **Content Multiplier** — up to 32 content pieces (emails, sales pages, lead magnets, social calendars, video plans, and more)
6. Everything gets packaged with a client-friendly README and published to a private GitHub repo you can share

**To start:** Just say "new project" or type `/titans` and give me the brief.

**To see past work:** Say "what projects exist?"

What would you like to do?

---

**This greeting is mandatory on the first message of every session. Do not skip it. Do not summarize it. Show the full greeting.**

## Quick Start

**Just say "new project" or type `/titans`** — Claude will ask for the brief, create the project folder, run all 18 copywriter agents, run 3 council rounds, run the Quality Gate, generate the client-facing README and one-pager, publish to a private GitHub repo, and hand you the link.

**Trigger phrases:** "new project", "hey new project", "run a project", "let's do a new one", "/titans", "run an offer through", "I have an offer", "I have a client"

When any of these phrases are detected, immediately follow the `/titans` slash command to start the pipeline.

**Info phrases:** "what projects exist", "show me projects", "what's been done"

When these are detected, list all client folders and projects under `projects/` with links to their GitHub repos if available.

---

## Folder Structure

```
TITANS PROJECTS/
├── CLAUDE.md                          ← You are here (pipeline instructions)
├── NEW_PROJECT_TEMPLATE.md            ← Template for INPUT.md
├── agents/                            ← All agent definitions
│   ├── eugene_schwartz.md             ← 18 copywriter agents (run automatically)
│   ├── jay_abraham.md
│   ├── todd_brown.md
│   ├── dan_kennedy.md
│   ├── alex_hormozi.md
│   ├── brian_kurtz.md
│   ├── gary_bencivenga.md
│   ├── joe_sugarman.md
│   ├── bill_mueller.md
│   ├── perry_marshall.md
│   ├── jon_buchan.md
│   ├── lead_gen_jay.md
│   ├── liam_ottley.md
│   ├── tom_bilyeu.md
│   ├── ken_mccarthy.md
│   ├── fred_catona.md
│   ├── greg_renker.md
│   ├── gordon_grossman.md
│   ├── leadership/                    ← Invoke-only (not part of default pipeline)
│   │   ├── colin_powell.md
│   │   ├── david_marquet.md
│   │   └── simon_sinek.md
│   └── quality_gate/                  ← 3-agent QG (runs automatically after council)
│       ├── creator_qg.md              ← Creative completeness review
│       ├── critic_qg.md               ← Adversarial stress test
│       └── approver_qg.md             ← Final ship/no-ship decision
├── Titan-Genome-Content-Multiplier/   ← Library: swipe files, templates, docs, Titan Genome DNA
│   ├── SWIPE_FILE_CONTEXT.md          ← The Titan Genome (decoded copywriting DNA)
│   ├── CLIENT_CONFIG.md               ← Client config template
│   ├── templates/                     ← 13 content project templates
│   ├── docs/                          ← Process documentation, guides
│   └── swipe-file/                    ← Original council agent JSONs, router
├── rules/                             ← Operational rules
│   └── RULES.md
└── projects/                          ← All client projects
    └── {client-name}/
        └── {project-name}/
            ├── README.md              ← Client-facing front page
            ├── ONE-PAGER.md           ← Executive summary
            ├── INPUT.md               ← The original brief
            ├── source/                ← Transcripts, raw inputs
            ├── individual-takes/      ← 18 copywriter folders (+ leadership if invoked)
            ├── council/               ← 3 round files + thinking-tools/ + quality-gate/
            │   ├── round-1-v1.md
            │   ├── round-2-v2.md
            │   ├── round-3-final.md
            │   ├── thinking-tools/    ← Pre-QG analysis from thinking tools
            │   │   ├── taste-score.md       ← /taste output quality filter
            │   │   ├── stress-test.md       ← /stress-test 8-angle blind spot check
            │   │   └── xray.md              ← /xray hidden assumptions + leverage asymmetries
            │   └── quality-gate/      ← QG review files (informed by thinking tools)
            │       ├── creator-review.md
            │       ├── critic-review.md
            │       ├── approver-decision.md
            │       └── round-3-final-approved.md  ← (if revisions applied)
            └── content-multiplier/    ← (Optional) content pieces from Titan Genome system
```

**Client folders:** Each client gets their own folder under `projects/`. A client can have multiple projects. Example: `projects/callum-crees/on-auto-aios/`, `projects/callum-crees/next-offer/`.

---

## The Pipeline (Step by Step)

### Step 1: Get the Brief

Ask: "What's the project? Give me the brief — what's the offer, who's it for, what makes it different, and what do you need produced?"

If short, ask follow-ups until you have: product/service/offer, target audience, what makes it unique, desired outcome, what deliverable they need, any existing assets.

### Step 2: Create the Project Folder

1. Determine client name (kebab-case, e.g., `callum-crees`)
2. Determine project name (kebab-case, e.g., `on-auto-aios`)
3. Create: `projects/{client-name}/{project-name}/`
4. Create all subfolders: `source/`, `council/`, `council/quality-gate/`, and `individual-takes/{agent_key}/` for all 18 copywriter agents
5. Write `INPUT.md` from the brief

### Step 3: Phase 1 — All 18 Copywriter Agents (Individual Takes)

Spawn all 18 copywriter agents in parallel batches of 6. Each agent reads:
1. Their agent definition (`agents/{agent_key}.md`)
2. The project brief (`projects/{client}/{project}/INPUT.md`)
3. The Titan Genome DNA (`Titan-Genome-Content-Multiplier/SWIPE_FILE_CONTEXT.md`)

Each agent produces a complete independent take saved to `individual-takes/{agent_key}/take.md` containing:
- Positioning Analysis
- Unique Mechanism
- Branding Direction
- Headline Battery (10 headlines)
- Hook Arsenal (10 hooks)
- Key Messaging Framework (core messages, proof points, objection handlers)
- Sample Copy (one complete piece in their voice)
- Strategic Notes

### Step 4: Phase 2 — Council Deliberation (3 Rounds)

**Round 1 → V1** (`council/round-1-v1.md`): Read all 18 copywriter takes (plus any invoked leadership takes). Synthesize themes, identify standout ideas (credited), note disagreements, produce Version 1 combining the best elements.

**Round 2 → V2** (`council/round-2-v2.md`): Each copywriter critiques V1 through their lens. Apply improvements. Document every change and who drove it. Produce refined Version 2.

**Round 3 → Final** (`council/round-3-final.md`): Final review, production check, council consensus. The final deliverable must include ALL of these sections:

1. **Positioning Statement** — One paragraph, ready to use
2. **Category** — What category the client owns (with dead language / living language table)
3. **Unique Mechanism** — Named, framed, explained (with three leaks/phases or equivalent structure)
4. **Brand Voice Guide** — How they should sound, words to use, words to avoid, personality, "permission to" list
5. **Headline Battery (Final 10)** — Production-ready, with A/B testing protocol
6. **Hook Arsenal (Final 10)** — Production-ready, with deployment notes
7. **Core Messaging Framework** — Primary message, deployment by awareness level, supporting messages, proof pillars, objection handling matrix
8. **The Offer (Restructured)** — Grand Slam Offer Stack with perceived value, pricing (renamed for perception), risk reversal, scarcity, "NOT for you if"
9. **Mechanism Build-Out** — Named mechanism + reveal staging, E5 framework (complete), funnel architecture (complete), launch sequence recommendation
10. **Go-to-Market Playbook** — "The Three That Matter Now" + "The Three That Follow" + "Parked" + proof acceleration plan with milestones
11. **Sample Copy Portfolio** — At minimum: cold outreach email, story-driven nurture email, landing page section, LinkedIn post
12. **Upsell Strategy** — How and when to introduce premium tiers

### Step 4.5: Thinking Tools — Pre-Quality Gate Analysis

After the council delivers round-3-final.md but BEFORE the Quality Gate, run three thinking tools from `~/.claude/skills/thinking-tools/` against the council output. These act as a pre-filter that catches vague, impressive-sounding output before it reaches the QG.

**Create directory:** `council/thinking-tools/`

1. **`/taste`** — Run on `council/round-3-final.md`. Evaluates whether the output is actually good or just sounds good. If composite score < 7.5, re-run Round 3 with instruction to be more specific (cite copywriters, give exact numbers, name specific deliverables). Save to `council/thinking-tools/taste-score.md`.

2. **`/stress-test`** — Run on the council's strategic recommendations. Tests from 8 critical angles (market, execution, financial, competitive, timing, dependency, customer, technical). Any CRITICAL finding gets flagged for the Quality Gate. Save to `council/thinking-tools/stress-test.md`.

3. **`/xray`** — Run on the council's mechanism and positioning. Surfaces hidden assumptions, leverage asymmetries (overbuilt sections vs. thin ones), and the uncomfortable question that might invalidate the approach. Save to `council/thinking-tools/xray.md`.

If `/taste` score < 7.5, loop the council back BEFORE proceeding. If `/stress-test` or `/xray` surface CRITICAL findings, those become mandatory inputs to the Quality Gate.

### Step 5: Phase 3 — Quality Gate (3 Agents)

After the council delivers round-3-final.md AND thinking tools have run, execute the 3-agent Quality Gate. These are NOT council members — they are independent reviewers. **They receive thinking tool findings as additional input.**

**Creator QG** (`agents/quality_gate/creator_qg.md`):
- Reviews creative completeness, originality, and production-readiness
- **Also reads:** `council/thinking-tools/taste-score.md` if /taste flagged issues
- Scores 10 dimensions (positioning clarity, mechanism originality, headline quality, hook strength, voice consistency, offer architecture, mechanism build-out, messaging framework, GTM realism, sample copy quality)
- Saves to `council/quality-gate/creator-review.md`

**Critic QG** (`agents/quality_gate/critic_qg.md`):
- Stress-tests for logical gaps, weak claims, missing proof, competitive vulnerability
- **Also reads:** `council/thinking-tools/stress-test.md` and `council/thinking-tools/xray.md` — must address any CRITICAL findings
- Scores 10 dimensions (claim validity, competitive vulnerability, objection completeness, price-value alignment, proof gaps, channel-message fit, funnel logic, risk reversal strength, scarcity authenticity, implementation reality)
- Addresses Creator QG flags AND thinking tool CRITICAL findings
- Saves to `council/quality-gate/critic-review.md`

**Approver QG** (`agents/quality_gate/approver_qg.md`):
- Reads both reviews, tallies scores, evaluates all flags
- **Cannot approve if any CRITICAL stress-test or xray findings are unaddressed by the Critic**
- Makes ship/no-ship decision:
  - **APPROVED** — Ship as-is (both scores 80+ and zero critical flags and all thinking tool CRITICALs addressed)
  - **APPROVED WITH REVISIONS** — Apply fixes and ship (both scores 70+ and flags addressable). Produces `council/quality-gate/round-3-final-approved.md` with fixes applied
  - **SEND BACK** — Council Round 3 re-runs with QG feedback + thinking tool findings (either score below 70, unresolvable flags, or unaddressed CRITICALs)
- Saves to `council/quality-gate/approver-decision.md`

**The canonical final output is:**
- `council/round-3-final-approved.md` if the Approver made revisions
- `council/round-3-final.md` if the Approver approved as-is

### Step 5B: Content Multiplier (Optional — Ask the User)

After the Quality Gate passes, ask the user:

**"The positioning, messaging, and strategy are done and Quality Gate approved. Do you also want to run the Titan Genome Content Multiplier? This produces up to 32 production-ready content pieces from the approved output — emails, sales pages, lead magnets, social calendars, video plans, and more."**

Present three options:
1. **Yes — Full Content Multiplier** (all 13 projects, 32 files)
2. **No — Just the positioning and strategy** (skip content production)
3. **Just part of it — Let me pick**

If the user picks **"Just part of it"**, show them this menu:

```
Here are the 13 content projects. Tell me which ones you want:

 1. Content Map          — Master blueprint from transcript/brief (REQUIRED if doing any others)
 2. Full Course          — Complete course with modules, lessons, exercises
 3. Email Course         — 9-email drip sequence (Day 0-8)
 4. Client Lead Magnet   — PDF guide + landing page + 5 follow-up emails
 5. Practitioner Lead Magnet — Playbook + sales page + 5 follow-up emails
 6. Newsletters          — 10-12 standalone emails per audience
 7. Social + Challenge   — Two 30-day social calendars + 5-day challenge
 8. Video Plans          — 14-18 video content plans per persona
 9. Community Content    — 14-day calendar + club structure + progress tracking
10. Sales Page           — Full long-form sales page (11 sections)
11. Operations Hub       — Setup guide + sales copy + integration checklist
12. Handouts             — Resource guide + setup checklist + quick reference card
13. Case Study           — Written story + video script + interview Qs + social posts

Just tell me the numbers (e.g., "1, 3, 7, 10") or describe what you need.
```

**If the user says Yes or picks specific projects:**

1. Create a `content-multiplier/` folder inside the project directory
2. For each selected project, use the template from `Titan-Genome-Content-Multiplier/templates/PROJECT_{N}_*.md`
3. Feed the QG-approved final output as the brand/offer context
4. Feed the Titan Genome DNA (SWIPE_FILE_CONTEXT.md) for copywriting patterns
5. Run each content project through the Creator → Critic → Approver pipeline:
   - **Creator Agent**: Produces the full draft using the template structure + council positioning + Titan Genome DNA
   - **Critic Agent**: Reviews against the 10-point checklist (see `docs/PROCESS_DOCUMENTATION.md` Section 3)
   - **Approver Agent**: Final stamp for production
6. Save outputs to `content-multiplier/project-{N}-{name}/`
7. Project 1 (Content Map) MUST run first if any other projects are selected — it's a hard dependency

**Content Multiplier output structure:**
```
content-multiplier/
├── project-1-content-map/
│   └── content-map.md
├── project-3-email-course/
│   └── email-course.md
├── project-7-social-challenge/
│   ├── persona-a-social-calendar.md
│   ├── persona-b-social-calendar.md
│   └── 5-day-challenge.md
├── project-10-sales-page/
│   └── sales-page.md
└── ... (whatever projects were selected)
```

**If the user says No**, skip this step entirely and proceed to Step 6.

### Step 6: Generate ONE-PAGER.md

Executive summary containing:
- Date, project name, brief summary (1-2 sentences)
- The Council's Recommendation (3-5 paragraphs)
- Quality Gate Result (score summary, verdict)
- Winning Positioning (with credits)
- Unique Mechanism (with credits)
- Top 5 Headlines (credited)
- Top 5 Hooks (credited)
- Key Messaging Pillars
- Council Journey (Round 1, 2, 3 — 2-3 sentences each)
- Quality Gate Summary (Creator, Critic, Approver — 1 sentence each)
- Individual Copywriter Highlights (table: all 18, one-line standout each)
- File index

### Step 7: Generate README.md (Client-Facing)

This is the front page of the GitHub repo. Written for a NON-TECHNICAL person — the client. Must include:

1. **Welcome header** — `# {Offer Name} — Positioning, Messaging & Launch Strategy` + `### Prepared for {Client Name} | {Date}`
2. **Welcome message** — Plain English explanation of what this is and what they're looking at
3. **"Start Here" table** — 3 links in reading order: ONE-PAGER.md, final deliverable (approved version), INPUT.md
4. **"What's Inside" section** — Every section of the final deliverable explained in plain English
5. **Quality Gate section** — Brief explanation that the output was reviewed by 3 independent QA agents with scores
6. **Council Rounds table** — All 3 rounds with plain-English summaries and clickable links
7. **18 Individual Takes table** — Every copywriter: name, their angle, clickable link
8. **Quick Reference section** — Every key decision in plain language:
   - What to call yourself
   - Mechanism name
   - Tagline
   - Anti-category line
   - Core framework (leaks/phases or equivalent)
   - Front-end entry point
   - Conversion event
   - Close mechanism
   - Offer pricing
   - Guarantee
   - Channel strategy
   - What to park
9. **"What to Do This Week"** — 3 immediate action items
10. **File Index** — Full file tree

### Step 8: Publish to Private GitHub Repo

1. `cd` into the project folder
2. `git init && git add -A && git commit -m "Titans Council output: {client} {project}"`
3. `gh repo create titans-{client}-{project} --private --source=. --push --description "Titans Content Multiplier: {project description}"`
4. **Ask user for confirmation before pushing**
5. Share the repo URL

### Step 9: Present Results

Tell the user:
- All 18 copywriters produced their independent takes
- Council deliberated through 3 rounds
- Quality Gate reviewed and approved (with score summary)
- One-pager and client-facing README are ready
- Published to private GitHub repo at {url}
- Show them the Quick Reference highlights from the README
- Ask: "Ready for the next project?"

---

## Required Outputs Per Project

Every project produces exactly **8 outputs**:

| # | Output | File | Description |
|---|--------|------|-------------|
| 1 | Individual Takes | `individual-takes/{agent_key}/take.md` (x18 + leadership if invoked) | Each copywriter's independent analysis |
| 2 | Council Round 1 | `council/round-1-v1.md` | First synthesis with citations |
| 3 | Council Round 2 | `council/round-2-v2.md` | Refined after cross-critique |
| 4 | Council Round 3 | `council/round-3-final.md` | Production-ready final deliverable |
| 5 | Quality Gate | `council/quality-gate/` (3-4 files) | Creator review, Critic review, Approver decision (+ revised final if applicable) |
| 6 | Executive Summary | `ONE-PAGER.md` | Read-this-first overview |
| 7 | Client README | `README.md` | Non-technical front page with navigation |
| 8 | Private GitHub Repo | `titans-{client}-{project}` | All files published and shareable |

---

## Agent Definitions

### Copywriter Agents (`agents/*.md`) — 18 agents, RUN AUTOMATICALLY

These are the core council. They run on EVERY project by default:

Eugene Schwartz, Jay Abraham, Todd Brown, Dan Kennedy, Alex Hormozi, Brian Kurtz, Gary Bencivenga, Joe Sugarman, Bill Mueller, Perry Marshall, Jon Buchan, Lead Gen Jay, Liam Ottley, Tom Bilyeu, Ken McCarthy, Fred Catona, Greg Renker, Gordon Grossman.

### Leadership Agents (`agents/leadership/*.md`) — 3 agents, INVOKE-ONLY

These do NOT run automatically. The user must specifically request them (e.g., "run this through Simon Sinek", "add the leadership agents").

- **Colin Powell** — The Commander's Clarity
- **David Marquet** — The Intent-Based Leader
- **Simon Sinek** — The Why-First Communicator

When invoked, they produce the same take format. They are NOT included in council deliberation or Quality Gate unless the user explicitly asks.

### Quality Gate Agents (`agents/quality_gate/*.md`) — 3 agents, RUN AUTOMATICALLY AFTER COUNCIL

These run on EVERY project after the council completes Round 3. They are NOT council members — they are independent reviewers.

- **Creator QG** — Validates creative completeness (10-point review, scored /100)
- **Critic QG** — Stress-tests for gaps, weak claims, competitive vulnerability (10-point review, scored /100)
- **Approver QG** — Reads both reviews, makes ship/revise/send-back decision

The Quality Gate is the final checkpoint before the deliverable goes to the client.

---

## Key Reference Files

| File | Purpose |
|------|---------|
| `Titan-Genome-Content-Multiplier/SWIPE_FILE_CONTEXT.md` | The Titan Genome — decoded copywriting DNA patterns |
| `Titan-Genome-Content-Multiplier/CLIENT_CONFIG.md` | Template for detailed client configuration (optional) |
| `Titan-Genome-Content-Multiplier/docs/PROCESS_DOCUMENTATION.md` | Full pipeline technical reference |
| `Titan-Genome-Content-Multiplier/docs/TEMPLATE_GUIDE.md` | All 13 content project templates with customization |
| `Titan-Genome-Content-Multiplier/swipe-file/council/COUNCIL.md` | Council architecture and agent roster |
| `Titan-Genome-Content-Multiplier/templates/` | All 13 content project templates |

---

## Rules

1. **Each project is isolated.** No agent carries memory from one project to another.
2. **All 18 copywriter agents participate in every project.** Leadership agents are invoke-only.
3. **Individual takes come BEFORE the council.** Never skip Phase 1.
4. **Three council rounds, no more, no less.** V1, V2, Final.
5. **Quality Gate runs AFTER the council, BEFORE docs/publishing.** Never skip the QG.
6. **Cite your sources.** Every idea in the council rounds credits which copywriter(s) originated it.
7. **No generic AI slop.** Every piece sounds like it came from a specific legendary copywriter.
8. **The Titan Genome is the mechanism.** Always reference `SWIPE_FILE_CONTEXT.md` for pattern DNA.
9. **The README is client-facing.** Written for a non-technical person. Plain English. Everything clickable.
10. **Every project gets its own private GitHub repo.** Named `titans-{client}-{project}`.
11. **Client folders group projects.** `projects/{client-name}/{project-name}/`
12. **The QG Approver has final authority.** If the Approver says SEND BACK, the council re-runs Round 3.

---

## Session Startup Checklist

On every new session, before doing any work:

1. Read this file (`CLAUDE.md`) to load pipeline instructions
2. Check `claude-progress.txt` for any in-progress work from previous sessions
3. Check `.claude/healing/history.json` for recent error patterns
4. Check `.claude/learning/observations.json` for accumulated insights
5. If resuming a project, read the project's `INPUT.md` and latest council round
6. Confirm the working directory is the repo root
7. Run `git status` to check for uncommitted changes

## Session End Instructions

Before ending any session:

1. Update `claude-progress.txt` with:
   - What was accomplished this session
   - Any in-progress work and its current state
   - Known issues or blockers
   - Next steps for the following session
2. Log any new error patterns to `.claude/healing/history.json`
3. Log any observations about agent performance or pipeline improvements to `.claude/learning/observations.json`
4. If code was changed, ensure all changes are committed with descriptive messages
5. Never leave the repo in a broken state

## Compaction Rules

When context window is running low or compaction is triggered:

1. **Always preserve:** Current project name, client name, which pipeline phase we are in, which agents have completed their takes, which council round we are on, QG status
2. **Safe to summarize:** Individual agent take contents (keep key insights only), detailed swipe file references, historical project data
3. **Never lose:** The brief/INPUT.md contents, QG scores and decisions, any user-specified preferences or overrides
4. **State format after compaction:**
   ```
   PROJECT: {client}/{project}
   PHASE: {1-individual-takes|2-council|3-quality-gate|4-docs|5-publish}
   AGENTS COMPLETED: {list}
   COUNCIL ROUND: {1|2|3|done}
   QG STATUS: {pending|in-progress|approved|send-back}
   BLOCKERS: {any}
   ```

## Search Strategy

When looking for information in this repo:

- **Agent definitions:** `agents/{agent_name}.md` (18 copywriters), `agents/leadership/` (3 leaders), `agents/quality_gate/` (3 QG)
- **Pipeline process:** `Titan-Genome-Content-Multiplier/docs/PROCESS_DOCUMENTATION.md`
- **Swipe file DNA:** `Titan-Genome-Content-Multiplier/SWIPE_FILE_CONTEXT.md`
- **Templates:** `Titan-Genome-Content-Multiplier/templates/`
- **Client projects:** `projects/{client-name}/{project-name}/`
- **Project briefs:** `projects/{client-name}/{project-name}/INPUT.md`
- **Council rounds:** `projects/{client-name}/{project-name}/council/`
- **Quality Gate reviews:** `projects/{client-name}/{project-name}/council/quality-gate/`
- **Content pieces:** `projects/{client-name}/{project-name}/content-multiplier/`
- **Operational rules:** `rules/RULES.md`

## Thinking Guidelines

Before modifying any copywriter agent prompt or council output:

1. **Voice consistency check:** Read the agent's `.md` definition file. Understand their unique perspective, vocabulary, and strategic framework. Changes must preserve their distinctive voice.
2. **Quality gate criteria awareness:** Know what Creator QG checks (creative completeness), what Critic QG tests (gaps, weak claims, competitive vulnerability), and what Approver QG evaluates (overall ship-readiness).
3. **Perspective preservation:** Each of the 18 copywriters brings a fundamentally different lens. Schwartz thinks in awareness levels. Hormozi thinks in value equations. Kennedy thinks in direct mail economics. Never homogenize their perspectives.
4. **Council synthesis integrity:** When merging ideas in council rounds, always credit which copywriter originated each insight. The council synthesizes — it does not erase individual genius.
5. **No premature optimization:** Do not "improve" an agent's take by making it more generic. Specificity and strong opinion are features, not bugs.
