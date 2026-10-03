import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read from localStorage or system preference
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      setTheme(storedTheme);
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-lg border border-stone-200 dark:border-stone-800 ${className}`} />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 hover:bg-stone-100 dark:bg-stone-900 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-600 ${className}`}
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4 stroke-[1.75]" />
      ) : (
        <Sun className="w-4 h-4 stroke-[1.75]" />
      )}
    </button>
  );
};
