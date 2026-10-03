import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface AboutProps {
  data: PortfolioData;
}

export const About: React.FC<AboutProps> = ({ data }) => {
  const { about, visibility } = data;

  if (visibility.about === false) return null;

  // Only display statistics when meaningful real values are provided (not placeholder '[NUMBER]+')
  const validStats = (about.stats || []).filter(
    (stat) => stat.value && !stat.value.includes('[NUMBER]') && stat.value.trim() !== ''
  );
  const showStats = visibility.stats === true && validStats.length > 0;

  return (
    <section id="about" className="py-11 md:py-14 border-b border-stone-200/60 dark:border-stone-800/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-6 md:mb-8">
          <p className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
            {about.subheading || 'Background & Engineering Philosophy'}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {about.heading || 'About Me'}
          </h2>
        </div>

        {/* Condensed Biography (approx. 80–100 words) */}
        <div className="space-y-6">
          <div className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed space-y-3">
            {about.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Core Engineering Focus Areas */}
          {about.highlights && about.highlights.length > 0 && (
            <div className="pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {about.highlights.map((highlight, index) => {
                  const isObj = typeof highlight === 'object' && highlight !== null;
                  const title = isObj ? highlight.title : null;
                  const desc = isObj ? highlight.description : String(highlight);

                  return (
                    <div
                      key={index}
                      className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1 shadow-2xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-stone-900 dark:text-stone-100 mb-1" />
                      {title && (
                        <h3 className="font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm tracking-tight">
                          {title}
                        </h3>
                      )}
                      <p className="text-stone-600 dark:text-stone-400 text-xs leading-snug">
                        {desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Optional Verified Statistics (Only rendered when real, non-placeholder values exist) */}
        {showStats && (
          <div className="mt-8 pt-6 border-t border-stone-200/60 dark:border-stone-800/60">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {validStats.map((stat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/40 dark:bg-stone-900/30 border border-stone-200/60 dark:border-stone-800/60 space-y-0.5">
                  <div className="text-2xl font-extrabold tracking-tight font-mono tabular-nums text-stone-900 dark:text-stone-100">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    {stat.label}
                  </div>
                  {stat.description && (
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-normal">
                      {stat.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
