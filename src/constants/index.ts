/**
 * Application constants and configuration
 */
import type { Goal, Language, VoiceOption, Gender } from '../types';
import { 
  HeartIcon, 
  SparklesIcon, 
  MessageCircleIcon, 
  ZapIcon 
} from '../components/icons';

export const GOALS: Goal[] = [
  {
    id: 'first-date',
    title: 'First Date',
    description: 'Practice making a great first impression.',
    icon: HeartIcon,
  },
  {
    id: 'flirting',
    title: 'Flirting',
    description: 'Learn to be more playful and charming.',
    icon: SparklesIcon,
  },
  {
    id: 'deep-talk',
    title: 'Deep Talk',
    description: 'Practice navigating more intimate conversations.',
    icon: MessageCircleIcon,
  },
  {
    id: 'conflict-resolution',
    title: 'Conflict Resolution',
    description: 'Handle disagreements with grace and understanding.',
    icon: ZapIcon,
  },
];

export const LANGUAGES: Language[] = [
  { code: 'en-US', name: 'English' },
  { code: 'es-ES', name: 'Español' },
  { code: 'fr-FR', name: 'Français' },
  { code: 'de-DE', name: 'Deutsch' },
  { code: 'it-IT', name: 'Italiano' },
  { code: 'pt-BR', name: 'Português' },
  { code: 'ja-JP', name: '日本語' },
  { code: 'ko-KR', name: '한국어' },
  { code: 'hi-IN', name: 'हिन्दी' },
  { code: 'ar-SA', name: 'العربية' },
  { code: 'zh-CN', name: '中文' },
  { code: 'ru-RU', name: 'Русский' },
];

const VOICE_PROFILES = {
  female: [
    { name: "Aria", tone: "Warm & Inviting", emotion_range: ["Playful", "Empathetic", "Intimate"] },
    { name: "Bella", tone: "Bright & Energetic", emotion_range: ["Flirty", "Charming", "Confident"] },
    { name: "Chloe", tone: "Clear & Crisp", emotion_range: ["Intellectual", "Witty", "Engaging"] },
    { name: "Daisy", tone: "Calm & Gentle", emotion_range: ["Vulnerable", "Supportive", "Romantic"] },
    { name: "Elena", tone: "Soft & Melodic", emotion_range: ["Sensual", "Deep", "Passionate"] },
    { name: "Fiona", tone: "Warm & Inviting", emotion_range: ["Flirty", "Vulnerable", "Romantic"] },
    { name: "Grace", tone: "Bright & Energetic", emotion_range: ["Playful", "Empathetic", "Intimate"] },
    { name: "Hazel", tone: "Clear & Crisp", emotion_range: ["Charming", "Deep", "Passionate"] },
    { name: "Isla", tone: "Calm & Gentle", emotion_range: ["Confident", "Teasing", "Warm"] },
    { name: "Jade", tone: "Soft & Melodic", emotion_range: ["Engaging", "Supportive", "Sensual"] },
    { name: "Kira", tone: "Warm & Inviting", emotion_range: ["Intellectual", "Witty", "Engaging"] },
    { name: "Luna", tone: "Bright & Energetic", emotion_range: ["Vulnerable", "Supportive", "Romantic"] },
    { name: "Mia", tone: "Clear & Crisp", emotion_range: ["Sensual", "Deep", "Passionate"] },
    { name: "Nora", tone: "Calm & Gentle", emotion_range: ["Flirty", "Charming", "Confident"] },
    { name: "Olivia", tone: "Soft & Melodic", emotion_range: ["Playful", "Empathetic", "Intimate"] },
    { name: "Penelope", tone: "Warm & Inviting", emotion_range: ["Confident", "Teasing", "Warm"] },
    { name: "Quinn", tone: "Bright & Energetic", emotion_range: ["Engaging", "Supportive", "Sensual"] },
    { name: "Riley", tone: "Clear & Crisp", emotion_range: ["Flirty", "Vulnerable", "Romantic"] },
    { name: "Sophia", tone: "Calm & Gentle", emotion_range: ["Charming", "Deep", "Passionate"] },
    { name: "Tara", tone: "Soft & Melodic", emotion_range: ["Intellectual", "Witty", "Engaging"] },
  ],
  male: [
    { name: "Atlas", tone: "Deep & Resonant", emotion_range: ["Confident", "Commanding", "Romantic"] },
    { name: "Orion", tone: "Rich & Inviting", emotion_range: ["Warm", "Charming", "Playful"] },
    { name: "Jasper", tone: "Smooth Baritone", emotion_range: ["Charismatic", "Witty", "Flirty"] },
    { name: "Phoenix", tone: "Bold & Confident", emotion_range: ["Direct", "Teasing", "Passionate"] },
    { name: "Silas", tone: "Calm & Grounded", emotion_range: ["Reassuring", "Deep", "Sensual"] },
    { name: "Roman", tone: "Warm Baritone", emotion_range: ["Supportive", "Intimate", "Vulnerable"] },
    { name: "Caspian", tone: "Gentle & Deep", emotion_range: ["Empathetic", "Romantic", "Thoughtful"] },
    { name: "Soren", tone: "Clear & Reassuring", emotion_range: ["Honest", "Supportive", "Engaging"] },
    { name: "Leo", tone: "Warm & Expressive", emotion_range: ["Playful", "Affectionate", "Charming"] },
    { name: "Ezra", tone: "Thoughtful & Intimate", emotion_range: ["Vulnerable", "Deep", "Poetic"] },
    { name: "Dante", tone: "Deep & Passionate", emotion_range: ["Intense", "Romantic", "Sensual"] },
    { name: "Ronan", tone: "Rugged & Confident", emotion_range: ["Protective", "Direct", "Playful"] },
    { name: "Felix", tone: "Bright Baritone", emotion_range: ["Optimistic", "Witty", "Engaging"] },
    { name: "Maximus", tone: "Strong & Resonant", emotion_range: ["Commanding", "Confident", "Protective"] },
    { name: "Stellan", tone: "Clear & Melodic", emotion_range: ["Articulate", "Charming", "Intellectual"] },
    { name: "Kai", tone: "Calm & Deep", emotion_range: ["Grounded", "Intimate", "Mysterious"] },
    { name: "Evander", tone: "Noble & Warm", emotion_range: ["Honorable", "Romantic", "Gentle"] },
    { name: "Rhys", tone: "Smooth & Alluring", emotion_range: ["Flirty", "Charismatic", "Teasing"] },
    { name: "Gideon", tone: "Steady & Deep", emotion_range: ["Reliable", "Supportive", "Warm"] },
    { name: "Lucian", tone: "Elegant & Resonant", emotion_range: ["Sophisticated", "Romantic", "Intense"] },
  ],
};

