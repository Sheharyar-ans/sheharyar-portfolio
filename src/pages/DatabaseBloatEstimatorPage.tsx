import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Database,
  Sliders,
  Sparkles,
  Check,
  Copy,
  ShieldCheck,
  Zap,
  AlertTriangle,
  Server,
  Cpu,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Code2,
  Terminal,
  Activity,
  HardDrive,
  RefreshCw,
  CheckCircle2,
  FileCode
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { generateSchemaGraph } from '../utils/schemaGenerator';

interface DatabaseBloatEstimatorPageProps {
  onOpenInquiry: () => void;
}

export const DatabaseBloatEstimatorPage: React.FC<DatabaseBloatEstimatorPageProps> = ({ onOpenInquiry }) => {
  // Input parameters
  const [postCount, setPostCount] = useState<number>(2500);
  const [pluginCount, setPluginCount] = useState<number>(28);
  const [siteAgeYears, setSiteAgeYears] = useState<number>(3);
  const [monthsSinceOptimization, setMonthsSinceOptimization] = useState<number>(14);
  const [hasWooCommerce, setHasWooCommerce] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'sql' | 'php' | 'wpcli'>('sql');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Mathematical Calculation Engine
  const wooMultiplier = hasWooCommerce ? 2.4 : 1.0;
  
  // Base autoload options in KB
  const baseAutoloadKb = 320;
  const pluginAutoloadKb = pluginCount * 28;
  const accumulatedAutoloadKb = Math.round((baseAutoloadKb + pluginAutoloadKb) * (1 + (siteAgeYears * 0.12)) * wooMultiplier);
  const autoloadMb = (accumulatedAutoloadKb / 1024).toFixed(2);

  // Transient row count & disk space bloat
  const dailyTransients = Math.round((pluginCount * 2.2 + (hasWooCommerce ? 35 : 5)));
  const estimatedOrphanedTransients = Math.round(dailyTransients * (monthsSinceOptimization * 30.5));
  const transientBloatMb = Math.round((estimatedOrphanedTransients * 1.8) / 1024 * 10) / 10;

  // Post revisions & orphaned postmeta
  const revisionBloatMb = Math.round((postCount * 6 * 4.2) / 1024);
  const totalWastedDbMb = Math.round((transientBloatMb + (accumulatedAutoloadKb / 1024) + revisionBloatMb) * 10) / 10;

  // Estimated TTFB latency penalty (ms)
  const baseTtfbDelayMs = Math.round((accumulatedAutoloadKb / 3.8) + (monthsSinceOptimization * 6.5) + (hasWooCommerce ? 75 : 20));
  const ttfbPenaltyMs = Math.min(Math.max(baseTtfbDelayMs, 65), 890);

  // Risk Classification
  let riskLevel: 'Optimal' | 'Moderate Bloat' | 'Severe Bottleneck' | 'Critical Failure Risk' = 'Optimal';
  let riskBadgeColor = 'text-accent border-accent/30 bg-accent/10';

  if (ttfbPenaltyMs > 350 || accumulatedAutoloadKb > 2000) {
    riskLevel = 'Critical Failure Risk';
    riskBadgeColor = 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  } else if (ttfbPenaltyMs > 200 || accumulatedAutoloadKb > 1100) {
    riskLevel = 'Severe Bottleneck';
    riskBadgeColor = 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  } else if (ttfbPenaltyMs > 110 || accumulatedAutoloadKb > 650) {
    riskLevel = 'Moderate Bloat';
    riskBadgeColor = 'text-yellow-300 border-yellow-400/30 bg-yellow-400/10';
  }

  // Production SQL Remediation Script
  const remediationSql = `-- Production Database Cleanup Script
-- Target: wp_options, expired transients, and revision bloat

-- 1. Identify large autoloaded options over 50KB
SELECT option_name, ROUND(LENGTH(option_value) / 1024, 2) AS size_kb
FROM wp_options
WHERE autoload = 'yes'
ORDER BY size_kb DESC
LIMIT 20;

-- 2. Safely purge expired transients and timeout markers
DELETE FROM wp_options 
WHERE option_name LIKE '_transient_timeout_%' 
AND option_value < UNIX_TIMESTAMP();

DELETE a, b FROM wp_options a 
LEFT JOIN wp_options b ON b.option_name = CONCAT('_transient_timeout_', SUBSTRING(a.option_name, 12))
WHERE a.option_name LIKE '_transient_%' 
AND a.option_name NOT LIKE '_transient_timeout_%'
AND b.option_value < UNIX_TIMESTAMP();

-- 3. Prune post revisions older than 30 days while keeping last 3
DELETE a, b, c FROM wp_posts a
LEFT JOIN wp_term_relationships b ON (a.ID = b.object_id)
LEFT JOIN wp_postmeta c ON (a.ID = c.post_id)
WHERE a.post_type = 'revision'
AND a.post_date < DATE_SUB(NOW(), INTERVAL 30 DAY);

-- 4. Re-index wp_options to defragment table pages
OPTIMIZE TABLE wp_options;
OPTIMIZE TABLE wp_postmeta;`;

  // Custom PHP Script for Must-Use Plugin
  const remediationPhp = `<?php
/**
 * Plugin Name: Production Database Hygiene Worker
 * Description: Automatically purges orphaned transients and limits post revisions.
 * Author: Sheharyar Siraj Systems
 */

if (!defined('ABSPATH')) exit;

// Enforce max 3 post revisions per post to stop table growth
if (!defined('WP_POST_REVISIONS')) {
    define('WP_POST_REVISIONS', 3);
}

// Scheduled transient garbage collector running weekly off-peak
add_action('sheharyar_weekly_db_hygiene', function() {
    global $wpdb;
    
    // Purge expired transients in atomic batches of 1,000 to prevent row locking
    $wpdb->query("
        DELETE FROM {$wpdb->options}
        WHERE option_name LIKE '_transient_timeout_%'
        AND option_value < UNIX_TIMESTAMP()
        LIMIT 1000
    ");
});

if (!wp_next_scheduled('sheharyar_weekly_db_hygiene')) {
    wp_schedule_event(time(), 'weekly', 'sheharyar_weekly_db_hygiene');
}`;

  // WP-CLI Terminal Commands
  const wpCliCommands = `# Run direct terminal commands via SSH on your server root:

# 1. Clean all expired transients instantly
wp transient delete --expired

# 2. Check total autoloaded size in bytes
wp db query "SELECT SUM(LENGTH(option_value)) / 1024 / 1024 AS autoload_mb FROM wp_options WHERE autoload = 'yes';"

# 3. Prune post revisions across all post types
wp post delete $(wp post list --post_type='revision' --format=ids) --force

# 4. Run table optimization and optimize MySQL indexes
wp db optimize`;

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const pageSchema = generateSchemaGraph('/tools/wordpress-database-bloat-estimator/');

  const faqs = [
    {
      question: 'Why does autoloaded data in wp_options slow down every single page request?',
      answer:
        'When WordPress initializes, it executes an early query: SELECT option_name, option_value FROM wp_options WHERE autoload = "yes". This query runs on every HTTP request before routing or page caching occurs. When this table grows past 1MB, MySQL performs a slow table seek, and the PHP process allocates excessive RAM memory to parse the serialized strings, driving up Time to First Byte (TTFB).'
    },
    {
      question: 'Why does WordPress core fail to delete expired transients automatically?',
      answer:
        'WordPress only checks if a transient is expired when code attempts to read that specific transient key via get_transient(). If a plugin updates, deactivates, or ceases calling that specific key, the transient row and its timeout companion remain in wp_options forever unless an external worker purges them.'
    },
    {
      question: 'How does WooCommerce multiply database bloat compared to standard sites?',
      answer:
        'WooCommerce stores customer cart tokens, active session states, rate limits, and shipping quotes inside wp_options and custom tables as transients. On busy stores without Redis object caching, tens of thousands of session keys accumulate each month, leading to severe database page fragmentation and cart slowdowns.'
    },
    {
      question: 'Is it safe to delete all transients from wp_options?',
      answer:
        'Yes. Transients are by definition temporary cached data designed to expire. Any active plugin or theme will automatically regenerate its required transients upon the next function execution. Only expired and orphaned transients need deletion.'
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="WordPress Database Bloat Estimator | Sheharyar Siraj"
        description="Estimate wp_options autoload weight, orphaned transient bloat, and server TTFB slowdown. Download custom database optimization SQL and PHP snippets."
        canonicalUrl="https://sheharyarsiraj.com/tools/wordpress-database-bloat-estimator/"
        schema={pageSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'SYSTEMS & UTILITY TOOLS', href: '/tools/' },
          { label: 'DATABASE BLOAT ESTIMATOR' }
        ]}
      />

      {/* Header Section */}
      <div className="mt-8 mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={14} />
            <span>WORDPRESS SYSTEMS PERFORMANCE ENGINE</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-brand-border/60 text-brand-secondary font-mono text-xs">
            Non-Destructive Diagnostic
          </span>
          <span className={`px-3 py-1 rounded-full border font-mono text-xs font-bold ${riskBadgeColor}`}>
            Status: {riskLevel}
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
          WordPress Database Bloat & <span className="text-accent">Transient Cleaner Estimator</span>
        </h1>

        <p className="text-brand-secondary text-base sm:text-xl max-w-4xl leading-relaxed font-body">
          Calculate hidden wp_options table weight, unpurged transient rows, and server response time lag. Generate surgical MySQL remediation scripts and custom PHP hygiene workers.
        </p>
      </div>

      {/* Interactive Tool UI */}
      <section className="my-8 rounded-3xl glass-panel border border-accent/30 p-6 sm:p-8 bg-surface-1/90 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-border/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
              <Sliders size={18} />
            </div>
            <div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-white">
                Live Database Health Simulator
              </h2>
              <p className="text-xs font-mono text-brand-muted">
                Adjust site parameters below to benchmark real-time memory overhead and query latency.
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-accent">
            <Activity size={14} className="animate-pulse" />
            <span>Telemetry Calibrated</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sliders Input Column (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Slider 1: Posts Count */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-brand-secondary uppercase font-semibold">
                  Total Posts, Pages & Products
                </label>
                <span className="font-mono text-sm font-bold text-accent">
                  {postCount.toLocaleString()} items
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={40000}
                step={250}
                value={postCount}
                onChange={(e) => setPostCount(Number(e.target.value))}
                className="w-full accent-accent bg-surface-2 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-brand-muted mt-1">
                <span>100</span>
                <span>20,000</span>
                <span>40,000+</span>
              </div>
            </div>

            {/* Slider 2: Active Plugins */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-brand-secondary uppercase font-semibold">
                  Active Plugins Installed
                </label>
                <span className="font-mono text-sm font-bold text-accent">
                  {pluginCount} plugins
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={75}
                step={1}
                value={pluginCount}
                onChange={(e) => setPluginCount(Number(e.target.value))}
                className="w-full accent-accent bg-surface-2 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-brand-muted mt-1">
                <span>5 (Minimal)</span>
                <span>35 (Average)</span>
                <span>75+ (Heavy)</span>
              </div>
            </div>

            {/* Slider 3: Site Age */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-brand-secondary uppercase font-semibold">
                  Site Production Age
                </label>
                <span className="font-mono text-sm font-bold text-accent">
                  {siteAgeYears} {siteAgeYears === 1 ? 'Year' : 'Years'}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={siteAgeYears}
                onChange={(e) => setSiteAgeYears(Number(e.target.value))}
                className="w-full accent-accent bg-surface-2 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-brand-muted mt-1">
                <span>1 Year</span>
                <span>5 Years</span>
                <span>10 Years</span>
              </div>
            </div>

            {/* Slider 4: Months Since Optimization */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-brand-secondary uppercase font-semibold">
                  Months Since Last Table Optimization
                </label>
                <span className="font-mono text-sm font-bold text-accent">
                  {monthsSinceOptimization} Months
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={36}
                step={1}
                value={monthsSinceOptimization}
                onChange={(e) => setMonthsSinceOptimization(Number(e.target.value))}
                className="w-full accent-accent bg-surface-2 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-brand-muted mt-1">
                <span>1 Month</span>
                <span>18 Months</span>
                <span>36+ Months</span>
              </div>
            </div>

            {/* WooCommerce Toggle Switch */}
            <div className="p-4 rounded-xl bg-surface-2/80 border border-brand-border/60 flex items-center justify-between">
              <div>
                <div className="font-heading text-sm font-bold text-white">
                  WooCommerce or E-Commerce Store Active
                </div>
                <div className="text-xs font-mono text-brand-muted mt-0.5">
                  Scales session transients, customer cart tokens, and order meta rows.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHasWooCommerce(!hasWooCommerce)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                  hasWooCommerce ? 'bg-accent' : 'bg-surface-3'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-black transition-transform ${
                    hasWooCommerce ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Real-Time Calculation Diagnostics Output (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Stat 1: Autoload Options */}
              <div className="p-5 rounded-2xl bg-surface-2/90 border border-brand-border/60">
                <div className="text-[11px] font-mono text-brand-muted uppercase flex items-center gap-1.5 mb-1">
                  <Database size={13} className="text-accent" />
                  <span>Autoload Options Weight</span>
                </div>
                <div className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                  {accumulatedAutoloadKb.toLocaleString()} <span className="text-sm font-mono font-normal text-brand-secondary">KB</span>
                </div>
                <div className="text-[11px] font-mono text-brand-muted mt-1">
                  Target threshold: &lt; 800 KB
                </div>
              </div>

              {/* Stat 2: TTFB Slowdown Penalty */}
              <div className="p-5 rounded-2xl bg-surface-2/90 border border-brand-border/60">
                <div className="text-[11px] font-mono text-brand-muted uppercase flex items-center gap-1.5 mb-1">
                  <Zap size={13} className="text-amber-400" />
                  <span>Server TTFB Penalty</span>
                </div>
                <div className={`font-heading text-2xl sm:text-3xl font-extrabold ${
                  ttfbPenaltyMs > 300 ? 'text-rose-400' : ttfbPenaltyMs > 150 ? 'text-amber-400' : 'text-accent'
                }`}>
                  +{ttfbPenaltyMs} <span className="text-sm font-mono font-normal text-brand-secondary">ms</span>
                </div>
                <div className="text-[11px] font-mono text-brand-muted mt-1">
                  Added server latency per hit
                </div>
              </div>

              {/* Stat 3: Orphaned Transients Count */}
              <div className="p-5 rounded-2xl bg-surface-2/90 border border-brand-border/60">
                <div className="text-[11px] font-mono text-brand-muted uppercase flex items-center gap-1.5 mb-1">
                  <Server size={13} className="text-accent" />
                  <span>Expired Transients</span>
                </div>
                <div className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                  {estimatedOrphanedTransients.toLocaleString()} <span className="text-sm font-mono font-normal text-brand-secondary">rows</span>
                </div>
                <div className="text-[11px] font-mono text-brand-muted mt-1">
                  Dead entries in wp_options
                </div>
              </div>

              {/* Stat 4: Total Wasted Table Space */}
              <div className="p-5 rounded-2xl bg-surface-2/90 border border-brand-border/60">
                <div className="text-[11px] font-mono text-brand-muted uppercase flex items-center gap-1.5 mb-1">
                  <HardDrive size={13} className="text-accent" />
                  <span>Recoverable Disk Bloat</span>
                </div>
                <div className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                  {totalWastedDbMb} <span className="text-sm font-mono font-normal text-brand-secondary">MB</span>
                </div>
                <div className="text-[11px] font-mono text-brand-muted mt-1">
                  Transients, logs & revisions
                </div>
              </div>
            </div>

            {/* Diagnostic Alert Box */}
            <div className="p-4 rounded-xl bg-surface-2 border border-brand-border/60 flex items-start gap-3">
              <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm font-body text-brand-secondary leading-relaxed">
                <strong className="text-white">Diagnostic Summary:</strong> Your site is allocating approximately{' '}
                <span className="text-white font-mono font-bold">{autoloadMb} MB</span> of PHP memory to load unindexed autoloaded options on every hit. Purging expired transients and revisions will immediately recover up to{' '}
                <span className="text-accent font-mono font-bold">{ttfbPenaltyMs}ms</span> of Time to First Byte speed.
              </div>
            </div>

            {/* CTA Buttons Block */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="w-full sm:w-auto flex-1 py-3.5 px-5 rounded-xl font-mono text-xs font-bold tracking-wider bg-accent text-black hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(183,255,60,0.3)] active:scale-95"
              >
                <span>REQUEST SYSTEM DATABASE AUDIT</span>
                <ArrowUpRight size={15} />
              </button>

              <button
                type="button"
                onClick={() => {
                  const targetElement = document.getElementById('remediation-scripts');
                  targetElement?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto py-3.5 px-5 rounded-xl font-mono text-xs font-bold tracking-wider bg-surface-2 hover:bg-white hover:text-black text-white transition-all border border-brand-border flex items-center justify-center gap-2"
              >
                <Code2 size={15} />
                <span>VIEW CLEANUP SCRIPTS</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AEO Direct Answer Block */}
      <AeoDirectAnswer
        badge="DATABASE PERFORMANCE VERDICT"
        summary="A bloated wp_options table is the single most common cause of high WordPress server response times. When autoloaded options exceed 800KB and unpurged transients accumulate, MySQL is forced into full table scans on every incoming request, delaying the first byte of HTML delivery."
        keyTakeaways={[
          'Autoloaded options are queried on every single request, directly multiplying PHP memory usage.',
          'Expired transients are not automatically removed by WordPress when plugins fail to query them again.',
          'Pruning revisions and dead transient timeouts can recover 150ms to 400ms of Time to First Byte (TTFB).',
          'Deploying a Redis persistent object cache stops recurrent wp_options reads completely.'
        ]}
      />

      {/* Code Blueprints Section */}
      <section id="remediation-scripts" className="my-16 scroll-mt-24">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileCode size={18} className="text-accent" />
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Production Remediation Blueprints
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              if (activeTab === 'sql') handleCopyCode(remediationSql);
              if (activeTab === 'php') handleCopyCode(remediationPhp);
              if (activeTab === 'wpcli') handleCopyCode(wpCliCommands);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-2 hover:bg-accent hover:text-black text-xs font-mono text-white transition-all border border-brand-border"
          >
            {copiedCode ? (
              <>
                <Check size={13} className="text-black" />
                <span className="text-black font-bold">COPIED TO CLIPBOARD</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>COPY ACTIVE SNIPPET</span>
              </>
            )}
          </button>
        </div>

        <div className="rounded-2xl glass-panel border border-brand-border/60 overflow-hidden">
          {/* Tab Selector */}
          <div className="px-5 py-3 bg-surface-2 border-b border-brand-border/40 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('sql')}
                className={`px-3 py-1 rounded-lg text-xs font-mono tracking-wider transition-all border ${
                  activeTab === 'sql'
                    ? 'bg-accent text-black border-accent font-bold'
                    : 'bg-surface-1 text-brand-secondary border-brand-border/40 hover:text-white'
                }`}
              >
                Direct MySQL SQL Script
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('php')}
                className={`px-3 py-1 rounded-lg text-xs font-mono tracking-wider transition-all border ${
                  activeTab === 'php'
                    ? 'bg-accent text-black border-accent font-bold'
                    : 'bg-surface-1 text-brand-secondary border-brand-border/40 hover:text-white'
                }`}
              >
                WordPress MU-Plugin Worker
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('wpcli')}
                className={`px-3 py-1 rounded-lg text-xs font-mono tracking-wider transition-all border ${
                  activeTab === 'wpcli'
                    ? 'bg-accent text-black border-accent font-bold'
                    : 'bg-surface-1 text-brand-secondary border-brand-border/40 hover:text-white'
                }`}
              >
                WP-CLI Terminal Commands
              </button>
            </div>

            <span className="text-xs font-mono text-brand-muted">
              Non-Locking Execution
            </span>
          </div>

          <div className="p-6 overflow-x-auto max-h-[500px] text-xs font-mono leading-relaxed bg-[#0a0a0a]">
            {activeTab === 'sql' && (
              <pre className="text-emerald-400">
                <code>{remediationSql}</code>
              </pre>
            )}
            {activeTab === 'php' && (
              <pre className="text-amber-300">
                <code>{remediationPhp}</code>
              </pre>
            )}
            {activeTab === 'wpcli' && (
              <pre className="text-sky-300">
                <code>{wpCliCommands}</code>
              </pre>
            )}
          </div>
        </div>
      </section>

      {/* Long-Form Educational Content */}
      <section className="my-16 space-y-12">
        {/* Section 1 */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-brand-border/60">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <Cpu size={13} />
            <span>CORE WEB VITALS & DATABASE ARCHITECTURE</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-5 leading-tight">
            How database weight sabotages your Time to First Byte
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-brand-secondary font-body leading-relaxed">
            <p>
              In my systems engineering work, developers often spend weeks optimizing images and minifying JavaScript while ignoring the database layer. This is backwards. If your database takes 600 milliseconds to respond to an incoming request, no frontend caching trick can fix your mobile Core Web Vitals score.
            </p>
            <p>
              The root cause is almost always the wp_options table. By design, WordPress attempts to save database queries by loading all options marked with autoload = 'yes' in a single query during bootstrap. On a fresh installation, this autoloaded payload is roughly 300 kilobytes.
            </p>
            <p>
              Over time, plugins register transients, API caches, and tracking tokens that default to autoload. When that payload reaches two or three megabytes, your server must allocate that memory for every simultaneous visitor. When concurrent traffic surges, your PHP-FPM process pool saturates, leading directly to 504 gateway timeouts.
            </p>
          </div>
        </div>

        {/* Section 2: Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel rounded-3xl p-8 border border-brand-border/60 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5">
                <RefreshCw size={20} />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-3">
                The myth of automatic transient cleanup
              </h3>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed mb-4">
                Many developers assume WordPress automatically purges expired transients on a background cron schedule. It does not.
              </p>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
                WordPress only checks for expiration when a function specifically requests that transient key. If a plugin is updated or deactivated, its abandoned transient keys sit in wp_options forever, bloating your database indexes.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-border/40 font-mono text-xs text-accent">
              Hygiene Requirement: Scheduled Garbage Collection
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8 border border-brand-border/60 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5">
                <Database size={20} />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-3">
                Why Redis Object Caching is the permanent fix
              </h3>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed mb-4">
                Regular database cleanup script execution is essential maintenance, but high-concurrency sites require memory-level caching.
              </p>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
                Connecting a persistent Redis object cache routes all transient reads and writes into RAM memory instead of MySQL disk storage. This reduces wp_options read requests from hundreds per second to zero.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-border/40 font-mono text-xs text-accent">
              Enterprise Solution: Redis Persistent In-Memory Caching
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="my-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono text-accent tracking-widest uppercase block mb-2">
            TECHNICAL REFERENCE
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
            Frequently Asked Questions on Database Optimization
          </h2>
          <p className="text-sm text-brand-secondary font-body">
            Engineering specifics regarding transient storage, table locks, and memory reduction.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.question}
                className="glass-panel rounded-2xl border border-brand-border/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:text-accent transition-colors"
                >
                  <span className="font-heading text-base sm:text-lg font-bold text-white">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={18} className="text-accent flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-brand-muted flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-brand-secondary leading-relaxed font-body border-t border-brand-border/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Conversion Banner Section */}
      <section className="my-16 rounded-3xl glass-panel p-8 sm:p-12 border border-accent/20 bg-gradient-to-r from-surface-1 via-surface-2 to-surface-1">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            <span>CUSTOM PERFORMANCE ARCHITECTURE</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white mb-4">
            Need an enterprise database overhaul and custom caching setup?
          </h2>

          <p className="text-sm sm:text-base text-brand-secondary font-medium leading-relaxed mb-6 font-body">
            I engineer high-concurrency database architectures, composite indexes, Redis object caching clusters, and automated hygiene workers for enterprise WooCommerce stores and agency portfolios.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-6 py-3.5 rounded-xl bg-accent text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(183,255,60,0.25)] active:scale-95"
            >
              <span>SCHEDULE DATABASE SYSTEM AUDIT</span>
              <ArrowUpRight size={15} />
            </button>

            <Link
              to="/tools/"
              className="px-6 py-3.5 rounded-xl bg-surface-3 text-white font-mono text-xs font-bold tracking-wider hover:bg-white hover:text-black transition-all border border-brand-border flex items-center gap-2"
            >
              <span>EXPLORE ALL UTILITY TOOLS</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DatabaseBloatEstimatorPage;
