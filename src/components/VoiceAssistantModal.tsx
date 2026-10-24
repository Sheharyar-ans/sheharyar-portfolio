import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  Phone, 
  Sparkles, 
  Radio, 
  ArrowUpRight, 
  RotateCcw,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { processRagQuery, ChatMessage } from '../utils/ragEngine';
import { SHEHARYAR_IDENTITY } from '../data/chatKnowledge';

type VoiceState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'permission_denied' | 'unsupported';

interface VoiceAssistantModalProps {
  onOpenInquiry?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

// Clean markdown and URLs for natural speech synthesis
function cleanTextForSpeech(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[#*_`~>]/g, '')
    .replace(/•\s+/g, '')
    .replace(/\+\d[\d\s-]{8,}\d/g, (match) => match.replace(/\s+/g, ' '))
    .replace(/\n+/g, ' ')
    .trim();
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
    'Hi! I am Sheharyar Siraj\'s Voice AI Assistant. You can ask me anything about high-speed WordPress architecture, sub-600ms AI voice agents, or enterprise n8n workflow automations.'
  );
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([]);
  const [audioLevel, setAudioLevel] = useState(0);

  // Audio Context & Stream Refs for Real-Time Visualizer
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Web Speech API Refs
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isSpeakingRef = useRef(false);
  const isThinkingRef = useRef(false);

  // Safe voice synthesis voice selection
  const selectNaturalVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // Prioritize natural sounding modern English voices
    const naturalVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Google') ||
          v.name.includes('Natural') ||
          v.name.includes('Jenny') ||
          v.name.includes('Guy') ||
          v.name.includes('Samantha') ||
          v.name.includes('Aria') ||
          v.name.includes('Online'))
    );

    return naturalVoice || voices.find((v) => v.lang === 'en-US') || voices.find((v) => v.lang.startsWith('en')) || voices[0];
  }, []);

  // Initialize Speech Synthesis voice loading listener
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const load = () => {
        window.speechSynthesis.getVoices();
      };
      load();
      window.speechSynthesis.onvoiceschanged = load;
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  // Stop all active audio streams and synthesis
  const stopAudioPipeline = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    isSpeakingRef.current = false;
    isThinkingRef.current = false;

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // Safe ignore
      }
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  }, []);

  // Speak AI text response using native SpeechSynthesis
  const speakResponse = useCallback(
    (textToSpeak: string, onFinish?: () => void) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) {
        if (onFinish) onFinish();
        return;
      }

      window.speechSynthesis.cancel();
      const cleanText = cleanTextForSpeech(textToSpeak);
      if (!cleanText) {
        if (onFinish) onFinish();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      const voice = selectNaturalVoice();
      if (voice) {
        utterance.voice = voice;
      }
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        isSpeakingRef.current = true;
        setVoiceState('speaking');
      };

      utterance.onend = () => {
        isSpeakingRef.current = false;
        setVoiceState('idle');
        if (onFinish) onFinish();
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        isSpeakingRef.current = false;
        setVoiceState('idle');
        if (onFinish) onFinish();
      };

      window.speechSynthesis.speak(utterance);
    },
    [selectNaturalVoice]
  );

  // Initialize Web Audio Mic Stream for Visualizer
  const initMicrophoneAudioContext = useCallback(async () => {
    try {
      if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) return;
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
        if (analyserRef.current && isModalOpen) {
          analyserRef.current.getByteFrequencyData(buffer);
          let sum = 0;
          for (let i = 0; i < buffer.length; i++) {
            sum += buffer[i];
          }
          const avg = sum / buffer.length;
          setAudioLevel(avg);
        }
        animationFrameRef.current = requestAnimationFrame(checkVolume);
      };
      checkVolume();
    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setVoiceState('permission_denied');
      }
    }
  }, [isModalOpen]);

  // Execute AI query with Grounded Knowledge Engine
  const processVoiceInput = useCallback(
    async (spokenQuery: string) => {
      if (!spokenQuery.trim() || isThinkingRef.current) return;

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

      try {
        const result = await processRagQuery(spokenQuery, [...conversationHistory, userMsg]);
        isThinkingRef.current = false;
        setAiTranscript(result.answer);

        const botMsg: ChatMessage = {
          id: `voice-ai-${Date.now()}`,
          sender: 'assistant',
          text: result.answer,
          timestamp: 'Just now',
          mode: result.mode,
          action: result.action
        };
        setConversationHistory((prev) => [...prev, botMsg]);

        // Speak response out loud
        speakResponse(result.answer, () => {
          if (isModalOpen && !isMuted) {
            startRecognition();
          }
        });
      } catch (err) {
        console.error('Voice RAG processing error:', err);
        isThinkingRef.current = false;
        const fallback = 'I am ready to help with your project! You can connect directly with Sheharyar on WhatsApp at +92 313 2080033 for immediate scoping under our 2-hour SLA.';
        setAiTranscript(fallback);
        speakResponse(fallback, () => {
          if (isModalOpen && !isMuted) {
            startRecognition();
          }
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [conversationHistory, isModalOpen, isMuted, speakResponse]
  );

  // Start native Speech Recognition
  const startRecognition = useCallback(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceState('unsupported');
      return;
    }

    if (isSpeakingRef.current || isThinkingRef.current || isMuted) {
      return;
    }

    // Abort existing instance if any
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // safe
      }
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setVoiceState('listening');
    };

    recognition.onresult = (event: any) => {
      let interim = '';
      let finalSpeech = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalSpeech += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      if (interim) {
        setUserTranscript(interim);
      }

      // If silence is detected after user speaks, trigger resolution
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }

      if (finalSpeech.trim()) {
        try {
          recognition.stop();
        } catch {
          // safe
        }
        processVoiceInput(finalSpeech.trim());
      } else if (interim.trim()) {
        // Auto-commit interim after 1600ms of silence
        silenceTimerRef.current = setTimeout(() => {
          try {
            recognition.stop();
          } catch {
            // safe
          }
          processVoiceInput(interim.trim());
        }, 1600);
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'not-allowed') {
        setVoiceState('permission_denied');
      } else if (event.error !== 'no-speech' && event.error !== 'aborted') {
        console.warn('SpeechRecognition error:', event.error);
      }
    };

    recognition.onend = () => {
      // Reconnect if modal is still active, not speaking, and not muted
      if (isModalOpen && !isSpeakingRef.current && !isThinkingRef.current && !isMuted) {
        try {
          recognition.start();
        } catch {
          // safe
        }
      }
    };

    try {
      recognition.start();
    } catch {
      // safe
    }
  }, [isModalOpen, isMuted, processVoiceInput]);

  // Open modal handler
  const handleOpen = () => {
    if (controlledIsOpen !== undefined && controlledOnClose) {
      // Controlled
    } else {
      setInternalIsOpen(true);
    }
  };

  // Close modal handler
  const handleClose = useCallback(() => {
    stopAudioPipeline();
    setVoiceState('idle');
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
  }, [controlledOnClose, stopAudioPipeline]);

  // Lifecycle when modal is opened / closed
  useEffect(() => {
    if (isModalOpen) {
      // Lock body scroll
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Setup microphone and start recognition
      initMicrophoneAudioContext();
      startRecognition();

      // Initial spoken greeting
      const greetingTimer = setTimeout(() => {
        speakResponse(
          'Hello! I am Sheharyar Siraj\'s Voice AI Assistant. How can I assist you with custom WordPress architecture, voice agents, or automations today?',
          () => {
            if (!isMuted) startRecognition();
          }
        );
      }, 500);

      return () => {
        clearTimeout(greetingTimer);
        document.body.style.overflow = prevOverflow;
        stopAudioPipeline();
      };
    } else {
      stopAudioPipeline();
    }
  }, [initMicrophoneAudioContext, isModalOpen, isMuted, speakResponse, startRecognition, stopAudioPipeline]);

  // Keyboard shortcut listener (Escape to close)
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
      startRecognition();
    } else {
      setIsMuted(true);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // safe
        }
      }
      setVoiceState('idle');
    }
  };

  // Interrupt / Stop bot from speaking
  const handleInterrupt = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    isSpeakingRef.current = false;
    setVoiceState('idle');
    if (!isMuted) {
      startRecognition();
    }
  };

  // Reset conversation
  const handleResetConversation = () => {
    stopAudioPipeline();
    setUserTranscript('');
    setAiTranscript('Conversation reset. What can Sheharyar build or automate for your business?');
    setConversationHistory([]);
    setVoiceState('idle');
    setTimeout(() => {
      speakResponse('Conversation reset. What can Sheharyar build or automate for your business?', () => {
        if (!isMuted) startRecognition();
      });
    }, 200);
  };

  // Compute visualizer orb scale based on real-time mic volume or simulated bot frequency
  const visualScale =
    voiceState === 'speaking'
      ? 1.15 + Math.sin(Date.now() / 150) * 0.1
      : voiceState === 'listening'
      ? 1 + Math.min(audioLevel / 120, 0.45)
      : voiceState === 'thinking'
      ? 1.08
      : 1;

  return (
    <>
      {/* Floating Trigger Button (Positioned at bottom-6 left-6 to balance the text chat widget) */}
      {!isModalOpen && controlledIsOpen === undefined && (
        <div className="fixed bottom-6 left-6 z-40">
          <button
            onClick={handleOpen}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-surface-1 border border-brand-border/80 text-white shadow-2xl hover:border-accent hover:shadow-[0_0_35px_rgba(0,255,200,0.35)] transition-all active:scale-95"
            aria-label="Open Autonomous Voice AI Assistant"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <Mic size={16} className="animate-pulse" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-1 animate-ping" />
            </div>

            <div className="text-left font-mono">
              <div className="text-xs font-bold leading-tight group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <span>Talk to AI Voice</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-300 text-[9px] font-bold uppercase tracking-wider border border-emerald-500/30">
                  Live
                </span>
              </div>
              <div className="text-[10px] text-brand-muted">Zero-cost client speech • Instant Scoping</div>
            </div>
          </button>
        </div>
      )}

      {/* Full-Screen Pop-Up Overlay Modal */}
      {isModalOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in font-body select-none"
        >
          <div className="relative w-full max-w-xl bg-surface-1/95 border border-brand-border rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-surface-2/70 border-b border-brand-border flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Radio size={20} className="animate-pulse" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-surface-2" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-sm sm:text-base text-white">
                      Sheharyar Siraj AI Voice Telephony
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    {/* Dynamic Status Badge */}
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
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
                        ? 'Listening to you...'
                        : voiceState === 'thinking'
                        ? 'Synthesizing Architecture...'
                        : voiceState === 'speaking'
                        ? 'Speaking Out Loud...'
                        : isMuted
                        ? 'Microphone Muted'
                        : 'Ready for Voice Prompt'}
                    </span>
                    <span className="hidden sm:inline text-[10px] font-mono text-brand-muted">
                      100% Free Web Speech Pipeline
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleResetConversation}
                  className="w-8 h-8 rounded-xl hover:bg-surface-3 text-brand-muted hover:text-white transition-colors flex items-center justify-center"
                  title="Reset voice conversation"
                >
                  <RotateCcw size={15} />
                </button>

                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-xl hover:bg-surface-3 text-brand-muted hover:text-white transition-colors flex items-center justify-center"
                  title="End voice session (Escape)"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Central Interactive Audio Wave / Glowing Orb */}
            <div className="relative flex flex-col items-center justify-center py-10 sm:py-12 px-6 overflow-hidden bg-radial from-accent/10 via-surface-1 to-surface-1">
              {/* Outer Ripple Waves */}
              {voiceState === 'listening' && (
                <>
                  <div className="absolute w-56 h-56 rounded-full border border-emerald-500/20 animate-ping [animation-duration:2.5s]" />
                  <div className="absolute w-72 h-72 rounded-full border border-accent/20 animate-ping [animation-duration:3.5s]" />
                </>
              )}

              {voiceState === 'speaking' && (
                <div className="absolute w-64 h-64 rounded-full bg-accent/15 blur-2xl animate-pulse" />
              )}

              {/* Central Orb */}
              <div
                style={{ transform: `scale(${visualScale})` }}
                className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer shadow-2xl ${
                  voiceState === 'speaking'
                    ? 'bg-gradient-to-tr from-accent via-emerald-400 to-cyan-300 shadow-[0_0_50px_rgba(30,144,255,0.6)]'
                    : voiceState === 'thinking'
                    ? 'bg-gradient-to-tr from-amber-400 via-accent to-purple-500 animate-spin [animation-duration:4s] shadow-[0_0_40px_rgba(251,191,36,0.5)]'
                    : voiceState === 'listening'
                    ? 'bg-gradient-to-tr from-emerald-500 via-teal-400 to-accent shadow-[0_0_45px_rgba(16,185,129,0.5)]'
                    : 'bg-gradient-to-tr from-surface-3 via-accent/30 to-surface-2 border border-brand-border/80 shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                }`}
                onClick={voiceState === 'speaking' ? handleInterrupt : toggleMute}
                title={voiceState === 'speaking' ? 'Click to interrupt' : 'Click to toggle mute'}
              >
                {/* Glowing Core */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-surface-1/80 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  {voiceState === 'speaking' ? (
                    <Volume2 size={32} className="text-accent animate-pulse" />
                  ) : voiceState === 'thinking' ? (
                    <Sparkles size={32} className="text-amber-300 animate-bounce" />
                  ) : isMuted ? (
                    <MicOff size={32} className="text-red-400" />
                  ) : (
                    <Mic size={32} className="text-emerald-400 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Dynamic Sound Frequency Bars (Speaking & Listening States) */}
              <div className="flex items-center gap-1.5 mt-8 h-8">
                {[0.4, 0.7, 1.0, 0.8, 0.5, 0.9, 1.2, 0.6, 1.1, 0.7, 0.5].map((multiplier, i) => {
                  const barHeight =
                    voiceState === 'speaking'
                      ? Math.max(8, Math.sin(Date.now() / 100 + i) * 24 * multiplier + 16)
                      : voiceState === 'listening'
                      ? Math.max(6, (audioLevel / 10) * multiplier + 6)
                      : 4;

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

              {/* Helper instructions text */}
              <p className="text-xs font-mono text-brand-muted mt-3 text-center">
                {voiceState === 'listening'
                  ? 'Speak naturally: "How much for a custom WordPress VIP build?"'
                  : voiceState === 'thinking'
                  ? 'Synthesizing technical knowledge...'
                  : voiceState === 'speaking'
                  ? 'Tap the sphere or click "Interrupt" to cut in anytime'
                  : isMuted
                  ? 'Microphone muted. Tap Unmute to speak.'
                  : 'Listening will resume automatically...'}
              </p>
            </div>

            {/* Error & Fallback Warnings */}
            {voiceState === 'permission_denied' && (
              <div className="mx-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-start gap-2.5">
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
                <div>
                  <p className="font-bold">Microphone Permission Required</p>
                  <p className="text-[11px] text-red-200/80 mt-0.5">
                    Your browser denied mic access. Please enable microphone permissions in your browser URL settings, or click &quot;Try Again&quot;.
                  </p>
                  <button
                    onClick={() => {
                      initMicrophoneAudioContext();
                      startRecognition();
                    }}
                    className="mt-2 px-3 py-1 rounded bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-white text-[11px] font-bold"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {voiceState === 'unsupported' && (
              <div className="mx-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-start gap-2.5">
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-400" />
                <div>
                  <p className="font-bold">Browser Speech API Unsupported</p>
                  <p className="text-[11px] text-amber-200/80 mt-0.5">
                    Your browser does not support native Web Speech recognition. For the best voice experience, please open in Chrome, Edge, or Safari, or switch to the text AI Chatbot.
                  </p>
                </div>
              </div>
            )}

            {/* Live Transcript Display Box */}
            <div className="px-5 py-4 space-y-3 bg-surface-2/40 border-t border-brand-border/60 overflow-y-auto max-h-48 custom-scrollbar">
              {/* User Live Caption */}
              <div className="p-3 rounded-xl bg-surface-1/90 border border-brand-border text-xs">
                <div className="flex items-center gap-1.5 text-brand-muted font-mono text-[10px] uppercase tracking-wider mb-1">
                  <Mic size={11} className="text-emerald-400" />
                  <span>You Said:</span>
                </div>
                <p className="text-white font-medium italic">
                  {userTranscript ? `"${userTranscript}"` : '(Waiting for your voice input...)'}
                </p>
              </div>

              {/* AI Live Caption */}
              <div className="p-3 rounded-xl bg-surface-2/90 border border-brand-border/80 text-xs">
                <div className="flex items-center gap-1.5 text-brand-muted font-mono text-[10px] uppercase tracking-wider mb-1">
                  <Sparkles size={11} className="text-accent" />
                  <span>Sheharyar AI Voice Consultant:</span>
                </div>
                <p className="text-brand-secondary leading-relaxed">
                  {aiTranscript}
                </p>
              </div>
            </div>

            {/* Call Control Buttons Bar */}
            <div className="p-4 bg-surface-2 border-t border-brand-border flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                {/* Mute / Unmute Button */}
                <button
                  onClick={toggleMute}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    isMuted
                      ? 'bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30'
                      : 'bg-surface-3 border border-brand-border text-white hover:border-accent'
                  }`}
                  title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                >
                  {isMuted ? <MicOff size={14} /> : <Mic size={14} className="text-emerald-400" />}
                  <span>{isMuted ? 'Unmute' : 'Mute Mic'}</span>
                </button>

                {/* Interrupt / Stop Speaking Button */}
                <button
                  onClick={handleInterrupt}
                  disabled={voiceState !== 'speaking'}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-3 border border-brand-border text-xs font-mono font-bold text-brand-muted hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-amber-400/50 transition-all"
                  title="Stop AI speech and resume listening"
                >
                  <VolumeX size={14} />
                  <span>Interrupt</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {/* WhatsApp Quick Conversion Action */}
                <a
                  href={`https://wa.me/923132080033?text=${encodeURIComponent(
                    `Hi Sheharyar, I was speaking with your AI Voice Assistant regarding: "${userTranscript || 'a new project'}" and would like to scope this.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 text-black font-mono font-bold text-xs hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20 active:scale-95"
                >
                  <Phone size={13} className="fill-current" />
                  <span>Connect on WhatsApp</span>
                  <ArrowUpRight size={13} />
                </a>

                {/* End Call / Close Button */}
                <button
                  onClick={handleClose}
                  className="px-3 py-2 rounded-xl bg-surface-3 border border-brand-border text-white font-mono text-xs font-bold hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300 transition-all"
                >
                  End Call
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
