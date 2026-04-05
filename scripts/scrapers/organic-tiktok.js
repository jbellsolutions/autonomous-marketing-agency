#!/usr/bin/env node

/**
 * Organic TikTok Scraper
 * Scrapes top-performing TikTok videos using Apify.
 * Extracts: caption, views, likes, shares, comments, sounds used.
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const fs = require('fs');
const path = require('path');

const APIFY_TOKEN = process.env.APIFY_API_TOKEN;
const OUTPUT_PATH = path.resolve(__dirname, '../../data/shared/winning-patterns/organic/tiktok-latest.json');
const CONFIG_PATH = path.resolve(__dirname, '../../config/organic-targets.json');

async function loadTargets() {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error(`Config file not found: ${CONFIG_PATH}`);
  }
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  return config.tiktok_accounts || [];
}

async function scrapeTikTokAccount(username) {
  const { ApifyClient } = require('apify-client');
  const client = new ApifyClient({ token: APIFY_TOKEN });

  const input = {
    profiles: [username.replace('@', '')],
    resultsPerPage: 30,
    shouldDownloadVideos: false,
    shouldDownloadCovers: false,
  };

  try {
    const run = await client.actor('clockworks/tiktok-scraper').call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    return items;
  } catch (err) {
    console.error(`Error scraping @${username}: ${err.message}`);
    return [];
  }
}

function processVideo(rawVideo) {
  const caption = rawVideo.text || rawVideo.desc || rawVideo.description || '';
  const views = rawVideo.playCount || rawVideo.views || rawVideo.videoPlayCount || 0;
  const likes = rawVideo.diggCount || rawVideo.likes || rawVideo.heartCount || 0;
  const shares = rawVideo.shareCount || rawVideo.shares || 0;
  const comments = rawVideo.commentCount || rawVideo.comments || 0;
  const engagement = likes + shares + comments;

  return {
    video_id: rawVideo.id || rawVideo.videoId || null,
    username: rawVideo.authorMeta?.name || rawVideo.author || null,
    video_url: rawVideo.webVideoUrl || rawVideo.url || null,
    caption: caption,
    hook: caption ? caption.split(/\s+/).slice(0, 20).join(' ') : null,
    views: views,
    likes: likes,
    shares: shares,
    comments: comments,
    engagement_total: engagement,
    engagement_rate: views > 0 ? ((engagement / views) * 100).toFixed(2) + '%' : '0%',
    sound_name: rawVideo.musicMeta?.musicName || rawVideo.music?.title || null,
    sound_author: rawVideo.musicMeta?.musicAuthor || rawVideo.music?.author || null,
    sound_is_original: rawVideo.musicMeta?.musicOriginal || false,
    hashtags: extractHashtags(caption),
    duration_seconds: rawVideo.videoMeta?.duration || rawVideo.duration || null,
    post_date: rawVideo.createTimeISO || rawVideo.createTime || null,
    scraped_at: new Date().toISOString(),
  };
}

function extractHashtags(text) {
  if (!text) return [];
  const matches = text.match(/#[\w]+/g);
  return matches || [];
}

async function run() {
  console.log('=== Organic TikTok Scraper ===');

  if (!APIFY_TOKEN) {
    console.error('[FAIL] APIFY_API_TOKEN not set in .env');
    process.exit(1);
  }

  const targets = await loadTargets();
  console.log(`Found ${targets.length} TikTok accounts to scrape`);

  const allVideos = [];
  const errors = [];

  for (const account of targets) {
    const username = typeof account === 'string' ? account : account.username;
    console.log(`Scraping: @${username}...`);
    try {
      const rawVideos = await scrapeTikTokAccount(username);
      const processed = rawVideos.map(processVideo);
      allVideos.push(...processed);
      console.log(`  Found ${processed.length} videos`);
    } catch (err) {
      errors.push({ account: username, error: err.message });
      console.error(`  Error: ${err.message}`);
    }
  }

  allVideos.sort((a, b) => (b.views || 0) - (a.views || 0));

  const output = {
    scraped_at: new Date().toISOString(),
    platform: 'tiktok',
    total_videos: allVideos.length,
    accounts_scraped: targets.length,
    errors: errors,
    trending_sounds: getTrendingSounds(allVideos),
    top_hashtags: getTopHashtags(allVideos),
    top_videos: allVideos.slice(0, 20),
    all_videos: allVideos,
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
  console.log(`Total videos: ${allVideos.length}, Errors: ${errors.length}`);

  return output;
}

function getTrendingSounds(videos) {
  const soundCounts = {};
  for (const video of videos) {
    if (video.sound_name) {
      const key = video.sound_name;
      if (!soundCounts[key]) {
        soundCounts[key] = { name: key, author: video.sound_author, count: 0, total_views: 0 };
      }
      soundCounts[key].count += 1;
      soundCounts[key].total_views += video.views || 0;
    }
  }
  return Object.values(soundCounts).sort((a, b) => b.count - a.count).slice(0, 10);
}

function getTopHashtags(videos) {
  const tagCounts = {};
  for (const video of videos) {
    for (const tag of video.hashtags || []) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }
  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([tag, count]) => ({ tag, count }));
}

run().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
