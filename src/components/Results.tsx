
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GeneratedPrompt, Language } from '../types';
import { translations } from '../translations';
import { Copy, Check, RotateCcw, Box, Cpu, Maximize2, Layers, Info } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto py-8 md:py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3 font-mono text-[9px] text-emerald-500 uppercase tracking-[0.4em]">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            {t.blueprint_ref} // {result.id}
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold italic tracking-tighter leading-none">Architectural Output</h2>
        </div>
        <button 
          onClick={onNew}
          className="flex items-center gap-2.5 px-6 py-3.5 bg-white border border-black rounded-full text-[9px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-sm group"
        >
          <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
          {t.reset}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <div className="flex flex-wrap gap-2 bg-black/5 p-1.5 rounded-2xl w-fit">
            {(['v1', 'v2', 'v3'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  activeTab === tab ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab === 'v1' ? t.protocol_primary : tab === 'v2' ? t.variation_a : t.experimental}
              </button>
            ))}
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative p-10 md:p-16 bg-white border border-black/5 rounded-[32px] shadow-sm min-h-[350px] flex items-center justify-center text-center overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none blueprint-grid" />
              <motion.p 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xl md:text-3xl font-serif leading-tight italic text-gray-800 px-4 relative z-10"
              >
                "{result[activeTab]}"
              </motion.p>
              
              <button 
                onClick={handleCopy}
                className={`absolute bottom-8 right-8 rtl:right-auto rtl:left-8 flex items-center gap-2.5 px-6 py-3.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all ${
                  copied ? 'bg-emerald-500 text-white' : 'bg-black text-white hover:scale-110 shadow-2xl shadow-black/20'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? t.copied : t.copy}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="p-10 bg-black text-white rounded-[40px] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Cpu className="w-20 h-20" />
            </div>
            <h3 className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.4em] text-gray-500 mb-10">
              <Info className="w-3 h-3" />
              {t.metadata}
            </h3>
            <div className="space-y-8 relative z-10">
              <div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">{t.negative}</div>
                <div className="text-xs font-mono opacity-70 leading-relaxed italic bg-white/5 p-4 rounded-2xl border border-white/5">
                  "{result.extras.negativePrompt}"
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                    <Maximize2 className="w-3 h-3" />
                    {t.aspect}
                  </div>
                  <div className="text-sm font-black font-mono">{result.extras.aspectRatio}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                    <Layers className="w-3 h-3" />
                    {t.engine_v}
                  </div>
                  <div className="text-sm font-black font-mono">v1.2.4</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 border border-black/5 bg-white rounded-[40px] shadow-sm">
            <h3 className="font-mono text-[9px] uppercase tracking-[0.4em] text-gray-400 mb-8">{t.mood_geom}</h3>
            <div className="flex flex-wrap gap-3">
              {result.choices.moods.map(m => (
                <span key={m} className="px-4 py-2 bg-gray-50 border border-black/5 text-[9px] uppercase font-black rounded-xl text-gray-500">
                  {m}
                </span>
              ))}
              <span className="px-4 py-2 bg-black text-white text-[9px] uppercase font-black rounded-xl">
                {result.choices.intent}
              </span>
            </div>
          </div>

          <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-[40px] flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600">{t.status}</div>
              <div className="text-xs font-bold text-emerald-900">{t.protocol_validated}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
