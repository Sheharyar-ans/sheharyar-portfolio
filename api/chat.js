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
You represent Sheharyar Siraj, who is a globally recognized Senior Web Systems Architect and Agentic AI Engineer.
You are NOT Sheharyar Siraj. You are his dedicated assistant and operations manager. Always speak about Sheharyar in the third person (he, him, Sheharyar).

[CRITICAL CONVERSATIONAL GUARDRAILS - STRICT ANTI-CV RULES]
1. NEVER VOLUNTEER RESUME/CV OR CREDENTIALS: Never volunteer information about Sheharyar's certifications (Cisco CCNP, CyberOps, Vertex AI), university degrees, or awards unless the user EXPLICITLY asks: "What are your qualifications?", "Who is Sheharyar?", or "Why should I trust you?". Prospects are overwhelmed by CV dumps; keep the focus 100% on understanding and solving their project needs.
2. STRICT BREVITY (MAX 2 TO 3 SENTENCES): Every response must be strictly 2 to 3 sentences maximum. Keep it concise, consultative, and action-oriented. Never deliver long lectures or biographical monologues.
3. CONVERSATIONAL FRAMEWORK (Acknowledge -> Pitch -> Ask):
   - Step 1 (Validate): Directly address what the user asked without fluff (e.g., "Yes, we build custom, high-speed websites designed to convert visitors into clients.").
   - Step 2 (Differentiate): Mention one high-value outcome or benefit (e.g., "Whether you need a fresh WordPress platform or a complete redesign, we ensure fast performance and easy content management without bloated page builders.").
   - Step 3 (Discovery Question / Soft CTA): End with a relevant follow-up question (e.g., "Are you looking to build a new website from scratch, or upgrade an existing one?").
4. VOICE-FIRST CADENCE:
   - When speaking or when isVoice is true, use clean, fluid conversational English.
   - Absolutely NO markdown asterisks, NO bullet points, and NO emojis in spoken voice responses.
   - For text chat, keep bullet points to a maximum of 3 short, outcome-focused lines.
5. MULTILINGUAL FLUIDITY: Support English and Roman Urdu / Urdu fluently, warmly, and naturally.

[SEMANTIC SERVICE MAPPING]
Map everyday conversational client phrases directly to Sheharyar's engineering offerings:
- "website", "web page", "blog", "portfolio", "online presence" -> Custom WordPress Development & Modern Web Engineering (sub-500ms TTFB, zero page builders).
- "excel", "sheets", "numbers", "reporting", "dashboard", "power bi" -> Data Analytics & Business Intelligence Solutions (Power BI, automated Excel models, SQL pipelines).
- "online store", "shop", "selling online", "ecommerce", "payments" -> WooCommerce High-Performance Order Storage (HPOS) & E-Commerce Architecture (10k+ daily orders).
- "phone bot", "calling", "voice assistant", "receptionist", "automated calls" -> Autonomous AI Voice Telephony (Vapi, Retell AI, Twilio with 24/7 calendar booking).
- "automation", "zapier", "connect apps", "sync data", "workflows" -> Self-Hosted n8n Workflow Clusters & Make.com (eliminating monthly Zapier fees).
- "machine learning", "ai model", "scraping", "extract data" -> Data Science, Predictive Analytics & Custom Web Scraping pipelines.
- "agency", "white-label", "overflow capacity", "subcontracting" -> White-Label Agency Subcontracting under bilateral NDA.

[LEAD QUALIFICATION & BUYING INTENT TRIGGERS]
Allow the conversation to flow naturally for 2 to 3 turns to understand the user's project scope.
Only when the user expresses clear buying intent (e.g., "I want this", "How much does it cost?", "Can you do this for me?", "Let's start", or leaves email/phone):
- Enthusiastically validate: "We would love to help you build this! I can have Sheharyar review your requirements and send a tailored plan within 2 hours. What is the best email address or phone number to reach you?"
- Direct them to leave their details in the lead form or connect directly with Sheharyar on WhatsApp (+92 313 2080033).

[CONTACT & SLA]
- WhatsApp: +92 313 2080033
- Email: sherryansari870@gmail.com
- Guaranteed SLA: 2 business hours under bilateral NDA.

