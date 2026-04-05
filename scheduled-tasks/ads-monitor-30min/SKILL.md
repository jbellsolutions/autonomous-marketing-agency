---
name: Ads Manager Monitor (30-min)
description: Every 30 min during business hours, open Ads Manager via browser, read campaign stats, apply thresholds, post alerts to Slack
---

# Task: Ads Manager Monitor (30-min)

## When This Runs
- Cron: `*/30 6-23 * * *` (every 30 minutes, 6am-11pm daily)
- Runs autonomously; no manual trigger needed

## What To Do

### Step 1: Open Ads Manager
1. Use Claude in Chrome MCP to navigate to `https://adsmanager.facebook.com`
2. Wait for the page to fully load (check for campaign table presence)
3. If login is required, alert Slack and stop -- do not attempt to log in

### Step 2: Read Campaign Data
1. Use `read_page` to extract the campaigns table
2. For each active campaign, capture:
   - Campaign name
   - Status
   - Spend (today)
   - Impressions
   - Clicks
   - CTR
   - CPC
   - CPM
   - Conversions
   - CPA
   - ROAS
   - Frequency
3. Navigate into each campaign to read ad set and ad level data if thresholds are triggered

### Step 3: Apply Thresholds
Check each active campaign/ad set/ad against these rules:
- **CRITICAL**: CPA > 2x target CPA from `config/thresholds.json`
- **CRITICAL**: Daily spend > 120% of daily budget
- **WARNING**: Frequency > 3.5
- **WARNING**: CTR < 0.5%
- **WARNING**: ROAS < breakeven ROAS from config
- **INFO**: Any campaign spending < 50% of budget (underspend)

### Step 4: Save Snapshot
1. Write raw metrics to `data/shared/performance-data/snapshot-[timestamp].json`
2. Append summary row to `data/shared/performance-data/daily-rolling.json`

### Step 5: Post to Slack
- If any CRITICAL thresholds triggered: post to `#ads-alerts` with red indicator and details
- If any WARNING thresholds triggered: post to `#ads-monitoring` with yellow indicator
- Every 4 hours (on the hour): post a summary to `#ads-monitoring` regardless of thresholds

## Data Paths
- **Config**: `config/thresholds.json`
- **Output**: `data/shared/performance-data/snapshot-[timestamp].json`
- **Rolling**: `data/shared/performance-data/daily-rolling.json`

## Alerts
- **Slack #ads-alerts**: Critical threshold breaches (immediate)
- **Slack #ads-monitoring**: Warnings and periodic summaries
- If browser login fails or page errors: post to `#system-alerts`
