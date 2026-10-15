import React, { useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight, Bot, Mic, Radio, Wind, Activity } from 'lucide-react';
import { CharacterVideo } from './CharacterVideo';

interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string };
  cardType: 'robot' | 'jarvis' | 'drone' | 'iot';
}

const projects: Project[] = [
  {
    id: 'road-cleaning-robot',
    number: '01 / 04',
    title: 'AUTONOMOUS ROAD-CLEANING ROBOT',
    category: 'AUTONOMOUS ROBOTICS & MOTOR CONTROL',
    description:
      'An automated debris-clearance chassis engineered for autonomous path traversal and surface sweeping. Integrates ultrasonic proximity arrays for obstacle navigation coupled with dual H-bridge motor driver circuits running real-time non-blocking state machine firmware.',
    tags: ['Embedded C', 'Motor Control (L298N)', 'Sensor Interfacing', 'State Machine'],
    metrics: { label: 'SWEEP EFFICIENCY', value: '88%' },
    cardType: 'robot',
  },
  {
    id: 'jarvis-ai-assistant',
    number: '02 / 04',
    title: 'J.A.R.V.I.S PERSONAL AI ASSISTANT',
    category: 'EDGE AI & SYSTEM AUTOMATION',
    description:
      'A voice-driven intelligent system designed for automated workflow processing and hardware telemetry. Written in Python to decode natural speech commands, trigger local execution scripts, and communicate directly with peripheral microcontrollers over serial UART.',
    tags: ['Python', 'Speech Recognition', 'Hardware Automation', 'PySerial UART'],
    metrics: { label: 'NLP RESPONSE', value: '94%' },
    cardType: 'jarvis',
  },
  {
    id: 'ai-assisted-drone',
    number: '03 / 04',
    title: 'AI-ASSISTED DRONE SYSTEM',
    category: 'AERONAUTICAL TELEMETRY & STABILITY',
    description:
      'An unmanned aerial prototype focusing on multi-sensor telemetry streaming, flight stability assistance, and wireless telemetry communication. Processes 6-axis IMU orientation vectors to assist aerial navigation and prevent loss-of-signal drift.',
    tags: ['Flight Dynamics', 'Sensor Interfacing', 'Python Telemetry', 'RF Link'],
    metrics: { label: 'STABILITY LOCK', value: '96%' },
    cardType: 'drone',
  },
  {
    id: 'iot-air-quality',
    number: '04 / 04',
    title: 'IOT AIR-QUALITY MONITORING',
    category: 'ENVIRONMENTAL SENSING & CLOUD IOT',
    description:
      'A real-time atmospheric sensing station powered by an ESP32 microcontroller. Samples hazardous gas concentrations with an MQ-135 sensor, displays instant telemetry on a 16x2 I2C LCD, and streams telemetry feeds to the ThingSpeak cloud channel via Wi-Fi.',
    tags: ['ESP32', 'MQ-135 Gas Sensor', '16x2 I2C LCD', 'ThingSpeak Cloud API'],
    metrics: { label: 'CLOUD UPTIME', value: '99%' },
    cardType: 'iot',
  },
];

