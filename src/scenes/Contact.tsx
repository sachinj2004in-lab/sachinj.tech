import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data';
import { director } from '../engine/director';
import {
  Phone,
  Mail,
  Linkedin,
  Github,
  MapPin,
  ArrowUpRight,
  Copy,
  Check,
  MessageSquare,
} from 'lucide-react';
import { SeamlessCharacterVideo } from '../components/SeamlessCharacterVideo';

export const Contact: React.FC = () => {
  const { contact } = PORTFOLIO_DATA;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSent, setIsSent] = useState(false);

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(contact.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const messageText = `Hi Sachin,

Name: ${formData.name.trim()}
Email: ${formData.email.trim()}

Message:
${formData.message.trim()}`;

    const encoded = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/918148843278?text=${encoded}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsSent(true);
    setTimeout(() => setIsSent(false), 4000);
  };

  return (
    <section id="contact" className="relative w-full min-h-screen md:h-[160vh] bg-[#ff1f1f] dark:bg-[#09090b] text-white transition-colors duration-300">
      {/* Viewport Stage: Natural on mobile, Sticky on Tablet/Desktop */}
      <div className="relative md:sticky md:top-0 left-0 w-full min-h-screen md:h-screen md:overflow-y-auto flex flex-col justify-start lg:justify-between gap-3 pt-20 sm:pt-24 lg:pt-6 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto custom-scroll">
        
        {/* 1. Top Section: Header Bar & Editorial Headline */}
        <div className="relative z-20 w-full shrink-0">
          <div className="flex items-center justify-between pb-1 border-b border-white/20 dark:border-white/10">
            <div className="font-mono text-xs uppercase tracking-widest text-white/90 dark:text-neutral-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white dark:bg-[#D4AF37] animate-pulse" />
              <span>{contact.label}</span>
              <span className="text-white/40 dark:text-white/20">//</span>
              <span>DIRECT CHANNELS</span>
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-white/80 dark:text-[#D4AF37] hidden sm:block font-bold">
              READY FOR EMBEDDED &amp; FIRMWARE ROLES
            </div>
          </div>

          {/* Prominent Editorial Display Headline */}
          <div className="pt-1 select-none">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.2vw] font-black uppercase tracking-tight text-white leading-[0.88]">
              LET'S <span className="text-white dark:text-[#D4AF37]">CONNECT.</span>
            </h2>
          </div>
        </div>

        {/* 2. Middle Section: Contact Hub beside Large Character Visual (06-contact.mp4) */}
        <div className="relative z-30 w-full max-w-7xl mx-auto my-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: High-Contrast Solid Contact Hub (+9% wider on desktop) */}
            <div className="md:col-span-7">
              <div className="relative rounded-3xl bg-[#0d121c] dark:bg-[#111622] border border-white/15 dark:border-[#D4AF37]/30 shadow-2xl p-4 sm:p-5 lg:p-7 transition-all duration-300 w-full lg:w-[109%]">
            
            {/* Panel Header Bar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono text-[11px] text-neutral-300 dark:text-neutral-400 uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-bold text-white">DIRECT COMMUNICATION DESK</span>
              </span>
              <span className="text-neutral-400 dark:text-neutral-400 text-[10px] sm:text-[11px]">COIMBATORE, INDIA · GMT+5:30</span>
            </div>

            {/* Direct Channels Grid */}
            <div className="space-y-3">
              {/* Row 1: Primary Communication (Phone/WhatsApp + Email) with Solid High Contrast */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                
                {/* 1. Phone / WhatsApp */}
                <a
                  href={contact.phoneUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-[#171e2c] dark:bg-[#161c28] hover:bg-[#1e2738] border border-white/15 dark:border-white/10 hover:border-white/30 dark:hover:border-[#D4AF37]/50 p-3.5 sm:p-4 transition-all duration-200 group flex items-center justify-between gap-3 shadow-sm min-h-[44px]"
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 dark:bg-white/5 text-white dark:text-[#D4AF37] group-hover:bg-[#ff1f1f] dark:group-hover:bg-[#D4AF37] dark:group-hover:text-neutral-950 flex items-center justify-center transition-colors shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[9px] sm:text-[10px] text-neutral-400 dark:text-neutral-400 uppercase tracking-widest font-bold">
                        01 // PHONE / WHATSAPP
                      </div>
                      <div className="font-mono text-xs sm:text-base font-bold text-white tracking-wide truncate">
                        {contact.phone}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <button
                      onClick={copyPhone}
                      className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
                      title="Copy Phone Number"
                      aria-label="Copy Phone Number"
                    >
                      {copiedPhone ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white group-hover:bg-white/20 transition-colors">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </a>

                {/* 2. Email */}
                <a
                  href={`mailto:${contact.email}`}
                  className="rounded-2xl bg-[#171e2c] dark:bg-[#161c28] hover:bg-[#1e2738] border border-white/15 dark:border-white/10 hover:border-white/30 dark:hover:border-[#D4AF37]/50 p-3.5 sm:p-4 transition-all duration-200 group flex items-center justify-between gap-3 shadow-sm min-h-[44px]"
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 dark:bg-white/5 text-white dark:text-[#D4AF37] group-hover:bg-[#ff1f1f] dark:group-hover:bg-[#D4AF37] dark:group-hover:text-neutral-950 flex items-center justify-center transition-colors shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[9px] sm:text-[10px] text-neutral-400 dark:text-neutral-400 uppercase tracking-widest font-bold">
                        02 // EMAIL DESTINATION
                      </div>
                      <div className="font-mono text-xs sm:text-sm font-bold text-white tracking-wide truncate">
                        {contact.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <button
                      onClick={copyEmail}
                      className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
                      title="Copy Email"
                      aria-label="Copy Email"
                    >
                      {copiedEmail ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white group-hover:bg-white/20 transition-colors">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </a>
              </div>

              {/* Row 2: Secondary Profiles & Location */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 sm:gap-3">
                {/* 3. LinkedIn */}
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-[#171e2c] dark:bg-[#161c28] hover:bg-[#1e2738] border border-white/15 dark:border-white/10 hover:border-white/30 dark:hover:border-[#D4AF37]/50 p-2.5 sm:p-3 lg:p-3.5 transition-all duration-200 group flex items-center justify-between gap-2 shadow-sm min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/10 dark:bg-white/5 text-white dark:text-[#D4AF37] group-hover:bg-[#ff1f1f] dark:group-hover:bg-[#D4AF37] dark:group-hover:text-neutral-950 flex items-center justify-center transition-colors shrink-0">
                      <Linkedin className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-widest font-bold whitespace-nowrap">
                        03 // LINKEDIN
                      </div>
                      <div className="font-mono text-[11px] sm:text-xs font-bold text-white truncate">
                        {contact.linkedinDisplay}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors shrink-0" />
                </a>

                {/* 4. GitHub */}
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-[#171e2c] dark:bg-[#161c28] hover:bg-[#1e2738] border border-white/15 dark:border-white/10 hover:border-white/30 dark:hover:border-[#D4AF37]/50 p-2.5 sm:p-3 lg:p-3.5 transition-all duration-200 group flex items-center justify-between gap-2 shadow-sm min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/10 dark:bg-white/5 text-white dark:text-[#D4AF37] group-hover:bg-[#ff1f1f] dark:group-hover:bg-[#D4AF37] dark:group-hover:text-neutral-950 flex items-center justify-center transition-colors shrink-0">
                      <Github className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-widest font-bold whitespace-nowrap">
                        04 // GITHUB
                      </div>
                      <div className="font-mono text-[11px] sm:text-xs font-bold text-white truncate">
                        {contact.githubDisplay}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors shrink-0" />
                </a>

                {/* 5. Location */}
                <a
                  href={contact.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-[#171e2c] dark:bg-[#161c28] hover:bg-[#1e2738] border border-white/15 dark:border-white/10 hover:border-white/30 dark:hover:border-[#D4AF37]/50 p-2.5 sm:p-3 lg:p-3.5 transition-all duration-200 group flex items-center justify-between gap-2 shadow-sm min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/10 dark:bg-white/5 text-white dark:text-[#D4AF37] group-hover:bg-[#ff1f1f] dark:group-hover:bg-[#D4AF37] dark:group-hover:text-neutral-950 flex items-center justify-center transition-colors shrink-0">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-widest font-bold whitespace-nowrap">
                        05 // LOCATION
                      </div>
                      <div className="font-mono text-[11px] sm:text-xs font-bold text-white truncate">
                        {contact.location}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors shrink-0" />
                </a>
              </div>
            </div>

            {/* Divider between Contact Links and Enquiry Form */}
            <div className="my-5 border-t border-white/10" />

            {/* Premium Minimal Enquiry Form */}
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider">
                <span className="flex items-center gap-2 font-bold text-white">
                  <MessageSquare className="w-4 h-4 text-[#ff1f1f] dark:text-[#D4AF37]" />
                  <span>DIRECT INQUIRY FORM</span>
                </span>
                <span className="text-neutral-400 hidden sm:inline">DISPATCHES DIRECTLY VIA WHATSAPP</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Name Field */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-300 dark:text-neutral-400 mb-1 font-bold">
                      Your Name <span className="text-[#ff1f1f] dark:text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="e.g. Alex Henderson"
                      className={`w-full bg-[#171e2c] dark:bg-[#161c28] border ${
                        errors.name ? 'border-[#ff1f1f] ring-1 ring-[#ff1f1f]' : 'border-white/15 dark:border-white/10 focus:border-white dark:focus:border-[#D4AF37]'
                      } rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none transition-all font-sans`}
                    />
                    {errors.name && (
                      <p className="mt-1 font-mono text-[10px] text-[#ff8080] tracking-wide">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-300 dark:text-neutral-400 mb-1 font-bold">
                      Your Email <span className="text-[#ff1f1f] dark:text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="e.g. alex@company.com"
                      className={`w-full bg-[#171e2c] dark:bg-[#161c28] border ${
                        errors.email ? 'border-[#ff1f1f] ring-1 ring-[#ff1f1f]' : 'border-white/15 dark:border-white/10 focus:border-white dark:focus:border-[#D4AF37]'
                      } rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none transition-all font-sans`}
                    />
                    {errors.email && (
                      <p className="mt-1 font-mono text-[10px] text-[#ff8080] tracking-wide">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-300 dark:text-neutral-400 mb-1 font-bold">
                    Message <span className="text-[#ff1f1f] dark:text-[#D4AF37]">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    placeholder="Brief note, embedded role, or hardware project inquiry..."
                    className={`w-full resize-none bg-[#171e2c] dark:bg-[#161c28] border ${
                      errors.message ? 'border-[#ff1f1f] ring-1 ring-[#ff1f1f]' : 'border-white/15 dark:border-white/10 focus:border-white dark:focus:border-[#D4AF37]'
                    } rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none transition-all font-sans`}
                  />
                  {errors.message && (
                    <p className="mt-1 font-mono text-[10px] text-[#ff8080] tracking-wide">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-1">
                  <div className="font-mono text-[10px] text-neutral-400">
                    {isSent ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        WhatsApp launched! Click send inside WhatsApp.
                      </span>
                    ) : (
                      <span>Pre-fills WhatsApp chat · You manually send message</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-white text-black hover:bg-[#ff1f1f] hover:text-white dark:bg-[#D4AF37] dark:text-neutral-950 dark:hover:bg-[#c5a028] transition-all shadow-lg active:scale-95 group shrink-0"
                  >
                    <span>Chat on WhatsApp →</span>
                  </button>
                </div>
              </form>
            </div>

          </div>
            </div>

            {/* Right Column: Dedicated Character Visual (06-contact.mp4) matching reference screenshot */}
            <div className="flex md:col-span-5 w-full max-w-[360px] xs:max-w-[410px] md:max-w-none h-[340px] xs:h-[390px] sm:h-[440px] md:h-[55vh] lg:h-[72vh] min-h-[180px] md:min-h-[380px] lg:min-h-[480px] max-h-[660px] items-center md:items-end justify-center relative pointer-events-none bg-transparent order-first md:order-none overflow-hidden mx-auto md:mx-0">
              <SeamlessCharacterVideo
                sectionId="contact"
                videoSrc="/videos/06-contact.mp4"
                position="center"
                parallaxStrength={10}
                className="object-contain object-bottom scale-[1.45] xs:scale-[1.55] sm:scale-[1.6] md:scale-[1.35] lg:scale-[2.05] origin-center md:origin-bottom lg:translate-x-10 xl:translate-x-14 lg:translate-y-3"
              />
            </div>

          </div>
        </div>

        {/* 4. Footer: Centered "THANK YOU FOR VISITING" in Rich Gold with Comfortable Spacing */}
        <div className="relative z-30 w-full pt-2 pb-3 sm:pb-4 flex flex-col items-center justify-center shrink-0">
          <button
            onClick={() => director.scrollToScene('hero')}
            title="Back to Top"
            className="group flex items-center justify-center gap-4 sm:gap-6 w-full max-w-xl mx-auto cursor-pointer focus:outline-none transition-transform active:scale-95"
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]/80 group-hover:via-[#F3E5AB] group-hover:to-[#D4AF37] transition-all" />
            
            <span className="font-sans font-extrabold text-sm sm:text-base md:text-lg uppercase tracking-[0.22em] text-[#D4AF37] group-hover:text-[#F3E5AB] transition-colors drop-shadow-sm select-none whitespace-nowrap">
              THANK YOU FOR VISITING
            </span>
            
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]/80 group-hover:via-[#F3E5AB] group-hover:to-[#D4AF37] transition-all" />
          </button>
        </div>

      </div>
    </section>
  );
};
