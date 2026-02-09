
import { GeneratedPrompt } from '../types';

const STORAGE_KEY = 'vibecraft_library';

export const savePrompt = (prompt: GeneratedPrompt) => {
  const existing = getLibrary();
  const updated = [prompt, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getLibrary = (): GeneratedPrompt[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const deletePrompt = (id: string) => {
  const existing = getLibrary();
  const updated = existing.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
