import React from 'react';
import { Cpu, Activity, Zap, Compass, Binary, Radio, HardDrive, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15 tech-grid-light dark:tech-grid-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Oversized Section Number */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF1F1F] mb-2 font-bold tracking-wider">
              <span>// 02. SPECIFICATION</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-neutral-950 dark:text-white">
              ENGINEERING <span className="text-[#FF1F1F]">ETHOS</span>
            </h2>
          </div>

          <div className="text-right">
            <span className="font-display font-black text-6xl sm:text-8xl text-neutral-200 dark:text-neutral-800/80 leading-none select-none">
              02
            </span>
          </div>
        </div>

        {/* Narrative & Engineering Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800 font-mono text-xs text-neutral-500">
                <span>IDENTITY CARD</span>
                <span className="text-[#FF1F1F]">ACTIVE CANDIDATE</span>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold font-display text-neutral-950 dark:text-white">
                  Sachin J
                </div>
                <div className="text-sm font-mono text-[#FF1F1F] font-semibold">
                  Aspiring Embedded Software Engineer
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono leading-relaxed pt-1">
                  Electronics and Communication Engineering student at Kumaraguru College of Technology, Coimbatore.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] font-mono">
                <div>
                  <span className="text-neutral-400 block">BASE</span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-medium">Coimbatore, India</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">STATUS</span>
                  <span className="text-emerald-500 font-medium">Undergraduate ('22–'26)</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/30 font-mono text-xs text-neutral-600 dark:text-neutral-400 space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#FF1F1F]" />
                <span>VERIFIED FOCUS AREA</span>
              </div>
              <p className="leading-relaxed">
                Firmware development, sensor calibration, real-time actuator control, and IoT integration. Dedicated to building efficient, fail-safe code that performs reliably under physical constraints.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
              Bridging bare-metal hardware with deterministic software logic.
            </h3>
            
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans font-light">
              As an aspiring Embedded Software Engineer, I am fascinated by how silicon communicates with the physical environment. Whether it’s sampling hazardous gas concentrations with an MQ-135, directing high-torque DC motors through H-bridge driver logic, or parsing telemetry streams across wireless links, I approach engineering with a focus on predictability, low latency, and clean architecture.
            </p>

            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
              Currently advancing my hands-on expertise in microcontroller programming (ESP32, Arduino, AVR) and low-level C programming, while building practical autonomous systems that solve concrete operational challenges.
            </p>

            {/* Core Competencies Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 space-y-2">
                <div className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[#FF1F1F]">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="font-mono text-xs font-bold text-neutral-900 dark:text-white">
                  MICROCONTROLLERS
                </div>
                <p className="text-[11px] text-neutral-500 font-mono leading-relaxed">
                  ESP32 Xtensa 32-bit & ATmega328P architectures with GPIO, timers, and interrupts.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 space-y-2">
                <div className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[#FF1F1F]">
                  <Radio className="w-4 h-4" />
                </div>
                <div className="font-mono text-xs font-bold text-neutral-900 dark:text-white">
                  SENSOR INTERFACING
                </div>
                <p className="text-[11px] text-neutral-500 font-mono leading-relaxed">
                  Analog & digital acquisition via I2C, SPI, UART, and ADC conversion channels.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 space-y-2">
                <div className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[#FF1F1F]">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="font-mono text-xs font-bold text-neutral-900 dark:text-white">
                  MOTOR & ACTUATORS
                </div>
                <p className="text-[11px] text-neutral-500 font-mono leading-relaxed">
                  PWM frequency generation, H-bridge DC motor control, and robotic mobility states.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specification Banner */}
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs">
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-1">
                01 // PROTOCOLS
              </span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                UART · I2C · SPI · PWM
              </span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-1">
                02 // PROGRAMMING
              </span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                C · Python · Embedded C
              </span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-1">
                03 // HARDWARE
              </span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                ESP32 · Arduino · MQ Sensors
              </span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-1">
                04 // METHODOLOGY
              </span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                State Machines · IoT Cloud
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
