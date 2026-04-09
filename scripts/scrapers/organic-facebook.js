#!/usr/bin/env node

/**
 * Organic Facebook Scraper
 * Scrapes top-performing organic posts from Facebook pages using Apify.
 * Extracts: post text, media type, engagement count, reactions, shares, comments.
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const fs = require('fs');
const path = require('path');

const APIFY_TOKEN = process.env.APIFY_API_TOKEN;
const OUTPUT_PATH = path.resolve(__dirname, '../../data/shared/winning-patterns/organic/facebook-latest.json');
const CONFIG_PATH = path.resolve(__dirname, '../../config/organic-targets.json');

async function loadTargets() {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error(`Config file not found: ${CONFIG_PATH}`);
  }
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  return config.facebook_pages || [];
}

async function scrapeFacebookPage(pageUrl) {
  const { ApifyClient } = require('apify-client');
  const client = new ApifyClient({ token: APIFY_TOKEN });

  const input = {
    startUrls: [{ url: pageUrl }],
    maxPosts: 30,
    maxPostComments: 0,
    scrapeAbout: false,
    scrapePosts: true,
  };

  try {
    const run = await client.actor('apify/facebook-posts-scraper').call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    return items;
  } catch (err) {
    console.error(`Error scraping ${pageUrl}: ${err.message}`);
    return [];
  }
}

function processPost(rawPost) {
  const text = rawPost.text || rawPost.postText || rawPost.message || '';
  const reactions = rawPost.likes || rawPost.reactions || rawPost.reactionsCount || 0;
  const shares = rawPost.shares || rawPost.sharesCount || 0;
  const comments = rawPost.comments || rawPost.commentsCount || 0;
  const engagement = reactions + shares + comments;

  return {
    post_id: rawPost.postId || rawPost.id || null,
    page_name: rawPost.pageName || rawPost.authorName || null,
    page_url: rawPost.pageUrl || null,
    post_url: rawPost.postUrl || rawPost.url || null,
    text: text,
    hook: text ? text.split(/\s+/).slice(0, 20).join(' ') : null,
    media_type: detectMediaType(rawPost),
    engagement_total: engagement,
    reactions: reactions,
    shares: shares,
    comments: comments,
    post_date: rawPost.timestamp || rawPost.date || rawPost.publishedAt || null,
    scraped_at: new Date().toISOString(),
  };
}

function detectMediaType(post) {
  if (post.videoUrl || post.video || post.type === 'video') return 'video';
  if (post.imageUrls?.length > 1 || post.type === 'album') return 'album';
  if (post.imageUrl || post.image || post.type === 'photo') return 'image';
  if (post.sharedPost || post.type === 'share') return 'shared';
  if (post.type === 'link') return 'link';
  return 'text';
}

async function run() {
  console.log('=== Organic Facebook Scraper ===');

  if (!APIFY_TOKEN) {
    console.error('[FAIL] APIFY_API_TOKEN not set in .env');
    process.exit(1);
  }

  const targets = await loadTargets();
  console.log(`Found ${targets.length} Facebook pages to scrape`);

  const allPosts = [];
  const errors = [];

  for (const page of targets) {
    const url = typeof page === 'string' ? page : page.url;
    console.log(`Scraping: ${url}...`);
    try {
      const rawPosts = await scrapeFacebookPage(url);
      const processed = rawPosts.map(processPost);
      allPosts.push(...processed);
      console.log(`  Found ${processed.length} posts`);
    } catch (err) {
      errors.push({ page: url, error: err.message });
      console.error(`  Error: ${err.message}`);
    }
  }

  // Sort by engagement (highest first)
  allPosts.sort((a, b) => (b.engagement_total || 0) - (a.engagement_total || 0));

  const output = {
    scraped_at: new Date().toISOString(),
    platform: 'facebook',
    total_posts: allPosts.length,
    pages_scraped: targets.length,
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
