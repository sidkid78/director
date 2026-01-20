'use client';

import { useState, useRef } from 'react';
import { Voice } from '../types/voice';

export const useVoice = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playPreview = async (voice: Voice, text: string = "Hello, I am ready to be the voice of your next project.") => {
    setError(null);
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    try {
      setIsPlaying(true);
      const response = await fetch('/api/speak', {
        method: 'POST',
        body: JSON.stringify({ text, voicePersona: voice }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      if (data.audioBase64) {
        const audioSrc = `data:${data.mimeType};base64,${data.audioBase64}`;
        if (audioRef.current) {
          audioRef.current.src = audioSrc;
        } else {
          audioRef.current = new Audio(audioSrc);
        }
        
        audioRef.current.play();
        audioRef.current.onended = () => setIsPlaying(false);
      } else {
        throw new Error('No audio content returned');
      }
    } catch (error: any) {
      console.error('Error playing preview:', error);
      setError(error.message);
      setIsPlaying(false);
    }
  };

  return { isPlaying, playPreview, error, clearError: () => setError(null) };
};
