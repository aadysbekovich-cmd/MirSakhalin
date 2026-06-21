import { SupportedLanguage } from '../types';
import { translations, languageNames } from '../translations';
import { Globe, Phone, Clock, ShieldCheck, MessageCircle, Send, Bot } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  currentLang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ currentLang, setLang, activeSection, setActiveSection }: HeaderProps) {
  const t = translations[currentLang];

  const menuItems = [
    { id: 'hero', label: t.nav_home },
    { id: 'services', label: t.nav_services },
    { id: 'calc', label: t.nav_calc },
    { id: 'checkers', label: t.nav_checkers },
    { id: 'map', label: t.nav_map },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-xs" id="site_header">
      {/* Top utility bar */}
      <div className="bg-slate-900 text-slate-300 py-1.5 px-4 sm:px-6 lg:px-8 text-xs font-sans flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Clock size={13} className="text-emerald-400" />
            {t.working_hours}
          </span>
          <span className="hidden md:inline-block text-slate-500">|</span>
          <span className="hidden md:inline text-emerald-400 font-medium">
            🚩 г. Южно-Сахалинск, ул. Ленина, д. 125, офис 2
          </span>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center sm:justify-end">
          <a href={`tel:${t.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone size={13} className="text-emerald-400" />
            <span className="font-semibold">{t.phone}</span>
          </a>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono hidden md:inline">Написать нам:</span>
            
            {/* WhatsApp */}
            <a 
              href="https://wa.me/79241234567" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 text-[11px] hover:text-green-400 transition-all bg-slate-800/60 hover:bg-slate-850 px-2 py-0.5 rounded-full text-slate-300 border border-slate-700/50"
              title="Написать в WhatsApp"
            >
              <MessageCircle size={11} className="text-green-400 shrink-0" />
              <span className="hidden leading-none xs:inline md:inline">WhatsApp</span>
            </a>

            {/* Telegram */}
            <a 
              href="https://t.me/mir_agency_sakhalin" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 text-[11px] hover:text-sky-450 transition-all bg-slate-800/60 hover:bg-slate-850 px-2 py-0.5 rounded-full text-slate-300 border border-slate-700/50"
              title="Написать в Телеграм"
            >
              <Send size={11} className="text-sky-400 shrink-0" />
              <span className="hidden leading-none xs:inline md:inline">Телеграм</span>
            </a>

            {/* MAX */}
            <button 
              onClick={() => {
                const el = document.getElementById('chat_section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                  // Find chat input and focus
                  setTimeout(() => {
                    const input = el.querySelector('textarea, input[type="text"]');
                    if (input instanceof HTMLElement) input.focus();
                  }, 500);
                }
              }}
              className="flex items-center gap-1 text-[11px] hover:text-amber-450 transition-all bg-slate-800/60 hover:bg-slate-850 px-2.5 py-0.5 rounded-full text-slate-300 border border-amber-500/20 cursor-pointer"
              title="Открыть ассистента МАХ"
            >
              <Bot size={11} className="text-amber-450 shrink-0" />
              <strong className="leading-none text-amber-300 font-extrabold uppercase text-[10px]">МАХ</strong>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="#hero" onClick={() => setActiveSection('hero')} className="flex items-center gap-2.5">
          <div className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-md shadow-emerald-600/10 flex items-center justify-center">
            <ShieldCheck size={26} />
          </div>
          <div>
            <div className="font-sans font-extrabold text-xl tracking-tight text-slate-900 leading-none">
              {t.appName}
            </div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mt-0.5">
              {t.appSubName}
            </div>
          </div>
        </a>

        {/* Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                const el = document.getElementById(item.id);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeSection === item.id
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-905 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Language switcher dropdown */}
        <div className="flex items-center gap-2">
          <div className="relative group/lang">
            <button className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer">
              <Globe size={13} className="text-emerald-600" />
              <span>{languageNames[currentLang]}</span>
              <span className="text-[10px] text-slate-400">▼</span>
            </button>
            
            {/* Dropdown list */}
            <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden hidden group-hover/lang:block hover:block z-50">
              {Object.entries(languageNames).map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => setLang(code as SupportedLanguage)}
                  className={`w-full text-left px-4 py-2 text-xs font-sans transition-colors cursor-pointer hover:bg-slate-50 flex items-center justify-between ${
                    currentLang === code ? 'text-emerald-600 font-bold bg-emerald-50/20' : 'text-slate-700'
                  }`}
                >
                  <span>{name}</span>
                  {currentLang === code && <span className="text-[10px]">●</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
