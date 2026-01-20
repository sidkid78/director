'use client';

import React, { useState } from 'react';
import { Sparkles, Loader2, Search } from 'lucide-react';
import { Voice, AiRecommendation } from '../types/voice';
import { voices } from '../data/voices';

interface VoiceFinderProps {
  onRecommendations: (recommendations: AiRecommendation[]) => void;
}

const VoiceFinder: React.FC<VoiceFinderProps> = ({ onRecommendations }) => {
  const [prompt, setPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!prompt.trim()) return;
    
    setIsAnalyzing(true);
    try {
      // We'll call a server action or API route here
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: JSON.stringify({ prompt, voices }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      onRecommendations(data.recommendations);
    } catch (error: any) {
      console.error('Analysis failed:', error);
      alert('AI analysis failed: ' + error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-900/20 to-violet-900/20 border border-blue-500/30 rounded-2xl p-6 mb-12 shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-blue-400" size={20} />
        <h2 className="text-xl font-bold text-white">AI Casting Director</h2>
      </div>
      
      <p className="text-slate-400 text-sm mb-4">
        Describe your character, project, or brand, and I'll find the perfect voices for you.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <textarea
          className="flex-grow bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all min-h-[100px] resize-none"
          placeholder="E.g., A wise old wizard for a fantasy RPG, slightly raspy but kind..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !prompt.trim()}
          className="sm:w-32 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/40"
        >
          {isAnalyzing ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
          <span>{isAnalyzing ? 'Analyzing' : 'Find'}</span>
        </button>
      </div>
    </div>
  );
};

export default VoiceFinder;
