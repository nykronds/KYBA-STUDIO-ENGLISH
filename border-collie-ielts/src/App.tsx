import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { 
  Headphones, BookOpen, MessageSquare, LayoutDashboard, Lock, Mic, BookA
} from 'lucide-react';
import { cn } from './lib/utils';

// Context
import { AppProvider, useAppContext } from './context/AppContext';

// Components
import { Header } from './components/Header';

// Pages
import { OverviewPage } from './pages/OverviewPage';
import { ListeningPage } from './pages/ListeningPage';
import { ReadingPage } from './pages/ReadingPage';
import { PronunciationPage } from './pages/PronunciationPage';
import { SpeakingPage } from './pages/SpeakingPage';
import { VocabularyPage } from './pages/VocabularyPage';

// Types for our TABS array
type TabItem = {
  id: string;
  path: string;
  name: string;
  icon: React.ElementType;
  locked?: boolean;
};

const TABS: TabItem[] = [
  { id: 'overview', path: '/', name: 'Training Hub', icon: LayoutDashboard },
  { id: 'listening', path: '/listening', name: 'Listening', icon: Headphones },
  { id: 'reading', path: '/reading', name: 'Reading', icon: BookOpen },
  { id: 'pronunciation', path: '/pronunciation', name: 'Pronunciation', icon: Mic },
  { id: 'speaking', path: '/speaking', name: 'Speaking', icon: MessageSquare },
  { id: 'vocabulary', path: '/vocabulary', name: 'Vocabulary', icon: BookA },
];

function AppLayout() {
  const { playerLevel, totalXp } = useAppContext();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-blue-200">
      <Header playerLevel={playerLevel} totalXp={totalXp} />

      {/* Navigation Tabs */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 mt-6">
        <div className="flex space-x-1 md:space-x-2 overflow-x-auto pb-4 pt-2 scrollbar-none border-b-2 border-slate-200">
          {TABS.map(tab => {
            const Icon = tab.icon;
            
            // For locked tabs, we don't want them to be clickable links
            if (tab.locked) {
              return (
                <button
                  key={tab.id}
                  disabled
                  className="flex items-center mx-1 px-4 py-3 font-bold text-sm md:text-base whitespace-nowrap transition-colors border-2 border-transparent text-slate-500 opacity-50 cursor-not-allowed mt-0.5"
                >
                  <Icon size={18} className="mr-2" />
                  {tab.name}
                  <Lock size={14} className="ml-2 text-slate-400" />
                </button>
              );
            }

            return (
              <NavLink
                key={tab.id}
                to={tab.path}
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 mx-1 font-bold text-sm md:text-base whitespace-nowrap transition-all outline-none rounded-2xl",
                  isActive ? "bg-white border-2 border-slate-200 border-b-[4px] text-blue-600 shadow-sm relative top-[-2px]" : "border-2 border-transparent text-slate-500 hover:text-slate-800 hover:bg-black/5 mt-0.5",
                )}
              >
                <Icon size={18} className="mr-2" />
                {tab.name}
              </NavLink>
            )
          })}
        </div>
      </div>

      <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-8">
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/listening" element={<ListeningPage />} />
          <Route path="/reading" element={<ReadingPage />} />
          <Route path="/pronunciation" element={<PronunciationPage />} />
          <Route path="/speaking" element={<SpeakingPage />} />
          <Route path="/vocabulary" element={<VocabularyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </BrowserRouter>
  );
}
