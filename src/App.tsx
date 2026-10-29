import React, { useEffect } from 'react';
import { director } from './engine/director';
import { Stage } from './components/Stage';
import { Chrome } from './components/Chrome';
import { Hero } from './scenes/Hero';
import { About } from './scenes/About';
import { Projects } from './scenes/Projects';
import { Journey } from './scenes/Journey';
import { Resume } from './scenes/Resume';
import { Contact } from './scenes/Contact';

export const App: React.FC = () => {
  useEffect(() => {
    director.init();

    return () => {
      director.destroy();
    };
  }, []);

  return (
    <div className="relative w-full bg-white dark:bg-[#09090b] text-ink dark:text-[#f4f4f5] min-h-screen selection:bg-[#ff1f1f] selection:text-white transition-colors duration-300">
      {/* Global UI: Preloader, Navigation HUD, Scroll Rail, Custom Cursor (z50 / z99) */}
      <Chrome />

      {/* Canvas 2D Character Stage & Blade Transition (z10) */}
      <Stage />

      {/* Verified Coordinated Scenes with Sticky Viewports (z30) */}
      <main className="relative z-30">
        <Hero />
        <About />
        <Projects />
        <Journey />
        <Resume />
        <Contact />
      </main>
    </div>
  );
};

export default App;
