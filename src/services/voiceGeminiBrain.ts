/**
 * Central LLM Brain & Multi-Turn Conversation Engine for Elena Voice Assistant
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
 * 1. Zero Pricing Disclosures (Always direct to WhatsApp/Email; ask for budget)
 * 2. Ask Client Name First & Address by Name Across Turns
 * 3. Session Memory Tracking (Name, Scope, Budget, Timeline, Email, WhatsApp)
 * 4. Contact Collection -> Auto-open Pre-filled Inquiry Form
 * 5. 2-Day Urgency -> Vibe Coding & React MVP
 * 6. 2-3 Sentences per turn (Voice Pacing)
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

export interface SessionClientMemory {
  clientName?: string;
  email?: string;
  phoneOrWhatsApp?: string;
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
  updatedMemory?: SessionClientMemory;
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

// System Prompt for Elena Solutions Architect
export const ELENA_SOLUTIONS_ARCHITECT_SYSTEM_PROMPT = `[IDENTITY & ROLE]
Your name is Elena. You are the professional Executive Solutions Architect and Technical Operations Manager for Sheharyar Siraj.
You represent Sheharyar Siraj (${ARCHITECT_IDENTITY.portfolioUrl}).
Always speak about Sheharyar in the third person (he, him, Sheharyar). You are his dedicated technical voice assistant.

[CRITICAL VOICE PACING & BREVITY - STRICT RULE]
- Voice Pacing: Keep every response strictly between 2 to 3 natural, articulate sentences.
- Never give long, lecture-like paragraphs.
- Speak in fluid conversational English. You understand and naturally converse with Urdu/Hindi inquiries as well.
- NEVER use markdown asterisks (*), hashtags (#), or bullet points in your speech output.

[CLIENT NAME FIRST & PERSONALIZATION - STRICT RULE]
- Always know the client's name. If the client has not shared their name yet, politely ask: "Before we begin, may I have your name please?"
- When the client shares their name, greet them warmly: "Nice to meet you, [Name]! How can I assist you with your project today?"
- Address the client by their name across all subsequent conversational turns (e.g., "[Name], project pricing depends strictly...", "Got it, [Name]! I have noted your budget...").

[CONSULTATIVE ARCHITECTURE COMPARISON - PROACTIVE GUIDANCE]
When a client shares their project requirements, proactively guide their thinking by contrasting our two tailored architecture options:
1. Website Inquiry:
   Compare Option A (Custom WordPress VIP) vs Option B (Rapid Vibe Coding in React):
   - Custom WordPress VIP: Complete freedom, visual CMS admin panel so the client can easily edit pages, blogs, and images themselves with 0 page-builder bloat.
   - Rapid Vibe Coding (React): Ultra-fast 2-day delivery, blazing production performance and Core Web Vitals, but developer-managed code (no self-editing CMS dashboard).
   - Ask the client: "Would you prefer the easy self-editing freedom of WordPress, or the blazing-fast 2-day turnaround of custom React Vibe Coding?"
2. Data & Analytics Inquiry:
   Compare Option A (Executive Power BI & Excel Dashboards with dynamic pivot tables) vs Option B (Automated Python Machine Learning Pipelines for predictive analytics).
   - Ask: "Would you like an executive visual Power BI dashboard, or predictive machine learning models in Python?"
3. AI & Chatbot Inquiry:
   Compare Option A (Contextual RAG Chatbots on Pinecone/Qdrant with zero hallucination) vs Option B (Autonomous Multi-Agent LangGraph Systems with complex tool-calling).
   - Ask: "Are you looking for instant knowledge-base search, or fully autonomous multi-step agent workflows?"
4. E-Commerce Inquiry:
   Compare Option A (WooCommerce HPOS with full inventory CMS dashboard) vs Option B (Custom headless React/Next.js store with Stripe).
   - Ask: "Would you prefer a scalable WooCommerce store you can manage, or a custom headless React platform?"

[STRICT ZERO-PRICING GUARDRAIL - ABSOLUTE RULE]
- NEVER state prices, rates, costs, or fee ranges under ANY circumstances.
- If the client asks for pricing or rates ("how much do you charge?", "what does it cost?", "kitne paise honge?", "WordPress website ka price batao"):
  Respond strictly: "Project pricing depends strictly on your custom technical scope and architecture. You can connect directly with Sheharyar on WhatsApp at +92 313 2080033 or via email at sherryansari870@gmail.com for exact rates. In the meantime, what target budget do you have in mind?"

[GRACEFUL WRAP-UP & AUTOMATIC CALL TERMINATION]
- As you discuss requirements, note the client's budget and target timeline.
- Once scope and budget are discussed, ask for contact details: "To finalize your technical brief for Sheharyar, could you please share your email and WhatsApp number?"
- As soon as the client provides their email or phone/WhatsApp number, IMMEDIATELY call the function "submitClientInquiry" with all accumulated parameters (clientName, email, phoneOrWhatsApp, recommendedArchitecture, budgetRange, timeline, projectSummary).
- Confirm with a final farewell wrap-up: "Thank you, [Name]! I have documented your requirements for [Service] with your budget of [Budget] and dispatched the brief directly to Sheharyar's desk. He will review your scope and get in touch within 2 hours. Have a wonderful day!"
- Do NOT prolong the conversation or ask further questions after contact info is given. The system will auto-disconnect the call once your farewell is vocalized.

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
  currentUserMessage: string,
  currentMemory?: SessionClientMemory
): Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> {
  const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

  // Memory preamble if memory exists
  if (currentMemory && (currentMemory.clientName || currentMemory.budgetRange || currentMemory.recommendedArchitecture)) {
    contents.push({
      role: 'user',
      parts: [
        {
          text: `[System Context - Accumulated Client Memory]: Name=${currentMemory.clientName || 'Unknown'}, RecommendedArchitecture=${currentMemory.recommendedArchitecture || 'None'}, Budget=${currentMemory.budgetRange || 'Unspecified'}, Timeline=${currentMemory.timeline || 'Standard'}`
        }
      ]
    });
    contents.push({
      role: 'model',
      parts: [{ text: 'Understood. I will address the client appropriately using this context.' }]
    });
  }

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
  currentUserMessage: string,
  currentMemory: SessionClientMemory = {}
): Promise<BrainTurnResult> {
  const apiKey =
    (import.meta as any).env?.VITE_GEMINI_API_KEY ||
    (import.meta as any).env?.GEMINI_API_KEY ||
    (typeof process !== 'undefined' ? (process.env?.VITE_GEMINI_API_KEY || process.env?.GEMINI_API_KEY) : '');

  // If Gemini API Key is available, dispatch live to Gemini
  if (apiKey && apiKey.trim()) {
    const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash'];
    const geminiContents = formatGeminiContents(history, currentUserMessage, currentMemory);

    for (const model of models) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7000);

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const payload = {
          systemInstruction: {
            parts: [{ text: ELENA_SOLUTIONS_ARCHITECT_SYSTEM_PROMPT }]
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
              const mergedMemory: SessionClientMemory = {
                ...currentMemory,
                clientName: args.clientName || currentMemory.clientName,
                email: args.email || currentMemory.email,
                phoneOrWhatsApp: args.phoneOrWhatsApp || currentMemory.phoneOrWhatsApp,
                recommendedArchitecture: args.recommendedArchitecture || currentMemory.recommendedArchitecture,
                budgetRange: args.budgetRange || currentMemory.budgetRange,
                timeline: args.timeline || currentMemory.timeline,
                projectSummary: args.projectSummary || currentMemory.projectSummary
              };

              const nameGreeting = mergedMemory.clientName ? `, ${mergedMemory.clientName}` : '';
              return {
                replyText: `Thank you${nameGreeting}! I have documented your requirements with your budget of ${mergedMemory.budgetRange || 'your target tier'} and opened the project confirmation form on your screen. Sheharyar will review your brief within 2 hours.`,
                toolCall: {
                  name: 'submitClientInquiry',
                  args: {
                    clientName: mergedMemory.clientName || 'Valued Client',
                    email: mergedMemory.email || 'Provided on Call',
                    phoneOrWhatsApp: mergedMemory.phoneOrWhatsApp || '+92 313 2080033',
                    recommendedArchitecture: mergedMemory.recommendedArchitecture || 'Custom Engineering Scoping',
                    budgetRange: mergedMemory.budgetRange || 'Unspecified',
                    timeline: mergedMemory.timeline || 'Standard',
                    projectSummary: mergedMemory.projectSummary || currentUserMessage
                  }
                },
                updatedMemory: mergedMemory
              };
            }
          }

          if (part?.text && part.text.trim()) {
            // Also passively update memory from user turn
            const updatedMemory = passivelyUpdateMemory(currentUserMessage, history, currentMemory);
            return {
              replyText: cleanSpeechOutput(part.text.trim()),
              updatedMemory
            };
          }
        }
      } catch (err) {
        console.warn(`[Gemini ${model} Voice Dispatch Notice]:`, err);
      }
    }
  }

  // Autonomous Grounded Knowledge Fallback
  return runAutonomousSolutionsBrain(history, currentUserMessage, currentMemory);
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
 * Extracts client name from user query
 */
