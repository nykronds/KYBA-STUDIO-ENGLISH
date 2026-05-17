import React, { useState } from 'react';
import { Mic, Square, Activity, CheckCircle2, ChevronRight, BadgeInfo } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function PronunciationModule({ onCorrect }: { onCorrect: (xp: number) => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ score: number, feedback: string } | null>(null);

  const word = "Ubiquitous";
  const phonetic = "/juːˈbɪkwɪtəs/";

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setResult({
          score: 94,
          feedback: "Excellent! Perfect stress on the second syllable."
        });
        onCorrect(75);
      }, 2000);
    } else {
      setResult(null);
      setIsRecording(true);
    }
  };

  return (
    <div className="card-tactile p-5 md:p-6 relative overflow-hidden group">
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 leading-tight">Pronunciation Lab</h2>
          <p className="text-xs md:text-sm font-semibold text-slate-500 mt-1">Word of the Day</p>
        </div>
        <div className="bg-violet-50 text-violet-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase whitespace-nowrap shadow-sm border border-violet-100">
          C2 Vocab
        </div>
      </div>

      <div className="flex flex-col bg-[#f8fafc] rounded-2xl border border-slate-100 mb-6 shadow-inner overflow-hidden">
         <div className="flex flex-col items-center justify-center py-6 px-4">
           <div className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{word}</div>
           <div className="text-sm font-mono text-slate-500 mt-2">{phonetic}</div>
         </div>
         <div className="bg-white/60 border-t border-slate-100 px-5 py-4">
           <div className="text-[10px] font-bold uppercase tracking-widest text-violet-500 mb-2 flex items-center">
             <BadgeInfo size={14} className="mr-1.5" /> Pronunciation Tips
           </div>
           <ul className="text-xs font-medium text-slate-600 space-y-1.5">
             <li className="flex items-start leading-snug"><span className="text-violet-400 mr-2 font-bold">•</span> <span>Stress the <strong className="text-slate-800">second</strong> syllable: u-BI-qui-tous.</span></li>
             <li className="flex items-start leading-snug"><span className="text-violet-400 mr-2 font-bold">•</span> <span>Start with a clear /juː/ (yoo) sound, not just /uː/ (oo).</span></li>
             <li className="flex items-start leading-snug"><span className="text-violet-400 mr-2 font-bold">•</span> <span>Ensure the 'qu' is pronounced as /kw/ (kwi), not just /k/ (ki).</span></li>
             <li className="flex items-start leading-snug"><span className="text-violet-400 mr-2 font-bold">•</span> <span>The final 'ous' uses an unstressed schwa /əs/, sounding like 'us' rather than 'oos'.</span></li>
           </ul>
         </div>
      </div>
      
      {/* Action Area */}
      <div className="flex flex-col items-center justify-center min-h-[100px]">
         {isAnalyzing ? (
            <div className="flex flex-col items-center space-y-4 py-4 w-full">
               <Activity className="animate-pulse text-violet-600" size={36} />
               <div className="w-1/2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full bg-violet-500" 
                   initial={{ width: 0 }} 
                   animate={{ width: "100%" }} 
                   transition={{ duration: 2, ease: "linear" }}
                 />
               </div>
               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Analyzing phonetics...</span>
            </div>
         ) : result ? (
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="w-full bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start space-x-3 shadow-sm"
            >
               <div className="bg-emerald-100 text-emerald-600 p-2 rounded-xl shrink-0"><CheckCircle2 size={24} /></div>
               <div className="flex-1">
                 <div className="text-sm font-bold text-emerald-900 flex justify-between items-center">
                   <span>Score: {result.score}%</span>
                   <span className="text-[10px] uppercase bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full">Band 8.5+</span>
                 </div>
                 <div className="text-xs font-semibold text-emerald-700 mt-1 leading-relaxed">{result.feedback}</div>
                 <button onClick={() => setResult(null)} className="mt-3 text-xs font-bold text-violet-600 hover:text-violet-700 uppercase tracking-widest flex items-center">
                   Try Another <ChevronRight size={14} className="ml-0.5" />
                 </button>
               </div>
            </motion.div>
         ) : (
           <>
             <button 
               onClick={handleRecord}
               className={cn(
                 "w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl transition-all transform active:scale-95",
                 isRecording ? "bg-rose-500 hover:bg-rose-600 ring-4 ring-rose-500/30 animate-pulse" : "bg-gradient-to-br from-violet-600 to-violet-700 hover:scale-105 hover:shadow-violet-600/30 ring-4 ring-white"
               )}
             >
               {isRecording ? <Square size={24} fill="currentColor" /> : <Mic size={28} />}
             </button>
             <div className="text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-widest">
                {isRecording ? "Tap to stop" : "Tap to speak"}
             </div>
           </>
         )}
      </div>
    </div>
  );
}
