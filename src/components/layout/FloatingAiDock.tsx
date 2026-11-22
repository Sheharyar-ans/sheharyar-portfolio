import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Mic, MessageSquare } from 'lucide-react';

export const FloatingAiDock: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const openVoiceBot = () => {
    setExpanded(false);
    window.dispatchEvent(new CustomEvent('open-voice-assistant'));
  };

  const openChatbot = () => {
    setExpanded(false);
    window.dispatchEvent(new CustomEvent('open-ai-chatbot'));
  };

  return (
    <div
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Expanded Rounded Action Buttons (Voice Bot + Chatbot) */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-end gap-2.5"
          >
            {/* Voice Bot Rounded Button */}
            <button
              type="button"
              onClick={openVoiceBot}
              aria-label="Voice Bot"
              className="group relative w-11 h-11 rounded-full bg-surface-1/95 border border-white/15 hover:border-accent text-accent shadow-xl backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
            >
              <Mic size={18} />
              <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-surface-1 border border-white/15 text-white font-mono text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-lg">
                Voice Bot
              </span>
            </button>

            {/* Chatbot Rounded Button */}
            <button
              type="button"
              onClick={openChatbot}
              aria-label="Chatbot"
              className="group relative w-11 h-11 rounded-full bg-surface-1/95 border border-white/15 hover:border-accent text-accent shadow-xl backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
            >
              <MessageSquare size={18} />
              <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-surface-1 border border-white/15 text-white font-mono text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-lg">
                Chatbot
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Compact Rounded Trigger */}
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-label="AI Assistants"
        aria-expanded={expanded}
        className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-accent text-black hover:bg-white shadow-[0_8px_28px_rgba(250,204,21,0.35)] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <Bot size={21} className={`transition-transform duration-200 ${expanded ? 'scale-110' : ''}`} />
      </button>
    </div>
  );
};
