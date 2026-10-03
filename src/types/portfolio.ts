export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  email?: string;
  website?: string;
  youtube?: string;
  dribbble?: string;
}

export interface StatItem {
  value: string;
  label: string;
  description?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;              // [PROFESSIONAL TITLE]
  specialization: string;     // [SPECIALIZATION]
  valueProposition: string;   // [ONE-LINE VALUE PROPOSITION]
  tagline?: string;           // Optional fallback
  location: string;
  email: string;
  phone: string;
  website?: string;
  profileImage?: string;
  resumeUrl?: string;
  availabilityStatus?: string;
  coreStack?: string[];       // Core stack for 30-second recruiter scans
}

export interface AboutHighlight {
  title: string;
  description: string;
}

export interface AboutInfo {
  heading?: string;
  subheading?: string;
  paragraphs: string[];
  highlights?: (string | AboutHighlight)[];
  stats?: StatItem[];
}

export interface SkillCategory {
  title: string;
  description?: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string; // e.g. "[START DATE] — Present"
  current?: boolean;
  description: string;
  responsibilities: string[]; // 3–5 concise bullets
  technologies?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description?: string;
  coursework?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category?: string;
  image?: string;
  problem: string;           // Problem statement / challenge
  approach: string;          // Approach / Architecture (alias: solution)
  solution?: string;         // Backward compatibility alias
  contribution: string;      // My Contribution & individual ownership
  technologies: string[];    // Exact stack / tools
  result?: string;           // Optional single-sentence verified result/outcome
  results?: string[];        // Optional bulleted metrics/outcomes
  caseStudy?: string;        // Optional detailed case study narrative
  liveUrl?: string;          // Live demo link
  githubUrl?: string;        // Source repository link
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName?: string;
  deliverables?: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  credentialUrl?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface ResumeConfig {
  heading: string;
  subheading?: string;
  ctaText: string;
  downloadUrl: string;
  viewUrl?: string;
  filename?: string;
}

export interface ContactConfig {
  heading: string;
  subheading?: string;
  message: string;
  email: string;
  phone: string;
  location: string;
  formActionEndpoint?: string;
}

export interface SEOConfig {
  pageTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

export interface SectionVisibility {
  about?: boolean;
  skills?: boolean;
  experience?: boolean;
  education?: boolean;
  projects?: boolean;
  achievements?: boolean;     // Certifications & achievements
  certifications?: boolean;   // Alias for achievements
  services?: boolean;
  testimonials?: boolean;
  resume?: boolean;
  contact?: boolean;
  contactForm?: boolean;      // Toggle contact form on/off
  stats?: boolean;            // Only shown when meaningful values exist
}

export interface PortfolioData {
  seo: SEOConfig;
  personal: PersonalInfo;
  social: SocialLinks;
  about: AboutInfo;
  skills: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  services: ServiceItem[];
  achievements: AchievementItem[];
  testimonials: TestimonialItem[];
  resume: ResumeConfig;
  contact: ContactConfig;
  visibility: SectionVisibility;
}
