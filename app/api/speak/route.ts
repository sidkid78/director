import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { text, voicePersona } = await req.json();

    const ai = getGeminiClient();

    const selectedVoice = voicePersona.geminiModelName || 'Puck';
    console.log(`[Gemini TTS] selectedVoice: ${selectedVoice}, model: gemini-2.5-flash-preview-tts`);

    // Use gemini-2.5-flash-preview-tts for official SpeechConfig support.
    const generationConfig: any = {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: selectedVoice
          }
        }
      }
    };

    const prompt = `
# AUDIO PROFILE: ${voicePersona.name}
Role: ${voicePersona.description}
Gender: ${voicePersona.gender}
Age: ${voicePersona.age}

## THE SCENE: Voice Output
Reading a response to the user clearly and naturally.

### DIRECTOR'S NOTES
Style: ${voicePersona.tone.join(', ')}
Pacing: Natural

#### TRANSCRIPT
${text}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: {
        parts: [
          {
            text: prompt
          }
        ]
      },
      config: generationConfig
    });

    // Find the audio part in the response
    const audioPart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData?.mimeType?.startsWith('audio'));

    if (audioPart && audioPart.inlineData) {
      return NextResponse.json({
        audioBase64: Buffer.concat([
          createWavHeader(audioPart.inlineData.data!.length, { sampleRate: 24000, numChannels: 1, bitsPerSample: 16 }),
          Buffer.from(audioPart.inlineData.data!, 'base64')
        ]).toString('base64'),
        mimeType: 'audio/wav'
      });
    }

    return NextResponse.json({ error: 'No audio generated' }, { status: 400 });
  } catch (error: any) {
    console.error('Gemini TTS Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function createWavHeader(dataLength: number, options: { sampleRate: number, numChannels: number, bitsPerSample: number }) {
  const { numChannels, sampleRate, bitsPerSample } = options;
  const byteRate = sampleRate * numChannels * bitsPerSample / 8;
  const blockAlign = numChannels * bitsPerSample / 8;
  const buffer = Buffer.alloc(44);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataLength, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataLength, 40);

  return buffer;
}
