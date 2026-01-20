import { GoogleGenAI } from '@google/genai';

// This is a server-side helper
export const getGeminiClient = () => {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
};
