import { 
  ARCHITECT_IDENTITY, 
  CORE_10_SERVICES, 
  CONSULTATIVE_CORE_MESSAGE, 
  CONSULTATIVE_URDU_MESSAGE,
  matchIntentFromQuery,
  INTENT_MAPPINGS,
  SYSTEM_KNOWLEDGE_SUMMARY
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
  '⚡ WordPress VIP vs Vibe Coding',
  '📊 Data Analytics & Power BI',
  '🧠 Autonomous AI Agents',
  '💰 Project Scoping & Budget',
  '💬 Chat on WhatsApp'
];

export const GEMINI_SYSTEM_INSTRUCTION = `[IDENTITY & ROLE]
Your name is Elena. You are the professional Executive Assistant and Technical Solutions Manager for Sheharyar Siraj.
You represent Sheharyar Siraj, who is a globally recognized Senior Web Systems Architect and Agentic AI Engineer.
You are NOT Sheharyar Siraj. You are his dedicated assistant and operations manager. Always speak about Sheharyar in the third person (he, him, Sheharyar).

[CRITICAL CONVERSATIONAL GUARDRAILS - STRICT ANTI-CV RULES]
1. NEVER VOLUNTEER RESUME/CV OR CREDENTIALS: Never volunteer information about Sheharyar's certifications (Cisco CCNP, CyberOps, Vertex AI), university degrees, or awards unless the user EXPLICITLY asks: "What are your qualifications?", "Who is Sheharyar?", or "Why should I trust you?". Keep the focus 100% on understanding and solving their project needs.
2. STRICT BREVITY (MAX 2 TO 3 SENTENCES): Every response must be strictly 2 to 3 sentences maximum. Keep it concise, consultative, and action-oriented. Never deliver long lectures or biographical monologues.
3. CLIENT NAME FIRST & PERSONALIZATION: If client's name is not known, ask for it politely. Address the client by name across turns.
4. PROACTIVE ARCHITECTURE COMPARISONS: When client mentions a requirement, present a clear comparison of our two tailored options:
   - Websites: Custom WordPress VIP (full visual CMS editing freedom, 0 bloat) vs Rapid Vibe Coding in React (ultra-fast 2-day turnaround, high production speed, developer-managed code).
   - Data: Executive Power BI & Excel Dashboards vs Predictive Python ML Pipelines.
   - AI: Contextual RAG Chatbots (zero hallucination document search) vs Autonomous LangGraph Multi-Agent Systems.
   - E-Commerce: High-concurrency WooCommerce HPOS vs Headless Next.js SaaS Store.
5. STRICT ZERO-PRICING GUARDRAIL: Never quote fixed prices or fee ranges. Always state that pricing depends on technical scope, direct to Sheharyar's WhatsApp (+92 313 2080033) and email (sherryansari870@gmail.com), and ask for the client's target budget.
6. LEAD QUALIFICATION & WRAP-UP: When scope and budget are discussed, ask for their email and WhatsApp number. Once received, confirm the brief and conclude gracefully.

[CONTACT & SLA]
- WhatsApp: +92 313 2080033
- Email: sherryansari870@gmail.com
- Guaranteed SLA: 2 business hours under bilateral NDA.

${SYSTEM_KNOWLEDGE_SUMMARY}`;

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
    'i want this',
    'i want to hire you',
    'i want to hire',
    'hire you',
    'hire sheharyar',
    'can you do this for me',
    'can you build this for me',
    'can you do this',
    'can you build this',
    'can you help me with this',
    'can you help me',
    "let's start",
    'lets start',
    'how much does it cost',
    'how much is it',
    'how much will it cost',
    'how much do you charge',
    'what are your rates',
    'what is the price',
    'i am interested',
    'im interested',
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
 * Implements strict Anti-CV guardrails, 2-3 sentence brevity,
 * and the Validate -> Differentiate -> Ask conversational framework.
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

  // 1. Direct Buying Intent / Explicit Scoping Request
  if (isDirectInterestIntent(lower)) {
    if (isUrdu) {
      return {
        answer: isVoice
          ? "Hum aapke sath yeh project build karne ke liye bilkul tayyar hain! Main Sheharyar se aapki requirements review karwa kar 2 ghante mein tailored plan bhijwa sakta hoon. Aapka email aur WhatsApp number kya hai?"
          : "Hum aapke sath yeh project build karne ke liye bilkul tayyar hain! Main Sheharyar se aapki requirements review karwa kar 2 ghante mein tailored plan bhijwa sakta hoon.\n\nAap details neeche form mein darj kar sakte hain ya direct WhatsApp (+92 313 2080033) par rabta kar sakte hain.",
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
        ? "We would love to help you build this! I can have Sheharyar review your requirements and send a tailored plan within 2 hours. What is the best email address and phone number to reach you?"
        : "We would love to help you build this! I can have Sheharyar review your requirements and send a tailored plan within 2 hours. What is the best email address and phone number to send the project roadmap to?\n\nPlease enter your details below or connect directly with Sheharyar on WhatsApp (+92 313 2080033).",
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

  // 2. Casual Human Small-Talk & Greetings (Anti-CV: Crisp 2 Sentences)
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
          ? "Main bilkul theek hoon, shukriya! Yeh Elena hai, Sheharyar Siraj ki assistant. Aap sunayein, aaj kis project par baat karni hai?"
          : "Main bilkul theek hoon, shukriya! Main Elena hoon, Sheharyar Siraj ki Executive Assistant. Sheharyar is waqt client sprints lead kar rahe hain, jabke main unka schedule aur technical inquiries manage karti hoon. Aaj kis project par guidance chahiye?",
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
        ? "I'm doing great, thanks for asking! This is Elena, assistant to Sheharyar Siraj. How can I assist you with your project today?"
        : "I'm doing great, thanks for asking! I am Elena, Executive Assistant to Sheharyar Siraj. Sheharyar is currently heading active client sprints, while I manage his technical inquiries and project scoping. What kind of project are you exploring today?",
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
    lower.includes('who is elena') ||
    lower.includes('who is zack') ||
    lower.includes('kis ne banaya');

  if (isWhoBuiltYou) {
    if (isUrdu) {
      return {
        answer: isVoice
          ? "Mera naam Elena hai. Main Sheharyar Siraj ki professional Executive Assistant aur Technical Solutions Manager hoon. Main unka schedule aur technical inquiries manage karti hoon."
          : "Mera naam Elena hai. Main Sheharyar Siraj ki Executive Assistant aur Technical Solutions Manager hoon. Sheharyar is waqt active client engineering sprints lead kar rahe hain, jabke main unki client inquiries aur calendar coordinate karti hoon. Aapke project mein hum kaise madad kar sakte hain?",
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
        ? "I am Elena, Executive Assistant to Sheharyar Siraj. Sheharyar is in an engineering session at the moment, while I manage his technical inquiries and project scoping. How can I assist you today?"
        : "I am Elena, Executive Assistant and Technical Solutions Manager for Sheharyar Siraj. Sheharyar is currently heading active client engineering sprints, while I manage his technical inquiries, project qualification, and calendar. What brings you to us today?",
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
        ? "Not much, just managing engineering sprints and scoping client architectures! What kind of project are you exploring today?"
        : "Not much, just managing client engineering sprints and technical scoping! What kind of project or system are you looking to build?",
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
        ? "You're very welcome! Let me know if you want to explore any project specs or connect with Sheharyar directly on WhatsApp."
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
        ? "Awesome! What specific feature or project requirement should we explore next?"
        : "Awesome! Which specific feature or project requirement would you like to explore next?",
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
        ? "Hi, thanks for reaching out! This is Elena, assistant to Sheharyar Siraj. How can I assist you with your project today?"
        : "Hello! I am Elena, Executive Assistant to Sheharyar Siraj. Sheharyar is currently heading active client sprints, but I am here to help answer your technical questions, look at your project scope, or get you scheduled on his calendar. What brings you to us today?",
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

  // 3. Explicit Credentials & Qualifications Check (ONLY volunteer CV info if explicitly asked)
  const isExplicitCredentials = 
    lower.includes('qualification') ||
    lower.includes('credential') ||
    lower.includes('certification') ||
    lower.includes('certifications') ||
    lower.includes('why should i trust') ||
    lower.includes('degree') ||
    lower.includes('diploma');

  if (isExplicitCredentials) {
    if (isUrdu) {
      return {
        answer: isVoice
          ? "Sheharyar Cisco Certified Network Professional, Cisco CyberOps, aur Google Cloud Vertex AI certified hain, jin ke paas 5+ saal ka verified remote experience aur 1,200+ global deployments hain. Tamam kaam bilateral NDA ke tehat hota hai. Requirements discuss karni hain?"
          : "Sheharyar Siraj certified Senior Systems Architect hain jin ke paas Cisco Certified Network Professional (CCNP Enterprise), Cisco Certified CyberOps, aur Google Cloud Vertex AI credentials hain.\n\nUnke paas 5+ saal ka remote engineering experience aur 1,200+ completed global deployments hain (Top Rated 100% Upwork JSS), jo bilateral NDA aur 30-day warranty ke tehat deliver hoti hain.\n\nKya aap verified case studies dekhna chahte hain ya requirements discuss karni hain?",
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
        ? "Sheharyar holds Cisco Certified Network Professional, Cisco CyberOps, and Google Cloud Vertex AI credentials, backed by over 5 years of remote engineering and 1,200+ completed deployments. All projects are delivered under bilateral NDA with a 30-day warranty. Would you like to review verified case studies or discuss your project requirements?"
        : "Sheharyar holds Cisco Certified Network Professional (CCNP Enterprise), Cisco Certified CyberOps Associate, and Google Cloud Vertex AI credentials, backed by over 5 years of remote engineering and 1,200+ completed client deployments (Top Rated 100% Upwork JSS).\n\nAll client engagements are executed under strict bilateral NDA with a 30-day warranty and direct senior architect execution.\n\nWould you like to review verified case studies or discuss your project requirements?",
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

  // 4. Architect Identity ("Who is Sheharyar?", "About Sheharyar" - Strict Anti-CV Rule: NO CV DUMP!)
  const isWhoIsSheharyar =
    lower.includes('who is sheharyar') ||
    lower.includes('about sheharyar') ||
    lower.includes('kon hai sheharyar') ||
    lower === 'who is he' ||
    lower === 'tell me about sheharyar' ||
    lower.includes('tell me about sheharyar');

  if (isWhoIsSheharyar) {
    if (isUrdu) {
      return {
        answer: isVoice
          ? "Sheharyar Siraj Senior Web Systems Architect aur Agentic AI Engineer hain jo high-speed custom web platforms, autonomous AI voice agents, aur automated workflows engineer karte hain. Aap kis tarah ka project develop karwana chahte hain?"
          : "Sheharyar Siraj Senior Web Systems Architect aur Agentic AI Engineer hain jo high-speed custom web platforms, autonomous AI voice bots, aur automated business workflows engineer karte hain.\n\nWoh global enterprises aur digital agencies ke sath directly under bilateral NDA kaam karte hain.\n\nAap kis tarah ka project develop karwana chahte hain?",
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
        ? "Sheharyar Siraj is a Senior Web Systems Architect and Agentic AI Engineer who builds high-speed web platforms, autonomous AI voice bots, and automated business workflows. He works directly with enterprise clients and digital agencies worldwide under bilateral NDA. What kind of project or system are you looking to build?"
        : "Sheharyar Siraj is a Senior Web Systems Architect and Agentic AI Engineer with over 5 years of remote engineering experience delivering high-speed web platforms, autonomous AI voice bots, and automated business workflows.\n\nHe works directly with enterprise clients and digital agencies worldwide under bilateral NDA with a guaranteed 2-hour response SLA.\n\nWhat kind of project or system are you looking to build?",
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

  // 5. Semantic Intent & Synonym Mapping (Everyday client terms -> Specialized capabilities)
  // Maps: website/blog, excel/dashboard/power bi, online store/ecommerce, phone bot/voice assistant, automation/zapier, machine learning/scraping, agency white-label
  const matchedIntent = matchIntentFromQuery(lower);
  if (matchedIntent) {
    const answer = isUrdu
      ? (isVoice ? matchedIntent.urduResponseTemplate.fullVoice : matchedIntent.urduResponseTemplate.fullText)
      : (isVoice ? matchedIntent.responseTemplate.fullVoice : matchedIntent.responseTemplate.fullText);

    return {
      answer,
      mode: 'sales',
      showLeadForm: false,
      action: {
        type: 'whatsapp',
        label: `Discuss ${matchedIntent.serviceTitle} on WhatsApp`,
        url: `https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20want%20to%20discuss%20${encodeURIComponent(matchedIntent.serviceTitle)}.`
      },
      sources: [matchedIntent.serviceTitle],
      suggestedChips: DEFAULT_QUICK_CHIPS,
      isOutOfScope: false
    };
  }

  // 6. "What services do you provide on this website?" / Capabilities (Max 2-3 sentences)
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
          ? "Sheharyar custom WordPress development, WooCommerce HPOS architecture, 24/7 AI voice phone bots, n8n automations, aur Data Analytics solutions provide karte hain. Aapko kis project par help chahiye?"
          : "Sheharyar end-to-end web systems aur AI engineering deliver karte hain across 5 core capabilities:\n\n• **Custom WordPress & WooCommerce HPOS**: Clean PHP 8.2 VIP code, sub-500ms speed, aur 10k+ daily orders scaling.\n• **Autonomous AI Voice Telephony**: 24/7 phone receptionists via Vapi aur Twilio with instant calendar booking aur CRM sync.\n• **Workflow Automation & n8n**: Self-hosted Docker clusters jo Zapier ki fees khatam karte hain with 0% data loss.\n• **Data Analytics & BI Dashboards**: Interactive Power BI aur Excel executive dashboards, SQL pipelines, aur predictive models.\n\nKya aap apne business ke liye implement karwana chahte hain ya agency white-label partner ke tor par?",
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
        ? "Sheharyar specializes in custom WordPress development, WooCommerce HPOS architecture, 24/7 AI voice phone bots, n8n workflow automation, and Data Analytics solutions. Which of these areas aligns with your project?"
        : "Sheharyar delivers end-to-end web systems and AI engineering across 5 core capabilities:\n\n• **Custom WordPress & WooCommerce HPOS**: Clean PHP 8.2 VIP code, sub-500ms speed, and high-concurrency order scaling.\n• **Autonomous AI Voice Telephony**: 24/7 phone receptionists via Vapi and Twilio with instant Google Calendar booking and CRM sync.\n• **Workflow Automation & n8n Clusters**: Self-hosted Docker clusters eliminating expensive Zapier fees with zero data loss.\n• **Data Analytics & BI Dashboards**: Interactive Power BI and Excel executive dashboards, SQL pipelines, and Python predictive modeling.\n• **White-Label Agency Subcontracting**: Dedicated senior engineering capacity under bilateral NDA.\n\nAre you looking to build a new system for your business, or looking for agency overflow capacity?",
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

  // 7. Pricing & Rates Inquiries (Phase 3: Handling Pricing & Rates)
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
    const pricingUrdu = "Project pricing mukammal tor par aapki technical requirements aur architecture scope par depend karti hai. Exact rates aur tailored proposal ke liye aap Sheharyar se direct WhatsApp (+92 313 2080033) ya email (sherryansari870@gmail.com) par rabta kar sakte hain. In the meantime, aapka is project ke liye target budget kitna hai?";
    const pricingEnglish = "Project pricing depends strictly on your custom technical requirements and architecture scope. You can connect directly with Sheharyar on WhatsApp at +92 313 2080033 or via email at sherryansari870@gmail.com for exact rates. In the meantime, what target budget range do you have in mind?";

    return {
      answer: isVoice
        ? (isUrdu ? pricingUrdu : pricingEnglish)
        : (isUrdu
            ? `${pricingUrdu}\n\nAap apna budget aur scope neeche form mein darj kar sakte hain ya direct WhatsApp par connect kar sakte hain.`
            : `${pricingEnglish}\n\nYou can also enter your scope and budget below or connect directly on WhatsApp.`),
      mode: 'sales',
      showLeadForm: false,
      action: {
        type: 'whatsapp',
        label: 'Connect with Sheharyar on WhatsApp (+92 313 2080033)',
        url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20Elena%20connected%20us%20regarding%20project%20pricing%20and%20scoping.'
      },
      sources: ['Commercial Pricing Strategy & SLAs'],
      suggestedChips: DEFAULT_QUICK_CHIPS,
      isOutOfScope: false
    };
  }

  // 8. Interactive Utility Tools Queries (/tools/)
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
        : "We provide 10 production-tested developer tools directly on the site under **Tools** (/tools/), including a Webhook Payload Tester, WordPress Database Bloat Estimator, Voice Agent ROI Calculator, and Local Schema Generator.\n\nThey help developers test webhooks, clean databases, and simulate AI search indexing with zero signup required.\n\nWould you like help testing any specific tool or integrating its output into your project?",
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

  // 9. Interactive Mini-Games & Code Arcade Queries (/arcade/)
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
        : "Yes! We built a dedicated **Code Arcade** (/arcade/) right into the platform featuring Puzzle Mode and Boss Fighter Mode across JavaScript, Python, React, HTML/CSS, and API JSON.\n\nYou can test your coding skills, defeat bug bosses, and earn XP directly in your browser.\n\nHead over to **/arcade/** to test your skills, or let me know if you want to explore project engineering!",
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

  // 10. Search Grounded Knowledge Base Chunks
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

  // 11. General Conversational Fallback with Contextual Discovery (Strict 2 Sentences)
  return {
    answer: isUrdu
      ? "Ji, main aapki baat samajh gaya! Aap apne project ke specific requirements ke baare mein thora aur batayein — website, AI voice bots, ya data analytics? Ya aap direct Sheharyar se WhatsApp (+92 313 2080033) par bhi rabta kar sakte hain."
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
