# VoiceApp - AI Voice Selection & Generation

VoiceApp is a modern web application designed for casting directors and creators to find, analyze, and generate high-quality AI speech using Gemini models. Built with Next.js 16 and the latest Google GenAI SDK, it offers an immersive 3D experience for voice exploration.

## 🚀 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **AI Models:** 
  - **Gemini 2.5 Flash TTS:** Real-time high-fidelity Text-to-Speech.
  - **Gemini 3 Flash:** Advanced reasoning for voice analysis and casting recommendations.
- **SDK:** [@google/genai](https://www.npmjs.com/package/@google/genai) (Official Google GenAI SDK)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## 🏗️ Architecture

VoiceApp follows a modern server-client architecture leveraging Next.js:

1.  **Frontend (Client):** 
    - Interactive 3D UI for voice browsing.
    - Audio processing and visualization using the Web Audio API.
    - State management via React hooks.
2.  **Backend (Server):**
    - Next.js API Routes (`/api/speak`, `/api/analyze`) acting as a secure proxy to Google Gemini.
    - Structured output generation for casting logic.
    - WAV header injection for raw PCM audio returned by Gemini TTS.

## 📁 Directory Structure

```text
voice_app/
├── app/                  # Next.js App Router (Pages & API)
│   ├── api/              # Backend Endpoints
│   │   ├── analyze/      # AI Casting Analysis
│   │   └── speak/        # Text-to-Speech Generation
│   └── page.tsx          # Main Entry Point
├── components/           # UI Components (3D Carousel, Visualizers, Cards)
├── hooks/                # Custom React Hooks
├── lib/                  # Shared Utilities (Gemini Client, Helpers)
├── public/               # Static Assets
├── services/             # API Service Wrappers
├── types/                # TypeScript Definitions
├── next.config.ts        # Next.js Configuration
└── tailwind.config.ts    # Tailwind CSS Configuration
```

## 🛠️ Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd voice_app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root directory and add your Gemini API Key:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📡 API Documentation

### 1. Text-to-Speech (`POST /api/speak`)
Generates high-quality audio from text using a specific voice persona.

**Request Body:**
```json
{
  "text": "Hello, I am ready to record.",
  "voicePersona": {
    "name": "Puck",
    "geminiModelName": "Puck",
    "description": "Energetic and youthful",
    "gender": "Male",
    "age": "Young Adult",
    "tone": ["Excited", "Fast-paced"]
  }
}
```

**Response:**
```json
{
  "audioBase64": "...", // Base64 encoded WAV audio
  "mimeType": "audio/wav"
}
```

### 2. Voice Analysis (`POST /api/analyze`)
Uses Gemini 3 Flash to recommend the best voices based on a character description or project prompt.

**Request Body:**
```json
{
  "prompt": "I need a deep, authoritative voice for a space commander.",
  "voices": [...] // Array of available voice objects
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "voiceId": "v1",
      "score": 0.95,
      "reasoning": "This voice has the gravitas and authority required for a military leader."
    }
  ]
}
```

## ⚙️ Configuration

- **Next.js Config:** Custom configurations for image optimization and experimental features are located in `next.config.ts`.
- **Gemini Initialization:** The AI client is initialized in `lib/gemini.ts` using the `GoogleGenAI` class.
- **Tailwind:** Global styles and design tokens are managed in `app/globals.css` and the Tailwind configuration.

## 🎙️ Usage Examples

### Generating Speech
Select a voice from the 3D carousel, type your script in the input box, and hit "Generate". The app will fetch the audio and display a real-time visualization as it plays.

### Smart Casting
Click on the "Voice Finder" icon, describe your character (e.g., "A wise old tree with a rasping voice"), and let the AI analyze the library to find your perfect match.

---

*Built with ❤️ using Google Gemini and Next.js.*
