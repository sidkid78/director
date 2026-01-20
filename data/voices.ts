import { Voice } from '../types/voice';

export const voices: Voice[] = [
  {
    id: 'v1',
    name: 'Aria',
    gender: 'Female',
    tone: ['Warm', 'Nurturing'],
    age: 'Young Adult',
    description: 'A gentle and welcoming voice, perfect for meditation and health apps.',
    useCases: ['Meditation', 'Wellness', 'E-learning'],
    geminiModelName: 'Sulafat' // Warm
  },
  {
    id: 'v2',
    name: 'Marcus',
    gender: 'Male',
    tone: ['Authoritative', 'Deep'],
    age: 'Middle-Aged',
    description: 'Deep, resonant and trustworthy. Ideal for corporate narrations and luxury brands.',
    useCases: ['Corporate', 'Documentary', 'Luxury'],
    geminiModelName: 'Orus' // Firm
  },
  {
    id: 'v3',
    name: 'Luna',
    gender: 'Female',
    tone: ['Bright', 'Energetic'],
    age: 'Young Adult',
    description: 'High-energy and youthful. Great for commercials targeting Gen Z.',
    useCases: ['Commercials', 'Gaming', 'Social Media'],
    geminiModelName: 'Zephyr' // Bright
  },
  {
    id: 'v4',
    name: 'Silas',
    gender: 'Male',
    tone: ['Calm', 'Rasp'],
    age: 'Senior',
    description: 'Weathered and wise. Perfect for storytelling and historical documentaries.',
    useCases: ['Storytelling', 'History', 'Audiobooks'],
    geminiModelName: 'Charon' // Informative (Closest match for wise/calm)
  },
  {
    id: 'v5',
    name: 'Oliver',
    gender: 'Male',
    tone: ['Energetic', 'Bright'],
    age: 'Child',
    description: 'Curious and upbeat. Ideal for educational toys and animations.',
    useCases: ['Education', 'Animation', 'Toys'],
    geminiModelName: 'Puck' // Upbeat
  },
  {
    id: 'v6',
    name: 'Elena',
    gender: 'Female',
    tone: ['Authoritative', 'Warm'],
    age: 'Middle-Aged',
    description: 'Sophisticated and professional. Perfect for high-end automotive or tech.',
    useCases: ['Automotive', 'Tech', 'Professional Services'],
    geminiModelName: 'Kore' // Firm
  },
  {
    id: 'v7',
    name: 'Kai',
    gender: 'Neutral',
    tone: ['Calm', 'Warm'],
    age: 'Young Adult',
    description: 'Smooth and modern. A versatile voice for AI assistants and UI.',
    useCases: ['AI Assistants', 'App UI', 'Podcasts'],
    geminiModelName: 'Algieba' // Smooth
  },
  {
    id: 'v8',
    name: 'Seraphina',
    gender: 'Female',
    tone: ['Deep', 'Rasp'],
    age: 'Senior',
    description: 'Soulful and artistic. Great for indie films and poetry narrations.',
    useCases: ['Film', 'Art', 'Narrative'],
    geminiModelName: 'Enceladus' // Breathy (Artistic/Soulful)
  },
  {
    id: 'v9',
    name: 'Leo',
    gender: 'Male',
    tone: ['Bright', 'Warm'],
    age: 'Young Adult',
    description: 'The "guy next door". Relatable and friendly for retail commercials.',
    useCases: ['Retail', 'Vlogs', 'Radio'],
    geminiModelName: 'Fenrir' // Excitable/Bright
  },
  {
    id: 'v10',
    name: 'Maya',
    gender: 'Female',
    tone: ['Calm', 'Nurturing'],
    age: 'Child',
    description: 'Soft and innocent. Ideal for bedtime stories and children\'s apps.',
    useCases: ['Kids Apps', 'Sleep Stories', 'Education'],
    geminiModelName: 'Achernar' // Soft
  },
  { id: 'v11', name: 'Jasper', gender: 'Male', tone: ['Rasp', 'Energetic'], age: 'Young Adult', description: 'Gritty and cool.', useCases: ['Sportswear', 'Gaming'], geminiModelName: 'Algenib' },
  { id: 'v12', name: 'Zara', gender: 'Female', tone: ['Bright', 'Authoritative'], age: 'Young Adult', description: 'Confident and sharp.', useCases: ['News', 'Events'], geminiModelName: 'Autonoe' },
  { id: 'v13', name: 'Arthur', gender: 'Male', tone: ['Deep', 'Calm'], age: 'Senior', description: 'Grandfatherly and kind.', useCases: ['Audiobooks'], geminiModelName: 'Gacrux' },
  { id: 'v14', name: 'Chloe', gender: 'Female', tone: ['Energetic', 'Warm'], age: 'Young Adult', description: 'Peppy and helpful.', useCases: ['Support', 'Tutorials'], geminiModelName: 'Leda' },
  { id: 'v15', name: 'Victor', gender: 'Male', tone: ['Authoritative', 'Rasp'], age: 'Middle-Aged', description: 'The drill sergeant.', useCases: ['Fitness', 'Military'], geminiModelName: 'Alnilam' },
  { id: 'v16', name: 'Nova', gender: 'Neutral', tone: ['Bright', 'Calm'], age: 'Middle-Aged', description: 'Synthetic yet friendly.', useCases: ['Tech Support', 'IVR'], geminiModelName: 'Aoede' },
  { id: 'v17', name: 'Isabella', gender: 'Female', tone: ['Deep', 'Warm'], age: 'Middle-Aged', description: 'Rich and elegant.', useCases: ['Fashion', 'Jewelry'], geminiModelName: 'Despina' },
  { id: 'v18', name: 'Felix', gender: 'Male', tone: ['Energetic', 'Bright'], age: 'Young Adult', description: 'Fast-talking and fun.', useCases: ['Promos', 'Shorts'], geminiModelName: 'Laomedeia' },
  { id: 'v19', name: 'Grace', gender: 'Female', tone: ['Calm', 'Nurturing'], age: 'Senior', description: 'Reassuring and slow.', useCases: ['Medical', 'Legal'], geminiModelName: 'Vindemiatrix' },
  { id: 'v20', name: 'Elias', gender: 'Male', tone: ['Warm', 'Deep'], age: 'Young Adult', description: 'Romantic and smooth.', useCases: ['Perfume', 'Trailers'], geminiModelName: 'Iapetus' },
  { id: 'v21', name: 'Sasha', gender: 'Neutral', tone: ['Calm', 'Warm'], age: 'Young Adult', description: 'Balanced and clear.', useCases: ['E-learning'], geminiModelName: 'Umbriel' },
  { id: 'v22', name: 'Hugo', gender: 'Male', tone: ['Authoritative', 'Bright'], age: 'Middle-Aged', description: 'Sales leader.', useCases: ['Business', 'Seminars'], geminiModelName: 'Rasalgethi' },
  { id: 'v23', name: 'Beatrix', gender: 'Female', tone: ['Rasp', 'Calm'], age: 'Senior', description: 'Sophisticated and smoky.', useCases: ['Jazz Radio', 'Noir'], geminiModelName: 'Schedar' },
  { id: 'v24', name: 'Oscar', gender: 'Male', tone: ['Warm', 'Nurturing'], age: 'Middle-Aged', description: 'The caring father.', useCases: ['Insurance', 'Family Apps'], geminiModelName: 'Achird' },
  { id: 'v25', name: 'Lily', gender: 'Female', tone: ['Energetic', 'Bright'], age: 'Child', description: 'Giggling and cute.', useCases: ['Toys', 'Games'], geminiModelName: 'Callirrhoe' },
  { id: 'v26', name: 'Dante', gender: 'Male', tone: ['Deep', 'Rasp'], age: 'Young Adult', description: 'Intense and gravelly.', useCases: ['Action Trailers', 'Metal'], geminiModelName: 'Algenib' },
  { id: 'v27', name: 'Penelope', gender: 'Female', tone: ['Authoritative', 'Calm'], age: 'Middle-Aged', description: 'Steely and precise.', useCases: ['Financial', 'Law'], geminiModelName: 'Pulcherrima' },
  { id: 'v28', name: 'Rowan', gender: 'Neutral', tone: ['Warm', 'Bright'], age: 'Young Adult', description: 'Eclectic and trendy.', useCases: ['Fashion Blogs', 'Travel'], geminiModelName: 'Zubenelgenubi' },
  { id: 'v29', name: 'Balthazar', gender: 'Male', tone: ['Deep', 'Authoritative'], age: 'Senior', description: 'Epic and booming.', useCases: ['Fantasy Games', 'Movies'], geminiModelName: 'Orus' },
  { id: 'v30', name: 'Clara', gender: 'Female', tone: ['Warm', 'Calm'], age: 'Young Adult', description: 'Thoughtful and poetic.', useCases: ['Journaling', 'Poetry'], geminiModelName: 'Erinome' },
];
