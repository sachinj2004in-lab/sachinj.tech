import React, { useEffect } from 'react';
import { director } from './engine/director';
import { Stage } from './components/Stage';
import { Chrome } from './components/Chrome';
import { Hero } from './scenes/Hero';
import { About } from './scenes/About';
import { Work } from './scenes/Work';
import { Journey } from './scenes/Journey';
import { Skills } from './scenes/Skills';
import { Awards } from './scenes/Awards';
import { Contact } from './scenes/Contact';

export const App: React.FC = () => {
  useEffect(() => {
    director.init();

    return () => {
      director.destroy();
    };
  }, []);

  return (
    <div className="relative w-full bg-paper text-ink min-h-screen selection:bg-[#ff1f1f] selection:text-white">
      {/* Global UI: Preloader, Navigation HUD, Scroll Rail, Custom Cursor (z50 / z99) */}
      <Chrome />

      {/* Canvas 2D Character Stage & Blade Transition (z10) */}
      <Stage />

      {/* 7 Coordinated Scenes with Sticky Viewports (z30) */}
      <main className="relative z-30">
        <Hero />
        <About />
        <Work />
        <Journey />
        <Skills />
        <Awards />
        <Contact />
      </main>
    </div>
  );
};

export default App;
