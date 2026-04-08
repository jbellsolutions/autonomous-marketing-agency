---
name: "review"
description: "Review and improve an existing project's council output by applying each titan's lens for quick critiques, scoring all 12 mandatory sections, proposing credited improvements, and optionally re-running the Quality Gate. Creates -revised versions of files -- never modifies originals. Use when the user says 'review this project', 'improve the output', 'make this better', 'strengthen the positioning', 'review and revise', 'second pass', or 'tighten this up'."
license: MIT
metadata:
  version: 1.0.0
  author: Titans Pipeline
  category: quality-improvement
  domain: project-review
  updated: 2026-03-27
  frameworks: titan-genome, mastermind-council, quality-gate
---

# Review

Second-pass improvement of a council output. Each titan re-examines the final deliverable through their specific lens. Weak sections get strengthened with credited, specific improvements. The original files are sacred -- all changes go into -revised copies.

## Keywords

review, improve, revise, strengthen, second pass, tighten, refine, make better, improve output, review council, review project, critique, enhance, polish

## Voice Directive

Write review critiques the way a senior editor marks up a manuscript. Specific, actionable, attributed. "The positioning statement buries the mechanism name in paragraph two -- lead with it. This is the Schwartz awareness-level-three play: the prospect already knows the category, so the mechanism IS the headline." Not "The positioning could be stronger." Banned vocabulary: "delve", "utilize", "leverage" (as verb), "it's important to note", "consider revising", "you might want to", "overall this is good but", "room for improvement", "minor tweaks". Every critique must name which copywriter's framework justifies the change.

---

## Iron Law

**NEVER MODIFY THE ORIGINAL FILES. CREATE -REVISED VERSIONS.**

The original council output is the historical record of what the council produced. Revisions go into new files with a `-revised` suffix. If the user wants to replace the original, they do it themselves.

Original: `council/round-3-final.md` (or `round-3-final-approved.md`)
Revised: `council/round-3-final-revised.md` (or `round-3-final-approved-revised.md`)

---

## Phase 1: Load the Council Final Output

1. Determine the project path: `projects/{client-name}/{project-name}/`
2. Identify the canonical final output:
   - `council/quality-gate/round-3-final-approved.md` if the Approver made revisions
   - `council/round-3-final.md` if the Approver approved as-is
3. Load the original `INPUT.md` brief
4. Load the Titan Genome DNA (`Titan-Genome-Content-Multiplier/SWIPE_FILE_CONTEXT.md`)
5. Load the existing QG reviews (`creator-review.md`, `critic-review.md`, `approver-decision.md`) to understand what was already flagged

**Stop condition:** If no council final output exists, the project is not ready for review. Tell the user to complete the council pipeline first.

---

## Phase 2: Apply Each Titan's Lens (Quick Critiques)

Run a fast critique from each of the 18 copywriter agents. This is NOT a full take -- it is a focused lens applied to the existing final output.

For each agent, produce a 3-5 sentence critique answering:
1. **What works** from this agent's perspective (one strength)
2. **What breaks** from this agent's perspective (one weakness)
3. **One specific change** this agent would make (with the exact replacement language)

Format the output as a table:

| Agent | What Works | What Breaks | Specific Change |
|-------|-----------|------------|----------------|
| Schwartz | Awareness level match is correct for Stage 3 market | Headlines don't escalate -- all hit the same awareness level | Headline 4 should shift to Problem Aware: "{specific rewrite}" |
| Abraham | Preeminence positioning is strong | Partnership angle is missing -- no JV or referral path | Add to GTM Playbook: "Strategic alliance with {specific type}" |
| Hormozi | Value equation is dialed -- dream outcome clear | Time delay not addressed -- buyer doesn't know when results hit | Add to Offer section: "First results in {timeframe} or {guarantee}" |
| ... | ... | ... | ... |

**Run all 18 agents.** No skipping. Each lens catches different problems.

---

## Phase 3: Score All 12 Mandatory Sections

Score each of the 12 mandatory sections from 1-10 based on the titan critiques and your own assessment:

| # | Section | Score | Strongest Element | Weakest Element | Priority |
|---|---------|-------|------------------|-----------------|----------|
| 1 | Positioning Statement | X/10 | {what's working} | {what's not} | HIGH/MED/LOW |
| 2 | Category | X/10 | | | |
| 3 | Unique Mechanism | X/10 | | | |
| 4 | Brand Voice Guide | X/10 | | | |
| 5 | Headline Battery | X/10 | | | |
| 6 | Hook Arsenal | X/10 | | | |
| 7 | Core Messaging Framework | X/10 | | | |
| 8 | The Offer (Restructured) | X/10 | | | |
| 9 | Mechanism Build-Out | X/10 | | | |
| 10 | Go-to-Market Playbook | X/10 | | | |
| 11 | Sample Copy Portfolio | X/10 | | | |
| 12 | Upsell Strategy | X/10 | | | |

