/**
 * Central LLM Brain & Multi-Turn Conversation Engine for Zack Voice Assistant
 * 
 * Comprehensive Technical Solutions Advisor for sheharyarsiraj.com:
 * - Agentic AI & Autonomous Multi-Agent Applications (LangGraph)
 * - Contextual AI Chatbots & RAG Systems
 * - Data Science & Predictive ML Pipelines
 * - Data Analytics & Business Intelligence (Power BI, Excel, SQL)
 * - Production Vibe Coding & Rapid React MVPs (2-Day turnaround)
 * - Autonomous AI Voice Telephony (Vapi/Twilio)
 * - Workflow Automation & Self-Hosted n8n Clusters
 * - Custom SaaS Architecture & MVP Development
 * - WooCommerce HPOS & High-Concurrency E-Commerce
 * - Custom WordPress VIP Systems Engineering
 * - AI Video Ads & Synthetic UGC
 * - White-Label Agency Subcontracting Retainers
 * - Interactive Code Arcade (Boss Fighter & Puzzle modes at /arcade/)
 * - 20 Interactive Developer Tools at /tools/
 * 
 * Strict Compliance:
 * 1. Zero Pricing Disclosures (Always ask for budget; direct to WhatsApp/Email)
 * 2. 2-Day Urgency -> Vibe Coding & React MVP
 * 3. 2-3 Sentences per turn (Voice Pacing)
 */

import {
  GROUND_TRUTH_SYSTEM_CONTEXT,
  ARCHITECT_IDENTITY,
  CORE_CAPABILITIES,
  CODE_ARCADE_METADATA,
  CRAWLED_INTERACTIVE_TOOLS
} from '../data/groundTruthKnowledge.ts';

export interface VoiceMessageTurn {
  role: 'user' | 'model';
  text: string;
}

export interface ClientInquiryArgs {
  clientName?: string;
  email: string;
  phoneOrWhatsApp: string;
  recommendedArchitecture?: string;
  budgetRange?: string;
  timeline?: string;
  projectSummary?: string;
}

export interface BrainTurnResult {
  replyText: string;
  toolCall?: {
    name: 'submitClientInquiry';
    args: ClientInquiryArgs;
  };
}

// Native Gemini Tool Declaration
export const GEMINI_TOOLS_DECLARATION = [
  {
    functionDeclarations: [
      {
        name: 'submitClientInquiry',
        description:
          "Trigger this function immediately once the client's project requirements, timeline, budget, or contact info (email and/or WhatsApp number) have been discussed.",
        parameters: {
          type: 'OBJECT',
          properties: {
            clientName: {
              type: 'STRING',
              description: "The client's name"
            },
            email: {
              type: 'STRING',
              description: "The client's email address"
            },
            phoneOrWhatsApp: {
              type: 'STRING',
              description: "The client's WhatsApp or mobile phone number"
            },
            recommendedArchitecture: {
              type: 'STRING',
              description: 'The tailored technical solution or architecture recommended'
            },
            budgetRange: {
              type: 'STRING',
              description: "Client's indicated budget or project tier"
            },
            timeline: {
              type: 'STRING',
              description: "Client's target launch timeline"
            },
            projectSummary: {
              type: 'STRING',
              description: 'Executive summary of the discussion and requirements'
            }
          },
          required: ['email', 'phoneOrWhatsApp']
        }
      }
    ]
  }
];

