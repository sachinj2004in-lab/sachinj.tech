import React, { useState } from 'react';
import { Cpu, Terminal, Radio, Zap, Code, HardDrive, BookOpen, CheckCircle, Sparkles } from 'lucide-react';
import { SkillItem } from '../types';

const skillsList: SkillItem[] = [
  {
    name: 'ESP32',
    category: 'Microcontrollers & Hardware',
    desc: 'Dual-core Xtensa 32-bit architecture with integrated Wi-Fi and Bluetooth. Hands-on experience deploying IoT nodes, HTTP/REST requests, and sensor streams.',
    badge: 'CORE PLATFORM',
  },
  {
    name: 'Arduino',
    category: 'Microcontrollers & Hardware',
    desc: 'ATmega328P / AVR microcontroller prototyping, digital and analog I/O pin mapping, serial debugging, and rapid peripheral proof-of-concept testing.',
    badge: 'HARDWARE PROTOTYPING',
  },
  {
    name: 'Microcontrollers',
    category: 'Microcontrollers & Hardware',
    desc: 'Architectural understanding of memory layouts (SRAM, Flash), clock sources, interrupt vectors, GPIO registers, and timer counters.',
    badge: 'SYSTEM ARCHITECTURE',
  },
  {
    name: 'Sensor Interfacing',
    category: 'Hardware Interfacing',
    desc: 'Interfacing analog and digital transducers including MQ-135 gas sensors, ultrasonic rangefinders, infrared proximity detectors, and temperature probes over I2C, SPI, and UART.',
    badge: 'SIGNAL ACQUISITION',
  },
  {
    name: 'Motor Control',
    category: 'Hardware Interfacing',
    desc: 'Configuring PWM signals for DC motor speed regulation, H-bridge driver integration (L298N), forward/reverse state logic, and mobile chassis kinematics.',
    badge: 'ACTUATION & PWM',
  },
  {
    name: 'C',
    category: 'Systems & Languages',
    desc: 'Strong procedural foundations, pointer arithmetic, memory management, bitwise operations, data structures, and deterministic logic execution.',
    badge: 'FOUNDATIONAL',
  },
  {
    name: 'Python',
    category: 'Systems & Languages',
    desc: 'Rapid automation scripts, serial communication handling (PySerial), speech recognition libraries, data logging, and edge assistance software.',
    badge: 'AUTOMATION & SCRIPTS',
  },
  {
    name: 'Embedded C',
    category: 'Systems & Languages',
    desc: 'Actively learning register-level hardware abstraction, bare-metal peripheral configuration, memory-mapped I/O registers, and interrupt service routines (ISR).',
    badge: 'LEARNING',
    status: 'In Active Study',
  },
];

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Microcontrollers & Hardware', 'Hardware Interfacing', 'Systems & Languages'];

  const filteredSkills =
    selectedCategory === 'ALL'
      ? skillsList
      : skillsList.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="relative py-28 overflow-hidden bg-neutral-50/50 dark:bg-neutral-950/40">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15 tech-grid-light dark:tech-grid-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF1F1F] mb-2 font-bold tracking-wider">
              <span>// 05. TECHNICAL CAPABILITIES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-neutral-950 dark:text-white">
              SKILLS & <span className="text-[#FF1F1F]">DOMAIN</span>
            </h2>
            <p className="text-sm font-sans text-neutral-600 dark:text-neutral-400 max-w-xl mt-3">
              Direct technical proficiencies spanning physical microcontrollers, communication protocols, actuation, and low-level code.
            </p>
          </div>

          <div className="text-right">
            <span className="font-display font-black text-6xl sm:text-8xl text-neutral-200 dark:text-neutral-800/80 leading-none select-none">
              05
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 font-bold shadow-sm'
                  : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
              }`}
            >
              {cat === 'ALL' ? 'ALL SKILLS' : cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill) => {
            const isLearning = skill.badge === 'LEARNING';
            return (
              <div
                key={skill.name}
                className={`relative rounded-xl border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg ${
                  isLearning
                    ? 'border-[#FF1F1F]/40 bg-white dark:bg-[#120F12] hover:border-[#FF1F1F]'
                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0F14] hover:border-neutral-400 dark:hover:border-neutral-700'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                      {skill.category.split('&')[0].trim()}
                    </span>

                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                        isLearning
                          ? 'bg-[#FF1F1F] text-white animate-pulse'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700'
                      }`}
                    >
                      {skill.badge}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <div>
                    <h3 className="text-2xl font-display font-bold text-neutral-950 dark:text-white flex items-center gap-2">
                      <span>{skill.name}</span>
                      {isLearning && (
                        <span className="text-xs font-mono font-medium text-[#FF1F1F]">
                          (Learning)
                        </span>
                      )}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                    {skill.desc}
                  </p>
                </div>

                {/* Micro Technical Details Bar */}
                <div className="pt-4 mt-6 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>VERIFIED APPLIED</span>
                  </span>
                  <span className="text-neutral-400">#HARDWARE</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Protocol & Logic Interfacing Specs */}
        <div className="mt-12 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60">
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 mb-4 uppercase tracking-wider">
            <Radio className="w-4 h-4 text-[#FF1F1F]" />
            <span>INTERFACE BUS SPECIFICATIONS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-3 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/50">
              <span className="text-neutral-400 block text-[10px]">I2C BUS</span>
              <span className="font-semibold text-neutral-900 dark:text-white">100kHz / 400kHz</span>
              <span className="text-[10px] text-neutral-500 block">LCD 16x2, Sensors</span>
            </div>
            <div className="p-3 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/50">
              <span className="text-neutral-400 block text-[10px]">UART SERIAL</span>
              <span className="font-semibold text-neutral-900 dark:text-white">9600 to 115200 Baud</span>
              <span className="text-[10px] text-neutral-500 block">Debug, Telemetry</span>
            </div>
            <div className="p-3 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/50">
              <span className="text-neutral-400 block text-[10px]">ADC SAMPLING</span>
              <span className="font-semibold text-neutral-900 dark:text-white">12-bit / 10-bit</span>
              <span className="text-[10px] text-neutral-500 block">MQ-135 Gas Sensors</span>
            </div>
            <div className="p-3 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/50">
              <span className="text-neutral-400 block text-[10px]">PWM CHANNELS</span>
              <span className="font-semibold text-neutral-900 dark:text-white">Hardware Timers</span>
              <span className="text-[10px] text-neutral-500 block">DC Motor Speed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
