# How to Run a Project Through the Titans Pipeline

## Quick Start

### Step 1: Create the Project Folder

```bash
# Replace {project-name} with a kebab-case name (e.g., "ai-agency-course", "fitness-coaching-offer")
mkdir -p "projects/{project-name}/source" "projects/{project-name}/individual-takes" "projects/{project-name}/council"
```

### Step 2: Create the Input

Copy `NEW_PROJECT_TEMPLATE.md` to `projects/{project-name}/INPUT.md` and fill it out.

Optionally, copy and fill in the CLIENT_CONFIG:
```bash
cp Titan-Genome-Content-Multiplier/CLIENT_CONFIG.md "projects/{project-name}/CLIENT_CONFIG.md"
```

### Step 3: Run Phase 1 — Individual Takes

Tell Claude:

```
Run Phase 1 of the Titans pipeline for the project "{project-name}".

For each of the 18 copywriter agents in agents/:
1. Read the agent's definition file (agents/{agent_key}.md)
2. Read the project input (projects/{project-name}/INPUT.md)
3. Read the Titan Genome DNA (Titan-Genome-Content-Multiplier/SWIPE_FILE_CONTEXT.md)
4. If CLIENT_CONFIG.md exists in the project folder, read it too
5. As that copywriter, produce a complete independent take including:
   - Positioning Analysis
   - Unique Mechanism identification
   - Branding Direction
   - Headline Battery (5-10 options)
   - Hook Arsenal
   - Key Messaging Framework
   - Sample Copy (one complete piece)
   - Strategic Notes
6. Save to projects/{project-name}/individual-takes/{agent_key}/take.md

Create the folders and run all 18 agents. Use parallel agents where possible.
```

### Step 4: Run Phase 2 — Council Deliberation

Tell Claude:

```
Run Phase 2 of the Titans pipeline for the project "{project-name}".

Read all 18 individual takes from projects/{project-name}/individual-takes/*/take.md

ROUND 1 (Version 1):
- Synthesize themes across all 18 copywriters
- Identify standout ideas and cite which copywriter they came from
- Note where copywriters disagreed and the arguments on each side
- Produce Version 1 that combines the best elements
- Save to projects/{project-name}/council/round-1-v1.md

ROUND 2 (Version 2):
- Have each copywriter "review" V1 through their lens
- Apply the strongest critiques and improvements
- Tighten, sharpen, and polish
- Save to projects/{project-name}/council/round-2-v2.md

ROUND 3 (Final):
- Final review from each perspective
- Production check (no placeholders, specific CTAs, solid proof)
- Council consensus on the final version
- Save to projects/{project-name}/council/round-3-final.md
```

---

## What You Get

| # | Output | Location |
|---|--------|----------|
| 1 | 18 independent copywriter takes | `individual-takes/{agent_key}/take.md` |
| 2 | Council Round 1 — Version 1 | `council/round-1-v1.md` |
| 3 | Council Round 2 — Version 2 | `council/round-2-v2.md` |
| 4 | Council Round 3 — Final | `council/round-3-final.md` |

---

## Tips

- **For faster runs:** You can tell Claude to run 6 agents at a time in parallel batches
- **For focused projects:** If you only need certain copywriters, specify which ones in your prompt. But the full pipeline uses all 18.
- **Each project is isolated:** Agents don't carry memory between projects. This is by design.
- **The Titan Genome matters:** Always make sure agents reference `SWIPE_FILE_CONTEXT.md` — it's the decoded DNA that prevents generic AI output.
