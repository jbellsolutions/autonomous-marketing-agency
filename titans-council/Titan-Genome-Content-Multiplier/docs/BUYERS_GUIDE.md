# The Content Multiplier -- Buyer's Guide

**Version 2.0 | Powered by The Titan Genome**

> **Before starting, fill out CLIENT_CONFIG.md with your brand, audience, and offer details.**

---

## 1. Welcome to the Mastermind Table

You just got access to something that has never existed before.

The Content Multiplier is the system that turns one video into 32+ production-ready content pieces. But what makes it different from every other AI content tool on the market is what powers it: **The Titan Genome** -- the decoded persuasion DNA of 9 direct response legends, mapped like the Human Genome Project mapped human DNA, and made operational as AI agents that work alongside you.

In *Think and Grow Rich*, Napoleon Hill described a practice he called the Invisible Counselors -- a Mastermind Table where he convened the greatest minds in history to advise him on every decision. Hill said this single practice produced more breakthroughs than anything else he ever did.

**You are now sitting at that table.**

Not as metaphor. Not as visualization. As technology. Nine of the greatest direct response copywriters and persuasion architects -- Todd Brown, Jay Abraham, Alex Hormozi, Bill Mueller, Jon Buchan, Brian Kurtz, Tom Bilyeu, Lead Gen Jay, and Liam Ottley -- decoded, mapped, and made operational inside your content system.

Here is what you now own:

- **The Complete Template Library** -- 32 fill-in-the-blank templates across 13 project categories (courses, emails, sales pages, social calendars, lead magnets, video plans, community content, case studies, and more)
- **The 3-Agent Mastermind Pipeline** -- Creator, Critic, and Approval agents that channel the Titan Genome through every piece of content you produce, ensuring nothing leaves the table without the full weight of nine legends behind it
- **The Titan Genome Integration** -- Instructions for loading the decoded copywriting DNA from 5,716 real emails and works by Todd Brown, Jay Abraham, Alex Hormozi, Bill Mueller, Jon Buchan, Brian Kurtz, Tom Bilyeu, Lead Gen Jay, and Liam Ottley into your system
- **The Content Map Methodology** -- The strategic architecture that maps every topic in your video to specific downstream content pieces
- **The Exact Prompts** -- Every prompt used to produce the original 32-file library from a single 2-hour training

Every piece of content you create from this point forward carries the decoded architecture of a century of direct response mastery. Not generic AI. Not "inspired by" the greats. The actual structural DNA of how they think, how they build arguments, and how they move people to action.

**How to get support:**
- Contact your provider for support

---

## 2. Quick Start -- 30 Minutes to First Output

### Step 1: Install Claude Code (5 minutes)

Claude Code is the engine that powers the Titan Genome. It runs in your terminal (Mac, Windows, or Linux).

**Install:**
```bash
npm install -g @anthropic-ai/claude-code
```

If you do not have Node.js installed, install it first:
- Mac: `brew install node` or download from https://nodejs.org
- Windows: Download from https://nodejs.org
- Linux: `sudo apt install nodejs npm`

**Verify installation:**
```bash
claude --version
```

**Authenticate:**
```bash
claude
```
Follow the prompts to connect your Anthropic account. You need a Claude Pro or Team subscription with access to Opus.

### Step 2: Download the Titan Genome Files (2 minutes)

If you received this as a zip file, unzip it to a folder on your desktop. If you cloned a repo, you are already set.

Your folder should contain:
```
Titan-Genome/
  templates/            <-- All 32 template reference files
  docs/                 <-- Documentation (this file, guides, etc.)
  source/               <-- Place your client transcripts here
  outputs/              <-- Generated content goes here
  swipe-file/           <-- The Titan Genome swipe file database
  SWIPE_FILE_CONTEXT.md <-- Decoded copywriting DNA reference
  PROJECT_OVERVIEW.md   <-- System overview
  CLIENT_CONFIG.md      <-- Your brand, audience, and offer details
```

### Step 3: Set Up Your Working Folder (3 minutes)

Create a folder for YOUR content production:

```bash
mkdir ~/Desktop/My-Titan-Genome
mkdir ~/Desktop/My-Titan-Genome/source
mkdir ~/Desktop/My-Titan-Genome/outputs
```

Place your video transcript in the `source/` folder. Accepted formats:
- `.vtt` file (download from Zoom, YouTube, or Otter.ai)
- `.txt` file (from Read.AI, Otter.ai, or any transcription tool)
- `.srt` subtitle file

**If you do not have a transcript yet:**
Upload your video to YouTube (unlisted), wait for auto-captions, then download the `.vtt` file. Or use a tool like Otter.ai, Read.AI, or MacWhisper to generate one locally.

### Step 4: Run Your First Content Map (15 minutes)

Open your terminal, navigate to your working folder, and launch Claude Code:

```bash
cd ~/Desktop/My-Titan-Genome
claude
```

Then give Claude this prompt:

```
Read the transcript file in ./source/ and the Titan Genome template at
[path-to-Titan-Genome]/templates/PROJECT_1_Content_Map.md

Using that template as your structural guide, produce a complete Content Map
for MY video. Include:
- Every distinct topic with timestamps
- Topic hierarchy (main topics vs. subtopics)
- Difficulty mapping (beginner/intermediate/advanced)
- A topic-to-project matrix showing which of the 13 projects each topic feeds
- Key quotes worth reusing (minimum 15)
- Story moments and anecdotes
- Suggested video cut points for clips

Save the output to ./outputs/MY_Content_Map.md
```

This Content Map is the foundation for everything else. Review it before proceeding.

