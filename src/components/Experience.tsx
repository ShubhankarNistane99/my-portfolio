import React from 'react';
import { Briefcase, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface ExperienceProps {
  data: PortfolioData;
}

export const Experience: React.FC<ExperienceProps> = ({ data }) => {
  const { experience, visibility } = data;

  if (visibility.experience === false || !experience || experience.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-12 md:py-16 border-b border-stone-200/60 dark:border-stone-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Work Experience
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm mt-1.5">
            Chronological engineering roles, key deliverables, and production responsibilities.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative space-y-8 sm:space-y-10 before:absolute before:inset-0 before:left-3 sm:before:left-5 before:w-px before:bg-stone-200 dark:before:bg-stone-800">
          {experience.map((item) => (
            <div key={item.id} className="relative flex items-start gap-4 sm:gap-6 group">
              
              {/* Timeline Marker Dot */}
              <div className="relative z-10 flex items-center justify-center w-6 sm:w-10 h-6 sm:h-10 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 group-hover:border-stone-900 dark:group-hover:border-stone-100 transition-colors shrink-0 mt-1">
                <Briefcase className="w-3 sm:w-4 h-3 sm:h-4" />
              </div>

              {/* Experience Card */}
              <div className="flex-1 p-6 sm:p-7 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs hover:border-stone-300 dark:hover:border-stone-700 transition-all">
                
                {/* Header row: Role, Company, Period */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4 mb-3">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                      {item.role}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-stone-600 dark:text-stone-400 mt-1">
                      {item.companyUrl ? (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-stone-900 dark:text-stone-100 hover:underline inline-flex items-center gap-1"
                        >
                          <span>{item.company}</span>
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </a>
                      ) : (
                        <span className="font-medium text-stone-900 dark:text-stone-100">{item.company}</span>
                      )}
                      
                      <span aria-hidden="true" className="text-stone-400">·</span>
                      
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span>{item.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Period Badge */}
                  <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                    {item.current && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800/60 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Current</span>
                      </span>
                    )}
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/60 px-3 py-1 rounded-md border border-stone-200/60 dark:border-stone-700/60">
                      <Calendar className="w-3 h-3" />
                      <span>{item.period}</span>
                    </div>
                  </div>
                </div>

                {/* Brief Role Scope */}
                {item.description && (
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                )}

                {/* Maximum 3–5 Concise Bullets per role */}
                {item.responsibilities && item.responsibilities.length > 0 && (
                  <div className="space-y-1.5 mb-4">
                    <ul className="space-y-2.5 text-sm text-stone-700 dark:text-stone-300">
                      {item.responsibilities.slice(0, 5).map((bullet, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2.5">
                          <span className="text-stone-400 font-mono mt-0.5">•</span>
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies List */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-mono uppercase text-stone-400 mr-1">Stack:</span>
                    {item.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 text-xs font-mono rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
