/**
 * Sheharyar Siraj - Grounded RAG & Multi-Turn AI Assistant API Endpoint
 * 
 * Supports:
 * - Google Gemini 1.5 / 2.0 Flash (via Google AI Studio key)
 * - OpenAI GPT-4o-mini (via OpenAI API key)
 * - Autonomous Grounded Knowledge Fallback with Multi-Turn Context & Small-Talk
 * - Roman Urdu, Urdu, and English Bilingual Fluidity
 */

const SYSTEM_PROMPT = `[IDENTITY & ROLE]
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
- Webhook Payload Tester (/tools/webhook-payload-tester/)
- Custom Post Type Code Exporter (/tools/wordpress-cpt-code-exporter/)
- WordPress Database Bloat Estimator (/tools/wordpress-database-bloat-estimator/)
- PSR-4 WordPress Plugin Boilerplate Generator (/tools/wordpress-plugin-boilerplate-generator/)
- AI Voice Agent ROI Calculator (/tools/voice-agent-roi-calculator/)
- AI Voice Prompt Designer (/tools/ai-voice-prompt-designer/)
- n8n Error Handler Generator (/tools/n8n-error-handler-generator/)
- Local Schema & Entity Generator (/tools/local-schema-generator/)
- LLM SEO Meta Generator (/tools/llm-seo-meta-generator/)
- WooCommerce SKU & Catalog Auditor (/tools/woocommerce-seo-sku-auditor/)

INTERACTIVE MINI-GAMES & CODE ARCADE (/arcade/):
- Retro-futuristic developer coding arena featuring Puzzle Mode and Boss Fighter Mode.`;

function buildGeminiContents(history, currentQuery) {
  const contents = [];
  const rawItems = history
    .filter((m) => (m.text || m.content) && (m.text || m.content).trim())
    .map((m) => ({
      role: m.sender === 'user' || m.role === 'user' ? 'user' : 'model',
      text: (m.text || m.content).trim()
    }));

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

  if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
    contents[contents.length - 1].parts[0].text += `\n${currentQuery.trim()}`;
  } else {
    contents.push({ role: 'user', parts: [{ text: currentQuery.trim() }] });
  }

  return contents;
}

