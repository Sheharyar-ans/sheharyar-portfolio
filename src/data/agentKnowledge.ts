/**
 * Grounded Knowledge Layer & Live Service Catalog for sheharyarsiraj.com
 * Principal Architect: Sheharyar Siraj (Ansari Web Agency)
 */

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
  "We specialize in high-performance web systems and AI engineering. Our core pillars include Custom WordPress VIP & WooCommerce HPOS architecture, Autonomous AI Voice Agents via Vapi and Twilio, Self-Hosted n8n Automation clusters, Deterministic Multi-Agent AI, and Data Analytics & Data Science Solutions. Which specific bottleneck are you looking to solve?";

export const CONSULTATIVE_URDU_MESSAGE =
  "Hum high-performance web systems aur AI engineering mein specialize karte hain. Hamare core pillars mein Custom WordPress VIP & WooCommerce HPOS architecture, Vapi aur Twilio par autonomous AI voice agents, self-hosted n8n automation clusters, multi-agent AI systems, aur Data Analytics & Data Science shamil hain. Aapko kis specific bottleneck ya project par guidance chahiye?";
