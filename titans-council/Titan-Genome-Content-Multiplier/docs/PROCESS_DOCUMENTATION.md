> **START HERE:** This document is your technical reference for running The Content Multiplier powered by the Titan Genome. Read CLIENT_CONFIG.md first.

# The Content Multiplier -- Process Documentation

**Powered by The Titan Genome: Decoded Copywriting DNA of 9 Direct Response Legends**
**Technical Reference for Team Members, Integrators, and Tier 2/3 Fulfillment**
**Version 1.1 | The Titan Genome**

---

## 1. System Architecture

### Overview

```
INPUT                    PROCESSING                              OUTPUT
-----------    ---------------------------------    ---------------------------
One Video  →   Transcript Extraction              →  .vtt or .txt file
  +            Content Map (Project 1)            →  Master blueprint
Transcript →   13 Project Pipelines               →  32 content files
               3-Agent QA per project              →  Production-ready stamp
               (Creator → Critic → Approval)
-----------    ---------------------------------    ---------------------------

Total: 1 input → 32 production-ready content files (776KB+)
```

### Input Requirements

| Input | Format | Required? | Notes |
|-------|--------|-----------|-------|
| Video file | Any format | Yes (for transcript extraction) | 10 min to 3 hours. Longer = more content. |
| Transcript | .vtt, .txt, .srt | Yes | Auto-captions acceptable. Speaker labels preferred. |
| Brand voice brief | Text/markdown | Recommended | Tone, terminology, audience, offers. See Section 3. |
| Titan Genome DNA (swipe file context) | SWIPE_FILE_CONTEXT.md | Included | The Titan Genome: decoded persuasion DNA from 5,716 emails across 9 direct response legends. Loaded automatically. |

### Processing Pipeline -- The Mastermind Table in Action

The 3-agent pipeline (Creator, Critic, Approver) is the Mastermind Table at work. Like Napoleon Hill's Invisible Counselors concept, each agent channels the decoded persuasion DNA of the 9 Titan Genome legends -- sitting at your table, shaping every piece of content through a century of proven direct response architecture.

```
Phase 1: Extract    →  Transcript from video
Phase 2: Map        →  Content Map (Project 1) -- MUST be first
Phase 3: Create     →  13 project pipelines run Creator agents (parallelizable)
                        [The Mastermind Table convenes -- legends shape your first draft]
Phase 4: Critique   →  Critic agents review all outputs (parallelizable)
                        [The Table challenges the work -- nothing ships unchallenged]
Phase 5: Approve    →  Approval agents stamp for production (parallelizable)
                        [Final consensus at the Table -- production-ready stamp]
Phase 6: Deliver    →  Organized output folder with all files
```

### Output Inventory

| Project | Files Produced | Approximate Word Count |
|---------|---------------|----------------------|
| 1. Content Map | 1 | 3,000-6,000 |
| 2. Full Course | 1 | 5,000-10,000 |
| 3. Email Course | 1 | 3,000-5,000 |
| 4. Client Lead Magnet | 3 (magnet, landing page, emails) | 6,000-8,500 |
| 5. Integrator Lead Magnet | 3 (magnet, sales copy, emails) | 9,000-13,000 |
| 6. Newsletters | 2 (one per audience) | 10,000-15,000 |
| 7. Social + Challenge | 3 (two calendars, one challenge) | 8,000-15,000 |
| 8. Video Plans | 2 (one per persona) | 5,000-8,000 |
| 9. Community Content | 4 (calendar, structure, tracking, maximization) | 8,000-15,000 |
| 10. Sales Page | 1 | 4,000-7,000 |
| 11. Ops Hub | 3 (guide, sales copy, checklist) | 6,500-10,500 |
| 12. Handouts | 3 (resource guide, checklist, quick ref) | 1,500-4,500 |
| 13. Case Study | 5 (story, script, questions, social, sales section) | 4,000-7,000 |
| **TOTAL** | **32 files** | **73,000-124,500 words** |

### Dependencies

| Dependency | Details |
|------------|---------|
| Claude Code | Anthropic Pro or Team subscription. Opus model required for quality. |
| Terminal access | Mac Terminal, Windows PowerShell/WSL, or Linux terminal. |
| Node.js | Required for Claude Code installation. v18+ recommended. |
| MCP connections (optional) | Gmail, ClickUp, Google Calendar, Google Drive for automated delivery. |
| Titan Genome database (swipe files) | Included in the repo. No external access needed for Tier 1. |

---

## 2. The Production Pipeline (Step by Step)

### Phase 1: Transcript Extraction

**Methods (in order of quality):**

1. **Read.AI** -- Best for Zoom recordings. Produces speaker-labeled transcripts with timestamps and summaries.
2. **Otter.ai** -- Good for any audio/video. Real-time or post-recording transcription.
3. **MacWhisper** (Mac only) -- Local transcription using OpenAI Whisper. Free, private, high quality.
4. **YouTube auto-captions** -- Upload video (unlisted), wait for processing, download .vtt file.
5. **Zoom native** -- Enable "Audio Transcript" in Zoom settings. Produces .vtt after meeting ends.

