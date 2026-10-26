/**
 * Grounded Knowledge Layer & Live Service Catalog for sheharyarsiraj.com
 * Principal Architect: Sheharyar Siraj (Ansari Web Agency)
 */

import { CONTACT_INFO, CASE_STUDIES } from './portfolioData';
import { TOOLS_TAXONOMY } from './toolsData';

export interface ServiceDefinition {
  id: string;
  title: string;
  shortName: string;
  tagline: string;
  pillar: 'web-engineering' | 'voice-ai' | 'automation' | 'agentic-ai' | 'agency-partners';
  technicalSpecs: string[];
  deliverables: string[];
  typicalTimeline: string;
  pricingRange: string;
  discoveryQuestions: string[];
  voiceSummary: string;
  deepDive: string;
}

export interface ArchitectIdentity {
  name: string;
  title: string;
  agency: string;
  experienceYears: number;
  completedDeployments: number;
  upworkRating: string;
  jss: string;
  certifications: string[];
  education: string;
  location: string;
  timezone: string;
  workingHoursOverlap: string[];
  responseSla: string;
  guarantees: string[];
  contactEndpoints: {
    whatsapp: string;
    whatsappFormatted: string;
    email: string;
    upwork: string;
    github: string;
  };
}

export const ARCHITECT_IDENTITY: ArchitectIdentity = {
  name: 'Sheharyar Siraj',
  title: 'Principal Systems Architect & Agentic AI Automation Engineer',
  agency: 'Ansari Web Agency',
  experienceYears: 5,
  completedDeployments: 1200,
  upworkRating: '5.0 Star Top Rated',
  jss: '100% Job Success Score',
  certifications: [
    'Cisco Certified Network Professional (CCNP Enterprise Infrastructure)',
    'Cisco Certified CyberOps Associate',
    'Google Cloud Vertex AI Certified Professional',
    'DeepLearning.AI - Building Agentic Workflows'
  ],
  education: 'Bachelor of Business & Information Technology (BBIT, Computer Software Engineering) - Virtual University of Pakistan',
  location: 'Karachi, Pakistan (PKT / UTC+5)',
  timezone: 'UTC+5 / PKT',
  workingHoursOverlap: [
    'USA East Coast (EST) & West Coast (PST) morning/afternoon overlap',
    'United Kingdom (GMT/BST) afternoon & evening overlap',
    'European Union (CET/CEST) full workday synchronization',
    'United Arab Emirates & Gulf (GST/AST) immediate real-time overlap'
  ],
  responseSla: 'Guaranteed 2 business hours technical response time with preliminary scoping',
  guarantees: [
    'Bilateral Non-Disclosure Agreement (NDA) executed before deep-dive code reviews',
    'Zero junior account manager friction — clients work 100% directly with Senior Architect',
    'Full source code and Intellectual Property (IP) ownership transferred on milestone completion',
    '30-day post-deployment staging warranty and bug-fix guarantee'
  ],
  contactEndpoints: {
    whatsapp: 'https://wa.me/923132080033',
    whatsappFormatted: '+92 313 2080033',
    email: 'sherryansari870@gmail.com',
    upwork: 'https://www.upwork.com/freelancers/~015f8e658392d0c2ee',
    github: 'https://github.com/Sheharyar-ans'
  }
};

