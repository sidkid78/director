'use client';

import React from 'react';
import { Voice } from '../types/voice';
import { Play, User, Users, Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface VoiceCardProps {
  voice: Voice;
  isSelected: boolean;
  onSelect: (voice: Voice) => void;
  onPreview: (voice: Voice) => void;
}

const VoiceCard: React.FC<VoiceCardProps> = ({ voice, isSelected, onSelect, onPreview }) => {
  return (
    <div 
      className={cn(
        "group relative flex flex-col p-4 rounded-2xl border transition-all duration-300 cursor-pointer",
        isSelected 
          ? "bg-blue-600/10 border-blue-500 ring-1 ring-blue-500" 
          : "bg-slate-900/40 border-slate-800 hover:border-slate-600"
      )}
      onClick={() => onSelect(voice)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="p-2 rounded-lg bg-slate-800 text-slate-300 group-hover:text-white transition-colors">
          {voice.gender === 'Male' ? <User size={18} /> : voice.gender === 'Female' ? <User size={18} className="rotate-180" /> : <Users size={18} />}
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onPreview(voice);
          }}
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
        >
          <Play size={16} fill="currentColor" />
        </button>
      </div>

      <h3 className="font-semibold text-slate-100 mb-1">{voice.name}</h3>
      <p className="text-xs text-slate-400 mb-3 line-clamp-2">{voice.description}</p>
      
      <div className="mt-auto flex flex-wrap gap-1">
        {voice.tone.slice(0, 2).map(t => (
          <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            {t}
          </span>
        ))}
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
          {voice.age}
        </span>
      </div>
      
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-slate-950" />
      )}
    </div>
  );
};

export default VoiceCard;