**Transcript quality checklist:**
- [ ] Speaker labels present (helpful but not required)
- [ ] Timestamps present (required for Content Map)
- [ ] Technical terms reasonably accurate (review and correct obvious errors)
- [ ] File saved as .vtt or .txt in the project source folder

**For long videos (2+ hours):** The transcript will be large. Claude Code handles this natively through its context window. If the transcript exceeds context limits, split at natural break points (topic changes, breaks in the recording) and process in segments.

### Phase 2: Content Map Generation (Project 1 -- MUST BE FIRST)

The Content Map is the foundation for all downstream projects. It must be completed and reviewed before any other project begins.

**What the Content Map produces:**
- 20-40 distinct topics with timestamps
- Topic hierarchy (main topics, subtopics, tangents)
- Difficulty mapping (beginner, intermediate, advanced)
- Topic-to-project matrix (which topics feed which of the 13 projects)
- 15-20+ key quotes worth reusing in downstream content
- 5-8+ story moments and anecdotes
- Video cut point recommendations for clips
- 6 appendices (key terms glossary, tool mentions, demo inventory, audience segments, CTA opportunities, content gaps)

**Quality gate:** The Content Map should be reviewed by a human before proceeding. Check:
- Are all major topics captured?
- Are timestamps accurate (spot-check 3-5)?
- Does the project matrix make logical sense?
- Are key quotes actually from the video (not AI-generated)?

**Time estimate:** 15-30 minutes for Creator agent. 10-15 minutes for human review.

### Phase 3: Foundation Projects -- The Mastermind Table Convenes

These produce the core educational and nurture content. They can run in parallel after the Content Map is approved. For each project, specific Titan Genome legends sit at your Mastermind Table, channeling their decoded persuasion DNA into your content.

| Project | What It Produces | Titan Genome DNA (Which Legends Sit at Your Table) | Time Estimate |
|---------|-----------------|---------------------|---------------|
| 2. Full Course | Complete course with modules, lessons, exercises | Jay Abraham (value), Alex Hormozi (tactical) | 20-40 min |
| 3. Email Course | 9 emails (Day 0-8) with subject lines and CTAs | Bill Mueller (subject lines), Todd Brown (structure) | 15-25 min |
| 12. Handouts | Resource guide, setup checklist, quick reference | Alex Hormozi (direct, concise) | 10-15 min |

### Phase 4: Sales and Marketing Content -- Revenue Legends at the Table

These produce revenue-generating content. They can run in parallel with Phase 3. The heaviest hitters of the Titan Genome take their seats here -- Schwartz, Brown, Hormozi, and Mueller bring their decoded sales architecture to every piece.

| Project | What It Produces | Titan Genome DNA (Which Legends Sit at Your Table) | Time Estimate |
|---------|-----------------|---------------------|---------------|
| 4. Client Lead Magnet | PDF guide + landing page + 5 follow-up emails | Jay Abraham (value), Hormozi (landing page) | 20-30 min |
| 5. Integrator Lead Magnet | Playbook + sales copy + 5 follow-up emails | Todd Brown (mechanism), Mueller (hooks) | 20-30 min |
| 6. Newsletters | 11 + 12 standalone newsletter emails | Brian Kurtz (nurture), Jay Abraham (value) | 25-40 min |
| 10. Sales Page | Full long-form sales page (11 sections) | Schwartz (sophistication), Brown (mechanism), Hormozi (stacking) | 25-40 min |
| 11. Ops Hub | Setup guide + sales copy + integration checklist | Todd Brown (sales copy), Hormozi (tactical) | 20-30 min |

### Phase 5: Social and Video Content -- The Hook Masters at Your Table

These produce daily-use content for social media and video platforms. The Titan Genome legends who specialize in attention and personality take their seats -- Hormozi, Buchan, Bilyeu, and Mueller shape every hook and opening line.

| Project | What It Produces | Titan Genome DNA (Which Legends Sit at Your Table) | Time Estimate |
|---------|-----------------|---------------------|---------------|
| 7. Social + Challenge | Two 30-day calendars + 5-day challenge | Hormozi (hooks), Buchan (personality), Bilyeu (mindset) | 25-40 min |
| 8. Video Plans | Two video content plans (14 + 18 videos) | Mueller (hooks), Hormozi (tactical) | 20-30 min |

### Phase 6: Community and Case Studies -- The Trust Builders at Your Table

These support community building and social proof. The Titan Genome legends who built movements and credibility take their seats -- Kurtz, Mueller, and Lead Gen Jay channel their community-building and story-driven DNA into these pieces.

| Project | What It Produces | Titan Genome DNA (Which Legends Sit at Your Table) | Time Estimate |
|---------|-----------------|---------------------|---------------|
| 9. Community Content | 14-day calendar + club structure + progress tracking + video maximization | Brian Kurtz (community), Lead Gen Jay (tactics) | 25-40 min |
| 13. Case Study | Story + video script + interview questions + social posts + sales section | Mueller (story), Kurtz (insider), Hormozi (proof) | 20-30 min |