export const CORE_10_SERVICES: Record<string, ServiceDefinition> = {
  'custom-wordpress': {
    id: 'custom-wordpress',
    title: 'Custom WordPress Development & Performance Engineering',
    shortName: 'Custom WordPress VIP',
    tagline: 'PHP 8.2 VIP architectures, bespoke themes/plugins, zero-builder, sub-500ms TTFB.',
    pillar: 'web-engineering',
    technicalSpecs: [
      'Pure object-oriented PHP 8.2/8.3 conforming to WordPress VIP coding standards',
      'Decoupled custom Gutenberg block development (React/JSX) without slow site builders',
      'Zero Elementor, Divi, or WP Bakery page-builder bloat',
      'Redis Object Cache integration & transient memory optimization',
      'Sub-500ms Time-to-First-Byte (TTFB) and 95+ Core Web Vitals on mobile'
    ],
    deliverables: [
      'Bespoke lightweight theme & custom plugins',
      'Server-level caching & Cloudflare Enterprise edge rules',
      'Strict security hardening & REST API authentication'
    ],
    typicalTimeline: '1 to 3 weeks',
    pricingRange: '$1,200 – $3,500',
    discoveryQuestions: [
      'Are you experiencing slow mobile load times or bloat from page builders like Elementor?',
      'Do you require custom Gutenberg blocks tailored to your editorial team workflow?'
    ],
    voiceSummary: 'We build custom, zero-builder WordPress VIP systems on PHP 8.2 that deliver sub-500ms load speeds and 95 plus Core Web Vitals.',
    deepDive: 'Our WordPress builds eliminate third-party plugin drag through hand-crafted PHP 8.2 components, custom Gutenberg block suites, and persistent Redis caching.'
  },

  'voice-agents': {
    id: 'voice-agents',
    title: 'Autonomous AI Voice Agents & Telephony',
    shortName: 'Autonomous Voice AI',
    tagline: 'Vapi, Retell AI, Twilio SIP, sub-600ms latency, custom CRM tools.',
    pillar: 'voice-ai',
    technicalSpecs: [
      'Ultra low-latency speech pipelines via Vapi and Retell AI frameworks',
      'Deepgram Nova-2 speech-to-text combined with ElevenLabs Flash and Cartesia neural voices',
      'Sub-600ms end-to-end voice latency with real-time acoustic interruption handling',
      'Twilio SIP Trunking for inbound phone answering and outbound qualification campaigns',
      'Deterministic tool-calling into Google Calendar, Cal.com, HubSpot, and GoHighLevel'
    ],
    deliverables: [
      'Production-ready 24/7 AI Phone Receptionist',
      'Inbound customer support & outbound booking state machines',
      'Live call recordings, transcripts, and sentiment webhook dispatches'
    ],
    typicalTimeline: '1 to 2 weeks',
    pricingRange: '$1,500 – $4,000',
    discoveryQuestions: [
      'Are you looking to handle inbound reception, qualify sales leads, or automate booking calls?',
      'What CRM or scheduling calendar does the voice agent need to read and write to?'
    ],
    voiceSummary: 'We build sub-600ms conversational voice agents with Vapi and Twilio that answer calls 24/7, book appointments into your calendar, and sync directly to your CRM.',
    deepDive: 'Our voice bots sound completely natural, handle interruptions gracefully, and execute deterministic API calls without hallucinations.'
  },

  'n8n-automation': {
    id: 'n8n-automation',
    title: 'Workflow Automation & Self-Hosted n8n Clusters',
    shortName: 'n8n Automation Clusters',
    tagline: 'Self-hosted multi-worker Docker clusters, Make.com, DLQ queue architecture, GDPR compliant.',
    pillar: 'automation',
    technicalSpecs: [
      'Docker Compose & Kubernetes multi-worker deployment on private Hetzner or AWS VPS',
      'Redis queue broker with BullMQ handling asynchronous background webhook jobs',
      'Dead Letter Queue (DLQ) retry architecture to guarantee 0% webhook data loss',
      'Zero recurring per-task fees compared to expensive Zapier or Make subscriptions',
      'GDPR and HIPAA-compliant on-premise execution with encrypted environment vaults'
    ],
    deliverables: [
      'Hardened self-hosted n8n production cluster with automated SSL',
      'End-to-end CRM, invoicing, billing, and database synchronization pipelines',
      'Real-time Telegram/Slack incident monitoring and automated alerting'
    ],
    typicalTimeline: '3 to 7 business days',
    pricingRange: '$800 – $2,500',
    discoveryQuestions: [
      'Are you spending hundreds of dollars every month on Zapier tasks?',
      'Do you handle sensitive client data that requires self-hosted, GDPR-compliant automation?'
    ],
    voiceSummary: 'We architect self-hosted n8n automation clusters that eliminate expensive Zapier monthly fees with 99.95 percent uptime and zero data loss.',
    deepDive: 'Our private n8n setups run on your own servers with Redis queues and dead-letter fault tolerance, connecting your CRMs, billing, and internal databases seamlessly.'
  },

  'woocommerce-hpos': {
    id: 'woocommerce-hpos',
    title: 'WooCommerce High-Concurrency Systems & HPOS Architecture',
    shortName: 'WooCommerce HPOS Scaling',
    tagline: 'HPOS scaling beyond 10k orders/day, Redis Object Cache, database index tuning.',
    pillar: 'web-engineering',
    technicalSpecs: [
      'High-Performance Order Storage (HPOS) dedicated database tables migration',
      'Cart fragment elimination and session sharding for high-traffic drop sales',
      'Database index tuning for catalog queries handling 100,000+ SKUs',
      'Redis object caching for instant product filtering and zero database lockups',
      'Stripe Elements & PayPal custom checkout funnels with 1-click upsells'
    ],
    deliverables: [
      'Complete HPOS database migration without downtime',
      'Optimized checkout funnel delivering sub-800ms transaction times',
      'Automated stock reservation and real-time ERP inventory sync'
    ],
    typicalTimeline: '1 to 2 weeks',
    pricingRange: '$1,500 – $3,500',
    discoveryQuestions: [
      'Does your store experience database timeouts or cart lag during flash sales or heavy promotions?',
      'Have you migrated your WooCommerce store to native HPOS custom order tables yet?'
    ],
    voiceSummary: 'We scale WooCommerce with High-Performance Order Storage and Redis caching to process over 10,000 orders a day without database crashes.',
    deepDive: 'By decoupling orders from standard WordPress post tables and optimizing database queries, we ensure lightning-fast checkouts even during major flash sales.'
  },

  'rag-chatbots': {
    id: 'rag-chatbots',
    title: 'Contextual AI Chatbots & Enterprise RAG Systems',
    shortName: 'Contextual RAG Chatbots',
    tagline: 'Zero-hallucination support, vector search, private document grounding.',
    pillar: 'agentic-ai',
    technicalSpecs: [
      'Hybrid semantic retrieval combining dense vector embeddings with BM25 lexical search',
      'Vector database integrations with Pinecone, Qdrant, Supabase pgvector, and ChromaDB',
      'Strict context boundary prompts preventing off-topic drift and prompt injection',
      'Dynamic source citation and grounded reference links in every answer',
      'Private PDF, Notion, Zendesk, and Confluence documentation ingestion pipelines'
    ],
    deliverables: [
      'Custom embeddable web chat widget with session memory',
      'Automated document vectorization and continuous re-indexing pipelines',
      'Direct human escalation routing to live support or WhatsApp'
    ],
    typicalTimeline: '1 to 2 weeks',
    pricingRange: '$1,200 – $3,000',
    discoveryQuestions: [
      'Are your support reps answering the same repetitive documentation questions all day?',
      'Do you need a secure chatbot that answers strictly from internal PDFs without making up answers?'
    ],
    voiceSummary: 'We build contextual AI chatbots grounded in your private documentation using vector databases, ensuring accurate answers with zero hallucinations.',
    deepDive: 'Our RAG bots ingest your manuals, guides, and internal docs so customers and staff get instant, citation-backed answers 24/7.'
  },

  'agentic-ai': {
    id: 'agentic-ai',
    title: 'Deterministic Multi-Agent Systems & LangGraph Architectures',
    shortName: 'Agentic AI Workflows',
    tagline: 'Deterministic multi-agent workflows using LangGraph and Python with strict schema tool-calling.',
    pillar: 'agentic-ai',
    technicalSpecs: [
      'LangGraph stateful cyclical graphs with human-in-the-loop checkpoints',
      'Strict JSON-schema function calling via OpenAI, Anthropic Claude 3.5, and Gemini 2.0',
      'Autonomous multi-agent orchestration (Researcher, Validator, Writer, Auditor)',
      'Deterministic validation layers preventing infinite loops and schema failures',
      'Secure Python runtime sandboxing in Docker containers'
    ],
    deliverables: [
      'Autonomous research, scraping, and lead enrichment multi-agent workflows',
      'Automated code generation and verification pipelines',
      'Comprehensive tracing, logging, and evaluation via LangSmith'
    ],
    typicalTimeline: '2 to 4 weeks',
    pricingRange: '$2,500 – $6,000',
    discoveryQuestions: [
      'Are you trying to automate complex multi-step reasoning tasks that simple prompts cannot handle?',
      'Do you need autonomous agents that reliably call external tools with strict error handling?'
    ],
    voiceSummary: 'We engineer deterministic multi-agent applications using LangGraph and Python that perform complex research, validation, and tool-calling autonomously.',
    deepDive: 'Unlike fragile single-prompt bots, our multi-agent architectures use state graphs with validation loops to reliably complete intricate workflows.'
  },

  'custom-saas-mvp': {
    id: 'custom-saas-mvp',
    title: 'Custom SaaS & Rapid MVP Architecture',
    shortName: 'SaaS & MVP Engineering',
    tagline: 'Full-stack React, Next.js, Node.js, and serverless backends.',
    pillar: 'web-engineering',
    technicalSpecs: [
      'Full-stack TypeScript architecture using Next.js 15, React 19, and Node.js',
      'Serverless architectures on Vercel, AWS Lambda, and Cloudflare Workers',
      'PostgreSQL database modeling with Prisma ORM and Supabase Auth',
      'Stripe Billing integration with multi-tier subscription plans, metered usage, and webhooks',
      'Clean modular UI built with TailwindCSS and accessible component libraries'
    ],
    deliverables: [
      'Complete end-to-end SaaS MVP deployed to production',
      'User authentication, onboarding flow, and billing portal',
      'Clean developer documentation and CI/CD GitHub Actions pipelines'
    ],
    typicalTimeline: '3 to 6 weeks',
    pricingRange: '$3,500 – $8,000',
    discoveryQuestions: [
      'Are you validating a new software concept that needs a fast, production-ready MVP?',
      'Do you require seamless Stripe recurring billing and user role-based access control?'
    ],
    voiceSummary: 'We architect and build full-stack SaaS MVPs using Next.js, TypeScript, and serverless backends ready to acquire paying subscribers.',
    deepDive: 'From database schema modeling to Stripe subscription integration, we take MVPs from initial wireframe to live production in weeks.'
  },

  'white-label-subcontracting': {
    id: 'white-label-subcontracting',
    title: 'White-Label Agency Subcontracting & Retainers',
    shortName: 'White-Label Agency Retainers',
    tagline: 'Dedicated technical engineering partner for USA, UK, UAE, and EU agencies.',
    pillar: 'agency-partners',
    technicalSpecs: [
      'Strict bilateral Non-Disclosure Agreement (NDA) with complete white-label confidentiality',
      'Seamless integration into your agency Slack, ClickUp, Jira, and GitHub repositories',
      'Senior engineer execution with zero management overhead or junior handoffs',
      'Transparent weekly sprint models or fixed milestone project pricing',
      'Active daily overlap across US (EST/PST), UK, EU, and UAE timezones'
    ],
    deliverables: [
      'Dedicated weekly engineering capacity (15 to 40 hours/week)',
      'Direct technical scoping assistance for your high-value client pitches',
      'Reliable on-time delivery across WordPress, AI, and complex automations'
    ],
    typicalTimeline: 'Ongoing weekly / monthly retainers',
    pricingRange: '$1,500 – $3,500 per week',
    discoveryQuestions: [
      'Is your agency turning away complex AI or custom development projects due to in-house capacity?',
      'Do you need a trusted technical partner who operates invisibly behind your brand under strict NDA?'
    ],
    voiceSummary: 'We partner with digital and marketing agencies under strict NDA as their dedicated white-label engineering team, handling complex WordPress and AI builds.',
    deepDive: 'Agencies in the US, UK, and UAE rely on Sheharyar as their behind-the-scenes technical architect, expanding their service capabilities with zero payroll overhead.'
  },

  'ai-video-ads': {
    id: 'ai-video-ads',
    title: 'AI Video Ads & Synthetic UGC Generation',
    shortName: 'AI Video & Synthetic UGC',
    tagline: 'High-conversion automated creative video pipelines.',
    pillar: 'agentic-ai',
    technicalSpecs: [
      'Synthetic AI avatars powered by HeyGen and ElevenLabs voice cloning',
      'Automated script generation optimized for direct-response marketing and TikTok/Meta ads',
      'Batch video rendering pipelines producing 50+ localized variations per day',
      'Dynamic caption burning, B-roll insertion, and sound effect synchronization',
      'A/B testing creative variations scaled directly via marketing API webhooks'
    ],
    deliverables: [
      'High-converting multi-variant video ad packages for social campaigns',
      'Automated video generation workflow deployed to your cloud',
      'Multi-lingual voiceover variants for international markets'
    ],
    typicalTimeline: '1 to 2 weeks',
    pricingRange: '$1,000 – $3,000',
    discoveryQuestions: [
      'Are you looking to scale video creative testing on Meta and TikTok without expensive video shoots?',
      'Do you need automated video pipelines that generate dozens of ad variations on demand?'
    ],
    voiceSummary: 'We build automated AI video pipelines that produce high-converting synthetic UGC and multi-variant video ads at a fraction of production costs.',
    deepDive: 'Our video pipelines leverage voice cloning and dynamic avatars to create hundreds of targeted ad variations for rapid performance testing.'
  },

  'data-pipelines-scraping': {
    id: 'data-pipelines-scraping',
    title: 'Data Pipelines & Custom Headless Scraping',
    shortName: 'Data Pipelines & Web Scraping',
    tagline: 'ScrapeGraphAI, headless browser automation, and data analytics.',
    pillar: 'automation',
    technicalSpecs: [
      'AI-driven web scraping utilizing ScrapeGraphAI and Playwright headless browsers',
      'Residential proxy rotation and anti-bot fingerprint bypass (Cloudflare Turnstile, PerimeterX)',
      'Automated data normalization, deduplication, and schema validation pipelines',
      'Streaming ETL pipelines loading into PostgreSQL, BigQuery, or Google Sheets',
      'Scheduled recurring cron scrapers with real-time health-check telemetry'
    ],
    deliverables: [
      'Resilient automated data extraction pipeline',
      'Clean structured JSON/CSV data export and automated database ingestion',
      'Continuous scraper monitoring with auto-remediation'
    ],
    typicalTimeline: '3 to 10 business days',
    pricingRange: '$800 – $2,500',
    discoveryQuestions: [
      'Do you need automated data collection from dynamic, JavaScript-heavy sites behind anti-bot shields?',
      'Are you building competitive pricing monitors or industry intelligence databases?'
    ],
    voiceSummary: 'We engineer resilient data extraction pipelines using headless browser automation and AI scraping to harvest structured data at scale.',
    deepDive: 'Our scrapers bypass anti-bot defenses cleanly and deliver verified, structured data directly into your analytical databases or dashboards.'
  },

  'data-analytics-data-science': {
    id: 'data-analytics-data-science',
    title: 'Data Analytics & Data Science Solutions',
    shortName: 'Data Science & BI Solutions',
    tagline: 'Power BI, Tableau, Advanced Excel dashboards, SQL/PostgreSQL, Python ML, churn prediction, and web scraping.',
    pillar: 'automation',
    technicalSpecs: [
      'Business Intelligence & Dashboards: Power BI, Tableau, Advanced Microsoft Excel (automated reports, dynamic pivot models, executive KPI dashboards)',
      'Data Engineering & Querying: SQL (PostgreSQL, MySQL), data transformation pipelines, automated ETL flows',
      'Data Science & Machine Learning: Python (Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn), predictive modeling, customer churn analysis, and sales forecasting',
      'Automated Web Data Extraction: Python-based scrapers, ScrapeGraphAI, automated data collection pipelines'
    ],
    deliverables: [
      'Custom interactive Power BI, Tableau, or Excel executive dashboards',
      'Automated SQL & Python ETL data ingestion and transformation pipelines',
      'Predictive machine learning models for customer churn, LTV, or sales forecasting',
      'Automated web data scrapers delivering clean structured CSV/JSON feeds'
    ],
    typicalTimeline: '1 to 3 weeks',
    pricingRange: '$1,200 – $4,000',
    discoveryQuestions: [
      'Are you tracking business KPIs in scattered spreadsheets or looking for an automated Power BI / Tableau dashboard?',
      'Do you need predictive analytics like customer churn prediction, sales forecasting, or automated web scraping?'
    ],
    voiceSummary: 'We build executive dashboards in Power BI, Tableau, and Excel, alongside Python predictive models and automated data scraping pipelines.',
    deepDive: 'We transform messy operational data into automated business intelligence dashboards, train predictive models for churn and sales forecasting, and build resilient scrapers for market intelligence.'
  }
};

