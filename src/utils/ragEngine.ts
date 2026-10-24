import { 
  ARCHITECT_IDENTITY, 
  CORE_10_SERVICES, 
  CONSULTATIVE_CORE_MESSAGE, 
  CONSULTATIVE_URDU_MESSAGE 
} from '../data/agentKnowledge';
import { RAG_GUARDRAILS, RAG_KNOWLEDGE_BASE } from '../data/ragKnowledgeBase';

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
  '🎯 AI Voice Telephony (Vapi)',
  '⚡ Custom WordPress VIP Build',
  '⚙️ Self-Hosted n8n Clusters',
  '💰 Pricing & Timelines',
  '💬 Chat on WhatsApp'
];

export const GEMINI_SYSTEM_INSTRUCTION = `You are the official AI Project Consultant for Sheharyar Siraj (sheharyarsiraj.com / Ansari Web Agency).
Act as an experienced, consultative senior solutions architect and technical project manager.

ARCHITECT IDENTITY & CREDENTIALS:
- Sheharyar Siraj: Founder & Principal Systems Architect at Ansari Web Agency. Over 5+ years of verified software engineering experience, 1,200+ completed client deployments worldwide.
- Upwork: Top Rated with 100% Job Success Score (JSS), 5.0 Star verified rating.
- Credentials: Cisco Certified Network Professional (CCNP Enterprise Infrastructure), Cisco Certified CyberOps Associate, Google Cloud Vertex AI Certified Professional.
- Response SLA: Guaranteed technical response and preliminary scoping roadmap delivered within 2 business hours under bilateral NDA.
- Direct Contact Endpoints: WhatsApp: +92 313 2080033 (instant chat & voice notes), Email: sherryansari870@gmail.com.

CASUAL HUMAN CONVERSATION & EMPATHY:
- When the user engages in casual small talk (e.g., "Hello", "How are you doing?", "Who built you?", "What's up?", "How's it going?", "Nice to meet you"):
  Respond warmly, naturally, and concisely like a real, experienced human engineer.
  Always VALIDATE what they said first before gently anchoring back to how you can assist with their software architecture, WordPress VIP builds, voice bots, or enterprise automations.
- Never give broken, repetitive, or teleprompter-like text dumps.
- Do NOT ignore what the user just asked.

EXPLICIT 11 CORE SERVICES CATALOG:
1. Custom WordPress Development: Modern, custom WordPress development built from scratch without bloated, slow page builders; clean PHP 8.2 code, bespoke Gutenberg blocks, ultra-fast loading speeds, 95+ Core Web Vitals ($1,200–$3,500; 1–3 weeks).
2. Autonomous AI Voice Agents & Telephony: Instant-response AI voice agents for automated phone calls and customer reception via Vapi, Retell AI, and Twilio; 24/7 calendar booking into Google Calendar / Cal.com & CRM sync ($1,500–$4,000; 1–2 weeks).
3. Workflow Automation & n8n Clusters: Self-hosted multi-worker Docker clusters on private VPS (Hetzner, AWS) with Redis queues and Dead Letter Queue (DLQ) retry architecture (0% data loss), eliminating Zapier fees ($800–$2,500; 3–7 business days).
4. WooCommerce Systems Architecture: High-Performance Order Storage (HPOS) database migration, cart session sharding, Redis Object Cache, database index tuning for 10,000+ daily orders without DB deadlocks ($1,500–$3,500; 1–2 weeks).
5. Contextual AI Chatbots & RAG Systems: Hybrid vector search (Pinecone, Qdrant, Supabase pgvector) grounded in private documentation with source citations and zero hallucinations ($1,200–$3,000; 1–2 weeks).
6. Agentic AI Applications: Deterministic multi-agent workflows using LangGraph and Python with strict schema tool-calling, evaluation checks, and self-correcting state machines ($2,500–$6,000; 2–4 weeks).
7. Custom SaaS & MVP Architecture: Full-stack React, Next.js 15, Node.js, PostgreSQL with Prisma, Stripe multi-tier subscription billing ($3,500–$8,000; 3–6 weeks).
8. White-Label Agency Subcontracting: Dedicated technical engineering partner for digital and SEO agencies in USA, UK, UAE, and EU under strict bilateral NDA ($1,500–$3,500/week retainers).
9. AI Video Ads & Synthetic UGC: Automated high-conversion video pipelines powered by HeyGen, ElevenLabs voice cloning, and direct-response ad frameworks ($1,000–$3,000; 1–2 weeks).
10. Data Pipelines & Headless Scraping: Resilient extraction via ScrapeGraphAI and Playwright, residential proxy rotation, anti-bot bypass, and automated database ETL ($800–$2,500; 3–10 days).
11. Data Analytics & Data Science Solutions: Interactive executive dashboards in Power BI, Tableau, and Advanced Microsoft Excel (automated reports, dynamic pivot models, executive KPI dashboards); SQL (PostgreSQL, MySQL) ETL pipelines; Python (Pandas, NumPy, Scikit-learn) predictive modeling (customer churn analysis, sales forecasting); and automated web data scrapers (ScrapeGraphAI) ($1,200–$4,000; 1–3 weeks).

INTERACTIVE DEVELOPER UTILITY TOOLS (All 10 Built-In Tools at /tools/):
- Webhook Payload Tester (/tools/webhook-payload-tester/): Asynchronous webhook testing & HMAC SHA-256 signature inspector.
- Custom Post Type Code Exporter (/tools/wordpress-cpt-code-exporter/): Pure PHP 8.2 CPT & meta box generator replacing bulky plugins.
- WordPress Database Bloat Estimator (/tools/wordpress-database-bloat-estimator/): Audits wp_options autoload & transient bloat with SQL cleanups.
- PSR-4 WordPress Plugin Boilerplate Generator (/tools/wordpress-plugin-boilerplate-generator/): Modular plugin boilerplate with strict typing.
- AI Voice Agent ROI Calculator (/tools/voice-agent-roi-calculator/): Calculates labor savings and payback from Vapi/Twilio voice agents.
- AI Voice Prompt Designer (/tools/ai-voice-prompt-designer/): Prompt state machine builder for conversational telephony agents.
- n8n Error Handler Generator (/tools/n8n-error-handler-generator/): Dead Letter Queue (DLQ) retry workflow builder for n8n.
- Local Schema & Entity Generator (/tools/local-schema-generator/): JSON-LD LocalBusiness & LLMs.txt generator for AI crawlers.
- LLM SEO Meta Generator (/tools/llm-seo-meta-generator/): SERP & AI Overview simulation for SEO meta tags.
- WooCommerce SKU & Catalog Auditor (/tools/woocommerce-seo-sku-auditor/): Detects SKU collisions and catalog metadata issues.

INTERACTIVE MINI-GAMES & CODE ARCADE (/arcade/):
- Retro-futuristic developer coding arena featuring Puzzle Mode (grid navigation coding) and Boss Fighter Mode (algorithmic battles) across JavaScript, Python, React, HTML/CSS, and API/JSON.

DIALOGUE & CONVERSION GUIDELINES:
- When asked "What services do you provide on this website?":
  State: "${CONSULTATIVE_CORE_MESSAGE}"
- Consultative Flow: Answer questions in clear, outcome-focused business language. Ask natural discovery questions (e.g., "Are you looking to optimize an existing system or scope a new build?"). Mention relevant built-in tools when helpful.
- High-Intent Form Trigger: Display the lead capture form ONLY when the client exhibits clear hiring or purchasing intent (e.g., "I want to work with you", "How can we start?", "Let's do this", "Send me a quote", or after they explicitly agree to a consultation). Accompany the form with:
  "I can have Sheharyar review your requirements and reach out within 2 hours. Feel free to leave your WhatsApp and details below, or reach out directly on WhatsApp at +92 313 2080033."
- Spoken Brevity: For voice mode, keep responses strictly to 1 to 3 punchy sentences (under 45 words), without markdown bullets or asterisks.
- Multilingual: Support English and Roman Urdu / Urdu fluently and naturally.`;

