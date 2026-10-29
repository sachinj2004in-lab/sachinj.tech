import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA, RoadmapStage } from '../data';
import {
  GraduationCap,
  Calendar,
  Globe,
  Cpu,
  CheckCircle2,
  Sparkles,
  Target,
  Car,
  CircuitBoard,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Wrench,
  Compass,
} from 'lucide-react';
import { TiltCard } from '../components/TiltCard';
import { SeamlessCharacterVideo } from '../components/SeamlessCharacterVideo';

export const Journey: React.FC = () => {
  const { journey } = PORTFOLIO_DATA;
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Keyboard navigation for roadmap milestones
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setActiveStageIndex((prev) => (prev < journey.roadmap.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setActiveStageIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [journey.roadmap.length]);

  const activeStage: RoadmapStage = journey.roadmap[activeStageIndex] || journey.roadmap[0];

  const handlePrev = () => {
    setActiveStageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveStageIndex((prev) => Math.min(journey.roadmap.length - 1, prev + 1));
  };

  // Milestone short titles for the horizontal stepper
  const milestoneLabels = [
    { num: '01', title: 'Foundations', sub: '2022–2026' },
    { num: '02', title: 'Development', sub: '2023–Now' },
    { num: '03', title: 'M.S. Germany', sub: 'Target 2026+' },
    { num: '04', title: 'Career Vision', sub: '2028+ Horizon' },
  ];

  return (
    <section id="journey" className="relative w-full min-h-screen md:h-[200vh]">
      {/* Viewport Stage: Natural on mobile, Sticky on Tablet/Desktop */}
      <div className="relative md:sticky md:top-0 left-0 w-full min-h-screen md:h-screen md:overflow-y-auto lg:overflow-hidden flex flex-col justify-start lg:justify-center custom-scroll">
        
        {/* Subtle Ambient Radial Glow in Background */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,31,31,0.05),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,31,31,0.08),transparent_65%)] z-0" />

        {/* Large Outlined Background Watermark behind Character */}
        <div className="absolute left-0 lg:left-[-2vw] top-1/2 -translate-y-1/2 font-display text-[22vw] lg:text-[16vw] font-black text-black/[0.03] dark:text-white/[0.03] select-none pointer-events-none tracking-tighter leading-none z-0 max-w-full overflow-hidden">
          {activeStage.step === '03' ? 'GERMANY' : '2026'}
        </div>

        {/* Foreground Content on Right (z30) */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 sm:pt-24 lg:pt-16 pb-8">
          
          {/* Mobile Header Meta Bar (Clean contextual entry on phones) */}
          <div className="block md:hidden pb-3">
            <div className="flex items-center justify-between border-b border-black/[0.08] dark:border-white/10 pb-2">
              <div className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff1f1f] animate-pulse" />
                <span className="font-bold text-neutral-800 dark:text-neutral-200">{journey.label}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#ff1f1f] dark:text-[#ff3b3b] bg-red-50 dark:bg-[#ff1f1f]/10 border border-red-200/60 dark:border-red-500/20 px-2.5 py-0.5 rounded-full font-bold">
                <Globe className="w-3 h-3" />
                <span>TARGET: GERMANY M.S.</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Dedicated Character Visual (04-journey.mp4) - Large & Centered in Stage */}
            <div className="flex md:col-span-5 w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[420px] md:max-w-none h-[340px] xs:h-[380px] sm:h-[440px] md:h-[65vh] lg:h-[95vh] items-center md:items-end justify-center relative pointer-events-none bg-transparent overflow-hidden mx-auto md:mx-0 my-1 md:my-0">
              <SeamlessCharacterVideo
                sectionId="journey"
                videoSrc="/videos/04-journey.mp4"
                position="center"
                parallaxStrength={10}
                className="object-contain md:object-bottom scale-100 md:scale-[1.5] lg:scale-[2.65] origin-center md:origin-bottom lg:-translate-x-[100px] lg:-translate-y-7"
              />
            </div>

            {/* Right Column: Career Goal & Interactive Roadmap */}
            <div className="md:col-span-7 space-y-3.5">
              
              {/* 1. Desktop Header Meta Bar (hidden on mobile since shown above character) */}
              <div className="hidden md:flex items-center justify-between border-b border-black/[0.08] dark:border-white/10 pb-2">
                <div className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff1f1f] animate-pulse" />
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">{journey.label}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#ff1f1f] dark:text-[#ff3b3b] bg-red-50 dark:bg-[#ff1f1f]/10 border border-red-200/60 dark:border-red-500/20 px-2.5 py-0.5 rounded-full font-bold">
                  <Globe className="w-3 h-3" />
                  <span>TARGET: GERMANY M.S.</span>
                </div>
              </div>

              {/* 2. Interactive Connected 4-Stage Roadmap Stepper */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  <span>Interactive Pathway // 4 Milestones</span>
                  <span className="text-[#ff1f1f] font-bold">Click stage or use arrows</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {journey.roadmap.map((stage, idx) => {
                    const isSelected = activeStageIndex === idx;
                    const meta = milestoneLabels[idx] || { num: stage.step, title: stage.title, sub: stage.period };

                    return (
                      <button
                        key={stage.step}
                        onClick={() => setActiveStageIndex(idx)}
                        className={`group relative p-2.5 sm:p-3 rounded-xl text-left transition-all duration-200 border cursor-pointer ${
                          isSelected
                            ? 'bg-neutral-900 text-white dark:bg-neutral-900 dark:text-white border-neutral-900 dark:border-[#ff1f1f] shadow-md ring-2 ring-[#ff1f1f]/30'
                            : 'bg-white/90 dark:bg-neutral-900/60 text-neutral-700 dark:text-neutral-300 border-black/[0.08] dark:border-white/10 hover:border-[#ff1f1f]/40 dark:hover:border-[#ff1f1f]/40 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
                        }`}
                      >
                        {/* Top Indicator & Step Number */}
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`font-mono text-[10px] font-black ${
                              isSelected ? 'text-[#ff1f1f]' : 'text-neutral-400 dark:text-neutral-500'
                            }`}
                          >
                            {meta.num}
                          </span>
                          <span className="flex items-center">
                            {isSelected ? (
                              <span className="w-2 h-2 rounded-full bg-[#ff1f1f] animate-ping" />
                            ) : idx < 3 ? (
                              <ArrowRight className="w-3 h-3 text-neutral-300 dark:text-neutral-600 group-hover:text-[#ff1f1f] transition-colors" />
                            ) : (
                              <Target className="w-3 h-3 text-neutral-300 dark:text-neutral-600" />
                            )}
                          </span>
                        </div>

                        {/* Stage Name */}
                        <div
                          className={`font-sans text-xs font-bold tracking-tight truncate ${
                            isSelected ? 'text-white' : 'text-neutral-900 dark:text-neutral-100'
                          }`}
                        >
                          {meta.title}
                        </div>

                        {/* Period Subtitle */}
                        <div
                          className={`font-mono text-[10px] truncate ${
                            isSelected ? 'text-neutral-300' : 'text-neutral-500 dark:text-neutral-400'
                          }`}
                        >
                          {meta.sub}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Active Stage Interactive Detail Showcase Card */}
              <TiltCard className="p-4 sm:p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-neutral-900/90 backdrop-blur-md shadow-lg space-y-3">
                {/* Header Row: Stage Number, Status Pill & Prev/Next Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/[0.08] dark:border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] font-black bg-[#ff1f1f] text-white">
                      STAGE {activeStage.step} OF 04
                    </span>
                    <span className="font-mono text-[11px] font-bold text-neutral-600 dark:text-neutral-300">
                      {activeStage.period}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrev}
                      disabled={activeStageIndex === 0}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-[#ff1f1f] hover:text-white dark:hover:bg-[#ff1f1f] dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      title="Previous Stage (ArrowLeft)"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={activeStageIndex === journey.roadmap.length - 1}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-[#ff1f1f] hover:text-white dark:hover:bg-[#ff1f1f] dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      title="Next Stage (ArrowRight)"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Stage Title & Status */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-sans text-lg sm:text-xl font-bold text-neutral-900 dark:text-white tracking-tight leading-snug">
                      {activeStage.title}
                    </h3>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/10">
                    <Sparkles className="w-3 h-3 text-[#ff1f1f]" />
                    <span>{activeStage.status}</span>
                  </span>
                </div>

                {/* Stage Narrative Description */}
                <p className="font-sans text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {activeStage.description}
                </p>

                {/* DYNAMIC CONTENT PER STAGE */}
                
                {/* STAGE 1: Engineering Foundations & Formal Education Details */}
                {activeStageIndex === 0 && (
                  <div className="space-y-2 pt-1">
                    <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-[#ff1f1f]/10 text-[#ff1f1f] flex items-center justify-center shrink-0">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider font-semibold">
                            UNDERGRADUATE DEGREE
                          </div>
                          <div className="font-sans text-xs sm:text-sm font-bold text-neutral-900 dark:text-white leading-snug">
                            {journey.degree}
                          </div>
                          <div className="font-sans text-[11px] text-neutral-600 dark:text-neutral-400">
                            {journey.college}
                          </div>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono text-[10px] font-bold shrink-0 self-start sm:self-auto border border-black/5 dark:border-white/10">
                        <Calendar className="w-3 h-3 text-[#ff1f1f]" />
                        <span>{journey.batch}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-0.5">
                      {activeStage.highlights.map((item, i) => (
                        <div
                          key={i}
                          className="p-2 rounded-lg bg-white dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.06] flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#ff1f1f] shrink-0 mt-0.5" />
                          <span className="font-sans text-[11px] text-neutral-700 dark:text-neutral-300 leading-tight">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STAGE 2: Technical Development & Hands-On Building */}
                {activeStageIndex === 1 && (
                  <div className="space-y-2 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] space-y-1">
                        <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-neutral-900 dark:text-white">
                          <Cpu className="w-3.5 h-3.5 text-[#ff1f1f]" />
                          <span>Microcontrollers</span>
                        </div>
                        <p className="font-sans text-[11px] text-neutral-600 dark:text-neutral-400 leading-snug">
                          ESP32, Arduino Uno, ARM LPC2148, and ongoing STM32 learning path.
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] space-y-1">
                        <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-neutral-900 dark:text-white">
                          <Wrench className="w-3.5 h-3.5 text-[#ff1f1f]" />
                          <span>12 Prototypes</span>
                        </div>
                        <p className="font-sans text-[11px] text-neutral-600 dark:text-neutral-400 leading-snug">
                          Autonomous road cleaner, IoT air quality, RC car, and emergency safety telemetry.
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] space-y-1">
                        <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-neutral-900 dark:text-white">
                          <CircuitBoard className="w-3.5 h-3.5 text-[#ff1f1f]" />
                          <span>Hardware & C</span>
                        </div>
                        <p className="font-sans text-[11px] text-neutral-600 dark:text-neutral-400 leading-snug">
                          Embedded C register manipulation, PWM motor control, and UART/I2C/SPI buses.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* STAGE 3: Higher Education Goal — M.S. in Embedded Systems, Germany */}
                {activeStageIndex === 2 && (
                  <div className="space-y-2 pt-1">
                    {/* The 3 Core Focus Pillars explicitly requested */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {/* Pillar 1: Advanced Firmware & RTOS */}
                      <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] space-y-1">
                        <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-neutral-900 dark:text-white">
                          <Cpu className="w-3.5 h-3.5 text-[#ff1f1f]" />
                          <span>Advanced Firmware & RTOS</span>
                        </div>
                        <p className="font-sans text-[11px] text-neutral-600 dark:text-neutral-400 leading-snug">
                          Deterministic low-latency firmware architectures, task scheduling, and safety-critical RTOS.
                        </p>
                      </div>

                      {/* Pillar 2: Automotive & Industrial Electronics */}
                      <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] space-y-1">
                        <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-neutral-900 dark:text-white">
                          <Car className="w-3.5 h-3.5 text-[#ff1f1f]" />
                          <span>Automotive & Industrial</span>
                        </div>
                        <p className="font-sans text-[11px] text-neutral-600 dark:text-neutral-400 leading-snug">
                          Electronic control units (ECUs), CAN/LIN bus vehicle communication, and smart automation.
                        </p>
                      </div>

                      {/* Pillar 3: Intelligent Hardware-Software Integration */}
                      <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] space-y-1">
                        <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-neutral-900 dark:text-white">
                          <CircuitBoard className="w-3.5 h-3.5 text-[#ff1f1f]" />
                          <span>Intelligent Integration</span>
                        </div>
                        <p className="font-sans text-[11px] text-neutral-600 dark:text-neutral-400 leading-snug">
                          Edge intelligence, sensor fusion, digital signal processing, and robotics kinematics.
                        </p>
                      </div>
                    </div>

                    {/* Educational Note */}
                    <div className="font-mono text-[9px] text-neutral-400 dark:text-neutral-500 italic pt-0.5">
                      {journey.careerGoal.notice}
                    </div>
                  </div>
                )}

                {/* STAGE 4: Long-Term Career Vision */}
                {activeStageIndex === 3 && (
                  <div className="space-y-2 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] space-y-1">
                        <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-neutral-900 dark:text-white">
                          <Car className="w-3.5 h-3.5 text-[#ff1f1f]" />
                          <span>Automotive & Robotics</span>
                        </div>
                        <p className="font-sans text-[11px] text-neutral-600 dark:text-neutral-400 leading-snug">
                          Embedded Software Engineer specializing in electric vehicle platforms and autonomous robotics.
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] space-y-1">
                        <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-neutral-900 dark:text-white">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#ff1f1f]" />
                          <span>Fault Tolerance</span>
                        </div>
                        <p className="font-sans text-[11px] text-neutral-600 dark:text-neutral-400 leading-snug">
                          Architecting safety-critical, high-availability firmware designed to withstand physical failure modes.
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] space-y-1">
                        <div className="flex items-center gap-1.5 font-sans text-xs font-bold text-neutral-900 dark:text-white">
                          <Compass className="w-3.5 h-3.5 text-[#ff1f1f]" />
                          <span>Global Impact</span>
                        </div>
                        <p className="font-sans text-[11px] text-neutral-600 dark:text-neutral-400 leading-snug">
                          Bridging world-class academic engineering in Germany with industry-standard embedded deployments.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </TiltCard>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
