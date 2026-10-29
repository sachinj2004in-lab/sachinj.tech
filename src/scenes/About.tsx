import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data';
import {
  Cpu,
  Code2,
  Radio,
  Brain,
  Wrench,
  Sparkles,
  Layers,
} from 'lucide-react';
import { SeamlessCharacterVideo } from '../components/SeamlessCharacterVideo';

export const About: React.FC = () => {
  const { about } = PORTFOLIO_DATA;
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');

  // Filter skills based on active category
  const categoriesToRender =
    activeCategoryId === 'all'
      ? about.skillCategories
      : about.skillCategories.filter((c) => c.id === activeCategoryId);

  // Category Icon helper
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'programming':
        return <Code2 className="w-3.5 h-3.5" />;
      case 'embedded':
        return <Cpu className="w-3.5 h-3.5" />;
      case 'communication':
      case 'iot':
        return <Radio className="w-3.5 h-3.5" />;
      case 'ai':
        return <Brain className="w-3.5 h-3.5" />;
      case 'tools':
        return <Wrench className="w-3.5 h-3.5" />;
      default:
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="about" className="relative w-full min-h-screen md:h-[220vh]">
      {/* Viewport Stage: Natural on mobile, Sticky on Tablet/Desktop */}
      <div className="relative md:sticky md:top-0 left-0 w-full min-h-screen md:h-screen md:overflow-y-auto lg:overflow-hidden flex flex-col justify-start lg:justify-center custom-scroll">
        
        {/* Soft Ambient Radial Wash in Background (z0) */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,31,31,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,31,31,0.08),transparent_60%)] z-0" />

        {/* Foreground Content on Right (z3) */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 sm:pt-24 lg:pt-8 pb-8">
          
          {/* Mobile Header Bar & Headline (Clean contextual entry on phones) */}
          <div className="block md:hidden pb-3 space-y-2">
            <div className="flex items-center justify-between border-b border-black/[0.08] dark:border-white/10 pb-2">
              <div className="font-mono text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff1f1f]" />
                <span>{about.label}</span>
              </div>
              <div className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#ff1f1f]" />
                <span>33 VERIFIED TECHNICAL SKILLS</span>
              </div>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black uppercase text-ink dark:text-white leading-[0.95] tracking-tight">
              CURIOUS BY NATURE.{' '}
              <span className="text-[#ff1f1f]">BUILDING THROUGH EXPERIMENTATION.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Dedicated Character Visual (02-about.mp4) - Large & Centered */}
            <div className="flex md:col-span-5 w-full max-w-[360px] xs:max-w-[420px] md:max-w-none h-[380px] xs:h-[430px] sm:h-[480px] md:h-[65vh] lg:h-[95vh] items-center md:items-end justify-center relative pointer-events-none bg-transparent overflow-hidden mx-auto md:mx-0 my-1 md:my-0">
              <SeamlessCharacterVideo
                sectionId="about"
                videoSrc="/videos/02-about.mp4"
                position="center"
                parallaxStrength={10}
                className="object-contain md:object-bottom scale-[1.75] xs:scale-[1.90] sm:scale-[2.0] md:scale-[1.5] lg:scale-[2.45] origin-center md:origin-bottom lg:-translate-x-[100px] lg:-translate-y-6"
              />
            </div>

            {/* Right Column: Editorial Manifesto & Categorized Technical Skills */}
            <div className="md:col-span-7 space-y-3.5">
              
              {/* 1. Desktop Section Label (hidden on mobile since shown above character) */}
              <div className="hidden md:flex items-center justify-between border-b border-black/[0.08] dark:border-white/10 pb-2">
                <div className="font-mono text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff1f1f]" />
                  <span>{about.label}</span>
                </div>
                <div className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#ff1f1f]" />
                  <span>33 VERIFIED TECHNICAL SKILLS</span>
                </div>
              </div>

              {/* 2. Desktop Headline / Manifesto (hidden on mobile since shown above character) */}
              <div className="hidden md:block space-y-0.5">
                <h2 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-display font-black uppercase text-ink dark:text-white leading-[0.95] tracking-tight">
                  CURIOUS BY NATURE.{' '}
                  <span className="text-[#ff1f1f]">BUILDING THROUGH EXPERIMENTATION.</span>
                </h2>
              </div>

              {/* 3. Concise Supporting Paragraph */}
              <p className="text-xs sm:text-sm font-sans text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-2xl">
                Electronics and Communication Engineering student at{' '}
                <strong className="font-bold text-ink dark:text-white">Kumaraguru College of Technology, Coimbatore</strong> (2022–2026 batch).
                Focused on <span className="font-semibold text-[#ff1f1f]">embedded software</span>, <span className="font-semibold text-ink dark:text-white">firmware</span>,{' '}
                <span className="font-semibold text-[#ff1f1f]">robotics</span>, <span className="font-semibold text-ink dark:text-white">IoT</span>, and physical prototypes that bridge hardware with software.
              </p>

              {/* 4. Skill Category Filter Tabs — flex-wrap so all categories including Communication are 100% visible */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 py-1.5 border-y border-black/[0.06] dark:border-white/[0.08]">
                <button
                  onClick={() => setActiveCategoryId('all')}
                  className={`px-3 py-1.5 rounded-md font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 border cursor-pointer ${
                    activeCategoryId === 'all'
                      ? 'bg-[#ff1f1f] text-white border-[#ff1f1f] shadow-sm'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 hover:text-ink dark:hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>All Skills (33)</span>
                </button>
                {about.skillCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={`px-3 py-1.5 rounded-md font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 border cursor-pointer ${
                      activeCategoryId === cat.id
                        ? 'bg-[#ff1f1f] text-white border-[#ff1f1f] shadow-sm'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 hover:text-ink dark:hover:text-white'
                    }`}
                  >
                    {getCategoryIcon(cat.id)}
                    <span>{cat.name} ({cat.skills.length})</span>
                  </button>
                ))}
              </div>

              {/* 5. Categorized Skills Container — Fully visible cards, consistent grid, generous bottom clearance */}
              <div className="max-h-[380px] sm:max-h-[420px] lg:max-h-[440px] overflow-y-auto pr-2 pb-10 space-y-4 custom-scroll">
                {categoriesToRender.map((group) => (
                  <div key={group.id} className="space-y-2.5">
                    
                    {/* Category Subheader */}
                    <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider pb-1.5 border-b border-black/[0.06] dark:border-white/[0.08]">
                      <span className="font-bold text-ink dark:text-neutral-200 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#ff1f1f]" />
                        <span>{group.name}</span>
                      </span>
                      <span className="text-[10px] text-neutral-400 font-semibold">{group.countLabel}</span>
                    </div>

                    {/* Skill Cards Grid — Consistent 2-column responsive grid with equal card heights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      {group.skills.map((skill) => (
                        <div
                          key={skill.id}
                          className={`p-3 sm:p-3.5 rounded-lg border min-h-[68px] transition-all duration-200 group flex flex-col justify-between ${
                            skill.isLearning
                              ? 'bg-amber-500/[0.04] dark:bg-amber-500/[0.08] border-amber-500/35 hover:border-amber-500'
                              : skill.isExploring
                              ? 'bg-blue-500/[0.04] dark:bg-blue-500/[0.08] border-blue-500/35 hover:border-blue-500'
                              : 'bg-white/95 dark:bg-neutral-900/90 border-black/[0.08] dark:border-white/10 hover:border-[#ff1f1f]/50 shadow-sm'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            {/* Full Skill Name: crisp, bold, readable */}
                            <span className="font-mono text-xs font-bold text-ink dark:text-white group-hover:text-[#ff1f1f] transition-colors leading-snug">
                              {skill.name}
                            </span>

                            {/* Badge Indicator */}
                            {skill.isLearning ? (
                              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 uppercase tracking-tight shrink-0 border border-amber-500/25">
                                LEARNING
                              </span>
                            ) : skill.isExploring ? (
                              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-500/15 text-blue-700 dark:text-blue-400 uppercase tracking-tight shrink-0 border border-blue-500/25">
                                EXPLORING
                              </span>
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-sm" title="Active Core Competency" />
                            )}
                          </div>

                          {/* Skill Context / Badge Description */}
                          <div className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 pt-1">
                            {skill.badge}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
