# /queue-project — Add a Funnel Project to the Build Queue

Queue a new funnel build project for the Funnel Flow AI agent.

## Trigger
- User says: `/queue-project` or "queue a funnel" or "add to funnel queue"

## Inputs
- `client_name` (required): Client or business name
- `funnel_type` (required): Type of funnel to build
- `offer` (required): What's being sold, pricing
- `icp` (optional): Target audience
- `deadline` (optional): When it needs to be done

## Phases

### Phase 1: Collect Spec
If inputs not provided via arguments, ask:
1. "Who is this funnel for?" → client_name
2. "What type of funnel?" → funnel_type (show options from config/funnel-types.json)
3. "What's the offer?" → offer description
4. "Who's the target audience?" → ICP
5. "Any specific copy, video URLs, or images?" → optional assets

### Phase 2: Create Queue Entry
Add to `state/builds/queue.json`:
```json
{
  "id": "proj-{timestamp}",
  "client": "{client_name}",
  "funnel_type": "{funnel_type}",
  "template_id": "{auto-selected}",
  "status": "queued",
  "spec": { ... },
  "created": "{ISO timestamp}",
  "clickup_task_id": null,
  "ghl_funnel_id": null
}
```

### Phase 3: Create ClickUp Task
Create task in FunnelFlow Queue list (901614234130):
- Name: "{client_name} - {funnel_type} Funnel"
- Description: Full spec as markdown
- Status: "Ready to Build" (if spec complete) or "Spec Needed" (if incomplete)

### Phase 4: Confirm
Post to Slack #funnel-ops:
```
📋 New Funnel Queued
Client: {client_name}
Type: {funnel_type}
Status: Ready to Build / Spec Needed
Scheduled: Next agent run ({next_run_time})
```

## Output
- Queue entry added to state/builds/queue.json
- ClickUp task created
- Slack notification sent
