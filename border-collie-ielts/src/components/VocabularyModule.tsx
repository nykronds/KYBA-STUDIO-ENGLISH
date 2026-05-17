import React, { useState } from 'react';
import { BookA, Volume2, Search } from 'lucide-react';
import { VOCABULARY_LIST } from '../data';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function VocabularyModule() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredWords = VOCABULARY_LIST.filter(v => v.word.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="card-tactile p-5 md:p-8 relative overflow-hidden flex-1 flex flex-col min-h-[300px]">
      <div className="flex items-start justify-between mb-6 shrink-0 relative z-10">
        <div>
          <h2 className="text-base md:text-xl font-bold text-slate-900 leading-tight">C2 Vocabulary</h2>
          <p className="text-xs md:text-sm font-semibold text-slate-500 mt-1">Master advanced lexical resource</p>
        </div>
        <div className="bg-fuchsia-50 text-fuchsia-700 p-2.5 rounded-xl shadow-sm border border-fuchsia-100">
          <BookA size={24} />
        </div>
      </div>

      <div className="mb-6 shrink-0 relative z-10">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search vocabulary..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all text-sm font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-semibold"
        />
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 relative z-10">
        <AnimatePresence>
          {filteredWords.map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              key={item.word} 
              className="p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-fuchsia-100 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">{item.word}</h3>
                <button className="text-slate-400 hover:text-fuchsia-600 transition-colors p-1.5 bg-white shadow-sm border border-slate-100 group-hover:border-fuchsia-100 group-hover:bg-fuchsia-50 rounded-lg">
                  <Volume2 size={16} />
                </button>
              </div>
              <div className="font-mono text-[11px] md:text-xs text-fuchsia-600 font-bold mb-3 tracking-wider bg-fuchsia-100/50 inline-block px-2 py-0.5 rounded-md">{item.phonetic}</div>
              <p className="text-sm md:text-base font-semibold text-slate-700 leading-snug mb-4">"{item.definition}"</p>
              <div className="bg-white px-4 py-3.5 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-fuchsia-400"></div>
                <p className="text-xs md:text-sm font-medium text-slate-600 leading-relaxed italic pl-1">
                  {item.example}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredWords.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-12 text-slate-500 font-semibold text-sm"
          >
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <Search size={24} className="text-slate-300" />
            </div>
            No vocabulary words found matching "{searchTerm}"
          </motion.div>
        )}
      </div>
    </div>
  );
}
