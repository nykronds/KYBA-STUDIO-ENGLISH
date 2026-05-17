import React from 'react';
import { Mascot } from '../components/Mascot';
import { AudioPlayer } from '../components/AudioPlayer';
import { Quiz } from '../components/Quiz';
import { QUIZ_DATA } from '../data';
import { useAppContext } from '../context/AppContext';

export function ListeningPage() {
  const { mascotMood, mascotMessage, setTemporaryMood, handleGainXp } = useAppContext();

  const handleCorrectListening = (gainedXp: number) => {
    handleGainXp(gainedXp, 'listening');
    setTemporaryMood('happy', "Fantastic job! Your C2 listening skills are really showing. 🐾", 'thinking', "Ready for the next challenge? Let's keep this streak going.");
  };

  const handleIncorrectListening = () => {
    setTemporaryMood('sad', "Not quite, but that's how we learn. Review the explanation carefully! 🧐", 'neutral', "Whenever you're ready, let's tackle the next one.");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_2fr] gap-6 md:gap-8">
      <div className="flex flex-col space-y-6">
        <Mascot mood={mascotMood} message={mascotMessage} />
        <AudioPlayer />
      </div>
      <div className="h-[750px] lg:h-auto lg:max-h-[min(850px,calc(100vh-140px))] flex flex-col">
        <Quiz questions={QUIZ_DATA} title="Listening Assignment" onCorrect={handleCorrectListening} onIncorrect={handleIncorrectListening} />
      </div>
    </div>
  );
}
