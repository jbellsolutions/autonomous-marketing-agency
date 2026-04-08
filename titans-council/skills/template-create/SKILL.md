---
name: "template-create"
description: "Create a new content template following the existing 13-template pattern in the Titan Genome Content Multiplier. Generates the template with sections, instructions, quality criteria, and placeholders, then adds it to the templates directory and updates TEMPLATE_GUIDE.md. Use when the user says 'create a template', 'new template', 'add a content type', 'I need a template for [type]', or 'add project 14'."
license: MIT
metadata:
  version: 1.0.0
  author: Titans Pipeline
  category: template-management
  domain: template-creation
  updated: 2026-03-27
  frameworks: titan-genome, content-multiplier
---

# Template Create

Add a new content type to the Titan Genome Content Multiplier. Every template follows the same structural pattern as the existing 13 -- header, sections, placeholders, quality checklist. The Content Multiplier pipeline depends on this consistency.

## Keywords

create template, new template, add template, new content type, add project, template format, content template, template guide, new deliverable type

## Voice Directive

Write template instructions the way a production manager writes a spec sheet. Every section tells the Creator Agent exactly what to produce, the Critic Agent exactly what to check, and the Approver Agent exactly what "done" looks like. No ambiguity. No "feel free to." Banned vocabulary: "delve", "utilize", "leverage" (as verb), "feel free to", "you might consider", "as appropriate", "holistic", "best practices" (without specifying which). Every instruction must be concrete enough that two different agents following it would produce structurally identical outputs.

---

## Existing Template Format

Every template in `Titan-Genome-Content-Multiplier/templates/` follows this structure. Reference `PROJECT_1_Content_Map_Template.md` as the canonical example.

```markdown
# PROJECT {N}: {Template Name}
## Structural Template

**What This Produces:** {One sentence describing the deliverable}

**Swipe File DNA Assignment:** {Which Titan Genome patterns apply}

**Dependencies:** {Which other projects must complete first, or "None"}

**Source Input:** {What data feeds this template -- typically council output + Content Map}

---

## SECTION 1: PROJECT HEADER

{Standard metadata block with placeholder variables}

---

## SECTION 2: {First Content Section}

<!-- Instructions for what goes here -->

{Table or structure with {{PLACEHOLDER}} variables}

---

## SECTION 3: {Next Content Section}

...continue for all sections...

---

## {TEMPLATE NAME} COMPLETION CHECKLIST

- [ ] {Check 1}
- [ ] {Check 2}
...
```

**Key patterns across all existing templates:**
- Placeholder variables use `{{DOUBLE_CURLY_BRACES}}` in SCREAMING_SNAKE_CASE
- HTML comments (`<!-- -->`) provide instructions to the Creator Agent
- Tables define repeating structures (emails, social posts, video plans)
- Every template ends with a completion checklist
- Audience references use `{{PERSONA_A_NAME}}` / `{{PERSONA_B_NAME}}` and `{{AUDIENCE_A}}` / `{{AUDIENCE_B}}`
- Brand references use `{{BRAND_NAME}}`

---

## Phase 1: Understand the New Content Type

Ask the user:

1. **What is the deliverable?** -- What does the final output look like? (e.g., "a podcast episode plan", "a webinar script", "a partnership outreach sequence")
2. **Who is the audience?** -- Which persona(s) is this for? (Audience A, Audience B, or Both)
3. **How many files does it produce?** -- Single file or multi-file project?
4. **What depends on it?** -- Does anything else need this to exist first?
5. **What does it depend on?** -- Does it need the Content Map, the Course, or another project to exist first?
6. **What makes this different from the existing 13?** -- Confirm this is not already covered by an existing template

**Overlap check:** Before creating, verify the new content type is not already handled by:
- Project 3 (Email Course) -- covers email sequences
- Project 6 (Newsletters) -- covers standalone emails
- Project 7 (Social + Challenge) -- covers social media calendars and challenges
- Project 8 (Video Plans) -- covers video content plans
- Project 10 (Sales Page) -- covers long-form sales copy
- Project 13 (Case Study) -- covers story-based content

If there is overlap, clarify with the user whether they want a new template or a variation of an existing one.

---

## Phase 2: Research Best Practices

For the identified content type:

1. What are the standard structural components? (e.g., a webinar has hook, content blocks, transition to offer, close)
2. What are the quality markers? (What separates a good one from a bad one?)
3. Which Titan Genome copywriters are most relevant? Map to existing agents:
   - Sales-oriented content: Schwartz, Kennedy, Bencivenga, Hormozi
   - Story-oriented content: Sugarman, Mueller, Bilyeu
   - Email/outreach content: Buchan, Lead Gen Jay, Kurtz
   - Strategy/positioning content: Abraham, Marshall, Brown
   - Broadcast/media content: Catona, Renker
   - Systems/operations content: Ottley, Grossman
4. What is the typical word count or length range?
5. How many sections should the template have?

