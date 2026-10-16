export interface ProjectDetail {
  label: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  categories: string[];
  techStack: string[];
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  details: ProjectDetail[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  active: boolean;
  location: string;
  description: string;
  skills: string[];
  bulletPoints: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  focus: string;
  highlight?: string;
}

export interface SkillCategory {
  id: string;
  num: string;
  title: string;
  count: number;
  description: string;
  skills: string[];
}

export const PERSONAL_INFO = {
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
  bio: "I build LLM, RAG, agentic and full-stack systems — retrieval pipelines, benchmark tasks for frontier coding agents, and scalable Next.js & Python backends. Open to SDE, AI Engineer, AI/ML, and Full-Stack roles.",
  heroRoles: [
    "Advanced AI Engineer",
    "LLM Systems Specialist",
    "Full-Stack Developer",
    "Benchmark Task Architect"
  ],
  footerText: "© 2026 Umang Khandelwal",
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "ai-llm",
    num: "01",
    title: "AI & LLM Systems",
    count: 14,
    description: "Retrieval pipelines, AI benchmarks, prompt engineering and LLM integrations.",
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
    id: "web-fullstack",
    num: "02",
    title: "Web & Full-Stack Development",
    count: 12,
    description: "Modern component-driven web architectures, responsive interfaces and full-stack platforms.",
    skills: [
      "ReactJS",
      "React Native",
      "Next.js (App Router)",
      "TypeScript",
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
    id: "languages-cs",
    num: "03",
    title: "Languages & Computer Science",
    count: 10,
    description: "Core programming languages, algorithmic problem solving and system design.",
    skills: [
      "Python",
      "Pandas & NumPy",
      "TypeScript",
      "JavaScript",
      "C++",
      "SQL",
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Modular Architecture",
      "System Design"
    ]
  },
  {
    id: "databases-backend",
    num: "04",
    title: "Databases & Backend",
    count: 9,
    description: "Data modeling, relational databases, caching layers and backend APIs.",
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
    id: "devops-tools",
    num: "05",
    title: "DevOps & Engineering Tools",
    count: 11,
    description: "Containerization, developer workflows, testing and cloud deployment.",
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
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "crossing-hurdles",
    role: "Advanced AI Engineer",
    company: "Crossing Hurdles",
    period: "Jul 2026 – Present",
    active: true,
    location: "Remote",
    description: "Contribute to Project Sentinel Ultra and Terminus 3 by developing advanced software engineering benchmark tasks for evaluating frontier AI coding agents.",
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
      "Contribute to Project Sentinel Ultra and Terminus 3 by developing advanced software engineering benchmark tasks for evaluating frontier AI coding agents.",
      "Design Harbor-format tasks with oracle implementations, deterministic verifiers, Docker-based environments, and automated evaluation pipelines.",
      "Create domain-grounded terminal benchmarking tasks spanning debugging, systems programming, infrastructure workflows, and software engineering while maintaining correctness and reproducibility."
    ]
  },
  {
    id: "handshake-ai",
    role: "LLM Trainer",
    company: "Handshake AI",
    period: "Jun 2026 – Aug 2026",
    active: false,
    location: "Remote",
    description: "Contributed to Project Dynamo by authoring complex software engineering benchmark tasks for TerminalBench 2.",
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
      "Contributed to Project Dynamo by authoring complex software engineering benchmark tasks for TerminalBench 2.",
      "Built end-to-end evaluation tasks including Docker environments, oracle solutions, deterministic verification pipelines, and automated test suites.",
      "Designed benchmark tasks covering debugging, infrastructure, systems programming, repository workflows, and data processing."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "smart-screen-recorder",
    title: "LLM Powered Smart Screen Recorder",
    subtitle: "Multimodal Screen Capture & RAG Query Pipeline",
    categories: ["AI & LLM", "Computer Vision", "Python"],
    techStack: ["Python", "OpenCV", "Tesseract OCR", "Sentence Transformers", "ChromaDB", "Google Gemini API"],
    description: "An intelligent screen recording system that extracts on-screen textual data via OCR, indexes visual states into a vector database, and enables conversational retrieval through a Gemini-powered RAG pipeline.",
    githubUrl: "https://github.com/umangkhandelwall",
    liveUrl: "https://github.com/umangkhandelwall",
    details: [
      {
        label: "Problem",
        items: [
          "Traditional screen recordings produce hours of passive video files that are impossible to search through without manual scrubbing.",
          "Users cannot easily recall specific codes, ticket numbers, terminal outputs, or discussions shown on their screens hours or days earlier."
        ]
      },
      {
        label: "Architecture & Design",
        items: [
          "Lightweight asynchronous video frame capture with OpenCV minimizing CPU and RAM overhead.",
          "Multimodal OCR processing layer powered by Tesseract to extract clean textual tokens from application windows and terminals.",
          "Vector embedding pipeline with Sentence Transformers converting text chunks into dense 768-dimensional embeddings.",
          "ChromaDB local vector database for fast similarity retrieval with temporal metadata indexing.",
          "Google Gemini API integration as the generative synthesis agent synthesizing context-grounded answers with timestamps."
        ]
      },
      {
        label: "Key Capabilities",
        items: [
          "Natural language questions such as: 'What was the Docker command I ran at 3 PM?' or 'Show me the PR URL reviewed yesterday.'",
          "Deterministic timestamp citations pointing back to the exact frame and timeline offset.",
          "Privacy-first filtering excluding password fields and sensitive input areas."
        ]
      },
      {
        label: "Impact & Results",
        items: [
          "Sub-second vector retrieval over 10,000+ screen state tokens.",
          "Enables developers to maintain an automated, searchable memory of their daily workflows."
        ]
      }
    ]
  },
  {
    id: "stay-finder",
    title: "Stay Finder — Airbnb Style Booking Platform",
    subtitle: "Full-Stack Accommodation Platform with Real-Time Booking Logic",
    categories: ["Full-Stack", "Next.js", "PostgreSQL"],
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma ORM", "Tailwind CSS"],
    description: "A production-grade full-stack accommodation booking platform featuring 500+ dynamic listings, advanced multi-parameter search filtering, real-time booking reservation logic, and role-based access control.",
    githubUrl: "https://github.com/umangkhandelwall/StayFinder",
    liveUrl: "https://github.com/umangkhandelwall/StayFinder",
    details: [
      {
        label: "Problem",
        items: [
          "Handling high-concurrency booking reservations while preventing double-bookings across overlapping calendar date ranges.",
          "Maintaining snappy UI response times with complex filtering across location, price bracket, amenities, and guest counts."
        ]
      },
      {
        label: "Architecture & Database",
        items: [
          "Next.js App Router providing server-side rendering (SSR) and streaming UI states.",
          "PostgreSQL relational database schema architected with Prisma ORM featuring optimized indexes on dates and locations.",
          "Atomic transaction isolation to guarantee zero-conflict reservation booking states.",
          "Role-based authentication system separating guest bookings from host listing administration."
        ]
      },
      {
        label: "Technical Highlights",
        items: [
          "500+ listings queried seamlessly with sub-100ms response times.",
          "Responsive mobile-first interactive property explorer with photo carousels and dynamic map coordinates.",
          "Achieved 95+ Google Lighthouse performance, accessibility, and SEO audit scores."
        ]
      }
    ]
  },
  {
    id: "ink-and-insights",
    title: "Ink & Insights — AI Blog Platform",
    subtitle: "Data-Driven Publishing Engine with Rate-Limited AI Assistance",
    categories: ["Full-Stack", "AI Integration", "Next.js"],
    techStack: ["Next.js", "PostgreSQL", "Prisma", "Redis", "Google Gemini API"],
    description: "A data-driven blog management platform supporting 500+ concurrent active users with 99.2% uptime, automated AI content evaluation via Gemini API, and Redis-based rate limiting.",
    githubUrl: "https://github.com/umangkhandelwall/Ink-Insights",
    liveUrl: "https://github.com/umangkhandelwall/Ink-Insights",
    details: [
      {
        label: "Problem",
        items: [
          "Balancing generative AI features (summarization, SEO scoring, readability critique) with strict API rate limits and predictable latencies for concurrent writers.",
          "Delivering real-time content updates without database bottlenecks."
        ]
      },
      {
        label: "System Design",
        items: [
          "Redis sliding-window rate limiting to throttle excessive client calls and protect LLM API quotas.",
          "Google Gemini API integration with prompt templates tailored for tone analysis, structure improvements, and headline suggestions.",
          "PostgreSQL relational models via Prisma for article revisions, tags, view analytics, and author profiles.",
          "Optimistic UI updates delivering instant typing responsiveness with background cloud synchronization."
        ]
      },
      {
        label: "Metrics & Verification",
        items: [
          "Sustained 500+ concurrent users with 99.2% uptime.",
          "Sub-2-second latency for AI content evaluation while maintaining 85% content accuracy.",
          "Comprehensive CRUD workflows and analytical reporting."
        ]
      }
    ]
  },
  {
    id: "gcc-intel",
    title: "GCC Intel — Market Intelligence Platform",
    subtitle: "Enterprise Intelligence for India's 2,000+ GCC Ecosystem",
    categories: ["Data Intelligence", "Next.js", "Analytics"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Data Analytics", "Lucide"],
    description: "A market intelligence platform analyzing India's 2,000+ Global Capability Centers (GCCs), auditing conflicting counts, comparing city-level operating costs, and mapping state policies using verified data.",
    githubUrl: "https://github.com/umangkhandelwall/gccintel",
    liveUrl: "https://github.com/umangkhandelwall/gccintel",
    details: [
      {
        label: "Problem",
        items: [
          "Enterprise decision-makers lacked a unified source of truth regarding conflicting data reports on India's booming GCC market across Bangalore, Hyderabad, Pune, NCR, and emerging Tier-2 hubs.",
          "Operating cost comparisons across talent, real estate, and state incentive policies were fragmented across disparate reports."
        ]
      },
      {
        label: "Solution & Architecture",
        items: [
          "Built a clean interactive intelligence dashboard visualizing verified data on 2,000+ GCCs.",
          "Multi-city comparative cost analysis calculator evaluating lease expenses, talent density, and power tariffs.",
          "State policy matrix mapping tax rebates, single-window clearances, and infrastructure subsidies."
        ]
      },
      {
        label: "Technical Implementation",
        items: [
          "Next.js App Router with TypeScript for type-safe data schemas.",
          "Interactive client-side filtering and sorting for instant audit exploration.",
          "High-contrast dark-mode data visualization adhering to executive UX standards."
        ]
      }
    ]
  },
  {
    id: "ai-eval-benchmarks",
    title: "Autonomous Agent Benchmarking Suite",
    subtitle: "Frontier Coding Agent Verification & Terminal Tasks",
    categories: ["AI Benchmarking", "Docker", "Systems"],
    techStack: ["Docker", "Python", "Bash", "TerminalBench 2", "Harbor Format", "Linux"],
    description: "Software engineering benchmark tasks for evaluating frontier AI coding agents, featuring oracle solutions, deterministic verifiers, Docker-based testbeds, and automated evaluation harnesses.",
    githubUrl: "https://github.com/umangkhandelwall",
    liveUrl: "https://github.com/umangkhandelwall",
    details: [
      {
        label: "Problem",
        items: [
          "Evaluating frontier AI coding agents (such as Claude 3.5 Sonnet, GPT-4o, and Gemini 1.5 Pro) requires robust, deterministic benchmarks where agent actions are verified without false positives.",
          "Tasks must mimic real-world software engineering: complex repo navigation, debugging, library updates, and systems programming."
        ]
      },
      {
        label: "Engineering & Architecture",
        items: [
          "Authored complex benchmarking tasks for Project Sentinel Ultra, Terminus 3, and TerminalBench 2.",
          "Built sealed Docker container environments with strict entrypoints and mock environments.",
          "Implemented deterministic oracle solutions and automated test harnesses verifying patch correctness, regressions, and exit codes."
        ]
      },
      {
        label: "Impact",
        items: [
          "Ensured 100% reproducible evaluation pipelines for state-of-the-art coding agent benchmarks.",
          "Eliminated nondeterministic test flakes across asynchronous system-level test suites."
        ]
      }
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    id: "gjust",
    degree: "Bachelor of Technology in Electronics and Communication Engineering",
    institution: "Guru Jambheshwar University of Science and Technology",
    period: "2022 – 2026",
    location: "Hisar, Haryana",
    focus: "Artificial Intelligence · Machine Learning · Data Structures & Algorithms · Systems Programming · Digital Electronics",
    highlight: "Active technical contributor; hands-on research in LLM evaluation, RAG pipelines, and full-stack software development."
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
];

export const ACHIEVEMENTS = [
  "Authored frontier software engineering benchmark tasks for Project Sentinel Ultra, Terminus 3, and TerminalBench 2.",
  "Engineered production full-stack platforms (Stay Finder & Ink and Insights) with 95+ Lighthouse scores and 99.2% uptime.",
  "Developed intelligent multimodal screen recording pipeline integrating OpenCV, Tesseract OCR, ChromaDB, and Google Gemini.",
  "Built and published GCC Intel, an open market intelligence platform analyzing India's 2,000+ Global Capability Centers.",
  "Selected for specialized technical roles at Crossing Hurdles and Handshake AI evaluating frontier AI coding agents."
];

export const SOCIAL_LINKS = [
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
];

export const RESUME_PATH = "/Umang-Khandelwal-Resume.pdf";
