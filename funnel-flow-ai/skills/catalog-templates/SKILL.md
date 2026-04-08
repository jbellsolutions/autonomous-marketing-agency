# /catalog-templates — Scan GHL for Funnel Templates

Scan Go High Level's funnel library and update the template registry.

## Trigger
- User says: `/catalog-templates` or "scan for templates" or "update template registry"
- Scheduled: Weekly Monday 6am (auto-refresh)

## Phases

### Phase 1: Authenticate
Navigate to app.gohighlevel.com — verify session is active.

### Phase 2: Scan Funnels
1. Navigate to Sites > Funnels
2. For each page of results (paginate through all):
   - Record: funnel name, last updated, step count, folder (if any)
   - Note which are folders vs individual funnels
3. Click "Next" until no more pages

### Phase 3: Deep Scan (for designated templates only)
For funnels marked as templates in the registry:
1. Click into funnel (3-dot menu > Edit)
2. Record: funnel ID (from URL), step names, step count
3. Screenshot each step's overview
4. Record the preview URL for each step
5. Go back to funnel list

### Phase 4: Update Registry
Write updated `state/templates/registry.json`:
- Update `discovered_funnels` with full scan results
- Update existing template entries with verified GHL IDs
- Flag any templates whose GHL funnel was deleted
- Add new high-step-count funnels as potential templates

### Phase 5: Report
Post to Slack:
```
📚 Template Catalog Updated
━━━━━━━━━━━━━━━━━━━━━━
Total Funnels: {count}
Folders: {count}
Templates Registered: {count}
New Funnels Since Last Scan: {count}
Templates Needing GHL IDs: {count}
```

## Output
- Updated `state/templates/registry.json`
- Slack notification with scan summary
