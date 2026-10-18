import { z } from 'zod';
import {
  PersonalInfoSchema,
  ProjectSchema,
  ExperienceItemSchema,
  EducationItemSchema,
  SkillCategorySchema,
  SocialLinkSchema,
  type PersonalInfo,
  type Project,
  type ProjectDetail,
  type ExperienceItem,
  type EducationItem,
  type SkillCategory,
  type SocialLink,
} from './schema';

export type { PersonalInfo, Project, ProjectDetail, ExperienceItem, EducationItem, SkillCategory, SocialLink };

export const PERSONAL_INFO: PersonalInfo = PersonalInfoSchema.parse({
  name: "Umang Khandelwal",
  displayNameMatte: "Umang",
  displayNameChrome: "Khandelwal",
  handle: "umangkhandelwal",
  status: "ONLINE",
  availability: "AVAILABLE",
  location: "Delhi NCR / Haryana, India",
  email: "khandelwalu196@gmail.com",
  github: "https://github.com/umangkhandelwall",
  githubUsername: "@umangkhandelwall",
  linkedin: "https://www.linkedin.com/in/umang-khandelwal-71604228b/",
  linkedinDisplay: "in/umang-khandelwal",
  tagline: "Advanced AI Engineer & Full-Stack Developer",
  openToRoles: "Open to SDE, AI Engineer, AI/ML, and Full-Stack roles",
  bio: "I build full-stack web platforms and AI systems — production Next.js architectures, RAG retrieval pipelines, and benchmark testbeds for frontier coding agents. Open to SDE, AI Engineer, AI/ML, and Full-Stack roles.",
  heroRoles: [
    "Full-Stack Developer",
    "Advanced AI Engineer",
    "LLM Systems Specialist",
    "Benchmark Task Architect"
  ],
  footerText: "© 2026 Umang Khandelwal",
});

export const SKILL_CATEGORIES: SkillCategory[] = z.array(SkillCategorySchema).parse([
  {
    id: "web-fullstack",
    num: "01",
    title: "Web & Full-Stack Development",
    count: 12,
    description: "Modern component-driven web architectures, responsive interfaces, and full-stack production platforms.",
    skills: [
      "Next.js (App Router)",
      "TypeScript",
      "ReactJS",
      "React Native",
      "JavaScript (ESNext)",
      "HTML5 & Semantic Web",
      "CSS3 & Modern Layouts",
      "Tailwind CSS",
      "Framer Motion",
      "RESTful API Integration",
      "Role-Based Authentication",
      "Session Management"
    ]
  },
  {
    id: "ai-llm",
    num: "02",
    title: "AI & LLM Systems",
    count: 14,
    description: "Retrieval pipelines, AI benchmarks, prompt engineering, and LLM integrations.",
    skills: [
      "Retrieval-Augmented Generation (RAG)",
      "LLM Evaluation",
      "AI Benchmarking",
      "Prompt Engineering",
      "Google Gemini API",
      "Sentence Transformers",
      "Semantic Search",
      "ChromaDB",
      "Vector Search",
      "TerminalBench 2",
      "Harbor Format",
      "Docker Evaluators",
      "Deterministic Verification",
      "Multimodal OCR Pipelines"
    ]
  },
  {
    id: "databases-backend",
    num: "03",
    title: "Databases & Backend",
    count: 9,
    description: "Data modeling, relational databases, caching layers, and backend APIs.",
    skills: [
      "PostgreSQL",
      "Prisma ORM",
      "MongoDB",
      "Redis Caching & Rate Limiting",
      "Relational Data Modeling",
      "CRUD Workflows",
      "Query Optimization",
      "Vector Storage",
      "Supabase"
    ]
  },
  {
    id: "languages-cs",
    num: "04",
    title: "Languages & Computer Science",
    count: 10,
    description: "Core programming languages, algorithmic problem solving, and system design.",
    skills: [
      "Python",
      "TypeScript",
      "JavaScript",
      "C++",
      "SQL",
      "Pandas & NumPy",
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Modular Architecture",
      "System Design"
    ]
  },
  {
    id: "devops-tools",
    num: "05",
    title: "DevOps & Engineering Tools",
    count: 11,
    description: "Containerization, developer workflows, testing, and cloud deployment.",
    skills: [
      "Docker",
      "Git & GitHub Workflows",
      "Linux & Bash Scripting",
      "Postman",
      "Cursor AI",
      "Vercel Deployment",
      "Render",
      "Tableau",
      "Automated Test Suites",
      "CI/CD Pipelines",
      "Debugging & Profiling"
    ]
  }
]);

