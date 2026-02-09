
import { UserChoice, GeneratedPrompt, GoalType } from '../types';

const SYNONYMS: Record<string, string[]> = {
  noir: ['melancholic shadowplay', 'chiaroscuro lighting', 'hard-boiled urbanism', 'obsidian contrast'],
  cyberpunk: ['chromatic aberration', 'neon-soaked hyper-reality', 'retro-futuristic grime', 'synthetic haze'],
  minimalist: ['austere geometry', 'negative space mastery', 'reductionist aesthetic', 'elemental clarity'],
  ethereal: ['opalescent glow', 'liminal dreamscape', 'diffused celestial light', 'soft-focus wonder'],
  brutalist: ['monolithic concrete', 'raw tectonic force', 'geometric imposition', 'unyielding structure'],
  vintage: ['analog grain', 'sepia-washed nostalgia', 'expired film stock', 'chromatic warmth'],
  biophilic: ['verdant organicism', 'botanical fusion', 'chlorophyll-infused architecture', 'photosynthetic'],
  'high-fashion': ['editorial sharpness', 'avant-garde silhouetting', 'glossy couture', 'runway precision'],
};

const getVariation = (mood: string, seed: number) => {
  const pool = SYNONYMS[mood] || [mood];
  return pool[seed % pool.length];
};

const generateImagePrompt = (choices: UserChoice, variant: number): string => {
  const { moods, intent, category, details, sliders } = choices;
  const mainMood = moods[0] || 'minimalist';
  const secondaryMood = moods[1] || 'ethereal';
  const moodWord = getVariation(mainMood, variant);
  const detailStr = details.subject || 'an abstract concept';
  
  const complexity = sliders.complexity > 70 ? 'exquisitely intricate, micro-detailed' : 'clean-cut, simplified';
  const sharpness = sliders.sharpness > 70 ? 'hyper-defined, 8k resolution' : 'soft focus, atmospheric blur';
  const boldness = sliders.boldness > 70 ? 'aggressive composition' : 'symmetrical balance';

  // Fix: UserChoice does not have 'extras'. We calculate aspect ratio based on user input.
  const aspectRatio = details.lens === '35mm' ? '3:2' : '1:1';

  return `[ARCHITECTURAL ${intent.toUpperCase()}]: ${category.toUpperCase()} perspective. SUBJECT: ${detailStr}. AESTHETIC: ${moodWord} with ${secondaryMood} undertones. OPTICS: ${details.lens || '85mm'}, ${complexity}. LIGHTING: ${details.lighting_setup || 'natural ambient'}. COLOR: Muted palette. ${sharpness}, ${boldness}. --ar ${aspectRatio} --v 6.1`;
};

const generateVideoPrompt = (choices: UserChoice, variant: number): string => {
  const { moods, category, details, sliders } = choices;
  const mood1 = moods[0] || 'cinematic';
  const mood2 = moods[1] || 'dramatic';
  const detailStr = details.subject || 'a cinematic sequence';
  const motion = sliders.energy > 60 ? 'dynamic handheld movement' : 'slow dolly zoom';

  return `SEQUENCE: ${category.toUpperCase()}. VISUALS: ${detailStr}. ATMOSPHERE: ${mood1} and ${mood2}. MOTION: ${motion}. PACING: ${details.pacing || 'calculated'}. LIGHTING: ${details.fog_density ? 'layered ' + details.fog_density + ' fog' : 'high-key clarity'}. RENDER: Anamorphic lenses, 24fps, high dynamic range.`;
};

const generateGamePrompt = (choices: UserChoice, variant: number): string => {
  const { category, details, moods, sliders } = choices;
  const style = sliders.style > 50 ? 'Stylized Illustration' : 'Hyper-Realistic PBR';
  return `BLUEPRINT: A ${moods.join(' x ')} ${category} experience. CORE MECHANIC: ${details.core_loop || 'Exploration'}. WORLD-BUILDING: ${details.subject}. ART DIRECTION: ${style}. SHADERS: ${moods[0]} lighting models. TECH: Unreal Engine 5 Nanite rendering.`;
};

const generateToolPrompt = (choices: UserChoice, variant: number): string => {
  const { category, details, sliders } = choices;
  const complexity = sliders.complexity > 50 ? 'Pro Grade' : 'Utility Focus';
  return `UX BLUEPRINT: ${details.subject}. DOMAIN: ${category}. ARCHITECTURE: ${complexity}. FLOW: Seamless ${category} integration. TARGET: ${details.user_level || 'General User'}. DESIGN SYSTEM: ${sliders.style > 50 ? 'Custom Experimental' : 'Atomic Design'}.`;
};

export const generatePrompts = (choices: UserChoice): GeneratedPrompt => {
  const timestamp = Date.now();
  const id = Math.random().toString(36).substring(7).toUpperCase();
  
  let v1 = '', v2 = '', v3 = '';
  
  switch(choices.goal) {
    case 'image':
      v1 = generateImagePrompt(choices, 0);
      v2 = generateImagePrompt(choices, 1);
      v3 = generateImagePrompt(choices, 2);
      break;
    case 'video':
      v1 = generateVideoPrompt(choices, 0);
      v2 = generateVideoPrompt(choices, 1);
      v3 = generateVideoPrompt(choices, 2);
      break;
    case 'game':
      v1 = generateGamePrompt(choices, 0);
      v2 = generateGamePrompt(choices, 1);
      v3 = generateGamePrompt(choices, 2);
      break;
    case 'tool':
      v1 = generateToolPrompt(choices, 0);
      v2 = generateToolPrompt(choices, 1);
      v3 = generateToolPrompt(choices, 2);
      break;
  }

  return {
    id,
    timestamp,
    choices,
    v1,
    v2,
    v3,
    extras: {
      negativePrompt: "low-fidelity, distorted anatomy, messy composition, redundant artifacts",
      aspectRatio: choices.goal === 'video' ? "16:9" : (choices.details.lens === '35mm' ? "3:2" : "1:1"),
      blueprintRef: `VB-${id}`,
      renderConfig: choices.goal === 'video' ? "ProRes 422" : "RAW Data"
    }
  };
};
