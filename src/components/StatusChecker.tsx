import { useState, useEffect } from 'react';
import { SupportedLanguage, Citizenship, LawCalcInput, LawCalcResult, DeadlineRequirement } from '../types';
import { translations } from '../translations';
import { ShieldCheck, Calendar, Info, Clock, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';

interface StatusCheckerProps {
  currentLang: SupportedLanguage;
}

export default function StatusChecker({ currentLang }: StatusCheckerProps) {
  const t = translations[currentLang];

  // Citizen options with translation strings
  const citizenOptions: { value: Citizenship; label: string }[] = [
    { value: 'uzbekistan', label: currentLang === 'ru' ? 'Узбекистан' : 'O\'zbekiston (O\'zbek)' },
    { value: 'kyrgyzstan', label: currentLang === 'ru' ? 'Кыргызстан' : 'Kyrgyzstan (Qirg\'iz)' },
    { value: 'tajikistan', label: currentLang === 'ru' ? 'Таджикистан' : 'Tojikiston (Tojik)' },
    { value: 'kazakhstan', label: currentLang === 'ru' ? 'Казахстан' : 'Qozog\'iston (Qozoq)' },
    { value: 'azerbaijan', label: currentLang === 'ru' ? 'Азербайджан' : 'Azarbaycan (Azeri)' },
    { value: 'armenia', label: currentLang === 'ru' ? 'Армения' : 'Armaniston (Armenian)' },
  ];

  // Set default initial dates representing a recent entry (e.g. 10 days ago relative to 2026-06-14)
  const defaultEntryDate = "2026-06-04";

  const [input, setInput] = useState<LawCalcInput>({
    citizenship: 'uzbekistan',
    entryDate: defaultEntryDate,
    purposeOfEntry: 'work',
    hasPatent: false,
  });

  const [result, setResult] = useState<LawCalcResult | null>(null);

  useEffect(() => {
    calculateRequirements();
  }, [input, currentLang]);

  const calculateRequirements = () => {
    const { citizenship, entryDate, purposeOfEntry, hasPatent } = input;
    
    // Parse times. Local hardcoded time of current state: 2026-06-14T00:00:00
    const today = new Date("2026-06-14");
    const entry = new Date(entryDate);
    
    // Days elapsed
    const diffTime = today.getTime() - entry.getTime();
    const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const isEaeu = ['kyrgyzstan', 'kazakhstan', 'armenia'].includes(citizenship);
    const patentRequired = !isEaeu;
    
    const requirements: DeadlineRequirement[] = [];

    // Helper to format due date
    const formatDate = (date: Date) => {
      return date.toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : currentLang === 'uz' ? 'uz-UZ' : 'ru-RU');
    };

    if (isEaeu) {
      // EAEU rules
      // 1. Medical Exam Limit: 30 days if Work, 90 days if Other
      const medLimitDays = purposeOfEntry === 'work' ? 30 : 90;
      const medDueDate = new Date(entry);
      medDueDate.setDate(entry.getDate() + medLimitDays);
      const medDaysRem = Math.floor((medDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      requirements.push({
        title: currentLang === 'ru' ? "Медицинское освидетельствование" : "Tibbiy ko'rikdan o'tish (Med komissiya)",
        description: currentLang === 'ru' 
          ? `Обязательно для граждан ЕАЭС в течение ${medLimitDays} дней с даты въезда. Требуется пройти терапевта, нарколога, сдать анализы в уполномоченном медцентре Южно-Сахалинска.`
          : `EAEU mamlakatlari fuqarolari uchun kirgan kundan boshlab ${medLimitDays} kun ichida majburiy. Yujno-Saxalinskda tibbiy komissiyadan o'tish lozim.`,
        deadlineDate: formatDate(medDueDate),
        daysRemaining: medDaysRem,
        status: medDaysRem < 0 ? 'critical' : medDaysRem <= 7 ? 'warning' : 'success',
        completed: daysPassed > medLimitDays + 5,
      });

      // 2. Fingerprinting & Photo: 30 days if Work, 90 days if Other
      const fingerLimitDays = purposeOfEntry === 'work' ? 30 : 90;
      const fingerDueDate = new Date(entry);
      fingerDueDate.setDate(entry.getDate() + fingerLimitDays);
      const fingerDaysRem = Math.floor((fingerDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      requirements.push({
        title: currentLang === 'ru' ? "Дактилоскопическая регистрация (" : "Daktiloskopiya (Barmoq izi topshirish)",
        description: currentLang === 'ru'
          ? `Получение «зеленой карты» в МВД. Проводится однократно. Необходимо иметь при себе перевод паспорта и медзаключение.`
          : `Ichki ishlar vazirligida yashil karta olish. Bir marta amalga oshiriladi. Tarjima qilingan pasport va tibbiy xulosa bo'lishi kerak.`,
        deadlineDate: formatDate(fingerDueDate),
        daysRemaining: fingerDaysRem,
        status: fingerDaysRem < 0 ? 'critical' : fingerDaysRem <= 7 ? 'warning' : 'success',
        completed: daysPassed > fingerLimitDays + 7,
      });

      // 3. Employment Contract & Migration Extension Check
      const extLimitDays = 90; // Standard initial registration extension
      const extDueDate = new Date(entry);
      extDueDate.setDate(entry.getDate() + extLimitDays);
      const extDaysRem = Math.floor((extDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      requirements.push({
        title: currentLang === 'ru' ? "Заключение трудового договора и продление учета" : "Mehnat shartnomasi va hisobga olishni uzaytirish",
        description: currentLang === 'ru'
          ? "Официальный работодатель обязан уведомить МВД в течение 3 дней. Регистрация продлевается на срок действия трудового договора (до 1 года)."
          : "Rasmiy ish beruvchi 3 kun ichida IIVni xabardor qilishi shart. Ro'yxatdan o'tish mehnat shartnomasi muddati (1 yilgacha) uchun uzaytiriladi.",
        deadlineDate: formatDate(extDueDate),
        daysRemaining: extDaysRem,
        status: extDaysRem < 0 ? 'critical' : extDaysRem <= 10 ? 'warning' : 'info',
        completed: false,
      });

    } else {
      // Non-EAEU Visa-Free (Uzbekistan, Tajikistan, Azerbaijan)
      // 1. Translating check and DMS within 3-5 days
      const prepareLimitDays = 10;
      const prepDueDate = new Date(entry);
      prepDueDate.setDate(entry.getDate() + prepareLimitDays);
      const prepDaysRem = Math.floor((prepDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      requirements.push({
        title: currentLang === 'ru' ? "Перевод паспорта и оформление полиса ДМС" : "Pasportni notarial tarjima qilish va DMS sug'urtasi",
        description: currentLang === 'ru'
          ? "Первый этап легализации при въезде. Нотариальный перевод нужен для всех баз, а покупка ДМС страхует ваше нахождение с 1-го дня."
          : "Kirishdan keyingi birinchi bosqich. Notarial tarjima barcha idoralar uchun kerak, DMS polisini sotib olish esa 1-kundan boshlab sug'urta qiladi.",
        deadlineDate: formatDate(prepDueDate),
        daysRemaining: prepDaysRem,
        status: prepDaysRem < 0 ? 'critical' : prepDaysRem <= 3 ? 'warning' : 'success',
        completed: daysPassed > prepareLimitDays,
      });

      // 2. Submission of Patent Documents: must be done within 30 days!
      const patentLimitDays = 30;
      const patentDueDate = new Date(entry);
      patentDueDate.setDate(entry.getDate() + patentLimitDays);
      const patentDaysRem = Math.floor((patentDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      requirements.push({
        title: currentLang === 'ru' ? "Сбор и подача документов на патент" : "Patent hujjatlarini yig'ish va topshirish",
        description: currentLang === 'ru'
          ? `Крайний срок подачи пакета документов в МВД. Включает прохождение медкомиссий, тестирование по русскому языку и дактилоскопию. При просрочке грозит штраф от 10 000 до 15 000 рублей.`
          : `IIVga hujjatlar to'plamini topshirish muddati. Tibbiy ko'rik, o'zbek/rus tili testi va daktiloskopiyani o'z ichiga oladi. Kechiktirilsa, 10 000-15 000 rublgacha jarima solinadi.`,
        deadlineDate: formatDate(patentDueDate),
        daysRemaining: patentDaysRem,
        status: hasPatent ? 'success' : (patentDaysRem < 0 ? 'critical' : patentDaysRem <= 7 ? 'warning' : 'info'),
        completed: hasPatent,
      });

      // 3. Advance Patent Payments & Migration Extension Tracking
      if (hasPatent) {
        requirements.push({
          title: currentLang === 'ru' ? "Оплата очередного авансового чека по патенту" : "Patent uchun navbatdagi bo'nak to'lovini to'lash",
          description: currentLang === 'ru'
            ? "Патент продлевается ежемесячной оплатой налога. Оплата даже за 1 день после установленной даты АННУЛИРУЕТ патент. Требуется также продлевать миграционный учет на основании чеков."
            : "Patent soliq to'lash orqali uzaytiriladi. Belgilangan muddatdan 1 kunga bo'lsa ham kechiksa, patent BEKOR qilinadi. Kvitansiyalar asosida migratsiya hisobini uzaytirish kerak.",
          deadlineDate: currentLang === 'ru' ? "До даты выдачи ежемесячно" : "Har oy berilgan sanagacha",
          daysRemaining: 15, // Mock safety estimate
          status: 'success',
          completed: false,
        });
      }
    }

    setResult({
      isEaeu,
      patentRequired,
      requirements,
    });
  };

  return (
    <section id="calc" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="p-1 px-3 bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-mono tracking-wider uppercase rounded-full">
            Раздел 1: Проверка статуса
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.calc_title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans">
            {t.calc_desc}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Input Form Controls Block */}
          <div className="lg:col-span-5 bg-white border border-slate-200/60 p-6 sm:p-8 rounded-2xl shadow-sm space-y-5">
            <h3 className="font-sans font-extrabold text-slate-950 text-base border-b border-slate-100 pb-3 flex items-center gap-1.5">
              <Calendar size={18} className="text-emerald-600" />
              <span>Параметры калькулятора</span>
            </h3>

            {/* Citizenship selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
                {t.calc_cit_label}
              </label>
              <select
                value={input.citizenship}
                onChange={(e) => setInput({ ...input, citizenship: e.target.value as Citizenship })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-emerald-600 transition-all font-sans"
              >
                {citizenOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Entry Date selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
                {t.calc_date_label}
              </label>
              <input
                type="date"
                value={input.entryDate}
                onChange={(e) => setInput({ ...input, entryDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-emerald-600 transition-all font-mono"
              />
            </div>

            {/* Purpose of entry selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
                {t.calc_purpose_label}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setInput({ ...input, purposeOfEntry: 'work' })}
                  className={`px-4 py-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    input.purposeOfEntry === 'work'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  💼 {t.calc_purpose_work}
                </button>
                <button
                  type="button"
                  onClick={() => setInput({ ...input, purposeOfEntry: 'other' })}
                  className={`px-4 py-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    input.purposeOfEntry === 'other'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  ✈️ {t.calc_purpose_other}
                </button>
              </div>
            </div>

            {/* Has patent toggler (only visible for non-EAEU) */}
            {!['kyrgyzstan', 'kazakhstan', 'armenia'].includes(input.citizenship) && (
              <div className="pt-2">
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div>
                    <span className="text-xs font-extrabold text-slate-700 block">
                      {t.calc_patent_label}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block">ФЗ-115 миграционный статус</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={input.hasPatent}
                    onChange={(e) => setInput({ ...input, hasPatent: e.target.checked })}
                    className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Current System Date Info */}
            <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100 text-[11px] font-sans text-emerald-800 flex items-center gap-1.5 leading-tight">
              <Info size={14} className="text-emerald-700 shrink-0" />
              <span>
                Расчет произведен автоматически на текущую дату <strong>14.06.2026</strong> Южно-Сахалинск.
              </span>
            </div>
          </div>

          {/* Results Block */}
          <div className="lg:col-span-7 space-y-6">
            {result && (
              <div className="space-y-6">
                
                {/* Status Intro Card */}
                <div className={`p-5 rounded-2xl border ${
                  result.isEaeu 
                    ? 'bg-emerald-50 text-emerald-950 border-emerald-200' 
                    : 'bg-yellow-50 text-amber-950 border-yellow-200'
                }`}>
                  <div className="flex items-start gap-3">
                    <span className="p-2.5 bg-white rounded-xl shadow-xs shrink-0">
                      <ShieldCheck size={20} className={result.isEaeu ? 'text-emerald-600' : 'text-amber-500'} />
                    </span>
                    <div className="space-y-1">
                      <p className="font-extrabold text-sm uppercase tracking-wide">
                        {result.isEaeu ? "Соглашение ЕАЭС" : "Визовый статус: Безвизовый режим"}
                      </p>
                      <p className="text-xs sm:text-sm font-sans leading-relaxed">
                        {result.isEaeu ? t.result_eaeu_text : t.result_patent_req}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timeline and Deadline Checklist */}
                <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
                  <h3 className="font-sans font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3 flex items-center gap-1.5 justify-between">
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-emerald-600" />
                      <span>{t.result_timeline}</span>
                    </div>
                  </h3>

                  <div className="relative border-l-2 border-slate-100 pl-6 ml-3 space-y-8">
                    {result.requirements.map((req, idx) => {
                      const isCritical = req.status === 'critical';
                      const isWarning = req.status === 'warning';
                      const isPast = req.daysRemaining < 0;

                      return (
                        <div key={idx} className="relative">
                          {/* Dot item mapping */}
                          <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                            req.completed 
                              ? 'border-emerald-500' 
                              : isCritical 
                                ? 'border-rose-600' 
                                : isWarning 
                                  ? 'border-amber-500' 
                                  : 'border-slate-300'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              req.completed 
                                ? 'bg-emerald-500' 
                                : isCritical 
                                  ? 'bg-rose-600 animate-ping' 
                                  : isWarning 
                                    ? 'bg-amber-500' 
                                    : 'bg-slate-300'
                            }`} />
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h4 className="font-extrabold text-slate-950 text-sm sm:text-base">
                                {req.title}
                              </h4>
                              
                              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                                req.completed
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
                                  : isCritical
                                    ? 'bg-rose-50 text-rose-800 border-rose-100 animate-pulse'
                                    : isWarning
                                      ? 'bg-amber-50 text-amber-800 border-amber-100'
                                      : 'bg-slate-50 text-slate-700 border-slate-100'
                              }`}>
                                {req.completed ? (
                                  <span className="flex items-center gap-1">✔ {t.result_status_success}</span>
                                ) : isPast ? (
                                  <span>ПРОСРОЧЕНО НА {-req.daysRemaining} {t.result_days}</span>
                                ) : (
                                  <span>Осталось {req.daysRemaining} {t.result_days}</span>
                                )}
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                              {req.description}
                            </p>

                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                              <span><strong>{t.result_due}</strong> {req.deadlineDate}</span>
                            </div>

                            {/* Attention card when critical */}
                            {!req.completed && isCritical && (
                              <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-800 flex items-start gap-1.5 mt-2 animate-bounce">
                                <AlertOctagon size={14} className="text-rose-600 shrink-0 mt-0.5" />
                                <span>
                                  {currentLang === 'ru' 
                                    ? "Срок пропущен или критически близок! Срочно посетите наш офис на ул. Ленина, д. 125, оф. 2 для исправления ситуации и во избежание депортации."
                                    : "Muddat o'tdi yoki juda kam vaqt qoldi! Deportatsiyaning oldini olish uchun zudlik bilan bizning ofisimizga Lenin ko'chasi, 125, 2-ofisga keling."}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-slate-400 block">Пакет документов под ключ:</span>
                      <span className="text-xs font-bold text-slate-700 block">Подготовим все переводы и заявления за 1 рабочий день!</span>
                    </div>
                    <a
                      href="#contact_section"
                      onClick={() => {
                        const el = document.getElementById('map');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex justify-center items-center bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-xl cursor-pointer transition-colors"
                    >
                      Оставить заявку в офис
                    </a>
                  </div>

                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
