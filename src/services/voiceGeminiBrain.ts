/**
 * Central LLM Brain & Multi-Turn Conversation Engine for Zack Voice Assistant
 * 
 * Powered by Google Gemini with native Function Calling (`submitClientInquiry`),
 * dynamic Ground Truth Knowledge ingestion, and strict Anti-CV guardrails.
 */

import {
  GROUND_TRUTH_SYSTEM_CONTEXT,
  ARCHITECT_IDENTITY,
  CORE_CAPABILITIES,
  TECHNICAL_TRADE_OFFS
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
Always speak about Sheharyar in the third person (he, him, Sheharyar). You are his dedicated technical assistant.

[CRITICAL VOICE PACING & BREVITY - STRICT RULE]
- Voice Pacing: Keep every response strictly between 2 to 3 natural, articulate sentences.
- Speak in fluid conversational English.
- NEVER use markdown asterisks (*), hashtags (#), or bullet points in your speech output.

[STRICT ANTI-CV GUARDRAIL - CRITICAL]
- NEVER recite Sheharyar's biography, university degrees, or lists of certificates (CCNP, CyberOps, Vertex AI) unless the user EXPLICITLY asks: "What are his credentials?", "Who is Sheharyar?", or "Why should I trust you?".
- Prospects need consultative solutions, not resume boasting. Keep the focus 100% on diagnosing their technical goals.

[CONVERSATIONAL SOLUTIONS ADVISOR WORKFLOW]
1. Active Discovery:
   - When the user shares a goal (e.g., "I need a website", "We have Excel files", "I want an AI caller"):
   - Validate their need and ask clarifying questions on:
     a) Core technical goal or bottleneck
     b) Launch urgency (fast turnaround vs. complex long-term roadmap)
     c) Target scale and budget range.
2. Dynamic Trade-Off Guidance (Provide unbiased engineering advice):
   - Rapid Prototypes vs. Content Platforms: Guide between fast AI-assisted Vibe Coding / React frontends (ideal for validating workflows in 1-2 weeks) vs. Custom WordPress VIP setups (ideal when marketing teams need independent content editing with sub-500ms TTFB).
   - Reporting vs. Enterprise Intelligence: Guide between automated Excel macro models (ad-hoc audits under 50k rows) vs. dynamic Power BI / SQL data pipelines (multi-department automated KPI sync).
   - Real-Time Calling vs. Chatbots: Guide between autonomous Voice Telephony (inbound phone reception, urgent bookings via Vapi/Twilio) vs. On-site conversational chatbots (browsing visitors and technical Q&A).
3. Tool Execution:
   - As soon as the user provides their email, phone/WhatsApp number, or requests a proposal/consultation:
   - IMMEDIATELY call the function 'submitClientInquiry' with the clientName, email, phoneOrWhatsApp, recommendedArchitecture, budgetRange, timeline, and projectSummary.

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
    // If last turn was user, merge or append
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
    (typeof process !== 'undefined' ? process.env?.VITE_GEMINI_API_KEY : '');

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
 * Implements Active Discovery, Trade-Off Guidance, and Contact Extraction
 * directly derived from `src/data/groundTruthKnowledge.ts`.
 */
