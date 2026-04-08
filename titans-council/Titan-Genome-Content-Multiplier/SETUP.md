# The Content Multiplier -- Setup Guide

## For Service Providers Delivering to Clients

This guide walks you through activating The Content Multiplier for a new client engagement. Under the hood, every piece of content is shaped by **The Titan Genome** -- the decoded copywriting DNA of nine direct response legends. Think of the setup process as preparing the mastermind table: you are seating nine of history's greatest copywriters alongside your client's brand voice so they can shape every asset that comes out of the pipeline.

---

## Step 1: Create the Client Workspace

```bash
# Clone or copy this repo for each client
cp -r Content-Multiplier-Product/ ~/Desktop/ClientName-Content/

# Create the working directories
cd ~/Desktop/ClientName-Content/
mkdir -p source outputs
```

## Step 2: Gather Client Inputs

You need two things from the client:

1. **A video recording** (any length, 10 min to 3 hours)
2. **Brand information** to fill out `CLIENT_CONFIG.md`

### Getting the Transcript

| Method | Best For | Quality |
|--------|----------|---------|
| Read.AI | Zoom recordings | Best (speaker labels + timestamps) |
| Otter.ai | Any audio/video | Great |
| MacWhisper | Local processing (Mac) | Great (free, private) |
| YouTube auto-captions | Quick and free | Good |
| Zoom native transcription | Zoom recordings | Good |

Save the transcript as `.vtt` or `.txt` in the `source/` folder.

### Filling Out CLIENT_CONFIG.md

Schedule a 15-30 minute brand voice call or send the client the `CLIENT_CONFIG.md` file to fill out. Key information needed:

- Brand name and voice description
- Two target audiences with pain points and platforms
- Main offer with pricing and unique mechanism
- CTA URLs (landing pages, calendar links, lead magnets)
- Preferred and avoided terminology
- **Titan Genome style preference** -- which of the nine copywriting legends should lead the table for this client (optional; the system defaults to a balanced blend)

## Step 3: Install Claude Code

```bash
# Install (requires Node.js v18+)
npm install -g @anthropic-ai/claude-code

# Verify
claude --version

# Authenticate (needs Claude Pro or Team subscription with Opus access)
claude
```

## Step 4: Activate the Mastermind Table (Run the Pipeline)

With the client workspace prepared and `CLIENT_CONFIG.md` filled out, you are ready to activate the mastermind table -- bringing The Titan Genome to life against the client's source material.

### Phase 1: Content Map (MUST BE FIRST)

```bash
cd ~/Desktop/ClientName-Content/
claude
```

Paste the Content Map prompt from `docs/TEMPLATE_GUIDE.md` (Template 1 of 32).

**Review the Content Map before proceeding.** Check:
- All major topics captured with timestamps
- Topic-to-project matrix makes sense
- Key quotes are actually from the video

### Phase 2: Run Projects 2-13

Use the prompts from `docs/TEMPLATE_GUIDE.md` for each project. Projects can run in parallel after the Content Map is complete. Each project activates the Titan Genome agents -- the nine legends analyze the source material through their respective lenses and shape the output accordingly.

**Recommended batch order:**

```
Batch 1 (Foundation):     Projects 2, 3, 12
Batch 2 (Sales/Marketing): Projects 4, 5, 6, 10, 11
Batch 3 (Social/Video):    Projects 7, 8
Batch 4 (Community/Proof): Projects 9, 13
```

### Phase 3: QA Pipeline

After all Creator agents finish, run:
1. Critic agents on all 32 files (can run in parallel, max 8)
2. Approval agents on all revised files

### Phase 4: Deliver

Organize the `outputs/` folder and deliver to client.

**File naming convention:**
```
CLIENTNAME_PROJECT_1_Content_Map.md
CLIENTNAME_PROJECT_2_Course.md
...
```

## Step 5: Repeat for Next Client

Each client gets their own copy of the workspace with their own `CLIENT_CONFIG.md`, `source/`, and `outputs/` directories. Every new workspace is a fresh seat at the mastermind table, configured to that client's brand and audience.

---

## Time Estimates

| Phase | Sequential | Parallel (4-8 agents) |
|-------|------------|----------------------|
| Content Map | 15-30 min | 15-30 min |
| Creator agents (all 32 files) | 4-8 hours | 2-3 hours |
| Critic agents | 2-4 hours | 1-2 hours |
| Approval agents | 1-2 hours | 30 min |
| Human QA review | 1-2 hours | 1-2 hours |
| **Total** | **8-16 hours** | **4-8 hours** |

## Troubleshooting

See `docs/PROCESS_DOCUMENTATION.md` Section 7 for common issues and fixes.
