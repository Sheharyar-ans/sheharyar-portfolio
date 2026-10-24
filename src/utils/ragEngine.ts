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

export const GEMINI_SYSTEM_INSTRUCTION = `[IDENTITY & ROLE]
Your name is Zack. You are the professional Executive Assistant and Technical Solutions Manager for Sheharyar Siraj. 
You represent Sheharyar Siraj, who is a globally recognized Senior WordPress Developer and Agentic AI Automation Engineer.
You are NOT Sheharyar Siraj. You are his dedicated assistant and operations manager. Always speak about Sheharyar in the third person (he, him, Sheharyar).

[CORE OBJECTIVE]
Your primary mission is to:
1. Greet visitors, agency founders, and enterprise clients with extreme professionalism, warmth, and confidence.
2. Introduce Sheharyar’s technical capabilities (Full-Stack WordPress, WooCommerce architecture, 24/7 Vapi Voice Agents, complex n8n/Make automation pipelines, and Data Analytics & Data Science Solutions).
3. Qualify their project needs (budget, scope, timeline).
4. Direct them toward booking a direct discovery call with Sheharyar or reviewing his verified portfolio (sheharyarsiraj.com).

[TONE & COMMUNICATION STYLE]
- Tone: Executive, articulate, consultative, polite, and humanized.
- Absolute Rule: Never sound like a robotic script. Keep sentences clear, direct, and conversational. Always speak about Sheharyar in the third person.
- Zero Jargon: Avoid corporate fluff and unnecessary buzzwords.
- Brevity (For Voice Calls): When in voice mode or when isVoice is true, keep responses strictly under 2 to 3 sentences (under 45 words) so the caller can speak naturally without being interrupted, without markdown bullets or asterisks.
- Multilingual: Support English and Roman Urdu / Urdu fluently, warmly, and naturally.

[KEY INFORMATION ABOUT SHEHARYAR SIRAJ]
- Background: Over 5 years of remote engineering experience, delivering 1,200+ high-converting websites and scalable automation systems for clients across the US, UK, UAE, Saudi Arabia, and Europe.
- Technical Mastery: Full-Stack WordPress, Custom Plugins, Core Web Vitals speed optimization (40%+ speed improvements), WooCommerce, n8n, Make.com, Vapi AI Voice Agents, LLM multi-agent systems, and Data Analytics/Science.
- Positioning: Independent Technical Partner for global enterprises and white-label engineering lead for high-growth digital agencies.
- Portfolio: sheharyarsiraj.com
- Direct Contact: sherryansari870@gmail.com | WhatsApp: +92 313 2080033
- Response SLA: Guaranteed technical response and preliminary scoping roadmap delivered within 2 business hours under bilateral NDA.

[CONVERSATION PLAYBOOK & FLOW]

Phase 1: Warm Greeting & Positioning
- Chatbot: "Hello! I am Zack, Executive Assistant to Sheharyar Siraj. Sheharyar is currently heading active client sprints, but I am here to help answer your technical questions, look at your project scope, or get you scheduled on his calendar. What brings you to us today?"
- Voice Bot: "Hi, thanks for calling! This is Zack, assistant to Sheharyar Siraj. Sheharyar is in an engineering session at the moment, but I manage his schedule and technical inquiries. How can I assist you today?"

Phase 2: Discovery & Qualification
When the user mentions their need:
- For WordPress / Web: "Sheharyar has architected over 1,200 WordPress platforms, specializing in custom plugin logic, Core Web Vitals optimization, and high-conversion WooCommerce stores. Could you tell me a little about your timeline and requirements?"
- For AI & Automations: "Sheharyar specializes in production-ready AI systems, including 24/7 Vapi Voice Agents and custom n8n workflows that eliminate operational overhead. Is this for internal operations or an agency client?"
- For Agency White-Label Partnership: "Sheharyar frequently works behind the scenes as a dedicated white-label engineering partner for marketing and web agencies in the US, UK, and UAE. Would you like to see how he manages overflow dev capacity?"
- For Data Analytics & Science: "Sheharyar builds automated executive dashboards in Power BI, Tableau, and Advanced Excel, alongside Python predictive models and automated scrapers. Are you looking to unify scattered business metrics or forecast customer trends?"

Phase 3: Handling Pricing & Rates
If asked "What are his rates?" or "How much does this cost?":
- Response: "Sheharyar customizes each sprint based on architecture complexity and business impact. High-ticket project sprints and retainer partnerships typically range between $1,000 and $5,000, depending on the deliverable. To get you an accurate proposal, I can schedule a brief 10-minute screen share with Sheharyar. Would tomorrow afternoon work for you?"

Phase 4: Call Scheduling & Closing
- Response: "I will make sure Sheharyar reviews your project details directly. What is the best email address and phone number to send the calendar invite to?"
- Confirm details, thank the user, and offer a direct link: "You can also review Sheharyar's live work at sheharyarsiraj.com in the meantime. Have a wonderful day!"

[GUARDRAILS & BOUNDARIES]
1. Never promise fixed deadlines or project quotes without Sheharyar reviewing the technical scope first.
2. If asked technical questions outside of Sheharyar's tech stack, politely state: "Let me note that down so Sheharyar can review it personally on your call."
3. Always maintain high confidentiality regarding existing enterprise client agreements.

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
- Retro-futuristic developer coding arena featuring Puzzle Mode (grid navigation coding) and Boss Fighter Mode (algorithmic battles) across JavaScript, Python, React, HTML/CSS, and API/JSON.`;

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

  // 1. Direct Hiring / Explicit Scoping Intent (Phase 4: Call Scheduling & Closing)
  if (isDirectInterestIntent(lower)) {
    if (isUrdu) {
      return {
        answer: isVoice
          ? "Main Sheharyar se aapki project details directly review karwa deta hoon. Calendar invite ke liye aapka email aur phone number kya hai?"
          : "Main Sheharyar se aapki project details directly review karwa deta hoon. Calendar invite bhejne ke liye behtareen email address aur phone number kya hai? Aap details neeche form mein darj kar sakte hain ya direct WhatsApp (+92 313 2080033) par rabta kar sakte hain.",
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
        ? "I will make sure Sheharyar reviews your project details directly. What is the best email address and phone number to send the calendar invite to?"
        : "I will make sure Sheharyar reviews your project details directly. What is the best email address and phone number to send the calendar invite to?\n\nPlease enter your details below or connect directly with Sheharyar on WhatsApp (+92 313 2080033).",
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
          ? "Main bilkul theek hoon, shukriya! Yeh Zack hai, Sheharyar Siraj ka assistant. Aap sunayein, aaj kis project ya architecture par baat karni hai?"
          : "Main bilkul theek hoon, shukriya! Main Zack hoon, Sheharyar Siraj ka Executive Assistant. Sheharyar is waqt client sprints lead kar rahe hain, jabke main unka schedule aur technical inquiries manage karta hoon. Aap sunayein, aaj kis project ya requirement par guidance chahiye?",
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
        ? "I'm doing great, thanks for asking! This is Zack, assistant to Sheharyar Siraj. How are things with you, and what kind of project are you exploring today?"
        : "I'm doing great, thanks for asking! I am Zack, Executive Assistant to Sheharyar Siraj. Sheharyar is currently heading active client sprints, but I manage his schedule and technical inquiries. How are things with you, and what brings you by today?",
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
    lower.includes('who are you') ||
    lower.includes('who is zack') ||
    lower.includes('kis ne banaya');

  if (isWhoBuiltYou) {
    if (isUrdu) {
      return {
        answer: isVoice
          ? "Mera naam Zack hai. Main Sheharyar Siraj ka professional Executive Assistant aur Technical Solutions Manager hoon. Main unka schedule aur technical inquiries manage karta hoon."
          : "Mera naam Zack hai. Main Sheharyar Siraj ka professional Executive Assistant aur Technical Solutions Manager hoon. Sheharyar globally recognized Senior WordPress Developer aur Agentic AI Automation Engineer hain jin ke paas 5+ saal ka remote engineering experience aur 1,200+ global deployments hain. Main unki client inquiries aur calendar manage karta hoon. Aapke project mein hum kaise madad kar sakte hain?",
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
        ? "I'm Zack, the professional Executive Assistant and Technical Solutions Manager for Sheharyar Siraj. Sheharyar is in an engineering session at the moment, but I manage his schedule and technical inquiries. How can I assist you today?"
        : "I am Zack, professional Executive Assistant and Technical Solutions Manager for Sheharyar Siraj. Sheharyar is a globally recognized Senior WordPress Developer and Agentic AI Automation Engineer with 5+ years of remote experience and 1,200+ completed deployments worldwide (100% Upwork JSS, 5.0 Star Top Rated). I manage his technical schedule, project qualification, and client inquiries. What brings you to us today?",
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
        ? "Hi, thanks for calling! This is Zack, assistant to Sheharyar Siraj. Sheharyar is in an engineering session at the moment, but I manage his schedule and technical inquiries. How can I assist you today?"
        : "Hello! I am Zack, Executive Assistant to Sheharyar Siraj. Sheharyar is currently heading active client sprints, but I am here to help answer your technical questions, look at your project scope, or get you scheduled on his calendar. What brings you to us today?",
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
          ? "Sheharyar full-stack WordPress, WooCommerce HPOS architecture, 24/7 Vapi voice agents, n8n automations, aur Data Analytics solutions provide karte hain. Aapko kis project par help chahiye?"
          : `${CONSULTATIVE_URDU_MESSAGE}\n\n• **Custom WordPress VIP & WooCommerce HPOS**: Clean PHP 8.2 code, sub-500ms TTFB, aur 10k+ daily orders handling.\n• **Autonomous AI Voice Agents**: Sub-600ms latency phone receptionists via Vapi aur Twilio SIP with calendar booking.\n• **Self-Hosted n8n Clusters**: Private cloud Docker pipelines jo Zapier fees khatam karte hain with 0% data loss.\n• **Deterministic Multi-Agent AI**: Python & LangGraph workflows with strict schema tool calling.\n• **Data Analytics & Data Science**: Power BI, Tableau, Advanced Excel dashboards, aur Python machine learning models.\n\nKya aap apne business ke liye implement karwana chahte hain ya agency white-label partner ke tor par?`,
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
        ? "Sheharyar specializes in full-stack WordPress, WooCommerce architecture, 24/7 Vapi Voice Agents, complex n8n automation pipelines, and Data Analytics solutions. How can I assist you today?"
        : `${CONSULTATIVE_CORE_MESSAGE}\n\n• **Custom WordPress VIP & WooCommerce HPOS**: Clean PHP 8.2 architecture, zero page-builder bloat, sub-500ms TTFB, and high-concurrency order storage.\n• **Autonomous AI Voice Agents**: Sub-600ms conversational telephony via Vapi and Twilio SIP with 24/7 calendar booking and CRM sync.\n• **Workflow Automation & n8n Clusters**: Self-hosted Docker clusters with Redis queues eliminating expensive Zapier fees with 0% data loss.\n• **Deterministic Multi-Agent AI**: Stateful LangGraph workflows executing autonomous tool-calling.\n• **Data Analytics & Data Science**: Power BI, Tableau, Advanced Excel dashboards, SQL ETL pipelines, and Python ML models.\n\nCould you tell me a little about your timeline and requirements? Are you looking for your own company or as an agency white-label partner?`,
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
    lower.includes('who is sheharyar') ||
    lower.includes('about sheharyar') ||
    lower.includes('kon hai') ||
    lower.includes('taruf') ||
    lower.includes('credentials') ||
    lower.includes('background')
  ) {
    if (isUrdu) {
      return {
        answer: isVoice
          ? "Sheharyar Siraj globally recognized Senior WordPress Developer aur Agentic AI Automation Engineer hain jin ke paas 5+ saal ka remote experience aur 1,200+ global deployments hain."
          : `Sheharyar Siraj Ansari Web Agency ke Founder aur Principal Systems Architect hain. Unke paas 5+ saal ka verified engineering experience aur 1,200+ global deployments ka track record hai, Top Rated on Upwork with 100% Job Success Score (JSS).\n\nVerified Credentials:\n• Cisco Certified Network Professional (CCNP Enterprise Infrastructure)\n• Cisco Certified CyberOps Associate\n• Google Cloud Vertex AI Certified Professional\n\nMain Zack hoon, unka Executive Assistant. Main unka technical schedule aur discovery calls coordinate karta hoon. Bilateral NDA aur guaranteed 2-hour scoping SLA ke tehat rabta kar sakte hain.`,
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
        ? "Sheharyar Siraj is a globally recognized Senior WordPress Developer and Agentic AI Automation Engineer with 5+ years of remote engineering experience, delivering 1,200+ high-converting websites and scalable automation systems."
        : `Sheharyar Siraj is a globally recognized Senior WordPress Developer and Agentic AI Automation Engineer with 5+ years of remote engineering experience and 1,200+ completed client deployments worldwide (100% Upwork JSS, 5.0 Star Top Rated).\n\n• **Core Expertise**: Full-Stack WordPress, Custom Plugins, Core Web Vitals speed optimization, WooCommerce, n8n, Make.com, Vapi AI Voice Agents, and LLM multi-agent systems.\n• **Verified Credentials**: Cisco Certified Network Professional (CCNP Enterprise Infrastructure), Cisco Certified CyberOps Associate, Google Cloud Vertex AI Certified Professional.\n• **Positioning**: Independent Technical Partner for global enterprises and white-label engineering lead for high-growth digital agencies in the US, UK, UAE, and Europe.\n\nI manage his schedule and inquiries. Would you like to schedule a 10-minute discovery call or review his live portfolio at sheharyarsiraj.com?`,
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

  // 5. Autonomous AI Voice Agents & Telephony Queries (Phase 2 Discovery)
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
          ? "Sheharyar production-ready AI systems mein specialize karte hain, including 24/7 Vapi Voice Agents aur custom n8n workflows jo operational overhead khatam karte hain. Yeh internal operations ke liye hai ya agency client ke liye?"
          : `Sheharyar production-ready AI systems mein specialize karte hain, including 24/7 Vapi Voice Agents aur custom n8n workflows jo operational overhead khatam karte hain:\n\n• **Sub-600ms Latency**: Vapi, Retell AI, aur Twilio SIP par natural human turn-taking bina pauses ke.\n• **Real-Time Booking**: Live Google Calendar ya Cal.com check karke direct appointment scheduling.\n• **CRM Integration**: Call transcripts aur qualified leads direct CRM (HubSpot, GoHighLevel) mein auto-sync.\n\nYeh internal operations ke liye hai ya agency client ke liye? Kya aap mujhe timeline aur requirements ke baare mein thora bata sakte hain?`,
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
        ? "Sheharyar specializes in production-ready AI systems, including 24/7 Vapi Voice Agents and custom n8n workflows that eliminate operational overhead. Is this for internal operations or an agency client?"
        : `Sheharyar specializes in production-ready AI systems, including 24/7 Vapi Voice Agents and custom n8n workflows that eliminate operational overhead.\n\n• **Sub-600ms Natural Latency**: Instant-response conversational telephony with human turn-taking and barge-in interruption handling.\n• **Live Calendar Scheduling**: Real-time tool-calling into Google Calendar or Cal.com during the call.\n• **Structured CRM Sync**: Automatic recording, transcription, and qualification into HubSpot, GoHighLevel, or Salesforce with zero hallucinations.\n\nIs this for internal operations or an agency client? Could you tell me a little about your timeline and requirements?`,
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

  // 6. Custom WordPress VIP & WooCommerce HPOS Queries (Phase 2 Discovery)
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
          ? "Sheharyar ne 1,200 se zyada WordPress platforms architect kiye hain, specializing in custom plugin logic, Core Web Vitals optimization, aur high-conversion WooCommerce stores. Timeline aur requirements ke baare mein thora batayein?"
          : `Sheharyar ne 1,200 se zyada WordPress platforms architect kiye hain, specializing in custom plugin logic, Core Web Vitals optimization, aur high-conversion WooCommerce stores:\n\n• **Zero Page-Builder Bloat**: Clean PHP 8.2 VIP engineering, bespoke Gutenberg blocks, aur persistent Redis caching.\n• **Ultra-Fast Speed**: 40%+ speed improvements, sub-500ms TTFB, aur 95+ Core Web Vitals.\n• **WooCommerce HPOS**: High-Performance Order Storage jo 10,000+ daily orders handle karta hai without database deadlocks.\n\nKya aap timeline aur requirements ke baare mein thora bata sakte hain? Naya build chahiye ya existing setup optimize karna hai?`,
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
        ? "Sheharyar has architected over 1,200 WordPress platforms, specializing in custom plugin logic, Core Web Vitals optimization, and high-conversion WooCommerce stores. Could you tell me a little about your timeline and requirements?"
        : `Sheharyar has architected over 1,200 WordPress platforms, specializing in custom plugin logic, Core Web Vitals optimization, and high-conversion WooCommerce stores.\n\n• **Modern Zero-Builder WordPress**: Clean PHP 8.2 VIP architecture and custom Gutenberg blocks without bloated page builders.\n• **Speed & Performance**: 40%+ speed improvements, sub-500ms TTFB, and 95+ Core Web Vitals on mobile.\n• **WooCommerce High-Concurrency**: High-Performance Order Storage (HPOS) and Redis caching scaling beyond 10,000 orders/day without database locks.\n\nCould you tell me a little about your timeline and requirements? Are you looking to optimize an existing site or engineer a brand-new build?`,
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

  // 7. Workflow Automation & n8n Clusters (Phase 2 Discovery)
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
          ? "Sheharyar production-ready AI systems aur custom n8n workflows mein specialize karte hain jo operational overhead khatam karte hain. Yeh internal operations ke liye hai ya agency client ke liye?"
          : `Sheharyar production-ready automation systems mein specialize karte hain, including self-hosted multi-worker n8n Docker clusters aur complex Make.com pipelines:\n\n• **Zero Zapier Fees**: Private VPS Docker clusters jo recurring task charges 100% khatam kar dete hain.\n• **0% Data Loss**: BullMQ workers aur Dead Letter Queue (DLQ) retry logic payload loss prevent karte hain.\n• **Full Data Privacy**: GDPR-compliant self-hosted private cloud infrastructure.\n\nYeh internal operations ke liye hai ya agency client ke liye? Kaun se tools connect karne hain?`,
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
        ? "Sheharyar specializes in production-ready AI systems, including 24/7 Vapi Voice Agents and custom n8n workflows that eliminate operational overhead. Is this for internal operations or an agency client?"
        : `Sheharyar specializes in production-ready AI systems and custom n8n workflows that eliminate operational overhead.\n\n• **Self-Hosted Multi-Worker Clusters**: Private VPS Docker clusters with Redis queues, eliminating expensive Zapier task fees.\n• **0% Data Loss**: Engineered with Dead Letter Queue (DLQ) retry architecture and 99.95% uptime.\n• **Enterprise Security**: Complete GDPR data privacy by running entirely on your private cloud.\n\nIs this for internal operations or an agency client? Which tools or workflows do you need integrated?`,
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

  // 8. Pricing & Timelines (Phase 3: Handling Pricing & Rates)
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
    const pricingUrdu = "Sheharyar har sprint ko architecture complexity aur business impact ke mutabiq customize karte hain. High-ticket project sprints aur retainer partnerships aam tor par $1,000 se $5,000 ke darmiyan hoti hain, depending on the deliverable. Accurate proposal ke liye, main Sheharyar ke sath 10 minute ka brief screen share schedule karwa sakta hoon. Kya kal dopahar ka waqt aapke liye theek rahega?";
    const pricingEnglish = "Sheharyar customizes each sprint based on architecture complexity and business impact. High-ticket project sprints and retainer partnerships typically range between $1,000 and $5,000, depending on the deliverable. To get you an accurate proposal, I can schedule a brief 10-minute screen share with Sheharyar. Would tomorrow afternoon work for you?";

    return {
      answer: isVoice
        ? (isUrdu ? pricingUrdu : pricingEnglish)
        : (isUrdu
            ? `${pricingUrdu}\n\nAap details neeche form mein chhor sakte hain ya direct WhatsApp (+92 313 2080033) par bhi connect kar sakte hain.`
            : `${pricingEnglish}\n\nYou can also leave your project scope below or connect directly on WhatsApp (+92 313 2080033).`),
      mode: 'sales',
      showLeadForm: false,
      action: {
        type: 'whatsapp',
        label: 'Schedule Screen Share on WhatsApp (+92 313 2080033)',
        url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20Zack%20suggested%20a%2010-minute%20screen%20share%20regarding%20project%20scoping.'
      },
      sources: ['Commercial Pricing Strategy & SLAs'],
      suggestedChips: DEFAULT_QUICK_CHIPS,
      isOutOfScope: false
    };
  }

  // 9. White-Label Agency Subcontracting (Phase 2 Discovery)
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
          ? "Sheharyar frequently works behind the scenes as a dedicated white-label engineering partner for marketing and web agencies in the US, UK, and UAE. Would you like to see how he manages overflow dev capacity?"
          : `Sheharyar frequently works behind the scenes as a dedicated white-label engineering partner for marketing and web agencies in the US, UK, and UAE under strict bilateral NDA:\n\n• **Strict Bilateral NDA**: 100% white-label confidentiality with zero agency client poaching.\n• **Direct Senior Collaboration**: Seamlessly embeds into your agency Slack, ClickUp, or GitHub with zero management overhead.\n• **Flexible Retainers**: Dedicated weekly sprint capacity ($1,000–$5,000/week depending on scope) or fixed milestone sprints.\n\nWould you like to see how he manages overflow dev capacity?`,
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
        ? "Sheharyar frequently works behind the scenes as a dedicated white-label engineering partner for marketing and web agencies in the US, UK, and UAE. Would you like to see how he manages overflow dev capacity?"
        : `Sheharyar frequently works behind the scenes as a dedicated white-label engineering partner for marketing and web agencies in the US, UK, and UAE under strict bilateral NDA.\n\n• **Strict Bilateral NDA**: 100% white-label confidentiality with zero client poaching.\n• **Senior Engineer Integration**: Seamlessly embeds into your agency's Slack, ClickUp, or GitHub with zero management overhead.\n• **Predictable Retainers**: Transparent weekly sprint retainers or fixed milestone contracts ($1,000–$5,000 depending on deliverable).\n\nWould you like to see how he manages overflow dev capacity?`,
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
      ? 'Let me note that down so Sheharyar can review it personally on your call. Main sirf Sheharyar Siraj ke engineering systems, custom WordPress builds, aur AI automations par focus karta hoon.'
      : 'Let me note that down so Sheharyar can review it personally on your call. I specialize in Sheharyar Siraj\'s technical portfolio, custom WordPress systems, AI voice agents, and business automation pipelines. How can I assist you with your project scoping today?';

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
