import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Sparkles, Send, RefreshCw, Copy, Check, ChevronRight } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! I am Umang's AI Assistant. Ask me anything about Umang's experience in full-stack Next.js platforms, coding agent benchmarking, RAG pipelines, or hiring availability!`,
      timestamp: 'SYSTEM READY',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Suggested prompt chips (Factual, no confidential names or unverified metrics)
  const suggestedPrompts = [
    "What full-stack projects has Umang built?",
    "Tell me about his work on AI coding benchmarks",
    "How does the Stay Finder reservation system work?",
    "Is Umang open for SDE or AI roles?",
    "How can I reach Umang directly?"
  ];

  // Local factual knowledge-base fallback engine
  const generateLocalResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('benchmark') || q.includes('crossing hurdles') || q.includes('handshake') || q.includes('eval') || q.includes('coding agent')) {
      return `Umang has specialized experience evaluating autonomous AI coding agents:
1. **Crossing Hurdles (Jul 2026 – Present)**: Engineers standardized software engineering benchmark tasks and deterministic verification pipelines to evaluate AI coding models on debugging and refactoring with sealed Docker containers.
2. **Handshake AI (Jun 2026 – Aug 2026)**: Authored software engineering benchmark tasks evaluating terminal workflows, dependency migrations, and bug localization with Docker test environments and oracle unit tests.`;
    }

    if (q.includes('project') || q.includes('portfolio') || q.includes('built') || q.includes('work')) {
      return `Umang's top engineering projects include:
1. **Stay Finder**: Full-stack accommodation booking platform with Next.js (App Router), TypeScript, PostgreSQL, Prisma ORM, atomic reservation transactions to prevent booking race conditions, and role-based access control.
2. **Ink & Insights**: Content publishing platform featuring Redis sliding-window rate limiting to manage AI quotas and automated editorial critique.
3. **GCC Intel**: Market intelligence platform analyzing India's Global Capability Centers across major metro clusters with comparative operating cost modeling.
4. **LLM Powered Smart Screen Recorder**: Multimodal OCR video capture with Tesseract, dense vector search in ChromaDB, and timestamped citations.
5. **Autonomous Agent Benchmarking Suite**: Standardized benchmark tasks and deterministic Docker verification testbeds for AI coding agents.`;
    }

    if (q.includes('stay finder') || q.includes('airbnb') || q.includes('booking')) {
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

    if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('university') || q.includes('gjust')) {
      return `**Education Profile**:
1. **Bachelor of Technology in Electronics and Communication Engineering (2022 – 2026)**
   Guru Jambheshwar University of Science and Technology, Hisar, Haryana.
   Focus: AI, Machine Learning, Data Structures & Algorithms, Systems Programming.
2. **Higher Secondary (12th Grade, 2021 – 2022)**
   Aggarwal Public School, Ballabgarh, Faridabad. Distinction in Science & Math.`;
    }

    if (q.includes('hire') || q.includes('available') || q.includes('job') || q.includes('role') || q.includes('opportunity')) {
      return `Yes! Umang is actively **AVAILABLE** and open to:
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
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      // Server-side API route call — zero API keys in client code
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.reply) {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              sender: 'ai',
              text: data.reply,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
          return;
        }
      }
    } catch (err) {
      console.warn('Server chat route unreachable, falling back to local factual engine:', err);
    }

    // Fast factual fallback if serverless route is not yet deployed or in local dev
    setTimeout(() => {
      const reply = generateLocalResponse(query);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 350);
  };

  const copyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8">
      {/* Dark backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Main Chat Interface */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 flex h-[620px] w-full max-w-2xl flex-col bg-[#090b0e] border border-[var(--border-strong)] shadow-[0_20px_60px_rgba(0,0,0,0.9)] titanium overflow-hidden"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[var(--border)] bg-[#0c0e12] px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Bot className="size-4" />
            </span>
            <div>
              <span className="font-mono text-xs tracking-[0.16em] uppercase text-[var(--foreground)] font-bold flex items-center gap-2">
                <span>AI ASSISTANT</span>
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <span className="label-mono text-[9px] text-[var(--muted-foreground)] block">
                Server-side LLM route · Zero client keys
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setMessages([
                  {
                    id: 'welcome',
                    sender: 'ai',
                    text: `Chat reset. What would you like to know about Umang?`,
                    timestamp: 'SYSTEM RESET',
                  },
                ])
              }
              title="Reset conversation"
              className="p-1.5 border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            >
              <RefreshCw className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--primary)] transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="label-mono text-[9px]">
                  {msg.sender === 'user' ? 'YOU' : 'AI ASSISTANT'}
                </span>
                <span className="label-mono text-[8px] text-[var(--muted-foreground)]/60">
                  {msg.timestamp}
                </span>
              </div>

              <div
                className={`group relative max-w-[85%] rounded p-3.5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[var(--primary)] text-[#020202] font-medium'
                    : 'bg-[#121418] border border-[var(--border)] text-[var(--foreground)]'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {msg.sender === 'ai' && (
                  <button
                    type="button"
                    onClick={() => copyMessage(msg.id, msg.text)}
                    aria-label="Copy text"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-black/40 text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded"
                  >
                    {copiedId === msg.id ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                  </button>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted-foreground)] pl-1">
              <span className="size-1.5 bg-emerald-400 animate-ping rounded-full" />
              <span>Querying server model...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        <div className="border-t border-[var(--line)] bg-[#07080a] p-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 w-max">
            <span className="label-mono text-[9px] text-[var(--primary-strong)] shrink-0 flex items-center gap-1">
              <Sparkles className="size-3" /> SUGGESTED:
            </span>
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(prompt)}
                className="inline-flex items-center gap-1 text-[10px] font-mono tracking-wider border border-[var(--border)] bg-white/[0.02] px-2.5 py-1 text-[var(--foreground-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>{prompt}</span>
                <ChevronRight className="size-2.5 opacity-60" />
              </button>
            ))}
          </div>
        </div>

        {/* Query Input */}
        <div className="border-t border-[var(--border)] bg-[#0c0e12] p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Umang's experience, full-stack systems, or skills..."
              className="flex-1 border border-[var(--border)] bg-[#090b0e] px-3.5 py-2 text-xs sm:text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 focus:border-[var(--primary)] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              className="btn-titanium px-4 py-2 font-mono text-xs tracking-wider uppercase disabled:opacity-40 cursor-pointer"
            >
              <Send className="size-3.5" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
