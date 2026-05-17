import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function ProgressBar({ progress, className, barClassName }: { progress: number, className?: string, barClassName?: string }) {
  return (
    <div className={cn("h-3 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner", className)}>
      <motion.div 
        className={cn("h-full rounded-full flex justify-end items-center pr-1", barClassName || "bg-blue-600")}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
      >
        <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
      </motion.div>
    </div>
  );
}
