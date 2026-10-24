import { SHEHARYAR_IDENTITY, CORE_SERVICES, ENTERPRISE_FAQS } from '../data/chatKnowledge';
import { RAG_KNOWLEDGE_BASE, RAG_GUARDRAILS } from '../data/ragKnowledgeBase';

export type ChatBotMode = 'support' | 'sales' | 'lead_capture';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  mode?: ChatBotMode;
  showLeadForm?: boolean;
  leadCaptured?: boolean;
  action?: {
    type: 'whatsapp' | 'inquiry' | 'link' | 'lead_form';
    label: string;
    url?: string;
  };
  sources?: string[];
  suggestedChips?: string[];
}

export interface RetrievalResult {
  answer: string;
  mode: ChatBotMode;
  showLeadForm?: boolean;
  action?: {
    type: 'whatsapp' | 'inquiry' | 'link' | 'lead_form';
    label: string;
    url?: string;
  };
  sources?: string[];
  suggestedChips?: string[];
  isOutOfScope: boolean;
}

export const DEFAULT_QUICK_CHIPS = [
  '🎯 Hire Vapi / Voice AI Engineer',
  '⚡ Custom WordPress VIP Build',
  '⚙️ Self-Hosted n8n Workflows',
  '💬 Chat Directly on WhatsApp'
];

// Tokenize text for matching
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1);
}

// Language / Roman Urdu detection
export function isRomanUrdu(text: string): boolean {
  const urduPatterns = [
    /\b(kya|kaise|kese|karun|karo|batao|batayein|chahiye|kitna|kitne|paise|kharcha|rabta|rabtah|hain|hai|mujhe|mera|meri|kahan|kidhar|banani|banwana|krna|krte|ho|ap|aap|bhi|aur|kaam|banao|dijiye|theek|acha|shukriya|zaroorat|karna|shuru)\b/i
  ];
  return urduPatterns.some((pattern) => pattern.test(text));
}

// Check for direct buying signals / "I am interested" trigger
export function isDirectInterestIntent(query: string): boolean {
  const clean = query.toLowerCase().trim();
  const directTriggers = [
    'i am interested',
    'im interested',
    "i'm interested",
    'interested',
    'i want this service',
    'i want this',
    'i need this service',
    'how much',
    'how much?',
    'can you build this',
    'can you build this?',
    'can you build',
    'can you develop this',
    'hire you',
    'hire',
    'want to hire you',
    'hire sheharyar',
    "let's work together",
    'lets work together',
    'let work together',
    'work together',
    'sign me up',
    'start project',
    'i want to hire',
    'start working',
    'get a quote',
    'quote for project',
    'custom wordpress vip build',
    'hire vapi',
    'self-hosted n8n workflows',
    'scope a project',
    'book a call',
    'schedule a call'
  ];
  return directTriggers.some((t) => clean.includes(t));
}

// Check for explicit buying/hiring intent (Sales Mode)
export function isSalesIntent(query: string): boolean {
  const clean = query.toLowerCase();
  if (isDirectInterestIntent(clean)) return true;
  const salesKeywords = [
    'hire', 'quote', 'pricing', 'price', 'cost', 'rates', 'charges', 'budget',
    'build', 'develop', 'create', 'make me a', 'i need a', 'i want a', 'banani', 'banwana',
    'chahiye', 'kaam karwana', 'project', 'start project', 'timeline', 'proposal',
    'scoping', 'meeting', 'contract', 'freelancer', 'discount', 'book', 'schedule call',
    'talk with sheharyar', 'need a website', 'need a bot', 'need automation', 'lead time',
    'consultant', 'how much', 'estimate', 'retainer'
  ];
  return salesKeywords.some((kw) => clean.includes(kw));
}

// Check for greetings
export function isGreeting(query: string): boolean {
  const clean = query.toLowerCase().trim();
  const greetingWords = [
    'hi', 'hello', 'hey', 'salam', 'assalam', 'aoa', 'kaise ho', 'how are you',
    'good morning', 'good afternoon', 'good evening', 'hiya', 'sup', 'adaab'
  ];
  return greetingWords.some((w) => clean === w || clean.startsWith(`${w} `) || clean.endsWith(` ${w}`));
}

