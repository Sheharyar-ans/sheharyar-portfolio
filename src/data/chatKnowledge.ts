export interface ServiceKnowledge {
  id: string;
  name: string;
  category: string;
  summary: string;
  technicalSpecs: string[];
  idealFor: string;
  deliverables: string[];
  ctaText: string;
  ctaUrl: string;
}

export interface EnterpriseFaq {
  category: string;
  question: string;
  keywords: string[];
  answer: string;
  suggestedAction?: {
    type: 'whatsapp' | 'inquiry' | 'link';
    label: string;
    url?: string;
  };
}

export const SHEHARYAR_IDENTITY = {
  name: 'Sheharyar Siraj',
  role: 'Senior WordPress Architect & Agentic AI Automation Engineer',
  experienceYears: '5+ years commercial engineering experience',
  projectsDelivered: '1,200+ verified projects completed worldwide',
  reputation: '100% Job Success Score (JSS) on Upwork, 5.0 Star Verified Rating, Top Rated Freelancer',
  certifications: [
    'Cisco Certified Network Professional (CCNP)',
    'Cisco Certified CyberOps Associate',
    'Google Cloud Vertex AI Certified Professional',
    'AI for App Building & Data Analysis Certified',
    'Virtual University of Pakistan (BBIT - Computer Software Engineering)'
  ],
  locationsCovered: 'United States, United Kingdom, UAE (Dubai/Abu Dhabi), Saudi Arabia (Riyadh/Jeddah), Germany, Australia, Canada, Netherlands, Singapore, Malaysia, and Pakistan',
  contact: {
    whatsapp: '+92 313 2080033',
    whatsappUrl: 'https://wa.me/923132080033',
    email: 'sherryansari870@gmail.com',
    upwork: 'https://www.upwork.com/freelancers/sheharyarsiraj',
    slaResponse: 'Guaranteed under 2 business hours'
  },
  commercialTerms: {
    nda: 'Strict bilateral Non-Disclosure Agreement (NDA) signed before architecture scoping',
    ipOwnership: '100% intellectual property, code repository, and asset ownership transferred upon milestone completion',
    warranty: '30-day comprehensive post-launch warranty covering bug fixes and system stability',
    paymentRails: 'Multi-currency settlement natively in USD ($), EUR (€), GBP (£), AED, SAR, AUD, SGD, or CAD via Wise, Direct Wire, Stripe, or Upwork Escrow',
    collaborationModel: 'Direct senior architect collaboration via Slack, Microsoft Teams, GitHub, and WhatsApp with zero junior account manager red tape'
  }
};