export interface UtilityToolDefinition {
  id: string;
  slug: string;
  name: string;
  category: string;
  url: string;
  description: string;
  capabilities: string[];
}

export const INTERACTIVE_UTILITY_TOOLS: UtilityToolDefinition[] = [
  {
    id: 'tool-01',
    slug: 'local-schema-generator',
    name: 'AI-Powered Local Schema & Entity Graph Generator',
    category: 'Local SEO & GEO',
    url: '/tools/local-schema-generator/',
    description: 'Generates connected JSON-LD LocalBusiness schema graphs and markdown LLMs.txt manifests for search engine AI scrapers, Google Map pack rankings, and AI Overviews.',
    capabilities: ['JSON-LD graph generation', 'LLMs.txt manifest export', 'Multi-location schema', 'Zero-overhead markup']
  },
  {
    id: 'tool-02',
    slug: 'wordpress-database-bloat-estimator',
    name: 'WordPress Database Bloat Estimator',
    category: 'Database Optimization',
    url: '/tools/wordpress-database-bloat-estimator/',
    description: 'Audits wp_options autoload weight, orphaned transients, and database query slowdown. Exports custom optimization SQL queries and PHP cleanup scripts.',
    capabilities: ['wp_options table audit', 'Transient bloat calculator', 'Custom SQL optimization queries', 'PHP cleanup scripts']
  },
  {
    id: 'tool-03',
    slug: 'wordpress-cpt-code-exporter',
    name: 'Custom Post Type & Meta Box Code Exporter',
    category: 'WordPress & PHP',
    url: '/tools/wordpress-cpt-code-exporter/',
    description: 'Replaces heavy UI generator plugins with pure, clean PHP 8.2 post type registrations, Gutenberg REST API endpoints, and sanitized meta box handlers.',
    capabilities: ['Pure PHP 8.2 CPT export', 'Custom taxonomies', 'REST API endpoints', 'Gutenberg block bindings']
  },
  {
    id: 'tool-04',
    slug: 'wordpress-plugin-boilerplate-generator',
    name: 'PSR-4 Modular WordPress Plugin Boilerplate Generator',
    category: 'WordPress & PHP',
    url: '/tools/wordpress-plugin-boilerplate-generator/',
    description: 'Generates production-grade, object-oriented PSR-4 WordPress plugin boilerplates with strict typing, CSRF protection, and zero autoload bloat.',
    capabilities: ['PSR-4 autoloading', 'Strict PHP 8.2 typing', 'CSRF nonce verification', 'Admin menu & settings API']
  },
  {
    id: 'tool-05',
    slug: 'voice-agent-roi-calculator',
    name: 'AI Voice Agent ROI & Telephony Cost Calculator',
    category: 'AI & Voice',
    url: '/tools/voice-agent-roi-calculator/',
    description: 'Simulates financial ROI, labor cost reduction, and telephony operational savings from replacing human call reception with autonomous Vapi/Twilio voice agents.',
    capabilities: ['Monthly cost simulation', 'Labor hour reduction', 'Twilio/Vapi per-minute rates', 'Payback period modeling']
  },
  {
    id: 'tool-06',
    slug: 'ai-voice-prompt-designer',
    name: 'AI Voice Agent Prompt State Machine Designer',
    category: 'AI & Voice',
    url: '/tools/ai-voice-prompt-designer/',
    description: 'Designs structured prompt state machines for conversational voice agents with interruption handling, tool-calling definitions, and fallback rules.',
    capabilities: ['Voice prompt state machines', 'Tool-calling schema designer', 'Interruption handling logic', 'Vapi/Retell configuration export']
  },
  {
    id: 'tool-07',
    slug: 'webhook-payload-tester',
    name: 'Asynchronous Webhook Event Payload Tester & HMAC Inspector',
    category: 'Workflow Automation',
    url: '/tools/webhook-payload-tester/',
    description: 'Inspects, formats, and tests asynchronous webhook payloads with HMAC SHA-256 signature verification for n8n, Stripe, and WordPress event pipelines.',
    capabilities: ['Payload JSON formatting', 'HMAC SHA-256 signature verification', 'Header inspection', 'cURL & n8n export']
  },
  {
    id: 'tool-08',
    slug: 'n8n-error-handler-generator',
    name: 'Self-Hosted n8n Fault-Tolerant Dead Letter Queue (DLQ) Generator',
    category: 'Workflow Automation',
    url: '/tools/n8n-error-handler-generator/',
    description: 'Generates production-ready n8n error-trigger workflows, retry logic with exponential backoff, and Dead Letter Queue (DLQ) notification sub-workflows.',
    capabilities: ['Dead Letter Queue (DLQ) architecture', 'Exponential backoff retry', 'Slack/Telegram incident alerts', 'Ready-to-import n8n JSON']
  },
  {
    id: 'tool-09',
    slug: 'llm-seo-meta-generator',
    name: 'AI Semantic Search Meta Tag & Open Graph Simulator',
    category: 'Local SEO & GEO',
    url: '/tools/llm-seo-meta-generator/',
    description: 'Simulates how AI search engines (Perplexity, ChatGPT, Google AI Overviews) parse website meta titles, descriptions, and Open Graph previews.',
    capabilities: ['Google SERP snippet preview', 'AI Overview simulation', 'Open Graph social card preview', 'CTR optimization score']
  },
  {
    id: 'tool-10',
    slug: 'woocommerce-seo-sku-auditor',
    name: 'WooCommerce SKU & Catalog Metadata Integrity Auditor',
    category: 'E-Commerce',
    url: '/tools/woocommerce-seo-sku-auditor/',
    description: 'Scans WooCommerce catalogs for SKU collisions, missing SEO meta titles, empty image alt text tags, and unindexed custom attributes.',
    capabilities: ['SKU collision detection', 'Missing meta title audit', 'Image alt tag validation', 'Attribute indexing audit']
  }
];

