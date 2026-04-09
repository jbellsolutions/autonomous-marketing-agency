---
name: Full Eddie Vibe Marketer Cycle
description: Weekly (Sunday 3am), run the complete Eddie Vibe Marketer pipeline for fresh creative generation
---

# Task: Full Eddie Vibe Marketer Cycle

## When This Runs
- Cron: `0 3 * * 0` (Sunday at 3:00 AM)
- Can also be triggered manually with `/eddie-cycle`
- Also triggered by creative-refresh task when fatigue is detected

## What To Do

### Step 1: Gather Intelligence
1. Read latest scraper outputs:
   - `data/shared/winning-patterns/paid-ads/latest.json`
   - `data/shared/winning-patterns/organic/facebook-latest.json`
   - `data/shared/winning-patterns/organic/instagram-latest.json`
   - `data/shared/winning-patterns/organic/tiktok-latest.json`
2. Read hook analysis: `data/shared/winning-patterns/hook-analysis.json`
3. Read performance data: `data/shared/performance-data/daily-rolling.json`
4. Read fatigue report: `data/shared/performance-data/fatigue-report.json`
5. Read brand voice: `brand-voice/`

### Step 2: Analyze Current Creative Landscape
1. Identify top-performing creative formats across paid and organic
2. Identify top-performing hooks and angles
3. List gaps: formats or hook types not currently being tested
4. Review competitor creative trends from ad library data
5. Determine how many creatives are needed:
   - Replacements for fatigued creatives
   - Net new for testing
   - Variations of current winners

### Step 3: Generate Creative Brief
1. Create comprehensive brief at `data/shared/eddie-briefs/weekly-[date].json`:
   - Target audience profiles
   - Winning patterns to replicate
   - New angles to test
   - Creative format mix (video scripts, image concepts, carousel layouts)
   - Hook variations per format
   - Copy variations (short/medium/long)
   - CTA variations
   - Number of variations per concept

### Step 4: Run Eddie Vibe Marketer
1. Navigate to `eddie-vibe-marketer/` (symlinked at `agents/division-3-eddie/eddie-vibe-marketer`)
2. Execute the full Eddie pipeline:
   - Ad copy generation
   - Hook generation
   - Video script writing
   - Image concept descriptions
   - Carousel copy and layout concepts
3. All outputs go to `data/shared/creative-output/weekly-[date]/`

### Step 5: Organize Outputs
1. Categorize generated creatives by:
   - Format (video/image/carousel)
   - Funnel stage (TOF/MOF/BOF)
   - Hook type
   - Audience segment
2. Create manifest at `data/shared/creative-output/weekly-[date]/manifest.json`
3. Queue for review at `data/shared/creative-output/pending-review.json`

### Step 6: Post to Slack
- Summary of creatives generated (counts by type)
- Top 3 creative concepts (preview)
- Link to full manifest for review
- Estimated time to launch if approved

## Data Paths
- **Input**: `data/shared/winning-patterns/` (all files)
- **Input**: `data/shared/performance-data/`
- **Input**: `brand-voice/`
- **Output**: `data/shared/eddie-briefs/weekly-[date].json`
- **Output**: `data/shared/creative-output/weekly-[date]/`
- **Output**: `data/shared/creative-output/pending-review.json`

## Alerts
- **Slack #creative-pipeline**: Full summary of generated creatives
- **Slack #weekly-strategy**: Creative generation complete, ready for review
- **Slack #system-alerts**: If Eddie pipeline fails or produces zero outputs
