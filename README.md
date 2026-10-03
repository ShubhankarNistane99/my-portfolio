# Minimalist Professional Portfolio Template (Recruiter-Optimized)

A modern, highly customizable, responsive personal portfolio website engineered with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

Optimized specifically for **software engineering recruiters, hiring managers, and technical screeners** who evaluate portfolios in 30 seconds or less.

---

## 30-Second Recruiter Information Architecture

The website is structured for immediate technical qualification:

1. **Hero**: Name, Professional Title, Availability, Location, and an immediate **Core Technical Stack snapshot** strip.
2. **About Me**: Shortened, high-signal engineering overview with core technical focus areas and measurable benchmarks.
3. **Selected Projects (Centerpiece)**: Prominent, full-width case-study cards detailing system architecture, candidate role, quantifiable engineering metrics, live system links, and GitHub repositories.
4. **Work Experience**: Chronological engineering timeline positioned immediately after projects to reinforce demonstrated impact.
5. **Technical Skills**: Compact, high-density matrix of competencies organized by domain for fast ATS/keyword scanning.
6. **Education & Certifications**: Compact paired credentials layout.
7. **Contact**: Direct coordinates and validated message form at the bottom.

---

## Features

- **Single Configuration Source**: All personal data, projects, experience, skills, social links, and SEO settings live in one documented file (`src/data/portfolio.ts`).
- **Core Stack Snapshot**: Instant recruiter scan strip in the Hero (`personal.coreStack`).
- **Full-Width Case Studies**: Projects include system architecture notes, candidate role, and performance metrics.
- **Zero-Pill Minimalist Aesthetic**: Elegant typography, generous whitespace, restrained micro-interactions, and 60-30-10 color harmony.
- **Light & Dark Mode**: Persistent theme toggle respecting user choice and system preference.
- **Resilient Image Handling**: Graceful fallback ensures zero broken image icons even before custom images are added.
- **Direct Resume Access**: Download and view actions located in the top navigation and Hero.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build production bundle
npm run build
```

---

## Customization Guide

Open the central configuration file:

📁 **`src/data/portfolio.ts`**

### 1. Update Personal Info & Core Stack Snapshot

```ts
personal: {
  name: "Alex Smith",
  title: "Senior Software Engineer — Distributed Systems",
  tagline: "Building high-performance distributed systems, robust APIs, and accessible modern web applications.",
  location: "San Francisco, CA / Remote",
  email: "alex@example.com",
  phone: "+1 (555) 123-4567",
  coreStack: [
    "TypeScript",
    "React / Next.js",
    "Node.js",
    "Python / Go",
    "PostgreSQL",
    "Docker & AWS",
  ],
}
```

### 2. Add Project Case Studies

```ts
projects: [
  {
    id: "proj-1",
    title: "Real-Time Distributed Collaboration Platform",
    category: "Distributed Systems & Web",
    role: "Lead Full-Stack Engineer",
    architecture: "Event-driven WebSocket cluster with CRDT conflict resolution and Redis pub/sub.",
    description: "Built a low-latency collaborative canvas enabling simultaneous multi-user document edits without merge conflicts.",
    technologies: ["TypeScript", "React", "Node.js", "Redis", "WebSockets", "Docker"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/username/project-repo",
    metrics: [
      "Sub-40ms peer-to-peer sync latency under high packet variance",
      "65% reduction in server payload size using binary protocol buffering",
      "99.98% uptime maintained throughout staged canary rollouts",
    ],
  },
]
```

### 3. Add Experience & Skills

Update the `experience`, `skills`, and `education` arrays in `src/data/portfolio.ts`.

---

## Deployment

### Vercel
1. Connect your repository to [Vercel](https://vercel.com).
2. Framework Preset will auto-detect as **Vite**.
3. Build command: `npm run build`. Output directory: `dist`.

### Netlify
1. Connect your repository to [Netlify](https://netlify.com).
2. Build command: `npm run build`. Publish directory: `dist`.

---

## License

This project is licensed under the Apache 2.0 License.
