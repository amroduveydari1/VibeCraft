
import React, { useState } from 'react';
import { GeneratedPrompt, Language } from '../types';
import { translations } from '../translations';

interface Props {
  result: GeneratedPrompt;
  onNew: () => void;
  lang: Language;
}

const Results: React.FC<Props> = ({ result, onNew, lang }) => {
  const [activeTab, setActiveTab] = useState<'v1' | 'v2' | 'v3'>('v1');
  const [copied, setCopied] = useState(false);
  const t = translations[lang];

  const handleCopy = () => {
    navigator.clipboard.writeText(result[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fade-in max-w-5xl mx-auto py-8 md:py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-16 gap-6">
        <div>
          <div className="font-mono text-[9px] md:text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-3">
            {t.blueprint_ref} // {result.id}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold italic leading-tight">Prompt Blueprint</h2>
        </div>
        <button 
          onClick={onNew}
          className="w-full md:w-auto px-8 py-3 bg-white border border-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm"
        >
          {t.reset}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        <div className="lg:col-span-8 space-y-6 md:space-y-8">
          <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-2xl w-fit">
            {(['v1', 'v2', 'v3'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 md:px-6 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab === 'v1' ? 'Protocol Primary' : tab === 'v2' ? 'Variation A' : 'Experimental'}
              </button>
            ))}
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-black/5 rounded-[30px] md:rounded-[40px] blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-8 md:p-12 bg-white border border-black/5 rounded-[30px] md:rounded-[40px] shadow-sm min-h-[300px] md:min-h-[350px] flex items-center justify-center text-center">
              <p className="text-2xl md:text-3xl font-serif leading-snug italic text-gray-800 px-2 md:px-4">
                "{result[activeTab]}"
              </p>
              <button 
                onClick={handleCopy}
                className={`absolute bottom-6 md:bottom-8 right-6 md:right-8 rtl:right-auto rtl:left-6 md:rtl:left-8 px-5 md:px-6 py-2 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
                  copied ? 'bg-green-500 text-white' : 'bg-black text-white hover:scale-110'
                }`}
              >
                {copied ? t.copied : t.copy}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 md:p-8 bg-black text-white rounded-[30px] md:rounded-[40px] shadow-2xl">
            <h3 className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-gray-500 mb-6 md:mb-8">{t.metadata}</h3>
            <div className="space-y-6">
              <div>
                <div className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.negative}</div>
                <div className="text-[11px] md:text-xs font-mono opacity-80 leading-relaxed italic">"{result.extras.negativePrompt}"</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.aspect}</div>
                  <div className="text-xs md:text-sm font-bold font-mono">{result.extras.aspectRatio}</div>
                </div>
                <div>
                  <div className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.engine_v}</div>
                  <div className="text-xs md:text-sm font-bold font-mono">v1.2</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 border border-black/5 bg-white rounded-[30px] md:rounded-[40px]">
            <h3 className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-6">{t.mood_geom}</h3>
            <div className="flex flex-wrap gap-2">
              {result.choices.moods.map(m => (
                <span key={m} className="px-3 py-1 bg-gray-50 border border-black/5 text-[8px] md:text-[9px] uppercase font-black rounded-full text-gray-500">
                  {m}
                </span>
              ))}
              <span className="px-3 py-1 bg-gray-100 text-black text-[8px] md:text-[9px] uppercase font-black rounded-full">
                {result.choices.intent}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