---

## Phase 3: Generate the Template

Create the template file at:
`Titan-Genome-Content-Multiplier/templates/PROJECT_{N}_{Template_Name_Template}.md`

Where `{N}` is the next sequential number (14 if all 13 exist).

Follow the exact structural pattern:

1. **H1 header** with project number and name
2. **Structural Template** H2 subheader
3. **Metadata block** (What This Produces, Swipe File DNA Assignment, Dependencies, Source Input)
4. **Section 1: Project Header** with standard metadata placeholders
5. **Content sections** (3-15 sections depending on complexity), each with:
   - Clear H3 header
   - HTML comment instructions for the Creator Agent
   - Table or structure with `{{PLACEHOLDER}}` variables
   - Minimum content expectations stated explicitly
6. **Appendices** if the content type benefits from supplementary material
7. **Completion Checklist** at the end with all quality gates as checkboxes

**Placeholder variable rules:**
- Use `{{DOUBLE_CURLY_BRACES}}` consistently
- SCREAMING_SNAKE_CASE for variable names
- Reuse existing variables where applicable (`{{BRAND_NAME}}`, `{{PERSONA_A_NAME}}`, etc.)
- New variables must be self-documenting (e.g., `{{WEBINAR_HOOK_STATEMENT}}` not `{{HOOK}}`)

**Section instruction rules:**
- Every section must tell the Creator what to produce (not just what the section is about)
- Include minimum counts where applicable ("Minimum 5 headlines", "At least 3 examples")
- Include audience targeting for each section (Audience A, B, or Both)
- Include the emotional tone or persuasion angle for each section

---

## Phase 4: Add to Templates Directory

1. Save the template to `Titan-Genome-Content-Multiplier/templates/PROJECT_{N}_{Name}_Template.md`
2. Verify the file follows the naming convention: `PROJECT_{number}_{Name_In_Title_Case}_Template.md`
3. Confirm the file renders correctly as Markdown (tables aligned, headers nested properly, no broken links)

---

## Phase 5: Update TEMPLATE_GUIDE.md

Open `Titan-Genome-Content-Multiplier/docs/TEMPLATE_GUIDE.md` and:

1. Add the new template to the appropriate Quick-Reference Table category (Emails, Sales Pages, Lead Magnets, Social Media, Video Content, Course, Community, Checklists, or create a new category if none fits)
2. Add the new template row with: Template name, Project number, File name, Audience, Dependencies
3. Update any totals or counts referenced in the guide

If the template creates a new content category not represented in the existing guide sections, add a new category section following the existing format.

---

## Phase 6: Verify Template Consistency

Run this checklist against the new template:

- [ ] File exists at `Titan-Genome-Content-Multiplier/templates/PROJECT_{N}_{Name}_Template.md`
- [ ] Starts with `# PROJECT {N}: {Template Name}` (H1)
- [ ] Has `## Structural Template` (H2)
- [ ] Has metadata block (What This Produces, Swipe File DNA, Dependencies, Source Input)
- [ ] Has `## SECTION 1: PROJECT HEADER` with standard metadata placeholders
- [ ] All placeholder variables use `{{DOUBLE_CURLY_BRACES}}` in SCREAMING_SNAKE_CASE
- [ ] All sections have HTML comment instructions for the Creator Agent
- [ ] Completion checklist exists at the end with checkbox items
- [ ] Dependencies are accurate (Content Map listed if required)
- [ ] Audience targeting specified for each section
- [ ] Minimum content expectations stated where applicable
- [ ] Template added to TEMPLATE_GUIDE.md in the correct category
- [ ] No structural conflicts with existing templates (different content, not a duplicate)
- [ ] Template is self-contained (a Creator Agent could produce the full deliverable from this template alone, given the council output and Content Map)

**Cross-check with 3 existing templates:**

Read `PROJECT_1_Content_Map_Template.md`, `PROJECT_3_Email_Course_Template.md`, and `PROJECT_10_Sales_Page_Template.md` to confirm:
- Header format matches
- Metadata block format matches
- Section numbering convention matches
- Placeholder variable convention matches
- Checklist format matches

---

## Stop Conditions

- **Content type already covered by existing template** -- Stop. Point the user to the existing template. Offer to create a variation instead.
- **User cannot define what the deliverable looks like** -- Stop. A template without a clear output is not a template. Help the user clarify what they want produced.
- **Template would have fewer than 3 sections** -- Stop. A content type that simple does not need its own template. It can be a section within an existing project.
- **Format validation fails** -- Do not save. Fix the format issue and re-validate.

## Completion

When the template is created, tell the user:
- Template name and project number
- Number of sections and estimated output size
- Which Titan Genome agents are assigned to it
- Dependencies (what must exist before this template can run)
- Where the template file is saved
- That TEMPLATE_GUIDE.md has been updated
- How to run this template through the Content Multiplier pipeline
