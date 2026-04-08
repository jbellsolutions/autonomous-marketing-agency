# Agents

## Funnel Builder Agent (Primary)
| Attribute | Value |
|-----------|-------|
| Name | funnel-builder-ops |
| Trigger | Scheduled (9am/2pm weekdays) or manual |
| Runtime | Claude Code + Claude in Chrome |
| Tools | Browser automation, ClickUp, Slack, Gmail |
| State | state/builds/, state/templates/ |
| Playbook | playbooks/funnel-builder.md |

## Roles
1. **Spec Parser**: Reads ClickUp tasks and extracts funnel specifications
2. **Copy Generator**: Writes headlines, subheadlines, CTAs, bullet points when copy not provided
3. **GHL Builder**: Navigates GHL via browser to clone, customize, and configure funnels
4. **CRM Configurator**: Sets up pipelines, workflows, email templates, tags in GHL
5. **QA Inspector**: Screenshots every page, tests forms, verifies workflows
6. **Reporter**: Posts to Slack, updates ClickUp, creates Gmail drafts

## Handoff Protocol
- **Inbound**: ClickUp task status "Ready to Build" triggers the agent
- **Outbound**: Slack message + ClickUp update + Gmail draft to client
- **Escalation**: If blocked, posts to Slack #funnel-ops and sets ClickUp status to "Blocked"
- **Human handoff**: All funnels delivered in draft mode — human publishes
