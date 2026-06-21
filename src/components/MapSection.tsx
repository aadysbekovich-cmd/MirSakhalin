import { SupportedLanguage } from '../types';
import { translations } from '../translations';
import { MapPin, Phone, Mail, Clock, Shield, Compass, Navigation, MessageCircle, Send, Bot } from 'lucide-react';

interface MapSectionProps {
  currentLang: SupportedLanguage;
}

export default function MapSection({ currentLang }: MapSectionProps) {
  const t = translations[currentLang];

  // Coordinates: г. Южно-Сахалинск, ул. Ленина, д. 125, офис 2
  const addressLink = "https://2gis.ru/yuzhnosakhalinsk/search/%D1%83%D0%BB.%20%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D0%B0%2C%20%D0%B4.%20125/geo/70030076162391037";

  return (
    <section id="map" className="py-16 md:py-24 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="p-1 px-3 bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-mono tracking-wider uppercase rounded-full">
            Раздел 3: Геолокация и контакты
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.map_title}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-sans">
            {t.map_desc}
          </p>
          <div className="h-1.5 w-16 bg-emerald-600 rounded-full mx-auto" />
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left panel: Info cards */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            
            {/* Direct primary address block */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-600/10 rounded-tl-full -z-1" />
              
              <div className="flex gap-3.5 items-start">
                <span className="p-2.5 bg-emerald-600 rounded-xl text-white flex items-center justify-center shadow-md">
                  <MapPin size={22} />
                </span>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-[#a7f3d0] font-bold uppercase block">Наш Адрес:</span>
                  <p className="font-extrabold text-sm sm:text-base leading-snug">
                    {t.address}
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <span className="p-2.5 bg-slate-800 rounded-xl text-emerald-400 flex items-center justify-center">
                  <Phone size={18} />
                </span>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase block">Телефон для справок:</span>
                  <a href={`tel:${t.phone}`} className="font-extrabold text-slate-100 hover:text-emerald-400 transition-colors block text-sm sm:text-base">
                    {t.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <span className="p-2.5 bg-slate-800 rounded-xl text-emerald-400 flex items-center justify-center">
                  <Clock size={18} />
                </span>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase block">Режим работы:</span>
                  <p className="font-semibold text-slate-250 text-xs sm:text-sm">
                    {t.working_hours}
                  </p>
                </div>
              </div>

              {/* Messengers area */}
              <div className="pt-4 border-t border-slate-800/60 space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase block">Связаться в мессенджерах:</span>
                <div className="grid grid-cols-3 gap-2">
                  
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/79241234567"
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 hover:border-[#25D366]/40 text-green-400 font-bold py-2 px-1 sm:px-3 rounded-xl text-xs transition-all text-center"
                    title="Написать в WhatsApp"
                  >
                    <MessageCircle size={15} className="shrink-0" />
                    <span className="text-[10px] sm:text-xs">WhatsApp</span>
                  </a>

                  {/* Telegram */}
                  <a
                    href="https://t.me/mir_agency_sakhalin"
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/20 hover:border-[#229ED9]/40 text-sky-400 font-bold py-2 px-1 sm:px-3 rounded-xl text-xs transition-all text-center"
                    title="Написать в Telegram"
                  >
                    <Send size={14} className="shrink-0" />
                    <span className="text-[10px] sm:text-xs">Telegram</span>
                  </a>

                  {/* MAX */}
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
                    className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 bg-[#d97706]/10 hover:bg-[#d97706]/20 border border-[#d97706]/20 hover:border-[#d97706]/40 text-amber-400 font-bold py-2 px-1 sm:px-3 rounded-xl text-xs transition-all cursor-pointer text-center"
                    title="Открыть ассистента МАХ"
                  >
                    <Bot size={15} className="shrink-0 text-amber-500" />
                    <strong className="text-[10px] sm:text-xs">МАХ AI</strong>
                  </button>

                </div>
              </div>
            </div>

            {/* Micro route advice */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <Compass size={18} className="text-emerald-600" />
                <span>Как добраться:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                Мы находимся напротив Центрального почтамта в Южно-Сахалинске. Ближайшая автобусная остановка — «Улица Ленина» (маршруты №3, №10, №62). Офис расположен на втором этаже, кабинет №2. Вход со стороны главной улицы Леннина.
              </p>
            </div>

            {/* Direct trigger to open 2GIS map */}
            <a
              href={addressLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-emerald-600/10 cursor-pointer transition-all text-sm uppercase tracking-wider"
            >
              <Navigation size={18} />
              <span>{t.map_route}</span>
            </a>

          </div>

          {/* Right panel: Visually breath-taking custom interactive 2GIS styled Map container */}
          <div className="lg:col-span-8 flex flex-col bg-slate-100 border border-slate-200 rounded-3xl overflow-hidden shadow-2xs relative min-h-[460px]">
            
            {/* Header map navigation bar */}
            <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md rounded-xl p-3 px-4 shadow-md max-w-xs border border-slate-200 flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-ping" />
              <div>
                <p className="font-sans font-extrabold text-xs text-slate-900 leading-none">Агентство услуг МИР</p>
                <span className="text-[10px] font-mono text-slate-400">д. 125, офис 2, Южно-Сахалинск</span>
              </div>
            </div>

            {/* Styled map representation using precise vector graphic illustration matching 2GIS UI */}
            <div className="flex-1 relative flex items-center justify-center bg-[#f4f3f0] select-none overflow-hidden">
              
              {/* Map grid pattern lines */}
              <div className="absolute inset-0 opacity-15" style={{
                backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`,
                backgroundSize: '24px 24px'
              }} />

              {/* Vector streets and buildings representing Lenin Street (улица Ленина) in Yuzhno-Sakhalinsk */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                
                {/* Background Roads / Streets layout */}
                <path d="M-100,240 L1000,240" stroke="#ffffff" strokeWidth="80" strokeLinecap="round" />
                <path d="M-100,240 L1000,240" stroke="#e2e8f0" strokeWidth="60" strokeLinecap="round" />
                <text x="80" y="246" className="fill-slate-400 text-[10px] font-mono font-bold uppercase tracking-widest leading-none">улица Ленина</text>

                {/* Vertical crossing street representation */}
                <path d="M 460,-100 L 460,800" stroke="#ffffff" strokeWidth="60" strokeLinecap="round" />
                <path d="M 460,-100 L 460,800" stroke="#e2e8f0" strokeWidth="46" strokeLinecap="round" />
                <text x="390" y="380" className="fill-slate-400 text-[10px] font-mono font-bold uppercase tracking-widest [writing-mode:vertical-rl] leading-none">улица Сахалинская</text>

                {/* Buildings around Lenin Street 125 */}
                
                {/* Administrative building postamt */}
                <rect x="80" y="40" width="160" height="110" rx="6" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                <text x="100" y="100" className="fill-slate-600 text-xs font-bold leading-none font-sans">Главпочтамт</text>

                {/* Nearby residential building */}
                <rect x="540" y="280" width="200" height="100" rx="6" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
                <text x="560" y="330" className="fill-slate-500 text-[10px] font-bold font-sans">Жилой квартал</text>

                {/* Target Building Lenina 125 */}
                <g className="cursor-pointer group">
                  <rect x="220" y="290" width="180" height="110" rx="10" fill="#047857" stroke="#065f46" strokeWidth="3" className="shadow-lg transition-transform hover:scale-[1.02]" />
                  <rect x="235" y="305" width="150" height="80" rx="6" fill="#065f46" />
                  
                  <text x="250" y="340" className="fill-white font-extrabold text-sm font-sans tracking-wide">ул. Ленина 125</text>
                  <text x="250" y="365" className="fill-[#34d399] font-mono text-[10px] font-bold uppercase tracking-wide">МИР • Офис №2</text>
                </g>

                {/* Stop bus stations */}
                <circle cx="210" cy="240" r="10" fill="#3b82f6" />
                <circle cx="210" cy="240" r="6" fill="#ffffff" />
                <text x="180" y="215" className="fill-blue-600 text-[9px] font-mono font-bold leading-none">Остановка</text>

              </svg>

              {/* Animated Map pin above our building */}
              <div className="absolute top-[320px] left-[300px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="p-3 bg-red-600 border-2 border-white text-white rounded-full shadow-lg animate-bounce duration-1000 flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <div className="w-4 h-1.5 bg-slate-900/20 rounded-full blur-xs mt-1 animate-pulse" />
              </div>

              {/* 2GIS styled interface controls overlay bottom right */}
              <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2 bg-white rounded-lg p-1.5 shadow-md border border-slate-200">
                <button
                  onClick={() => window.open(addressLink, '_blank')}
                  className="w-8 h-8 rounded-md bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 font-extrabold cursor-pointer"
                  title="Увеличить"
                >
                  +
                </button>
                <div className="h-px bg-slate-100 mx-1" />
                <button
                  onClick={() => window.open(addressLink, '_blank')}
                  className="w-8 h-8 rounded-md bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 font-extrabold cursor-pointer"
                  title="Уменьшить"
                >
                  −
                </button>
              </div>

            </div>

            {/* Bottom map metadata footer */}
            <div className="bg-slate-900 px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 shrink-0 rounded-b-3xl">
              <span className="font-mono">Координаты Сахалин: 46°57′28″ с. ш., 142°44′03″ в. д.</span>
              <a
                href={addressLink}
                target="_blank"
                rel="noreferrer"
                className="text-[#a7f3d0] hover:underline font-bold font-sans flex items-center gap-1.5"
              >
                <span>Изучить маршруты в системе 2ГИС</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