### Phase 7: QA Pipeline -- The Mastermind Table Challenges and Approves

After all Creator agents have produced their outputs, the Mastermind Table shifts from creation to critique. This is the Titan Genome's quality enforcement -- the same legends who shaped the content now challenge it, ensuring nothing ships that would not meet their standards.

1. **Critic Pass (The Table Challenges):** Run Critic agents on all 32 files. Can run in parallel (up to 8 simultaneous). Each Critic reviews against the 10-point checklist, cross-references the Content Map, and produces a revision report + revised file.

2. **Approval Pass (The Table Reaches Consensus):** Run Approval agents on all revised files. Each Approval agent verifies fixes were applied and stamps for production.

**Time estimate for full QA:** 2-3 hours with parallel processing. 4-6 hours sequential.

### Dependency Map

```
PROJECT 1 (Content Map)
  |
  +---> PROJECT 2 (Course)
  +---> PROJECT 3 (Email Course)
  +---> PROJECT 4 (Client Lead Magnet) ----> PROJECT 6 (Newsletters -- references lead magnets)
  +---> PROJECT 5 (Integrator Lead Magnet) -> PROJECT 6 (Newsletters -- references lead magnets)
  +---> PROJECT 7 (Social + Challenge)
  +---> PROJECT 8 (Video Plans)
  +---> PROJECT 9 (Community Content) ------> Depends on PROJECT 2 (course structure)
  +---> PROJECT 10 (Sales Page) ------------> Benefits from PROJECT 4 & 5 (proof points)
  +---> PROJECT 11 (Ops Hub)
  +---> PROJECT 12 (Handouts) --------------> Benefits from PROJECT 2 (course content)
  +---> PROJECT 13 (Case Study)
```

**Hard dependencies (must wait):**
- Project 1 must complete before ALL others
- Project 9 (Community Content) benefits significantly from Project 2 (Course) being complete

**Soft dependencies (better if available, but not blocking):**
- Project 6 (Newsletters) references lead magnets from Projects 4 and 5
- Project 10 (Sales Page) is stronger with proof points from Projects 4, 5, and 13
- Project 12 (Handouts) aligns better with Project 2 course structure

**Everything else can run in parallel immediately after Project 1.**

---

## 3. Agent Prompt Library

### Creator Agent Master Prompt Template

```
ROLE: You are the Creator Agent for The Content Multiplier, powered by
the Titan Genome. You sit at the Mastermind Table alongside the decoded
DNA of 9 direct response legends. Your job is to produce a complete,
production-ready first draft shaped by their proven persuasion architecture.

CONTEXT FILES TO READ:
1. Content Map: {{CONTENT_MAP_PATH}}
2. Template: {{TEMPLATE_PATH}}
3. Titan Genome DNA: {{SWIPE_FILE_CONTEXT_PATH}}
4. Source Transcript: {{TRANSCRIPT_PATH}} (reference for direct quotes and details)

BRAND CONFIGURATION:
- Brand name: {{BRAND_NAME}}
- Brand voice: {{VOICE_DESCRIPTION}}
- Primary audience: {{PRIMARY_AUDIENCE}}
- Secondary audience: {{SECONDARY_AUDIENCE}}
- Main offer: {{MAIN_OFFER}}
- Pricing: {{PRICING}}
- CTA destinations: {{CTA_URLS}}
- Terms to use: {{PREFERRED_TERMS}}
- Terms to avoid: {{AVOIDED_TERMS}}

TITAN GENOME -- WHICH LEGENDS SIT AT YOUR TABLE FOR THIS PROJECT:
- Primary legend: {{PRIMARY_COPYWRITER}} (e.g., "Todd Brown -- mechanism reveals")
- Secondary legend: {{SECONDARY_COPYWRITER}} (e.g., "Bill Mueller -- curiosity hooks")
- Reference: Use the decoded DNA patterns from the Titan Genome (SWIPE_FILE_CONTEXT.md) matching these legends

INSTRUCTIONS:
1. Read the Content Map to understand the full source material
2. Read the template to understand the exact structure required
3. Read the Titan Genome to internalize the assigned legends' persuasion patterns
4. Produce the complete deliverable, following the template structure section by section
5. Use specific examples, quotes, and references from the Content Map
6. Apply the assigned Titan Genome DNA to all headlines, hooks, subject lines, and CTAs
7. Write in the brand voice described above
8. Leave NO placeholder text -- every section must be complete
9. Target {{WORD_COUNT_RANGE}} words total

OUTPUT: Save the complete file to {{OUTPUT_PATH}}
```

### Critic Agent Master Prompt Template

