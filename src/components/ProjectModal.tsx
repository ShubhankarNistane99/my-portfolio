import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Wrench, Trophy, UserCheck, BookOpen } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { ImageWithFallback } from './ImageWithFallback';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Check if verified result or outcome is available (optional)
  const hasResult = Boolean(
    (project.result && project.result.trim() !== '') ||
    (project.results && project.results.length > 0)
  );

  const approachText = project.approach || project.solution;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-stone-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 text-stone-900 dark:text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar: Category, Actions & Close Button */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800 mb-6">
          <div className="space-y-1">
            {project.category && (
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Case Study · {project.category}
              </span>
            )}
            <h2 id="case-study-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              aria-label="Close case study dialog"
              className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Optional Visual Asset (Omitted if no real image asset is provided) */}
        {project.image && !project.image.startsWith('/project-') && (
          <div className="rounded-xl overflow-hidden mb-8 aspect-video max-h-80 w-full border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950">
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              fallbackType="project"
              fallbackText={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Structured Engineering Sections */}
        <div className="space-y-6 mb-8">
          
          {/* 1. Problem Statement */}
          <div className="p-5 rounded-xl bg-stone-50/80 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>1. Problem Statement & Challenge</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed whitespace-pre-line pl-6">
              {project.problem}
            </p>
          </div>

          {/* 2. Approach & Architecture */}
          {approachText && (
            <div className="p-5 rounded-xl bg-stone-50/80 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80 space-y-2">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-mono text-xs font-semibold uppercase tracking-wider">
                <Wrench className="w-4 h-4 shrink-0" />
                <span>2. Approach & System Architecture</span>
              </div>
              <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed whitespace-pre-line pl-6">
                {approachText}
              </p>
            </div>
          )}

          {/* 3. My Contribution & Individual Ownership */}
          <div className="p-5 rounded-xl bg-stone-50/80 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80 space-y-2">
            <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-mono text-xs font-semibold uppercase tracking-wider">
              <UserCheck className="w-4 h-4 shrink-0" />
              <span>3. My Contribution & Code Deliverables</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed whitespace-pre-line pl-6">
              {project.contribution}
            </p>
          </div>

          {/* 4. Technologies & Tooling */}
          <div className="p-5 rounded-xl bg-stone-50/80 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80 space-y-2.5">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
              4. Technical Stack & Dependencies
            </span>
            <div className="flex flex-wrap gap-2 pl-1">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 5. Result & Outcomes (OPTIONAL: Gracefully omitted when absent) */}
          {hasResult && (
            <div className="p-5 rounded-xl bg-stone-50/80 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider">
                <Trophy className="w-4 h-4 shrink-0" />
                <span>5. Results & Outcomes</span>
              </div>
              <div className="pl-6 space-y-2">
                {project.result && (
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                    {project.result}
                  </p>
                )}
                {project.results && project.results.length > 0 && (
                  <ul className="space-y-1.5 pt-1">
                    {project.results.map((res, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* 6. Case Study Narrative (OPTIONAL) */}
          {project.caseStudy && (
            <div className="p-5 rounded-xl bg-stone-50/80 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80 space-y-2">
              <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300 font-mono text-xs font-semibold uppercase tracking-wider">
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>Case Study Narrative & Trade-offs</span>
              </div>
              <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed whitespace-pre-line pl-6">
                {project.caseStudy}
              </p>
            </div>
          )}

        </div>

        {/* Footer Actions: Repository, Live Demo, Close */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 text-xs sm:text-sm font-medium hover:bg-stone-800 dark:hover:bg-white transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs sm:text-sm font-medium transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repository</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-medium rounded-lg text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
          >
            Close Case Study
          </button>
        </div>

      </div>
    </div>
  );
};
