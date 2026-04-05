#!/usr/bin/env node

/**
 * Organic Instagram Scraper
 * Scrapes top-performing IG posts and reels using Apify.
 * Extracts: caption, media type (reel/carousel/single), likes, comments, saves.
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const fs = require('fs');
const path = require('path');

const APIFY_TOKEN = process.env.APIFY_API_TOKEN;
const OUTPUT_PATH = path.resolve(__dirname, '../../data/shared/winning-patterns/organic/instagram-latest.json');
const CONFIG_PATH = path.resolve(__dirname, '../../config/organic-targets.json');

async function loadTargets() {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error(`Config file not found: ${CONFIG_PATH}`);
  }
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  return config.instagram_accounts || [];
}

async function scrapeInstagramAccount(username) {
  const { ApifyClient } = require('apify-client');
  const client = new ApifyClient({ token: APIFY_TOKEN });

  const input = {
    usernames: [username.replace('@', '')],
    resultsLimit: 30,
    scrapeStories: false,
    scrapePosts: true,
    scrapeReels: true,
  };

  try {
    const run = await client.actor('apify/instagram-scraper').call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    return items;
  } catch (err) {
    console.error(`Error scraping @${username}: ${err.message}`);
    return [];
  }
}

function processPost(rawPost) {
  const caption = rawPost.caption || rawPost.text || '';
  const likes = rawPost.likesCount || rawPost.likes || 0;
  const comments = rawPost.commentsCount || rawPost.comments || 0;
  const saves = rawPost.savesCount || rawPost.saves || 0;
  const views = rawPost.videoViewCount || rawPost.views || 0;
  const engagement = likes + comments + saves;

  return {
    post_id: rawPost.id || rawPost.shortCode || null,
    username: rawPost.ownerUsername || rawPost.username || null,
    post_url: rawPost.url || (rawPost.shortCode ? `https://instagram.com/p/${rawPost.shortCode}` : null),
    caption: caption,
    hook: caption ? caption.split(/\s+/).slice(0, 20).join(' ') : null,
    media_type: detectMediaType(rawPost),
    likes: likes,
    comments: comments,
    saves: saves,
    views: views,
    engagement_total: engagement,
    hashtags: extractHashtags(caption),
    post_date: rawPost.timestamp || rawPost.takenAt || null,
    scraped_at: new Date().toISOString(),
  };
}

function detectMediaType(post) {
  if (post.type === 'Video' || post.isVideo || post.videoUrl) return 'reel';
  if (post.type === 'Sidecar' || post.childPosts?.length > 0 || post.sidecarCount > 1) return 'carousel';
  return 'single';
}

function extractHashtags(text) {
  if (!text) return [];
  const matches = text.match(/#[\w]+/g);
  return matches || [];
}

async function run() {
  console.log('=== Organic Instagram Scraper ===');

  if (!APIFY_TOKEN) {
    console.error('[FAIL] APIFY_API_TOKEN not set in .env');
    process.exit(1);
  }

  const targets = await loadTargets();
  console.log(`Found ${targets.length} Instagram accounts to scrape`);

  const allPosts = [];
  const errors = [];

  for (const account of targets) {
    const username = typeof account === 'string' ? account : account.username;
    console.log(`Scraping: @${username}...`);
    try {
      const rawPosts = await scrapeInstagramAccount(username);
      const processed = rawPosts.map(processPost);
      allPosts.push(...processed);
      console.log(`  Found ${processed.length} posts`);
    } catch (err) {
      errors.push({ account: username, error: err.message });
      console.error(`  Error: ${err.message}`);
    }
  }

  allPosts.sort((a, b) => (b.engagement_total || 0) - (a.engagement_total || 0));

  const output = {
    scraped_at: new Date().toISOString(),
    platform: 'instagram',
    total_posts: allPosts.length,
    accounts_scraped: targets.length,
    errors: errors,
    media_distribution: getMediaDistribution(allPosts),
    top_posts: allPosts.slice(0, 20),
    all_posts: allPosts,
  };

  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  if (fs.existsSync(OUTPUT_PATH)) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const archivePath = OUTPUT_PATH.replace('latest.json', `archive-${timestamp}.json`);
    fs.copyFileSync(OUTPUT_PATH, archivePath);
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`\nOutput saved to: ${OUTPUT_PATH}`);
  console.log(`Total posts: ${allPosts.length}, Errors: ${errors.length}`);

  return output;
}

function getMediaDistribution(posts) {
  const dist = {};
  for (const post of posts) {
    const type = post.media_type || 'unknown';
    dist[type] = (dist[type] || 0) + 1;
  }
  return dist;
}

run().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
