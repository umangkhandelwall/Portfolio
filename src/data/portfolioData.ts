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
  bio: "I build full-stack web platforms and AI systems — production Next.js architectures, RAG retrieval pipelines, and benchmark testbeds for evaluating coding agents. Open to SDE, AI Engineer, AI/ML, and Full-Stack roles.",
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
    description: "Component-driven web architectures, responsive interfaces, and full-stack platforms.",
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
    count: 12,
    description: "Retrieval pipelines, AI benchmark tasks, prompt engineering, and LLM integrations.",
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
    description: "Engineer software engineering benchmark tasks and deterministic verification pipelines to evaluate frontier AI coding agents.",
    skills: [
      "Python",
      "Docker",
      "AI Benchmarking",
      "Coding Agent Evaluation",
      "Deterministic Verifiers",
      "Linux",
      "Systems Programming"
    ],
    bulletPoints: [
      "Author standardized software engineering benchmark tasks evaluating AI coding models on real-world system debugging and refactoring.",
      "Architect deterministic verifiers and isolated Docker evaluation containers to ensure repeatable evaluation environments.",
      "Construct reference solutions and automated scoring testbeds for multi-step agent trajectories."
    ]
  },
  {
    id: "handshake-ai",
    role: "LLM Trainer",
    company: "Handshake AI",
    period: "Jun 2026 – Aug 2026",
    active: false,
    location: "Remote",
    description: "Authored software engineering benchmark tasks and verification testbeds for evaluating language models on terminal and programming workflows.",
    skills: [
      "LLM Evaluation",
      "Docker",
      "Oracle Solutions",
      "Verification Pipelines",
      "Automated Test Suites",
      "Python",
      "Repository Workflows"
    ],
    bulletPoints: [
      "Authored software engineering benchmark tasks testing terminal workflows, dependency migrations, and bug localization.",
      "Developed reproducible Docker test environments with system-level harness scripts and oracle test suites.",
      "Validated task correctness through deterministic multi-step test scripts to ensure reliable evaluation."
    ]
  }
]);

