# TODOs — Titans of Direct Response Mastermind Council

> Structured by priority. P0 = blocks production use. P4 = nice to have someday.

---

## P0 — Critical (Blocks Production or Pipeline Integrity)

- [ ] **Add SKILL.md files for pipeline automation.** The pipeline currently runs via conversational instructions in CLAUDE.md. Creating SKILL.md files would enable slash-command invocation (`/titans`), structured input validation, and integration with Claude Code's skill discovery system.

- [ ] **Add LICENSE file.** The repository has no license. This means all rights are reserved by default, which may not be the intent. Choose and add an appropriate license (proprietary, MIT, or custom).

---

## P1 — High Priority (Improves Quality or Usability)

- [ ] **Expand Titan Genome examples in SWIPE_FILE_CONTEXT.md.** The current 19,308 entries cover the core patterns, but several agents (Catona, Renker, Grossman) have thinner source material than Schwartz, Abraham, or Kennedy. Adding more indexed entries for underrepresented agents would strengthen their independent takes.

- [ ] **Document leadership agent invocation triggers.** The README mentions "say 'add Simon Sinek' or 'run the leadership agents'" but CLAUDE.md does not define explicit trigger phrases for leadership agents the way it does for the main pipeline. Add a trigger phrase section for leadership agents.

- [ ] **Add agent quality benchmarks.** Define what a "good" individual take looks like per agent. Currently the Quality Gate scores the council output, but there is no benchmark for individual take quality before synthesis.

- [ ] **Standardize content multiplier QG scoring.** The main council output has a defined 20-dimension scoring rubric (10 Creator + 10 Critic). The Content Multiplier projects run through Creator-Critic-Approver but the scoring dimensions are not explicitly documented per content type.

---

## P2 — Medium Priority (Operational Improvements)

- [ ] **Add data retention policy.** Define how long project files, individual takes, and council rounds are retained. Currently all output persists indefinitely in the repo. Consider whether intermediate files (individual takes, V1, V2) should be archived or retained.

- [ ] **Add a project summary index.** Create a `projects/INDEX.md` that auto-updates with every new project: client name, project name, date, QG scores, repo link. Currently you have to browse the `projects/` folder manually.

- [ ] **Document the Council Router selection logic.** COUNCIL.md describes workflows (Full Sales Page, Cold Email Sequence, Launch Sequence, etc.) but the router's agent-selection criteria for the main pipeline are implicit. Make the routing logic explicit.

- [ ] **Add a brief validation checklist.** CLAUDE.md says to ask follow-up questions until the brief is complete, but there is no formal checklist of required brief fields. Create a validation schema that the pipeline checks before Phase 1 starts.

- [ ] **Create rollback procedure for QG send-backs.** When the Approver sends back to Round 3, the re-run procedure is described but there is no documented limit on re-runs or escalation path if the council cannot satisfy the QG after multiple attempts.

---

## P3 — Lower Priority (Templates, Tooling, Developer Experience)

- [ ] **Create template for new titan agent creation.** Adding a new agent requires following the pattern in existing `.md` files, but there is no blank template or scaffolding guide. Create `agents/AGENT_TEMPLATE.md` with the required sections: Identity, System Prompt, Sub-Agents, Style Traits, Best For, Activation Triggers, Approach.

- [ ] **Add agent test harness.** Create a standard test brief that can be run through a single agent to verify the agent definition produces the expected output format and voice. Useful when adding or modifying agents.

- [ ] **Create content multiplier project template generator.** The 13 project templates follow a consistent pattern. Create a meta-template for generating new content project types beyond the current 13.

- [ ] **Add council round diffing.** Currently V1, V2, and Final are standalone documents. Add a mechanism (or documentation) for diffing between rounds to see exactly what changed and why.

- [ ] **Document the Titan Genome indexing methodology.** The README says the Genome has 19,308 entries but does not describe how entries are indexed, categorized, or structured. Add documentation for anyone extending the Genome.

---

## P4 — Future / Exploratory

- [ ] **Multi-project workflow support.** Currently each project is isolated. Explore supporting linked projects where the output of one project informs the next (e.g., positioning project feeds into a launch campaign project).

- [ ] **Agent performance analytics.** Track which agents' ideas survive to the final deliverable most often. Over time, this data could inform agent weighting or council composition.

- [ ] **Client feedback loop.** After a project ships and the client deploys the content, capture performance data (conversion rates, engagement metrics) and feed it back into the Titan Genome as real-world validation of patterns.

- [ ] **Vertical-specific agent packs.** Create optional agent packs for specific industries (SaaS, coaching, e-commerce, health) with additional sub-agents tuned to vertical-specific patterns.

- [ ] **Interactive council mode.** Allow the user to participate in council rounds as a "19th seat" — adding their own perspective, vetoing specific directions, or steering the deliberation in real time.

- [ ] **Titan Genome versioning.** As the Genome grows, version it so that projects can be reproduced against a specific Genome snapshot. Currently the Genome is a single file that changes over time.
