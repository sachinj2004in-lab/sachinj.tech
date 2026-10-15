import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data';
import { director } from '../engine/director';
import { ArrowUp, ArrowUpRight, Copy, Check, Github, Linkedin, Mail } from 'lucide-react';

export const Contact: React.FC = () => {
  const { contact } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="relative w-full h-[240vh] bg-[#ff1f1f] text-white">
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between py-12">
        
        {/* Layer z0: Giant White Headline Behind Character */}
        <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none z-0">
          <div className="font-display text-[22vw] lg:text-[18vw] font-black uppercase tracking-tighter text-white leading-[0.82] text-center">
            <div>{contact.headlineLine1}</div>
            <div>{contact.headlineLine2}</div>
          </div>
        </div>

        {/* Top Header Tag */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="font-mono text-xs text-white/80 uppercase tracking-widest">
            {contact.label}
          </div>
        </div>

        {/* Foreground Content Card below Center Character (z3) */}
        <div className="relative z-30 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-auto mb-8">
          
          <div className="p-8 sm:p-10 rounded-3xl bg-black/85 backdrop-blur-xl border border-white/20 shadow-2xl space-y-6 text-center">
            
            {/* Prominent Email with Underline Reveal */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] text-white/70 uppercase tracking-widest block">
                PRIMARY COMMUNICATION INBOX
              </span>
              
              <div className="flex items-center justify-center gap-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white hover:text-[#ff1f1f] transition-colors break-all underline decoration-white/30 hover:decoration-[#ff1f1f] decoration-2 underline-offset-8"
                >
                  {contact.email.toUpperCase()}
                </a>

                <button
                  onClick={copyEmail}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Copy Email Address"
                  aria-label="Copy Email Address"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Stacked Social Links with Clean Separators */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 border-t border-white/15">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all active:scale-95"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all active:scale-95"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>

              {/* Back to Top Interaction */}
              <button
                onClick={() => director.scrollToScene('hero')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider bg-[#ff1f1f] hover:bg-[#e01616] text-white transition-all active:scale-95 shadow-lg"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

            {/* Footer Credits */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-white/60">
              <div>
                © {contact.year} SACHIN J · ALL RIGHTS RESERVED
              </div>
              <div>
                COIMBATORE, TAMIL NADU, INDIA
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
