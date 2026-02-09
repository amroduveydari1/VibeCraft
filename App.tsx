
import React, { useState, useEffect } from 'react';
import { AppState, UserChoice, GeneratedPrompt, GoalType, Language } from './types';
import { generatePrompts } from './services/PromptGenerator';
import { savePrompt, getLibrary, deletePrompt } from './services/Storage';
import { translations } from './translations';
import Wizard from './components/Wizard';
import Results from './components/Results';
import Library from './components/Library';
import Landing from './components/Landing';

const initialChoices: UserChoice = {
  goal: null,
  moods: [],
  intent: 'cinematic',
  category: '',
  details: {},
  sliders: {
    complexity: 50,
    sharpness: 50,
    energy: 50,
    style: 50,
    boldness: 50
  }
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.LANDING);
  const [lang, setLang] = useState<Language>('en');
  const [choices, setChoices] = useState<UserChoice>(initialChoices);
  const [currentResult, setCurrentResult] = useState<GeneratedPrompt | null>(null);
  const [library, setLibrary] = useState<GeneratedPrompt[]>([]);

  const t = translations[lang];

  useEffect(() => {
    setLibrary(getLibrary());
    const savedLang = localStorage.getItem('vibecraft_lang') as Language;
    if (savedLang) setLang(savedLang);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('vibecraft_lang', lang);
  }, [lang]);

  const handleStart = () => {
    setChoices(initialChoices);
    setState(AppState.WIZARD);
  };

  const handleGenerate = (finalChoices: UserChoice) => {
    const result = generatePrompts(finalChoices);
    setCurrentResult(result);
    savePrompt(result);
    setLibrary(getLibrary());
    setState(AppState.RESULTS);
  };

  const handleReset = () => {
    setState(AppState.LANDING);
  };

  const handleDelete = (id: string) => {
    deletePrompt(id);
    setLibrary(getLibrary());
  };

  return (
    <div className="min-h-screen flex flex-col transition-all duration-300">
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-4 flex flex-wrap justify-between items-center gap-4">
        <div 
          className="text-xl md:text-2xl font-serif font-bold tracking-tight cursor-pointer"
          onClick={handleReset}
        >
          VibeCraft
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center border border-gray-100 rounded-full px-2 py-1 bg-white shadow-sm">
            {(['en', 'tr', 'ar'] as Language[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full transition-all ${lang === l ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
              >
                {l}
              </button>
            ))}
          </div>

          <nav className="flex space-x-4 md:space-x-8 rtl:space-x-reverse text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-widest">
            <button 
              onClick={() => setState(AppState.LIBRARY)}
              className={`hover:text-black transition-colors ${state === AppState.LIBRARY ? 'text-black underline underline-offset-8' : ''}`}
            >
              {t.library}
            </button>
            <button 
              onClick={handleStart}
              className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all"
            >
              {t.create}
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-32 pb-12 px-4 md:px-6 max-w-6xl mx-auto w-full">
        {state === AppState.LANDING && <Landing onStart={handleStart} lang={lang} />}
        {state === AppState.WIZARD && (
          <Wizard 
            choices={choices} 
            setChoices={setChoices} 
            onGenerate={handleGenerate} 
            lang={lang}
          />
        )}
        {state === AppState.RESULTS && currentResult && (
          <Results 
            result={currentResult} 
            onNew={handleStart}
            lang={lang}
          />
        )}
        {state === AppState.LIBRARY && (
          <Library 
            library={library} 
            onDelete={handleDelete}
            lang={lang}
            onSelect={(p) => {
              setCurrentResult(p);
              setState(AppState.RESULTS);
            }}
          />
        )}
      </main>

      <footer className="py-8 border-t border-gray-100 text-center text-[10px] text-gray-400 uppercase tracking-[0.2em] flex flex-col items-center gap-2">
        <div className="flex items-center gap-1">
          <span>&copy; {new Date().getFullYear()} VibeCraft Architect.</span>
          <span className="text-black font-black">{t.by}</span>
        </div>
        <div className="opacity-50">Deterministic Engine v1.2</div>
      </footer>
    </div>
  );
};

export default App;
