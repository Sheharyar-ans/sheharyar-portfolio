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
  RotateCcw,
  MessageSquare,
  Square,
  AlertCircle,
  Send
} from 'lucide-react';
import {
  VoiceVisualizerOrb,
  VisualizerState
} from './voice/VoiceVisualizerOrb';
import { LeadConfirmationModal } from './voice/LeadConfirmationModal';
import {
  speakText,
  stopSpeaking,
  setupAudioVisualizer,
  primeMobileSpeechEngine
} from '../services/voiceSpeechEngine';
import {
  sendVoiceTurnToGemini,
  VoiceMessageTurn,
  ClientInquiryArgs,
  SessionClientMemory
} from '../services/voiceGeminiBrain';
import { dispatchLeadNotification } from '../utils/emailDispatch';
import { ARCHITECT_IDENTITY } from '../data/groundTruthKnowledge';

interface VoiceAssistantModalProps {
  onOpenInquiry?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const INITIAL_GREETING =
  "Hi, thanks for calling! This is Elena, assistant to Sheharyar Siraj. Sheharyar is in an active engineering session, but I manage his scoping across AI agents, data science, and web systems. Before we begin, may I have your name please?";

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  onOpenInquiry,
  isOpen: controlledIsOpen,
  onClose: controlledOnClose
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isModalOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const [visualState, setVisualState] = useState<VisualizerState>('idle');
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');
  const [aiTranscript, setAiTranscript] = useState(INITIAL_GREETING);
  const [audioLevel, setAudioLevel] = useState(0);
  const [history, setHistory] = useState<VoiceMessageTurn[]>([]);
  const [confirmedLead, setConfirmedLead] = useState<ClientInquiryArgs | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(true);
  const [manualText, setManualText] = useState('');

  // Hardware Audio & Visualizer Refs
  const audioContextCloserRef = useRef<(() => void) | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Speech Recognition & State Machine Refs
  const recognitionRef = useRef<any>(null);
  const isRecognitionActiveRef = useRef(false);
  const isBotSpeakingRef = useRef(false);
  const isMicMutedRef = useRef(false);
  const isModalOpenRef = useRef(isModalOpen);
  const isProcessingRef = useRef(false);
  const silenceTimerRef = useRef<any>(null);
  const echoCooldownTimerRef = useRef<any>(null);
  const historyRef = useRef<VoiceMessageTurn[]>([]);
  const hasGreetedRef = useRef(false);
  const sessionMemoryRef = useRef<SessionClientMemory>({});

  // Detect mobile user agent
  const isMobileDevice =
    typeof window !== 'undefined' &&
    (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768);

  // Keep live references in sync without triggering re-renders
  isMicMutedRef.current = isMicMuted;
  isModalOpenRef.current = isModalOpen;

  // Safe microphone recognition restarter: non-blocking, mobile-compatible
  const restartRecognition = useCallback(() => {
    if (
      !recognitionRef.current ||
      isBotSpeakingRef.current ||
      isMicMutedRef.current ||
      !isModalOpenRef.current ||
      isProcessingRef.current ||
      isRecognitionActiveRef.current
    ) {
      return;
    }
    try {
      recognitionRef.current.start();
      isRecognitionActiveRef.current = true;
      setVisualState('listening');
    } catch (err: any) {
      if (err?.name === 'InvalidStateError') {
        isRecognitionActiveRef.current = true;
      } else {
        isRecognitionActiveRef.current = false;
      }
    }
  }, []);

  // Safe microphone recognition stopper
  const stopRecognition = useCallback(() => {
    if (recognitionRef.current && isRecognitionActiveRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
      isRecognitionActiveRef.current = false;
    }
  }, []);

  // Dispatch Inquiry & Save to Lead System
  const handleInquirySubmission = useCallback(async (leadArgs: ClientInquiryArgs) => {
    setConfirmedLead(leadArgs);
    setIsLeadModalOpen(true);

    try {
      await dispatchLeadNotification({
        source: 'Consultative Voice Assistant (Elena)',
        name: leadArgs.clientName || 'Voice Lead',
        email: leadArgs.email,
        whatsapp: leadArgs.phoneOrWhatsApp,
        service: leadArgs.recommendedArchitecture || 'Custom Architecture Scoping',
        budget: leadArgs.budgetRange || 'Unspecified',
        timeline: leadArgs.timeline || 'Immediate',
        details: leadArgs.projectSummary || 'Captured via consultative voice session'
      });
    } catch (err) {
      console.warn('Voice lead dispatch notice:', err);
    }
  }, []);

