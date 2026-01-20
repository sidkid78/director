'use client';

import React, { useState, useMemo } from 'react';
import { voices } from '@/data/voices';
import { Voice, AiRecommendation, Gender, Tone, Age } from '@/types/voice';
import VoiceCard from '@/components/VoiceCard';
import FilterBar from '@/components/FilterBar';
import Carousel3D from '@/components/Carousel3D';
import VoiceFinder from '@/components/VoiceFinder';
import AudioVisualizer from '@/components/AudioVisualizer';
import { useVoice } from '@/hooks/useVoice';
import { Mic2, LayoutGrid, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const [view, setView] = useState<'grid' | 'immersive'>('grid');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<{
    gender: Gender | 'All';
    tone: Tone | 'All';
    age: Age | 'All';
  }>({
    gender: 'All',
    tone: 'All',
    age: 'All',
  });
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [recommendations, setRecommendations] = useState<AiRecommendation[]>([]);
  const { isPlaying, playPreview, error: voiceError } = useVoice();

  const handleFilterChange = (key: string, val: string) => {
    setFilters(prev => ({ ...prev, [key]: val }));
  };

  const filteredVoices = useMemo(() => {
    let result = voices;

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(v =>
        v.name.toLowerCase().includes(s) ||
        v.description.toLowerCase().includes(s) ||
        v.useCases.some(u => u.toLowerCase().includes(s))
      );
    }

    if (filters.gender !== 'All') {
      result = result.filter(v => v.gender === filters.gender);
    }

    if (filters.tone !== 'All') {
      result = result.filter(v => v.tone.includes(filters.tone as Tone));
    }

    if (filters.age !== 'All') {
      result = result.filter(v => v.age === filters.age);
    }

    // If we have AI recommendations, boost them or only show them?
    if (recommendations.length > 0) {
      result = [...result].sort((a, b) => {
        const recA = recommendations.find(r => r.voiceId === a.id);
        const recB = recommendations.find(r => r.voiceId === b.id);
        if (recA && !recB) return -1;
        if (!recA && recB) return 1;
        if (recA && recB) return recB.score - recA.score;
        return 0;
      });
    }

    return result;
  }, [search, filters, recommendations]);

  const recommendedVoices = useMemo(() => {
    return recommendations
      .map(rec => ({
        voice: voices.find(v => v.id === rec.voiceId)!,
        reasoning: rec.reasoning
      }))
      .filter(item => item.voice !== undefined);
  }, [recommendations]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Mic2 className="text-white" size={24} />
              </div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
                HOMEase | AI <span className="text-xl font-medium text-slate-500">| Voice Library</span>
              </h1>
            </div>
            <p className="text-slate-500">Curated AI personas for your creative projects.</p>
          </div>

          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setView('grid')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                view === 'grid' ? "bg-slate-800 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <LayoutGrid size={18} />
              Grid View
            </button>
            <button
              onClick={() => setView('immersive')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                view === 'immersive' ? "bg-slate-800 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <Sparkles size={18} />
              Immersive
            </button>
          </div>
        </header>

        {/* AI Section */}
        <VoiceFinder onRecommendations={setRecommendations} />

        {/* Recommendations display */}
        {recommendations.length > 0 && (
          <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
            <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2">
              <Sparkles size={14} />
              AI Recommended Matches
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedVoices.slice(0, 3).map(({ voice, reasoning }) => (
                <div key={voice.id} className="relative">
                  <VoiceCard
                    voice={voice}
                    isSelected={selectedVoice?.id === voice.id}
                    onSelect={setSelectedVoice}
                    onPreview={(v) => playPreview(v)}
                  />
                  <div className="mt-2 p-3 bg-blue-950/30 border border-blue-900/50 rounded-xl text-[11px] text-blue-200 italic">
                    "{reasoning}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        {view === 'immersive' ? (
          <div className="py-8">
            <Carousel3D
              voices={filteredVoices.slice(0, 10)}
              onPreview={(v) => playPreview(v)}
              onSelect={setSelectedVoice}
            />
          </div>
        ) : (
          <>
            <FilterBar
              search={search}
              onSearchChange={setSearch}
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredVoices.map(voice => (
                <VoiceCard
                  key={voice.id}
                  voice={voice}
                  isSelected={selectedVoice?.id === voice.id}
                  onSelect={setSelectedVoice}
                  onPreview={(v) => playPreview(v)}
                />
              ))}
            </div>
          </>
        )}

        {/* Sticky Player */}
        {selectedVoice && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {selectedVoice.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{selectedVoice.name}</div>
                    <div className="text-slate-500 text-xs">{selectedVoice.tone.join(' • ')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => playPreview(selectedVoice)}
                    className={cn(
                      "px-6 py-2 rounded-xl font-bold transition-all",
                      isPlaying ? "bg-red-500 text-white" : "bg-blue-600 text-white hover:bg-blue-500"
                    )}
                  >
                    {isPlaying ? 'Stop' : 'Generate Preview'}
                  </button>
                </div>
              </div>
              <AudioVisualizer isPlaying={isPlaying} />
              {voiceError && (
                <div className="text-red-400 text-[10px] text-center bg-red-900/20 py-1 rounded-lg border border-red-900/50">
                  {voiceError}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
