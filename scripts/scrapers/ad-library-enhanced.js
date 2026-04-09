#!/usr/bin/env node

/**
 * Enhanced Meta Ad Library Scraper
 * Uses Apify to scrape competitor ads from the Meta Ad Library.
 * Extracts hooks, transcripts, copy, headlines, CTAs, duration, and media type.
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const fs = require('fs');
const path = require('path');

const APIFY_TOKEN = process.env.APIFY_API_TOKEN;
const OUTPUT_PATH = path.resolve(__dirname, '../../data/shared/winning-patterns/paid-ads/latest.json');
const CONFIG_PATH = path.resolve(__dirname, '../../config/ad-accounts.json');

async function loadCompetitorList() {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error(`Config file not found: ${CONFIG_PATH}`);
  }
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  return config.competitors || [];
}

function extractHook(text) {
  if (!text) return null;
  const words = text.split(/\s+/);
  return words.slice(0, 20).join(' ');
}

function categorizeHook(hookText) {
  if (!hookText) return 'unknown';
  const lower = hookText.toLowerCase();

  if (/tired of|sick of|struggling|frustrated|can't|won't|stop/.test(lower)) return 'pain_point';
  if (/did you know|what if|ever wonder|secret|most people don't/.test(lower)) return 'curiosity';
  if (/\d+[\s,]*(people|customers|users|results)|proven|studies show|research/.test(lower)) return 'social_proof';
  if (/unpopular opinion|hot take|nobody talks about|controversial/.test(lower)) return 'controversial';
  if (/imagine|picture this|living|lifestyle|dream/.test(lower)) return 'lifestyle';
  if (/before.*after|transform|changed|results|went from/.test(lower)) return 'transformation';

  return 'other';
}

async function scrapeAdLibrary(competitor) {
  const { ApifyClient } = require('apify-client');
  const client = new ApifyClient({ token: APIFY_TOKEN });

  const input = {
    searchTerms: [competitor.name || competitor.page_name],
    countryCode: competitor.country || 'US',
    adType: 'ALL',
    mediaType: 'ALL',
    adActiveStatus: 'ACTIVE',
    maxAds: competitor.max_ads || 50,
  };

  try {
    const run = await client.actor('apify/facebook-ads-library-scraper').call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    return items;
  } catch (err) {
    console.error(`Error scraping ${competitor.name}: ${err.message}`);
    return [];
  }
}

function processAd(rawAd) {
  const bodyText = rawAd.adBodyText || rawAd.body || '';
  const hook = extractHook(bodyText);

  return {
    ad_id: rawAd.adArchiveID || rawAd.id || null,
    page_name: rawAd.pageName || rawAd.page_name || null,
    hook: hook,
    hook_category: categorizeHook(hook),
    full_transcript: rawAd.transcript || rawAd.videoTranscript || null,
    body_copy: bodyText,
    headline: rawAd.adTitle || rawAd.title || null,
    cta: rawAd.ctaText || rawAd.cta || null,
    ad_duration_days: rawAd.durationDays || calculateDuration(rawAd.startDate, rawAd.endDate),
    media_type: rawAd.mediaType || detectMediaType(rawAd),
    start_date: rawAd.startDate || null,
    platform: rawAd.platforms || ['facebook'],
    link_url: rawAd.linkUrl || rawAd.url || null,
    scraped_at: new Date().toISOString(),
  };
}

function calculateDuration(start, end) {
  if (!start) return null;
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
}

function detectMediaType(ad) {
  if (ad.videoUrl || ad.video) return 'video';
  if (ad.carouselCards || ad.carousel) return 'carousel';
  if (ad.imageUrl || ad.image) return 'image';
  return 'unknown';
}

async function run() {
  console.log('=== Enhanced Meta Ad Library Scraper ===');

  if (!APIFY_TOKEN) {
    console.error('[FAIL] APIFY_API_TOKEN not set in .env');
    process.exit(1);
  }

  const competitors = await loadCompetitorList();
  console.log(`Found ${competitors.length} competitors to scrape`);

  const allAds = [];
  const errors = [];

  for (const competitor of competitors) {
    console.log(`Scraping: ${competitor.name || competitor.page_name}...`);
    try {
      const rawAds = await scrapeAdLibrary(competitor);
      const processed = rawAds.map(processAd);
      allAds.push(...processed);
      console.log(`  Found ${processed.length} ads`);
    } catch (err) {
      errors.push({ competitor: competitor.name, error: err.message });
      console.error(`  Error: ${err.message}`);
    }
  }

  // Sort by ad duration (longest running = likely best performing)
  allAds.sort((a, b) => (b.ad_duration_days || 0) - (a.ad_duration_days || 0));

  const output = {
    scraped_at: new Date().toISOString(),
    total_ads: allAds.length,
    competitors_scraped: competitors.length,
    errors: errors,
    hook_distribution: getHookDistribution(allAds),
    media_distribution: getMediaDistribution(allAds),
    ads: allAds,
  };

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Archive previous version
  if (fs.existsSync(OUTPUT_PATH)) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const archivePath = OUTPUT_PATH.replace('latest.json', `archive-${timestamp}.json`);
    fs.copyFileSync(OUTPUT_PATH, archivePath);
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`\nOutput saved to: ${OUTPUT_PATH}`);
  console.log(`Total ads: ${allAds.length}, Errors: ${errors.length}`);

  return output;
}

function getHookDistribution(ads) {
  const dist = {};
  for (const ad of ads) {
    const cat = ad.hook_category || 'unknown';
    dist[cat] = (dist[cat] || 0) + 1;
  }
  return dist;
}

function getMediaDistribution(ads) {
  const dist = {};
  for (const ad of ads) {
    const type = ad.media_type || 'unknown';
    dist[type] = (dist[type] || 0) + 1;
  }
  return dist;
}

run().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
