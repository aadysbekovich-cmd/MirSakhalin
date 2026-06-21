import { useState, useEffect, useRef } from 'react';
import { SupportedLanguage, Citizenship, ChatMessage } from '../types';
import { translations, languageNames } from '../translations';
import { Send, Loader2, Sparkles, AlertCircle, RefreshCw, Languages, MessagesSquare } from 'lucide-react';

interface ChatbotProps {
  currentLang: SupportedLanguage;
}

export default function Chatbot({ currentLang }: ChatbotProps) {
  const t = translations[currentLang];

  const [chatLang, setChatLang] = useState<SupportedLanguage>(currentLang);
  const [citizenship, setCitizenship] = useState<Citizenship>('uzbekistan');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync chatbot language with global site language when first loaded
  useEffect(() => {
    setChatLang(currentLang);
  }, [currentLang]);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mir_chat_history');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        setMessages(defaultWelcomeMessage());
      }
    } else {
      setMessages(defaultWelcomeMessage());
    }
  }, [chatLang]);

  const defaultWelcomeMessage = (): ChatMessage[] => {
    return [
      {
        id: 'welcome',
        sender: 'bot',
        text: translations[chatLang]?.chat_welcome || translations['ru']?.chat_welcome,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      }
    ];
  };

  // Save history on updates
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('mir_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || userInput;
    if (!text.trim() || loading) return;

    if (!textToSend) {
      setUserInput('');
    }

    const currentTimestamp = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text,
      timestamp: currentTimestamp,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language: chatLang,
          citizenship,
          history: updatedMessages.slice(-5) // Send last 5 matches to retain system memory
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка связи с консультационным шлюзом.');
      }

      const data = await response.json();
      
      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'bot',
        text: data.text,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'bot',
          text: currentLang === 'ru' 
            ? "Внимание: В данный момент шлюз перегружен. Пожалуйста, посетите наш офис на ул. Ленина, д. 125, офис 2 или позвоните по телефону +7 (984) 184-80-08 для прямой консультации с юристом."
            : "Xatolik: Aloqa uzildi. Iltimos tel orqali bog'laning: +7 (984) 184-80-08.",
          timestamp: currentTimestamp,
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('mir_chat_history');
    setMessages(defaultWelcomeMessage());
  };

  // Customized, clickable rapid test queries
  const suggestions: Record<SupportedLanguage, string[]> = {
    ru: [
      "Как оформить патент в Южно-Сахалинске?",
      "Привилегии граждан Кыргызстана (ЕАЭС)?",
      "Что делать, если пропустил уплату патента?",
    ],
    uz: [
      "Yujno-Saxalinskda patent qanday olinadi?",
      "Patent to'lovini kechiktirsam nima bo'ladi?",
      "Hujjatlarni tarjima qilish qancha turadi?",
    ],
    kg: [
      "Кыргызстандыктар учун кандай женилдиктер бар?",
      "Патент алуунун мөөнөтү канча күн?",
      "Юристтин консультациясы бекерби?",
    ],
    tj: [
      "Чӣ тавр дар Южно-Сахалинск патент гирам?",
      "Агар пардохти патент дер шавад чи мешавад?",
      "Тарҷумаи ҳуҷҷатҳо дар куҷост?",
    ],
    kz: [
      "Қазақстан азаматтарына патент керек пе?",
      "ЕМС полисін қалай алуға болады?",
      "Сотта құқықты қорғауға көмектесесіз бе?",
    ],
    az: [
      "Yujno-Saxalinskdə necə patent almaq olar?",
      "Miqrasiya qeydiyyatı nə qədər vaxt aparır?",
      "Sənədlərin notarial tərcüməsi lazımdır?",
    ],
    hy: [
      "Ինչպե՞ս ձևակերպել պատենտ Սախալինում:",
      "ԵԱՏՄ քաղաքացիների առավելություններն ի՞նչ են:",
      "Դատարանում իրավունքների պաշտպանություն կա՞:",
    ]
  };

  const currentSuggestions = suggestions[chatLang] || suggestions['ru'];

  return (
    <section id="chat_section" className="py-16 bg-slate-100/40 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
            <MessagesSquare size={28} className="text-emerald-600 animate-bounce" />
            <span>{t.chat_title}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
            Наш виртуальный юрист-консультант работает на базе искусственного интеллекта. Он знает кодекс миграционного права 115-ФЗ и проконсультирует вас за 3 секунды!
          </p>
        </div>

        {/* Major Grid Container */}
        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* Left Block: Chat settings panel */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5 shadow-xs">
            <h3 className="font-sans font-extrabold text-slate-900 text-sm tracking-wide uppercase flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <Sparkles size={16} className="text-emerald-600" />
              <span>Параметры диалога</span>
            </h3>

            {/* Chatbot Language switcher */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 font-mono uppercase tracking-wider flex items-center gap-1">
                <Languages size={13} className="text-slate-400" />
                <span>Язык ИИ-консультации</span>
              </label>
              <select
                value={chatLang}
                onChange={(e) => setChatLang(e.target.value as SupportedLanguage)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-emerald-600"
              >
                {Object.entries(languageNames).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>

            {/* User citizenship state */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 font-mono uppercase tracking-wider block">
                Ваше Гражданство
              </label>
              <select
                value={citizenship}
                onChange={(e) => setCitizenship(e.target.value as Citizenship)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-emerald-600"
              >
                <option value="uzbekistan">Узбекистан</option>
                <option value="kyrgyzstan">Кыргызстан</option>
                <option value="tajikistan">Таджикистан</option>
                <option value="kazakhstan">Казахстан</option>
                <option value="azerbaijan">Азербайджан</option>
                <option value="armenia">Армения</option>
              </select>
            </div>

            {/* Clean history action button */}
            <button
              onClick={clearHistory}
              className="w-full inline-flex justify-center items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs py-2 rounded-lg border border-slate-200 transition-colors cursor-pointer font-semibold"
            >
              <RefreshCw size={12} />
              <span>Очистить историю чата</span>
            </button>

            {/* Physical address reminder callout */}
            <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-100 text-[11px] text-emerald-900 font-sans space-y-1.5 leading-relaxed">
              <span className="font-extrabold text-[12px] block text-emerald-950">📍 Нужен оригинал документа или печать?</span>
              <p>Ждем вас по адресу: <strong>г. Южно-Сахалинск, ул. Ленина, д. 125, офис 2</strong>.</p>
              <p>Телефон для записи: <strong>+7 (984) 184-80-08</strong></p>
            </div>
          </div>

          {/* Right Block: Message Log window */}
          <div className="lg:col-span-8 flex flex-col h-[520px] bg-white border border-slate-250/80 rounded-2xl overflow-hidden shadow-xs">
            
            {/* Header chat log info */}
            <div className="bg-slate-900 text-white p-4 px-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Дежурный Юрист МИР (ИИ)</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                SSL Защищено • Южно-Сахалинск
              </span>
            </div>

            {/* Chat Body messages list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-4 font-sans text-sm shadow-2xs relative ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-2xs'
                      : 'bg-white text-slate-900 rounded-bl-2xs border border-slate-100'
                  }`}>
                    
                    {/* Render message formatting breaks using simple white-space wrap */}
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {msg.text}
                    </div>

                    <span className={`text-[9px] block text-right font-mono mt-1.5 ${
                      msg.sender === 'user' ? 'text-emerald-250' : 'text-slate-400'
                    }`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-2xs p-4 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-emerald-600" />
                    <span className="text-xs font-mono text-slate-400 animate-pulse">Юрист печатает ответ...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Clickable quick suggestions bottom banner */}
            {messages.length <= 1 && (
              <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex flex-wrap gap-2 items-center shrink-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mr-1 font-mono">Частые вопросы:</span>
                {currentSuggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(sug)}
                    className="bg-white hover:bg-slate-100 text-[11px] font-medium text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer text-left leading-tight"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Form Input controls */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="p-4 bg-white border-t border-slate-150 flex gap-2.5 items-center shrink-0"
            >
              <input
                type="text"
                placeholder={t.chat_placeholder}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-emerald-600 font-sans"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !userInput.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-100 disabled:text-slate-400 text-white p-3.5 rounded-xl flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <Send size={16} />
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
