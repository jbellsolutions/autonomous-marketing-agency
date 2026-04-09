---
name: Weekly Strategy Review
description: Monday 9am, week-over-week analysis with budget pacing and strategy recommendations
---

# Task: Weekly Strategy Review

## When This Runs
- Cron: `0 9 * * 1` (Monday at 9:00 AM)
- Can also be triggered manually with `/weekly-strategy`

## What To Do

### Step 1: Gather Weekly Data
1. Read all daily reports from `data/shared/reports/daily/` for the past 7 days
2. Read the previous week's strategy report from `data/shared/reports/weekly/` for comparison
3. Read `config/thresholds.json` for target benchmarks
4. Read `data/shared/winning-patterns/hook-analysis.json` for creative insights

### Step 2: Week-over-Week Analysis
Calculate for this week vs last week:
- Total spend and % change
- Average CPA and % change
- Average ROAS and % change
- Total conversions and % change
- Average CTR and % change
- Average frequency and % change
- Number of creative refreshes triggered

### Step 3: Budget Pacing
1. Read monthly budget from `config/budgets.json`
2. Calculate: days elapsed in month, spend to date, daily run rate
3. Project: estimated month-end spend at current rate
4. Flag: overpacing (>110% projected) or underpacing (<85% projected)
5. Recommend: daily budget adjustments if off-pace

### Step 4: Creative Performance Analysis
1. Rank all active creatives by CPA (best to worst)
2. Identify creative types performing best (video vs image vs carousel)
3. Identify hook types performing best (cross-reference with hook-analysis.json)
4. Flag creatives approaching fatigue (frequency > 2.5, rising CPA trend)
5. Recommend: how many new creatives needed this week

### Step 5: Strategy Recommendations
Generate 3-5 actionable recommendations based on data:
- Budget reallocation suggestions (shift spend to winners)
- Audience adjustments (expand or narrow based on frequency/CPA)
- Creative direction for next batch (based on winning patterns)
- Funnel stage focus (TOF/MOF/BOF balance)
- Testing suggestions (new hooks, formats, audiences)

### Step 6: Save and Post
1. Save full report to `data/shared/reports/weekly/[date].json`
2. Format as structured Slack message
3. Post to `#weekly-strategy`

## Data Paths
- **Input**: `data/shared/reports/daily/[date].json` (past 7 days)
- **Input**: `data/shared/reports/weekly/[previous-date].json`
- **Input**: `config/thresholds.json`, `config/budgets.json`
- **Input**: `data/shared/winning-patterns/hook-analysis.json`
- **Output**: `data/shared/reports/weekly/[date].json`

## Alerts
- **Slack #weekly-strategy**: Full weekly report with recommendations
- **Slack #ads-alerts**: If budget pacing is critically off (>120% or <70%)
- **Slack #system-alerts**: If data is incomplete or script errors