```
ROLE: You are the Critic Agent for The Content Multiplier, powered by the
Titan Genome. You are the challenging voice at the Mastermind Table -- the
legends do not let weak work pass. Your job is to find and fix every quality
issue before a piece reaches the Approval Agent.

FILES TO READ:
1. Creator's draft: {{DRAFT_PATH}}
2. Content Map: {{CONTENT_MAP_PATH}}
3. Brand configuration: (see below)
4. Original template: {{TEMPLATE_PATH}} (for structure comparison)

BRAND CONFIGURATION:
- Brand name: {{BRAND_NAME}}
- Brand voice: {{VOICE_DESCRIPTION}}
- Audience: {{AUDIENCE}}
- Offer details: {{OFFER_DETAILS}}

10-POINT QUALITY CHECKLIST:

Score each criterion PASS, PARTIAL, or FAIL. For any PARTIAL or FAIL,
provide the specific issue and the specific fix.

1. CONTENT ACCURACY
   - Does it accurately reflect the source material from the Content Map?
   - Are all claims verifiable from the transcript?
   - Are there any invented statistics, quotes, or details?
   - Are all tool names, method names, and proper nouns correct?
   COMMON ISSUES: Fabricated timing claims, wrong tool names, missing key
   concepts that the Content Map identified as important.

2. TEMPLATE COMPLIANCE
   - Does the output follow the template structure completely?
   - Are all required sections present and in the correct order?
   - Are any sections incomplete or significantly shorter than the template suggests?
   COMMON ISSUES: Missing subsections, combined sections that should be separate,
   skipped elements (e.g., template calls for 3 headline options, only 2 provided).

3. TITAN GENOME DNA APPLICATION
   - Are the assigned Titan Genome patterns actually present in the output?
   - Do subject lines follow the assigned formula (e.g., Bill Mueller curiosity patterns)?
   - Do sales sections use mechanism reveals (Todd Brown)?
   - Do value sections use "you-focused" messaging (Jay Abraham)?
   COMMON ISSUES: Generic subject lines instead of curiosity-driven ones, missing
   mechanism reveals in sales copy, "we-focused" instead of "you-focused" language.

4. BRAND VOICE CONSISTENCY
   - Does the piece sound like {{BRAND_NAME}} throughout?
   - Are there sections that revert to generic AI voice?
   - Are preferred terms used? Are avoided terms absent?
   COMMON ISSUES: Tone shifts mid-document, overly formal sections in a casual brand,
   AI-isms like "In conclusion" or "It's important to note."

5. AUDIENCE TARGETING
   - Is this written FOR the specified audience?
   - Does it reference their actual pain points and language?
   - Is the reading level appropriate?
   COMMON ISSUES: Writing about the audience instead of to them, using jargon the
   audience would not know, addressing the wrong sophistication level.

6. CTA CLARITY AND SPECIFICITY
   - Is every CTA specific and actionable?
   - Does each CTA tell the reader exactly what to do and what they get?
   - Are CTAs appropriate for the content type (soft CTA in nurture, hard CTA in sales)?
   FAIL EXAMPLES: "Click here to learn more." "Check it out." "Get started today."
   PASS EXAMPLES: "Download the 7-page AI Playbook (free)." "Book your 30-minute
   strategy call." "Start Module 1 now."

7. PROOF ELEMENTS
   - Are claims supported by specific evidence?
   - Numbers, examples, case studies, demonstrations, before/after comparisons?
   - Are there any unsupported superlatives ("best," "revolutionary," "game-changing")?
   COMMON ISSUES: Vague claims without specifics, missing ROI math, testimonial
   placeholders not filled in.

8. HOOK QUALITY
   - Do opening lines of each section/email/post create genuine interest?
   - Would YOU keep reading after the first sentence?
   - Are hooks specific (not generic "In this section..." openers)?
   COMMON ISSUES: Weak openers that state the topic instead of creating curiosity,
   identical hook structures repeated across multiple pieces.

9. CROSS-PROJECT COHERENCE
   - Does this piece use the same terminology as other Content Multiplier outputs?
   - Are the same offers, prices, and CTAs referenced consistently?
   - Does the positioning align with the sales page and other marketing pieces?
   COMMON ISSUES: Different names for the same concept across pieces, conflicting
   pricing or offer descriptions, tone mismatch between pieces for the same audience.

10. PRODUCTION READINESS
    - Is every section complete? No [PLACEHOLDER] or [INSERT] text?
    - No incomplete sentences or "TBD" notes?
    - Formatting correct (headers, bullets, spacing)?
    - Word count within target range?
    COMMON ISSUES: Forgotten placeholder text, formatting inconsistencies,
    sections that trail off.

OUTPUT FORMAT:

## Critic Report: {{PROJECT_NAME}}

### Overall Assessment: [PASS / NEEDS REVISION]

### Checklist Scores:
1. Content Accuracy: [PASS/PARTIAL/FAIL]
2. Template Compliance: [PASS/PARTIAL/FAIL]
...
10. Production Readiness: [PASS/PARTIAL/FAIL]

### Issues Found:
[For each PARTIAL or FAIL]
- **Issue [N]:** [Section] -- [Specific problem]
  - **Fix:** [Specific fix to apply]

### Revised Output:
[Apply all fixes and save the complete revised file to {{REVISED_OUTPUT_PATH}}]
```

