import React from 'react';
import { Headphones, BookOpen, MessageSquare, Mic, Star } from 'lucide-react';
import { cn } from '../lib/utils';
import { ProgressBar } from './ProgressBar';

export function SkillStatsPanel({ skills }: { skills: any }) {
  const skillData = [
    { id: 'listening', name: 'Listening', icon: Headphones, colorClass: 'text-blue-600', bgClass: 'bg-blue-100', barClass: 'bg-blue-500' },
    { id: 'reading', name: 'Reading', icon: BookOpen, colorClass: 'text-emerald-600', bgClass: 'bg-emerald-100', barClass: 'bg-emerald-500' },
    { id: 'speaking', name: 'Speaking', icon: MessageSquare, colorClass: 'text-orange-600', bgClass: 'bg-orange-100', barClass: 'bg-orange-500' },
    { id: 'pronunciation', name: 'Pronunciation', icon: Mic, colorClass: 'text-violet-600', bgClass: 'bg-violet-100', barClass: 'bg-violet-500' },
  ];

  return (
    <div className="card-tactile p-5">
      <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center">
         <Star size={14} className="mr-1.5 text-yellow-400" fill="currentColor" /> Skill Tree
      </h3>
      <div className="space-y-4">
         {skillData.map(data => {
            const skill = skills[data.id];
            const neededXp = skill.level * 1000;
            const progress = (skill.xp / neededXp) * 100;
            return (
              <div key={data.id} className="flex items-center space-x-3 2xl:space-x-4">
                 <div className={cn("p-2.5 rounded-2xl shadow-inner", data.bgClass, data.colorClass)}>
                   <data.icon size={22} />
                 </div>
                 <div className="flex-1">
                   <div className="flex justify-between items-end mb-1.5">
                     <div className="text-sm font-bold text-slate-900 leading-none">{data.name}</div>
                     <div className="text-xs font-bold text-slate-500 leading-none bg-slate-100 px-2 py-1 rounded-md">Lv. {skill.level}</div>
                   </div>
                   <ProgressBar progress={progress} className="h-2" barClassName={data.barClass} />
                 </div>
              </div>
            );
         })}
      </div>
    </div>
  )
}