// Guardrail check: detect strictly restricted out-of-scope topics
export function checkScope(query: string): boolean {
  const clean = query.toLowerCase();

  for (const forbidden of RAG_GUARDRAILS.restrictedKeywords) {
    if (clean.includes(forbidden)) {
      return false;
    }
  }

  if (
    clean.includes('write me a poem') ||
    clean.includes('tell me a joke') ||
    clean.includes('who won the football') ||
    clean.includes('capital of france') ||
    clean.includes('recipe for biryani') ||
    clean.includes('write my homework') ||
    clean.includes('weather today') ||
    clean.includes('movie recommendation')
  ) {
    return false;
  }

  return true;
}

// Live Cloud LLM Generation (if Gemini or OpenAI API key is configured)
async function tryLiveLlmGeneration(
  query: string,
  history: ChatMessage[],
  mode: ChatBotMode
): Promise<string | null> {
  const env = (import.meta as unknown as { env: Record<string, string> }).env || {};
  const geminiKey = env.VITE_GEMINI_API_KEY;
  const openaiKey = env.VITE_OPENAI_API_KEY;

  if (!geminiKey && !openaiKey) return null;

  const systemInstruction = `You are the official AI Project Consultant for Sheharyar Siraj's engineering practice.
Sheharyar Siraj is an elite WordPress Systems Architect & Agentic AI Engineer with 5+ years experience, 1,200+ projects delivered worldwide, and 100% Upwork JSS.

OBJECTIVE:
Act as a consultative technical sales consultant and world-class customer support assistant.
Answer technical questions with extreme precision, diagnose the client's current bottleneck, and guide them to a formal architecture scoping call or direct WhatsApp consultation (+92 313 2080033).

CORE SERVICES:
1. Custom WordPress VIP (PHP 8.2 VIP, sub-600ms TTFB, Gutenberg blocks, zero bloat)
2. Autonomous AI Voice Agents (Vapi, Retell, Twilio SIP, sub-600ms latency, calendar booking)
3. Self-Hosted n8n Clusters (Enterprise workflows, Redis queues, DLQs, 99.95% uptime)
4. WooCommerce HPOS Scaling (10k+ daily orders, Redis caching, high concurrency)
5. Contextual RAG Chatbots (Qdrant, Pinecone, hybrid BM25, zero hallucinations)
6. Agentic AI & LangGraph Multi-Agent Workflows
7. Custom SaaS & MVP Engineering (React, Node, PostgreSQL, Stripe billing in 2-4 weeks)
8. White-Label Agency Subcontracting under bilateral NDA

STRICT RULES:
1. Speak as an authoritative, battle-tested senior engineer.
2. If in Roman Urdu, respond naturally in professional Roman Urdu. If in English, respond in clear, consultative English.
3. NEVER say "I don't have an answer" or "I am just an AI".
4. If the query is vague (e.g. "I need a service", "Can you help me?"), actively inquire about their bottleneck: WordPress speed, AI voice telephony, or workflow automation.
5. Ground all facts in Sheharyar's verified portfolio and attach WhatsApp contact (+92 313 2080033) for a 2-hour SLA response.`;

  if (geminiKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\nUser Question: ${query}` }]
            }
          ],
          generationConfig: { temperature: 0.35, maxOutputTokens: 400 }
        })
      });
      clearTimeout(timeoutId);
      if (response.ok) {
        const data = await response.json();
        const generated = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generated && generated.trim()) return generated.trim();
      }
    } catch {
      // Fall through to local RAG
    }
  }

  if (openaiKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: query }
          ],
          temperature: 0.35,
          max_tokens: 350
        })
      });
      clearTimeout(timeoutId);
      if (response.ok) {
        const data = await response.json();
        const generated = data.choices?.[0]?.message?.content;
        if (generated && generated.trim()) return generated.trim();
      }
    } catch {
      // Fall through to local RAG
    }
  }

  return null;
}

// Consultative RAG Synthesizer
function synthesizeConsultativeResponse(
  query: string,
  isUrdu: boolean,
  mode: ChatBotMode
): RetrievalResult {
  const lower = query.toLowerCase().trim();

  // 0. Direct "I am interested" Dynamic Sales Trigger
  if (isDirectInterestIntent(lower)) {
    return {
      answer: "That's fantastic! Sheharyar specializes in turning high-load bottlenecks into scalable systems. To get you an accurate scope and roadmap within 2 hours, what is your best WhatsApp number and email?",
      mode: 'sales',
      showLeadForm: true,
      action: {
        type: 'whatsapp',
        label: 'Message Sheharyar Directly on WhatsApp (+92 313 2080033)',
        url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20am%20interested%20in%20scoping%20a%20project%20and%20getting%20a%20roadmap.'
      },
      sources: ['Direct Architecture Scoping Desk'],
      suggestedChips: [
        '💬 Chat Directly on WhatsApp (+92 313 2080033)',
        '⚡ Custom WordPress VIP Build',
        '🎯 Hire Vapi / Voice AI Engineer'
      ],
      isOutOfScope: false
    };
  }

  // 1. Vague Commercial / Service Intent ("I need a service", "Can you help me?", "What do you do?")
  const isVagueService = [
    'need a service', 'i need service', 'need help', 'can you help me', 'can you help',
    'what do you do', 'what can you do', 'what services', 'offerings', 'service chahiye',
    'help chahiye', 'kya karte ho', 'kaam karwana hai', 'looking for a developer',
    'looking for engineer', 'i want a service', 'scope a new project'
  ].some(term => lower.includes(term));

  if (isVagueService) {
    if (isUrdu) {
      return {
        answer: `Main zaroor aapki madad kar sakta hoon! Sheharyar Siraj ek senior systems architect aur agentic AI engineer hain jo 3 core architectural domains mein specialize karte hain:\n\n1. **Custom WordPress & WooCommerce VIP**: Heavy page builders ko replace karke clean PHP 8.2 code, sub-600ms TTFB, aur 95+ Core Web Vitals.\n2. **Autonomous AI Voice Agents**: Vapi aur Twilio par chalne wale sub-600ms latency phone agents jo 24/7 calls handle aur Google Calendar mein bookings schedule karte hain.\n3. **Enterprise Workflow Automation**: Self-hosted n8n clusters jo CRMs aur payment gateways ko synchronize karke Zapier ke charges khatam karte hain.\n\nAapko kis technical bottleneck mein madad chahiye? Aap direct WhatsApp (+92 313 2080033) par rabta karke 2 ghante ke andar direct roadmap aur quote le sakte hain!`,
        mode: 'sales',
        showLeadForm: true,
        action: {
          type: 'whatsapp',
          label: 'Chat Directly on WhatsApp (+92 313 2080033)',
          url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20am%20looking%20for%20a%20development%20and%20architecture%20service.'
        },
        sources: ['Core Architectural Services Hub', 'Enterprise Technical Dossier'],
        suggestedChips: DEFAULT_QUICK_CHIPS,
        isOutOfScope: false
      };
    }

    return {
      answer: `I'd be glad to help you! As Sheharyar Siraj's official technical consultant, I can help you scope and execute high-concurrency digital architectures across three primary pillars:\n\n1. **Custom WordPress & WooCommerce VIP**: Replacing bloated page builders with strictly typed PHP 8.2+, custom Gutenberg block themes, and Redis caching for sub-600ms speeds.\n2. **Autonomous AI Voice Telephony**: Building sub-600ms conversational phone receptionists via Vapi and Twilio SIP that qualify leads and schedule Google Calendar bookings.\n3. **Self-Hosted n8n Workflow Clusters**: Connecting CRMs, payment gateways, and databases with high-availability pipelines that replace costly Zapier SaaS bills.\n\nWhat is your current technical bottleneck or stack? Would you like Sheharyar to audit your current system or scope a tailored proposal for this?`,
      mode: 'sales',
      showLeadForm: true,
      action: {
        type: 'whatsapp',
        label: 'Message Sheharyar Directly on WhatsApp',
        url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20am%20reaching%20out%20to%20discuss%20a%20new%20project%20service.'
      },
      sources: ['Core Architectural Services Hub', 'Enterprise Technical Dossier'],
      suggestedChips: DEFAULT_QUICK_CHIPS,
      isOutOfScope: false
    };
  }

  // 2. Pricing & Cost Queries ("How much for a website?", "What are your rates?")
  if (lower.includes('price') || lower.includes('cost') || lower.includes('rates') || lower.includes('how much') || lower.includes('charges') || lower.includes('budget') || lower.includes('kitne paise')) {
    const faq = ENTERPRISE_FAQS.find(f => f.category === 'pricing')!;
    if (isUrdu) {
      return {
        answer: `Sheharyar Siraj ke sath engagement 2 transparent models par hoti hai:\n\n1. **Fixed-Price Milestone Contracts**: Custom WordPress builds, AI voice agents, ya n8n automations ke liye fixed guaranteed proposal provide ki jati hai jismein koi hidden charges nahi hote.\n2. **Dedicated Weekly Sprint Retainers ($1,500 – $3,500/week)**: Agencies aur fast-moving companies ke liye jahan direct senior engineering bandwidth chahiye hoti hai.\n\nInvoicing aapki local currency (USD, EUR, GBP, AED, SAR, CAD) mein Wise, Bank Wire, Stripe, ya Upwork Escrow ke zariye hoti hai. Aap niche quick form fill kar sakte hain ya WhatsApp par foran scope discuss kar sakte hain!`,
        mode: 'sales',
        showLeadForm: true,
        action: faq.suggestedAction,
        sources: ['Commercial Pricing Strategy & SLAs'],
        suggestedChips: ['💬 Chat Directly on WhatsApp', '⚡ Custom WordPress VIP Build', '🎯 Hire Vapi / Voice AI Engineer'],
        isOutOfScope: false
      };
    }

    return {
      answer: `${faq.answer}\n\nWould you like Sheharyar to review your specific functional requirements and provide an itemized milestone quote? You can drop your requirements below or message him directly on WhatsApp for a guaranteed 2-hour SLA response!`,
      mode: 'sales',
      showLeadForm: true,
      action: faq.suggestedAction,
      sources: ['Commercial Pricing Strategy & SLAs'],
      suggestedChips: ['💬 Chat Directly on WhatsApp', '⚡ Custom WordPress VIP Build', '🎯 Hire Vapi / Voice AI Engineer'],
      isOutOfScope: false
    };
  }

  // 3. AI Voice Agent Queries (Vapi, Retell, Twilio, phone bot)
  if (lower.includes('voice') || lower.includes('vapi') || lower.includes('retell') || lower.includes('twilio') || lower.includes('phone bot') || lower.includes('calling') || lower.includes('receptionist')) {
    const svc = CORE_SERVICES.voiceAi;
    if (isUrdu) {
      return {
        answer: `Sheharyar sub-600ms latency ke sath conversational AI Voice Telephony Agents banate hain jo Vapi, Retell AI, Deepgram Nova-2 aur Twilio SIP par chalte hain:\n\n• **Real-Time Booking**: Agent live Google Calendar check karke appointment book karta hai.\n• **Zero Hallucination**: Deterministic JSON state machines se off-script baaton ka khatra zero hota hai.\n• **CRM Sync**: Har call ki audio recording aur structured qualification record aapke CRM (HubSpot, GoHighLevel) mein save hota hai.\n\nKya aap inbound customer support ke liye agent dekh rahe hain ya outbound lead qualification ke liye?`,
        mode: 'sales',
        showLeadForm: true,
        action: {
          type: 'whatsapp',
          label: svc.ctaText,
          url: svc.ctaUrl
        },
        sources: ['Autonomous Conversational AI Voice Telephony'],
        suggestedChips: ['🎯 Hire Vapi / Voice AI Engineer', '💬 Chat Directly on WhatsApp', '⚙️ Self-Hosted n8n Workflows'],
        isOutOfScope: false
      };
    }

    return {
      answer: `Sheharyar engineers enterprise-grade, sub-600ms conversational AI voice agents built on Vapi, Retell AI, Deepgram Nova-2 speech-to-text, and ElevenLabs voice streaming over Twilio SIP trunks.\n\n**Key Technical Capabilities:**\n• **Natural Turn-Taking**: Sub-600ms latency handles interruptions naturally without awkward pauses.\n• **Deterministic Tool-Calling**: Live Google Calendar/Cal.com appointment booking and database lookups.\n• **CRM Qualification**: Automatically logs structured lead dossiers into HubSpot, Salesforce, or GoHighLevel.\n• **Live Human Handoff**: Transfers complex inquiries to your staff over SIP transfer.\n\nAre you looking to deploy an inbound receptionist or an outbound qualification agent? Would you like Sheharyar to demo a live prototype for your team?`,
      mode: 'sales',
      showLeadForm: true,
      action: {
        type: 'whatsapp',
        label: svc.ctaText,
        url: svc.ctaUrl
      },
      sources: ['Autonomous Conversational AI Voice Telephony'],
      suggestedChips: ['🎯 Hire Vapi / Voice AI Engineer', '💬 Chat Directly on WhatsApp', '⚙️ Self-Hosted n8n Workflows'],
      isOutOfScope: false
    };
  }

  // 4. WordPress & WooCommerce Queries
  if (lower.includes('wordpress') || lower.includes('woocommerce') || lower.includes('php') || lower.includes('speed') || lower.includes('core web vitals') || lower.includes('lcp') || lower.includes('elementor') || lower.includes('theme') || lower.includes('website')) {
    const isWoo = lower.includes('woocommerce') || lower.includes('hpos') || lower.includes('store') || lower.includes('checkout') || lower.includes('cart');
    const svc = isWoo ? CORE_SERVICES.woocommerce : CORE_SERVICES.wordpress;

    if (isUrdu) {
      return {
        answer: `WordPress aur WooCommerce ke hawale se Sheharyar unbloated, strictly typed PHP 8.2+ object-oriented architecture build karte hain:\n\n• **Zero Plugin Bloat**: Elementor aur Divi ko custom Gutenberg blocks se replace karke 95+ Lighthouse score aur sub-600ms TTFB deliver karte hain.\n• **High Concurrency WooCommerce**: High-Performance Order Storage (HPOS) aur Redis caching ke zariye flash sales mein hazaron orders bina crash ke handle hote hain.\n• **Security Hardening**: Cloudflare edge caching aur strict server-level hardening.\n\nAapki mojooda site kis hosting par hai, ya aap ek naya custom platform build karna chahte hain?`,
        mode: 'sales',
        showLeadForm: true,
        action: {
          type: 'whatsapp',
          label: svc.ctaText,
          url: svc.ctaUrl
        },
        sources: [isWoo ? 'WooCommerce HPOS High-Concurrency Architecture' : 'Custom WordPress VIP & PHP 8.2 Architecture'],
        suggestedChips: ['⚡ Custom WordPress VIP Build', '💬 Chat Directly on WhatsApp', '🎯 Hire Vapi / Voice AI Engineer'],
        isOutOfScope: false
      };
    }

    return {
      answer: `Sheharyar specializes in custom, zero-bloat WordPress and WooCommerce systems engineering:\n\n• **PHP 8.2+ VIP Architecture**: Clean, object-oriented code adhering strictly to PSR-12 and WordPress VIP standards.\n• **Gutenberg Custom Blocks**: Eliminates heavy page builders (Elementor/Divi) to guarantee 95+ Core Web Vitals and sub-1s LCP.\n• **WooCommerce HPOS Scaling**: Migrates stores to High-Performance Order Storage with Redis caching, handling 10,000+ daily transactions with zero database deadlocks.\n• **Sub-600ms TTFB**: High-efficiency server configurations on AWS, Hetzner, or Kinsta.\n\nAre you looking to rebuild an existing slow website or architect a brand-new custom platform? Would you like Sheharyar to run a complimentary performance audit on your current URL?`,
      mode: 'sales',
      showLeadForm: true,
      action: {
        type: 'whatsapp',
        label: svc.ctaText,
        url: svc.ctaUrl
      },
      sources: [isWoo ? 'WooCommerce HPOS High-Concurrency Architecture' : 'Custom WordPress VIP & PHP 8.2 Architecture'],
      suggestedChips: ['⚡ Custom WordPress VIP Build', '💬 Chat Directly on WhatsApp', '🎯 Hire Vapi / Voice AI Engineer'],
      isOutOfScope: false
    };
  }

  // 5. Automation & n8n Queries
  if (lower.includes('n8n') || lower.includes('automation') || lower.includes('make') || lower.includes('webhook') || lower.includes('zapier') || lower.includes('crm') || lower.includes('pipeline')) {
    const svc = CORE_SERVICES.automation;
    if (isUrdu) {
      return {
        answer: `Automation ke liye Sheharyar self-hosted n8n clusters aur Make.com pipelines deploy karte hain jo repetitive kaam ko 100% automate kar dete hain:\n\n• **Zero Zapier Bills**: Self-hosted n8n par unlimited executions hoti hain bina per-task subscription fees ke.\n• **High Reliability**: Redis queues aur Dead Letter Queues (DLQs) ke sath 99.95% uptime milta hai.\n• **Multi-App Sync**: CRMs (HubSpot, GoHighLevel, Salesforce), Stripe billing, aur internal Slack notifications automated hoti hain.\n\nAap currently kaunse tools connect karna chahte hain?`,
        mode: 'sales',
        showLeadForm: true,
        action: {
          type: 'whatsapp',
          label: svc.ctaText,
          url: svc.ctaUrl
        },
        sources: ['Self-Hosted n8n Clusters & Workflow Automation'],
        suggestedChips: ['⚙️ Self-Hosted n8n Workflows', '💬 Chat Directly on WhatsApp', '🎯 Hire Vapi / Voice AI Engineer'],
        isOutOfScope: false
      };
    }

    return {
      answer: `Sheharyar deploys high-availability, self-hosted n8n automation clusters and Make.com pipelines that eliminate manual operations:\n\n• **Eliminate SaaS Bloat**: Replaces expensive Zapier monthly subscriptions with private, self-hosted n8n infrastructure.\n• **Enterprise Reliability**: Configured with Docker, Redis worker queues, and Dead Letter Queues (DLQs) to ensure 0% payload loss.\n• **Ecosystem Integration**: Connects Stripe, WooCommerce, HubSpot, Salesforce, GoHighLevel, and PostgreSQL.\n\nWhich software platforms or manual workflows are you looking to automate? Would you like Sheharyar to map out an automated architecture for your team?`,
      mode: 'sales',
      showLeadForm: true,
      action: {
        type: 'whatsapp',
        label: svc.ctaText,
        url: svc.ctaUrl
      },
      sources: ['Self-Hosted n8n Clusters & Workflow Automation'],
      suggestedChips: ['⚙️ Self-Hosted n8n Workflows', '💬 Chat Directly on WhatsApp', '🎯 Hire Vapi / Voice AI Engineer'],
      isOutOfScope: false
    };
  }

  // 6. White-Label Agency Partnership Queries
  if (lower.includes('agency') || lower.includes('white-label') || lower.includes('whitelabel') || lower.includes('subcontract') || lower.includes('partner') || lower.includes('nda')) {
    const faq = ENTERPRISE_FAQS.find(f => f.category === 'white-label')!;
    return {
      answer: faq.answer,
      mode: 'sales',
      showLeadForm: true,
      action: faq.suggestedAction,
      sources: ['White-Label Agency Engineering Subcontracting'],
      suggestedChips: ['💬 Chat Directly on WhatsApp', '⚡ Custom WordPress VIP Build', '⚙️ Self-Hosted n8n Workflows'],
      isOutOfScope: false
    };
  }

  // 7. Contact, Phone & WhatsApp Queries
  if (lower.includes('contact') || lower.includes('whatsapp') || lower.includes('phone') || lower.includes('email') || lower.includes('call') || lower.includes('hire') || lower.includes('rabta')) {
    return {
      answer: `You can connect directly with Sheharyar Siraj across these verified channels:\n\n• **Direct WhatsApp**: +92 313 2080033 (Immediate engineering response & voice notes)\n• **Direct Email**: sherryansari870@gmail.com (Formal RFPs & specs with guaranteed < 2-hour response SLA)\n• **Upwork Escrow**: Upwork Top Rated profile with 100% Job Success Score.\n\nWhat project or system architecture would you like to scope together?`,
      mode: 'sales',
      showLeadForm: true,
      action: {
        type: 'whatsapp',
        label: 'Message on WhatsApp (+92 313 2080033)',
        url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20am%20reaching%20out%20via%20your%20website%20to%20discuss%20a%20project.'
      },
      sources: ['Direct Comms & Contact Desk'],
      suggestedChips: ['💬 Chat Directly on WhatsApp', '⚡ Custom WordPress VIP Build', '🎯 Hire Vapi / Voice AI Engineer'],
      isOutOfScope: false
    };
  }

  // 8. Credentials & Bio Queries
  if (lower.includes('who is') || lower.includes('experience') || lower.includes('credentials') || lower.includes('bio') || lower.includes('sheharyar') || lower.includes('background') || lower.includes('ccnp') || lower.includes('certifications') || lower.includes('kon hai')) {
    return {
      answer: `Sheharyar Siraj is a Senior WordPress Architect & Agentic AI Automation Engineer with over 5 years of commercial experience and 1,200+ completed projects worldwide across the US, UK, UAE, Saudi Arabia, Germany, Australia, and Europe.\n\n• **Verified Reputation**: 100% Job Success Score (JSS) on Upwork, 5.0 Star Rating, Top Rated.\n• **Certifications**: Cisco Certified Network Professional (CCNP), Cisco Certified CyberOps Associate, Google Cloud Vertex AI Certified.\n• **Education**: Virtual University of Pakistan (BBIT - Computer Software Engineering).\n• **Core Engineering Stack**: Custom PHP 8.2 VIP, Vapi/Retell voice telephony, self-hosted n8n, LangGraph multi-agent systems, and PostgreSQL.\n\nWould you like Sheharyar to review an upcoming project or white-label partnership with your agency?`,
      mode: 'support',
      showLeadForm: true,
      action: {
        type: 'whatsapp',
        label: 'Connect with Sheharyar on WhatsApp',
        url: 'https://wa.me/923132080033'
      },
      sources: ['Sheharyar Siraj Professional Dossier & Credentials'],
      suggestedChips: ['💬 Chat Directly on WhatsApp', '⚡ Custom WordPress VIP Build', '🎯 Hire Vapi / Voice AI Engineer'],
      isOutOfScope: false
    };
  }

  // 9. Greetings
  if (isGreeting(query)) {
    if (isUrdu) {
      return {
        answer: 'Walaikum Assalam! Main Sheharyar Siraj ka interactive AI Project Consultant hoon. Sheharyar 5+ saal ke experience ke sath high-speed WordPress architectures, sub-600ms AI voice agents aur enterprise n8n workflow automations engineer karte hain. Aaj main aapke kis project ya technical sawal mein madad kar sakta hoon?',
        mode: 'support',
        action: {
          type: 'whatsapp',
          label: 'Chat Directly on WhatsApp',
          url: 'https://wa.me/923132080033'
        },
        sources: ['Interactive Welcome Desk'],
        suggestedChips: DEFAULT_QUICK_CHIPS,
        isOutOfScope: false
      };
    }

    return {
      answer: 'Hello! I am Sheharyar Siraj\'s official AI Project Consultant. Sheharyar is an Enterprise WordPress Architect and Agentic AI Engineer with 5+ years of experience and 1,200+ delivered projects worldwide. Are you looking to architect a high-performance WordPress platform, build an autonomous AI voice phone agent (via Vapi/Twilio), or automate complex workflows using self-hosted n8n?',
      mode: 'support',
      action: {
        type: 'whatsapp',
        label: 'Chat Directly on WhatsApp',
        url: 'https://wa.me/923132080033'
      },
      sources: ['Interactive Welcome Desk'],
      suggestedChips: DEFAULT_QUICK_CHIPS,
      isOutOfScope: false
    };
  }

  // 10. Fallback: Search Knowledge Base Chunks or Consultative Lead Generation
  const queryTokens = tokenize(query);
  let bestChunk = RAG_KNOWLEDGE_BASE[0];
  let maxScore = 0;

  for (const chunk of RAG_KNOWLEDGE_BASE) {
    let score = 0;
    if (lower.includes(chunk.title.toLowerCase())) score += 20;
    for (const kw of chunk.keywords) {
      if (lower.includes(kw.toLowerCase())) score += 10;
    }
    const contentTokens = tokenize(chunk.content);
    for (const token of queryTokens) {
      if (contentTokens.includes(token)) score += 1.5;
    }
    if (score > maxScore) {
      maxScore = score;
      bestChunk = chunk;
    }
  }

  if (maxScore >= 6) {
    return {
      answer: `${bestChunk.content}\n\nWould you like Sheharyar to audit your existing setup or scope an architecture proposal for this? Connect directly on WhatsApp (+92 313 2080033) for a 2-hour SLA response.`,
      mode: 'sales',
      showLeadForm: true,
      action: bestChunk.suggestedAction || {
        type: 'whatsapp',
        label: 'Discuss with Sheharyar on WhatsApp',
        url: 'https://wa.me/923132080033'
      },
      sources: [bestChunk.title],
      suggestedChips: DEFAULT_QUICK_CHIPS,
      isOutOfScope: false
    };
  }

  // General consultative response rather than a dead-end
  return {
    answer: `I'd be glad to help with your project! Sheharyar Siraj specializes in custom WordPress VIP development, sub-600ms conversational AI voice agents (Vapi/Twilio), self-hosted n8n automations, and scalable SaaS architectures.\n\nCould you share a bit more about what you are aiming to build, your current technical stack, or your target timeline? Sheharyar provides free technical scoping calls with a guaranteed 2-hour response SLA.`,
    mode: 'sales',
    showLeadForm: true,
    action: {
      type: 'whatsapp',
      label: 'Message Sheharyar Directly on WhatsApp',
      url: 'https://wa.me/923132080033'
    },
    sources: ['Enterprise Consulting Desk'],
    suggestedChips: DEFAULT_QUICK_CHIPS,
    isOutOfScope: false
  };
}

