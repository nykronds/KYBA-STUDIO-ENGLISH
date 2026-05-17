import React, { useState, useMemo } from 'react';
import { Mascot } from '../components/Mascot';
import { ReadingPassage } from '../components/ReadingPassage';
import { useAppContext } from '../context/AppContext';
import { READING_PASSAGES } from '../data';
import { Filter, SortAsc } from 'lucide-react';

export function ReadingPage() {
  const { mascotMood, mascotMessage, setTemporaryMood, handleGainXp } = useAppContext();
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('Default');

  const filteredSortedPassages = useMemo(() => {
    let result = [...READING_PASSAGES];
    
    if (filterType !== 'All') {
      result = result.filter(p => p.type === filterType);
    }
    
    if (sortBy === 'Title (A-Z)') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'Title (Z-A)') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'Difficulty (Asc)') {
      const diffMap: Record<string, number> = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
      result.sort((a, b) => (diffMap[a.difficulty] || 0) - (diffMap[b.difficulty] || 0));
    } else if (sortBy === 'Difficulty (Desc)') {
      const diffMap: Record<string, number> = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
      result.sort((a, b) => (diffMap[b.difficulty] || 0) - (diffMap[a.difficulty] || 0));
    }
    
    return result;
  }, [filterType, sortBy]);

  const handleCorrectReading = (gainedXp: number) => {
    handleGainXp(gainedXp, 'reading');
    setTemporaryMood('happy', "Excellent comprehension! Your scanning and skimming skills are top-notch. 📚", 'neutral', "Keep reading, pay attention to the tricky vocabulary!");
  };

  const handleIncorrectReading = () => {
    setTemporaryMood('sad', "Not quite. Reread the specific paragraph and check for synonyms! 🧐", 'neutral', "Give it another go. Look for the keywords.");
  };

  return (
    <div className="flex flex-col space-y-6 max-w-4xl mx-auto h-[600px] lg:h-[min(850px,calc(100vh-140px))]">
      <div className="flex-shrink-0">
        <Mascot mood={mascotMood} message={mascotMessage} />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm shrink-0">
        <div className="flex-1 flex items-center space-x-3">
          <div className="bg-slate-100 p-2 rounded-lg text-slate-500">
            <Filter size={18} />
          </div>
          <div className="flex-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Passage Type</label>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none"
            >
              <option value="All">All Types</option>
              <option value="Academic">Academic</option>
              <option value="General Training">General Training</option>
            </select>
          </div>
        </div>
        
        <div className="w-px bg-slate-200 hidden sm:block"></div>
        
        <div className="flex-1 flex items-center space-x-3">
          <div className="bg-slate-100 p-2 rounded-lg text-slate-500">
            <SortAsc size={18} />
          </div>
          <div className="flex-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Sort By</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none"
            >
              <option value="Default">Default Order</option>
              <option value="Title (A-Z)">Title (A-Z)</option>
              <option value="Title (Z-A)">Title (Z-A)</option>
              <option value="Difficulty (Asc)">Difficulty (Ascending)</option>
              <option value="Difficulty (Desc)">Difficulty (Descending)</option>
            </select>
          </div>
        </div>
      </div>

      <ReadingPassage passages={filteredSortedPassages} onCorrect={handleCorrectReading} onIncorrect={handleIncorrectReading} />
    </div>
  );
}
