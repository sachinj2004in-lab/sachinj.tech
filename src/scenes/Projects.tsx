import React, { useState } from 'react';
import { PORTFOLIO_DATA, ProjectItem } from '../data';
import { useScrollState } from '../engine/hooks';
import { TiltCard } from '../components/TiltCard';
import {
  ArrowUpRight,
  Bot,
  Radio,
  Wind,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Grid,
  X,
  Cpu,
  Layers,
  Sun,
  ShieldAlert,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import { SeamlessCharacterVideo } from '../components/SeamlessCharacterVideo';

export const Projects: React.FC = () => {
  const { projects, profile } = PORTFOLIO_DATA;
  const scrollState = useScrollState();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [manualIndex, setManualIndex] = useState<number | null>(null);
  const [isGridModalOpen, setIsGridModalOpen] = useState(false);

  // Filter projects by category
  const filteredProjects =
    selectedCategory === 'All'
      ? projects.items
      : projects.items.filter((p) => p.category === selectedCategory);

  // Compute active project index based on scroll position or manual navigation
  const scrollIndex = Math.min(
    filteredProjects.length - 1,
    Math.floor(scrollState.sceneProgress * filteredProjects.length)
  );

  const activeIndex = manualIndex !== null ? manualIndex : scrollIndex;
  const currentProject: ProjectItem =
    filteredProjects[activeIndex] || filteredProjects[0] || projects.items[0];

  const handlePrev = () => {
    setManualIndex((prev) => {
      const curr = prev !== null ? prev : activeIndex;
      return curr > 0 ? curr - 1 : filteredProjects.length - 1;
    });
  };

  const handleNext = () => {
    setManualIndex((prev) => {
      const curr = prev !== null ? prev : activeIndex;
      return curr < filteredProjects.length - 1 ? curr + 1 : 0;
    });
  };

  return (
    <section id="projects" className="relative w-full h-[240vh]">
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-y-auto lg:overflow-hidden flex flex-col justify-start lg:justify-center custom-scroll">
        
        {/* Subtle Perspective Grid Floor (z0) */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none opacity-15 dark:opacity-20 z-0"
          style={{
            backgroundImage: `linear-gradient(to right, #ff1f1f 1px, transparent 1px), linear-gradient(to bottom, #ff1f1f 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'bottom center',
          }}
        />

        {/* Foreground Content on Left (z3) */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 sm:pt-24 lg:pt-0 pb-8">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pb-3 mb-4 border-b border-hairline dark:border-white/10 gap-2.5">
            {/* Top / Left Group: Meta Label + Mobile Stepper Controls */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="font-mono text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff1f1f]" />
                  <span>{projects.label}</span>
                  <span className="text-neutral-300 dark:text-neutral-700">//</span>
                  <span className="hidden xs:inline">12 DEDICATED PROTOTYPES</span>
                  <span className="xs:hidden">12 PROTOTYPES</span>
                </div>

                {/* View All Grid Button - Clean Rectangular Style */}
                <button
                  onClick={() => setIsGridModalOpen(true)}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-mono font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-[#ff1f1f] hover:text-white transition-colors border border-black/10 dark:border-white/10 shadow-sm"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Browse All 12</span>
                </button>
              </div>

              {/* Mobile Stepper Controls with 44px Touch Targets */}
              <div className="flex sm:hidden items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  aria-label="Previous project"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 bg-white/90 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-[#ff1f1f] hover:border-[#ff1f1f] hover:text-white transition-all shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="font-display text-base font-black text-ink dark:text-white min-w-[50px] text-center">
                  {currentProject.number}
                </div>

                <button
                  onClick={handleNext}
                  aria-label="Next project"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 bg-white/90 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-[#ff1f1f] hover:border-[#ff1f1f] hover:text-white transition-all shadow-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category Tabs - Scrollable without document overflow */}
            <div className="w-full sm:w-auto min-w-0 overflow-x-auto no-scrollbar py-1 flex items-center gap-1.5">
              {['All', 'AI & Robotics', 'Embedded & IoT', 'Electronics & Mobile'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setManualIndex(0);
                  }}
                  className={`px-3 py-1 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider transition-all shrink-0 border ${
                    selectedCategory === cat
                      ? 'bg-[#ff1f1f] text-white border-[#ff1f1f] shadow-sm'
                      : 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-600 dark:text-neutral-400 border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Desktop Stepper Controls */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous project"
                className="p-1.5 rounded-md border border-black/10 dark:border-white/10 bg-white/90 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-[#ff1f1f] hover:border-[#ff1f1f] hover:text-white transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="font-display text-xl sm:text-2xl font-black text-ink dark:text-white min-w-[65px] text-center">
                {currentProject.number}
              </div>

              <button
                onClick={handleNext}
                aria-label="Next project"
                className="p-1.5 rounded-md border border-black/10 dark:border-white/10 bg-white/90 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-[#ff1f1f] hover:border-[#ff1f1f] hover:text-white transition-all shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[460px]">
            
            {/* Left Column: Project Cover Image + Editorial & Tags (7 cols) */}
            <div className="md:col-span-7 space-y-3.5">
              
              {/* Project Cover Image prominently displayed BEFORE title & description */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg bg-neutral-900 group">
                <img
                  src={currentProject.coverImage}
                  alt={currentProject.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                />
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                {/* Status Badge Overlay */}
                <div className="absolute top-3 left-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[#ff1f1f] dark:text-[#D4AF37] border border-white/15 dark:border-[#D4AF37]/30 font-mono text-[10px] font-bold tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff1f1f] dark:bg-[#D4AF37] animate-pulse" />
                    <span>{currentProject.status}</span>
                  </div>
                </div>

                {/* Category Pill Overlay */}
                <div className="absolute bottom-3 right-3 font-mono text-[10px] text-white/90 bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/15">
                  {currentProject.category.toUpperCase()}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-ink dark:text-white uppercase leading-[0.95] tracking-tight">
                {currentProject.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed max-w-lg">
                {currentProject.description}
              </p>

              {/* Technologies / Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Interaction: Explore on GitHub */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full text-xs font-semibold bg-[#ff1f1f] dark:bg-[#D4AF37] text-white dark:text-neutral-950 hover:bg-[#e01616] dark:hover:bg-[#c5a028] transition-all shadow-lg active:scale-95"
                >
                  <span>Explore on GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setIsGridModalOpen(true)}
                  className="sm:hidden inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full text-xs font-mono font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>All 12</span>
                </button>
              </div>

            </div>

            {/* Right Column: Cinematic Engineering Workbench (03-projects-work.mp4) - Balanced & Integrated */}
            <div className="md:col-span-5 flex items-center justify-center relative pointer-events-none bg-transparent">
              <div className="relative w-full h-[28vh] sm:h-[36vh] md:h-[46vh] lg:h-[56vh] flex items-center justify-center">
                <SeamlessCharacterVideo
                  sectionId="projects"
                  videoSrc="/videos/03-projects-work.mp4"
                  position="center"
                  parallaxStrength={8}
                  className="w-full h-full object-cover scale-100 origin-center"
                />

                {/* Subtle Cinematic Status Pill */}
                <div className="absolute top-2 right-2 pointer-events-none">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 font-mono text-[10px] tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ENGINEERING WORKBENCH</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Pagination Stepper Dots */}
          <div className="flex justify-center items-center gap-2 pt-4">
            {filteredProjects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setManualIndex(idx)}
                aria-label={`Go to project ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? 'w-7 bg-[#ff1f1f]'
                    : 'w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* Full 12 Projects Grid Modal */}
      {isGridModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#0e121a] text-ink dark:text-white rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/10 dark:border-white/10">
              <div>
                <div className="font-mono text-xs text-[#ff1f1f] font-bold uppercase tracking-wider">
                  COMPLETE ENGINEERING REPERTOIRE
                </div>
                <h3 className="font-display text-2xl font-black uppercase text-ink dark:text-white">
                  ALL 12 SELECTED PROJECTS
                </h3>
              </div>
              <button
                onClick={() => setIsGridModalOpen(false)}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Grid Body */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 custom-scroll">
              {projects.items.map((proj, idx) => (
                <div
                  key={proj.id}
                  onClick={() => {
                    setSelectedCategory('All');
                    setManualIndex(idx);
                    setIsGridModalOpen(false);
                  }}
                  className="rounded-2xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/50 p-3 space-y-2 cursor-pointer hover:border-[#ff1f1f] transition-all group"
                >
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-neutral-900">
                    <img
                      src={proj.coverImage}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 font-mono text-[9px] text-[#ff1f1f] font-bold">
                      {proj.status}
                    </div>
                    <div className="absolute bottom-2 right-2 font-mono text-[10px] text-white/90 bg-black/70 px-2 py-0.5 rounded">
                      {proj.number}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="font-display text-sm font-black text-ink dark:text-white uppercase truncate group-hover:text-[#ff1f1f] transition-colors">
                      {proj.title}
                    </div>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 line-clamp-2">
                      {proj.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-black/5 dark:border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export const Work = Projects;
