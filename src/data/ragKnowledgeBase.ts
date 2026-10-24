export interface KnowledgeChunk {
  id: string;
  category: 
    | 'identity' 
    | 'greetings'
    | 'services'
    | 'wordpress' 
    | 'voice-ai' 
    | 'automation' 
    | 'rag-chatbots' 
    | 'agentic-ai'
    | 'ecommerce' 
    | 'pricing'
    | 'timeline'
    | 'white-label' 
    | 'pakistan' 
    | 'locations' 
    | 'contact'
    | 'case-studies'
    | 'tools'
    | 'education'
    | 'certifications';
  title: string;
  keywords: string[];
  content: string;
  suggestedAction?: {
    type: 'whatsapp' | 'inquiry' | 'link';
    label: string;
    url?: string;
  };
}

export const RAG_GUARDRAILS = {
  assistantName: 'Sheharyar Siraj AI Assistant',
  role: 'Principal Systems & AI Architecture Representative for Sheharyar Siraj',
  scopeTopics: [
    'Sheharyar Siraj professional background, credentials, and achievements',
    'Custom WordPress development, PHP 8.2+ object-oriented architecture, and performance optimization',
    'WooCommerce high-concurrency systems, HPOS table migration, and custom checkout funnels',
    'Autonomous conversational AI voice agents built on Vapi, Retell AI, and Twilio SIP',
    'Contextual AI chatbots and enterprise RAG systems with vector databases (Pinecone, pgvector)',
    'Event-driven workflow automations using self-hosted n8n and Make.com',
    'Agentic AI applications, multi-agent frameworks, and autonomous tool calling',
    'White-label agency subcontracting under strict bilateral NDAs for marketing and SEO agencies',
    'Freelancer in Pakistan credentials, Karachi operations, and international timezone overlap',
    'Project scoping, hourly/sprint pricing models, milestone contracts, and WhatsApp or email contact'
  ],
  outOfScopeFallback: 'I specialize exclusively in Sheharyar Siraj\'s web engineering, custom WordPress systems, AI automation, and voice agent services. How can I assist you with your project or architecture needs today?',
  restrictedKeywords: [
    'politics', 'recipe', 'movie recommendation', 'crypto trading signal', 
    'general medical advice', 'astrology horoscope', 'essay homework', 'dating advice'
  ]
};