### Step 5: Pick Your First Project and Run the Creator Agent (10 minutes)

Start with whichever project serves your most immediate need:

| If you need... | Start with... |
|----------------|---------------|
| A course from your video | Project 2 -- Full Course Build |
| Email content to send this week | Project 3 -- 7-Day Email Course |
| A lead magnet to capture emails | Project 4 or 5 -- Lead Magnets |
| Social media content for 30 days | Project 7 -- Social Calendar |
| A sales page for an offer | Project 10 -- Sales Page |

Use the Creator Agent prompt from Section 4 below, pointing it at the relevant template in the `templates/` folder.

---

## 3. The 13-Project Playbook

Every project below channels the Titan Genome -- the decoded persuasion DNA of nine direct response legends -- through your specific content. When you run a project, you are not asking generic AI to write for you. You are bringing your content to the Mastermind Table and letting nine of the greatest minds in direct response history shape it.

### Project 1: Content Map and Timestamps (FOUNDATION -- DO THIS FIRST)

**What it is:** A master blueprint that extracts every topic, timestamp, key quote, story moment, and difficulty level from your video, then maps each element to the 12 downstream projects.

**Who it is for:** You (internal use). This is your production roadmap.

**Template file:** `templates/PROJECT_1_Content_Map.md`

**How to customize:** Replace the [YOUR TOPIC] training content with your own topics. The structure (topic hierarchy, difficulty mapping, project matrix) stays the same regardless of your subject matter.

**Prompt:**
```
Read my transcript at ./source/[your-transcript-file] and the template at
[path]/templates/PROJECT_1_Content_Map.md

Produce a complete Content Map for my video following the exact structure
of the template. Extract every distinct topic with timestamps, build the
topic hierarchy, assign difficulty levels, create the topic-to-project
matrix, pull key quotes (minimum 15), identify story moments, and suggest
video cut points.

Save to ./outputs/Content_Map.md
```

**Expected output:** 3,000-6,000 words. Should contain 20-40 topics, 15+ key quotes, 5+ story moments, and a complete project mapping matrix.

**Quality markers:** Every topic has a timestamp. The difficulty mapping makes sense for your audience. The project matrix shows clear connections between topics and downstream content.

---

### Project 2: Full Course Build

**What it is:** A complete structured course outline with modules, lessons, exercises, tips, and common mistakes -- built entirely from your video content.

**Who it is for:** Course creators, coaches, anyone who wants to turn a training into a sellable course.

**Template file:** `templates/PROJECT_2_Course.md`

**How to customize:** Adjust the number of modules to match your content depth. Change the target skill level (the template targets intermediate). Add your own exercises relevant to your industry.

**Prompt:**
```
Read my Content Map at ./outputs/Content_Map.md and the course template at
[path]/templates/PROJECT_2_Course.md

Also read the swipe file context at [path]/SWIPE_FILE_CONTEXT.md for
landing page copy patterns.

Build a complete course from my video content following the template structure.
Include:
- Landing page copy with headline options, benefit bullets, and CTA
- Module breakdown with lesson content, exercises, tips, and common mistakes
- Logical skill progression from foundational to advanced
- My actual examples and demonstrations from the video (reference Content Map)

My brand name is {{BRAND_NAME}}. My target audience is {{AUDIENCE_A}}.
My course price point is [PRICE].

Save to ./outputs/Full_Course.md
```

**Expected output:** 5,000-10,000 words. 6-12 modules depending on video length, each with 2-4 lessons.

**Quality markers:** Modules build on each other logically. Exercises are specific and actionable (not generic). Landing page copy uses benefit-driven language, not feature lists.

---

### Project 3: 7-Day Email Course

**What it is:** A drip email sequence (Day 0 welcome through Day 7-8 close) that teaches a condensed version of your video content and nurtures toward an offer.

**Who it is for:** Anyone building an email list. Use as a lead magnet delivery, onboarding sequence, or standalone nurture.

**Template file:** `templates/PROJECT_3_7Day_Email_Course.md`

**How to customize:** Adjust the number of days (5-10 works). Change the CTA destination for each email. Match subject line style to your brand voice.

**Prompt:**
```
Read my Content Map at ./outputs/Content_Map.md and the email course template
at [path]/templates/PROJECT_3_7Day_Email_Course.md

Also read [path]/SWIPE_FILE_CONTEXT.md -- use Bill Mueller's curiosity-driven
subject line patterns (63% curiosity rate) and Todd Brown's mechanism reveal
structure for the teaching emails.

Create a 7-day email course based on my video content. Each email needs:
- 3 subject line options (curiosity-driven)
- Preview text
- 300-500 word body that teaches one concept from the video
- Clear CTA
- P.S. line that teases the next day's email

My brand name is {{BRAND_NAME}}. The email course leads to {{YOUR_OFFER}}.
My audience's biggest pain point is [PAIN POINT].

Save to ./outputs/7Day_Email_Course.md
```

**Expected output:** 9 emails (Day 0-8), each 300-500 words. Total: 3,000-5,000 words.

**Quality markers:** Subject lines create genuine curiosity (not clickbait). Each email teaches ONE clear concept. CTAs are specific and action-oriented. P.S. lines create anticipation for the next email.

---

### Project 4: Client-Facing Lead Magnet Package

**What it is:** A 3-piece package: a downloadable PDF guide (7 pages), a landing page, and a 5-email follow-up sequence. Targets business owners and decision-makers.

**Who it is for:** Anyone selling to business owners, executives, or decision-makers who need to demonstrate ROI and practical value.