export interface ArcadeGameInfo {
  name: string;
  url: string;
  description: string;
  modes: string[];
  tracks: string[];
}

export const CODE_ARCADE_INFO: ArcadeGameInfo = {
  name: 'Code Arcade',
  url: '/arcade/',
  description: 'An interactive, retro-futuristic browser-based developer coding arena where developers test logic, solve puzzles, and battle bosses in real code.',
  modes: [
    'Puzzle Mode: Grid navigation coding challenges where players program movements, collect keys, and bypass hazard lasers using code.',
    'Boss Fighter Mode: Turn-based algorithmic battle arena writing real functions to deal damage to bosses like Memory Leaker, Callback Hell Demon, and Deadlock Titan.'
  ],
  tracks: [
    'JavaScript (ES6+): Array methods, event loops, algorithmic bottlenecks',
    'Python: List comprehensions, data normalization, regex parsers',
    'React: State management, hook lifecycles, component composition',
    'HTML/CSS: Flexbox, CSS Grid layouts, semantic markup',
    'API & JSON: Webhook payload parsing, HTTP status codes, schema validation'
  ]
};

export const CONSULTATIVE_CORE_MESSAGE = 
  "Sheharyar specializes in high-performance web systems and AI engineering. His core pillars include Custom WordPress VIP & WooCommerce HPOS architecture, Autonomous AI Voice Agents via Vapi and Twilio, Self-Hosted n8n Automation clusters, Deterministic Multi-Agent AI, and Data Analytics & Data Science Solutions. Which specific bottleneck are you looking to solve?";

