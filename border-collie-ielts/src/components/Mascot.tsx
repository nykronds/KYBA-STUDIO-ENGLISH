import React from 'react';
import { Dog, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export function SparklesIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-400">
      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
    </svg>
  );
}

export function Mascot({ mood, message }: { mood: 'neutral' | 'thinking' | 'happy' | 'sad', message: string }) {
  return (
    <div className="flex bg-[#18181b] border-2 border-[#27272a] border-b-[6px] text-white p-5 md:p-6 rounded-3xl items-start space-x-4 md:space-x-6 shadow-xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-4 -right-4 p-8 opacity-[0.03]">
        <Dog size={180} />
      </div>

      <div className="relative shrink-0">
        <div className={cn(
          "w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl md:text-4xl shadow-inner transition-colors duration-300 relative z-10 border border-white/10",
          mood === 'neutral' && "bg-[#27272a] shadow-inner",
          mood === 'thinking' && "bg-blue-500/20 border-blue-500/30",
          mood === 'happy' && "bg-emerald-500/20 border-emerald-500/30",
          mood === 'sad' && "bg-rose-500/20 border-rose-500/30",
        )}>
          {mood === 'neutral' && '🐕'}
          {mood === 'thinking' && '🤔'}
          {mood === 'happy' && '🎉'}
          {mood === 'sad' && '🧐'}
        </div>
        {mood === 'happy' && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 p-1 rounded-full shadow-lg z-20"
          >
            <Star size={16} fill="currentColor" />
          </motion.div>
        )}
      </div>
      <div className="flex-1 relative z-10 py-1">
        <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center">
          <SparklesIcon />
          <span className="ml-1">Concho says:</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.p 
            key={message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm md:text-base font-medium leading-relaxed text-slate-200"
          >
            {message}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
