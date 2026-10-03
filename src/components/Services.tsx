import React from 'react';
import { Sparkles, Check, ArrowUpRight } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface ServicesProps {
  data: PortfolioData;
}

export const Services: React.FC<ServicesProps> = ({ data }) => {
  const { services, visibility } = data;

  if (visibility.services === false || !services || services.length === 0) {
    return null;
  }

  return (
    <section id="services" className="py-20 md:py-28 border-b border-stone-200/60 dark:border-stone-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
            Offerings & Specializations
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            What I Do
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id || index}
              className="p-6 md:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between hover:border-stone-300 dark:hover:border-stone-700 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-stone-400">
                    0{index + 1}.
                  </span>
                  <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 tracking-tight group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-stone-600 dark:text-stone-400 mt-3 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {service.deliverables && service.deliverables.length > 0 && (
                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800/80">
                  <span className="text-[11px] font-mono uppercase text-stone-400 block mb-2">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-1 text-xs text-stone-600 dark:text-stone-400">
                    {service.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-stone-900 dark:text-stone-100 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
