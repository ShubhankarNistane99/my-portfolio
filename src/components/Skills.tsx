import React from 'react';
import { PortfolioData } from '../types/portfolio';
import { Terminal, Server, Database, Network, Cloud, Layout, GitBranch, Wrench, Sparkles, Cpu } from 'lucide-react';

interface SkillsProps {
  data: PortfolioData;
}

export const Skills: React.FC<SkillsProps> = ({ data }) => {
  const { skills, visibility } = data;

  if (visibility.skills === false || !skills || skills.length === 0) {
    return null;
  }

  const getCategoryIcon = (title: string, idx: number) => {
    const t = title.toLowerCase();
    if (t.includes('ai') || t.includes('assist')) {
      return <Sparkles className="w-4 h-4" />;
    }
    if (t.includes('integration') || t.includes('messaging')) {
      return <Network className="w-4 h-4" />;
    }
    if (t.includes('cloud') || t.includes('devops')) {
      return <Cloud className="w-4 h-4" />;
    }
    if (t.includes('frontend') || t.includes('ui')) {
      return <Layout className="w-4 h-4" />;
    }
    if (t.includes('database') || t.includes('storage')) {
      return <Database className="w-4 h-4" />;
    }
    if (t.includes('backend') || t.includes('framework')) {
      return <Server className="w-4 h-4" />;
    }
    if (t.includes('version') || t.includes('build')) {
      return <GitBranch className="w-4 h-4" />;
    }
    if (t.includes('tool')) {
      return <Wrench className="w-4 h-4" />;
    }
    if (t.includes('language') || t.includes('program')) {
      return <Terminal className="w-4 h-4" />;
    }
    
    // Fallbacks
    if (idx === 0) return <Terminal className="w-4 h-4" />;
    if (idx === 1) return <Server className="w-4 h-4" />;
    return <Cpu className="w-4 h-4" />;
  };


  return (
    <section id="skills" className="py-12 md:py-16 border-b border-stone-200/60 dark:border-stone-800/60 bg-stone-100/40 dark:bg-stone-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <p className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
            Technical Competencies
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Skills & Technologies
          </h2>
        </div>

        {/* Compact High-Density Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((category, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs hover:border-stone-300 dark:hover:border-stone-700 transition-all"
            >
              <div>
                <div className="flex items-center gap-2 mb-3 text-stone-900 dark:text-stone-100">
                  <div className="p-1.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    {getCategoryIcon(category.title, idx)}
                  </div>
                  <h3 className="text-sm font-bold tracking-tight">
                    {category.title}
                  </h3>
                </div>

                {/* Compact, clean uniform tags */}
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 text-xs font-mono rounded transition-colors bg-stone-100/90 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 border border-stone-200/60 dark:border-stone-700/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
