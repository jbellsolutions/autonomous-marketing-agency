---
name: "agent-create"
description: "Create a new titan agent for the Mastermind Council. Generates the agent .md file, the corresponding JSON for the swipe-file council, and updates router.json with the new agent's routing rules. Every new agent must match the existing format exactly -- identity, sub-agents, style traits, best-for, triggers, approach. Use when the user says 'add a new agent', 'create an agent', 'add [person] to the council', 'I want to add [name]', or 'new copywriter agent'."
license: MIT
metadata:
  version: 1.0.0
  author: Titans Pipeline
  category: agent-management
  domain: agent-creation
  updated: 2026-03-27
  frameworks: titan-genome, mastermind-council
---

# Agent Create

Add a new legend to the Mastermind Table. Every agent gets the same structural architecture as the existing 18 -- identity, sub-agents, style traits, activation triggers, approach methodology. The format is not optional.

## Keywords

create agent, new agent, add agent, add copywriter, new copywriter, add to council, new titan, agent definition, agent file, router update, new legend

## Voice Directive

Write agent definitions in the same structural voice as the existing council members. The system prompt must capture the person's actual methodology -- their frameworks, their language patterns, their specific genius. Not a biography. Not a summary. The decoded persuasion architecture of how they think and build arguments. Banned vocabulary: "delve", "utilize", "leverage" (as verb), "in today's landscape", "game-changer", "it's important to note", "at the end of the day", "synergy", "holistic approach", "passionate about", "thought leader". The agent must sound like the person, not like an AI describing the person.

---

## Iron Law

**EVERY NEW AGENT MUST MATCH THE EXISTING AGENT FORMAT EXACTLY.**

The format is not a suggestion. It is the structural contract that the council pipeline depends on. An agent file missing any required section will break the pipeline.

---

## Required Agent Format

Every agent `.md` file must contain these sections in this order. Reference `agents/eugene_schwartz.md` or `agents/alex_hormozi.md` as the canonical examples.

```markdown
# {Full Name} -- {Title/Role in 3-5 Words}

**Era:** {Active years}
**Role:** {One sentence -- what they bring to the council}

## System Prompt

{2-4 sentences written in second person ("You are..."). Must capture:
- Who they are and their credibility
- Their core belief or operating principle
- Their methodology in concrete terms
- Their language style and personality}

## Sub-Agents

| Sub-Agent | Specialty |
|-----------|-----------|
| `{lastname}.{domain1}` | {What this sub-agent does} |
| `{lastname}.{domain2}` | {What this sub-agent does} |
| `{lastname}.{domain3}` | {What this sub-agent does} |

## Style Traits

- {Trait 1} -- {brief description}
- {Trait 2} -- {brief description}
- {Trait 3} -- {brief description}
- {Trait 4} -- {brief description}

## Best For

- {Use case 1}
- {Use case 2}
- {Use case 3}
- {Use case 4}
- {Use case 5}

## Activation Triggers

{comma-separated keywords that should route to this agent}

## How You Approach a New Project

When given a brief, you FIRST {action}:
1. {Step 1 -- what this agent diagnoses or calculates first}
2. {Step 2}
3. {Step 3}
4. {Step 4}
{Then what they do with that diagnosis}
```

---

## Phase 1: Gather Agent Information

Ask the user for:

1. **Who is this person?** -- Full name, era, primary domain
2. **What is their expertise?** -- The specific area of genius (not a generic "marketing")
3. **What are their key frameworks?** -- Named methodologies, systems, principles
4. **What makes their voice distinct?** -- How do they write/speak differently from others on the council
5. **What are they best at?** -- Specific content types or strategic tasks
6. **How many sub-agents?** -- 2-5 sub-agents covering distinct facets of their work

If the user gives a name only ("add Russell Brunson"), proceed to Phase 2 to research before asking follow-ups.

---

## Phase 2: Research the Person's Methodology

Use WebSearch if available to research:

1. Their published books, frameworks, and signature methodologies
2. Their writing style and language patterns -- specific phrases they use repeatedly
3. Their core beliefs about marketing, business, or persuasion
4. Their most famous campaigns, products, or results
5. What makes them different from existing council members

**Critical check:** Does this person overlap significantly with an existing agent? If so, the sub-agents must differentiate clearly. Jay Abraham owns "Strategy of Preeminence" -- a new agent cannot claim that territory. Todd Brown owns "Unique Mechanism" -- a new agent focusing on mechanisms must differentiate.

