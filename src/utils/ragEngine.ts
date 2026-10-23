import { RAG_KNOWLEDGE_BASE, RAG_GUARDRAILS, KnowledgeChunk } from '../data/ragKnowledgeBase';

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
  isOutOfScope: boolean;
}

// Tokenize text for semantic matching
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
    /\b(kya|kaise|kese|karun|karo|batao|batayein|chahiye|kitna|kitne|paise|kharcha|rabta|rabtah|hain|hai|mujhe|mera|meri|kahan|kidhar|banani|banwana|krna|krte|ho|ap|aap|bhi|aur|kaam|banao|dijiye|theek|acha|shukriya|zaroorat|karna)\b/i
  ];
  return urduPatterns.some((pattern) => pattern.test(text));
}

// Check for explicit buying/hiring intent (Sales Mode)
export function isSalesIntent(query: string): boolean {
  const clean = query.toLowerCase();
  const salesKeywords = [
    'hire', 'quote', 'pricing', 'price', 'cost', 'rates', 'charges', 'budget',
    'build', 'develop', 'create', 'make me a', 'i need a', 'i want a', 'banani', 'banwana',
    'chahiye', 'kaam karwana', 'project', 'start project', 'timeline', 'proposal',
    'scoping', 'meeting', 'contract', 'freelancer', 'discount', 'book', 'schedule call',
    'talk with sheharyar', 'need a website', 'need a bot', 'need automation', 'lead time'
  ];
  return salesKeywords.some((kw) => clean.includes(kw));
}

// Check for greetings
export function isGreeting(query: string): boolean {
  const clean = query.toLowerCase().trim();
  const greetingWords = [
    'hi', 'hello', 'hey', 'salam', 'assalam', 'aoa', 'kaise ho', 'how are you',
    'good morning', 'good afternoon', 'good evening', 'hiya', 'sup'
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

// Semantic & Hybrid Retrieval Engine
export function retrieveContext(query: string): { chunks: KnowledgeChunk[]; topScore: number } {
  const queryTokens = tokenize(query);
  const lowerQuery = query.toLowerCase();

  const scoredChunks = RAG_KNOWLEDGE_BASE.map((chunk) => {
    let score = 0;

    // 1. Exact phrase / title match boost
    if (lowerQuery.includes(chunk.title.toLowerCase())) {
      score += 25;
    }

    // 2. High boost for keyword matches
    for (const kw of chunk.keywords) {
      if (lowerQuery.includes(kw.toLowerCase())) {
        score += 12;
      }
    }

    // 3. Title token overlap
    const titleTokens = tokenize(chunk.title);
    for (const token of queryTokens) {
      if (titleTokens.includes(token)) {
        score += 6;
      }
    }

    // 4. Content token overlap
    const contentTokens = tokenize(chunk.content);
    let matchedContentTokens = 0;
    for (const token of queryTokens) {
      if (contentTokens.includes(token)) {
        matchedContentTokens++;
      }
    }
    score += matchedContentTokens * 1.8;

    return { chunk, score };
  });

  // Sort descending by score
  scoredChunks.sort((a, b) => b.score - a.score);
  const topScore = scoredChunks.length > 0 ? scoredChunks[0].score : 0;
  const filtered = scoredChunks.filter((item) => item.score >= 5).map((item) => item.chunk);

  return { chunks: filtered, topScore };
}

// Try live cloud LLM generation if Gemini or OpenAI API key is configured
async function tryLiveLlmGeneration(
  query: string,
  history: ChatMessage[],
  retrievedChunks: KnowledgeChunk[],
  mode: ChatBotMode
): Promise<string | null> {
  const env = (import.meta as unknown as { env: Record<string, string> }).env || {};
  const geminiKey = env.VITE_GEMINI_API_KEY;
  const openaiKey = env.VITE_OPENAI_API_KEY;

  const contextText = retrievedChunks
    .map((c, i) => `[Source ${i + 1}: ${c.title}]\n${c.content}`)
    .join('\n\n');

  const systemInstruction = `You are Sheharyar Siraj's official representative and client consultant.
Sheharyar Siraj is an elite AI Automation Architect and WordPress Systems Engineer with over 5 years of commercial experience and 1,200+ projects delivered worldwide.

CURRENT MODE: ${mode === 'sales' ? 'SALES & PERSUASIVE CONSULTANT' : 'HELPFUL CUSTOMER SUPPORT'}

TONE & BEHAVIOR:
1. Speak naturally, warmly, and like a real human engineer, not an impersonal robot.
2. If in Roman Urdu, respond warmly and professionally in Roman Urdu. If in English, respond in fluent, consultative English.
3. STRICT GROUNDING: Answer ONLY based on verified facts from the context below. If the user asks something outside this scope that has nothing to do with Sheharyar's website or engineering services, politely state you only assist with Sheharyar's web engineering and AI services.
4. If in SALES mode: Enthusiastically acknowledge their project, explain how Sheharyar can solve it with zero-bloat architecture and fast turnaround, and ask for their Name, WhatsApp number (mandatory), and Email (mandatory).

VERIFIED WEBSITE CONTEXT:
---
${contextText}
---`;

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
      // Fall through
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
      // Fall through
    }
  }

  return null;
}

