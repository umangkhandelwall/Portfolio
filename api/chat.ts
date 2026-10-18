// Server-side Gemini API route for Vercel Serverless Functions
// Includes Upstash Redis rate limiting per IP and max message length validation

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Upstash rate limiter instance if credentials are configured in environment
let upstashRatelimit: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    upstashRatelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(6, '60 s'),
      prefix: 'portfolio_chat_limit',
    });
  } catch (err) {
    console.warn('Failed to initialize Upstash Redis client:', err);
  }
}

// In-memory sliding window fallback for local dev / unconfigured environments
const memoryRateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkMemoryRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 6;

  const record = memoryRateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    memoryRateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

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
3. **GCC Intel**: Market intelligence platform analyzing India's Global Capability Centers across 6 metro clusters with comparative operating cost modeling.
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
- **Location**: Faridabad, India`;
  }

  return `Umang Khandelwal is an Advanced AI Engineer & Full-Stack Developer specializing in full-stack Next.js web applications, coding agent evaluation benchmarks, and multimodal RAG pipelines. Would you like to know more about his specific projects, background, or how to get in touch?`;
}

export default async function handler(req: any, res: any) {
  // CORS configuration
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
    // 1. IP Resolution for Rate Limiting
    const forwarded = req.headers['x-forwarded-for'];
    const ip =
      (typeof forwarded === 'string' ? forwarded.split(',')[0]?.trim() : null) ||
      (req.headers['x-real-ip'] as string) ||
      req.socket?.remoteAddress ||
      'anonymous-ip';

    // 2. Upstash / In-Memory Rate Limiting (6 requests / 60 seconds)
    if (upstashRatelimit) {
      const { success, remaining, reset } = await upstashRatelimit.limit(ip);
      res.setHeader('X-RateLimit-Remaining', remaining);
      res.setHeader('X-RateLimit-Reset', reset);

      if (!success) {
        res.setHeader('Retry-After', '60');
        return res.status(429).json({
          error: 'Rate limit reached',
          reply: "You've sent several queries in a short window. Please wait 60 seconds before sending another message.",
        });
      }
    } else {
      const allowed = checkMemoryRateLimit(ip);
      if (!allowed) {
        res.setHeader('Retry-After', '60');
        return res.status(429).json({
          error: 'Rate limit reached',
          reply: "You've sent several queries in a short window. Please wait 60 seconds before sending another message.",
        });
      }
    }

    // 3. Message Validation & Max Length Enforcement (500 characters max)
    const { message } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Valid message string is required' });
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    const MAX_LENGTH = 500;
    if (trimmedMessage.length > MAX_LENGTH) {
      return res.status(400).json({
        error: `Message exceeds maximum allowed length of ${MAX_LENGTH} characters.`,
        reply: `Your question is too long (${trimmedMessage.length} characters). Please shorten it to under ${MAX_LENGTH} characters.`,
      });
    }

    // 4. Server-Side Gemini Execution
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Graceful server-side fallback if GEMINI_API_KEY is not set in environment
      return res.status(200).json({
        reply: getServerFallbackReply(trimmedMessage),
      });
    }

    const systemPrompt = `You are the AI Assistant for Umang Khandelwal's portfolio. Answer factually, professionally, and concisely:
Name: Umang Khandelwal
Roles: Full-Stack Developer & Advanced AI Engineer
Location: Faridabad, India
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
3. GCC Intel: Market intelligence platform analyzing India's Global Capability Centers across 6 metro clusters with comparative operating cost modeling and state policy breakdown.
4. LLM Powered Smart Screen Recorder: Asynchronous video frame OCR pipeline with Tesseract, dense vector embeddings in ChromaDB, and timestamped citations.
5. Autonomous Agent Benchmarking Suite: Benchmark suites for autonomous coding agents with isolated Docker testbeds and deterministic verification scripts.
Education: B.Tech in Electronics & Communication Engineering (2022-2026), Guru Jambheshwar University of Science and Technology.
Never invent metrics, user counts, or confidential project names. Keep answers concise and formatted in markdown.`;

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
              { text: `Question: ${trimmedMessage}` }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.2,
        }
      })
    });

    if (!geminiRes.ok) {
      console.warn('Gemini upstream returned status:', geminiRes.status);
      return res.status(200).json({
        reply: getServerFallbackReply(trimmedMessage),
      });
    }

    const data = await geminiRes.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return res.status(200).json({
      reply: candidateText || getServerFallbackReply(trimmedMessage),
    });
  } catch (error) {
    console.error('Server error in /api/chat:', error);
    return res.status(200).json({
      reply: getServerFallbackReply(req.body?.message || ''),
    });
  }
}