export const CONSULTATIVE_URDU_MESSAGE =
  "Sheharyar high-performance web systems aur AI engineering mein specialize karte hain: Custom WordPress VIP & WooCommerce HPOS architecture, Vapi aur Twilio par autonomous AI voice agents, self-hosted n8n automation clusters, multi-agent AI systems, aur Data Analytics & Data Science. Aapko kis specific bottleneck ya project par guidance chahiye?";

// ============================================================================
// TASK 1: SEMANTIC SYNONYM & INTENT MAPPING MATRIX (FUZZY SERVICE MATCHING)
// Maps everyday colloquial client words to specialized engineering capabilities
// ============================================================================

export interface IntentMapping {
  id: string;
  category: string;
  serviceKey: string;
  clientKeywords: string[];
  serviceTitle: string;
  focus: string;
  responseTemplate: {
    validate: string;
    differentiate: string;
    ask: string;
    fullVoice: string;
    fullText: string;
  };
  urduResponseTemplate: {
    fullVoice: string;
    fullText: string;
  };
}

export const INTENT_MAPPINGS: IntentMapping[] = [
  // 1. Website / Web page / Blog / Portfolio / Online presence
  {
    id: 'intent-website',
    category: 'web-engineering',
    serviceKey: 'custom-wordpress',
    clientKeywords: [
      'website', 'web page', 'webpage', 'web site', 'blog', 'portfolio',
      'online presence', 'need a site', 'build a site', 'new site', 'web design',
      'landing page', 'redesign site', 'company site', 'business website', 'develop a website'
    ],
    serviceTitle: 'Custom WordPress VIP & Rapid Vibe Coding Architecture',
    focus: 'Fast loading, mobile-ready, clean UI, easy to manage, zero page builder bloat.',
    responseTemplate: {
      validate: 'Yes, we engineer high-performance web systems tailored to your technical requirements.',
      differentiate: 'We offer two tailored engineering paths: Custom WordPress VIP with an intuitive visual CMS admin dashboard to edit content and images yourself with zero bloat, or Rapid Vibe Coding in React for ultra-fast 2-day delivery with modern React and high production speed.',
      ask: 'Which direction would you prefer for your project — WordPress VIP or Rapid Vibe Coding React?',
      fullVoice: 'We offer two tailored engineering paths for websites: Custom WordPress VIP with an easy visual CMS admin to edit content and images yourself with zero bloat, or Rapid Vibe Coding in React for ultra-fast 2-day delivery with high production speed. Which direction would you prefer for your project?',
      fullText: 'We offer two tailored engineering paths for websites:\n\n1. **Custom WordPress VIP**: Complete freedom with an intuitive visual CMS admin dashboard to edit your own content and images without coding, sub-500ms speed, and zero page-builder bloat.\n2. **Rapid Vibe Coding in React**: Ultra-fast 2-day delivery, high-concurrency production speed, and modern React/Vite architecture (developer-managed code).\n\nWhich direction would you prefer for your project — WordPress VIP or Rapid Vibe Coding in React?'
    },
    urduResponseTemplate: {
      fullVoice: 'Hum websites ke liye do options offer karte hain: Pehla Custom WordPress VIP, jis mein aapko easy visual admin dashboard milta hai taake aap khud bina coding content edit kar sakein, sub-500ms speed ke sath. Doosra Rapid Vibe Coding in React, jo ultra-fast 2 din mein deliver hota hai. Aap kis taraf jana chahenge — WordPress VIP ya Vibe Coding React?',
      fullText: 'Hum websites ke liye do specific engineering directions offer karte hain:\n\n1. **Custom WordPress VIP**: Complete freedom with an easy visual CMS admin dashboard to edit content and images yourself without coding, sub-500ms speed, aur zero page-builder bloat.\n2. **Rapid Vibe Coding in React**: Ultra-fast 2 din mein production delivery, high-concurrency speed, aur modern React/Vite architecture (developer-managed code).\n\nAap apne project ke liye kis taraf jana chahenge — WordPress VIP ya Vibe Coding React?'
    }
  },

  // 2. Excel / Sheets / Numbers / Reporting / Dashboard / Power BI
  {
    id: 'intent-excel-analytics',
    category: 'data-analytics',
    serviceKey: 'data-analytics-data-science',
    clientKeywords: [
      'excel', 'sheets', 'sheet', 'spreadsheet', 'spreadsheets', 'numbers',
      'reporting', 'report', 'dashboard', 'dashboards', 'power bi', 'powerbi',
      'tableau', 'pivot', 'pivot table', 'data report', 'excel sheet', 'analyze data',
      'bi dashboard', 'business metrics', 'kpi report'
    ],
    serviceTitle: 'Data Analytics & Business Intelligence Solutions',
    focus: 'Power BI dashboards, automated Excel reports, dynamic pivot analysis, and SQL query pipelines.',
    responseTemplate: {
      validate: 'Yes, we turn raw spreadsheets and numbers into automated executive dashboards and clean reporting models.',
      differentiate: 'We provide two distinct data solutions: Executive Power BI & Excel Dashboards for dynamic visual KPI reporting and daily automated refresh, or Predictive Python ML Pipelines for customer churn forecasting and demand modeling.',
      ask: 'Which approach are you looking to explore — executive dashboards or predictive machine learning?',
      fullVoice: 'For data systems, we offer two distinct approaches: Executive Power BI and Excel Dashboards with dynamic visual KPI reports and automated daily refresh, or Predictive Python ML Pipelines for churn forecasting and demand modeling. Which approach are you looking to explore?',
      fullText: 'For data systems, we offer two distinct engineering approaches:\n\n1. **Executive Power BI & Excel Dashboards**: Interactive visual KPI reports, automated pivot pipelines, and daily automated refresh for leadership.\n2. **Predictive Python ML Pipelines**: Custom machine learning models forecasting customer churn, customer lifetime value, and demand trends.\n\nWhich approach are you looking to explore — executive dashboards or predictive machine learning?'
    },
    urduResponseTemplate: {
      fullVoice: 'Data solutions mein hum do options provide karte hain: Executive Power BI aur Excel Dashboards dynamic visual KPI reports aur automated refresh ke sath, ya Predictive Python ML Pipelines churn forecasting ke liye. Aapko executive dashboards chahiye ya predictive ML pipelines?',
      fullText: 'Hum data solutions mein do options provide karte hain:\n\n1. **Executive Power BI & Excel Dashboards**: Dynamic visual KPI reports, automated formula pipelines, aur daily automated refreshes for decision-makers.\n2. **Predictive Python ML Pipelines**: Machine learning models jo customer churn aur sales demand forecast karte hain.\n\nAapko executive dashboards chahiye ya predictive machine learning pipelines?'
    }
  },

  // 3. Online store / Shop / Selling online / Ecommerce / Payments
  {
    id: 'intent-ecommerce',
    category: 'web-engineering',
    serviceKey: 'woocommerce-hpos',
    clientKeywords: [
      'online store', 'store', 'shop', 'selling online', 'ecommerce', 'e-commerce',
      'payments', 'payment gateway', 'woocommerce', 'shopify', 'checkout', 'cart',
      'stripe', 'paypal', 'order management', 'drop sales', 'high concurrency'
    ],
    serviceTitle: 'WooCommerce High-Performance Systems & E-Commerce Architecture',
    focus: 'High-concurrency checkout, payment gateway setups (Stripe/PayPal), and inventory scaling.',
    responseTemplate: {
      validate: 'Yes, we engineer high-concurrency e-commerce stores designed for seamless checkout and high conversion.',
      differentiate: 'We offer two scalable paths: WooCommerce HPOS Architecture with an intuitive visual store dashboard handling 10,000+ daily orders, or Custom Headless Next.js Stores with Stripe integration.',
      ask: 'Would you prefer WooCommerce HPOS or a Custom Headless Store?',
      fullVoice: 'We offer two scalable paths for e-commerce: WooCommerce HPOS Architecture with an easy visual store dashboard handling over 10,000 daily orders, or a Custom Headless Next.js Store with Stripe integration. Which direction fits your business best?',
      fullText: 'We offer two scalable paths for e-commerce architecture:\n\n1. **WooCommerce HPOS Architecture**: High-Performance Order Storage scaling past 10,000 orders/day with an easy visual dashboard to manage products and orders.\n2. **Custom Headless Next.js Store**: Ultra-fast headless storefront with modern React architecture and Stripe checkout.\n\nWhich direction fits your online store better?'
    },
    urduResponseTemplate: {
      fullVoice: 'Hum e-commerce ke liye do options deliver karte hain: WooCommerce HPOS jo 10,000 daily orders process karta hai easy visual dashboard ke sath, ya Custom Headless Next.js store Stripe ke sath. Aap kaun sa prefer karenge?',
      fullText: 'Hum E-Commerce ke liye do options deliver karte hain:\n\n1. **WooCommerce HPOS Architecture**: 10,000+ daily orders scaling with an easy visual store dashboard to manage products, coupons, and orders.\n2. **Custom Headless Next.js Store**: Ultra-fast headless storefront with modern React architecture aur Stripe checkout.\n\nAap WooCommerce HPOS prefer karenge ya Custom Headless Store?'
    }
  },

  // 4. Phone bot / Calling / Voice assistant / Receptionist / Automated calls
  {
    id: 'intent-voice-ai',
    category: 'voice-ai',
    serviceKey: 'voice-agents',
    clientKeywords: [
      'phone bot', 'phone agent', 'calling', 'call handling', 'voice assistant',
      'receptionist', 'ai receptionist', 'automated calls', 'outbound calls', 'inbound calls',
      'telephony', 'vapi', 'retell', 'twilio', 'ai phone', 'voice bot', 'virtual receptionist'
    ],
    serviceTitle: 'Autonomous AI Voice Telephony & 24/7 Phone Receptionists',
    focus: '24/7 automated call handling, instant appointment booking, and CRM sync.',
    responseTemplate: {
      validate: 'Yes, we deploy conversational AI phone agents that answer calls 24/7 with natural, sub-600ms latency.',
      differentiate: 'They handle natural turn-taking, book appointments directly into Google Calendar or Cal.com, and sync transcripts straight to your CRM.',
      ask: 'Are you looking for an inbound phone receptionist or automated outbound calling?',
      fullVoice: 'Yes, we deploy conversational AI phone agents that answer calls 24/7 with natural, sub-600ms latency. They handle incoming inquiries, book appointments directly into your calendar, and sync notes straight to your CRM. Are you looking for an inbound receptionist or automated outbound calling?',
      fullText: 'Yes, we deploy conversational AI phone agents that answer calls 24/7 with natural, sub-600ms latency.\n\nThey handle incoming inquiries, book appointments directly into Google Calendar or Cal.com, and sync call transcripts straight to your CRM.\n\nAre you looking for an inbound receptionist or automated outbound calling?'
    },
    urduResponseTemplate: {
      fullVoice: 'Ji haan, hum 24/7 conversational AI voice agents deploy karte hain jo phone calls attend karte hain aur direct calendar booking karte hain. Kya aap inbound reception ke liye chahte hain ya outbound calling?',
      fullText: 'Ji haan, hum autonomous AI Voice Telephony systems build karte hain via Vapi, Retell AI, aur Twilio:\n\n• **Sub-600ms Latency**: Natural human turn-taking aur barge-in interruption handling.\n• **Calendar Scheduling**: Real-time Google Calendar ya Cal.com booking during calls.\n• **CRM Sync**: Call recordings, notes, aur qualified leads direct CRM mein push hoti hain.\n\nYeh inbound reception ke liye chahiye ya outbound sales calls ke liye?'
    }
  },

  // 5. Automation / Zapier / Connect apps / Sync data / Workflows
  {
    id: 'intent-automation',
    category: 'automation',
    serviceKey: 'n8n-automation',
    clientKeywords: [
      'automation', 'automate', 'zapier', 'connect apps', 'sync data', 'workflows',
      'workflow', 'n8n', 'make.com', 'integration', 'integrate', 'webhooks',
      'eliminate zapier', 'api sync', 'data sync', 'repetitive tasks'
    ],
    serviceTitle: 'Self-Hosted n8n Workflow Clusters & API Integrations',
    focus: 'Eliminating manual repetitive tasks, secure internal data handling, and custom API connections.',
    responseTemplate: {
      validate: 'Yes, we engineer robust automated workflows using self-hosted n8n clusters and Make.com to eliminate repetitive work.',
      differentiate: 'We connect your apps, CRMs, and databases with zero data loss while eliminating expensive monthly Zapier subscription costs.',
      ask: 'Which tools or internal workflows are you looking to connect and automate?',
      fullVoice: 'Yes, we engineer robust automated workflows using self-hosted n8n clusters and Make.com to eliminate manual repetitive work. We connect your apps, CRMs, and databases with zero data loss while eliminating expensive monthly Zapier fees. Which tools or tasks are you looking to connect and automate?',
      fullText: 'Yes, we engineer robust automated workflows using self-hosted n8n clusters and Make.com to eliminate manual repetitive work.\n\nWe connect your apps, CRMs, and databases with zero data loss while eliminating expensive monthly Zapier subscription fees.\n\nWhich tools or internal workflows are you looking to connect and automate?'
    },
    urduResponseTemplate: {
      fullVoice: 'Ji haan, hum self-hosted n8n clusters aur Make.com par automations build karte hain jo Zapier ki monthly fees 100% khatam karti hain. Kaun se apps ya workflows connect karne hain?',
      fullText: 'Ji haan, hum production-ready Workflow Automation systems engineer karte hain:\n\n• **Zero Zapier Fees**: Private VPS Docker clusters jo recurring task charges khatam kar dete hain.\n• **0% Data Loss**: Dead Letter Queue (DLQ) retry architecture for 99.95% uptime.\n• **Data Privacy**: GDPR-compliant self-hosted private cloud infrastructure.\n\nKaun se apps, databases, ya internal workflows connect karne hain?'
    }
  },

  // 6. Machine learning / AI model / Scraping / Extract data
  {
    id: 'intent-ml-scraping',
    category: 'automation',
    serviceKey: 'data-pipelines-scraping',
    clientKeywords: [
      'machine learning', 'ai model', 'ml model', 'scraping', 'scrapers', 'scraper',
      'extract data', 'web scraping', 'scrape data', 'data science', 'predictive',
      'predictive model', 'churn prediction', 'forecasting', 'scrapegraphai', 'playwright'
    ],
    serviceTitle: 'Data Science, Predictive Analytics & Custom Web Scraping Pipelines',
    focus: 'Customer churn prediction, sales forecasting, ScrapeGraphAI, headless browser automation.',
    responseTemplate: {
      validate: 'Yes, we build custom predictive machine learning models and resilient web scraping pipelines.',
      differentiate: 'From predicting customer churn and sales trends to harvesting competitor data with anti-bot bypass, we turn complex data into strategic revenue.',
      ask: 'What kind of machine learning models or web data sources are you looking to work with?',
      fullVoice: 'Yes, we build custom predictive machine learning models and resilient web scraping pipelines. From predicting customer churn and sales trends to harvesting competitor data with anti-bot bypass, we turn complex data into strategic revenue. What kind of machine learning models or web data sources are you looking to work with?',
      fullText: 'Yes, we build custom predictive machine learning models and resilient web scraping pipelines.\n\nFrom forecasting customer churn and sales trends to harvesting competitor pricing with anti-bot bypass, we turn web and operational data into strategic revenue assets.\n\nWhat kind of machine learning models or web data sources are you looking to work with?'
    },
    urduResponseTemplate: {
      fullVoice: 'Ji haan, hum Python predictive machine learning models aur automated web data scrapers build karte hain churn prediction aur market data ke liye. Aapko kis tarah ka data model ya scraping pipeline chahiye?',
      fullText: 'Ji haan, hum Data Science aur Automated Web Scraping pipelines deliver karte hain:\n\n• **Predictive Models**: Customer churn, LTV, aur demand forecasting.\n• **Headless Scraping**: Anti-bot bypass with automated schema validation.\n• **Structured Ingestion**: Clean data loading directly into PostgreSQL ya dashboards.\n\nAapko predictive modeling chahiye ya web data scraping pipelines?'
    }
  },

  // 7. AI Bot / Chatbot / Agentic AI / RAG / Assistant
  {
    id: 'intent-ai-agents',
    category: 'agentic-ai',
    serviceKey: 'agentic-ai',
    clientKeywords: [
      'ai bot', 'chatbot', 'chat bot', 'ai agent', 'agentic ai', 'agentic',
      'rag', 'ai system', 'ai assistant', 'custom bot', 'chatgpt bot', 'langgraph'
    ],
    serviceTitle: 'Autonomous AI Agents & Enterprise RAG Systems',
    focus: 'Grounded document search chatbots, tool-calling agents, and LangGraph multi-agent systems.',
    responseTemplate: {
      validate: 'Yes, we engineer production AI systems tailored directly to your operational workflows.',
      differentiate: 'We offer two tailored AI architectures: Contextual RAG Chatbots for zero-hallucination private document search, or Autonomous Agentic AI workflows with tool-calling via LangGraph.',
      ask: 'Which AI architecture aligns with your project — a document search RAG chatbot or an autonomous agent workflow?',
      fullVoice: 'We offer two tailored AI architectures: Contextual RAG Chatbots with zero hallucination private document search, or Autonomous Agentic AI workflows using LangGraph with tool-calling capabilities. Which of these aligns with your project goals?',
      fullText: 'We offer two tailored AI architectures for enterprise operations:\n\n1. **Contextual RAG Chatbots**: Zero-hallucination document search grounded strictly in your private PDFs, manuals, and databases via vector embeddings.\n2. **Autonomous Agentic AI**: Stateful LangGraph multi-agent workflows with tool-calling capabilities that interact directly with your APIs and CRMs.\n\nWhich of these aligns with what you want to build?'
    },
    urduResponseTemplate: {
      fullVoice: 'Hum AI systems ke liye do tailored options offer karte hain: Pehla Contextual RAG Chatbots jo private documents se zero-hallucination answers dete hain, aur doosra Autonomous Agentic AI jo LangGraph ke zariye tools call kar ke tasks complete karta hai. Aap kis taraf jana chahenge?',
      fullText: 'Hum AI systems ke liye do tailored architectures deliver karte hain:\n\n1. **Contextual RAG Chatbots**: Zero-hallucination private document retrieval (PDFs, docs) via vector search.\n2. **Autonomous Agentic AI**: Stateful LangGraph multi-agent systems with tool-calling capabilities jo real-world tasks autonomously execute karte hain.\n\nAapko document search RAG bot chahiye ya tool-calling Autonomous AI Agent?'
    }
  },

  // 8. Agency White-Label / Subcontracting / Partner
  {
    id: 'intent-agency-whitelabel',
    category: 'agency-partners',
    serviceKey: 'white-label-subcontracting',
    clientKeywords: [
      'agency', 'white-label', 'whitelabel', 'subcontracting', 'subcontract',
      'dev partner', 'engineering partner', 'overflow', 'overflow capacity',
      'retainer', 'hire developer for agency', 'partner with us', 'under nda'
    ],
    serviceTitle: 'White-Label Agency Subcontracting & Retainers',
    focus: 'Dedicated technical engineering partner for USA, UK, UAE, and EU agencies under bilateral NDA.',
    responseTemplate: {
      validate: 'Yes, we act as a dedicated behind-the-scenes engineering partner for digital and marketing agencies under strict bilateral NDA.',
      differentiate: 'We seamlessly handle high-complexity WordPress VIP builds, AI voice telephony, and n8n automations with zero junior management overhead.',
      ask: 'What kind of overflow development capacity or client projects is your agency currently looking to handle?',
      fullVoice: 'Yes, we act as a dedicated behind-the-scenes engineering partner for digital and marketing agencies under strict bilateral NDA. We handle complex WordPress VIP builds, AI voice telephony, and n8n automations with zero management overhead. What kind of overflow development capacity is your agency looking for?',
      fullText: 'Yes, we act as a dedicated behind-the-scenes engineering partner for digital and marketing agencies under strict bilateral NDA.\n\nWe seamlessly handle high-complexity WordPress VIP builds, AI voice telephony, and n8n automations with zero junior management overhead.\n\nWhat kind of overflow development capacity or client projects is your agency currently looking to handle?'
    },
    urduResponseTemplate: {
      fullVoice: 'Ji haan, hum US, UK aur UAE ki digital agencies ke sath strict bilateral NDA ke tehat dedicated white-label engineering partner ke tor par kaam karte hain. Aapki agency ko kis tarah ki overflow capacity chahiye?',
      fullText: 'Ji haan, hum digital agencies ke dedicated White-Label Technical Partner hain:\n\n• **Bilateral NDA**: 100% white-label confidentiality aur zero client poaching.\n• **Senior Execution**: Aapke agency Slack ya GitHub mein seamlessly embed hote hain.\n• **Predictable Sprints**: Dedicated weekly capacity without payroll overhead.\n\nAapki agency ko kis tarah ki development capacity ya client project mein help chahiye?'
    }
  }
];

