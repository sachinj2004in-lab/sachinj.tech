import React, { useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data';
import { director } from '../engine/director';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { SeamlessCharacterVideo } from '../components/SeamlessCharacterVideo';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { hero } = PORTFOLIO_DATA;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-white"
    >
      {/* Brand Name strictly inside Home section (scrolls naturally with Home, does not stick to screen) */}
      <div className="absolute top-5 left-0 w-full z-40 pointer-events-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start">
          <div className="flex items-center gap-1.5 focus:outline-none text-left select-none">
            <span className="font-display text-3xl font-black tracking-tight uppercase text-ink">
              SACHIN J.
            </span>
          </div>
        </div>
      </div>
      {/* Full-Viewport Stage with Pure White Background */}
      <div className="relative w-full min-h-screen overflow-hidden flex flex-col md:block md:items-center bg-white">

        {/* Foreground Editorial Content on Left */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 sm:pt-24 md:pt-28 lg:pt-0 md:min-h-screen md:flex md:items-center">
          <div className="max-w-2xl md:max-w-md lg:max-w-2xl space-y-3 sm:space-y-4 md:space-y-5">
            
            {/* Subtitle intro label */}
            <div className="hero-line">
              <div className="font-mono text-xs sm:text-sm text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.25em] font-medium">
                {hero.intro}
              </div>
            </div>

            {/* Primary Headline in Bold Anton: 3 Stacked Lines with Red Square Period */}
            <div className="hero-line space-y-1 sm:space-y-1.5 leading-[0.92] sm:leading-[0.88] my-2 sm:my-3">
              <h1 className="text-[2.6rem] xs:text-[3.2rem] sm:text-6xl md:text-6xl lg:text-[7.2vw] font-display font-black uppercase tracking-tight text-ink dark:text-white leading-[0.92] sm:leading-[0.88]">
                {hero.headlineLine1}
              </h1>
              <h1 className="text-[2.6rem] xs:text-[3.2rem] sm:text-6xl md:text-6xl lg:text-[7.2vw] font-display font-black uppercase tracking-tight text-ink dark:text-white leading-[0.92] sm:leading-[0.88]">
                {hero.headlineLine2}
              </h1>
              <h1 className="text-[2.6rem] xs:text-[3.2rem] sm:text-6xl md:text-6xl lg:text-[7.2vw] font-display font-black uppercase tracking-tight text-ink dark:text-white leading-[0.92] sm:leading-[0.88] flex items-baseline">
                <span>{hero.headlineLine3}</span>
                <span className="inline-block w-2.5 xs:w-3 sm:w-4 lg:w-5 h-2.5 xs:h-3 sm:h-4 lg:h-5 bg-[#ff1f1f] ml-1.5 mb-1 sm:mb-2" />
              </h1>
            </div>

            {/* Supporting Copy & Red Accent Underline */}
            <div className="hero-line pt-0.5 sm:pt-1">
              <p className="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed max-w-lg">
                {hero.supporting}
              </p>
              {/* Red Accent Bar under text exactly like reference screenshot */}
              <div className="w-12 h-[2px] bg-[#ff1f1f] mt-2.5 sm:mt-4" />
            </div>

            {/* Buttons */}
            <div className="hero-line flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
              <button
                onClick={() => director.scrollToScene('projects')}
                className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-7 py-3 sm:py-3.5 min-h-[44px] rounded-full text-xs font-semibold bg-[#ff1f1f] text-white hover:bg-[#e01616] transition-all shadow-lg shadow-red-500/25 active:scale-95"
              >
                <span>{hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => director.scrollToScene('contact')}
                className="group inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 min-h-[44px] rounded-full text-xs font-semibold border border-neutral-200 dark:border-white/20 bg-white dark:bg-neutral-900 text-ink dark:text-white hover:border-black dark:hover:border-white transition-all shadow-sm active:scale-95"
              >
                <span>{hero.secondaryCta}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Character Visual: Seamless on Right for Tablet/Desktop, prominent dedicated area below buttons on Mobile */}
        <div className="relative md:absolute md:right-0 md:bottom-0 md:top-0 w-full md:w-[48vw] lg:w-[50vw] md:h-full flex items-center md:items-end justify-center md:justify-end pointer-events-none z-10 lg:z-20 bg-transparent overflow-hidden mt-4 xs:mt-6 sm:mt-8 md:mt-0 pb-4 md:pb-0">
          <div className="w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[420px] md:max-w-none h-[500px] xs:h-[550px] sm:h-[600px] md:h-[78vh] lg:h-[82vh] flex items-center md:items-end justify-center md:justify-end bg-transparent md:translate-y-4 lg:translate-y-6">
            <SeamlessCharacterVideo
              sectionId="hero"
              videoSrc="/videos/home_intro_character_video.mp4"
              position="right"
              priority={true}
              parallaxStrength={10}
              className="object-contain object-bottom scale-100 md:scale-[0.94] lg:scale-[0.96] origin-bottom"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
