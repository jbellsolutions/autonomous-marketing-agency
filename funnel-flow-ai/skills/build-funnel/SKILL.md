# /build-funnel — Build a Funnel in GHL

Build a complete funnel inside Go High Level from a project spec.

## Iron Law
**Every funnel is built in DRAFT mode. Human publishes. No exceptions.**

## Trigger
- User says: `/build-funnel` or "build a funnel" or "create a funnel"
- ClickUp task with status "Ready to Build" in FunnelFlow Queue

## Inputs
- `client_name` (required): Who the funnel is for
- `funnel_type` (required): lead-gen-optin | vsl-application | webinar-registration | full-sales | challenge-funnel
- `offer` (required): What's being sold
- `icp` (optional): Who it targets — generated from offer if missing
- `copy` (optional): Headlines, subheadlines, CTAs — generated if missing
- `template_id` (optional): Which GHL template to clone — auto-selected if missing

## Phases

### Phase 1: Validate
1. Read `state/templates/registry.json` — find matching template
2. Read `config/thresholds.json` — check rate limits
3. Verify GHL authentication (navigate to app.gohighlevel.com)
4. If any gate fails → STOP and report

### Phase 2: Generate Copy (if needed)
If copy not provided in spec, generate:
- Headline (max 12 words, benefit-driven)
- Subheadline (max 25 words, elaborates on headline)
- 3-5 bullet points (feature → benefit format)
- CTA button text (action verb + outcome)
- Thank you page message

### Phase 3: Build in GHL
1. Navigate to Sites > Funnels
2. Find template → 3-dot menu → Clone
3. Rename: "{client_name} - {funnel_type} - {date}"
4. For each page: Edit → update all elements per spec → Save
5. Set up workflow, pipeline, email templates
6. Screenshot every page (desktop + mobile)

### Phase 4: QA
1. Visual check each page
2. Test form submission
3. Verify workflow connected
4. Mobile responsiveness check

### Phase 5: Deliver
1. Post to Slack #funnel-ops with screenshots and URLs
2. Update ClickUp task
3. Create Gmail draft to client
4. Update state files

## Stop Conditions
- GHL auth expired → stop, alert
- Template not found → stop, alert
- Build exceeds 45 minutes → save progress, continue next run
- Rate limit reached → queue for next run
