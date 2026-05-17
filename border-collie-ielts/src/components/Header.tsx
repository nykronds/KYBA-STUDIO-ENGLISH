import React from 'react';
import { Dog, Cat, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

export function Header({ playerLevel, totalXp }: { playerLevel: number, totalXp: number }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b-2 border-slate-200 shadow-sm px-4 md:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="bg-slate-900 border-2 border-slate-900 border-b-[4px] text-white p-2 rounded-xl relative group transition-transform active:translate-y-[2px] active:border-b-2">
          <Dog strokeWidth={2.5} size={24} />
          {/* Easter Egg: Scottish Terrier placeholder */}
          <Cat strokeWidth={2.5} size={24} className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 duration-500 rounded-xl" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-lg md:text-xl tracking-tight text-slate-900 leading-none">Border Collie</h1>
          <p className="text-[10px] md:text-xs font-semibold text-blue-600 uppercase tracking-widest mt-1">C2 Mastery</p>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Hidden Easter Egg Name */}
        <div className="hidden md:flex flex-col items-end">
          <span className="text-xs font-semibold text-slate-400">Assistant Kiva</span>
          <span className="text-sm font-bold text-emerald-600 flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></div>Online</span>
        </div>

        <div className="flex items-center bg-white px-3 py-2 md:px-5 md:py-2.5 rounded-2xl border-2 border-slate-200 border-b-[4px] shadow-sm hover:bg-slate-50 transition duration-300">
          <div className="mr-3 md:mr-4 text-right">
            <div className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-wide">Rank {playerLevel}</div>
            <div className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{totalXp.toLocaleString()} Total XP</div>
          </div>
          <motion.div 
            className="bg-gradient-to-br from-yellow-100 to-amber-200 p-2 md:p-2.5 rounded-xl border-2 border-yellow-300 border-b-[4px] text-yellow-700 shadow-sm relative top-[-2px]"
            whileHover={{ rotate: 15, scale: 1.1 }}
          >
            <Trophy size={20} className="drop-shadow-sm" />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
