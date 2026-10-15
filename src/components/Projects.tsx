import React from 'react';
import { ProjectItem } from '../types';
import { ArrowUpRight, Cpu, Radio, Bot, Mic, Wind, ShieldAlert } from 'lucide-react';

const projectsData: ProjectItem[] = [
  {
    id: 'road-cleaning-robot',
    title: 'Autonomous Road-Cleaning Robot',
    category: 'Autonomous Robotics & Actuation',
    status: 'In Progress',
    description:
      'An automated surface-cleaning robotic platform designed for autonomous path traversal and debris clearing. Incorporates ultrasonic and infrared sensor arrays for obstacle avoidance, coupled with dual H-bridge motor driver circuits running real-time state machine firmware.',
    tags: ['Embedded C', 'Motor Control', 'Sensor Interfacing', 'State Machine', 'Arduino / AVR'],
    specs: [
      { label: 'Firmware Logic', value: 'Non-blocking State Machine' },
      { label: 'Actuation', value: 'High-torque DC Motors + Sweep Mechanism' },
      { label: 'Obstacle Detection', value: 'Ultrasonic Array + IR Fallback' },
    ],
    diagramType: 'robot',
  },
  {
    id: 'jarvis-ai-assistant',
    title: 'J.A.R.V.I.S Personal AI Assistant',
    category: 'Edge AI & Automated Systems',
    status: 'In Progress',
    description:
      'A voice-driven intelligent system designed for desktop workflow automation and peripheral hardware telemetry. Built with Python to process natural speech commands, execute script routines, and communicate with external edge hardware controllers.',
    tags: ['Python', 'Speech Recognition', 'Automation', 'Serial Communication'],
    specs: [
      { label: 'Core Language', value: 'Python 3.x' },
      { label: 'Audio Engine', value: 'Speech Recognition & TTS Synthesis' },
      { label: 'Hardware Interlink', value: 'PySerial Telemetry Dispatcher' },
    ],
    diagramType: 'jarvis',
  },
  {
    id: 'ai-assisted-drone',
    title: 'AI-Assisted Drone System',
    category: 'Aeronautical Telemetry & Control',
    status: 'In Progress',
    description:
      'An unmanned aerial vehicle prototype focusing on sensor telemetry integration, flight stabilization assistance, and telemetry communication. Designed to monitor IMU orientation data and assist flight maneuvers via Python-assisted ground processing.',
    tags: ['Flight Dynamics', 'Sensor Interfacing', 'Python', 'Telemetry Processing'],
    specs: [
      { label: 'Telemetry Stream', value: 'IMU / Gyroscope / Accelerometer' },
      { label: 'Signal Protocol', value: 'RF Serial Link / Wireless MavLink' },
      { label: 'Assistance Model', value: 'Stability Vector Logic' },
    ],
    diagramType: 'drone',
  },
  {
    id: 'iot-air-quality',
    title: 'IoT Air-Quality Monitoring System',
    category: 'Environmental Sensing & Cloud IoT',
    status: 'In Progress',
    description:
      'A real-time atmospheric sensing station powered by an ESP32 microcontroller. Continuously samples hazardous particulate and gas concentrations via an MQ-135 sensor, presents instant readings on a 16x2 I2C LCD, and dispatches data streams over Wi-Fi to the ThingSpeak cloud analytics platform.',
    tags: ['ESP32', 'MQ-135 Gas Sensor', '16x2 LCD (I2C)', 'ThingSpeak IoT', 'Wi-Fi HTTP API'],
    specs: [
      { label: 'Processing Core', value: 'ESP32 Dual-Core (Wi-Fi Enabled)' },
      { label: 'Sensing Element', value: 'MQ-135 Hazardous Gas Transducer' },
      { label: 'Cloud Pipeline', value: 'ThingSpeak RESTful IoT Feed' },
    ],
    diagramType: 'iot',
  },
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-28 overflow-hidden bg-neutral-50/50 dark:bg-neutral-950/40">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15 tech-grid-light dark:tech-grid-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF1F1F] mb-2 font-bold tracking-wider">
              <span>// 03. ENGINEERING REPOSITORY</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-neutral-950 dark:text-white">
              PROJECT <span className="text-[#FF1F1F]">PORTFOLIO</span>
            </h2>
            <p className="text-sm font-sans text-neutral-600 dark:text-neutral-400 max-w-xl mt-3">
              Four verified embedded hardware and intelligent automation systems currently in active development.
            </p>
          </div>

          <div className="text-right">
            <span className="font-display font-black text-6xl sm:text-8xl text-neutral-200 dark:text-neutral-800/80 leading-none select-none">
              03
            </span>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0F14] overflow-hidden transition-all duration-300 hover:border-neutral-400 dark:hover:border-neutral-700 hover:shadow-xl flex flex-col justify-between"
            >
              {/* Card Technical Header */}
              <div className="p-6 pb-4 border-b border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-neutral-400 dark:text-neutral-500">
                    0{index + 1} //
                  </span>
                  <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                {/* In Progress Status Badge */}
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>{project.status}</span>
                </div>
              </div>

              {/* Technical Schematic Illustration */}
              <div className="relative h-48 bg-neutral-100 dark:bg-neutral-900/60 border-b border-neutral-100 dark:border-neutral-800/80 p-4 flex items-center justify-center overflow-hidden">
                {/* Schematic Background Matrix */}
                <div className="absolute inset-0 opacity-20 pointer-events-none tech-grid-light dark:tech-grid-dark" />

                {project.diagramType === 'robot' && (
                  <div className="w-full max-w-xs space-y-3 font-mono text-[10px] text-neutral-500">
                    <div className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-3 bg-white/80 dark:bg-neutral-900/80 space-y-2">
                      <div className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <Bot className="w-3.5 h-3.5 text-[#FF1F1F]" />
                          CHASSIS // DUAL-MOTOR CONTROLLER
                        </span>
                        <span className="text-[#FF1F1F]">ACTIVE</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="p-1 rounded bg-neutral-100 dark:bg-neutral-800 text-center">
                          LEFT WHEEL: PWM 65%
                        </div>
                        <div className="p-1 rounded bg-neutral-100 dark:bg-neutral-800 text-center">
                          RIGHT WHEEL: PWM 65%
                        </div>
                      </div>
                      <div className="flex justify-between text-neutral-400 pt-1 border-t border-neutral-200 dark:border-neutral-800">
                        <span>ULTRASONIC ECHO: CLEAR</span>
                        <span>SWEEP MOTOR: ON</span>
                      </div>
                    </div>
                  </div>
                )}

                {project.diagramType === 'jarvis' && (
                  <div className="w-full max-w-xs space-y-3 font-mono text-[10px] text-neutral-500">
                    <div className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-3 bg-white/80 dark:bg-neutral-900/80 space-y-2">
                      <div className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <Mic className="w-3.5 h-3.5 text-[#FF1F1F]" />
                          VOICE ENGINE // AUDIO PIPELINE
                        </span>
                        <span className="text-emerald-500">LISTENING</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 h-8 bg-neutral-100 dark:bg-neutral-800 rounded px-2">
                        {[40, 75, 30, 90, 60, 45, 80, 25, 70, 50, 85, 35].map((h, i) => (
                          <span
                            key={i}
                            style={{ height: `${h}%` }}
                            className="w-1 bg-[#FF1F1F] rounded-full opacity-80"
                          />
                        ))}
                      </div>
                      <div className="flex justify-between text-neutral-400 pt-1 border-t border-neutral-200 dark:border-neutral-800">
                        <span>NLP INTENT: EXEC_ROUTINE</span>
                        <span>PY_SERIAL: COM3</span>
                      </div>
                    </div>
                  </div>
                )}

                {project.diagramType === 'drone' && (
                  <div className="w-full max-w-xs space-y-3 font-mono text-[10px] text-neutral-500">
                    <div className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-3 bg-white/80 dark:bg-neutral-900/80 space-y-2">
                      <div className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <Radio className="w-3.5 h-3.5 text-[#FF1F1F]" />
                          FLIGHT TELEMETRY HUD // 6-AXIS IMU
                        </span>
                        <span className="text-blue-500">STREAMING</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 text-center">
                        <div className="p-1 rounded bg-neutral-100 dark:bg-neutral-800">
                          <span className="block text-neutral-400">PITCH</span>
                          <span className="text-neutral-800 dark:text-white font-bold">+1.2°</span>
                        </div>
                        <div className="p-1 rounded bg-neutral-100 dark:bg-neutral-800">
                          <span className="block text-neutral-400">ROLL</span>
                          <span className="text-neutral-800 dark:text-white font-bold">-0.4°</span>
                        </div>
                        <div className="p-1 rounded bg-neutral-100 dark:bg-neutral-800">
                          <span className="block text-neutral-400">YAW</span>
                          <span className="text-neutral-800 dark:text-white font-bold">142°</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-neutral-400 pt-1 border-t border-neutral-200 dark:border-neutral-800">
                        <span>ALTITUDE: 12.4m</span>
                        <span>LINK: 2.4GHz RF</span>
                      </div>
                    </div>
                  </div>
                )}

                {project.diagramType === 'iot' && (
                  <div className="w-full max-w-xs space-y-3 font-mono text-[10px] text-neutral-500">
                    <div className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-3 bg-white/80 dark:bg-neutral-900/80 space-y-2">
                      <div className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <Wind className="w-3.5 h-3.5 text-[#FF1F1F]" />
                          ESP32 // MQ-135 SENSOR BUS
                        </span>
                        <span className="text-emerald-500">ONLINE</span>
                      </div>
                      <div className="p-2 rounded bg-neutral-900 text-emerald-400 font-mono text-[11px] flex justify-between border border-neutral-800">
                        <span>PPM: 142 [NORMAL]</span>
                        <span>I2C: 0x27</span>
                      </div>
                      <div className="flex justify-between text-neutral-400 pt-1 border-t border-neutral-200 dark:border-neutral-800">
                        <span>SSID: CONNECTED</span>
                        <span>THINGSPEAK: CH_UPDATE_OK</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Main Card Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 dark:text-white group-hover:text-[#FF1F1F] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                  {/* Specification Table */}
                  <div className="grid grid-cols-1 gap-1.5 font-mono text-xs">
                    {project.specs.map((spec, i) => (
                      <div key={i} className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
                        <span className="text-neutral-400 dark:text-neutral-500">{spec.label}</span>
                        <span className="font-medium text-neutral-800 dark:text-neutral-200">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technical Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-sm bg-neutral-100 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700/60 font-mono text-[10px] text-neutral-700 dark:text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: GitHub Link Indicator */}
              <div className="p-4 px-6 bg-neutral-50 dark:bg-neutral-900/40 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <span className="font-mono text-[11px] text-neutral-500">
                  DEVELOPMENT STAGE: ACTIVE PROTOTYPE
                </span>

                <a
                  href="https://github.com/sachin2004-roxx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-neutral-900 dark:text-neutral-200 hover:text-[#FF1F1F] dark:hover:text-[#FF1F1F] transition-colors"
                >
                  <span>GITHUB PROFILE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Notice Note */}
        <div className="mt-12 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center gap-3 text-xs font-mono text-neutral-500 max-w-2xl mx-auto">
          <ShieldAlert className="w-4 h-4 text-[#FF1F1F] shrink-0" />
          <span>
            Engineering Integrity Note: All 4 projects are authentic ongoing undertakings. Project documentation and code repositories are published as milestones reach validation stages.
          </span>
        </div>
      </div>
    </section>
  );
};
