# /qa-check — QA a Built Funnel

Run comprehensive quality assurance on a recently built GHL funnel.

## Trigger
- User says: `/qa-check` or "QA the funnel" or "check the funnel"
- Automatically called after `/build-funnel` completes

## Inputs
- `funnel_name` (required): Name of the funnel in GHL to QA
- `expected_pages` (optional): List of page names to verify

## Phases

### Phase 1: Navigate to Funnel
1. Open GHL > Sites > Funnels
2. Search for funnel by name
3. Click into funnel editor (3-dot menu > Edit)
4. Verify all expected pages/steps exist

### Phase 2: Visual QA (per page)
For each page:
1. Click into page step
2. Click "Preview" to open preview URL
3. Screenshot at desktop (1280px)
4. Resize to mobile (375px)
5. Screenshot at mobile
6. Check: headline visible, CTA above fold, form accessible, no overlap

### Phase 3: Functional QA
1. Navigate opt-in/first page preview URL
2. Fill form with test data (Test User / test@funnelflow.ai / 555-000-0000)
3. Submit form
4. Verify redirect to next page
5. Verify contact created in GHL (navigate to Contacts, search test@funnelflow.ai)
6. Delete test contact after verification

### Phase 4: Integration QA
1. Navigate to Automation > Workflows
2. Find workflow for this funnel
3. Verify trigger is correct form
4. Verify all actions configured
5. Verify workflow is INACTIVE (human must activate)

### Phase 5: Report
Generate QA report:
```
QA Report: {funnel_name}
━━━━━━━━━━━━━━━━━━━━━━
Pages Checked: {count}
Desktop Screenshots: {count}
Mobile Screenshots: {count}
Form Test: PASS / FAIL
Workflow Connected: YES / NO
Overall: PASS / FAIL

Issues Found:
• {issue_1}
• {issue_2}
```

Post to Slack #funnel-ops with report and screenshots.

## QA Checklist
- [ ] All pages load without error
- [ ] Headlines match spec
- [ ] CTAs visible and clickable
- [ ] Forms accept input and submit
- [ ] Redirect between pages works
- [ ] Mobile layout is readable
- [ ] Workflow trigger is connected
- [ ] Workflow is INACTIVE (safety check)
- [ ] No placeholder text remaining
- [ ] No broken images or videos