// System Prompt for Zack Solutions Architect
export const ZACK_SOLUTIONS_ARCHITECT_SYSTEM_PROMPT = `[IDENTITY & ROLE]
Your name is Zack. You are the professional Executive Solutions Architect and Technical Operations Manager for Sheharyar Siraj.
You represent Sheharyar Siraj (${ARCHITECT_IDENTITY.portfolioUrl}).
Always speak about Sheharyar in the third person (he, him, Sheharyar). You are his dedicated technical voice assistant.

[CRITICAL VOICE PACING & BREVITY - STRICT RULE]
- Voice Pacing: Keep every response strictly between 2 to 3 natural, articulate sentences.
- Never give long, lecture-like paragraphs.
- Speak in fluid conversational English. You understand and naturally converse with Urdu/Hindi inquiries as well.
- NEVER use markdown asterisks (*), hashtags (#), or bullet points in your speech output.

[COMPREHENSIVE WEBSITE CAPABILITIES - NEVER RESTRICT TO JUST WEBSITES]
Sheharyar Siraj engineers a wide spectrum of advanced technical solutions. You must consult on whatever the prospect needs:
1. Agentic AI & Multi-Agent Systems: Stateful LangGraph cycles, autonomous tool-calling, multi-step research.
2. Contextual AI Chatbots & RAG Systems: Pinecone/Qdrant vector databases, document search, zero hallucination.
3. Data Science & Predictive ML: Churn forecasting, customer segmentation, ML pipelines.
4. Data Analytics & Business Intelligence: Executive Power BI dashboards, automated Excel models, dynamic pivot analysis, SQL ETL.
5. Production Vibe Coding & Rapid React MVPs: Urgent 2-day to 1-week launches, interactive web tools.
6. Autonomous AI Voice Telephony: 24/7 phone receptionists, sub-600ms latency, Google Calendar/Cal.com booking.
7. Workflow Automation: Self-hosted n8n Docker clusters, Make.com, Redis queues, zero monthly Zapier fees.
8. Custom SaaS Architecture & MVP Development: Next.js/React, multi-tenant DB, Stripe subscriptions.
9. WooCommerce HPOS & High-Concurrency E-Commerce: 10,000+ daily orders, Redis cache, zero DB deadlocks.
10. Custom WordPress VIP: Clean PHP 8.2 VIP code, React Gutenberg blocks, sub-500ms TTFB.
11. AI Video Ads & Synthetic UGC: Automated script-to-video creative production.
12. White-Label Agency Retainers: Dedicated dev partner for USA, UK, UAE, EU marketing and SEO agencies under NDA.
13. Interactive Code Arcade (/arcade/): Developer gaming arena with Boss Fighter Mode (battling algorithms with HP & special attacks) and Puzzle Mode across JS, Python, React, HTML/CSS, API/JSON.
14. Interactive Developer Tools (/tools/): 20 live tools including Schema Generator, Database Bloat Estimator, CPT Exporter, Voice Agent ROI Calculator, Webhook Tester, etc.

[STRICT ZERO-PRICING GUARDRAIL - ABSOLUTE RULE]
- NEVER state prices, rates, costs, or fee ranges under ANY circumstances.
- Always ask the client for their target budget: "What budget range do you have in mind for this project?"
- If the client asks for pricing or rates ("how much do you charge?", "what does it cost?", "kitne paise honge?"):
  Respond strictly: "Project pricing depends strictly on your custom technical scope and architecture. You can connect directly with Sheharyar on WhatsApp at +92 313 2080033 or via email at sherryansari870@gmail.com for a quote. In the meantime, what target budget do you have in mind?"

[2-DAY LAUNCH / URGENT TIMELINE - VIBE CODING RULE]
- If the client mentions needing a website in 2 days, urgently, or on a very fast turnaround:
  Recommend Vibe Coding with React: "If you need a website ready in 2 days, we recommend our rapid Vibe Coding architecture with modern React for immediate deployment. What target budget do you have in mind for this fast turnaround?"

[STRICT ANTI-CV GUARDRAIL - CRITICAL]
- NEVER recite Sheharyar's biography, university degrees, or lists of certificates unless the user EXPLICITLY asks: "What are his credentials?", "Who is Sheharyar?", or "Why should I trust you?".

${GROUND_TRUTH_SYSTEM_CONTEXT}
`;

/**
 * Format conversation history into Gemini REST API contents structure
 */
