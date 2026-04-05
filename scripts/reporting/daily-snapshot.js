#!/usr/bin/env node

/**
 * Daily Snapshot Report
 * Aggregates all performance data into a daily summary.
 * Calculates: total spend, avg CPA, avg ROAS, top 3 ads, bottom 3 ads, budget pacing.
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.resolve(__dirname, '../../data/shared/performance-data');
const REPORTS_DIR = path.resolve(__dirname, '../../data/shared/reports/daily');
const BUDGETS_PATH = path.resolve(__dirname, '../../config/budgets.json');
const THRESHOLDS_PATH = path.resolve(__dirname, '../../config/thresholds.json');

function getYesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

function loadSnapshotsForDate(date) {
  if (!fs.existsSync(DATA_DIR)) return [];

  const files = fs.readdirSync(DATA_DIR)
    .filter((f) => f.startsWith('snapshot-') && f.includes(date) && f.endsWith('.json'))
    .sort();

  const snapshots = [];
  for (const file of files) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf-8'));
      snapshots.push(data);
    } catch (err) {
      console.warn(`Could not parse ${file}: ${err.message}`);
    }
  }

  return snapshots;
}

function loadDailyRolling() {
  const rollingPath = path.join(DATA_DIR, 'daily-rolling.json');
  if (!fs.existsSync(rollingPath)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(rollingPath, 'utf-8'));
    return Array.isArray(data) ? data : data.days || [];
  } catch (err) {
    return [];
  }
}

function loadBudgets() {
  if (!fs.existsSync(BUDGETS_PATH)) return null;
  try {
    return JSON.parse(fs.readFileSync(BUDGETS_PATH, 'utf-8'));
  } catch (err) {
    return null;
  }
}

function loadThresholds() {
  if (!fs.existsSync(THRESHOLDS_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(THRESHOLDS_PATH, 'utf-8'));
  } catch (err) {
    return {};
  }
}

function aggregateSnapshots(snapshots) {
  if (snapshots.length === 0) return null;

  // Use the latest snapshot as the primary source (most complete data)
  const latest = snapshots[snapshots.length - 1];
  const ads = latest.ads || latest.campaigns || [];

  let totalSpend = 0;
  let totalImpressions = 0;
  let totalClicks = 0;
  let totalConversions = 0;
  let totalRevenue = 0;
  const adMetrics = [];

  for (const ad of ads) {
    const spend = parseFloat(ad.spend) || 0;
    const impressions = parseInt(ad.impressions) || 0;
    const clicks = parseInt(ad.clicks) || 0;
    const conversions = parseInt(ad.conversions) || 0;
    const revenue = parseFloat(ad.revenue) || parseFloat(ad.purchase_value) || 0;
    const cpa = conversions > 0 ? spend / conversions : null;
    const roas = spend > 0 ? revenue / spend : null;
    const ctr = impressions > 0 ? (clicks / impressions * 100) : null;
    const cpm = impressions > 0 ? (spend / impressions * 1000) : null;

    totalSpend += spend;
    totalImpressions += impressions;
    totalClicks += clicks;
    totalConversions += conversions;
    totalRevenue += revenue;

    adMetrics.push({
      ad_id: ad.ad_id || ad.id || ad.name,
      ad_name: ad.ad_name || ad.name,
      campaign_name: ad.campaign_name || ad.campaign,
      spend, impressions, clicks, conversions, revenue,
      cpa, roas, ctr, cpm,
      frequency: parseFloat(ad.frequency) || null,
    });
  }

  // Sort for top/bottom
  const byPerformance = [...adMetrics].filter((a) => a.cpa !== null);
  const topByCPA = byPerformance.sort((a, b) => a.cpa - b.cpa).slice(0, 3);
  const bottomByCPA = byPerformance.sort((a, b) => b.cpa - a.cpa).slice(0, 3);

  const byROAS = [...adMetrics].filter((a) => a.roas !== null);
  const topByROAS = byROAS.sort((a, b) => b.roas - a.roas).slice(0, 3);

  return {
    total_spend: round2(totalSpend),
    total_impressions: totalImpressions,
    total_clicks: totalClicks,
    total_conversions: totalConversions,
    total_revenue: round2(totalRevenue),
    avg_cpa: totalConversions > 0 ? round2(totalSpend / totalConversions) : null,
    avg_roas: totalSpend > 0 ? round2(totalRevenue / totalSpend) : null,
    avg_ctr: totalImpressions > 0 ? round2(totalClicks / totalImpressions * 100) : null,
    avg_cpm: totalImpressions > 0 ? round2(totalSpend / totalImpressions * 1000) : null,
    avg_cpc: totalClicks > 0 ? round2(totalSpend / totalClicks) : null,
    active_ads: adMetrics.length,
    top_3_by_cpa: topByCPA,
    bottom_3_by_cpa: bottomByCPA,
    top_3_by_roas: topByROAS,
    all_ads: adMetrics,
  };
}

function calculateBudgetPacing(totalSpend, budgets) {
  if (!budgets) return null;

  const now = new Date();
  const dayOfMonth = now.getDate();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const monthlyBudget = budgets.monthly_budget || 0;
  const dailyBudget = budgets.daily_budget || (monthlyBudget / daysInMonth);

  if (monthlyBudget === 0) return null;

  // Load all daily reports for this month to get month-to-date spend
  const monthStr = now.toISOString().slice(0, 7); // YYYY-MM
  let mtdSpend = totalSpend; // Today's spend

  if (fs.existsSync(REPORTS_DIR)) {
    const monthReports = fs.readdirSync(REPORTS_DIR)
      .filter((f) => f.startsWith(monthStr) && f.endsWith('.json'));

    for (const file of monthReports) {
      try {
        const report = JSON.parse(fs.readFileSync(path.join(REPORTS_DIR, file), 'utf-8'));
        mtdSpend += report.metrics?.total_spend || 0;
      } catch (err) {
        // skip
      }
    }
  }

  const expectedSpend = dailyBudget * dayOfMonth;
  const pacingPct = expectedSpend > 0 ? round2((mtdSpend / expectedSpend) * 100) : 0;
  const projectedMonthEnd = daysInMonth > 0 ? round2((mtdSpend / dayOfMonth) * daysInMonth) : 0;
  const remainingBudget = round2(monthlyBudget - mtdSpend);
  const remainingDays = daysInMonth - dayOfMonth;
  const recommendedDailyBudget = remainingDays > 0 ? round2(remainingBudget / remainingDays) : 0;

  return {
    monthly_budget: monthlyBudget,
    daily_budget: round2(dailyBudget),
    mtd_spend: round2(mtdSpend),
    expected_mtd_spend: round2(expectedSpend),
    pacing_pct: pacingPct,
    pacing_status: pacingPct > 110 ? 'overpacing' : pacingPct < 85 ? 'underpacing' : 'on_track',
    projected_month_end: projectedMonthEnd,
    remaining_budget: remainingBudget,
    remaining_days: remainingDays,
    recommended_daily_budget: recommendedDailyBudget,
  };
}

function calculateTrends(rollingData, currentMetrics) {
  if (!rollingData || rollingData.length === 0 || !currentMetrics) return null;

  const yesterday = rollingData[rollingData.length - 1];
  if (!yesterday) return null;

  function trend(current, previous) {
    if (!current || !previous || previous === 0) return { direction: 'flat', change_pct: 0 };
    const change = ((current - previous) / previous * 100);
    return {
      direction: change > 2 ? 'up' : change < -2 ? 'down' : 'flat',
      change_pct: round2(change),
    };
  }

  return {
    cpa: trend(currentMetrics.avg_cpa, yesterday.avg_cpa),
    roas: trend(currentMetrics.avg_roas, yesterday.avg_roas),
    spend: trend(currentMetrics.total_spend, yesterday.total_spend),
    ctr: trend(currentMetrics.avg_ctr, yesterday.avg_ctr),
    conversions: trend(currentMetrics.total_conversions, yesterday.total_conversions),
  };
}

function round2(num) {
  return Math.round(num * 100) / 100;
}

async function run() {
  const reportDate = process.argv[2] || getYesterday();
  console.log(`=== Daily Snapshot Report for ${reportDate} ===`);

  const snapshots = loadSnapshotsForDate(reportDate);
  console.log(`Found ${snapshots.length} snapshots for ${reportDate}`);

  const metrics = aggregateSnapshots(snapshots);
  if (!metrics) {
    console.log('No data found for this date');
    const output = { date: reportDate, status: 'no_data', metrics: null };
    if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true });
    fs.writeFileSync(path.join(REPORTS_DIR, `${reportDate}.json`), JSON.stringify(output, null, 2));
    return output;
  }

  const budgets = loadBudgets();
  const thresholds = loadThresholds();
  const rollingData = loadDailyRolling();
  const pacing = calculateBudgetPacing(metrics.total_spend, budgets);
  const trends = calculateTrends(rollingData, metrics);

  // Check for action items
  const actionItems = [];
  if (thresholds.target_cpa && metrics.avg_cpa > thresholds.target_cpa * 1.5) {
    actionItems.push(`CPA ($${metrics.avg_cpa}) is 50%+ above target ($${thresholds.target_cpa})`);
  }
  if (thresholds.target_roas && metrics.avg_roas < thresholds.target_roas * 0.7) {
    actionItems.push(`ROAS (${metrics.avg_roas}x) is 30%+ below target (${thresholds.target_roas}x)`);
  }
  if (pacing && pacing.pacing_status === 'overpacing') {
    actionItems.push(`Budget overpacing at ${pacing.pacing_pct}% -- reduce daily budgets`);
  }
  if (pacing && pacing.pacing_status === 'underpacing') {
    actionItems.push(`Budget underpacing at ${pacing.pacing_pct}% -- increase daily budgets or launch new ads`);
  }

  // Determine health
  let health = 'green';
  if (actionItems.length > 0) health = 'yellow';
  if (actionItems.length > 2) health = 'red';

  const output = {
    date: reportDate,
    generated_at: new Date().toISOString(),
    health: health,
    metrics: metrics,
    budget_pacing: pacing,
    trends: trends,
    action_items: actionItems,
    thresholds_used: thresholds,
  };

  // Remove all_ads from the report to keep it concise
  const reportOutput = { ...output };
  if (reportOutput.metrics) {
    reportOutput.metrics = { ...reportOutput.metrics };
    delete reportOutput.metrics.all_ads;
  }

  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }

  fs.writeFileSync(path.join(REPORTS_DIR, `${reportDate}.json`), JSON.stringify(reportOutput, null, 2));
  console.log(`\nReport saved to: ${REPORTS_DIR}/${reportDate}.json`);
  console.log(`Health: ${health}`);
  console.log(`Spend: $${metrics.total_spend}, CPA: $${metrics.avg_cpa}, ROAS: ${metrics.avg_roas}x`);

  if (actionItems.length > 0) {
    console.log('\nAction Items:');
    for (const item of actionItems) {
      console.log(`  - ${item}`);
    }
  }

  // Append to rolling data
  const rollingEntry = {
    date: reportDate,
    total_spend: metrics.total_spend,
    avg_cpa: metrics.avg_cpa,
    avg_roas: metrics.avg_roas,
    avg_ctr: metrics.avg_ctr,
    total_conversions: metrics.total_conversions,
    active_ads: metrics.active_ads,
    health: health,
  };

  rollingData.push(rollingEntry);
  // Keep last 90 days
  const trimmed = rollingData.slice(-90);
  fs.writeFileSync(path.join(DATA_DIR, 'daily-rolling.json'), JSON.stringify(trimmed, null, 2));

  return output;
}

run().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
