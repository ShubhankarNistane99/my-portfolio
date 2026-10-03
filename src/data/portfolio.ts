import { PortfolioData } from '../types/portfolio';

/**
 * ============================================================================
 * PORTFOLIO CONFIGURATION — SHUBHANKAR NISTANE
 * ============================================================================
 * Factual professional background based strictly on verified resume data.
 * Zero confidential information, zero fabricated metrics or fictional claims.
 * ============================================================================
 */

export const portfolioData: PortfolioData = {
  // ==========================================================================
  // 1. SEO & METADATA CONFIGURATION
  // ==========================================================================
  seo: {
    pageTitle: 'Shubhankar Nistane | Software Developer',
    metaDescription: 'Software Developer specializing in Java and Spring Boot, with experience in backend engineering, data integration, distributed systems, and production applications.',
    keywords: [
      'Shubhankar Nistane',
      'Software Developer',
      'Backend Developer',
      'Java',
      'Spring Boot',
      'REST APIs',
      'Data Integration',
      'Kafka',
      'Docker',
      'Kubernetes',
      'Mumbai',
    ],
    canonicalUrl: 'https://example.com',
    ogImage: '/profile.jpg',
  },

  // ==========================================================================
  // 2. HERO HEADLINE & CORE SNAPSHOT
  // Concise, professional, and grounded in verified enterprise background.
  // ==========================================================================
  personal: {
    name: 'Shubhankar Nistane',
    title: 'Software Developer',
    specialization: '',
    valueProposition: 'Software Developer specializing in Java and Spring Boot, with experience building enterprise applications, data-integration services, and production systems across telecom and financial technology.',
    
    location: 'Mumbai, Maharashtra',
    email: 'shubhankar.nistane.work@gmail.com',
    phone: '',
    website: '',
    profileImage: '',
    resumeUrl: '/Shubhankar_Nistane_Resume.pdf',
    availabilityStatus: 'Available for Full-time Roles',

    // Core technical stack chips
    coreStack: [
      'Java',
      'Spring Boot',
      'REST APIs',
      'Kafka',
      'SQL',
      'Kubernetes',
      'Python',
    ],
  },

  // ==========================================================================
  // 3. SOCIAL & REPOSITORY COORDINATES
  // Clean mailto link; verified profiles only.
  // ==========================================================================
  social: {
    linkedin: 'https://linkedin.com/in/shubhankar-nistane-735006181',
    github: 'https://github.com/ShubhankarNistane99',
    email: 'mailto:shubhankar.nistane.work@gmail.com',
  },

  // ==========================================================================
  // 4. ABOUT ME
  // Concise, professional, and grounded in verified enterprise background.
  // ==========================================================================
  about: {
    heading: 'About Me',
    subheading: 'Professional Summary',
    paragraphs: [
      'Software Developer specializing in Java and Spring Boot, with experience across backend engineering, data integration, production systems, and deployment automation. Experienced in building enterprise services, integration pipelines, and scalable distributed applications across telecom and financial-market environments.',
    ],
    highlights: [
      {
        title: 'Backend Engineering',
        description: 'Java, Spring Boot, REST APIs',
      },
      {
        title: 'Data & Integration',
        description: 'Kafka, transformation, reconciliation',
      },
      {
        title: 'Production Engineering',
        description: 'Deployment automation, troubleshooting, L4 support',
      },
    ],
    stats: [],
  },

  // ==========================================================================
  // 5. SELECTED PROJECTS (REAL PROJECTS ONLY)
  // Supporting: Problem, Approach, My Contribution, Technologies, Result
  // Zero fabricated architectures, metrics, or false claims.
  // ==========================================================================
  projects: [
    {
      id: 'proj-1',
      title: 'Maternity Care Website',
      category: 'Web Application',
      problem: 'Facilitating maternity care resource discovery and nearby medical practitioner search for expectant mothers.',
      approach: 'Developed and hosted a maternity-care website during a web development internship as part of a three-member team.',
      solution: 'Developed and hosted a maternity-care website during a web development internship as part of a three-member team.',
      contribution: 'Implemented nearest-doctor discovery using Google APIs, LEAP scoring, video integration, and responsive informational sections with Material-UI.',
      technologies: ['ReactJS', 'Google APIs', 'Material-UI'],
      result: 'Developed and hosted during a web development internship as part of a three-member team.',
      featured: true,
    },
    {
      id: 'proj-2',
      title: 'Posture Detector',
      category: 'IoT & Computer Vision',
      problem: 'Real-time posture monitoring and detecting incorrect posture to provide biofeedback.',
      approach: 'Combines computer vision pose estimation with an Arduino hardware interface to monitor posture deviations.',
      solution: 'Combines computer vision pose estimation with an Arduino hardware interface to monitor posture deviations.',
      contribution: 'Developed a posture-monitoring system to detect incorrect posture and provide biofeedback using Python, Arduino Nano, OpenPose, TensorFlow, and Keras.',
      technologies: ['Python', 'Arduino Nano', 'OpenPose', 'TensorFlow', 'Keras'],
      result: 'Published an IEEE research paper titled “An IoT Based Rectification of Posture using Biofeedback”.',
      featured: true,
    },
    {
      id: 'proj-3',
      title: 'E-Learning Website',
      category: 'Web Application',
      problem: 'Providing an educational web platform supporting user authentication and course resource access.',
      approach: 'Single-page web application architecture built with Angular and Firebase backend services.',
      solution: 'Single-page web application architecture built with Angular and Firebase backend services.',
      contribution: 'Developed an e-learning web application with Firebase authentication and CRUD operations using Angular, Firebase, HTML/CSS, JavaScript, and Bootstrap.',
      technologies: ['Angular', 'Firebase', 'HTML/CSS', 'JavaScript', 'Bootstrap'],
      featured: false,
    },
  ],

  // ==========================================================================
  // 6. WORK EXPERIENCE (FACTUAL ENTERPRISE ROLES)
  // Non-confidential, professional descriptions with concise bullets.
  // ==========================================================================
  experience: [
    {
      id: 'exp-1',
      role: 'Senior Associate Consultant',
      company: 'Infosys',
      location: 'Mumbai, India',
      period: 'Jul 2026 – Present',
      current: true,
      description: 'Application development, platform engineering, deployment automation, and L4 production support for a telecom client project.',
      responsibilities: [
        'Application development using the client\'s proprietary SLL programming language.',
        'Python-based deployment and platform configuration.',
        'L4 troubleshooting and production support.',
      ],
      technologies: ['SLL (C++-like)', 'Python', 'JSON', 'Platform Engineering', 'L4 Production Support'],
    },
    {
      id: 'exp-2',
      role: 'Associate Consultant',
      company: 'Infosys',
      location: 'Mumbai, India',
      period: 'Oct 2024 – Jun 2026',
      current: false,
      description: 'Developed backend and integration solutions for a telecom data-integration platform.',
      responsibilities: [
        'Built integration adapters for network data processing.',
        'Developed scalable transformation and batch-processing pipelines.',
        'Implemented distributed processing using Kafka and Kubernetes.',
      ],
      technologies: ['Java', 'Spring Boot', 'Kafka', 'Kubernetes', 'Docker', 'Neo4j / Cypher'],
    },
    {
      id: 'exp-3',
      role: 'System Analyst',
      company: 'National Stock Exchange of India',
      location: 'Mumbai, India',
      period: 'Jul 2021 – Sep 2024',
      current: false,
      description: 'Developed backend services and supported production systems for a financial-market surveillance platform.',
      responsibilities: [
        'Built Java/Spring Boot REST APIs.',
        'Contributed to the Angular 7 → Angular 15 migration.',
        'Automated deployments, reducing estimated manual effort by approximately 70%.',
      ],
      technologies: ['Java', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'Oracle 19c', 'Linux Bash', 'Angular 15', 'SFTP'],
    },
  ],

  // ==========================================================================
  // 7. TECHNICAL SKILLS (COMPACT MATRIX — ONLY SPECIFIED SKILLS)
  // Categorized cleanly into domain groupings.
  // ==========================================================================
  skills: [
    {
      title: 'Languages',
      description: 'Core languages and scripting runtimes',
      skills: ['Java', 'Python', 'SQL', 'JavaScript', 'Linux Shell Scripting'],
    },
    {
      title: 'Backend',
      description: 'Enterprise backend architecture and ORM frameworks',
      skills: ['Spring Boot', 'Spring MVC', 'Spring Data JPA', 'Hibernate', 'REST', 'SOAP'],
    },
    {
      title: 'Databases',
      description: 'Relational, columnar, graph databases and database interfaces',
      skills: ['PostgreSQL', 'Greenplum', 'Oracle 19c', 'Neo4j', 'Cypher', 'JDBC'],
    },
    {
      title: 'Integration & Messaging',
      description: 'Message streaming, transfer protocols, and pipeline data integration',
      skills: ['Kafka', 'SFTP', 'Data Transformation', 'Data Reconciliation'],
    },
    {
      title: 'Cloud & DevOps',
      description: 'Containerization, orchestration, and object storage',
      skills: ['Docker', 'Kubernetes', 'MinIO'],
    },
    {
      title: 'Frontend',
      description: 'Client frameworks and responsive UI libraries',
      skills: ['Angular', 'ReactJS', 'Bootstrap', 'Material-UI', 'HTML', 'CSS'],
    },
    {
      title: 'Tools',
      description: 'Source control, build systems, and API testing tools',
      skills: ['Git', 'Maven', 'GitHub', 'Postman', 'SVN'],
    },
    {
      title: 'AI-Assisted Development',
      description: 'Developer productivity tools and modern code assistance',
      skills: ['GitHub Copilot', 'ChatGPT', 'Google Gemini', 'Claude'],
    },
  ],

  // ==========================================================================
  // 8. EDUCATION (VISUALLY SECONDARY)
  // ==========================================================================
  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Technology in Information Technology',
      institution: 'Sardar Patel Institute of Technology',
      location: 'Mumbai, Maharashtra',
      period: '2017 – 2021',
      coursework: [
        'Data Structures & Algorithms',
        'Database Management Systems',
        'Operating Systems',
        'Computer Networks',
      ],
    },
  ],

  // ==========================================================================
  // 9. ACHIEVEMENTS & CERTIFICATIONS (VERIFIED ITEMS ONLY)
  // ==========================================================================
  achievements: [
    {
      id: 'ach-1',
      title: 'RISE Insta Award',
      issuer: 'Infosys',
      date: 'July 2026',
      description: 'Recognized for outstanding engineering delivery, technical ownership, and performance excellence.',
    },
    {
      id: 'ach-2',
      title: 'Published IEEE Research Paper',
      issuer: 'IEEE',
      date: 'Published',
      description: 'Author of "An IoT Based Rectification of Posture using Biofeedback" on real-time computer vision pose classification.',
    },
    {
      id: 'ach-3',
      title: 'Linux Bash Shell Scripting Certification',
      issuer: 'Certification Authority',
      date: 'Verified',
      description: 'Comprehensive certification covering Bash shell scripting, AWK, and SED for automated data manipulation.',
    },
    {
      id: 'ach-4',
      title: 'Build with Gemini Program',
      issuer: 'Google',
      date: 'Completed',
      description: 'Completed hands-on engineering program focused on modern generative AI model architectures and implementations.',
    },
    {
      id: 'ach-5',
      title: 'NSE NCFM Certifications',
      issuer: 'National Stock Exchange of India',
      date: 'Certified',
      description: 'Certifications in Financial Markets and Mutual Funds covering capital market structures and compliance.',
    },
    {
      id: 'ach-6',
      title: 'Namaste JavaScript Certification',
      issuer: 'NamasteDev',
      date: 'Completed',
      description: 'Certification covering core JavaScript fundamentals, execution context, event loop, and asynchronous runtime.',
    },
  ],

  // ==========================================================================
  // 10. RESUME CONFIGURATION (IN STICKY NAVBAR)
  // ==========================================================================
  resume: {
    heading: 'Resume & Credentials',
    subheading: 'Curriculum Vitae',
    ctaText: 'View or download the comprehensive resume for complete employment history and academic records.',
    downloadUrl: '/Shubhankar_Nistane_Resume.pdf',
    viewUrl: '/Shubhankar_Nistane_Resume.pdf',
    filename: 'Shubhankar_Nistane_Resume.pdf',
  },

  // ==========================================================================
  // 11. SERVICES & TESTIMONIALS (AUTO-HIDDEN)
  // Zero fake testimonials, zero fabricated service packages.
  // ==========================================================================
  services: [],
  testimonials: [],

  // ==========================================================================
  // 12. CONTACT & COORDINATES
  // ==========================================================================
  contact: {
    heading: 'Get in Touch',
    subheading: 'Direct Opportunities & Inquiries',
    message: 'I am actively open to Software Developer roles. Feel free to contact me directly via email or send a brief message below.',
    email: 'shubhankar.nistane.work@gmail.com',
    phone: '',
    location: '',
  },

  // ==========================================================================
  // 13. SECTION VISIBILITY CONTROLS
  // ==========================================================================
  visibility: {
    about: true,
    projects: true,
    experience: true,
    skills: true,
    education: true,
    achievements: true,
    contact: true,
    contactForm: true,     // Optional form; direct email is also front and center
    stats: false,          // Suppressed: no fake statistics
    services: false,       // Auto-hidden
    resume: false,         // Standalone section hidden (accessed via Navbar)
    testimonials: false,   // Zero fake testimonials
  },
};
