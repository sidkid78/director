'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Voice } from '../types/voice';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { cn } from '../lib/utils';

interface Carousel3DProps {
  voices: Voice[];
  onPreview: (voice: Voice) => void;
  onSelect: (voice: Voice) => void;
  selectedVoiceId?: string;
}

const Carousel3D: React.FC<Carousel3DProps> = ({ voices, onPreview, onSelect, selectedVoiceId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % voices.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + voices.length) % voices.length);

  if (voices.length === 0) return null;

  return (
    <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden perspective-1000">
      <div className="relative w-full max-w-lg h-full flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {voices.map((voice, index) => {
            const offset = (index - currentIndex + voices.length) % voices.length;
            const isCenter = offset === 0;
            const isLeft = offset === voices.length - 1;
            const isRight = offset === 1;

            if (!isCenter && !isLeft && !isRight) return null;

            return (
              <motion.div
                key={voice.id}
                initial={{ opacity: 0, scale: 0.8, x: isLeft ? -100 : isRight ? 100 : 0 }}
                animate={{
                  opacity: isCenter ? 1 : 0.4,
                  scale: isCenter ? 1 : 0.7,
                  x: isCenter ? 0 : isLeft ? -250 : 250,
                  zIndex: isCenter ? 10 : 5,
                  rotateY: isCenter ? 0 : isLeft ? 45 : -45,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={() => isCenter && onSelect(voice)}
                className={cn(
                  "absolute w-64 h-80 rounded-3xl p-6 flex flex-col items-center justify-between text-center cursor-pointer",
                  "bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 shadow-2xl",
                  isCenter ? "border-blue-500/50 ring-1 ring-blue-500/20" : "",
                  selectedVoiceId === voice.id ? "ring-2 ring-blue-500 ring-offset-4 ring-offset-slate-950" : ""
                )}
              >
                <div className="w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/40">
                    <span className="text-2xl font-bold">{voice.name[0]}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{voice.name}</h3>
                  <div className="flex gap-2 justify-center mb-4">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 uppercase font-semibold">
                      {voice.age}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-900/40 text-blue-300 uppercase font-semibold border border-blue-800/50">
                      {voice.tone[0]}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 line-clamp-3">{voice.description}</p>
                </div>

                <button
                  onClick={() => onPreview(voice)}
                  disabled={!isCenter}
                  className={cn(
                    "mt-4 flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all",
                    isCenter 
                      ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20" 
                      : "bg-slate-800 text-slate-500"
                  )}
                >
                  <Play size={16} fill="currentColor" />
                  Preview
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <button 
        onClick={prev}
        aria-label="Previous voice"
        className="absolute left-4 p-3 rounded-full bg-slate-900/50 border border-slate-800 text-white hover:bg-slate-800 transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={next}
        aria-label="Next voice"
        className="absolute right-4 p-3 rounded-full bg-slate-900/50 border border-slate-800 text-white hover:bg-slate-800 transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Carousel3D;
