import React from 'react';
import { Mascot } from '../components/Mascot';
import { PronunciationModule } from '../components/PronunciationModule';
import { useAppContext } from '../context/AppContext';

export function PronunciationPage() {
  const { mascotMood, mascotMessage, setTemporaryMood, handleGainXp } = useAppContext();

  const handleCorrectPronunciation = (gainedXp: number) => {
    handleGainXp(gainedXp, 'pronunciation');
    setTemporaryMood('happy', "Perfect pronunciation! You nailed the intonation there! 🎤", 'neutral', "Give it another try or listen to the next prompt.");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
      <div className="flex flex-col space-y-6">
        <Mascot mood={mascotMood} message={mascotMessage} />
      </div>
      <div className="flex flex-col">
        <PronunciationModule onCorrect={handleCorrectPronunciation} />
      </div>
    </div>
  );
}