// Language / Roman Urdu detection
export function isRomanUrdu(text: string): boolean {
  const urduPatterns = [
    /\b(kya|kaise|kese|karun|karo|batao|batayein|chahiye|kitna|kitne|paise|kharcha|rabta|rabtah|hain|hai|mujhe|mera|meri|kahan|kidhar|banani|banwana|krna|krte|ho|ap|aap|bhi|aur|kaam|banao|dijiye|theek|acha|shukriya|zaroorat|karna|shuru)\b/i
  ];
  return urduPatterns.some((pattern) => pattern.test(text));
}

// Check for explicit hiring / scoping form submission intent
export function isDirectInterestIntent(query: string): boolean {
  const clean = query.toLowerCase().trim();
  const explicitTriggers = [
    'i want to hire you',
    'i want to hire',
    'hire you',
    'hire sheharyar',
    'want to work with you',
    'i want to work with you',
    "let's work together",
    'lets work together',
    'sign me up',
    'start project with you',
    'start a project',
    'start project',
    'open form',
    'open scoping form',
    'send me a proposal',
    'send proposal',
    'send a proposal',
    'send me a quote',
    'send a quote',
    'send quote',
    'get a quote',
    'request a quote',
    'book a call',
    'schedule a call',
    'agree to a consultation',
    'book consultation',
    'schedule consultation',
    'how can we start',
    "let's do this",
    'lets do this',
    "let's get started",
    'lets get started',
    'ready to start',
    'leave my details',
    'leave details',
    'submit details',
    'take my number',
    'kaam shuru karna hai',
    'project start karna hai',
    'hire krna hai'
  ];
  return explicitTriggers.some((t) => clean.includes(t));
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

// Tokenize text for semantic matching
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1);
}

interface GeminiContentItem {
  role: 'user' | 'model';
  parts: { text: string }[];
}

/**
 * Builds a sanitized, alternating contents array for Google Gemini REST API.
 * Ensures:
 * 1. The first item in contents ALWAYS has role: 'user'.
 * 2. Roles alternate strictly ('user' -> 'model' -> 'user' -> 'model').
 * 3. The current query is the final 'user' turn.
 */
export function buildGeminiContents(
  history: ChatMessage[],
  currentQuery: string
): GeminiContentItem[] {
  const contents: GeminiContentItem[] = [];

  // Filter valid messages and map roles
  const rawItems = history
    .filter((m) => m.text && m.text.trim())
    .map((m) => ({
      role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
      text: m.text.trim()
    }));

  // Find the first user message (Gemini strictly requires contents[0].role === 'user')
  const firstUserIdx = rawItems.findIndex((item) => item.role === 'user');
  const validItems = firstUserIdx >= 0 ? rawItems.slice(firstUserIdx) : [];

  for (const item of validItems) {
    if (contents.length === 0) {
      if (item.role === 'user') {
        contents.push({ role: 'user', parts: [{ text: item.text }] });
      }
    } else {
      const prev = contents[contents.length - 1];
      if (prev.role === item.role) {
        prev.parts[0].text += `\n${item.text}`;
      } else {
        contents.push({ role: item.role, parts: [{ text: item.text }] });
      }
    }
  }

  // Append current query as final user turn
  if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
    contents[contents.length - 1].parts[0].text += `\n${currentQuery.trim()}`;
  } else {
    contents.push({ role: 'user', parts: [{ text: currentQuery.trim() }] });
  }

  return contents;
}

/**
 * Calls Google Gemini REST API directly using Free Tier via Gemini 1.5/2.0 Flash
 */
async function callGeminiApiDirect(
  geminiKey: string,
  geminiContents: GeminiContentItem[],
  isVoice: boolean = false
): Promise<string | null> {
  const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash'];

  for (const model of models) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6500);

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
      const payload = {
        systemInstruction: {
          parts: [{ text: GEMINI_SYSTEM_INSTRUCTION }]
        },
        contents: geminiContents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: isVoice ? 150 : 380,
          topP: 0.95
        }
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify(payload)
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const generated = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generated && generated.trim()) {
          return generated.trim().replace(/[\u2013\u2014]/g, ' - ');
        }
      }
    } catch {
      // Continue to next model or fallback
    }
  }

  return null;
}

/**
 * Live Cloud LLM Generation (tries /api/chat serverless handler, then direct Gemini / OpenAI)
 */
async function tryLiveLlmGeneration(
  query: string,
  history: ChatMessage[],
  mode: ChatBotMode,
  hasIntroduced: boolean,
  isVoice: boolean = false
): Promise<string | null> {
  const geminiContents = buildGeminiContents(history, query);

  // 1. Direct Client-side Gemini API Key (instant zero-proxy response)
  const env = (import.meta as unknown as { env: Record<string, string> }).env || {};
  const geminiKey = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY;

  if (geminiKey && geminiKey.trim()) {
    const directResult = await callGeminiApiDirect(geminiKey.trim(), geminiContents, isVoice);
    if (directResult) return directResult;
  }

  // 2. Serverless endpoint /api/chat (works in production Vercel & local Vite dev middleware)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const apiRes = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        message: query,
        history: history.slice(-8).map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        })),
        isVoice
      })
    });

    clearTimeout(timeoutId);

    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data && data.reply && typeof data.reply === 'string' && data.reply.trim()) {
        return data.reply.trim();
      }
    }
  } catch {
    // /api/chat unreachable, fall through to client OpenAI or local intelligent brain
  }

  // 3. Client-side OpenAI Key Fallback
  const openaiKey = env.VITE_OPENAI_API_KEY || env.OPENAI_API_KEY;
  if (openaiKey && openaiKey.trim()) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const openAiMessages = [
        { role: 'system', content: GEMINI_SYSTEM_INSTRUCTION },
        ...history.slice(-6).map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        })),
        { role: 'user', content: query }
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: openAiMessages,
          temperature: 0.4,
          max_tokens: isVoice ? 150 : 380
        })
      });
      clearTimeout(timeoutId);
      if (response.ok) {
        const data = await response.json();
        const generated = data.choices?.[0]?.message?.content;
        if (generated && generated.trim()) return generated.trim().replace(/[\u2013\u2014]/g, ' - ');
      }
    } catch {
      // Fall through to local intelligent brain
    }
  }

  return null;
}

/**
 * Intelligent Grounded Conversational Brain (Zero-Key Autonomy)
 * Handles small-talk, greetings, identity, empathy, context tracking, and 10 core services.
 */