export const CORE_SERVICES: Record<string, ServiceKnowledge> = {
  wordpress: {
    id: 'custom-wordpress-development',
    name: 'Custom WordPress VIP & PHP 8.2 Architecture',
    category: 'Web Architecture',
    summary: 'Bespoke, unbloated WordPress architectures engineered with strictly typed PHP 8.2+, custom Gutenberg block themes, sub-600ms TTFB, and guaranteed 95+ Google Lighthouse mobile scores.',
    technicalSpecs: [
      'Strictly typed PHP 8.2/8.3 object-oriented code adhering to WordPress VIP coding standards',
      'Decoupled Gutenberg block themes replacing heavy page builders (Elementor/Divi) for zero-bloat DOM',
      'Redis object caching and Cloudflare edge page caching achieving sub-1.0s Largest Contentful Paint (LCP)',
      'Automated database transient cleanups, index optimization, and PSR-12 architectural compliance'
    ],
    idealFor: 'Mid-market businesses, publishing networks, and enterprises suffering from slow page load speeds, bloated plugin stacks, or failing Core Web Vitals.',
    deliverables: ['Custom Theme Codebase', 'Gutenberg Blocks', 'Redis Cache Configuration', '100% Lighthouse Optimization'],
    ctaText: 'Scope WordPress Build on WhatsApp',
    ctaUrl: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20am%20interested%20in%20a%20Custom%20WordPress%20VIP%20build.'
  },
  voiceAi: {
    id: 'ai-voice-agents',
    name: 'Autonomous Conversational AI Voice Agents',
    category: 'Voice Telephony & AI',
    summary: 'Sub-600ms low-latency AI voice telephony systems built on Vapi, Retell AI, Deepgram Nova-2, and ElevenLabs over Twilio SIP trunks with real-time tool calling and CRM synchronization.',
    technicalSpecs: [
      'Sub-600ms conversational voice turn-taking latency with natural interruption handling',
      'Deterministic JSON state machines ensuring zero off-script hallucinations and strict compliance',
      'Real-time API tool calling: live Google Calendar booking, CRM lead logging, and inventory checks',
      'Native Twilio SIP trunking with local telephone numbers across US, UK, Australia, and GCC area codes'
    ],
    idealFor: 'Clinics, legal firms, home service contractors, and high-volume sales teams seeking 24/7 autonomous phone triage, booking, and qualification.',
    deliverables: ['Vapi/Retell Voice Engine', 'Prompt State Machine', 'Twilio SIP Trunking', 'CRM/Calendar Webhooks'],
    ctaText: 'Hire Voice AI Engineer on WhatsApp',
    ctaUrl: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20want%20to%20build%20an%20AI%20Voice%20Agent%20with%20Vapi/Twilio.'
  },
  automation: {
    id: 'workflow-automation-n8n',
    name: 'Self-Hosted n8n Clusters & Workflow Automation',
    category: 'Automation Infrastructure',
    summary: 'Enterprise workflow automation pipelines utilizing self-hosted n8n clusters and Make.com to eliminate manual data entry and replace expensive Zapier fees with 99.95% operational reliability.',
    technicalSpecs: [
      'Dockerized self-hosted n8n clusters deployed on private cloud servers (AWS, Hetzner, DigitalOcean)',
      'Redis-backed queue workers and Dead Letter Queues (DLQ) preventing data loss during API outages',
      'Multi-platform synchronization: HubSpot, Salesforce, GoHighLevel, Stripe, and QuickBooks',
      'HMAC webhook signature validation and encrypted credential vaults'
    ],
    idealFor: 'Scaling businesses and agencies processing tens of thousands of monthly webhook events who want to cut Zapier SaaS bills and achieve enterprise reliability.',
    deliverables: ['Self-Hosted n8n Server', 'Automated Workflow Pipelines', 'DLQ Monitoring', 'Webhook Integrations'],
    ctaText: 'Discuss n8n Workflows on WhatsApp',
    ctaUrl: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20want%20to%20automate%20workflows%20using%20self-hosted%20n8n.'
  },
  woocommerce: {
    id: 'woocommerce-systems-architecture',
    name: 'WooCommerce HPOS High-Concurrency Architecture',
    category: 'E-Commerce Infrastructure',
    summary: 'High-throughput WooCommerce engineering utilizing High-Performance Order Storage (HPOS), Redis caching, checkout table sharding, and sub-400ms API response times handling 10,000+ daily orders.',
    technicalSpecs: [
      'High-Performance Order Storage (HPOS) database migration eliminating wp_postmeta bottlenecks',
      'Redis object caching for high-speed cart and checkout session handling during flash sales',
      'Payment gateway routing: Stripe, PayPal, Authorize.Net, iPay88, and ZATCA Phase 2 e-invoicing',
      'Automated background order processing workers with ERP inventory sync'
    ],
    idealFor: 'High-volume e-commerce brands and retailers experiencing checkout timeouts, slow inventory searches, or database deadlocks during promotions.',
    deliverables: ['HPOS Table Migration', 'Checkout Speed Tuning', 'Payment Gateway Hardening', 'Redis Architecture'],
    ctaText: 'Optimize WooCommerce on WhatsApp',
    ctaUrl: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20need%20to%20scale%20my%20WooCommerce%20store%20checkout.'
  },
  ragChatbots: {
    id: 'ai-chatbots-rag',
    name: 'Contextual AI Chatbots & Enterprise RAG Systems',
    category: 'Knowledge Systems',
    summary: 'Zero-hallucination conversational AI assistants grounded in verified proprietary knowledge bases using vector databases (Pinecone, Qdrant, pgvector) and hybrid BM25 dense-sparse search.',
    technicalSpecs: [
      'Hybrid dense-sparse vector search combining BM25 keyword matching with vector embeddings',
      'Strict context chunking and cross-encoder re-ranking for verifiable factual grounding',
      'Private cloud deployment guaranteeing client data is never leaked or used to train public LLMs',
      'Omnichannel deployment across web widgets, WhatsApp Business API, and internal Slack bots'
    ],
    idealFor: 'B2B SaaS companies, e-commerce stores, and customer service teams looking to automate 70%+ of tier-1 support inquiries with zero factual errors.',
    deliverables: ['RAG Pipeline', 'Vector Database Setup', 'Embeddings Indexing', 'Web/WhatsApp Integration'],
    ctaText: 'Build Enterprise RAG on WhatsApp',
    ctaUrl: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20am%20looking%20for%20a%20Contextual%20RAG%20AI%20Chatbot.'
  },
  agenticAi: {
    id: 'agentic-ai-applications',
    name: 'Deterministic Agentic AI Systems & Multi-Agent Workflows',
    category: 'Autonomous AI',
    summary: 'Autonomous multi-agent architectures engineered with Python, LangGraph, and deterministic state machines for complex multi-step reasoning, data verification, and human-in-the-loop workflows.',
    technicalSpecs: [
      'LangGraph deterministic state machines with cyclic graph orchestration',
      'Specialized worker agent swarms supervised by a master routing node',
      'Strict JSON schema validation for autonomous external tool execution',
      'Human-in-the-loop escalation checkpoints for critical financial or medical actions'
    ],
    idealFor: 'Companies needing autonomous agents that execute multi-step research, operational tasks, or document processing without drifting off-track.',
    deliverables: ['LangGraph Architecture', 'Agent State Machines', 'Tool-Calling Integrations', 'Monitoring Telemetry'],
    ctaText: 'Consult on Agentic AI on WhatsApp',
    ctaUrl: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20want%20to%20consult%20on%20an%20Agentic%20AI%20workflow.'
  },
  customSaas: {
    id: 'custom-saas-mvp-development',
    name: 'Custom SaaS & MVP Engineering',
    category: 'Product Engineering',
    summary: 'Production-ready B2B multi-tenant cloud applications and MVPs built with React/TypeScript, Node.js or modern PHP, PostgreSQL with Row-Level Security, and Stripe subscription billing in 2 to 4 weeks.',
    technicalSpecs: [
      'Multi-tenant architecture with PostgreSQL Row-Level Security (RLS)',
      'Type-safe React 18 / TypeScript frontend paired with high-throughput REST or GraphQL APIs',
      'Stripe Billing / Customer Portal with automated recurring subscription webhooks',
      'Zero-downtime CI/CD deployment pipelines on AWS, Google Cloud, or Vercel'
    ],
    idealFor: 'Founders and product leaders seeking to validate and launch enterprise-grade software products rapidly without technical debt.',
    deliverables: ['Full-Stack SaaS MVP', 'Stripe Billing Pipeline', 'Multi-Tenant DB Schema', 'CI/CD Setup'],
    ctaText: 'Scope SaaS MVP on WhatsApp',
    ctaUrl: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20want%20to%20scope%20a%20Custom%20SaaS%20MVP.'
  },
  whiteLabel: {
    id: 'white-label-agencies',
    name: 'White-Label Agency Engineering Subcontracting',
    category: 'Agency Partnerships',
    summary: 'Invisible behind-the-scenes WordPress and AI systems development partner for digital marketing, growth, and SEO agencies across the USA, UK, and Australia under strict bilateral NDAs.',
    technicalSpecs: [
      'Strict bilateral Non-Disclosure Agreements (NDAs) with 100% intellectual property transfer to agency',
      'Commits code directly to agency GitHub or GitLab repositories under designated agency handles',
      'Collaborates directly inside agency Slack or Microsoft Teams channels with zero client poaching',
      'Predictable fixed-price sprint estimates delivered within 4 business hours of receiving Figma briefs'
    ],
    idealFor: 'Agency founders and technical directors who have client demand but lack senior in-house full-stack WordPress or AI telephony talent.',
    deliverables: ['Staging QA Link', 'Clean Git Commits', 'Complete Agency Handover', 'Client-Facing Documentation'],
    ctaText: 'Partner with Sheharyar on WhatsApp',
    ctaUrl: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20run%20an%20agency%20and%20want%20to%20discuss%20a%20white-label%20partnership.'
  },
  aiVideoAds: {
    id: 'ai-video-ads-creative-generation',
    name: 'AI Video Ads & Dynamic Creative Generation',
    category: 'Creative AI & Paid Media',
    summary: 'Automated high-converting UGC video ad generation pipelines using AI avatar models (HeyGen, Runway Gen-3, ElevenLabs) with programmatic localization, dynamic script variations, and automated TikTok/Meta exports.',
    technicalSpecs: [
      'Programmatic video rendering pipelines integrated with HeyGen and Runway APIs',
      'Dynamic script templating producing 50+ localized variations per campaign in minutes',
      'High-retention pacing, auto-captioning, and brand typography rendering',
      'Direct API delivery to Meta Ads Manager and TikTok Creative Center'
    ],
    idealFor: 'E-commerce brands, direct-to-consumer (DTC) founders, and performance marketing agencies scaling paid social acquisition.',
    deliverables: ['Rendering Pipeline', 'Script Variations Matrix', 'Direct Video Exports', 'Ad Account Integration'],
    ctaText: 'Explore AI Video Ads on WhatsApp',
    ctaUrl: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20am%20interested%20in%20AI%20Video%20Ads%20generation.'
  },
  dataPipelines: {
    id: 'enterprise-data-pipelines-etl',
    name: 'Enterprise Data Pipelines & High-Throughput ETL',
    category: 'Data Engineering',
    summary: 'Robust, fault-tolerant data ingestion, transformation, and warehouse loading pipelines (ETL/ELT) built with Python, PostgreSQL, Redis, and automated data validation safeguards.',
    technicalSpecs: [
      'Fault-tolerant streaming and batch ingestion with automated retry mechanisms and dead-letter queues',
      'Database normalization, deduplication, and schema validation with Pydantic',
      'Automated sync between transactional databases, warehouses (BigQuery/Snowflake), and analytics dashboards',
      'End-to-end encryption in transit (TLS 1.3) and at rest (AES-256) with strict audit logging'
    ],
    idealFor: 'Fintech platforms, high-volume e-commerce stores, and enterprise operations requiring unified, clean business intelligence without database lag.',
    deliverables: ['ETL Pipeline Architecture', 'Data Warehouse Schema', 'Sync Automation Scripts', 'Monitoring Dashboard'],
    ctaText: 'Consult on Data Pipelines on WhatsApp',
    ctaUrl: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20need%20an%20enterprise%20data%20pipeline%20architecture.'
  }
};