**Template files:**
- `templates/PROJECT_4_Client_Lead_Magnet.md` (the PDF content)
- `templates/PROJECT_4_Client_Landing_Page.md` (opt-in page copy)
- `templates/PROJECT_4_Client_Follow_Up_Emails.md` (5 nurture emails)

**How to customize:** Replace the [YOUR TOPIC] content with your subject matter. Adjust the ROI math for your industry. Change the "two paths" (DIY vs. hire an expert) to match your business model.

**Prompt:**
```
Read my Content Map at ./outputs/Content_Map.md and these three templates:
- [path]/templates/PROJECT_4_Client_Lead_Magnet.md
- [path]/templates/PROJECT_4_Client_Landing_Page.md
- [path]/templates/PROJECT_4_Client_Follow_Up_Emails.md

Also read [path]/SWIPE_FILE_CONTEXT.md -- use Jay Abraham's "you-focused"
messaging for the lead magnet and Alex Hormozi's direct value style for
the landing page.

Create a complete client-facing lead magnet package:
1. A 7-page PDF guide that demonstrates value from my video content,
   includes ROI math, and presents two paths (DIY vs. work with us)
2. A landing page with 3 headline options, benefit bullets, and email capture
3. A 5-email follow-up sequence over 8 days

My brand: {{BRAND_NAME}}
My audience: {{AUDIENCE_A}}
My offer: {{YOUR_OFFER}}
Key ROI metrics: [HOW YOUR SOLUTION SAVES MONEY OR MAKES MONEY]

Save to ./outputs/Client_Lead_Magnet.md, ./outputs/Client_Landing_Page.md,
and ./outputs/Client_Follow_Up_Emails.md
```

**Expected output:** Lead magnet: 3,000-4,000 words. Landing page: 1,000-1,500 words. Emails: 2,000-3,000 words total.

**Quality markers:** Lead magnet delivers genuine value (not a tease). Landing page has a clear single CTA. Follow-up emails reference specific content from the lead magnet. ROI math is specific and believable.

---

### Project 5: Secondary Audience Lead Magnet Package

**What it is:** Same 3-piece structure as Project 4, but targeting a different audience segment -- typically service providers, freelancers, or people who want to learn the skill rather than buy the service.

**Who it is for:** Anyone with two distinct audiences. If you only have one audience, skip this or adapt Project 4.

**Template files:**
- `templates/PROJECT_5_Secondary_Lead_Magnet.md`
- `templates/PROJECT_5_Secondary_Sales_Copy.md`
- `templates/PROJECT_5_Secondary_Follow_Up_Emails.md`

**How to customize:** Replace the secondary audience framing with your own. Adjust the career transformation angle to match their aspirations.

**Prompt:**
```
Read my Content Map at ./outputs/Content_Map.md and these templates:
- [path]/templates/PROJECT_5_Secondary_Lead_Magnet.md
- [path]/templates/PROJECT_5_Secondary_Sales_Copy.md
- [path]/templates/PROJECT_5_Secondary_Follow_Up_Emails.md

Also read [path]/SWIPE_FILE_CONTEXT.md -- use Todd Brown's mechanism reveal
for the sales copy and Bill Mueller's story-driven hooks for the
lead magnet.

Create a lead magnet package for my secondary audience:
1. An 8-page playbook/guide for {{AUDIENCE_B}}
2. Program sales copy with mechanism reveals and value stacking
3. A 5-email nurture sequence post-download

My brand: {{BRAND_NAME}}
Secondary audience: {{AUDIENCE_B}}
Their aspiration: [WHAT THEY WANT TO BECOME OR ACHIEVE]
My program/offer for them: {{YOUR_OFFER}}

Save to ./outputs/ with appropriate filenames.
```

**Expected output:** Lead magnet: 4,000-5,000 words. Sales copy: 3,000-5,000 words. Emails: 2,000-3,000 words.

**Quality markers:** Speaks directly to the secondary audience's identity and aspirations. Does not sound like a copy of the client-facing version. Career/skill transformation angle is specific and motivating.

---

### Project 6: Email Newsletter Sequences

**What it is:** Two newsletter sequences (one per audience segment) with 10-12 standalone emails each, designed to nurture and build authority over weeks.

**Who it is for:** Anyone with an email list who needs weeks of ready-to-send content.

**Template files:**
- `templates/PROJECT_6_Primary_Newsletter.md` (11 emails for primary audience)
- `templates/PROJECT_6_Secondary_Newsletter.md` (12 emails for secondary audience)

**How to customize:** Adjust the "from" persona for each audience. Change topics to match your expertise. Modify CTAs to point to your offers.

**Prompt:**
```
Read my Content Map at ./outputs/Content_Map.md and the newsletter templates:
- [path]/templates/PROJECT_6_Primary_Newsletter.md
- [path]/templates/PROJECT_6_Secondary_Newsletter.md

Also read [path]/SWIPE_FILE_CONTEXT.md -- use Brian Kurtz's relationship
nurture style and Jay Abraham's long-form value approach.

Create two newsletter sequences from my video content:
1. [NUMBER] emails for {{AUDIENCE_A}} -- from [YOUR NAME/PERSONA]
2. [NUMBER] emails for {{AUDIENCE_B}} -- from [SECOND PERSONA or same]

Each email should:
- Have 3 subject line options
- Be 400-700 words
- Teach, demonstrate, or share a story from the video content
- Include a soft CTA (not hard sell every email)

My brand: {{BRAND_NAME}}
Primary audience: {{AUDIENCE_A}}
Secondary audience: {{AUDIENCE_B}}
Main offer to promote: {{YOUR_OFFER}}

Save to ./outputs/
```

