import React from 'react';
import { Quote } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';
import { ImageWithFallback } from './ImageWithFallback';

interface TestimonialsProps {
  data: PortfolioData;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ data }) => {
  const { testimonials, visibility } = data;

  // Rule: Do not show fake reviews; if array is empty or hidden, hide section completely
  if (visibility.testimonials === false || !testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 md:py-28 border-b border-stone-200/60 dark:border-stone-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
            Endorsements & Recommendations
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            What Colleagues & Clients Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 md:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-stone-300 dark:text-stone-700 mb-4" />
                <p className="text-sm md:text-base text-stone-700 dark:text-stone-300 italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-stone-100 dark:border-stone-800">
                <ImageWithFallback
                  src={item.avatar}
                  alt={item.author}
                  fallbackType="avatar"
                  fallbackText={item.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {item.author}
                  </h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {item.role}, {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
