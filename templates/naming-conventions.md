# Naming Conventions

Standard naming conventions for all Facebook/Meta ad campaigns, ad sets, ads, and UTM parameters.

## Campaign Naming

**Format:** `[Client]_[Objective]_[FunnelStage]_[Date]`

| Component   | Options                                              | Example          |
|-------------|------------------------------------------------------|------------------|
| Client      | Client short name or brand code                      | ACME             |
| Objective   | CONV, TRAFFIC, LEADS, AWARENESS, ENGAGEMENT, REACH   | CONV             |
| FunnelStage | TOF (Top of Funnel), MOF (Middle), BOF (Bottom)      | TOF              |
| Date        | MMDD or MMDDYY launch date                           | 0315             |

**Examples:**
- `ACME_CONV_TOF_0315` -- ACME conversions campaign, top of funnel, launched March 15
- `ACME_LEADS_MOF_0401` -- ACME lead gen campaign, mid funnel, launched April 1
- `ACME_CONV_BOF_0228` -- ACME conversions campaign, bottom of funnel, launched Feb 28

## Ad Set Naming

**Format:** `[Audience]_[Placement]_[Age]`

| Component | Options                                                    | Example      |
|-----------|------------------------------------------------------------|--------------|
| Audience  | LAL1 (1% Lookalike), LAL5, BROAD, INT-fitness, RET-30d    | LAL1         |
| Placement | ALLAUTO, FEED, STORIES, REELS, IG, FB, AN                 | ALLAUTO      |
| Age       | 18-34, 25-54, 35-65, ALLAGE                               | 25-54        |

**Audience codes:**
- `LAL1` / `LAL5` / `LAL10` -- Lookalike audiences (1%, 5%, 10%)
- `BROAD` -- Broad/open targeting
- `INT-[interest]` -- Interest-based targeting (e.g., INT-fitness, INT-cooking)
- `RET-[days]` -- Retargeting window (e.g., RET-30d, RET-7d)
- `CUS-[name]` -- Custom audience (e.g., CUS-buyers, CUS-email-list)
- `ENG-[type]` -- Engagement audience (e.g., ENG-video75, ENG-page)

**Examples:**
- `LAL1_ALLAUTO_25-54` -- 1% Lookalike, all placements, ages 25-54
- `BROAD_FEED_18-34` -- Broad targeting, feed only, ages 18-34
- `RET-30d_ALLAUTO_ALLAGE` -- 30-day retargeting, all placements, all ages
- `INT-fitness_REELS_25-44` -- Fitness interest, reels placement, ages 25-44

## Ad Naming

**Format:** `[CreativeType]_[Hook]_[Version]`

| Component    | Options                                                  | Example      |
|--------------|----------------------------------------------------------|--------------|
| CreativeType | VID (video), IMG (image), CAR (carousel), DPA, UGC       | VID          |
| Hook         | Short descriptor of the hook/angle                       | PainPoint    |
| Version      | v1, v2, v3... or A, B, C for split tests                | v1           |

**Creative type codes:**
- `VID` -- Video ad
- `IMG` -- Static image ad
- `CAR` -- Carousel ad
- `DPA` -- Dynamic product ad
- `UGC` -- User-generated content style
- `GIF` -- Animated GIF
- `COL` -- Collection ad

**Hook descriptors (match hook-analyzer categories):**
- `PainPoint` -- Pain point hook
- `Curiosity` -- Curiosity/question hook
- `SocialProof` -- Social proof/testimonial hook
- `Controversial` -- Hot take/controversial hook
- `Lifestyle` -- Lifestyle/aspiration hook
- `Transform` -- Before/after transformation hook

**Examples:**
- `VID_PainPoint_v1` -- Video ad with pain point hook, version 1
- `IMG_SocialProof_v2` -- Image ad with social proof hook, version 2
- `CAR_Curiosity_A` -- Carousel ad with curiosity hook, split test A
- `UGC_Transform_v1` -- UGC-style transformation ad, version 1

## UTM Parameters

**Standard UTM structure for all ads:**

| Parameter      | Value                              | Example                      |
|----------------|------------------------------------|------------------------------|
| utm_source     | `facebook`                         | utm_source=facebook          |
| utm_medium     | `paid` or `organic`                | utm_medium=paid              |
| utm_campaign   | Campaign name (use campaign code)  | utm_campaign=ACME_CONV_TOF   |
| utm_content    | Ad name (creative identifier)      | utm_content=VID_PainPoint_v1 |
| utm_term       | Ad set name (audience identifier)  | utm_term=LAL1_ALLAUTO_25-54  |

**Full UTM example:**
```
?utm_source=facebook&utm_medium=paid&utm_campaign=ACME_CONV_TOF_0315&utm_content=VID_PainPoint_v1&utm_term=LAL1_ALLAUTO_25-54
```

**Organic UTM example:**
```
?utm_source=facebook&utm_medium=organic&utm_campaign=weekly_content&utm_content=lifestyle_post_0315
```

## File Naming

For creative assets and data files:

- Reports: `YYYY-MM-DD.json` (e.g., `2026-03-28.json`)
- Snapshots: `snapshot-YYYY-MM-DDTHH-MM-SS.json`
- Creative briefs: `weekly-YYYY-MM-DD.json` or `refresh-YYYY-MM-DDTHH-MM-SS.json`
- Archives: `[original-name]-archive-YYYY-MM-DDTHH-MM-SS.json`