  // Speak initial greeting: mic is completely silenced while bot speaks
  const speakInitialGreeting = useCallback(() => {
    isBotSpeakingRef.current = true;
    setVisualState('speaking');
    setAiTranscript(INITIAL_GREETING);

    // Stop speech recognition so it cannot hear itself
    stopRecognition();

    speakText(INITIAL_GREETING, {
      onStart: () => {
        isBotSpeakingRef.current = true;
        setVisualState('speaking');
      },
      onEnd: () => {
        // Post-speech echo dissipation delay: wait slightly longer on mobile
        if (echoCooldownTimerRef.current) clearTimeout(echoCooldownTimerRef.current);
        echoCooldownTimerRef.current = setTimeout(() => {
          isBotSpeakingRef.current = false;
          if (isModalOpenRef.current && !isMicMutedRef.current) {
            setVisualState('listening');
            restartRecognition();
          } else {
            setVisualState('idle');
          }
        }, isMobileDevice ? 550 : 400);
      },
      onError: () => {
        isBotSpeakingRef.current = false;
        setVisualState('idle');
      }
    });
  }, [isMobileDevice, restartRecognition, stopRecognition]);

  // Process User Speech through Central LLM Brain (Gemini with RAG Fallback)
  const handleUserQuery = useCallback(
    async (speechQuery: string) => {
      if (!speechQuery || !speechQuery.trim() || isProcessingRef.current || isBotSpeakingRef.current) {
        return;
      }

      // Self-Echo Guard: Check if the speech query is a stray echo of what the bot just vocalized
      const cleanInput = speechQuery.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
      const cleanBot = aiTranscript.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
      if (cleanInput.length > 8 && cleanBot.includes(cleanInput)) {
        console.warn('[Acoustic Echo Guard]: Dropped speaker echo feedback:', speechQuery);
        return;
      }

      isProcessingRef.current = true;

      // Stop speech recognition immediately while processing and speaking
      stopRecognition();

      setVisualState('thinking');
      setUserTranscript(speechQuery);

      const currentTurn: VoiceMessageTurn = { role: 'user', text: speechQuery };
      const updatedHistory = [...historyRef.current, currentTurn];
      historyRef.current = updatedHistory;
      setHistory(updatedHistory);

      try {
        const brainResult = await sendVoiceTurnToGemini(historyRef.current, speechQuery, sessionMemoryRef.current);

        // Update session memory
        if (brainResult.updatedMemory) {
          sessionMemoryRef.current = {
            ...sessionMemoryRef.current,
            ...brainResult.updatedMemory
          };
        }

        setAiTranscript(brainResult.replyText);

        const aiTurn: VoiceMessageTurn = { role: 'model', text: brainResult.replyText };
        historyRef.current = [...historyRef.current, aiTurn];
        setHistory(historyRef.current);

        // If native function calling was triggered, auto-fill modal & dispatch email
        if (brainResult.toolCall?.name === 'submitClientInquiry') {
          const finalLeadArgs: ClientInquiryArgs = {
            ...brainResult.toolCall.args,
            clientName: brainResult.toolCall.args.clientName || sessionMemoryRef.current.clientName,
            recommendedArchitecture: brainResult.toolCall.args.recommendedArchitecture || sessionMemoryRef.current.recommendedArchitecture,
            budgetRange: brainResult.toolCall.args.budgetRange || sessionMemoryRef.current.budgetRange,
            timeline: brainResult.toolCall.args.timeline || sessionMemoryRef.current.timeline
          };
          handleInquirySubmission(finalLeadArgs);
        }

        // Vocalize response with mic completely shut off
        isBotSpeakingRef.current = true;
        setVisualState('speaking');

        speakText(brainResult.replyText, {
          onStart: () => {
            isBotSpeakingRef.current = true;
            setVisualState('speaking');
          },
          onEnd: () => {
            // Post-speech echo dissipation delay: wait slightly longer on mobile
            if (echoCooldownTimerRef.current) clearTimeout(echoCooldownTimerRef.current);
            echoCooldownTimerRef.current = setTimeout(() => {
              isBotSpeakingRef.current = false;
              isProcessingRef.current = false;
              if (isModalOpenRef.current && !isMicMutedRef.current) {
                setVisualState('listening');
                restartRecognition();
              } else {
                setVisualState('idle');
              }
            }, isMobileDevice ? 550 : 400);
          },
          onError: () => {
            isBotSpeakingRef.current = false;
            isProcessingRef.current = false;
            setVisualState('idle');
          }
        });
      } catch (err) {
        console.error('Error in voice turn processing:', err);
        isProcessingRef.current = false;
        isBotSpeakingRef.current = false;
        setVisualState('idle');
      }
    },
    [aiTranscript, handleInquirySubmission, isMobileDevice, restartRecognition, stopRecognition]
  );

