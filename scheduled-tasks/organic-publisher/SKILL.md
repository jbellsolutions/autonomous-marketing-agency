---
name: Organic Content Publisher
description: 3x daily (9am, 1pm, 5pm), publish queued content to social platforms via browser automation
---

# Task: Organic Content Publisher

## When This Runs
- Cron: `0 9,13,17 * * *` (9:00 AM, 1:00 PM, 5:00 PM daily)
- Can also be triggered manually with `/publish`

## What To Do

### Step 1: Check Content Queue
1. Read `data/shared/content-queue/pending.json`
2. Filter for posts scheduled for this time slot
3. If no posts are queued for this slot, log and exit
4. Verify each post has: platform, content text, media (if applicable), hashtags

### Step 2: Publish to Facebook
For each Facebook post in the queue:
1. Use Claude in Chrome MCP to navigate to the Facebook page
2. Click "Create post" or navigate to the publishing tool
3. Enter the post text
4. Upload any media files if specified
5. Add any tags or location if specified
6. Click publish
7. Capture the post URL after publishing
8. Log success with post URL and timestamp

### Step 3: Publish to Instagram
For each Instagram post in the queue:
1. Use Claude in Chrome MCP to navigate to Instagram (or Meta Business Suite)
2. Select the correct account
3. Create new post/reel/story as specified
4. Enter caption with hashtags
5. Upload media
6. Publish
7. Capture the post URL
8. Log success

### Step 4: Update Queue
1. Move published posts from `pending.json` to `published.json` with:
   - Post URL
   - Publish timestamp
   - Platform
   - Status (success/failed)
2. Any failed posts remain in `pending.json` with error details and retry count

### Step 5: Post to Slack
- Summary of what was published (platform, post preview, URL)
- Any failures with error details

## Data Paths
- **Input**: `data/shared/content-queue/pending.json`
- **Output**: `data/shared/content-queue/published.json`
- **Media**: `data/shared/content-queue/media/`

## Alerts
- **Slack #content-published**: Summary of published posts with links
- **Slack #system-alerts**: If publishing fails for any post
- **Slack #content-pipeline**: If queue is empty (might need content generation)
