# Portfolio Verified Data Checklist (TODO)

This document tracks empirical metrics and verified data points to collect and confirm before publishing them on the live portfolio.

---

## 1. Projects

### Stay Finder
- [ ] **Verified Listing Count**: Exact number of dynamic listings seeded or queried in database.
- [ ] **Query Latency**: Measured average API response time (p50 / p95) under simulated load.
- [ ] **Lighthouse Audit Score**: Run Google Lighthouse on production deployment and record Performance, Accessibility, Best Practices, and SEO scores.
- [ ] **Live Deployment Link**: If hosted on Vercel or Render, record live URL.

### Ink & Insights
- [ ] **Active User Count**: Measured user base or simulated load concurrency.
- [ ] **Uptime Metric**: Production uptime percentage verified via monitoring (e.g., UptimeRobot, BetterStack).
- [ ] **LLM Evaluation Latency**: Measured average time from article submission to Gemini feedback response.
- [ ] **Live Deployment Link**: If deployed live, record URL.

### GCC Intel
- [x] **Verified MNC Records**: 30 verified MNC captive centre entries in `gccs.json` with primary publisher citations.
- [x] **Metro Clusters**: 6 modeled metro clusters in `cities.json` (Bengaluru, Hyderabad, Pune, Chennai, Delhi-NCR, Mumbai).
- [x] **State Policies**: 5 state incentive frameworks in `policies.json` (Karnataka, Tamil Nadu, Telangana, Maharashtra, Gujarat GIFT City).
- [ ] **Live Deployment Link**: Add live link once deployed to production.

### LLM Powered Smart Screen Recorder
- [ ] **Token Volume**: Total indexed token volume tested in ChromaDB collections.
- [ ] **Vector Query Latency**: Measured search time for top-k nearest neighbor retrieval with Sentence Transformers.
- [ ] **Repository Link**: Create a dedicated public GitHub repository with README and demo GIF.

### Autonomous Agent Benchmarking Suite
- [ ] **Task Count**: Total number of completed benchmark tasks created.
- [ ] **Evaluation Harness**: Confirm test suite pass rates and false-positive elimination rate.
- [ ] **Repository Link**: Create a dedicated public GitHub repository with sealed Docker setup and sample task runner.

---

## 2. Professional Roles

### Crossing Hurdles
- [ ] **Public Role Title**: Confirm non-confidential job title.
- [ ] **Task Volume**: Verified count of benchmark tasks authored or reviewed.

### Handshake AI
- [ ] **Public Role Title**: Confirm non-confidential title.
- [ ] **Task Volume**: Verified count of terminal and software engineering tasks contributed.

---

## 3. Environment Variables (Vercel)

- [ ] `GEMINI_API_KEY`: Add your rotated Google Gemini API key to Vercel Project Settings → Environment Variables.
- [ ] `UPSTASH_REDIS_REST_URL`: (Optional) Add Upstash Redis REST URL for distributed serverless rate limiting.
- [ ] `UPSTASH_REDIS_REST_TOKEN`: (Optional) Add Upstash Redis REST Token.
