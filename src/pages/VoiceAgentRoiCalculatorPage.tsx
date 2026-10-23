import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  Sliders,
  DollarSign,
  Clock,
  TrendingUp,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  Bot,
  Activity,
  Workflow,
  Headphones,
  Check,
  Server
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { generateSchemaGraph } from '../utils/schemaGenerator';

interface VoiceAgentRoiCalculatorPageProps {
  onOpenInquiry: () => void;
}

export const VoiceAgentRoiCalculatorPage: React.FC<VoiceAgentRoiCalculatorPageProps> = ({
  onOpenInquiry
}) => {
  // Input parameters
  const [monthlyCalls, setMonthlyCalls] = useState<number>(2500);
  const [humanSalary, setHumanSalary] = useState<number>(4200);
  const [averageCallDurationMinutes, setAverageCallDurationMinutes] = useState<number>(4.5);
  const [dropOffRate, setDropOffRate] = useState<number>(35);
  const [requires247Coverage, setRequires247Coverage] = useState<boolean>(true);
  const [averageDealValue, setAverageDealValue] = useState<number>(650);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Financial & Operational Calculation Engine
  // Human rep capacity: ~120 productive working hours per month on live calls (~1,600 call minutes per agent)
  const agentMonthlyCallMinutesCapacity = 1600;
  const totalCallMinutes = monthlyCalls * averageCallDurationMinutes;
  
  // Headcount calculation: For 8x5 coverage vs 24/7 (which requires minimum 3.8 to 4.5 full-time equivalents to cover shifts, weekends, and holidays)
  const baseFteRequired = Math.max(1, Math.ceil(totalCallMinutes / agentMonthlyCallMinutesCapacity));
  const fteMultiplier = requires247Coverage ? Math.max(3.5, baseFteRequired * 2.8) : baseFteRequired;
  const humanTeamCount = Math.round(fteMultiplier * 10) / 10;
  
  // Fully loaded human cost (base salary + 22% taxes, benefits, tooling, telephony licensing)
  const fullyLoadedAgentSalary = humanSalary * 1.22;
  const totalHumanMonthlyCost = Math.round(humanTeamCount * fullyLoadedAgentSalary);

  // AI Voice Stack Cost Model:
  // Vapi/Retell orchestration: $0.05/min
  // Telephony (Twilio/Telnyx): $0.015/min
  // Deepgram Nova-2 STT: $0.005/min
  // LLM inference (GPT-4o mini / Llama 3.3): $0.02/min
  // Cartesia / ElevenLabs Turbo TTS: $0.04/min
  // Total blended AI telephony cost: ~$0.13 per minute
  const aiCostPerMinute = 0.13;
  const n8nInfrastructureMonthlyCost = 180;
  const totalAiTelephonyCost = Math.round(totalCallMinutes * aiCostPerMinute + n8nInfrastructureMonthlyCost);

  // Financial Outputs
  const monthlyCostSavings = Math.max(0, totalHumanMonthlyCost - totalAiTelephonyCost);
  const annualCostSavings = monthlyCostSavings * 12;
  const costReductionPercentage = totalHumanMonthlyCost > 0
    ? Math.round((monthlyCostSavings / totalHumanMonthlyCost) * 100)
    : 0;

  // Operational Time Savings (live talk time + 1.5 minutes after-call documentation/CRM logging per call)
  const hoursSavedPerMonth = Math.round((monthlyCalls * (averageCallDurationMinutes + 1.5)) / 60);

  // Lead Conversion Lift Calculation:
  // In manual teams, calls arriving after hours or during peak queue volume experience drop-off.
  // Instant sub-600ms AI pick-up captures drop-off leads.
  const droppedCallsCount = Math.round(monthlyCalls * (dropOffRate / 100));
  // AI instant response recovers approximately 62% of otherwise abandoned callers
  const recoveredCallersCount = Math.round(droppedCallsCount * 0.62);
  // Assuming a conservative 14% qualification-to-sale closing rate on recovered inbound calls
  const additionalQualifiedDeals = Math.round(recoveredCallersCount * 0.14);
  const projectedMonthlyRevenueLift = Math.round(additionalQualifiedDeals * averageDealValue);

  // WhatsApp CTA URL generator with prefilled telemetry
  const whatsappMessage = encodeURIComponent(
    `Hi Sheharyar, I used your Voice Agent ROI Calculator for ${monthlyCalls.toLocaleString()} monthly calls. Estimated monthly savings: $${monthlyCostSavings.toLocaleString()} with ${hoursSavedPerMonth.toLocaleString()} hours saved. I would like to review our telephony architecture and book a systems audit.`
  );
  const whatsappUrl = `https://wa.me/923132080033?text=${whatsappMessage}`;

  const calculatorSchema = generateSchemaGraph('/tools/voice-agent-roi-calculator');

  const useCases = [
    {
      title: 'Emergency Home Services and HVAC Dispatch',
      tag: 'HOME SERVICES',
      metrics: 'Zero hold time across 24/7 spikes',
      description:
        'When an air conditioning compressor or plumbing line bursts at 11 PM, homeowners call three contractors and book whoever answers first. Autonomous voice agents answer on the initial ring, collect unit model and address details, quote dispatch fees, and sync into Housecall Pro or ServiceTitan through n8n webhooks.',
      impact: 'Recovers up to 48% of after-hours emergency calls previously lost to voicemail.'
    },
    {
      title: 'Legal Intake and High-Intent Settlement Screening',
      tag: 'LEGAL & INJURY',
      metrics: 'Sub-minute statute of limitations triage',
      description:
        'Personal injury and mass tort campaigns spend hundreds of dollars per click. Callers drop off if forced into lengthy phone trees. AI voice agents qualify incident dates, liability factors, and medical treatment status using strict branching rules, routing high-value cases to retained partners in real time.',
      impact: 'Reduces intake team overhead while preventing qualified case spoilage.'
    },
    {
      title: 'B2B SaaS Demo Qualification and Live Scheduling',
      tag: 'B2B ENTERPRISE',
      metrics: 'Instant Cal.com and HubSpot calendar booking',
      description:
        'Inbound enterprise prospects requesting phone demos are screened instantly for team seat count, current software stack, and decision timeframe. The voice agent verifies qualification thresholds and offers direct calendar slot confirmation via Cal.com API integration within the active call.',
      impact: 'Eliminates back-and-forth scheduling emails, lifting booking completion by 31%.'
    },
    {
      title: 'Automotive and Fleet Dealership Service Triage',
      tag: 'AUTOMOTIVE',
      metrics: 'Direct DMS sync and recall verification',
      description:
        'Dealership service desks receive massive morning call surges for status checks, warranty recalls, and appointment changes. Voice agents verify vehicle VIN numbers, query inventory databases, and confirm maintenance drop-off slots without receptionist bottlenecks.',
      impact: 'Frees service advisors to focus entirely on in-person customer write-ups.'
    }
  ];

  const calculatorFaqs = [
    {
      question: 'How do conversational AI voice agents maintain sub-600ms latency without awkward pauses?',
      answer:
        'Achieving conversational flow requires a pipeline built on WebSocket streaming. The system uses Deepgram Nova-2 for real-time speech-to-text token streaming, passes prompts to low-latency models like Llama 3.3 70B or GPT-4o mini, and streams generated tokens directly into Cartesia Sonic or ElevenLabs Turbo audio generation. By avoiding monolithic buffer chunks, time to first audio byte stays comfortably below 600 milliseconds.'
    },
    {
      question: 'How does the voice agent synchronize caller data with our existing CRM and calendar?',
      answer:
        'During and immediately upon call completion, Vapi or Retell triggers structured HTTP webhook payloads. Self-hosted n8n workflows validate HMAC signatures, extract structured JSON parameters (caller name, intent, qualification score, requested appointment timestamp), and update platforms like HubSpot, Salesforce, GoHighLevel, or custom PostgreSQL databases within two seconds.'
    },
    {
      question: 'What happens when a caller requires human escalation or exhibits complex edge cases?',
      answer:
        'The agent monitors conversation sentiment, explicit escalation requests, and strict confidence boundaries. When an escalation trigger occurs, the voice engine uses SIP refer transfer or Twilio live bridging to forward the caller directly to an on-duty specialist, while simultaneously posting a conversation summary to your internal Slack or Microsoft Teams channel.'
    },
    {
      question: 'Can we port our existing business phone numbers to this AI voice pipeline?',
      answer:
        'Yes. You can route inbound numbers through Twilio, Telnyx, or your existing SIP trunking provider. Forwarding rules can be set to 24/7 direct pick-up, after-hours overflow, or simultaneous hunt groups where the AI answers instantly if human agents do not pick up within two rings.'
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="Voice Agent & Automation ROI Calculator | Sheharyar"
        description="Calculate operational cost savings, hours saved, and lead conversion lift from deploying autonomous AI voice agents and n8n workflows. Real-time telephony financial modeling."
        canonicalUrl="https://sheharyarsiraj.com/tools/voice-agent-roi-calculator/"
        schema={calculatorSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'SYSTEMS & UTILITY TOOLS', href: '/tools/' },
          { label: 'Voice Agent ROI Calculator' }
        ]}
      />

      {/* Hero Header */}
      <div className="mt-8 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
          <Activity size={14} />
          <span>TELEPHONY FINANCIAL MODELING & CONVERSION ARCHITECTURE</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Voice Agent & Workflow{' '}
          <span className="text-accent">Cost & ROI Calculator</span>
        </h1>

        <p className="text-brand-secondary text-base sm:text-xl max-w-4xl leading-relaxed font-body">
          Model real-world telephony costs, human labor expenditure, and revenue lift. Discover how replacing manual phone queues with sub-600ms conversational voice agents and n8n automations cuts operating expenses while capturing lost revenue.
        </p>

        {/* Telemetry Indicator */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl glass-panel border border-brand-border/60 bg-surface-1/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Zap size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">&lt;600ms</div>
              <div className="text-[11px] font-mono text-brand-muted">Speech Latency Target</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <DollarSign size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-accent">{costReductionPercentage}%</div>
              <div className="text-[11px] font-mono text-brand-muted">Expense Reduction</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Clock size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">{hoursSavedPerMonth}h</div>
              <div className="text-[11px] font-mono text-brand-muted">Monthly Labor Saved</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <TrendingUp size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">+{recoveredCallersCount}</div>
              <div className="text-[11px] font-mono text-brand-muted">Captured Callers</div>
            </div>
          </div>
        </div>
      </div>

      {/* AEO Direct Answer Block */}
      <AeoDirectAnswer
        summary="Deploying conversational AI voice agents built on Vapi or Retell with automated n8n CRM backends reduces inbound support and qualification costs by 68% to 84% compared to traditional human staffing. By operating 24/7 without queue abandonment, businesses recover after-hours inquiries, resolve inquiries within 600ms latency thresholds, and eliminate manual data entry into CRM systems."
        keyTakeaways={[
          'Average blended AI voice pipeline cost is $0.13 per minute versus $0.48 to $0.85 per minute for fully loaded human agents.',
          'Eliminates call queue abandonment by answering 100% of simultaneous calls on the first ring.',
          'Synchronizes caller qualification data, appointment bookings, and call transcripts into CRMs via n8n within 2 seconds.',
          'Provides uninterrupted 24/7/365 coverage without overtime premiums, shift handoffs, or weekend turnover.'
        ]}
      />

      {/* Interactive Calculator Section */}
      <div className="my-12">
        <div className="flex items-center gap-2 mb-6">
          <Sliders className="text-accent" size={20} />
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
            Interactive Operational Modeling Parameters
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              {/* Slider 1: Monthly Calls */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="monthly-calls-slider" className="text-sm font-heading font-semibold text-white flex items-center gap-2">
                    <PhoneCall size={16} className="text-accent" />
                    Monthly Inbound Call Volume
                  </label>
                  <span className="font-mono text-sm font-bold text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                    {monthlyCalls.toLocaleString()} calls
                  </span>
                </div>
                <input
                  id="monthly-calls-slider"
                  type="range"
                  min="200"
                  max="15000"
                  step="100"
                  value={monthlyCalls}
                  onChange={(e) => setMonthlyCalls(Number(e.target.value))}
                  className="w-full h-2 bg-surface-3 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[11px] font-mono text-brand-muted mt-1">
                  <span>200 calls</span>
                  <span>5,000</span>
                  <span>10,000</span>
                  <span>15,000 calls</span>
                </div>
              </div>

              {/* Slider 2: Average Call Duration */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="call-duration-slider" className="text-sm font-heading font-semibold text-white flex items-center gap-2">
                    <Clock size={16} className="text-accent" />
                    Average Call Duration (Minutes)
                  </label>
                  <span className="font-mono text-sm font-bold text-white px-2 py-0.5 rounded bg-surface-3 border border-brand-border">
                    {averageCallDurationMinutes} min
                  </span>
                </div>
                <input
                  id="call-duration-slider"
                  type="range"
                  min="2"
                  max="10"
                  step="0.5"
                  value={averageCallDurationMinutes}
                  onChange={(e) => setAverageCallDurationMinutes(Number(e.target.value))}
                  className="w-full h-2 bg-surface-3 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[11px] font-mono text-brand-muted mt-1">
                  <span>2 min</span>
                  <span>4.5 min</span>
                  <span>7 min</span>
                  <span>10 min</span>
                </div>
              </div>

              {/* Slider 3: Human Agent Salary */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="human-salary-slider" className="text-sm font-heading font-semibold text-white flex items-center gap-2">
                    <Headphones size={16} className="text-accent" />
                    Human Agent Base Monthly Salary
                  </label>
                  <span className="font-mono text-sm font-bold text-white px-2 py-0.5 rounded bg-surface-3 border border-brand-border">
                    ${humanSalary.toLocaleString()} / mo
                  </span>
                </div>
                <input
                  id="human-salary-slider"
                  type="range"
                  min="1800"
                  max="7500"
                  step="100"
                  value={humanSalary}
                  onChange={(e) => setHumanSalary(Number(e.target.value))}
                  className="w-full h-2 bg-surface-3 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[11px] font-mono text-brand-muted mt-1">
                  <span>$1,800</span>
                  <span>$3,500</span>
                  <span>$5,000</span>
                  <span>$7,500</span>
                </div>
                <p className="text-[11px] text-brand-muted mt-1">
                  Includes automatic 22% overhead calculation for payroll taxes, healthcare, workspace, and telephony seats.
                </p>
              </div>

              {/* Slider 4: Drop-Off Rate */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="dropoff-rate-slider" className="text-sm font-heading font-semibold text-white flex items-center gap-2">
                    <TrendingUp size={16} className="text-accent" />
                    Current Queue / After-Hours Drop-Off Rate
                  </label>
                  <span className="font-mono text-sm font-bold text-rose-400 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                    {dropOffRate}% abandoned
                  </span>
                </div>
                <input
                  id="dropoff-rate-slider"
                  type="range"
                  min="10"
                  max="65"
                  step="1"
                  value={dropOffRate}
                  onChange={(e) => setDropOffRate(Number(e.target.value))}
                  className="w-full h-2 bg-surface-3 rounded-lg appearance-none cursor-pointer accent-rose-400"
                />
                <div className="flex justify-between text-[11px] font-mono text-brand-muted mt-1">
                  <span>10% (Low)</span>
                  <span>35% (Typical)</span>
                  <span>50%</span>
                  <span>65% (Severe)</span>
                </div>
              </div>

              {/* Slider 5: Average Deal Value */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="deal-value-slider" className="text-sm font-heading font-semibold text-white flex items-center gap-2">
                    <DollarSign size={16} className="text-accent" />
                    Average Qualified Lead / Deal Value
                  </label>
                  <span className="font-mono text-sm font-bold text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                    ${averageDealValue.toLocaleString()}
                  </span>
                </div>
                <input
                  id="deal-value-slider"
                  type="range"
                  min="150"
                  max="3500"
                  step="50"
                  value={averageDealValue}
                  onChange={(e) => setAverageDealValue(Number(e.target.value))}
                  className="w-full h-2 bg-surface-3 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[11px] font-mono text-brand-muted mt-1">
                  <span>$150</span>
                  <span>$1,000</span>
                  <span>$2,000</span>
                  <span>$3,500</span>
                </div>
              </div>

              {/* Toggle: 24/7 Coverage Requirement */}
              <div className="pt-4 border-t border-brand-border">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-heading font-semibold text-white flex items-center gap-2">
                      <ShieldCheck size={16} className="text-accent" />
                      24/7/365 Continuous Coverage Required
                    </div>
                    <p className="text-xs text-brand-muted mt-0.5">
                      Human teams require weekend and night shift multipliers; AI voice delivers 24/7 coverage at zero extra cost.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRequires247Coverage(!requires247Coverage)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      requires247Coverage ? 'bg-accent' : 'bg-surface-3'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out ${
                        requires247Coverage ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time Financial & Operational Scorecard */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-accent/30 bg-gradient-to-br from-surface-2 via-surface-1 to-black relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-[11px] font-mono text-accent uppercase tracking-wider font-bold">
                    ESTIMATED NET MONTHLY SAVINGS
                  </div>
                  <div className="font-heading text-4xl sm:text-5xl font-extrabold text-white mt-1">
                    ${monthlyCostSavings.toLocaleString()}
                    <span className="text-xs font-mono text-brand-muted font-normal ml-2">/ month</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-mono text-brand-muted uppercase">Annual Savings</div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-accent mt-0.5">
                    ${annualCostSavings.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Visual Comparison Metric Bars */}
              <div className="space-y-4 pt-4 border-t border-brand-border/60">
                {/* Cost Comparison */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-brand-muted">Human Staff Cost ({humanTeamCount} FTEs loaded)</span>
                    <span className="text-rose-400 font-bold">${totalHumanMonthlyCost.toLocaleString()} / mo</span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-3 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-brand-muted">Autonomous Voice Pipeline Cost (Vapi + Telephony)</span>
                    <span className="text-accent font-bold">${totalAiTelephonyCost.toLocaleString()} / mo</span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-3 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(4, Math.round((totalAiTelephonyCost / totalHumanMonthlyCost) * 100))
                        )}%`
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Impact Indicators */}
              <div className="mt-6 grid grid-cols-2 gap-3 pt-4 border-t border-brand-border/60">
                <div className="p-3.5 rounded-xl bg-surface-2 border border-brand-border/50">
                  <div className="flex items-center gap-1.5 text-xs text-brand-muted font-mono mb-1">
                    <Clock size={13} className="text-accent" />
                    <span>MONTHLY HOURS SAVED</span>
                  </div>
                  <div className="text-xl font-mono font-bold text-white">
                    {hoursSavedPerMonth.toLocaleString()} hrs
                  </div>
                  <div className="text-[11px] text-brand-muted mt-0.5">
                    Replaces manual notes & data entry
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-2 border border-brand-border/50">
                  <div className="flex items-center gap-1.5 text-xs text-brand-muted font-mono mb-1">
                    <TrendingUp size={13} className="text-accent" />
                    <span>REVENUE LIFT POTENTIAL</span>
                  </div>
                  <div className="text-xl font-mono font-bold text-accent">
                    +${projectedMonthlyRevenueLift.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-brand-muted mt-0.5">
                    From {recoveredCallersCount} recovered drop-off calls
                  </div>
                </div>
              </div>

              {/* Conversion CTA Button */}
              <div className="mt-8 pt-6 border-t border-brand-border/60">
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-6 rounded-xl font-mono text-sm font-bold tracking-wider bg-accent text-black hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(183,255,60,0.3)] active:scale-95 text-center"
                  >
                    <MessageSquare size={16} />
                    <span>BOOK A SYSTEM AUDIT VIA WHATSAPP</span>
                  </a>

                  <button
                    type="button"
                    onClick={onOpenInquiry}
                    className="py-3.5 px-5 rounded-xl font-mono text-sm font-bold tracking-wider bg-surface-2 hover:bg-surface-3 border border-brand-border text-white transition-all flex items-center justify-center gap-2"
                  >
                    <span>SCHEDULE CALL</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
                <p className="text-[11px] text-center text-brand-muted font-mono mt-3">
                  Direct senior architect consultation. Sub-2 hour response time SLA.
                </p>
              </div>
            </div>

            {/* Architecture Stack Breakdown */}
            <div className="p-5 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center gap-2 mb-3">
                <Server size={16} className="text-accent" />
                <span className="font-heading text-sm font-bold text-white uppercase tracking-wider">
                  Engineered Telephony Cost Model Breakdown
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-brand-border/40">
                  <span className="text-brand-secondary">STT (Deepgram Nova-2 Streaming):</span>
                  <span className="text-white font-bold">$0.005 / min</span>
                </div>
                <div className="flex justify-between py-1 border-b border-brand-border/40">
                  <span className="text-brand-secondary">Inference (GPT-4o mini / Llama 3.3):</span>
                  <span className="text-white font-bold">$0.020 / min</span>
                </div>
                <div className="flex justify-between py-1 border-b border-brand-border/40">
                  <span className="text-brand-secondary">TTS (Cartesia Sonic / ElevenLabs):</span>
                  <span className="text-white font-bold">$0.040 / min</span>
                </div>
                <div className="flex justify-between py-1 border-b border-brand-border/40">
                  <span className="text-brand-secondary">Carrier Telephony & SIP Trunking:</span>
                  <span className="text-white font-bold">$0.015 / min</span>
                </div>
                <div className="flex justify-between py-1 border-b border-brand-border/40">
                  <span className="text-brand-secondary">Vapi/Retell Voice Orchestration Layer:</span>
                  <span className="text-white font-bold">$0.050 / min</span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-accent">
                  <span>Blended Operating Telephony Rate:</span>
                  <span>$0.130 / minute</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep-Dive Analytical Content: Operational Friction & Latency Engineering */}
      <div className="my-16 space-y-12">
        <section className="p-8 sm:p-10 rounded-3xl glass-panel border border-brand-border bg-surface-1">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
              <Bot size={14} />
              <span>OPERATIONAL EFFICIENCY ANALYSIS</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-6">
              The Hidden Overhead of Manual Phone Lead Qualification
            </h2>

            <div className="space-y-4 text-brand-secondary font-body leading-relaxed text-base sm:text-lg">
              <p>
                In high-velocity inbound businesses, phone calls represent the highest-intent customer touchpoint. However, traditional human call centers suffer from systemic structural inefficiencies: queue hold times, inconsistent script execution, after-hours voicemails that never convert, and manual CRM documentation friction.
              </p>
              <p>
                Studies show that when an inbound sales inquiry waits longer than five minutes for a response, qualification likelihood drops by nearly 400%. For businesses handling 2,000 or more monthly calls, scaling human headcounts creates substantial managerial overhead, recruiting churn, and escalating fixed payroll commitments without solving the fundamental problem of peak-hour queue abandonments.
              </p>
              <p>
                Autonomous conversational voice agents invert this paradigm. By providing infinite concurrent capacity, an AI voice architecture answers every inbound call within the first ring. It executes structured qualification logic, extracts entity parameters, and executes backend business actions before a human representative could even complete their initial greeting.
              </p>
            </div>
          </div>
        </section>

        {/* 4 Core Industry Use Cases */}
        <section>
          <div className="mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
              High-Value Industry Implementation Blueprints
            </h2>
            <p className="text-brand-secondary text-base font-body mt-2">
              How enterprise teams leverage sub-600ms conversational telephony pipelines to capture revenue and eliminate operational friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((uc, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                      {uc.tag}
                    </span>
                    <span className="text-xs font-mono text-brand-muted">{uc.metrics}</span>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2">
                    {uc.title}
                  </h3>

                  <p className="text-sm text-brand-secondary font-body leading-relaxed mb-4">
                    {uc.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-brand-border/40 flex items-center gap-2 text-xs font-mono text-accent">
                  <CheckCircle2 size={14} className="flex-shrink-0" />
                  <span>{uc.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Architecture Comparison Table */}
        <section className="p-8 rounded-3xl glass-panel border border-brand-border bg-surface-1">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight mb-6">
            Architectural Comparison: Human Call Teams vs Autonomous AI Voice Systems
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-body">
              <thead>
                <tr className="border-b border-brand-border text-xs font-mono text-accent uppercase tracking-wider">
                  <th className="py-3 px-4">Evaluation Dimension</th>
                  <th className="py-3 px-4">Traditional Human Staffing</th>
                  <th className="py-3 px-4">Autonomous Voice Pipeline (Vapi / Retell + n8n)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40 text-brand-secondary">
                <tr>
                  <td className="py-3.5 px-4 font-heading font-semibold text-white">Concurrent Call Handling</td>
                  <td className="py-3.5 px-4 text-rose-400">Strictly 1 call per active agent; queues form during surges</td>
                  <td className="py-3.5 px-4 text-accent font-bold">Virtually unlimited concurrent channels; 0 hold time</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-heading font-semibold text-white">Blended Operating Cost</td>
                  <td className="py-3.5 px-4">$0.45 to $0.85 per talk minute (salary, benefits, seats)</td>
                  <td className="py-3.5 px-4 text-accent font-bold">$0.11 to $0.14 per talk minute total stack cost</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-heading font-semibold text-white">Operating Availability</td>
                  <td className="py-3.5 px-4">Standard 8h shifts; 24/7 requires 4x staff multiplier</td>
                  <td className="py-3.5 px-4 text-accent font-bold">Continuous 24/7/365 coverage with zero overtime premiums</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-heading font-semibold text-white">Data Integrity & CRM Sync</td>
                  <td className="py-3.5 px-4">Manual post-call summary notes; prone to missed details</td>
                  <td className="py-3.5 px-4 text-accent font-bold">100% structured JSON extraction & instant CRM webhook push</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-heading font-semibold text-white">Response Latency</td>
                  <td className="py-3.5 px-4">3 to 7 rings average; high abandoned call drop-off rate</td>
                  <td className="py-3.5 px-4 text-accent font-bold">First-ring pickup (&lt;600ms conversational latency)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Implementation FAQ Accordion */}
      <div className="my-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <Workflow size={14} />
            <span>TECHNICAL SPECIFICATIONS & FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Voice Agent Implementation FAQ
          </h2>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {calculatorFaqs.map((faq, idx) => {
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
          Ready to Audit Your Inbound Telephony Architecture?
        </h2>
        <p className="text-brand-secondary text-base sm:text-lg max-w-2xl mx-auto mb-8 font-body">
          Connect directly with Sheharyar Siraj. We evaluate your current call volume, design prompt state machines, benchmark speech latency budgets, and deliver a production-grade voice agent prototype.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-sm font-bold tracking-wider bg-accent text-black hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(183,255,60,0.4)] active:scale-95"
          >
            <MessageSquare size={18} />
            <span>BOOK A SYSTEM AUDIT VIA WHATSAPP</span>
          </a>

          <button
            type="button"
            onClick={onOpenInquiry}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-sm font-bold tracking-wider bg-surface-2 hover:bg-surface-3 border border-brand-border text-white transition-all flex items-center justify-center gap-2"
          >
            <span>SUBMIT ARCHITECTURE INQUIRY</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default VoiceAgentRoiCalculatorPage;
