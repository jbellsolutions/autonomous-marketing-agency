---
name: Community Responder
description: Every 2 hours, check and respond to comments on published posts across platforms
---

# Task: Community Responder

## When This Runs
- Cron: `0 */2 8-22 * * ` (every 2 hours, 8am-10pm)
- Can also be triggered manually with `/respond`

## What To Do

### Step 1: Load Response Guidelines
1. Read `brand-voice/` for tone and voice guidelines
2. Read `config/community-rules.json` for:
   - Auto-response templates by comment type
   - Escalation triggers (complaints, refund requests, negative sentiment)
   - Prohibited response patterns
   - Comment categories and appropriate responses

### Step 2: Check Facebook Comments
1. Use Claude in Chrome MCP to navigate to the Facebook page
2. Check recent posts for new comments (since last check)
3. For each new comment:
   - Classify: question, compliment, complaint, spam, neutral
   - If spam: hide the comment
   - If compliment: respond with a thank you (vary the response)
   - If question: provide a helpful answer based on brand knowledge
   - If complaint: respond empathetically, offer to take to DMs if needed
   - If escalation trigger: flag for human review, do not auto-respond
4. Log all comments and responses

### Step 3: Check Instagram Comments
1. Navigate to Instagram or Meta Business Suite
2. Check recent posts for new comments
3. Apply same classification and response logic as Facebook
4. Also check DM requests if accessible

### Step 4: Log Activity
1. Save all interactions to `data/shared/community/responses-[date].json`
2. Track:
   - Total comments processed
   - Comments by category
   - Responses sent
   - Escalations flagged
   - Response time (time between comment and response)

### Step 5: Post Summary to Slack
- Total comments processed across platforms
- Breakdown by category
- Any escalations that need human attention
- Notable positive feedback worth highlighting

## Data Paths
- **Input**: `brand-voice/` (tone guidelines)
- **Input**: `config/community-rules.json`
- **Output**: `data/shared/community/responses-[date].json`
- **Output**: `data/shared/community/escalations.json`

## Alerts
- **Slack #community**: Summary of engagement activity
- **Slack #escalations**: Any comments requiring human intervention (complaints, refund requests)
- **Slack #system-alerts**: If browser automation fails
