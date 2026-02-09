
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface Props {
  onStart: () => void;
  lang: Language;
}

const Landing: React.FC<Props> = ({ onStart, lang }) => {
  const t = translations[lang];

  return (
    <div className="flex flex-col items-center justify-center text-center py-12 md:py-24 fade-in px-4">
      <div className="inline-block px-3 py-1 border border-black/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8 bg-white shadow-sm">
        {t.engine_ver}
      </div>
      <h1 className="text-5xl md:text-7xl lg:text-[110px] font-serif font-bold mb-8 max-w-5xl leading-[1.1] md:leading-[0.9] tracking-tighter">
        {t.landing_heading} <span className="italic font-normal text-black/40 underline decoration-1 underline-offset-8">{t.landing_invisible}</span>.
      </h1>
      <p className="text-base md:text-lg lg:text-xl text-gray-400 mb-14 max-w-2xl leading-relaxed font-light">
        {t.landing_sub}
      </p>
      
      <div className="flex flex-col items-center gap-6">
        <button 
          onClick={onStart}
          className="group relative px-10 md:px-16 py-5 md:py-6 bg-black text-white text-base md:text-lg rounded-full font-medium overflow-hidden transition-all hover:pr-20 rtl:hover:pr-10 rtl:hover:pl-20"
        >
          <span className="relative z-10 uppercase tracking-widest text-xs md:text-sm">{t.initialize}</span>
          <span className="absolute right-6 rtl:right-auto rtl:left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 rtl:translate-x-0 rtl:-translate-x-4 group-hover:rtl:translate-x-0">
            {lang === 'ar' ? '←' : '→'}
          </span>
        </button>
        <div className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          {t.free_use}
        </div>
      </div>
      
      <div className="mt-24 md:mt-40 grid grid-cols-2 md:grid-cols-4 gap-0 border border-black/5 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-sm w-full max-w-4xl">
        {[
          { id: '01', title: 'Video Direction', detail: 'Cinematic Flow' },
          { id: '02', title: 'Visual Arts', detail: 'Technical Optics' },
          { id: '03', title: 'Game Systems', detail: 'Concept Loops' },
          { id: '04', title: 'Tool Design', detail: 'App UX Logic' }
        ].map(item => (
          <div key={item.id} className="p-6 md:p-10 border-r border-b md:border-b-0 last:border-r-0 border-black/5 text-left rtl:text-right hover:bg-white transition-colors">
            <div className="font-mono text-[9px] md:text-[10px] mb-4 text-black/30">[{item.id}]</div>
            <div className="text-[10px] md:text-xs uppercase tracking-widest font-black mb-2">{item.title}</div>
            <div className="text-xs md:text-sm text-gray-400 font-serif italic">{item.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