export function runAutonomousSolutionsBrain(
  history: VoiceMessageTurn[],
  userQuery: string
): BrainTurnResult {
  const clean = userQuery.toLowerCase().trim();

  // 1. Detect Contact Extraction & Buying Intent for submitClientInquiry Tool Trigger
  const emailMatch = userQuery.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  const phoneMatch = userQuery.match(/(\+?\d[\d\s-]{7,}\d)/);

  const isBuyingPhrase =
    clean.includes('hire') ||
    clean.includes('start project') ||
    clean.includes("let's start") ||
    clean.includes('lets start') ||
    clean.includes('i want this') ||
    clean.includes('can you do this') ||
    clean.includes('how much does it cost') ||
    clean.includes('send proposal') ||
    clean.includes('book call') ||
    clean.includes('ready to start');

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
          projectSummary: userQuery
        }
      }
    };
  }

  if (isBuyingPhrase) {
    return {
      replyText:
        "We would love to help you build this! I can have Sheharyar review your requirements and send a tailored plan within 2 hours. What is the best email address and phone number to reach you?"
    };
  }

  // 2. Small Talk & Greetings (Anti-CV: Max 2 Sentences, zero credentials)
  if (clean.includes('how are you') || clean.includes("how's it going") || clean.includes('kaise ho')) {
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

  if (clean === 'hi' || clean === 'hello' || clean === 'hey' || clean.startsWith('hey ') || clean.startsWith('hello ')) {
    return {
      replyText:
        "Hi, thanks for calling! This is Zack, assistant to Sheharyar Siraj. How can I assist you with your project scoping today?"
    };
  }

  if (clean.includes('thank you') || clean.includes('thanks')) {
    return {
      replyText:
        "You're very welcome! Feel free to ask about any specific architecture or connect directly with Sheharyar on WhatsApp at +92 313 2080033."
    };
  }

  // 3. Explicit Credentials Query (ONLY volunteer CV info if user explicitly asks)
  if (
    clean.includes('credential') ||
    clean.includes('qualification') ||
    clean.includes('certification') ||
    clean.includes('why should i trust') ||
    clean.includes('degree')
  ) {
    return {
      replyText:
        `Sheharyar holds Cisco Certified Network Professional, Cisco CyberOps, and Google Cloud Vertex AI credentials, backed by over 5 years of remote engineering and 1,200+ completed deployments. All client projects are executed under bilateral NDA with a 30-day warranty. Would you like to discuss your project requirements?`
    };
  }

  // 4. "Who is Sheharyar?" (Strict Anti-CV Rule: No degrees or certificate list)
  if (clean.includes('who is sheharyar') || clean.includes('about sheharyar')) {
    return {
      replyText:
        "Sheharyar Siraj is a Senior Web Systems Architect and Agentic AI Engineer who builds high-speed web platforms, autonomous AI voice bots, and automated business workflows. He works directly with enterprise clients and digital agencies worldwide under bilateral NDA. What kind of project are you looking to build?"
    };
  }

  // 5. Dynamic Trade-Off Queries (Module 2 Trade-Off Guidance)
  // Dimension 1: Rapid Prototypes vs Content Platforms
  if (
    clean.includes('vibe coding') ||
    clean.includes('prototype') ||
    (clean.includes('react') && (clean.includes('wordpress') || clean.includes('wp'))) ||
    clean.includes('wordpress vs') ||
    clean.includes('react vs')
  ) {
    return {
      replyText:
        `If you need to rapidly test software workflows, a fast React MVP allows validation in 1 to 2 weeks. However, if your marketing team needs independent content publishing with sub-500ms speeds, Custom WordPress VIP is the better foundation. Are you prioritizing rapid user testing or ongoing editorial management?`
    };
  }

  // Dimension 2: Reporting vs Enterprise Intelligence
  if (
    (clean.includes('excel') || clean.includes('sheet') || clean.includes('spreadsheet')) &&
    (clean.includes('power bi') || clean.includes('powerbi') || clean.includes('sql') || clean.includes('tableau') || clean.includes('bi'))
  ) {
    return {
      replyText:
        `For localized spreadsheets under 50,000 rows, automated Excel models with dynamic formulas work effectively. But for multi-channel business metrics and real-time executive visibility, Power BI with automated SQL pipelines eliminates manual errors. How large is your dataset, and where does your raw data originate?`
    };
  }

  // Dimension 3: Real-Time Calling vs Chatbots
  if (
    (clean.includes('voice') || clean.includes('phone') || clean.includes('call') || clean.includes('telephony')) &&
    (clean.includes('chat') || clean.includes('chatbot') || clean.includes('website bot') || clean.includes('site'))
  ) {
    return {
      replyText:
        `Deploy an autonomous voice agent if inbound phone reception, instant appointment scheduling, or urgent call triage are your main bottlenecks. But if your traffic is browsing on-site, a conversational chatbot captures visitor inquiries more seamlessly. Are your prospective clients calling by phone or browsing your website?`
    };
  }

  // 6. Capability Mapping (Fuzzy match against CORE_CAPABILITIES)
  for (const cap of CORE_CAPABILITIES) {
    const matchesPhrase = cap.commonUserPhrases.some((phrase) => clean.includes(phrase));
    if (matchesPhrase) {
      if (cap.id === 'custom-wordpress') {
        return {
          replyText:
            "Yes, we build custom, high-speed websites designed to convert visitors into clients. Whether you need a fresh WordPress VIP build or a modern React platform, we ensure sub-500ms load speeds and zero page builder bloat. Are you looking to build a new website from scratch, or upgrade an existing one?"
        };
      }
      if (cap.id === 'voice-telephony') {
        return {
          replyText:
            "Yes, we deploy conversational AI phone agents that answer calls 24/7 with natural, sub-600ms latency. They handle incoming inquiries, book appointments directly into your calendar, and sync notes straight to your CRM. Are you looking for an inbound phone receptionist or automated outbound calling?"
        };
      }
      if (cap.id === 'n8n-automation') {
        return {
          replyText:
            "Yes, we engineer robust automated workflows using self-hosted n8n clusters and Make.com to eliminate manual repetitive work. We connect your apps, CRMs, and databases with zero data loss while eliminating expensive monthly Zapier fees. Which tools or tasks are you looking to connect and automate?"
        };
      }
      if (cap.id === 'woocommerce-hpos') {
        return {
          replyText:
            "Yes, we engineer high-concurrency e-commerce stores designed for seamless checkout and high conversion. We specialize in WooCommerce HPOS architecture, Stripe and PayPal integrations, and database tuning that easily handles over 10,000 orders a day. Are you launching a new online store, or looking to scale an existing shop?"
        };
      }
      if (cap.id === 'data-analytics-bi') {
        return {
          replyText:
            "Yes, we turn raw spreadsheets and numbers into automated executive dashboards and clean reporting models. We build custom Power BI dashboards, automated Excel reports with dynamic pivot analysis, and SQL query pipelines. What kind of spreadsheet data or business metrics are you looking to track and visualize?"
        };
      }
      if (cap.id === 'white-label-subcontracting') {
        return {
          replyText:
            "Yes, we act as a dedicated behind-the-scenes engineering partner for digital and marketing agencies under strict bilateral NDA. We handle complex WordPress VIP builds, AI voice telephony, and n8n automations with zero junior management overhead. What kind of overflow development capacity is your agency looking for?"
        };
      }
      if (cap.id === 'data-pipelines-scraping') {
        return {
          replyText:
            "Yes, we build custom predictive machine learning models and resilient web scraping pipelines with anti-bot bypass. From forecasting customer churn to harvesting market competitor data, we turn web data into revenue assets. What data sources or websites are you looking to extract?"
        };
      }
    }
  }

  // 7. General Discovery Ask (Max 2 sentences)
  return {
    replyText:
      "I hear you! Could you share a bit more about what you're aiming to build, your current technical stack, or your target timeline? Sheharyar provides architectural scoping with a guaranteed 2-hour SLA."
  };
}

function inferRecommendedArchitecture(history: VoiceMessageTurn[], userQuery: string): string {
  const combined = (history.map((h) => h.text).join(' ') + ' ' + userQuery).toLowerCase();
  if (combined.includes('voice') || combined.includes('phone') || combined.includes('vapi')) {
    return 'Autonomous AI Voice Telephony (Vapi/Twilio)';
  }
  if (combined.includes('wordpress') || combined.includes('website') || combined.includes('woo')) {
    return 'Custom WordPress VIP & WooCommerce HPOS';
  }
  if (combined.includes('excel') || combined.includes('power bi') || combined.includes('data')) {
    return 'Data Analytics & Power BI BI Dashboards';
  }
  if (combined.includes('n8n') || combined.includes('automation') || combined.includes('zapier')) {
    return 'Self-Hosted n8n Workflow Clusters';
  }
  if (combined.includes('agency') || combined.includes('white-label')) {
    return 'White-Label Agency Subcontracting Retainer';
  }
  return 'Enterprise Architectural Consultation & Scoping';
}
