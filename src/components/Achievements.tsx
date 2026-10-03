import React from 'react';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface AchievementsProps {
  data: PortfolioData;
}

export const Achievements: React.FC<AchievementsProps> = ({ data }) => {
  const { achievements, visibility } = data;

  // Filter for valid certificates with actual content
  const validAchievements = (achievements || []).filter(
    (item) => item.title && item.title.trim() !== ''
  );

  // Automatically hide section when no data is provided or visibility is disabled
  if (
    visibility.achievements === false ||
    visibility.certifications === false ||
    validAchievements.length === 0
  ) {
    return null;
  }

  return (
    <section id="achievements" className="relative py-12 md:py-14 border-b border-stone-200/60 dark:border-stone-800/60">
      <span id="certifications" className="absolute -top-20" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <p className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
            Industry Recognition
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Achievements & Certifications
          </h2>
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {validAchievements.map((item) => {
            const isFeatured = item.title.includes('RISE') || item.title.includes('IEEE');

            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 rounded-xl border transition-all flex items-start gap-3.5 ${
                  isFeatured
                    ? 'bg-stone-50/80 dark:bg-stone-850/80 border-stone-300 dark:border-stone-700 shadow-xs'
                    : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-2xs hover:border-stone-300 dark:hover:border-stone-700'
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    isFeatured
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100'
                  }`}
                >
                  <Award className="w-4 h-4" />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                        {item.title}
                      </h3>
                      {isFeatured && (
                        <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-stone-200/90 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold border border-stone-300 dark:border-stone-700">
                          Honor
                        </span>
                      )}
                    </div>
                    
                    {item.date && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded shrink-0">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date}</span>
                      </span>
                    )}
                  </div>

                  {item.issuer && (
                    <p className="text-xs font-medium text-stone-600 dark:text-stone-300">
                      {item.issuer}
                    </p>
                  )}

                  {item.description && (
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 pt-1 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  {item.credentialUrl && (
                    <div className="pt-1.5">
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-stone-900 dark:text-stone-100 hover:underline"
                      >
                        <span>Verify Credential</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
