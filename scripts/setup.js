#!/usr/bin/env node

/**
 * Setup Validator
 * Validates environment, directories, config files, and Eddie symlink.
 * Run this before any other scripts to ensure the system is properly configured.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const REQUIRED_ENV_KEYS = [
  'APIFY_API_TOKEN',
  'SLACK_WEBHOOK_URL',
  'FACEBOOK_PAGE_ID',
  'META_AD_ACCOUNT_ID',
];

const REQUIRED_DIRS = [
  'data/shared/winning-patterns/paid-ads',
  'data/shared/winning-patterns/organic',
  'data/shared/performance-data',
  'data/shared/reports/daily',
  'data/shared/reports/weekly',
  'data/shared/creative-output',
  'data/shared/eddie-briefs',
  'data/shared/content-queue',
  'data/shared/community',
  'brand-voice',
  'config',
  'scripts/scrapers',
  'scripts/analysis',
  'scripts/reporting',
  'scripts/browser-automation',
  'agents/division-3-eddie',
  'templates',
  'scheduled-tasks',
];

const REQUIRED_CONFIGS = [
  'config/thresholds.json',
  'config/ad-accounts.json',
  'config/organic-targets.json',
  'config/budgets.json',
  'config/community-rules.json',
];

const EDDIE_SYMLINK = path.join(ROOT, 'eddie-vibe-marketer');

function checkEnv() {
  const results = { passed: [], failed: [] };
  const envPath = path.join(ROOT, '.env');

  if (!fs.existsSync(envPath)) {
    console.error('[FAIL] .env file not found at', envPath);
    console.error('       Copy .env.example to .env and fill in your values.');
    results.failed.push('.env file missing');
    return results;
  }

  for (const key of REQUIRED_ENV_KEYS) {
    if (process.env[key] && process.env[key].trim() !== '') {
      results.passed.push(key);
    } else {
      results.failed.push(key);
    }
  }

  return results;
}

function checkDirectories() {
  const results = { passed: [], failed: [], created: [] };

  for (const dir of REQUIRED_DIRS) {
    const fullPath = path.join(ROOT, dir);
    if (fs.existsSync(fullPath)) {
      results.passed.push(dir);
    } else {
      try {
        fs.mkdirSync(fullPath, { recursive: true });
        results.created.push(dir);
      } catch (err) {
        results.failed.push({ dir, error: err.message });
      }
    }
  }

  return results;
}

function checkConfigs() {
  const results = { passed: [], failed: [], templates: [] };

  for (const configFile of REQUIRED_CONFIGS) {
    const fullPath = path.join(ROOT, configFile);
    if (fs.existsSync(fullPath)) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        JSON.parse(content);
        results.passed.push(configFile);
      } catch (err) {
        results.failed.push({ file: configFile, error: 'Invalid JSON: ' + err.message });
      }
    } else {
      results.failed.push({ file: configFile, error: 'File not found' });
      results.templates.push(configFile);
    }
  }

  return results;
}

function checkEddieSymlink() {
  const result = { exists: false, valid: false, target: null };

  if (fs.existsSync(EDDIE_SYMLINK)) {
    result.exists = true;
    try {
      const stats = fs.lstatSync(EDDIE_SYMLINK);
      if (stats.isSymbolicLink()) {
        result.target = fs.readlinkSync(EDDIE_SYMLINK);
        result.valid = fs.existsSync(EDDIE_SYMLINK);
      } else if (stats.isDirectory()) {
        result.target = 'direct directory (not symlink)';
        result.valid = true;
      }
    } catch (err) {
      result.error = err.message;
    }
  }

  return result;
}

function run() {
  console.log('=== Facebook Marketing Agency Setup Validator ===\n');

  // Check environment
  console.log('1. Environment Variables');
  const envResults = checkEnv();
  for (const key of envResults.passed) {
    console.log(`   [OK] ${key}`);
  }
  for (const key of envResults.failed) {
    console.log(`   [FAIL] ${key} - not set or empty`);
  }
  console.log();

  // Check directories
  console.log('2. Required Directories');
  const dirResults = checkDirectories();
  for (const dir of dirResults.passed) {
    console.log(`   [OK] ${dir}`);
  }
  for (const dir of dirResults.created) {
    console.log(`   [CREATED] ${dir}`);
  }
  for (const item of dirResults.failed) {
    console.log(`   [FAIL] ${item.dir} - ${item.error}`);
  }
  console.log();

  // Check configs
  console.log('3. Configuration Files');
  const configResults = checkConfigs();
  for (const file of configResults.passed) {
    console.log(`   [OK] ${file}`);
  }
  for (const item of configResults.failed) {
    console.log(`   [FAIL] ${item.file} - ${item.error}`);
  }
  console.log();

  // Check Eddie symlink
  console.log('4. Eddie Vibe Marketer Symlink');
  const eddieResult = checkEddieSymlink();
  if (eddieResult.valid) {
    console.log(`   [OK] eddie-vibe-marketer -> ${eddieResult.target}`);
  } else if (eddieResult.exists) {
    console.log(`   [FAIL] Symlink exists but target is invalid: ${eddieResult.error || 'broken link'}`);
  } else {
    console.log('   [FAIL] eddie-vibe-marketer symlink not found');
    console.log('   Run: ln -s /path/to/eddie-vibe-marketer eddie-vibe-marketer');
  }
  console.log();

  // Summary
  const totalFailed = envResults.failed.length + dirResults.failed.length +
    configResults.failed.length + (eddieResult.valid ? 0 : 1);
  const totalPassed = envResults.passed.length + dirResults.passed.length +
    dirResults.created.length + configResults.passed.length + (eddieResult.valid ? 1 : 0);

  console.log('=== Summary ===');
  console.log(`Passed: ${totalPassed}`);
  console.log(`Failed: ${totalFailed}`);
  console.log(`Created: ${dirResults.created.length} directories`);

  if (totalFailed > 0) {
    console.log('\nSetup is incomplete. Fix the issues above before running the system.');
    process.exit(1);
  } else {
    console.log('\nAll checks passed. System is ready.');
    process.exit(0);
  }

  // Output as JSON for programmatic consumption
  const output = {
    timestamp: new Date().toISOString(),
    status: totalFailed > 0 ? 'incomplete' : 'ready',
    env: envResults,
    directories: dirResults,
    configs: configResults,
    eddie: eddieResult,
    summary: { passed: totalPassed, failed: totalFailed, created: dirResults.created.length },
  };

  return output;
}

run();
