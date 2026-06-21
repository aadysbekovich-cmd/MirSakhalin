import { useState } from 'react';
import { MessageCircle, Send, Bot, MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FloatingMessengers() {
  const [isOpen, setIsOpen] = useState(false);

  // Quick Action triggers
  const handleMaxClick = () => {
    const el = document.getElementById('chat_section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Highlight & focus chat inputs
      setTimeout(() => {
        const input = el.querySelector('textarea, input[type="text"]');
        if (input instanceof HTMLElement) input.focus();
      }, 500);
    }
    setIsOpen(false);
  };

  const messengers = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      href: 'https://wa.me/79841848008',
      icon: <MessageCircle size={18} />,
      bgColor: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white border-green-400/40',
      tooltip: 'Чат в WhatsApp',
    },
    {
      id: 'telegram',
      name: 'Telegram',
      href: 'https://t.me/mir_agency_sakhalin',
      icon: <Send size={16} />,
      bgColor: 'bg-sky-500 hover:bg-sky-600',
      textColor: 'text-white border-sky-400/40',
      tooltip: 'Чат в Telegram',
    },
    {
      id: 'max',
      name: 'Ассистент МАХ',
      onClick: handleMaxClick,
      icon: <Bot size={18} className="text-amber-300" />,
      bgColor: 'bg-indigo-950 hover:bg-indigo-900 border border-amber-500/30',
      textColor: 'text-amber-200',
      tooltip: 'МАХ AI-Ассистент',
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans flex flex-col items-end gap-3.5" id="floating_messengers_container">
      
      {/* Expanded quick items */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end gap-3.5 mb-1 bg-slate-900/95 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-slate-800">
            <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase pr-1">Быстрая связь:</span>
            {messengers.map((m, index) => {
              const content = (
                <div className="flex items-center gap-3 group/item select-none">
                  {/* Tooltip / label */}
                  <span className="opacity-90 group-hover/item:opacity-100 text-[11px] font-bold font-mono tracking-wide px-2.5 py-1 bg-slate-800 text-slate-200 rounded-lg border border-slate-750 shadow-xs whitespace-nowrap">
                    {m.name}
                  </span>
                  
                  {/* Circle Action Button */}
                  <div className={`w-10 h-10 rounded-xl ${m.bgColor} ${m.textColor} flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 border border-white/10 shrink-0`}>
                    {m.icon}
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.9 }}
                  transition={{ delay: index * 0.04, duration: 0.15 }}
                >
                  {m.href ? (
                    <a href={m.href} target="_blank" rel="noreferrer" className="block cursor-pointer">
                      {content}
                    </a>
                  ) : (
                    <button onClick={m.onClick} className="block w-full text-left bg-transparent border-0 p-0 cursor-pointer focus:outline-hidden">
                      {content}
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Main Trigger Toggle Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-500/10 cursor-pointer focus:outline-hidden border select-none transition-colors duration-300 ${
          isOpen 
            ? 'bg-rose-600 hover:bg-rose-700 border-rose-500/40 rotate-90' 
            : 'bg-emerald-600 hover:bg-emerald-750 border-emerald-500/40 hover:scale-105'
        }`}
        whileTap={{ scale: 0.95 }}
        title="Связаться с нами"
        id="floating_messenger_trigger"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <div className="relative">
            <MessageSquare size={26} />
            {/* Small attention badge */}
            <span className="absolute -top-1 -right-1 block w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <span className="absolute -top-1 -right-1 block w-2.5 h-2.5 rounded-full bg-amber-500" />
          </div>
        )}
      </motion.button>

    </div>
  );
}