function formatGeminiContents(
  history: VoiceMessageTurn[],
  currentUserMessage: string
): Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> {
  const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

  for (const turn of history) {
    if (!turn.text || !turn.text.trim()) continue;
    contents.push({
      role: turn.role,
      parts: [{ text: turn.text.trim() }]
    });
  }

  // Ensure current user message is appended
  if (contents.length === 0 || contents[contents.length - 1].role !== 'user') {
    contents.push({
      role: 'user',
      parts: [{ text: currentUserMessage.trim() }]
    });
  } else {
    contents[contents.length - 1].parts[0].text += `\n${currentUserMessage.trim()}`;
  }

  return contents;
}

/**
 * Executes multi-turn voice interaction via Google Gemini REST API
 */
export async function sendVoiceTurnToGemini(
  history: VoiceMessageTurn[],
  currentUserMessage: string
): Promise<BrainTurnResult> {
  const apiKey =
    (import.meta as any).env?.VITE_GEMINI_API_KEY ||
    (import.meta as any).env?.GEMINI_API_KEY ||
    (typeof process !== 'undefined' ? (process.env?.VITE_GEMINI_API_KEY || process.env?.GEMINI_API_KEY) : '');

  // If Gemini API Key is available, dispatch live to Gemini
  if (apiKey && apiKey.trim()) {
    const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash'];
    const geminiContents = formatGeminiContents(history, currentUserMessage);

    for (const model of models) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7000);

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const payload = {
          systemInstruction: {
            parts: [{ text: ZACK_SOLUTIONS_ARCHITECT_SYSTEM_PROMPT }]
          },
          contents: geminiContents,
          tools: GEMINI_TOOLS_DECLARATION,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 220
          }
        };

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify(payload)
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const candidate = data.candidates?.[0];
          const part = candidate?.content?.parts?.[0];

          // Check if Gemini invoked the native function calling tool
          if (part?.functionCall) {
            const funcCall = part.functionCall;
            if (funcCall.name === 'submitClientInquiry') {
              const args: ClientInquiryArgs = funcCall.args || {};
              return {
                replyText:
                  "I have documented your project scope and dispatched the brief directly to Sheharyar's desk. You will receive an architectural review within 2 hours. I have also opened your project confirmation on screen.",
                toolCall: {
                  name: 'submitClientInquiry',
                  args
                }
              };
            }
          }

          if (part?.text && part.text.trim()) {
            return {
              replyText: cleanSpeechOutput(part.text.trim())
            };
          }
        }
      } catch (err) {
        console.warn(`[Gemini ${model} Voice Dispatch Notice]:`, err);
      }
    }
  }

  // Autonomous Grounded Knowledge Fallback
  return runAutonomousSolutionsBrain(history, currentUserMessage);
}

/**
 * Cleans markdown formatting out of LLM response for vocalization
 */