**Expected output:** 20-24 emails total, each 400-700 words. Total: 10,000-15,000 words.

**Quality markers:** Emails can be sent in any order (standalone, not sequential). Mix of teaching, storytelling, and proof. No more than 30% of emails are hard-sell.

---

### Project 7: 30-Day Social Media Calendar + 5-Day Challenge

**What it is:** Two 30-day social media calendars (one per audience/persona) plus a 5-day challenge framework with daily content and email reminders.

**Who it is for:** Anyone who needs a month of social content or wants to run an engagement challenge.

**Template files:**
- `templates/PROJECT_7_Primary_Social_Calendar.md` (primary audience social calendar)
- `templates/PROJECT_7_Secondary_Social_Calendar.md` (secondary audience social calendar)
- `templates/PROJECT_7_5Day_Challenge.md`

**How to customize:** Swap platforms to match where your audience lives. Adjust post length and style per platform. Modify the 5-day challenge topic and daily themes.

**Prompt:**
```
Read my Content Map at ./outputs/Content_Map.md and these templates:
- [path]/templates/PROJECT_7_Primary_Social_Calendar.md
- [path]/templates/PROJECT_7_Secondary_Social_Calendar.md
- [path]/templates/PROJECT_7_5Day_Challenge.md

Create for my content:
1. A 30-day social calendar for [PLATFORMS] targeting {{AUDIENCE_A}}
   Each day: hook, body, CTA, hashtags, best posting time
2. A 30-day social calendar for [PLATFORMS] targeting {{AUDIENCE_B}}
3. A 5-Day [YOUR TOPIC] Challenge with:
   - Daily themes and content
   - Live session plans (if applicable)
   - Email reminders for each day
   - Dual-track content if serving two audiences

My brand: {{BRAND_NAME}}
Primary platforms: [e.g., LinkedIn + Facebook]
Secondary platforms: [e.g., Instagram + TikTok]

Save to ./outputs/
```

**Expected output:** Two calendars of 30 posts each. Challenge: 5 days of detailed content plans. Total: 8,000-15,000 words.

**Quality markers:** Posts are platform-appropriate (LinkedIn posts differ from TikTok hooks). Content varies across the month (not repetitive). Challenge builds momentum day over day.

---

### Project 8: Video Content Game Plan

**What it is:** Two video content plans -- one per persona -- with YouTube scripts, talking points, demo segments, and short-form clip opportunities.

**Who it is for:** Anyone creating video content who wants a structured plan for the next 2-4 weeks.

**Template files:**
- `templates/PROJECT_8_Primary_Video_Plan.md` (primary audience videos)
- `templates/PROJECT_8_Secondary_Video_Plan.md` (secondary audience videos)

**How to customize:** Adjust the number of videos to your publishing schedule. Change platform targets. Add your own demo/tutorial segments.

**Prompt:**
```
Read my Content Map at ./outputs/Content_Map.md and these templates:
- [path]/templates/PROJECT_8_Primary_Video_Plan.md
- [path]/templates/PROJECT_8_Secondary_Video_Plan.md

Create video content plans from my material:
1. [NUMBER] videos for {{AUDIENCE_A}} on [PLATFORM]
   Each video: title, hook (first 30 seconds), talking points, demo segments,
   short-form clip opportunities, CTA
2. [NUMBER] videos for {{AUDIENCE_B}} on [PLATFORM]

My brand: {{BRAND_NAME}}
Video style: [e.g., talking head, screen share, tutorial, interview]
Average target length: [e.g., 8-15 minutes for YouTube, 60 seconds for Reels]

Save to ./outputs/
```

**Expected output:** 14-18 video plans per persona. Total: 5,000-8,000 words.

**Quality markers:** Hooks are specific and compelling (not generic "In this video..."). Demo segments reference real examples from your source material. Short-form clip opportunities identify the most shareable 30-60 second moments.

---

### Project 9: Community Content System

**What it is:** A complete community content system -- 14-day content calendar, community structure blueprint, progress tracking with badges and milestones, and a video maximization guide.

**Who it is for:** Anyone running an online community (School, Circle, Heartbeat, Mighty Networks, etc.).

**Template files:**
- `templates/PROJECT_9_14Day_Content_Calendar.md`
- `templates/PROJECT_9_Community_Structure.md`
- `templates/PROJECT_9_Progress_Tracking.md`
- `templates/PROJECT_9_Video_Maximization.md`

**How to customize:** Adapt the community platform references. Change badge names and milestone criteria. Adjust gamification to match your community culture.

**Prompt:**
```
Read my Content Map at ./outputs/Content_Map.md and these four templates:
- [path]/templates/PROJECT_9_14Day_Content_Calendar.md
- [path]/templates/PROJECT_9_Community_Structure.md
- [path]/templates/PROJECT_9_Progress_Tracking.md
- [path]/templates/PROJECT_9_Video_Maximization.md

Create a complete community content system for my [PLATFORM]:
1. 14-day content calendar with discussion posts and training topics
2. Community blueprint -- channels, welcome sequence, gamification, events
3. Progress tracking -- milestones, badges, self-assessments
4. Video maximization guide -- viewing schedule, discussion questions,
   pause-and-try moments, quiz questions

My community platform: [e.g., School, Circle, etc.]
My community name: [NAME]
My members are: [DESCRIPTION]
The video/training being maximized: [YOUR VIDEO TITLE]

Save to ./outputs/
```

