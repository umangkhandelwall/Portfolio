# Umang Khandelwal — AI Engineer & Full-Stack Developer Portfolio

An exact, ditto look-alike implementation of [thkrdanubhav.in](https://www.thkrdanubhav.in/) tailored specifically for **Umang Khandelwal**, incorporating all real resume details, GitHub repositories, LinkedIn profile, AI benchmarking achievements, and full-stack projects.

![Portfolio Preview](/umang-portrait.svg)

---

## 🚀 Key Highlights & Matched Design System

- **Exact Look-and-Feel**:
  - Deep black aesthetic (`#020202`) with titanium brushed gradients (`--titanium`).
  - High-gloss dual-tone metallic hero typography with dual layers: **UMANG** (`.name-matte`) and **KHANDELWAL** (`.chrome-hero`).
  - Atmospheric 88px geometric background grid with radial ambient glow orbs.
  - Interactive canvas particle mesh responding to cursor physics.
  - Right-edge traveling light beam (`.edge-light`) and header hairline progress runner (`.hdr-pulse`).
  - HUD developer portrait with chrome brackets (`.chrome-bracket`), coordinate markers (`X:032`, `Y:118`), and animated scan beam (`.pscan-beam`).
  - `Initiate connection` CTA button (`.cta-connect`) with 45-degree beveled geometry, rotating conic particle spark, neon zap bolt, and interactive circuit path (`.conn-circuit`).
  - Desktop vertical minimap (`min-[1400px]:flex`) and mobile vertical orientation indicators.
  - Capabilities & Track Record expandable accordions with subtle active radial spotlight.
- **AI-Powered "Ask Me Anything" Feature**:
  - Interactive HUD modal assistant grounded on Umang's real resume data.
  - Quick-prompt chips for instant queries (skills, experience, AI benchmarks, Stay Finder, Ink & Insights, hiring availability).
  - Built-in instant intelligence engine + optional user-provided Google Gemini API key for live LLM streaming generation.
- **Real Verified Content**:
  - **Experience**: Crossing Hurdles (Project Sentinel Ultra & Terminus 3), Handshake AI (Project Dynamo & TerminalBench 2), Flitzen Technologies UK Limited.
  - **Projects**: LLM Powered Smart Screen Recorder, Stay Finder, Ink & Insights, GCC Intel, Autonomous Coding Agent Benchmarks.
  - **Education**: B.Tech in Electronics & Communication Engineering from Guru Jambheshwar University of Science & Technology; Aggarwal Public School.
  - **Contact**: Direct email `khandelwalu196@gmail.com`, phone `+91-8586919205`, LinkedIn, and GitHub links.
  - **Resume**: Includes working "Download Resume" buttons wired directly to the real resume PDF.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Custom Titanium & Chrome CSS Gradients
- **Animations**: Framer Motion + Canvas 2D Physics + CSS Keyframe Engines
- **Icons**: Lucide React + Custom Tech Brand SVGs
- **Celebration & Micro-interactions**: `canvas-confetti` + dynamic cursor interaction

---

## 💻 Local Installation & Running

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 1. Navigate to the project directory
```bash
cd "C:\Users\khand\.gemini\antigravity\scratch\umang-portfolio"
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 4. Create production build
```bash
npm run build
```
The optimized static build will be output to the `dist/` directory.

---

## 🌐 Deploying for Free

### Option 1: Vercel (Recommended - 1 Click)
1. Push your repository to your GitHub account (`https://github.com/umangkhandelwall/portfolio`).
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your repository. Vercel automatically detects Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Your site will be live on a `*.vercel.app` domain with free SSL!

*Or deploy from terminal via Vercel CLI:*
```bash
npx vercel
```

---

### Option 2: Netlify (Drag & Drop or Git)
1. Run `npm run build` to create the `dist/` folder.
2. Go to [Netlify Drop](https://app.netlify.com/drop).
3. Drag and drop the `dist/` folder onto the page. Your site goes live instantly!
4. Or connect your GitHub repository to Netlify for automatic continuous deployment.

---

### Option 3: GitHub Pages
1. In `vite.config.ts`, if your repository is named `portfolio`, set `base: '/portfolio/'`:
   ```ts
   export default defineConfig({
     base: '/portfolio/',
     plugins: [react(), tailwindcss()],
   });
   ```
2. Build and publish:
   ```bash
   npm run build
   npx gh-pages -d dist
   ```

---

## 📂 Project Structure

```
umang-portfolio/
├── public/
│   ├── Umang-Khandelwal-Resume.pdf  # Downloadable real resume
│   └── umang-portrait.svg           # High-tech HUD avatar silhouette
├── src/
│   ├── components/
│   │   ├── AiAssistantModal.tsx     # "Ask me anything" AI Chatbot
│   │   ├── BackgroundGrid.tsx       # 88px grid + particle canvas physics
│   │   ├── Connect.tsx              # Contact section + message form + socials
│   │   ├── Education.tsx            # Degrees + verified achievements
│   │   ├── Experience.tsx           # Track record accordion
│   │   ├── Footer.tsx               # Copyright & back to top
│   │   ├── Header.tsx               # Fixed bar + system status + navigation
│   │   ├── Hero.tsx                 # Hero section + typography + HUD portrait
│   │   ├── Icons.tsx                # SVG Brand icons (GitHub, LinkedIn)
│   │   ├── Minimap.tsx              # Vertical section progress minimap
│   │   ├── ProjectModal.tsx         # In-depth project dossier dialog
│   │   └── Projects.tsx             # Projects index + GitHub CTA banner
│   ├── data/
│   │   └── portfolioData.ts         # Centralized verified data & credentials
│   ├── App.tsx                      # Root coordinator
│   ├── index.css                    # Titanium, chrome, HUD & scan styles
│   └── main.tsx                     # React 19 entrypoint
├── index.html                       # HTML shell with Google Fonts
├── package.json
├── tsconfig.json
└── vite.config.ts                   # Vite + Tailwind v4 + React plugins
```

---

## 📄 License
Created for **Umang Khandelwal**.
