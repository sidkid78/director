'use client';

import React from 'react';
import { Gender, Tone, Age } from '../types/voice';
import { Search, SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  filters: {
    gender: Gender | 'All';
    tone: Tone | 'All';
    age: Age | 'All';
  };
  onFilterChange: (key: string, val: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ search, onSearchChange, filters, onFilterChange }) => {
  const genders: (Gender | 'All')[] = ['All', 'Male', 'Female', 'Neutral'];
  const tones: (Tone | 'All')[] = ['All', 'Warm', 'Authoritative', 'Bright', 'Deep', 'Nurturing', 'Energetic', 'Calm', 'Rasp'];
  const ages: (Age | 'All')[] = ['All', 'Young Adult', 'Middle-Aged', 'Senior', 'Child'];

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search personas, styles, or use cases..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all text-slate-200"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <SlidersHorizontal size={16} />
          <span>Filters</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold ml-1">Gender</span>
          <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-lg">
            {genders.map(g => (
              <button
                key={g}
                onClick={() => onFilterChange('gender', g)}
                className={`px-3 py-1 rounded-md text-xs transition-all ${filters.gender === g ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold ml-1">Age</span>
          <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-lg">
            {ages.map(a => (
              <button
                key={a}
                onClick={() => onFilterChange('age', a)}
                className={`px-3 py-1 rounded-md text-xs transition-all ${filters.age === a ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5 flex-grow">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold ml-1">Tone</span>
          <select 
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
            value={filters.tone}
            onChange={(e) => onFilterChange('tone', e.target.value)}
          >
            {tones.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