**Expected output:** 4 files totaling 8,000-15,000 words. 25+ badges, 40+ quiz questions, 14 days of content.

**Quality markers:** Discussion prompts encourage genuine conversation (not yes/no answers). Badge criteria are specific and achievable. Quiz questions test application, not just recall.

---

### Project 10: Product Sales Page

**What it is:** A full long-form sales page with hero section, problem agitation, mechanism reveal, offer stack, FAQ, testimonial placement, and final CTA.

**Who it is for:** Anyone selling a course, certification, program, or high-ticket offer.

**Template file:** `templates/PROJECT_10_Sales_Page.md`

**How to customize:** This requires the most customization. Replace the offer details, pricing, guarantee, and testimonials entirely with your own.

**Prompt:**
```
Read my Content Map at ./outputs/Content_Map.md and the sales page template at
[path]/templates/PROJECT_10_Sales_Page.md

Also read [path]/SWIPE_FILE_CONTEXT.md -- use Eugene Schwartz's market
sophistication framework (target Level 3-4), Todd Brown's mechanism reveal
structure, and Alex Hormozi's offer stacking approach.

Create a full long-form sales page for {{YOUR_OFFER}}:
- Hero section with 3 headline options (mechanism-forward, result-forward,
  curiosity-forward)
- Problem agitation (3-4 pain points with amplification)
- Mechanism reveal (what makes your approach different)
- Proof section (numbers, results, specifics)
- Offer stack with value anchoring
- FAQ (10 questions with objection-handling answers)
- Guarantee
- Final CTA with urgency

My offer: [DETAILED DESCRIPTION]
Price: [PRICE]
Target buyer: {{AUDIENCE_A}}
Market sophistication level: [2, 3, or 4 -- how aware is your buyer?]
Unique mechanism: [WHAT MAKES YOUR APPROACH DIFFERENT]
Key proof points: [RESULTS, NUMBERS, TESTIMONIALS]
Guarantee: [YOUR GUARANTEE]

Save to ./outputs/Sales_Page.md
```

**Expected output:** 4,000-7,000 words. 11 sections minimum.

**Quality markers:** Headline options represent three different angles. Problem agitation is specific to the audience (not generic pain). Mechanism reveal explains WHY your approach works differently. Offer stack has real value anchoring with specific dollar amounts. FAQ answers handle real objections.

---

### Project 11: Operations Hub / Setup Guide

**What it is:** A practical setup guide, sales copy for the guide itself, and an integration checklist with 50+ action items.

**Who it is for:** Anyone offering a system, tool, or methodology that requires setup and implementation.

**Template files:**
- `templates/PROJECT_11_Ops_Hub_Setup_Guide.md`
- `templates/PROJECT_11_Ops_Hub_Sales_Copy.md`
- `templates/PROJECT_11_Integration_Checklist.md`

**How to customize:** Replace the Operations Hub concept with your own system/tool. Adjust the phases and steps to match your implementation process.

**Prompt:**
```
Read my Content Map at ./outputs/Content_Map.md and these templates:
- [path]/templates/PROJECT_11_Ops_Hub_Setup_Guide.md
- [path]/templates/PROJECT_11_Ops_Hub_Sales_Copy.md
- [path]/templates/PROJECT_11_Integration_Checklist.md

Create an implementation package for [YOUR SYSTEM/TOOL]:
1. Step-by-step setup guide (6 parts)
2. Sales copy for the guide with 3 split-test headlines and dual CTA
3. Integration checklist with 50+ tick boxes organized by phase

My system/tool: [DESCRIPTION]
Setup phases: [LIST YOUR PHASES]
Target user technical level: [BEGINNER / INTERMEDIATE / ADVANCED]

Save to ./outputs/
```

**Expected output:** Setup guide: 3,000-5,000 words. Sales copy: 2,000-3,000 words. Checklist: 1,500-2,500 words.

**Quality markers:** Setup steps are in logical order with no gaps. Checklist items are specific and verifiable (not vague). Sales copy positions the guide as valuable enough to pay for.

---

### Project 12: Handouts and Quick Reference

**What it is:** Three printable reference documents -- a resource guide, a setup checklist, and a quick reference card.

**Who it is for:** Students, clients, or anyone who needs a condensed reference from your video content.

**Template files:**
- `templates/PROJECT_12_Resource_Guide.md`
- `templates/PROJECT_12_Setup_Checklist.md`
- `templates/PROJECT_12_Quick_Reference.md`

**How to customize:** Replace tool names, commands, and shortcuts with your own. These should fit on 1-2 printed pages each.

**Prompt:**
```
Read my Content Map at ./outputs/Content_Map.md and these templates:
- [path]/templates/PROJECT_12_Resource_Guide.md
- [path]/templates/PROJECT_12_Setup_Checklist.md
- [path]/templates/PROJECT_12_Quick_Reference.md

Create three printable reference documents from my video content:
1. One-page resource guide -- links, tools, recommended resources
2. Setup checklist -- phased setup with troubleshooting tips
3. Quick reference card -- key commands, shortcuts, frameworks, modes

My topic: [YOUR TOPIC]
Key tools/resources: [LIST]
Most common tasks: [LIST]

Save to ./outputs/
```

**Expected output:** 3 files, each 500-1,500 words. Designed for print.

**Quality markers:** Fits on 1-2 pages when printed. Information is scannable (tables, bullet lists, not paragraphs). Troubleshooting tips address real problems.

---

### Project 13: Case Study Package

**What it is:** A 5-piece case study package -- written case study, YouTube video script, interview questions, social media posts, and a drop-in sales page section.

**Who it is for:** Anyone with a client success story to showcase.