/**
 * Fuzzy matcher that maps colloquial client queries to the correct specialized service
 */
export function matchIntentFromQuery(query: string): IntentMapping | null {
  if (!query) return null;
  const clean = query.toLowerCase().trim();

  // Tokenize query words
  const words = clean.replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter(Boolean);

  for (const mapping of INTENT_MAPPINGS) {
    for (const kw of mapping.clientKeywords) {
      const kwLower = kw.toLowerCase();
      // Multi-word keyword match (e.g., "web page", "online store", "phone bot")
      if (kwLower.includes(' ')) {
        if (clean.includes(kwLower)) {
          return mapping;
        }
      } else {
        // Single-word keyword match
        if (words.includes(kwLower) || (kwLower.length >= 5 && clean.includes(kwLower))) {
          return mapping;
        }
      }
    }
  }

  return null;
}

// ============================================================================
// TASK 3: REPOSITORY-WIDE AUTOMATED DATA INGESTION
// Compiles live services, tools, arcade, case studies, and contact endpoints
// ============================================================================

export interface IngestedServiceSummary {
  id: string;
  title: string;
  keywords: string[];
  problemsSolved: string[];
  businessBenefits: string[];
  pricingRange: string;
  timeline: string;
}

export interface IngestedToolSummary {
  slug: string;
  name: string;
  category: string;
  url: string;
  problemSolved: string;
  capabilities: string[];
}

