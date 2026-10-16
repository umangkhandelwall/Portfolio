import React, { useState, useEffect } from 'react';
import { BackgroundGrid } from './components/BackgroundGrid';
import { AmbientCanvas } from './components/AmbientCanvas';
import { Header } from './components/Header';
import { Minimap } from './components/Minimap';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Connect } from './components/Connect';
import { Footer } from './components/Footer';
import { AiAssistantModal } from './components/AiAssistantModal';
import { useBootSequence } from './hooks/useBootSequence';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [aiAssistantOpen, setAiAssistantOpen] = useState<boolean>(false);

  // Initialize synchronized multi-stage boot sequence
  useBootSequence();

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? Math.min(Math.max(window.scrollY / scrollHeight, 0), 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Intersection observer for sections
    const sectionIds = ['intro', 'skills', 'experience', 'projects', 'education', 'connect'];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="grain relative min-h-dvh overflow-x-hidden bg-[#020202] text-[#f2f2ef]">
      {/* Background Atmospheric Grid */}
      <BackgroundGrid />

      {/* Reactive Ambient Tracer Canvas */}
      <AmbientCanvas />

      {/* Top Fixed Header with System Online indicator and Scroll Progress Line */}
      <Header
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
      />

      {/* Minimap for Desktop and Mobile Navigation */}
      <Minimap activeSection={activeSection} />

      {/* Main Content Sections */}
      <main id="app-main" className="relative z-10">
        <Hero onOpenAiAssistant={() => setAiAssistantOpen(true)} />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Connect onOpenAiAssistant={() => setAiAssistantOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive AI Assistant Modal */}
      <AiAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />
    </div>
  );
};

export default App;
