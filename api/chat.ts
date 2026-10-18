// Server-side Gemini API route for Vercel Serverless Functions
// Ensures GEMINI_API_KEY is never exposed to the client bundle or browser

function getServerFallbackReply(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('crossing hurdles') || q.includes('handshake') || q.includes('benchmark') || q.includes('eval') || q.includes('coding agent')) {
    return `Umang has specialized experience evaluating autonomous AI coding agents:
1. **Crossing Hurdles (Jul 2026 – Present)**: Engineers standardized software engineering benchmark tasks and deterministic verification pipelines to evaluate AI coding models on debugging and refactoring with sealed Docker containers.
2. **Handshake AI (Jun 2026 – Aug 2026)**: Authored software engineering benchmark tasks evaluating terminal workflows, dependency migrations, and bug localization with Docker testbeds and oracle unit tests.`;
  }

  if (q.includes('project') || q.includes('portfolio') || q.includes('built') || q.includes('work')) {
    return `Umang's top engineering projects include:
1. **Stay Finder**: Full-stack accommodation booking platform with Next.js (App Router), TypeScript, PostgreSQL, Prisma ORM, atomic reservation transactions to prevent booking race conditions, and role-based access control.
2. **Ink & Insights**: Content publishing platform featuring Redis sliding-window rate limiting to manage AI quotas and automated editorial critique.
3. **GCC Intel**: Market intelligence platform analyzing India's Global Capability Centers across major metro clusters with comparative operating cost modeling.
4. **LLM Powered Smart Screen Recorder**: Multimodal OCR video capture with Tesseract, dense vector search in ChromaDB, and timestamped citations.
5. **Autonomous Agent Benchmarking Suite**: Standardized benchmark tasks and deterministic Docker verification testbeds for AI coding agents.`;
  }

  if (q.includes('stay finder') || q.includes('booking') || q.includes('airbnb')) {
    return `**Stay Finder**:
- Full-stack booking platform built with Next.js (App Router), TypeScript, PostgreSQL, Prisma ORM, and Tailwind CSS.
- Features atomic transaction isolation to prevent double-booking race conditions during concurrent reservation attempts.
- Includes role-based authentication dividing guest booking flows from host inventory dashboards.`;
  }

  if (q.includes('ink') || q.includes('insights') || q.includes('redis')) {
    return `**Ink & Insights**:
- Built with Next.js, PostgreSQL, Prisma ORM, Redis, and Google Gemini API.
- Implements a Redis sliding-window rate limiting algorithm to regulate client calls and protect LLM inference quotas.
- Provides automated editorial critique for article structure, SEO readiness, and headline suggestions.`;
  }

  if (q.includes('screen recorder') || q.includes('ocr') || q.includes('rag')) {
    return `**LLM Powered Smart Screen Recorder**:
- Built with Python, OpenCV, Tesseract OCR, Sentence Transformers, ChromaDB, and Google Gemini API.
- Implements asynchronous frame sampling to capture textual data without excessive system overhead.
- Indexes dense vector embeddings into ChromaDB for natural language conversational retrieval with exact timestamp citations.`;
  }

  if (q.includes('skill') || q.includes('tech stack') || q.includes('languages') || q.includes('technologies')) {
    return `Umang's core technical stack includes:
- **Languages**: Python, TypeScript, JavaScript, C++, SQL.
- **Web & Full-Stack**: Next.js (App Router), React, React Native, HTML5, CSS3, Tailwind CSS, Framer Motion.
- **Databases & Backend**: PostgreSQL, Prisma ORM, MongoDB, Redis rate limiting, Supabase, ChromaDB.
- **AI & Evaluation**: RAG, LLM Evaluation, Coding Agent Benchmarks, Prompt Engineering, Gemini API, Sentence Transformers, Vector Search.
- **DevOps**: Docker, Linux/Bash, Git/GitHub Actions, Postman, Vercel.`;
  }

  if (q.includes('hire') || q.includes('available') || q.includes('job') || q.includes('role') || q.includes('opportunity')) {
    return `Umang is actively **AVAILABLE** and open to:
- **Software Development Engineer (SDE)**
- **Advanced AI Engineer / Generative AI Developer**
- **AI/ML & LLM Systems Engineer**
- **Full-Stack Developer (Next.js / TypeScript / Python)**

He can be reached directly at **khandelwalu196@gmail.com**.`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('linkedin') || q.includes('github')) {
    return `You can connect with Umang via:
- **Email**: khandelwalu196@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/umang-khandelwal-71604228b/
- **GitHub**: https://github.com/umangkhandelwall
- **Location**: Delhi NCR / Haryana, India`;
  }

  return `Umang Khandelwal is an Advanced AI Engineer & Full-Stack Developer specializing in full-stack Next.js web applications, coding agent evaluation benchmarks, and multimodal RAG pipelines. Would you like to know more about his specific projects, background, or how to get in touch?`;
}

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Valid message string is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If server has no GEMINI_API_KEY configured, use factual server fallback
    if (!apiKey) {
      return res.status(200).json({
        reply: getServerFallbackReply(message),
      });
    }

    const systemPrompt = `You are the AI Assistant for Umang Khandelwal's portfolio. Answer factually and concisely:
Name: Umang Khandelwal
Roles: Full-Stack Developer & Advanced AI Engineer
Location: Delhi NCR / Haryana, India
Email: khandelwalu196@gmail.com
LinkedIn: https://www.linkedin.com/in/umang-khandelwal-71604228b/
GitHub: https://github.com/umangkhandelwall
Skills: Next.js (App Router), TypeScript, React, Tailwind CSS, PostgreSQL, Prisma ORM, Redis, Python, RAG pipelines, ChromaDB, Sentence Transformers, Docker evaluation testbeds.
Experience:
1. Crossing Hurdles (Jul 2026 – Present): Software engineering benchmark tasks evaluating AI coding models on debugging and refactoring with deterministic verifiers and sealed Docker containers.
2. Handshake AI (Jun 2026 – Aug 2026): Authored software engineering benchmark tasks testing terminal workflows, dependency migrations, and bug localization with Docker test environments and oracle test suites.
Projects:
1. Stay Finder: Full-stack accommodation booking platform with Next.js App Router, TypeScript, PostgreSQL, Prisma ORM, atomic reservation transactions to prevent booking race conditions, and role-based access control.
2. Ink & Insights: Publishing platform with Next.js, PostgreSQL, Prisma, Redis sliding-window rate limiting, and Gemini-assisted content critique.
3. GCC Intel: Market intelligence platform analyzing India's Global Capability Centers with comparative metro cost modeling and state policy breakdown.
4. LLM Powered Smart Screen Recorder: Asynchronous video frame OCR pipeline with Tesseract, dense vector embeddings in ChromaDB, and timestamped citations.
5. Autonomous Agent Benchmarking Suite: Benchmark suites for autonomous coding agents with isolated Docker testbeds and deterministic verification scripts.
Education: B.Tech in Electronics & Communication Engineering (2022-2026), Guru Jambheshwar University of Science and Technology.
Never invent metrics, user counts, or confidential project names. Keep answers concise and in markdown.`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              { text: systemPrompt },
              { text: `Question: ${message}` }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 600,
          temperature: 0.2,
        }
      })
    });

    if (!geminiRes.ok) {
      console.warn('Gemini upstream returned status:', geminiRes.status);
      return res.status(200).json({
        reply: getServerFallbackReply(message),
      });
    }

    const data = await geminiRes.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return res.status(200).json({
      reply: candidateText || getServerFallbackReply(message),
    });
  } catch (error) {
    console.error('Server error in /api/chat:', error);
    return res.status(200).json({
      reply: getServerFallbackReply(req.body?.message || ''),
    });
  }
}
