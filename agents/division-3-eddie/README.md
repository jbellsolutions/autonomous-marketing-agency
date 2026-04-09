# Division 3: Eddie Vibe Marketer (Creative Engine)

## Overview

Division 3 is the creative generation engine of the Facebook Marketing Agency. It is powered by **Eddie Vibe Marketer**, a self-improving ad creative system that generates high-converting ad copy, video scripts, hooks, and creative concepts.

## Architecture

Eddie Vibe Marketer lives in a separate repository/directory and is **symlinked** into this project:

```
agents/division-3-eddie/eddie-vibe-marketer -> ../../eddie-vibe-marketer/
```

This symlink points to the standalone Eddie Vibe Marketer project at the same level as this project directory.

## How It Integrates

### Shared Data Layer

Eddie reads from and writes to the shared data layer at `data/shared/`:

**Reads from:**
- `data/shared/winning-patterns/paid-ads/latest.json` -- winning competitor ads from Ad Library
- `data/shared/winning-patterns/organic/` -- top-performing organic posts (FB, IG, TikTok)
- `data/shared/winning-patterns/hook-analysis.json` -- hook performance analysis
- `data/shared/performance-data/fatigue-report.json` -- which creatives need replacement
- `brand-voice/` -- brand tone, voice guidelines, and style rules

**Writes to:**
- `data/shared/creative-output/` -- generated creatives (copy, scripts, concepts)
- `data/shared/eddie-briefs/` -- creative briefs for each generation cycle

### Trigger Conditions

Eddie's creative cycle is triggered in two ways:

1. **Scheduled (Weekly):** The `eddie-cycle` scheduled task runs every Sunday at 3am for a full creative refresh.
2. **On-Demand (Fatigue):** The `creative-refresh` scheduled task triggers Eddie when creative fatigue is detected by `scripts/analysis/creative-fatigue.js`.

### Output Format

Eddie generates structured creative packages that include:
- Ad copy variations (short, medium, long)
- Hook variations by category (pain point, curiosity, social proof, etc.)
- Video script outlines
- Image/carousel concept descriptions
- CTA variations
- A manifest file cataloging all generated assets

## Setup

Ensure the symlink is properly configured:

```bash
cd facebook-marketing-agency
ln -s ../eddie-vibe-marketer eddie-vibe-marketer
```

Verify with `node scripts/setup.js` which checks the symlink is valid.
