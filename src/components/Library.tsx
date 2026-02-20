
import React from 'react';
import { motion } from 'framer-motion';
import { GeneratedPrompt, Language } from '../types';
import { translations } from '../translations';
import { Trash2, ArrowUpRight, Clock, Box } from 'lucide-react';

interface Props {
  library: GeneratedPrompt[];
  onDelete: (id: string) => void;
  onSelect: (p: GeneratedPrompt) => void;
  lang: Language;
}

const Library: React.FC<Props> = ({ library, onDelete, onSelect, lang }) => {
  const t = translations[lang];

  return (
    <div className="py-8 md:py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div>
          <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter mb-3">{t.vault}</h2>
          <p className="text-gray-400 uppercase tracking-[0.4em] text-[9px] md:text-[10px] font-black">{t.vault_sub}</p>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-300">
          <Box className="w-4 h-4" />
          <span>{library.length} {t.vault_sub}</span>
        </div>
      </div>

      {library.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-32 md:py-48 bg-gray-50 rounded-[50px] border border-dashed border-gray-200"
        >
          <p className="text-gray-400 font-serif italic text-2xl md:text-3xl">{t.vault_empty}</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {library.map((p, index) => (
            <motion.div 
              key={p.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative p-8 md:p-10 bg-white border border-black/5 rounded-[40px] hover:border-black/10 hover:shadow-2xl hover:shadow-black/5 transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
              onClick={() => onSelect(p)}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-black/[0.02] rounded-bl-[80px] -mr-8 -mt-8 group-hover:scale-110 transition-transform" />
              
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest px-3.5 py-1.5 bg-black text-white rounded-full">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full" />
                    {p.choices.goal}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(p.id);
                    }}
                    className="p-1.5 text-gray-200 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-lg md:text-xl font-serif italic leading-snug line-clamp-4 mb-10 rtl:text-right text-gray-800">
                  "{p.v1}"
                </p>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-black/5">
                <div className="flex items-center gap-2 text-[9px] text-gray-400 font-black uppercase tracking-tighter">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(p.timestamp).toLocaleDateString(lang)}</span>
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-3 transition-all text-black">
                  {t.view_arch}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
