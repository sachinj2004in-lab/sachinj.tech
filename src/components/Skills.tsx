import React from 'react';
import { CharacterVideo } from './CharacterVideo';

const skills = [
  { name: 'ESP32', pos: 'top-8 left-4 sm:top-12 sm:left-12', badge: 'Xtensa Dual-Core' },
  { name: 'Arduino', pos: 'top-10 right-4 sm:top-16 sm:right-16', badge: 'AVR / ATmega' },
  { name: 'Microcontrollers', pos: 'top-1/3 -left-2 sm:left-6', badge: 'Architecture & Timers' },
  { name: 'Sensor Interfacing', pos: 'top-1/3 -right-2 sm:right-6', badge: 'I2C / SPI / ADC' },
  { name: 'Motor Control', pos: 'bottom-24 left-2 sm:bottom-28 sm:left-14', badge: 'PWM & H-Bridge' },
  { name: 'C', pos: 'bottom-20 right-4 sm:bottom-24 sm:right-16', badge: 'Firmware Logic' },
  { name: 'Python', pos: 'top-0 left-1/2 -translate-x-1/2', badge: 'Automation & Serial' },
  { name: 'Embedded C', isLearning: true, pos: 'bottom-4 left-1/2 -translate-x-1/2', badge: 'Learning' },
];

export const Skills: React.FC = () => {
  const tickerItems = [
    'ESP32',
    'ARDUINO',
    'EMBEDDED C',
    'MOTOR CONTROL',
    'SENSOR INTERFACING',
    'C',
    'PYTHON',
    'UART',
    'I2C',
    'SPI',
    'PWM FREQUENCY',
    'THINGSPEAK IOT',
    'ADC CONVERSION',
  ];

  return (
    <section id="skills" className="relative py-28 overflow-hidden bg-white dark:bg-[#09090B] border-t border-neutral-100 dark:border-neutral-900">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference */}
        <div className="text-center space-y-2 mb-12">
          <div className="font-mono text-xs text-neutral-500 tracking-wider">
            <span>[ 05 — SKILLS ]</span>
          </div>

          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold uppercase tracking-tight text-neutral-950 dark:text-white leading-none">
            EVERYTHING <span className="text-[#FF1F1F]">IN ORBIT.</span>
          </h2>
          <p className="text-xs sm:text-sm font-sans text-neutral-500 dark:text-neutral-400">
            Core engineering competencies connecting silicon logic to physical hardware.
          </p>
        </div>

        {/* Orbit Stage: Character in Center + Radiating Skill Pills with Red Pin Lines */}
        <div className="relative max-w-4xl mx-auto min-h-[500px] sm:min-h-[580px] flex items-center justify-center">
          
          {/* Subtle Concentric Orbit Rings in Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[300px] sm:w-[460px] h-[300px] sm:h-[460px] rounded-full border border-neutral-200/80 dark:border-neutral-800/80 border-dashed animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[200px] sm:w-[320px] h-[200px] sm:h-[320px] rounded-full border border-red-500/10 dark:border-red-500/20" />
          </div>

          {/* Center Character Video */}
          <div className="relative z-10 w-full max-w-xs sm:max-w-sm aspect-[4/5] flex items-center justify-center">
            <CharacterVideo
              segment="skills"
              className="w-full h-full"
            />
          </div>

          {/* Floating Skill Badges with Red Pin Indicators */}
          {skills.map((skill) => (
            <div
              key={skill.name}
              className={`absolute z-20 ${skill.pos} transition-transform hover:scale-110 duration-200`}
            >
              <div
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg backdrop-blur-md border ${
                  skill.isLearning
                    ? 'bg-[#FF1F1F] text-white border-red-600 font-bold shadow-red-500/30'
                    : 'bg-white/95 dark:bg-neutral-900/95 text-neutral-900 dark:text-white border-neutral-200 dark:border-neutral-800'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${skill.isLearning ? 'bg-white animate-ping' : 'bg-[#FF1F1F]'}`} />
                <span className="font-display text-sm sm:text-base font-bold tracking-tight">
                  {skill.name}
                </span>
                {skill.isLearning ? (
                  <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded-full uppercase">
                    Learning
                  </span>
                ) : (
                  <span className="hidden sm:inline text-[10px] font-mono text-neutral-400">
                    {skill.badge}
                  </span>
                )}
              </div>
            </div>
          ))}

        </div>

        {/* Continuous Animated Marquee Ticker matching 00:11 of reference video */}
        <div className="mt-14 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden border-y border-neutral-200 dark:border-neutral-800 py-3 bg-neutral-50 dark:bg-neutral-900/50">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-6 font-display text-lg sm:text-2xl font-black uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="flex items-center gap-6">
                <span className="text-[#FF1F1F]">+</span>
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