Map the research to the agent format:
- Core belief becomes the System Prompt anchor
- Named frameworks become Sub-Agent specialties
- Language patterns become Style Traits
- Famous use cases become Best For
- Distinctive keywords become Activation Triggers

---

## Phase 3: Generate the Agent .md File

1. Write the agent file following the exact format from the Iron Law section
2. File name: `agents/{first_last}.md` in snake_case (e.g., `agents/russell_brunson.md`)
3. The System Prompt must be written in second person and capture the person's actual voice -- not a description of it
4. Sub-agents must be 2-5, each covering a distinct facet (not overlapping)
5. Sub-agent keys follow the pattern `{lastname}.{domain}` in lowercase
6. The "How You Approach a New Project" section must describe their specific diagnostic process -- what they calculate or assess FIRST before writing

**Validation against existing agents:**

Read at least 3 existing agent files to confirm format compliance:
- `agents/eugene_schwartz.md` (5 sub-agents, research-heavy style)
- `agents/alex_hormozi.md` (3 sub-agents, framework-heavy style)
- `agents/jon_buchan.md` (3 sub-agents, personality-driven style)

The new agent must match the structural pattern of these files exactly.

---

## Phase 4: Generate the Agent JSON

Create the corresponding JSON file at `Titan-Genome-Content-Multiplier/swipe-file/council/agents/{first_last}.json`.

The JSON must follow the existing format. Reference `Titan-Genome-Content-Multiplier/swipe-file/council/agents/alex_hormozi.json` as canonical.

Required fields:
- `agent_key` -- snake_case identifier
- `display_name` -- Full name
- `title` -- Their role title
- `era` -- Active years
- `system_prompt` -- Same as the .md file
- `sub_agents` -- Array matching the .md Sub-Agents table
- `style_traits` -- Array matching the .md Style Traits
- `best_for` -- Array matching the .md Best For
- `activation_triggers` -- Array from the .md Activation Triggers

---

## Phase 5: Update router.json

Open `Titan-Genome-Content-Multiplier/swipe-file/council/router.json` and:

1. Add the new agent to the appropriate `content_type_routing` categories
2. Add any new `combination_patterns` if the agent creates a new workflow
3. Increment `total_agents` count
4. Update `total_sub_agents` count

**Do not break existing routing.** The new agent is additive. Existing agents keep their routing assignments. The new agent gets added to categories where they are relevant.

---

## Phase 6: Verify Format Compliance

Run this checklist against the new agent:

- [ ] Agent .md file exists at `agents/{first_last}.md`
- [ ] File starts with `# {Full Name} -- {Title}` (H1 with em dash)
- [ ] Has `**Era:**` and `**Role:**` on separate lines
- [ ] Has `## System Prompt` section written in second person
- [ ] Has `## Sub-Agents` table with 2-5 entries
- [ ] Sub-agent keys follow `{lastname}.{domain}` pattern
- [ ] Has `## Style Traits` with 3-5 bullet points using em dash descriptions
- [ ] Has `## Best For` with 3-6 bullet points
- [ ] Has `## Activation Triggers` with comma-separated keywords
- [ ] Has `## How You Approach a New Project` with numbered steps
- [ ] Agent JSON exists at `swipe-file/council/agents/{first_last}.json`
- [ ] router.json updated with new agent in relevant categories
- [ ] router.json `total_agents` and `total_sub_agents` counts updated
- [ ] New agent does not duplicate another agent's primary territory
- [ ] System Prompt sounds like the person, not like a description of the person

---

## Stop Conditions

- **Person is already on the council** -- Stop. Tell the user which agent file covers this person.
- **Person has no identifiable methodology** -- Stop. An agent needs frameworks and a distinct approach. A famous name without a teachable system does not make a useful agent.
- **Format validation fails** -- Do not save. Fix the format issue and re-validate.
- **Sub-agents overlap with existing agent's sub-agents** -- Rewrite the sub-agents to differentiate. Two agents can cover similar territory if their sub-agents approach it differently.

## Completion

When the agent is created, tell the user:
- Agent name and title
- Number of sub-agents created
- Which routing categories the agent was added to
- How this agent differs from the most similar existing agent
- The file paths for all created/modified files
- Remind them: the agent will participate in the next project automatically (if placed in `agents/`) or invoke-only (if placed in `agents/leadership/`)