// Master query execution pipeline
export async function processRagQuery(
  userQuery: string,
  history: ChatMessage[] = []
): Promise<RetrievalResult> {
  const trimmed = userQuery.trim();
  const isUrdu = isRomanUrdu(trimmed);

  // 1. Guardrail evaluation
  if (!checkScope(trimmed)) {
    const fallbackText = isUrdu
      ? 'Main sirf Sheharyar Siraj ki software engineering, custom WordPress architectures, aur AI automations ke hawale se madad kar sakta hoon. Website ke data se bahar mere paas information mojood nahi hai, lekin aap services ya kisi project ke mutabiq sawal pooch sakte hain!'
      : 'I specialize exclusively in Sheharyar Siraj\'s technical portfolio, custom WordPress VIP systems, AI voice agents, and business automation pipelines. While I cannot answer questions outside of software engineering and business operations, I would be glad to help scope your web or automation project!';

    return {
      answer: fallbackText,
      mode: 'support',
      isOutOfScope: true,
      action: {
        type: 'whatsapp',
        label: 'Connect with Sheharyar on WhatsApp',
        url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20have%20a%20project%20inquiry.'
      },
      suggestedChips: DEFAULT_QUICK_CHIPS
    };
  }

  // 2. Evaluate Mode: Sales Intent vs Customer Support
  const mode: ChatBotMode = isSalesIntent(trimmed) ? 'sales' : 'support';

  // 2b. Direct "I am interested" instant bypass (deterministic response)
  if (isDirectInterestIntent(trimmed)) {
    return synthesizeConsultativeResponse(trimmed, isUrdu, mode);
  }

  // 3. Try Live Cloud LLM Generation (if API key is available in environment)
  const liveLlmAnswer = await tryLiveLlmGeneration(trimmed, history, mode);
  if (liveLlmAnswer) {
    return {
      answer: liveLlmAnswer,
      mode,
      showLeadForm: mode === 'sales',
      action: {
        type: 'whatsapp',
        label: 'Message on WhatsApp (+92 313 2080033)',
        url: 'https://wa.me/923132080033'
      },
      sources: ['Grounded Enterprise Knowledge Base'],
      suggestedChips: DEFAULT_QUICK_CHIPS,
      isOutOfScope: false
    };
  }

  // 4. Local Consultative RAG Engine
  return synthesizeConsultativeResponse(trimmed, isUrdu, mode);
}
