import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface ResumeProps {
  data: PortfolioData;
}

export const Resume: React.FC<ResumeProps> = ({ data }) => {
  const { resume, personal, visibility } = data;

  if (visibility.resume === false || !resume) {
    return null;
  }

  const downloadUrl = resume.downloadUrl || personal.resumeUrl || '/Shubhankar_Nistane_Resume.pdf';
  const viewUrl = resume.viewUrl || downloadUrl;
  const filename = resume.filename || 'Shubhankar_Nistane_Resume.pdf';

  return (
    <section id="resume" className="py-20 md:py-24 border-b border-stone-200/60 dark:border-stone-800/60 bg-stone-100/60 dark:bg-stone-900/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Document Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm border border-stone-200 dark:border-stone-700 mx-auto">
          <FileText className="w-6 h-6 stroke-[1.5]" />
        </div>

        {/* Section Heading & Subheading */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
            {resume.subheading || 'Curriculum Vitae'}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {resume.heading || 'Interested in learning more?'}
          </h2>
        </div>

        {/* CTA Text */}
        <p className="text-sm md:text-base text-stone-600 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
          {resume.ctaText || 'Download my full resume for an in-depth summary of technical proficiencies, project milestones, and professional history.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={downloadUrl}
            download={filename}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-medium text-sm hover:bg-stone-800 dark:hover:bg-white transition-all shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </a>

          {viewUrl && (
            <a
              href={viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/80 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium text-sm transition-colors"
            >
              <span>View Resume</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* PDF Metadata note */}
        <p className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
          Format: PDF document · Location: <code className="text-stone-600 dark:text-stone-400">/public{downloadUrl}</code>
        </p>

      </div>
    </section>
  );
};