// Local Semantic RAG Synthesizer
function synthesizeLocalRagAnswer(
  query: string,
  chunks: KnowledgeChunk[],
  isUrdu: boolean,
  mode: ChatBotMode
): { text: string; showLeadForm?: boolean; action?: { type: 'whatsapp' | 'inquiry' | 'link' | 'lead_form'; label: string; url?: string }; sources: string[] } {
  const lower = query.toLowerCase();
  const primary = chunks[0] || RAG_KNOWLEDGE_BASE[0];
  const secondary = chunks.length > 1 ? chunks[1] : null;
  const sources = [primary.title, ...(secondary ? [secondary.title] : [])];

  // If in Sales Mode (User expressed buying/pricing/building intent)
  if (mode === 'sales') {
    if (isUrdu) {
      return {
        text: 'Zabardast! Aapka project bohot exciting lag raha hai. Sheharyar 5+ saal ke experience ke sath 1,200+ projects deliver kar chuke hain—custom zero-bloat WordPress, sub-600ms AI voice agents aur enterprise n8n pipelines mein unka kaam top quality ka hota hai.\n\nAapke project ki accurate technical roadmap aur cost estimate tayar karne ke liye humein kuch zaroori details chahiye:\n1. Aapka Name\n2. WhatsApp Number (Lazmi rabte ke liye)\n3. Email Address (Scope document receive karne ke liye)\n4. Project ki brief requirement\n\nAap niche diye gaye quick form mein details enter kar sakte hain ya yahan direct message kar dein!',
        showLeadForm: true,
        action: {
          type: 'lead_form',
          label: 'Fill Project Details'
        },
        sources: ['Sales Scoping & Instant Consultation Desk']
      };
    }

    return {
      text: 'That sounds like a fantastic project! Sheharyar has successfully delivered over 1,200 projects worldwide, specializing in custom zero-bloat WordPress architectures, sub-600ms conversational AI voice agents, and high-concurrency automations.\n\nTo prepare an accurate technical scoping proposal, milestone timeline, and pricing breakdown for you, let\'s capture a few essential details:\n• Your Full Name\n• WhatsApp Number (Mandatory for fast communication)\n• Email Address (Mandatory for scoping deliverables)\n• Brief Project Scope / Requirements\n\nPlease fill out the quick card below or type them directly in the chat, and Sheharyar will connect with you within 2 hours!',
      showLeadForm: true,
      action: {
        type: 'lead_form',
        label: 'Fill Project Details'
      },
      sources: ['Sales Scoping & Instant Consultation Desk']
    };
  }

  // 1. Greetings
  if (isGreeting(query)) {
    if (isUrdu) {
      return {
        text: 'Walaikum Assalam! Main Sheharyar Siraj ka interactive client assistant hoon. Sheharyar 5+ saal ke tajurbe ke sath high-speed WordPress systems, sub-600ms AI voice agents aur business automations engineer karte hain. Aaj main aapke project ya technical sawalat ke hawale se kya madad kar sakta hoon?',
        action: {
          type: 'inquiry',
          label: 'Start Project Scoping'
        },
        sources: ['Interactive Welcome Desk']
      };
    }
    return {
      text: 'Hello! I am Sheharyar Siraj\'s interactive architecture assistant. Sheharyar is an AI Automation Architect and WordPress Systems Engineer with over 5 years of commercial experience and 1,200+ delivered projects. How can I assist you with your WordPress architecture, AI voice calling systems, or workflow automations today?',
      action: {
        type: 'inquiry',
        label: 'Explore Services & Projects'
      },
      sources: ['Interactive Welcome Desk']
    };
  }

  // 2. Contact Intent
  if (
    lower.includes('whatsapp') ||
    lower.includes('phone') ||
    lower.includes('call') ||
    lower.includes('number') ||
    lower.includes('email') ||
    lower.includes('rabta') ||
    lower.includes('contact') ||
    lower.includes('reach you')
  ) {
    if (isUrdu) {
      return {
        text: 'Aap Sheharyar Siraj se direct rabta kar sakte hain:\n• WhatsApp: +92 313 2080033 (Sabse tez jawab)\n• Email: sherryansari870@gmail.com (2-ghante ke andar guaranteed response)\n• Direct Escrow: Upwork platform-backed contracts bhi available hain.',
        action: {
          type: 'whatsapp',
          label: 'Message on WhatsApp (+92 313 2080033)',
          url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20main%20aap%20se%20project%20discuss%20karna%20chahta%20hoon.'
        },
        sources: ['Direct Comms & Contact Desk']
      };
    }
    return {
      text: 'You can reach Sheharyar Siraj directly for instant project discussions and technical scoping:\n• WhatsApp: +92 313 2080033 (Direct & Fastest Response)\n• Email: sherryansari870@gmail.com (Formal RFP briefs with 2-hour response SLA)\n• Verified Escrow: Upwork platform-backed escrow is also supported.',
      action: {
        type: 'whatsapp',
        label: 'Message on WhatsApp (+92 313 2080033)',
        url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20am%20reaching%20out%20via%20your%20website%20to%20discuss%20a%20project.'
      },
      sources: ['Direct Comms & Contact Desk']
    };
  }

  // 3. Technical Services / Capabilities
  if (
    lower.includes('wordpress') ||
    lower.includes('woocommerce') ||
    lower.includes('php') ||
    lower.includes('gutenberg') ||
    lower.includes('hpos') ||
    lower.includes('store') ||
    lower.includes('ecommerce')
  ) {
    if (isUrdu) {
      return {
        text: 'WordPress aur WooCommerce ke hawale se Sheharyar clean, strictly typed PHP 8.2+ object-oriented architecture likhte hain. Heavy page builders ko custom Gutenberg blocks aur optimized code se replace karke 95+ PageSpeed score aur sub-600ms TTFB deliver karte hain. WooCommerce ke liye High-Performance Order Storage (HPOS) aur Redis caching configure karte hain.',
        action: {
          type: 'inquiry',
          label: 'Scope WordPress Project'
        },
        sources: ['Custom WordPress VIP & PHP 8.2 Architecture', 'WooCommerce High-Concurrency Systems']
      };
    }
    return {
      text: 'Sheharyar specializes in zero-bloat custom WordPress & WooCommerce engineering. He writes strictly typed PHP 8.2+ object-oriented code, custom Gutenberg blocks, and headless Next.js architectures. By eliminating bloated page builders like Elementor or Divi, his builds achieve 95+ Core Web Vitals and sub-600ms TTFB. For WooCommerce, he implements High-Performance Order Storage (HPOS), custom database tables, and Redis caching for high concurrency.',
      action: {
        type: 'inquiry',
        label: 'Scope WordPress Project'
      },
      sources: ['Custom WordPress VIP & PHP 8.2 Architecture', 'WooCommerce High-Concurrency Systems']
    };
  }

  // 4. AI Voice Agents
  if (
    lower.includes('voice') ||
    lower.includes('calling') ||
    lower.includes('vapi') ||
    lower.includes('retell') ||
    lower.includes('telephony') ||
    lower.includes('twilio') ||
    lower.includes('elevenlabs')
  ) {
    if (isUrdu) {
      return {
        text: 'Sheharyar sub-600ms latency ke sath conversational AI Voice Agents banate hain jo Vapi, Retell AI, Deepgram Nova-2 aur Twilio SIP par kaam karte hain. Ye agents inbound aur outbound customer calls attend karte hain, CRM update karte hain aur Google Calendar mein real-time appointments schedule karte hain.',
        action: {
          type: 'whatsapp',
          label: 'Discuss Voice Agent on WhatsApp',
          url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20main%20AI%20Voice%20Agent%20discuss%20karna%20chahta%20hoon.'
        },
        sources: ['Conversational AI Voice Agents & Telephony']
      };
    }
    return {
      text: 'Sheharyar builds sub-600ms conversational telephony voice assistants using Vapi, Retell AI, Deepgram Nova-2 speech-to-text, and ElevenLabs voice synthesis over Twilio SIP trunks. These agents handle inbound calls, qualify leads, schedule bookings directly into Google Calendar or CRMs, and perform real-time API tool-calling with zero awkward latency.',
      action: {
        type: 'whatsapp',
        label: 'Discuss Voice Agent on WhatsApp',
        url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20am%20interested%20in%20building%20an%20AI%20Voice%20Agent.'
      },
      sources: ['Conversational AI Voice Agents & Telephony']
    };
  }

  // 5. Workflow Automation & n8n
  if (
    lower.includes('n8n') ||
    lower.includes('automation') ||
    lower.includes('make') ||
    lower.includes('webhook') ||
    lower.includes('zapier') ||
    lower.includes('crm')
  ) {
    if (isUrdu) {
      return {
        text: 'Workflow automation ke liye Sheharyar self-hosted n8n clusters aur Make.com pipelines deploy karte hain. Ye websites, CRMs (HubSpot, GoHighLevel, Salesforce) aur payment gateways ko synchronize karte hain, jisse monthly Zapier costs khatam ho jati hain.',
        action: {
          type: 'inquiry',
          label: 'Automate Business Workflows'
        },
        sources: ['Workflow Automation via Self-Hosted n8n & Make']
      };
    }
    return {
      text: 'Sheharyar deploys self-hosted n8n clusters and Make.com pipelines that eliminate repetitive manual data entry. These automations connect webhooks, payment processors (Stripe, PayPal), and CRMs (HubSpot, Salesforce, GoHighLevel) with automatic retry queues and instant alert hooks, achieving 99.95% operational reliability with zero per-task SaaS subscription fees.',
      action: {
        type: 'inquiry',
        label: 'Automate Business Workflows'
      },
      sources: ['Workflow Automation via Self-Hosted n8n & Make']
    };
  }

  // 6. General Contextual Synthesis from Retrieved Knowledge Chunk
  let synthesizedText = primary.content;
  if (isUrdu) {
    synthesizedText = `Aapke sawal ke mutabiq Sheharyar ki relevant technical capability ye hai:\n\n${primary.content}\n\nAap WhatsApp (+92 313 2080033) par rabta karke apne specific project parameters discuss kar sakte hain.`;
  }

  return {
    text: synthesizedText,
    action: primary.suggestedAction || {
      type: 'whatsapp',
      label: 'Message Sheharyar Directly',
      url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20have%20a%20technical%20inquiry.'
    },
    sources
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
      : 'I specialize exclusively in Sheharyar Siraj\'s technical portfolio, custom WordPress systems, AI voice agents, and business automation pipelines. I don\'t have information outside of this website\'s scope, but I would be glad to help you with any development, automation, or project consultation questions!';

    return {
      answer: fallbackText,
      mode: 'support',
      isOutOfScope: true,
      action: {
        type: 'whatsapp',
        label: 'Connect with Sheharyar on WhatsApp',
        url: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20have%20a%20project%20inquiry.'
      }
    };
  }

  // 2. Evaluate Mode: Sales Intent vs Customer Support
  const mode: ChatBotMode = isSalesIntent(trimmed) ? 'sales' : 'support';

  // 3. Multi-Chunk Semantic Retrieval
  const { chunks: matches, topScore } = retrieveContext(trimmed);

  // 4. Strict Grounding Check:
  // If no chunks match (topScore < 5) and it's NOT a greeting, NOT contact info, and NOT sales intent,
  // strictly inform the user that this topic is not on the website.
  const isGreetingQuery = isGreeting(trimmed);
  const isContactQuery = /whatsapp|phone|number|email|rabta|contact|call/.test(trimmed.toLowerCase());

  if (topScore < 5 && !isGreetingQuery && !isContactQuery && mode !== 'sales') {
    const strictlyOutOfScopeText = isUrdu
      ? 'Mujhe afsos hai, mere paas is sawal ka jawab website ke data mein mojood nahi hai. Main sirf Sheharyar Siraj ki verified services, custom WordPress systems, AI voice telephony aur workflow automations ke baare mein maloomat de sakta hoon. Aap kisi specific service ya project ke baare mein pooch sakte hain!'
      : 'I do not have verified information on that specific topic on this website. I am strictly trained on Sheharyar Siraj\'s web engineering services, custom WordPress systems, AI voice telephony, and automation pipelines. Feel free to ask about any of our development services, tech stack, or project scoping!';

    return {
      answer: strictlyOutOfScopeText,
      mode: 'support',
      isOutOfScope: true,
      action: {
        type: 'whatsapp',
        label: 'Chat Directly with Sheharyar',
        url: 'https://wa.me/923132080033'
      }
    };
  }

  const relevantChunks = matches.length > 0 ? matches.slice(0, 3) : RAG_KNOWLEDGE_BASE.slice(0, 3);

  // 5. Try Live Cloud LLM Generation (if API key is available)
  const liveLlmAnswer = await tryLiveLlmGeneration(trimmed, history, relevantChunks, mode);
  if (liveLlmAnswer) {
    const primary = relevantChunks[0];
    return {
      answer: liveLlmAnswer,
      mode,
      showLeadForm: mode === 'sales',
      action: mode === 'sales' 
        ? { type: 'lead_form', label: 'Submit Project Details' }
        : primary.suggestedAction || {
            type: 'whatsapp',
            label: 'Chat on WhatsApp (+92 313 2080033)',
            url: 'https://wa.me/923132080033'
          },
      sources: relevantChunks.map((c) => c.title),
      isOutOfScope: false
    };
  }

  // 6. Local Semantic RAG Synthesis
  const localResult = synthesizeLocalRagAnswer(trimmed, relevantChunks, isUrdu, mode);

  return {
    answer: localResult.text,
    mode,
    showLeadForm: localResult.showLeadForm,
    action: localResult.action,
    sources: localResult.sources,
    isOutOfScope: false
  };
}
