import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Fake audio progress
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="card-tactile p-5 md:p-6 relative overflow-hidden group">
      
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 leading-tight">Section 3: Academic Discussion</h2>
          <p className="text-xs md:text-sm font-semibold text-slate-500 mt-1">Urban Wildlife Ecology</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase whitespace-nowrap shadow-sm border border-blue-100">
          Track 04
        </div>
      </div>

      <div className="flex flex-col space-y-4 relative z-10">
        {/* Progress Bar & Scrubber */}
        <div className="relative w-full h-2.5 bg-slate-100 rounded-full cursor-pointer hover:h-3 transition-all duration-200">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
            style={{ width: `${progress}%` }}
          />
          <div 
            className="absolute top-1/2 -mt-2.5 w-5 h-5 bg-white border-4 border-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
            style={{ left: `calc(${progress}% - 10px)` }}
          />
        </div>
        
        <div className="flex justify-between text-xs font-bold text-slate-400 tabular-nums">
          <span>{Math.floor(progress / 60)}:{(Math.floor(progress) % 60).toString().padStart(2, '0')}</span>
          <span>12:45</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="p-2 text-slate-400 hover:text-slate-700 transition hover:bg-slate-50 rounded-full">
              <SkipBack size={20} fill="currentColor" />
            </button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 ring-4 ring-white"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </motion.button>
            <button className="p-2 text-slate-400 hover:text-slate-700 transition hover:bg-slate-50 rounded-full">
              <SkipForward size={20} fill="currentColor" />
            </button>
          </div>
          <div className="flex items-center space-x-2 text-slate-400 cursor-pointer group/vol">
            <Volume2 size={18} className="group-hover/vol:text-slate-700 transition-colors" />
            <div className="w-16 h-1.5 bg-slate-200 rounded-full hidden sm:block">
              <div className="w-2/3 h-full bg-slate-400 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
