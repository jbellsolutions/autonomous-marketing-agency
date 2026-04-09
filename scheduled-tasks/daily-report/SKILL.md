---
name: Daily Performance Report
description: Daily at 8am, compile all performance data into a summary report and post to Slack
---

# Task: Daily Performance Report

## When This Runs
- Cron: `0 8 * * *` (daily at 8:00 AM)
- Can also be triggered manually with `/daily-report`

## What To Do

### Step 1: Gather Data
1. Read all snapshot files from `data/shared/performance-data/` for the previous day
2. Read `data/shared/performance-data/daily-rolling.json` for trend context
3. Read `config/thresholds.json` for target benchmarks

### Step 2: Run Daily Snapshot Script
1. Execute `node scripts/reporting/daily-snapshot.js`
2. Verify the output file was created at `data/shared/reports/daily/[yesterday-date].json`

### Step 3: Compile Report
Calculate and format:
- **Spend Summary**: Total spend, budget utilization %, budget remaining
- **Performance KPIs**: Avg CPA, Avg ROAS, Avg CTR, Avg CPM, total conversions
- **Top 3 Performers**: Ads with lowest CPA or highest ROAS
- **Bottom 3 Performers**: Ads with highest CPA or lowest ROAS
- **Budget Pacing**: Actual vs planned spend, projected monthly spend at current rate
- **Day-over-Day Trends**: CPA trend (up/down/flat), ROAS trend, spend trend
- **Fatigue Alerts**: Any creatives flagged by `scripts/analysis/creative-fatigue.js`

### Step 4: Format for Slack
Format the report as a structured Slack message with:
- Header with date and overall health indicator (green/yellow/red)
- Sections with bold labels and aligned numbers
- Trend arrows for day-over-day changes
- Action items at the bottom if any thresholds are breached

### Step 5: Post to Slack
- Post full report to `#daily-reports`
- If any action items exist, also post a condensed alert to `#ads-alerts`

## Data Paths
- **Input**: `data/shared/performance-data/snapshot-*.json`
- **Input**: `data/shared/performance-data/daily-rolling.json`
- **Input**: `config/thresholds.json`
- **Output**: `data/shared/reports/daily/[date].json`

## Alerts
- **Slack #daily-reports**: Full daily report (always)
- **Slack #ads-alerts**: Condensed alert if action items exist
- **Slack #system-alerts**: If script fails or data is missing
