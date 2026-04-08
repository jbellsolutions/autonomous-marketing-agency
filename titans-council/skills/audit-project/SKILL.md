---
name: "audit-project"
description: "Audit a completed Titans project before publishing. Checks completeness (all 18 takes, 3 council rounds, Quality Gate), quality (12 mandatory sections, no placeholders, specific CTAs), credits (ideas attributed to named copywriters), and consistency (positioning holds across all sections). Produces a scored pass/fail report. Use when the user says 'audit this project', 'check before publishing', 'is this ready to ship', 'review the project', or 'pre-publish check'."
license: MIT
metadata:
  version: 1.0.0
  author: Titans Pipeline
  category: quality-assurance
  domain: project-audit
  updated: 2026-03-27
  frameworks: titan-genome, quality-gate
---

# Audit Project

Pre-publish inspection of a completed Titans project. Six checks, scored, with specific issues called out. A project that passes this audit is ready for client delivery.

## Keywords

audit, pre-publish, quality check, completeness, project review, ship check, ready to publish, verify project, project inspection, pre-ship, final check

## Voice Directive

Write the audit report in direct, factual language. State what passed, what failed, and what needs fixing. No hedging, no softening. "Section 8 (Offer) uses placeholder pricing -- replace with actual numbers" not "You might want to consider updating the pricing section." Banned vocabulary: "delve", "utilize", "leverage" (as verb), "it's worth noting", "overall the project looks good", "minor issues", "generally speaking". Every finding must be specific enough that someone could fix it without asking a follow-up question.

---

## Phase 1: Load Project Files

Determine the project path. Ask the user if not obvious, or detect from context:
- `projects/{client-name}/{project-name}/`

Load these file groups:

**Individual Takes:**
- `individual-takes/{agent_key}/take.md` for all 18 copywriter agents
- `individual-takes/{agent_key}/take.md` for any invoked leadership agents

**Council Rounds:**
- `council/round-1-v1.md`
- `council/round-2-v2.md`
- `council/round-3-final.md`

**Quality Gate:**
- `council/quality-gate/creator-review.md`
- `council/quality-gate/critic-review.md`
- `council/quality-gate/approver-decision.md`
- `council/quality-gate/round-3-final-approved.md` (if revisions were applied)

**Documentation:**
- `ONE-PAGER.md`
- `README.md`
- `INPUT.md`

**Content Multiplier (if present):**
- `content-multiplier/` directory and all project subdirectories

---

## Phase 2: Completeness Check

Verify every required file exists and is non-empty.

| Check | Expected | Status |
|-------|----------|--------|
| Individual takes count | 18 (minimum) | PASS/FAIL |
| All 18 copywriter agents present | List any missing | PASS/FAIL |
| Council Round 1 (V1) | Exists, non-empty | PASS/FAIL |
| Council Round 2 (V2) | Exists, non-empty | PASS/FAIL |
| Council Round 3 (Final) | Exists, non-empty | PASS/FAIL |
| Creator QG review | Exists, scored | PASS/FAIL |
| Critic QG review | Exists, scored | PASS/FAIL |
| Approver QG decision | Exists, has verdict | PASS/FAIL |
| ONE-PAGER.md | Exists, non-empty | PASS/FAIL |
| README.md (client-facing) | Exists, non-empty | PASS/FAIL |
| INPUT.md | Exists, non-empty | PASS/FAIL |

**Scoring:** Each missing file is -5 points from a base of 100. A project missing more than 3 files fails the completeness check outright.

---

## Phase 3: Quality Check -- 12 Mandatory Sections

The council final output (`round-3-final.md` or `round-3-final-approved.md`) must contain ALL 12 mandatory sections. Check each one:

| # | Section | Present | Quality Score (1-10) | Issues |
|---|---------|---------|---------------------|--------|
| 1 | Positioning Statement | Y/N | X/10 | {specific issues or CLEAN} |
| 2 | Category (with dead/living language table) | Y/N | X/10 | |
| 3 | Unique Mechanism (named, framed, explained) | Y/N | X/10 | |
| 4 | Brand Voice Guide | Y/N | X/10 | |
| 5 | Headline Battery (Final 10) | Y/N | X/10 | |
| 6 | Hook Arsenal (Final 10) | Y/N | X/10 | |
| 7 | Core Messaging Framework | Y/N | X/10 | |
| 8 | The Offer (Restructured) | Y/N | X/10 | |
| 9 | Mechanism Build-Out | Y/N | X/10 | |
| 10 | Go-to-Market Playbook | Y/N | X/10 | |
| 11 | Sample Copy Portfolio | Y/N | X/10 | |
| 12 | Upsell Strategy | Y/N | X/10 | |

**Quality flags for each section:**
- Placeholder text detected (e.g., `{{PLACEHOLDER}}`, `[INSERT]`, `TBD`, `TODO`)
- Generic language that could apply to any business
- Missing specifics (pricing says "premium" instead of a number, CTA says "learn more" instead of a specific action)
- Section is present but thin (fewer than 3 substantive paragraphs for sections that require depth)

