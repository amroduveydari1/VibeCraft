
import { UserChoice, Question } from '../types';

export const getDynamicQuestions = (choices: UserChoice): Question[] => {
  const questions: Question[] = [];

  // Goal-specific questions
  if (choices.goal === 'video') {
    questions.push({
      id: 'pacing',
      label: 'How should the pacing feel?',
      type: 'single',
      options: [
        { value: 'fast', label: 'Rapid & Energetic', description: 'Quick cuts, high motion' },
        { value: 'slow', label: 'Slow & Deliberate', description: 'Lingering shots, calm flow' },
        { value: 'erratic', label: 'Erratic & Dynamic', description: 'Unpredictable transitions' }
      ]
    });
    
    if (choices.moods.includes('noir')) {
      questions.push({
        id: 'fog_density',
        label: 'Level of environmental haze?',
        type: 'single',
        options: [
          { value: 'none', label: 'Clear' },
          { value: 'light', label: 'Thin Fog' },
          { value: 'heavy', label: 'Dense Atmosphere' }
        ]
      });
    }
  }

  if (choices.goal === 'image') {
    if (choices.category === 'product') {
      questions.push({
        id: 'material',
        label: 'Dominant material texture?',
        type: 'single',
        options: [
          { value: 'matte', label: 'Matte Plastic' },
          { value: 'brushed', label: 'Brushed Aluminum' },
          { value: 'glass', label: 'Crystal Glass' },
          { value: 'ceramic', label: 'Polished Ceramic' }
        ]
      });
      questions.push({
        id: 'lighting_setup',
        label: 'Studio lighting setup?',
        type: 'single',
        options: [
          { value: 'rim', label: 'Rim Lighting' },
          { value: 'softbox', label: 'Top Softbox' },
          { value: 'neon', label: 'Dual Neon Tubes' }
        ]
      });
    } else if (choices.category === 'portrait') {
      questions.push({
        id: 'lens',
        label: 'Preferred lens focal length?',
        type: 'single',
        options: [
          { value: '35mm', label: '35mm Storytelling' },
          { value: '85mm', label: '85mm Classic Portrait' },
          { value: '200mm', label: '200mm Telephoto Compression' }
        ]
      });
    }
  }

  if (choices.goal === 'tool') {
    questions.push({
      id: 'user_level',
      label: 'Who is the target user?',
      type: 'single',
      options: [
        { value: 'pro', label: 'Industry Professionals' },
        { value: 'beginner', label: 'Absolute Beginners' },
        { value: 'hobbyist', label: 'Enthusiastic Hobbyists' }
      ]
    });
  }

  if (choices.goal === 'game') {
    questions.push({
      id: 'core_loop',
      label: 'What is the primary action?',
      type: 'single',
      options: [
        { value: 'collect', label: 'Gather & Build' },
        { value: 'combat', label: 'Tactical Combat' },
        { value: 'explore', label: 'Narrative Discovery' },
        { value: 'solve', label: 'Complex Deduction' }
      ]
    });
  }

  // Universal detail question
  questions.push({
    id: 'subject',
    label: 'What is the main subject or core concept?',
    type: 'text',
    placeholder: 'e.g. A lone wanderer in a desert, A premium minimalist coffee machine...'
  });

  return questions;
};
