---
name: Organic Content Scraper
description: Every 6 hours, run organic content scrapers for Facebook, Instagram, and TikTok to find winning patterns
---

# Task: Organic Content Scraper

## When This Runs
- Cron: `0 */6 * * *` (every 6 hours: midnight, 6am, noon, 6pm)
- Can also be triggered manually with `/organic-scrape`

## What To Do

### Step 1: Run Facebook Organic Scraper
1. Execute `node scripts/scrapers/organic-facebook.js`
2. Verify output at `data/shared/winning-patterns/organic/facebook-latest.json`
3. Log scrape stats: pages scraped, posts found, errors

### Step 2: Run Instagram Organic Scraper
1. Execute `node scripts/scrapers/organic-instagram.js`
2. Verify output at `data/shared/winning-patterns/organic/instagram-latest.json`
3. Log scrape stats: accounts scraped, posts found, reels found, errors

### Step 3: Run TikTok Organic Scraper
1. Execute `node scripts/scrapers/organic-tiktok.js`
2. Verify output at `data/shared/winning-patterns/organic/tiktok-latest.json`
3. Log scrape stats: accounts scraped, videos found, errors

### Step 4: Run Hook Analyzer
1. Execute `node scripts/analysis/hook-analyzer.js`
2. This analyzes hooks across all scraped content and paid ad data
3. Verify output at `data/shared/winning-patterns/hook-analysis.json`

### Step 5: Run Ad Library Scraper
1. Execute `node scripts/scrapers/ad-library-enhanced.js`
2. Verify output at `data/shared/winning-patterns/paid-ads/latest.json`
3. Log scrape stats: competitors checked, ads found, errors

### Step 6: Summary
1. Compile scrape summary with counts and any errors
2. Archive previous data with timestamps before overwriting
3. Post summary to Slack

## Data Paths
- **Config**: `config/ad-accounts.json` (competitor list)
- **Config**: `config/organic-targets.json` (pages/accounts to scrape)
- **Output**: `data/shared/winning-patterns/organic/facebook-latest.json`
- **Output**: `data/shared/winning-patterns/organic/instagram-latest.json`
- **Output**: `data/shared/winning-patterns/organic/tiktok-latest.json`
- **Output**: `data/shared/winning-patterns/paid-ads/latest.json`
- **Output**: `data/shared/winning-patterns/hook-analysis.json`

## Alerts
- **Slack #content-intelligence**: Summary of new winning patterns found
- **Slack #system-alerts**: If any scraper fails or returns zero results
