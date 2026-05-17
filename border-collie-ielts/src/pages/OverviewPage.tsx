import React from 'react';
import { Mascot } from '../components/Mascot';
import { SkillStatsPanel } from '../components/SkillStatsPanel';
import { useAppContext } from '../context/AppContext';

export function OverviewPage() {
  const { mascotMood, mascotMessage, skills } = useAppContext();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
      <div className="flex flex-col space-y-6">
        <Mascot mood={mascotMood} message={mascotMessage} />
      </div>
      <div className="flex flex-col">
        <SkillStatsPanel skills={skills} />
      </div>
    </div>
  );
}