**Template files:**
- `templates/PROJECT_13_Case_Study.md`
- `templates/PROJECT_13_Case_Study_YouTube_Script.md`
- `templates/PROJECT_13_Case_Study_Interview_Questions.md`
- `templates/PROJECT_13_Case_Study_Social_Posts.md`
- `templates/PROJECT_13_Case_Study_Sales_Page_Section.md`

**How to customize:** Replace the example client story with your own client's story. Ensure you have permission before publishing. Adjust platforms for social posts.

**Prompt:**
```
Read my Content Map at ./outputs/Content_Map.md and these five templates:
- [path]/templates/PROJECT_13_Case_Study.md
- [path]/templates/PROJECT_13_Case_Study_YouTube_Script.md
- [path]/templates/PROJECT_13_Case_Study_Interview_Questions.md
- [path]/templates/PROJECT_13_Case_Study_Social_Posts.md
- [path]/templates/PROJECT_13_Case_Study_Sales_Page_Section.md

Create a case study package for my client [CLIENT NAME]:
1. Written case study (problem, solution, result, transformation)
2. 5-7 minute YouTube video script
3. 10 interview questions with follow-ups
4. 5 platform-specific social posts (LinkedIn, Facebook, Instagram carousel)
5. Drop-in sales page section with reusable template

Client details:
- Name: [NAME] (permission obtained: yes/no)
- Their situation before: [BEFORE STATE]
- What they did: [THE INTERVENTION]
- Results: [SPECIFIC OUTCOMES]
- Key quote: [THEIR WORDS]

Save to ./outputs/
```

**Expected output:** 5 files totaling 4,000-7,000 words.

**Quality markers:** Specific numbers and results (not vague claims). Quote sounds natural. Social posts are platform-appropriate. Sales page section can be dropped into any existing page.

---

## 4. Your Mastermind Table at Work -- The 3-Agent Quality Pipeline

This is where the Titan Genome comes alive.

The 3-Agent Pipeline is what separates Content Multiplier output from everything else on the market. Think of it as your Mastermind Table in action -- three distinct roles, each channeling the decoded DNA of nine legends, working on every piece of content you produce.

Napoleon Hill discovered that when multiple minds converge on a single problem, they create a third intelligence greater than the sum of its parts. That is exactly what happens here. Three agents. Nine voices. One pipeline. Nothing leaves the table until it carries the full weight of the Genome.

### Agent 1: The Creator (The Voice at the Table)

The Creator is the first seat at your Mastermind Table. It takes your raw content, brings it to the nine Titans, and produces the initial draft -- not generic AI output, but content built on decoded persuasion architecture. It receives the Content Map, the relevant template, the Titan Genome context, and your brand details.

**Creator Agent Master Prompt:**
```
You are the Creator Agent for the Titan Genome pipeline.

YOUR INPUTS:
- Content Map: [path to your Content Map]
- Template: [path to the relevant project template]
- Titan Genome DNA: [path to SWIPE_FILE_CONTEXT.md]
- Brand details: [brand name, audience, voice, offer]

YOUR TASK:
Produce a complete, production-ready draft of [PROJECT NAME] following the
template structure exactly. Use the Content Map as your source material.
Apply the decoded persuasion DNA from the Titan Genome:
- Subject lines: Bill Mueller curiosity patterns (63% curiosity rate)
- Sales copy: Eugene Schwartz sophistication levels + Todd Brown mechanism reveals
- Value content: Jay Abraham "you-focused" messaging
- Direct/tactical content: Alex Hormozi no-fluff style
- Nurture content: Brian Kurtz relationship building

BRAND VOICE: [Describe your brand voice -- formal/casual, authoritative/friendly,
technical/accessible, etc.]

TARGET AUDIENCE: [Detailed audience description]

OUTPUT REQUIREMENTS:
- Follow the template structure section by section
- Include all required elements (headlines, body, CTAs, etc.)
- Use specific examples and references from the Content Map
- No placeholder text -- everything must be complete
- Write at a [READING LEVEL] reading level

Save to [output path]
```

### Agent 2: The Critic (The Challenge at the Table)

The Critic is the second seat -- the voice that pushes back, challenges, and sharpens. Hill wrote that his Invisible Counselors would argue with each other and challenge his assumptions. The Critic does exactly that. It reviews the Creator's output against a 10-point quality checklist drawn from the standards of the nine Titans and produces a specific revision list.

**Critic Agent Master Prompt:**
```
You are the Critic Agent for the Titan Genome pipeline.

Read the Creator's output at [path to draft] and the original Content Map
at [path to Content Map].

Review against this 10-POINT QUALITY CHECKLIST:

1. CONTENT ACCURACY: Does it accurately reflect the source material?
   Check against the Content Map. Flag any invented claims, wrong details,
   or missing key concepts.

2. TEMPLATE COMPLIANCE: Does it follow the template structure completely?
   Are all required sections present? Any sections incomplete?

3. TITAN GENOME APPLICATION: Are the decoded persuasion patterns actually applied?
   Check subject lines for curiosity patterns. Check sales copy for
   mechanism reveals. Check CTAs for specificity. The Genome should be
   visible in the architecture of every piece, not just the words.

4. BRAND VOICE CONSISTENCY: Does it sound like {{BRAND_NAME}}?
   Flag any sections that sound generic, robotic, or off-brand.

5. AUDIENCE TARGETING: Is this written FOR [TARGET AUDIENCE]?
   Check language level, pain points referenced, aspirations addressed.

6. CTA CLARITY: Is every CTA specific and actionable?
   "Click here to learn more" = FAIL. "Download the 7-page playbook" = PASS.

7. PROOF ELEMENTS: Are claims supported by specifics?
   Numbers, examples, case studies, demonstrations -- not vague assertions.

8. HOOK QUALITY: Do opening lines create genuine interest?
   First sentences of emails, posts, and sections must earn the next sentence.

9. CROSS-PROJECT COHERENCE: Does this piece align with the other content
   produced? Same terminology, same positioning, same offers referenced.

10. PRODUCTION READINESS: Is every section complete? No [PLACEHOLDER] text,
    no "insert here" notes, no incomplete sentences?

FOR EACH ISSUE FOUND:
- Identify the section and line
- State the specific problem
- Provide the specific fix (not just "make it better")

Then apply all fixes and save the revised version to [output path].
```