const createVoiceOptions = (gender: Gender): VoiceOption[] => {
  const profiles = VOICE_PROFILES[gender];
  return profiles.map((profile, i) => ({
    id: `${gender}-voice-${i + 1}`,
    name: profile.name,
    gender: gender,
    tone: profile.tone,
    style: 'presenter',
    emotion_range: profile.emotion_range,
    description: `A ${profile.tone.toLowerCase()} voice, capable of being ${profile.emotion_range.map(e => e.toLowerCase()).join(', ')}.`,
  }));
};

export const FEMALE_VOICES: VoiceOption[] = createVoiceOptions('female');
export const MALE_VOICES: VoiceOption[] = createVoiceOptions('male');

// FIXED: Using ONLY verified, working voices from Gemini API
// These are the actual prebuilt voice names available in the Gemini TTS API
export const GEMINI_LIVE_VOICES = {
  // Female voices - verified working feminine voices from Gemini API
  female: ['Kore', 'Aoede'],
  
  // Male voices - verified working deep masculine voices from Gemini API  
  male: ['Puck', 'Charon', 'Fenrir']
};

// Helper function to get gender-appropriate API voice name
export const getApiVoiceForProfile = (voiceId: string, gender: 'male' | 'female'): string => {
  // Extract the voice number from id (e.g., "male-voice-3" -> 3)
  const voiceNumber = parseInt(voiceId.split('-')[2]);
  
  // Get gender-specific voice array
  const genderVoices = GEMINI_LIVE_VOICES[gender];
  
  // Map to appropriate API voice using modulo to cycle through available voices
  const voiceIndex = (voiceNumber - 1) % genderVoices.length;
  
  return genderVoices[voiceIndex];
};