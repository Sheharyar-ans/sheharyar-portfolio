import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  Phone, 
  PhoneOff,
  Sparkles, 
  Radio, 
  ArrowUpRight, 
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Mail,
  User,
  FileText,
  BadgePercent,
  ChevronDown
} from 'lucide-react';
import { processRagQuery, ChatMessage, isDirectInterestIntent } from '../utils/ragEngine';
import { dispatchLeadNotification, isValidPhoneNumber } from '../utils/emailDispatch';

type VoiceState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'permission_denied' | 'unsupported';

interface VoiceAssistantModalProps {
  onOpenInquiry?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

// Clean markdown, bold tags, URLs, and emojis for crisp, natural speech synthesis
function cleanTextForSpeech(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/[#*_`~>]/g, '')
    .replace(/•\s+/g, '')
    .replace(/\+\d[\d\s-]{8,}\d/g, (match) => match.replace(/\s+/g, ' '))
    .replace(/\n+/g, ' ')
    .trim();
}

// Restrict speech synthesis output to 1-3 conversational, punchy sentences (20-45 words)
function formatSpokenResponse(text: string): string {
  const cleaned = cleanTextForSpeech(text);
  if (!cleaned) return '';
  const sentences = cleaned.match(/[^.!?]+[.!?]+(?:\s|$)/g);
  if (!sentences || sentences.length <= 3) {
    return cleaned;
  }
  return sentences.slice(0, 3).join(' ').trim();
}

// Comprehensive blacklist of female voice keywords across Windows, macOS, iOS, Android, and Linux
const FEMALE_VOICE_KEYWORDS = [
  'female', 'woman', 'girl', 'fem',
  'samantha', 'zira', 'jenny', 'victoria', 'aria', 'karen', 'moira', 'fiona',
  'tessa', 'susan', 'cynthia', 'hazel', 'heera', 'helena', 'hortense', 'huihui',
  'ayumi', 'haruka', 'yuna', 'kyoko', 'ava', 'emma', 'olivia', 'sonia', 'natasha',
  'stephanie', 'veena', 'linda', 'alice', 'catherine', 'salli', 'kimberly', 'kendra',
  'joanna', 'ivy', 'allison', 'kate', 'serena', 'nicky', 'sandy', 'shelley', 'kathy',
  'flo', 'grandma', 'bahh', 'alva', 'agnes', 'amira', 'charlotte', 'laura', 'anna',
  'sarah', 'sara', 'clara', 'elena', 'monica', 'paulina', 'luciana', 'daria', 'ioana',
  'miren', 'ellen', 'maja', 'dora', 'monika', 'helene', 'chloe', 'zoe', 'amelie',
  'celeste', 'lea', 'manon', 'sin-ji', 'ting-ting', 'ya-ling', 'meijia', 'sinji',
  '#female', 'female_1', 'female_2', '-tpc', 'sfg#female'
];

// Verified high-quality American Male voices in strict priority order
const PREFERRED_MALE_IDENTIFIERS = [
  // Edge / Azure Natural US English Male (Soft, human, calm tone)
  'natural (male)',
  'natural - english (united states)',
  'guy',
  'christopher',
  'eric',
  'brian',
  'roger',
  'steffan',
  // Apple / iOS US English Male (Very warm, calm American male accents)
  'alex',
  'aaron',
  'eddy',
  'reed',
  'rocko',
  'fred',
  'junior',
  'grandpa',
  // Android Google US English Male voices
  'en-us-x-sfg#male',
  'en-us-x-iom',
  'en-us-x-iol',
  'en-us-x-tpd',
  // Windows Desktop US English Male
  'microsoft david',
  'microsoft mark',
  'david',
  'mark',
  // Commonwealth English Male fallbacks
  'daniel',
  'george',
  'oliver',
  'arthur',
  'ryan'
];

function selectCalmAmericanMaleVoice(customVoices?: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = customVoices && customVoices.length > 0 ? customVoices : window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const isStrictlyNonFemale = (v: SpeechSynthesisVoice) => {
    const name = v.name.toLowerCase();
    const uri = (v.voiceURI || '').toLowerCase();
    
    // Check both name and voiceURI against blacklist
    const hasFemaleTag = FEMALE_VOICE_KEYWORDS.some((kw) => name.includes(kw) || uri.includes(kw));
    if (hasFemaleTag) return false;

    // Reject Android default "Google US English" because it is a female engine on Android
    if (name === 'google us english' && !uri.includes('male') && !name.includes('male')) {
      return false;
    }
    return true;
  };

  const eligibleVoices = voices.filter(isStrictlyNonFemale);

  // 1. Highest Priority: Preferred American Male voices in en-US
  for (const identifier of PREFERRED_MALE_IDENTIFIERS) {
    const match = eligibleVoices.find((v) => {
      const isUsLang = v.lang === 'en-US' || v.lang.startsWith('en-US') || v.lang === 'en_US';
      const name = v.name.toLowerCase();
      const uri = (v.voiceURI || '').toLowerCase();
      return isUsLang && (name.includes(identifier) || uri.includes(identifier));
    });
    if (match) return match;
  }

  // 2. Any en-US voice explicitly tagged male
  const usExplicitMale = eligibleVoices.find((v) => {
    const isUsLang = v.lang === 'en-US' || v.lang.startsWith('en-US') || v.lang === 'en_US';
    const name = v.name.toLowerCase();
    const uri = (v.voiceURI || '').toLowerCase();
    return isUsLang && (name.includes('male') || uri.includes('male'));
  });
  if (usExplicitMale) return usExplicitMale;

  // 3. Fallback to English Male voices in any other dialect
  for (const identifier of PREFERRED_MALE_IDENTIFIERS) {
    const match = eligibleVoices.find((v) => {
      const isEnglish = v.lang.startsWith('en');
      const name = v.name.toLowerCase();
      const uri = (v.voiceURI || '').toLowerCase();
      return isEnglish && (name.includes(identifier) || uri.includes(identifier));
    });
    if (match) return match;
  }

  // 4. Any English voice explicitly tagged male
  const anyEnglishMale = eligibleVoices.find((v) => {
    const isEnglish = v.lang.startsWith('en');
    const name = v.name.toLowerCase();
    const uri = (v.voiceURI || '').toLowerCase();
    return isEnglish && (name.includes('male') || uri.includes('male'));
  });
  if (anyEnglishMale) return anyEnglishMale;

  // 5. Any remaining non-female US English voice
  const usNonFemale = eligibleVoices.find(
    (v) => v.lang === 'en-US' || v.lang.startsWith('en-US') || v.lang === 'en_US'
  );
  if (usNonFemale) return usNonFemale;

  // 6. Any non-female English voice
  const englishNonFemale = eligibleVoices.find((v) => v.lang.startsWith('en'));
  if (englishNonFemale) return englishNonFemale;

  return eligibleVoices.length > 0 ? eligibleVoices[0] : voices[0];
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  onOpenInquiry,
  isOpen: controlledIsOpen,
  onClose: controlledOnClose
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isModalOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');
  const [aiTranscript, setAiTranscript] = useState(
    'Hi! I am Sheharyar Siraj\'s Voice AI Assistant. You can ask me anything about high-speed WordPress VIP architecture, sub-600ms AI voice agents, or enterprise n8n workflow automations.'
  );
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([]);
  const [audioLevel, setAudioLevel] = useState(0);

  // Dynamic Sales Intent & Lead Capture Overlay State
  const [isLeadOverlayOpen, setIsLeadOverlayOpen] = useState(false);
  const [voiceLeadForm, setVoiceLeadForm] = useState({
    name: '',
    whatsapp: '',
    email: '',
    details: ''
  });
  const [voiceLeadSubmitted, setVoiceLeadSubmitted] = useState(false);
  const [isSubmittingVoiceLead, setIsSubmittingVoiceLead] = useState(false);
  const [voiceLeadError, setVoiceLeadError] = useState('');

  // Audio Context & Stream Refs for Real-Time Visualizer
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Web Speech API Refs & Turn-Taking Loop Synchronization
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isModalOpenRef = useRef(isModalOpen);
  const isMutedRef = useRef(isMuted);
  const isSpeakingRef = useRef(false);
  const isThinkingRef = useRef(false);
  const isListeningRef = useRef(false);
  const startListeningRef = useRef<() => void>(() => {});

  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Synchronize state values into persistent refs to eliminate stale closure bugs
  useEffect(() => {
    isModalOpenRef.current = isModalOpen;
  }, [isModalOpen]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Initialize dynamic Speech Synthesis voice loading listener
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const loadVoices = () => {
        const v = window.speechSynthesis.getVoices();
        if (v && v.length > 0) {
          setAvailableVoices(v);
        }
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
      return () => {
        if (window.speechSynthesis) {
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
    }
  }, []);

  // BUG 1: DEDICATED CLEANUP FUNCTION - PROPER MEDIA STREAM CLEANUP & TAB INDICATOR RELEASE
  const cleanupMedia = useCallback(() => {
    // 1. Stop all microphone hardware tracks immediately and release hardware lock
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
        track.enabled = false;
      });
      streamRef.current = null;
    }

    // 2. Disconnect nodes and close/suspend AudioContext
    if (sourceRef.current) {
      try {
        sourceRef.current.disconnect();
      } catch {}
      sourceRef.current = null;
    }

    if (analyserRef.current) {
      try {
        analyserRef.current.disconnect();
      } catch {}
      analyserRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }

    // 3. Stop speech recognition and disconnect listeners to guarantee no zombie restarts
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onend = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onspeechend = null;
        recognitionRef.current.abort();
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }

    // 4. Cancel active SpeechSynthesis utterances
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // 5. Cancel animation frames & debounce timers
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    // 6. Reset states and control refs
    isSpeakingRef.current = false;
    isThinkingRef.current = false;
    isListeningRef.current = false;
    setVoiceState('idle');
    setAudioLevel(0);
  }, []);

  // Initialize Web Audio Mic Stream for Visualizer with Hardware Echo Cancellation
  const initMicrophoneAudioContext = useCallback(async () => {
    try {
      if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) return;
      
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      streamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      sourceRef.current = source;
      source.connect(analyser);

      const buffer = new Uint8Array(analyser.frequencyBinCount);
      const checkVolume = () => {
        if (analyserRef.current && isModalOpenRef.current) {
          analyserRef.current.getByteFrequencyData(buffer);
          let sum = 0;
          for (let i = 0; i < buffer.length; i++) {
            sum += buffer[i];
          }
          const avg = sum / buffer.length;
          setAudioLevel(avg);

          // Full-Duplex VAD Barge-in: If user speaks into the microphone (avg > 22) while bot is speaking,
          // instantly interrupt and cancel the bot's speech!
          if (isSpeakingRef.current && avg > 22) {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
              window.speechSynthesis.cancel();
            }
            isSpeakingRef.current = false;
            setVoiceState('listening');
          }
        }
        if (isModalOpenRef.current) {
          animationFrameRef.current = requestAnimationFrame(checkVolume);
        }
      };
      checkVolume();
    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setVoiceState('permission_denied');
      }
    }
  }, []);

  // Speak AI response using soft American male voice & enable instant user interruption (Barge-in)
  const speakResponse = useCallback(
    (textToSpeak: string, onFinish?: () => void) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) {
        if (onFinish) onFinish();
        return;
      }

      window.speechSynthesis.cancel();
      const cleanText = formatSpokenResponse(textToSpeak);
      if (!cleanText || !isModalOpenRef.current) {
        if (onFinish) {
          onFinish();
        } else if (isModalOpenRef.current && !isMutedRef.current) {
          startListeningRef.current();
        }
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Dynamic live voice resolution for mobile & desktop engines
      const liveVoices = window.speechSynthesis.getVoices();
      const voiceList = liveVoices && liveVoices.length > 0 ? liveVoices : availableVoices;
      const voice = selectCalmAmericanMaleVoice(voiceList);
      if (voice) {
        utterance.voice = voice;
      }
      
      // Calibrated tone & cadence tuning: calm, soft-tone American male
      // Pitch set to 0.88 shifts the voice down into a deep, gentle, warm male timbre
      utterance.pitch = 0.88;
      utterance.rate = 0.98;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        isSpeakingRef.current = true;
        setVoiceState('speaking');

        // BARGE-IN FEATURE: Keep microphone recognizer active so user can cut in and interrupt anytime!
        if (isModalOpenRef.current && !isMutedRef.current && !isListeningRef.current) {
          startListeningRef.current();
        }
      };

      const handleSpeechComplete = () => {
        isSpeakingRef.current = false;
        if (onFinish) {
          onFinish();
        } else if (isModalOpenRef.current && !isMutedRef.current) {
          // Loop back to listening for the user's next question!
          setVoiceState('listening');
          setTimeout(() => {
            if (isModalOpenRef.current && !isSpeakingRef.current && !isThinkingRef.current && !isMutedRef.current) {
              startListeningRef.current();
            }
          }, 150);
        } else {
          setVoiceState('idle');
        }
      };

      utterance.onend = handleSpeechComplete;
      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        handleSpeechComplete();
      };

      window.speechSynthesis.speak(utterance);
    },
    [availableVoices]
  );

  // BUG 2: STATE 4 - Execute AI query with Grounded Knowledge Engine & Sales Trigger
  const processVoiceInput = useCallback(
    async (spokenQuery: string) => {
      if (!spokenQuery.trim() || !isModalOpenRef.current) return;

      // Abort recognizer during processing to prevent self-transcription
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onend = null;
          recognitionRef.current.abort();
        } catch {}
        recognitionRef.current = null;
      }
      isListeningRef.current = false;
      isThinkingRef.current = true;
      setVoiceState('thinking');
      setUserTranscript(spokenQuery);

      const userMsg: ChatMessage = {
        id: `voice-user-${Date.now()}`,
        sender: 'user',
        text: spokenQuery,
        timestamp: 'Just now'
      };

      setConversationHistory((prev) => [...prev, userMsg]);

      // Check for buying signals / "I am interested" trigger
      const hasDirectInterest = isDirectInterestIntent(spokenQuery);

      if (hasDirectInterest) {
        const salesResponse =
          "That's fantastic! Sheharyar specializes in turning high-load bottlenecks into scalable systems. To send you an architectural scope and roadmap within 2 hours, what is your best WhatsApp number and email?";
        
        isThinkingRef.current = false;
        setAiTranscript(salesResponse);
        setIsLeadOverlayOpen(true);
        setVoiceLeadForm((prev) => ({
          ...prev,
          details: prev.details || `Spoken interest: "${spokenQuery}"`
        }));

        const botMsg: ChatMessage = {
          id: `voice-ai-${Date.now()}`,
          sender: 'assistant',
          text: salesResponse,
          timestamp: 'Just now',
          mode: 'sales',
          showLeadForm: true
        };
        setConversationHistory((prev) => [...prev, botMsg]);

        // STATE 5: AI RESPONSE GENERATED -> speak response, then utterance.onend loops back to listening
        speakResponse(salesResponse);
        return;
      }

      try {
        const result = await processRagQuery(spokenQuery, [...conversationHistory, userMsg]);
        isThinkingRef.current = false;

        // Keep spoken answers concise (1 to 3 spoken sentences per turn) for natural telephony back-and-forth
        const spokenAnswer = formatSpokenResponse(result.answer);
        setAiTranscript(spokenAnswer);

        if (result.showLeadForm || result.mode === 'sales') {
          setIsLeadOverlayOpen(true);
          setVoiceLeadForm((prev) => ({
            ...prev,
            details: prev.details || `Inquiry topic: "${spokenQuery}"`
          }));
        }

        const botMsg: ChatMessage = {
          id: `voice-ai-${Date.now()}`,
          sender: 'assistant',
          text: spokenAnswer,
          timestamp: 'Just now',
          mode: result.mode,
          action: result.action,
          showLeadForm: result.showLeadForm
        };
        setConversationHistory((prev) => [...prev, botMsg]);

        // STATE 5: AI RESPONSE GENERATED -> speak response, then utterance.onend loops back to listening
        speakResponse(spokenAnswer);
      } catch (err) {
        console.error('Voice RAG processing error:', err);
        isThinkingRef.current = false;
        const fallback = 'I am ready to help with your project! You can connect directly with Sheharyar on WhatsApp at +92 313 2080033 for immediate scoping under our 2-hour SLA.';
        setAiTranscript(fallback);
        speakResponse(fallback);
      }
    },
    [conversationHistory, speakResponse]
  );

  // Web Speech API User Listening Loop with Barge-In Support
  const startListening = useCallback(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceState('unsupported');
      return;
    }

    // Do not listen if call ended, muted, or AI is currently thinking
    // NOTE: Allowed to listen while isSpeakingRef.current is true to support Barge-In!
    if (!isModalOpenRef.current || isMutedRef.current || isThinkingRef.current) {
      return;
    }

    // Abort existing instance cleanly
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onend = null;
        recognitionRef.current.abort();
      } catch {}
      recognitionRef.current = null;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      if (!isModalOpenRef.current || isThinkingRef.current) {
        try { recognition.abort(); } catch {}
        return;
      }
      isListeningRef.current = true;
      if (!isSpeakingRef.current) {
        setVoiceState('listening');
      }
    };

    // BARGE-IN INTERRUPTION 1: On human speech start, immediately stop bot from talking!
    recognition.onspeechstart = () => {
      if (isSpeakingRef.current) {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        isSpeakingRef.current = false;
        setVoiceState('listening');
      }
    };

    // BARGE-IN INTERRUPTION 2: On sound start
    recognition.onsoundstart = () => {
      if (isSpeakingRef.current) {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        isSpeakingRef.current = false;
        setVoiceState('listening');
      }
    };

    // STATE 3: USER_SPEAKING - Accumulate transcript & cut off bot if interrupted
    recognition.onresult = (event: any) => {
      if (isThinkingRef.current || !isModalOpenRef.current) {
        return;
      }

      // BARGE-IN INTERRUPTION 3: Cut off bot speech if words detected
      if (isSpeakingRef.current) {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        isSpeakingRef.current = false;
        setVoiceState('listening');
      }

      let interim = '';
      let finalSpeech = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalSpeech += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      const activeText = finalSpeech || interim;
      if (activeText) {
        setUserTranscript(activeText);
      }

      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }

      // STATE 4: USER_FINISHED_SPEAKING -> Stop recognition, transition to Thinking, query AI
      if (finalSpeech.trim()) {
        try {
          recognition.stop();
        } catch {}
        isListeningRef.current = false;
        isThinkingRef.current = true;
        setVoiceState('thinking');
        processVoiceInput(finalSpeech.trim());
      } else if (interim.trim()) {
        // Auto-commit interim after 1400ms pause
        silenceTimerRef.current = setTimeout(() => {
          if (isModalOpenRef.current && !isThinkingRef.current && interim.trim()) {
            try {
              recognition.stop();
            } catch {}
            isListeningRef.current = false;
            isThinkingRef.current = true;
            setVoiceState('thinking');
            processVoiceInput(interim.trim());
          }
        }, 1400);
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'not-allowed') {
        setVoiceState('permission_denied');
      } else if (event.error !== 'no-speech' && event.error !== 'aborted') {
        console.warn('SpeechRecognition warning:', event.error);
      }
    };

    recognition.onend = () => {
      isListeningRef.current = false;
      // Re-trigger listening ONLY if modal is still active, not thinking, and not muted
      if (isModalOpenRef.current && !isThinkingRef.current && !isMutedRef.current) {
        try {
          recognition.start();
          isListeningRef.current = true;
        } catch {}
      }
    };

    try {
      recognition.start();
      isListeningRef.current = true;
    } catch {}
  }, [processVoiceInput]);

  // Keep ref up to date to resolve circular dependency between speakResponse and startListening
  startListeningRef.current = startListening;

  // Open modal handler
  const handleOpen = () => {
    if (controlledIsOpen !== undefined && controlledOnClose) {
      // Controlled
    } else {
      setInternalIsOpen(true);
    }
  };

  // Total Session Termination (Session Out): Releases hardware locks and flushes conversation state
  const endCallSession = useCallback(() => {
    isModalOpenRef.current = false;
    
    // 1. Release hardware mic tracks and close Web Audio Context
    cleanupMedia();

    // 2. Clear all session context & history (Session Out)
    setUserTranscript('');
    setAiTranscript(
      'Hi! I am Sheharyar Siraj\'s Voice AI Assistant. You can ask me anything about high-speed WordPress VIP architecture, sub-600ms AI voice agents, or enterprise n8n workflow automations.'
    );
    setConversationHistory([]);
    setIsLeadOverlayOpen(false);
    setVoiceLeadSubmitted(false);
    setVoiceLeadError('');
    setVoiceLeadForm({
      name: '',
      whatsapp: '',
      email: '',
      details: ''
    });
    setVoiceState('idle');
    setIsMuted(false);
    isMutedRef.current = false;
    setAudioLevel(0);

    // 3. Close the modal UI
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
  }, [cleanupMedia, controlledOnClose]);

  const handleClose = endCallSession;

  // Lifecycle when modal is opened / closed (locks body scroll and initiates conversational flow)
  useEffect(() => {
    isModalOpenRef.current = isModalOpen;
    if (isModalOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Setup microphone visualizer stream
      initMicrophoneAudioContext();

      // Initial spoken greeting: bot speaks FIRST, recognizer starts automatically when bot finishes (STATE 2)
      const greetingTimer = setTimeout(() => {
        if (isModalOpenRef.current) {
          speakResponse(
            'Hello! I am Sheharyar Siraj\'s Voice AI Assistant. How can I assist you with custom WordPress VIP architecture, voice telephony, or workflow automations today?'
          );
        }
      }, 400);

      return () => {
        clearTimeout(greetingTimer);
        document.body.style.overflow = prevOverflow;
        cleanupMedia();
      };
    } else {
      cleanupMedia();
    }
  }, [cleanupMedia, initMicrophoneAudioContext, isModalOpen, speakResponse]);

  // Keyboard shortcut listener (Escape to close and cleanup immediately)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose, isModalOpen]);

  // Toggle Mute / Mic Listening
  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      isMutedRef.current = false;
      startListeningRef.current();
    } else {
      setIsMuted(true);
      isMutedRef.current = true;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onend = null;
          recognitionRef.current.abort();
        } catch {}
        recognitionRef.current = null;
      }
      isListeningRef.current = false;
      setVoiceState('idle');
    }
  };

  // Interrupt / Stop bot from speaking
  const handleInterrupt = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    isSpeakingRef.current = false;
    if (!isMutedRef.current) {
      setVoiceState('listening');
      startListeningRef.current();
    } else {
      setVoiceState('idle');
    }
  };

  // Reset conversation
  const handleResetConversation = () => {
    cleanupMedia();
    setUserTranscript('');
    setAiTranscript('Conversation reset. What can Sheharyar build or automate for your business?');
    setConversationHistory([]);
    setIsLeadOverlayOpen(false);
    setVoiceLeadSubmitted(false);
    setVoiceState('idle');
    initMicrophoneAudioContext();
    setTimeout(() => {
      if (isModalOpenRef.current) {
        speakResponse('Conversation reset. What can Sheharyar build or automate for your business?');
      }
    }, 200);
  };

  // Lead submission dispatcher
  const handleVoiceLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVoiceLeadError('');

    if (!voiceLeadForm.name.trim()) {
      setVoiceLeadError('Please enter your full name.');
      return;
    }
    if (!voiceLeadForm.whatsapp.trim()) {
      setVoiceLeadError('WhatsApp number is required for 2-hour SLA response.');
      return;
    }
    if (!isValidPhoneNumber(voiceLeadForm.whatsapp)) {
      setVoiceLeadError('Please enter a valid phone number with country code (e.g. +1 555 0192 or +92 313 2080033).');
      return;
    }
    if (!voiceLeadForm.email.trim() || !voiceLeadForm.email.includes('@')) {
      setVoiceLeadError('Please enter a valid email address.');
      return;
    }

    setIsSubmittingVoiceLead(true);

    const transcriptExcerpt = conversationHistory
      .slice(-4)
      .map((m) => `${m.sender.toUpperCase()}: ${m.text}`)
      .join('\n');

    const result = await dispatchLeadNotification({
      source: 'Interactive Voice Bot',
      name: voiceLeadForm.name,
      email: voiceLeadForm.email,
      whatsapp: voiceLeadForm.whatsapp,
      service: 'AI Voice / Architecture Scoping',
      details: voiceLeadForm.details || `Voice inquiry: ${userTranscript || 'Direct Voice Scoping'}`,
      transcriptExcerpt
    });

    setIsSubmittingVoiceLead(false);
    setVoiceLeadSubmitted(true);

    const confirmationSpeech =
      'Thank you! Your inquiry and WhatsApp details have been dispatched directly to Sheharyar. He will get back to you within 2 hours.';

    if (result.success) {
      setAiTranscript(confirmationSpeech);
      speakResponse(confirmationSpeech);
    } else {
      const fallbackNotice =
        'Thank you! We registered your details, but encountered a network dispatch delay. You can connect immediately on WhatsApp at +92 313 2080033.';
      setAiTranscript(fallbackNotice);
      speakResponse(fallbackNotice);
    }
  };

  // Compute visualizer orb scale based on real-time mic volume or simulated bot frequency
  const visualScale =
    voiceState === 'speaking'
      ? 1.1 + Math.sin(Date.now() / 150) * 0.08
      : voiceState === 'listening'
      ? 1 + Math.min(audioLevel / 120, 0.35)
      : voiceState === 'thinking'
      ? 1.05
      : 1;

  return (
    <>
      {/* Floating Trigger Button: Short Circle on Right Side */}
      {!isModalOpen && controlledIsOpen === undefined && (
        <div className="fixed bottom-20 right-5 sm:bottom-23 sm:right-6 z-40">
          <button
            onClick={handleOpen}
            className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-surface-1/95 border border-brand-border/80 hover:border-emerald-400 text-emerald-400 shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 backdrop-blur-md"
            aria-label="Open Autonomous Voice AI Assistant"
            title="Talk to Voice AI Assistant"
          >
            <Mic size={20} className="sm:w-[22px] sm:h-[22px] animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-surface-1 animate-ping" />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-surface-2 border border-brand-border text-white text-xs font-mono font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-xl hidden sm:block">
              Talk to AI Voice
            </span>
          </button>
        </div>
      )}

      {/* Full-Screen Viewport-Fitting Modal (Zero Cut-Off Architecture) */}
      {isModalOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-0 sm:p-4 md:p-6 animate-fade-in font-body select-none overflow-hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div className="relative w-full h-[100dvh] max-h-[100dvh] sm:h-auto sm:max-h-[85vh] md:max-h-[88vh] sm:max-w-lg md:max-w-xl bg-surface-1/95 border-0 sm:border sm:border-brand-border rounded-none sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden pb-[env(safe-area-inset-bottom,0px)]">
            
            {/* Pinned Header (shrink-0) */}
            <div className="p-3.5 sm:p-4 bg-surface-2/80 border-b border-brand-border flex items-center justify-between backdrop-blur-md shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Radio size={16} className="animate-pulse" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-2" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-xs sm:text-sm text-white">
                      Sheharyar Siraj AI Voice
                    </h3>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 ${
                        voiceState === 'listening'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : voiceState === 'thinking'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                          : voiceState === 'speaking'
                          ? 'bg-accent/20 text-accent border border-accent/40'
                          : 'bg-surface-3 text-brand-muted border border-brand-border'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                      {voiceState === 'listening'
                        ? 'Listening'
                        : voiceState === 'thinking'
                        ? 'Synthesizing'
                        : voiceState === 'speaking'
                        ? 'Speaking'
                        : isMuted
                        ? 'Muted'
                        : 'Ready'}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-brand-muted">
                    Calm American Male Voice • Sub-2h SLA Scoping
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetConversation}
                  className="w-7 h-7 rounded-lg hover:bg-surface-3 text-brand-muted hover:text-white transition-colors flex items-center justify-center"
                  title="Reset voice conversation"
                >
                  <RotateCcw size={14} />
                </button>

                <button
                  onClick={handleClose}
                  className="w-7 h-7 rounded-lg hover:bg-surface-3 text-brand-muted hover:text-white transition-colors flex items-center justify-center"
                  title="End voice session (Escape)"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Main Interactive Screen (Zero scrollbars on visualizer) */}
            {!isLeadOverlayOpen ? (
              <div className="flex-1 flex flex-col justify-between overflow-hidden bg-radial from-accent/10 via-surface-1 to-surface-1 p-3.5 sm:p-5 md:p-6">
                
                {/* Central Interactive Audio Wave / Glowing Orb */}
                <div className="relative flex flex-col items-center justify-center my-auto py-1 sm:py-2">
                  {/* Outer Ripple Waves */}
                  {voiceState === 'listening' && (
                    <>
                      <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-emerald-500/20 animate-ping [animation-duration:2.5s]" />
                      <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-accent/20 animate-ping [animation-duration:3.5s]" />
                    </>
                  )}

                  {voiceState === 'speaking' && (
                    <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-accent/15 blur-2xl animate-pulse" />
                  )}

                  {/* Central Orb */}
                  <div
                    style={{ transform: `scale(${visualScale})` }}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer shadow-2xl ${
                      voiceState === 'speaking'
                        ? 'bg-gradient-to-tr from-accent via-emerald-400 to-cyan-300 shadow-[0_0_40px_rgba(30,144,255,0.5)]'
                        : voiceState === 'thinking'
                        ? 'bg-gradient-to-tr from-amber-400 via-accent to-purple-500 animate-spin [animation-duration:4s] shadow-[0_0_35px_rgba(251,191,36,0.5)]'
                        : voiceState === 'listening'
                        ? 'bg-gradient-to-tr from-emerald-500 via-teal-400 to-accent shadow-[0_0_40px_rgba(16,185,129,0.5)]'
                        : 'bg-gradient-to-tr from-surface-3 via-accent/30 to-surface-2 border border-brand-border/80 shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                    }`}
                    onClick={voiceState === 'speaking' ? handleInterrupt : toggleMute}
                    title={voiceState === 'speaking' ? 'Click to interrupt' : 'Click to toggle mute'}
                  >
                    {/* Glowing Core */}
                    <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-surface-1/80 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      {voiceState === 'speaking' ? (
                        <Volume2 size={24} className="text-accent animate-pulse" />
                      ) : voiceState === 'thinking' ? (
                        <Sparkles size={24} className="text-amber-300 animate-bounce" />
                      ) : isMuted ? (
                        <MicOff size={24} className="text-red-400" />
                      ) : (
                        <Mic size={24} className="text-emerald-400 animate-pulse" />
                      )}
                    </div>
                  </div>

                  {/* Dynamic Sound Frequency Bars */}
                  <div className="flex items-center gap-1.5 mt-3 sm:mt-4 h-5 sm:h-6">
                    {[0.4, 0.7, 1.0, 0.8, 0.5, 0.9, 1.2, 0.6, 1.1, 0.7, 0.5].map((multiplier, i) => {
                      const barHeight =
                        voiceState === 'speaking'
                          ? Math.max(5, Math.sin(Date.now() / 100 + i) * 16 * multiplier + 8)
                          : voiceState === 'listening'
                          ? Math.max(4, (audioLevel / 12) * multiplier + 4)
                          : 3;

                      return (
                        <div
                          key={i}
                          style={{ height: `${barHeight}px` }}
                          className={`w-1 rounded-full transition-all duration-75 ${
                            voiceState === 'speaking'
                              ? 'bg-gradient-to-t from-accent to-emerald-400'
                              : voiceState === 'listening'
                              ? 'bg-gradient-to-t from-emerald-500 to-cyan-300'
                              : 'bg-surface-3'
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Micro Helper prompt */}
                  <p className="text-[10px] sm:text-[11px] font-mono text-brand-muted mt-2 text-center">
                    {voiceState === 'listening'
                      ? 'Say: "I am interested in scoping a custom WordPress or Voice AI system"'
                      : voiceState === 'thinking'
                      ? 'Consulting Sheharyar\'s verified engineering dossiers...'
                      : voiceState === 'speaking'
                      ? 'Tap orb or click Interrupt to cut in'
                      : isMuted
                      ? 'Microphone muted. Tap to speak.'
                      : 'Listening will resume automatically...'}
                  </p>
                </div>

                {/* Error & Fallback Warnings */}
                {voiceState === 'permission_denied' && (
                  <div className="my-1.5 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-start gap-2">
                    <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-400" />
                    <div className="text-[11px]">
                      <span className="font-bold">Microphone Permission Required: </span>
                      Please allow microphone access in your browser, or switch to WhatsApp.
                    </div>
                  </div>
                )}

                {voiceState === 'unsupported' && (
                  <div className="my-1.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-start gap-2">
                    <AlertCircle size={15} className="shrink-0 mt-0.5 text-amber-400" />
                    <div className="text-[11px]">
                      <span className="font-bold">Web Speech API Unsupported: </span>
                      Use Chrome, Edge, or Safari, or switch to the text AI Chatbot.
                    </div>
                  </div>
                )}

                {/* Compact Live Captions Strip (shrink-0) */}
                <div className="mt-2 p-2.5 sm:p-3 rounded-xl bg-surface-2/80 border border-brand-border/80 text-xs space-y-1 shrink-0">
                  <div className="flex items-center gap-1.5 text-brand-muted font-mono text-[10px] uppercase tracking-wider">
                    <Mic size={10} className="text-emerald-400" />
                    <span>You Said:</span>
                    <span className="text-white italic truncate max-w-[260px] sm:max-w-[360px]">
                      {userTranscript ? `"${userTranscript}"` : '(Awaiting your voice...)'}
                    </span>
                  </div>

                  <div className="flex items-start gap-1.5 text-brand-secondary text-[11px] leading-relaxed line-clamp-2">
                    <Sparkles size={11} className="text-accent shrink-0 mt-0.5" />
                    <span>{aiTranscript}</span>
                  </div>
                </div>

              </div>
            ) : (
              /* High-Converting On-Screen Lead Capture Overlay */
              <div className="flex-1 overflow-y-auto overscroll-contain custom-scrollbar p-4 sm:p-5 bg-surface-1">
                {!voiceLeadSubmitted ? (
                  <form onSubmit={handleVoiceLeadSubmit} className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-brand-border/60">
                      <div className="flex items-center gap-1.5 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
                        <BadgePercent size={14} />
                        <span>Direct Calendar Invite &amp; Scoping Brief</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsLeadOverlayOpen(false)}
                        className="text-[11px] font-mono text-brand-muted hover:text-white flex items-center gap-1"
                      >
                        <span>Back to Voice</span>
                        <ChevronDown size={12} />
                      </button>
                    </div>

                    <p className="text-xs text-brand-secondary leading-relaxed font-body">
                      Leave your WhatsApp &amp; Email below for Sheharyar&apos;s direct calendar invite.
                    </p>

                    {voiceLeadError && (
                      <p className="text-[11px] font-mono text-red-400 bg-red-500/10 p-2 rounded border border-red-500/20">
                        {voiceLeadError}
                      </p>
                    )}

                    <div>
                      <label className="block text-[10px] font-mono text-brand-muted uppercase mb-1">
                        Your Full Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <User size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-muted" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. David Miller"
                          value={voiceLeadForm.name}
                          onChange={(e) => setVoiceLeadForm({ ...voiceLeadForm, name: e.target.value })}
                          className="w-full pl-8 pr-3 py-2 rounded-lg bg-surface-2 border border-brand-border text-white text-xs placeholder-brand-muted focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-mono text-brand-muted uppercase mb-1">
                          WhatsApp / Phone <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <Phone size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-muted" />
                          <input
                            type="tel"
                            required
                            placeholder="+1 (555) 000-0000"
                            value={voiceLeadForm.whatsapp}
                            onChange={(e) => setVoiceLeadForm({ ...voiceLeadForm, whatsapp: e.target.value })}
                            className="w-full pl-8 pr-3 py-2 rounded-lg bg-surface-2 border border-brand-border text-white text-xs placeholder-brand-muted focus:outline-none focus:border-accent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-brand-muted uppercase mb-1">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <Mail size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-muted" />
                          <input
                            type="email"
                            required
                            placeholder="name@company.com"
                            value={voiceLeadForm.email}
                            onChange={(e) => setVoiceLeadForm({ ...voiceLeadForm, email: e.target.value })}
                            className="w-full pl-8 pr-3 py-2 rounded-lg bg-surface-2 border border-brand-border text-white text-xs placeholder-brand-muted focus:outline-none focus:border-accent"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-brand-muted uppercase mb-1">
                        Project Topic / Architecture Needs
                      </label>
                      <div className="relative">
                        <FileText size={13} className="absolute left-2.5 top-2.5 text-brand-muted" />
                        <textarea
                          rows={2}
                          placeholder="e.g. Need high-concurrency WooCommerce or Vapi voice agent..."
                          value={voiceLeadForm.details}
                          onChange={(e) => setVoiceLeadForm({ ...voiceLeadForm, details: e.target.value })}
                          className="w-full pl-8 pr-3 py-2 rounded-lg bg-surface-2 border border-brand-border text-white text-xs placeholder-brand-muted focus:outline-none focus:border-accent resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingVoiceLead}
                      className="w-full py-2.5 rounded-lg bg-accent text-black font-mono font-bold text-xs hover:bg-white transition-colors shadow-md shadow-accent/20 flex items-center justify-center gap-1.5 mt-1 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmittingVoiceLead ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>DISPATCHING LEAD BRIEF...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={13} />
                          <span>Lock In Scoping Call &amp; Direct Calendar Invite</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* Confirmed State */
                  <div className="p-4 sm:p-6 text-center space-y-3 my-auto">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={24} />
                    </div>
                    <h4 className="font-heading font-bold text-white text-base">
                      Lead Brief Dispatched to Sheharyar Siraj!
                    </h4>
                    <p className="text-xs text-brand-secondary leading-relaxed">
                      Thank you! Your inquiry and WhatsApp details have been dispatched directly to Sheharyar. He will get back to you within 2 hours.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                      <a
                        href={`https://wa.me/923132080033?text=${encodeURIComponent(
                          `Hi Sheharyar, my name is ${voiceLeadForm.name}. I just submitted my voice scoping request via your website.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-black font-mono font-bold text-xs hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                      >
                        <Phone size={13} className="fill-current" />
                        <span>Chat on WhatsApp (+92 313 2080033)</span>
                        <ArrowUpRight size={13} />
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setIsLeadOverlayOpen(false);
                          setVoiceLeadSubmitted(false);
                        }}
                        className="px-3 py-2 rounded-xl bg-surface-3 border border-brand-border text-brand-muted hover:text-white font-mono text-xs"
                      >
                        Return to Voice
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Pinned Call Controls Bar (shrink-0) */}
            <div className="p-2.5 sm:p-3.5 bg-surface-2 border-t border-brand-border flex items-center justify-between gap-1.5 sm:gap-2 shrink-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                {/* Mute / Unmute Button */}
                <button
                  onClick={toggleMute}
                  className={`flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    isMuted
                      ? 'bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30'
                      : 'bg-surface-3 border border-brand-border text-white hover:border-accent'
                  }`}
                  title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                >
                  {isMuted ? <MicOff size={13} /> : <Mic size={13} className="text-emerald-400" />}
                  <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>

                {/* Interrupt Button */}
                <button
                  onClick={handleInterrupt}
                  disabled={voiceState !== 'speaking'}
                  className="flex items-center gap-1 px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl bg-surface-3 border border-brand-border text-xs font-mono font-bold text-brand-muted hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-amber-400/50 transition-all"
                  title="Stop AI speech and resume listening"
                >
                  <VolumeX size={13} />
                  <span>Interrupt</span>
                </button>

                {/* Direct Sales Toggle ("I'm Interested") */}
                <button
                  onClick={() => setIsLeadOverlayOpen(!isLeadOverlayOpen)}
                  className={`flex items-center gap-1 px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    isLeadOverlayOpen
                      ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                      : 'bg-surface-3 border border-brand-border text-brand-secondary hover:text-white hover:border-accent'
                  }`}
                  title="Open Lead Brief Overlay"
                >
                  <Sparkles size={13} className="text-amber-400" />
                  <span className="hidden xs:inline sm:inline">I&apos;m Interested</span>
                  <span className="xs:hidden sm:hidden">Brief</span>
                </button>
              </div>

              <div className="flex items-center gap-1 sm:gap-1.5">
                {/* WhatsApp Quick Action */}
                <a
                  href={`https://wa.me/923132080033?text=${encodeURIComponent(
                    `Hi Sheharyar, I was speaking with your AI Voice Assistant regarding: "${userTranscript || 'a new project'}" and would like to scope this.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-emerald-500 text-black font-mono font-bold text-xs hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20 active:scale-95"
                >
                  <Phone size={12} className="fill-current" />
                  <span className="hidden sm:inline">WhatsApp</span>
                  <ArrowUpRight size={12} />
                </a>

                {/* End Call / Terminate Session Button */}
                <button
                  onClick={endCallSession}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-red-500/20 hover:bg-red-600 border border-red-500/40 hover:border-red-600 text-red-300 hover:text-white font-mono text-xs font-bold transition-all shadow-md shadow-red-500/10 active:scale-95 group"
                  title="End call and terminate session"
                >
                  <PhoneOff size={13} className="text-red-400 group-hover:text-white transition-colors" />
                  <span>End Call</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
