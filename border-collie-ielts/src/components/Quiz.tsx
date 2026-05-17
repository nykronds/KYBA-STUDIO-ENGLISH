import React, { useState } from 'react';
import { Brain, CheckCircle2, XCircle, ChevronRight, ShieldAlert, BadgeInfo } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface QuizProps {
  questions: any[];
  title: string;
  onCorrect: (xp: number) => void;
  onIncorrect: () => void;
  inline?: boolean;
}

export const Quiz: React.FC<QuizProps> = ({ questions, title, onCorrect, onIncorrect, inline }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [fillValue, setFillValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const question = questions[activeQuestion];

  const isCorrect = question.type === 'multiple-choice' 
    ? selectedAnswer === question.correctAnswer
    : fillValue.trim().toLowerCase() === question.correctAnswer.toLowerCase();

  const handleSubmit = () => {
    if ((question.type === 'multiple-choice' && !selectedAnswer) || (question.type === 'fill-in-the-blank' && !fillValue)) return;
    setIsSubmitted(true);
    if (isCorrect) {
      setShowExplanation(false);
      onCorrect(50);
    } else {
      setShowExplanation(true);
      onIncorrect();
    }
  };

  const handleNext = () => {
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setFillValue("");
      setIsSubmitted(false);
      setShowExplanation(false);
    }
  };

  return (
    <div className={cn("flex flex-col h-full transition-all", inline ? "bg-transparent" : "card-tactile p-0 overflow-hidden shadow-sm")}>
      {/* Quiz Header */}
      <div className={cn("flex justify-between items-center z-10 relative", inline ? "pb-5 mb-5 border-b border-slate-100" : "bg-white px-6 py-5 border-b border-slate-200")}>
        <h3 className="font-bold text-slate-900 flex items-center text-sm md:text-base">
          <Brain className="mr-2.5 text-blue-600" size={20} />
          {title}
        </h3>
        <div className="flex space-x-1.5">
          {questions.map((_, idx) => (
            <div key={idx} className={cn(
              "w-6 h-2 rounded-full transition-all duration-300",
              idx === activeQuestion ? "bg-blue-600 w-8" : (idx < activeQuestion ? "bg-slate-300" : "bg-slate-100")
            )} />
          ))}
        </div>
      </div>

      {/* Quiz Content */}
      <div className={cn("flex-1 w-full max-w-3xl mx-auto flex flex-col", inline ? "" : "p-6 md:p-8 overflow-y-auto justify-center")}>
        <h4 className={cn("font-bold text-slate-900 leading-snug", inline ? "text-base md:text-lg mb-6" : "text-lg md:text-xl mb-8 md:mb-10")}>
          {question.question}
        </h4>

        {question.type === 'multiple-choice' && (
          <div className="space-y-4">
            {question.options?.map((opt, i) => {
              const isSelected = selectedAnswer === opt;
              const showCorrect = isSubmitted && opt === question.correctAnswer;
              const showWrong = isSubmitted && isSelected && !isCorrect;

              return (
                <button
                  key={i}
                  disabled={isSubmitted}
                  onClick={() => setSelectedAnswer(opt)}
                  className={cn(
                    "w-full text-left p-4 md:p-5 btn-tactile font-medium relative overflow-hidden group focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/30 justify-start",
                    !isSubmitted && !isSelected && "border-slate-200 hover:border-blue-400 bg-white hover:bg-slate-50",
                    !isSubmitted && isSelected && "border-blue-600 border-b-2 bg-blue-50/50 shadow-md transform translate-y-[2px]",
                    showCorrect && "border-emerald-500 bg-emerald-50/50 text-emerald-900 shadow-md transform translate-y-[2px]",
                    showWrong && "border-rose-400 bg-rose-50/50 text-rose-900 opacity-90"
                  )}
                >
                  <div className="flex items-start">
                    <div className={cn(
                      "w-6 h-6 md:w-7 md:h-7 rounded-full border-[2.5px] flex-shrink-0 mr-4 md:mr-5 mt-0.5 md:mt-0 flex items-center justify-center transition-colors",
                      isSelected && !isSubmitted && "border-blue-600",
                      !isSelected && !isSubmitted && "border-slate-300 group-hover:border-blue-400",
                      showCorrect && "border-emerald-500 bg-emerald-500",
                      showWrong && "border-rose-500 bg-rose-500"
                    )}>
                      {isSelected && !isSubmitted && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                      {showCorrect && <CheckCircle2 size={16} className="text-white" strokeWidth={3} />}
                      {showWrong && <XCircle size={16} className="text-white" strokeWidth={3} />}
                    </div>
                    <span className="font-medium text-slate-800 text-base md:text-lg leading-snug">{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {question.type === 'fill-in-the-blank' && (
          <div className="mt-4 md:mt-8">
            <input 
              type="text"
              disabled={isSubmitted}
              value={fillValue}
              onChange={(e) => setFillValue(e.target.value)}
              placeholder="Type your answer here..."
              className={cn(
                "w-full text-xl md:text-3xl p-4 md:p-6 border-b-[3px] font-bold bg-transparent focus:outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-300 placeholder:font-medium",
                !isSubmitted && "border-slate-300 focus:border-blue-600 focus:bg-blue-50/50 rounded-t-xl",
                isSubmitted && isCorrect && "border-emerald-500 text-emerald-700 pointer-events-none bg-emerald-50/30",
                isSubmitted && !isCorrect && "border-rose-500 text-rose-700 pointer-events-none bg-rose-50/30"
              )}
            />
            {isSubmitted && !isCorrect && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-rose-50 text-rose-800 p-4 rounded-xl flex items-center text-sm md:text-base font-bold shadow-inner"
              >
                <div className="bg-rose-200 p-2 rounded-lg mr-3"><ShieldAlert size={18} className="text-rose-700" /></div>
                Correct answer was: <span className="underline decoration-rose-300 underline-offset-4 ml-1">{question.correctAnswer}</span>
              </motion.div>
            )}
          </div>
        )}

        {/* Feedback Section */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={cn(
                "mt-8 border-2 rounded-2xl p-6 shadow-sm overflow-hidden",
                isCorrect ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center">
                  <div className={cn(
                    "p-3 rounded-2xl mr-4 shadow-inner",
                    isCorrect ? "bg-emerald-200 text-emerald-800" : "bg-rose-200 text-rose-800"
                  )}>
                    {isCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                  </div>
                  <div>
                    <h5 className={cn(
                      "font-bold text-xl",
                      isCorrect ? "text-emerald-800" : "text-rose-800"
                    )}>
                      {isCorrect ? "Exceptional! +50 XP" : "Let's review the tape."}
                    </h5>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center shrink-0",
                    isCorrect ? "bg-emerald-200 text-emerald-900 hover:bg-emerald-300" : "bg-rose-200 text-rose-900 hover:bg-rose-300"
                  )}
                >
                  <BadgeInfo size={18} className="mr-2" />
                  {showExplanation ? "Hide Explanation" : "View Explanation"}
                </button>
              </div>

              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  >
                    <div className={cn(
                      "p-5 rounded-xl text-slate-700 text-base md:text-lg leading-relaxed font-medium border",
                      isCorrect ? "bg-emerald-100/50 border-emerald-200" : "bg-rose-100/50 border-rose-200"
                    )}>
                      {question.explanation}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quiz Footer */}
      <div className={cn("flex justify-end shrink-0 z-10", inline ? "mt-8 pt-6 border-t border-slate-100" : "bg-white p-5 md:p-6 border-t border-slate-200")}>
        {!isSubmitted ? (
          <button 
            onClick={handleSubmit}
            disabled={(question.type === 'multiple-choice' && !selectedAnswer) || (question.type === 'fill-in-the-blank' && !fillValue)}
            className="w-full md:w-auto btn-tactile text-white py-3.5 px-10 text-lg bg-slate-900 border-slate-950 disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-400"
          >
            Submit Answer
          </button>
        ) : (
          <button 
            onClick={handleNext}
            className="w-full md:w-auto btn-tactile btn-primary py-3.5 px-10 text-lg group"
          >
            {activeQuestion < questions.length - 1 ? 'Next Question' : 'Finish Module'}
            <ChevronRight className="ml-2 group-hover:translate-x-1.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