export const EXPERIENCES: ExperienceItem[] = z.array(ExperienceItemSchema).parse([
  {
    id: "crossing-hurdles",
    role: "Advanced AI Engineer",
    company: "Crossing Hurdles",
    period: "Jul 2026 – Present",
    active: true,
    location: "Remote",
    description: "Engineer production-grade software engineering benchmark tasks for Project Sentinel Ultra and Terminus 3 to rigorously evaluate frontier AI coding models.",
    skills: [
      "Python",
      "Docker",
      "AI Benchmarking",
      "Frontier Coding Agents",
      "Harbor Format",
      "Deterministic Verifiers",
      "Linux",
      "Systems Programming"
    ],
    bulletPoints: [
      "Author standardized Harbor-format benchmark tasks evaluating frontier coding agents (Claude 3.5, GPT-4o) on real-world system debugging and refactoring.",
      "Architect deterministic verifiers and sealed Docker evaluation containers, eliminating test flakiness across multi-step agent trajectories.",
      "Construct complete reference oracle implementations and automated scoring harnesses for end-to-end evaluation runs."
    ]
  },
  {
    id: "handshake-ai",
    role: "LLM Trainer",
    company: "Handshake AI",
    period: "Jun 2026 – Aug 2026",
    active: false,
    location: "Remote",
    description: "Built complex software engineering benchmark tasks for TerminalBench 2 and Project Dynamo to advance automated agent evaluation.",
    skills: [
      "TerminalBench 2",
      "LLM Evaluation",
      "Docker",
      "Oracle Solutions",
      "Verification Pipelines",
      "Automated Test Suites",
      "Python",
      "Repository Workflows"
    ],
    bulletPoints: [
      "Authored 20+ software engineering benchmark tasks for TerminalBench 2 testing terminal proficiency, library migrations, and bug localization.",
      "Developed reproducible Docker test environments with custom system-level harness scripts and oracle unit tests.",
      "Validated task correctness through deterministic multi-step test scripts ensuring 100% false-positive elimination."
    ]
  }
]);

