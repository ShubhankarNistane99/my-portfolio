import React from 'react';
import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface EducationProps {
  data: PortfolioData;
}

export const Education: React.FC<EducationProps> = ({ data }) => {
  const { education, visibility } = data;

  if (visibility.education === false || !education || education.length === 0) {
    return null;
  }

  return (
    <section id="education" className="py-12 md:py-14 border-b border-stone-200/60 dark:border-stone-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <p className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
            Academic Background
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Education
          </h2>
        </div>

        {/* Compact Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {education.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs hover:border-stone-300 dark:hover:border-stone-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/60 px-2 py-0.5 rounded border border-stone-200/60 dark:border-stone-700/60">
                    <Calendar className="w-3 h-3" />
                    <span>{item.period}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                  {item.degree}
                </h3>
                
                <p className="text-xs font-medium text-stone-700 dark:text-stone-300 mt-0.5">
                  {item.institution}
                </p>

                <div className="flex items-center gap-1 text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  <span>{item.location}</span>
                </div>

                {item.description && (
                  <p className="text-stone-600 dark:text-stone-400 text-xs mt-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Coursework list */}
              {item.coursework && item.coursework.length > 0 && (
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-stone-500 dark:text-stone-400 mb-1.5">
                    <BookOpen className="w-3 h-3" />
                    <span className="uppercase tracking-wider">Relevant Coursework</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.coursework.map((course, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2 py-0.5 text-[11px] font-mono rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
