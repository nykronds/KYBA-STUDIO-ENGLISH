import React, { useState } from 'react';
import { Mic, Square, Activity, CheckCircle2, ChevronRight, BadgeInfo, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function SpeakingModule({ onComplete }: { onComplete: (xp: number, result: { fluency: number, coherence: number, grammar: number }) => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ fluency: number, coherence: number, grammar: number, feedback: string } | null>(null);

  const promptText = "Describe a time when you successfully collaborated with a team to solve a complex problem.";

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        // Randomize scores to demonstrate dynamic mascot reactions
        const fluencyScore = Math.floor(Math.random() * 20) + 80;
        const coherenceScore = Math.floor(Math.random() * 20) + 80;
        const grammarScore = Math.floor(Math.random() * 30) + 70;
        
        const newResult = {
          fluency: fluencyScore,
          coherence: coherenceScore,
          grammar: grammarScore,
          feedback: fluencyScore > 90 
            ? "Great job! Your fluency was highly natural and you used advanced sentence structures effectively." 
            : "Good effort. Try to connect your ideas a bit more smoothly next time to improve your fluency."
        };
        
        setResult(newResult);
        onComplete(100, newResult);
      }, 3000);
    } else {
      setResult(null);
      setIsRecording(true);
    }
  };

  return (
    <div className="card-tactile p-5 md:p-6 relative overflow-hidden group">
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900 leading-tight">Speaking Assessment</h2>
          <p className="text-xs md:text-sm font-semibold text-slate-500 mt-1">Part 2: Long Turn</p>
        </div>
        <div className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase whitespace-nowrap shadow-sm border border-orange-100">
          C2 Level
        </div>
      </div>

      <div className="flex flex-col bg-[#f8fafc] rounded-2xl border border-slate-100 mb-6 shadow-inner overflow-hidden">
         <div className="flex flex-col py-6 px-5 border-b border-slate-100 bg-white">
           <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center">
             <MessageSquare size={14} className="mr-1.5" /> Prompt
           </div>
           <p className="text-base md:text-lg font-bold text-slate-800 leading-relaxed">
             {promptText}
           </p>
         </div>
         <div className="bg-[#f8fafc] px-5 py-4">
           <div className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-2 flex items-center">
             <BadgeInfo size={14} className="mr-1.5" /> Strategy
           </div>
           <ul className="text-xs font-medium text-slate-600 space-y-1.5">
             <li className="flex items-start leading-snug"><span className="text-orange-400 mr-2 font-bold">•</span> <span>You should speak for between <strong className="text-slate-800">1 and 2 minutes</strong>.</span></li>
             <li className="flex items-start leading-snug"><span className="text-orange-400 mr-2 font-bold">•</span> <span>Make sure you use a range of connective structures.</span></li>
           </ul>
         </div>
      </div>
      
      {/* Action Area */}
      <div className="flex flex-col items-center justify-center min-h-[120px]">
         {isAnalyzing ? (
            <div className="flex flex-col items-center space-y-4 py-4 w-full">
               <Activity className="animate-pulse text-orange-600" size={36} />
               <div className="w-1/2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full bg-orange-500" 
                   initial={{ width: 0 }} 
                   animate={{ width: "100%" }} 
                   transition={{ duration: 3, ease: "linear" }}
                 />
               </div>
               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Evaluating response...</span>
            </div>
         ) : result ? (
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="w-full bg-orange-50/50 border border-orange-200 rounded-2xl p-5 flex flex-col space-y-4 shadow-sm"
            >
               <div className="flex justify-between items-start">
                  <div className="flex items-center text-orange-800 font-bold">
                    <div className="bg-orange-100 text-orange-600 p-2 rounded-xl mr-3"><CheckCircle2 size={24} /></div>
                    Analysis Complete
                  </div>
                  <span className="text-[10px] uppercase bg-orange-200 text-orange-900 font-bold px-2.5 py-1 rounded-full shadow-sm">Band 8.5</span>
               </div>
               
               <div className="grid grid-cols-3 gap-2">
                 <div className="bg-white rounded-xl p-3 text-center border border-orange-100 shadow-sm">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Fluency</div>
                    <div className="text-lg font-black text-slate-800">{result.fluency}<span className="text-xs text-slate-400 font-bold ml-0.5">%</span></div>
                 </div>
                 <div className="bg-white rounded-xl p-3 text-center border border-orange-100 shadow-sm">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Coherence</div>
                    <div className="text-lg font-black text-slate-800">{result.coherence}<span className="text-xs text-slate-400 font-bold ml-0.5">%</span></div>
                 </div>
                 <div className="bg-white rounded-xl p-3 text-center border border-orange-100 shadow-sm">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Grammar</div>
                    <div className="text-lg font-black text-slate-800">{result.grammar}<span className="text-xs text-slate-400 font-bold ml-0.5">%</span></div>
                 </div>
               </div>

               <div className="mt-2 bg-white rounded-xl p-4 border border-orange-100 shadow-sm">
                 <div className="text-sm font-semibold text-slate-700 leading-relaxed">{result.feedback}</div>
               </div>
               
               <button onClick={() => setResult(null)} className="self-start text-xs font-bold text-orange-600 hover:text-orange-700 uppercase tracking-widest flex items-center pt-2">
                 Try Next Prompt <ChevronRight size={14} className="ml-0.5" />
               </button>
            </motion.div>
         ) : (
           <>
             <button 
               onClick={handleRecord}
               className={cn(
                 "w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all transform active:scale-95",
                 isRecording ? "bg-rose-500 hover:bg-rose-600 ring-4 ring-rose-500/30 animate-pulse" : "bg-gradient-to-br from-orange-500 to-orange-600 hover:scale-105 hover:shadow-orange-500/30 ring-4 ring-white"
               )}
             >
               {isRecording ? <Square size={26} fill="currentColor" /> : <Mic size={32} />}
             </button>
             <div className="text-[10px] md:text-xs font-bold text-slate-400 mt-4 uppercase tracking-widest">
                {isRecording ? "Listening... Tap to stop" : "Tap to start recording"}
             </div>
           </>
         )}
      </div>
    </div>
  );
}