export const RAG_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: 'greetings-welcome',
    category: 'greetings',
    title: 'Welcome & Interactive Introduction',
    keywords: [
      'hi', 'hello', 'hey', 'salam', 'assalam', 'aoa', 'kaise ho', 'kaisa hai', 
      'how are you', 'good morning', 'good evening', 'greetings', 'adaab', 'kese ho'
    ],
    content: 'Hello! I am Zack, Executive Assistant to Sheharyar Siraj. Sheharyar is currently heading active client sprints, but I am here to help answer your technical questions, look at your project scope, or get you scheduled on his calendar. What brings you to us today?',
    suggestedAction: {
      type: 'inquiry',
      label: 'Explore Services & Projects'
    }
  },
  {
    id: 'bio-profile',
    category: 'identity',
    title: 'Sheharyar Siraj Background, Bio & Credentials',
    keywords: [
      'sheharyar', 'siraj', 'who is', 'about', 'experience', 'credentials', 'bio', 
      'background', 'profile', 'kon hai', 'intro', 'taruf', 'qualification', 'certifications',
      'ccnp', 'cyberops', 'vertex ai', 'upwork', 'jss', 'rating'
    ],
    content: 'Sheharyar Siraj is an Enterprise WordPress Systems Architect & Agentic AI Automation Engineer with 5+ years of commercial remote engineering experience, 1,200+ delivered projects worldwide, and a 100% Job Success Score (JSS) on Upwork with Top Rated status. His verified credentials include Cisco Certified Network Professional (CCNP), Cisco Certified CyberOps Associate, Google Cloud Vertex AI Certified Professional, AI for App Building, and a Bachelor of Business & Information Technology (BBIT, Computer Software Engineering) from Virtual University of Pakistan. Clients work directly with Sheharyar with zero junior account manager friction, protected by bilateral NDAs and a guaranteed sub-2 hour technical scoping SLA.',
    suggestedAction: {
      type: 'inquiry',
      label: 'View Credentials & Timeline'
    }
  },
  {
    id: 'services-summary',
    category: 'services',
    title: 'Core Engineering Services & Capabilities',
    keywords: [
      'services', 'kya karte ho', 'kya kaam hai', 'what do you do', 'offerings', 
      'capabilities', 'skills', 'help me', 'what can you build', 'expertise', 'specialization',
      'hpos', 'vapi', 'n8n', 'langgraph', 'white-label'
    ],
    content: 'Sheharyar provides 6 core engineering capabilities: (1) Custom WordPress Development (PHP 8.2 VIP, Gutenberg blocks, sub-600ms TTFB, 95+ Core Web Vitals); (2) Autonomous AI Voice Telephony (sub-600ms conversational phone receptionists via Vapi and Twilio SIP with live calendar booking); (3) Workflow Automation (self-hosted high-availability n8n clusters and Make.com pipelines); (4) WooCommerce HPOS scaling (high-concurrency order storage, Redis caching, 10k+ daily transactions); (5) Agentic AI & LangGraph Multi-Agent Workflows (autonomous tool-calling and self-correcting pipelines); and (6) White-Label Agency Subcontracting under bilateral NDA with direct senior architect collaboration.',
    suggestedAction: {
      type: 'link',
      label: 'View Services Hub',
      url: '/services/'
    }
  },
  {
    id: 'sla-guarantees',
    category: 'services',
    title: 'Engineering SLA, Scoping Guarantee & Bilateral NDA',
    keywords: [
      'sla', 'scoping', 'guarantee', 'nda', 'response time', 'how fast reply', 'architect access',
      'consultation', 'confidentiality', 'agreement', 'hours'
    ],
    content: 'Sheharyar provides an industry-leading Service Level Agreement (SLA): (1) Guaranteed technical scoping and preliminary roadmap delivered under 2 business hours; (2) Strict bilateral Non-Disclosure Agreement (NDA) executed before deep-dive technical reviews; (3) 100% Direct senior architect access via Slack, WhatsApp, and GitHub with zero junior account managers or sales intermediaries; and (4) 30-day comprehensive post-launch warranty with 100% IP code transfer upon milestone completion.',
    suggestedAction: {
      type: 'whatsapp',
      label: 'Request Scoping under 2-Hour SLA',
      url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20would%20like%20to%20request%20a%20technical%20scoping%20review%20under%20the%202-hour%20SLA.'
    }
  },
  {
    id: 'wordpress-architecture',
    category: 'wordpress',
    title: 'Custom WordPress VIP & PHP 8.2 Architecture',
    keywords: [
      'wordpress', 'php', 'custom theme', 'custom plugin', 'speed', 'ttfb', 
      'core web vitals', 'bloat', 'gutenberg', 'headless', 'elementor', 'divi', 
      'slow website', 'speed optimization', 'website banani hai', 'plugin development'
    ],
    content: 'Sheharyar specializes in zero-bloat custom WordPress systems. He writes clean, strictly typed PHP 8.2+ object-oriented code, custom Gutenberg blocks, and decoupled headless architectures. His builds consistently achieve sub-600ms TTFB and 95+ Core Web Vitals on Google PageSpeed Insights by eliminating heavy third-party page builders (like Elementor or Divi) and replacing them with native, high-performance code.',
    suggestedAction: {
      type: 'inquiry',
      label: 'Scope WordPress Build'
    }
  },
  {
    id: 'woocommerce-systems',
    category: 'ecommerce',
    title: 'WooCommerce High-Concurrency & HPOS Architecture',
    keywords: [
      'woocommerce', 'ecommerce', 'hpos', 'cart', 'checkout', 'scaling', 'redis', 
      'database bloat', 'orders', 'online store', 'shop', 'payments', 'stripe', 'paypal', 'dukan'
    ],
    content: 'For high-traffic stores, Sheharyar engineers custom WooCommerce setups utilizing High-Performance Order Storage (HPOS), dedicated custom database tables, Redis object caching, and frictionless single-step checkout funnels. These optimizations maintain sub-second response times during high-volume sales flash events and peak holiday traffic with automated payment and inventory synchronization.',
    suggestedAction: {
      type: 'inquiry',
      label: 'Consult on WooCommerce'
    }
  },
  {
    id: 'ai-voice-agents',
    category: 'voice-ai',
    title: 'Conversational AI Voice Agents & Telephony',
    keywords: [
      'voice agent', 'voice ai', 'vapi', 'retell', 'elevenlabs', 'deepgram', 'twilio', 
      'phone', 'telephony', 'sub-600ms', 'calling', 'appointments', 'booking', 'clinic', 
      'salon', 'real estate calling', 'phone call bot', 'voice bot'
    ],
    content: 'Sheharyar builds sub-600ms conversational telephony voice assistants using Vapi, Retell AI, Deepgram Nova-2 speech-to-text, and ElevenLabs voice synthesis integrated with Twilio SIP trunks. These agents handle inbound customer inquiries, schedule appointments directly in Google Calendar or CRM systems, and execute real-time tool calling without perceptible conversational lag. Both English and regional Gulf Arabic dialects are supported.',
    suggestedAction: {
      type: 'whatsapp',
      label: 'Discuss Voice Agents on WhatsApp',
      url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20am%20interested%20in%20building%20an%20AI%20Voice%20Agent.'
    }
  },
  {
    id: 'rag-chatbots',
    category: 'rag-chatbots',
    title: 'Enterprise Contextual RAG & Knowledge Base Chatbots',
    keywords: [
      'rag', 'chatbot', 'vector', 'pinecone', 'pgvector', 'knowledge base', 
      'retrieval', 'hallucination', 'embeddings', 'ai bot', 'customer support bot', 
      'chat assistant', 'documents bot', 'q&a bot'
    ],
    content: 'He architects enterprise Retrieval-Augmented Generation (RAG) chatbots grounded strictly in verified corporate documents, PDFs, manuals, and internal databases. Utilizing vector databases like Pinecone and pgvector with hybrid semantic search and strict system prompts, these assistants deliver factual, non-hallucinating responses for customer support and internal knowledge retrieval.',
    suggestedAction: {
      type: 'inquiry',
      label: 'Request RAG Architecture'
    }
  },
  {
    id: 'agentic-ai-systems',
    category: 'agentic-ai',
    title: 'Autonomous Multi-Agent AI Systems & Tool Calling',
    keywords: [
      'agentic', 'autonomous agents', 'langgraph', 'crewai', 'multi-agent', 
      'tool calling', 'automated tasks', 'ai workflows', 'langchain', 'swarm'
    ],
    content: 'Sheharyar engineers autonomous multi-agent systems using frameworks like LangGraph and CrewAI. These systems allow AI models to plan tasks, call private database APIs, search internal vector stores, and execute multi-step workflows autonomously with self-correction and 99.4% task reliability.',
    suggestedAction: {
      type: 'inquiry',
      label: 'Consult on Multi-Agent AI'
    }
  },
  {
    id: 'workflow-automation-n8n',
    category: 'automation',
    title: 'Workflow Automation via Self-Hosted n8n & Make',
    keywords: [
      'n8n', 'make', 'make.com', 'automation', 'webhook', 'crm', 'integrations', 
      'api', 'etl', 'zapier', 'hubspot', 'gohighlevel', 'lead alerts', 'automated workflows'
    ],
    content: 'Sheharyar deploys self-hosted n8n automation clusters and Make.com pipelines that connect disparate webhooks, payment gateways (Stripe, PayPal), CRMs (HubSpot, Salesforce, GoHighLevel), and ERPs. Every workflow includes automated retry queues, JSON payload validation, and instant error notification hooks to ensure 99.95% operational reliability without per-task SaaS subscription fees.',
    suggestedAction: {
      type: 'inquiry',
      label: 'Automate Business Workflows'
    }
  },
  {
    id: 'pricing-commercials',
    category: 'pricing',
    title: 'Pricing Models, Project Quotes & Commercial Rates',
    keywords: [
      'cost', 'price', 'pricing', 'rates', 'charges', 'fees', 'budget', 'quote', 
      'how much', 'kitna kharcha', 'kitne paise', 'hourly rate', 'sprint', 'milestone', 
      'package', 'rate card', 'estimate'
    ],
    content: 'Sheharyar structures client engagements using flexible delivery frameworks: (1) Fixed-price milestone sprints for clearly scoped projects; (2) Dedicated weekly technical retainers for ongoing development and support; and (3) Upwork Escrow contracts for international payment protection. Every engagement includes a 30-day post-launch warranty, full code documentation, and 100% intellectual property transfer. You can share your scope on WhatsApp for a fast quote.',
    suggestedAction: {
      type: 'whatsapp',
      label: 'Get Direct Project Quote on WhatsApp',
      url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20would%20like%20to%20get%20a%20pricing%20quote%20for%20my%20project.'
    }
  },
  {
    id: 'timeline-delivery',
    category: 'timeline',
    title: 'Delivery Timelines, Project Duration & Turnaround',
    keywords: [
      'timeline', 'duration', 'how long', 'delivery time', 'kitne din', 'turn around', 
      'deadline', 'how fast', 'completion time', 'schedule', 'speed'
    ],
    content: 'Typical project delivery timelines: (1) Core WordPress or WooCommerce speed optimization: 3 to 5 business days; (2) Full custom zero-bloat WordPress builds: 10 to 18 business days; (3) Sub-600ms AI Voice Agent deployment: 5 to 10 business days; (4) Complex n8n automation workflows: 3 to 7 business days. All projects include structured staging reviews and a 30-day post-launch warranty.',
    suggestedAction: {
      type: 'inquiry',
      label: 'Discuss Project Timeline'
    }
  },
  {
    id: 'contact-whatsapp-hiring',
    category: 'contact',
    title: 'Direct Contact, WhatsApp Channel & Hiring',
    keywords: [
      'hire', 'contact', 'whatsapp', 'email', 'phone', 'number', 'rabta', 'call', 
      'meeting', 'appointment', 'contact info', 'talk', 'reach out', 'number do', 'kahan rabta karoon'
    ],
    content: 'You can connect directly with Sheharyar Siraj: Direct WhatsApp: +92 313 2080033 (instant responses). Direct Email: sherryansari870@gmail.com (2-hour guaranteed SLA for formal RFP briefs). Upwork: upwork.com/freelancers/sheharyarsiraj. Fiverr: fiverr.com/sellers/mr_shehary. Freelance escrow contracts and direct milestone wire payments are both supported.',
    suggestedAction: {
      type: 'whatsapp',
      label: 'Chat on WhatsApp (+92 313 2080033)',
      url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20am%20reaching%20out%20via%20your%20website%20to%20hire%20you%20for%20a%20project.'
    }
  },
  {
    id: 'freelancer-pakistan',
    category: 'pakistan',
    title: 'Freelancer in Pakistan & Global Delivery',
    keywords: [
      'pakistan', 'freelancer', 'karachi', 'hire', 'timezone', 'local', 'currency', 
      'rates', 'upwork', 'pkr', 'pakistani developer'
    ],
    content: 'Operating from Karachi, Pakistan (PKT / UTC+5), Sheharyar Siraj delivers high-performance engineering with 1,200+ successful projects across North America, Europe, the GCC, and Australia. International clients benefit from strategic working hour overlap (5-6 hours daily with UK/Europe, full-day alignment with Dubai/Saudi Arabia, and morning crossover with the US). Payments settle flexibly via Wise, SWIFT, Upwork Escrow, or Payoneer.',
    suggestedAction: {
      type: 'link',
      label: 'View Pakistan Dossier',
      url: '/freelancer-in-pakistan/'
    }
  },
  {
    id: 'global-locations',
    category: 'locations',
    title: 'Dubai, Saudi Arabia, USA & International Working Models',
    keywords: [
      'dubai', 'uae', 'saudi arabia', 'riyadh', 'jeddah', 'usa', 'uk', 'europe', 
      'remote', 'onsite', 'relocation', 'timezone overlap', 'gulf'
    ],
    content: 'Sheharyar works with businesses globally across Dubai, Saudi Arabia (Riyadh/Jeddah), the United States, the UK, and Australia. In addition to remote delivery with high-touch Slack/WhatsApp communication, he is available for short-term on-site architecture workshops and relocation contracts in Dubai and Saudi Arabia.',
    suggestedAction: {
      type: 'link',
      label: 'Explore Locations Hub',
      url: '/locations/'
    }
  },
  {
    id: 'white-label-agencies',
    category: 'white-label',
    title: 'White-Label Engineering for Digital & SEO Agencies',
    keywords: [
      'white label', 'agency', 'subcontracting', 'nda', 'partner', 'retainer', 
      'slack', 'git', 'silent partner', 'confidentiality', 'outsourcing'
    ],
    content: 'Sheharyar partners with growth marketing, SEO, and web development agencies across the United States, United Kingdom, and Australia as an invisible senior engineering partner. All engagements operate under strict bilateral NDAs with code committed directly to agency GitHub/GitLab repositories and collaboration inside agency Slack channels, maintaining 100% agency-client confidentiality.',
    suggestedAction: {
      type: 'inquiry',
      label: 'Discuss Agency Retainer'
    }
  },
  {
    id: 'portfolio-case-studies',
    category: 'case-studies',
    title: 'Verified Portfolio Case Studies & Documented Results',
    keywords: [
      'portfolio', 'case studies', 'past work', 'previous work', 'projects', 
      'examples', 'sample', 'clients', 'proof', 'testimonials', 'reviews', 'demonstration'
    ],
    content: 'Documented project case studies include: (1) High-Concurrency WooCommerce scaling during flash sales with Redis caching and HPOS migration; (2) Sub-600ms AI Voice Agent for real estate lead qualification and automated booking; (3) Multi-Model Autonomous SEO Intelligence engine generating schema-validated content; and (4) B2B Wholesale automated order routing with self-hosted n8n and ERP webhooks. All case studies include verified architecture blueprints.',
    suggestedAction: {
      type: 'link',
      label: 'Explore Case Studies',
      url: '/case-studies/'
    }
  },
  {
    id: 'technical-tools-hub',
    category: 'tools',
    title: 'Interactive Systems & Engineering Tools Hub',
    keywords: [
      'tools', 'calculator', 'schema generator', 'bloat estimator', 'roi', 
      'cpt', 'boilerplate', 'utility', 'free tools', 'seo generator'
    ],
    content: 'Sheharyar Siraj provides 10 free, standalone production engineering tools directly on his website at /tools/. These include the AI-Powered Local Schema Generator, WordPress Database Bloat Estimator, Custom Plugin Boilerplate Generator, Voice Agent ROI Calculator, Webhook Payload Tester, and n8n Error Handler Generator.',
    suggestedAction: {
      type: 'link',
      label: 'Launch Engineering Tools Hub',
      url: '/tools/'
    }
  },
  {
    id: 'education-degrees',
    category: 'education',
    title: 'Formal Academic Degrees & University Education',
    keywords: [
      'education', 'degree', 'university', 'virtual university', 'ssuet', 'college', 
      'school', 'study', 'parhai', 'qualification', 'bbit', 'software engineering'
    ],
    content: 'Sheharyar Siraj\'s formal education includes: (1) Bachelor of Business and Information Technology (BBIT), specializing in Computer Software Engineering from Virtual University of Pakistan (Graduation April 2025); (2) 6-Month Intensive Course in Internet of Things (IoT) Systems Architecture from Sir Syed University of Engineering & Technology (SSUET, April - October 2021); and (3) Secondary School Certificate from Superior English School (2005 - 2016).',
    suggestedAction: {
      type: 'inquiry',
      label: 'View Full Education Details'
    }
  },
  {
    id: 'certifications-list',
    category: 'certifications',
    title: 'Verified Professional Certifications & Credentials',
    keywords: [
      'certifications', 'certificate', 'ccnp', 'cisco', 'networking academy', 
      'learn-a-thon', 'sanad', 'credentials', 'certified', 'digiskills', 'iot'
    ],
    content: 'Sheharyar holds multiple audited professional certifications: Cisco Certified Network Professional (CCNP); Cisco Networking Academy Learn-A-Thon 2022; AI for App Building; AI for Data Analysis; AI for Content Creation; IoT Systems Architecture from SSUET; DigiSkills Professional Certificate; Information Technology and Business World Certificate; Google Cloud Vertex AI Certified Specialist; Anthropic AI Fluency; and Cisco Certified CyberOps Associate.',
    suggestedAction: {
      type: 'inquiry',
      label: 'Inspect Certifications'
    }
  },
  {
    id: 'quantified-results',
    category: 'identity',
    title: 'Measurable Outcomes & Real Results Delivered',
    keywords: [
      'results', 'outcomes', 'impact', 'metrics', 'roi', 'proof', 'performance', 
      'growth', 'case results', 'delivered'
    ],
    content: 'Verified business outcomes delivered by Sheharyar Siraj include: (1) 20% Q1 business growth and 15% faster project delivery for a prominent UAE enterprise via process automation; (2) 30% to 60% reduction in manual operational workload for clients through custom n8n and Make.com workflows; (3) 40% faster page load times and up to 30% organic traffic growth across 50+ optimized WordPress platforms; and (4) 100% Job Success Score and 5-Star ratings across Upwork and Fiverr.',
    suggestedAction: {
      type: 'inquiry',
      label: 'Discuss Your Project Goals'
    }
  },
  {
    id: 'experience-work-history',
    category: 'timeline',
    title: 'Work Experience History & Agency Roles',
    keywords: [
      'work experience', 'history', 'companies', 'jobs', 'upwork', 'fiverr', 
      'ansari web agency', 'endeonline', 'umw media', 'digitizal', 'sintech', 'meer group'
    ],
    content: 'Sheharyar Siraj\'s professional career trajectory spans over 5 years: (1) Upwork (March 2024 - Present): AI Automation Specialist & Senior WordPress Developer; (2) Fiverr (January 2022 - Present): Custom WordPress, Elementor Pro & Speed Optimization Specialist; (3) Ansari Web Agency (April 2021 - Present): Senior AI Automation Engineer & Lead WordPress Developer; (4) EndeOnline (January 2023 - October 2026): Senior Full-Stack WordPress Developer (Netherlands); (5) UMW Media (January 2023 - April 2024): Senior WordPress Developer; (6) Digitizal (February 2022 - January 2023): WordPress & Frontend Developer; (7) Sintech (March 2021 - January 2022): WordPress Developer; and (8) Meer Group (2024 - 2025): Business Coordinator & Digital Systems Optimizer (Dubai, UAE).',
    suggestedAction: {
      type: 'inquiry',
      label: 'Explore Complete Career Timeline'
    }
  }
];
