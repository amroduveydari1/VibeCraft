
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppState, UserChoice, GeneratedPrompt, GoalType, Language } from './types';
// ...removed duplicate imports...
import { generatePrompts } from '../services/PromptGenerator';
import { savePrompt, getLibrary, deletePrompt } from '../services/Storage';
import { translations } from './translations';
import Wizard from './components/Wizard';
import Results from './components/Results';
import Library from './components/Library';
import Landing from './components/Landing';
import { LayoutGrid, Plus, History, Globe } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col selection:bg-black selection:text-white">
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-black/5 px-4 md:px-10 py-4 flex justify-between items-center">
        <div 
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={handleReset}
        >
          <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center text-white font-black text-base group-hover:rotate-12 transition-transform">V</div>
          <span className="text-lg font-serif font-bold tracking-tight">VibeCraft</span>
        </div>
        
        <div className="flex items-center gap-6 md:gap-10">
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-gray-50 rounded-full border border-black/5">
            <Globe className="w-2.5 h-2.5 text-gray-400" />
            {(['en', 'tr', 'ar'] as Language[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-full transition-all ${lang === l ? 'bg-black text-white shadow-md shadow-black/20' : 'text-gray-400 hover:text-black'}`}
              >
                {l}
              </button>
            ))}
          </div>

          <nav className="flex items-center gap-4 md:gap-6 rtl:flex-row-reverse">
            <button 
              onClick={() => setState(AppState.LIBRARY)}
              className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] transition-colors ${state === AppState.LIBRARY ? 'text-black' : 'text-gray-400 hover:text-black'}`}
            >
              <History className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.library}</span>
            </button>
            <button 
              onClick={handleStart}
              className="flex items-center gap-2 px-5 py-2 bg-black text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 hover:scale-105 transition-all shadow-lg shadow-black/10"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.create}</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-16 px-4 md:px-8 max-w-6xl mx-auto w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={state}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
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
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="py-10 border-t border-black/5 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">
              <span>&copy; {new Date().getFullYear()} VibeCraft Architect</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="text-black">{t.by}</span>
            </div>
            <div className="text-[8px] text-gray-300 uppercase tracking-[0.4em]">Deterministic Engine v1.2.4</div>
          </div>
          
          <div className="flex gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
            <a href="#" className="hover:text-black transition-colors">{t.documentation}</a>
            <a href="#" className="hover:text-black transition-colors">{t.api_access}</a>
            <a href="#" className="hover:text-black transition-colors">{t.privacy}</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
