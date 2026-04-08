# Client Configuration -- The Content Multiplier

> **What you are configuring:** Your seat at the mastermind table. The Content Multiplier is powered by **The Titan Genome** -- the decoded copywriting DNA of nine legendary direct response writers. When you fill out this file, you are telling those nine minds exactly who you are, who you serve, and what you sell. Every content asset the system produces will be shaped by their combined century of persuasion expertise, tuned to your brand.

**Fill this out before running any projects. This file is loaded by every agent prompt.**

---

## Brand Identity

```yaml
brand_name: ""
tagline: ""
website: ""
support_email: ""
```

## Brand Voice

```yaml
tone: ""  # e.g., "Professional but approachable", "Direct and tactical", "Warm and conversational"
personality: ""  # e.g., "Confident expert who simplifies complex topics"
preferred_terms:
  - ""  # Terms your brand uses consistently
avoided_terms:
  - ""  # Terms to never use (competitor names, outdated terminology, etc.)
ai_isms_to_avoid:
  - "In conclusion"
  - "It's important to note"
  - "Let's dive in"
  - "In today's fast-paced world"
  - "Game-changing"
  - "Revolutionary"
```

## Audiences

### Primary Audience (Audience A)

```yaml
name: ""  # e.g., "Business Owners", "Marketing Directors", "Coaches"
voice_persona: ""  # Who speaks to this audience? Name or role.
pain_points:
  - ""
desires:
  - ""
sophistication_level: ""  # beginner / intermediate / advanced
language_they_use:
  - ""  # Actual phrases your audience says
platforms:
  - ""  # e.g., LinkedIn, Facebook, YouTube
```

### Secondary Audience (Audience B)

```yaml
name: ""  # e.g., "Aspiring Practitioners", "Team Members", "Freelancers"
voice_persona: ""  # Who speaks to this audience?
pain_points:
  - ""
desires:
  - ""
sophistication_level: ""
language_they_use:
  - ""
platforms:
  - ""
```

## Offers

### Main Offer

```yaml
name: ""
price: ""
description: ""  # One sentence
unique_mechanism: ""  # What makes your method different?
target_outcome: ""  # What result does the buyer get?
url: ""
```

### Secondary Offers (optional)

```yaml
lead_magnet_a:
  name: ""
  description: ""
  url: ""

lead_magnet_b:
  name: ""
  description: ""
  url: ""

upsell:
  name: ""
  price: ""
  url: ""
```

## CTAs

```yaml
primary_cta: ""  # e.g., "Book a strategy call"
primary_cta_url: ""
secondary_cta: ""  # e.g., "Download the free guide"
secondary_cta_url: ""
calendar_link: ""  # If applicable
```

## Content Topic

```yaml
topic: ""  # What is your video about?
sub_topics:
  - ""
industry: ""
```

## Titan Genome Style Preference (Optional)

Choose which of the nine copywriting legends should take the lead at your mastermind table. Leave blank and the system will draw from all nine in balanced proportion.

```yaml
primary_style: ""  # e.g., "Todd Brown -- mechanism reveals"
secondary_style: ""  # e.g., "Bill Mueller -- curiosity hooks"
# See SWIPE_FILE_CONTEXT.md for all 9 copywriter profiles and when to use each
```

---

## How This Config Is Used

Every agent in The Content Multiplier pipeline reads this file. Think of it as the briefing document you hand to each legend before they sit down at your table.

1. **Creator Agent** -- Writes in your brand voice, targets your audience, references your offers and CTAs, applies Titan Genome copywriting architecture
2. **Critic Agent** -- Checks output against your brand standards, verifies correct audience targeting, ensures the persuasion DNA is properly expressed
3. **Approver Agent** -- Final pass for brand voice consistency, CTA accuracy, and cross-piece coherence

**Fill this out completely before running your first Content Map.** The more specific you are, the better the output quality.
