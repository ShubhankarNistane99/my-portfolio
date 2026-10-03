import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Github, Linkedin } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { PortfolioData } from '../types/portfolio';

interface NavbarProps {
  data: PortfolioData;
}

export const Navbar: React.FC<NavbarProps> = ({ data }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Exact section order: About -> Experience -> Projects -> Skills -> Education -> Certifications -> Contact
  const navLinks = [
    { label: 'About', href: '#about', show: data.visibility.about !== false },
    { label: 'Experience', href: '#experience', show: data.visibility.experience !== false && data.experience.length > 0 },
    { label: 'Skills', href: '#skills', show: data.visibility.skills !== false && data.skills.length > 0 },
    { label: 'Projects', href: '#projects', show: data.visibility.projects !== false && data.projects.length > 0 },
    { 
      label: 'Achievements', 
      href: '#achievements', 
      show: data.visibility.achievements !== false && 
            data.visibility.certifications !== false && 
            Boolean(data.achievements && data.achievements.filter(a => a.title && a.title.trim() !== '').length > 0) 
    },
    { label: 'Education', href: '#education', show: data.visibility.education !== false && data.education.length > 0 },
    { label: 'Contact', href: '#contact', show: data.visibility.contact !== false },
  ].filter((item) => item.show);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 shadow-2xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Wordmark / Brand */}
        <a
          href="#"
          className="text-base sm:text-lg font-extrabold tracking-tight text-stone-900 dark:text-stone-100 hover:opacity-80 transition-opacity"
        >
          {data.personal.name || 'Portfolio'}
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-400"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions (Theme Toggle, Social Links, Resume Button) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {data.social.github && (
            <a
              href={data.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hidden sm:inline-flex p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          {data.social.linkedin && (
            <a
              href={data.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hidden sm:inline-flex p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}

          <ThemeToggle />

          {/* Dedicated Resume Action in Navbar (opens uploaded authentic resume PDF) */}
          {data.personal.resumeUrl && (
            <a
              href={data.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 hover:bg-stone-800 dark:hover:bg-white transition-colors whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 py-4 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-50 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2.5">
            <div className="flex items-center gap-3">
              {data.social.github && (
                <a
                  href={data.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {data.social.linkedin && (
                <a
                  href={data.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>

            {data.personal.resumeUrl && (
              <a
                href={data.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="w-full justify-center inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Resume (PDF)</span>
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