export interface RepositoryKnowledgeContext {
  identity: {
    name: string;
    title: string;
    agency: string;
    contact: {
      whatsapp: string;
      email: string;
    };
    sla: string;
  };
  services: IngestedServiceSummary[];
  tools: IngestedToolSummary[];
  arcade: ArcadeGameInfo;
  caseStudies: Array<{
    title: string;
    category: string;
    problem: string;
    outcome: string;
    tech: string;
  }>;
}

/**
 * Dynamically ingests and indexes repository state into a lightweight, structured knowledge graph
 */
export function compileRepositoryKnowledge(): RepositoryKnowledgeContext {
  const services: IngestedServiceSummary[] = Object.values(CORE_10_SERVICES).map((s) => ({
    id: s.id,
    title: s.title,
    keywords: [
      s.shortName.toLowerCase(),
      s.pillar,
      ...s.technicalSpecs.slice(0, 3).map((t) => t.split(' ')[0].toLowerCase())
    ],
    problemsSolved: [
      s.deepDive,
      ...s.discoveryQuestions
    ],
    businessBenefits: s.deliverables,
    pricingRange: s.pricingRange,
    timeline: s.typicalTimeline
  }));

  const tools: IngestedToolSummary[] = Object.values(TOOLS_TAXONOMY).map((t) => ({
    slug: t.slug,
    name: t.name,
    category: t.category,
    url: t.targetUrl,
    problemSolved: t.problemStatement,
    capabilities: t.features.slice(0, 3)
  }));

  const caseStudies = CASE_STUDIES.slice(0, 4).map((cs) => ({
    title: cs.title,
    category: cs.category,
    problem: cs.problem,
    outcome: cs.outcome,
    tech: cs.tech
  }));

  return {
    identity: {
      name: ARCHITECT_IDENTITY.name,
      title: ARCHITECT_IDENTITY.title,
      agency: ARCHITECT_IDENTITY.agency,
      contact: {
        whatsapp: CONTACT_INFO.phone,
        email: CONTACT_INFO.email
      },
      sla: ARCHITECT_IDENTITY.responseSla
    },
    services,
    tools,
    arcade: CODE_ARCADE_INFO,
    caseStudies
  };
}