export const PROJECTS: Project[] = z.array(ProjectSchema).parse([
  {
    id: "stay-finder",
    title: "Stay Finder — Accommodation Booking Platform",
    subtitle: "Production Full-Stack Platform with Real-Time Booking Logic",
    categories: ["Full-Stack", "Next.js", "PostgreSQL"],
    techStack: ["Next.js (App Router)", "TypeScript", "PostgreSQL", "Prisma ORM", "Tailwind CSS"],
    description: "A production-grade full-stack accommodation booking platform featuring 500+ dynamic listings, advanced multi-parameter search filtering, atomic booking reservation logic, and role-based access control.",
    metric: "500+ dynamic listings · <100ms query latency · 95+ Lighthouse score",
    githubUrl: "https://github.com/umangkhandelwall/StayFinder",
    liveUrl: "https://github.com/umangkhandelwall/StayFinder",
    details: [
      {
        label: "Problem & Scope",
        items: [
          "Preventing double-booking race conditions during high-concurrency reservation attempts across overlapping date ranges.",
          "Delivering sub-100ms response times across complex multi-attribute queries (location, price brackets, amenities, guest counts)."
        ]
      },
      {
        label: "Architecture & Database",
        items: [
          "Next.js App Router providing server-side rendering (SSR), streaming components, and optimized layout trees.",
          "PostgreSQL relational schema managed via Prisma ORM with compound B-tree indexes on booking date ranges and coordinates.",
          "Atomic transaction isolation levels ensuring zero-conflict reservation consistency under concurrent requests.",
          "Role-based authentication dividing guest checkout flows from verified host inventory dashboards."
        ]
      },
      {
        label: "Honest Verified Metric",
        items: [
          "500+ verified listings rendered with sub-100ms server responses.",
          "Achieved 95+ Google Lighthouse scores across Performance, Accessibility, and SEO."
        ]
      }
    ]
  },
  {
    id: "ink-and-insights",
    title: "Ink & Insights — AI Publishing Platform",
    subtitle: "Data-Driven Publishing Engine with Rate-Limited AI Assistance",
    categories: ["Full-Stack", "AI Integration", "Next.js"],
    techStack: ["Next.js", "PostgreSQL", "Prisma", "Redis", "Google Gemini API"],
    description: "A high-performance blog publishing and content analysis engine supporting 500+ concurrent active users with 99.2% uptime, automated AI article critique, and Redis sliding-window rate limiting.",
    metric: "500+ active users · 99.2% uptime · <2s LLM evaluation latency",
    githubUrl: "https://github.com/umangkhandelwall/Ink-Insights",
    liveUrl: "https://github.com/umangkhandelwall/Ink-Insights",
    details: [
      {
        label: "Problem & Design",
        items: [
          "Mitigating LLM API rate limits and preventing costly quota depletion under sudden publishing traffic spikes.",
          "Maintaining snappy optimistic article editing while streaming asynchronous Gemini evaluation responses."
        ]
      },
      {
        label: "System Design & Protection",
        items: [
          "Redis sliding-window rate limiting algorithm throttling client requests at the edge before hitting LLM inference quotas.",
          "Structured Google Gemini API integration for tone critique, SEO readiness scoring, and headline refinement.",
          "PostgreSQL relational models for article version trees, categorized tags, view analytics, and author profiles.",
          "Optimistic UI updates providing instantaneous feedback while synchronizing data in the background."
        ]
      },
      {
        label: "Honest Verified Metric",
        items: [
          "Maintained 99.2% uptime under 500+ concurrent simulated users.",
          "Delivered end-to-end AI critique in under 2 seconds with 85% content evaluation consistency."
        ]
      }
    ]
  },
  {
    id: "gcc-intel",
    title: "GCC Intel — Market Intelligence Platform",
    subtitle: "Enterprise Market Intelligence for India's 2,000+ GCC Ecosystem",
    categories: ["Data Intelligence", "Next.js", "Analytics"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Data Analytics", "Lucide"],
    description: "An enterprise market intelligence platform analyzing India's 2,000+ Global Capability Centers (GCCs), auditing conflicting industry reports, comparing city-level operating costs, and mapping state policy frameworks.",
    metric: "2,000+ GCC centers analyzed · 5 tier-1 metro clusters mapped",
    githubUrl: "https://github.com/umangkhandelwall/gccintel",
    liveUrl: "https://github.com/umangkhandelwall/gccintel",
    details: [
      {
        label: "Problem & Motivation",
        items: [
          "Enterprise decision-makers struggled with conflicting figures on India's expanding GCC footprint across Bangalore, Hyderabad, Pune, and NCR.",
          "Fragmented data made cross-city operational cost comparisons (lease rates, power tariffs, talent density) difficult to evaluate."
        ]
      },
      {
        label: "Solution Architecture",
        items: [
          "Interactive data platform visualizing verified telemetry across 2,000+ Global Capability Centers.",
          "Comparative cost model calculator analyzing real estate leases, entry-level developer salaries, and power costs across 5 major metros.",
          "Comprehensive policy matrix mapping government tax incentives, single-window clearances, and infrastructure subsidies."
        ]
      },
      {
        label: "Honest Verified Metric",
        items: [
          "Consolidated 2,000+ enterprise data points into a single type-safe interactive dashboard.",
          "Zero-dependency client-side filter engine offering sub-10ms search across hundreds of corporate entities."
        ]
      }
    ]
  },
  {
    id: "smart-screen-recorder",
    title: "LLM Powered Smart Screen Recorder",
    subtitle: "Multimodal Screen Capture & RAG Query Pipeline",
    categories: ["AI & LLM", "Computer Vision", "Python"],
    techStack: ["Python", "OpenCV", "Tesseract OCR", "Sentence Transformers", "ChromaDB", "Google Gemini API"],
    description: "An intelligent screen capture system that extracts on-screen text via OCR, indexes visual states into ChromaDB vector storage, and enables natural language conversational retrieval through a Gemini RAG pipeline.",
    metric: "10,000+ indexed tokens · sub-second vector search · deterministic timestamps",
    githubUrl: "https://github.com/umangkhandelwall",
    liveUrl: "https://github.com/umangkhandelwall",
    details: [
      {
        label: "Problem & Use Case",
        items: [
          "Screen recordings are passive video files that are impossible to search without manual timeline scrubbing.",
          "Developers cannot easily retrieve past terminal logs, PR URLs, or error codes seen on their screens hours earlier."
        ]
      },
      {
        label: "Pipeline Architecture",
        items: [
          "Asynchronous video frame sampling with OpenCV designed to minimize CPU and RAM consumption during desktop work.",
          "Multimodal OCR processing layer powered by Tesseract extracting structured textual tokens from window frames.",
          "Sentence Transformers converting text chunks into dense 768-dimensional embeddings stored in a local ChromaDB collection.",
          "Google Gemini generative synthesis agent providing context-grounded answers with exact video timestamps."
        ]
      },
      {
        label: "Honest Verified Metric",
        items: [
          "Sub-second vector retrieval across 10,000+ indexed screen tokens.",
          "Deterministic frame citations directing the user to the exact second in the recording."
        ]
      }
    ]
  },
  {
    id: "ai-eval-benchmarks",
    title: "Autonomous Agent Benchmarking Suite",
    subtitle: "Frontier Coding Agent Verification & Deterministic Testbeds",
    categories: ["AI Benchmarking", "Docker", "Systems"],
    techStack: ["Docker", "Python", "Bash", "TerminalBench 2", "Harbor Format", "Linux"],
    description: "Software engineering benchmark suites for evaluating frontier AI coding agents, featuring oracle solutions, deterministic verifiers, Docker-based sandboxes, and automated evaluation harnesses.",
    metric: "100% deterministic reproducibility · 0 flaky test runs across Docker testbeds",
    githubUrl: "https://github.com/umangkhandelwall",
    liveUrl: "https://github.com/umangkhandelwall",
    details: [
      {
        label: "Challenge & Scope",
        items: [
          "Evaluating frontier AI coding agents requires deterministic benchmarks where agent actions are verified without false positives.",
          "Tasks must replicate authentic engineering environments: multi-file repository navigation, debugging, and systems programming."
        ]
      },
      {
        label: "Implementation",
        items: [
          "Authored benchmark tasks for Project Sentinel Ultra, Terminus 3, and TerminalBench 2.",
          "Engineered isolated Docker testbeds with sealed entrypoints and mock network environments.",
          "Built deterministic verification scripts checking file diffs, exit codes, and regression prevention."
        ]
      },
      {
        label: "Honest Verified Metric",
        items: [
          "100% reproducible evaluation runs across all benchmark tasks.",
          "Zero false-positive test evaluations verified across reference oracle passes."
        ]
      }
    ]
  }
]);

export const EDUCATION: EducationItem[] = z.array(EducationItemSchema).parse([
  {
    id: "gjust",
    degree: "Bachelor of Technology in Electronics and Communication Engineering",
    institution: "Guru Jambheshwar University of Science and Technology",
    period: "2022 – 2026",
    location: "Hisar, Haryana",
    focus: "Artificial Intelligence · Machine Learning · Data Structures & Algorithms · Systems Programming · Digital Electronics",
    highlight: "Hands-on engineering in LLM evaluation, RAG pipelines, and full-stack software development."
  },
  {
    id: "aps",
    degree: "Higher Secondary Certificate (12th Grade)",
    institution: "Aggarwal Public School",
    period: "2021 – 2022",
    location: "Ballabgarh, Faridabad",
    focus: "Physics · Chemistry · Mathematics · Computer Science",
    highlight: "Graduated with distinction in senior secondary board examinations."
  }
]);

export const ACHIEVEMENTS = [
  "Engineered production full-stack platforms (Stay Finder & Ink and Insights) with 95+ Lighthouse scores and 99.2% uptime.",
  "Authored frontier software engineering benchmark tasks for Project Sentinel Ultra, Terminus 3, and TerminalBench 2.",
  "Developed intelligent multimodal screen recording pipeline integrating OpenCV, Tesseract OCR, ChromaDB, and Google Gemini.",
  "Built and published GCC Intel, an open market intelligence platform analyzing India's 2,000+ Global Capability Centers.",
  "Selected for specialized technical roles at Crossing Hurdles and Handshake AI evaluating frontier AI coding agents."
];

export const SOCIAL_LINKS: SocialLink[] = z.array(SocialLinkSchema).parse([
  {
    id: "email",
    num: "01",
    label: "Email",
    value: "khandelwalu196@gmail.com",
    href: "mailto:khandelwalu196@gmail.com",
    external: false
  },
  {
    id: "linkedin",
    num: "02",
    label: "LinkedIn",
    value: "in/umang-khandelwal",
    href: "https://www.linkedin.com/in/umang-khandelwal-71604228b/",
    external: true
  },
  {
    id: "github",
    num: "03",
    label: "GitHub",
    value: "@umangkhandelwall",
    href: "https://github.com/umangkhandelwall",
    external: true
  }
]);

export const RESUME_PATH = "/Umang-Khandelwal-Resume.pdf";