### Approval Agent Master Prompt Template

```
ROLE: You are the Approval Agent for The Content Multiplier, powered by
the Titan Genome. You represent the final consensus of the Mastermind Table.
Nothing ships without your stamp. The legends have shaped it, challenged it,
and now you determine whether it meets the standard.

FILES TO READ:
1. Critic's report and revised output: {{REVISED_PATH}}
2. Content Map: {{CONTENT_MAP_PATH}}
3. Brand configuration: (see below)

BRAND CONFIGURATION:
- Brand name: {{BRAND_NAME}}
- Brand voice: {{VOICE_DESCRIPTION}}
- Current offers and pricing: {{OFFERS}}

YOUR TASK:
1. Read the Critic's report to understand what was flagged and fixed
2. Verify EVERY fix was actually applied in the revised output
3. Check for new issues introduced during revision
4. Perform a final brand voice consistency pass
5. Verify all CTAs point to correct destinations
6. Confirm no placeholder text remains
7. Check cross-project terminology consistency

DECISION:

IF all fixes applied AND no new issues AND brand voice consistent:
  → Add header: "APPROVED FOR PRODUCTION -- {{DATE}}"
  → Save final version to {{FINAL_OUTPUT_PATH}}

IF fixes missing OR new issues found:
  → List specific remaining issues
  → Send back for one additional Critic pass
  → Do NOT approve partial work

APPROVAL HEADER FORMAT:
---
STATUS: APPROVED FOR PRODUCTION
DATE: {{DATE}}
REVIEWED BY: Approval Agent
CRITIC ISSUES RESOLVED: [N] of [N]
---
```

### Per-Project Prompt Customizations -- Which Legends Sit at Your Table

| Project | Primary Legend (Titan Genome DNA) | Secondary Legend (Titan Genome DNA) | Special Instructions |
|---------|------------|---------------|---------------------|
| 1. Content Map | N/A (analytical) | N/A | Extract, do not create. Every topic needs a timestamp. |
| 2. Course | Jay Abraham (value) | Alex Hormozi (tactical) | Landing page copy needs headline options. Exercises must be specific. |
| 3. Email Course | Bill Mueller (curiosity) | Todd Brown (mechanism) | 3 subject lines per email. P.S. teases next day. |
| 4. Client Lead Magnet | Jay Abraham (you-focused) | Alex Hormozi (direct) | ROI math required. Two paths: DIY vs. hire expert. |
| 5. Integrator Lead Magnet | Todd Brown (mechanism) | Bill Mueller (story hooks) | Career transformation angle. Aspiration-driven. |
| 6. Newsletters | Brian Kurtz (nurture) | Jay Abraham (value) | Standalone emails (not sequential). Mix teaching + story + proof. |
| 7. Social Calendars | Alex Hormozi (hooks) | Jon Buchan (personality) | Platform-specific formatting. Daily variety required. |
| 7. Challenge | Todd Brown (mechanism) | Tom Bilyeu (mindset) | Builds momentum day over day. Daily email reminders. |
| 8. Video Plans | Bill Mueller (hooks) | Alex Hormozi (tactical) | First 30 seconds scripted. Short-form clip opportunities identified. |
| 9. Community | Brian Kurtz (community) | Lead Gen Jay (tactics) | Discussion prompts must encourage conversation (no yes/no). |
| 10. Sales Page | Schwartz (sophistication) + Brown (mechanism) | Hormozi (offer stacking) | 3 headline angles. 10 FAQ questions. Guarantee section. |
| 11. Ops Hub | Todd Brown (sales copy) | Alex Hormozi (tactical) | 50+ checklist items. Split-test headlines. |
| 12. Handouts | Alex Hormozi (concise) | N/A | Must fit 1-2 printed pages each. Tables and bullets, not prose. |
| 13. Case Study | Bill Mueller (story) | Brian Kurtz (insider) | Get permission first. No unverifiable claims. Specific results only. |

---

## 4. The Titan Genome -- Decoded Persuasion DNA

The Titan Genome is the mechanism that powers The Content Multiplier. It is the decoded copywriting DNA of 9 direct response legends -- their persuasion architecture extracted, quantified, and made available as AI-ready patterns. Think of it as the Human Genome Project, but for a century of proven direct response copywriting.

### How to Load the Titan Genome

The Titan Genome is contained in `SWIPE_FILE_CONTEXT.md` at the project root. This file contains:
- Decoded DNA profiles of all 9 Titan Genome legends
- Subject line pattern analysis across 5,716 emails
- Email categorization system (story_lead, value_lesson, urgency_launch, etc.)
- Copywriting DNA metrics (curiosity %, question %, you-focused %, etc.)

**Loading method:** Include the path to `SWIPE_FILE_CONTEXT.md` in every Creator agent prompt. Claude Code will read and internalize the Titan Genome patterns before producing content. This is what seats the legends at your Mastermind Table.

