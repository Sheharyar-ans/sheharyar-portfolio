export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  category: 'Local SEO' | 'AI & Voice' | 'Database Optimization' | 'Workflow Automation' | 'E-Commerce' | 'WordPress & PHP';
  categoryBadge: string;
  shortDescription: string;
  fullDescription: string;
  problemStatement: string;
  solutionArchitecture: string;
  ctaText: string;
  targetUrl: string;
  techStack: string[];
  metric: string;
  metricLabel: string;
  statusBadge: string;
  codeSnippet: string;
  codeLanguage: string;
  interactiveType: 'schema-builder' | 'voice-simulator' | 'token-budget' | 'db-indexer' | 'webhook-tester' | 'cart-stress' | 'hook-matrix';
  features: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const TOOLS_TAXONOMY: Record<string, ToolItem> = {
  'local-schema-generator': {
    id: 'tool-01',
    slug: 'local-schema-generator',
    name: 'AI-Powered Local Schema & Entity Graph Generator',
    category: 'Local SEO',
    categoryBadge: 'Local SEO & GEO',
    shortDescription: 'Builds connected JSON-LD LocalBusiness schema graphs and markdown LLMs.txt manifests for search engine AI scrapers, Google Map pack rankings, and AI Overviews.',
    fullDescription: 'Eliminates fragmented schema markup by compiling validated LocalBusiness, PostalAddress, GeoCoordinates, and Service graphs alongside structured LLMs.txt manifests for AI discovery engines.',
    problemStatement: 'Disconnected schema markup and missing LLMs.txt manifests cause AI discovery engines and Google Map pack crawlers to miss key entity relationships.',
    solutionArchitecture: 'Generates zero-overhead, multi-entity connected JSON-LD graph structures with geo-coordinates, opening hours, department nesting, and LLMs.txt markdown manifests.',
    ctaText: 'LAUNCH SCHEMA GENERATOR',
    targetUrl: '/tools/local-schema-generator/',
    techStack: ['Schema.org v26', 'JSON-LD', 'LLMs.txt', 'Google Rich Results', 'Next-Gen SEO'],
    metric: '100% Graph Connectivity',
    metricLabel: 'AI Overview Readiness',
    statusBadge: 'Production Utility',
    interactiveType: 'schema-builder',
    features: [
      'Nested Multi-Location PostalAddress and GeoCoordinates graph generation',
      'LLMs.txt markdown manifest exporter for ChatGPT and Perplexity crawlers',
      'Native Google Rich Results and AEO answer target validation',
      'Zero database queries and 0KB frontend JavaScript overhead'
    ],
    codeSnippet: `add_action('wp_head', function(): void {
    $schema = [
        '@context' => 'https://schema.org',
        '@graph'   => [
            [
                '@type'       => 'LocalBusiness',
                '@id'         => home_url('/#business'),
                'name'        => get_bloginfo('name'),
                'url'         => home_url('/'),
                'telephone'   => '+1-800-555-0199',
                'address'     => [
                    '@type'           => 'PostalAddress',
                    'streetAddress'   => '100 Tech Center Blvd, Suite 400',
                    'addressLocality'  => 'Austin',
                    'addressRegion'    => 'TX',
                    'postalCode'       => '78701',
                    'addressCountry'   => 'US',
                ],
            ],
        ],
    ];
    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\\n";
}, 5);`,
    codeLanguage: 'php',
    faqs: [
      {
        question: 'Why is custom JSON-LD better than Yoast or Rank Math schema?',
        answer: 'Heavy SEO plugins create bloated databases with dozens of unused postmeta rows and duplicate schema nodes. Custom JSON-LD injected through WordPress hooks executes in less than 0.1ms with zero database writes and 100% graph connectivity.'
      },
      {
        question: 'Does this schema comply with Google Rich Results for local businesses?',
        answer: 'Yes. All generated structures follow Schema.org v26 and Google LocalBusiness guidelines, passing both the Rich Results Test and Schema Markup Validator without warnings.'
      }
    ]
  },

  'wordpress-database-bloat-estimator': {
    id: 'tool-02',
    slug: 'wordpress-database-bloat-estimator',
    name: 'WordPress Database Bloat & Transient Cleaner Estimator',
    category: 'Database Optimization',
    categoryBadge: 'Database & TTFB',
    shortDescription: 'Audits wp_options autoload weight, orphaned transient bloat, and server TTFB slowdown. Exports custom optimization SQL queries and PHP cleanup scripts.',
    fullDescription: 'Analyzes wp_options table bloat, calculates server Time to First Byte (TTFB) degradation caused by stale transients, and compiles custom SQL index optimization snippets.',
    problemStatement: 'Bloated wp_options tables with hundreds of orphaned transients inflate memory usage and cause high TTFB on high-traffic WordPress builds.',
    solutionArchitecture: 'Identifies stale transient keys, quantifies autoload memory footprint, and exports non-destructive database remediation SQL and PHP snippets.',
    ctaText: 'ANALYZE DATABASE BLOAT',
    targetUrl: '/tools/wordpress-database-bloat-estimator/',
    techStack: ['MySQL 8.0', 'InnoDB', 'WordPress Transients', 'Redis Cache', 'PHP 8.2+'],
    metric: 'Sub-50ms TTFB Target',
    metricLabel: 'Autoload Weight Reduction',
    statusBadge: 'Database Performance',
    interactiveType: 'db-indexer',
    features: [
      'Automated autoloaded options memory footprint estimator',
      'Orphaned transient identification and row count counter',
      'Custom SQL index generator for high-concurrency option tables',
      'Drop-in mu-plugin cron cleanup script with zero manual queries'
    ],
    codeSnippet: `-- Optimize wp_options autoload query speed
CREATE INDEX autoload_idx ON wp_options (autoload, option_name);

-- Delete orphaned transients safely
DELETE FROM wp_options WHERE option_name LIKE '_transient_%' 
AND option_name NOT LIKE '_transient_timeout_%';`,
    codeLanguage: 'sql',
    faqs: [
      {
        question: 'Why does autoloaded data slow down WordPress page loads?',
        answer: 'WordPress loads every option with autoload = yes into server memory on every request. When this dataset exceeds 800KB, it spikes TTFB and consumes excessive Redis memory.'
      },
      {
        question: 'Is it safe to delete expired transients directly via SQL?',
        answer: 'Yes. Transients are temporary cached items. WordPress core automatically regenerates them on demand if they are missing.'
      }
    ]
  },

  'wordpress-cpt-code-exporter': {
    id: 'tool-03',
    slug: 'wordpress-cpt-code-exporter',
    name: 'WordPress Custom Post Type & Meta Field Code Exporter',
    category: 'WordPress & PHP',
    categoryBadge: 'PHP Architecture',
    shortDescription: 'Generates production-ready PHP 8.2 code for WordPress custom post types, taxonomies, and custom meta boxes with strict nonce verification and zero plugin bloat.',
    fullDescription: 'Replaces heavy UI generator plugins with pure, opcode-cached PHP 8.2 post type registrations, Gutenberg REST API endpoints, and sanitized meta box handlers.',
    problemStatement: 'UI post type plugins store schema in wp_options and serialize database lookups on every request, creating database overhead and update dependencies.',
    solutionArchitecture: 'Exports pure object-oriented PHP 8.2 registration code for wp-content/mu-plugins with strict nonces, user capability checks, and REST API support.',
    ctaText: 'EXPORT CPT CODE',
    targetUrl: '/tools/wordpress-cpt-code-exporter/',
    techStack: ['PHP 8.2+', 'WordPress VIP Go', 'REST API v2', 'Gutenberg Blocks', 'WPCS'],
    metric: '0.00KB Plugin Overhead',
    metricLabel: 'Opcode Cache Execution',
    statusBadge: 'Clean Architecture',
    interactiveType: 'hook-matrix',
    features: [
      'Native PHP 8.2 post type registration with full label internationalization',
      'Gutenberg and headless REST API controller integration',
      'ACF local PHP field group exporter for version-controlled meta fields',
      'Security-hardened custom meta box save routines with strict nonces'
    ],
    codeSnippet: `add_action('init', function(): void {
    register_post_type('case_study', [
        'labels'        => ['name' => __('Case Studies', 'sheharyar')],
        'public'        => true,
        'has_archive'   => true,
        'show_in_rest'  => true,
        'supports'      => ['title', 'editor', 'thumbnail', 'excerpt'],
        'menu_icon'     => 'dashicons-portfolio',
    ]);
});`,
    codeLanguage: 'php',
    faqs: [
      {
        question: 'Why should I register custom post types in code instead of UI plugins?',
        answer: 'Code registrations execute directly via PHP opcode cache in fractions of a millisecond, eliminate database queries during bootstrap, and can be version-controlled in Git.'
      },
      {
        question: 'Where should I install this exported code?',
        answer: 'Place the generated PHP file inside wp-content/mu-plugins/ to guarantee it stays active across theme updates and cannot be accidentally disabled by dashboard users.'
      }
    ]
  },

  'wordpress-plugin-boilerplate-generator': {
    id: 'tool-04',
    slug: 'wordpress-plugin-boilerplate-generator',
    name: 'WordPress Custom Plugin Boilerplate Generator',
    category: 'WordPress & PHP',
    categoryBadge: 'WordPress & VIP',
    shortDescription: 'Compiles clean, security-hardened, object-oriented PHP 8.2+ WordPress plugin boilerplates with Settings API, AJAX nonces, and instant ZIP package download.',
    fullDescription: 'Generates enterprise-grade, object-oriented plugin boilerplates with separated Activator, Deactivator, Admin, AJAX, and REST API classes under PSR-4 autoloading.',
    problemStatement: 'Monolithic procedural plugins create function naming collisions, lack CSRF nonce protection, and introduce heavy autoloaded option bloat.',
    solutionArchitecture: 'Compiles modular, object-oriented plugin packages with Settings API, check_ajax_referer nonces, scoped admin assets, and one-click ZIP packaging.',
    ctaText: 'GENERATE BOILERPLATE ZIP',
    targetUrl: '/tools/wordpress-plugin-boilerplate-generator/',
    techStack: ['PHP 8.2+', 'WordPress Hook API', 'Settings API', 'REST API v2', 'JSZip', 'WPCS'],
    metric: '0.00KB Frontend Bloat',
    metricLabel: 'Enterprise Memory Footprint',
    statusBadge: 'Architectural Utility',
    interactiveType: 'hook-matrix',
    features: [
      'Strict object-oriented architecture with dedicated lifecycle classes',
      'Settings API options page with capability barriers and defense-in-depth sanitization',
      'Cryptographic CSRF nonce verification for authenticated and guest AJAX endpoints',
      'Zero frontend footprint with administrative script enqueues strictly scoped to page hooks',
      'One-click ZIP archive packaging and instant ASCII file tree generator'
    ],
    codeSnippet: `<?php
/**
 * Plugin Name: Acme Enterprise Core
 * Requires PHP: 8.2
 * Author: Sheharyar Siraj
 */

declare(strict_types=1);

namespace Acme\\EnterpriseCore;

if (!defined('ABSPATH')) {
    exit;
}

final class Plugin {
    private static ?Plugin $instance = null;

    public static function instance(): Plugin {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('plugins_loaded', [$this, 'init']);
    }

    public function init(): void {
        if (is_admin()) {
            Admin::instance();
        }
        Ajax::instance();
    }
}

Plugin::instance();`,
    codeLanguage: 'php',
    faqs: [
      {
        question: 'Why should enterprise WordPress plugins use an object-oriented architecture?',
        answer: 'An object-oriented structure organizes activation hooks, admin views, REST endpoints, and AJAX dispatchers into distinct, single-responsibility classes under dedicated PHP namespaces.'
      },
      {
        question: 'How does this boilerplate prevent wp_options query bloat?',
        answer: 'This boilerplate explicitly passes autoload = no on activation, ensuring plugin settings are fetched only on pages where they are actively needed.'
      }
    ]
  },

  'voice-agent-roi-calculator': {
    id: 'tool-05',
    slug: 'voice-agent-roi-calculator',
    name: 'Voice Agent & Workflow Cost/ROI Calculator',
    category: 'AI & Voice',
    categoryBadge: 'Voice AI & ROI',
    shortDescription: 'Calculates operational cost savings, agent labor hours saved, and lead conversion lift from deploying autonomous AI voice agents and n8n workflow pipelines.',
    fullDescription: 'Models call center labor economics against real-time telephony costs, benchmarking Vapi, Twilio, Deepgram, and LLM token expenditures against human handling.',
    problemStatement: 'Enterprise contact centers face high staffing costs, missed after-hours leads, and unpredictable telephony economics when evaluating conversational AI.',
    solutionArchitecture: 'Simulates monthly inbound call volumes, labor arbitrage, and after-hours lead salvage to output precise operational ROI and payback timelines.',
    ctaText: 'CALCULATE VOICE ROI',
    targetUrl: '/tools/voice-agent-roi-calculator/',
    techStack: ['Vapi AI', 'Twilio Media Streams', 'Deepgram Nova-2', 'Groq Llama 3.3', 'Financial Modeling'],
    metric: '84.2% Cost Reduction',
    metricLabel: 'Contact Center Operational Lift',
    statusBadge: 'Financial Model',
    interactiveType: 'voice-simulator',
    features: [
      'Interactive volume, average handle time, and hourly labor cost sliders',
      'Real-time telephony expenditure breakdowns (STT, LLM tokens, TTS, SIP)',
      'After-hours missed call revenue recovery estimations',
      'Downloadable executive financial summary report'
    ],
    codeSnippet: `// Voice Pipeline Telephony Cost Model
const calculateTelephonyCostPerMinute = () => {
  const deepgramStt = 0.0043; // Nova-2 per minute
  const groqLlama = 0.0020;   // ~800 tokens per minute
  const cartesiaTts = 0.0080; // Neural speech synthesis
  const twilioSip = 0.0040;   // Inbound SIP trunking
  return deepgramStt + groqLlama + cartesiaTts + twilioSip; // ~$0.0183/min
};`,
    codeLanguage: 'javascript',
    faqs: [
      {
        question: 'How accurate is this voice agent ROI financial model?',
        answer: 'Calculations utilize verified per-minute pricing across Deepgram, Cartesia, Groq, and Twilio, matched against enterprise human agent loaded wage benchmarks.'
      },
      {
        question: 'Can conversational AI voice agents handle complex appointment bookings?',
        answer: 'Yes. With custom function-calling tool nodes wired to CRM APIs via n8n, voice agents query calendar availability and lock bookings in sub-600ms latency.'
      }
    ]
  },

  'ai-voice-prompt-designer': {
    id: 'tool-06',
    slug: 'ai-voice-prompt-designer',
    name: 'AI Voice Agent Flowchart & Prompt Architecture Designer',
    category: 'AI & Voice',
    categoryBadge: 'Voice Engineering',
    shortDescription: 'Designs low-latency Vapi and Retell system prompts, JSON conversational state machines, and function-calling schemas with anti-hallucination guardrails.',
    fullDescription: 'Architects conversational turns, interruption thresholds, CRM function-calling tools, and fallback state machines optimized for sub-600ms telephony response times.',
    problemStatement: 'Poorly structured voice prompts lead to caller interruptions, awkward conversational pauses (>1200ms), and hallucinations during live calls.',
    solutionArchitecture: 'Generates structured JSON assistant manifests, interruption rules, and tool function schemas for production Vapi and Retell deployments.',
    ctaText: 'DESIGN VOICE AGENT',
    targetUrl: '/tools/ai-voice-prompt-designer/',
    techStack: ['Vapi SDK', 'Retell AI', 'Cartesia Sonic', 'Function Calling', 'JSON Schema'],
    metric: 'Sub-600ms Response',
    metricLabel: 'Telephony Latency Target',
    statusBadge: 'Telephony Architecture',
    interactiveType: 'voice-simulator',
    features: [
      'Visual prompt archetype selector (Customer Support, Inbound Qualification, Scheduling)',
      'Anti-hallucination parameter configuration with strict extraction bounds',
      'Function calling tool schema generator for CRM database lookups',
      'One-click Vapi JSON assistant configuration export'
    ],
    codeSnippet: `{
  "model": {
    "provider": "groq",
    "model": "llama-3.3-70b-versatile",
    "temperature": 0.2,
    "messages": [
      {
        "role": "system",
        "content": "You are a senior scheduling coordinator. Speak in concise, natural sentences under 25 words. Never read markdown."
      }
    ]
  }
}`,
    codeLanguage: 'json',
    faqs: [
      {
        question: 'How do you keep conversational voice latency below 600ms?',
        answer: 'We pair high-throughput Groq Llama 3.3 inference (over 280 tokens/sec) with streaming Deepgram transcription and Cartesia Sonic speech synthesis over direct WebSockets.'
      },
      {
        question: 'How are tool call failures handled in telephony voice pipelines?',
        answer: 'The assistant state machine catches API timeouts and delivers a conversational stalling phrase while retrying the CRM endpoint asynchronously.'
      }
    ]
  },

  'webhook-payload-tester': {
    id: 'tool-07',
    slug: 'webhook-payload-tester',
    name: 'n8n & Make Webhook Payload Tester & Debugger',
    category: 'Workflow Automation',
    categoryBadge: 'n8n & Webhooks',
    shortDescription: 'Inspects incoming JSON webhook payloads, parses nested keys, validates HMAC signatures, and compiles production-ready n8n Code Node JavaScript instantly.',
    fullDescription: 'Simulates real-world webhook events from Stripe, Shopify, and WordPress to validate schema structures and export defensive JavaScript code for automation nodes.',
    problemStatement: 'Mismatched webhook schemas and unvalidated signatures cause silent automation failures and broken CRM synchronizations in production.',
    solutionArchitecture: 'Inspects payload structures, validates cryptographic signatures, and generates defensive n8n Code Node JavaScript with zero external libraries.',
    ctaText: 'TEST WEBHOOK PAYLOAD',
    targetUrl: '/tools/webhook-payload-tester/',
    techStack: ['n8n Workflow Engine', 'Make.com', 'HMAC SHA-256', 'JSON Schema', 'Node.js'],
    metric: '100% Schema Validation',
    metricLabel: 'Zero Silent Webhook Drops',
    statusBadge: 'Automation Engine',
    interactiveType: 'webhook-tester',
    features: [
      'Interactive JSON payload tree inspector with nested object extraction',
      'Cryptographic HMAC SHA-256 webhook signature verifier',
      'Production-ready n8n Code Node JavaScript script generator',
      'Defensive null-check and fallbacks for missing webhook parameters'
    ],
    codeSnippet: `// n8n Code Node: Defensive Webhook Processor
for (const item of $input.all()) {
  const body = item.json.body || {};
  const event = body.event || 'unknown';
  
  if (!body.customer_id) {
    throw new Error('Malformed payload: Missing required customer_id parameter.');
  }

  item.json.processed_at = new Date().toISOString();
  item.json.lead_score = body.amount > 1000 ? 'high_value' : 'standard';
}
return $input.all();`,
    codeLanguage: 'javascript',
    faqs: [
      {
        question: 'Why should webhook processing include signature verification?',
        answer: 'Validating cryptographic HMAC headers guarantees the request originated from your actual service provider, protecting your database against forged webhook attacks.'
      },
      {
        question: 'How does defensive JavaScript prevent n8n workflow halting?',
        answer: 'Defensive code applies optional chaining and default fallback values, preventing unhandled runtime exceptions from crashing automation executions.'
      }
    ]
  },

  'n8n-error-handler-generator': {
    id: 'tool-08',
    slug: 'n8n-error-handler-generator',
    name: 'n8n Error Handler & JSON Payload Transformer',
    category: 'Workflow Automation',
    categoryBadge: 'n8n Reliability',
    shortDescription: 'Transforms broken JSON payloads, intercepts workflow exceptions, and compiles defensive JavaScript expressions for n8n Code Nodes and Set Nodes.',
    fullDescription: 'Builds bulletproof error interception pipelines that catch upstream API timeouts, validate data types, and trigger automated Slack and webhook incident alerts.',
    problemStatement: 'Uncaught workflow exceptions cause automation runs to fail silently without triggering alerts or notifying engineering teams.',
    solutionArchitecture: 'Generates self-healing try/catch logic, dead-letter queue routing, and structured incident payloads for self-hosted and cloud n8n workflows.',
    ctaText: 'GENERATE ERROR HANDLER',
    targetUrl: '/tools/n8n-error-handler-generator/',
    techStack: ['n8n Code Node', 'JavaScript ES2022', 'Dead Letter Queues', 'Slack Webhooks', 'PagerDuty'],
    metric: '0.00% Uncaught Drops',
    metricLabel: 'Workflow Fault Tolerance',
    statusBadge: 'Reliability Engineering',
    interactiveType: 'webhook-tester',
    features: [
      'Self-healing JavaScript try/catch script compiler for n8n Code Nodes',
      'Dead-letter queue payload formatter for failed webhook routing',
      'Automated Slack and Microsoft Teams error notification payload builder',
      'Retry exponential backoff calculator for third-party rate limits'
    ],
    codeSnippet: `// n8n Resilient Error Catcher
const results = [];
for (const item of $input.all()) {
  try {
    const data = item.json;
    results.push({ json: { ...data, status: 'success' } });
  } catch (error) {
    results.push({
      json: {
        error: true,
        message: error.message,
        timestamp: new Date().toISOString(),
        needs_dead_letter_queue: true
      }
    });
  }
}
return results;`,
    codeLanguage: 'javascript',
    faqs: [
      {
        question: 'What is the best way to handle errors in enterprise n8n workflows?',
        answer: 'Configure a dedicated Error Trigger workflow in n8n that captures failed execution context, posts structured alerts to Slack, and persists failed payloads to a retry queue.'
      },
      {
        question: 'Can this script transform malformed customer input automatically?',
        answer: 'Yes. It applies regex sanitizers and type coercions to patch common input defects before passing data downstream to CRM APIs.'
      }
    ]
  },

  'llm-seo-meta-generator': {
    id: 'tool-09',
    slug: 'llm-seo-meta-generator',
    name: 'Dynamic LLM Prompt Generator & SEO Meta Optimizer',
    category: 'Local SEO',
    categoryBadge: 'AI & Meta SEO',
    shortDescription: 'Generates high-converting SEO meta titles, meta descriptions, deep-research LLM prompt frameworks, and Schema.org Article JSON-LD graphs.',
    fullDescription: 'Combines search intent analysis with strict character bounds (55-60 char titles, 145-155 char descriptions) and structured prompts that steer LLMs away from generic filler.',
    problemStatement: 'Search engine snippets with truncated titles or generic meta descriptions suffer from low click-through rates and missing rich snippet signals.',
    solutionArchitecture: 'Calculates pixel widths, enforces character bounds, embeds primary keyword entities, and outputs structured JSON-LD Article schemas.',
    ctaText: 'OPTIMIZE SEO META',
    targetUrl: '/tools/llm-seo-meta-generator/',
    techStack: ['Google SERP Pixel Sizer', 'JSON-LD Article', 'OpenGraph Protocol', 'Schema.org v26', 'Search Intent Engine'],
    metric: '100% SERP Viewport Fit',
    metricLabel: 'Zero Title Truncation',
    statusBadge: 'Search Optimization',
    interactiveType: 'schema-builder',
    features: [
      'Real-time Google SERP pixel width calculator (580px desktop, 600px mobile)',
      'Humanized meta title and description prompt generator with zero AI clichés',
      'Article and NewsArticle JSON-LD schema builder with author entity links',
      'Search intent analyzer (Informational, Commercial, Navigational, Transactional)'
    ],
    codeSnippet: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Enterprise WordPress Performance Engineering",
  "author": {
    "@type": "Person",
    "name": "Sheharyar Siraj",
    "url": "https://sheharyarsiraj.com/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Sheharyar Siraj Systems",
    "url": "https://sheharyarsiraj.com/"
  }
}
</script>`,
    codeLanguage: 'html',
    faqs: [
      {
        question: 'What is the optimal character length for Google meta titles?',
        answer: 'Keep desktop titles between 50 and 60 characters (or under 580 pixels). This prevents Google from truncating your brand suffix with ellipses.'
      },
      {
        question: 'How do structured Article schemas improve visibility in AI Overviews?',
        answer: 'Clear JSON-LD data allows retrieval-augmented generation engines to verify authoritative authorship, timestamps, and factual claims with high confidence.'
      }
    ]
  },

  'woocommerce-seo-sku-auditor': {
    id: 'tool-10',
    slug: 'woocommerce-seo-sku-auditor',
    name: 'WooCommerce SKU & Metadata Health Auditor',
    category: 'E-Commerce',
    categoryBadge: 'WooCommerce SEO',
    shortDescription: 'Audits WooCommerce catalogs for duplicate SKUs, missing SEO meta titles, empty image alt tags, and serialized attribute bloat. Exports remediation PHP.',
    fullDescription: 'Identifies catalog metadata defects that trigger Google Merchant Center feed rejections, reduce organic search CTR, and slow down category filter database queries.',
    problemStatement: 'Duplicate SKUs and missing image alt tags cause merchant feed suspensions and accessibility compliance violations on large e-commerce stores.',
    solutionArchitecture: 'Scans catalog metadata, pinpoints serialized attribute table bottlenecks, and exports custom SQL and PHP snippets to convert them into fast indexed taxonomies.',
    ctaText: 'AUDIT WOOCOMMERCE CATALOG',
    targetUrl: '/tools/woocommerce-seo-sku-auditor/',
    techStack: ['WooCommerce Core', 'Google Merchant Center', 'pa_attribute Taxonomies', 'WCAG 2.1', 'MySQL Composite Indexes'],
    metric: '0 Feed Disapprovals',
    metricLabel: 'Google Merchant Feeds Health',
    statusBadge: 'Catalog Performance',
    interactiveType: 'cart-stress',
    features: [
      'Duplicate SKU identifier and missing unique product code detector',
      'Empty image alt tag auditing for WCAG 2.1 accessibility and Google Images',
      'Serialized attribute database bottleneck identification and taxonomy converter',
      'Custom SQL and PHP repair snippets ready for direct execution'
    ],
    codeSnippet: `// Find duplicate SKUs in WooCommerce
SELECT meta_value AS sku, COUNT(post_id) AS occurrences 
FROM wp_postmeta 
WHERE meta_key = '_sku' AND meta_value != '' 
GROUP BY meta_value 
HAVING occurrences > 1;`,
    codeLanguage: 'sql',
    faqs: [
      {
        question: 'Why does Google Merchant Center reject duplicate SKUs?',
        answer: 'Google Merchant Center feeds require unique product identifiers (SKU, GTIN, MPN) to differentiate variant offerings in Google Shopping.'
      },
      {
        question: 'Why should product attributes be converted into global taxonomies?',
        answer: 'Custom serialized attributes require slow full table scans. Converting them to global taxonomies (pa_color, pa_size) stores terms in indexed tables for sub-25ms lookups.'
      }
    ]
  },

  // Legacy fallback aliases to preserve backwards compatibility
  'wp-schema-jsonld-architect': {
    id: 'tool-01',
    slug: 'local-schema-generator',
    name: 'WordPress Schema & JSON-LD Architect',
    category: 'Local SEO',
    categoryBadge: 'Local SEO',
    shortDescription: 'Builds connected JSON-LD LocalBusiness schema graphs and markdown LLMs.txt manifests for search engine AI scrapers, Google Map pack rankings, and AI Overviews.',
    fullDescription: 'Eliminates fragmented schema markup by compiling validated LocalBusiness, PostalAddress, GeoCoordinates, and Service graphs.',
    problemStatement: 'Disconnected schema markup and missing LLMs.txt manifests cause AI discovery engines and Google Map pack crawlers to miss entity relationships.',
    solutionArchitecture: 'Generates zero-overhead, multi-entity connected JSON-LD graph structures with geo-coordinates and opening hours.',
    ctaText: 'LAUNCH SCHEMA GENERATOR',
    targetUrl: '/tools/local-schema-generator/',
    techStack: ['Schema.org v26', 'JSON-LD', 'LLMs.txt', 'Google Rich Results', 'PHP 8.2+'],
    metric: '100% Graph Connectivity',
    metricLabel: 'AI Overview Readiness',
    statusBadge: 'Production Utility',
    interactiveType: 'schema-builder',
    features: ['Nested Multi-Location PostalAddress and GeoCoordinates graph generation'],
    codeSnippet: `add_action('wp_head', function() {});`,
    codeLanguage: 'php',
    faqs: []
  },
  'ai-voice-agent-flow-builder': {
    id: 'tool-06',
    slug: 'ai-voice-prompt-designer',
    name: 'Autonomous AI Voice Agent Flow Builder',
    category: 'AI & Voice',
    categoryBadge: 'Voice Engineering',
    shortDescription: 'Designs low-latency Vapi and Retell system prompts, JSON conversational state machines, and function-calling schemas with anti-hallucination guardrails.',
    fullDescription: 'Architects conversational turns, interruption thresholds, and CRM function-calling tools.',
    problemStatement: 'Poorly structured voice prompts lead to caller interruptions and high latency.',
    solutionArchitecture: 'Generates structured JSON assistant manifests and interruption rules.',
    ctaText: 'DESIGN VOICE AGENT',
    targetUrl: '/tools/ai-voice-prompt-designer/',
    techStack: ['Vapi SDK', 'Retell AI', 'Cartesia Sonic'],
    metric: 'Sub-600ms Response',
    metricLabel: 'Telephony Latency Target',
    statusBadge: 'Telephony Architecture',
    interactiveType: 'voice-simulator',
    features: ['Visual prompt archetype selector'],
    codeSnippet: `{}`,
    codeLanguage: 'json',
    faqs: []
  },
  'wp-database-query-profiler': {
    id: 'tool-02',
    slug: 'wordpress-database-bloat-estimator',
    name: 'WordPress Database Query & Index Profiler',
    category: 'Database Optimization',
    categoryBadge: 'Database & TTFB',
    shortDescription: 'Audits wp_options autoload weight, orphaned transient bloat, and server TTFB slowdown.',
    fullDescription: 'Analyzes wp_options table bloat and calculates server Time to First Byte degradation.',
    problemStatement: 'Bloated wp_options tables inflate memory usage.',
    solutionArchitecture: 'Identifies stale transient keys and quantifies autoload memory footprint.',
    ctaText: 'ANALYZE DATABASE BLOAT',
    targetUrl: '/tools/wordpress-database-bloat-estimator/',
    techStack: ['MySQL 8.0', 'InnoDB'],
    metric: 'Sub-50ms TTFB Target',
    metricLabel: 'Autoload Weight Reduction',
    statusBadge: 'Database Performance',
    interactiveType: 'db-indexer',
    features: ['Automated autoloaded options estimator'],
    codeSnippet: `-- SQL Index`,
    codeLanguage: 'sql',
    faqs: []
  },
  'n8n-webhook-pipeline-simulator': {
    id: 'tool-07',
    slug: 'webhook-payload-tester',
    name: 'Event-Driven n8n Webhook Pipeline Simulator',
    category: 'Workflow Automation',
    categoryBadge: 'n8n & Webhooks',
    shortDescription: 'Inspects incoming JSON webhook payloads, parses nested keys, and validates HMAC signatures.',
    fullDescription: 'Simulates real-world webhook events from Stripe and Shopify.',
    problemStatement: 'Mismatched webhook schemas cause silent automation failures.',
    solutionArchitecture: 'Inspects payload structures and generates defensive n8n Code Node JavaScript.',
    ctaText: 'TEST WEBHOOK PAYLOAD',
    targetUrl: '/tools/webhook-payload-tester/',
    techStack: ['n8n Workflow Engine', 'Make.com'],
    metric: '100% Schema Validation',
    metricLabel: 'Zero Silent Webhook Drops',
    statusBadge: 'Automation Engine',
    interactiveType: 'webhook-tester',
    features: ['Interactive JSON payload tree inspector'],
    codeSnippet: `// n8n Code Node`,
    codeLanguage: 'javascript',
    faqs: []
  },
  'woocommerce-checkout-stress-engine': {
    id: 'tool-10',
    slug: 'woocommerce-seo-sku-auditor',
    name: 'WooCommerce Cart & Checkout Stress Engine',
    category: 'E-Commerce',
    categoryBadge: 'WooCommerce SEO',
    shortDescription: 'Audits WooCommerce catalogs for duplicate SKUs, missing SEO meta titles, and attribute bloat.',
    fullDescription: 'Identifies catalog metadata defects that trigger Merchant Center feed rejections.',
    problemStatement: 'Duplicate SKUs cause merchant feed suspensions.',
    solutionArchitecture: 'Scans catalog metadata and pinpoints attribute bottlenecks.',
    ctaText: 'AUDIT WOOCOMMERCE CATALOG',
    targetUrl: '/tools/woocommerce-seo-sku-auditor/',
    techStack: ['WooCommerce Core'],
    metric: '0 Feed Disapprovals',
    metricLabel: 'Google Merchant Feeds Health',
    statusBadge: 'Catalog Performance',
    interactiveType: 'cart-stress',
    features: ['Duplicate SKU identifier'],
    codeSnippet: `// SQL Query`,
    codeLanguage: 'sql',
    faqs: []
  },
  'rag-context-token-calculator': {
    id: 'tool-09',
    slug: 'llm-seo-meta-generator',
    name: 'Enterprise RAG Context & Token Estimator',
    category: 'Local SEO',
    categoryBadge: 'AI & Meta SEO',
    shortDescription: 'Generates high-converting SEO meta titles, meta descriptions, and Article JSON-LD graphs.',
    fullDescription: 'Combines search intent analysis with strict character bounds.',
    problemStatement: 'Truncated search snippets suffer from low CTR.',
    solutionArchitecture: 'Calculates pixel widths and outputs structured Article schemas.',
    ctaText: 'OPTIMIZE SEO META',
    targetUrl: '/tools/llm-seo-meta-generator/',
    techStack: ['Google SERP Pixel Sizer'],
    metric: '100% SERP Viewport Fit',
    metricLabel: 'Zero Title Truncation',
    statusBadge: 'Search Optimization',
    interactiveType: 'schema-builder',
    features: ['Real-time Google SERP pixel width calculator'],
    codeSnippet: `<script type="application/ld+json">{}</script>`,
    codeLanguage: 'html',
    faqs: []
  },
  'php-hook-filter-conflict-matrix': {
    id: 'tool-03',
    slug: 'wordpress-cpt-code-exporter',
    name: 'Custom PHP Hook & Filter Conflict Matrix',
    category: 'WordPress & PHP',
    categoryBadge: 'PHP Architecture',
    shortDescription: 'Generates production-ready PHP 8.2 code for WordPress custom post types.',
    fullDescription: 'Replaces heavy UI plugins with pure opcode-cached PHP.',
    problemStatement: 'UI plugins store schema in wp_options.',
    solutionArchitecture: 'Exports pure object-oriented PHP 8.2 code.',
    ctaText: 'EXPORT CPT CODE',
    targetUrl: '/tools/wordpress-cpt-code-exporter/',
    techStack: ['PHP 8.2+'],
    metric: '0.00KB Plugin Overhead',
    metricLabel: 'Opcode Cache Execution',
    statusBadge: 'Clean Architecture',
    interactiveType: 'hook-matrix',
    features: ['Native PHP 8.2 post type registration'],
    codeSnippet: `add_action('init', function(): void {});`,
    codeLanguage: 'php',
    faqs: []
  },
  'local-seo-nap-auditor': {
    id: 'tool-01',
    slug: 'local-schema-generator',
    name: 'Local SEO NAP & Schema Consistency Auditor',
    category: 'Local SEO',
    categoryBadge: 'Local SEO & GEO',
    shortDescription: 'Builds connected JSON-LD LocalBusiness schema graphs and LLMs.txt manifests.',
    fullDescription: 'Eliminates fragmented schema markup.',
    problemStatement: 'Disconnected schema markup hurts rankings.',
    solutionArchitecture: 'Generates zero-overhead connected JSON-LD graph structures.',
    ctaText: 'LAUNCH SCHEMA GENERATOR',
    targetUrl: '/tools/local-schema-generator/',
    techStack: ['Schema.org v26'],
    metric: '100% Graph Connectivity',
    metricLabel: 'AI Overview Readiness',
    statusBadge: 'Production Utility',
    interactiveType: 'schema-builder',
    features: ['Multi-Location graph generation'],
    codeSnippet: `add_action('wp_head', function(): void {});`,
    codeLanguage: 'php',
    faqs: []
  },
  'tailwind-cwv-purge-analyzer': {
    id: 'tool-04',
    slug: 'wordpress-plugin-boilerplate-generator',
    name: 'Tailwind CSS & Core Web Vitals Purge Analyzer',
    category: 'WordPress & PHP',
    categoryBadge: 'WordPress & VIP',
    shortDescription: 'Compiles clean, security-hardened, object-oriented PHP 8.2+ WordPress plugin boilerplates.',
    fullDescription: 'Generates enterprise-grade plugin boilerplates.',
    problemStatement: 'Procedural plugins create bloat.',
    solutionArchitecture: 'Compiles modular plugin packages.',
    ctaText: 'GENERATE BOILERPLATE ZIP',
    targetUrl: '/tools/wordpress-plugin-boilerplate-generator/',
    techStack: ['PHP 8.2+'],
    metric: '0.00KB Frontend Bloat',
    metricLabel: 'Enterprise Memory Footprint',
    statusBadge: 'Architectural Utility',
    interactiveType: 'hook-matrix',
    features: ['Strict object-oriented architecture'],
    codeSnippet: `<?php // Plugin boilerplate ?>`,
    codeLanguage: 'php',
    faqs: []
  },
  'agentic-ai-schema-validator': {
    id: 'tool-08',
    slug: 'n8n-error-handler-generator',
    name: 'Agentic AI Tool-Calling & JSON Schema Validator',
    category: 'Workflow Automation',
    categoryBadge: 'n8n Reliability',
    shortDescription: 'Transforms broken JSON payloads and compiles defensive JavaScript expressions.',
    fullDescription: 'Builds bulletproof error interception pipelines.',
    problemStatement: 'Uncaught exceptions cause silent drops.',
    solutionArchitecture: 'Generates self-healing logic and dead-letter queues.',
    ctaText: 'GENERATE ERROR HANDLER',
    targetUrl: '/tools/n8n-error-handler-generator/',
    techStack: ['n8n Code Node'],
    metric: '0.00% Uncaught Drops',
    metricLabel: 'Workflow Fault Tolerance',
    statusBadge: 'Reliability Engineering',
    interactiveType: 'webhook-tester',
    features: ['Self-healing JavaScript script compiler'],
    codeSnippet: `// Error Catcher`,
    codeLanguage: 'javascript',
    faqs: []
  }
};

/**
 * The canonical 10 production standalone tools displayed in the Tools Hub
 */
export const TOOLS_LIST: ToolItem[] = [
  TOOLS_TAXONOMY['local-schema-generator'],
  TOOLS_TAXONOMY['wordpress-database-bloat-estimator'],
  TOOLS_TAXONOMY['wordpress-cpt-code-exporter'],
  TOOLS_TAXONOMY['wordpress-plugin-boilerplate-generator'],
  TOOLS_TAXONOMY['voice-agent-roi-calculator'],
  TOOLS_TAXONOMY['ai-voice-prompt-designer'],
  TOOLS_TAXONOMY['webhook-payload-tester'],
  TOOLS_TAXONOMY['n8n-error-handler-generator'],
  TOOLS_TAXONOMY['llm-seo-meta-generator'],
  TOOLS_TAXONOMY['woocommerce-seo-sku-auditor']
];
