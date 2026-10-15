import React, { useState } from 'react';
import { CharacterVideo } from './CharacterVideo';
import { Mail, Phone, Github, Linkedin, Send, ArrowUpRight, Copy, Check } from 'lucide-react';
import { ContactFormData } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `Hello Sachin,\n\nName: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\nRegarding: ${formData.subject.trim() || 'Embedded Systems Inquiry'}\n\nMessage:\n${formData.message.trim()}`;
    const url = `https://wa.me/918148843278?text=${encodeURIComponent(formatted)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('sachinreva2004@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden bg-[#FF1F1F] text-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag matching reference */}
        <div className="font-mono text-xs text-white/80 tracking-wider mb-4">
          <span>[ 07 — CONTACT ]</span>
        </div>

        {/* Central Stage: Giant White LET'S TALK + Sachin in front */}
        <div className="relative min-h-[480px] sm:min-h-[580px] flex flex-col items-center justify-center text-center">
          
          {/* Giant White Typography matching 00:15 of reference video: LET'S TALK */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
            <h2 className="font-display text-[20vw] sm:text-[18vw] font-black uppercase tracking-tighter text-white leading-none whitespace-nowrap">
              LET'S TALK
            </h2>
          </div>

          {/* Character standing smiling directly in front of the giant letters */}
          <div className="relative z-10 w-full max-w-xs sm:max-w-sm aspect-[4/5] flex items-center justify-center my-auto">
            <CharacterVideo
              segment="contact"
              className="w-full h-full mix-blend-normal drop-shadow-2xl"
            />
          </div>

          {/* Floating High-Contrast Email Card matching reference video */}
          <div className="relative z-20 mt-4 max-w-2xl w-full mx-auto bg-black/85 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-xs text-white/70 tracking-widest uppercase block">
                DIRECT INBOX
              </span>
              <a
                href="mailto:sachinreva2004@gmail.com"
                className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white hover:text-[#FF1F1F] transition-colors break-all"
              >
                SACHINREVA2004@GMAIL.COM
              </a>
            </div>

            {/* Direct Action Channels */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {/* WhatsApp direct chat button */}
              <button
                onClick={() => setShowFormModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#FF1F1F] text-white hover:bg-[#E01616] transition-all shadow-lg active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </button>

              {/* GitHub */}
              <a
                href="https://github.com/sachin2004-roxx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20 active:scale-95"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/sachin-j-b18011276"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20 active:scale-95"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Copy Email Button */}
              <button
                onClick={copyEmail}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20"
                title="Copy Email"
                aria-label="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>

        {/* Modal WhatsApp Form for User Pre-Drafting */}
        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#0D0F14] text-neutral-900 dark:text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <div className="font-display font-black text-xl">
                  DRAFT WHATSAPP MESSAGE
                </div>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-mono text-xs p-1"
                >
                  [CLOSE ✕]
                </button>
              </div>

              <form onSubmit={handleWhatsAppSend} className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-neutral-500">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Connor"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF1F1F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-xs text-neutral-500">YOUR EMAIL *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. sarah@firmware.io"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF1F1F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-xs text-neutral-500">MESSAGE *</label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hello Sachin, I'd like to discuss an embedded role / collaboration..."
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF1F1F] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full font-sans font-bold text-sm bg-[#FF1F1F] text-white hover:bg-[#E01616] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Open in WhatsApp (+91 81488 43278)</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
