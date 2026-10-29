import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data';
import { TiltCard } from '../components/TiltCard';
import { FileText, Download, Eye, GraduationCap, Cpu, Code2, MapPin, AlertCircle, X, Phone, Mail } from 'lucide-react';
import { SeamlessCharacterVideo } from '../components/SeamlessCharacterVideo';

export const Resume: React.FC = () => {
  const { resume, profile } = PORTFOLIO_DATA;
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  const handleResumeAction = () => {
    // If genuine PDF file is supplied in public/assets/resume.pdf, open it directly
    if (resume.pdfFile) {
      window.open(resume.pdfFile, '_blank', 'noopener,noreferrer');
    } else {
      // Safe, transparent notice: No fake download link
      setShowNoticeModal(true);
    }
  };

  return (
    <section id="resume" className="relative w-full min-h-screen md:h-[180vh]">
      {/* Viewport Stage: Natural on mobile, Sticky on Tablet/Desktop */}
      <div className="relative md:sticky md:top-0 left-0 w-full min-h-screen md:h-screen md:overflow-y-auto lg:overflow-hidden flex flex-col justify-start lg:justify-center custom-scroll">
        
        {/* Soft Radial Ambient Wash in Background (z0) */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,31,31,0.05),transparent_60%)] z-0" />

        {/* Foreground Content on Left (z3) */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 sm:pt-24 lg:pt-0 pb-8">
          
          {/* Header Bar */}
          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between pb-4 mb-6 border-b border-hairline dark:border-white/10 gap-2">
            <div className="font-mono text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff1f1f] dark:bg-[#D4AF37]" />
              <span>{resume.label}</span>
              <span className="text-neutral-300 dark:text-neutral-700">//</span>
              <span>PROFESSIONAL CREDENTIALS</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 font-mono text-[11px] font-bold border border-black/5 dark:border-white/10">
              <FileText className="w-3.5 h-3.5 text-[#ff1f1f] dark:text-[#D4AF37]" />
              <span>BATCH 2022–2026</span>
            </div>
          </div>

          {/* Mobile Editorial Headline (Clean contextual entry on phones) */}
          <div className="block md:hidden pb-3 space-y-1">
            <h2 className="text-4xl sm:text-6xl font-display font-black uppercase text-ink dark:text-white leading-[0.92] tracking-tight">
              {resume.headlineLine1} <span className="text-[#ff1f1f]">{resume.headlineLine2}</span>
            </h2>
            <p className="text-xs sm:text-sm font-sans text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl pt-1">
              {resume.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[460px]">
            
            {/* Left Column: Editorial CV Summary & Competencies (7 cols) */}
            <div className="md:col-span-7 space-y-5">
              
              {/* Desktop Headline (hidden on mobile since shown above character) */}
              <div className="hidden md:block space-y-1">
                <h2 className="text-4xl sm:text-6xl font-display font-black uppercase text-ink dark:text-white leading-[0.92] tracking-tight">
                  {resume.headlineLine1} <span className="text-[#ff1f1f]">{resume.headlineLine2}</span>
                </h2>
                <p className="text-xs sm:text-sm font-sans text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl pt-1">
                  {resume.summary}
                </p>
              </div>

              {/* 4 Verified Competency Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                
                {/* 1. Formal Degree */}
                <TiltCard className="p-4 rounded-2xl border border-hairline dark:border-white/10 bg-white/90 dark:bg-neutral-900/80 backdrop-blur-sm shadow-sm hover:border-[#ff1f1f]/30 transition-colors space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#ff1f1f] uppercase tracking-wider font-bold">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>EDUCATION</span>
                    </span>
                    <span className="text-neutral-400">2022–2026</span>
                  </div>
                  <div className="font-sans text-sm sm:text-base font-bold text-neutral-900 dark:text-white leading-snug">
                    {resume.college}
                  </div>
                  <div className="text-xs font-sans text-neutral-600 dark:text-neutral-300">
                    {resume.degree}
                  </div>
                </TiltCard>

                {/* 2. Hardware & Microcontrollers */}
                <TiltCard className="p-4 rounded-2xl border border-hairline dark:border-white/10 bg-white/90 dark:bg-neutral-900/80 backdrop-blur-sm shadow-sm hover:border-[#ff1f1f]/30 transition-colors space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#ff1f1f] uppercase tracking-wider font-bold">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>HARDWARE CORE</span>
                    </span>
                    <span className="text-neutral-400">EMBEDDED</span>
                  </div>
                  <div className="font-sans text-sm sm:text-base font-bold text-neutral-900 dark:text-white leading-snug">
                    ESP32, Arduino &amp; ARM
                  </div>
                  <div className="text-xs font-sans text-neutral-600 dark:text-neutral-300">
                    Timers, GPIO, I2C, SPI, Sensor Interfacing, PWM Motor Drivers
                  </div>
                </TiltCard>

                {/* 3. Programming Languages */}
                <TiltCard className="p-4 rounded-2xl border border-hairline dark:border-white/10 bg-white/90 dark:bg-neutral-900/80 backdrop-blur-sm shadow-sm hover:border-[#ff1f1f]/30 transition-colors space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#ff1f1f] uppercase tracking-wider font-bold">
                    <span className="flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5" />
                      <span>LANGUAGES</span>
                    </span>
                    <span className="text-neutral-400">FIRMWARE</span>
                  </div>
                  <div className="font-sans text-sm sm:text-base font-bold text-neutral-900 dark:text-white leading-snug">
                    C &amp; Python
                  </div>
                  <div className="text-xs font-sans text-neutral-600 dark:text-neutral-300">
                    Embedded C (In Active Study), Serial UART, Telemetry Scripts
                  </div>
                </TiltCard>

                {/* 4. Verified Projects */}
                <TiltCard className="p-4 rounded-2xl border border-hairline dark:border-white/10 bg-white/90 dark:bg-neutral-900/80 backdrop-blur-sm shadow-sm hover:border-[#ff1f1f]/30 transition-colors space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#ff1f1f] uppercase tracking-wider font-bold">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>LOCATION</span>
                    </span>
                    <span className="text-neutral-400">INDIA</span>
                  </div>
                  <div className="font-sans text-sm sm:text-base font-bold text-neutral-900 dark:text-white leading-snug">
                    {profile.location}
                  </div>
                  <div className="text-xs font-sans text-neutral-600 dark:text-neutral-300">
                    12 Verified Engineering Concept Prototypes Developed
                  </div>
                </TiltCard>

              </div>

              {/* View & Download Resume Actions */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={resume.pdfFile || '/assets/resume.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-full text-xs font-semibold bg-[#ff1f1f] text-white hover:bg-[#e01616] transition-all shadow-lg shadow-red-500/20 active:scale-95"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Resume</span>
                </a>

                <a
                  href={resume.pdfFile || '/assets/resume.pdf'}
                  download="Sachin_J_Resume.pdf"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-full text-xs font-semibold border border-neutral-300 dark:border-white/20 bg-white dark:bg-neutral-800 hover:border-black dark:hover:border-white transition-all active:scale-95 text-neutral-800 dark:text-neutral-200"
                >
                  <Download className="w-4 h-4 text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors" />
                  <span>Download Resume</span>
                </a>
              </div>

            </div>

            {/* Right Column: Dedicated Character Visual (05-resume.mp4) - Large & Centered in Stage */}
            <div className="flex md:col-span-5 w-full max-w-[360px] xs:max-w-[420px] md:max-w-none h-[380px] xs:h-[430px] sm:h-[480px] md:h-[65vh] lg:h-[95vh] items-center md:items-end justify-center relative pointer-events-none bg-transparent order-first md:order-none overflow-hidden mx-auto md:mx-0 my-1 md:my-0">
              <SeamlessCharacterVideo
                sectionId="resume"
                videoSrc="/videos/05-resume.mp4"
                position="center"
                parallaxStrength={10}
                className="object-contain md:object-bottom scale-[1.70] xs:scale-[1.85] sm:scale-[1.95] md:scale-[1.5] lg:scale-[2.40] origin-center md:origin-bottom lg:-translate-x-6 lg:translate-y-8"
              />
            </div>

          </div>

        </div>

      </div>

      {/* Polite Transparent Modal: No Fake PDF Downloads */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0e121a] border border-neutral-200 dark:border-white/10 shadow-2xl text-ink dark:text-white space-y-4">
            
            <button
              onClick={() => setShowNoticeModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-black dark:hover:text-white"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-muted text-[#ff1f1f] flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans text-lg font-bold text-neutral-900 dark:text-white">
                  Resume Status Notice
                </h4>
                <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                  Verified Candidate Credentials
                </p>
              </div>
            </div>

            <p className="text-sm font-sans text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Sachin's official resume PDF document is pending candidate upload. All profile credentials, technical skills, and project prototypes displayed across this website are verified.
            </p>

            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/10 font-mono text-xs space-y-1">
              <div className="text-neutral-500 dark:text-neutral-400 text-[10px] uppercase">Direct Candidate Contact</div>
              <div className="font-bold text-ink dark:text-white flex items-center gap-2">
                <span>WhatsApp: +91 81488 43278</span>
              </div>
              <div className="text-neutral-600 dark:text-neutral-300">Email: sachinreva2004@gmail.com</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a
                href={profile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-[#ff1f1f] text-white hover:bg-[#e01616] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold border border-neutral-300 dark:border-white/20 hover:border-black dark:hover:border-white transition-colors text-ink dark:text-white"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Sachin</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
