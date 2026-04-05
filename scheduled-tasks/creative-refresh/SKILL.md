---
name: Creative Refresh Trigger
description: Triggered when creative fatigue is detected, runs the Eddie Vibe Marketer cycle to generate replacement creatives
---

# Task: Creative Refresh Trigger

## When This Runs
- Triggered by: `scripts/analysis/creative-fatigue.js` detecting fatigued creatives
- Can also be triggered manually with `/creative-refresh`
- The ads-monitor-30min task checks fatigue signals and triggers this when needed

## What To Do

### Step 1: Read Fatigue Report
1. Read `data/shared/performance-data/fatigue-report.json`
2. Identify which creatives are fatigued and why:
   - Frequency > 3.5
   - CTR declining for 3+ consecutive days
   - CPA increasing for 3+ consecutive days
3. Note the creative type, hook style, and audience for each fatigued ad

### Step 2: Analyze What Was Working
1. Read `data/shared/winning-patterns/hook-analysis.json`
2. Read `data/shared/winning-patterns/paid-ads/latest.json`
3. Read `data/shared/winning-patterns/organic/` for recent organic winners
4. Identify:
   - Which hook types are currently performing best
   - Which creative formats (video/image/carousel) are winning
   - What angles/themes resonate with the audience

### Step 3: Prepare Eddie Vibe Marketer Brief
1. Create a creative brief at `data/shared/eddie-briefs/refresh-[timestamp].json` with:
   - Fatigued creatives to replace (names, types, audiences)
   - Winning patterns to draw from
   - Specific hook types to use
   - Number of variations needed (minimum 3 per fatigued creative)
   - Brand voice constraints from `brand-voice/`

### Step 4: Trigger Eddie Cycle
1. Execute the Eddie Vibe Marketer pipeline:
   - Navigate to `eddie-vibe-marketer/` (symlinked)
   - Run the creative generation cycle with the prepared brief
   - Output new creatives to `data/shared/creative-output/`
2. Wait for completion and verify outputs exist

### Step 5: Queue for Review
1. Save generated creatives metadata to `data/shared/creative-output/pending-review.json`
2. Post to Slack with preview of new creatives and the brief that generated them

## Data Paths
- **Input**: `data/shared/performance-data/fatigue-report.json`
- **Input**: `data/shared/winning-patterns/` (all subdirectories)
- **Input**: `brand-voice/`
- **Output**: `data/shared/eddie-briefs/refresh-[timestamp].json`
- **Output**: `data/shared/creative-output/`

## Alerts
- **Slack #creative-pipeline**: New creatives generated, ready for review
- **Slack #ads-alerts**: If fatigue is severe (multiple creatives fatigued simultaneously)
- **Slack #system-alerts**: If Eddie pipeline fails
