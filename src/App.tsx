/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { portfolioData } from './data/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Achievements } from './components/Achievements';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  useEffect(() => {
    // Sync SEO document title from config
    if (portfolioData.seo?.pageTitle) {
      document.title = portfolioData.seo.pageTitle;
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans selection:bg-stone-900 selection:text-white dark:selection:bg-stone-100 dark:selection:text-stone-950 transition-colors duration-200">
      
      {/* Sticky Top Navigation */}
      <Navbar data={portfolioData} />

      {/* Recruiter-Optimized Main Flow */}
      <main className="flex-1">
        {/* 1. Hero with 30-Second Core Stack Snapshot & Quick Actions */}
        <Hero data={portfolioData} />

        {/* 2. Streamlined About Me (High-signal engineering background, ~80–100 words) */}
        <About data={portfolioData} />

        {/* 3. Work Experience (Chronological Timeline with enterprise roles) */}
        <Experience data={portfolioData} />

        {/* 4. Compact Technical Skills Matrix */}
        <Skills data={portfolioData} />

        {/* 5. Selected Projects (Real projects only, no filler) */}
        <Projects data={portfolioData} />

        {/* 6. Compact Certifications & Achievements */}
        <Achievements data={portfolioData} />

        {/* 7. Compact Education */}
        <Education data={portfolioData} />

        {/* Optional Services (Auto-hidden unless explicitly provided) */}
        {portfolioData.visibility.services && portfolioData.services && portfolioData.services.length > 0 && (
          <Services data={portfolioData} />
        )}

        {/* 8. Direct Contact Section */}
        <Contact data={portfolioData} />
      </main>

      {/* Footer */}
      <Footer data={portfolioData} />

    </div>
  );
}
