import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface FooterProps {
  data: PortfolioData;
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
  const { personal } = data;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 bg-stone-100/60 dark:bg-stone-950 border-t border-stone-200/80 dark:border-stone-800/80 text-stone-500 dark:text-stone-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Minimal Copyright */}
        <p className="font-mono">
          © {currentYear} {personal.name || 'Shubhankar Nistane'}. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-5 font-mono text-xs">
          {data.social.github && (
            <a
              href={data.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              GitHub
            </a>
          )}
          {data.social.linkedin && (
            <a
              href={data.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              LinkedIn
            </a>
          )}
        </div>

        {/* Back to top */}
        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            type="button"
            className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors font-mono"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
