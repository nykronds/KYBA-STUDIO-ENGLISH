import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type SkillType = 'listening' | 'reading' | 'speaking' | 'pronunciation';
type MoodType = 'neutral' | 'thinking' | 'happy' | 'sad';

interface Skills {
  listening: { level: number; xp: number };
  reading: { level: number; xp: number };
  speaking: { level: number; xp: number };
  pronunciation: { level: number; xp: number };
}

interface AppContextProps {
  skills: Skills;
  totalXp: number;
  playerLevel: number;
  mascotMood: MoodType;
  mascotMessage: string;
  setTemporaryMood: (mood: MoodType, msg: string, revertMood: MoodType, revertMsg: string) => void;
  handleGainXp: (gainedXp: number, skillType: SkillType) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [skills, setSkills] = useState<Skills>({
    listening: { level: 3, xp: 2450 },
    reading: { level: 1, xp: 450 },
    speaking: { level: 2, xp: 1200 },
    pronunciation: { level: 4, xp: 3800 },
  });

  const [mascotMood, setMascotMood] = useState<MoodType>('neutral');
  const [mascotMessage, setMascotMessage] = useState("Welcome back!");
  const mascotTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
       setMascotMood('happy');
       setMascotMessage("Here is your Training Hub. Keep completing modules to rank up!");
    } else if (path === '/listening') {
       setMascotMood('neutral');
       setMascotMessage("Listen carefully to the audio. Identify the primary reason behind the phenomenon, not just the distractors.");
    } else if (path === '/reading') {
       setMascotMood('neutral');
       setMascotMessage("Read the passage carefully. Remember to skim for the main idea and scan for details.");
    } else if (path === '/pronunciation') {
       setMascotMood('thinking');
       setMascotMessage("Time to work on those vocal muscles! Tap the mic when you are ready.");
    } else if (path === '/speaking') {
       setMascotMood('happy');
       setMascotMessage("Let's practice speaking fluently and naturally. Remember to use complex sentences and maintain a good pace!");
    } else if (path === '/vocabulary') {
       setMascotMood('thinking');
       setMascotMessage("A strong vocabulary is key to a high band score. Let's learn some C2 words!");
    } else {
       setMascotMood('sad');
       setMascotMessage("This module is currently locked. Rank up to unlock it!");
    }
  }, [location.pathname]);

  const totalXp = (Object.values(skills) as {level: number, xp: number}[]).reduce((sum, skill) => sum + skill.xp, 0);
  const playerLevel = (Object.values(skills) as {level: number, xp: number}[]).reduce((sum, skill) => sum + skill.level, 0) - 4 + 1;

  const setTemporaryMood = (mood: MoodType, msg: string, revertMood: MoodType, revertMsg: string) => {
    if (mascotTimeoutRef.current) clearTimeout(mascotTimeoutRef.current);
    setMascotMood(mood);
    setMascotMessage(msg);
    mascotTimeoutRef.current = setTimeout(() => {
      setMascotMood(revertMood);
      setMascotMessage(revertMsg);
    }, 4500);
  };

  const handleGainXp = (gainedXp: number, skillType: SkillType) => {
    setSkills(prev => {
      const skill = prev[skillType];
      let newXp = skill.xp + gainedXp;
      let newLevel = skill.level;
      const needed = skill.level * 1000;
      if (newXp >= needed) {
        newLevel += 1;
        newXp -= needed;
      }
      return { ...prev, [skillType]: { level: newLevel, xp: newXp } };
    });
  };

  return (
    <AppContext.Provider value={{ skills, totalXp, playerLevel, mascotMood, mascotMessage, setTemporaryMood, handleGainXp }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
