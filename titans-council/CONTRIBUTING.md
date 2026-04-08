# Contributing — Titans of Direct Response Mastermind Council

> How to add agents, templates, rules, and content projects to the pipeline.

---

## Adding a New Copywriter Agent

1. Create a new file in `agents/` named `{agent_key}.md` (snake_case, e.g., `claude_hopkins.md`).

2. Follow the structure used by all existing agents. Required sections:

   - **Title and Role** — `# {Name} -- The {Role Title}` with era and one-line description.
   - **System Prompt** — A paragraph encoding the legend's voice, philosophy, methodology, beliefs, and working style. This is the agent's identity. It should read as if the legend is introducing themselves.
   - **Sub-Agents** — A table of 2-5 sub-agents, each with a namespace (`{key}.{specialty}`) and a description of what it handles. Sub-agents represent distinct facets of the legend's work.
   - **Style Traits** — A bullet list of 4-6 traits that define how this agent writes and thinks.
   - **Best For** — A bullet list of content types or strategic tasks this agent excels at.
   - **Activation Triggers** — A comma-separated list of keywords the Council Router uses to select this agent.
   - **How You Approach a New Project** — A numbered list describing the agent's diagnostic process when given a brief.

3. Reference `agents/eugene_schwartz.md` as the canonical example.

4. The pipeline automatically picks up all `.md` files in `agents/`. No registration step required.

5. If this is a leadership agent (invoke-only, not part of the default 18-agent council), place it in `agents/leadership/` instead.

---

## Adding a Content Multiplier Template

1. Create a new template in `Titan-Genome-Content-Multiplier/templates/` named `PROJECT_{N}_{Name}_Template.md` where `{N}` is the next available number (currently 14+).

2. The template must define:
   - **Project name and description** — What this content project produces.
   - **Output files** — List every file this project will generate with filenames.
   - **Required inputs** — What the template needs from the approved council output (positioning, mechanism, voice guide, etc.).
   - **Structure per file** — Section-by-section outline for each output file.
   - **Quality checklist** — Criteria the Creator-Critic-Approver pipeline will evaluate against.

3. Update the project count in `CLAUDE.md` (the Content Multiplier menu) and `README.md` (the project table).

4. If your new project depends on the Content Map (Project 1), state that dependency explicitly.

---

## Adding or Modifying Rules

1. All operational rules live in `rules/RULES.md`.

2. Rules are numbered sequentially. Use the next available number.

3. Every rule exists because something broke in production. When adding a rule, document what broke in a comment or note so future readers understand the context.

4. Rules are grouped by category:
   - Execution and Autonomy
   - Verification and Quality
   - Security and Safety
   - Content and Publishing
   - Architecture and Engineering
   - Cost Optimization
   - Communication and Honesty
   - Memory and Documentation
   - Business and Contracts
   - Platform and API

5. Place the new rule in the appropriate category. If it does not fit an existing category, create a new one.

6. After modifying RULES.md, ensure Rule 48 (Global Rules Sync) is followed: sync changes to all instances.

---

## Adding a New Client Project

You do not need to manually create project folders. The pipeline handles project scaffolding automatically when you say "new project" in Claude Code. However, if you need to create one manually:

1. Create the folder structure:
   ```
   projects/{client-name}/{project-name}/
   ├── source/
   ├── individual-takes/
   ├── council/
   │   └── quality-gate/
   └── content-multiplier/   (optional)
   ```

2. Copy `NEW_PROJECT_TEMPLATE.md` to `projects/{client-name}/{project-name}/INPUT.md` and fill it out.

3. Use kebab-case for all folder names (e.g., `callum-crees`, `on-auto-aios`).

4. Each client can have multiple projects. Projects are isolated — agents carry no memory between them.

---

## Modifying the Titan Genome

The Titan Genome lives in `Titan-Genome-Content-Multiplier/SWIPE_FILE_CONTEXT.md`. This is the shared knowledge base that all agents draw from.

When adding new entries:

1. Each entry should be a decoded pattern, not raw copy. The Genome captures *how* a legend built an argument, not the argument itself.

2. Attribute every entry to a specific legend and source (e.g., "Schwartz, Breakthrough Advertising, Chapter 4").

3. Categorize entries by pattern type: headline patterns, mechanism structures, proof frameworks, offer architectures, closing sequences, etc.

4. Do not add entries that duplicate existing patterns. Search the Genome first.

---

## General Guidelines

- **Read before writing.** Before changing anything, read the existing file and the files that reference it. CLAUDE.md, README.md, and ARCHITECTURE.md all contain counts and descriptions that may need updating.
- **Test with a brief.** After adding an agent or template, run a test project through the pipeline to verify the new component integrates correctly.
- **No generic output.** Every agent must have a distinct voice. Every template must produce output that could not have come from a different template. If something reads as interchangeable, it needs more specificity.
- **Follow the 52 rules.** All contributions are subject to the operational rules in `rules/RULES.md`. In particular: Rule 43 (Anti-Hallucination Protocol), Rule 47 (Design Before Code), and Rule 51 (Anti-Slop Writing Protocol).