export const REPOSITORY_KNOWLEDGE_CONTEXT: RepositoryKnowledgeContext = compileRepositoryKnowledge();

/**
 * Concise, structured markdown system context passed to Gemini / LLMs
 */
export const SYSTEM_KNOWLEDGE_SUMMARY = `[ACTIVE APPLICATION KNOWLEDGE CONTEXT]
- Architect: Sheharyar Siraj | Agency: Ansari Web Agency | Portfolio: sheharyarsiraj.com
- Contact: WhatsApp: +92 313 2080033 | Email: sherryansari870@gmail.com | SLA: Guaranteed 2-Hour Response under Bilateral NDA

CORE CAPABILITIES & SOLUTIONS:
1. Custom WordPress Development: Zero-builder, clean PHP 8.2 VIP, custom Gutenberg blocks, sub-500ms TTFB, 95+ Core Web Vitals ($1,200–$3,500; 1–3 weeks).
2. Autonomous AI Voice Telephony: Sub-600ms conversational phone receptionists via Vapi and Twilio SIP with 24/7 Google Calendar / Cal.com booking & CRM sync ($1,500–$4,000; 1–2 weeks).
3. Workflow Automation & n8n: Self-hosted multi-worker Docker clusters with Redis queues, eliminating expensive Zapier fees with 0% data loss ($800–$2,500; 3–7 days).
4. WooCommerce HPOS Architecture: High-Performance Order Storage scaling past 10,000 orders/day with zero DB deadlocks ($1,500–$3,500; 1–2 weeks).
5. Data Analytics & Business Intelligence: Power BI dashboards, automated Excel dynamic reporting models, SQL ETL pipelines, and Python predictive modeling ($1,200–$4,000; 1–3 weeks).
6. White-Label Agency Subcontracting: Behind-the-scenes senior engineering partner for USA, UK, UAE, and EU agencies under strict bilateral NDA ($1,500–$3,500/week).

ALL 10 INTERACTIVE DEVELOPER UTILITY TOOLS (Live at /tools/):
- Webhook Payload Tester (/tools/webhook-payload-tester/)
- WordPress Database Bloat Estimator (/tools/wordpress-database-bloat-estimator/)
- Custom Post Type Code Exporter (/tools/wordpress-cpt-code-exporter/)
- PSR-4 WordPress Plugin Boilerplate Generator (/tools/wordpress-plugin-boilerplate-generator/)
- AI Voice Agent ROI Calculator (/tools/voice-agent-roi-calculator/)
- AI Voice Prompt Designer (/tools/ai-voice-prompt-designer/)
- n8n Error Handler Generator (/tools/n8n-error-handler-generator/)
- Local Schema & Entity Generator (/tools/local-schema-generator/)
- LLM SEO Meta Generator (/tools/llm-seo-meta-generator/)
- WooCommerce SKU & Catalog Auditor (/tools/woocommerce-seo-sku-auditor/)

INTERACTIVE CODE ARCADE (Live at /arcade/):
- Browser developer arena featuring Puzzle Mode and Boss Fighter Mode across JavaScript, Python, React, HTML/CSS, and API/JSON.`;

