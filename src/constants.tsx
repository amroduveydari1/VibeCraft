
import React from 'react';

export const MOODS = [
  { value: 'noir', label: 'Noir', description: 'Shadowy, moody, high-contrast' },
  { value: 'cyberpunk', label: 'Cyberpunk', description: 'Neon, tech, rainy, futuristic' },
  { value: 'minimalist', label: 'Minimalist', description: 'Clean, spacious, purposeful' },
  { value: 'ethereal', label: 'Ethereal', description: 'Light, airy, dreamlike' },
  { value: 'brutalist', label: 'Brutalist', description: 'Raw, heavy, concrete, bold' },
  { value: 'vintage', label: 'Vintage', description: 'Faded, nostalgic, warm' },
  { value: 'biophilic', label: 'Biophilic', description: 'Natural, organic, green' },
  { value: 'high-fashion', label: 'High Fashion', description: 'Glossy, sharp, avant-garde' }
];

export const INTENTS = [
  { value: 'commercial', label: 'Commercial', description: 'Selling a product or lifestyle' },
  { value: 'artistic', label: 'Artistic', description: 'Personal expression and concept' },
  { value: 'educational', label: 'Educational', description: 'Clear communication of information' },
  { value: 'cinematic', label: 'Cinematic', description: 'Storytelling and atmosphere' }
];

export const GOAL_CATEGORIES: Record<string, { value: string; label: string }[]> = {
  video: [
    { value: 'ad', label: 'Advertisement' },
    { value: 'trailer', label: 'Movie Trailer' },
    { value: 'social', label: 'Social Media Reel' },
    { value: 'documentary', label: 'Documentary' }
  ],
  image: [
    { value: 'portrait', label: 'Portrait' },
    { value: 'product', label: 'Product Photography' },
    { value: 'architecture', label: 'Architecture' },
    { value: 'fashion', label: 'Fashion' }
  ],
  game: [
    { value: 'rpg', label: 'Open World RPG' },
    { value: 'puzzle', label: 'Abstract Puzzle' },
    { value: 'horror', label: 'Psychological Horror' },
    { value: 'sim', label: 'Cozy Simulation' }
  ],
  tool: [
    { value: 'productivity', label: 'Productivity App' },
    { value: 'creative', label: 'Creative Tool' },
    { value: 'education', label: 'Learning Platform' },
    { value: 'fintech', label: 'Financial Management' }
  ]
};