export const ENTERPRISE_FAQS: EnterpriseFaq[] = [
  {
    category: 'pricing',
    question: 'What are your rates, pricing models, and how do you structure project costs?',
    keywords: ['price', 'pricing', 'rates', 'cost', 'charges', 'how much', 'budget', 'quote', 'kitne paise', 'fee', 'hourly'],
    answer: 'Engagements are structured under two transparent, client-friendly models:\n\n1. **Fixed-Price Milestone Contracts**: Best for clearly defined projects (custom WordPress builds, voice agent setups, n8n automation pipelines). We provide a guaranteed, itemized proposal with clear milestones before work begins. No surprise invoices.\n2. **Weekly Sprint Retainers ($1,500 – $3,500/week)**: Best for agencies or growing businesses needing dedicated senior engineering bandwidth, ongoing technical iterations, or multi-phase product rollouts.\n\nAll invoices are settled in your local currency (USD, EUR, GBP, AED, SAR, AUD, CAD) via Wise, Bank Wire, Stripe, or Upwork Escrow with zero foreign conversion markups.',
    suggestedAction: {
      type: 'whatsapp',
      label: 'Get an Instant Fixed Quote on WhatsApp',
      url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20would%20like%20a%20fixed%20pricing%20quote%20for%20my%20project.'
    }
  },
  {
    category: 'turnaround',
    question: 'How fast can you deliver a project and what are your turnaround timelines?',
    keywords: ['turnaround', 'timeline', 'how fast', 'how long', 'delivery time', 'urgency', 'deadline', 'when can you start'],
    answer: 'Turnaround schedules are rapid and strictly adhered to:\n\n• **Immediate Start**: Projects can typically kick off within 24 to 48 hours of milestone approval.\n• **AI Voice Agents & n8n Workflows**: 3 to 7 business days from scoping to live production testing.\n• **Custom WordPress VIP Builds**: 1 to 3 weeks for complete custom block themes, responsive styling, and 95+ speed optimization.\n• **Custom SaaS & MVPs**: 2 to 4 weeks for full-stack multi-tenant applications with Stripe billing.\n• **Agency Sprints**: Fixed turnaround SLAs agreed upon per sprint with daily Loom/Slack updates.',
    suggestedAction: {
      type: 'whatsapp',
      label: 'Check Immediate Start Availability on WhatsApp',
      url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20what%20is%20your%20current%20availability%20to%20start%20a%20project?'
    }
  },
  {
    category: 'white-label',
    question: 'Can you work as an invisible white-label engineer for our agency under an NDA?',
    keywords: ['white-label', 'agency', 'nda', 'subcontract', 'invisible', 'partner', 'slack', 'client poaching'],
    answer: 'Yes! A substantial portion of Sheharyar\'s work is white-label development for digital marketing and SEO agencies across the United States, United Kingdom, and Australia.\n\n• **Strict Bilateral NDA**: We sign comprehensive confidentiality agreements before scoping.\n• **Zero Client Poaching**: We represent your agency exclusively and never pitch or market to your end clients.\n• **Native Git Integration**: We push commits directly to your agency GitHub or GitLab repositories under your organization handles.\n• **Slack / Teams Co-Working**: We join your agency workspace to communicate directly during your active business hours.',
    suggestedAction: {
      type: 'whatsapp',
      label: 'Discuss White-Label Partnership on WhatsApp',
      url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20run%20an%20agency%20and%20would%20like%20to%20discuss%20a%20white-label%20partnership.'
    }
  },
  {
    category: 'locations',
    question: 'How do you coordinate with international clients across different timezones?',
    keywords: ['timezone', 'overlap', 'usa', 'uk', 'germany', 'dubai', 'uae', 'saudi', 'australia', 'hours', 'working hours'],
    answer: 'We provide guaranteed daily real-time business overlap with every major global market:\n\n• **US East & West Coast (EST / PST)**: 4 to 6 hours daily overlap for standups and sprint planning.\n• **United Kingdom (GMT) & Europe (CET)**: Full working day alignment (5 to 7 hours direct daily overlap).\n• **GCC (UAE / Saudi Arabia - GST / AST)**: Direct business hours synchronization.\n• **Australia & APAC (AEST / SGD / MYT)**: 4 to 6 hours morning collaboration overlap.\n\nCommunication is kept fluid via Slack, Microsoft Teams, WhatsApp, and Google Meet.',
    suggestedAction: {
      type: 'whatsapp',
      label: 'Coordinate Timezone on WhatsApp',
      url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20want%20to%20coordinate%20a%20project%20in%20my%20timezone.'
    }
  },
  {
    category: 'voice-ai',
    question: 'How do your AI voice agents work and what phone systems do they integrate with?',
    keywords: ['voice agent', 'vapi', 'retell', 'phone bot', 'receptionist', 'ai calling', 'twilio', 'elevenlabs', 'latency', 'sub-600ms'],
    answer: 'Our conversational AI voice agents operate at sub-600ms latency, delivering lifelike turn-taking dialogue indistinguishable from a human receptionist:\n\n• **Speech Pipeline**: Deepgram Nova-2 (STT) + Groq/OpenAI reasoning + ElevenLabs Turbo v2.5 / Cartesia Sonic (TTS).\n• **Telephony Integration**: Connected via Twilio SIP trunks to existing corporate phone numbers or newly provisioned local area codes.\n• **Deterministic Functions**: The agent checks Google Calendar or Cal.com availability in real time, books appointments, collects caller information, and writes structured records directly into your CRM (HubSpot, GoHighLevel, Salesforce).\n• **Human Handoff**: If a caller requests a human manager, the call is transferred seamlessly to a live staff member via SIP transfer.',
    suggestedAction: {
      type: 'whatsapp',
      label: 'Demo a Voice Agent with Sheharyar',
      url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20can%20I%20see%20a%20demo%20of%20your%20Vapi/Twilio%20AI%20Voice%20Agent?'
    }
  },
  {
    category: 'security',
    question: 'How do you guarantee server security, data privacy, and zero data leaks?',
    keywords: ['security', 'privacy', 'cisco', 'cyberops', 'php2shell', 'hardening', 'data leak', 'gdpr', 'ccpa', 'compliance'],
    answer: 'As a Cisco-certified CyberOps associate and enterprise systems architect, security is engineered into every layer:\n\n• **Zero Data Leakage**: In customer AI systems, all sensitive personal data is protected and processed through secure, zero-data-retention APIs.\n• **Enterprise Server Security**: Servers are hardened with multi-layer firewall protection, strict permission boundaries, and automated threat filtering to prevent unauthorized access.\n• **Full Legal Compliance**: Built strictly compliant with global data privacy standards including GDPR, CCPA, and regional enterprise regulations.',
    suggestedAction: {
      type: 'whatsapp',
      label: 'Request Architecture Security Review',
      url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20would%20like%20to%20request%20a%20security%20review%20for%20our%20systems.'
    }
  }
];