function synthesizeConsultativeResponse(
  query: string,
  isUrdu: boolean,
  mode: ChatBotMode,
  hasIntroduced: boolean = false,
  history: ChatMessage[] = [],
  isVoice: boolean = false
): RetrievalResult {
  const lower = query.toLowerCase().trim();

  // Multi-Turn Conversational Memory Inference
  const historyText = history.slice(-5).map((m) => m.text.toLowerCase()).join(' ');
  const contextVoice = historyText.includes('voice') || historyText.includes('vapi') || historyText.includes('retell') || historyText.includes('phone') || historyText.includes('receptionist') || historyText.includes('telephony');
  const contextWp = historyText.includes('wordpress') || historyText.includes('woo') || historyText.includes('website') || historyText.includes('gutenberg') || historyText.includes('php') || historyText.includes('hpos');
  const contextN8n = historyText.includes('n8n') || historyText.includes('automation') || historyText.includes('zapier') || historyText.includes('workflow');
  const contextAgency = historyText.includes('agency') || historyText.includes('white-label') || historyText.includes('whitelabel') || historyText.includes('retainer');

  // 1. Direct Hiring / Explicit Scoping Intent
  if (isDirectInterestIntent(lower)) {
    if (isUrdu) {
      return {
        answer: isVoice
          ? "Main Sheharyar se aapki requirements review karwa kar 2 ghante mein rabta karwa sakta hoon. Aap apna WhatsApp neeche darj karein ya direct WhatsApp +92 313 2080033 par connect karein."
          : "Main Sheharyar se aapki requirements review karwa kar 2 ghante ke andar direct rabta karwa sakta hoon. Aap apna WhatsApp aur details neeche darj karein, ya direct Sheharyar se WhatsApp (+92 313 2080033) par rabta karein.",
        mode: 'sales',
        showLeadForm: true,
        action: {
          type: 'whatsapp',
          label: 'Direct WhatsApp par Rabta Karein (+92 313 2080033)',
          url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20am%20interested%20in%20scoping%20a%20project%20and%20getting%20a%20proposal.'
        },
        sources: ['Direct Architecture Scoping Desk'],
        suggestedChips: [
          '💬 Chat on WhatsApp (+92 313 2080033)',
          '⚡ Custom WordPress VIP Build',
          '🎯 Autonomous AI Voice Agent'
        ],
        isOutOfScope: false
      };
    }

    return {
      answer: isVoice
        ? "I can have Sheharyar review your requirements and reach out within 2 hours. Feel free to leave your WhatsApp and details below, or reach out directly on WhatsApp at +92 313 2080033."
        : "I can have Sheharyar review your requirements and reach out within 2 hours. Feel free to leave your WhatsApp and details below, or reach out directly on WhatsApp at +92 313 2080033.",
      mode: 'sales',
      showLeadForm: true,
      action: {
        type: 'whatsapp',
        label: 'Message Sheharyar Directly on WhatsApp (+92 313 2080033)',
        url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20am%20interested%20in%20scoping%20a%20project%20and%20getting%20a%20proposal.'
      },
      sources: ['Direct Architecture Scoping Desk'],
      suggestedChips: [
        '💬 Chat Directly on WhatsApp (+92 313 2080033)',
        '⚡ Custom WordPress VIP Build',
        '🎯 AI Voice Telephony (Vapi)'
      ],
      isOutOfScope: false
    };
  }

  // 2. Casual Human Small-Talk & Greetings (Validated with Empathy)
  const isHowAreYou = 
    lower.includes('how are you') ||
    lower.includes("how're you") ||
    lower.includes('how r u') ||
    lower.includes('how is it going') ||
    lower.includes("how's it going") ||
    lower.includes('hows it going') ||
    lower.includes('how are you doing') ||
    lower.includes('kese ho') ||
    lower.includes('kaise ho') ||
    lower.includes('kya hal');

  if (isHowAreYou) {
    if (isUrdu) {
      return {
        answer: isVoice
          ? "Main bilkul theek hoon, shukriya! Main Sheharyar ka AI Project Consultant hoon. Aap sunayein, aaj kis project ya architecture par baat karni hai?"
          : "Main bilkul theek hoon, shukriya! Main Sheharyar Siraj ka official AI Project Consultant hoon. Hum custom WordPress VIP builds, sub-600ms voice agents, aur n8n automations mein lead karte hain. Aap sunayein, aaj kis project ya requirement par guidance chahiye?",
        mode: 'support',
        showLeadForm: false,
        action: {
          type: 'whatsapp',
          label: 'Chat on WhatsApp (+92 313 2080033)',
          url: 'https://wa.me/923132080033'
        },
        sources: ['Consultative Relationship Management'],
        suggestedChips: DEFAULT_QUICK_CHIPS,
        isOutOfScope: false
      };
    }

    return {
      answer: isVoice
        ? "I'm doing great, thanks for asking! I'm Sheharyar's AI Project Consultant. How are things with you, and what kind of project are you exploring today?"
        : "I'm doing great, thanks for asking! I'm Sheharyar Siraj's official AI Project Consultant. We specialize in high-performance web systems and AI engineering — like sub-500ms WordPress VIP builds, sub-600ms AI voice agents, and self-hosted n8n clusters. How are things with you, and what brings you by today?",
      mode: 'support',
      showLeadForm: false,
      action: {
        type: 'whatsapp',
        label: 'Chat on WhatsApp (+92 313 2080033)',
        url: 'https://wa.me/923132080033'
      },
      sources: ['Consultative Relationship Management'],
      suggestedChips: DEFAULT_QUICK_CHIPS,
      isOutOfScope: false
    };
  }

  const isWhoBuiltYou = 
    lower.includes('who built you') ||
    lower.includes('who made you') ||
    lower.includes('who created you') ||
    lower.includes('who developed you') ||
    lower.includes('kis ne banaya');

  if (isWhoBuiltYou) {
    if (isUrdu) {
      return {
        answer: isVoice
          ? "Mujhe Sheharyar Siraj ne architect kiya hai, jo Ansari Web Agency ke Principal Systems Architect hain with 5+ years experience and 1,200+ global deployments."
          : "Mujhe Sheharyar Siraj ne develop kiya hai, jo Ansari Web Agency ke Founder aur Principal Systems Architect hain. Unke paas 5+ saal ka commercial experience, 1,200+ global deployments, aur Cisco CCNP wa Google Cloud Vertex AI certifications hain. Main unki services aur architectures ko represent karta hoon. Aapke project mein hum kaise madad kar sakte hain?",
        mode: 'support',
        showLeadForm: false,
        action: {
          type: 'whatsapp',
          label: 'Connect with Sheharyar (+92 313 2080033)',
          url: 'https://wa.me/923132080033'
        },
        sources: ['Architect Identity & Lineage'],
        suggestedChips: DEFAULT_QUICK_CHIPS,
        isOutOfScope: false
      };
    }

    return {
      answer: isVoice
        ? "I was built by Sheharyar Siraj, Principal Systems Architect at Ansari Web Agency, grounded directly in his 1,200+ global deployments and engineering blueprints. How can I assist you with your software architecture today?"
        : "I was built by Sheharyar Siraj, Founder & Principal Systems Architect at Ansari Web Agency. He trained me directly on his 1,200+ commercial deployments, Cisco CCNP/CyberOps engineering credentials, and full service catalog. How can I help you with your web architecture, voice AI agents, or workflow automations today?",
      mode: 'support',
      showLeadForm: false,
      action: {
        type: 'whatsapp',
        label: 'Connect with Sheharyar (+92 313 2080033)',
        url: 'https://wa.me/923132080033'
      },
      sources: ['Architect Identity & Lineage'],
      suggestedChips: DEFAULT_QUICK_CHIPS,
      isOutOfScope: false
    };
  }

  const isWhatsUp = 
    lower === "what's up" ||
    lower === 'whats up' ||
    lower === 'sup' ||
    lower === 'wassup' ||
    lower.includes('kya chal raha');

  if (isWhatsUp) {
    return {
      answer: isVoice
        ? "Not much, just scoping scalable web systems and AI voice agents! How about you — exploring ideas for a new build or looking to optimize an existing system?"
        : "Not much, just scoping high-throughput web systems, custom WordPress VIP builds, and autonomous AI voice agents! How about you — exploring ideas for a new project, or looking to resolve a performance bottleneck?",
      mode: 'support',
      showLeadForm: false,
      action: {
        type: 'whatsapp',
        label: 'Chat on WhatsApp (+92 313 2080033)',
        url: 'https://wa.me/923132080033'
      },
      sources: ['Casual Interaction Desk'],
      suggestedChips: DEFAULT_QUICK_CHIPS,
      isOutOfScope: false
    };
  }

  const isGratitude = 
    lower.includes('thank you') ||
    lower.includes('thanks') ||
    lower.includes('shukriya') ||
    lower.includes('jazakallah');

  if (isGratitude) {
    return {
      answer: isVoice
        ? "You're very welcome! Let me know if you want to explore any architecture specs or connect with Sheharyar directly on WhatsApp."
        : "You're very welcome! Feel free to ask about any specific architecture, pricing, or timelines — or connect directly with Sheharyar on WhatsApp (+92 313 2080033) for a 2-hour SLA review.",
      mode: 'support',
      showLeadForm: false,
      action: {
        type: 'whatsapp',
        label: 'Chat on WhatsApp (+92 313 2080033)',
        url: 'https://wa.me/923132080033'
      },
      sources: ['Client Success & Gratitude Desk'],
      suggestedChips: DEFAULT_QUICK_CHIPS,
      isOutOfScope: false
    };
  }

  const isAgreement = 
    lower === 'great' ||
    lower === 'awesome' ||
    lower === 'cool' ||
    lower === 'sounds good' ||
    lower === 'perfect' ||
    lower === 'theek hai' ||
    lower === 'acha';

  if (isAgreement) {
    return {
      answer: isVoice
        ? "Awesome! What specific bottleneck or feature should we explore next? I can walk you through Custom WordPress VIP builds, AI Voice Telephony, or self-hosted n8n automations."
        : "Awesome! Which specific bottleneck or feature would you like to explore next? We can dive into Custom WordPress VIP architectures, sub-600ms AI voice agents, self-hosted n8n automations, or project timelines.",
      mode: 'support',
      showLeadForm: false,
      action: {
        type: 'whatsapp',
        label: 'Chat on WhatsApp (+92 313 2080033)',
        url: 'https://wa.me/923132080033'
      },
      sources: ['Conversational Alignment'],
      suggestedChips: DEFAULT_QUICK_CHIPS,
      isOutOfScope: false
    };
  }

  const isCasualGreeting = 
    lower === 'hi' ||
    lower === 'hello' ||
    lower === 'hey' ||
    lower.startsWith('hey ') ||
    lower.startsWith('hello ') ||
    lower.startsWith('hi ') ||
    lower === 'salam' ||
    lower === 'assalam' ||
    lower === 'aoa' ||
    lower.includes('good morning') ||
    lower.includes('good evening') ||
    lower.includes('good afternoon');

  if (isCasualGreeting && history.length === 0) {
    return {
      answer: isVoice
        ? "Hello! I am Sheharyar Siraj's Principal Architecture Consultant. We specialize in custom WordPress VIP systems, sub-600ms AI voice agents, and enterprise n8n automations. What bottleneck can I help you resolve today?"
        : "Hello! I am Sheharyar Siraj's Principal Architecture Consultant. We specialize in high-performance web systems and AI engineering. What bottleneck can I help you resolve today?",
      mode: 'support',
      showLeadForm: false,
      action: {
        type: 'whatsapp',
        label: 'Chat on WhatsApp (+92 313 2080033)',
        url: 'https://wa.me/923132080033'
      },
      sources: ['Ansari Web Agency Interactive Desk'],
      suggestedChips: DEFAULT_QUICK_CHIPS,
      isOutOfScope: false
    };
  }

  // 3. "What services do you provide on this website?" / Capabilities
  const isServicesQuery = 
    lower.includes('services') ||
    lower.includes('what do you do') ||
    lower.includes('what can you do') ||
    lower.includes('what services') ||
    lower.includes('kya karte ho') ||
    lower.includes('kya kaam') ||
    lower.includes('offerings') ||
    lower.includes('capabilities') ||
    lower.includes('specialization');

  if (isServicesQuery) {
    if (isUrdu) {
      return {
        answer: isVoice
          ? "Hum high-performance web systems aur AI engineering mein specialize karte hain: Custom WordPress VIP & WooCommerce HPOS, Vapi aur Twilio par autonomous voice agents, self-hosted n8n clusters, aur multi-agent AI. Aapko kis specific bottleneck ko solve karna hai?"
          : `${CONSULTATIVE_URDU_MESSAGE}\n\n• **Custom WordPress VIP & WooCommerce HPOS**: Clean PHP 8.2 code, sub-500ms TTFB, aur 10k+ daily orders handling.\n• **Autonomous AI Voice Agents**: Sub-600ms latency phone receptionists via Vapi aur Twilio SIP with calendar booking.\n• **Self-Hosted n8n Clusters**: Private cloud Docker pipelines jo Zapier fees khatam karte hain with 0% data loss.\n• **Deterministic Multi-Agent AI**: Python & LangGraph workflows with strict schema tool calling.\n\nAre you looking to implement this for your own business or as a white-label partner for your agency?`,
        mode: 'sales',
        showLeadForm: false,
        action: {
          type: 'whatsapp',
          label: 'Discuss Scope on WhatsApp (+92 313 2080033)',
          url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20would%20like%20to%20discuss%20your%20services.'
        },
        sources: ['Core Architectural Services Hub'],
        suggestedChips: DEFAULT_QUICK_CHIPS,
        isOutOfScope: false
      };
    }

    return {
      answer: isVoice
        ? "We specialize in high-performance web systems and AI engineering. Our core pillars include Custom WordPress VIP and WooCommerce HPOS architecture, Autonomous AI Voice Agents via Vapi and Twilio, Self-Hosted n8n Automation clusters, and Deterministic Multi-Agent AI. Which specific bottleneck are you looking to solve?"
        : `${CONSULTATIVE_CORE_MESSAGE}\n\n• **Custom WordPress VIP & WooCommerce HPOS**: Clean PHP 8.2 architecture, zero page-builder bloat, sub-500ms TTFB, and high-concurrency order storage.\n• **Autonomous AI Voice Agents**: Sub-600ms conversational telephony via Vapi and Twilio SIP with 24/7 calendar booking and CRM sync.\n• **Workflow Automation & n8n Clusters**: Self-hosted Docker clusters with Redis queues eliminating expensive Zapier fees with 0% data loss.\n• **Deterministic Multi-Agent AI**: Stateful LangGraph workflows executing autonomous tool-calling.\n\nAre you looking to implement this for your own company or as a white-label partner for your agency clients?`,
      mode: 'sales',
      showLeadForm: false,
      action: {
        type: 'whatsapp',
        label: 'Discuss Scope on WhatsApp (+92 313 2080033)',
        url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20would%20like%20to%20discuss%20your%20services.'
      },
      sources: ['Core Architectural Services Hub'],
      suggestedChips: DEFAULT_QUICK_CHIPS,
      isOutOfScope: false
    };
  }

  // 4. Architect Identity & Bio ("Who is Sheharyar?", "About Sheharyar")
  if (
    lower.includes('who are you') ||
    lower.includes('who is sheharyar') ||
    lower.includes('about sheharyar') ||
    lower.includes('about you') ||
    lower.includes('kon hai') ||
    lower.includes('taruf') ||
    lower.includes('credentials') ||
    lower.includes('background')
  ) {
    if (isUrdu) {
      return {
        answer: isVoice
          ? "Sheharyar Siraj Ansari Web Agency ke Founder aur Principal Systems Architect hain. 5+ saal ke experience, 1,200+ global deployments, aur Cisco CCNP wa Google Cloud Vertex AI credentials ke sath 2-hour SLA provide karte hain."
          : `Sheharyar Siraj Ansari Web Agency ke Founder aur Principal Systems Architect hain. Unke paas 5+ saal ka verified engineering experience aur 1,200+ global deployments ka track record hai, Top Rated on Upwork with 100% Job Success Score (JSS).\n\nVerified Credentials:\n• Cisco Certified Network Professional (CCNP Enterprise Infrastructure)\n• Cisco Certified CyberOps Associate\n• Google Cloud Vertex AI Certified Professional\n\nClients direct senior architect ke sath consult karte hain bina kisi junior account manager ke, protected by bilateral NDAs and a guaranteed 2-hour response SLA.`,
        mode: 'support',
        showLeadForm: false,
        action: {
          type: 'whatsapp',
          label: 'Connect with Sheharyar (+92 313 2080033)',
          url: 'https://wa.me/923132080033'
        },
        sources: ['Verified Architect Profile & Credentials'],
        suggestedChips: DEFAULT_QUICK_CHIPS,
        isOutOfScope: false
      };
    }

    return {
      answer: isVoice
        ? "Sheharyar Siraj is the Founder and Principal Systems Architect at Ansari Web Agency with 5+ years of experience, 1,200+ global deployments, and Cisco CCNP and Google Cloud Vertex AI credentials under a 2-hour SLA."
        : `Sheharyar Siraj is the Founder & Principal Systems Architect at Ansari Web Agency with 5+ years of verified commercial engineering experience and 1,200+ completed client deployments worldwide (100% Upwork JSS, 5.0 Star Top Rated).\n\nVerified Credentials:\n• Cisco Certified Network Professional (CCNP Enterprise Infrastructure)\n• Cisco Certified CyberOps Associate\n• Google Cloud Vertex AI Certified Professional\n\nClients collaborate directly with Sheharyar with zero junior account manager friction, protected by bilateral NDAs and a guaranteed 2-hour technical scoping SLA.`,
      mode: 'support',
      showLeadForm: false,
      action: {
        type: 'whatsapp',
        label: 'Connect with Sheharyar (+92 313 2080033)',
        url: 'https://wa.me/923132080033'
      },
      sources: ['Verified Architect Profile & Credentials'],
      suggestedChips: DEFAULT_QUICK_CHIPS,
      isOutOfScope: false
    };
  }

  // 5. Autonomous AI Voice Agents & Telephony Queries
  if (
    lower.includes('voice') ||
    lower.includes('vapi') ||
    lower.includes('retell') ||
    lower.includes('twilio') ||
    lower.includes('telephony') ||
    lower.includes('phone agent') ||
    lower.includes('phone bot') ||
    lower.includes('receptionist') ||
    lower.includes('sip')
  ) {
    if (isUrdu) {
      return {
        answer: isVoice
          ? "Hum sub-600ms latency ke autonomous AI voice agents engineer karte hain Vapi aur Twilio SIP par jo 24/7 phone attend karke calendar mein appointments schedule karte hain. Kya aapko inbound reception chahiye ya outbound lead qualification?"
          : `Hum sub-600ms latency ke sath conversational AI Voice Telephony Agents engineer karte hain jo Vapi, Retell AI, Deepgram Nova-2 aur Twilio SIP par chalte hain:\n\n• **Sub-600ms Latency**: Natural human turn-taking aur interruption handling bina mechanical pauses ke.\n• **Real-Time Booking**: Live Google Calendar ya Cal.com check karke direct appointment schedule karta hai.\n• **Zero Hallucinations**: Strict state machine workflows jo CRM (HubSpot, GoHighLevel) mein call transcripts aur recordings auto-sync karte hain.\n\nKya aap inbound reception ke liye dekh rahe hain ya outbound sales qualification ke liye? Main Sheharyar se custom proposal tayar karwa sakta hoon within 2 hours.`,
        mode: 'sales',
        showLeadForm: false,
        action: {
          type: 'whatsapp',
          label: 'Scope AI Voice Agent on WhatsApp',
          url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20want%20to%20discuss%20an%20AI%20Voice%20Agent.'
        },
        sources: ['Autonomous AI Voice Telephony Catalog'],
        suggestedChips: ['🎯 AI Voice Telephony (Vapi)', '💰 Pricing & Timelines', '💬 Chat on WhatsApp'],
        isOutOfScope: false
      };
    }

    return {
      answer: isVoice
        ? "We engineer sub-600ms conversational AI voice agents on Vapi and Twilio SIP that handle calls 24/7, book appointments into your calendar, and sync directly with your CRM. Are you looking for inbound reception or outbound lead qualification?"
        : `We engineer autonomous conversational AI voice agents using Vapi, Retell AI, Deepgram Nova-2 speech-to-text, and ElevenLabs voice streaming over Twilio SIP trunks with sub-600ms end-to-end latency.\n\n• **Sub-600ms Natural Latency**: Human-like turn-taking with immediate interruption handling.\n• **Real-Time Appointment Scheduling**: Live tool-calling into Google Calendar or Cal.com during the call.\n• **Deterministic Logic**: Structured state machines that log recordings and qualified leads to HubSpot, GoHighLevel, or Salesforce with zero hallucinations.\n\nAre you looking to implement an inbound receptionist or an outbound qualification agent? Would you be implementing this for your own operations or as a white-label partner for agency clients?`,
      mode: 'sales',
      showLeadForm: false,
      action: {
        type: 'whatsapp',
        label: 'Scope AI Voice Agent on WhatsApp',
        url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20want%20to%20discuss%20an%20AI%20Voice%20Agent.'
      },
      sources: ['Autonomous AI Voice Telephony Catalog'],
      suggestedChips: ['🎯 AI Voice Telephony (Vapi)', '💰 Pricing & Timelines', '💬 Chat on WhatsApp'],
      isOutOfScope: false
    };
  }

  // 6. Custom WordPress VIP & WooCommerce HPOS Queries
  if (
    lower.includes('wordpress') ||
    lower.includes('woocommerce') ||
    lower.includes('php') ||
    lower.includes('speed') ||
    lower.includes('core web vitals') ||
    lower.includes('ttfb') ||
    lower.includes('hpos') ||
    lower.includes('elementor') ||
    lower.includes('gutenberg')
  ) {
    if (isUrdu) {
      return {
        answer: isVoice
          ? "Hum clean PHP 8.2 VIP WordPress architectures build karte hain bina page-builder bloat ke, sub-500ms TTFB aur 95+ Core Web Vitals ke sath. Kya aapki website par speed issue hai ya naya custom build chahiye?"
          : `Hum clean PHP 8.2/8.3 object-oriented WordPress VIP architecture build karte hain jisme Elementor ya Divi ka koi bloat nahi hota:\n\n• **Sub-500ms TTFB**: Custom Gutenberg blocks (React/JSX), lightweight themes, aur persistent Redis Object Caching.\n• **95+ Core Web Vitals**: Google Search Console ke Core Web Vitals metrics green pass hote hain mobile aur desktop par.\n• **WooCommerce HPOS**: Dedicated order tables migration jo 10,000+ daily orders handle karti hai without database deadlocks.\n\nKya aapki mojooda site par slow performance hai ya naya enterprise build scope kar rahe hain?`,
        mode: 'sales',
        showLeadForm: false,
        action: {
          type: 'whatsapp',
          label: 'Scope WordPress VIP on WhatsApp',
          url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20want%20to%20discuss%20a%20Custom%20WordPress%20VIP%20build.'
        },
        sources: ['Custom WordPress VIP & WooCommerce Catalog'],
        suggestedChips: ['⚡ Custom WordPress VIP Build', '💰 Pricing & Timelines', '💬 Chat on WhatsApp'],
        isOutOfScope: false
      };
    }

    return {
      answer: isVoice
        ? "We architect clean PHP 8.2 WordPress VIP systems without page-builder bloat, delivering sub-500ms TTFB and 95 plus Core Web Vitals. Is your current site experiencing performance bottlenecks, or are you planning a new build?"
        : `We architect clean, zero-builder WordPress VIP systems on PHP 8.2/8.3 utilizing custom Gutenberg blocks (React/JSX) and Redis caching. This eliminates third-party page-builder drag, delivering sub-500ms TTFB and 95+ Core Web Vitals on mobile.\n\nFor eCommerce, we implement WooCommerce HPOS custom tables and Redis caching capable of scaling beyond 10,000 orders/day without database locks. Is your current site experiencing performance bottlenecks, or are you planning a greenfield architecture?`,
      mode: 'sales',
      showLeadForm: false,
      action: {
        type: 'whatsapp',
        label: 'Scope WordPress VIP on WhatsApp',
        url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20want%20to%20discuss%20a%20Custom%20WordPress%20VIP%20build.'
      },
      sources: ['Custom WordPress VIP & WooCommerce Catalog'],
      suggestedChips: ['⚡ Custom WordPress VIP Build', '💰 Pricing & Timelines', '💬 Chat on WhatsApp'],
      isOutOfScope: false
    };
  }

  // 7. Workflow Automation & n8n Clusters
  if (
    lower.includes('n8n') ||
    lower.includes('automation') ||
    lower.includes('zapier') ||
    lower.includes('make.com') ||
    lower.includes('workflow') ||
    lower.includes('dlq')
  ) {
    if (isUrdu) {
      return {
        answer: isVoice
          ? "Hum self-hosted n8n multi-worker Docker clusters deploy karte hain private VPS par Redis queues ke sath, jo Zapier ke monthly charges khatam kar dete hain with zero data loss. Kaun se tools connect karne hain?"
          : `Hum self-hosted n8n multi-worker Docker clusters private cloud (Hetzner, AWS) par architect karte hain:\n\n• **Zero Zapier Fees**: Recurring task fees 100% khatam ho jati hain.\n• **Redis Queue & DLQ**: BullMQ workers aur Dead Letter Queues ensure karte hain ke webhook payload 0% loss ho.\n• **GDPR & Privacy**: Data aapke apne private server par rehta hai.\n\nKaun se business workflows ya CRMs automate karne hain? Are you deploying this for your own business or as an agency service?`,
        mode: 'sales',
        showLeadForm: false,
        action: {
          type: 'whatsapp',
          label: 'Scope n8n Cluster on WhatsApp',
          url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20want%20to%20discuss%20n8n%20workflow%20automation.'
        },
        sources: ['Workflow Automation & n8n Catalog'],
        suggestedChips: ['⚙️ Self-Hosted n8n Clusters', '💰 Pricing & Timelines', '💬 Chat on WhatsApp'],
        isOutOfScope: false
      };
    }

    return {
      answer: isVoice
        ? "We deploy self-hosted n8n multi-worker Docker clusters with Redis queues and DLQ fault tolerance, eliminating recurring Zapier subscription fees with 99.95% reliability. Which systems or CRMs do you need integrated?"
        : `We architect enterprise, self-hosted n8n multi-worker Docker clusters on private cloud instances with Redis queue brokers and Dead Letter Queue (DLQ) retry logic. This guarantees 0% webhook data loss, 99.95% uptime, and full GDPR compliance while completely eliminating expensive recurring Zapier/Make task fees.\n\nWhich business workflows or CRMs are you looking to automate? Are you looking to implement this internally or for your agency clients?`,
      mode: 'sales',
      showLeadForm: false,
      action: {
        type: 'whatsapp',
        label: 'Scope n8n Cluster on WhatsApp',
        url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20want%20to%20discuss%20n8n%20workflow%20automation.'
      },
      sources: ['Workflow Automation & n8n Catalog'],
      suggestedChips: ['⚙️ Self-Hosted n8n Clusters', '💰 Pricing & Timelines', '💬 Chat on WhatsApp'],
      isOutOfScope: false
    };
  }

  // 8. Pricing & Timelines (Grounded Multi-Turn Follow-Ups)
  if (
    lower.includes('price') ||
    lower.includes('cost') ||
    lower.includes('rate') ||
    lower.includes('charges') ||
    lower.includes('kitna') ||
    lower.includes('kitne') ||
    lower.includes('how much') ||
    lower.includes('quote') ||
    lower.includes('timeline') ||
    lower.includes('how long')
  ) {
    if (contextVoice) {
      const ans = isUrdu
        ? "Autonomous AI Voice Agent builds $1,500 se $4,000 ke darmiyan aate hain (timeline 1-2 weeks), jisme Vapi prompt state machines, Twilio SIP telephony, calendar booking webhooks aur CRM sync shamil hain. Main Sheharyar se custom proposal tayar karwa sakta hoon within 2 hours. Would you like to leave your details here, or connect directly with him on WhatsApp?"
        : "Autonomous AI Voice Agent implementations typically range from $1,500 to $4,000 (1 to 2 weeks delivery), including Vapi state machine design, Twilio SIP telephony, calendar tool calling, and live CRM sync. I can have Sheharyar audit your architecture and send over a custom proposal within 2 hours. Would you like to leave your details here, or connect directly with him on WhatsApp?";
      return {
        answer: ans,
        mode: 'sales',
        showLeadForm: false,
        action: {
          type: 'whatsapp',
          label: 'Get Scoped Voice Proposal on WhatsApp',
          url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20want%20a%20proposal%20for%20an%20AI%20Voice%20Agent.'
        },
        sources: ['AI Voice Telephony Pricing Matrix'],
        suggestedChips: ['🎯 AI Voice Telephony (Vapi)', '💬 Chat on WhatsApp'],
        isOutOfScope: false
      };
    }

    if (contextWp) {
      const ans = isUrdu
        ? "Custom WordPress VIP builds $1,200 se $3,500 ke darmiyan hote hain (timeline 1-3 weeks), jisme PHP 8.2 VIP code, custom Gutenberg blocks, Redis caching aur sub-500ms speed guarantee shamil hain. Main Sheharyar se custom proposal tayar karwa sakta hoon within 2 hours. Details yahan share kareinge ya WhatsApp par?"
        : "Custom WordPress VIP builds typically range from $1,200 to $3,500 (1 to 3 weeks delivery), backed by clean PHP 8.2 VIP engineering, custom Gutenberg blocks, and 95+ Core Web Vitals. I can have Sheharyar audit your architecture and send over a custom proposal within 2 hours. Would you like to leave your details here, or connect directly with him on WhatsApp?";
      return {
        answer: ans,
        mode: 'sales',
        showLeadForm: false,
        action: {
          type: 'whatsapp',
          label: 'Get WordPress VIP Proposal on WhatsApp',
          url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20want%20a%20proposal%20for%20a%20Custom%20WordPress%20VIP%20build.'
        },
        sources: ['WordPress Architecture Pricing Matrix'],
        suggestedChips: ['⚡ Custom WordPress VIP Build', '💬 Chat on WhatsApp'],
        isOutOfScope: false
      };
    }

    const generalPricing = isUrdu
      ? "Engagement 2 models par hoti hai:\n1. **Fixed Milestone Contracts**: Custom WordPress VIP ($1,200–$3,500), AI Voice Telephony ($1,500–$4,000), aur n8n clusters ($800–$2,500).\n2. **White-Label Agency Retainers**: $1,500–$3,500/week dedicated senior engineering capacity under strict bilateral NDA.\n\nSheharyar 2 ghante ke andar tailored proposal bhej sakte hain. Kya aap yahan details chhorna chahte hain ya WhatsApp (+92 313 2080033) par rabta kareinge?"
      : "We structure engagements across two transparent models:\n1. **Fixed-Price Milestone Contracts**: Custom WordPress VIP ($1,200–$3,500), AI Voice Telephony ($1,500–$4,000), and n8n Automations ($800–$2,500).\n2. **White-Label Agency Retainers**: Dedicated weekly sprint bandwidth for agencies at $1,500–$3,500/week under strict bilateral NDA.\n\nI can have Sheharyar audit your architecture and send over a custom proposal within 2 hours. Would you like to leave your details here, or connect directly with him on WhatsApp?";

    return {
      answer: generalPricing,
      mode: 'sales',
      showLeadForm: false,
      action: {
        type: 'whatsapp',
        label: 'Request Scoping Proposal on WhatsApp (+92 313 2080033)',
        url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20would%20like%20to%20request%20a%20project%20pricing%20proposal.'
      },
      sources: ['Commercial Pricing Strategy & SLAs'],
      suggestedChips: DEFAULT_QUICK_CHIPS,
      isOutOfScope: false
    };
  }

  // 9. White-Label Agency Subcontracting
  if (
    lower.includes('agency') ||
    lower.includes('white-label') ||
    lower.includes('whitelabel') ||
    lower.includes('subcontracting') ||
    lower.includes('partner') ||
    lower.includes('nda')
  ) {
    if (isUrdu) {
      return {
        answer: isVoice
          ? "Hum USA, UK, aur UAE ki digital agencies ke sath dedicated white-label engineering partner ke tor par kaam karte hain under strict bilateral NDA ($1,500-$3,500/week)."
          : `Hum USA, UK, UAE aur Europe ki marketing aur SEO agencies ke sath dedicated technical engineering partner ke tor par kaam karte hain:\n\n• **Strict Bilateral NDA**: 100% white-label confidentiality with zero agency client poaching.\n• **Direct Senior Collaboration**: Aapke agency Slack ya GitHub mein seamless integration bina junior management friction ke.\n• **Retainer Models**: Dedicated weekly sprints ($1,500–$3,500/week) ya fixed-price milestones.\n\nKya aapki agency high-value AI ya custom development projects ke liye technical capacity dekh rahi hai?`,
        mode: 'sales',
        showLeadForm: false,
        action: {
          type: 'whatsapp',
          label: 'Discuss Agency Partnership on WhatsApp',
          url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20want%20to%20discuss%20a%20white-label%20agency%20partnership.'
        },
        sources: ['White-Label Agency Subcontracting Catalog'],
        suggestedChips: DEFAULT_QUICK_CHIPS,
        isOutOfScope: false
      };
    }

    return {
      answer: isVoice
        ? "We partner with digital and marketing agencies under strict bilateral NDA as their dedicated white-label engineering team, handling complex WordPress and AI builds ($1,500 to $3,500 per week)."
        : `We act as the dedicated technical engineering partner for digital, SEO, and marketing agencies across the USA, UK, UAE, and EU:\n\n• **Strict Bilateral NDA**: 100% white-label confidentiality with zero client poaching.\n• **Senior Engineer Integration**: Seamlessly embeds into your agency's Slack, ClickUp, or GitHub with zero management overhead.\n• **Predictable Retainers**: Transparent weekly sprint retainers ($1,500–$3,500/week) or fixed milestone contracts.\n\nIs your agency turning away complex AI or custom development projects due to in-house technical capacity?`,
      mode: 'sales',
      showLeadForm: false,
      action: {
        type: 'whatsapp',
        label: 'Discuss Agency Partnership on WhatsApp',
        url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20want%20to%20discuss%20a%20white-label%20agency%20partnership.'
      },
      sources: ['White-Label Agency Subcontracting Catalog'],
      suggestedChips: DEFAULT_QUICK_CHIPS,
      isOutOfScope: false
    };
  }

  // 10. Data Analytics & Data Science Solutions
  if (
    lower.includes('data analytics') ||
    lower.includes('data science') ||
    lower.includes('power bi') ||
    lower.includes('tableau') ||
    lower.includes('excel') ||
    lower.includes('dashboard') ||
    lower.includes('churn') ||
    lower.includes('forecasting') ||
    lower.includes('bi dashboard') ||
    lower.includes('scraping') ||
    lower.includes('scrapers') ||
    lower.includes('scrapegraphai')
  ) {
    if (isUrdu) {
      return {
        answer: isVoice
          ? "Hum Power BI, Tableau, aur Advanced Excel dashboards build karte hain, sath mein Python machine learning models churn prediction aur automated web data scraping ke liye. Kya aapko executive dashboards chahiye ya automated data pipelines?"
          : `Hum enterprise Data Analytics & Data Science Solutions deliver karte hain:\n\n• **Executive BI Dashboards**: Power BI, Tableau, aur Advanced Excel dynamic financial & operational KPI models.\n• **Data Engineering & SQL**: PostgreSQL aur MySQL ETL pipelines jo multi-channel data automate karte hain.\n• **Predictive Machine Learning**: Python (Pandas, Scikit-learn) predictive models for customer churn, lifetime value (LTV), aur sales forecasting.\n• **Automated Web Data Scraping**: ScrapeGraphAI aur Python pipelines jo market pricing aur competitor intelligence harvest karte hain.\n\nKya aap existing spreadsheet data ko streamline karna chahte hain ya automated scrapers develop karwana chahte hain?`,
        mode: 'sales',
        showLeadForm: false,
        action: {
          type: 'whatsapp',
          label: 'Scope Data Analytics on WhatsApp',
          url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20want%20to%20discuss%20Data%20Analytics%20and%20Data%20Science%20solutions.'
        },
        sources: ['Data Analytics & Data Science Catalog'],
        suggestedChips: ['📊 Power BI & BI Dashboards', '🐍 Python ML & Forecasting', '💬 Chat on WhatsApp'],
        isOutOfScope: false
      };
    }

    return {
      answer: isVoice
        ? "We build interactive executive dashboards in Power BI, Tableau, and Advanced Excel, paired with Python predictive machine learning models and automated web data scrapers. Are you looking to streamline company reporting or deploy predictive analytics?"
        : `We engineer comprehensive Data Analytics & Data Science Solutions to turn raw business data into actionable automated revenue intelligence:\n\n• **Business Intelligence & Dashboards**: Custom Power BI, Tableau, and Advanced Microsoft Excel automated KPI models and dynamic executive reporting.\n• **Data Engineering & Querying**: Normalized SQL (PostgreSQL, MySQL) data transformation pipelines and automated ETL workflows.\n• **Data Science & Machine Learning**: Python (Pandas, NumPy, Scikit-learn) predictive modeling for customer churn analysis, lifetime value (LTV), and demand/sales forecasting.\n• **Automated Web Data Extraction**: Resilient Python-based scrapers and ScrapeGraphAI pipelines that collect real-time market and competitor intelligence.\n\nAre you looking to centralize your business metrics into an executive dashboard, train predictive models, or automate web data extraction?`,
      mode: 'sales',
      showLeadForm: false,
      action: {
        type: 'whatsapp',
        label: 'Scope Data Analytics on WhatsApp',
        url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20want%20to%20discuss%20Data%20Analytics%20and%20Data%20Science%20solutions.'
      },
      sources: ['Data Analytics & Data Science Catalog'],
      suggestedChips: ['📊 Power BI & BI Dashboards', '🐍 Python ML & Forecasting', '💬 Chat on WhatsApp'],
      isOutOfScope: false
    };
  }

  // 11. Interactive Utility Tools Queries
  if (
    lower.includes('tools') ||
    lower.includes('tool') ||
    lower.includes('utility') ||
    lower.includes('utilities') ||
    lower.includes('webhook tester') ||
    lower.includes('schema generator') ||
    lower.includes('bloat estimator') ||
    lower.includes('roi calculator') ||
    lower.includes('cpt exporter') ||
    lower.includes('sku auditor')
  ) {
    return {
      answer: isVoice
        ? "We have 10 interactive developer tools live on the website at slash tools, including a Webhook Payload Tester, WordPress Database Bloat Estimator, Voice Agent ROI Calculator, and Local Schema Generator. Feel free to explore them anytime!"
        : `We provide 10 free, production-tested developer utility tools directly on the site under **Tools** (/tools/):\n\n1. **Webhook Payload Tester**: Inspect asynchronous webhooks with HMAC SHA-256 validation.\n2. **WordPress Database Bloat Estimator**: Audit wp_options table bloat and download SQL cleanups.\n3. **Custom Post Type Code Exporter**: Generate clean PHP 8.2 CPTs and meta boxes without heavy plugins.\n4. **Voice Agent ROI Calculator**: Calculate monthly savings and payback from Vapi/Twilio voice agents.\n5. **AI Voice Prompt Designer**: Design prompt state machines for conversational phone bots.\n6. **n8n Error Handler Generator**: Build Dead Letter Queue (DLQ) retry workflows for n8n.\n7. **AI Local Schema Generator**: Build connected JSON-LD & LLMs.txt graphs for search crawlers.\n8. **WooCommerce SKU & Catalog Auditor**: Detect catalog metadata collisions and missing SEO tags.\n9. **PSR-4 WordPress Plugin Boilerplate Generator**: Generate modular, strictly typed plugin code.\n10. **LLM SEO Meta Generator**: Preview how AI search engines parse your web pages.\n\nWould you like help testing any specific tool or integrating its output into your project?`,
      mode: 'support',
      showLeadForm: false,
      action: {
        type: 'link',
        label: 'Explore All 10 Developer Tools (/tools/)',
        url: 'https://sheharyarsiraj.com/tools/'
      },
      sources: ['Interactive Developer Utility Tools Hub'],
      suggestedChips: ['🛠️ Launch Webhook Tester', '📊 Launch Voice ROI Calculator', '💬 Chat on WhatsApp'],
      isOutOfScope: false
    };
  }

  // 12. Interactive Mini-Games & Code Arcade Queries
  if (
    lower.includes('arcade') ||
    lower.includes('game') ||
    lower.includes('games') ||
    lower.includes('puzzle') ||
    lower.includes('fighter') ||
    lower.includes('boss fight') ||
    lower.includes('mini-game') ||
    lower.includes('minigame')
  ) {
    return {
      answer: isVoice
        ? "We feature a retro-futuristic Code Arcade live on the site at slash arcade! It features Puzzle Mode and Boss Fighter Mode across JavaScript, Python, React, HTML/CSS, and API JSON. You can jump in and test your coding skills right now!"
        : `Yes! We built a dedicated **Code Arcade** (/arcade/) right into the platform for developers and tech enthusiasts:\n\n• **Puzzle Mode**: Grid navigation coding challenges where you write code to guide characters, collect keys, and bypass hazard lasers.\n• **Boss Fighter Mode**: Algorithmic battle arena where your functions deal direct damage to bosses like the Memory Leaker, Callback Hell Demon, and Deadlock Titan.\n• **5 Language Tracks**: JavaScript (ES6+), Python, React hooks, HTML/CSS layout, and API/JSON parsing.\n\nHead over to **/arcade/** to test your coding skills, earn XP, and conquer all sectors!`,
      mode: 'support',
      showLeadForm: false,
      action: {
        type: 'link',
        label: 'Play Code Arcade (/arcade/)',
        url: 'https://sheharyarsiraj.com/arcade/'
      },
      sources: ['Interactive Code Arcade & Developer Games'],
      suggestedChips: ['🎮 Launch Code Arcade', '⚡ Custom WordPress VIP Build', '💬 Chat on WhatsApp'],
      isOutOfScope: false
    };
  }

  // 13. Search Grounded Knowledge Base Chunks
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
      answer: `${bestChunk.content}\n\nWould you like Sheharyar to audit your existing setup or scope an architecture proposal for this? Connect directly on WhatsApp (+92 313 2080033) for a guaranteed 2-hour SLA response.`,
      mode: 'sales',
      showLeadForm: false,
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

  // General Conversational Response with Contextual Discovery
  return {
    answer: isUrdu
      ? "Ji, main aapki baat samajh gaya! Aap apne project ke specific requirements ya technology stack ke baare mein thora aur batayein — WordPress VIP, sub-600ms AI voice agents, ya n8n automation? Ya aap direct Sheharyar se WhatsApp (+92 313 2080033) par bhi rabta kar sakte hain."
      : "I hear you! Could you share a bit more about what you're aiming to build, your current technical stack, or your target timeline? Sheharyar provides architectural scoping with a guaranteed 2-hour SLA, and you can also connect directly with him on WhatsApp at +92 313 2080033.",
    mode: 'support',
    showLeadForm: false,
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
  history: ChatMessage[] = [],
  isVoice: boolean = false
): Promise<RetrievalResult> {
  const trimmed = userQuery.trim();
  const isUrdu = isRomanUrdu(trimmed);
  const hasIntroduced = history.some((m) => m.sender === 'assistant');

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

  // 2. Direct "I am interested" instant bypass (deterministic response)
  if (isDirectInterestIntent(trimmed)) {
    return synthesizeConsultativeResponse(trimmed, isUrdu, 'sales', hasIntroduced, history, isVoice);
  }

  // 3. Try Live Cloud LLM Generation (Google Gemini Free Tier via REST or /api/chat)
  const liveLlmAnswer = await tryLiveLlmGeneration(trimmed, history, 'support', hasIntroduced, isVoice);
  if (liveLlmAnswer) {
    const isExplicitHire = isDirectInterestIntent(trimmed);
    return {
      answer: liveLlmAnswer,
      mode: isExplicitHire ? 'sales' : 'support',
      showLeadForm: isExplicitHire,
      action: {
        type: 'whatsapp',
        label: 'Message on WhatsApp (+92 313 2080033)',
        url: 'https://wa.me/923132080033'
      },
      sources: ['Google Gemini Live Grounded AI'],
      suggestedChips: DEFAULT_QUICK_CHIPS,
      isOutOfScope: false
    };
  }

  // 4. Local Grounded Conversational Brain with Multi-Turn Memory Context
  return synthesizeConsultativeResponse(trimmed, isUrdu, 'support', hasIntroduced, history, isVoice);
}