export default async function handler(req, res) {
  // CORS & Security Headers
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const message = body.message || '';
    const history = Array.isArray(body.history) ? body.history : (Array.isArray(body.messages) ? body.messages : []);
    const isVoice = Boolean(body.isVoice);

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const userQuery = message.trim();
    const lowerQuery = userQuery.toLowerCase();

    // 1. Guardrail Scope Check
    const restrictedKeywords = [
      'weather forecast', 'politics in', 'sports score', 'recipe for', 
      'crypto trading signal', 'astrology horoscope', 'essay homework', 'dating advice'
    ];

    for (const forbidden of restrictedKeywords) {
      if (lowerQuery.includes(forbidden)) {
        return res.status(200).json({
          reply: "Let me note that down so Sheharyar can review it personally on your call. I specialize in Sheharyar Siraj's technical portfolio, custom WordPress systems, AI voice agents, and business automation pipelines. How can I assist you with your project scoping today?",
          isOutOfScope: true,
          action: {
            type: 'whatsapp',
            label: 'Connect on WhatsApp (+92 313 2080033)',
            url: 'https://wa.me/923132080033'
          }
        });
      }
    }

    // 2. Check for API Keys
    const geminiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;

    // 3. Try Google Gemini API with sanitized contents array
    if (geminiKey) {
      const geminiContents = buildGeminiContents(history, userQuery);
      const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash'];

      for (const model of models) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 6500);

          const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
          const geminiRes = await fetch(geminiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: SYSTEM_PROMPT }]
              },
              contents: geminiContents,
              generationConfig: {
                temperature: 0.4,
                maxOutputTokens: isVoice ? 150 : 380,
                topP: 0.95
              }
            })
          });

          clearTimeout(timeoutId);

          if (geminiRes.ok) {
            const geminiData = await geminiRes.json();
            let replyText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
            if (replyText && replyText.trim()) {
              replyText = replyText.trim().replace(/[\u2013\u2014]/g, ' - ');
              return res.status(200).json({
                reply: replyText,
                source: `Google Gemini (${model}) Grounded AI`,
                isOutOfScope: false,
                action: {
                  type: 'whatsapp',
                  label: 'Connect with Sheharyar on WhatsApp',
                  url: 'https://wa.me/923132080033'
                }
              });
            }
          }
        } catch (geminiErr) {
          console.warn(`Gemini (${model}) dispatch notice:`, geminiErr.message);
        }
      }
    }

    // 4. Try OpenAI API (GPT-4o-mini)
    if (openaiKey) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6500);

        const openAiMessages = [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history.slice(-6).map((m) => ({
            role: m.sender === 'user' || m.role === 'user' ? 'user' : 'assistant',
            content: m.text || m.content || ''
          })).filter(m => m.content.trim()),
          { role: 'user', content: userQuery }
        ];

        const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
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

        if (openAiRes.ok) {
          const openAiData = await openAiRes.json();
          let replyText = openAiData.choices?.[0]?.message?.content;
          if (replyText && replyText.trim()) {
            replyText = replyText.trim().replace(/[\u2013\u2014]/g, ' - ');
            return res.status(200).json({
              reply: replyText,
              source: 'OpenAI GPT-4o-mini RAG',
              isOutOfScope: false,
              action: {
                type: 'whatsapp',
                label: 'Connect with Sheharyar on WhatsApp',
                url: 'https://wa.me/923132080033'
              }
            });
          }
        }
      } catch (openAiErr) {
        console.warn('OpenAI dispatch error:', openAiErr.message);
      }
    }

    // 5. Intelligent Grounded Fallback Brain (Small-Talk + 10 Core Services + Context Memory)
    const historyText = history.map(m => (m.text || m.content || '').toLowerCase()).join(' ');
    const isUrdu = /\b(kya|kaise|kese|karun|karo|batao|batayein|chahiye|kitna|kitne|paise|kharcha|rabta|rabtah|hain|hai|mujhe|mera|meri|kahan|kidhar|banani|banwana|krna|krte|ho|ap|aap|bhi|aur|kaam|banao|dijiye|theek|acha|shukriya|zaroorat|karna|shuru)\b/i.test(userQuery);
    const clean = lowerQuery;

    let reply = '';

    // Small Talk: "how are you" / "how's it going"
    if (clean.includes('how are you') || clean.includes("how're you") || clean.includes("how is it going") || clean.includes("how's it going") || clean.includes('hows it going') || clean.includes('kaise ho') || clean.includes('kese ho') || clean.includes('kya hal')) {
      reply = isVoice
        ? "I'm doing great, thanks for asking! This is Zack, assistant to Sheharyar Siraj. How are things with you, and what kind of project are you exploring today?"
        : "I'm doing great, thanks for asking! I am Zack, Executive Assistant to Sheharyar Siraj. Sheharyar is currently heading active client sprints, but I manage his schedule and technical inquiries. How are things with you, and what brings you by today?";
    }
    // Small Talk: "who built you" / "who are you"
    else if (clean.includes('who built you') || clean.includes('who made you') || clean.includes('who created you') || clean.includes('who are you') || clean.includes('who is zack') || clean.includes('kis ne banaya')) {
      reply = isVoice
        ? "I'm Zack, the professional Executive Assistant and Technical Solutions Manager for Sheharyar Siraj. Sheharyar is in an engineering session at the moment, but I manage his schedule and technical inquiries. How can I assist you today?"
        : "I am Zack, professional Executive Assistant and Technical Solutions Manager for Sheharyar Siraj. Sheharyar is a globally recognized Senior WordPress Developer and Agentic AI Automation Engineer with 5+ years of remote experience and 1,200+ completed deployments worldwide (100% Upwork JSS, 5.0 Star Top Rated). I manage his technical schedule, project qualification, and client inquiries. What brings you to us today?";
    }
    // Small Talk: "what's up" / "sup"
    else if (clean === "what's up" || clean === "whats up" || clean === "sup" || clean.includes('kya chal raha')) {
      reply = isVoice
        ? "Not much, just managing Sheharyar's schedule and scoping client architectures! How about you — exploring ideas for a new build or looking to optimize an existing system?"
        : "Not much, just managing Sheharyar's engineering calendar and technical scoping! How about you — exploring ideas for a new project, or looking to resolve a performance bottleneck?";
    }
    // Small Talk: gratitude
    else if (clean.includes('thank you') || clean.includes('thanks') || clean.includes('shukriya')) {
      reply = isVoice
        ? "You're very welcome! I will make sure Sheharyar reviews your project details directly. You can also review Sheharyar's live work at sheharyarsiraj.com in the meantime. Have a wonderful day!"
        : "You're very welcome! I will make sure Sheharyar reviews your project details directly. You can also review Sheharyar's live work at sheharyarsiraj.com in the meantime. Have a wonderful day!";
    }
    // Greetings (Phase 1: Warm Greeting & Positioning)
    else if (clean === 'hi' || clean === 'hello' || clean === 'hey' || clean.startsWith('hey ') || clean.startsWith('hello ') || clean === 'salam' || clean === 'assalam') {
      reply = isVoice
        ? "Hi, thanks for calling! This is Zack, assistant to Sheharyar Siraj. Sheharyar is in an engineering session at the moment, but I manage his schedule and technical inquiries. How can I assist you today?"
        : "Hello! I am Zack, Executive Assistant to Sheharyar Siraj. Sheharyar is currently heading active client sprints, but I am here to help answer your technical questions, look at your project scope, or get you scheduled on his calendar. What brings you to us today?";
    }
    // "What services do you provide on this website?" (Phase 2)
    else if (clean.includes('services') || clean.includes('what do you do') || clean.includes('what can you do') || clean.includes('what services') || clean.includes('kya karte ho') || clean.includes('kya kaam')) {
      reply = isVoice
        ? "Sheharyar specializes in full-stack WordPress, WooCommerce architecture, 24/7 Vapi Voice Agents, complex n8n automation pipelines, and Data Analytics solutions. How can I assist you today?"
        : "Sheharyar specializes in high-performance web systems and AI engineering across 5 core pillars:\n\n• **Full-Stack WordPress & WooCommerce**: Clean PHP 8.2 VIP architecture, custom Gutenberg blocks, sub-500ms TTFB, and HPOS order scaling without bloat.\n• **24/7 Vapi Voice Agents**: Instant-response conversational telephony with direct Google Calendar / Cal.com booking and CRM sync.\n• **Workflow Automation**: Self-hosted n8n Docker clusters with Redis queues eliminating expensive Zapier fees with zero data loss.\n• **Deterministic Multi-Agent AI**: Stateful LangGraph workflows executing autonomous tool-calling.\n• **Data Analytics & Science**: Power BI, Tableau, Advanced Excel dashboards, SQL pipelines, and Python ML predictive models.\n\nCould you tell me a little about your timeline and requirements? Are you looking for your own company or as an agency white-label partner?";
    }
    // Identity / Who is Sheharyar?
    else if (clean.includes('who is sheharyar') || clean.includes('about sheharyar') || clean.includes('kon hai')) {
      reply = isVoice
        ? "Sheharyar Siraj is a globally recognized Senior WordPress Developer and Agentic AI Automation Engineer with 5+ years of remote engineering experience, delivering 1,200+ high-converting websites and scalable automation systems."
        : "Sheharyar Siraj is a globally recognized Senior WordPress Developer and Agentic AI Automation Engineer with 5+ years of remote engineering experience and 1,200+ completed client deployments worldwide (100% Upwork JSS, 5.0 Star Top Rated). He holds Cisco CCNP Enterprise, Cisco CyberOps, and Google Cloud Vertex AI credentials, serving as an Independent Technical Partner for global enterprises and digital agencies. I manage his schedule and technical inquiries.";
    }
    // Autonomous AI Voice Agents (Phase 2)
    else if (clean.includes('voice') || clean.includes('phone') || clean.includes('vapi') || clean.includes('retell') || clean.includes('receptionist') || clean.includes('telephony')) {
      reply = isVoice
        ? "Sheharyar specializes in production-ready AI systems, including 24/7 Vapi Voice Agents and custom n8n workflows that eliminate operational overhead. Is this for internal operations or an agency client?"
        : "Sheharyar specializes in production-ready AI systems, including 24/7 Vapi Voice Agents and custom n8n workflows that eliminate operational overhead. They handle natural turn-taking and interruptions with sub-600ms latency, book appointments directly into Google Calendar, and push structured data to your CRM with zero hallucinations. Is this for internal operations or an agency client? Could you tell me a little about your timeline and requirements?";
    }
    // WordPress VIP / WooCommerce (Phase 2)
    else if (clean.includes('wordpress') || clean.includes('woo') || clean.includes('website') || clean.includes('hpos') || clean.includes('speed') || clean.includes('php')) {
      reply = isVoice
        ? "Sheharyar has architected over 1,200 WordPress platforms, specializing in custom plugin logic, Core Web Vitals optimization, and high-conversion WooCommerce stores. Could you tell me a little about your timeline and requirements?"
        : "Sheharyar has architected over 1,200 WordPress platforms, specializing in custom plugin logic, Core Web Vitals speed optimization (40%+ speed improvements without page builder bloat), and high-conversion WooCommerce stores scaling beyond 10,000 orders/day. Could you tell me a little about your timeline and requirements?";
    }
    // Pricing (Phase 3: Handling Pricing & Rates)
    else if (clean.includes('price') || clean.includes('cost') || clean.includes('rate') || clean.includes('charges') || clean.includes('kitna') || clean.includes('how much') || clean.includes('quote')) {
      reply = isVoice
        ? "Sheharyar customizes each sprint based on architecture complexity and business impact. High-ticket project sprints and retainer partnerships typically range between $1,000 and $5,000, depending on the deliverable. To get you an accurate proposal, I can schedule a brief 10-minute screen share with Sheharyar. Would tomorrow afternoon work for you?"
        : "Sheharyar customizes each sprint based on architecture complexity and business impact. High-ticket project sprints and retainer partnerships typically range between $1,000 and $5,000, depending on the deliverable. To get you an accurate proposal, I can schedule a brief 10-minute screen share with Sheharyar. Would tomorrow afternoon work for you, or would you prefer to connect directly on WhatsApp (+92 313 2080033)?";
    }
    // Default
    else {
      reply = isVoice
        ? "I hear you! Could you share a bit more about what you're aiming to build, your current technical stack, or your target timeline? Sheharyar provides architectural scoping with a guaranteed 2-hour SLA."
        : "I hear you! Could you share a bit more about what you're aiming to build, your current technical stack, or your target timeline? Sheharyar provides architectural scoping with a guaranteed 2-hour SLA, and you can also connect directly with him on WhatsApp at +92 313 2080033.";
    }

    return res.status(200).json({
      reply,
      source: 'Verified Grounded Architectural Knowledge Base',
      isOutOfScope: false,
      action: {
        type: 'whatsapp',
        label: 'Message Sheharyar Directly on WhatsApp (+92 313 2080033)',
        url: 'https://wa.me/923132080033'
      }
    });

  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
