
import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../translations';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Layers } from 'lucide-react';

interface Props {
  onStart: () => void;
  lang: Language;
}

const Landing: React.FC<Props> = ({ onStart, lang }) => {
  const t = translations[lang];

  return (
    <div className="flex flex-col items-center justify-center text-center py-12 md:py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 border border-black/5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-12 bg-white shadow-sm"
      >
        <Sparkles className="w-3 h-3 text-emerald-500" />
        {t.engine_ver}
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-6xl lg:text-[90px] font-serif font-bold mb-8 max-w-5xl leading-[1] md:leading-[0.9] tracking-tighter"
      >
        {t.landing_heading} <span className="italic font-normal text-black/20 underline decoration-1 underline-offset-[10px] decoration-black/10">{t.landing_invisible}</span>.
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-base md:text-lg lg:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed font-light"
      >
        {t.landing_sub}
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center gap-6"
      >
        <button 
          onClick={onStart}
          className="group relative px-10 md:px-16 py-5 md:py-6 bg-black text-white rounded-full font-black overflow-hidden transition-all hover:pr-20 rtl:hover:pr-10 rtl:hover:pl-20 shadow-xl shadow-black/20 active:scale-95"
        >
          <span className="relative z-10 uppercase tracking-[0.3em] text-[11px] md:text-xs">{t.initialize}</span>
          <span className="absolute right-6 rtl:right-auto rtl:left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 rtl:translate-x-0 rtl:-translate-x-4 group-hover:rtl:translate-x-0">
            <ArrowRight className="w-4 h-4" />
          </span>
        </button>
        <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">
          <ShieldCheck className="w-3 h-3" />
          {t.free_use}
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-4 gap-px bg-black/5 border border-black/5 rounded-[32px] overflow-hidden w-full max-w-5xl shadow-sm"
      >
        {[
          { id: '01', title: t.video_direction, detail: t.cinematic_flow, icon: Zap },
          { id: '02', title: t.visual_arts, detail: t.technical_optics, icon: Layers },
          { id: '03', title: t.game_systems, detail: t.concept_loops, icon: Sparkles },
          { id: '04', title: t.tool_design, detail: t.app_ux_logic, icon: ShieldCheck }
        ].map(item => (
          <div key={item.id} className="p-8 md:p-10 bg-white hover:bg-gray-50 transition-colors text-left rtl:text-right group">
            <div className="flex justify-between items-start mb-6">
              <div className="font-mono text-[9px] text-black/20">[{item.id}]</div>
              <item.icon className="w-3.5 h-3.5 text-black/10 group-hover:text-black transition-colors" />
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-black mb-2">{item.title}</div>
            <div className="text-xs text-gray-400 font-serif italic">{item.detail}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Landing;
