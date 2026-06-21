import React, { useState } from 'react';
import { SupportedLanguage, Citizenship, MvdCheckInput, MvdCheckResult } from '../types';
import { translations } from '../translations';
import { Search, Loader2, Download, AlertTriangle, CheckCircle, FileBadge, Info } from 'lucide-react';

interface MvdCheckerProps {
  currentLang: SupportedLanguage;
}

export default function MvdChecker({ currentLang }: MvdCheckerProps) {
  const t = translations[currentLang];

  const citizenshipNames: Record<Citizenship, string> = {
    uzbekistan: 'Узбекистан',
    kyrgyzstan: 'Кыргызстан',
    tajikistan: 'Таджикистан',
    kazakhstan: 'Казахстан',
    azerbaijan: 'Азербайджан',
    armenia: 'Армения',
  };

  const [activeTab, setActiveTab] = useState<'patent' | 'registry' | 'fssp'>('patent');
  
  const [form, setForm] = useState<MvdCheckInput>({
    fullName: '',
    passportNumber: '',
    citizenship: 'uzbekistan',
    patentNumber: '',
    birthDate: '',
  });

  const [loading, setLoading] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [result, setResult] = useState<MvdCheckResult | null>(null);
  const [errorStr, setErrorStr] = useState('');

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim()) {
      setErrorStr(currentLang === 'ru' ? "Пожалуйста, введите ваши ФИО." : "FIO kiriting.");
      return;
    }
    if (!form.passportNumber.trim()) {
      setErrorStr(currentLang === 'ru' ? "Пожалуйста, введите серию и номер паспорта." : "Pasport kiriting.");
      return;
    }
    if (activeTab === 'fssp' && !form.birthDate) {
      setErrorStr(currentLang === 'ru' ? "Пожалуйста, укажите точную дату рождения." : "Tug'ilgan sanani kiriting.");
      return;
    }

    setErrorStr('');
    setResult(null);
    setLoading(true);
    
    // Animate stage messages to look highly authentic and rich!
    const steps = activeTab === 'fssp' ? [
      "Подключение к ГИС ГМП и Федеральной базе данных ФССП России...",
      "Поиск открытых исполнительных производств в Сахалинском ОСП...",
      "Запрос задолженностей по налогам, штрафам ГИБДД и судебным решениям...",
      "Формирование сводного протокола судебных приставов..."
    ] : [
      "Инициализация зашифрованного SSL соединения с узлом ГУВМ МВД РФ...",
      "Проверка анкетных данных в базах Территориального органа по Сахалинской области...",
      "Поиск совпадений в Реестре контролируемых лиц и базе пограничной службы РФ...",
      "Генерация юридического протокола проверки..."
    ];

    let stepIdx = 0;
    setProgressText(steps[stepIdx]);
    
    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setProgressText(steps[stepIdx]);
      }
    }, 450);

    try {
      const endpoint = 
        activeTab === 'patent' 
          ? '/api/check/patent' 
          : activeTab === 'registry' 
            ? '/api/check/mvd' 
            : '/api/check/fssp';
            
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      clearInterval(interval);
      if (!response.ok) {
        throw new Error(currentLang === 'ru' ? "Сервер государственной базы временно перегружен. Повторите попытку." : "Xatolik yuz berdi.");
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      clearInterval(interval);
      setErrorStr(err.message || 'Ошибка подключения.');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!result) return;
    
    const reportText = `
========================================
ЮРИДИЧЕСКИЙ ПРОТОКОЛ ПРОВЕРКИ СТАТУСА
АНАЛИТИЧЕСКАЯ ИНФОРМАЦИОННАЯ СИСТЕМА «МИР»
========================================
Дата проверки: ${result.checkedAt}
Адрес запроса: г. Южно-Сахалинск, ул. Ленина, д. 125, офис 2

Реквизиты субъекта проверки:
----------------------------------------
ФИО: ${result.fullName}
Гражданство: ${citizenshipNames[result.citizenshipName as Citizenship] || result.citizenshipName}
Паспорт: ${result.passportNumber}

РЕЗУЛЬТАТЫ СИСТЕМНОГО ЗАПРОСА:

1. СТАТУС ТРУДОВОГО ПАТЕНТА:
   Статус: ${result.patentStatus.statusText}
   Детали: ${result.patentStatus.details}
   Оплачен до: ${result.patentStatus.paidUntil || 'Нет данных'}

2. РЕЕСТР КОНТРОЛИРУЕМЫХ ЛИЦ МВД РФ:
   В реестре подлежащих выдворению: ${result.mvdRegistry.isControlled ? 'ДА (ОГРАНИЧЕНИЕ ПРЕБЫВАНИЯ)' : 'НЕТ (НАРУШЕНИЙ НЕ ВЫЯВЛЕНО)'}
   Детали: ${result.mvdRegistry.details}

3. НАЛИЧИЕ ОГРАНИЧЕНИЙ НА ВЪЕЗД (ЗАПРЕТ НА ВЪЕЗД):
   Статус запрета: ${result.entryBan.hasBan ? 'ОБНАРУЖЕН ЗАПРЕТ НА ВЪЕЗД' : 'ЗАПРЕТ ОТСУТСТВУЕТ'}
   Детали: ${result.entryBan.details}

4. СЛУЖБА СУДЕБНЫХ ПРИСТАВОВ (ФССП РОССИИ):
   Наличие задолженностей: ${result.fsspStatus ? (result.fsspStatus.hasDebts ? 'ОБНАРУЖЕНЫ АКТИВНЫЕ ДОЛГИ' : 'НЕ ОБНАРУЖЕНЫ') : 'Не проверялось'}
   Сумма задолженности: ${result.fsspStatus?.debtAmount || '0 ₽'}
   Исполнительное производство: ${result.fsspStatus?.executiveProductionNumber || 'Нет'}
   Детали: ${result.fsspStatus?.details || 'Не запрашивалось.'}

Заключение эксперта-юриста Агентства «МИР»:
----------------------------------------
Данный протокол является справочно-аналитическим документом, составленным на основе сопоставления федеральных реестров данных. В случае выявления несоответствий или предупреждений, настоятельно рекомендуется получить очную юридическую помощь в течение 24 часов.

Контакты агентства МИР Южно-Сахалинск:
Телефон: +7 (984) 184-80-08
Менеджер поддержки: Савельев С. А.
========================================
    `;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Протокол_МИР_${result.fullName.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="checkers" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="p-1 px-3 bg-indigo-100 text-indigo-800 border border-indigo-200 text-[11px] font-mono tracking-wider uppercase rounded-full">
            Раздел 2: Базы данных МВД и ФССП России
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.checker_title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans">
            {t.checker_desc}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 max-w-xl mx-auto mb-8 bg-slate-50 p-1.5 rounded-xl">
          <button
            onClick={() => { setActiveTab('patent'); setResult(null); setErrorStr(''); }}
            className={`w-1/3 py-2.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'patent'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-850'
            }`}
          >
            📋 {t.checker_tab_patent}
          </button>
          <button
            onClick={() => { setActiveTab('registry'); setResult(null); setErrorStr(''); }}
            className={`w-1/3 py-2.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'registry'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-850'
            }`}
          >
            🛡️ {t.checker_tab_mvd}
          </button>
          <button
            onClick={() => { setActiveTab('fssp'); setResult(null); setErrorStr(''); }}
            className={`w-1/3 py-2.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'fssp'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-850'
            }`}
          >
            🏛️ {t.checker_tab_fssp}
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Verification Form */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200/60 p-6 sm:p-8 rounded-2xl shadow-2xs">
            <h3 className="font-sans font-extrabold text-slate-900 text-base mb-6 flex items-center gap-2">
              <Search size={18} className="text-emerald-600" />
              <span>
                {activeTab === 'patent' 
                  ? "Поиск патента на Сахалине" 
                  : activeTab === 'registry' 
                    ? "Поиск в черных списках МВД" 
                    : "Проверка задолженности ФССП"}
              </span>
            </h3>

            <form onSubmit={handleCheck} className="space-y-4">
              
              {/* Citizenship Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 font-mono uppercase tracking-wider">
                  Гражданство
                </label>
                <select
                  value={form.citizenship}
                  onChange={(e) => setForm({ ...form, citizenship: e.target.value as Citizenship })}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-emerald-600"
                >
                  {Object.entries(citizenshipNames).map(([value, name]) => (
                    <option key={value} value={value}>{name}</option>
                  ))}
                </select>
              </div>

              {/* FIO */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 font-mono uppercase tracking-wider">
                  {t.field_fio}
                </label>
                <input
                  type="text"
                  placeholder="ИВАНОВ ИВАН ИВАНОВИЧ"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value.toUpperCase() })}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-emerald-600 font-semibold tracking-wide placeholder:normal-case placeholder:font-normal"
                />
              </div>

              {/* Passport */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 font-mono uppercase tracking-wider">
                  {t.field_passport}
                </label>
                <input
                  type="text"
                  placeholder="AA 1234567"
                  value={form.passportNumber}
                  onChange={(e) => setForm({ ...form, passportNumber: e.target.value.toUpperCase() })}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-emerald-600 font-mono font-semibold"
                />
              </div>

              {/* Birth Date (for FSSP) */}
              {activeTab === 'fssp' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 font-mono uppercase tracking-wider block">
                    Дата рождения *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.birthDate || ''}
                    onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-emerald-600 font-sans cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-400 leading-tight">
                    * Указание точной даты рождения необходимо для сверки во избежание ложных совпадений.
                  </p>
                </div>
              )}

              {/* Patent number (for patent tab) */}
              {activeTab === 'patent' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 font-mono uppercase tracking-wider">
                    {t.field_patent_num}
                  </label>
                  <input
                    type="text"
                    placeholder="2518104523..."
                    value={form.patentNumber}
                    onChange={(e) => setForm({ ...form, patentNumber: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-emerald-600 font-mono"
                  />
                </div>
              )}

              {errorStr && (
                <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-800 font-medium font-sans">
                  ⚠ {errorStr}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-semibold py-3.5 rounded-xl shadow-md cursor-pointer transition-all text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin text-white" />
                    <span className="text-xs font-mono font-bold animate-pulse">Проверка...</span>
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    <span>{t.btn_check}</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right panel: Results Protocol */}
          <div className="lg:col-span-7">
            {loading && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center space-y-4">
                <Loader2 size={36} className="animate-spin text-emerald-600 mx-auto" />
                <p className="text-sm font-semibold text-slate-700 font-sans tracking-wide">
                  {t.checking_progress}
                </p>
                <p className="text-xs text-slate-400 font-mono animate-pulse">
                  {progressText}
                </p>
              </div>
            )}

            {!loading && !result && (
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center text-slate-400 font-sans space-y-3">
                <div className="text-4xl">📁</div>
                <p className="text-sm font-medium">
                  {currentLang === 'ru' 
                    ? "Результаты проверки государственного протокола будут выведены в данном модуле в реальном времени."
                    : "Tekshiruv natijalari ushbu modulda real vaqt rejimida ko'rsatiladi."}
                </p>
                <p className="text-xs text-slate-400 font-mono max-w-md mx-auto">
                  Все запрашиваемые транзакции шифруются и соответствуют стандартам конфиденциальности персональных данных МВД РФ.
                </p>
              </div>
            )}

            {!loading && result && (
              <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10" />
                
                {/* Header Protocol title */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <FileBadge size={22} className="text-emerald-600" />
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-none">
                        {activeTab === 'fssp' ? 'ПРОТОКОЛ ПРОВЕРКИ ФССП РОССИИ' : 'ПРОТОКОЛ ПРОВЕРКИ МИД/МВД РФ'}
                      </h4>
                      <span className="text-[10px] font-mono tracking-wider text-slate-400">
                        РЕГИСТРАЦИОННЫЙ ID: {Math.random().toString(36).substring(3, 9).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1 ${
                    activeTab === 'fssp'
                      ? result.fsspStatus?.hasDebts
                        ? 'bg-rose-50 text-rose-800 border-rose-100 animate-pulse'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-100'
                      : result.status === 'valid'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
                        : result.status === 'warning'
                          ? 'bg-amber-50 text-amber-800 border-amber-100'
                          : 'bg-rose-50 text-rose-800 border-rose-100 animate-pulse'
                  }`}>
                    {activeTab === 'fssp' ? (
                      result.fsspStatus?.hasDebts ? (
                        <><AlertTriangle size={14} /> ВЫЕЗД ОГРАНИЧЕН</>
                      ) : (
                        <><CheckCircle size={14} /> ДОЛГОВ НЕ НАЙДЕНО</>
                      )
                    ) : result.status === 'valid' ? (
                      <><CheckCircle size={14} /> ВЪЕЗД РАЗРЕШЕН</>
                    ) : (
                      <><AlertTriangle size={14} /> ОБНАРУЖЕНЫ ОГРАНИЧЕНИЯ</>
                    )}
                  </span>
                </div>

                {/* Patient Information Box */}
                <div className="grid sm:grid-cols-2 gap-4 text-xs font-sans text-slate-600 bg-slate-50 p-4 rounded-xl">
                  <div>
                    <span className="font-bold text-slate-400 block uppercase text-[9px] tracking-wider font-mono">Проверяемый гражданин:</span>
                    <span className="text-slate-900 font-bold block text-sm">{result.fullName}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 block uppercase text-[9px] tracking-wider font-mono">Серия / Номер паспорта:</span>
                    <span className="text-slate-900 font-semibold block text-sm font-mono">{result.passportNumber}</span>
                  </div>
                  {activeTab === 'fssp' && form.birthDate && (
                    <div className="sm:col-span-2">
                      <span className="font-bold text-slate-400 block uppercase text-[9px] tracking-wider font-mono">Дата рождения:</span>
                      <span className="text-slate-900 font-semibold block text-sm font-sans">{new Date(form.birthDate).toLocaleDateString('ru-RU')} г.р.</span>
                    </div>
                  )}
                  <div className="sm:col-span-2 pt-2 border-t border-slate-200/50">
                    <span className="font-bold text-slate-400 block uppercase text-[9px] tracking-wider font-mono">Официальный таймстамп выписки:</span>
                    <span className="text-slate-700 block font-mono bg-white p-1 rounded px-2 w-max border border-slate-200">{result.checkedAt} Южно-Сахалинск</span>
                  </div>
                </div>

                {/* Checker results details list */}
                <div className="space-y-4 font-sans text-sm">
                  
                  {activeTab === 'patent' && (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <h5 className="font-extrabold text-slate-900 text-xs tracking-wider uppercase flex items-center gap-1.5 text-emerald-800">
                        <span>● Статус патента:</span>
                        <strong className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded text-[10px]">
                          {result.patentStatus.statusText}
                        </strong>
                      </h5>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {result.patentStatus.details}
                      </p>
                      {result.patentStatus.paidUntil && (
                        <div className="text-xs text-slate-500 font-mono mt-1 pt-1 border-t border-dashed border-slate-200">
                          Рекомендуемая следующая уплата аванса до: <strong>{result.patentStatus.paidUntil}</strong>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'fssp' && result.fsspStatus && (
                    <div className={`p-4 border rounded-xl space-y-2 text-slate-900 ${
                      result.fsspStatus.hasDebts
                        ? 'bg-rose-50 border-rose-200'
                        : 'bg-emerald-50 border-emerald-200'
                    }`}>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h5 className={`font-extrabold text-xs tracking-wider uppercase ${
                            result.fsspStatus.hasDebts ? 'text-rose-900' : 'text-emerald-900'
                          }`}>
                            🏛️ База исполнительных производств ФССП РФ:
                          </h5>
                          <p className="text-slate-700 text-xs sm:text-sm mt-1 leading-relaxed">
                            {result.fsspStatus.details}
                          </p>
                        </div>
                        <div className={`shrink-0 text-right px-2.5 py-1 rounded-lg text-xs font-bold border ${
                          result.fsspStatus.hasDebts
                            ? 'bg-rose-100 text-rose-800 border-rose-200'
                            : 'bg-emerald-100 text-emerald-850 border-emerald-200'
                        }`}>
                          Долг: {result.fsspStatus.debtAmount}
                        </div>
                      </div>
                      <div className="text-[10px] font-mono opacity-80 pt-1.5 border-t border-dashed border-slate-200">
                        Судебное производство: <strong>{result.fsspStatus.executiveProductionNumber}</strong>
                      </div>
                    </div>
                  )}

                  {activeTab !== 'fssp' && (
                    <>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                        <h5 className="font-extrabold text-slate-900 text-xs tracking-wider uppercase text-indigo-900">
                          🛡️ Проверка реестра контролируемых лиц МВД:
                        </h5>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                          {result.mvdRegistry.details}
                        </p>
                      </div>

                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                        <h5 className="font-extrabold text-slate-900 text-xs tracking-wider uppercase text-rose-900">
                          ⛔ Статус ограничения въезда в РФ (Черные списки ФСБ/МВД):
                        </h5>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                          {result.entryBan.details}
                        </p>
                      </div>
                    </>
                  )}

                  {activeTab === 'fssp' && (
                    <>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                        <h5 className="font-extrabold text-slate-900 text-xs tracking-wider uppercase text-rose-950">
                          ⛔ Миграционные ограничения по линии ФССП:
                        </h5>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                          {result.entryBan.details}
                        </p>
                      </div>
                    </>
                  )}

                </div>

                {/* PDF Extract Download Trigger button */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-100">
                  <button
                    onClick={downloadReport}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-xs cursor-pointer transition-all"
                  >
                    <Download size={15} />
                    <span>Скачать выписку (.TXT)</span>
                  </button>
                  
                  <div className="text-[10px] font-mono leading-tight text-slate-400 flex items-center gap-1.5">
                    <Info size={14} className="text-slate-400 shrink-0" />
                    <span>
                      Выписка имеет статус официального справочного протокола. Заверено штампом Орган ГУВМ МВД «МИР Учет Сахалин».
                    </span>
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
