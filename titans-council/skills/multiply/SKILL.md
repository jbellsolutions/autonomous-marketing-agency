---
name: "multiply"
description: "Turn council-approved positioning into 32 production-ready content pieces across 13 project categories. Runs each piece through the Creator-Critic-Approver pipeline using Titan Genome DNA. Project 1 (Content Map) is a hard dependency that must complete before any other project starts. Use when the user says 'run the content multiplier', 'content production', 'multiply this', 'run all 13 projects', 'create the content', or after the Quality Gate approves the council output."
license: MIT
metadata:
  version: 1.0.0
  author: Titans Pipeline
  category: content-production
  domain: content-multiplier
  updated: 2026-03-27
  frameworks: titan-genome, creator-critic-approver
---

# Content Multiplier

One council output becomes 32 production-ready content pieces. Every piece carries Titan Genome DNA. Nothing ships without passing three agents.

## Keywords

content multiplier, content production, 13 projects, 32 templates, creator critic approver, content map, email course, lead magnet, sales page, social calendar, video plan, community content, handouts, case study, operations hub, newsletter, course build

## Voice Directive

Write like the council wrote -- specific, credited, zero filler. Every content piece must sound like it was shaped by named copywriters at the Mastermind Table, not assembled by a language model. Banned vocabulary: "delve", "utilize", "leverage" (as verb), "in today's landscape", "game-changer", "it's important to note", "at the end of the day", "synergy", "ecosystem" (when meaning audience), "holistic approach", "moving forward", "circle back", "deep dive" (as noun), "unpack", "robust". If a sentence could appear in any company's content, rewrite it until it could only appear in this one.

---

## Iron Law

**PROJECT 1 (CONTENT MAP) MUST COMPLETE BEFORE ANY OTHER PROJECT STARTS.**

The Content Map is the root dependency. It catalogs every teachable moment, topic, quote, story, and content opportunity from the source material. Every downstream project references it. Skip it and the rest collapses.

---

## The 13 Projects

| # | Project | What It Produces | Files | Template |
|---|---------|-----------------|-------|----------|
| 1 | **Content Map** | Master blueprint mapping the offer into a full content plan. Topic index, quote bank, story moments, clip opportunities, framework catalog, topic-to-project matrix. | 1 | `PROJECT_1_Content_Map_Template.md` |
| 2 | **Full Course** | Complete multi-module course with lessons, exercises, supporting materials. Both audience paths mapped. | 1 | `PROJECT_2_Course_Template.md` |
| 3 | **Email Course** | 9-email drip sequence (Day 0 through Day 8) with engagement triggers and conversion architecture. | 1 | `PROJECT_3_Email_Course_Template.md` |
| 4 | **Client Lead Magnet** | 7-page PDF guide + landing page copy + 5 follow-up emails for business owner audience. | 3 | `PROJECT_4_Client_Lead_Magnet_Template.md` |
| 5 | **Practitioner Lead Magnet** | 8-page playbook + certification sales page + 5 follow-up emails for implementation partners. | 3 | `PROJECT_5_Practitioner_Lead_Magnet_Template.md` |
| 6 | **Newsletters** | 10-12 standalone emails per audience segment. Client newsletter + practitioner newsletter. | 2 | `PROJECT_6_Newsletter_Template.md` |
| 7 | **Social + Challenge** | Two 30-day social calendars (one per persona) + 5-day challenge campaign with daily structure. | 3 | `PROJECT_7_Social_Calendar_Template.md` |
| 8 | **Video Plans** | 14-18 video content plans per persona with hooks, outlines, CTAs, and platform targeting. | 2 | `PROJECT_8_Video_Plan_Template.md` |
| 9 | **Community Content** | 14-day content calendar + club structure blueprint + progress tracking + video maximization guide. | 4 | `PROJECT_9_Community_Content_Template.md` |
| 10 | **Sales Page** | Full long-form direct response sales page with 11 sections. Schwartz awareness-matched. | 1 | `PROJECT_10_Sales_Page_Template.md` |
| 11 | **Operations Hub** | Setup guide + sales copy + integration checklist for implementation. | 3 | `PROJECT_11_Operations_Hub_Template.md` |
| 12 | **Handouts** | Resource guide + setup checklist + quick reference card. Print-ready. | 3 | `PROJECT_12_Handouts_Template.md` |
| 13 | **Case Study** | Written story + YouTube video script + interview questions + 5 social posts. | 5 | `PROJECT_13_Case_Study_Template.md` |
| | **TOTAL** | | **32** | |