export function extractClientName(
  query: string,
  lastModelTurn?: string,
  existingName?: string
): string | undefined {
  if (existingName && existingName.trim()) return existingName.trim();

  // Pattern 1: English & Roman Urdu: "My name is [Name]", "Mera naam [Name] hai", "I am [Name]", "Call me [Name]", "Main hoon [Name]"
  const match = query.match(/(?:my name is|i am|i'm|call me|this is|mera naam|naam hai|main hoon|mai hoon)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i);
  const stopWords = [
    'interested', 'looking', 'here', 'developer', 'calling', 'asking',
    'fine', 'good', 'ready', 'happy', 'trying', 'seeking', 'wondering',
    'someone', 'a client', 'client', 'ek', 'aik', 'theek', 'acha', 'acha hoon'
  ];
  if (match) {
    const cleanName = match[1].trim().replace(/\s+(?:hai|hon|hoon)$/i, '');
    if (!stopWords.includes(cleanName.toLowerCase()) && cleanName.length >= 2) {
      return cleanName;
    }
  }

  // Pattern 2: Elena just asked for the name in previous turn
  if (
    lastModelTurn &&
    (lastModelTurn.toLowerCase().includes('name please') ||
      lastModelTurn.toLowerCase().includes('your name') ||
      lastModelTurn.toLowerCase().includes('may i have your name') ||
      lastModelTurn.toLowerCase().includes('aapka naam'))
  ) {
    const candidate = query.trim().replace(/^(?:mera naam|my name is|i am|main hoon)\s+/i, '').replace(/\s+(?:hai|hoon)$/i, '').trim();
    const words = candidate.split(/\s+/);
    if (words.length <= 3 && /^[A-Za-z\s.]+$/.test(candidate)) {
      const lower = candidate.toLowerCase();
      if (!['yes', 'no', 'hi', 'hello', 'hey', 'ok', 'okay', 'sure', 'fine', 'yeah', 'theek', 'acha', 'salam', 'assalam'].includes(lower)) {
        return candidate;
      }
    }
  }

  return undefined;
}

/**
 * Extracts budget amount from user query
 */
export function extractBudget(query: string): string | undefined {
  const match =
    query.match(/(?:[\$]|usd|rs\.?|pkr|eur|£)\s*(\d[\d,]*(?:\.\d+)?\s*(?:k|thousand|million)?)/i) ||
    query.match(/(\d[\d,]*(?:\.\d+)?\s*(?:k|usd|dollars|bucks|pkr|rs))/i) ||
    query.match(/(?:budget is|budget of|around|under|about|upto|up to)\s*(?:about|around)?\s*(\$?\d[\d,]*(?:\.\d+)?\s*(?:k|thousand|million|usd|dollars)?)/i) ||
    query.match(/\b(\d{3,6})\b/);
  return match ? match[0].trim() : undefined;
}

/**
 * Passively extracts data from user message to update memory
 */
function passivelyUpdateMemory(
  userQuery: string,
  history: VoiceMessageTurn[],
  currentMemory: SessionClientMemory = {}
): SessionClientMemory {
  const memory: SessionClientMemory = { ...currentMemory };
  const lastModelTurn = history.length > 0 && history[history.length - 1].role === 'model'
    ? history[history.length - 1].text
    : undefined;

  // Name
  if (!memory.clientName) {
    const name = extractClientName(userQuery, lastModelTurn, memory.clientName);
    if (name) memory.clientName = name;
  }

  // Budget
  const budget = extractBudget(userQuery);
  if (budget) memory.budgetRange = budget;

  // Timeline
  const clean = userQuery.toLowerCase();
  if (clean.includes('2 day') || clean.includes('urgent') || clean.includes('asap')) {
    memory.timeline = '2 Days (Urgent)';
  } else if (clean.includes('1 week') || clean.includes('one week')) {
    memory.timeline = '1 Week';
  } else if (clean.includes('month')) {
    memory.timeline = '1 Month';
  }

  // Architecture
  const arch = inferRecommendedArchitecture(history, clean);
  if (arch && arch !== 'Enterprise Architectural Consultation & Scoping') {
    memory.recommendedArchitecture = arch;
  }

  // Email & Phone
  const emailMatch = userQuery.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  if (emailMatch) memory.email = emailMatch[1];

  const phoneMatch = userQuery.match(/(\+?\d[\d\s-]{7,}\d)/);
  if (phoneMatch) memory.phoneOrWhatsApp = phoneMatch[1];

  return memory;
}

/**
 * Autonomous Grounded Solutions Brain (Zero-Key Autonomy)
 * Implements:
 * 1. Client Name Capture & Personalization Across All Turns
 * 2. Strict Pricing Guardrail (Zero prices; direct to WhatsApp/Email; ask for budget)
 * 3. Session Memory (Name, Scope, Budget, Timeline, Email, WhatsApp)
 * 4. Automatic Form Launch on Contact Submission
 * 5. Comprehensive Knowledge of All Site Services, Tools & Games
 */
export function runAutonomousSolutionsBrain(
  history: VoiceMessageTurn[],
  userQuery: string,
  currentMemory: SessionClientMemory = {}
): BrainTurnResult {
  const clean = userQuery.toLowerCase().trim();
  const memory: SessionClientMemory = { ...currentMemory };

  const lastModelTurn = history.length > 0 && history[history.length - 1].role === 'model'
    ? history[history.length - 1].text
    : undefined;

  // 1. Extract & Track Client Name
  let nameWasJustDiscovered = false;
  if (!memory.clientName) {
    const discoveredName = extractClientName(userQuery, lastModelTurn);
    if (discoveredName) {
      memory.clientName = discoveredName;
      nameWasJustDiscovered = true;
    }
  }

  const namePrefix = memory.clientName ? `${memory.clientName}, ` : '';

  // 2. Extract & Track Budget
  const detectedBudget = extractBudget(userQuery);
  if (detectedBudget) {
    memory.budgetRange = detectedBudget;
  }

  // 3. Extract & Track Timeline
  if (clean.includes('2 day') || clean.includes('urgent') || clean.includes('asap')) {
    memory.timeline = '2 Days (Urgent)';
  } else if (clean.includes('1 week') || clean.includes('one week')) {
    memory.timeline = '1 Week';
  } else if (clean.includes('month')) {
    memory.timeline = '1 Month';
  }

  // 4. Extract & Track Technical Architecture
  const detectedArch = inferRecommendedArchitecture(history, clean);
  if (detectedArch && detectedArch !== 'Enterprise Architectural Consultation & Scoping') {
    memory.recommendedArchitecture = detectedArch;
  }

  // 5. Contact Extraction & Buying Intent -> Auto-Open Lead Form & Conclude Call
  const emailMatch = userQuery.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  const phoneMatch = userQuery.match(/(\+?\d[\d\s-]{7,}\d)/);

  if (emailMatch || phoneMatch) {
    if (emailMatch) memory.email = emailMatch[1];
    if (phoneMatch) memory.phoneOrWhatsApp = phoneMatch[1];

    const finalClientName = memory.clientName || 'Valued Client';
    const finalEmail = memory.email || 'Provided on Call';
    const finalPhone = memory.phoneOrWhatsApp || '+92 313 2080033';
    const finalArch = memory.recommendedArchitecture || inferRecommendedArchitecture(history, clean);
    const finalBudget = memory.budgetRange || inferBudget(userQuery);
    const finalTimeline = memory.timeline || (clean.includes('2 day') || clean.includes('urgent') ? '2 Days' : 'Standard');

    return {
      replyText: `Thank you, ${finalClientName}! I have documented your requirements for ${finalArch} with your budget of ${finalBudget !== 'Unspecified' ? finalBudget : 'your target tier'} and dispatched your brief directly to Sheharyar's desk. He will review your scope and get in touch within 2 hours. Have a wonderful day!`,
      toolCall: {
        name: 'submitClientInquiry',
        args: {
          clientName: finalClientName,
          email: finalEmail,
          phoneOrWhatsApp: finalPhone,
          recommendedArchitecture: finalArch,
          budgetRange: finalBudget,
          timeline: finalTimeline,
          projectSummary: userQuery
        }
      },
      updatedMemory: memory
    };
  }

  // 6. If Name was just provided by the user in this turn without additional service query:
  if (nameWasJustDiscovered) {
    const isOnlyName = clean.length < 45 && !clean.includes('website') && !clean.includes('price') && !clean.includes('excel') && !clean.includes('ai') && !clean.includes('agent');
    if (isOnlyName) {
      return {
        replyText: `Nice to meet you, ${memory.clientName}! Sheharyar specializes in custom WordPress VIP platforms, autonomous AI bots, and automated data pipelines. What kind of project are you looking to build?`,
        updatedMemory: memory
      };
    }
  }

  // 7. Strict Pricing Guardrail - Never quote prices! Always direct to WhatsApp/Email & ask for budget
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
      replyText: `${namePrefix}project pricing depends strictly on your custom technical requirements and scope. You can discuss exact rates directly with Sheharyar via WhatsApp at +92 313 2080033 or email at sherryansari870@gmail.com. In the meantime, what target budget range do you have in mind?`,
      updatedMemory: memory
    };
  }

  // 8. If user JUST stated a budget (e.g. "$1500", "my budget is 2k", "under 1000 dollars"):
  const isBudgetTurn =
    detectedBudget &&
    (clean.includes('budget') || clean.startsWith('$') || clean.match(/^\d+/) || clean.includes('dollars') || clean.includes('usd') || clean.includes('around') || clean.includes('under'));

  if (isBudgetTurn && !clean.includes('website') && !clean.includes('excel') && !clean.includes('agent')) {
    return {
      replyText: `Got it${memory.clientName ? ', ' + memory.clientName : ''}! I have noted your budget of ${memory.budgetRange}. To prepare your project brief and schedule Sheharyar's review, could you please share your email and WhatsApp number?`,
      updatedMemory: memory
    };
  }

  // 9. Specific Architecture Choices & Consultative Selection
  // A. WordPress Selection
  if (
    clean.includes('wordpress') ||
    clean.includes('wp') ||
    clean.includes('cms') ||
    clean.includes('edit myself') ||
    clean.includes('customization') ||
    clean.includes('option a') && (history.map(h => h.text).join(' ').toLowerCase().includes('wordpress'))
  ) {
    memory.recommendedArchitecture = 'Custom WordPress VIP Systems Engineering';
    return {
      replyText: `${namePrefix}excellent choice! Custom WordPress VIP gives you full visual admin editing freedom and sub-500ms speed with zero page builder bloat. What target budget range do you have in mind for this project?`,
      updatedMemory: memory
    };
  }

  // B. Vibe Coding / React Selection
  if (
    clean.includes('vibe coding') ||
    clean.includes('vibe') ||
    clean.includes('2 day') ||
    clean.includes('urgent') ||
    clean.includes('option b') && (history.map(h => h.text).join(' ').toLowerCase().includes('vibe coding'))
  ) {
    memory.recommendedArchitecture = 'Rapid Vibe Coding & React MVP';
    return {
      replyText: `${namePrefix}great choice! Rapid Vibe Coding in React gives you ultra-fast production performance and a guaranteed 2-day delivery. What target budget range do you have in mind for this project?`,
      updatedMemory: memory
    };
  }

  // C. Power BI / Excel Selection
  if (clean.includes('power bi') || clean.includes('excel') || clean.includes('pivot table') || clean.includes('dashboard')) {
    memory.recommendedArchitecture = 'Data Analytics & Power BI Dashboards';
    return {
      replyText: `${namePrefix}excellent choice! We build automated executive Power BI dashboards and dynamic Excel models with automated data refresh. What target budget range do you have in mind?`,
      updatedMemory: memory
    };
  }

  // D. Machine Learning / Python Selection
  if (clean.includes('data science') || clean.includes('machine learning') || clean.includes('predictive') || clean.includes('churn')) {
    memory.recommendedArchitecture = 'Data Science & Predictive ML Pipelines';
    return {
      replyText: `${namePrefix}great choice! We engineer production Python ML inference and predictive customer models. What target budget range do you have in mind?`,
      updatedMemory: memory
    };
  }

  // E. RAG Chatbot Selection
  if (clean.includes('rag') || clean.includes('vector') || clean.includes('pinecone') || clean.includes('qdrant') || clean.includes('document search')) {
    memory.recommendedArchitecture = 'Contextual RAG Chatbots & Vector Search';
    return {
      replyText: `${namePrefix}excellent choice! We connect vector databases like Pinecone and Qdrant to your documents for zero-hallucination answers. What target budget range do you have in mind?`,
      updatedMemory: memory
    };
  }

  // F. Multi-Agent / LangGraph Selection
  if (clean.includes('agentic') || clean.includes('langgraph') || clean.includes('multi agent') || clean.includes('autonomous agent')) {
    memory.recommendedArchitecture = 'Agentic AI & Multi-Agent Applications';
    return {
      replyText: `${namePrefix}great choice! We develop deterministic multi-agent systems with LangGraph for autonomous research and tool execution. What target budget range do you have in mind?`,
      updatedMemory: memory
    };
  }

  // 10. General Service Scoping with Consultative 2-Option Comparisons
  // A. General Website Inquiries -> Proactive Comparison
  if (clean.includes('website') || clean.includes('site') || clean.includes('web page') || clean.includes('portfolio') || clean.includes('web')) {
    return {
      replyText: `${namePrefix}for website development, we offer two distinct engineering paths: Custom WordPress VIP, where you get complete freedom and an easy visual admin panel to edit pages and content yourself; or Rapid Vibe Coding in React, which delivers an ultra-fast production website in just 2 days without a CMS. Which direction would you prefer for your project?`,
      updatedMemory: memory
    };
  }

  // B. General Data & Analytics Inquiries -> Proactive Comparison
  if (clean.includes('data') || clean.includes('analytics') || clean.includes('reporting') || clean.includes('numbers') || clean.includes('sheet')) {
    return {
      replyText: `${namePrefix}for data solutions, we engineer two tailored paths: Executive Power BI and automated Excel dashboards with dynamic pivot reporting for your team; or automated Python ML pipelines for predictive customer analytics. Which of these fits your business needs?`,
      updatedMemory: memory
    };
  }

  // C. General AI & Chatbot Inquiries -> Proactive Comparison
  if (clean.includes('ai') || clean.includes('bot') || clean.includes('chatbot') || clean.includes('assistant')) {
    return {
      replyText: `${namePrefix}for AI systems, we engineer two tailored tiers: Contextual RAG Chatbots connected to your knowledge base with zero hallucination; or Autonomous Agentic AI using LangGraph for multi-step tasks and tool-calling. Are you looking for instant knowledge search, or autonomous task execution?`,
      updatedMemory: memory
    };
  }

  // D. General E-Commerce Inquiries -> Proactive Comparison
  if (clean.includes('ecommerce') || clean.includes('shop') || clean.includes('store') || clean.includes('selling') || clean.includes('woocommerce')) {
    return {
      replyText: `${namePrefix}for e-commerce, we build high-concurrency WooCommerce HPOS stores with an easy product management dashboard; or custom headless React storefronts with Stripe for bespoke subscription models. Which option aligns best with your store?`,
      updatedMemory: memory
    };
  }

  // 10. Interactive Code Arcade & Mini-Games Queries
  if (
    clean.includes('game') ||
    clean.includes('arcade') ||
    clean.includes('boss fight') ||
    clean.includes('puzzle') ||
    clean.includes('khel') ||
    clean.includes('play')
  ) {
    return {
      replyText: `${namePrefix}our website features an interactive Code Arcade at /arcade/. You can play Puzzle Mode for grid-based code logic or Boss Fighter Mode where you battle algorithmic bosses with real-time code execution across JavaScript, Python, and React. Have you checked it out yet?`,
      updatedMemory: memory
    };
  }

  // 11. Interactive Developer Tools Queries
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
      replyText: `${namePrefix}we have 20 free interactive developer tools live at /tools/, including our Local Schema Generator, WordPress Database Bloat Estimator, Voice Agent ROI Calculator, and n8n Webhook Tester. Which specific utility or engineering task are you trying to test?`,
      updatedMemory: memory
    };
  }

  // 12. Agentic AI & Autonomous Multi-Agent Applications
  if (
    clean.includes('agentic') ||
    clean.includes('agentic ai') ||
    clean.includes('multi agent') ||
    clean.includes('langgraph') ||
    clean.includes('autonomous agent') ||
    clean.includes('ai agents')
  ) {
    return {
      replyText: `${namePrefix}we build deterministic multi-agent AI systems and autonomous workflows using LangGraph and advanced LLM tool-calling. These stateful agents handle multi-step research, automated decision making, and self-correcting error recovery. What specific autonomous workflow or agent task are you looking to automate?`,
      updatedMemory: memory
    };
  }

  // 13. Contextual AI Chatbots & RAG Systems
  if (
    clean.includes('rag') ||
    clean.includes('vector database') ||
    clean.includes('pinecone') ||
    clean.includes('qdrant') ||
    clean.includes('document search') ||
    clean.includes('knowledge base')
  ) {
    return {
      replyText: `${namePrefix}we engineer contextual RAG systems and intelligent chatbots with zero hallucination. We connect your enterprise documents, knowledge bases, and vector databases like Pinecone and Qdrant to deliver instant, factual search for customers. What type of documents or customer data do you want your bot to answer from?`,
      updatedMemory: memory
    };
  }

  // 14. Data Science & Predictive ML
  if (
    clean.includes('data science') ||
    clean.includes('machine learning') ||
    clean.includes('predictive') ||
    clean.includes('churn') ||
    clean.includes('clustering')
  ) {
    return {
      replyText: `${namePrefix}we develop production Data Science pipelines and predictive machine learning models in Python. From customer churn forecasting and lifetime value modeling to automated feature stores and ML inference APIs, we turn your raw data into predictive intelligence. What machine learning or data science outcome are you aiming for?`,
      updatedMemory: memory
    };
  }

  // 15. Data Analytics & Business Intelligence (Power BI, Excel, SQL)
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
      replyText: `${namePrefix}we transform raw spreadsheets and numbers into automated executive dashboards and clean reporting models. We build interactive Power BI dashboards, automated Excel reports with dynamic pivot analysis, and automated SQL query pipelines. What kind of spreadsheet data or business metrics are you looking to track and visualize?`,
      updatedMemory: memory
    };
  }

  // 16. Autonomous AI Voice Telephony
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
      replyText: `${namePrefix}we deploy conversational AI phone agents that answer incoming calls 24/7 with natural, sub-600ms latency. They handle customer inquiries, book appointments directly into Google Calendar or Cal.com, and sync notes to your CRM. Are you looking for an inbound phone receptionist or outbound automated calling?`,
      updatedMemory: memory
    };
  }

  // 17. Workflow Automation & n8n Clusters
  if (
    clean.includes('n8n') ||
    clean.includes('automation') ||
    clean.includes('zapier') ||
    clean.includes('make.com') ||
    clean.includes('workflow')
  ) {
    return {
      replyText: `${namePrefix}we engineer robust automated workflows using self-hosted n8n Docker clusters and Make.com to eliminate manual repetitive work. We connect your apps, CRMs, and databases with zero data loss while eliminating expensive monthly Zapier fees. Which tools or tasks are you looking to connect and automate?`,
      updatedMemory: memory
    };
  }

  // 18. Custom SaaS Architecture & MVP Development
  if (
    clean.includes('saas') ||
    clean.includes('build a saas') ||
    clean.includes('mvp') ||
    clean.includes('software product') ||
    clean.includes('web app')
  ) {
    return {
      replyText: `${namePrefix}we build custom full-stack SaaS applications and scalable MVPs using Next.js, React, and PostgreSQL. We architect multi-tenant database isolation, Stripe recurring subscription billing, and secure authentication. What is the core functionality of the SaaS platform you are planning to build?`,
      updatedMemory: memory
    };
  }

  // 19. WooCommerce HPOS & High-Concurrency E-Commerce
  if (
    clean.includes('woocommerce') ||
    clean.includes('ecommerce') ||
    clean.includes('online store') ||
    clean.includes('shop') ||
    clean.includes('hpos') ||
    clean.includes('shopify')
  ) {
    return {
      replyText: `${namePrefix}we engineer high-concurrency e-commerce stores designed for seamless checkout and high conversion. We specialize in WooCommerce HPOS architecture, Stripe and PayPal integrations, and database tuning that easily handles over 10,000 orders a day. Are you launching a new online store, or looking to scale an existing shop?`,
      updatedMemory: memory
    };
  }

  // 20. Custom WordPress VIP Systems
  if (
    clean.includes('wordpress') ||
    clean.includes('wp') ||
    clean.includes('gutenberg') ||
    clean.includes('cms') ||
    clean.includes('website')
  ) {
    return {
      replyText: `${namePrefix}we build custom, high-speed websites designed to convert visitors into clients. Whether you need a fresh WordPress VIP build with sub-500ms TTFB or a modern React platform, we ensure 95+ Core Web Vitals and zero page builder bloat. Are you looking to launch urgently or build an ongoing content platform?`,
      updatedMemory: memory
    };
  }

  // 21. AI Video Ads & Synthetic UGC
  if (
    clean.includes('video ad') ||
    clean.includes('ugc') ||
    clean.includes('ai video') ||
    clean.includes('synthetic video')
  ) {
    return {
      replyText: `${namePrefix}we produce automated, high-converting AI video ads and synthetic UGC creatives for TikTok, Instagram Reels, and YouTube Shorts. We handle automated scriptwriting, synthetic voice cloning, and realistic avatar generation to scale your ad testing. What product or offer are you looking to create video ads for?`,
      updatedMemory: memory
    };
  }

  // 22. White-Label Agency Subcontracting
  if (
    clean.includes('white label') ||
    clean.includes('agency') ||
    clean.includes('subcontract') ||
    clean.includes('overflow') ||
    clean.includes('retainer')
  ) {
    return {
      replyText: `${namePrefix}we act as a dedicated behind-the-scenes engineering partner for digital and marketing agencies under strict bilateral NDA. We handle complex WordPress VIP builds, AI voice telephony, and n8n automations with zero junior management overhead. What kind of overflow development capacity is your agency looking for?`,
      updatedMemory: memory
    };
  }

  // 23. Web Scraping & Data Pipelines
  if (
    clean.includes('scraping') ||
    clean.includes('scraper') ||
    clean.includes('extract data') ||
    clean.includes('pipeline')
  ) {
    return {
      replyText: `${namePrefix}we build resilient web scraping pipelines and automated database ETL with headless browser execution and anti-bot bypass. From harvesting competitor pricing to market intelligence extraction, we turn web data into revenue assets. What data sources or websites are you looking to extract?`,
      updatedMemory: memory
    };
  }

  // 24. Buying Intent Phrases
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
      replyText: `${namePrefix}we would love to help you build this! What target budget and timeline do you have in mind, and what is the best email or WhatsApp number to reach you?`,
      updatedMemory: memory
    };
  }

  // 25. Small Talk & Greetings
  if (
    clean.includes('how are you') ||
    clean.includes("how's it going") ||
    clean.includes('kaise ho') ||
    clean.includes('kya haal')
  ) {
    return {
      replyText: `I'm doing great, thanks for asking! This is Elena, assistant to Sheharyar Siraj. What kind of project or technical challenge are you exploring today?`,
      updatedMemory: memory
    };
  }

  if (
    clean.includes('who are you') ||
    clean.includes('who is elena') ||
    clean.includes('who is zack') ||
    clean.includes('what do you do')
  ) {
    return {
      replyText: `I am Elena, Executive Solutions Architect for Sheharyar Siraj. I help qualify technical architectures, compare project trade-offs, and manage Sheharyar's engineering schedule. How can I assist you with your project today?`,
      updatedMemory: memory
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
    if (!memory.clientName) {
      return {
        replyText: `Hi, thanks for calling! This is Elena, assistant to Sheharyar Siraj. Before we begin, may I have your name please?`,
        updatedMemory: memory
      };
    }
    return {
      replyText: `Hi ${memory.clientName}! How can I assist you with your project scoping today?`,
      updatedMemory: memory
    };
  }

  if (clean.includes('thank you') || clean.includes('thanks') || clean.includes('shukriya')) {
    return {
      replyText: `You're very welcome${memory.clientName ? ', ' + memory.clientName : ''}! Feel free to ask about any specific architecture, or reach Sheharyar directly on WhatsApp at +92 313 2080033.`,
      updatedMemory: memory
    };
  }

  // 26. Explicit Credentials Query (ONLY volunteer CV info if user explicitly asks)
  if (
    clean.includes('credential') ||
    clean.includes('qualification') ||
    clean.includes('certification') ||
    clean.includes('why should i trust') ||
    clean.includes('degree')
  ) {
    return {
      replyText: `Sheharyar holds Cisco Certified Network Professional, Cisco CyberOps, and Google Cloud Vertex AI credentials, backed by over 5 years of remote engineering and 1,200+ completed deployments. All client projects are executed under bilateral NDA with a 30-day warranty. Would you like to discuss your project requirements?`,
      updatedMemory: memory
    };
  }

  // 27. "Who is Sheharyar?"
  if (clean.includes('who is sheharyar') || clean.includes('about sheharyar')) {
    return {
      replyText: `Sheharyar Siraj is a Senior Web Systems Architect and Agentic AI Engineer who builds high-speed web platforms, autonomous AI voice bots, and automated business workflows. He works directly with enterprise clients and digital agencies worldwide under bilateral NDA. What kind of project are you looking to build?`,
      updatedMemory: memory
    };
  }

  // 28. General Discovery Fallback
  return {
    replyText: `${namePrefix}could you share a bit more about what you're aiming to build, your target timeline, and what budget range you have in mind? Sheharyar provides architectural scoping with a guaranteed 2-hour review.`,
    updatedMemory: memory
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
  if (combined.includes('excel') || combined.includes('power bi') || combined.includes('reporting') || combined.includes('sheet') || combined.includes('dashboard')) {
    return 'Data Analytics & Power BI Dashboards';
  }
  if (combined.includes('woocommerce') || combined.includes('ecommerce') || combined.includes('shop') || combined.includes('store')) {
    return 'WooCommerce HPOS & High-Concurrency E-Commerce';
  }
  if (combined.includes('wordpress') || combined.includes('website') || combined.includes('web')) {
    return 'Custom WordPress VIP Systems Engineering';
  }
  if (combined.includes('n8n') || combined.includes('automation') || combined.includes('zapier')) {
    return 'Self-Hosted n8n Workflow Clusters';
  }
  if (combined.includes('saas') || combined.includes('mvp')) {
    return 'Custom SaaS Architecture & MVP Development';
  }
  if (combined.includes('video ad') || combined.includes('ugc')) {
    return 'AI Video Ads & Synthetic UGC';
  }
  if (combined.includes('agency') || combined.includes('white-label')) {
    return 'White-Label Agency Subcontracting Retainer';
  }
  return 'Enterprise Architectural Consultation & Scoping';
}
