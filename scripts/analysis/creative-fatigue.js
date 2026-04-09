#!/usr/bin/env node

/**
 * Creative Fatigue Detector
 * Checks active ads for fatigue signals:
 * - Frequency > 3.5
 * - CTR declining 3+ consecutive days
 * - CPA increasing 3+ consecutive days
 * Returns list of fatigued creatives that need replacement.
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.resolve(__dirname, '../../data/shared/performance-data');
const OUTPUT_PATH = path.resolve(DATA_DIR, 'fatigue-report.json');
const THRESHOLDS_PATH = path.resolve(__dirname, '../../config/thresholds.json');

const DEFAULT_THRESHOLDS = {
  frequency_max: 3.5,
  ctr_decline_days: 3,
  cpa_increase_days: 3,
  ctr_decline_min_pct: 10,
  cpa_increase_min_pct: 15,
};

function loadThresholds() {
  if (fs.existsSync(THRESHOLDS_PATH)) {
    try {
      const config = JSON.parse(fs.readFileSync(THRESHOLDS_PATH, 'utf-8'));
      return { ...DEFAULT_THRESHOLDS, ...(config.fatigue || {}) };
    } catch (err) {
      console.warn(`Could not parse thresholds: ${err.message}, using defaults`);
    }
  }
  return DEFAULT_THRESHOLDS;
}

function loadSnapshots() {
  if (!fs.existsSync(DATA_DIR)) {
    console.warn(`Data directory not found: ${DATA_DIR}`);
    return [];
  }

  const files = fs.readdirSync(DATA_DIR)
    .filter((f) => f.startsWith('snapshot-') && f.endsWith('.json'))
    .sort()
    .slice(-20); // Last 20 snapshots

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
  if (!fs.existsSync(rollingPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(rollingPath, 'utf-8'));
  } catch (err) {
    console.warn(`Could not parse daily-rolling.json: ${err.message}`);
    return null;
  }
}

function buildAdTimeline(snapshots) {
  const timeline = {};

  for (const snapshot of snapshots) {
    const timestamp = snapshot.timestamp || snapshot.scraped_at;
    const ads = snapshot.ads || snapshot.campaigns || [];

    for (const ad of ads) {
      const adId = ad.ad_id || ad.id || ad.name;
      if (!adId) continue;

      if (!timeline[adId]) {
        timeline[adId] = {
          ad_id: adId,
          ad_name: ad.ad_name || ad.name || adId,
          campaign_name: ad.campaign_name || ad.campaign || null,
          data_points: [],
        };
      }

      timeline[adId].data_points.push({
        timestamp,
        frequency: parseFloat(ad.frequency) || null,
        ctr: parseFloat(ad.ctr) || null,
        cpa: parseFloat(ad.cpa) || null,
        cpc: parseFloat(ad.cpc) || null,
        spend: parseFloat(ad.spend) || null,
        impressions: parseInt(ad.impressions) || null,
        conversions: parseInt(ad.conversions) || null,
      });
    }
  }

  // Sort data points by timestamp
  for (const ad of Object.values(timeline)) {
    ad.data_points.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  return timeline;
}

function checkFatigue(adTimeline, thresholds) {
  const fatigued = [];

  for (const ad of Object.values(adTimeline)) {
    const points = ad.data_points;
    if (points.length < 2) continue;

    const latest = points[points.length - 1];
    const signals = [];

    // Check frequency
    if (latest.frequency && latest.frequency > thresholds.frequency_max) {
      signals.push({
        type: 'high_frequency',
        severity: latest.frequency > thresholds.frequency_max * 1.5 ? 'critical' : 'warning',
        value: latest.frequency,
        threshold: thresholds.frequency_max,
        message: `Frequency ${latest.frequency} exceeds threshold ${thresholds.frequency_max}`,
      });
    }

    // Check CTR declining trend
    const recentCTRs = points.slice(-thresholds.ctr_decline_days).map((p) => p.ctr).filter((v) => v !== null);
    if (recentCTRs.length >= thresholds.ctr_decline_days) {
      let declining = true;
      for (let i = 1; i < recentCTRs.length; i++) {
        if (recentCTRs[i] >= recentCTRs[i - 1]) {
          declining = false;
          break;
        }
      }
      if (declining) {
        const declinePct = ((recentCTRs[0] - recentCTRs[recentCTRs.length - 1]) / recentCTRs[0] * 100).toFixed(1);
        if (parseFloat(declinePct) >= thresholds.ctr_decline_min_pct) {
          signals.push({
            type: 'ctr_declining',
            severity: parseFloat(declinePct) > 25 ? 'critical' : 'warning',
            value: recentCTRs,
            decline_pct: declinePct + '%',
            days: thresholds.ctr_decline_days,
            message: `CTR declining for ${thresholds.ctr_decline_days}+ days (-${declinePct}%)`,
          });
        }
      }
    }

    // Check CPA increasing trend
    const recentCPAs = points.slice(-thresholds.cpa_increase_days).map((p) => p.cpa).filter((v) => v !== null);
    if (recentCPAs.length >= thresholds.cpa_increase_days) {
      let increasing = true;
      for (let i = 1; i < recentCPAs.length; i++) {
        if (recentCPAs[i] <= recentCPAs[i - 1]) {
          increasing = false;
          break;
        }
      }
      if (increasing) {
        const increasePct = ((recentCPAs[recentCPAs.length - 1] - recentCPAs[0]) / recentCPAs[0] * 100).toFixed(1);
        if (parseFloat(increasePct) >= thresholds.cpa_increase_min_pct) {
          signals.push({
            type: 'cpa_increasing',
            severity: parseFloat(increasePct) > 30 ? 'critical' : 'warning',
            value: recentCPAs,
            increase_pct: increasePct + '%',
            days: thresholds.cpa_increase_days,
            message: `CPA increasing for ${thresholds.cpa_increase_days}+ days (+${increasePct}%)`,
          });
        }
      }
    }

    if (signals.length > 0) {
      const hasCritical = signals.some((s) => s.severity === 'critical');
      fatigued.push({
        ad_id: ad.ad_id,
        ad_name: ad.ad_name,
        campaign_name: ad.campaign_name,
        overall_severity: hasCritical ? 'critical' : 'warning',
        signals: signals,
        latest_metrics: latest,
        recommendation: hasCritical ? 'REPLACE IMMEDIATELY' : 'PREPARE REPLACEMENT',
      });
    }
  }

  // Sort by severity (critical first)
  fatigued.sort((a, b) => {
    if (a.overall_severity === 'critical' && b.overall_severity !== 'critical') return -1;
    if (b.overall_severity === 'critical' && a.overall_severity !== 'critical') return 1;
    return b.signals.length - a.signals.length;
  });

  return fatigued;
}

async function run() {
  console.log('=== Creative Fatigue Detector ===');

  const thresholds = loadThresholds();
  console.log('Thresholds:', JSON.stringify(thresholds, null, 2));

  const snapshots = loadSnapshots();
  console.log(`Loaded ${snapshots.length} snapshots`);

  if (snapshots.length < 2) {
    console.log('Not enough data points for fatigue analysis (need at least 2 snapshots)');
    const output = {
      analyzed_at: new Date().toISOString(),
      status: 'insufficient_data',
      fatigued_creatives: [],
      total_ads_checked: 0,
      message: 'Not enough historical data for fatigue analysis',
    };
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
    return output;
  }

  const timeline = buildAdTimeline(snapshots);
  const fatigued = checkFatigue(timeline, thresholds);

  const output = {
    analyzed_at: new Date().toISOString(),
    status: fatigued.length > 0 ? 'fatigue_detected' : 'healthy',
    thresholds_used: thresholds,
    total_ads_checked: Object.keys(timeline).length,
    fatigued_count: fatigued.length,
    critical_count: fatigued.filter((f) => f.overall_severity === 'critical').length,
    warning_count: fatigued.filter((f) => f.overall_severity === 'warning').length,
    fatigued_creatives: fatigued,
    needs_creative_refresh: fatigued.some((f) => f.overall_severity === 'critical'),
  };

  if (!fs.existsSync(path.dirname(OUTPUT_PATH))) {
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`\nOutput saved to: ${OUTPUT_PATH}`);
  console.log(`Fatigued: ${fatigued.length} (${output.critical_count} critical, ${output.warning_count} warning)`);

  if (output.needs_creative_refresh) {
    console.log('\n*** CREATIVE REFRESH NEEDED -- trigger creative-refresh task ***');
  }

  return output;
}

run().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