  // Keep a stable ref to handleUserQuery so recognition doesn't re-instantiate
  const handleUserQueryRef = useRef(handleUserQuery);
  handleUserQueryRef.current = handleUserQuery;

  // Initialize Hardware Audio Stream & Web Speech Recognition (Mobile Hardened)
  const startHardwareSession = useCallback(() => {
    // 1. Speech Recognition Initialization (runs independently without awaiting getUserMedia)
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      try {
        const recognizer = new SpeechRecognitionClass();
        // On mobile, continuous=false prevents Android engine lockups and dropped turns
        recognizer.continuous = !isMobileDevice;
        recognizer.interimResults = true;
        recognizer.lang = 'en-US';

        let lastInterim = '';

        recognizer.onstart = () => {
          isRecognitionActiveRef.current = true;
          if (!isBotSpeakingRef.current && !isProcessingRef.current) {
            setVisualState('listening');
          }
        };

        recognizer.onresult = (event: any) => {
          if (isBotSpeakingRef.current || isMicMutedRef.current || isProcessingRef.current) {
            return;
          }

          let interimChunk = '';
          let finalChunk = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0]?.transcript || '';
            if (event.results[i].isFinal) {
              finalChunk += transcript;
            } else {
              interimChunk += transcript;
            }
          }

          if (interimChunk) {
            lastInterim = interimChunk;
            setUserTranscript(interimChunk);
          }

          if (finalChunk && finalChunk.trim()) {
            lastInterim = '';
            setUserTranscript(finalChunk.trim());
            if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = setTimeout(() => {
              handleUserQueryRef.current(finalChunk.trim());
            }, 350);
          } else if (lastInterim && lastInterim.trim().length > 1) {
            if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = setTimeout(() => {
              if (lastInterim && !isBotSpeakingRef.current && !isProcessingRef.current) {
                const query = lastInterim.trim();
                lastInterim = '';
                handleUserQueryRef.current(query);
              }
            }, isMobileDevice ? 1200 : 900);
          }
        };

        recognizer.onerror = (e: any) => {
          if (e.error === 'not-allowed') {
            setHasMicrophonePermission(false);
          }
          if (e.error !== 'no-speech' && e.error !== 'aborted') {
            console.warn('Speech recognition notice:', e.error);
          }
          if (e.error !== 'no-speech') {
            isRecognitionActiveRef.current = false;
          }
        };

        recognizer.onend = () => {
          isRecognitionActiveRef.current = false;
          // Re-arm recognition cleanly if modal is open and bot isn't speaking
          if (
            isModalOpenRef.current &&
            !isBotSpeakingRef.current &&
            !isMicMutedRef.current &&
            !isProcessingRef.current
          ) {
            setTimeout(() => {
              restartRecognition();
            }, isMobileDevice ? 250 : 150);
          }
        };

        recognitionRef.current = recognizer;
      } catch (err) {
        console.warn('Speech recognition init notice:', err);
      }
    } else {
      setHasMicrophonePermission(false);
    }

    // 2. Greet user strictly ONCE per modal session
    if (!hasGreetedRef.current) {
      hasGreetedRef.current = true;
      speakInitialGreeting();
    }

    // 3. Optional audio stream visualizer in background (isolated, non-blocking)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        })
        .then((stream) => {
          mediaStreamRef.current = stream;
          setHasMicrophonePermission(true);
          const visualizer = setupAudioVisualizer(stream, (level) => {
            setAudioLevel(level);
          });
          audioContextCloserRef.current = visualizer.stop;
        })
        .catch((err) => {
          console.debug('Background visualizer stream notice:', err);
        });
    }
  }, [isMobileDevice, restartRecognition, speakInitialGreeting]);

  // Clean Hardware Teardown
  const teardownHardwareSession = useCallback(() => {
    stopSpeaking();
    stopRecognition();
    isBotSpeakingRef.current = false;
    isProcessingRef.current = false;
    hasGreetedRef.current = false;

    if (recognitionRef.current) {
      recognitionRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {}
      });
      mediaStreamRef.current = null;
    }

    if (audioContextCloserRef.current) {
      audioContextCloserRef.current();
      audioContextCloserRef.current = null;
    }

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    if (echoCooldownTimerRef.current) {
      clearTimeout(echoCooldownTimerRef.current);
      echoCooldownTimerRef.current = null;
    }

    setVisualState('idle');
    setAudioLevel(0);
  }, [stopRecognition]);

  // Handle Open / Close transitions strictly when isModalOpen toggles
  useEffect(() => {
    if (isModalOpen) {
      startHardwareSession();
    } else {
      teardownHardwareSession();
    }

    return () => {
      teardownHardwareSession();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  const handleClose = () => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleOpen = () => {
    primeMobileSpeechEngine();
    setInternalIsOpen(true);
  };

  const toggleMicMute = () => {
    const nextMuted = !isMicMuted;
    setIsMicMuted(nextMuted);
    if (nextMuted) {
      stopRecognition();
      setVisualState('idle');
    } else {
      restartRecognition();
    }
  };

  // Immediate user interruption: stops bot speaking, resets flags, opens mic
  const handleStopSpeakingBargeIn = () => {
    stopSpeaking();
    stopRecognition();
    isBotSpeakingRef.current = false;
    isProcessingRef.current = false;
    if (echoCooldownTimerRef.current) {
      clearTimeout(echoCooldownTimerRef.current);
      echoCooldownTimerRef.current = null;
    }
    if (isModalOpenRef.current && !isMicMutedRef.current) {
      setVisualState('listening');
      restartRecognition();
    } else {
      setVisualState('idle');
    }
  };

  const handleResetConversation = () => {
    stopSpeaking();
    stopRecognition();
    historyRef.current = [];
    sessionMemoryRef.current = {};
    setHistory([]);
    setUserTranscript('');
    setManualText('');
    hasGreetedRef.current = false;
    speakInitialGreeting();
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualText.trim() || isProcessingRef.current || isBotSpeakingRef.current) return;
    const query = manualText.trim();
    setManualText('');
    handleUserQuery(query);
  };

  return (
    <>
      {/* Floating Launcher Pill Button (Visible when closed) */}
      {!isModalOpen && (
        <button
          onClick={handleOpen}
          aria-label="Talk to Elena Voice Assistant"
          className="fixed bottom-6 right-20 z-40 flex items-center gap-2.5 px-4 py-3 bg-zinc-950/90 hover:bg-zinc-900 border border-emerald-500/40 hover:border-emerald-400 text-white rounded-full shadow-2xl shadow-emerald-950/50 backdrop-blur-md transition-all hover:scale-105 group"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <div className="flex items-center gap-1.5 font-medium text-xs sm:text-sm">
            <Phone className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Voice Agent:</span>
            <span className="text-emerald-400 font-semibold">Talk to Elena</span>
          </div>
        </button>
      )}

      {/* Main Glassmorphic Centered Voice Assistant Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn">
          <div
            className="relative w-full max-w-xl bg-zinc-950/95 border border-zinc-800 rounded-3xl shadow-2xl shadow-black/80 flex flex-col justify-between overflow-hidden text-white backdrop-blur-2xl"
            style={{ maxHeight: 'calc(100dvh - 24px)' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="voice-assistant-title"
          >
            {/* Ambient Background Gradient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-emerald-500/10 blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="relative z-10 flex items-center justify-between p-4 sm:p-6 border-b border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 id="voice-assistant-title" className="text-base sm:text-lg font-bold tracking-tight text-white">
                      Elena
                    </h2>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                      AI Solutions Architect
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Acoustic Muted While Speaking • Zero Echo Loop
                  </p>
                </div>
              </div>

              {/* End Call / Close */}
              <button
                onClick={handleClose}
                className="p-2.5 text-zinc-400 hover:text-white rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 transition-colors"
                aria-label="End call and close modal"
              >
                <PhoneOff className="w-4 h-4 text-rose-400" />
              </button>
            </div>

            {/* Center Visualizer & Interaction Arena */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-6 px-4 sm:px-8 text-center overflow-y-auto">
              {!hasMicrophonePermission && (
                <div className="flex items-center gap-2 px-3 py-1.5 mb-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Microphone access blocked. Voice synthesis is active.</span>
                </div>
              )}

              {/* Dynamic Interactive Orb Visualizer */}
              <VoiceVisualizerOrb
                state={visualState}
                audioLevel={audioLevel}
                onClick={visualState === 'speaking' ? handleStopSpeakingBargeIn : toggleMicMute}
              />

              {/* Live Status Description */}
              <div className="mt-4 text-xs font-mono text-zinc-400 flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    visualState === 'speaking'
                      ? 'bg-cyan-400 animate-pulse'
                      : visualState === 'thinking'
                      ? 'bg-purple-400 animate-spin'
                      : visualState === 'listening'
                      ? 'bg-emerald-400 animate-pulse'
                      : 'bg-zinc-600'
                  }`}
                />
                <span className="capitalize">
                  {visualState === 'speaking' ? 'Elena Speaking (Mic Muted)' : visualState}
                </span>
                {visualState === 'speaking' && (
                  <button
                    onClick={handleStopSpeakingBargeIn}
                    className="ml-2 text-xs text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <Square className="w-3 h-3 fill-current" /> Tap Orb to Interrupt
                  </button>
                )}
              </div>

              {/* Transcript Speech Bubbles */}
              <div className="w-full mt-6 space-y-3 max-w-md">
                {/* Elena's Vocal Response */}
                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800/90 text-left backdrop-blur-sm">
                  <div className="text-[11px] font-mono text-emerald-400 font-semibold mb-1 flex items-center gap-1.5">
                    <Volume2 className="w-3 h-3" /> Elena:
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed font-sans">{aiTranscript}</p>
                </div>

                {/* User's Spoken Query */}
                {userTranscript && (
                  <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-left">
                    <div className="text-[11px] font-mono text-zinc-400 mb-0.5 flex items-center gap-1.5">
                      <Mic className="w-3 h-3 text-emerald-400" /> You:
                    </div>
                    <p className="text-xs text-zinc-300 font-sans italic">{userTranscript}</p>
                  </div>
                )}
              </div>

              {/* Quick Input Box for Mobile & Noisy Environments */}
              <form
                onSubmit={handleManualSubmit}
                className="w-full max-w-md mt-4 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  placeholder="Type a message or speak..."
                  className="flex-1 bg-zinc-900/90 border border-zinc-800 focus:border-emerald-500/50 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 transition-all"
                />
                <button
                  type="submit"
                  disabled={!manualText.trim()}
                  className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:pointer-events-none text-zinc-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shrink-0"
                  aria-label="Send message to Elena"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </div>

            {/* Modal Bottom Controls Deck */}
            <div className="relative z-10 p-4 sm:p-5 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between gap-3">
              {/* Left Action: Restart */}
              <button
                onClick={handleResetConversation}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
                title="Restart conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Restart</span>
              </button>

              {/* Center Action: Mute / Unmute Toggle */}
              <button
                onClick={toggleMicMute}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all shadow-lg ${
                  isMicMuted
                    ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold shadow-emerald-500/20'
                }`}
              >
                {isMicMuted ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    <span>Unmute Mic</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    <span>Mic Active</span>
                  </>
                )}
              </button>

              {/* Right Action: Direct WhatsApp Fallback */}
              <a
                href={ARCHITECT_IDENTITY.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Auto-Populated Lead Confirmation Modal */}
      {confirmedLead && (
        <LeadConfirmationModal
          lead={confirmedLead}
          isOpen={isLeadModalOpen}
          onClose={() => setIsLeadModalOpen(false)}
          onConfirm={() => {
            onOpenInquiry?.();
          }}
        />
      )}
    </>
  );
};
