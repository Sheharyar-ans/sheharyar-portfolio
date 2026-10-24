/**
 * Sheharyar Siraj - Grounded RAG & Multi-Turn AI Assistant API Endpoint
 * 
 * Supports:
 * - Google Gemini 1.5 / 2.0 Flash (via Google AI Studio key)
 * - OpenAI GPT-4o-mini (via OpenAI API key)
 * - Autonomous Grounded Knowledge Fallback with Multi-Turn Context & Small-Talk
 * - Roman Urdu, Urdu, and English Bilingual Fluidity
 */

const SYSTEM_PROMPT = `You are the official AI Project Consultant for Sheharyar Siraj (sheharyarsiraj.com / Ansari Web Agency).
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
  State: "We specialize in high-performance web systems and AI engineering. Our core pillars include Custom WordPress VIP & WooCommerce HPOS architecture, Autonomous AI Voice Agents via Vapi and Twilio, Self-Hosted n8n Automation clusters, Deterministic Multi-Agent AI, and Data Analytics & Data Science Solutions. Which specific bottleneck are you looking to solve?"
- Consultative Flow: Answer questions in clear, outcome-focused business language. Ask natural discovery questions (e.g., "Are you looking to optimize an existing system or scope a new build?"). Mention relevant built-in tools when helpful.
- High-Intent Form Trigger: Display the lead capture form ONLY when the client exhibits clear hiring or purchasing intent (e.g., "I want to work with you", "How can we start?", "Let's do this", "Send me a quote", or after they explicitly agree to a consultation). Accompany the form with:
  "I can have Sheharyar review your requirements and reach out within 2 hours. Feel free to leave your WhatsApp and details below, or reach out directly on WhatsApp at +92 313 2080033."
- Spoken Brevity: For voice mode, keep responses strictly to 1 to 3 punchy sentences (under 45 words), without markdown bullets or asterisks.
- Multilingual: Support English and Roman Urdu / Urdu fluently and naturally.`;

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
          reply: "I specialize exclusively in Sheharyar Siraj's web architecture, custom WordPress systems, AI voice agents, and enterprise automations. How can I assist you with your technical project or architecture needs today?",
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
        ? "I'm doing great, thanks for asking! I'm Sheharyar's AI Project Consultant. How are things with you, and what kind of project are you exploring today?"
        : "I'm doing great, thanks for asking! I'm Sheharyar Siraj's official AI Project Consultant. We specialize in high-performance web systems and AI engineering — like sub-500ms WordPress VIP builds, sub-600ms AI voice agents, and self-hosted n8n clusters. How are things with you, and what brings you by today?";
    }
    // Small Talk: "who built you"
    else if (clean.includes('who built you') || clean.includes('who made you') || clean.includes('who created you') || clean.includes('kis ne banaya')) {
      reply = isVoice
        ? "I was built by Sheharyar Siraj, Principal Systems Architect at Ansari Web Agency, grounded directly in his 1,200+ global deployments and engineering blueprints. How can I assist you with your software architecture today?"
        : "I was built by Sheharyar Siraj, Founder & Principal Systems Architect at Ansari Web Agency. He trained me directly on his 1,200+ commercial deployments, Cisco CCNP/CyberOps engineering credentials, and full service catalog. How can I help you with your web architecture, voice AI agents, or workflow automations today?";
    }
    // Small Talk: "what's up" / "sup"
    else if (clean === "what's up" || clean === "whats up" || clean === "sup" || clean.includes('kya chal raha')) {
      reply = isVoice
        ? "Not much, just scoping scalable web systems and AI voice agents! How about you — exploring ideas for a new build or looking to optimize an existing system?"
        : "Not much, just scoping high-throughput web systems, custom WordPress VIP builds, and autonomous AI voice agents! How about you — exploring ideas for a new project, or looking to resolve a performance bottleneck?";
    }
    // Small Talk: gratitude
    else if (clean.includes('thank you') || clean.includes('thanks') || clean.includes('shukriya')) {
      reply = isVoice
        ? "You're very welcome! Let me know if you want to explore any architecture specs or connect with Sheharyar directly on WhatsApp."
        : "You're very welcome! Feel free to ask about any specific architecture, pricing, or timelines — or connect directly with Sheharyar on WhatsApp (+92 313 2080033) for a 2-hour SLA review.";
    }
    // Greetings
    else if (clean === 'hi' || clean === 'hello' || clean === 'hey' || clean.startsWith('hey ') || clean.startsWith('hello ') || clean === 'salam' || clean === 'assalam') {
      reply = isVoice
        ? "Hello! I am Sheharyar Siraj's Principal Architecture Consultant. We specialize in custom WordPress VIP systems, sub-600ms AI voice agents, and enterprise n8n automations. What bottleneck can I help you resolve today?"
        : "Hello! I am Sheharyar Siraj's Principal Architecture Consultant. We specialize in high-performance web systems and AI engineering. What bottleneck can I help you resolve today?";
    }
    // "What services do you provide on this website?"
    else if (clean.includes('services') || clean.includes('what do you do') || clean.includes('what can you do') || clean.includes('what services') || clean.includes('kya karte ho') || clean.includes('kya kaam')) {
      reply = isVoice
        ? "We specialize in high-performance web systems and AI engineering. Our core pillars include Custom WordPress VIP and WooCommerce HPOS architecture, Autonomous AI Voice Agents via Vapi and Twilio, Self-Hosted n8n Automation clusters, and Deterministic Multi-Agent AI. Which specific bottleneck are you looking to solve?"
        : "We specialize in high-performance web systems and AI engineering. Our core pillars include:\n\n• **Custom WordPress VIP & WooCommerce HPOS**: Clean PHP 8.2 architecture, zero page-builder bloat, sub-500ms TTFB, and high-concurrency order storage.\n• **Autonomous AI Voice Agents**: Sub-600ms conversational telephony via Vapi and Twilio SIP with 24/7 calendar booking and CRM sync.\n• **Workflow Automation & n8n Clusters**: Self-hosted Docker clusters with Redis queues eliminating expensive Zapier fees with 0% data loss.\n• **Deterministic Multi-Agent AI**: Stateful LangGraph workflows executing autonomous tool-calling.\n\nWhich specific bottleneck are you looking to solve? Are you looking to implement this for your own company or as a white-label partner for your agency clients?";
    }
    // Identity / Who is Sheharyar?
    else if (clean.includes('who are you') || clean.includes('who is sheharyar') || clean.includes('about sheharyar') || clean.includes('kon hai')) {
      reply = isVoice
        ? "Sheharyar Siraj is the Founder and Principal Systems Architect at Ansari Web Agency with 5+ years of experience, 1,200+ global deployments, and Cisco CCNP and Google Cloud Vertex AI credentials under a 2-hour SLA."
        : "Sheharyar Siraj is the Founder and Principal Systems Architect at Ansari Web Agency with 5+ years of verified architecture experience and 1,200+ completed client deployments worldwide. He holds Cisco CCNP Enterprise, Cisco CyberOps, and Google Cloud Vertex AI credentials with a 100% Upwork JSS. Clients collaborate directly with him with zero junior account manager friction under a 2-hour SLA.";
    }
    // Autonomous AI Voice Agents
    else if (clean.includes('voice') || clean.includes('phone') || clean.includes('vapi') || clean.includes('retell') || clean.includes('receptionist') || clean.includes('telephony')) {
      reply = isVoice
        ? "We engineer sub-600ms conversational AI voice agents on Vapi and Twilio SIP that handle calls 24/7, book appointments into your calendar, and sync directly with your CRM. Are you looking for inbound reception or outbound lead qualification?"
        : "We engineer autonomous conversational AI voice agents using Vapi, Retell AI, Deepgram Nova-2, and Twilio SIP trunks with sub-600ms end-to-end latency. They handle natural turn-taking and interruptions, book appointments directly into Google Calendar, and push structured data to your CRM with zero hallucinations. Are you looking to deploy this for your own operations or as a white-label partner for agency clients?";
    }
    // WordPress VIP / WooCommerce
    else if (clean.includes('wordpress') || clean.includes('woo') || clean.includes('website') || clean.includes('hpos') || clean.includes('speed') || clean.includes('php')) {
      reply = isVoice
        ? "We architect clean PHP 8.2 WordPress VIP systems without page-builder bloat, delivering sub-500ms TTFB and 95 plus Core Web Vitals. Is your current site experiencing performance bottlenecks, or are you planning a new build?"
        : "We architect clean, zero-builder WordPress VIP systems on PHP 8.2/8.3 utilizing custom Gutenberg blocks (React/JSX) and Redis caching. This eliminates third-party plugin drag, delivering sub-500ms TTFB and 95+ Core Web Vitals. For eCommerce, we implement WooCommerce HPOS custom tables scaling beyond 10,000 orders/day without database deadlocks. Is your site experiencing speed bottlenecks, or are you planning a greenfield build?";
    }
    // Pricing
    else if (clean.includes('price') || clean.includes('cost') || clean.includes('rate') || clean.includes('charges') || clean.includes('kitna') || clean.includes('how much')) {
      reply = isVoice
        ? "Custom WordPress VIP builds range from $1,200 to $3,500, AI Voice Agents from $1,500 to $4,000, and n8n automations from $800 to $2,500. I can have Sheharyar send over a custom proposal within 2 hours. Would you like to connect on WhatsApp?"
        : "Our primary pricing tiers: Custom WordPress VIP ($1,200–$3,500), AI Voice Agents ($1,500–$4,000), n8n Automation Clusters ($800–$2,500), and White-Label Agency Retainers ($1,500–$3,500/week). I can have Sheharyar audit your architecture and send over a custom proposal within 2 hours. Would you like to leave your details here, or connect directly with him on WhatsApp?";
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