---

## Phase 1: Load Council Final Output

**Input:** The QG-approved council deliverable.

1. Check for `council/quality-gate/round-3-final-approved.md` first (this exists if the Approver made revisions)
2. Fall back to `council/round-3-final.md` if approved as-is
3. Confirm the Approver decision file (`council/quality-gate/approver-decision.md`) shows APPROVED or APPROVED WITH REVISIONS
4. Load `Titan-Genome-Content-Multiplier/SWIPE_FILE_CONTEXT.md` as the Titan Genome DNA reference
5. Load `INPUT.md` as the original brief context

**Stop condition:** If no approved council output exists, stop and tell the user. The council pipeline must complete and pass the Quality Gate before the Content Multiplier can run.

---

## Phase 2: Run Project 1 -- Content Map (Hard Dependency)

**This phase is mandatory. It runs before anything else. No exceptions.**

1. Load the template from `Titan-Genome-Content-Multiplier/templates/PROJECT_1_Content_Map_Template.md`
2. Feed the QG-approved council output as brand and offer context
3. Feed the Titan Genome DNA for copywriting patterns
4. **Creator Agent** produces the full Content Map following the template structure:
   - Master Topic Index with all topics numbered and clustered
   - Topic hierarchy and difficulty progression for both audience personas
   - Topic-to-Project matrix showing which topics feed which downstream projects
   - Key Quotes Bank (minimum 15-25 quotes)
   - Story Moments and Anecdotes catalog
   - Clip Opportunities (minimum 10-20)
   - Frameworks and Models identified
   - All appendices (Glossary, Tools, Demos, Audience Notes, CTAs, Content Gaps)
5. **Critic Agent** reviews against the Content Map completion checklist
6. **Approver Agent** stamps for production or sends back for revision
7. Save to `content-multiplier/project-1-content-map/content-map.md`

**Stop condition:** If the Content Map fails the Approver, revise and re-submit. Do not proceed to Phase 3 until the Content Map is approved.

---

## Phase 3: Present Remaining 12 Projects

Present the user with this menu:

```
The Content Map is done. Here are the remaining 12 projects.
Tell me which ones to run (numbers, names, or "all"):

 2. Full Course          -- Complete course with modules, lessons, exercises
 3. Email Course         -- 9-email drip sequence (Day 0-8)
 4. Client Lead Magnet   -- PDF guide + landing page + 5 follow-up emails
 5. Practitioner Lead Magnet -- Playbook + sales page + 5 follow-up emails
 6. Newsletters          -- 10-12 standalone emails per audience
 7. Social + Challenge   -- Two 30-day social calendars + 5-day challenge
 8. Video Plans          -- 14-18 video content plans per persona
 9. Community Content    -- 14-day calendar + club structure + progress tracking
10. Sales Page           -- Full long-form sales page (11 sections)
11. Operations Hub       -- Setup guide + sales copy + integration checklist
12. Handouts             -- Resource guide + setup checklist + quick reference card
13. Case Study           -- Written story + video script + interview Qs + social posts

Just type the numbers (e.g., "2, 3, 7, 10") or say "all".
```

Wait for user selection. Accept numbers, names, or "all". If the user describes what they need in plain language, map it to the correct project numbers.

---

## Phase 4: Run Selected Projects Through Creator-Critic-Approver

For each selected project, in order:

1. Load the template from `Titan-Genome-Content-Multiplier/templates/PROJECT_{N}_*.md`
2. Feed the approved Content Map as the topic and structure reference
3. Feed the QG-approved council output as brand and offer context
4. Feed the Titan Genome DNA for copywriting patterns

**Creator Agent:**
- Produces the full draft following the template structure
- Every piece must reference specific council positioning decisions
- Every piece must credit which copywriter patterns shaped it
- All content must match the Brand Voice Guide from the council output

