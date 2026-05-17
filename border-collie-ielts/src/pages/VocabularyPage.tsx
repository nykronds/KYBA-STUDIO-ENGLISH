import React from 'react';
import { Mascot } from '../components/Mascot';
import { VocabularyModule } from '../components/VocabularyModule';
import { useAppContext } from '../context/AppContext';

export function VocabularyPage() {
  const { mascotMood, mascotMessage } = useAppContext();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 md:gap-8 max-w-6xl mx-auto h-full">
      <div className="flex flex-col space-y-6">
        <Mascot mood={mascotMood} message={mascotMessage} />
      </div>
      <div className="flex flex-col h-[750px] lg:h-[min(850px,calc(100vh-140px))]">
        <VocabularyModule />
      </div>
    </div>
  );
}
