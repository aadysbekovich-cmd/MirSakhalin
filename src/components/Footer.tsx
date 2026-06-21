import { SupportedLanguage } from '../types';
import { translations, languageNames } from '../translations';
import { ShieldCheck, HelpCircle, Phone, MapPin, MessageCircle, Send, Bot } from 'lucide-react';

interface FooterProps {
  currentLang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
}

export default function Footer({ currentLang, setLang }: FooterProps) {
  const t = translations[currentLang];

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 font-sans" id="site_footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-12 gap-10">
          
          {/* Logo Brand area */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="bg-emerald-600 text-white p-2 rounded-lg flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <span className="font-extrabold text-lg tracking-tight leading-none">
                {t.appName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              Профессиональное миграционное юридическое сопровождение в Сахалинской области. Помогаем трудовым мигрантам оформлять документы быстро, выгодно и полностью легально.
            </p>
          </div>

          {/* Languages links selection */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest font-mono">Выбор языка сайта / Тил тандаш:</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(languageNames).map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => {
                    setLang(code as SupportedLanguage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-left text-xs font-medium cursor-pointer transition-colors ${
                    currentLang === code ? 'text-emerald-400 font-bold' : 'hover:text-white'
                  }`}
                >
                  🌐 {name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick legal contacts block */}
          <div className="md:col-span-4 space-y-4 text-xs">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest font-mono">Контакты и адрес:</h4>
            <div className="space-y-3 font-sans">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>г. Южно-Сахалинск, улица Ленина, дом 125, офис 2</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <a href={`tel:${t.phone}`} className="hover:text-white transition-colors">{t.phone}</a>
              </div>
              <div className="flex items-start gap-2">
                <HelpCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Юридическая консультация: Пн-Сб</span>
              </div>

              {/* Footer Messengers */}
              <div className="pt-2.5 border-t border-slate-800 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">Мы в мессенджерах:</span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://wa.me/79241234567"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/25 hover:border-[#25D366]/40 text-green-400 transition-all font-bold text-[11px]"
                    title="WhatsApp"
                  >
                    <MessageCircle size={13} />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="https://t.me/mir_agency_sakhalin"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/25 hover:border-[#229ED9]/40 text-sky-400 transition-all font-bold text-[11px]"
                    title="Telegram"
                  >
                    <Send size={12} />
                    <span>Telegram</span>
                  </a>
                  <button
                    onClick={() => {
                      const el = document.getElementById('chat_section');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                        setTimeout(() => {
                          const input = el.querySelector('textarea, input[type="text"]');
                          if (input instanceof HTMLElement) input.focus();
                        }, 500);
                      }
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#d97706]/10 hover:bg-[#d97706]/20 border border-[#d97706]/25 hover:border-[#d97706]/40 text-amber-400 transition-all font-bold text-[11px] cursor-pointer"
                    title="МАХ Помощник"
                  >
                    <Bot size={13} className="text-amber-500" />
                    <strong>МАХ AI</strong>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom credits */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-center text-[10px] font-mono uppercase tracking-wider text-slate-500 whitespace-nowrap">
          {t.rights_reserved} • {new Date().getFullYear()} • 115-ФЗ Лицензия
        </div>
      </div>
    </footer>
  );
}
