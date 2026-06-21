import { SupportedLanguage } from '../types';
import { translations } from '../translations';
import { Globe, Shield, Activity, Fingerprint, FileText, Gavel, MailOpen, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesProps {
  currentLang: SupportedLanguage;
}

export default function Services({ currentLang }: ServicesProps) {
  const t = translations[currentLang];

  const servicesData = [
    {
      title: t.srv_translations_title,
      desc: t.srv_translations_desc,
      icon: Globe,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-100', // Light green
      badge: 'Нотариус'
    },
    {
      title: t.srv_dms_title,
      desc: t.srv_dms_desc,
      icon: Shield,
      color: 'bg-yellow-50 text-amber-800 border-yellow-100', // Yellow helper
      badge: 'Обязательно в РФ'
    },
    {
      title: t.srv_med_title,
      desc: t.srv_med_desc,
      icon: Activity,
      color: 'bg-slate-100 text-slate-700 border-slate-200', // Light gray
      badge: 'Без очередей'
    },
    {
      title: t.srv_finger_title,
      desc: t.srv_finger_desc,
      icon: Fingerprint,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-100', // Light green
      badge: 'Госуслуги'
    },
    {
      title: t.srv_patent_title,
      desc: t.srv_patent_desc,
      icon: FileText,
      color: 'bg-yellow-50 text-amber-800 border-yellow-100', // Yellow helper
      badge: 'Патент 115-ФЗ'
    },
    {
      title: t.srv_lawyer_title,
      desc: t.srv_lawyer_desc,
      icon: Gavel,
      color: 'bg-slate-100 text-slate-700 border-slate-200', // Light gray
      badge: 'Адвокатура / Суды'
    },
    {
      title: t.srv_complaints_title,
      desc: t.srv_complaints_desc,
      icon: MailOpen,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-100', // Light green
      badge: 'Жалобы / Иски'
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-slate-50/55 border-y border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            {t.services_header}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-sans">
            {t.services_desc}
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-4">
            <div className="h-1.5 w-12 bg-emerald-500 rounded-full" />
            <div className="h-1.5 w-3 bg-yellow-400 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((srv, idx) => {
            const IconComponent = srv.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/50 hover:border-slate-300 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className={`p-3 rounded-xl border flex items-center justify-center ${srv.color}`}>
                      <IconComponent size={24} />
                    </span>
                    <span className="text-[10px] font-semibold font-mono tracking-wider text-slate-400 uppercase bg-white px-2 py-1 rounded border border-slate-200">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-sans group-hover:text-emerald-700 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-sans">
                    {srv.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/40 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>Офис: Кабинет №2</span>
                  <span className="text-emerald-600 font-bold group-hover:underline cursor-pointer">Подробнее →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Warning Callout Box */}
        <div className="mt-16 bg-yellow-50/60 border border-yellow-200/60 text-slate-900 rounded-2xl p-6 max-w-4xl mx-auto shadow-2xs">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <span className="p-2.5 bg-yellow-100 rounded-xl text-amber-700 border border-yellow-300 flex items-center justify-center shrink-0">
              <AlertCircle size={24} className="text-amber-500" />
            </span>
            <div className="space-y-1.5 text-sm">
              <h4 className="font-extrabold text-amber-900">Важная информация для иностранных граждан:</h4>
              <p className="font-sans leading-relaxed text-slate-700">
                Законодательство РФ о миграции постоянно ужесточается. С 2024–2026 годов проверки соблюдения правил пребывания осуществляются в автоматическом режиме с помощью биометрических систем. Ошибки в переводах, пропущенный день уплаты патента или отсутствие ДМС могут привести к <strong>невозможности обратного въезда на 5–10 лет</strong>.
              </p>
              <div className="pt-2 font-semibold text-emerald-800">
                🔔 Не рискуйте своей работой и будущим. Получите профессиональную гарантию в «Агентстве МИР».
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
