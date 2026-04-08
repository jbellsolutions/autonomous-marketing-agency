# The Titan Genome -- Content Multiplier System

> **The Content Multiplier** is the product. **The Titan Genome** is the mechanism -- the decoded copywriting DNA of 9 direct response legends. **The Mastermind Table** is the experience -- a Napoleon Hill-style council where those 9 legends sit as AI agents, shaping every piece of content you produce.

This is a Titan Genome project. The system transforms one video recording into 32+ production-ready content pieces using a 3-agent AI pipeline (Creator, Critic, Approver). Each agent draws from the Titan Genome -- the decoded persuasion DNA of 9 direct response masters extracted from 5,716+ real emails. Think of the pipeline as a Mastermind Table: every content piece is reviewed and shaped by a council of legends before it reaches the client.

## Key Files

- `CLIENT_CONFIG.md` -- Client brand, audience, offers, and voice configuration. **Read this first for every agent task.**
- `docs/PROCESS_DOCUMENTATION.md` -- Full pipeline reference with agent prompt templates
- `docs/TEMPLATE_GUIDE.md` -- All 32 templates with customization prompts
- `docs/BUYERS_GUIDE.md` -- Step-by-step onboarding and usage instructions
- `docs/NAMING_ECOSYSTEM.md` -- Product/mechanism/campaign naming conventions (Content Multiplier, Titan Genome, Mastermind Table, etc.)
- `SWIPE_FILE_CONTEXT.md` -- **The Titan Genome itself** -- decoded copywriting DNA patterns from 5,716 real emails
- `templates/` -- Template reference files for all 32 content pieces
- `swipe-file/` -- Titan Genome database (decoded IDs, scripts, style analysis)

## The Titan Genome Positioning (Reference When Writing Copy or Agent Prompts)

- **Product = The Content Multiplier** -- what it does (one video becomes 32+ pieces)
- **Mechanism = The Titan Genome** -- why it works (decoded DNA of 9 legends)
- **Experience = The Mastermind Table** -- what it feels like (Napoleon Hill's Invisible Counselors brought to life as AI agents at your table)
- See `docs/NAMING_ECOSYSTEM.md` for full naming conventions, campaign names, and usage guidelines

## Workflow

1. Client fills out `CLIENT_CONFIG.md`
2. Place transcript in `source/` folder
3. Run Project 1 (Content Map) first -- it's a hard dependency for everything else
4. Run Projects 2-13 using the agent prompts from `docs/TEMPLATE_GUIDE.md`
5. Each project goes through Creator -> Critic -> Approver pipeline (the Mastermind Table reviews every piece)
6. Final outputs land in `outputs/`

## Quality Standards

- Every piece must pass the 10-point Critic checklist (see PROCESS_DOCUMENTATION.md Section 3)
- No placeholder text in final outputs
- All CTAs must match CLIENT_CONFIG.md
- Brand voice must be consistent across all 32 pieces
- Content should reflect the Titan Genome's persuasion architecture -- not generic AI output