**Scoring:** Missing section = 0/10. Average of all 12 section scores is the quality score. Below 7.0 average = FAIL.

---

## Phase 4: Credits Check

The council's value comes from attributed ideas. Every major idea should credit which copywriter(s) originated it.

Scan the council final output for:

1. **Credited ideas** -- Count how many ideas explicitly name the originating copywriter (e.g., "Abraham's preeminence angle", "Schwartz's awareness-level match", "Hormozi's value equation")
2. **Uncredited ideas** -- Identify substantive strategic choices that appear without attribution
3. **Credit density** -- What percentage of major ideas are credited?
4. **Credit diversity** -- How many of the 18 agents are credited at least once?

**Scoring:**
- Credit density above 70% = PASS
- Credit density 50-70% = WARNING (acceptable but should improve)
- Credit density below 50% = FAIL (the council's ideas must be traceable)
- Credit diversity: at minimum 10 of 18 agents should be credited somewhere

**Also check:** The ONE-PAGER.md should have the Individual Copywriter Highlights table showing each agent's standout contribution.

---

## Phase 5: Consistency Check

Positioning must hold across every document. A project where the positioning statement says one thing and the headlines say another is broken.

Check for consistency across:

1. **Positioning Statement vs. Headlines** -- Do the headlines reinforce the positioning or contradict it?
2. **Mechanism Name vs. Usage** -- Is the mechanism name used consistently (same spelling, same framing) everywhere it appears?
3. **Brand Voice Guide vs. Sample Copy** -- Does the sample copy actually follow the voice guide? Check word choices, tone, personality.
4. **Offer Structure vs. Sales Copy** -- Do the pricing, bonuses, and guarantee in the Offer section match what appears in sample copy?
5. **Category Claim vs. Messaging** -- Does the messaging framework support the category claim, or does it wander into a different category?
6. **Council Final vs. ONE-PAGER** -- Does the ONE-PAGER accurately represent the council's conclusions, or has it drifted?
7. **Council Final vs. README** -- Does the client-facing README accurately describe what the deliverable contains?

**Scoring:** Each inconsistency found is -3 points from a base of 100. More than 5 inconsistencies = FAIL.

---

## Phase 6: Score and Report

Produce the final audit report at the project root as `AUDIT-REPORT.md`:

```markdown
# Audit Report -- {Client Name} / {Project Name}

**Audit Date:** {date}
**Audited By:** Titans Audit Skill

## Overall Verdict: PASS / FAIL / CONDITIONAL PASS

## Scores Summary

| Check | Score | Verdict |
|-------|-------|---------|
| Completeness | X/100 | PASS/FAIL |
| Quality (12 Sections) | X.X/10 avg | PASS/FAIL |
| Credits | X% density, Y/18 diversity | PASS/FAIL/WARNING |
| Consistency | X/100 | PASS/FAIL |

## Overall Score: {weighted average}/100

## Critical Issues (Must Fix Before Publishing)
{Numbered list of issues that block publishing}

## Warnings (Should Fix)
{Numbered list of issues that weaken the deliverable}

## Section-by-Section Quality Detail
{The 12-section table from Phase 3 with scores and notes}

## Credits Analysis
{Credit density, diversity, and specific uncredited ideas}

## Consistency Findings
{Each inconsistency found with file references}

## Missing Files
{Any files that should exist but do not}

## Recommendation
{One paragraph: what needs to happen before this ships}
```

**Verdict logic:**
- **PASS** -- All four checks pass, overall score 80+
- **CONDITIONAL PASS** -- No critical issues, but warnings exist, overall score 70-79
- **FAIL** -- Any critical issue exists, or overall score below 70

---

## Verification Checklist

- [ ] All 18 individual takes checked for existence
- [ ] All 3 council rounds checked for existence and content
- [ ] All 3 QG files checked for existence and scoring
- [ ] All 12 mandatory sections checked in the final output
- [ ] Placeholder scan completed (no `{{}}`, `[INSERT]`, `TBD` remaining)
- [ ] Credit attribution checked with density and diversity scores
- [ ] Cross-document consistency checked (7 consistency dimensions)
- [ ] AUDIT-REPORT.md produced with scores and specific findings
- [ ] Every finding includes a specific fix recommendation

## Stop Conditions

- **Project folder does not exist** -- Stop. Confirm the correct path with the user.
- **No council output at all** -- Stop. The project is incomplete. Tell the user which pipeline step to resume from.
- **Audit finds more than 10 critical issues** -- Stop scoring and report. The project needs substantial rework before a full audit is worthwhile.

## Completion

When the audit is done, tell the user:
- Overall verdict (PASS / CONDITIONAL PASS / FAIL)
- Number of critical issues and warnings
- The single most important thing to fix (if any)
- Whether the project is ready to publish to GitHub
- Where the full audit report is saved
