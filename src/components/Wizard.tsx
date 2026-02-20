
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserChoice, GoalType, Question, Language } from '../types';
import { MOODS, INTENTS, GOAL_CATEGORIES } from '../constants';
import { getDynamicQuestions } from '../../services/QuestionRouter';
import { translations } from '../translations';
import { ArrowRight, ArrowLeft, Check, Play, Image as ImageIcon, Gamepad2, Wrench } from 'lucide-react';

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

  const goalIcons = {
    video: Play,
    image: ImageIcon,
    game: Gamepad2,
    tool: Wrench
  };

  return (
    <div className="max-w-4xl mx-auto py-6 md:py-12 px-4">
      <div className="flex gap-2 md:gap-3 mb-16 md:mb-24">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${i <= step ? 'bg-black' : 'bg-black/5'}`}
          />
        ))}
      </div>

      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 tracking-tight">{t.select_domain}</h2>
                <p className="text-gray-400 mb-10 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black">{t.foundation}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(['video', 'image', 'game', 'tool'] as GoalType[]).map(g => {
                    const Icon = goalIcons[g];
                    return (
                      <button
                        key={g}
                        onClick={() => handleGoalSelect(g)}
                        className="p-8 md:p-10 border border-black/5 bg-white rounded-[32px] text-left rtl:text-right hover:border-black hover:shadow-xl hover:shadow-black/5 transition-all group relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="font-mono text-[9px] text-black/20 tracking-tighter uppercase">Protocol::{g}</div>
                        </div>
                        <div className="text-xl md:text-2xl font-serif italic mb-2 capitalize">{(t as any)[g] || g} {t.create}</div>
                        <div className="text-xs text-gray-400 font-medium leading-relaxed">{t.blueprint_desc.replace('{goal}', (t as any)[g] || g)}</div>
                        <div className="absolute bottom-6 right-8 rtl:right-auto rtl:left-8 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 tracking-tight">{t.define_atmosphere}</h2>
                <p className="text-gray-400 mb-10 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black">{t.choose_vibes}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {MOODS.map(m => (
                    <button
                      key={m.value}
                      onClick={() => toggleMood(m.value)}
                      className={`p-5 md:p-6 border rounded-[24px] text-left rtl:text-right transition-all relative group ${
                        choices.moods.includes(m.value) ? 'bg-black border-black text-white shadow-xl shadow-black/20' : 'bg-white border-black/5 hover:border-black/20'
                      }`}
                    >
                      <div className="font-bold text-base md:text-lg mb-1">{(t as any)[m.value] || m.label}</div>
                      <div className={`text-[11px] leading-relaxed ${choices.moods.includes(m.value) ? 'text-gray-400' : 'text-gray-500'}`}>{(t as any)[`${m.value}_desc`] || m.description}</div>
                      {choices.moods.includes(m.value) && (
                        <div className="absolute top-5 right-7 rtl:right-auto rtl:left-7">
                          <Check className="w-4 h-4 text-emerald-400" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-12 flex justify-between items-center">
                  <button onClick={prev} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    {t.return_btn}
                  </button>
                  <button 
                    onClick={next}
                    disabled={choices.moods.length < 2}
                    className={`px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all ${
                      choices.moods.length < 2 ? 'bg-gray-50 text-gray-300 cursor-not-allowed' : 'bg-black text-white hover:scale-105 shadow-xl shadow-black/10'
                    }`}
                  >
                    {t.continue_btn}
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-10 tracking-tight">{t.commercial_concept}</h2>
                <div className="space-y-3">
                  {INTENTS.map(i => (
                    <button
                      key={i.value}
                      onClick={() => {
                        setChoices(prev => ({ ...prev, intent: i.value }));
                        next();
                      }}
                      className={`w-full p-6 md:p-8 border rounded-[32px] text-left rtl:text-right flex justify-between items-center transition-all group ${
                        choices.intent === i.value ? 'bg-black border-black text-white shadow-xl shadow-black/20' : 'bg-white border-black/5 hover:border-black/20'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-lg md:text-xl mb-1">{(t as any)[i.value] || i.label}</div>
                        <div className={`text-xs md:text-sm ${choices.intent === i.value ? 'text-gray-400' : 'text-gray-500'}`}>{(t as any)[`${i.value}_desc`] || i.description}</div>
                      </div>
                      <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-2 ${choices.intent === i.value ? 'text-white' : 'text-black/20'}`} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && choices.goal && (
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-10 tracking-tight">{t.select_blueprint}</h2>
                <div className="grid grid-cols-1 gap-3">
                  {GOAL_CATEGORIES[choices.goal].map(cat => (
                    <button
                      key={cat.value}
                      onClick={() => {
                        setChoices(prev => ({ ...prev, category: cat.value }));
                        next();
                      }}
                      className={`p-5 md:p-6 border rounded-[24px] text-left rtl:text-right transition-all flex items-center gap-6 group ${
                        choices.category === cat.value ? 'bg-black border-black text-white shadow-xl shadow-black/20' : 'bg-white border-black/5 hover:border-black/20'
                      }`}
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl border border-black/5 bg-gray-50 flex items-center justify-center font-mono text-[10px] font-black group-hover:bg-black group-hover:text-white group-hover:border-white/10 transition-colors">
                        {cat.value.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="font-bold text-lg md:text-xl">{(t as any)[cat.value] || cat.label}</div>
                      <ArrowRight className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12 tracking-tight">{t.drafting_details}</h2>
                <div className="space-y-16">
                  {dynamicQuestions.map(q => (
                    <div key={q.id}>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">{(t as any)[q.id] || q.label}</label>
                      {q.type === 'single' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {q.options?.map(opt => (
                            <button
                              key={opt.value}
                              onClick={() => setChoices(prev => ({ ...prev, details: { ...prev.details, [q.id]: opt.value } }))}
                              className={`p-6 md:p-8 border rounded-[32px] text-left rtl:text-right transition-all ${
                                choices.details[q.id] === opt.value ? 'bg-black border-black text-white shadow-xl' : 'bg-white border-black/5 hover:border-black/20'
                              }`}
                            >
                              <div className="font-bold text-base md:text-lg mb-1">{(t as any)[opt.value] || opt.label}</div>
                              <div className={`text-xs md:text-sm ${choices.details[q.id] === opt.value ? 'text-gray-400' : 'text-gray-500'}`}>{(t as any)[`${opt.value}_desc`] || opt.description}</div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <textarea
                          value={choices.details[q.id] || ''}
                          onChange={(e) => setChoices(prev => ({ ...prev, details: { ...prev.details, [q.id]: e.target.value } }))}
                          placeholder={t.details_placeholder}
                          className="w-full p-8 md:p-10 border border-black/5 rounded-[40px] bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none h-56 text-xl md:text-2xl font-serif italic rtl:text-right transition-all"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-20 flex justify-between items-center">
                  <button onClick={prev} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    {t.return_btn}
                  </button>
                  <button onClick={next} className="px-12 py-5 bg-black text-white rounded-full font-black uppercase text-[10px] md:text-xs tracking-[0.2em] shadow-2xl shadow-black/20 hover:scale-105 transition-all">
                    {t.structural_validation}
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12 tracking-tight">{t.output_balancing}</h2>
                <div className="space-y-16 md:space-y-20 bg-white p-10 md:p-16 border border-black/5 rounded-[50px] shadow-sm">
                  {[
                    { id: 'complexity', labels: [t.minimal, t.rich], key: t.complexity },
                    { id: 'sharpness', labels: [t.atmospheric, t.sharp], key: t.sharpness },
                    { id: 'energy', labels: [t.static, t.dynamic], key: t.energy },
                    { id: 'style', labels: [t.classic, t.avant_garde], key: t.style },
                    { id: 'boldness', labels: [t.safe, t.bold], key: t.boldness }
                  ].map(slider => (
                    <div key={slider.id}>
                      <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6 px-1">
                        <span>{slider.labels[0]}</span>
                        <span className="text-black">{slider.key}</span>
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
                <div className="mt-20 flex justify-between items-center">
                  <button onClick={prev} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    {t.return_btn}
                  </button>
                  <button 
                    onClick={() => onGenerate(choices)}
                    className="px-12 md:px-20 py-6 md:py-8 bg-black text-white rounded-full font-black uppercase text-xs md:text-sm tracking-[0.3em] hover:scale-105 transition-all shadow-2xl shadow-black/30"
                  >
                    {t.execute_build}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wizard;
