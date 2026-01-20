export type Gender = 'Male' | 'Female' | 'Neutral';
export type Tone = 'Warm' | 'Authoritative' | 'Bright' | 'Deep' | 'Nurturing' | 'Energetic' | 'Calm' | 'Rasp';
export type Age = 'Young Adult' | 'Middle-Aged' | 'Senior' | 'Child';

export interface Voice {
  id: string;
  name: string;
  gender: Gender;
  tone: Tone[];
  age: Age;
  description: string;
  useCases: string[];
  previewUrl?: string; // If we had actual URLs, but we'll use Gemini TTS
  geminiModelName?: string; // Official Gemini Voice Name
}

export interface VoiceAnalysis {
  characterName: string;
  traits: string[];
  matchingReason: string;
}

export interface AiRecommendation {
  voiceId: string;
  score: number;
  reasoning: string;
}
