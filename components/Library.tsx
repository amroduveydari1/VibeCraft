
import React from 'react';
import { GeneratedPrompt, Language } from '../types';
import { translations } from '../translations';

interface Props {
  library: GeneratedPrompt[];
  onDelete: (id: string) => void;
  onSelect: (p: GeneratedPrompt) => void;
  lang: Language;
}

const Library: React.FC<Props> = ({ library, onDelete, onSelect, lang }) => {
  const t = translations[lang];

  return (
    <div className="fade-in py-8 md:py-10 px-4">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">{t.vault}</h2>
        <p className="text-gray-400 uppercase tracking-widest text-[10px] md:text-xs font-bold">{t.vault_sub}</p>
      </div>

      {library.length === 0 ? (
        <div className="text-center py-16 md:py-24 bg-gray-50 rounded-[30px] md:rounded-[40px] border border-dashed border-gray-200">
          <p className="text-gray-400 font-serif italic text-lg md:text-xl">{t.vault_empty}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {library.map(p => (
            <div 
              key={p.id} 
              className="group p-6 md:p-8 bg-white border border-black/5 rounded-[30px] md:rounded-[40px] hover:border-black/20 hover:shadow-2xl hover:shadow-black/5 transition-all cursor-pointer flex flex-col justify-between"
              onClick={() => onSelect(p)}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-gray-50 rounded-full border border-black/5">
                    {p.choices.goal}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(p.id);
                    }}
                    className="text-gray-300 hover:text-red-500 transition-colors text-xl leading-none"
                  >
                    &times;
                  </button>
                </div>
                <p className="text-base md:text-lg font-serif italic line-clamp-3 mb-8 rtl:text-right">
                  "{p.v1}"
                </p>
              </div>
              <div className="flex justify-between items-center text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                <span>{new Date(p.timestamp).toLocaleDateString(lang)}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest flex items-center gap-1 rtl:flex-row-reverse">
                  {t.view_arch} {lang === 'ar' ? '←' : '→'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
