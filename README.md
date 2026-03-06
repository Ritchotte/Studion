# Studion

![Node](https://img.shields.io/badge/node.js-green?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-blue?logo=typescript&logoColor=white)
![Chrome Extension](https://img.shields.io/badge/chrome-extension-orange?logo=googlechrome&logoColor=white)
![Express](https://img.shields.io/badge/express-black?logo=express&logoColor=white)

> Your academic operating system.

An AI-powered platform designed to help students manage assignments, deadlines, and study workflows automatically. Studion combines a Chrome extension with an intelligent backend to transform learning platforms like Brightspace into a personal academic assistant.

---

## Demo

**Studion Chrome Extension in Action**

The extension scans learning platform pages and extracts structured assignment data that can be used for automatic tracking, deadline management, and study planning.

**Example Output:**
```json
{
  "course": "COMP 2132 - Object-Oriented Programming",
  "assignment": "Assignment 4: Workflow Engine",
  "dueDate": "2026-03-20T23:59:00Z",
  "weight": "15%",
  "description": "Build a workflow engine using Node.js...",
  "status": "upcoming"
}
```

**Backend Response:**
```
Assignment Analysis: COMP 2132 Assignment 4
Priority: HIGH (15% of final grade)
Time until due: 14 days

Recommended Schedule:
Week 1: Research & Setup (5 hours)
Week 2: Core Development (8 hours)  
Week 3: Testing & Polish (4 hours)

Notifications scheduled: 7d, 3d, 1d reminders
```

---

## Why Studion Exists

University platforms provide information but rarely help students manage their workload.

Assignments, announcements, and deadlines are scattered across multiple systems. Students spend more time organizing their work than actually completing it—checking portals, manually updating calendars, estimating workloads, and trying to remember which assignments matter most.

**Studion is designed to act as an intelligent layer on top of existing learning platforms**, helping students stay organized and proactive without requiring manual tracking.

### The Core Problem

Students don't fail because they can't do the work—they fail because managing the work is overwhelming. Between juggling LMS portals, group chats, email threads, and shifting deadlines, the cognitive load of *organizing* school competes with actually learning.

**Studion handles the meta-work so students can focus on the actual work.**

---

## The Solution

A Chrome extension + AI agent system that:

1. **Automatically extracts** assignments from your university portal (D2L Brightspace)
2. **Intelligently analyzes** workload, priority, and complexity
3. **Generates actionable** study plans with realistic time estimates
4. **Keeps you ahead** with smart reminders and deadline tracking
5. **Creates structure** with auto-generated project hubs for major assignments

### Why a Chrome Extension?

Universities lock down LMS APIs—but students are already authenticated in their browsers. A Chrome extension reads the same data students can already see, no institutional approval needed. It's invisible infrastructure that just works.

---

## Future Vision

Studion is intended to evolve into a complete academic operating system—an intelligent autopilot for student life.

**Planned Capabilities:**

- 🎯 **Automated Assignment Detection** — Scan learning platforms automatically, no manual input
- 🤖 **AI-Driven Study Planning** — Generate realistic schedules based on workload and calendar gaps
- 🔔 **Smart Deadline Management** — Multi-channel reminders (browser, calendar, email, SMS)
- 📋 **Intelligent Task Breakdown** — Convert vague assignments into actionable step-by-step plans
- 🏗️ **Collaborative Project Hubs** — Auto-generate structured workspaces for group projects
- 🔗 **Platform Integrations** — Connect with Google Calendar, Notion, Slack, and messaging tools
- 📊 **Priority Intelligence** — Automatically identify high-impact assignments by weight and difficulty
- 🌐 **Multi-LMS Support** — Expand beyond Brightspace to Canvas, Moodle, and other platforms

**The Goal:** An AI agent that knows your courses, tracks your assignments, plans your study schedule, and keeps you ahead of deadlines—all running quietly in the background.

---

## Current Status

### What's Built (So Far)

### ✅ Backend Infrastructure
- Express.js API server with TypeScript
- Health monitoring endpoint
- Hot-reload development environment
- Clean project architecture ready for scaling

### ✅ Repository Foundation
- Professional Git workflow established
- Proper `.gitignore` hygiene (no bloat)
- Modular codebase structure (backend/extension separation)

### 🚧 Currently Building
- Chrome extension skeleton
- D2L Brightspace content scraping
- Assignment data extraction pipeline

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     D2L Brightspace                         │
│                  (University LMS Portal)                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ DOM Parsing
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Chrome Extension (Data Layer)                  │
│  • Content scripts extract assignment metadata              │
│  • Structured JSON payload generation                       │
│  • Popup UI for quick assignment overview                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ POST /api/assignments
                         ▼
┌─────────────────────────────────────────────────────────────┐
│            Backend API (Node.js + Express)                  │
│  • Assignment ingestion & storage                           │
│  • AI agent orchestration                                   │
│  • Priority scoring algorithms                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Claude API
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  AI Agent System                            │
│  • Workload estimation (hours needed)                       │
│  • Task breakdown generation                                │
│  • Study schedule optimization                              │
│  • Project hub scaffolding                                  │
└─────────────────────────────────────────────────────────────┘
```

### Example Data Flow

**1. Student visits Brightspace assignment page**
```javascript
// Extension content script extracts:
{
  "course": "COMP 2132 - Object-Oriented Programming",
  "assignment": "Assignment 4: Workflow Engine",
  "dueDate": "2026-03-20T23:59:00Z",
  "weight": "15%",
  "description": "Build a workflow engine using Node.js..."
}
```

**2. Backend agent analyzes and responds**
```
Assignment: COMP 2132 Final Project (30% of grade)
Due: March 20 (12 days away)

Recommended Schedule:
Week 1 (Mar 8-14):
  ✓ Research workflow architecture patterns (3 hrs)
  ✓ Set up Node.js project structure (2 hrs)
  ✓ Design database schema (2 hrs)

Week 2 (Mar 15-20):
  ✓ Build core engine (8 hrs)
  ✓ Testing & debugging (4 hrs)
  ✓ Documentation (2 hrs)

Total: 21 hours across 6 sessions
Notification schedule set: 7d, 3d, 1d reminders
```

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Extension** | TypeScript, Chrome Extension Manifest V3 | Type safety, modern extension APIs |
| **Backend** | Node.js, Express, Prisma | Fast prototyping, strong ecosystem |
| **Database** | PostgreSQL | Relational data, robust querying |
| **AI/Agents** | Claude API (Anthropic) | Best-in-class reasoning for complex task planning |
| **Orchestration** | Custom agent framework | Tailored to student workflow needs |
| **Deployment** | Railway / Vercel | Simple, affordable, scalable |

---

## Roadmap

### Phase 1: MVP (Current)
- [x] Backend server infrastructure
- [x] Git repository & workflow
- [ ] Chrome extension skeleton
- [ ] D2L Brightspace DOM parsing
- [ ] Assignment extraction pipeline
- [ ] Basic API endpoint (`POST /api/assignments`)

### Phase 2: Intelligence
- [ ] Claude AI integration
- [ ] Assignment analysis agent
- [ ] Task breakdown generation
- [ ] Workload estimation
- [ ] Priority scoring algorithm

### Phase 3: Automation
- [ ] Browser notification system
- [ ] Google Calendar integration
- [ ] Study schedule generator
- [ ] Multi-day assignment tracking

### Phase 4: Scale
- [ ] Project hub auto-generation (Notion API)
- [ ] Multi-LMS support (Canvas, Moodle)
- [ ] Email/SMS notifications
- [ ] Chrome Web Store deployment

---

## Why This Project Matters

**Personally:**  
I built this because I was drowning in my own school logistics at BCIT. Assignments scattered across portals, no central view, constant stress about "what am I forgetting?" This is the tool I wish existed when I started.

**Technically:**  
This demonstrates full-stack product development—browser extension engineering, backend architecture, AI agent orchestration, database design, and product thinking. It's not a tutorial project; it's a real solution to a real problem.

**Impact:**  
If even 50 students save 2 hours a week on school logistics, that's 100 hours freed up for actual learning, side projects, or just... rest. Multiply that across thousands of students. That's meaningful.

---

## Competitive Landscape

| Tool | Approach | Limitation |
|------|----------|------------|
| MyStudyLife | Manual calendar input | Requires constant upkeep |
| Notion | DIY templates | Zero automation |
| Google Calendar | Generic reminders | No context awareness |
| Canvas/Brightspace | Basic notifications | Passive, not intelligent |
| **Studion** | **Automated extraction + AI planning** | **Active, intelligent, zero input** |

---

## Installation (Coming Soon)

Once the Chrome extension is live:

1. Download from Chrome Web Store
2. Visit your D2L Brightspace portal
3. Extension auto-detects assignments
4. AI generates your first study plan

No setup, no configuration, no friction.

---

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Git
- Chrome browser (for extension development)

### Quick Start

**1. Clone the repository**
```bash
git clone https://github.com/Ritchotte/Studion.git
cd Studion
```

**2. Set up the backend**
```bash
cd backend
npm install
npm run dev
```
The server will start at `http://localhost:3000`

**3. Verify the backend is running**
```bash
curl http://localhost:3000/health
# Expected: {"status":"Studion backend running"}
```

**4. Load the Chrome extension** *(coming soon)*
```bash
cd ../extension
npm install
npm run build
```
Then:
1. Open Chrome and navigate to `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `extension` folder

---

## Project Structure

```
Studion/
├── backend/              # Node.js API server
│   ├── src/
│   │   └── server.ts     # Express app entry point
│   ├── package.json
│   └── tsconfig.json
│
├── extension/            # Chrome extension (in progress)
│   ├── manifest.json
│   ├── src/
│   │   ├── content.ts    # DOM scraping logic
│   │   ├── background.ts # Event handling
│   │   └── popup/        # UI components
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Built By

**Ruth Ritchotte**  
Computer Systems Technology Student @ BCIT  
White Rock, BC

**Contact:**  
- GitHub: [@Ritchotte](https://github.com/Ritchotte)
- Email: Ruthannaritchotte@gmail.com

---

## License

MIT License - feel free to fork and adapt for your own university!

---

**Status Update:** Foundation complete. Chrome extension in active development. First working demo targeted for late March 2026.

*Last updated: March 6, 2026*
