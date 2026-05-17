import React from 'react';
import { Mascot } from '../components/Mascot';
import { SpeakingModule } from '../components/SpeakingModule';
import { useAppContext } from '../context/AppContext';

export function SpeakingPage() {
  const { mascotMood, mascotMessage, setTemporaryMood, handleGainXp } = useAppContext();

  const handleCompleteSpeaking = (gainedXp: number, result: { fluency: number, coherence: number, grammar: number }) => {
    handleGainXp(gainedXp, 'speaking');
    
    if (result.grammar < 80) {
      setTemporaryMood('thinking', "Good job, but let's review some grammar structures to make your sentences more accurate. 🤔", 'neutral', "Give it another try with a different prompt, or keep ranking up!");
    } else if (result.fluency > 90) {
      setTemporaryMood('happy', "Fantastic fluency! You sounded very natural. 🎉", 'neutral', "Give it another try with a different prompt, or keep ranking up!");
    } else if (result.coherence > 90) {
      setTemporaryMood('happy', "Your ideas were connected perfectly! Very coherent! 🌟", 'neutral', "Give it another try with a different prompt, or keep ranking up!");
    } else {
      setTemporaryMood('happy', "Wow, what a great response! Your speaking is naturally developing. 🎤", 'neutral', "Give it another try with a different prompt, or keep ranking up!");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 md:gap-8 max-w-6xl mx-auto">
      <div className="flex flex-col space-y-6">
        <Mascot mood={mascotMood} message={mascotMessage} />
      </div>
      <div className="flex flex-col">
        <SpeakingModule onComplete={handleCompleteSpeaking} />
      </div>
    </div>
  );
}
