import { useState } from 'react';
import { SupportedLanguage } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import StatusChecker from './components/StatusChecker';
import MvdChecker from './components/MvdChecker';
import InnSnilsChecker from './components/InnSnilsChecker';
import Chatbot from './components/Chatbot';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import FloatingMessengers from './components/FloatingMessengers';

export default function App() {
  const [currentLang, setLang] = useState<SupportedLanguage>('ru');
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToElement = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between scroll-smooth selection:bg-emerald-100 selection:text-emerald-900" id="main_root">
      
      {/* Structural navigation header */}
      <Header
        currentLang={currentLang}
        setLang={setLang}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main content blocks */}
      <main className="flex-1">
        
        {/* Hero slider section */}
        <Hero
          currentLang={currentLang}
          onStartCalc={() => scrollToElement('calc')}
          onOpenChat={() => scrollToElement('chat_section')}
        />
        
        {/* Core services description overview Cards */}
        <Services currentLang={currentLang} />
        
        {/* Legal status 115-FZ verification checker tool */}
        <StatusChecker currentLang={currentLang} />
        
        {/* Document tabbed validators: Patent Status and MVD Control checks */}
        <MvdChecker currentLang={currentLang} />
        
        {/* State organizations verification tools: INN + SNILS */}
        <InnSnilsChecker currentLang={currentLang} />
        
        {/* Multilingual AI-assistant Chatbot with local storage history */}
        <Chatbot currentLang={currentLang} />
        
        {/* Interactive vector 2GIS mapping block */}
        <MapSection currentLang={currentLang} />

      </main>

      {/* Structured footer credits */}
      <Footer currentLang={currentLang} setLang={setLang} />

      {/* Floating active messengers quick panel */}
      <FloatingMessengers />

    </div>
  );
}
