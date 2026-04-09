#!/usr/bin/env node

/**
 * Hook Analyzer
 * Analyzes hooks from winning ads and organic content.
 * Categorizes hooks and cross-references hook type with performance data.
 * Categories: pain_point, curiosity, social_proof, controversial, lifestyle, transformation
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.resolve(__dirname, '../../data/shared/winning-patterns');
const OUTPUT_PATH = path.resolve(DATA_DIR, 'hook-analysis.json');

const HOOK_PATTERNS = {
  pain_point: {
    label: 'Pain Point',
    patterns: [
      /tired of/i, /sick of/i, /struggling with/i, /frustrated/i,
      /can't (seem|figure|stop)/i, /won't work/i, /stop (wasting|losing|spending)/i,
      /hate when/i, /annoying/i, /biggest mistake/i, /failing/i,
    ],
  },
  curiosity: {
    label: 'Curiosity',
    patterns: [
      /did you know/i, /what if/i, /ever wonder/i, /secret/i,
      /most people don't/i, /nobody tells you/i, /here's why/i,
      /the truth about/i, /you won't believe/i, /little-known/i,
    ],
  },
  social_proof: {
    label: 'Social Proof',
    patterns: [
      /\d+[\s,]*(people|customers|users|clients)/i, /proven/i,
      /studies show/i, /research (shows|proves)/i, /recommended by/i,
      /trusted by/i, /as seen/i, /rated #?\d/i, /award/i,
    ],
  },
  controversial: {
    label: 'Controversial',
    patterns: [
      /unpopular opinion/i, /hot take/i, /nobody talks about/i,
      /controversial/i, /i don't care what/i, /fight me/i,
      /wrong about/i, /overrated/i, /actually bad/i,
    ],
  },
  lifestyle: {
    label: 'Lifestyle',
    patterns: [
      /imagine/i, /picture this/i, /living your/i, /lifestyle/i,
      /dream (life|job|body)/i, /freedom/i, /what .* looks like/i,
      /day in the life/i, /morning routine/i, /my .* routine/i,
    ],
  },
  transformation: {
    label: 'Transformation',
    patterns: [
      /before.*after/i, /transform/i, /changed my/i, /results in/i,
      /went from .* to/i, /glow.?up/i, /in just \d/i, /complete 180/i,
      /jaw.?drop/i, /unrecognizable/i,
    ],
  },
};

function categorizeHook(hookText) {
  if (!hookText) return { category: 'other', confidence: 0, matched_pattern: null };

  for (const [category, config] of Object.entries(HOOK_PATTERNS)) {
    for (const pattern of config.patterns) {
      if (pattern.test(hookText)) {
        return { category, label: config.label, confidence: 0.8, matched_pattern: pattern.source };
      }
    }
  }

  return { category: 'other', label: 'Other', confidence: 0.5, matched_pattern: null };
}

function loadDataFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (err) {
    console.warn(`Could not parse ${filePath}: ${err.message}`);
    return null;
  }
}

function extractHooks(data, source) {
  const hooks = [];

  if (!data) return hooks;

  const items = data.ads || data.all_posts || data.all_videos || data.top_posts || data.top_videos || [];

  for (const item of items) {
    const hookText = item.hook || null;
    if (!hookText) continue;

    const classification = categorizeHook(hookText);

    hooks.push({
      text: hookText,
      source: source,
      category: classification.category,
      label: classification.label,
      confidence: classification.confidence,
      performance: {
        engagement: item.engagement_total || null,
        views: item.views || null,
        likes: item.likes || item.reactions || null,
        cpa: item.cpa || null,
        roas: item.roas || null,
        ctr: item.ctr || null,
        ad_duration_days: item.ad_duration_days || null,
      },
      media_type: item.media_type || null,
    });
  }

  return hooks;
}

async function run() {
  console.log('=== Hook Analyzer ===');

  // Load all data sources
  const paidAds = loadDataFile(path.join(DATA_DIR, 'paid-ads/latest.json'));
  const fbOrganic = loadDataFile(path.join(DATA_DIR, 'organic/facebook-latest.json'));
  const igOrganic = loadDataFile(path.join(DATA_DIR, 'organic/instagram-latest.json'));
  const ttOrganic = loadDataFile(path.join(DATA_DIR, 'organic/tiktok-latest.json'));

  // Extract and classify hooks from all sources
  const allHooks = [
    ...extractHooks(paidAds, 'paid_ads'),
    ...extractHooks(fbOrganic, 'facebook_organic'),
    ...extractHooks(igOrganic, 'instagram_organic'),
    ...extractHooks(ttOrganic, 'tiktok_organic'),
  ];

  console.log(`Total hooks analyzed: ${allHooks.length}`);

  // Category distribution
  const categoryDist = {};
  for (const hook of allHooks) {
    const cat = hook.category;
    if (!categoryDist[cat]) {
      categoryDist[cat] = { count: 0, label: hook.label, avg_engagement: 0, total_engagement: 0, hooks: [] };
    }
    categoryDist[cat].count += 1;
    const eng = hook.performance.engagement || 0;
    categoryDist[cat].total_engagement += eng;
    categoryDist[cat].hooks.push(hook.text);
  }

  // Calculate averages
  for (const cat of Object.values(categoryDist)) {
    cat.avg_engagement = cat.count > 0 ? Math.round(cat.total_engagement / cat.count) : 0;
    cat.top_hooks = cat.hooks.slice(0, 5);
    delete cat.hooks;
  }

  // Performance by category and source
  const performanceBySource = {};
  for (const hook of allHooks) {
    const key = `${hook.category}_${hook.source}`;
    if (!performanceBySource[key]) {
      performanceBySource[key] = { category: hook.category, source: hook.source, count: 0, total_engagement: 0 };
    }
    performanceBySource[key].count += 1;
    performanceBySource[key].total_engagement += hook.performance.engagement || 0;
  }

  // Top hooks by engagement
  const topHooks = [...allHooks]
    .filter((h) => h.performance.engagement)
    .sort((a, b) => (b.performance.engagement || 0) - (a.performance.engagement || 0))
    .slice(0, 30);

  // Best performing category
  const sortedCategories = Object.entries(categoryDist)
    .sort((a, b) => b[1].avg_engagement - a[1].avg_engagement);

  const output = {
    analyzed_at: new Date().toISOString(),
    total_hooks_analyzed: allHooks.length,
    sources: {
      paid_ads: allHooks.filter((h) => h.source === 'paid_ads').length,
      facebook_organic: allHooks.filter((h) => h.source === 'facebook_organic').length,
      instagram_organic: allHooks.filter((h) => h.source === 'instagram_organic').length,
      tiktok_organic: allHooks.filter((h) => h.source === 'tiktok_organic').length,
    },
    category_distribution: categoryDist,
    best_performing_category: sortedCategories[0] ? sortedCategories[0][0] : null,
    performance_by_source: Object.values(performanceBySource),
    top_hooks_by_engagement: topHooks.map((h) => ({
      text: h.text,
      category: h.category,
      source: h.source,
      engagement: h.performance.engagement,
      media_type: h.media_type,
    })),
    recommendations: generateRecommendations(categoryDist, sortedCategories),
  };

  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`Output saved to: ${OUTPUT_PATH}`);
  console.log(`Best performing hook category: ${output.best_performing_category}`);

  return output;
}

function generateRecommendations(categoryDist, sortedCategories) {
  const recommendations = [];

  if (sortedCategories.length > 0) {
    const best = sortedCategories[0];
    recommendations.push(`Focus on "${best[0]}" hooks -- highest avg engagement (${best[1].avg_engagement})`);
  }

  // Find underused categories
  const totalHooks = Object.values(categoryDist).reduce((sum, c) => sum + c.count, 0);
  for (const [cat, data] of Object.entries(categoryDist)) {
    const pct = (data.count / totalHooks) * 100;
    if (pct < 10 && data.avg_engagement > 0) {
      recommendations.push(`Test more "${cat}" hooks -- underused (${pct.toFixed(1)}%) but showing engagement`);
    }
  }

  if (!categoryDist.controversial || categoryDist.controversial.count < 3) {
    recommendations.push('Consider testing controversial/hot-take hooks -- often high engagement but low usage');
  }

  return recommendations;
}

run().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