For deeper pattern access, the full Titan Genome database is in the `swipe-file/` directory, organized by legend and category.

### Which Legends Sit at Your Table for Each Content Type

| Content Type | Primary Legend at the Table | Why This Match |
|-------------|-------------------|----------------|
| Email subject lines | Bill Mueller | Highest curiosity rate (63%). Story-driven hooks. |
| Sales pages (long-form) | Eugene Schwartz + Todd Brown | Market sophistication targeting + mechanism reveal structure. |
| Lead magnet content | Jay Abraham | Long-form value delivery, "you-focused" messaging, educational depth. |
| Landing pages | Alex Hormozi | Direct, benefit-driven, no-fluff value stacking. |
| Nurture email sequences | Brian Kurtz | Relationship building, industry insider stories, trust development. |
| Social media posts | Alex Hormozi + Jon Buchan | Hormozi for hooks and frameworks, Buchan for personality and charm. |
| Video scripts | Bill Mueller + Alex Hormozi | Mueller for story hooks, Hormozi for tactical content delivery. |
| Community content | Brian Kurtz + Lead Gen Jay | Kurtz for community building, Lead Gen Jay for practical engagement tactics. |
| Course content | Jay Abraham + Alex Hormozi | Abraham for educational depth, Hormozi for actionable frameworks. |
| Challenge content | Todd Brown + Tom Bilyeu | Brown for daily mechanism reveals, Bilyeu for mindset/motivation. |
| Case studies | Bill Mueller + Brian Kurtz | Mueller for narrative structure, Kurtz for insider credibility. |
| Quick reference / handouts | Alex Hormozi | Concise, direct, framework-oriented. No filler. |

### How to Add New Legends to the Titan Genome

To add a new legend's decoded DNA to the Titan Genome:

1. **Collect emails** -- Minimum 50 emails for meaningful pattern analysis. 200+ is ideal.
2. **Save to database** -- Create a new folder in `swipe-file/[copywriter-name]/` and save emails as individual text files.
3. **Run DNA analysis** -- Use Claude Code to analyze the collection:

```
Read all emails in swipe-file/[copywriter-name]/ and produce a DNA analysis:
- Subject line patterns: curiosity %, question %, you-focused %, personal %,
  urgency %, average length
- Body patterns: average length, story vs. tactical ratio, CTA placement,
  P.S. usage rate
- Hook types: story_lead, value_lesson, trend_commentary, urgency_launch,
  proof_case_study, nurture_relationship, hot_take
- Signature phrases and recurring structures
- Best use cases for this copywriter's style

Save the analysis to swipe-file/[copywriter-name]/style_analysis.json
```

4. **Update SWIPE_FILE_CONTEXT.md** -- Add the new legend's profile and metrics to the Titan Genome master context file following the existing format.

### The Titan Genome DNA Analysis Methodology

The Titan Genome works at the pattern level, not the word level. It does not copy or mimic specific sentences. Instead, it decodes:

- **Structural patterns:** How does this copywriter open an email? Where do they place the CTA? How do they transition from story to pitch?
- **Ratio patterns:** What percentage of subject lines use curiosity? Questions? Personal pronouns? Urgency?
- **Framework patterns:** Does this copywriter use a signature framework (Todd Brown's E5 Method, Hormozi's value equation, etc.)?
- **Voice patterns:** Formal vs. casual ratio. Sentence length distribution. Use of fragments, questions, commands.

These patterns are quantified and stored in the Titan Genome. When the Creator agent seats a legend at the Mastermind Table, it applies these structural and ratio patterns to original content -- producing new writing that follows proven persuasion architecture without copying anyone's actual words. The legends shape the structure; your content fills it.

---

## 5. Quality Standards

### The 10-Point Critic Checklist (Detailed)

See Section 3 (Critic Agent Master Prompt) for the complete checklist with scoring criteria, common issues, and pass/fail examples.

### Common Issues and How to Fix Them

| Issue | Frequency | How to Identify | Fix |
|-------|-----------|----------------|-----|
| Missing key concepts from Content Map | Very common | Cross-reference Content Map topics vs. output | Add specific references with quotes from transcript |
| Generic AI voice in sections | Common | Look for "It's important to note," "In conclusion," "Let's dive in" | Rewrite in brand voice. Remove AI-isms. |
| Weak subject lines | Common | Check curiosity rate. If subject tells you what's inside, it fails. | Apply Bill Mueller's Titan Genome DNA: tease the result, hide the mechanism |
| Missing proof elements | Common | Scan for unsupported claims | Add specific numbers, examples, or "from the video" references |
| Placeholder text left in | Occasional | Search for [BRACKETS], TBD, INSERT, PLACEHOLDER | Complete the section with actual content |
| Wrong audience targeting | Occasional | Read the opening paragraph -- who is it speaking to? | Rewrite with correct audience pain points and language |
| Inconsistent terminology | Occasional | Compare term usage across multiple outputs | Standardize on the terms from the Content Map |
| Fabricated statistics | Rare but serious | Cross-reference any numbers against the transcript | Remove or replace with verifiable claims |
| Missing CTAs | Occasional | Check end of each section/email | Add specific, actionable CTA |
| Template sections skipped | Occasional | Compare output sections against template sections | Add missing sections following template structure |

