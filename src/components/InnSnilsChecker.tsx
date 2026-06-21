import React, { useState } from 'react';
import { SupportedLanguage, StateIdCheckResult } from '../types';
import { translations } from '../translations';
import { FileCheck, Shield, Check, AlertCircle, HelpCircle, Loader2 } from 'lucide-react';

interface InnSnilsCheckerProps {
  currentLang: SupportedLanguage;
}

export default function InnSnilsChecker({ currentLang }: InnSnilsCheckerProps) {
  const t = translations[currentLang];

  const [documentType, setDocumentType] = useState<'INN' | 'SNILS'>('INN');
  const [docNumber, setDocNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StateIdCheckResult | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  const formatSnils = (value: string) => {
    const raw = value.replace(/[^\d]/g, '').slice(0, 11);
    if (raw.length <= 3) return raw;
    if (raw.length <= 6) return `${raw.slice(0, 3)}-${raw.slice(3)}`;
    if (raw.length <= 9) return `${raw.slice(0, 3)}-${raw.slice(3, 6)}-${raw.slice(6)}`;
    return `${raw.slice(0, 3)}-${raw.slice(3, 6)}-${raw.slice(6, 9)} ${raw.slice(9)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (documentType === 'SNILS') {
      setDocNumber(formatSnils(val));
    } else {
      setDocNumber(val.replace(/[^\d]/g, '').slice(0, 12));
    }
  };

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docNumber.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/check/inn-snils', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number: docNumber,
          type: documentType
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка связи с сервером ФНС/СФР.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({
        number: docNumber,
        type: documentType,
        isValid: false,
        details: 'Не удалось завершить проверку. Сервис временно недоступен.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-20 bg-slate-50 border-t border-slate-250/20" id="inn_snils_section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid lg:grid-cols-12 gap-0 max-w-5xl mx-auto">
          
          {/* Left Block: Documentation helper / Legal advice */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="p-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono tracking-wider uppercase rounded-lg w-max block">
                Справочный центр ФНС и СФР
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {t.inn_snils_header}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                ИНН (Идентификационный номер налогоплательщика) и СНИЛС (Страховой номер индивидуального лицевого счета) являются важнейшими документами иностранного гражданина для легальной уплаты налогов и пенсионных отчислений на территории РФ.
              </p>
            </div>

            <div className="space-y-4 text-xs font-sans text-slate-400">
              <div className="flex items-start gap-2">
                <Check size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>ИНН необходим для привязки авансовых квитанций патента. Если ИНН указан неверно — платеж потеряется, а патент аннулируют!</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>СНИЛС обязателен для заключения любого официального трудового договора или ГПХ.</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex justify-between items-center">
              <span>Служба заботы МИР</span>
              <span>ул. Ленина, д. 125, оф. 2</span>
            </div>
          </div>

          {/* Right Block: Input & Checker calculator */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h4 className="font-sans font-extrabold text-slate-900 text-base">
                Панель сверки контрольных сумм в ГИСО
              </h4>
              
              <button
                type="button"
                onClick={() => setHelpOpen(!helpOpen)}
                className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle size={14} />
                <span>{helpOpen ? 'Скрыть справку' : 'Где взять номера?'}</span>
              </button>
            </div>

            {/* Help guidelines explaining where to get numbers */}
            {helpOpen && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 font-sans space-y-2 animate-fadeIn">
                <p><strong>ИНН гражданина:</strong> указан на бланке Свидетельства налоговой уплаты ФНС, а также печатается на пластиковой карте вашего патента (на обратной стороне).</p>
                <p><strong>СНИЛС гражданина:</strong> выдается Пенсионным (ныне Социальным) фондом на светло-зеленой пластиковой карте (АДИ-РЕГ) или А4-выписке СФР.</p>
              </div>
            )}

            {/* Toggle buttons Document type */}
            <div className="grid grid-cols-2 gap-4 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => { setDocumentType('INN'); setDocNumber(''); setResult(null); }}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  documentType === 'INN' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500'
                }`}
              >
                Налоговый ИНН (12 цифр)
              </button>
              <button
                type="button"
                onClick={() => { setDocumentType('SNILS'); setDocNumber(''); setResult(null); }}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  documentType === 'SNILS' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500'
                }`}
              >
                Пенсионный СНИЛС (11 цифр)
              </button>
            </div>

            {/* Submission Form */}
            <form onSubmit={handleCheck} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 font-mono uppercase tracking-wider block">
                  {documentType === 'INN' ? t.field_inn : t.field_snils}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={docNumber}
                    onChange={handleInputChange}
                    placeholder={documentType === 'INN' ? '500123456789' : '123-456-789 01'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-emerald-600 font-mono font-bold tracking-wider placeholder:font-normal placeholder:tracking-normal"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                disabled={loading || !docNumber}
                className="w-full inline-flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-3.5 rounded-xl shadow-xs cursor-pointer transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-white" />
                    <span className="text-xs font-mono font-bold">Сверяем контрольные числа ФНС/СФР...</span>
                  </>
                ) : (
                  <>
                    <FileCheck size={18} />
                    <span>Проверить по реестрам РФ</span>
                  </>
                )}
              </button>
            </form>

            {/* Results verification response display block */}
            {result && (
              <div className={`p-5 rounded-2xl border ${
                result.isValid 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              } space-y-3 animate-slideIn`}>
                <div className="flex items-start gap-3">
                  <span className={`p-2 rounded-xl bg-white shadow-2xs shrink-0 flex items-center justify-center`}>
                    {result.isValid ? (
                      <Check className="text-emerald-600 font-extrabold" size={18} />
                    ) : (
                      <AlertCircle className="text-rose-600" size={18} />
                    )}
                  </span>
                  
                  <div className="space-y-1 font-sans">
                    <p className="text-sm font-extrabold uppercase tracking-wide">
                      {result.isValid 
                        ? `Проверка ${result.type} завершена успешно!` 
                        : `Проверка ${result.type} выявила несоответствие`}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                      {result.details}
                    </p>
                  </div>
                </div>

                {/* Helpful prompt when invalid */}
                {!result.isValid && (
                  <div className="pt-2 border-t border-rose-200/50 text-xs text-rose-800 leading-relaxed">
                    💡 При уплате пошлины ФНС с неправильным ИНН, ваш платеж застрянет на транзитных счетах казначейства. Агентство услуг МИР поможет составить заявление на перенаправление платежа и исправление ИНН в базах данных налоговой службы.
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
