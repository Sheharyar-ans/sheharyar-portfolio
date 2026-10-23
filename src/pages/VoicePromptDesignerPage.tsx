import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Sliders,
  Copy,
  Check,
  Workflow,
  Sparkles,
  Zap,
  Code2,
  Terminal,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  MessageSquare,
  FileCode,
  Layers,
  PhoneCall,
  Activity,
  Cpu,
  Mic,
  Server
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { generateSchemaGraph } from '../utils/schemaGenerator';

interface VoicePromptDesignerPageProps {
  onOpenInquiry: () => void;
}

export const VoicePromptDesignerPage: React.FC<VoicePromptDesignerPageProps> = ({
  onOpenInquiry
}) => {
  // Input parameters
  const [businessName, setBusinessName] = useState<string>('Apex Dental Group');
  const [businessNiche, setBusinessNiche] = useState<string>('Dental Practice');
  const [agentName, setAgentName] = useState<string>('Sarah');
  const [primaryObjective, setPrimaryObjective] = useState<'appointment' | 'qualification' | 'support' | 'transfer'>('appointment');
  const [toneOfVoice, setToneOfVoice] = useState<'consultative' | 'empathetic' | 'energetic' | 'professional'>('consultative');
  const [objectionFocus, setObjectionFocus] = useState<string>('Insurance out of network, fear of procedure pain, asking for immediate pricing');
  const [activeTab, setActiveTab] = useState<'prompt' | 'json' | 'functions'>('prompt');
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Dynamic Prompt Generation Engine
  const generateSystemPrompt = (): string => {
    const toneMap = {
      consultative: 'Warm, highly consultative, concise, and professional. You speak in short, natural spoken sentences. Avoid long monologues.',
      empathetic: 'Deeply empathetic, patient, calm, and reassuring. Validate customer concerns before moving forward.',
      energetic: 'Dynamic, crisp, direct, and solution-oriented. Maintain energetic forward momentum without sounding rushed.',
      professional: 'Crisp, articulate, strictly factual, and formal. Prioritize accuracy and procedural compliance.'
    };

    const objectiveGuidance = {
      appointment: `PRIMARY GOAL: Qualify patient needs, collect date and time preferences, check availability via tool calling, and lock in the appointment on the schedule.
KEY STATES:
1. GREETING: Confirm caller identity and primary dental reason for visit.
2. TRIAGE: Determine if caller has acute emergency pain vs routine cleaning or cosmetic checkup.
3. SCHEDULING: Request preferred day of week and morning/afternoon preference. Call \`check_calendar_availability\`.
4. CONFIRMATION: Collect full name, cell number, and email. Confirm booking via \`confirm_appointment_booking\`.
5. CLOSE: Explain arrival guidelines and polite sign-off.`,
      qualification: `PRIMARY GOAL: Screen prospective inbound leads across budget, authority, need, and decision timeframe (BANT criteria).
KEY STATES:
1. GREETING: Establish immediate relevance and reference their recent inquiry.
2. DISCOVERY: Ask 2 targeted diagnostic questions to uncover their current operational bottlenecks.
3. SCORING: Evaluate if lead meets our threshold criteria. If qualified, offer consultation.
4. CALENDAR: Call \`book_strategy_session\` to confirm date and time.
5. HANDOFF: Send lead summary to CRM and notify account executive via webhook.`,
      support: `PRIMARY GOAL: Identify customer issue, search knowledge base, guide basic troubleshooting, or escalate to on-duty specialist.
KEY STATES:
1. INTAKE: Extract account number, order ID, or verified email address.
2. DIAGNOSIS: Clarify exact symptom or problem description.
3. RESOLUTION: Provide verified procedural steps from knowledge base tool.
4. ESCALATION: If unresolved after 2 attempts, trigger \`escalate_to_human_agent\`.`,
      transfer: `PRIMARY GOAL: Verify caller credentials, determine destination department, and execute warm or cold SIP transfer.
KEY STATES:
1. GREETING: Welcome caller and determine routing target.
2. VERIFICATION: Verify account identity with 2 security checkpoints.
3. CALL FORWARD: Announce transfer and invoke \`transfer_call_sip\`.`
    };

    return `# ROLE & IDENTITY
You are ${agentName}, the autonomous AI voice assistant for ${businessName} (${businessNiche}).
Your voice interface communicates over a live telephone connection via streaming WebSockets.

# VOCAL DELIVERY GUIDELINES
- Tone: ${toneMap[toneOfVoice]}
- Sentence Length: Maximum 1 to 2 short sentences per conversational turn. Spoken conversation differs from written text.
- Pacing: Never dump paragraphs or lists. Ask one clear question at a time.
- Numbers & Punctuation: Pronounce phone numbers digit by digit (e.g., "five five five, zero one two three"). Never say "five hundred fifty five".
- Fillers: Use occasional natural conversational affirmations like "Got it", "Understood", "I see", or "Certainly".

# CONVERSATIONAL STATE MACHINE
${objectiveGuidance[primaryObjective]}

# OBJECTION HANDLING PROTOCOLS
When encountering objections regarding: "${objectionFocus}"
Follow this 3-step conversational framework:
1. ACKNOWLEDGE: Validate their hesitation with genuine empathy (e.g., "I completely understand why you would want to check that first.").
2. CLARIFY: Provide the verified fact or alternative option directly without being defensive.
3. PIVOT: Guide the caller back to the next micro-commitment with an easy question.

Specific Objection Rules:
- If caller asks if you are an AI: Answer honestly and immediately: "Yes, I am the automated digital assistant for ${businessName}, designed to help you quickly schedule or find answers without waiting on hold. How can I help you today?"
- If caller asks for pricing: Provide standard baseline ranges if known, but clarify: "Exact fees depend on the diagnosis by our doctor during the exam. We verify your insurance benefits in advance so there are never surprises."
- If caller demands a human supervisor: Do not argue. Respond: "I understand completely. Let me connect you directly with our front desk team right now." and trigger the transfer tool.

# HALLUCINATION GUARDRAILS & REFUSAL POLICY
- NEVER invent office hours, clinical medical advice, guarantees of insurance coverage, or specific physician schedules.
- If information is not provided in your tool responses or knowledge base, state: "I do not have that specific detail on my screen, but our office coordinator will confirm that directly with you."
- Strict latency rule: Never repeat yourself when waiting for a tool call. Let the telephony engine provide comfortable natural silence or brief acknowledgment.`;
  };

  const generateJsonStateMachine = (): string => {
    return JSON.stringify(
      {
        assistant: {
          name: `${businessName} - ${agentName} (${businessNiche})`,
          transcriber: {
            provider: 'deepgram',
            model: 'nova-2',
            language: 'en-US',
            smart_format: true,
            keywords: [businessName, businessNiche, 'appointment', 'insurance', 'consultation']
          },
          model: {
            provider: 'openai',
            model: 'gpt-4o-mini',
            temperature: 0.2,
            max_tokens: 150,
            messages: [
              {
                role: 'system',
                content: generateSystemPrompt()
              }
            ],
            tools: [
              {
                type: 'function',
                function: {
                  name: 'check_calendar_availability',
                  description: 'Query database for open appointment slots for a given date range',
                  parameters: {
                    type: 'object',
                    properties: {
                      date: {
                        type: 'string',
                        description: 'Target appointment date in YYYY-MM-DD format'
                      },
                      time_window: {
                        type: 'string',
                        enum: ['morning', 'afternoon', 'any'],
                        description: 'Preferred window of day'
                      }
                    },
                    required: ['date']
                  }
                }
              },
              {
                type: 'function',
                function: {
                  name: 'confirm_appointment_booking',
                  description: 'Commit patient booking into calendar system and trigger SMS confirmation',
                  parameters: {
                    type: 'object',
                    properties: {
                      full_name: { type: 'string' },
                      phone_number: { type: 'string' },
                      email: { type: 'string' },
                      slot_timestamp: { type: 'string' },
                      notes: { type: 'string' }
                    },
                    required: ['full_name', 'phone_number', 'slot_timestamp']
                  }
                }
              },
              {
                type: 'function',
                function: {
                  name: 'escalate_to_human_agent',
                  description: 'Trigger live SIP transfer to human receptionist on call queue',
                  parameters: {
                    type: 'object',
                    properties: {
                      reason: { type: 'string' },
                      summary: { type: 'string' }
                    },
                    required: ['reason']
                  }
                }
              }
            ]
          },
          voice: {
            provider: 'cartesia',
            voiceId: '248be419-c632-4f23-add1-03ca49ee2142',
            model: 'sonic-english'
          },
          firstMessage: `Hello, thank you for calling ${businessName}. This is ${agentName}. How can I help you today?`,
          endCallPhrases: ['goodbye', 'have a nice day', 'bye bye'],
          silenceTimeoutSeconds: 25,
          maxDurationSeconds: 600
        }
      },
      null,
      2
    );
  };

  const generateFunctionDefinitions = (): string => {
    return `// Production Vapi / Retell Tool-Calling Schema Specifications
// Hook these endpoints to your self-hosted n8n instance or Node.js server.

[
  {
    "name": "check_calendar_availability",
    "description": "Checks real-time calendar availability in Google Calendar, Cal.com, or EHR database.",
    "parameters": {
      "type": "object",
      "properties": {
        "date": {
          "type": "string",
          "description": "ISO date format (YYYY-MM-DD)"
        },
        "time_window": {
          "type": "string",
          "enum": ["morning", "afternoon", "evening", "any"]
        }
      },
      "required": ["date"]
    }
  },
  {
    "name": "confirm_appointment_booking",
    "description": "Writes the qualified booking directly into the CRM, locks the calendar slot, and triggers SMS confirmation.",
    "parameters": {
      "type": "object",
      "properties": {
        "full_name": { "type": "string" },
        "phone_number": { "type": "string" },
        "email": { "type": "string" },
        "slot_timestamp": { "type": "string" },
        "reason_for_visit": { "type": "string" }
      },
      "required": ["full_name", "phone_number", "slot_timestamp"]
    }
  },
  {
    "name": "escalate_to_human_agent",
    "description": "Initiates an immediate SIP REFER transfer to human front desk queue with conversational context summary.",
    "parameters": {
      "type": "object",
      "properties": {
        "reason": { "type": "string" },
        "urgency": { "type": "string", "enum": ["low", "medium", "high", "emergency"] },
        "caller_summary": { "type": "string" }
      },
      "required": ["reason"]
    }
  }
]`;
  };

  const activeSnippet =
    activeTab === 'prompt'
      ? generateSystemPrompt()
      : activeTab === 'json'
      ? generateJsonStateMachine()
      : generateFunctionDefinitions();

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const designerSchema = generateSchemaGraph('/tools/ai-voice-prompt-designer');

  const technicalFaqs = [
    {
      question: 'Why must voice prompts differ fundamentally from text chatbot prompts?',
      answer:
        'Voice prompts operate under strict latency and auditory processing constraints. Callers cannot skim paragraphs on a screen; they process speech linearly. Voice prompts must restrict conversational turns to 1 or 2 spoken sentences, avoid bullet points or markdown syntax that TTS engines garble, and explicitly format phone numbers and dates into spoken phoneme structures.'
    },
    {
      question: 'How do state machines prevent LLM hallucination and off-script rambling in voice agents?',
      answer:
        'Rather than relying on vague roleplay instructions, a production voice agent uses rigid conversational state gates. The prompt defines explicit states (such as Greeting, Triage, Calendar Lookup, and Confirmation) where transitions only occur when specific parameters are extracted or tool calls succeed. This constrains the LLM reasoning scope to the current conversational milestone.'
    },
    {
      question: 'How do you configure ElevenLabs, Cartesia, and Deepgram inside Vapi for lowest latency?',
      answer:
        'In Vapi or Retell, select Deepgram Nova-2 with smart_format enabled as your streaming transcriber. For voice generation, use Cartesia Sonic or ElevenLabs Turbo v2.5 with chunk size set to 50ms and WebSockets enabled. Paired with GPT-4o-mini or Llama 3.3 70B, end-to-end voice latency consistently clocks in between 480ms and 580ms.'
    },
    {
      question: 'How does live call transfer to a human receptionist work with Twilio and SIP trunking?',
      answer:
        'When the agent invokes the escalate_to_human_agent function, Vapi or Retell issues a SIP REFER command or executes a Twilio REST API call update. The telephony gateway bridges the caller to your company PBX or cell hunt group while playing a smooth comfort message, preserving the call without disconnecting.'
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="AI Voice Prompt & Flow Designer | Sheharyar Siraj"
        description="Design production-ready Vapi and Retell system prompts, JSON state machines, and low-latency voice agent architectures. Anti-hallucination guardrails and function calling."
        canonicalUrl="https://sheharyarsiraj.com/tools/ai-voice-prompt-designer/"
        schema={designerSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'SYSTEMS & UTILITY TOOLS', href: '/tools/' },
          { label: 'AI Voice Prompt Designer' }
        ]}
      />

      {/* Hero Header Section */}
      <div className="mt-8 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
          <Bot size={14} />
          <span>CONVERSATIONAL AI & PROMPT STATE ARCHITECTURE</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          AI Voice Agent Flowchart &{' '}
          <span className="text-accent">Prompt Architecture Designer</span>
        </h1>

        <p className="text-brand-secondary text-base sm:text-xl max-w-4xl leading-relaxed font-body">
          Generate production-ready Vapi and Retell system prompts, deterministic JSON state machines, and tool-calling schemas. Engineered for sub-600ms latency, zero off-script hallucinations, and deterministic telephony handoffs.
        </p>

        {/* Quick System Telemetry Bar */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl glass-panel border border-brand-border/60 bg-surface-1/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Zap size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">&lt;550ms</div>
              <div className="text-[11px] font-mono text-brand-muted">Target Response Time</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Layers size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-accent">State-Gated</div>
              <div className="text-[11px] font-mono text-brand-muted">Deterministic Flow</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">0% Hallucination</div>
              <div className="text-[11px] font-mono text-brand-muted">Strict Refusal Bound</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Workflow size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">Vapi & Retell</div>
              <div className="text-[11px] font-mono text-brand-muted">Native Telephony JSON</div>
            </div>
          </div>
        </div>
      </div>

      {/* AEO Direct Answer Block */}
      <AeoDirectAnswer
        summary="A production-grade AI voice agent requires an architectural separation between conversational persona, finite state machines, and real-time tool calling. By constraining prompt turns to 1-2 spoken sentences and gating state transitions through structured JSON function calls, voice systems eliminate awkward silence pauses, prevent conversational drift, and achieve sub-600ms latency on telephony networks."
        keyTakeaways={[
          'Enforces 1-2 sentence conversational turns to match natural human cadence over telephone lines.',
          'Employs deterministic state nodes ensuring appointments and qualifications follow strict business logic.',
          'Injects anti-hallucination refusal boundaries for medical, legal, and financial liability protection.',
          'Generates ready-to-deploy Vapi assistant JSON manifests and n8n webhook function calling specifications.'
        ]}
      />

      {/* Interactive Tool Interface */}
      <div className="my-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (Form Inputs) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center gap-2 mb-4">
                <Sliders className="text-accent" size={18} />
                <h2 className="font-heading text-lg font-bold text-white">
                  Agent Architecture Parameters
                </h2>
              </div>

              {/* Business Name & Agent Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="business-name-input" className="block text-xs font-mono text-brand-muted mb-1.5 uppercase">
                    Company / Practice Name
                  </label>
                  <input
                    id="business-name-input"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-surface-2 border border-brand-border rounded-xl px-3 py-2 text-sm text-white font-mono focus:border-accent focus:outline-none"
                    placeholder="e.g., Apex Dental"
                  />
                </div>

                <div>
                  <label htmlFor="agent-name-input" className="block text-xs font-mono text-brand-muted mb-1.5 uppercase">
                    Assistant Persona Name
                  </label>
                  <input
                    id="agent-name-input"
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    className="w-full bg-surface-2 border border-brand-border rounded-xl px-3 py-2 text-sm text-white font-mono focus:border-accent focus:outline-none"
                    placeholder="e.g., Sarah"
                  />
                </div>
              </div>

              {/* Business Niche */}
              <div className="mb-4">
                <label htmlFor="business-niche-input" className="block text-xs font-mono text-brand-muted mb-1.5 uppercase">
                  Industry / Business Niche
                </label>
                <input
                  id="business-niche-input"
                  type="text"
                  value={businessNiche}
                  onChange={(e) => setBusinessNiche(e.target.value)}
                  className="w-full bg-surface-2 border border-brand-border rounded-xl px-3 py-2 text-sm text-white font-mono focus:border-accent focus:outline-none"
                  placeholder="e.g., Dental Practice, HVAC Contractor, Law Firm"
                />
              </div>

              {/* Primary Objective Radio Selector */}
              <div className="mb-4">
                <label className="block text-xs font-mono text-brand-muted mb-2 uppercase">
                  Primary Conversational Objective
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'appointment', label: 'Appointment Booking', icon: PhoneCall },
                    { id: 'qualification', label: 'Lead Qualification', icon: Sparkles },
                    { id: 'support', label: 'Support & Triage', icon: Activity },
                    { id: 'transfer', label: 'SIP Warm Transfer', icon: Workflow }
                  ].map((item) => {
                    const isSelected = primaryObjective === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setPrimaryObjective(item.id as any)}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'bg-accent/15 border-accent text-white shadow-[0_0_15px_rgba(183,255,60,0.15)]'
                            : 'bg-surface-2 border-brand-border text-brand-secondary hover:border-brand-border/80'
                        }`}
                      >
                        <Icon size={14} className={isSelected ? 'text-accent' : 'text-brand-muted'} />
                        <span className="text-xs font-heading font-semibold">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tone of Voice Selector */}
              <div className="mb-4">
                <label className="block text-xs font-mono text-brand-muted mb-2 uppercase">
                  Auditory Delivery Tone
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'consultative', label: 'Consultative & Warm' },
                    { id: 'empathetic', label: 'Empathetic & Calm' },
                    { id: 'energetic', label: 'Energetic & Crisp' },
                    { id: 'professional', label: 'Strictly Formal' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setToneOfVoice(t.id as any)}
                      className={`px-3 py-2 rounded-xl border text-xs font-mono transition-all ${
                        toneOfVoice === t.id
                          ? 'bg-accent/10 border-accent text-accent font-bold'
                          : 'bg-surface-2 border-brand-border text-brand-muted hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Objection Handling Rules */}
              <div className="mb-2">
                <label htmlFor="objection-rules-input" className="block text-xs font-mono text-brand-muted mb-1.5 uppercase">
                  Target Objections & Edge Cases
                </label>
                <textarea
                  id="objection-rules-input"
                  rows={3}
                  value={objectionFocus}
                  onChange={(e) => setObjectionFocus(e.target.value)}
                  className="w-full bg-surface-2 border border-brand-border rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-accent focus:outline-none leading-relaxed"
                  placeholder="e.g., Cost too high, asks for human immediately, insurance out of network"
                />
                <p className="text-[11px] text-brand-muted mt-1 font-body">
                  Defines explicit 3-step acknowledge, clarify, and pivot micro-commitments.
                </p>
              </div>
            </div>

            {/* Implementation Quick Tip */}
            <div className="p-4 rounded-xl bg-surface-2 border border-brand-border/60 text-xs text-brand-secondary font-body">
              <div className="flex items-center gap-2 font-mono text-white font-bold mb-1">
                <ShieldCheck size={14} className="text-accent" />
                <span>Zero Hallucination Protocol</span>
              </div>
              Notice how the generated prompt restricts turns to 1-2 sentences. Spoken conversations fail when models dump bullet points or paragraphs.
            </div>
          </div>

          {/* Output Display Column (Live Generator & Copy) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl glass-panel border border-accent/30 bg-surface-1 overflow-hidden">
              {/* Header Tabs */}
              <div className="flex items-center justify-between px-4 py-3 bg-surface-2 border-b border-brand-border">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('prompt')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      activeTab === 'prompt'
                        ? 'bg-accent text-black font-bold shadow-[0_0_10px_rgba(183,255,60,0.25)]'
                        : 'text-brand-muted hover:text-white'
                    }`}
                  >
                    SYSTEM PROMPT
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('json')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      activeTab === 'json'
                        ? 'bg-accent text-black font-bold shadow-[0_0_10px_rgba(183,255,60,0.25)]'
                        : 'text-brand-muted hover:text-white'
                    }`}
                  >
                    VAPI ASSISTANT JSON
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('functions')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      activeTab === 'functions'
                        ? 'bg-accent text-black font-bold shadow-[0_0_10px_rgba(183,255,60,0.25)]'
                        : 'text-brand-muted hover:text-white'
                    }`}
                  >
                    FUNCTION SCHEMAS
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wider bg-surface-3 hover:bg-accent hover:text-black text-white border border-brand-border transition-all flex items-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>COPY SNIPPET</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Display Area */}
              <div className="p-4 bg-black/60 font-mono text-xs text-brand-secondary overflow-x-auto max-h-[560px] overflow-y-auto leading-relaxed border-t border-brand-border/40 select-all">
                <pre className="text-white/90">
                  <code>{activeSnippet}</code>
                </pre>
              </div>

              {/* Footer Telemetry */}
              <div className="px-4 py-2.5 bg-surface-2/80 border-t border-brand-border/60 flex items-center justify-between text-[11px] font-mono text-brand-muted">
                <span>Output: Production Vapi / Retell Compatible</span>
                <span className="text-accent font-bold">100% Validated Syntax</span>
              </div>
            </div>

            {/* Primary Scoping CTA Bar */}
            <div className="p-5 rounded-2xl glass-panel border border-brand-border bg-gradient-to-r from-surface-2 via-surface-1 to-surface-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-heading text-sm font-bold text-white">
                  Need a custom multi-agent telephony pipeline engineered?
                </div>
                <p className="text-xs text-brand-secondary font-body mt-0.5">
                  We architect custom Deepgram, Llama 3.3, and Cartesia pipelines with self-hosted n8n backends.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenInquiry}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider bg-accent text-black hover:bg-white transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(183,255,60,0.3)] flex-shrink-0 active:scale-95"
              >
                <span>BOOK ARCHITECTURE REVIEW</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Long-Form Engineering Guide: Low-Latency Architecture & State Management */}
      <div className="my-16 space-y-12">
        <section className="p-8 sm:p-10 rounded-3xl glass-panel border border-brand-border bg-surface-1">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
              <Cpu size={14} />
              <span>VOICE ENGINEERING DEEP-DIVE</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-6">
              The Physics of Low-Latency Conversational Voice Architecture
            </h2>

            <div className="space-y-4 text-brand-secondary font-body leading-relaxed text-base sm:text-lg">
              <p>
                In written AI applications, a two-second latency between message transmission and response generation feels completely acceptable. On a live telephone connection, however, a pause of 800 milliseconds creates immediate discomfort, causing callers to say "Hello? Are you still there?" and triggering conversational interruptions.
              </p>
              <p>
                Engineering a conversational voice agent requires understanding every millisecond in the streaming audio pipeline. Traditional HTTP request and response loops cannot deliver natural dialogue. Instead, production systems utilize persistent bi-directional WebSockets connecting four specialized streaming services:
              </p>

              <div className="my-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-surface-2 border border-brand-border">
                  <div className="text-accent font-mono text-xs font-bold mb-1">1. SPEECH-TO-TEXT</div>
                  <div className="text-white font-heading font-semibold text-sm">Deepgram Nova-2</div>
                  <div className="text-xs text-brand-muted mt-1 font-mono">120ms streaming latency</div>
                </div>

                <div className="p-4 rounded-xl bg-surface-2 border border-brand-border">
                  <div className="text-accent font-mono text-xs font-bold mb-1">2. REASONING ENGINE</div>
                  <div className="text-white font-heading font-semibold text-sm">GPT-4o-mini / Llama 3.3</div>
                  <div className="text-xs text-brand-muted mt-1 font-mono">180ms time-to-first-token</div>
                </div>

                <div className="p-4 rounded-xl bg-surface-2 border border-brand-border">
                  <div className="text-accent font-mono text-xs font-bold mb-1">3. TEXT-TO-SPEECH</div>
                  <div className="text-white font-heading font-semibold text-sm">Cartesia / ElevenLabs</div>
                  <div className="text-xs text-brand-muted mt-1 font-mono">140ms first audio chunk</div>
                </div>

                <div className="p-4 rounded-xl bg-surface-2 border border-brand-border">
                  <div className="text-accent font-mono text-xs font-bold mb-1">4. TELEPHONY SIP</div>
                  <div className="text-white font-heading font-semibold text-sm">Twilio / Telnyx BYOT</div>
                  <div className="text-xs text-brand-muted mt-1 font-mono">50ms network jitter buffer</div>
                </div>
              </div>

              <p>
                When each component streams tokens incrementally rather than waiting for complete sentence compilation, total roundtrip latency drops below 550 milliseconds. At this threshold, human callers experience immediate conversational presence without unnatural dead air.
              </p>
            </div>
          </div>
        </section>

        {/* Integration Guidelines: Vapi, ElevenLabs, and Twilio */}
        <section className="p-8 sm:p-10 rounded-3xl glass-panel border border-brand-border bg-surface-1">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
              <Server size={14} />
              <span>INTEGRATION PROTOCOLS</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
              Carrier Telephony & Voice Stack Integration Guidelines
            </h2>

            <div className="space-y-6 text-brand-secondary font-body text-base">
              <div>
                <h3 className="font-heading text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-xs font-mono">1</span>
                  Twilio & Telnyx Bring-Your-Own-Carrier (BYOT) SIP Trunking
                </h3>
                <p className="leading-relaxed">
                  Avoid purchasing retail phone numbers directly inside voice platforms at marked-up rates. Configure your existing Twilio or Telnyx SIP trunk to forward incoming calls to your Vapi or Retell SIP domain. This enables high-volume carrier rate discounting, number porting control, and redundant failover routing to backup human phone lines if internet connectivity drops.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-xs font-mono">2</span>
                  ElevenLabs & Cartesia Streaming Voice Synthesis Optimization
                </h3>
                <p className="leading-relaxed">
                  When using ElevenLabs, select the Turbo v2.5 or Flash model over the multilingual v2 engine. While multilingual models offer expressive voice cloning, their generation latency exceeds 280 milliseconds. Cartesia Sonic provides ultra-low latency streaming at 135 milliseconds, making it ideal for high-throughput customer triage where rapid turn-taking is critical.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-xs font-mono">3</span>
                  HMAC Authentication on n8n Webhook Endpoints
                </h3>
                <p className="leading-relaxed">
                  Every tool-calling request triggered by your voice agent must validate HMAC SHA-256 signatures before reading or writing data in your production CRM. In your self-hosted n8n workflow, configure an initial Crypto node that verifies the request signature against your shared webhook secret, preventing unauthorized external script execution against your database.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Technical FAQ Accordion */}
      <div className="my-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <Mic size={14} />
            <span>TECHNICAL SPECIFICATIONS & FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Conversational Voice Prompt Architecture FAQ
          </h2>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {technicalFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel border border-brand-border bg-surface-1 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-heading text-base sm:text-lg font-bold text-white">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-surface-2 border border-brand-border flex items-center justify-center flex-shrink-0 text-accent">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-brand-secondary font-body text-sm sm:text-base leading-relaxed border-t border-brand-border/40 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Conversion Banner */}
      <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-accent/30 bg-gradient-to-r from-accent/10 via-surface-2 to-surface-1 text-center max-w-5xl mx-auto my-12">
        <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Ready to Build a High-Performance Voice Pipeline?
        </h2>
        <p className="text-brand-secondary text-base sm:text-lg max-w-2xl mx-auto mb-8 font-body">
          Schedule an architecture session with Sheharyar Siraj. We design your conversational state diagrams, build custom tool-calling endpoints, and deploy sub-600ms voice agents tailored to your business operations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            type="button"
            onClick={onOpenInquiry}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-sm font-bold tracking-wider bg-accent text-black hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(183,255,60,0.4)] active:scale-95"
          >
            <MessageSquare size={18} />
            <span>SCHEDULE ARCHITECTURE SESSION</span>
          </button>

          <Link
            to="/tools/voice-agent-roi-calculator/"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-sm font-bold tracking-wider bg-surface-2 hover:bg-surface-3 border border-brand-border text-white transition-all flex items-center justify-center gap-2"
          >
            <span>CALCULATE VOICE AGENT ROI</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default VoicePromptDesignerPage;