### Agent 3: The Approval Agent (The Final Verdict)

The Approval Agent is the third seat -- the senior voice at the table that gives the final stamp. Nothing ships without this agent confirming that the full weight of the Titan Genome is present in the work.

**Approval Agent Master Prompt:**
```
You are the Approval Agent for the Titan Genome pipeline.

Read:
1. The Critic's revision report (in the conversation or file)
2. The revised output at [path to revised file]
3. The original Content Map at [path to Content Map]

VERIFY:
- Every issue the Critic identified has been addressed
- No new issues were introduced during revision
- Brand voice is consistent throughout
- All CTAs point to the correct destinations
- No placeholder text remains
- Cross-project terminology is consistent

IF APPROVED: Add "APPROVED FOR PRODUCTION" header with today's date and
save to [final output path].

IF NOT APPROVED: List remaining issues and send back for one more
Critic pass.
```

### How to Customize the Critic's Checklist for Your Brand

Add brand-specific checks to the 10-point list:

```
ADDITIONAL BRAND-SPECIFIC CHECKS:

11. {{BRAND_NAME}} TERMINOLOGY: We say "[X]" not "[Y]".
    (Example: "We say 'members' not 'students'. We say 'transformation'
    not 'results'.")

12. TONE GUARDRAILS: We never [LIST THINGS TO AVOID].
    (Example: "We never use hype words like 'revolutionary' or 'game-changing'.
    We never make income claims. We never disparage competitors by name.")

13. OFFER ALIGNMENT: All references to our offer match current pricing
    and package names. Current offers: [LIST].
```

### Running Agents in Parallel for Maximum Throughput

Claude Code supports background agents. You can run multiple projects through the pipeline simultaneously:

```bash
# Terminal 1: Run Project 2 (Course)
claude "Run the Creator Agent on Project 2..." &

# Terminal 2: Run Project 3 (Email Course)
claude "Run the Creator Agent on Project 3..." &

# Terminal 3: Run Project 7 (Social Calendar)
claude "Run the Creator Agent on Project 7..." &
```

You can run up to 8 agents in parallel. The Content Map (Project 1) must be completed first -- then all other projects can run simultaneously.

**Recommended parallel batches:**

| Batch | Projects | Why Together |
|-------|----------|-------------|
| Batch 1 | Project 1 (Content Map) | Must be first -- everything depends on it |
| Batch 2 | Projects 2, 3, 4, 5 | Foundation content -- course, emails, lead magnets |
| Batch 3 | Projects 6, 7, 8 | Marketing content -- newsletters, social, video |
| Batch 4 | Projects 9, 10, 11, 12 | Platform and sales content |
| Batch 5 | Project 13 | Case study -- may need other projects as reference |
| Batch 6 | Critic pass on all projects | Run Critics in parallel across all outputs |
| Batch 7 | Approval pass on all projects | Final approval sweep |

---

## 5. Customizing for Your Brand

### How to Swap in Your Brand Voice

Before running any Creator agents, prepare a brand voice brief:

```
BRAND VOICE BRIEF

Brand name: ___
Founder/face of brand: ___
Tone: ___ (e.g., "Direct and tactical, like a smart friend who happens
to be an expert. Casual but not sloppy. Confident but not arrogant.")
We say: ___ (list preferred terms)
We never say: ___ (list avoided terms)
Reading level: ___ (e.g., "8th grade -- clear and accessible")
Signature phrases: ___ (any catchphrases or recurring themes)
Example content: [Link or paste 2-3 examples of your existing content
that represent your ideal voice]
```

Include this brief in every Creator and Critic prompt.

### How to Adapt the Titan Genome for Your Industry

The nine legends in the Titan Genome map to content types, not industries. Their decoded DNA is structural -- it works regardless of your subject matter. Here is how to match each Titan to your content needs:

| Your Content Need | Titan DNA to Apply | Why This Titan |
|-------------------|--------------------------|-----|
| Email subject lines | Bill Mueller | 63% curiosity rate, story-driven hooks |
| Sales pages | Eugene Schwartz + Todd Brown | Sophistication levels + mechanism reveals |
| Value/teaching content | Jay Abraham | Long-form, "you-focused" messaging |
| Direct tactical content | Alex Hormozi | No-fluff, framework-driven, value bombs |
| Nurture/relationship emails | Brian Kurtz | Industry stories, relationship building |
| Personality-driven content | Jon Buchan | Charm, humor, conversational warmth |
| Mindset/inspiration content | Tom Bilyeu | Personal development hooks, lowercase style |
| Lead gen tactical content | Lead Gen Jay | Practical frameworks, growth tactics |
| Tech/AI/modern content | Liam Ottley | Cutting-edge positioning, automation angles |