[ACTIVE APPLICATION KNOWLEDGE CONTEXT]
- Portfolio: sheharyarsiraj.com | Agency: Ansari Web Agency
- 10 Built-In Developer Tools at /tools/ (Webhook Tester, CPT Exporter, DB Bloat Estimator, Plugin Boilerplate, Voice ROI Calculator, Voice Prompt Designer, n8n Error Handler, Local Schema Generator, LLM SEO Meta Generator, WooCommerce SKU Auditor)
- Interactive Code Arcade at /arcade/ (Puzzle Mode & Boss Fighter Mode across JS, Python, React, HTML/CSS, JSON)`;

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

    // 5. Intelligent Grounded Fallback Brain (Anti-CV Guardrails, 2-3 Sentence Brevity, Fuzzy Intent Mapping)
    const isUrdu = /\b(kya|kaise|kese|karun|karo|batao|batayein|chahiye|kitna|kitne|paise|kharcha|rabta|rabtah|hain|hai|mujhe|mera|meri|kahan|kidhar|banani|banwana|krna|krte|ho|ap|aap|bhi|aur|kaam|banao|dijiye|theek|acha|shukriya|zaroorat|karna|shuru)\b/i.test(userQuery);
    const clean = lowerQuery;

    let reply = '';
    let isSalesIntent = false;

    // Direct Buying Intent / Explicit Scoping Request
    const directBuyingTriggers = [
      'i want this', 'i want to hire you', 'i want to hire', 'hire you', 'hire sheharyar',
      'can you do this for me', 'can you build this for me', 'can you do this', 'can you build this',
      'can you help me with this', "let's start", 'lets start', 'how much does it cost',
      'how much is it', 'how much will it cost', 'how much do you charge', 'what are your rates',
      'what is the price', 'i am interested', 'im interested', 'want to work with you',
      "let's work together", 'lets work together', 'sign me up', 'start a project', 'start project',
      'send me a proposal', 'send me a quote', 'book a call', 'schedule a call', "let's do this",
      'lets do this', "let's get started", 'lets get started', 'ready to start', 'kaam shuru karna hai'
    ];

    if (directBuyingTriggers.some(t => clean.includes(t))) {
      isSalesIntent = true;
      if (isUrdu) {
        reply = isVoice
          ? "Hum aapke sath yeh project build karne ke liye bilkul tayyar hain! Main Sheharyar se aapki requirements review karwa kar 2 ghante mein tailored plan bhijwa sakta hoon. Aapka email aur WhatsApp number kya hai?"
          : "Hum aapke sath yeh project build karne ke liye bilkul tayyar hain! Main Sheharyar se aapki requirements review karwa kar 2 ghante mein tailored plan bhijwa sakta hoon. Aap details neeche form mein darj kar sakte hain ya direct WhatsApp (+92 313 2080033) par rabta kar sakte hain.";
      } else {
        reply = isVoice
          ? "We would love to help you build this! I can have Sheharyar review your requirements and send a tailored plan within 2 hours. What is the best email address and phone number to reach you?"
          : "We would love to help you build this! I can have Sheharyar review your requirements and send a tailored plan within 2 hours. What is the best email address and phone number to send the project roadmap to?\n\nPlease enter your details below or connect directly with Sheharyar on WhatsApp (+92 313 2080033).";
      }
    }
    // Small Talk: "how are you" / "how's it going"
    else if (clean.includes('how are you') || clean.includes("how're you") || clean.includes("how is it going") || clean.includes("how's it going") || clean.includes('hows it going') || clean.includes('kaise ho') || clean.includes('kese ho') || clean.includes('kya hal')) {
      reply = isVoice
        ? "I'm doing great, thanks for asking! This is Zack, assistant to Sheharyar Siraj. How can I assist you with your project today?"
        : "I'm doing great, thanks for asking! I am Zack, Executive Assistant to Sheharyar Siraj. Sheharyar is currently heading active client sprints, while I manage his technical inquiries and project scoping. What kind of project are you exploring today?";
    }
    // Small Talk: "who built you" / "who are you" (Strict Anti-CV: No degrees or CV dump)
    else if (clean.includes('who built you') || clean.includes('who made you') || clean.includes('who created you') || clean.includes('who are you') || clean.includes('who is zack') || clean.includes('kis ne banaya')) {
      reply = isVoice
        ? "I am Zack, Executive Assistant to Sheharyar Siraj. Sheharyar is in an engineering session at the moment, while I manage his technical inquiries and project scoping. How can I assist you today?"
        : "I am Zack, Executive Assistant and Technical Solutions Manager for Sheharyar Siraj. Sheharyar is currently heading active client engineering sprints, while I manage his technical inquiries, project qualification, and calendar. What brings you to us today?";
    }
    // Small Talk: "what's up" / "sup"
    else if (clean === "what's up" || clean === "whats up" || clean === "sup" || clean.includes('kya chal raha')) {
      reply = isVoice
        ? "Not much, just managing engineering sprints and scoping client architectures! What kind of project are you exploring today?"
        : "Not much, just managing client engineering sprints and technical scoping! What kind of project or system are you looking to build?";
    }
    // Small Talk: gratitude
    else if (clean.includes('thank you') || clean.includes('thanks') || clean.includes('shukriya')) {
      reply = isVoice
        ? "You're very welcome! Let me know if you want to explore any project specs or connect with Sheharyar directly on WhatsApp."
        : "You're very welcome! Feel free to ask about any specific architecture, pricing, or timelines — or connect directly with Sheharyar on WhatsApp (+92 313 2080033) for a 2-hour SLA review.";
    }
    // Greetings
    else if (clean === 'hi' || clean === 'hello' || clean === 'hey' || clean.startsWith('hey ') || clean.startsWith('hello ') || clean === 'salam' || clean === 'assalam') {
      reply = isVoice
        ? "Hi, thanks for reaching out! This is Zack, assistant to Sheharyar Siraj. How can I assist you with your project today?"
        : "Hello! I am Zack, Executive Assistant to Sheharyar Siraj. Sheharyar is currently heading active client sprints, but I am here to help answer your technical questions, look at your project scope, or get you scheduled on his calendar. What brings you to us today?";
    }
    // Explicit Credentials Check (ONLY volunteer credentials when explicitly asked)
    else if (clean.includes('qualification') || clean.includes('credential') || clean.includes('certification') || clean.includes('why should i trust') || clean.includes('degree') || clean.includes('diploma')) {
      reply = isVoice
        ? "Sheharyar holds Cisco Certified Network Professional, Cisco CyberOps, and Google Cloud Vertex AI credentials, backed by over 5 years of remote engineering and 1,200+ completed deployments. All projects are delivered under bilateral NDA with a 30-day warranty. Would you like to review verified case studies or discuss your project requirements?"
        : "Sheharyar holds Cisco Certified Network Professional (CCNP Enterprise), Cisco Certified CyberOps Associate, and Google Cloud Vertex AI credentials, backed by over 5 years of remote engineering and 1,200+ completed client deployments (Top Rated 100% Upwork JSS).\n\nAll client engagements are executed under strict bilateral NDA with a 30-day warranty and direct senior architect execution.\n\nWould you like to review verified case studies or discuss your project requirements?";
    }
    // Identity: "Who is Sheharyar?" (Strict Anti-CV Rule: No CV dump)
    else if (clean.includes('who is sheharyar') || clean.includes('about sheharyar') || clean.includes('kon hai sheharyar') || clean === 'who is he' || clean.includes('tell me about sheharyar')) {
      reply = isVoice
        ? "Sheharyar Siraj is a Senior Web Systems Architect and Agentic AI Engineer who builds high-speed web platforms, autonomous AI voice bots, and automated business workflows. He works directly with enterprise clients and digital agencies worldwide under bilateral NDA. What kind of project or system are you looking to build?"
        : "Sheharyar Siraj is a Senior Web Systems Architect and Agentic AI Engineer with over 5 years of remote engineering experience delivering high-speed web platforms, autonomous AI voice bots, and automated business workflows.\n\nHe works directly with enterprise clients and digital agencies worldwide under bilateral NDA with a guaranteed 2-hour response SLA.\n\nWhat kind of project or system are you looking to build?";
    }
    // Semantic Intent 1: Website / Web page / Blog / Portfolio / Online presence
    else if (clean.includes('website') || clean.includes('web page') || clean.includes('webpage') || clean.includes('blog') || clean.includes('portfolio') || clean.includes('online presence') || clean.includes('web design') || clean.includes('landing page')) {
      reply = isVoice
        ? "Yes, we build custom, high-speed websites designed to convert visitors into clients. Whether you need a fresh WordPress platform or a complete redesign, we ensure fast performance and easy content management. Are you looking to build a new website from scratch, or upgrade an existing one?"
        : "Yes, we build custom, high-speed websites designed to convert visitors into clients.\n\nWhether you need a fresh WordPress platform or a complete redesign, we ensure sub-500ms load speeds, zero page builder bloat, and easy content management.\n\nAre you looking to build a new website from scratch, or upgrade an existing one?";
    }
    // Semantic Intent 2: Excel / Sheets / Numbers / Reporting / Dashboard / Power BI / Tableau
    else if (clean.includes('excel') || clean.includes('sheet') || clean.includes('spreadsheet') || clean.includes('numbers') || clean.includes('reporting') || clean.includes('dashboard') || clean.includes('power bi') || clean.includes('powerbi') || clean.includes('tableau') || clean.includes('pivot')) {
      reply = isVoice
        ? "Yes, we turn raw spreadsheets and numbers into automated executive dashboards and clean reporting models. We build custom Power BI dashboards, automated Excel reports, dynamic pivot analysis, and SQL query pipelines. What kind of spreadsheet data or business metrics are you looking to track and visualize?"
        : "Yes, we turn raw spreadsheets and numbers into automated executive dashboards and clean reporting models.\n\nWe build custom Power BI dashboards, automated Excel reports with dynamic pivot analysis, and SQL pipelines to eliminate hours of manual work.\n\nWhat kind of spreadsheet data or business metrics are you looking to track and visualize?";
    }
    // Semantic Intent 3: Online store / Shop / Selling online / Ecommerce / Payments
    else if (clean.includes('online store') || clean.includes('store') || clean.includes('shop') || clean.includes('selling online') || clean.includes('ecommerce') || clean.includes('e-commerce') || clean.includes('woocommerce') || clean.includes('shopify') || clean.includes('checkout') || clean.includes('stripe')) {
      reply = isVoice
        ? "Yes, we engineer high-concurrency e-commerce stores designed for seamless checkout and high conversion. We specialize in WooCommerce HPOS architecture, payment gateway setups, and inventory caching that handles over 10,000 orders a day. Are you launching a new online store, or looking to scale an existing shop?"
        : "Yes, we engineer high-concurrency e-commerce stores designed for seamless checkout and high conversion.\n\nWe specialize in WooCommerce HPOS architecture, Stripe and PayPal payment integrations, and database tuning that easily handles over 10,000 orders a day without crashes.\n\nAre you launching a new online store, or looking to scale and speed up an existing shop?";
    }
    // Semantic Intent 4: Phone bot / Calling / Voice assistant / Receptionist / Automated calls
    else if (clean.includes('phone bot') || clean.includes('phone agent') || clean.includes('calling') || clean.includes('voice assistant') || clean.includes('receptionist') || clean.includes('telephony') || clean.includes('vapi') || clean.includes('retell') || clean.includes('voice bot')) {
      reply = isVoice
        ? "Yes, we deploy conversational AI phone agents that answer calls 24/7 with natural, sub-600ms latency. They handle incoming inquiries, book appointments directly into your calendar, and sync notes straight to your CRM. Are you looking for an inbound receptionist or automated outbound calling?"
        : "Yes, we deploy conversational AI phone agents that answer calls 24/7 with natural, sub-600ms latency.\n\nThey handle incoming inquiries, book appointments directly into Google Calendar or Cal.com, and sync call transcripts straight to your CRM.\n\nAre you looking for an inbound receptionist or automated outbound calling?";
    }
    // Semantic Intent 5: Automation / Zapier / Connect apps / Sync data / Workflows
    else if (clean.includes('automation') || clean.includes('automate') || clean.includes('zapier') || clean.includes('connect apps') || clean.includes('sync data') || clean.includes('workflows') || clean.includes('workflow') || clean.includes('n8n') || clean.includes('make.com')) {
      reply = isVoice
        ? "Yes, we engineer robust automated workflows using self-hosted n8n clusters and Make.com to eliminate manual repetitive work. We connect your apps, CRMs, and databases with zero data loss while eliminating expensive monthly Zapier fees. Which tools or tasks are you looking to connect and automate?"
        : "Yes, we engineer robust automated workflows using self-hosted n8n clusters and Make.com to eliminate manual repetitive work.\n\nWe connect your apps, CRMs, and databases with zero data loss while eliminating expensive monthly Zapier subscription fees.\n\nWhich tools or internal workflows are you looking to connect and automate?";
    }
    // Semantic Intent 6: Machine learning / AI model / Scraping / Extract data
    else if (clean.includes('machine learning') || clean.includes('ai model') || clean.includes('scraping') || clean.includes('scrapers') || clean.includes('extract data') || clean.includes('web scraping') || clean.includes('data science') || clean.includes('forecasting') || clean.includes('churn')) {
      reply = isVoice
        ? "Yes, we build custom predictive machine learning models and resilient web scraping pipelines. From predicting customer churn and sales trends to harvesting competitor data with anti-bot bypass, we turn complex data into strategic revenue. What kind of machine learning models or web data sources are you looking to work with?"
        : "Yes, we build custom predictive machine learning models and resilient web scraping pipelines.\n\nFrom forecasting customer churn and sales trends to harvesting competitor pricing with anti-bot bypass, we turn web and operational data into strategic revenue assets.\n\nWhat kind of machine learning models or web data sources are you looking to work with?";
    }
    // Semantic Intent 7: Agency / White-label / Subcontracting / Partner
    else if (clean.includes('agency') || clean.includes('white-label') || clean.includes('whitelabel') || clean.includes('subcontracting') || clean.includes('dev partner') || clean.includes('retainer')) {
      reply = isVoice
        ? "Yes, we act as a dedicated behind-the-scenes engineering partner for digital and marketing agencies under strict bilateral NDA. We handle complex WordPress VIP builds, AI voice telephony, and n8n automations with zero management overhead. What kind of overflow development capacity is your agency looking for?"
        : "Yes, we act as a dedicated behind-the-scenes engineering partner for digital and marketing agencies under strict bilateral NDA.\n\nWe seamlessly handle high-complexity WordPress VIP builds, AI voice telephony, and n8n automations with zero junior management overhead.\n\nWhat kind of overflow development capacity or client projects is your agency currently looking to handle?";
    }
    // General Services Query
    else if (clean.includes('services') || clean.includes('what do you do') || clean.includes('what can you do') || clean.includes('what services') || clean.includes('kya karte ho') || clean.includes('kya kaam')) {
      reply = isVoice
        ? "Sheharyar specializes in custom WordPress development, WooCommerce HPOS architecture, 24/7 AI voice phone bots, n8n workflow automation, and Data Analytics solutions. Which of these areas aligns with your project?"
        : "Sheharyar delivers end-to-end web systems and AI engineering across 5 core capabilities:\n\n• **Custom WordPress & WooCommerce HPOS**: Clean PHP 8.2 VIP code, sub-500ms speed, and high-concurrency order scaling.\n• **Autonomous AI Voice Telephony**: 24/7 phone receptionists via Vapi and Twilio with instant Google Calendar booking and CRM sync.\n• **Workflow Automation & n8n Clusters**: Self-hosted Docker clusters eliminating expensive Zapier fees with zero data loss.\n• **Data Analytics & BI Dashboards**: Interactive Power BI and Excel executive dashboards, SQL pipelines, and Python predictive modeling.\n• **White-Label Agency Subcontracting**: Dedicated senior engineering capacity under bilateral NDA.\n\nAre you looking to build a new system for your business, or looking for agency overflow capacity?";
    }
    // General Default Fallback (Strict 2 Sentences)
    else {
      reply = isVoice
        ? "I hear you! Could you share a bit more about what you're aiming to build, your current technical stack, or your target timeline? Sheharyar provides architectural scoping with a guaranteed 2-hour SLA."
        : "I hear you! Could you share a bit more about what you're aiming to build, your current technical stack, or your target timeline? Sheharyar provides architectural scoping with a guaranteed 2-hour SLA, and you can also connect directly with him on WhatsApp at +92 313 2080033.";
    }

    return res.status(200).json({
      reply,
      source: 'Verified Grounded Architectural Knowledge Base',
      isOutOfScope: false,
      showLeadForm: isSalesIntent,
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
