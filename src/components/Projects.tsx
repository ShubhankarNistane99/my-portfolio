import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Eye, Cpu, Trophy } from 'lucide-react';
import { PortfolioData, ProjectItem } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';

interface ProjectsProps {
  data: PortfolioData;
}

export const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const { projects, visibility } = data;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Synchronize case study view with dedicated URL hash (#case-study-[id])
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#case-study-')) {
        const projectId = hash.replace('#case-study-', '');
        const target = projects.find((p) => p.id === projectId);
        if (target) {
          setSelectedProject(target);
          return;
        }
      }
      setSelectedProject(null);
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, [projects]);

  const handleOpenProject = (project: ProjectItem) => {
    window.location.hash = `case-study-${project.id}`;
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    if (window.location.hash.startsWith('#case-study-')) {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  if (visibility.projects === false || !projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="py-12 md:py-16 border-b border-stone-200/60 dark:border-stone-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Projects
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm mt-1.5">
            Engineering projects detailing problem statements, technical approaches, implementation contributions, and results.
          </p>
        </div>

        {/* Primary Focus: Scannable Case Study Cards List (No Placeholder Grid Image) */}
        <div className="space-y-6">
          {projects.map((project, idx) => {
            const resultText = project.result || (project.results && project.results.length > 0 ? project.results[0] : null);
            const approachText = project.approach || project.solution;

            return (
              <article
                key={project.id}
                className="group rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-200 p-6 sm:p-7 md:p-8 space-y-4"
              >
                {/* Header: Project Index, Category & Quick Case Study Action */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 text-xs font-mono font-medium">
                      0{idx + 1}
                    </span>
                    {project.category && (
                      <span className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
                        {project.category}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleOpenProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Case Study Breakdown</span>
                  </button>
                </div>

                {/* Title */}
                <div>
                  <h3
                    onClick={() => handleOpenProject(project)}
                    className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight hover:underline cursor-pointer"
                  >
                    {project.title}
                  </h3>
                </div>

                {/* Challenge & Approach Summary */}
                <div className="space-y-2 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {project.problem && (
                    <p>
                      <strong className="text-stone-900 dark:text-stone-100 font-mono text-xs uppercase mr-1">Problem:</strong>
                      {project.problem}
                    </p>
                  )}
                  {approachText && (
                    <p>
                      <strong className="text-stone-900 dark:text-stone-100 font-mono text-xs uppercase mr-1">Approach:</strong>
                      {approachText}
                    </p>
                  )}
                </div>

                {/* Optional Result / Outcome */}
                {resultText && (
                  <div className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-900/40 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
                    <Trophy className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{resultText}</span>
                  </div>
                )}

                {/* Stack and Action Links */}
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
                  
                  {/* Tech tags */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 text-xs font-mono rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/60 dark:border-stone-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Repository</span>
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 text-xs font-medium hover:bg-stone-800 dark:hover:bg-white transition-colors"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Detailed Case-Study Modal backed by URL hash */}
      <ProjectModal
        project={selectedProject}
        onClose={handleCloseProject}
      />
    </section>
  );
};