This is the power of the Genome -- you are not limited to one voice. You have nine distinct persuasion architectures available for every piece of content, and the system knows when to deploy each one.

### How to Adjust Audience Targeting

The template library was built for two audiences:
1. {{AUDIENCE_A}} (buying the solution)
2. {{AUDIENCE_B}} (learning the skill)

If your audiences are different, update the audience description in every prompt:

```
PRIMARY AUDIENCE:
- Who they are: [Job title, situation, demographics]
- Their biggest pain: [The problem they feel daily]
- Their desired outcome: [What success looks like to them]
- Their objections: [Why they hesitate to buy]
- Their language: [Words and phrases THEY use to describe their situation]

SECONDARY AUDIENCE (if applicable):
- [Same structure]
```

### How to Modify CTAs and Offer Structures

Every template contains CTAs pointing to placeholder offers. Replace them:

Search for these patterns in any template output and replace with yours:
- "{{BRAND_NAME}}" -> [Your Brand]
- "{{YOUR_OFFER}}" -> [Your offer name]
- "Book a call" -> [Your CTA]
- "Join the community" -> [Your community CTA]
- Any specific URLs or links -> [Your URLs]

---

## 6. FAQ

**Q1: What video length works best?**
Any recorded content between 10 minutes and 3 hours. A 30-minute video produces 15-20 content pieces. A 2-hour video produces 30-40. Even a 10-minute Loom can produce a week of social content, a lead magnet, and an email sequence. The Titan Genome works with whatever you bring to the table -- the nine Titans decode the persuasion potential in your content regardless of length.

**Q2: Do I need a professional transcript, or will auto-captions work?**
Auto-captions from Zoom or YouTube work fine. The Titan Genome handles imperfect transcripts -- the decoded persuasion architecture operates on your ideas and arguments, not on perfect grammar. For best results, use a dedicated transcription tool like Otter.ai, Read.AI, or MacWhisper -- they produce cleaner output with speaker labels.

**Q3: How much does Claude Code cost to run this?**
Claude Code requires an Anthropic subscription (Pro plan at approximately $20/month or Team plan). Running the full 32-piece pipeline on a 2-hour video uses roughly $5-15 in API credits beyond the subscription. Most users stay well within their included usage. Consider it the cost of having nine of the greatest copywriters in history on retainer.

**Q4: Can I use this with ChatGPT or another AI instead of Claude Code?**
The templates and the Titan Genome methodology work with any capable AI. However, the 3-Agent Mastermind Pipeline, parallel processing, and file management are designed specifically for Claude Code's terminal-based workflow. Using another tool will require manual adaptation and will not support the parallel agent architecture that makes the Mastermind Table operational.

**Q5: How long does the full 32-piece pipeline take?**
With parallel processing: 2-4 hours for Creator passes, 1-2 hours for Critic passes, 30 minutes for Approval passes. Total: one afternoon. Running sequentially (one project at a time): 6-10 hours spread across 1-2 days. Either way, you are producing what would take a content team weeks -- and every piece carries the decoded DNA of nine legends.

**Q6: What if my video covers a completely different topic than the original templates?**
The Titan Genome is topic-agnostic. The templates provide structure (how a sales page is organized, how an email sequence flows, how a social calendar is structured). Your Content Map fills in the topic-specific material. The decoded persuasion DNA works on any subject matter -- coaching, consulting, marketing, health, finance, real estate, SaaS, any domain. The principles of how to persuade, teach, and move people to action are universal. That is why we decoded the architecture, not the words.

**Q7: Do I need to be technical to use this?**
You need to be comfortable typing commands in a terminal. If you can type a text message, you can type `claude` and press Enter. The Titan Genome does the heavy lifting. You bring your expertise and your voice -- the nine Titans handle the persuasion architecture.

**Q8: Can I use these outputs as-is, or do they need editing?**
The 3-Agent Mastermind Pipeline produces output that is 85-95% production-ready. The Titan Genome ensures every piece is built on proven persuasion architecture, but you should always review for factual accuracy (the AI works from your transcript, but verify specifics), add personal anecdotes the AI could not know, insert real testimonials and case study data, and update any links or pricing. Budget 15-30 minutes of review per piece.

**Q9: What if I want to produce more than 32 pieces from one video?**
The 13-project framework covers the most valuable content types. You can duplicate and modify templates to create additional variations -- different audience segments, different platform versions, additional email sequences. One video can realistically produce 50-80 pieces with creative template adaptation. The Genome scales with you. The more content you bring to the Mastermind Table, the more the nine Titans can do with it.

**Q10: Can I use this system for client work?**
Yes. If you are a freelancer, agency, or service provider, you can run this system on client videos. Every client gets the benefit of the Titan Genome -- decoded persuasion DNA from nine legends applied to their specific content. This is how you deliver work that outperforms anything built on generic AI.

---

## 7. Support and Next Steps

### Immediate Next Steps

1. Complete your Content Map (Project 1) -- this is always step one
2. Pick your highest-priority project and run it through the full 3-Agent Mastermind Pipeline
3. Review the output, make brand-specific edits, and deploy
4. Work through the remaining 12 projects over the next 1-4 weeks

You now have a table of nine. The decoded persuasion DNA of a century of direct response mastery, operational and ready to shape everything you create. The Mastermind Table is open. The Titan Genome is live. What you build from here is up to you.

### Getting Help

Contact your provider for support.

---

*The Content Multiplier. Powered by The Titan Genome -- the decoded persuasion DNA of 9 direct response legends. Built on Napoleon Hill's Mastermind Principle, made operational with Claude Code (Opus). Your table of nine is ready.*