export const PROJECTS: Project[] = z.array(ProjectSchema).parse([
  {
    id: "stay-finder",
    title: "Stay Finder — Accommodation Booking Platform",
    subtitle: "Full-Stack Accommodation Platform with Real-Time Booking Logic",
    categories: ["Full-Stack", "Next.js", "PostgreSQL"],
    techStack: ["Next.js (App Router)", "TypeScript", "PostgreSQL", "Prisma ORM", "Tailwind CSS"],
    description: "A full-stack accommodation booking platform featuring dynamic listings, multi-parameter search filtering, atomic booking reservation logic, and role-based access control.",
    highlight: "Atomic reservation transactions · Role-based access control · Indexed relational models",
    githubUrl: "https://github.com/umangkhandelwall/StayFinder",
    liveUrl: "https://github.com/umangkhandelwall/StayFinder",
    details: [
      {
        label: "Problem & Scope",
        items: [
          "Preventing double-booking race conditions during reservation attempts across overlapping date ranges.",
          "Providing responsive multi-attribute filtering across locations, price brackets, amenities, and guest counts."
        ]
      },
      {
        label: "Architecture & Database",
        items: [
          "Next.js App Router providing server-side rendering (SSR), streaming components, and modular layout trees.",
          "PostgreSQL relational schema managed via Prisma ORM with compound B-tree indexes on booking date ranges and coordinates.",
          "Atomic transaction isolation levels designed to maintain reservation consistency under concurrent requests.",
          "Role-based authentication dividing guest checkout flows from host inventory management dashboards."
        ]
      },
      {
        label: "Technical Implementation",
        items: [
          "Dynamic listings queried with compound B-tree indexed relational models.",
          "Responsive mobile-first user interface with semantic markup and accessible controls."
        ]
      }
    ]
  },
  {
    id: "ink-and-insights",
    title: "Ink & Insights — AI Publishing Platform",
    subtitle: "Publishing Platform with Rate-Limited AI Content Assistance",
    categories: ["Full-Stack", "AI Integration", "Next.js"],
    techStack: ["Next.js", "PostgreSQL", "Prisma", "Redis", "Google Gemini API"],
    description: "A blog publishing and content analysis platform featuring automated AI article critique and Redis sliding-window rate limiting to regulate API consumption.",
    highlight: "Redis sliding-window rate limiting · Automated Gemini editorial critique",
    githubUrl: "https://github.com/umangkhandelwall/Ink-Insights",
    liveUrl: "https://github.com/umangkhandelwall/Ink-Insights",
    details: [
      {
        label: "Problem & Design",
        items: [
          "Regulating generative AI calls to manage API quota limits during author publishing sessions.",
          "Providing responsive article editing alongside asynchronous AI evaluation responses."
        ]
      },
      {
        label: "System Design & Protection",
        items: [
          "Redis sliding-window rate limiting algorithm to throttle client requests before hitting upstream AI inference quotas.",
          "Google Gemini API integration with prompt templates structured for tone review, structure suggestions, and headline options.",
          "PostgreSQL relational models for article revisions, tags, view analytics, and author profiles.",
          "Optimistic UI updates delivering immediate feedback while persisting article state in the background."
        ]
      },
      {
        label: "Technical Highlights",
        items: [
          "Integrated rate limiting designed for concurrent author editing sessions.",
          "Structured prompt-engineered critique engine for automated editorial feedback."
        ]
      }
    ]
  },
  {
    id: "gcc-intel",
    title: "GCC Intel — Market Intelligence Platform",
    subtitle: "Market Intelligence for India's GCC Ecosystem",
    categories: ["Data Intelligence", "Next.js", "Analytics"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Data Analytics", "Lucide"],
    description: "A market intelligence platform analyzing India's Global Capability Centers (GCCs), reconciling national count discrepancies, comparing operating costs across 6 metro clusters, and mapping state policy frameworks.",
    highlight: "30 verified MNC captive records · 6-metro comparative cost model · 5 state incentive frameworks",
    githubUrl: "https://github.com/umangkhandelwall/gccintel",
    liveUrl: "https://github.com/umangkhandelwall/gccintel",
    details: [
      {
        label: "Problem & Motivation",
        items: [
          "Navigating disparate industry reports and conflicting market counts regarding the distribution of Global Capability Centers in India.",
          "Evaluating operational differences across talent availability, commercial lease estimates, and state incentive programs."
        ]
      },
      {
        label: "Solution Architecture",
        items: [
          "Interactive data interface visualizing audited records across Indian enterprise GCC hubs with primary publisher citations.",
          "Comparative cost analysis tool modeling lease ranges, entry salaries, and utility tariffs across 6 metro clusters.",
          "Structured policy breakdown mapping tax benefits, single-window clearances, and infrastructure subsidies across 5 states."
        ]
      },
      {
        label: "Implementation Details",
        items: [
          "Type-safe data schemas built with TypeScript and Next.js App Router.",
          "Client-side search and filtering for interactive data auditing."
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
    description: "An intelligent screen capture application that extracts on-screen text via OCR, indexes visual states into ChromaDB vector storage, and enables natural language conversational retrieval through a Gemini RAG pipeline.",
    highlight: "Multimodal OCR extraction · ChromaDB vector retrieval · Exact timestamp citations",
    githubUrl: "https://github.com/umangkhandelwall",
    liveUrl: "https://github.com/umangkhandelwall",
    details: [
      {
        label: "Problem & Use Case",
        items: [
          "Manual timeline scrubbing is inefficient for finding specific text, terminal output, or ticket IDs shown in long video recordings.",
          "Users need an automated way to recall historical screen contexts using natural language search."
        ]
      },
      {
        label: "Pipeline Architecture",
        items: [
          "Asynchronous video frame sampling with OpenCV to balance capture resolution and memory footprint.",
          "Multimodal OCR processing layer powered by Tesseract to extract textual tokens from open windows.",
          "Sentence Transformers converting extracted text into dense vector embeddings indexed in ChromaDB.",
          "Google Gemini integration answering natural language queries grounded in indexed frame text with timestamp references."
        ]
      },
      {
        label: "Engineering Features",
        items: [
          "Semantic vector search over indexed frame content using dense 768-dimensional embeddings.",
          "Timestamped citations pointing directly to the relevant recording segments."
        ]
      }
    ]
  },
  {
    id: "ai-eval-benchmarks",
    title: "Autonomous Agent Benchmarking Suite",
    subtitle: "Coding Agent Verification & Deterministic Testbeds",
    categories: ["AI Benchmarking", "Docker", "Systems"],
    techStack: ["Docker", "Python", "Bash", "Linux"],
    description: "Software engineering benchmark suites for evaluating AI coding agents, featuring reference solutions, deterministic verifiers, Docker-based sandboxes, and automated evaluation harnesses.",
    highlight: "Sealed Docker testbeds · Deterministic verification scripts",
    githubUrl: "https://github.com/umangkhandelwall",
    liveUrl: "https://github.com/umangkhandelwall",
    details: [
      {
        label: "Challenge & Scope",
        items: [
          "Evaluating autonomous coding agents requires deterministic evaluation to verify patches without false positives.",
          "Evaluation environments need to mirror realistic developer setups: multi-file repositories, system tools, and reproducible tests."
        ]
      },
      {
        label: "Implementation",
        items: [
          "Authored benchmark tasks testing terminal interaction, debugging, and systems programming.",
          "Engineered isolated Docker testbeds with sealed entrypoints and mocked environments.",
          "Implemented deterministic verification scripts to test patch application, regressions, and exit status."
        ]
      },
      {
        label: "Technical Highlights",
        items: [
          "Repeatable containerized evaluation harnesses for autonomous agent testing.",
          "Deterministic verification scripts ensuring objective scoring criteria."
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
    highlight: "Hands-on projects in LLM evaluation, RAG pipelines, and full-stack software development."
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
  "Engineered full-stack platforms (Stay Finder & Ink and Insights) with Next.js, PostgreSQL, Prisma ORM, and Redis.",
  "Authored software engineering benchmark tasks and deterministic evaluation testbeds for coding agents.",
  "Developed intelligent multimodal screen recording pipeline integrating OpenCV, Tesseract OCR, ChromaDB, and Google Gemini.",
  "Built and published GCC Intel, an open market intelligence platform analyzing India's Global Capability Centers.",
  "Selected for technical engineering roles at Crossing Hurdles and Handshake AI evaluating AI coding agents."
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