**Critic Agent:**
- Reviews against the template's quality criteria
- Checks brand voice consistency with council output
- Checks that CTAs are specific (not generic "learn more")
- Checks that claims match the proof structure from the council
- Scores the piece and flags issues

**Approver Agent:**
- Reads Creator draft and Critic review
- Makes ship/revise decision
- If revise: apply fixes and re-submit to Critic
- If ship: stamp for production

**Parallelism:** Run up to 3 projects simultaneously when they share no dependencies. Projects 4 and 5 (lead magnets) can run in parallel. Projects 6, 7, and 8 can run in parallel. Project 9 depends on Project 2 (Course). Project 13 can run last or in parallel with anything.

---

## Phase 5: Save Outputs

Save each approved project to the correct folder:

```
content-multiplier/
  project-1-content-map/
    content-map.md
  project-{N}-{kebab-name}/
    {file-1}.md
    {file-2}.md  (if multi-file project)
    {file-3}.md  (if multi-file project)
```

Naming convention for multi-file projects:
- Project 4: `client-lead-magnet.md`, `client-landing-page.md`, `client-follow-up-emails.md`
- Project 5: `practitioner-lead-magnet.md`, `practitioner-sales-page.md`, `practitioner-follow-up-emails.md`
- Project 6: `client-newsletter.md`, `practitioner-newsletter.md`
- Project 7: `persona-a-social-calendar.md`, `persona-b-social-calendar.md`, `5-day-challenge.md`
- Project 8: `persona-a-video-plan.md`, `persona-b-video-plan.md`
- Project 9: `14-day-calendar.md`, `club-structure.md`, `progress-tracking.md`, `video-maximization.md`
- Project 11: `setup-guide.md`, `sales-copy.md`, `integration-checklist.md`
- Project 12: `resource-guide.md`, `setup-checklist.md`, `quick-reference-card.md`
- Project 13: `case-study-story.md`, `youtube-script.md`, `interview-questions.md`, `social-posts.md`, `case-study-summary.md`

---

## Phase 6: Quality Summary

Produce a summary report at `content-multiplier/MULTIPLIER-SUMMARY.md`:

```markdown
# Content Multiplier Summary -- {Project Name}

## Projects Completed: {X} of 13
## Total Files Produced: {Y} of 32

| # | Project | Status | Creator Score | Critic Score | Approver | Send-Backs |
|---|---------|--------|--------------|-------------|----------|------------|
| 1 | Content Map | Done | X/100 | X/100 | Approved | 0 |
| 2 | Full Course | Done/Skipped | ... | ... | ... | ... |
...

## Quality Notes
{Any patterns across projects -- recurring strengths, recurring weaknesses}

## What Ships
{List of all production-ready files with paths}

## What Needs Attention
{Any projects that required multiple revisions or had low scores}
```

---

## Verification Checklist

Before marking the Content Multiplier complete:

- [ ] Project 1 (Content Map) completed and approved BEFORE any other project started
- [ ] All selected projects ran through Creator-Critic-Approver pipeline
- [ ] Every content piece references specific council positioning (not generic advice)
- [ ] Every content piece credits which copywriter patterns shaped it
- [ ] All CTAs are specific to the offer (no generic placeholders)
- [ ] Brand voice is consistent across all pieces (matches council Brand Voice Guide)
- [ ] All files saved to correct `content-multiplier/project-{N}-{name}/` folders
- [ ] MULTIPLIER-SUMMARY.md produced with scores and status for all projects
- [ ] No piece shipped without Approver stamp

## Stop Conditions

- **No approved council output** -- Stop. Run the council pipeline first.
- **Content Map fails Approver 3 times** -- Stop. Flag for human review.
- **Any project scores below 60 on both Creator and Critic** -- Stop that project. Flag for human review. Continue other projects.
- **User cancels mid-run** -- Save all completed work. Report what finished and what did not.

## Completion

When all selected projects are done, tell the user:
- How many projects completed (X of 13)
- How many files produced (Y of 32)
- Average quality scores across all projects
- Any projects that needed extra revision cycles
- Where all the files live
- Ask: "Want to publish this to the GitHub repo now?"