**Priority assignment:**
- Score 8-10: LOW priority (strong, minor polish only)
- Score 6-7: MED priority (solid foundation, needs strengthening)
- Score 1-5: HIGH priority (structural weakness, must fix)

**Average score calculation:** Sum all 12 scores, divide by 12. This is the section quality score.

---

## Phase 4: Propose Improvements

For each section scored 7 or below, propose a specific improvement:

```markdown
## Proposed Improvements

### Section {N}: {Section Name} (Current: X/10 -> Target: Y/10)

**Problem:** {One sentence stating what is wrong}
**Copywriter Credit:** {Which titan(s) drive this improvement and why}
**Current Text:**
> {Quote the specific weak passage}

**Proposed Replacement:**
> {The improved text, ready to paste in}

**Why This Is Better:** {One sentence connecting the improvement to a specific framework}
```

**Rules for proposed improvements:**
- Every improvement must credit a specific copywriter and their framework
- Every improvement must include the exact replacement text (not a description of what to change)
- Improvements must be compatible with each other (changing the positioning affects headlines -- account for the cascade)
- Do not propose improvements for sections scored 8+ unless the user specifically asks
- Maximum 8 improvements per review pass (focus on highest-impact changes)

---

## Phase 5: Apply Improvements (If User Approves)

Present all proposed improvements to the user. Ask:

"Here are {N} proposed improvements to the council output. Each one credits the copywriter framework that drives the change. Want me to apply all of them, pick specific ones, or skip?"

**If the user approves (all or selected):**

1. Create a copy of the canonical final output with `-revised` suffix
2. Apply the approved improvements to the `-revised` file
3. Update any cross-references (if the positioning changes, update headlines that reference it)
4. Add a revision header to the top of the file:

```markdown
---
**Revision Note:** This file was produced by the Review skill on {date}.
**Changes Applied:** {N} improvements across {M} sections.
**Copywriter Credits:** {list of agents whose frameworks drove the changes}
**Original File:** {path to original file}
---
```

**If the user declines:** Save the review report only (no file modifications). The review report itself is still valuable.

**File naming:**
- Original: `council/round-3-final.md`
- Revised: `council/round-3-final-revised.md`
- Original: `council/quality-gate/round-3-final-approved.md`
- Revised: `council/quality-gate/round-3-final-approved-revised.md`

---

## Phase 6: Re-run Quality Gate on Revised Output

If improvements were applied, run the 3-agent Quality Gate on the revised file:

1. **Creator QG** reviews creative completeness of the revised output
   - Save to `council/quality-gate/creator-review-revised.md`
2. **Critic QG** stress-tests the revised output
   - Save to `council/quality-gate/critic-review-revised.md`
3. **Approver QG** makes ship/revise decision on the revised output
   - Save to `council/quality-gate/approver-decision-revised.md`

**Compare scores:** Present a before/after comparison:

| Dimension | Original Score | Revised Score | Delta |
|-----------|---------------|--------------|-------|
| Creator QG Overall | X/100 | Y/100 | +/-Z |
| Critic QG Overall | X/100 | Y/100 | +/-Z |
| Section Average | X.X/10 | Y.Y/10 | +/-Z.Z |

**If the revised output scores lower than the original on any dimension, flag it.** The review should improve the output, not weaken it. If a change made things worse, revert that specific change and note why.

---

## Verification Checklist

- [ ] All 18 titan lenses applied (no agents skipped)
- [ ] All 12 mandatory sections scored with specific strengths and weaknesses
- [ ] Every proposed improvement credits a specific copywriter framework
- [ ] Every proposed improvement includes exact replacement text
- [ ] Original files are untouched (only -revised copies created)
- [ ] Revision header added to all -revised files with date, change count, and credits
- [ ] Quality Gate re-run on revised output (if improvements applied)
- [ ] Before/after score comparison produced
- [ ] No improvement made the output worse (all deltas positive or neutral)

## Stop Conditions

- **No council final output exists** -- Stop. The project must complete the council pipeline before review.
- **All 12 sections score 8+** -- Stop proposing changes. Tell the user the output is strong. Offer to polish individual sections if they want, but do not invent problems.
- **User declines all improvements** -- Stop. Save the review report as a reference document. Do not push.
- **Revised output scores lower than original** -- Revert the offending changes. Report which changes backfired and why.

## Completion

When the review is done, tell the user:
- How many sections were reviewed (always 12)
- Average section score before and after
- How many improvements were proposed vs. applied
- Which copywriter frameworks drove the biggest improvements
- Where the -revised files are saved (with full paths)
- Whether the revised output passed the Quality Gate re-run
- Ask: "Want to run the audit skill on the revised output before publishing?"
