import React, { useState } from 'react';
import { Mail, Github, Linkedin, MessageSquare, MapPin, Send, ExternalLink, Copy, Check, Phone, ArrowUpRight } from 'lucide-react';
import { ContactFormData } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = `Hello Sachin,\n\nName: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\nRegarding: ${formData.subject.trim() || 'Embedded Systems Inquiry'}\n\nMessage:\n${formData.message.trim()}`;

    const encodedMessage = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/918148843278?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('sachinreva2004@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden bg-neutral-50/50 dark:bg-neutral-950/40">
      {/* Technical Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15 tech-grid-light dark:tech-grid-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF1F1F] mb-2 font-bold tracking-wider">
              <span>// 07. DIRECT CHANNELS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-neutral-950 dark:text-white">
              GET IN <span className="text-[#FF1F1F]">TOUCH</span>
            </h2>
            <p className="text-sm font-sans text-neutral-600 dark:text-neutral-400 max-w-xl mt-3">
              Available for embedded software roles, hardware prototyping collaborations, and technical discussions.
            </p>
          </div>

          <div className="text-right">
            <span className="font-display font-black text-6xl sm:text-8xl text-neutral-200 dark:text-neutral-800/80 leading-none select-none">
              07
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Verified Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0F14] space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800 font-mono text-xs text-neutral-400 uppercase tracking-wider">
                <span>COMMUNICATION TELEMETRY</span>
                <span className="text-emerald-500 flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  REACHABLE
                </span>
              </div>

              {/* Direct Links */}
              <div className="space-y-4 font-mono text-xs">
                {/* Email Item */}
                <div className="p-3.5 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[#FF1F1F]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase">PRIMARY EMAIL</span>
                      <a
                        href="mailto:sachinreva2004@gmail.com"
                        className="font-medium text-neutral-900 dark:text-white hover:text-[#FF1F1F] dark:hover:text-[#FF1F1F] transition-colors"
                      >
                        sachinreva2004@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 transition-colors"
                    title="Copy email address"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* WhatsApp Item */}
                <div className="p-3.5 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase">WHATSAPP / PHONE</span>
                      <a
                        href="https://wa.me/918148843278"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-neutral-900 dark:text-white hover:text-emerald-500 transition-colors"
                      >
                        +91 81488 43278
                      </a>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/918148843278"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-neutral-400 hover:text-emerald-500"
                    aria-label="Open WhatsApp direct chat"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* GitHub Item */}
                <div className="p-3.5 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase">GITHUB REPOSITORY</span>
                      <a
                        href="https://github.com/sachin2004-roxx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-neutral-900 dark:text-white hover:text-[#FF1F1F] dark:hover:text-[#FF1F1F] transition-colors"
                      >
                        github.com/sachin2004-roxx
                      </a>
                    </div>
                  </div>
                  <a
                    href="https://github.com/sachin2004-roxx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-neutral-400 hover:text-[#FF1F1F]"
                    aria-label="Open GitHub Profile"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* LinkedIn Item */}
                <div className="p-3.5 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase">LINKEDIN PROFESSIONAL</span>
                      <a
                        href="https://www.linkedin.com/in/sachin-j-b18011276"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-neutral-900 dark:text-white hover:text-blue-500 transition-colors"
                      >
                        linkedin.com/in/sachin-j-b18011276
                      </a>
                    </div>
                  </div>
                  <a
                    href="https://www.linkedin.com/in/sachin-j-b18011276"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-neutral-400 hover:text-blue-500"
                    aria-label="Open LinkedIn Profile"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Location Item */}
                <div className="p-3.5 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[#FF1F1F]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase">PHYSICAL LOCATION</span>
                      <span className="font-medium text-neutral-900 dark:text-white">
                        Coimbatore, Tamil Nadu, India
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-neutral-400">11.0168° N</span>
                </div>
              </div>
            </div>
          </div>

          {/* Functional WhatsApp Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0F14] shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
                  <MessageSquare className="w-4 h-4 text-[#FF1F1F]" />
                  <span>DIRECT WHATSAPP DISPATCH FORM</span>
                </div>
                <span className="font-mono text-[10px] text-[#FF1F1F] font-bold">LIVE REDIRECT</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="block font-mono text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                    >
                      YOUR NAME *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Alex Parker"
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#FF1F1F] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block font-mono text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                    >
                      YOUR EMAIL *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g., alex@company.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#FF1F1F] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="subject"
                    className="block font-mono text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                  >
                    SUBJECT / INQUIRY TOPIC
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g., Embedded Software Internship Opportunity"
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#FF1F1F] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="block font-mono text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                  >
                    MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your inquiry, project scope, or opportunity..."
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#FF1F1F] transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-lg font-mono text-xs sm:text-sm font-bold bg-[#FF1F1F] text-white hover:bg-[#E01616] transition-all flex items-center justify-center gap-2 shadow-md shadow-red-500/10 active:scale-[0.99]"
                  >
                    <span>LAUNCH WHATSAPP WITH MESSAGE</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {/* Honest Transparency Notice */}
                <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 text-center pt-2 leading-relaxed">
                  Notice: Submitting will generate a URL-encoded message draft and immediately launch WhatsApp connected to Sachin's verified line (+91 81488 43278).
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
