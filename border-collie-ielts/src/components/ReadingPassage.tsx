import React, { useState, useEffect } from 'react';
import { Quiz } from './Quiz';
import { cn } from '../lib/utils';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface PassageType {
  id: number;
  title: string;
  subtitle: string;
  type: string;
  difficulty?: string;
  content: string[];
  questions: any[];
}

export function ReadingPassage({ passages, onCorrect, onIncorrect }: { passages: PassageType[], onCorrect: (xp: number) => void, onIncorrect: () => void }) {
  const [activeSectionId, setActiveSectionId] = useState(passages.length > 0 ? passages[0].id : null);
  
  useEffect(() => {
    // If passages change (filter/sort), and current active is not in the new list, reset to first
    if (!passages.find(p => p.id === activeSectionId) && passages.length > 0) {
      setActiveSectionId(passages[0].id);
    } else if (passages.length > 0 && activeSectionId === null) {
      setActiveSectionId(passages[0].id);
    }
  }, [passages, activeSectionId]);

  if (passages.length === 0) {
    return (
      <div className="card-tactile p-5 md:p-8 relative overflow-hidden flex-1 flex flex-col justify-center items-center">
        <p className="text-slate-500 font-semibold">No passages found for the selected filter.</p>
      </div>
    );
  }

  const activePassage = passages.find(p => p.id === activeSectionId) || passages[0];
  const currentIndex = passages.findIndex(p => p.id === activePassage.id);

  const handleNextSection = () => {
    if (currentIndex < passages.length - 1) {
      setActiveSectionId(passages[currentIndex + 1].id);
    }
  };

  const handlePrevSection = () => {
    if (currentIndex > 0) {
      setActiveSectionId(passages[currentIndex - 1].id);
    }
  };

  return (
    <div className="card-tactile p-5 md:p-8 relative overflow-hidden flex-1 flex flex-col min-h-[300px]">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 shrink-0 gap-4">
        <div>
          <h2 className="text-base md:text-xl font-bold text-slate-900 leading-tight">{activePassage.title}</h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs md:text-sm font-semibold text-slate-500">{activePassage.subtitle}</p>
            {activePassage.difficulty && (
              <span className={cn(
                "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full",
                activePassage.difficulty === 'Easy' ? "bg-green-100 text-green-700" :
                activePassage.difficulty === 'Medium' ? "bg-amber-100 text-amber-700" :
                "bg-red-100 text-red-700"
              )}>
                {activePassage.difficulty}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3 self-end sm:self-auto">
          <div className="flex -space-x-1 mr-2 opacity-50 hover:opacity-100 transition-opacity">
            <button 
              onClick={handlePrevSection}
              disabled={currentIndex === 0}
              className="p-1 disabled:opacity-30 cursor-pointer text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-xs font-bold text-slate-400 self-center px-1">
              Part {currentIndex + 1} of {passages.length}
            </span>
            <button 
              onClick={handleNextSection}
              disabled={currentIndex === passages.length - 1}
              className="p-1 disabled:opacity-30 cursor-pointer text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase whitespace-nowrap shadow-sm border",
            activePassage.type === 'Academic' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-blue-50 text-blue-700 border-blue-100"
          )}>
            {activePassage.type}
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-4 pb-4 space-y-8 scrollbar-thin scrollbar-thumb-slate-200">
         <div className="text-slate-700 text-sm md:text-base leading-relaxed space-y-4">
           {activePassage.content.map((paragraph, idx) => (
             <p key={idx}>{paragraph}</p>
           ))}
         </div>

         <div className="border-t border-slate-100 pt-6 mt-6">
           <Quiz 
             key={`quiz-${activePassage.id}`} 
             questions={activePassage.questions} 
             title={`Comprehension Questions (Part ${currentIndex + 1})`} 
             inline={true} 
             onCorrect={onCorrect} 
             onIncorrect={onIncorrect} 
           />
         </div>
      </div>
    </div>
  );
}
