import React, { useState } from 'react';
import { ArrowDown, Copy, Check, Layers, ArrowUpRight, Github, Linkedin, FileText } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroProps {
  data: PortfolioData;
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const { personal, social } = data;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (personal.email) {
      navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const hasRealProfileImage = Boolean(
    personal.profileImage &&
    personal.profileImage.trim() !== '' &&
    personal.profileImage !== '/profile.jpg' &&
    !personal.profileImage.includes('placeholder')
  );

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 border-b border-stone-200/60 dark:border-stone-800/60">
      {/* Subtle ambient background accent (Minimalist & Restrained) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-stone-200/40 via-stone-100/20 to-transparent dark:from-stone-800/25 dark:via-stone-900/10 dark:to-transparent blur-3xl opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.04] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(#fff_1px,transparent_1px)]"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 ${hasRealProfileImage ? 'lg:grid-cols-12 gap-10 lg:gap-8' : 'max-w-4xl'} items-center`}>
          
          {/* Main Hero Content */}
          <div className={`${hasRealProfileImage ? 'lg:col-span-8' : 'w-full'} flex flex-col items-start space-y-6`}>
            
            {/* Availability: Unboxed clean text metadata */}
            {personal.availabilityStatus && (
              <div className="flex items-center gap-2 text-xs md:text-sm text-stone-700 dark:text-stone-300 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{personal.availabilityStatus}</span>
              </div>
            )}

            {/* Structured Headline: Name + [PROFESSIONAL TITLE] + [SPECIALIZATION] */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50 text-balance leading-[1.15]">
                {personal.name}
              </h1>
              
              <div className="flex flex-wrap items-baseline gap-2 pt-0.5">
                <span className="text-xl sm:text-2xl font-bold text-stone-800 dark:text-stone-200">
                  {personal.title}
                </span>
                {personal.specialization && (
                  <>
                    <span className="text-stone-400 dark:text-stone-600 hidden sm:inline" aria-hidden="true">—</span>
                    <span className="text-base sm:text-lg font-medium text-stone-600 dark:text-stone-400">
                      {personal.specialization}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 max-w-2xl leading-relaxed text-pretty font-normal">
              {personal.valueProposition || personal.tagline}
            </p>

            {/* 30-Second Recruiter Technical Stack Snapshot */}
            {personal.coreStack && personal.coreStack.length > 0 && (
              <div className="w-full pt-1 pb-1">
                <div className="p-3.5 rounded-xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800/80 shadow-2xs">
                  <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span className="font-semibold">Core Technical Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {personal.coreStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-mono rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200/60 dark:border-stone-700/60 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Primary Action Buttons: View Experience, Resume, and Get in Touch */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-medium text-sm hover:bg-stone-800 dark:hover:bg-white transition-all shadow-xs hover:shadow-sm"
              >
                <span>View Work Experience</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              {personal.resumeUrl && (
                <a
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium text-sm transition-colors shadow-2xs"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume</span>
                </a>
              )}

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium text-sm transition-colors"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {personal.email && (
                <button
                  onClick={handleCopyEmail}
                  type="button"
                  aria-label="Copy email address"
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 text-xs font-mono transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{personal.email}</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Primary Profiles: GitHub and LinkedIn */}
            {(social.github || social.linkedin) && (
              <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-stone-200/80 dark:border-stone-800/80 text-stone-600 dark:text-stone-400 text-xs sm:text-sm">
                <span className="font-mono text-[11px] uppercase tracking-wider text-stone-400">Profiles:</span>
                
                {social.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors font-medium"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}

                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors font-medium"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            )}

          </div>

          {/* Profile Image Column (Only rendered when a verified real photo is provided) */}
          {hasRealProfileImage && (
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
                  <ImageWithFallback
                    src={personal.profileImage}
                    alt={personal.name}
                    fallbackType="avatar"
                    fallbackText={personal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