export const Projects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProject = projects[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="relative py-28 overflow-hidden bg-white dark:bg-[#09090B] border-t border-neutral-100 dark:border-neutral-900">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="font-mono text-xs text-neutral-500 tracking-wider">
            <span>[ 03 — SELECTED WORK ]</span>
          </div>

          <div className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white">
            {currentProject.number}
          </div>
        </div>

        {/* 3-Column Split: Details on Left | Red UI Card in Center | Sachin on Laptop on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[520px]">
          
          {/* Left Column: Project Typography & Links (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="font-mono text-xs text-[#FF1F1F] font-bold tracking-wider uppercase">
              {currentProject.category}
            </div>

            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-neutral-950 dark:text-white uppercase leading-[0.92] tracking-tight">
              {currentProject.title}
            </h3>

            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
              {currentProject.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {currentProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://github.com/sachin2004-roxx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#FF1F1F] text-white hover:bg-[#E01616] transition-all shadow-md shadow-red-500/20 active:scale-95"
              >
                <span>View on GitHub</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white text-neutral-800 dark:text-neutral-200 transition-colors"
                  aria-label="Previous Project"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white text-neutral-800 dark:text-neutral-200 transition-colors"
                  aria-label="Next Project"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Center Column: The Signature Red UI Device Card matching reference (3 cols) */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="w-full max-w-xs rounded-3xl bg-[#FF1F1F] text-white p-6 shadow-2xl shadow-red-600/30 flex flex-col justify-between aspect-[3/4] relative overflow-hidden transition-all duration-500 transform hover:scale-[1.02]">
              
              {/* Background Geometric Rings */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-white/20 pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full border border-white/10 pointer-events-none" />

              {/* Top of Red Card */}
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-white/80 z-10">
                <span>{currentProject.cardType.toUpperCase()} // SYS</span>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>

              {/* Center Visualization of Red Card */}
              <div className="my-auto text-center space-y-3 z-10">
                {currentProject.cardType === 'robot' && (
                  <div className="space-y-2">
                    <div className="w-20 h-20 mx-auto rounded-full border-4 border-white flex items-center justify-center font-display font-black text-3xl">
                      88
                    </div>
                    <div className="font-mono text-xs uppercase tracking-wider text-white/90">
                      SWEEP MATRIX READY
                    </div>
                    <div className="text-[10px] font-mono text-white/70">
                      PWM MOTOR DRIVE: ACTIVE
                    </div>
                  </div>
                )}

                {currentProject.cardType === 'jarvis' && (
                  <div className="space-y-2">
                    <div className="flex justify-center items-center gap-1.5 h-16">
                      {[40, 70, 95, 60, 85, 45, 90, 30].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className="w-2 bg-white rounded-full animate-pulse"
                        />
                      ))}
                    </div>
                    <div className="font-mono text-xs uppercase tracking-wider text-white/90">
                      VOICE ENGINE ONLINE
                    </div>
                    <div className="text-[10px] font-mono text-white/70">
                      SPEECH_TO_TEXT: LISTENING
                    </div>
                  </div>
                )}

                {currentProject.cardType === 'drone' && (
                  <div className="space-y-2">
                    <div className="w-20 h-20 mx-auto rounded-2xl border-2 border-dashed border-white/70 flex items-center justify-center font-display font-black text-2xl">
                      IMU 6X
                    </div>
                    <div className="font-mono text-xs uppercase tracking-wider text-white/90">
                      FLIGHT TELEMETRY
                    </div>
                    <div className="text-[10px] font-mono text-white/70">
                      PITCH: +1.2° | ROLL: -0.4°
                    </div>
                  </div>
                )}

                {currentProject.cardType === 'iot' && (
                  <div className="space-y-2">
                    <div className="w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center font-display font-black text-3xl">
                      142
                    </div>
                    <div className="font-mono text-xs uppercase tracking-wider text-white/90">
                      MQ-135 AIR QUALITY
                    </div>
                    <div className="text-[10px] font-mono text-white/70">
                      THINGSPEAK STREAM: OK
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom of Red Card */}
              <div className="pt-4 border-t border-white/20 flex items-center justify-between text-[11px] font-mono z-10">
                <span className="text-white/80">IN PROGRESS</span>
                <span className="font-bold">PROTOTYPE V1</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sachin seated at desk typing on his laptop (4 cols) */}
          <div className="lg:col-span-4 relative flex items-center justify-center">
            <div className="w-full max-w-sm aspect-[4/5] flex items-center justify-center">
              <CharacterVideo
                segment="projects"
                className="w-full h-full"
              />
            </div>
          </div>

        </div>

        {/* Project Selector Pagination Dots matching reference */}
        <div className="flex justify-center items-center gap-3 pt-10">
          {projects.map((p, index) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'w-8 bg-[#FF1F1F]'
                  : 'w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'
              }`}
              aria-label={`Select Project ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