### Brand Voice Consistency Checks

Run these checks across ALL 32 outputs before final delivery:

1. **Terminology audit:** Search all files for key terms. Verify consistent usage. (Example: if the brand says "members," make sure no file says "students" or "users" inconsistently.)
2. **Tone audit:** Read the first paragraph of each file. Do they all sound like they come from the same brand?
3. **Offer audit:** Search all files for price mentions, offer names, and CTA destinations. Verify consistency.
4. **Audience audit:** Verify that client-facing content speaks to clients and integrator-facing content speaks to integrators. No cross-contamination.

### Cross-Project Coherence Verification

After all projects pass individual QA, run a coherence check:

```
Read all 32 output files. Check for:
1. Consistent brand name and spelling across all files
2. Consistent offer names and pricing across all files
3. Consistent audience descriptions across all files
4. Consistent key concept terminology across all files
5. No contradictions between files (e.g., sales page says X, email says Y)
6. Cross-references are accurate (e.g., email references "the 7-page guide"
   and the guide is actually 7 pages)

Report any inconsistencies found.
```

---

## 6. Scaling the System

### Running Multiple Projects in Parallel

Claude Code supports background agents. Maximum recommended parallel agents: 8.

**Parallel execution strategy:**

```bash
# Start 4 Creator agents simultaneously
claude "Creator Agent: Project 2 (Course)..." &
claude "Creator Agent: Project 3 (Email Course)..." &
claude "Creator Agent: Project 4 (Client Lead Magnet)..." &
claude "Creator Agent: Project 5 (Integrator Lead Magnet)..." &
wait

# Start next batch
claude "Creator Agent: Project 6 (Newsletters)..." &
claude "Creator Agent: Project 7 (Social + Challenge)..." &
claude "Creator Agent: Project 8 (Video Plans)..." &
claude "Creator Agent: Project 9 (Community)..." &
wait

# Continue until all Creator agents complete, then run Critics in parallel
```

**Resource considerations:**
- Each agent uses context window capacity. More agents = more API usage.
- Monitor for rate limiting on high-volume parallel runs.
- If quality drops with 8 agents, reduce to 4-6.

### Batch Processing Multiple Videos

For clients or teams processing multiple videos:

1. **Create a master project folder:**
```
Client-Content/
  video-1/
    source/
    outputs/
  video-2/
    source/
    outputs/
  video-3/
    source/
    outputs/
  shared/
    brand-voice-brief.md
    swipe-file-context.md
```

2. **Run Content Maps for all videos first** (can be parallel).
3. **Then run all downstream projects** across all videos (maximize parallelism).
4. **Run QA as a final batch** across all outputs.

**Time estimate for batch processing:**
| Videos | Creator Phase | Critic Phase | Approval Phase | Total |
|--------|--------------|-------------|----------------|-------|
| 1 video | 2-4 hours | 1-2 hours | 30 min | 3.5-6.5 hours |
| 3 videos | 4-8 hours | 2-4 hours | 1-2 hours | 7-14 hours |
| 5 videos | 6-12 hours | 3-6 hours | 1.5-3 hours | 10.5-21 hours |

### Team Workflow (Who Does What)

**For Tier 3 fulfillment (Done-For-You):**

| Role | Responsibilities | Time per Project |
|------|-----------------|-----------------|
| Project Manager | Client intake, brand voice call scheduling, timeline management, delivery communication | 15 min/day per project |
| Content Producer | Transcript preparation, Content Map generation, pipeline execution, file organization | 4-6 hours per project |
| QA Reviewer (Human) | Review Approval Agent stamps, spot-check 5-10 files for accuracy, brand voice final pass | 1-2 hours per project |
| Account Owner | Brand voice calibration calls for premium clients, escalation handling | 30 min per project (as needed) |

**Handoff points:**
1. PM --> Content Producer: After brand voice call, PM delivers brief + transcript
2. Content Producer --> QA Reviewer: After all Approval Agent stamps, producer hands off output folder
3. QA Reviewer --> PM: After human QA pass, reviewer delivers final folder + any notes
4. PM --> Client: PM sends delivery email with Drive link + schedules walkthrough video

### Time Estimates per Project Type

