import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, EDUCATION, SKILL_CATEGORIES } from '../data/portfolioData';
import { X, Bot, Sparkles, Send, Key, RefreshCw, Copy, Check, ChevronRight } from 'lucide-react';

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
      text: `Hello! I am Umang's AI Dossier Assistant. Ask me anything about Umang's experience in frontier AI coding agent benchmarks, LLM RAG pipelines, full-stack Next.js platforms, or hiring availability!`,
      timestamp: 'SYSTEM READY',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('umang_gemini_key') || '' : ''
  );
  const [showKeyInput, setShowKeyInput] = useState(false);
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

  // Suggested prompt chips
  const suggestedPrompts = [
    "What AI projects has Umang built?",
    "Tell me about his work on TerminalBench 2",
    "What is his full-stack experience?",
    "Is Umang open for SDE or AI roles?",
    "How can I reach Umang directly?"
  ];

  // Local knowledge-base answering engine
  const generateLocalResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('terminalbench') || q.includes('sentinel') || q.includes('crossing hurdles') || q.includes('handshake') || q.includes('benchmark') || q.includes('eval')) {
      return `Umang has substantial specialized experience evaluating frontier AI coding agents:
1. **Crossing Hurdles (Jul 2026 – Present)**: Working on **Project Sentinel Ultra** and **Terminus 3**, engineering domain-grounded terminal benchmarking tasks in Harbor format with Docker environments, oracle implementations, and automated verification.
2. **Handshake AI (Jun 2026 – Aug 2026)**: Contributed to **Project Dynamo** by authoring complex software engineering benchmark tasks for **TerminalBench 2**, creating deterministic verifiers and test suites.`;
    }

    if (q.includes('project') || q.includes('portfolio') || q.includes('built') || q.includes('work')) {
      return `Umang's top highlighted engineering projects include:
1. **LLM Powered Smart Screen Recorder**: Multimodal OCR + Sentence Transformers + ChromaDB vector database + Google Gemini RAG pipeline for conversational querying of screen history.
2. **Stay Finder**: Full-stack Airbnb-style accommodation platform with Next.js, PostgreSQL, Prisma, 500+ listings, real-time booking logic, and 95+ Lighthouse score.
3. **Ink & Insights**: Data-driven blog engine supporting 500+ concurrent users with 99.2% uptime, automated Gemini content evaluation, and Redis rate limiting.
4. **GCC Intel**: Open market intelligence platform for India's 2,000+ Global Capability Centers.`;
    }

    if (q.includes('screen recorder') || q.includes('ocr') || q.includes('rag')) {
      return `**LLM Powered Smart Screen Recorder**:
- Built with Python, OpenCV, Tesseract OCR, Sentence Transformers, ChromaDB, and Google Gemini API.
- Implements asynchronous frame sampling, extracts on-screen text, generates 768-dim vector embeddings, and stores them in ChromaDB.
- Enables natural language queries like *"What was the terminal command I ran 2 hours ago?"* with sub-second retrieval.`;
    }

    if (q.includes('stay finder') || q.includes('airbnb') || q.includes('booking')) {
      return `**Stay Finder**:
- Full-stack booking platform built with Next.js (App Router), TypeScript, PostgreSQL, Prisma ORM, and Tailwind CSS.
- Handles 500+ listings with real-time reservation concurrency checks, role-based auth (host vs guest), and achieves a 95+ Google Lighthouse score.`;
    }

    if (q.includes('ink') || q.includes('insights') || q.includes('redis')) {
      return `**Ink & Insights**:
- Built with Next.js, PostgreSQL, Prisma, Redis, and Gemini API.
- Features Redis token-bucket rate limiting to protect LLM quotas, supports 500+ concurrent writers with 99.2% uptime, and delivers sub-2-second AI feedback.`;
    }

    if (q.includes('skill') || q.includes('tech stack') || q.includes('languages') || q.includes('technologies')) {
      return `Umang's core technical stack includes:
- **Languages**: Python (NumPy, Pandas), TypeScript, JavaScript, C++, SQL.
- **Web & Full-Stack**: ReactJS, React Native, Next.js, HTML5, CSS3, Tailwind CSS, Framer Motion.
- **Databases**: PostgreSQL, Prisma ORM, MongoDB, Redis, Supabase, ChromaDB.
- **AI/ML**: RAG, LLM Evaluation, AI Benchmarking, Prompt Engineering, Gemini API, Sentence Transformers, Semantic Search.
- **DevOps**: Docker, Linux/Bash, Git/GitHub, Postman, Vercel, Render, Cursor AI.`;
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
- **Location**: Faridabad / Delhi NCR, India`;
    }

    return `Umang Khandelwal is an Advanced AI Engineer & Full-Stack Developer specializing in frontier AI coding agent benchmarks (Harbor format, TerminalBench 2), multimodal RAG systems, and high-performance Next.js full-stack applications. Would you like to know more about his specific projects, industry experience, or how to get in touch?`;
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

    // If custom Gemini API key is provided, call Gemini API
    if (apiKey.trim()) {
      try {
        const systemPrompt = `You are the AI Assistant for Umang Khandelwal's portfolio website. Answer accurately and professionally based on his resume:
Name: Umang Khandelwal
Roles: Advanced AI Engineer, LLM Systems Specialist, Full-Stack Developer
Email: khandelwalu196@gmail.com
LinkedIn: https://www.linkedin.com/in/umang-khandelwal-71604228b/
GitHub: https://github.com/umangkhandelwall
Education: B.Tech ECE (2022-2026) at Guru Jambheshwar University of Science and Technology.
Experience:
1. Advanced AI Engineer at Crossing Hurdles (Jul 2026 - Present): Project Sentinel Ultra & Terminus 3 evaluating frontier AI coding agents, Harbor format, Docker, deterministic verifiers.
2. LLM Trainer at Handshake AI (Jun 2026 - Aug 2026): TerminalBench 2, Project Dynamo, Docker evaluation pipelines, oracle solutions.
Projects:
1. LLM Powered Smart Screen Recorder (Python, OpenCV, Tesseract OCR, Sentence Transformers, ChromaDB, Gemini API)
2. Stay Finder (Next.js, TypeScript, PostgreSQL, Prisma, 500+ listings, 95+ Lighthouse score)
3. Ink & Insights (Next.js, PostgreSQL, Prisma, Redis rate limiting, Gemini API, 500+ users, 99.2% uptime)
4. GCC Intel (Next.js, TypeScript, market intelligence on 2,000+ GCCs)
Keep answers concise, markdown-formatted, and helpful.`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: `${systemPrompt}\n\nVisitor Question: ${query}` }],
                },
              ],
            }),
          }
        );

        const data = await response.json();
        const replyText =
          data?.candidates?.[0]?.content?.parts?.[0]?.text || generateLocalResponse(query);

        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        return;
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local engine:', err);
      }
    }

    // Default fast local intelligence engine
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
    }, 450);
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
                <span>AI DOSSIER AGENT</span>
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <span className="label-mono text-[9px] text-[var(--muted-foreground)] block">
                Grounded on Umang&apos;s verified credentials
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowKeyInput(!showKeyInput)}
              title="Configure Gemini API Key"
              className={`p-1.5 border transition-colors ${
                apiKey
                  ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                  : 'border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              }`}
            >
              <Key className="size-3.5" />
            </button>
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
              className="p-1.5 border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              <RefreshCw className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--primary)] transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Optional Gemini API Key Drawer */}
        {showKeyInput && (
          <div className="border-b border-[var(--line)] bg-[#040507] p-3 text-xs font-mono">
            <div className="flex items-center justify-between mb-1.5">
              <span className="label-mono text-[10px] text-emerald-400">
                OPTIONAL: GEMINI API KEY (FOR DIRECT LLM STREAMING)
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="Enter Gemini API key (AIzaSy...)"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  localStorage.setItem('umang_gemini_key', e.target.value);
                }}
                className="flex-1 border border-[var(--border)] bg-[#090b0e] px-2.5 py-1.5 text-xs text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowKeyInput(false)}
                className="border border-[var(--border)] px-3 py-1 text-[10px] uppercase tracking-wider hover:border-[var(--primary)] text-[var(--foreground)]"
              >
                Save
              </button>
            </div>
            <p className="mt-1 text-[9px] text-[var(--muted-foreground)]">
              Keys are stored only locally in your browser. Without a key, the agent uses the instant local knowledge base.
            </p>
          </div>
        )}

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="label-mono text-[9px]">
                  {msg.sender === 'user' ? 'YOU' : 'AI AGENT'}
                </span>
                <span className="label-mono text-[8px] text-[var(--muted-foreground)]/60">
                  {msg.timestamp}
                </span>
              </div>

              <div
                className={`group relative max-w-[88%] p-3.5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#1a1d24] border border-[var(--border-strong)] text-[var(--foreground)]'
                    : 'bg-[#0f1115] border border-[var(--border)] text-[var(--foreground)]/90'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.sender === 'ai' && (
                  <button
                    type="button"
                    onClick={() => copyMessage(msg.id, msg.text)}
                    className="absolute -top-2.5 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#040507] border border-[var(--border)] p-1 text-[10px] text-[var(--muted-foreground)] hover:text-white"
                    title="Copy response"
                  >
                    {copiedId === msg.id ? (
                      <Check className="size-3 text-emerald-400" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--primary)] pl-2">
              <span className="inline-block size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Synthesizing response...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="border-t border-[var(--line)] bg-[#060709] px-3 py-2 overflow-x-auto whitespace-nowrap flex gap-2">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(prompt)}
              className="inline-flex shrink-0 items-center gap-1 border border-[var(--border)] bg-[#0b0d10] px-2.5 py-1 font-mono text-[10px] tracking-wide text-[var(--foreground-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors cursor-pointer"
            >
              <span>{prompt}</span>
              <ChevronRight className="size-2.5 opacity-60" />
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="border-t border-[var(--border)] bg-[#090b0e] p-3 flex gap-2"
        >
          <input
            type="text"
            placeholder="Ask about Umang's projects, AI evaluation, skills, or hiring availability..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-[var(--border)] bg-[#040507] px-3 py-2 font-mono text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/50 focus:border-[var(--primary)] focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="btn-titanium inline-flex items-center justify-center px-4 py-2 font-mono text-xs uppercase text-[var(--foreground)] disabled:opacity-40"
          >
            <Send className="size-3.5" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
