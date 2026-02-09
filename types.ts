
export type GoalType = 'video' | 'image' | 'game' | 'tool';
export type Language = 'en' | 'tr' | 'ar';

export interface UserChoice {
  goal: GoalType | null;
  moods: string[];
  intent: string;
  category: string;
  details: Record<string, string>;
  sliders: {
    complexity: number;
    sharpness: number;
    energy: number;
    style: number;
    boldness: number;
  };
}

export interface Question {
  id: string;
  label: string;
  type: 'single' | 'multi' | 'text';
  options?: { value: string; label: string; description?: string }[];
  placeholder?: string;
  dependsOn?: (choices: UserChoice) => boolean;
}

export interface GeneratedPrompt {
  id: string;
  timestamp: number;
  choices: UserChoice;
  v1: string;
  v2: string;
  v3: string;
  extras: Record<string, any>;
}

export enum AppState {
  LANDING,
  WIZARD,
  RESULTS,
  LIBRARY
}
