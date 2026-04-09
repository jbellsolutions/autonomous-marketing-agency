#!/usr/bin/env node

/**
 * Ads Manager Monitor - Browser Automation Instructions
 *
 * This file provides structured instructions for the Claude Code agent
 * when it needs to read data from Facebook Ads Manager via browser automation.
 *
 * The agent uses Claude in Chrome MCP tools to:
 * 1. Navigate to Ads Manager
 * 2. Read the campaign table
 * 3. Extract metrics into structured JSON
 *
 * This is NOT a standalone script -- it is a reference/helper that the
 * ads-monitor-30min scheduled task agent follows.
 */

const path = require('path');

const ADS_MANAGER_URL = 'https://adsmanager.facebook.com';
const OUTPUT_DIR = path.resolve(__dirname, '../../data/shared/performance-data');

/**
 * Steps the Claude agent should follow when monitoring Ads Manager.
 * These are exported as structured instructions.
 */
const MONITOR_STEPS = {
  step1_navigate: {
    description: 'Navigate to Facebook Ads Manager',
    actions: [
      'Use tabs_context_mcp to get available browser tabs',
      'Use navigate to go to ' + ADS_MANAGER_URL,
      'Wait 3 seconds for page load',
      'Take a screenshot to verify the page loaded correctly',
      'If a login wall appears, STOP and alert Slack -- do not attempt login',
    ],
  },

  step2_check_auth: {
    description: 'Verify authentication status',
    actions: [
      'Use read_page to check for campaign table elements',
      'Look for elements like "Campaign Name", "Delivery", "Budget" columns',
      'If login form is detected instead, report auth failure and exit',
    ],
    auth_failure_indicators: [
      'input[type="email"]',
      'input[type="password"]',
      'Log In button',
      'Create New Account',
    ],
  },

  step3_set_date_range: {
    description: 'Set the reporting date range to today',
    actions: [
      'Find the date range picker (usually top-right of Ads Manager)',
      'Click to open the date picker',
      'Select "Today" from the preset options',
      'Wait for data to refresh',
    ],
  },

  step4_read_campaign_table: {
    description: 'Extract campaign-level metrics from the table',
    actions: [
      'Use read_page to get the campaign table content',
      'For each row in the campaigns table, extract all visible columns',
      'Common columns: Campaign Name, Delivery Status, Budget, Spend, Impressions, Clicks, CTR, CPC, CPM, Conversions, CPA, ROAS, Frequency',
      'Use find or read_page with specific selectors if the table is complex',
    ],
    expected_fields: [
      'campaign_name', 'status', 'budget', 'spend', 'impressions',
      'clicks', 'ctr', 'cpc', 'cpm', 'conversions', 'cpa', 'roas', 'frequency',
    ],
  },

  step5_drill_into_campaigns: {
    description: 'For campaigns with threshold breaches, drill into ad set and ad level',
    actions: [
      'Click on the campaign name to view ad sets',
      'Read the ad set table with same metric extraction',
      'Click into each ad set to view individual ads',
      'Read ad-level metrics',
      'Navigate back to campaign level when done',
    ],
  },

  step6_extract_metrics: {
    description: 'Parse extracted text into structured JSON',
    parse_rules: [
      'Strip currency symbols ($) and commas from numeric values',
      'Convert percentage strings (e.g., "1.5%") to decimal numbers',
      'Parse "K" and "M" suffixes (e.g., "1.5K" = 1500)',
      'Handle "N/A" or "--" as null values',
      'Ensure all numeric fields are actual numbers, not strings',
    ],
  },
};

/**
 * Threshold checks to apply to extracted metrics.
 */
const DEFAULT_THRESHOLDS = {
  critical: {
    cpa_multiplier: 2.0,     // CPA > 2x target
    spend_over_budget: 1.2,  // Daily spend > 120% of budget
  },
  warning: {
    frequency_max: 3.5,
    ctr_min: 0.5,
    roas_min: null,  // Set from config/thresholds.json (breakeven ROAS)
  },
  info: {
    spend_under_budget: 0.5, // Spending < 50% of budget
  },
};

/**
 * Output format for the snapshot file.
 */
const SNAPSHOT_TEMPLATE = {
  timestamp: null,        // ISO 8601 timestamp
  source: 'ads_manager_browser',
  date_range: 'today',
  campaigns: [],          // Array of campaign objects
  ad_sets: [],            // Array of ad set objects (for drilled-down campaigns)
  ads: [],                // Array of ad objects (for drilled-down ad sets)
  threshold_breaches: [], // Array of breach objects
  summary: {
    total_spend: 0,
    total_impressions: 0,
    total_clicks: 0,
    total_conversions: 0,
    avg_cpa: null,
    avg_roas: null,
    avg_ctr: null,
    active_campaigns: 0,
  },
};

/**
 * Generate the output filename with timestamp.
 */
function getOutputPath() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return path.join(OUTPUT_DIR, `snapshot-${timestamp}.json`);
}

/**
 * Format a Slack alert message for threshold breaches.
 */
function formatSlackAlert(breaches, severity) {
  const icons = { critical: '!!!', warning: '!', info: 'i' };
  const icon = icons[severity] || 'i';

  let message = `[${icon}] Ads Manager Alert (${severity.toUpperCase()})\n`;
  message += `Time: ${new Date().toLocaleString()}\n\n`;

  for (const breach of breaches) {
    message += `${breach.campaign_name || breach.ad_name}: ${breach.message}\n`;
    message += `  Current: ${breach.current_value} | Threshold: ${breach.threshold_value}\n\n`;
  }

  return message;
}

// Export for use by other scripts or for reference
module.exports = {
  ADS_MANAGER_URL,
  OUTPUT_DIR,
  MONITOR_STEPS,
  DEFAULT_THRESHOLDS,
  SNAPSHOT_TEMPLATE,
  getOutputPath,
  formatSlackAlert,
};

// If run directly, print the instructions
if (require.main === module) {
  console.log('=== Ads Manager Monitor - Browser Automation Instructions ===\n');
  console.log('This file provides instructions for the Claude agent to follow');
  console.log('when reading data from Facebook Ads Manager.\n');
  console.log('Steps:');
  for (const [key, step] of Object.entries(MONITOR_STEPS)) {
    console.log(`\n${key}: ${step.description}`);
    for (const action of step.actions) {
      console.log(`  - ${action}`);
    }
  }
  console.log('\nOutput path:', getOutputPath());
}