| Project | Creator Time | Critic Time | Approval Time | Human Review | Total |
|---------|-------------|-------------|---------------|-------------|-------|
| 1. Content Map | 15-30 min | 10-15 min | 5 min | 10-15 min | 40-65 min |
| 2. Course | 20-40 min | 15-20 min | 5-10 min | 10-15 min | 50-85 min |
| 3. Email Course | 15-25 min | 10-15 min | 5 min | 5-10 min | 35-55 min |
| 4. Client Lead Magnet (3 files) | 20-30 min | 15-20 min | 5-10 min | 10-15 min | 50-75 min |
| 5. Integrator Lead Magnet (3 files) | 20-30 min | 15-20 min | 5-10 min | 10-15 min | 50-75 min |
| 6. Newsletters (2 files) | 25-40 min | 15-25 min | 5-10 min | 10-15 min | 55-90 min |
| 7. Social + Challenge (3 files) | 25-40 min | 15-25 min | 5-10 min | 10-15 min | 55-90 min |
| 8. Video Plans (2 files) | 20-30 min | 10-15 min | 5 min | 5-10 min | 40-60 min |
| 9. Community (4 files) | 25-40 min | 15-25 min | 5-10 min | 10-15 min | 55-90 min |
| 10. Sales Page | 25-40 min | 15-25 min | 5-10 min | 15-20 min | 60-95 min |
| 11. Ops Hub (3 files) | 20-30 min | 15-20 min | 5-10 min | 10-15 min | 50-75 min |
| 12. Handouts (3 files) | 10-15 min | 5-10 min | 5 min | 5-10 min | 25-40 min |
| 13. Case Study (5 files) | 20-30 min | 15-20 min | 5-10 min | 10-15 min | 50-75 min |

**Full pipeline total (sequential):** 8-14 hours
**Full pipeline total (parallel, 4-8 agents):** 3.5-6.5 hours

---

## 7. Troubleshooting

### Common Claude Code Issues

| Issue | Cause | Solution |
|-------|-------|---------|
| `claude: command not found` | Not installed or not in PATH | Run `npm install -g @anthropic-ai/claude-code` and restart terminal |
| Authentication failure | Expired token or wrong account | Run `claude` and re-authenticate |
| Slow response times | Large transcript or many parallel agents | Reduce parallel agents from 8 to 4. Split long transcripts. |
| Context window exceeded | Transcript + template + swipe file too large | Summarize the transcript first, then run projects on the summary + relevant excerpts |
| Agent produces truncated output | Hit output token limit | Ask agent to "continue from where you stopped" or split the project into sections |
| Rate limiting errors | Too many parallel API calls | Reduce to 2-3 parallel agents. Add 30-second delays between launches. |

### Context Window Management for Large Transcripts

A 2-hour video transcript is roughly 20,000-30,000 words. Combined with templates and swipe file context, this can strain the context window.

**Strategies:**

1. **Content Map as intermediary:** The Content Map extracts and condenses the transcript. Downstream projects can use the Content Map instead of the full transcript, dramatically reducing context usage.

2. **Selective transcript loading:** For specific projects, load only the relevant transcript sections (identified by Content Map timestamps) rather than the full transcript.

3. **Phased context:** Load the Titan Genome DNA for sales/marketing projects (the legends need to be at the Table) but skip it for analytical projects (Content Map, handouts, community structure).

4. **Summary layer:** For very long videos (3+ hours), produce a detailed summary first (5,000-8,000 words), then use the summary as source material for downstream projects.

### Agent Output Quality Issues

| Quality Issue | Likely Cause | Fix |
|---------------|-------------|-----|
| Generic/robotic tone | Titan Genome DNA not loaded or not referenced in prompt | Verify SWIPE_FILE_CONTEXT.md path is correct in the prompt. Add explicit Titan Genome DNA instructions. The legends are not seated at the Table if the file is not loaded. |
| Factual errors | AI confabulation (making up details) | Cross-reference all claims against the Content Map. Add instruction: "Only include facts from the transcript." |
| Repetitive content across projects | Same source material, no differentiation instruction | Add to prompt: "This piece must have a distinct angle from [other project]. Focus on [specific aspect]." |
| Too short / too long | Missing word count guidance | Add explicit word count targets to Creator prompt. |
| Wrong audience | Audience description missing or vague | Add detailed audience persona to every prompt (pain points, language, sophistication level). |
| Weak hooks | No hook-specific instruction | Add: "First sentence must create curiosity or surprise. Do not start with 'In this [piece]...' or any variant." |

### File Naming Conventions

All output files follow this convention:

```
PROJECT_[NUMBER]_[Descriptive_Name].md

Examples:
PROJECT_1_Content_Map.md
PROJECT_4_Client_Lead_Magnet.md
PROJECT_7_[YOUR TOPIC]_Social_Calendar.md
PROJECT_13_[YOUR TOPIC]_Case_Study.md
```

**For client projects (Tier 3):**
```
[CLIENT]_PROJECT_[NUMBER]_[Descriptive_Name].md

Examples:
CLIENTPREFIX_PROJECT_1_Content_Map.md
CLIENTPREFIX_PROJECT_4_Client_Lead_Magnet.md
```

**Version tracking:**
```
[FILE]_v1.md  -- Creator output
[FILE]_v2.md  -- Post-Critic revision
[FILE]_FINAL.md  -- Approved for production
```

---

*End of Process Documentation. This document should be updated as the system evolves. Version changes tracked in PROJECT_OVERVIEW.md.*
