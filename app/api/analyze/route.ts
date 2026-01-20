import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient } from '@/lib/gemini';
import { Type } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { prompt, voices } = await req.json();

    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert Voice Casting Director.
      Analyze the following character/project description and recommend the best matches from the provided voice list.
      
      User Prompt: "${prompt}"
      
      Voices available: ${JSON.stringify(voices.map((v: any) => ({ id: v.id, name: v.name, description: v.description, tone: v.tone, age: v.age })))}
      
      Return the recommendations in JSON format.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  voiceId: { type: Type.STRING },
                  score: { type: Type.NUMBER },
                  reasoning: { type: Type.STRING }
                },
                required: ['voiceId', 'score', 'reasoning']
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('No text returned from Gemini');
    }
    const result = JSON.parse(text);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Gemini Analysis Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