function cleanSpeechOutput(text: string): string {
  return text
    .replace(/[*_#`~>]/g, '')
    .replace(/^[-•*]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Autonomous Grounded Solutions Brain (Zero-Key Autonomy)
 * Implements Active Discovery, Multi-Service Knowledge, Interactive Tools,
 * Code Arcade Games, and Zero-Pricing Protection directly derived from `groundTruthKnowledge.ts`.
 */
export function runAutonomousSolutionsBrain(
  history: VoiceMessageTurn[],
  userQuery: string
): BrainTurnResult {
  const clean = userQuery.toLowerCase().trim();

  // 1. Detect Contact Extraction & Buying Intent for submitClientInquiry Tool Trigger
  const emailMatch = userQuery.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  const phoneMatch = userQuery.match(/(\+?\d[\d\s-]{7,}\d)/);

  if (emailMatch || phoneMatch) {
    const email = emailMatch ? emailMatch[1] : '';
    const phoneOrWhatsApp = phoneMatch ? phoneMatch[1] : '';

    return {
      replyText:
        "I have documented your project scope and dispatched the brief directly to Sheharyar's desk. You will receive an architectural review within 2 hours. I have also opened your project confirmation on screen.",
      toolCall: {
        name: 'submitClientInquiry',
        args: {
          clientName: 'Prospective Client',
          email: email || 'sherryansari870@gmail.com',
          phoneOrWhatsApp: phoneOrWhatsApp || '+92 313 2080033',
          recommendedArchitecture: inferRecommendedArchitecture(history, clean),
          budgetRange: inferBudget(userQuery),
          timeline: clean.includes('2 day') || clean.includes('urgent') ? '2 Days' : 'Standard',
          projectSummary: userQuery
        }
      }
    };
  }

  // 2. Strict Pricing Guardrail - Never quote prices! Always ask for budget or refer to WhatsApp/Email
  const isPricingQuery =
    clean.includes('price') ||
    clean.includes('pricing') ||
    clean.includes('cost') ||
    clean.includes('rate') ||
    clean.includes('how much') ||
    clean.includes('charge') ||
    clean.includes('fee') ||
    clean.includes('paise') ||
    clean.includes('kitne') ||
    clean.includes('charges');

  if (isPricingQuery) {
    return {
      replyText:
        "Project pricing depends strictly on your custom technical requirements and timeline. You can discuss exact rates directly with Sheharyar via WhatsApp at +92 313 2080033 or email at sherryansari870@gmail.com. In the meantime, what target budget range do you have in mind?"
    };
  }

  // 3. 2-Day Website / Urgent Launch Rule -> Recommend Vibe Coding
  const isUrgentWebsite =
    (clean.includes('2 day') ||
      clean.includes('two day') ||
      clean.includes('2 din') ||
      clean.includes('urgent') ||
      clean.includes('emergency') ||
      clean.includes('asap') ||
      clean.includes('fast') ||
      clean.includes('jaldi')) &&
    (clean.includes('website') || clean.includes('site') || clean.includes('web') || clean.includes('page') || clean.includes('app'));

  if (isUrgentWebsite || clean.includes('vibe coding')) {
    return {
      replyText:
        "If you need a website ready in 2 days, we recommend our rapid Vibe Coding architecture with modern React for immediate deployment. It allows us to deliver a fast, production-ready website on an urgent turnaround. What target budget do you have in mind for this project?"
    };
  }

  // 4. Interactive Code Arcade & Mini-Games Queries
  if (
    clean.includes('game') ||
    clean.includes('arcade') ||
    clean.includes('boss fight') ||
    clean.includes('puzzle') ||
    clean.includes('khel') ||
    clean.includes('play')
  ) {
    return {
      replyText:
        "Yes, our website features an interactive Code Arcade at /arcade/. You can play Puzzle Mode for grid-based code logic or Boss Fighter Mode where you battle algorithmic bosses with real-time code execution across JavaScript, Python, and React. Have you checked it out yet?"
    };
  }

  // 5. Interactive Developer Tools Queries
  if (
    clean.includes('tool') ||
    clean.includes('tools') ||
    clean.includes('schema generator') ||
    clean.includes('bloat') ||
    clean.includes('cpt exporter') ||
    clean.includes('roi calculator') ||
    clean.includes('webhook tester')
  ) {
    return {
      replyText:
        "We have 20 free interactive developer tools live at /tools/, including our Local Schema Generator, WordPress Database Bloat Estimator, Voice Agent ROI Calculator, and n8n Webhook Tester. Which specific utility or engineering task are you trying to test?"
    };
  }

  // 6. Agentic AI & Autonomous Multi-Agent Applications
  if (
    clean.includes('agentic') ||
    clean.includes('agentic ai') ||
    clean.includes('multi agent') ||
    clean.includes('langgraph') ||
    clean.includes('autonomous agent') ||
    clean.includes('ai agents')
  ) {
    return {
      replyText:
        "Yes, we build deterministic multi-agent AI systems and autonomous workflows using LangGraph and advanced LLM tool-calling. These stateful agents handle multi-step research, automated decision making, and self-correcting error recovery. What specific autonomous workflow or agent task are you looking to automate?"
    };
  }

  // 7. Contextual AI Chatbots & RAG Systems
  if (
    clean.includes('rag') ||
    clean.includes('vector database') ||
    clean.includes('pinecone') ||
    clean.includes('qdrant') ||
    clean.includes('document search') ||
    clean.includes('knowledge base')
  ) {
    return {
      replyText:
        "Yes, we engineer contextual RAG systems and intelligent chatbots with zero hallucination. We connect your enterprise documents, knowledge bases, and vector databases like Pinecone and Qdrant to deliver instant, factual search for customers. What type of documents or customer data do you want your bot to answer from?"
    };
  }

  // 8. Data Science & Predictive ML
  if (
    clean.includes('data science') ||
    clean.includes('machine learning') ||
    clean.includes('predictive') ||
    clean.includes('churn') ||
    clean.includes('clustering')
  ) {
    return {
      replyText:
        "Yes, we develop production Data Science pipelines and predictive machine learning models in Python. From customer churn forecasting and lifetime value modeling to automated feature stores and ML inference APIs, we turn your raw data into predictive intelligence. What machine learning or data science outcome are you aiming for?"
    };
  }

  // 9. Data Analytics & Business Intelligence (Power BI, Excel, SQL)
  if (
    clean.includes('excel') ||
    clean.includes('sheet') ||
    clean.includes('power bi') ||
    clean.includes('tableau') ||
    clean.includes('pivot table') ||
    clean.includes('data analytics') ||
    clean.includes('reporting') ||
    clean.includes('dashboard')
  ) {
    return {
      replyText:
        "Yes, we transform raw spreadsheets and numbers into automated executive dashboards and clean reporting models. We build interactive Power BI dashboards, automated Excel reports with dynamic pivot analysis, and automated SQL query pipelines. What kind of spreadsheet data or business metrics are you looking to track and visualize?"
    };
  }

  // 10. Autonomous AI Voice Telephony
  if (
    clean.includes('voice agent') ||
    clean.includes('phone bot') ||
    clean.includes('calling') ||
    clean.includes('call handling') ||
    clean.includes('receptionist') ||
    clean.includes('vapi') ||
    clean.includes('telephony')
  ) {
    return {
      replyText:
        "Yes, we deploy conversational AI phone agents that answer incoming calls 24/7 with natural, sub-600ms latency. They handle customer inquiries, book appointments directly into Google Calendar or Cal.com, and sync notes to your CRM. Are you looking for an inbound phone receptionist or outbound automated calling?"
    };
  }

  // 11. Workflow Automation & n8n Clusters
  if (
    clean.includes('n8n') ||
    clean.includes('automation') ||
    clean.includes('zapier') ||
    clean.includes('make.com') ||
    clean.includes('workflow')
  ) {
    return {
      replyText:
        "Yes, we engineer robust automated workflows using self-hosted n8n Docker clusters and Make.com to eliminate manual repetitive work. We connect your apps, CRMs, and databases with zero data loss while eliminating expensive monthly Zapier fees. Which tools or tasks are you looking to connect and automate?"
    };
  }

  // 12. Custom SaaS Architecture & MVP Development
  if (
    clean.includes('saas') ||
    clean.includes('build a saas') ||
    clean.includes('mvp') ||
    clean.includes('software product') ||
    clean.includes('web app')
  ) {
    return {
      replyText:
        "Yes, we build custom full-stack SaaS applications and scalable MVPs using Next.js, React, and PostgreSQL. We architect multi-tenant database isolation, Stripe recurring subscription billing, and secure authentication. What is the core functionality of the SaaS platform you are planning to build?"
    };
  }

  // 13. WooCommerce HPOS & High-Concurrency E-Commerce
  if (
    clean.includes('woocommerce') ||
    clean.includes('ecommerce') ||
    clean.includes('online store') ||
    clean.includes('shop') ||
    clean.includes('hpos') ||
    clean.includes('shopify')
  ) {
    return {
      replyText:
        "Yes, we engineer high-concurrency e-commerce stores designed for seamless checkout and high conversion. We specialize in WooCommerce HPOS architecture, Stripe and PayPal integrations, and database tuning that easily handles over 10,000 orders a day. Are you launching a new online store, or looking to scale an existing shop?"
    };
  }

  // 14. Custom WordPress VIP Systems
  if (
    clean.includes('wordpress') ||
    clean.includes('wp') ||
    clean.includes('gutenberg') ||
    clean.includes('cms')
  ) {
    return {
      replyText:
        "Yes, we build custom, high-speed websites designed to convert visitors into clients. Whether you need a fresh WordPress VIP build with sub-500ms TTFB or a modern React platform, we ensure 95+ Core Web Vitals and zero page builder bloat. Are you looking to launch urgently or build an ongoing content platform?"
    };
  }

  // 15. AI Video Ads & Synthetic UGC
  if (
    clean.includes('video ad') ||
    clean.includes('ugc') ||
    clean.includes('ai video') ||
    clean.includes('synthetic video')
  ) {
    return {
      replyText:
        "Yes, we produce automated, high-converting AI video ads and synthetic UGC creatives for TikTok, Instagram Reels, and YouTube Shorts. We handle automated scriptwriting, synthetic voice cloning, and realistic avatar generation to scale your ad testing. What product or offer are you looking to create video ads for?"
    };
  }

  // 16. White-Label Agency Subcontracting
  if (
    clean.includes('white label') ||
    clean.includes('agency') ||
    clean.includes('subcontract') ||
    clean.includes('overflow') ||
    clean.includes('retainer')
  ) {
    return {
      replyText:
        "Yes, we act as a dedicated behind-the-scenes engineering partner for digital and marketing agencies under strict bilateral NDA. We handle complex WordPress VIP builds, AI voice telephony, and n8n automations with zero junior management overhead. What kind of overflow development capacity is your agency looking for?"
    };
  }

  // 17. Web Scraping & Data Pipelines
  if (
    clean.includes('scraping') ||
    clean.includes('scraper') ||
    clean.includes('extract data') ||
    clean.includes('pipeline')
  ) {
    return {
      replyText:
        "Yes, we build resilient web scraping pipelines and automated database ETL with headless browser execution and anti-bot bypass. From harvesting competitor pricing to market intelligence extraction, we turn web data into revenue assets. What data sources or websites are you looking to extract?"
    };
  }

  // 18. Buying Intent Phrases
  const isBuyingPhrase =
    clean.includes('hire') ||
    clean.includes('start project') ||
    clean.includes("let's start") ||
    clean.includes('lets start') ||
    clean.includes('i want this') ||
    clean.includes('can you do this') ||
    clean.includes('send proposal') ||
    clean.includes('book call') ||
    clean.includes('ready to start');

  if (isBuyingPhrase) {
    return {
      replyText:
        "We would love to help you build this! What target budget and timeline do you have in mind, and what is the best email or WhatsApp number to reach you?"
    };
  }

  // 19. Small Talk & Greetings
  if (
    clean.includes('how are you') ||
    clean.includes("how's it going") ||
    clean.includes('kaise ho') ||
    clean.includes('kya haal')
  ) {
    return {
      replyText:
        "I'm doing great, thanks for asking! This is Zack, assistant to Sheharyar Siraj. What kind of project or technical challenge are you exploring today?"
    };
  }

  if (clean.includes('who are you') || clean.includes('who is zack') || clean.includes('what do you do')) {
    return {
      replyText:
        "I am Zack, Executive Solutions Architect for Sheharyar Siraj. I help qualify technical architectures, compare project trade-offs, and manage Sheharyar's engineering schedule. How can I assist you with your project today?"
    };
  }

  if (
    clean === 'hi' ||
    clean === 'hello' ||
    clean === 'hey' ||
    clean.startsWith('hey ') ||
    clean.startsWith('hello ') ||
    clean === 'salam' ||
    clean.startsWith('assalam')
  ) {
    return {
      replyText:
        "Hi, thanks for calling! This is Zack, assistant to Sheharyar Siraj. How can I assist you with your project scoping today?"
    };
  }

  if (clean.includes('thank you') || clean.includes('thanks') || clean.includes('shukriya')) {
    return {
      replyText:
        "You're very welcome! Feel free to ask about any specific architecture, or reach Sheharyar directly on WhatsApp at +92 313 2080033."
    };
  }

  // 20. Explicit Credentials Query (ONLY volunteer CV info if user explicitly asks)
  if (
    clean.includes('credential') ||
    clean.includes('qualification') ||
    clean.includes('certification') ||
    clean.includes('why should i trust') ||
    clean.includes('degree')
  ) {
    return {
      replyText:
        "Sheharyar holds Cisco Certified Network Professional, Cisco CyberOps, and Google Cloud Vertex AI credentials, backed by over 5 years of remote engineering and 1,200+ completed deployments. All client projects are executed under bilateral NDA with a 30-day warranty. Would you like to discuss your project requirements?"
    };
  }

  // 21. "Who is Sheharyar?"
  if (clean.includes('who is sheharyar') || clean.includes('about sheharyar')) {
    return {
      replyText:
        "Sheharyar Siraj is a Senior Web Systems Architect and Agentic AI Engineer who builds high-speed web platforms, autonomous AI voice bots, and automated business workflows. He works directly with enterprise clients and digital agencies worldwide under bilateral NDA. What kind of project are you looking to build?"
    };
  }

  // 22. General Discovery Fallback
  return {
    replyText:
      "I hear you! Could you share a bit more about what you're aiming to build, your target timeline, and what budget range you have in mind? Sheharyar provides architectural scoping with a guaranteed 2-hour review."
  };
}

function inferBudget(query: string): string {
  const match = query.match(/(\$?\d[\d,]*\s*(?:k|usd|dollars)?)/i);
  return match ? match[1] : 'Unspecified';
}

function inferRecommendedArchitecture(history: VoiceMessageTurn[], userQuery: string): string {
  const combined = (history.map((h) => h.text).join(' ') + ' ' + userQuery).toLowerCase();
  if (combined.includes('agentic') || combined.includes('langgraph')) {
    return 'Agentic AI & Multi-Agent Applications';
  }
  if (combined.includes('rag') || combined.includes('vector')) {
    return 'Contextual RAG Chatbots & Vector Search';
  }
  if (combined.includes('data science') || combined.includes('machine learning')) {
    return 'Data Science & Predictive ML Pipelines';
  }
  if (combined.includes('2 day') || combined.includes('vibe coding') || combined.includes('urgent')) {
    return 'Rapid Vibe Coding & React MVP';
  }
  if (combined.includes('voice') || combined.includes('phone') || combined.includes('vapi')) {
    return 'Autonomous AI Voice Telephony (Vapi/Twilio)';
  }
  if (combined.includes('wordpress') || combined.includes('website')) {
    return 'Custom WordPress VIP Systems Engineering';
  }
  if (combined.includes('excel') || combined.includes('power bi') || combined.includes('data')) {
    return 'Data Analytics & Power BI Dashboards';
  }
  if (combined.includes('n8n') || combined.includes('automation') || combined.includes('zapier')) {
    return 'Self-Hosted n8n Workflow Clusters';
  }
  if (combined.includes('saas') || combined.includes('mvp')) {
    return 'Custom SaaS Architecture & MVP Development';
  }
  if (combined.includes('agency') || combined.includes('white-label')) {
    return 'White-Label Agency Subcontracting Retainer';
  }
  return 'Enterprise Architectural Consultation & Scoping';
}
