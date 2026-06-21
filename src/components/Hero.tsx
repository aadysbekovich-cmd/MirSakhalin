import { SupportedLanguage } from '../types';
import { translations } from '../translations';
import { HelpCircle, Calculator, BadgeAlert, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  currentLang: SupportedLanguage;
  onStartCalc: () => void;
  onOpenChat: () => void;
}

export default function Hero({ currentLang, onStartCalc, onOpenChat }: HeroProps) {
  const t = translations[currentLang];

  return (
    <section id="hero" className="relative py-12 md:py-20 bg-linear-to-b from-emerald-50/40 via-slate-50 to-slate-100/50 overflow-hidden">
      {/* Visual ambient backgrounds */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-60 h-60 bg-yellow-100/30 rounded-full blur-2xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Text grid left block */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-100 shadow-xs">
              <Sparkles size={12} className="animate-pulse" />
              <span>{t.motto}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-none md:leading-tight">
              {t.hero_title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-sans max-w-2xl mx-auto lg:mx-0">
              {t.hero_desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button
                onClick={onStartCalc}
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 hover:scale-[1.01] transition-all cursor-pointer text-sm sm:text-base"
              >
                <Calculator size={18} />
                <span>{t.btn_free_calc}</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onOpenChat}
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-slate-900 font-semibold px-6 py-3.5 rounded-xl border border-yellow-400 hover:scale-[1.01] transition-all cursor-pointer text-sm sm:text-base shadow-md shadow-yellow-400/20"
              >
                <HelpCircle size={18} className="text-slate-950" />
                <span>{t.btn_chat_bot}</span>
              </button>
            </div>

            {/* Micro badges listing the supported countries explicitly */}
            <div className="pt-6 border-t border-slate-100">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3">
                Юридическая помощь для граждан стран:
              </div>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {['Узбекистан', 'Кыргызстан', 'Таджикистан', 'Казахстан', 'Азербайджан', 'Армения'].map((country) => (
                  <span
                    key={country}
                    className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded-md font-medium transition-all shadow-2xs"
                  >
                    🚀 {country}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Informative Info Block on Right */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 shadow-lg p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/10 rounded-bl-full" />
              
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-yellow-400/10 rounded-lg text-amber-600 border border-yellow-400 flex items-center justify-center">
                  <BadgeAlert size={20} className="text-amber-500" />
                </span>
                <h3 className="font-sans font-extrabold text-slate-900 text-base">Важно знать (115-ФЗ):</h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                <div className="p-3.5 bg-white rounded-xl border-l-4 border-emerald-500 shadow-3xs">
                  <p className="font-semibold text-emerald-800 mb-1">Кыргызстан, Казахстан, Армения (ЕАЭС):</p>
                  <span>Патент для работы в РФ <strong>НЕ требуется</strong>! Необходим только трудовой договор, дактилоскопия и медицинские комиссии в течение 30 дней с даты въезда.</span>
                </div>

                <div className="p-3.5 bg-white rounded-xl border-l-4 border-yellow-500 shadow-3xs">
                  <p className="font-semibold text-amber-700 mb-1">Узбекистан, Таджикистан, Азербайджан:</p>
                  <span>Патент <strong>ОБЯЗАТЕЛЕН</strong>. Срок подачи документов в МВД составляет ровно <strong>30 дней</strong> со дня въезда в РФ. Нарушение влечет штраф и выдворение!</span>
                </div>
              </div>

              <div className="text-center font-mono text-[10px] text-slate-400">
                © Агентство услуг МИР • Профессиональные миграционные услуги в Сахалинской области
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
