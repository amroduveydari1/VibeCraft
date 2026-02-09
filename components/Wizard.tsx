
import React, { useState, useMemo } from 'react';
import { UserChoice, GoalType, Question, Language } from '../types';
import { MOODS, INTENTS, GOAL_CATEGORIES } from '../constants';
import { getDynamicQuestions } from '../services/QuestionRouter';
import { translations } from '../translations';

interface Props {
  choices: UserChoice;
  setChoices: React.Dispatch<React.SetStateAction<UserChoice>>;
  onGenerate: (choices: UserChoice) => void;
  lang: Language;
}

const Wizard: React.FC<Props> = ({ choices, setChoices, onGenerate, lang }) => {
  const [step, setStep] = useState(0);
  const dynamicQuestions = useMemo(() => getDynamicQuestions(choices), [choices]);
  const totalSteps = 6;
  const t = translations[lang];

  const handleGoalSelect = (goal: GoalType) => {
    setChoices(prev => ({ ...prev, goal, category: '' }));
    setStep(1);
  };

  const toggleMood = (mood: string) => {
    setChoices(prev => {
      const moods = prev.moods.includes(mood) 
        ? prev.moods.filter(m => m !== mood)
        : prev.moods.length < 4 ? [...prev.moods, mood] : prev.moods;
      return { ...prev, moods };
    });
  };

  const next = () => setStep(s => Math.min(s + 1, totalSteps - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  return (
    <div className="max-w-3xl mx-auto py-6 md:py-12 fade-in px-4">
      <div className="flex gap-1 md:gap-2 mb-12 md:mb-16">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div 
            key={i} 
            className={`h-1 flex-1 rounded-full transition-all duration-700 ${i <= step ? 'bg-black' : 'bg-gray-100'}`}
          />
        ))}
      </div>

      <div className="min-h-[400px]">
        {step === 0 && (
          <div className="fade-in">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2 tracking-tight">{t.select_domain}</h2>
            <p className="text-gray-400 mb-8 md:mb-10 text-[10px] md:text-xs uppercase tracking-widest font-bold">{t.foundation}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(['video', 'image', 'game', 'tool'] as GoalType[]).map(g => (
                <button
                  key={g}
                  onClick={() => handleGoalSelect(g)}
                  className="p-8 md:p-10 border border-black/5 bg-white rounded-3xl text-left rtl:text-right hover:border-black hover:shadow-2xl hover:shadow-black/5 transition-all group relative overflow-hidden"
                >
                  <div className="font-mono text-[9px] md:text-[10px] text-gray-300 mb-4 tracking-tighter uppercase">Protocol::{g}</div>
                  <div className="text-xl md:text-2xl font-serif italic mb-1 capitalize">{g} Prompt</div>
                  <div className="text-xs text-gray-400 font-medium">Architectural blueprint for {g} AI.</div>
                  <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {lang === 'ar' ? '←' : '→'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="fade-in">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2 tracking-tight">{t.define_atmosphere}</h2>
            <p className="text-gray-400 mb-8 md:mb-10 text-[10px] md:text-xs uppercase tracking-widest font-bold">{t.choose_vibes}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MOODS.map(m => (
                <button
                  key={m.value}
                  onClick={() => toggleMood(m.value)}
                  className={`p-5 md:p-6 border rounded-2xl text-left rtl:text-right transition-all relative ${
                    choices.moods.includes(m.value) ? 'bg-black border-black text-white shadow-xl' : 'bg-white border-black/5 hover:border-black/20'
                  }`}
                >
                  <div className="font-bold text-base md:text-lg mb-1">{m.label}</div>
                  <div className={`text-[11px] md:text-xs ${choices.moods.includes(m.value) ? 'text-gray-400' : 'text-gray-500'}`}>{m.description}</div>
                  {choices.moods.includes(m.value) && (
                    <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-[8px] md:text-[10px] font-mono">SELECTED</div>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-10 md:mt-12 flex justify-between items-center">
              <button onClick={prev} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black">{t.return_btn}</button>
              <button 
                onClick={next}
                disabled={choices.moods.length < 2}
                className={`px-8 md:px-12 py-3 md:py-4 rounded-full font-bold uppercase text-[10px] md:text-xs tracking-widest transition-all ${
                  choices.moods.length < 2 ? 'bg-gray-50 text-gray-300' : 'bg-black text-white hover:scale-105'
                }`}
              >
                {t.continue_btn}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="fade-in">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-10 tracking-tight">{t.commercial_concept}</h2>
            <div className="space-y-4">
              {INTENTS.map(i => (
                <button
                  key={i.value}
                  onClick={() => {
                    setChoices(prev => ({ ...prev, intent: i.value }));
                    next();
                  }}
                  className={`w-full p-6 md:p-8 border rounded-3xl text-left rtl:text-right flex justify-between items-center transition-all ${
                    choices.intent === i.value ? 'bg-black border-black text-white shadow-xl' : 'bg-white border-black/5 hover:border-black/20'
                  }`}
                >
                  <div>
                    <div className="font-bold text-lg md:text-xl mb-1">{i.label}</div>
                    <div className={`text-xs md:text-sm ${choices.intent === i.value ? 'text-gray-400' : 'text-gray-500'}`}>{i.description}</div>
                  </div>
                  <div className="text-xl rtl:rotate-180">→</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && choices.goal && (
          <div className="fade-in">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-10 tracking-tight">{t.select_blueprint}</h2>
            <div className="grid grid-cols-1 gap-3">
              {GOAL_CATEGORIES[choices.goal].map(cat => (
                <button
                  key={cat.value}
                  onClick={() => {
                    setChoices(prev => ({ ...prev, category: cat.value }));
                    next();
                  }}
                  className={`p-5 md:p-6 border rounded-2xl text-left rtl:text-right transition-all flex items-center gap-4 md:gap-6 ${
                    choices.category === cat.value ? 'bg-black border-black text-white shadow-xl' : 'bg-white border-black/5 hover:border-black/20'
                  }`}
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full border border-black/10 flex items-center justify-center font-mono text-[10px]">
                    {cat.value.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="font-bold text-base md:text-lg">{cat.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="fade-in">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-10 tracking-tight">{t.drafting_details}</h2>
            <div className="space-y-12">
              {dynamicQuestions.map(q => (
                <div key={q.id}>
                  <label className="block text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">{q.label}</label>
                  {q.type === 'single' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options?.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => setChoices(prev => ({ ...prev, details: { ...prev.details, [q.id]: opt.value } }))}
                          className={`p-4 md:p-5 border rounded-2xl text-left rtl:text-right transition-all ${
                            choices.details[q.id] === opt.value ? 'bg-black border-black text-white shadow-lg' : 'bg-white border-black/5'
                          }`}
                        >
                          <div className="font-bold text-sm md:text-base">{opt.label}</div>
                          <div className={`text-[11px] md:text-xs ${choices.details[q.id] === opt.value ? 'text-gray-400' : 'text-gray-500'}`}>{opt.description}</div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      value={choices.details[q.id] || ''}
                      onChange={(e) => setChoices(prev => ({ ...prev, details: { ...prev.details, [q.id]: e.target.value } }))}
                      placeholder={t.details_placeholder}
                      className="w-full p-5 md:p-6 border border-black/5 rounded-3xl bg-white focus:ring-2 focus:ring-black/5 focus:border-black outline-none h-40 text-base md:text-lg font-serif italic rtl:text-right"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-12 md:mt-16 flex justify-between items-center">
              <button onClick={prev} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black">{t.return_btn}</button>
              <button onClick={next} className="px-8 md:px-12 py-3 md:py-4 bg-black text-white rounded-full font-bold uppercase text-[10px] md:text-xs tracking-widest shadow-xl hover:scale-105 transition-all">
                {t.structural_validation}
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="fade-in">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-10 tracking-tight">{t.output_balancing}</h2>
            <div className="space-y-12 md:space-y-14 bg-white p-6 md:p-10 border border-black/5 rounded-[30px] md:rounded-[40px] shadow-sm">
              {[
                { id: 'complexity', labels: ['Minimal', 'Rich'] },
                { id: 'sharpness', labels: ['Atmospheric', 'Sharp'] },
                { id: 'energy', labels: ['Static', 'Dynamic'] },
                { id: 'style', labels: ['Classic', 'Avant-Garde'] },
                { id: 'boldness', labels: ['Safe', 'Bold'] }
              ].map(slider => (
                <div key={slider.id}>
                  <div className="flex justify-between text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5 px-1">
                    <span>{slider.labels[0]}</span>
                    <span>{slider.labels[1]}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={choices.sliders[slider.id as keyof UserChoice['sliders']]}
                    onChange={(e) => setChoices(prev => ({
                      ...prev,
                      sliders: { ...prev.sliders, [slider.id as keyof UserChoice['sliders']]: parseInt(e.target.value) }
                    }))}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
            <div className="mt-12 md:mt-16 flex justify-between items-center">
              <button onClick={prev} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black">{t.return_btn}</button>
              <button 
                onClick={() => onGenerate(choices)}
                className="px-10 md:px-16 py-4 md:py-6 bg-black text-white rounded-full font-black uppercase text-xs md:text-sm tracking-[0.2em] hover:scale-105 transition-all shadow-2xl shadow-black/20"
              >
                {t.execute_build}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wizard;
